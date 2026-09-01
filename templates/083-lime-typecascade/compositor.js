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

  const initializeProofTheme = () => {
    const toggles = [...document.querySelectorAll("[data-tc83-proof-toggle]")]; if (!toggles.length) return;
    const apply = (value) => { const next = value === "paper" ? "paper" : "ink"; root.dataset.tc83Proof = next; toggles.forEach((toggle) => { toggle.setAttribute("aria-pressed", String(next === "paper")); toggle.textContent = next === "paper" ? "恢复黑墨" : "切换纸样"; }); };
    let saved = null; try { saved = localStorage.getItem("tc83-proof"); } catch (_error) { saved = null; }
    apply(saved || root.dataset.tc83Proof);
    toggles.forEach((toggle) => toggle.addEventListener("click", () => { const next = root.dataset.tc83Proof === "paper" ? "ink" : "paper"; apply(next); try { localStorage.setItem("tc83-proof", next); } catch (_error) { /* theme remains active */ } }));
  };

  const initializeMenu = () => {
    const button = document.querySelector(".tc83-menu"), nav = document.querySelector("#tc83-nav"); if (!button || !nav) return;
    const set = (open, refocus) => { button.setAttribute("aria-expanded", String(open)); document.body.dataset.tc83Menu = open ? "open" : "closed"; const text = button.querySelector("span"); if (text) text.textContent = open ? "收起版面目录" : "展开版面目录"; if (open) { const first = nav.querySelector("a"); if (first) first.focus(); } else if (refocus) button.focus(); };
    button.addEventListener("click", () => set(button.getAttribute("aria-expanded") !== "true", false));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") set(false, true); });
    nav.addEventListener("click", (event) => { if (event.target.closest("a") && window.matchMedia("(max-width: 760px)").matches) set(false, false); });
  };

  const initializeReading = () => {
    const meter = document.querySelector("[data-tc83-progress]"), label = document.querySelector("[data-tc83-progress-label]"); if (!meter || !label) return;
    const update = () => { const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); const value = Math.max(0, Math.min(100, Math.round(window.scrollY / max * 100))); meter.style.setProperty("--tc83-read", value + "%"); label.value = value + "%"; label.textContent = value + "%"; };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
  };

  const initializeCopies = () => {
    const handoff = document.querySelector("[data-tc83-copy-handoff]");
    if (handoff) handoff.addEventListener("click", () => copyText("标题层级交接\n1. 本页唯一 H1\n2. H2 回答主问题\n3. H3–H6 只在确有子结构时使用\n4. 向下层级不跳级\n5. 标题脱离正文仍可理解\n6. 视觉强调不冒充语义层级", document.querySelector("[data-tc83-handoff-status]"), "交接格式已复制。"));
    const disclosure = document.querySelector("[data-tc83-disclosure]"), button = document.querySelector("[data-tc83-copy-disclosure]");
    if (disclosure && button) button.addEventListener("click", () => copyText(disclosure.textContent.trim(), document.querySelector("[data-tc83-disclosure-status]"), "简短披露已复制。"));
  };

  const initializeProofer = () => {
    const form = document.querySelector("[data-tc83-outline-form]"); if (!form) return;
    const field = form.querySelector("#tc83-outline"), errorNode = form.querySelector("[data-tc83-outline-error]"), statusNode = form.querySelector("[data-tc83-outline-status]");
    const report = document.querySelector(".tc83-proof-report"), stateNode = report.querySelector("[data-tc83-outline-state]"), countNode = report.querySelector("[data-tc83-heading-count]"), depthNode = report.querySelector("[data-tc83-depth-count]"), uniqueNode = report.querySelector("[data-tc83-unique-count]"), issueNode = report.querySelector("[data-tc83-issue-count]"), listNode = report.querySelector("[data-tc83-outline-items]"), noteNode = report.querySelector("[data-tc83-report-note]"), copyButton = report.querySelector("[data-tc83-copy-report]"), copyStatus = report.querySelector("[data-tc83-report-status]");
    const presets = { clean: "1 | 页面主标题\n2 | 第一章\n3 | 第一章的子问题\n2 | 第二章\n3 | 第二章的子问题", issues: "2 | 没有主标题\n4 | 跳过第三级\n2 | 重复章节\n2 | 重复章节", fullwidth: "１ ｜ 页面主标题\n２ ｜ 第一章\n３ ｜ 子问题\n２ ｜ 第二章" };
    let lastReport = "";
    const parse = () => {
      const raw = field.value; if (!raw.trim()) return { error: "请输入至少一个标题。" };
      if (unicodeLength(raw) > 10000) return { error: "总输入不能超过 10,000 个 Unicode 字符。" };
      const lines = raw.normalize("NFKC").split(/\r?\n/).map((line) => line.trim()).filter(Boolean); if (lines.length > 120) return { error: "非空标题不能超过 120 行。" };
      const rows = [];
      for (let index = 0; index < lines.length; index += 1) {
        const parts = lines[index].split("|").map((part) => part.trim()); if (parts.length !== 2) return { error: "第 " + (index + 1) + " 行须且只能包含一个竖线。" };
        if (!/^[1-6]$/.test(parts[0])) return { error: "第 " + (index + 1) + " 行的层级只能是 1–6 的普通整数。" };
        if (!parts[1] || unicodeLength(parts[1]) > 100) return { error: "第 " + (index + 1) + " 行的标题须为 1–100 个 Unicode 字符。" };
        rows.push({ line: index + 1, level: Number(parts[0]), title: parts[1], key: parts[1].toLocaleLowerCase() });
      }
      const issues = [], h1Rows = rows.filter((row) => row.level === 1);
      if (h1Rows.length !== 1) issues.push({ label: "H1 数量", text: "应为 1 个，当前为 " + h1Rows.length + " 个。" });
      if (rows[0].level !== 1) issues.push({ label: "首项层级", text: "第 1 行应从 H1 开始，当前为 H" + rows[0].level + "。" });
      for (let index = 1; index < rows.length; index += 1) if (rows[index].level > rows[index - 1].level + 1) issues.push({ label: "层级跳跃", text: "第 " + rows[index - 1].line + " 行 H" + rows[index - 1].level + " → 第 " + rows[index].line + " 行 H" + rows[index].level + "。" });
      const groups = new Map(); rows.forEach((row) => { if (!groups.has(row.key)) groups.set(row.key, []); groups.get(row.key).push(row); });
      [...groups.values()].filter((group) => group.length > 1).forEach((group) => issues.push({ label: "重复标题 · " + group[0].title, text: "出现于第 " + group.map((row) => row.line).join("、") + " 行。" }));
      return { rows, issues, depth: Math.max(...rows.map((row) => row.level)), unique: groups.size };
    };
    const appendItem = (label, text, kind, level) => { const item = document.createElement("li"), heading = document.createElement("b"), detail = document.createElement("span"); heading.textContent = label; detail.textContent = text; if (kind) item.dataset.kind = kind; if (level) item.dataset.level = String(level); item.append(heading, detail); listNode.append(item); };
    const fail = (message) => { errorNode.textContent = message; statusNode.textContent = "校样未完成。"; report.dataset.ready = "false"; stateNode.textContent = "INVALID"; [countNode, depthNode, uniqueNode, issueNode].forEach((node) => { node.textContent = "0"; }); clear(listNode); appendItem("格式错误", message, "error"); noteNode.textContent = "请修正输入后重新校样；旧结果已失效。"; copyButton.disabled = true; copyStatus.textContent = ""; lastReport = ""; field.focus(); };
    const render = (result) => {
      errorNode.textContent = ""; report.dataset.ready = "true"; stateNode.textContent = result.issues.length ? "REVISE" : "PASS"; countNode.textContent = String(result.rows.length); depthNode.textContent = "H" + result.depth; uniqueNode.textContent = String(result.unique); issueNode.textContent = String(result.issues.length); clear(listNode);
      const entries = result.issues.map((issue) => ({ label: issue.label, text: issue.text, kind: "issue" })); result.rows.forEach((row) => entries.push({ label: "H" + row.level + " · " + row.title, text: "第 " + row.line + " 行", kind: "heading", level: row.level })); entries.slice(0, 40).forEach((entry) => appendItem(entry.label, entry.text, entry.kind, entry.level));
      noteNode.textContent = entries.length > 40 ? "界面显示前 40 项；复制报告包含全部 " + entries.length + " 项。" : "已显示全部 " + entries.length + " 项。";
      const lines = ["标题层级校样报告", "标题：" + result.rows.length, "最深层级：H" + result.depth, "唯一标题：" + result.unique, "问题：" + result.issues.length, ""]; result.issues.forEach((issue) => lines.push("[问题] " + issue.label + " — " + issue.text)); if (result.issues.length) lines.push(""); result.rows.forEach((row) => lines.push("  ".repeat(row.level - 1) + "H" + row.level + " | " + row.title)); lastReport = lines.join("\n"); copyButton.disabled = false; copyStatus.textContent = ""; statusNode.textContent = result.issues.length ? "校样完成，发现 " + result.issues.length + " 个问题。" : "校样完成，标题层级连续。";
    };
    const stale = () => { errorNode.textContent = ""; statusNode.textContent = "输入已更改，请重新校样。"; report.dataset.ready = "false"; stateNode.textContent = "STALE"; copyButton.disabled = true; copyStatus.textContent = ""; lastReport = ""; };
    const reset = () => { errorNode.textContent = ""; statusNode.textContent = "等待输入标题大纲。"; report.dataset.ready = "false"; stateNode.textContent = "UNSET"; [countNode, depthNode, uniqueNode, issueNode].forEach((node) => { node.textContent = "0"; }); clear(listNode); appendItem("—", "校样后显示前 40 个标题与问题。"); noteNode.textContent = "标题大小写不敏感归组；向上回退层级允许，向下最多增加一级。"; copyButton.disabled = true; copyStatus.textContent = ""; lastReport = ""; };
    form.addEventListener("submit", (event) => { event.preventDefault(); const result = parse(); if (result.error) fail(result.error); else render(result); }); field.addEventListener("input", stale); form.addEventListener("reset", () => window.setTimeout(reset, 0));
    form.querySelectorAll("[data-tc83-preset]").forEach((button) => button.addEventListener("click", () => { field.value = presets[button.dataset.tc83Preset] || ""; stale(); field.focus(); })); copyButton.addEventListener("click", () => { if (lastReport) copyText(lastReport, copyStatus, "完整报告已复制。"); });
  };

  const initializeSearch = () => {
    const form = document.querySelector("[data-tc83-search]"); if (!form) return; const input = form.querySelector("#tc83-query"), result = form.querySelector("[data-tc83-search-result]");
    const routes = [{ href: "article.html", label: "排印方法", words: ["标题", "层级", "文章", "排印", "阅读"] }, { href: "tool.html", label: "层级校样台", words: ["校样", "工具", "大纲", "重复", "跳级"] }, { href: "legal.html", label: "编辑声明", words: ["隐私", "披露", "更正", "联系", "声明"] }, { href: "index.html", label: "头版", words: ["首页", "头版", "栏目", "瀑布", "编辑"] }];
    const show = (prefix, route) => { clear(result); if (!route) { result.textContent = prefix; return; } result.append(document.createTextNode(prefix)); const link = document.createElement("a"); link.href = route.href; link.textContent = route.label; result.append(link, document.createTextNode("。")); };
    input.addEventListener("input", () => show("输入已更改，按“查找行号”重新搜索。")); form.addEventListener("submit", (event) => { event.preventDefault(); const query = input.value.normalize("NFKC").trim(); if (!query) { show("请输入主题，例如“标题”或“校样”。"); input.focus(); return; } if (unicodeLength(query) > 80) { show("搜索词不能超过 80 个 Unicode 字符。"); input.focus(); return; } const lower = query.toLocaleLowerCase(), route = routes.find((candidate) => candidate.words.some((word) => lower.includes(word))); show(route ? "最近的本地行号是：" : "没有完全匹配；建议先返回", route || routes[3]); });
  };

  initializeProofTheme(); initializeMenu(); initializeReading(); initializeCopies(); initializeProofer(); initializeSearch();
}());
