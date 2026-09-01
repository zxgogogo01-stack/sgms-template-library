(function () {
  "use strict";

  var root = document.documentElement;
  var lightToggle = document.querySelector("[data-pc130-light-toggle]");
  var lightKey = "pc130-light";

  function setText(node, value) {
    if (node) node.textContent = value;
  }

  function readLight() {
    try {
      return localStorage.getItem(lightKey);
    } catch (error) {
      return null;
    }
  }

  function saveLight(value) {
    try {
      localStorage.setItem(lightKey, value);
    } catch (error) {
      return;
    }
  }

  function paintLight(value) {
    var mode = value === "night" ? "night" : "polar";
    root.dataset.pc130Light = mode;
    if (lightToggle) {
      lightToggle.setAttribute("aria-pressed", String(mode === "night"));
      setText(lightToggle, mode === "night" ? "返回极昼" : "切入极夜");
    }
    var theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.content = mode === "night" ? "#07191f" : "#e8f0f2";
  }

  paintLight(readLight() || root.dataset.pc130Light || "polar");
  if (lightToggle) {
    lightToggle.addEventListener("click", function () {
      var next = root.dataset.pc130Light === "night" ? "polar" : "night";
      paintLight(next);
      saveLight(next);
    });
  }

  var progress = document.querySelector(".pc130-progress");
  if (progress) {
    var updateProgress = function () {
      var maximum = document.documentElement.scrollHeight - innerHeight;
      progress.value = maximum > 0 ? Math.min(100, Math.max(0, (scrollY / maximum) * 100)) : 100;
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
      try {
        okay = document.execCommand("copy");
      } catch (error) {
        okay = false;
      }
      area.remove();
      setText(status, okay ? success : "复制失败，请手动选择文字。");
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(function () {
        setText(status, success);
      }, fallback);
    } else {
      fallback();
    }
  }

  var storyCopy = document.querySelector("[data-pc130-copy-story]");
  var policyCopy = document.querySelector("[data-pc130-copy-policy]");
  if (storyCopy) {
    storyCopy.addEventListener("click", function () {
      copyText("冰芯剖面交接：现场坐标、芯段编号、起止深度、年代标签、档案状态与版本逐项对应；原始样品、冷链、实验证据、权利与发布批准另行确认。", document.querySelector("[data-pc130-copy-status]"), "剖面交接摘要已复制。");
    });
  }
  if (policyCopy) {
    policyCopy.addEventListener("click", function () {
      copyText("冰芯保管边界：页面和工具只记录文字芯段、十进制深度、年代标签与档案状态；真实现场、样品、冷链、实验、解读、权利与发布由对应责任人另行核验。", document.querySelector("[data-pc130-copy-status]"), "保管边界摘要已复制。");
    });
  }

  document.querySelectorAll(".pc130-custody-list details").forEach(function (detail) {
    detail.addEventListener("toggle", function () {
      if (!detail.open) return;
      document.querySelectorAll(".pc130-custody-list details").forEach(function (other) {
        if (other !== detail) other.open = false;
      });
    });
  });

  var search = document.querySelector("[data-pc130-search]");
  if (search) {
    var clue = document.getElementById("pc130-clue");
    var searchStatus = document.querySelector("[data-pc130-search-status]");
    search.addEventListener("submit", function (event) {
      event.preventDefault();
      var raw = clue.value.normalize("NFKC").trim();
      setText(searchStatus, "");
      if (!raw) {
        setText(searchStatus, "请输入档案线索。");
        clue.focus();
        return;
      }
      if (Array.from(raw).length > 80) {
        setText(searchStatus, "线索最多 80 个 Unicode 字符。");
        clue.focus();
        return;
      }
      var route = "";
      var message = "";
      if (/冰芯|剖面|气泡|年代/.test(raw)) {
        route = "article.html";
        message = "已找到冰芯剖面，正在打开。";
      } else if (/深度|芯段|区间|登记|审计/.test(raw)) {
        route = "tool.html";
        message = "已找到深度登记台，正在打开。";
      } else if (/边界|保管|冷链|实验|权利/.test(raw)) {
        route = "legal.html";
        message = "已找到保管边界，正在打开。";
      }
      if (route) {
        setText(searchStatus, message);
        location.href = route;
      } else {
        setText(searchStatus, "没有匹配芯段。请返回现场首页查看现有档案。");
      }
    });
  }

  var register = document.querySelector("[data-pc130-register-form]");
  if (!register) return;

  var input = document.getElementById("pc130-rows");
  var errorNode = document.querySelector("[data-pc130-error]");
  var formStatus = document.querySelector("[data-pc130-form-status]");
  var output = document.querySelector(".pc130-output");
  var stateNode = document.querySelector("[data-pc130-report-state]");
  var coreCount = document.querySelector("[data-pc130-core-count]");
  var rowCount = document.querySelector("[data-pc130-row-count]");
  var intervalCount = document.querySelector("[data-pc130-interval-count]");
  var statusCount = document.querySelector("[data-pc130-status-count]");
  var findingSummary = document.querySelector("[data-pc130-finding-summary]");
  var findingList = document.querySelector("[data-pc130-finding-list]");
  var coreSummary = document.querySelector("[data-pc130-core-summary]");
  var coreList = document.querySelector("[data-pc130-core-list]");
  var note = document.querySelector("[data-pc130-note]");
  var copyReport = document.querySelector("[data-pc130-copy-report]");
  var copyStatus = document.querySelector("[data-pc130-copy-status]");
  var currentReport = "";

  var presets = {
    continuous: "CORE A | 0 | 12.5 | SURFACE | 封存\nCORE A | 12.5 | 29 | FIRN | 封存\nCORE A | 29 | 51.25 | BUBBLE | 封存",
    reverse: "CORE B | 0 | 20 | SURFACE | 封存\nCORE B | 20 | 36 | FIRN | 封存\nCORE B | 12 | 18 | RETURN | 封存",
    overlap: "CORE C | 0 | 18 | SURFACE | 封存\nCORE C | 15 | 32 | FIRN | 封存\nCORE C | 32 | 48 | BUBBLE | 封存",
    review: "CORE D | 0 | 12 | SURFACE | 封存\nCORE D | 14 | 28 | FIRN | 复核\nCORE D | 27 | 45 | BUBBLE | 草录"
  };

  function unicodeCount(value) {
    return Array.from(value).length;
  }

  function normalizedKey(value) {
    return value.normalize("NFKC").trim().replace(/\s+/gu, " ").toLocaleLowerCase();
  }

  function hasForbidden(value) {
    return /[\p{Cc}\p{Cf}]/u.test(value);
  }

  function normalizedText(raw, minimum, maximum, label, line) {
    if (hasForbidden(raw)) throw new Error("第 " + line + " 行的" + label + "不能包含 Unicode 控制或格式字符。");
    var value = raw.normalize("NFKC").trim().replace(/\s+/gu, " ");
    if (unicodeCount(value) < minimum || unicodeCount(value) > maximum) throw new Error("第 " + line + " 行的" + label + "须为 " + minimum + "–" + maximum + " 个 Unicode 字符。");
    return value;
  }

  function decimal(raw, label, line) {
    var value = raw.normalize("NFKC").trim();
    if (!/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(value) || Number(value) < 0 || Number(value) > 5000) {
      throw new Error("第 " + line + " 行的" + label + "须为 0–5000 的普通十进制数，最多两位小数，不能有符号或多余前导零。");
    }
    return Number(value);
  }

  function parse(raw) {
    if (unicodeCount(raw) > 6000) throw new Error("深度区间记录最多 6000 个 Unicode 字符。");
    var lines = raw.split(/\r?\n/).map(function (value, index) {
      return { value: value, line: index + 1 };
    }).filter(function (item) {
      return item.value.trim() !== "";
    });
    if (lines.length < 2 || lines.length > 120) throw new Error("请输入 2–120 条非空深度记录。");
    var seen = new Set();
    var records = [];
    lines.forEach(function (item) {
      var fields = item.value.normalize("NFKC").split("|");
      if (fields.length !== 5) throw new Error("第 " + item.line + " 行须严格包含 5 个字段。");
      var core = normalizedText(fields[0], 2, 24, "芯段", item.line);
      var coreKey = normalizedKey(core);
      var start = decimal(fields[1], "起始深度", item.line);
      var end = decimal(fields[2], "结束深度", item.line);
      if (start >= end) throw new Error("第 " + item.line + " 行的起始深度必须小于结束深度。");
      var era = normalizedText(fields[3], 2, 32, "年代标签", item.line);
      var eraKey = normalizedKey(era);
      var status = fields[4].trim();
      if (!/^(?:草录|复核|封存)$/.test(status)) throw new Error("第 " + item.line + " 行的状态须为草录、复核或封存。");
      var unique = [coreKey, start, end, eraKey, status].join("\u0001");
      if (seen.has(unique)) throw new Error("第 " + item.line + " 行与已有深度记录完全重复。");
      seen.add(unique);
      records.push({ index: records.length, line: item.line, core: core, coreKey: coreKey, start: start, end: end, era: era, status: status });
    });
    return records;
  }

  function analyze(records) {
    var groups = new Map();
    var intervalFlags = [];
    var statusFlags = [];
    var findings = [];
    records.forEach(function (record) {
      if (!groups.has(record.coreKey)) groups.set(record.coreKey, { key: record.coreKey, name: record.core, records: [], flags: [], statusFlags: [] });
      var group = groups.get(record.coreKey);
      group.records.push(record);
      if (record.status !== "封存") {
        group.statusFlags.push(record);
        statusFlags.push(record);
      }
    });
    var cores = Array.from(groups.values()).sort(function (left, right) {
      return left.key.localeCompare(right.key);
    });
    cores.forEach(function (group) {
      var previousStart = null;
      var previousEnd = null;
      group.records.forEach(function (record) {
        if (previousStart !== null && record.start < previousStart) {
          group.flags.push(group.name + "：第 " + record.line + " 行起始深度 " + record.start + "m 早于前一条的起始深度 " + previousStart + "m，输入顺序回退。");
        }
        if (previousEnd !== null && record.start < previousEnd) {
          group.flags.push(group.name + "：第 " + record.line + " 行从 " + record.start + "m 开始，与前一条结束深度 " + previousEnd + "m 重叠。");
        } else if (previousEnd !== null && record.start > previousEnd) {
          group.flags.push(group.name + "：前一条结束深度 " + previousEnd + "m 与第 " + record.line + " 行起始深度 " + record.start + "m 之间存在 " + formatNumber(record.start - previousEnd) + "m 间隙。");
        }
        previousStart = record.start;
        previousEnd = record.end;
      });
      group.flags.forEach(function (flag) {
        intervalFlags.push(flag);
        findings.push(flag);
      });
      group.statusFlags.forEach(function (record) {
        findings.push(record.core + "：第 " + record.line + " 行“" + record.era + "”状态为“" + record.status + "”，尚未封存。");
      });
    });
    return { cores: cores, intervalFlags: intervalFlags, statusFlags: statusFlags, findings: findings };
  }

  function formatNumber(value) {
    return Number(value.toFixed(2)).toString();
  }

  function append(parent, tag, value) {
    var node = document.createElement(tag);
    node.textContent = value;
    parent.appendChild(node);
    return node;
  }

  function clearReport() {
    output.dataset.ready = "false";
    setText(stateNode, "UNSET");
    setText(coreCount, "0");
    setText(rowCount, "0");
    setText(intervalCount, "0");
    setText(statusCount, "0");
    setText(findingSummary, "等待计算");
    findingList.replaceChildren();
    append(findingList, "li", "报告生成后在此显示回退、间隙、重叠与状态提示。");
    setText(coreSummary, "等待计算");
    coreList.replaceChildren();
    append(coreList, "p", "等待深度记录。");
    copyReport.disabled = true;
    setText(copyStatus, "");
    currentReport = "";
  }

  function render(records, data) {
    var state = "RANGE READY";
    if (data.intervalFlags.length && data.statusFlags.length) state = "REVIEW " + data.findings.length;
    else if (data.intervalFlags.length) state = "INTERVAL FLAGS " + data.intervalFlags.length;
    else if (data.statusFlags.length) state = "STATUS FLAGS " + data.statusFlags.length;
    output.dataset.ready = "true";
    setText(stateNode, state);
    setText(coreCount, String(data.cores.length));
    setText(rowCount, String(records.length));
    setText(intervalCount, String(data.intervalFlags.length));
    setText(statusCount, String(data.statusFlags.length));
    setText(findingSummary, data.findings.length ? data.findings.length + " 条机械提示" : "无机械提示");
    findingList.replaceChildren();
    if (!data.findings.length) append(findingList, "li", "每个芯段的输入顺序未回退，相邻区间连续且所有记录已封存。");
    data.findings.slice(0, 40).forEach(function (finding) {
      append(findingList, "li", finding);
    });
    if (data.findings.length > 40) append(findingList, "li", "界面仅显示前 40 条；完整复制报告保留全部 " + data.findings.length + " 条提示。");
    setText(coreSummary, data.cores.length + " 个芯段");
    coreList.replaceChildren();
    data.cores.slice(0, 40).forEach(function (core, index) {
      var card = document.createElement("article");
      append(card, "b", String(index + 1).padStart(2, "0"));
      append(card, "strong", core.name);
      append(card, "small", core.records.length + " SEGMENTS / " + formatNumber(core.records[0].start) + "–" + formatNumber(core.records[core.records.length - 1].end) + " M");
      append(card, "span", "INTERVAL " + core.flags.length + " · UNSEALED " + core.statusFlags.length);
      coreList.appendChild(card);
    });
    if (data.cores.length > 40) append(coreList, "p", "界面仅显示前 40 个芯段；完整复制报告保留全部 " + data.cores.length + " 个芯段。");

    var lines = ["冰芯深度区间机械审计报告", "状态：" + state, "芯段：" + data.cores.length + "｜记录：" + records.length + "｜区间提示：" + data.intervalFlags.length + "｜待定状态：" + data.statusFlags.length, "", "提示："];
    if (!data.findings.length) lines.push("- 无机械提示。");
    data.findings.forEach(function (finding) {
      lines.push("- " + finding);
    });
    lines.push("", "芯段：");
    data.cores.forEach(function (core, index) {
      lines.push(String(index + 1).padStart(3, "0") + ". " + core.name + "｜记录 " + core.records.length + "｜区间 " + formatNumber(core.records[0].start) + "–" + formatNumber(core.records[core.records.length - 1].end) + "m｜区间提示 " + core.flags.length + "｜待定 " + core.statusFlags.length);
    });
    lines.push("", "深度记录：");
    records.forEach(function (record, index) {
      lines.push(String(index + 1).padStart(3, "0") + ". " + record.core + "｜" + formatNumber(record.start) + "–" + formatNumber(record.end) + "m｜" + record.era + "｜" + record.status);
    });
    lines.push("", note.textContent.trim());
    currentReport = lines.join("\n");
    copyReport.disabled = false;
    setText(copyStatus, "");
    setText(formStatus, "报告已生成，仍须核对现场坐标、原始样品、冷链、实验、年代、方法、质量、权利、版本与发布批准。");
  }

  function markStale() {
    if (output.dataset.ready === "true") {
      clearReport();
      setText(formStatus, "输入已改变，请重新生成报告。");
    }
    setText(errorNode, "");
  }

  register.addEventListener("submit", function (event) {
    event.preventDefault();
    setText(errorNode, "");
    try {
      var records = parse(input.value);
      render(records, analyze(records));
    } catch (error) {
      clearReport();
      setText(errorNode, error.message);
      setText(formStatus, "请修正输入后重新生成。");
      input.focus();
    }
  });

  register.addEventListener("reset", function () {
    setTimeout(function () {
      clearReport();
      setText(errorNode, "");
      setText(formStatus, "等待至少两条深度记录。");
    }, 0);
  });

  input.addEventListener("input", markStale);
  document.querySelectorAll("[data-pc130-preset]").forEach(function (button) {
    button.addEventListener("click", function () {
      var value = presets[button.dataset.pc130Preset];
      if (!value) return;
      input.value = value;
      markStale();
      input.focus();
    });
  });
  copyReport.addEventListener("click", function () {
    copyText(currentReport, copyStatus, "完整深度区间报告已复制。");
  });
}());
