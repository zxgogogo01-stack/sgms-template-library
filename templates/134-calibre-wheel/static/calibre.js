(function () {
  "use strict";

  var root = document.documentElement;
  var lightToggle = document.querySelector("[data-cw134-light-toggle]");
  var lightKey = "cw134-inspection-light";

  function setText(node, value) { if (node) node.textContent = value; }
  function readStoredLight() { try { return localStorage.getItem(lightKey); } catch (error) { return null; } }
  function storeLight(value) { try { localStorage.setItem(lightKey, value); } catch (error) { return; } }
  function applyLight(value) {
    var mode = value === "bench" ? "bench" : "night";
    root.dataset.cw134Light = mode;
    if (lightToggle) {
      lightToggle.setAttribute("aria-pressed", String(mode === "bench"));
      setText(lightToggle, mode === "bench" ? "关闭检修光" : "开启检修光");
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = mode === "bench" ? "#e9e4d8" : "#071019";
  }

  applyLight(readStoredLight() || root.dataset.cw134Light || "night");
  if (lightToggle) lightToggle.addEventListener("click", function () {
    var next = root.dataset.cw134Light === "bench" ? "night" : "bench";
    applyLight(next);
    storeLight(next);
  });

  var progress = document.querySelector(".cw134-progress");
  if (progress) {
    var updateProgress = function () {
      var maximum = document.documentElement.scrollHeight - innerHeight;
      progress.value = maximum > 0 ? Math.min(100, Math.max(0, scrollY / maximum * 100)) : 100;
    };
    addEventListener("scroll", updateProgress, { passive: true });
    addEventListener("resize", updateProgress);
    updateProgress();
  }

  function copyText(value, status, success) {
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
      setText(status, okay ? success : "复制失败，请手动选择文字。");
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(function () { setText(status, success); }, fallback);
    } else fallback();
  }

  var copyStory = document.querySelector("[data-cw134-copy-story]");
  var copyPolicy = document.querySelector("[data-cw134-copy-policy]");
  if (copyStory) copyStory.addEventListener("click", function () {
    copyText("机芯札记交接：动力、齿数关系、啮合方向、文档状态与验证边界逐项记录；真实模数、中心距、齿形、材料、润滑、公差、装配、计时表现、制造安全与发布批准另行确认。", document.querySelector("[data-cw134-copy-status]"), "机芯札记摘要已复制。");
  });
  if (copyPolicy) copyPolicy.addEventListener("click", function () {
    copyText("制表责任边界：页面只处理文字齿数关系、名义旋向、公因数接触提示与文档状态；几何、材料、润滑、装配、制造、计时、性能、权利和发布须由对应责任人另行核验。", document.querySelector("[data-cw134-copy-status]"), "责任边界摘要已复制。");
  });

  document.querySelectorAll(".cw134-boundary-list details").forEach(function (detail) {
    detail.addEventListener("toggle", function () {
      if (!detail.open) return;
      document.querySelectorAll(".cw134-boundary-list details").forEach(function (other) {
        if (other !== detail) other.open = false;
      });
    });
  });

  var search = document.querySelector("[data-cw134-search]");
  if (search) {
    var clue = document.getElementById("cw134-clue");
    var searchStatus = document.querySelector("[data-cw134-search-status]");
    search.addEventListener("submit", function (event) {
      event.preventDefault();
      var raw = clue.value.normalize("NFKC").trim();
      setText(searchStatus, "");
      if (!raw) { setText(searchStatus, "请输入档案线索。"); clue.focus(); return; }
      if (Array.from(raw).length > 80) { setText(searchStatus, "线索最多 80 个 Unicode 字符。"); clue.focus(); return; }
      var route = "";
      var message = "";
      if (/机芯|齿列|擒纵|轮系|札记/.test(raw)) { route = "article.html"; message = "已找到机芯札记，正在打开。"; }
      else if (/传动比|齿数|啮合|方向|计算/.test(raw)) { route = "tool.html"; message = "已找到轮系校核台，正在打开。"; }
      else if (/材料|润滑|装配|计时|权利|边界/.test(raw)) { route = "legal.html"; message = "已找到制表责任边界，正在打开。"; }
      if (route) { setText(searchStatus, message); location.href = route; }
      else setText(searchStatus, "没有匹配档案。请返回轮系首页查看现有章节。");
    });
  }

  var form = document.querySelector("[data-cw134-train-form]");
  if (!form) return;

  var input = document.getElementById("cw134-rows");
  var errorNode = document.querySelector("[data-cw134-error]");
  var formStatus = document.querySelector("[data-cw134-form-status]");
  var report = document.querySelector(".cw134-report");
  var stateNode = document.querySelector("[data-cw134-report-state]");
  var stageCount = document.querySelector("[data-cw134-stage-count]");
  var externalCount = document.querySelector("[data-cw134-external-count]");
  var contactCount = document.querySelector("[data-cw134-contact-count]");
  var statusCount = document.querySelector("[data-cw134-status-count]");
  var ratioNode = document.querySelector("[data-cw134-ratio]");
  var directionNode = document.querySelector("[data-cw134-direction]");
  var findingSummary = document.querySelector("[data-cw134-finding-summary]");
  var findingList = document.querySelector("[data-cw134-finding-list]");
  var stageSummary = document.querySelector("[data-cw134-stage-summary]");
  var stageList = document.querySelector("[data-cw134-stage-list]");
  var note = document.querySelector("[data-cw134-note]");
  var copyReport = document.querySelector("[data-cw134-copy-report]");
  var copyStatus = document.querySelector("[data-cw134-copy-status]");
  var currentReport = "";

  var presets = {
    coprime: "发条至中心 | 17 | 43 | 外啮合 | 锁定\n中心至三轮 | 19 | 47 | 外啮合 | 锁定",
    contact: "发条至中心 | 18 | 42 | 外啮合 | 锁定\n中心至三轮 | 20 | 50 | 内啮合 | 锁定",
    reverse: "发条至中心 | 17 | 43 | 外啮合 | 锁定\n中心至三轮 | 19 | 47 | 内啮合 | 锁定",
    review: "发条至中心 | 18 | 42 | 外啮合 | 草图\n中心至三轮 | 19 | 47 | 外啮合 | 复核"
  };

  function unicodeLength(value) { return Array.from(value).length; }
  function normalizeLabel(value) { return value.normalize("NFKC").trim().replace(/\s+/gu, " "); }
  function labelKey(value) { return normalizeLabel(value).toLocaleLowerCase(); }
  function forbidden(value) { return /[\p{Cc}\p{Cf}]/u.test(value); }
  function greatestCommonDivisor(a, b) { while (b !== 0n) { var remainder = a % b; a = b; b = remainder; } return a; }
  function stageName(raw, line) {
    if (forbidden(raw)) throw new Error("第 " + line + " 行的级位不能包含 Unicode 控制或格式字符。");
    var value = normalizeLabel(raw);
    if (unicodeLength(value) < 2 || unicodeLength(value) > 24) throw new Error("第 " + line + " 行的级位须为 2–24 个 Unicode 字符。");
    return value;
  }
  function toothCount(raw, label, line) {
    var value = raw.trim();
    if (!/^(?:[6-9]|[1-9]\d|1\d{2}|2[0-3]\d|240)$/.test(value)) throw new Error("第 " + line + " 行的" + label + "须为 6–240 的普通十进制整数，不能有符号或前导零。");
    return BigInt(value);
  }
  function parse(raw) {
    if (unicodeLength(raw) > 6000) throw new Error("轮系记录最多 6000 个 Unicode 字符。");
    var lines = raw.split(/\r?\n/).map(function (value, index) { return { value: value, line: index + 1 }; }).filter(function (item) { return item.value.trim() !== ""; });
    if (lines.length < 2 || lines.length > 120) throw new Error("请输入 2–120 条非空轮系级位记录。");
    var names = new Map();
    var exact = new Map();
    var records = [];
    lines.forEach(function (item) {
      var exactKey = item.value.normalize("NFKC").trim().replace(/\s+/gu, " ").toLocaleLowerCase();
      if (exact.has(exactKey)) throw new Error("第 " + item.line + " 行与第 " + exact.get(exactKey) + " 行是完全重复记录。");
      exact.set(exactKey, item.line);
      var fields = item.value.split("|");
      if (fields.length !== 5) throw new Error("第 " + item.line + " 行须严格包含 5 个字段。");
      var name = stageName(fields[0], item.line);
      var nameKey = labelKey(name);
      if (names.has(nameKey)) throw new Error("第 " + item.line + " 行与第 " + names.get(nameKey) + " 行使用重复级位“" + name + "”。");
      var driver = toothCount(fields[1], "主动齿", item.line);
      var driven = toothCount(fields[2], "从动齿", item.line);
      var mesh = fields[3].normalize("NFKC").trim();
      var status = fields[4].normalize("NFKC").trim();
      if (!/^(?:外啮合|内啮合)$/.test(mesh)) throw new Error("第 " + item.line + " 行的啮合须为外啮合或内啮合。");
      if (!/^(?:草图|复核|锁定)$/.test(status)) throw new Error("第 " + item.line + " 行的状态须为草图、复核或锁定。");
      names.set(nameKey, item.line);
      records.push({ line: item.line, name: name, driver: driver, driven: driven, mesh: mesh, status: status });
    });
    return records;
  }

  function reduced(numerator, denominator) {
    var divisor = greatestCommonDivisor(numerator, denominator);
    return { numerator: numerator / divisor, denominator: denominator / divisor };
  }
  function analyze(records) {
    var numerator = 1n;
    var denominator = 1n;
    var external = 0;
    var contacts = [];
    var statuses = [];
    var stages = [];
    records.forEach(function (record) {
      var part = reduced(record.driver, record.driven);
      numerator *= part.numerator;
      denominator *= part.denominator;
      var total = reduced(numerator, denominator);
      numerator = total.numerator;
      denominator = total.denominator;
      if (record.mesh === "外啮合") external += 1;
      var shared = greatestCommonDivisor(record.driver, record.driven);
      stages.push({ record: record, numerator: part.numerator, denominator: part.denominator, shared: shared });
      if (shared > 1n) contacts.push(record.name + "：主动 " + record.driver + " 齿与从动 " + record.driven + " 齿的公因数为 " + shared + "，可能形成 " + shared + " 个重复接触组；请结合真实几何与制造方案复核。");
      if (record.status !== "锁定") statuses.push(record.name + "：第 " + record.line + " 行状态为“" + record.status + "”，尚未锁定。" );
    });
    return { numerator: numerator, denominator: denominator, external: external, contacts: contacts, statuses: statuses, findings: contacts.concat(statuses), stages: stages, direction: external % 2 ? "反向" : "同向" };
  }

  function appendText(parent, tag, value) { var node = document.createElement(tag); node.textContent = value; parent.appendChild(node); return node; }
  function clearReport() {
    report.dataset.ready = "false";
    setText(stateNode, "UNSET");
    setText(stageCount, "0");
    setText(externalCount, "0");
    setText(contactCount, "0");
    setText(statusCount, "0");
    setText(ratioNode, "—");
    setText(directionNode, "等待计算");
    setText(findingSummary, "等待计算");
    findingList.replaceChildren();
    appendText(findingList, "li", "报告生成后在此显示接触循环与文档状态提示。");
    setText(stageSummary, "等待计算");
    stageList.replaceChildren();
    appendText(stageList, "p", "等待级位记录。");
    copyReport.disabled = true;
    setText(copyStatus, "");
    currentReport = "";
  }
  function render(records, data) {
    var state = "TRAIN CLEAR";
    if (data.contacts.length && data.statuses.length) state = "REVIEW " + data.findings.length;
    else if (data.contacts.length) state = "CONTACT HINTS " + data.contacts.length;
    else if (data.statuses.length) state = "STATUS FLAGS " + data.statuses.length;
    var ratio = data.numerator + " / " + data.denominator;
    report.dataset.ready = "true";
    setText(stateNode, state);
    setText(stageCount, String(records.length));
    setText(externalCount, String(data.external));
    setText(contactCount, String(data.contacts.length));
    setText(statusCount, String(data.statuses.length));
    setText(ratioNode, ratio);
    setText(directionNode, "输出相对输入：" + data.direction + " · " + data.external + " 次外啮合");
    setText(findingSummary, data.findings.length ? data.findings.length + " 条机械文档提示" : "无机械文档提示");
    findingList.replaceChildren();
    if (!data.findings.length) appendText(findingList, "li", "所有齿对互素、旋向可计算，且级位状态均已锁定。");
    data.findings.slice(0, 40).forEach(function (finding) { appendText(findingList, "li", finding); });
    if (data.findings.length > 40) appendText(findingList, "li", "界面仅显示前 40 条；完整复制报告保留全部 " + data.findings.length + " 条提示。");
    setText(stageSummary, records.length + " 级传动明细");
    stageList.replaceChildren();
    data.stages.slice(0, 40).forEach(function (stage, index) {
      var card = document.createElement("article");
      card.className = "cw134-stage-card";
      appendText(card, "b", String(index + 1).padStart(2, "0"));
      var middle = document.createElement("div");
      appendText(middle, "strong", stage.record.name);
      appendText(middle, "small", stage.record.driver + " ÷ " + stage.record.driven + " = " + stage.numerator + " / " + stage.denominator);
      card.appendChild(middle);
      appendText(card, "span", stage.record.mesh + " · " + stage.record.status + " · GCD " + stage.shared);
      stageList.appendChild(card);
    });
    if (records.length > 40) appendText(stageList, "p", "界面仅显示前 40 级；完整复制报告保留全部 " + records.length + " 级。");
    var lines = ["轮系传动机械审计报告", "状态：" + state, "总传动比（输出 / 输入）：" + ratio, "方向：" + data.direction + "｜外啮合：" + data.external, "级位：" + records.length + "｜接触提示：" + data.contacts.length + "｜状态提示：" + data.statuses.length, "", "提示："];
    if (!data.findings.length) lines.push("- 无机械文档提示。");
    data.findings.forEach(function (finding) { lines.push("- " + finding); });
    lines.push("", "级位：");
    data.stages.forEach(function (stage, index) { lines.push(String(index + 1).padStart(3, "0") + ". " + stage.record.name + "｜" + stage.record.driver + " ÷ " + stage.record.driven + " = " + stage.numerator + " / " + stage.denominator + "｜" + stage.record.mesh + "｜GCD " + stage.shared + "｜" + stage.record.status); });
    lines.push("", note.textContent.trim());
    currentReport = lines.join("\n");
    copyReport.disabled = false;
    setText(copyStatus, "");
    setText(formStatus, "报告已生成；真实几何、材料、润滑、装配、计时、制造安全与发布批准仍须另行确认。");
  }
  function markStale() {
    if (report.dataset.ready === "true") { clearReport(); setText(formStatus, "输入已改变，请重新生成报告。"); }
    setText(errorNode, "");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    setText(errorNode, "");
    try { var records = parse(input.value); render(records, analyze(records)); }
    catch (error) { clearReport(); setText(errorNode, error.message); setText(formStatus, "请修正输入后重新生成。"); input.focus(); }
  });
  form.addEventListener("reset", function () {
    setTimeout(function () { clearReport(); setText(errorNode, ""); setText(formStatus, "等待至少两条轮系级位记录。"); }, 0);
  });
  input.addEventListener("input", markStale);
  document.querySelectorAll("[data-cw134-preset]").forEach(function (button) {
    button.addEventListener("click", function () {
      var value = presets[button.dataset.cw134Preset];
      if (!value) return;
      input.value = value;
      markStale();
      input.focus();
    });
  });
  copyReport.addEventListener("click", function () { copyText(currentReport, copyStatus, "完整轮系报告已复制。"); });
}());
