(function () {
  "use strict";
  var root = document.documentElement;
  var toggle = document.querySelector("[data-dr131-room-toggle]");
  var storageKey = "dr131-room";

  function text(node, value) {
    if (node) node.textContent = value;
  }

  function stored() {
    try { return localStorage.getItem(storageKey); } catch (error) { return null; }
  }

  function store(value) {
    try { localStorage.setItem(storageKey, value); } catch (error) { return; }
  }

  function paint(value) {
    var room = value === "safe" ? "safe" : "dark";
    root.dataset.dr131Room = room;
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(room === "safe"));
      text(toggle, room === "safe" ? "关闭安全灯" : "开启安全灯");
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = room === "safe" ? "#260705" : "#10100f";
  }

  paint(stored() || root.dataset.dr131Room || "dark");
  if (toggle) toggle.addEventListener("click", function () {
    var next = root.dataset.dr131Room === "safe" ? "dark" : "safe";
    paint(next);
    store(next);
  });

  var progress = document.querySelector(".dr131-progress");
  if (progress) {
    var update = function () {
      var maximum = document.documentElement.scrollHeight - innerHeight;
      progress.value = maximum > 0 ? Math.min(100, Math.max(0, scrollY / maximum * 100)) : 100;
    };
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();
  }

  function copy(value, status, success) {
    if (!value) return;
    var fallback = function () {
      var area = document.createElement("textarea");
      area.value = value;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      var okay = false;
      try { okay = document.execCommand("copy"); } catch (error) { okay = false; }
      area.remove();
      text(status, okay ? success : "复制失败，请手动选择文字。");
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(value).then(function () { text(status, success); }, fallback);
    else fallback();
  }

  var story = document.querySelector("[data-dr131-copy-story]");
  var policy = document.querySelector("[data-dr131-copy-policy]");
  if (story) story.addEventListener("click", function () {
    copy("胶卷审片交接：胶卷、帧号、冲洗批次、选择、档案状态与版本逐项对应；原底、扫描、冲洗、人物、作品、版权与发布批准另行确认。", document.querySelector("[data-dr131-copy-status]"), "审片交接摘要已复制。");
  });
  if (policy) policy.addEventListener("click", function () {
    copy("底片权利边界：页面和工具只记录文字胶卷、整数帧号、冲洗批次、选择与档案状态；真实底片、扫描、暗房、人物、场地、作品、版权与发布由对应责任人另行核验。", document.querySelector("[data-dr131-copy-status]"), "底片边界摘要已复制。");
  });

  document.querySelectorAll(".dr131-rights-board details").forEach(function (detail) {
    detail.addEventListener("toggle", function () {
      if (detail.open) document.querySelectorAll(".dr131-rights-board details").forEach(function (other) {
        if (other !== detail) other.open = false;
      });
    });
  });

  var search = document.querySelector("[data-dr131-search]");
  if (search) {
    var clue = document.getElementById("dr131-clue");
    var searchStatus = document.querySelector("[data-dr131-search-status]");
    search.addEventListener("submit", function (event) {
      event.preventDefault();
      var raw = clue.value.normalize("NFKC").trim();
      text(searchStatus, "");
      if (!raw) { text(searchStatus, "请输入暗房线索。"); clue.focus(); return; }
      if (Array.from(raw).length > 80) { text(searchStatus, "线索最多 80 个 Unicode 字符。"); clue.focus(); return; }
      var route = "";
      var message = "";
      if (/印样|底片|暗房|选片|文章/.test(raw)) { route = "article.html"; message = "已找到接触印样札记，正在打开。"; }
      else if (/帧序|帧号|胶卷|审片|清单/.test(raw)) { route = "tool.html"; message = "已找到帧序审片台，正在打开。"; }
      else if (/版权|权利|肖像|授权|边界/.test(raw)) { route = "legal.html"; message = "已找到底片权利边界，正在打开。"; }
      if (route) { text(searchStatus, message); location.href = route; }
      else text(searchStatus, "没有匹配帧号。请返回接触印样查看现有档案。");
    });
  }

  var form = document.querySelector("[data-dr131-frame-form]");
  if (!form) return;

  var input = document.getElementById("dr131-rows");
  var errorNode = document.querySelector("[data-dr131-error]");
  var formStatus = document.querySelector("[data-dr131-form-status]");
  var report = document.querySelector(".dr131-report");
  var stateNode = document.querySelector("[data-dr131-report-state]");
  var rollCount = document.querySelector("[data-dr131-roll-count]");
  var rowCount = document.querySelector("[data-dr131-row-count]");
  var sequenceCount = document.querySelector("[data-dr131-sequence-count]");
  var statusCount = document.querySelector("[data-dr131-status-count]");
  var findingSummary = document.querySelector("[data-dr131-finding-summary]");
  var findingList = document.querySelector("[data-dr131-finding-list]");
  var rollSummary = document.querySelector("[data-dr131-roll-summary]");
  var rollList = document.querySelector("[data-dr131-roll-list]");
  var note = document.querySelector("[data-dr131-note]");
  var copyReport = document.querySelector("[data-dr131-copy-report]");
  var copyStatus = document.querySelector("[data-dr131-copy-status]");
  var currentReport = "";
  var presets = {
    ready: "ROLL A | 1 | DEV 04 | 不选 | 归档\nROLL A | 2 | DEV 04 | 备选 | 归档\nROLL A | 3 | DEV 04 | 精选 | 归档",
    reverse: "ROLL B | 1 | DEV 05 | 不选 | 归档\nROLL B | 4 | DEV 05 | 备选 | 归档\nROLL B | 2 | DEV 05 | 精选 | 归档",
    duplicate: "ROLL C | 1 | DEV 06 | 不选 | 归档\nROLL C | 2 | DEV 06 | 备选 | 归档\nROLL C | 2 | DEV 07 | 精选 | 归档",
    review: "ROLL D | 1 | DEV 08 | 不选 | 归档\nROLL D | 3 | DEV 08 | 备选 | 复核\nROLL D | 2 | DEV 08 | 精选 | 草片"
  };

  function count(value) { return Array.from(value).length; }
  function key(value) { return value.normalize("NFKC").trim().replace(/\s+/gu, " ").toLocaleLowerCase(); }
  function forbidden(value) { return /[\p{Cc}\p{Cf}]/u.test(value); }
  function normalized(raw, label, line) {
    if (forbidden(raw)) throw new Error("第 " + line + " 行的" + label + "不能包含 Unicode 控制或格式字符。");
    var value = raw.normalize("NFKC").trim().replace(/\s+/gu, " ");
    if (count(value) < 2 || count(value) > 24) throw new Error("第 " + line + " 行的" + label + "须为 2–24 个 Unicode 字符。");
    return value;
  }
  function frameNumber(raw, line) {
    var value = raw.normalize("NFKC").trim();
    if (!/^(?:[1-9]\d*)$/.test(value) || Number(value) > 120) throw new Error("第 " + line + " 行的帧号须为 1–120 的普通十进制整数，不能有符号或前导零。");
    return Number(value);
  }
  function parse(raw) {
    if (count(raw) > 6000) throw new Error("胶卷帧序记录最多 6000 个 Unicode 字符。");
    var lines = raw.split(/\r?\n/).map(function (value, index) { return { value: value, line: index + 1 }; }).filter(function (item) { return item.value.trim() !== ""; });
    if (lines.length < 2 || lines.length > 120) throw new Error("请输入 2–120 条非空帧序记录。");
    var seen = new Set();
    var records = [];
    lines.forEach(function (item) {
      var fields = item.value.normalize("NFKC").split("|");
      if (fields.length !== 5) throw new Error("第 " + item.line + " 行须严格包含 5 个字段。");
      var roll = normalized(fields[0], "胶卷", item.line);
      var rollKey = key(roll);
      var frame = frameNumber(fields[1], item.line);
      var batch = normalized(fields[2], "冲洗批次", item.line);
      var batchKey = key(batch);
      var choice = fields[3].trim();
      var status = fields[4].trim();
      if (!/^(?:不选|备选|精选)$/.test(choice)) throw new Error("第 " + item.line + " 行的选择须为不选、备选或精选。");
      if (!/^(?:草片|复核|归档)$/.test(status)) throw new Error("第 " + item.line + " 行的状态须为草片、复核或归档。");
      var unique = [rollKey, frame, batchKey, choice, status].join("\u0001");
      if (seen.has(unique)) throw new Error("第 " + item.line + " 行与已有帧序记录完全重复。");
      seen.add(unique);
      records.push({ line: item.line, roll: roll, rollKey: rollKey, frame: frame, batch: batch, choice: choice, status: status });
    });
    return records;
  }

  function analyze(records) {
    var groups = new Map();
    var sequenceFlags = [];
    var statusFlags = [];
    var findings = [];
    records.forEach(function (record) {
      if (!groups.has(record.rollKey)) groups.set(record.rollKey, { key: record.rollKey, name: record.roll, records: [], flags: [], statusFlags: [] });
      var group = groups.get(record.rollKey);
      group.records.push(record);
      if (record.status !== "归档") { group.statusFlags.push(record); statusFlags.push(record); }
    });
    var rolls = Array.from(groups.values()).sort(function (left, right) { return left.key.localeCompare(right.key); });
    rolls.forEach(function (roll) {
      var previous = null;
      var frameLines = new Map();
      roll.records.forEach(function (record) {
        if (frameLines.has(record.frame)) roll.flags.push(roll.name + "：第 " + record.line + " 行帧号 " + record.frame + " 与第 " + frameLines.get(record.frame) + " 行重复。");
        else frameLines.set(record.frame, record.line);
        if (previous !== null && record.frame < previous) roll.flags.push(roll.name + "：第 " + record.line + " 行帧号 " + record.frame + " 早于前一条帧号 " + previous + "，输入顺序回退。");
        else if (previous !== null && record.frame > previous + 1) roll.flags.push(roll.name + "：帧号 " + previous + " 与 " + record.frame + " 之间跳过 " + (record.frame - previous - 1) + " 帧。");
        previous = record.frame;
      });
      roll.flags.forEach(function (flag) { sequenceFlags.push(flag); findings.push(flag); });
      roll.statusFlags.forEach(function (record) { findings.push(record.roll + "：第 " + record.line + " 行帧号 " + record.frame + " 状态为“" + record.status + "”，尚未归档。"); });
    });
    return { rolls: rolls, sequenceFlags: sequenceFlags, statusFlags: statusFlags, findings: findings };
  }

  function add(parent, tag, value) { var node = document.createElement(tag); node.textContent = value; parent.appendChild(node); return node; }
  function clear() {
    report.dataset.ready = "false";
    text(stateNode, "UNSET"); text(rollCount, "0"); text(rowCount, "0"); text(sequenceCount, "0"); text(statusCount, "0");
    text(findingSummary, "等待计算"); findingList.replaceChildren(); add(findingList, "li", "报告生成后在此显示回退、重复、跳号与状态提示。");
    text(rollSummary, "等待计算"); rollList.replaceChildren(); add(rollList, "p", "等待胶卷记录。");
    copyReport.disabled = true; text(copyStatus, ""); currentReport = "";
  }
  function render(records, data) {
    var state = "ROLL READY";
    if (data.sequenceFlags.length && data.statusFlags.length) state = "REVIEW " + data.findings.length;
    else if (data.sequenceFlags.length) state = "SEQUENCE FLAGS " + data.sequenceFlags.length;
    else if (data.statusFlags.length) state = "STATUS FLAGS " + data.statusFlags.length;
    report.dataset.ready = "true"; text(stateNode, state); text(rollCount, String(data.rolls.length)); text(rowCount, String(records.length)); text(sequenceCount, String(data.sequenceFlags.length)); text(statusCount, String(data.statusFlags.length));
    text(findingSummary, data.findings.length ? data.findings.length + " 条机械提示" : "无机械提示"); findingList.replaceChildren();
    if (!data.findings.length) add(findingList, "li", "每卷帧号严格连续递增，没有重复帧，且所有记录已归档。");
    data.findings.slice(0, 40).forEach(function (finding) { add(findingList, "li", finding); });
    if (data.findings.length > 40) add(findingList, "li", "界面仅显示前 40 条；完整复制报告保留全部 " + data.findings.length + " 条提示。");
    text(rollSummary, data.rolls.length + " 卷胶卷"); rollList.replaceChildren();
    data.rolls.slice(0, 40).forEach(function (roll, index) {
      var card = document.createElement("article"); add(card, "b", String(index + 1).padStart(2, "0")); add(card, "strong", roll.name); add(card, "small", roll.records.length + " FRAMES / " + roll.records[0].frame + "–" + roll.records[roll.records.length - 1].frame); add(card, "span", "SEQUENCE " + roll.flags.length + " · UNARCHIVED " + roll.statusFlags.length); rollList.appendChild(card);
    });
    if (data.rolls.length > 40) add(rollList, "p", "界面仅显示前 40 卷；完整复制报告保留全部 " + data.rolls.length + " 卷胶卷。");
    var lines = ["胶卷帧序机械审计报告", "状态：" + state, "胶卷：" + data.rolls.length + "｜帧数：" + records.length + "｜帧序提示：" + data.sequenceFlags.length + "｜待定状态：" + data.statusFlags.length, "", "提示："];
    if (!data.findings.length) lines.push("- 无机械提示。"); data.findings.forEach(function (finding) { lines.push("- " + finding); }); lines.push("", "胶卷：");
    data.rolls.forEach(function (roll, index) { lines.push(String(index + 1).padStart(3, "0") + ". " + roll.name + "｜帧数 " + roll.records.length + "｜范围 " + roll.records[0].frame + "–" + roll.records[roll.records.length - 1].frame + "｜帧序提示 " + roll.flags.length + "｜待定 " + roll.statusFlags.length); });
    lines.push("", "帧序记录："); records.forEach(function (record, index) { lines.push(String(index + 1).padStart(3, "0") + ". " + record.roll + "｜帧 " + record.frame + "｜" + record.batch + "｜" + record.choice + "｜" + record.status); }); lines.push("", note.textContent.trim());
    currentReport = lines.join("\n"); copyReport.disabled = false; text(copyStatus, ""); text(formStatus, "报告已生成，仍须核对原底、扫描、冲洗、影像、人物、场地、作品、版权、版本与发布批准。");
  }
  function stale() { if (report.dataset.ready === "true") { clear(); text(formStatus, "输入已改变，请重新生成报告。"); } text(errorNode, ""); }
  form.addEventListener("submit", function (event) { event.preventDefault(); text(errorNode, ""); try { var records = parse(input.value); render(records, analyze(records)); } catch (error) { clear(); text(errorNode, error.message); text(formStatus, "请修正输入后重新生成。"); input.focus(); } });
  form.addEventListener("reset", function () { setTimeout(function () { clear(); text(errorNode, ""); text(formStatus, "等待至少两条帧序记录。"); }, 0); });
  input.addEventListener("input", stale);
  document.querySelectorAll("[data-dr131-preset]").forEach(function (button) { button.addEventListener("click", function () { var value = presets[button.dataset.dr131Preset]; if (!value) return; input.value = value; stale(); input.focus(); }); });
  copyReport.addEventListener("click", function () { copy(currentReport, copyStatus, "完整胶卷帧序报告已复制。"); });
}());
