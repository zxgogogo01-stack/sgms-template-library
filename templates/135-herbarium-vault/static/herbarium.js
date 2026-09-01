(function () {
  "use strict";
  var root = document.documentElement;
  var toneToggle = document.querySelector("[data-hb135-tone-toggle]");
  var toneKey = "hb135-cabinet-tone";
  function text(node, value) { if (node) node.textContent = value; }
  function storedTone() { try { return localStorage.getItem(toneKey); } catch (error) { return null; } }
  function saveTone(value) { try { localStorage.setItem(toneKey, value); } catch (error) { return; } }
  function paintTone(value) {
    var mode = value === "vault" ? "vault" : "paper";
    root.dataset.hb135Tone = mode;
    if (toneToggle) { toneToggle.setAttribute("aria-pressed", String(mode === "vault")); text(toneToggle, mode === "vault" ? "返回日光阅览" : "切换夜间柜藏"); }
    var meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = mode === "vault" ? "#14221b" : "#e9e3cf";
  }
  paintTone(storedTone() || root.dataset.hb135Tone || "paper");
  if (toneToggle) toneToggle.addEventListener("click", function () { var next = root.dataset.hb135Tone === "vault" ? "paper" : "vault"; paintTone(next); saveTone(next); });

  var progress = document.querySelector(".hb135-progress");
  if (progress) { var update = function () { var maximum = document.documentElement.scrollHeight - innerHeight; progress.value = maximum > 0 ? Math.min(100, Math.max(0, scrollY / maximum * 100)) : 100; }; addEventListener("scroll", update, { passive: true }); addEventListener("resize", update); update(); }

  function copy(value, status, success) {
    if (!value) return;
    var fallback = function () { var area = document.createElement("textarea"); area.value = value; area.style.position = "fixed"; area.style.opacity = "0"; document.body.appendChild(area); area.select(); var okay = false; try { okay = document.execCommand("copy"); } catch (error) { okay = false; } area.remove(); text(status, okay ? success : "复制失败，请手动选择文字。"); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(value).then(function () { text(status, success); }, fallback); else fallback();
  }
  var copyStory = document.querySelector("[data-hb135-copy-story]"); var copyPolicy = document.querySelector("[data-hb135-copy-policy]");
  if (copyStory) copyStory.addEventListener("click", function () { copy("植物档案交接：现场、许可、压制、可见结构、名称依据、鉴定状态与入藏号逐项记录；真实物种、保管、种子活力、生态、权利和发布批准另行确认。", document.querySelector("[data-hb135-copy-status]"), "采集札记摘要已复制。"); });
  if (copyPolicy) copyPolicy.addEventListener("click", function () { copy("植物档案边界：页面只提供档案框架和文字计数汇总；采集许可、物种鉴定、标本处理、种子实验、种植生态、影像权利与发布由对应责任人另行核验。", document.querySelector("[data-hb135-copy-status]"), "植物档案边界已复制。"); });
  document.querySelectorAll(".hb135-drawers details").forEach(function (detail) { detail.addEventListener("toggle", function () { if (detail.open) document.querySelectorAll(".hb135-drawers details").forEach(function (other) { if (other !== detail) other.open = false; }); }); });

  var search = document.querySelector("[data-hb135-search]");
  if (search) {
    var clue = document.getElementById("hb135-clue"); var searchStatus = document.querySelector("[data-hb135-search-status]");
    search.addEventListener("submit", function (event) {
      event.preventDefault(); var raw = clue.value.normalize("NFKC").trim(); text(searchStatus, "");
      if (!raw) { text(searchStatus, "请输入馆藏线索。"); clue.focus(); return; }
      if (Array.from(raw).length > 80) { text(searchStatus, "线索最多 80 个 Unicode 字符。"); clue.focus(); return; }
      var route = ""; var message = "";
      if (/标本|叶片|采集|压制|馆藏|札记/.test(raw)) { route = "article.html"; message = "已找到植物采集札记，正在打开。"; }
      else if (/种子|播种|发芽|批次|异常|计算/.test(raw)) { route = "tool.html"; message = "已找到种子观察台，正在打开。"; }
      else if (/许可|物种|生态|权利|边界/.test(raw)) { route = "legal.html"; message = "已找到植物档案边界，正在打开。"; }
      if (route) { text(searchStatus, message); location.href = route; } else text(searchStatus, "没有匹配标本。请返回馆藏首页查看现有抽屉。");
    });
  }

  var form = document.querySelector("[data-hb135-batch-form]"); if (!form) return;
  var input = document.getElementById("hb135-rows"); var errorNode = document.querySelector("[data-hb135-error]"); var formStatus = document.querySelector("[data-hb135-form-status]"); var report = document.querySelector(".hb135-report"); var stateNode = document.querySelector("[data-hb135-report-state]"); var rateNode = document.querySelector("[data-hb135-rate]"); var totalNode = document.querySelector("[data-hb135-total]"); var batchCount = document.querySelector("[data-hb135-batch-count]"); var sownCount = document.querySelector("[data-hb135-sown-count]"); var observationCount = document.querySelector("[data-hb135-observation-count]"); var statusCount = document.querySelector("[data-hb135-status-count]"); var findingSummary = document.querySelector("[data-hb135-finding-summary]"); var findingList = document.querySelector("[data-hb135-finding-list]"); var batchSummary = document.querySelector("[data-hb135-batch-summary]"); var batchList = document.querySelector("[data-hb135-batch-list]"); var note = document.querySelector("[data-hb135-note]"); var copyReport = document.querySelector("[data-hb135-copy-report]"); var copyStatus = document.querySelector("[data-hb135-copy-status]"); var currentReport = "";
  var presets = {
    sealed: "春季甲批 | 100 | 87 | 0 | 封存\n春季乙批 | 80 | 68 | 0 | 封存",
    small: "玻璃皿甲 | 12 | 9 | 0 | 封存\n玻璃皿乙 | 18 | 14 | 0 | 封存",
    anomaly: "温室甲批 | 80 | 65 | 3 | 封存\n温室乙批 | 100 | 78 | 2 | 封存",
    review: "复核甲批 | 12 | 9 | 1 | 观察\n复核乙批 | 100 | 81 | 0 | 复核"
  };
  function count(value) { return Array.from(value).length; }
  function normalize(value) { return value.normalize("NFKC").trim().replace(/\s+/gu, " "); }
  function key(value) { return normalize(value).toLocaleLowerCase(); }
  function forbidden(value) { return /[\p{Cc}\p{Cf}]/u.test(value); }
  function batchName(raw, line) { if (forbidden(raw)) throw new Error("第 " + line + " 行的批次不能包含 Unicode 控制或格式字符。"); var value = normalize(raw); if (count(value) < 2 || count(value) > 24) throw new Error("第 " + line + " 行的批次须为 2–24 个 Unicode 字符。"); return value; }
  function integer(raw, label, line, allowZero) { var value = raw.trim(); var pattern = allowZero ? /^(?:0|[1-9]\d{0,4}|100000)$/ : /^(?:[1-9]\d{0,4}|100000)$/; if (!pattern.test(value)) throw new Error("第 " + line + " 行的" + label + "须为 " + (allowZero ? "0–100000" : "1–100000") + " 的普通十进制整数，不能有符号或前导零。"); return BigInt(value); }
  function parse(raw) {
    if (count(raw) > 6000) throw new Error("种子批次记录最多 6000 个 Unicode 字符。");
    var lines = raw.split(/\r?\n/).map(function (value, index) { return { value: value, line: index + 1 }; }).filter(function (item) { return item.value.trim() !== ""; });
    if (lines.length < 2 || lines.length > 120) throw new Error("请输入 2–120 条非空种子批次记录。");
    var names = new Map(); var exact = new Map(); var records = [];
    lines.forEach(function (item) {
      var exactKey = item.value.normalize("NFKC").trim().replace(/\s+/gu, " ").toLocaleLowerCase(); if (exact.has(exactKey)) throw new Error("第 " + item.line + " 行与第 " + exact.get(exactKey) + " 行是完全重复记录。"); exact.set(exactKey, item.line);
      var fields = item.value.split("|"); if (fields.length !== 5) throw new Error("第 " + item.line + " 行须严格包含 5 个字段。");
      var name = batchName(fields[0], item.line); var nameKey = key(name); if (names.has(nameKey)) throw new Error("第 " + item.line + " 行与第 " + names.get(nameKey) + " 行使用重复批次“" + name + "”。");
      var sown = integer(fields[1], "播种数", item.line, false); var germinated = integer(fields[2], "发芽数", item.line, true); var abnormal = integer(fields[3], "异常数", item.line, true); var status = fields[4].normalize("NFKC").trim();
      if (!/^(?:观察|复核|封存)$/.test(status)) throw new Error("第 " + item.line + " 行的状态须为观察、复核或封存。");
      if (germinated + abnormal > sown) throw new Error("第 " + item.line + " 行的发芽数与异常数之和不能超过播种数。");
      names.set(nameKey, item.line); records.push({ line: item.line, name: name, sown: sown, germinated: germinated, abnormal: abnormal, status: status });
    }); return records;
  }
  function percent(part, total) { var scaled = (part * 10000n + total / 2n) / total; return (scaled / 100n) + "." + String(scaled % 100n).padStart(2, "0") + "%"; }
  function analyze(records) {
    var sown = 0n; var germinated = 0n; var abnormal = 0n; var observations = []; var statuses = []; var batches = [];
    records.forEach(function (record) {
      sown += record.sown; germinated += record.germinated; abnormal += record.abnormal;
      var rate = percent(record.germinated, record.sown); var dormant = record.sown - record.germinated - record.abnormal; batches.push({ record: record, rate: rate, dormant: dormant });
      if (record.sown < 20n) observations.push(record.name + "：播种数为 " + record.sown + "，低于 20 的小样本提示；是否足够须结合实验设计判断。");
      if (record.abnormal > 0n) observations.push(record.name + "：记录 " + record.abnormal + " 粒异常，请核对异常定义、处置与原始观察。");
      if (record.status !== "封存") statuses.push(record.name + "：第 " + record.line + " 行状态为“" + record.status + "”，尚未封存。");
    });
    return { sown: sown, germinated: germinated, abnormal: abnormal, rate: percent(germinated, sown), observations: observations, statuses: statuses, findings: observations.concat(statuses), batches: batches };
  }
  function add(parent, tag, value) { var node = document.createElement(tag); node.textContent = value; parent.appendChild(node); return node; }
  function clear() {
    report.dataset.ready = "false"; text(stateNode, "UNSET"); text(rateNode, "—"); text(totalNode, "等待计算"); text(batchCount, "0"); text(sownCount, "0"); text(observationCount, "0"); text(statusCount, "0"); text(findingSummary, "等待计算"); findingList.replaceChildren(); add(findingList, "li", "报告生成后在此显示小样本、异常与档案状态提示。"); text(batchSummary, "等待计算"); batchList.replaceChildren(); add(batchList, "p", "等待批次记录。"); copyReport.disabled = true; text(copyStatus, ""); currentReport = "";
  }
  function render(records, data) {
    var state = "VAULT CLEAR"; if (data.observations.length && data.statuses.length) state = "REVIEW " + data.findings.length; else if (data.observations.length) state = "OBSERVATION HINTS " + data.observations.length; else if (data.statuses.length) state = "STATUS FLAGS " + data.statuses.length;
    report.dataset.ready = "true"; text(stateNode, state); text(rateNode, data.rate); text(totalNode, "发芽 " + data.germinated + " / 播种 " + data.sown + " · 异常 " + data.abnormal); text(batchCount, String(records.length)); text(sownCount, String(data.sown)); text(observationCount, String(data.observations.length)); text(statusCount, String(data.statuses.length));
    text(findingSummary, data.findings.length ? data.findings.length + " 条观察与状态提示" : "无观察与状态提示"); findingList.replaceChildren(); if (!data.findings.length) add(findingList, "li", "所有批次样本量不少于 20、异常数为 0，且状态均已封存。"); data.findings.slice(0, 40).forEach(function (finding) { add(findingList, "li", finding); }); if (data.findings.length > 40) add(findingList, "li", "界面仅显示前 40 条；完整复制报告保留全部 " + data.findings.length + " 条提示。");
    text(batchSummary, records.length + " 个批次明细"); batchList.replaceChildren(); data.batches.slice(0, 40).forEach(function (item, index) { var card = document.createElement("article"); card.className = "hb135-batch-card"; add(card, "b", String(index + 1).padStart(2, "0")); var middle = document.createElement("div"); add(middle, "strong", item.record.name); add(middle, "small", "发芽 " + item.record.germinated + " / " + item.record.sown + " · " + item.rate + " · 未发芽/未异常 " + item.dormant); card.appendChild(middle); add(card, "span", "异常 " + item.record.abnormal + " · " + item.record.status); batchList.appendChild(card); }); if (records.length > 40) add(batchList, "p", "界面仅显示前 40 个批次；完整复制报告保留全部 " + records.length + " 个批次。");
    var lines = ["种子批次文字观察报告", "状态：" + state, "加权总发芽比例：" + data.rate, "发芽：" + data.germinated + "｜播种：" + data.sown + "｜异常：" + data.abnormal, "批次：" + records.length + "｜观察提示：" + data.observations.length + "｜状态提示：" + data.statuses.length, "", "提示："]; if (!data.findings.length) lines.push("- 无观察与状态提示。"); data.findings.forEach(function (finding) { lines.push("- " + finding); }); lines.push("", "批次："); data.batches.forEach(function (item, index) { lines.push(String(index + 1).padStart(3, "0") + ". " + item.record.name + "｜播种 " + item.record.sown + "｜发芽 " + item.record.germinated + "｜异常 " + item.record.abnormal + "｜未发芽/未异常 " + item.dormant + "｜" + item.rate + "｜" + item.record.status); }); lines.push("", note.textContent.trim()); currentReport = lines.join("\n"); copyReport.disabled = false; text(copyStatus, ""); text(formStatus, "报告已生成；真实物种、实验设计、种子活力、生态风险与发布批准仍须另行确认。");
  }
  function stale() { if (report.dataset.ready === "true") { clear(); text(formStatus, "输入已改变，请重新生成报告。"); } text(errorNode, ""); }
  form.addEventListener("submit", function (event) { event.preventDefault(); text(errorNode, ""); try { var records = parse(input.value); render(records, analyze(records)); } catch (error) { clear(); text(errorNode, error.message); text(formStatus, "请修正输入后重新生成。"); input.focus(); } });
  form.addEventListener("reset", function () { setTimeout(function () { clear(); text(errorNode, ""); text(formStatus, "等待至少两个种子批次。"); }, 0); }); input.addEventListener("input", stale);
  document.querySelectorAll("[data-hb135-preset]").forEach(function (button) { button.addEventListener("click", function () { var value = presets[button.dataset.hb135Preset]; if (!value) return; input.value = value; stale(); input.focus(); }); });
  copyReport.addEventListener("click", function () { copy(currentReport, copyStatus, "完整种子观察报告已复制。"); });
}());
