(() => {
  "use strict";
  const root = document.documentElement;
  const count = (value) => Array.from(value).length;
  const setText = (node, value) => { if (node) node.textContent = value; };
  const copyText = async (value, status, message) => {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else { const field = document.createElement("textarea"); field.value = value; field.setAttribute("readonly", ""); field.style.position = "fixed"; field.style.opacity = "0"; document.body.append(field); field.select(); const ok = document.execCommand("copy"); field.remove(); if (!ok) throw new Error("copy unavailable"); }
      setText(status, message);
    } catch (_error) { setText(status, "复制失败，请手动选择文字。"); }
  };

  const initializeFilm = () => {
    const toggles = [...document.querySelectorAll("[data-sa81-film-toggle]")];
    if (!toggles.length) return;
    let saved = null; try { saved = localStorage.getItem("sa81-film"); } catch (_error) { saved = null; }
    const apply = (film) => { root.dataset.sa81Film = film; toggles.forEach((toggle) => { const lit = film === "lightbox"; toggle.setAttribute("aria-pressed", String(lit)); toggle.textContent = lit ? "灰蓝片" : "灯箱"; }); };
    apply(saved === "lightbox" || saved === "slate" ? saved : "slate");
    toggles.forEach((toggle) => toggle.addEventListener("click", () => { const next = root.dataset.sa81Film === "lightbox" ? "slate" : "lightbox"; apply(next); try { localStorage.setItem("sa81-film", next); } catch (_error) { /* current page still changes */ } }));
  };

  const initializeMenu = () => {
    const button = document.querySelector(".sa81-menu"); const navigation = document.querySelector("#sa81-nav"); if (!button || !navigation) return;
    const close = (focus = false) => { navigation.classList.remove("sa81-open"); button.setAttribute("aria-expanded", "false"); if (focus) button.focus(); };
    const open = () => { navigation.classList.add("sa81-open"); button.setAttribute("aria-expanded", "true"); const first = navigation.querySelector("a"); if (first) first.focus(); };
    button.addEventListener("click", () => navigation.classList.contains("sa81-open") ? close() : open());
    navigation.addEventListener("click", (event) => { if (event.target.closest("a") && window.innerWidth <= 760) close(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && navigation.classList.contains("sa81-open")) close(true); });
    window.addEventListener("resize", () => { if (window.innerWidth > 760) close(); });
  };

  const initializeProgress = () => {
    const meter = document.querySelector("[data-sa81-progress]"); if (!meter) return;
    const update = () => { const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight); meter.style.height = `${maximum === 0 ? 100 : Math.min(100, Math.max(0, window.scrollY / maximum * 100))}%`; };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
  };

  const initializeCopies = () => {
    const handoff = document.querySelector("[data-sa81-copy-handoff]"); if (handoff) handoff.addEventListener("click", () => copyText("版本登记格式\n1. 材料身份与位置\n2. 捕获范围与时间\n3. 编码及规范化方法\n4. SHA-256\n5. 最近复核日", document.querySelector("[data-sa81-handoff-status]"), "登记格式已复制。"));
    const disclosure = document.querySelector("[data-sa81-disclosure]"); const disclosureButton = document.querySelector("[data-sa81-copy-disclosure]"); if (disclosure && disclosureButton) disclosureButton.addEventListener("click", () => copyText(disclosure.textContent.trim(), document.querySelector("[data-sa81-disclosure-status]"), "简短披露已复制。"));
  };

  const initializeRegistry = () => {
    const form = document.querySelector("[data-sa81-hash-form]"); if (!form) return;
    const field = form.querySelector("#sa81-records"), errorNode = form.querySelector("[data-sa81-hash-error]"), statusNode = form.querySelector("[data-sa81-hash-status]");
    const report = document.querySelector(".sa81-hash-report"), stateNode = report.querySelector("[data-sa81-hash-state]"), recordNode = report.querySelector("[data-sa81-record-count]"), titleNode = report.querySelector("[data-sa81-title-count]"), hashNode = report.querySelector("[data-sa81-unique-hash-count]"), duplicateNode = report.querySelector("[data-sa81-duplicate-count]"), listNode = report.querySelector("[data-sa81-hash-issues]"), noteNode = report.querySelector("[data-sa81-report-note]"), copyButton = report.querySelector("[data-sa81-copy-report]"), copyStatus = report.querySelector("[data-sa81-report-status]");
    let lastReport = "";
    const clearList = () => { while (listNode.firstChild) listNode.firstChild.remove(); };
    const add = (label, detail, kind = "") => { const item = document.createElement("li"); if (kind) item.dataset.kind = kind; const heading = document.createElement("b"), text = document.createElement("span"); heading.textContent = label; text.textContent = detail; item.append(heading, text); listNode.append(item); };
    const reset = () => { field.removeAttribute("aria-invalid"); setText(errorNode, ""); report.dataset.ready = "false"; setText(stateNode, "UNINDEXED"); setText(recordNode, "0"); setText(titleNode, "0"); setText(hashNode, "0"); setText(duplicateNode, "0"); clearList(); add("—", "扫描后显示前 50 个重复问题。"); setText(noteNode, "相同哈希只说明登记的摘要相同，不自动证明来源真实。"); setText(statusNode, "等待输入版本指纹。"); setText(copyStatus, ""); copyButton.disabled = true; lastReport = ""; };
    const stale = () => { field.removeAttribute("aria-invalid"); setText(errorNode, ""); setText(copyStatus, ""); if (report.dataset.ready === "true") { report.dataset.ready = "stale"; setText(stateNode, "RESCAN"); setText(statusNode, "登记内容已更改，请重新扫描。"); copyButton.disabled = true; } lastReport = ""; };
    const fail = (message) => { reset(); field.setAttribute("aria-invalid", "true"); setText(errorNode, message); setText(statusNode, "未生成报告，请修正登记。"); setText(stateNode, "INPUT ERROR"); clearList(); add("—", "版本指纹未通过格式检查。"); setText(noteNode, "修正输入后再次扫描；现有报告已清除。"); field.focus(); };
    const parse = () => {
      if (count(field.value) > 30000) return { error: "总输入不能超过 30,000 个 Unicode 字符。" };
      const lines = field.value.normalize("NFKC").split(/\r?\n/u).filter((line) => line.trim() !== "");
      if (!lines.length) return { error: "请至少输入 1 条版本指纹。" }; if (lines.length > 200) return { error: "非空版本指纹不能超过 200 行。" };
      const records = [];
      for (let index = 0; index < lines.length; index += 1) { const parts = lines[index].split("|"); if (parts.length !== 2) return { error: `第 ${index + 1} 行须且只能包含一个竖线分隔符。` }; const title = parts[0].trim(), hash = parts[1].trim().toLowerCase(); if (!title) return { error: `第 ${index + 1} 行标题不能为空。` }; if (count(title) > 100) return { error: `第 ${index + 1} 行标题不能超过 100 个 Unicode 字符。` }; if (!/^[0-9a-f]{64}$/u.test(hash)) return { error: `第 ${index + 1} 行 SHA-256 无效：须为 64 位十六进制。` }; records.push({ title, titleKey: title.toLowerCase(), hash, line: index + 1 }); }
      const titles = new Map(), hashes = new Map(); records.forEach((record) => { const titleEntries = titles.get(record.titleKey) || []; titleEntries.push(record); titles.set(record.titleKey, titleEntries); const hashEntries = hashes.get(record.hash) || []; hashEntries.push(record); hashes.set(record.hash, hashEntries); });
      const issues = [];
      [...titles.values()].filter((entries) => entries.length > 1).forEach((entries) => issues.push({ kind: "title", label: entries[0].title, detail: `标题重复 ${entries.length} 次，位于第 ${entries.map((entry) => entry.line).join("、")} 行。` }));
      [...hashes.entries()].filter(([, entries]) => entries.length > 1).forEach(([hash, entries]) => issues.push({ kind: "hash", label: `${hash.slice(0, 16)}…`, detail: `相同哈希登记 ${entries.length} 次：${entries.map((entry) => entry.title).join(" / ")}。` }));
      return { records, titles, hashes, issues };
    };
    const render = (data) => { const clean = data.issues.length === 0; field.removeAttribute("aria-invalid"); setText(errorNode, ""); report.dataset.ready = "true"; setText(stateNode, clean ? "REGISTRY CLEAN" : "CHECK DUPLICATES"); setText(recordNode, String(data.records.length)); setText(titleNode, String(data.titles.size)); setText(hashNode, String(data.hashes.size)); setText(duplicateNode, String(data.issues.length)); setText(statusNode, `已扫描 ${data.records.length} 条：${data.titles.size} 个唯一标题，${data.hashes.size} 个唯一哈希，${data.issues.length} 个重复组。`); clearList(); if (clean) add("✓", "标题与 SHA-256 均未形成重复组。"); else data.issues.slice(0, 50).forEach((issue) => add(issue.label, issue.detail, issue.kind)); setText(noteNode, data.issues.length > 50 ? `屏幕仅显示前 50 项，共 ${data.issues.length} 项；复制报告会包含全部问题。` : clean ? "登记结构通过扫描；仍须人工核对捕获对象、规范化方法和来源身份。" : `共发现 ${data.issues.length} 个重复组；请确认是复用、重复登记还是命名冲突。`); const lines = ["内容 SHA-256 指纹登记报告", `记录：${data.records.length}`, `唯一标题：${data.titles.size}`, `唯一哈希：${data.hashes.size}`, `重复组：${data.issues.length}`, "", "问题明细"]; if (clean) lines.push("标题与哈希均无重复组。"); else data.issues.forEach((issue) => lines.push(`${issue.kind.toUpperCase()}｜${issue.label}｜${issue.detail}`)); lastReport = lines.join("\n"); copyButton.disabled = false; setText(copyStatus, ""); };
    form.addEventListener("submit", (event) => { event.preventDefault(); const result = parse(); if (result.error) fail(result.error); else render(result); }); field.addEventListener("input", stale); form.addEventListener("reset", () => window.setTimeout(reset, 0));
    const presets = { duplicates: `首页 v1 | ${"a".repeat(64)}\n首页 V1 | ${"b".repeat(64)}\n归档副本 | ${"a".repeat(64)}`, clean: `首页 v1 | ${"a".repeat(64)}\n首页 v2 | ${"b".repeat(64)}\n说明页 v1 | ${"c".repeat(64)}`, uppercase: `卷宗 A | ${"ABCDEF0123456789".repeat(4)}` };
    form.querySelectorAll("[data-sa81-preset]").forEach((button) => button.addEventListener("click", () => { field.value = presets[button.dataset.sa81Preset] || ""; stale(); field.focus(); })); copyButton.addEventListener("click", () => { if (lastReport) copyText(lastReport, copyStatus, "完整报告已复制。"); });
  };

  const initializeSearch = () => { const form = document.querySelector("[data-sa81-search]"); if (!form) return; const input = form.querySelector("#sa81-query"), result = form.querySelector("[data-sa81-search-result]"); const routes = [{ href: "article.html", label: "解密卷宗", words: ["版本", "摘要", "字节", "文章", "语境"] }, { href: "tool.html", label: "指纹登记册", words: ["指纹", "哈希", "sha", "工具", "重复"] }, { href: "legal.html", label: "库藏说明", words: ["披露", "隐私", "说明", "联系", "边界"] }, { href: "index.html", label: "胶片库", words: ["首页", "胶片", "信号", "库藏", "索引"] }]; const clear = () => { while (result.firstChild) result.firstChild.remove(); }; const showText = (value) => { clear(); result.textContent = value; }; const showLink = (prefix, route) => { clear(); result.append(document.createTextNode(prefix)); const link = document.createElement("a"); link.href = route.href; link.textContent = route.label; result.append(link, document.createTextNode("。")); }; input.addEventListener("input", () => showText("输入已更改，按“扫描索引”重新搜索。")); form.addEventListener("submit", (event) => { event.preventDefault(); const query = input.value.normalize("NFKC").trim(); if (!query) { showText("请输入主题，例如“摘要”或“版本”。"); input.focus(); return; } if (count(query) > 80) { showText("搜索词不能超过 80 个 Unicode 字符。"); input.focus(); return; } const route = routes.find((candidate) => candidate.words.some((word) => query.toLowerCase().includes(word))); if (route) showLink("最近的本地信号是：", route); else showLink("没有完全匹配；建议先返回", routes[3]); }); };
  initializeFilm(); initializeMenu(); initializeProgress(); initializeCopies(); initializeRegistry(); initializeSearch();
})();
