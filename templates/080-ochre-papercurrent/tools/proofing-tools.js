"use strict";
(() => {
  const main = document.querySelector("[data-pc80-tool]");
  if (!main) return;
  const form = main.querySelector("[data-pc80-tool-form]");
  const input = form?.querySelector("textarea");
  const option = form?.querySelector("select");
  const error = form?.querySelector("[data-pc80-error]");
  const report = main.querySelector("[data-pc80-report]");
  const output = report?.querySelector("[data-pc80-output]");
  const count = report?.querySelector("[data-pc80-count]");
  const copy = report?.querySelector("[data-pc80-result-copy]");
  const copyStatus = report?.querySelector("[data-pc80-copy-status]");
  let current = "";
  let revision = 0;
  form.querySelector('button[type="submit"]').disabled = false;

  function fail(message) {
    error.textContent = message;
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-errormessage", error.id);
    input.focus(); report.hidden = true; copy.disabled = true; current = "";
  }
  function invalidate() {
    revision += 1;
    error.textContent = ""; input.removeAttribute("aria-invalid"); input.removeAttribute("aria-errormessage");
    report.hidden = true; copy.disabled = true; copyStatus.textContent = ""; current = "";
  }
  function rawLines() {
    const raw = input.value;
    if (!raw.trim()) throw new Error("请输入至少一条记录。");
    if (raw.length > 30000) throw new Error("输入超过 30,000 个字符。");
    if (/[^\t\n\r\u0020-\uD7FF\uE000-\uFFFD]/u.test(raw) || /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(raw)) throw new Error("输入包含控制字符或不完整字符。");
    const lines = raw.normalize("NFKC").split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    const limit = main.dataset.pc80Tool === "pagination" ? 200 : 300;
    if (lines.length > limit) throw new Error(`记录超过 ${limit} 行。`);
    return lines;
  }
  function parts(line, n, index) {
    const values = line.split("|").map(s => s.trim());
    if (values.length !== n || values.some(v => !v)) throw new Error(`第 ${index + 1} 行格式不完整。`);
    return values;
  }
  function safeId(value, label) {
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,39}$/.test(value)) throw new Error(`${label} 必须是 1–40 位 ASCII 标识。`);
  }
  function positive(value, label, max = 999999999) {
    if (!/^(?:[1-9]\d*)$/.test(value)) throw new Error(`${label} 必须是正整数。`);
    const n = Number(value); if (!Number.isSafeInteger(n) || n > max) throw new Error(`${label} 超出允许范围。`); return n;
  }
  function footnote(lines) {
    const map = new Map();
    lines.forEach((line, i) => { const [id, type, where] = parts(line, 3, i); safeId(id, "脚注 ID"); if (!/^(?:ref|note)$/.test(type)) throw new Error(`第 ${i + 1} 行类型只能是 ref 或 note。`); const item = map.get(id) || {ref:[], note:[]}; item[type].push(where); map.set(id, item); });
    const rows = [...map].sort((a,b) => a[0].localeCompare(b[0])).map(([id,v]) => `${id} | ref=${v.ref.length} | note=${v.note.length} | ${v.ref.length === 1 && v.note.length === 1 ? "OK" : "CHECK"}`);
    const bad = rows.filter(s => s.endsWith("CHECK")).length; return [`脚注：${map.size} 个；需处理：${bad}`, "", ...rows].join("\n");
  }
  function pagination(lines) {
    const signature = Number(option.value); if (![4,8,16].includes(signature)) throw new Error("书帖页数无效。"); let cursor = 1; const rows = [];
    lines.forEach((line,i) => { const [leaf,pagesRaw] = parts(line,2,i); if (leaf.length > 80) throw new Error(`第 ${i+1} 行叶名过长。`); const pages=positive(pagesRaw,"页数",9999); const start=cursor,end=cursor+pages-1; rows.push(`${leaf} | ${start}–${end} | ${pages} 页`); cursor=end+1; });
    const used=cursor-1,total=Math.ceil(used/signature)*signature,pad=total-used; return [`正文页：${used}；书帖：${signature} 页；装订页：${total}；补白：${pad}`,"",...rows,pad?`补白页序 | ${used+1}–${total}`:"无需补白"].join("\n");
  }
  function fixedPerThousand(citations, words) { const scaled=BigInt(citations)*1000000n/BigInt(words); return `${scaled/1000n}.${String(scaled%1000n).padStart(3,"0")}`; }
  function density(lines) {
    const rows=lines.map((line,i)=>{const [section,w,c]=parts(line,3,i);if(section.length>80)throw new Error(`第 ${i+1} 行章节名过长。`);const words=positive(w,"字数"),citations=/^\d+$/.test(c)?Number(c):NaN;if(!Number.isSafeInteger(citations)||citations>100000)throw new Error(`第 ${i+1} 行引用数无效。`);return{section,words,citations,density:fixedPerThousand(citations,words)};}).sort((a,b)=>Number(b.density)-Number(a.density)||a.section.localeCompare(b.section));
    return [`章节：${rows.length}；按每千字引用密度降序`,"",...rows.map(x=>`${x.section} | ${x.words} 字 | ${x.citations} 引用 | ${x.density}/千字`)].join("\n");
  }
  function chronology(lines) {
    const seen=new Set();const rows=lines.map((line,i)=>{const[id,date,stage]=parts(line,3,i);safeId(id,"修订 ID");if(seen.has(id))throw new Error(`第 ${i+1} 行修订 ID 重复。`);seen.add(id);if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(Date.parse(`${date}T00:00:00Z`))||new Date(`${date}T00:00:00Z`).toISOString().slice(0,10)!==date)throw new Error(`第 ${i+1} 行日期无效。`);if(!/^[A-Za-z][A-Za-z0-9_-]{0,29}$/.test(stage))throw new Error(`第 ${i+1} 行阶段格式无效。`);return{id,date,stage,i};});rows.sort((a,b)=>a.date.localeCompare(b.date)||a.i-b.i);const keys=new Map();for(const r of rows){const k=`${r.date}|${r.stage}`,list=keys.get(k)||[];list.push(r.id);keys.set(k,list);}const conflicts=[...keys].filter(([,ids])=>ids.length>1);return[`修订：${rows.length}；同日同阶段冲突：${conflicts.length}`,"",...rows.map(r=>`${r.date} | ${r.id} | ${r.stage}`),...conflicts.map(([k,ids])=>`CONFLICT | ${k.replace("|"," | ")} | ${ids.join(",")}`)].join("\n");
  }
  function coverage(lines) {
    const threshold=Number(option.value);if(![1,2,3,4].includes(threshold))throw new Error("最低来源数无效。");const seen=new Set();const rows=lines.map((line,i)=>{const[claim,sourcesRaw]=parts(line,2,i);safeId(claim,"陈述 ID");if(seen.has(claim))throw new Error(`第 ${i+1} 行陈述 ID 重复。`);seen.add(claim);const sources=[...new Set(sourcesRaw.split(",").map(s=>s.trim()).filter(Boolean))];if(!sources.length||sources.length>100)throw new Error(`第 ${i+1} 行来源数量无效。`);sources.forEach(s=>safeId(s,"来源 ID"));return{claim,sources,ok:sources.length>=threshold};});const bad=rows.filter(r=>!r.ok).length;return[`陈述：${rows.length}；门槛：${threshold}；不足：${bad}`,"",...rows.map(r=>`${r.claim} | ${r.sources.join(",")} | ${r.sources.length}/${threshold} | ${r.ok?"OK":"GAP"}`)].join("\n");
  }
  function render() {
    try { const lines=rawLines(); const handlers={footnote,pagination,density,chronology,coverage}; current=handlers[main.dataset.pc80Tool](lines); error.textContent=""; input.removeAttribute("aria-invalid"); output.textContent=current; count.textContent=`${lines.length} ROWS`; report.hidden=false; copy.disabled=false; output.focus(); }
    catch (reason) { fail(reason instanceof Error ? reason.message : "无法处理输入。"); }
  }
  form.addEventListener("submit", event => { event.preventDefault(); render(); });
  form.addEventListener("reset", () => requestAnimationFrame(() => { invalidate(); input.focus(); }));
  input.addEventListener("input", invalidate); if (option) option.addEventListener("change", invalidate);
  copy.addEventListener("click", async () => { if(!current)return; const expected=revision; try { await navigator.clipboard.writeText(current); if(expected===revision)copyStatus.textContent="报告已复制。"; } catch (_) { if(expected===revision){copyStatus.textContent="当前环境未授权复制，请手动选择报告。";output.focus();} } });
})();
