(function () {
  "use strict";
  const root = document.documentElement;
  const unicodeLength = (value) => [...value].length;
  const empty = (node) => { while (node && node.firstChild) node.firstChild.remove(); };
  const copyText = async (value, status, message) => {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else { const field = document.createElement("textarea"); field.value = value; field.setAttribute("readonly", ""); field.style.position = "fixed"; field.style.opacity = "0"; document.body.append(field); field.select(); const ok = document.execCommand("copy"); field.remove(); if (!ok) throw new Error("copy unavailable"); }
      if (status) status.textContent = message;
    } catch (_error) { if (status) status.textContent = "复制失败，请手动选择文字。"; }
  };

  const initializeTheme = () => {
    const toggles = [...document.querySelectorAll("[data-oi82-sky-toggle]")];
    if (!toggles.length) return;
    const apply = (value) => { const next = value === "exposed" ? "exposed" : "deep"; root.dataset.oi82Sky = next; toggles.forEach((toggle) => { toggle.setAttribute("aria-pressed", String(next === "exposed")); toggle.textContent = next === "exposed" ? "恢复深空" : "切换曝光"; }); };
    let saved = null; try { saved = localStorage.getItem("oi82-sky"); } catch (_error) { saved = null; }
    apply(saved || root.dataset.oi82Sky);
    toggles.forEach((toggle) => toggle.addEventListener("click", () => { const next = root.dataset.oi82Sky === "exposed" ? "deep" : "exposed"; apply(next); try { localStorage.setItem("oi82-sky", next); } catch (_error) { /* theme remains active */ } }));
  };

  const initializeMenu = () => {
    const button = document.querySelector(".oi82-menu"), nav = document.querySelector("#oi82-nav");
    if (!button || !nav) return;
    const set = (open, focusReturn) => { button.setAttribute("aria-expanded", String(open)); document.body.dataset.oi82Menu = open ? "open" : "closed"; const label = button.querySelector("span"); if (label) label.textContent = open ? "收起观测目录" : "展开观测目录"; if (open) { const first = nav.querySelector("a"); if (first) first.focus(); } else if (focusReturn) button.focus(); };
    button.addEventListener("click", () => set(button.getAttribute("aria-expanded") !== "true", false));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") set(false, true); });
    nav.addEventListener("click", (event) => { if (event.target.closest("a") && window.matchMedia("(max-width: 760px)").matches) set(false, false); });
  };

  const initializeReading = () => {
    const meter = document.querySelector("[data-oi82-progress]"), label = document.querySelector("[data-oi82-progress-label]");
    if (!meter || !label) return;
    const update = () => { const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); const value = Math.max(0, Math.min(100, Math.round((window.scrollY / max) * 100))); meter.style.setProperty("--oi82-progress", value + "%"); label.value = value + "%"; label.textContent = value + "%"; };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
  };

  const initializeCopies = () => {
    const handoff = document.querySelector("[data-oi82-copy-handoff]");
    if (handoff) handoff.addEventListener("click", () => copyText("内容观测交接\n1. 材料身份、位置与访问时间\n2. 本次使用的范围与口径\n3. 事实、推断、建议的分层\n4. 本次版本与变化类型\n5. 下一复核日和负责人", document.querySelector("[data-oi82-handoff-status]"), "交接格式已复制。"));
    const disclosure = document.querySelector("[data-oi82-disclosure]"), disclosureButton = document.querySelector("[data-oi82-copy-disclosure]");
    if (disclosure && disclosureButton) disclosureButton.addEventListener("click", () => copyText(disclosure.textContent.trim(), document.querySelector("[data-oi82-disclosure-status]"), "简短披露已复制。"));
  };

  const initializeCalibrator = () => {
    const form = document.querySelector("[data-oi82-coordinate-form]"); if (!form) return;
    const field = form.querySelector("#oi82-records"), errorNode = form.querySelector("[data-oi82-coordinate-error]"), statusNode = form.querySelector("[data-oi82-coordinate-status]");
    const report = document.querySelector(".oi82-coordinate-report"), stateNode = report.querySelector("[data-oi82-coordinate-state]"), recordNode = report.querySelector("[data-oi82-record-count]"), objectNode = report.querySelector("[data-oi82-object-count]"), positionNode = report.querySelector("[data-oi82-position-count]"), duplicateNode = report.querySelector("[data-oi82-duplicate-count]"), listNode = report.querySelector("[data-oi82-coordinate-items]"), noteNode = report.querySelector("[data-oi82-report-note]"), copyButton = report.querySelector("[data-oi82-copy-report]"), copyStatus = report.querySelector("[data-oi82-report-status]");
    const presets = {
      clean: "北极星 | 02:31:49 | +89:15:51\n天狼星 | 06:45:09 | -16:42:58\n织女星 | 18:36:56 | +38:47:01",
      duplicates: "巡天目标 A | 08:20:10 | +22:10:30\n巡天目标 a | 08:20:11 | +22:10:31\n巡天目标 B | 08:20:10 | +22:10:30",
      fullwidth: "ＮＧＣ８６９ ｜ ０２：１９：００ ｜ ＋５７：０８：００\nＮＧＣ８８４ ｜ ０２：２２：００ ｜ ＋５７：０８：００"
    };
    let lastReport = "";
    const groupBy = (rows, getter) => { const map = new Map(); rows.forEach((row) => { const key = getter(row); if (!map.has(key)) map.set(key, []); map.get(key).push(row); }); return [...map.entries()].filter((entry) => entry[1].length > 1); };
    const parse = () => {
      const raw = field.value; if (!raw.trim()) return { error: "请输入至少一条观测记录。" };
      if (unicodeLength(raw) > 12000) return { error: "总输入不能超过 12,000 个 Unicode 字符。" };
      const lines = raw.normalize("NFKC").replace(/−/g, "-").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (lines.length > 100) return { error: "非空记录不能超过 100 行。" };
      const rows = [];
      for (let index = 0; index < lines.length; index += 1) {
        const parts = lines[index].split("|").map((part) => part.trim());
        if (parts.length !== 3) return { error: "第 " + (index + 1) + " 行须且只能包含两个竖线。" };
        const name = parts[0], raText = parts[1], decText = parts[2];
        if (!name || unicodeLength(name) > 60) return { error: "第 " + (index + 1) + " 行的对象名须为 1–60 个 Unicode 字符。" };
        const ra = raText.match(/^(\d{2}):(\d{2}):(\d{2})$/);
        if (!ra) return { error: "第 " + (index + 1) + " 行的赤经须为 HH:MM:SS。" };
        const hour = Number(ra[1]), minute = Number(ra[2]), second = Number(ra[3]);
        if (hour > 23 || minute > 59 || second > 59) return { error: "第 " + (index + 1) + " 行的赤经超出 00:00:00–23:59:59。" };
        const dec = decText.match(/^([+-])(\d{2}):(\d{2}):(\d{2})$/);
        if (!dec) return { error: "第 " + (index + 1) + " 行的赤纬须为 ±DD:MM:SS。" };
        const degree = Number(dec[2]), arcMinute = Number(dec[3]), arcSecond = Number(dec[4]);
        if (degree > 90 || arcMinute > 59 || arcSecond > 59 || (degree === 90 && (arcMinute !== 0 || arcSecond !== 0))) return { error: "第 " + (index + 1) + " 行的赤纬超出 -90:00:00–+90:00:00。" };
        const raSeconds = hour * 3600 + minute * 60 + second, decSeconds = degree * 3600 + arcMinute * 60 + arcSecond;
        const raDegree = raSeconds * 15 / 3600, signedDecSeconds = decSeconds === 0 ? 0 : (dec[1] === "-" ? -decSeconds : decSeconds), decDegree = signedDecSeconds / 3600;
        rows.push({ line: index + 1, name, nameKey: name.toLocaleLowerCase(), raText, decText, raDegree, decDegree, coordinateKey: raSeconds + "|" + signedDecSeconds });
      }
      const nameGroups = groupBy(rows, (row) => row.nameKey), positionGroups = groupBy(rows, (row) => row.coordinateKey);
      const issues = [];
      nameGroups.forEach((entry) => issues.push({ kind: "对象重名", label: entry[1][0].name, text: "出现于第 " + entry[1].map((row) => row.line).join("、") + " 行。" }));
      positionGroups.forEach((entry) => issues.push({ kind: "坐标重复", label: entry[1][0].raText + " / " + entry[1][0].decText, text: "对应第 " + entry[1].map((row) => row.line).join("、") + " 行。" }));
      return { rows, issues, uniqueObjects: new Set(rows.map((row) => row.nameKey)).size, uniquePositions: new Set(rows.map((row) => row.coordinateKey)).size };
    };
    const appendItem = (label, text, kind) => { const item = document.createElement("li"), heading = document.createElement("b"), detail = document.createElement("span"); heading.textContent = label; detail.textContent = text; if (kind) item.dataset.kind = kind; item.append(heading, detail); listNode.append(item); };
    const fail = (message) => { errorNode.textContent = message; statusNode.textContent = "校准未完成。"; report.dataset.ready = "false"; stateNode.textContent = "INVALID"; [recordNode, objectNode, positionNode, duplicateNode].forEach((node) => { node.textContent = "0"; }); empty(listNode); appendItem("格式错误", message, "error"); noteNode.textContent = "请修正输入后重新校准；旧结果已失效。"; copyButton.disabled = true; copyStatus.textContent = ""; lastReport = ""; field.focus(); };
    const render = (result) => {
      errorNode.textContent = ""; report.dataset.ready = "true"; stateNode.textContent = result.issues.length ? "REVIEW" : "ALIGNED"; recordNode.textContent = String(result.rows.length); objectNode.textContent = String(result.uniqueObjects); positionNode.textContent = String(result.uniquePositions); duplicateNode.textContent = String(result.issues.length); empty(listNode);
      const entries = result.issues.map((issue) => ({ label: issue.kind + " · " + issue.label, text: issue.text, kind: "issue" }));
      result.rows.forEach((row) => entries.push({ label: row.name, text: "RA " + row.raDegree.toFixed(6) + "° · DEC " + (row.decDegree >= 0 ? "+" : "") + row.decDegree.toFixed(6) + "°", kind: "record" }));
      entries.slice(0, 30).forEach((entry) => appendItem(entry.label, entry.text, entry.kind));
      noteNode.textContent = entries.length > 30 ? "界面显示前 30 项；复制报告包含全部 " + entries.length + " 项。" : "已显示全部 " + entries.length + " 项；十进制度保留 6 位。";
      const reportLines = ["坐标归一报告", "记录：" + result.rows.length, "唯一对象：" + result.uniqueObjects, "唯一坐标：" + result.uniquePositions, "重复组：" + result.issues.length, ""];
      result.issues.forEach((issue) => reportLines.push("[" + issue.kind + "] " + issue.label + " — " + issue.text));
      if (result.issues.length) reportLines.push("");
      result.rows.forEach((row) => reportLines.push(row.name + " | RA " + row.raDegree.toFixed(6) + "° | DEC " + (row.decDegree >= 0 ? "+" : "") + row.decDegree.toFixed(6) + "°"));
      lastReport = reportLines.join("\n"); copyButton.disabled = false; copyStatus.textContent = ""; statusNode.textContent = result.issues.length ? "校准完成，发现 " + result.issues.length + " 个重复组。" : "校准完成，坐标格式一致。";
    };
    const stale = () => { errorNode.textContent = ""; statusNode.textContent = "输入已更改，请重新校准。"; report.dataset.ready = "false"; stateNode.textContent = "STALE"; copyButton.disabled = true; copyStatus.textContent = ""; lastReport = ""; };
    const reset = () => { errorNode.textContent = ""; statusNode.textContent = "等待输入观测记录。"; report.dataset.ready = "false"; stateNode.textContent = "UNSET"; [recordNode, objectNode, positionNode, duplicateNode].forEach((node) => { node.textContent = "0"; }); empty(listNode); appendItem("—", "校准后显示前 30 条归一坐标与重复提示。"); noteNode.textContent = "十进制度保留 6 位；本工具不连接星表，也不验证对象身份或历元。"; copyButton.disabled = true; copyStatus.textContent = ""; lastReport = ""; };
    form.addEventListener("submit", (event) => { event.preventDefault(); const result = parse(); if (result.error) fail(result.error); else render(result); });
    field.addEventListener("input", stale); form.addEventListener("reset", () => window.setTimeout(reset, 0));
    form.querySelectorAll("[data-oi82-preset]").forEach((button) => button.addEventListener("click", () => { field.value = presets[button.dataset.oi82Preset] || ""; stale(); field.focus(); }));
    copyButton.addEventListener("click", () => { if (lastReport) copyText(lastReport, copyStatus, "完整报告已复制。"); });
  };

  const initializeSearch = () => {
    const form = document.querySelector("[data-oi82-search]"); if (!form) return;
    const input = form.querySelector("#oi82-query"), result = form.querySelector("[data-oi82-search-result]");
    const routes = [{ href: "article.html", label: "观测方法", words: ["版本", "来源", "复核", "文章", "证据"] }, { href: "tool.html", label: "坐标归一台", words: ["坐标", "赤经", "赤纬", "工具", "换算"] }, { href: "legal.html", label: "台站说明", words: ["隐私", "披露", "更正", "联系", "边界"] }, { href: "index.html", label: "星历首页", words: ["首页", "轨道", "星历", "内容", "观测"] }];
    const show = (prefix, route) => { empty(result); if (!route) { result.textContent = prefix; return; } result.append(document.createTextNode(prefix)); const link = document.createElement("a"); link.href = route.href; link.textContent = route.label; result.append(link, document.createTextNode("。")); };
    input.addEventListener("input", () => show("输入已更改，按“重新捕获”搜索。"));
    form.addEventListener("submit", (event) => { event.preventDefault(); const query = input.value.normalize("NFKC").trim(); if (!query) { show("请输入主题，例如“版本”或“坐标”。"); input.focus(); return; } if (unicodeLength(query) > 80) { show("搜索词不能超过 80 个 Unicode 字符。"); input.focus(); return; } const lower = query.toLocaleLowerCase(); const route = routes.find((candidate) => candidate.words.some((word) => lower.includes(word))); show(route ? "最近的本地观测是：" : "没有完全匹配；建议先返回", route || routes[3]); });
  };

  initializeTheme(); initializeMenu(); initializeReading(); initializeCopies(); initializeCalibrator(); initializeSearch();
}());
