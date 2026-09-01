(function () {
  "use strict";
  const root = document.documentElement;
  const unicodeLength = (value) => [...value].length;
  const clear = (node) => { while (node && node.firstChild) node.firstChild.remove(); };
  const copyText = async (value, status, message) => {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else { const field = document.createElement("textarea"); field.value = value; field.setAttribute("readonly", ""); field.style.position = "fixed"; field.style.opacity = "0"; document.body.append(field); field.select(); const ok = document.execCommand("copy"); field.remove(); if (!ok) throw new Error("copy unavailable"); }
      if (status) status.textContent = message;
    } catch (_error) { if (status) status.textContent = "复制失败，请手动选择文字。"; }
  };

  const initializeTheme = () => {
    const toggles = [...document.querySelectorAll("[data-cc84-salon-toggle]")]; if (!toggles.length) return;
    const apply = (value) => { const next = value === "morning" ? "morning" : "evening"; root.dataset.cc84Salon = next; toggles.forEach((toggle) => { toggle.setAttribute("aria-pressed", String(next === "morning")); toggle.textContent = next === "morning" ? "恢复晚场" : "切换晨场"; }); };
    let saved = null; try { saved = localStorage.getItem("cc84-salon"); } catch (_error) { saved = null; } apply(saved || root.dataset.cc84Salon);
    toggles.forEach((toggle) => toggle.addEventListener("click", () => { const next = root.dataset.cc84Salon === "morning" ? "evening" : "morning"; apply(next); try { localStorage.setItem("cc84-salon", next); } catch (_error) { /* current page remains themed */ } }));
  };

  const initializeMenu = () => {
    const button = document.querySelector(".cc84-menu"), nav = document.querySelector("#cc84-nav"); if (!button || !nav) return;
    const set = (open, refocus) => { button.setAttribute("aria-expanded", String(open)); document.body.dataset.cc84Menu = open ? "open" : "closed"; const label = button.querySelector("span"); if (label) label.textContent = open ? "收起沙龙目录" : "展开沙龙目录"; if (open) { const first = nav.querySelector("a"); if (first) first.focus(); } else if (refocus) button.focus(); };
    button.addEventListener("click", () => set(button.getAttribute("aria-expanded") !== "true", false)); document.addEventListener("keydown", (event) => { if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") set(false, true); }); nav.addEventListener("click", (event) => { if (event.target.closest("a") && window.matchMedia("(max-width: 760px)").matches) set(false, false); });
  };

  const initializeReading = () => {
    const meter = document.querySelector("[data-cc84-progress]"), label = document.querySelector("[data-cc84-progress-label]"); if (!meter || !label) return;
    const update = () => { const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); const value = Math.max(0, Math.min(100, Math.round(window.scrollY / max * 100))); meter.style.setProperty("--cc84-read", value + "%"); label.value = value + "%"; label.textContent = value + "%"; }; update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
  };

  const initializeCopies = () => {
    const handoff = document.querySelector("[data-cc84-copy-handoff]"); if (handoff) handoff.addEventListener("click", () => copyText("栏目交接卡\n1. 目标读者与持续问题\n2. 必需材料和证据标准\n3. 固定认知顺序\n4. 更新触发与复核节奏\n5. 排除项和退出标准\n6. 最近一次修订及原因", document.querySelector("[data-cc84-handoff-status]"), "交接格式已复制。"));
    const disclosure = document.querySelector("[data-cc84-disclosure]"), button = document.querySelector("[data-cc84-copy-disclosure]"); if (disclosure && button) button.addEventListener("click", () => copyText(disclosure.textContent.trim(), document.querySelector("[data-cc84-disclosure-status]"), "简短披露已复制。"));
  };

  const initializeGrid = () => {
    const form = document.querySelector("[data-cc84-grid-form]"); if (!form) return;
    const inputs = { container: form.querySelector("#cc84-container"), columns: form.querySelector("#cc84-columns"), gutter: form.querySelector("#cc84-gutter"), margin: form.querySelector("#cc84-margin") }, errorNode = form.querySelector("[data-cc84-grid-error]"), statusNode = form.querySelector("[data-cc84-grid-status]");
    const report = document.querySelector(".cc84-grid-report"), stateNode = report.querySelector("[data-cc84-grid-state]"), usableNode = report.querySelector("[data-cc84-usable]"), widthNode = report.querySelector("[data-cc84-column-width]"), gutterNode = report.querySelector("[data-cc84-gutter-total]"), marginNode = report.querySelector("[data-cc84-margin-total]"), preview = report.querySelector("[data-cc84-grid-preview]"), caption = report.querySelector("[data-cc84-grid-caption]"), note = report.querySelector("[data-cc84-report-note]"), copyButton = report.querySelector("[data-cc84-copy-report]"), copyStatus = report.querySelector("[data-cc84-report-status]");
    const presets = { editorial: [1440, 12, 24, 72], tablet: [1024, 8, 20, 48], mobile: [390, 4, 12, 20] }; let lastReport = "";
    const parseInteger = (field, label, min, max) => { const raw = field.value.normalize("NFKC").trim(); if (!/^(0|[1-9]\d*)$/.test(raw)) return { error: label + "须为不含前导零的普通十进制整数。" }; const value = Number(raw); if (value < min || value > max) return { error: label + "须在 " + min + "–" + max + " 之间。" }; return { value }; };
    const parse = () => { const config = [{ key: "container", label: "容器总宽", min: 320, max: 2560 }, { key: "columns", label: "栏数", min: 1, max: 12 }, { key: "gutter", label: "沟槽", min: 0, max: 160 }, { key: "margin", label: "单侧外边距", min: 0, max: 320 }], values = {}; for (const item of config) { const result = parseInteger(inputs[item.key], item.label, item.min, item.max); if (result.error) return { error: result.error, field: inputs[item.key] }; values[item.key] = result.value; } const gutterTotal = (values.columns - 1) * values.gutter, marginTotal = values.margin * 2, usable = values.container - gutterTotal - marginTotal; if (usable <= 0) return { error: "沟槽与外边距占满了容器；可用宽度必须大于 0。", field: inputs.margin }; return { ...values, gutterTotal, marginTotal, usable, columnWidth: usable / values.columns }; };
    const fail = (message, field) => { errorNode.textContent = message; statusNode.textContent = "计算未完成。"; report.dataset.ready = "false"; stateNode.textContent = "INVALID"; [usableNode, widthNode, gutterNode, marginNode].forEach((node) => { node.textContent = "—"; }); clear(preview); caption.textContent = "修正参数后重新生成预览。"; note.textContent = "旧结果已失效。"; copyButton.disabled = true; copyStatus.textContent = ""; lastReport = ""; if (field) field.focus(); };
    const render = (result) => { errorNode.textContent = ""; statusNode.textContent = "计算完成，已生成 " + result.columns + " 栏预览。"; report.dataset.ready = "true"; stateNode.textContent = "READY"; usableNode.textContent = result.usable.toFixed(2) + " px"; widthNode.textContent = result.columnWidth.toFixed(2) + " px"; gutterNode.textContent = result.gutterTotal.toFixed(2) + " px"; marginNode.textContent = result.marginTotal.toFixed(2) + " px"; clear(preview); preview.style.gridTemplateColumns = "repeat(" + result.columns + ",minmax(4px,1fr))"; preview.style.gap = Math.max(2, Math.min(24, result.gutter / result.container * 800)) + "px"; for (let index = 0; index < result.columns; index += 1) { const column = document.createElement("i"); column.setAttribute("aria-hidden", "true"); preview.append(column); } caption.textContent = result.container + " px 容器 · " + result.columns + " 栏 · " + result.gutter + " px 沟槽 · " + result.margin + " px 单侧外边距"; note.textContent = Number.isInteger(result.columnWidth) ? "单栏宽度为整数像素。" : "单栏宽度含小数；实现时请确认浏览器的子像素分配。"; lastReport = ["版面栏宽计算报告", "容器总宽：" + result.container + " px", "栏数：" + result.columns, "沟槽：" + result.gutter + " px", "单侧外边距：" + result.margin + " px", "沟槽总宽：" + result.gutterTotal.toFixed(2) + " px", "外边距总宽：" + result.marginTotal.toFixed(2) + " px", "可用宽度：" + result.usable.toFixed(2) + " px", "单栏宽度：" + result.columnWidth.toFixed(2) + " px"].join("\n"); copyButton.disabled = false; copyStatus.textContent = ""; };
    const stale = () => { errorNode.textContent = ""; statusNode.textContent = "参数已更改，请重新计算。"; report.dataset.ready = "false"; stateNode.textContent = "STALE"; copyButton.disabled = true; copyStatus.textContent = ""; lastReport = ""; };
    const reset = () => { errorNode.textContent = ""; statusNode.textContent = "等待计算版面。"; report.dataset.ready = "false"; stateNode.textContent = "UNSET"; [usableNode, widthNode, gutterNode, marginNode].forEach((node) => { node.textContent = "—"; }); clear(preview); preview.style.removeProperty("grid-template-columns"); preview.style.removeProperty("gap"); caption.textContent = "计算后生成按比例预览。"; note.textContent = "结果保留 2 位小数；预览仅表达比例，不生成 CSS。"; copyButton.disabled = true; copyStatus.textContent = ""; lastReport = ""; };
    form.addEventListener("submit", (event) => { event.preventDefault(); const result = parse(); if (result.error) fail(result.error, result.field); else render(result); }); Object.values(inputs).forEach((field) => field.addEventListener("input", stale)); form.addEventListener("reset", () => window.setTimeout(reset, 0));
    form.querySelectorAll("[data-cc84-preset]").forEach((button) => button.addEventListener("click", () => { const values = presets[button.dataset.cc84Preset]; if (!values) return; [inputs.container.value, inputs.columns.value, inputs.gutter.value, inputs.margin.value] = values.map(String); stale(); inputs.container.focus(); })); copyButton.addEventListener("click", () => { if (lastReport) copyText(lastReport, copyStatus, "计算报告已复制。"); });
  };

  const initializeSearch = () => {
    const form = document.querySelector("[data-cc84-search]"); if (!form) return; const input = form.querySelector("#cc84-query"), result = form.querySelector("[data-cc84-search-result]"); const routes = [{ href: "article.html", label: "栏目方法", words: ["栏目", "节奏", "文章", "更新", "策展"] }, { href: "tool.html", label: "栏宽计算台", words: ["栏宽", "网格", "沟槽", "工具", "计算"] }, { href: "legal.html", label: "编辑公约", words: ["隐私", "披露", "更正", "联系", "公约"] }, { href: "index.html", label: "沙龙首页", words: ["首页", "沙龙", "节目", "内容", "厅"] }];
    const show = (prefix, route) => { clear(result); if (!route) { result.textContent = prefix; return; } result.append(document.createTextNode(prefix)); const link = document.createElement("a"); link.href = route.href; link.textContent = route.label; result.append(link, document.createTextNode("。")); }; input.addEventListener("input", () => show("输入已更改，按“查询场次”重新搜索。")); form.addEventListener("submit", (event) => { event.preventDefault(); const query = input.value.normalize("NFKC").trim(); if (!query) { show("请输入主题，例如“栏目”或“栏宽”。"); input.focus(); return; } if (unicodeLength(query) > 80) { show("搜索词不能超过 80 个 Unicode 字符。"); input.focus(); return; } const lower = query.toLocaleLowerCase(), route = routes.find((candidate) => candidate.words.some((word) => lower.includes(word))); show(route ? "最近的本地场次是：" : "没有完全匹配；建议先返回", route || routes[3]); });
  };

  initializeTheme(); initializeMenu(); initializeReading(); initializeCopies(); initializeGrid(); initializeSearch();
}());
