(() => {
  "use strict";
  const root = document.documentElement;
  const modeButton = document.querySelector("[data-is148-mode-toggle]");
  const copyStatuses = document.querySelectorAll("[data-is148-copy-status]");
  const modeKey = "is148-ink-mode";
  const setText = (node, value) => { if (node) node.textContent = value; };
  const announce = (message) => copyStatuses.forEach((node) => setText(node, message));
  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
      const field = document.createElement("textarea"); field.value = text; field.setAttribute("readonly", ""); field.style.position = "fixed"; field.style.opacity = "0"; document.body.append(field); field.select(); const copied = document.execCommand("copy"); field.remove(); return copied;
    } catch { return false; }
  };
  const applyMode = (paper) => {
    root.dataset.is148Mode = paper ? "paper" : "night";
    if (modeButton) { modeButton.textContent = paper ? "落入夜墨" : "摊开纸面"; modeButton.setAttribute("aria-pressed", String(paper)); }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", paper ? "#f2ebdf" : "#10131c");
  };
  let paperMode = true;
  try { paperMode = localStorage.getItem(modeKey) !== "night"; } catch { paperMode = true; }
  applyMode(paperMode);
  modeButton?.addEventListener("click", () => { paperMode = root.dataset.is148Mode !== "paper"; applyMode(paperMode); try { localStorage.setItem(modeKey, paperMode ? "paper" : "night"); } catch { /* optional preference */ } });

  document.querySelector("[data-is148-copy-code]")?.addEventListener("click", async () => { const value = document.querySelector("[data-is148-code]")?.textContent.trim() || ""; announce((await copyText(value)) ? "色卡编号已蘸取。" : "蘸取失败，请手动选择编号。"); });
  const reading = document.querySelector(".is148-reading");
  if (reading) {
    let queued = false;
    const update = () => { const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2; reading.setAttribute("value", String(atEnd ? 100 : Math.min(99, Math.round((window.scrollY / range) * 100)))); queued = false; };
    const request = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    update(); window.addEventListener("scroll", request, { passive: true }); window.addEventListener("resize", request);
  }
  document.querySelector("[data-is148-copy-note]")?.addEventListener("click", async () => {
    const text = ["墨水色卡比较五记摘要", "1. H、S、L 应来自当前项目明确采用的记录口径。", "2. 色相差使用 360° 环上的最短圆弧。", "3. 色相差归一化后与饱和度差、明度差计算内部欧氏距离。", "4. 阈值由使用者给出，提示只是复核清单。", "5. 页面不执行 ΔE、光谱、校准、配方、材料、印刷、健康或安全判断。"].join("\n");
    announce((await copyText(text)) ? "五记摘要已蘸取。" : "蘸取失败，请手动选择内容。");
  });
  const labels = Array.from(document.querySelectorAll(".is148-gate-list details"));
  labels.forEach((label) => label.addEventListener("toggle", () => { if (label.open) labels.forEach((other) => { if (other !== label) other.open = false; }); }));
  document.querySelector("[data-is148-copy-policy]")?.addEventListener("click", async () => {
    const text = ["墨水色卡使用边界", "页面不执行光谱、CIE Lab、ΔE、ICC、校准、色盲模拟或对比度测试。", "页面不判断配方、化学成分、毒性、皮肤接触、吸入、误食、过敏或急救。", "页面不判断纸张、笔尖、晕染、耐光、耐水、保存、显示器、打印机或成品一致。", "品牌、配方、样本、照片、客户资料、隐私、版权和许可由责任人确认。"].join("\n");
    announce((await copyText(text)) ? "使用边界已蘸取。" : "蘸取失败，请手动选择内容。");
  });
  const search = document.querySelector("[data-is148-search]");
  search?.addEventListener("submit", (event) => {
    event.preventDefault(); const input = search.querySelector("#is148-clue"); const status = search.querySelector("[data-is148-search-status]"); const clue = input.value.trim(); const length = Array.from(clue).length;
    if (!length) { setText(status, "请输入墨水、距离或使用边界线索。"); return; }
    if (length > 80) { setText(status, "线索最多 80 个字符，请缩短后再寻找。"); return; }
    const routes = [
      { terms: ["墨水", "色卡", "色相", "饱和", "明度", "记录"], page: "article.html", label: "色卡笔记" },
      { terms: ["距离", "阈值", "近色", "重复", "比较", "样本"], page: "tool.html", label: "近色比较" },
      { terms: ["皮肤", "过敏", "化学", "保存", "材料", "版权", "安全"], page: "legal.html", label: "使用边界" }
    ];
    const route = routes.find((item) => item.terms.some((term) => clue.includes(term))) || { page: "index.html", label: "色谱入口" };
    setText(status, `已找到“${route.label}”，正在沿毛细线返回。`); window.setTimeout(() => window.location.assign(route.page), 350);
  });

  const form = document.querySelector("[data-is148-swatch-form]");
  if (!form) return;
  const input = form.querySelector("#is148-rows"); const thresholdInput = form.querySelector("#is148-threshold-input"); const errorNode = form.querySelector("[data-is148-error]"); const formStatus = form.querySelector("[data-is148-form-status]"); const report = document.querySelector(".is148-swatch-report"); const q = (selector) => report.querySelector(selector);
  const stateNode = q("[data-is148-report-state]"); const preview = q("[data-is148-palette-preview]"); const countNode = q("[data-is148-count]"); const uniqueNode = q("[data-is148-unique]"); const closestNode = q("[data-is148-closest]"); const thresholdNode = q("[data-is148-threshold]"); const findingSummary = q("[data-is148-finding-summary]"); const findingList = q("[data-is148-finding-list]"); const swatchSummary = q("[data-is148-swatch-summary]"); const swatchList = q("[data-is148-swatch-list]"); const copyButton = q("[data-is148-copy-report]");
  const validStates = new Set(["草样", "复核", "定稿"]); const integerPattern = /^(?:0|[1-9]\d{0,2})$/u; const thresholdPattern = /^(?:0|[1-9]\d?)(?:\.\d)?$/u;
  const presets = {
    clear: { threshold: "12.0", rows: "朱砂墨 | 0 | 80 | 50 | 定稿\n苔绿墨 | 120 | 70 | 40 | 定稿\n群青墨 | 240 | 65 | 45 | 定稿\n琥珀墨 | 45 | 90 | 60 | 定稿" },
    wrap: { threshold: "12.0", rows: "环端甲 | 359 | 80 | 50 | 定稿\n环端乙 | 1 | 80 | 50 | 定稿\n苔绿墨 | 120 | 70 | 40 | 定稿\n群青墨 | 240 | 65 | 45 | 定稿" },
    duplicate: { threshold: "0", rows: "复色甲 | 15 | 75 | 48 | 定稿\n复色乙 | 15 | 75 | 48 | 定稿\n苔绿墨 | 120 | 70 | 40 | 定稿\n群青墨 | 240 | 65 | 45 | 定稿" },
    review: { threshold: "12.0", rows: "环端甲 | 359 | 80 | 50 | 草样\n环端乙 | 1 | 80 | 50 | 复核\n苔绿墨 | 120 | 70 | 40 | 定稿\n群青墨 | 240 | 65 | 45 | 定稿" }
  };
  let currentReport = "";
  const normalize = (value) => value.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("zh-CN");
  const parseInteger = (value, row, label, max) => { if (!integerPattern.test(value)) throw new Error(`第 ${row} 行${label}须为 0–${max} 的整数，不接受正负号、小数、指数或前导零。`); const number = Number(value); if (number > max) throw new Error(`第 ${row} 行${label}须在 0–${max} 之间。`); return number; };
  const parseThreshold = (value) => { if (!thresholdPattern.test(value)) throw new Error("近色阈值须为 0–50 的普通十进制数，最多一位小数且不接受前导零。"); const number = Number(value); if (number > 50) throw new Error("近色阈值须在 0–50 之间。"); return number; };
  const distance = (a, b) => { const rawHue = Math.abs(a.h - b.h); const hue = (Math.min(rawHue, 360 - rawHue) / 180) * 100; return Math.hypot(hue, a.s - b.s, a.l - b.l); };
  const resetReport = (message = "等待至少三个色卡样本。") => {
    currentReport = ""; report.dataset.ready = "false"; setText(stateNode, "UNSET"); setText(countNode, "0"); setText(uniqueNode, "0"); setText(closestNode, "—"); setText(thresholdNode, "—"); setText(findingSummary, "等待校核"); findingList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "生成后显示阈值内样本对与未定稿状态。" })); setText(swatchSummary, "等待样本"); swatchList.replaceChildren(Object.assign(document.createElement("p"), { textContent: "等待色卡记录。" })); preview.replaceChildren(Object.assign(document.createElement("span"), { textContent: "等待色卡" })); copyButton.disabled = true; setText(formStatus, message); announce("");
  };
  const fail = (message) => { setText(errorNode, message); resetReport("输入未通过校核，比较色册未生成。"); };
  const parseRows = (raw) => {
    if (Array.from(raw).length > 6000) throw new Error("全部色卡输入最多 6000 个字符。"); const lines = raw.split(/\r?\n/u).map((line) => line.trim()).filter(Boolean); if (lines.length < 3) throw new Error("请至少输入 3 个色卡样本。"); if (lines.length > 60) throw new Error("一次最多比较 60 个色卡样本。");
    const exact = new Set(); const normalized = new Set();
    return lines.map((line, index) => { const row = index + 1; const fields = line.split("|").map((field) => field.trim()); if (fields.length !== 5) throw new Error(`第 ${row} 行须包含 5 项，并以 | 分隔。`); const [id, hueText, saturationText, lightnessText, status] = fields; const length = Array.from(id).length; if (length < 2 || length > 24) throw new Error(`第 ${row} 行样本号须为 2–24 个字符。`); if (/\p{Cc}|\p{Cf}/u.test(id)) throw new Error(`第 ${row} 行样本号含不可见控制字符。`); if (exact.has(id)) throw new Error(`第 ${row} 行样本号与前文完全重复：${id}。`); exact.add(id); const key = normalize(id); if (normalized.has(key)) throw new Error(`第 ${row} 行样本号规范化后重复：${id}。`); normalized.add(key); const h = parseInteger(hueText, row, "色相", 359); const s = parseInteger(saturationText, row, "饱和度", 100); const l = parseInteger(lightnessText, row, "明度", 100); if (!validStates.has(status)) throw new Error(`第 ${row} 行状态只能是“草样”“复核”或“定稿”。`); return { id, key, h, s, l, status, index }; });
  };
  const addLimited = (container, values, factory) => { const fragment = document.createDocumentFragment(); values.slice(0, 40).forEach((value, index) => fragment.append(factory(value, index))); if (values.length > 40) { const more = document.createElement(container.tagName === "UL" ? "li" : "p"); more.textContent = `界面仅显示前 40 项，另有 ${values.length - 40} 项已写入复制交接。`; fragment.append(more); } container.replaceChildren(fragment); };
  const renderPreview = (swatches) => { const fragment = document.createDocumentFragment(); swatches.forEach((swatch) => { const strip = document.createElement("span"); strip.className = "is148-preview-strip"; strip.style.backgroundColor = `hsl(${swatch.h} ${swatch.s}% ${swatch.l}%)`; strip.textContent = swatch.id; fragment.append(strip); }); preview.replaceChildren(fragment); };
  const render = (swatches, threshold) => {
    const pairs = []; let closest = null;
    for (let i = 0; i < swatches.length; i += 1) for (let j = i + 1; j < swatches.length; j += 1) { const value = distance(swatches[i], swatches[j]); const pair = { a: swatches[i], b: swatches[j], value }; if (!closest || value < closest.value) closest = pair; if (value <= threshold) pairs.push(pair); }
    const colorFindings = pairs.map((pair) => `${pair.value === 0 ? "同值复色" : "阈值内近色"}：${pair.a.id} ↔ ${pair.b.id}，内部 HSL 距离 ${pair.value.toFixed(2)}。`); const statusFlags = swatches.filter((swatch) => swatch.status !== "定稿"); const findings = [...colorFindings, ...statusFlags.map((swatch) => `${swatch.id}：当前状态为“${swatch.status}”，尚未记录为定稿。`)]; let state = "SWATCH CLEAR"; if (colorFindings.length && statusFlags.length) state = `REVIEW ${findings.length}`; else if (colorFindings.length) state = `COLOR FLAGS ${colorFindings.length}`; else if (statusFlags.length) state = `STATUS FLAGS ${statusFlags.length}`;
    const unique = new Set(swatches.map((swatch) => `${swatch.h}|${swatch.s}|${swatch.l}`)).size; report.dataset.ready = "true"; setText(stateNode, state); setText(countNode, String(swatches.length)); setText(uniqueNode, String(unique)); setText(closestNode, closest ? closest.value.toFixed(2) : "—"); setText(thresholdNode, threshold.toFixed(1)); setText(findingSummary, findings.length ? `${findings.length} 项色卡提示` : "没有阈值内近色或未定稿提示"); addLimited(findingList, findings.length ? findings : ["全部样本参数有效，任意样本对距离均大于阈值，且状态均为定稿。"], (finding) => Object.assign(document.createElement("li"), { textContent: finding }));
    setText(swatchSummary, `${swatches.length} 张色卡 · ${unique} 组唯一 HSL · ${pairs.length} 对阈值内样本`); addLimited(swatchList, swatches, (swatch) => { const card = document.createElement("article"); card.className = "is148-swatch-card"; const color = document.createElement("i"); color.style.backgroundColor = `hsl(${swatch.h} ${swatch.s}% ${swatch.l}%)`; const name = document.createElement("b"); const meta = document.createElement("span"); const stateText = document.createElement("strong"); name.textContent = swatch.id; meta.textContent = `H ${swatch.h}° · S ${swatch.s}% · L ${swatch.l}%`; stateText.textContent = swatch.status; card.append(color, name, meta, stateText); return card; }); renderPreview(swatches);
    currentReport = ["墨水色卡比较交接", `状态：${state}`, `样本：${swatches.length}`, `唯一 HSL：${unique}`, `近色阈值：${threshold.toFixed(1)}`, `最近样本对：${closest ? `${closest.a.id} ↔ ${closest.b.id} / ${closest.value.toFixed(2)}` : "—"}`, `阈值内样本对：${pairs.length}`, "", "逐张色卡：", ...swatches.map((swatch, index) => `${index + 1}. ${swatch.id} | H ${swatch.h}° | S ${swatch.s}% | L ${swatch.l}% | ${swatch.status}`), "", "色卡提示：", ...(findings.length ? findings.map((finding, index) => `${index + 1}. ${finding}`) : ["无。全部样本参数有效，任意样本对距离均大于阈值，且状态均为定稿。"]), "", "计算口径：色相差取 360° 环上的最短圆弧，除以 180 后乘 100；再与饱和度差、明度差计算内部欧氏距离。距离小于等于用户阈值的每一对样本进入提示。", "边界：报告不执行 CIE Lab、ΔE、ICC、光谱、校准、对比度、配方、材料、耐久、印刷、健康或安全判断。"].join("\n"); copyButton.disabled = false; setText(formStatus, `已比较 ${swatches.length} 个样本；屏幕色卡不代表实物、印刷或安全结论。`);
  };
  form.querySelectorAll("[data-is148-preset]").forEach((button) => button.addEventListener("click", () => { const preset = presets[button.dataset.is148Preset]; input.value = preset.rows; thresholdInput.value = preset.threshold; setText(errorNode, ""); resetReport("示例已铺开，请生成比较色册。"); input.focus(); }));
  const markStale = () => { setText(errorNode, ""); if (report.dataset.ready === "true") resetReport("色卡或阈值已改变，请重新生成比较色册。"); };
  input.addEventListener("input", markStale); thresholdInput.addEventListener("input", markStale);
  form.addEventListener("reset", () => window.setTimeout(() => { setText(errorNode, ""); resetReport("比较色册已合上，输入已恢复初始示例。"); }, 0));
  form.addEventListener("submit", (event) => { event.preventDefault(); setText(errorNode, ""); announce(""); try { render(parseRows(input.value), parseThreshold(thresholdInput.value.trim())); } catch (error) { fail(error instanceof Error ? error.message : "输入未通过校核。"); } });
  copyButton.addEventListener("click", async () => { if (currentReport) announce((await copyText(currentReport)) ? "完整比较交接已蘸取。" : "蘸取失败，请手动选择内容。"); });
})();
