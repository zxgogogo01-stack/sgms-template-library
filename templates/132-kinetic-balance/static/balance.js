(function () {
  "use strict";
  var root = document.documentElement;
  var toggle = document.querySelector("[data-kb132-tone-toggle]");
  var storageKey = "kb132-tone";

  function text(node, value) { if (node) node.textContent = value; }
  function stored() { try { return localStorage.getItem(storageKey); } catch (error) { return null; } }
  function store(value) { try { localStorage.setItem(storageKey, value); } catch (error) { return; } }
  function paint(value) {
    var tone = value === "night" ? "night" : "gallery";
    root.dataset.kb132Tone = tone;
    if (toggle) { toggle.setAttribute("aria-pressed", String(tone === "night")); text(toggle, tone === "night" ? "返回日场" : "切换夜场"); }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = tone === "night" ? "#111217" : "#f1efe8";
  }
  paint(stored() || root.dataset.kb132Tone || "gallery");
  if (toggle) toggle.addEventListener("click", function () { var next = root.dataset.kb132Tone === "night" ? "gallery" : "night"; paint(next); store(next); });

  var progress = document.querySelector(".kb132-progress");
  if (progress) {
    var update = function () { var maximum = document.documentElement.scrollHeight - innerHeight; progress.value = maximum > 0 ? Math.min(100, Math.max(0, scrollY / maximum * 100)) : 100; };
    addEventListener("scroll", update, { passive: true }); addEventListener("resize", update); update();
  }

  function copy(value, status, success) {
    if (!value) return;
    var fallback = function () {
      var area = document.createElement("textarea"); area.value = value; area.style.position = "fixed"; area.style.opacity = "0"; document.body.appendChild(area); area.select();
      var okay = false; try { okay = document.execCommand("copy"); } catch (error) { okay = false; } area.remove(); text(status, okay ? success : "复制失败，请手动选择文字。");
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(value).then(function () { text(status, success); }, fallback); else fallback();
  }

  var story = document.querySelector("[data-kb132-copy-story]");
  var policy = document.querySelector("[data-kb132-copy-policy]");
  if (story) story.addEventListener("click", function () { copy("悬衡作品交接：构件、轴点、侧向、距离、质量、状态与版本逐项对应；真实测量、样机、材料、连接、动力、现场、权利与安装批准另行确认。", document.querySelector("[data-kb132-copy-status]"), "悬衡交接摘要已复制。"); });
  if (policy) policy.addEventListener("click", function () { copy("悬衡责任边界：页面只处理文字距离、质量、侧向与文档状态；真实测量、材料、连接、动力、吊装、场地、作品权利与发布由对应责任人另行核验。", document.querySelector("[data-kb132-copy-status]"), "责任边界摘要已复制。"); });

  document.querySelectorAll("kb132-boundary-beam details").forEach(function (detail) {
    detail.addEventListener("toggle", function () { if (detail.open) document.querySelectorAll("kb132-boundary-beam details").forEach(function (other) { if (other !== detail) other.open = false; }); });
  });

  var search = document.querySelector("[data-kb132-search]");
  if (search) {
    var clue = document.getElementById("kb132-clue"); var searchStatus = document.querySelector("[data-kb132-search-status]");
    search.addEventListener("submit", function (event) {
      event.preventDefault(); var raw = clue.value.normalize("NFKC").trim(); text(searchStatus, "");
      if (!raw) { text(searchStatus, "请输入悬衡线索。"); clue.focus(); return; }
      if (Array.from(raw).length > 80) { text(searchStatus, "线索最多 80 个 Unicode 字符。"); clue.focus(); return; }
      var route = ""; var message = "";
      if (/空气|悬衡|雕塑|轴点|札记/.test(raw)) { route = "article.html"; message = "已找到悬衡研究札记，正在打开。"; }
      else if (/力矩|配重|距离|质量|工具/.test(raw)) { route = "tool.html"; message = "已找到悬衡力矩台，正在打开。"; }
      else if (/安装|材料|权利|版权|责任|边界/.test(raw)) { route = "legal.html"; message = "已找到悬衡责任边界，正在打开。"; }
      if (route) { text(searchStatus, message); location.href = route; } else text(searchStatus, "没有匹配构件。请返回悬衡展厅查看现有档案。");
    });
  }

  var form = document.querySelector("[data-kb132-moment-form]");
  if (!form) return;
  var input = document.getElementById("kb132-rows"); var errorNode = document.querySelector("[data-kb132-error]"); var formStatus = document.querySelector("[data-kb132-form-status]"); var report = document.querySelector(".kb132-output");
  var stateNode = document.querySelector("[data-kb132-report-state]"); var partCount = document.querySelector("[data-kb132-part-count]"); var rowCount = document.querySelector("[data-kb132-row-count]"); var momentCount = document.querySelector("[data-kb132-moment-count]"); var statusCount = document.querySelector("[data-kb132-status-count]");
  var findingSummary = document.querySelector("[data-kb132-finding-summary]"); var findingList = document.querySelector("[data-kb132-finding-list]"); var partSummary = document.querySelector("[data-kb132-part-summary]"); var partList = document.querySelector("[data-kb132-part-list]"); var note = document.querySelector("[data-kb132-note]"); var copyReport = document.querySelector("[data-kb132-copy-report]"); var copyStatus = document.querySelector("[data-kb132-copy-status]"); var currentReport = "";
  var presets = {
    balanced: "上层横杆 | 左 | 24 | 120 | 锁定\n上层横杆 | 右 | 30 | 96 | 锁定\n下层弧杆 | 左 | 18 | 80 | 锁定\n下层弧杆 | 右 | 16 | 90 | 锁定",
    offset: "蓝色横杆 | 左 | 24 | 120 | 锁定\n蓝色横杆 | 右 | 30 | 80 | 锁定\n蓝色横杆 | 右 | 8 | 20 | 锁定",
    oneside: "红色翼片 | 左 | 20 | 110 | 锁定\n红色翼片 | 左 | 35 | 40 | 锁定",
    review: "上层横杆 | 左 | 24 | 120 | 复核\n上层横杆 | 右 | 30 | 80 | 草案\n下层弧杆 | 左 | 18 | 80 | 锁定\n下层弧杆 | 右 | 16 | 90 | 锁定"
  };

  function count(value) { return Array.from(value).length; }
  function key(value) { return value.normalize("NFKC").trim().replace(/\s+/gu, " ").toLocaleLowerCase(); }
  function forbidden(value) { return /[\p{Cc}\p{Cf}]/u.test(value); }
  function component(raw, line) {
    if (forbidden(raw)) throw new Error("第 " + line + " 行的构件不能包含 Unicode 控制或格式字符。");
    var value = raw.normalize("NFKC").trim().replace(/\s+/gu, " ");
    if (count(value) < 2 || count(value) > 24) throw new Error("第 " + line + " 行的构件须为 2–24 个 Unicode 字符。");
    return value;
  }
  function decimal(raw, label, maximum, line) {
    var value = raw.normalize("NFKC").trim();
    if (!/^(?:0\.[1-9]|[1-9]\d*(?:\.\d)?)$/.test(value)) throw new Error("第 " + line + " 行的" + label + "须为正的普通十进制，最多一位小数，不能有符号或前导零。");
    var parts = value.split("."); var scaled = Number(parts[0]) * 10 + Number(parts[1] || "0");
    if (scaled > maximum * 10) throw new Error("第 " + line + " 行的" + label + "不能超过 " + maximum + "。");
    return scaled;
  }
  function parse(raw) {
    if (count(raw) > 6000) throw new Error("悬衡构件记录最多 6000 个 Unicode 字符。");
    var lines = raw.split(/\r?\n/).map(function (value, index) { return { value: value, line: index + 1 }; }).filter(function (item) { return item.value.trim() !== ""; });
    if (lines.length < 2 || lines.length > 120) throw new Error("请输入 2–120 条非空构件记录。");
    var seen = new Set(); var records = [];
    lines.forEach(function (item) {
      var fields = item.value.normalize("NFKC").split("|");
      if (fields.length !== 5) throw new Error("第 " + item.line + " 行须严格包含 5 个字段。");
      var name = component(fields[0], item.line); var partKey = key(name); var side = fields[1].trim(); var distance = decimal(fields[2], "距轴", 999.9, item.line); var mass = decimal(fields[3], "质量", 9999.9, item.line); var status = fields[4].trim();
      if (!/^(?:左|右)$/.test(side)) throw new Error("第 " + item.line + " 行的侧向须为左或右。");
      if (!/^(?:草案|复核|锁定)$/.test(status)) throw new Error("第 " + item.line + " 行的状态须为草案、复核或锁定。");
      var unique = [partKey, side, distance, mass, status].join("\u0001");
      if (seen.has(unique)) throw new Error("第 " + item.line + " 行与已有构件记录完全重复。");
      seen.add(unique); records.push({ line: item.line, name: name, partKey: partKey, side: side, distance: distance, mass: mass, status: status, moment: distance * mass });
    });
    return records;
  }
  function pct(diff, maximum) { return Math.round(diff * 1000 / maximum) / 10; }
  function number(value) { var out = (value / 100).toFixed(2); return out.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1"); }
  function analyze(records) {
    var groups = new Map(); var momentFlags = []; var statusFlags = []; var findings = [];
    records.forEach(function (record) {
      if (!groups.has(record.partKey)) groups.set(record.partKey, { key: record.partKey, name: record.name, records: [], left: 0, right: 0, flags: [], statusFlags: [] });
      var group = groups.get(record.partKey); group.records.push(record); group[record.side === "左" ? "left" : "right"] += record.moment;
      if (record.status !== "锁定") { group.statusFlags.push(record); statusFlags.push(record); }
    });
    var parts = Array.from(groups.values());
    parts.forEach(function (part) {
      if (!part.left || !part.right) part.flags.push(part.name + "：只有" + (part.left ? "左" : "右") + "侧记录，无法比较两侧力矩。");
      else {
        var high = Math.max(part.left, part.right); var difference = pct(Math.abs(part.left - part.right), high);
        if (difference > 5) part.flags.push(part.name + "：左右力矩相对偏差为 " + difference.toFixed(1) + "% ，超过 5% 文字容差。左 " + number(part.left) + "，右 " + number(part.right) + " g·cm。");
      }
      part.flags.forEach(function (flag) { momentFlags.push(flag); findings.push(flag); });
      part.statusFlags.forEach(function (record) { findings.push(record.name + "：第 " + record.line + " 行为“" + record.status + "”，尚未锁定。" ); });
    });
    return { parts: parts, momentFlags: momentFlags, statusFlags: statusFlags, findings: findings };
  }
  function add(parent, tag, value) { var node = document.createElement(tag); node.textContent = value; parent.appendChild(node); return node; }
  function clear() {
    report.dataset.ready = "false"; text(stateNode, "UNSET"); text(partCount, "0"); text(rowCount, "0"); text(momentCount, "0"); text(statusCount, "0"); text(findingSummary, "等待计算"); findingList.replaceChildren(); add(findingList, "li", "报告生成后在此显示单侧、偏差与状态提示。"); text(partSummary, "等待计算"); partList.replaceChildren(); add(partList, "p", "等待构件记录。"); copyReport.disabled = true; text(copyStatus, ""); currentReport = "";
  }
  function render(records, data) {
    var state = "BALANCED";
    if (data.momentFlags.length && data.statusFlags.length) state = "REVIEW " + data.findings.length;
    else if (data.momentFlags.length) state = "MOMENT FLAGS " + data.momentFlags.length;
    else if (data.statusFlags.length) state = "STATUS FLAGS " + data.statusFlags.length;
    report.dataset.ready = "true"; text(stateNode, state); text(partCount, String(data.parts.length)); text(rowCount, String(records.length)); text(momentCount, String(data.momentFlags.length)); text(statusCount, String(data.statusFlags.length));
    text(findingSummary, data.findings.length ? data.findings.length + " 条机械提示" : "无机械提示"); findingList.replaceChildren();
    if (!data.findings.length) add(findingList, "li", "所有构件均有左右记录，相对偏差不超过 5%，且全部状态已锁定。");
    data.findings.slice(0, 40).forEach(function (finding) { add(findingList, "li", finding); });
    if (data.findings.length > 40) add(findingList, "li", "界面仅显示前 40 条；完整复制报告保留全部 " + data.findings.length + " 条提示。");
    text(partSummary, data.parts.length + " 个构件"); partList.replaceChildren();
    data.parts.slice(0, 40).forEach(function (part, index) {
      var card = document.createElement("article"); add(card, "b", String(index + 1).padStart(2, "0")); add(card, "strong", part.name); add(card, "small", "L " + number(part.left) + " / R " + number(part.right) + " g·cm"); add(card, "span", "MOMENT " + part.flags.length + " · UNLOCKED " + part.statusFlags.length); partList.appendChild(card);
    });
    if (data.parts.length > 40) add(partList, "p", "界面仅显示前 40 个构件；完整复制报告保留全部 " + data.parts.length + " 个构件。");
    var lines = ["悬衡力矩文字审计报告", "状态：" + state, "构件：" + data.parts.length + "｜记录：" + records.length + "｜力矩提示：" + data.momentFlags.length + "｜未锁定：" + data.statusFlags.length, "", "提示："];
    if (!data.findings.length) lines.push("- 无机械提示。"); data.findings.forEach(function (finding) { lines.push("- " + finding); }); lines.push("", "构件：");
    data.parts.forEach(function (part, index) { lines.push(String(index + 1).padStart(3, "0") + ". " + part.name + "｜左 " + number(part.left) + "｜右 " + number(part.right) + " g·cm｜力矩提示 " + part.flags.length + "｜未锁定 " + part.statusFlags.length); });
    lines.push("", "原始记录："); records.forEach(function (record, index) { lines.push(String(index + 1).padStart(3, "0") + ". " + record.name + "｜" + record.side + "｜距轴 " + (record.distance / 10) + " cm｜质量 " + (record.mass / 10) + " g｜" + record.status); }); lines.push("", note.textContent.trim());
    currentReport = lines.join("\n"); copyReport.disabled = false; text(copyStatus, ""); text(formStatus, "报告已生成，仍须核对真实测量、样机、材料、连接、动力、吊装、场地、权利与发布批准。");
  }
  function stale() { if (report.dataset.ready === "true") { clear(); text(formStatus, "输入已改变，请重新生成报告。"); } text(errorNode, ""); }
  form.addEventListener("submit", function (event) { event.preventDefault(); text(errorNode, ""); try { var records = parse(input.value); render(records, analyze(records)); } catch (error) { clear(); text(errorNode, error.message); text(formStatus, "请修正输入后重新生成。"); input.focus(); } });
  form.addEventListener("reset", function () { setTimeout(function () { clear(); text(errorNode, ""); text(formStatus, "等待至少两条构件记录。"); }, 0); });
  input.addEventListener("input", stale);
  document.querySelectorAll("[data-kb132-preset]").forEach(function (button) { button.addEventListener("click", function () { var value = presets[button.dataset.kb132Preset]; if (!value) return; input.value = value; stale(); input.focus(); }); });
  copyReport.addEventListener("click", function () { copy(currentReport, copyStatus, "完整悬衡力矩报告已复制。"); });
}());
