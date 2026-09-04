(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("fr77-enhanced");
  var modeButton = document.querySelector("[data-fr77-mode-toggle]");
  var menuButton = document.querySelector(".fr77-menu");
  var menu = document.getElementById("fr77-nav");
  var copySequence = 0;
  var DAY = 86400000;
  var CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/;

  function count(value) {
    return Array.from(value).length;
  }

  function hasBrokenUnicode(value) {
    for (var i = 0; i < value.length; i += 1) {
      var code = value.charCodeAt(i);
      if (code >= 0xd800 && code <= 0xdbff) {
        if (i + 1 >= value.length) return true;
        var next = value.charCodeAt(i + 1);
        if (next < 0xdc00 || next > 0xdfff) return true;
        i += 1;
      } else if (code >= 0xdc00 && code <= 0xdfff) {
        return true;
      }
    }
    return false;
  }

  function cleanRaw(value, limit, label) {
    if (hasBrokenUnicode(value)) throw new Error(label + "含有残缺 Unicode 字符。");
    if (count(value) > limit) throw new Error(label + "不能超过 " + limit.toLocaleString("zh-CN") + " 个 Unicode 码点。");
    if (CONTROL.test(value)) throw new Error(label + "不能包含控制字符。");
    return value.normalize("NFKC");
  }

  function rows(value, limit, label) {
    var list = value.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
    if (!list.length) throw new Error("请至少输入一行" + label + "。");
    if (list.length > limit) throw new Error(label + "最多接受 " + limit + " 个非空行。");
    return list;
  }

  function parts(line, expected, index) {
    var list = line.split("|").map(function (item) { return item.trim(); });
    if (list.length !== expected || list.some(function (item) { return !item; })) {
      throw new Error("第 " + (index + 1) + " 行必须包含 " + expected + " 个非空字段。");
    }
    return list;
  }

  function asciiInteger(value, min, max, label) {
    if (!/^(0|[1-9]\d*)$/.test(value)) throw new Error(label + "必须是普通 ASCII 十进制整数。");
    var number = Number(value);
    if (!Number.isSafeInteger(number) || number < min || number > max) {
      throw new Error(label + "必须在 " + min + "–" + max + " 之间。");
    }
    return number;
  }

  function dateValue(value, label) {
    var match = /^(20\d{2})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) throw new Error(label + "必须是 2000–2099 的 YYYY-MM-DD 日期。");
    var year = Number(match[1]);
    var month = Number(match[2]);
    var day = Number(match[3]);
    var stamp = Date.UTC(year, month - 1, day);
    var check = new Date(stamp);
    if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) {
      throw new Error(label + "不是有效公历日期。");
    }
    return stamp;
  }

  function dateText(stamp) {
    return new Date(stamp).toISOString().slice(0, 10);
  }

  function uniqueKey(value) {
    return value.toLocaleLowerCase("zh-CN");
  }

  function setMode(value, remember) {
    var mode = value === "day" ? "day" : "forest";
    root.setAttribute("data-fr77-mode", mode);
    root.style.colorScheme = mode === "day" ? "dark" : "light";
    if (modeButton) {
      modeButton.disabled = false;
      modeButton.setAttribute("aria-pressed", mode === "day" ? "true" : "false");
      modeButton.textContent = mode === "day" ? "林下" : "日光";
      modeButton.setAttribute("aria-label", mode === "day" ? "切换到林下模式" : "切换到日光模式");
    }
    if (remember) {
      try { localStorage.setItem("fr77-mode", mode); } catch (error) { /* storage is optional */ }
    }
  }

  var storedMode = "forest";
  try { storedMode = localStorage.getItem("fr77-mode") === "day" ? "day" : "forest"; } catch (error) { /* storage is optional */ }
  setMode(storedMode, false);
  if (modeButton) {
    modeButton.addEventListener("click", function () {
      setMode(root.getAttribute("data-fr77-mode") === "day" ? "forest" : "day", true);
    });
  }

  function closeMenu(restoreFocus) {
    if (!menuButton || !menu) return;
    menu.classList.remove("fr77-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) menuButton.focus();
  }

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      var opening = !menu.classList.contains("fr77-open");
      if (opening) {
        menu.classList.add("fr77-open");
        menuButton.setAttribute("aria-expanded", "true");
        var first = menu.querySelector("a,button:not([disabled])");
        if (first) first.focus();
      } else {
        closeMenu(false);
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("fr77-open")) closeMenu(true);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeMenu(false);
    });
  }

  var progress = document.querySelector("[data-fr77-progress]");
  if (progress) {
    var updateProgress = function () {
      var distance = document.documentElement.scrollHeight - window.innerHeight;
      var value = distance > 0 ? Math.min(100, Math.max(0, window.scrollY / distance * 100)) : 100;
      progress.style.width = value.toFixed(2) + "%";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  function copyText(text, status, message) {
    var sequence = ++copySequence;
    if (status) status.textContent = "正在请求剪贴板权限…";
    if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") {
      if (status && sequence === copySequence) status.textContent = "当前浏览器不支持自动复制，请手动选择文字。";
      return;
    }
    navigator.clipboard.writeText(text).then(function () {
      if (status && sequence === copySequence) status.textContent = message;
    }).catch(function () {
      if (status && sequence === copySequence) status.textContent = "复制未完成，请允许剪贴板权限后重试。";
    });
  }

  function wireCode(buttonSelector, codeSelector, statusSelector) {
    var button = document.querySelector(buttonSelector);
    var code = document.querySelector(codeSelector);
    var status = document.querySelector(statusSelector);
    if (!button || !code) return;
    button.disabled = false;
    button.addEventListener("click", function () {
      copyText(code.textContent.trim(), status, "代码已复制。");
    });
  }

  wireCode("[data-fr77-copy-home]", "#fr77-home-code", "[data-fr77-home-status]");
  wireCode("[data-fr77-copy-code]", "#fr77-camp-code", "[data-fr77-code-status]");

  var filter = document.querySelector("[data-fr77-filter]");
  if (filter) {
    var plot = filter.elements.plot;
    var keyword = filter.elements.keyword;
    var filterStatus = filter.querySelector("[data-fr77-filter-status]");
    var cards = Array.from(document.querySelectorAll(".fr77-journal-list > li[data-fr77-plot]"));
    var applyFilter = function () {
      var wantedPlot = plot.value;
      var wantedText = keyword.value.normalize("NFKC").trim().toLocaleLowerCase("zh-CN");
      var visible = 0;
      cards.forEach(function (card) {
        var matchesPlot = wantedPlot === "all" || card.getAttribute("data-fr77-plot") === wantedPlot;
        var matchesText = !wantedText || card.textContent.normalize("NFKC").toLocaleLowerCase("zh-CN").includes(wantedText);
        card.hidden = !(matchesPlot && matchesText);
        if (!card.hidden) visible += 1;
      });
      filterStatus.textContent = "显示 " + visible + " / " + cards.length + " 条观察记录。";
    };
    filter.hidden = false;
    filter.addEventListener("input", applyFilter);
    filter.addEventListener("change", applyFilter);
    filter.addEventListener("reset", function () { window.setTimeout(applyFilter, 0); });
    applyFilter();
  }

  var toolForm = document.querySelector("form[data-fr77-tool]");
  if (toolForm) {
    var toolIndex = Number(toolForm.getAttribute("data-fr77-tool"));
    var output = document.querySelector("[data-tool-output]");
    var formStatus = toolForm.querySelector("[data-form-status]");
    var reportCopy = document.querySelector("[data-copy-tool]");
    var copyStatus = document.querySelector("[data-copy-status]");
    var submitButton = toolForm.querySelector('button[type="submit"]');
    var resetButton = toolForm.querySelector('button[type="reset"]');
    var initialValues = {};
    var currentReport = "";

    Array.from(toolForm.elements).forEach(function (field) {
      if (field.name) initialValues[field.name] = field.value;
    });

    function clearErrors() {
      Array.from(toolForm.querySelectorAll("[aria-invalid]")).forEach(function (field) {
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-errormessage");
      });
      Array.from(toolForm.querySelectorAll("[data-field-error]")).forEach(function (box) { box.textContent = ""; });
    }

    function invalidate() {
      copySequence += 1;
      currentReport = "";
      reportCopy.disabled = true;
      copyStatus.textContent = "";
      output.textContent = "输入已变化；请重新生成完整报告。";
      formStatus.textContent = "输入已变化，旧报告已失效。";
      clearErrors();
    }

    function fail(error, field) {
      clearErrors();
      field = field || toolForm.querySelector("textarea,input");
      var errorBox = toolForm.querySelector('[data-field-error="' + field.name + '"]');
      field.setAttribute("aria-invalid", "true");
      if (errorBox) {
        field.setAttribute("aria-errormessage", errorBox.id);
        errorBox.textContent = error.message;
      }
      output.textContent = "未生成报告。请修正标记的输入。";
      formStatus.textContent = "输入未通过边界检查。";
      reportCopy.disabled = true;
      currentReport = "";
      field.focus();
    }

    function named(name) {
      return toolForm.elements[name];
    }

    function fieldRaw(name, limit, label) {
      var field = named(name);
      try {
        return cleanRaw(field.value, limit, label);
      } catch (error) {
        error.field = field;
        throw error;
      }
    }

    function parseDueRoutes() {
      var routeField = named("routes");
      var dateField = named("asOf");
      var raw = fieldRaw("routes", 15000, "路线输入");
      var asOfRaw = fieldRaw("asOf", 10, "参考日期").trim();
      var asOf;
      try { asOf = dateValue(asOfRaw, "参考日期"); } catch (error) { error.field = dateField; throw error; }
      var seen = new Set();
      var list = rows(raw, 100, "路线记录").map(function (line, index) {
        var value = parts(line, 4, index);
        if (count(value[0]) > 120) throw new Error("第 " + (index + 1) + " 行项目名不能超过 120 个 Unicode 码点。");
        var key = uniqueKey(value[0]);
        if (seen.has(key)) throw new Error("第 " + (index + 1) + " 行项目名重复。");
        seen.add(key);
        var checked = dateValue(value[1], "第 " + (index + 1) + " 行核对日");
        if (checked > asOf) throw new Error("第 " + (index + 1) + " 行核对日晚于参考日期。");
        var interval = asciiInteger(value[2], 1, 3650, "第 " + (index + 1) + " 行间隔");
        var impact = asciiInteger(value[3], 1, 5, "第 " + (index + 1) + " 行影响");
        var due = checked + interval * DAY;
        var delta = Math.round((asOf - due) / DAY);
        return { item: value[0], checked: value[1], interval: interval, impact: impact, due: due, delta: delta, index: index, score: Math.max(0, delta) * impact };
      });
      list.sort(function (a, b) {
        var aState = a.delta > 0 ? 0 : a.delta === 0 ? 1 : 2;
        var bState = b.delta > 0 ? 0 : b.delta === 0 ? 1 : 2;
        return aState - bState || (aState === 0 ? b.score - a.score : 0) || a.index - b.index;
      });
      var overdue = list.filter(function (item) { return item.delta > 0; }).length;
      var today = list.filter(function (item) { return item.delta === 0; }).length;
      var lines = ["复查到期路线板", "参考日期：" + asOfRaw, "记录：" + list.length + "｜逾期：" + overdue + "｜今日：" + today, ""];
      list.forEach(function (item, index) {
        var state = item.delta > 0 ? "逾期 " + item.delta + " 天" : item.delta === 0 ? "今日到期" : Math.abs(item.delta) + " 天后";
        lines.push((index + 1) + ". " + item.item + "｜上次 " + item.checked + "｜间隔 " + item.interval + " 天｜影响 " + item.impact + "｜到期 " + dateText(item.due) + "｜" + state + "｜分数 " + item.score);
      });
      return lines.join("\n");
    }

    function parseStatuses() {
      var raw = fieldRaw("statuses", 15000, "状态输入");
      var seen = new Set();
      var list = rows(raw, 100, "状态记录").map(function (line, index) {
        var value = parts(line, 3, index);
        if (!value[0].startsWith("/") || count(value[0]) > 200) throw new Error("第 " + (index + 1) + " 行路径须以 / 开头且不超过 200 个码点。");
        var key = uniqueKey(value[0]);
        if (seen.has(key)) throw new Error("第 " + (index + 1) + " 行路径重复。");
        seen.add(key);
        var bucket;
        var exact = /^([2-5])\d{2}$/.exec(value[1]);
        var grouped = /^([2-5])xx$/i.exec(value[1]);
        if (exact) bucket = Number(exact[1]);
        else if (grouped) bucket = Number(grouped[1]);
        else throw new Error("第 " + (index + 1) + " 行状态须为 200–599 的三位码或 2xx–5xx。");
        var inbound = asciiInteger(value[2], 0, 1000000, "第 " + (index + 1) + " 行入链数");
        var weight = { 2: 0, 3: 1, 4: 3, 5: 4 }[bucket];
        return { path: value[0], status: value[1].toLowerCase(), bucket: bucket + "xx", inbound: inbound, weight: weight, score: weight * (inbound + 1), index: index };
      });
      list.sort(function (a, b) { return b.weight - a.weight || b.inbound - a.inbound || a.index - b.index; });
      var lines = ["状态路标分流报告", "记录：" + list.length + "｜排序：故障级别 > 入链数 > 原序", ""];
      list.forEach(function (item, index) {
        lines.push((index + 1) + ". " + item.path + "｜状态 " + item.status + "（" + item.bucket + "）｜入链 " + item.inbound + "｜分数 " + item.score);
      });
      return lines.join("\n");
    }

    function tokenList(value, label) {
      var list = value.split(",").map(function (token) { return token.trim(); }).filter(Boolean);
      if (!list.length) throw new Error(label + "至少需要一个标记。");
      var seen = new Set();
      list.forEach(function (token) {
        if (!/^[a-z][a-z0-9-]{0,29}$/.test(token)) throw new Error(label + "中的“" + token + "”不是小写 ASCII 标记。");
        if (seen.has(token)) throw new Error(label + "不能包含重复标记“" + token + "”。");
        seen.add(token);
      });
      return list;
    }

    function parseTriggers() {
      var raw = fieldRaw("rules", 15000, "规则输入");
      var eventField = named("events");
      var eventRaw = fieldRaw("events", 1240, "事件标记").trim();
      var events;
      try { events = tokenList(eventRaw, "事件标记"); } catch (error) { error.field = eventField; throw error; }
      if (events.length > 40) { var eventError = new Error("事件标记最多 40 个。"); eventError.field = eventField; throw eventError; }
      var eventSet = new Set(events);
      var seen = new Set();
      var rules = rows(raw, 100, "触发规则").map(function (line, index) {
        var value = parts(line, 2, index);
        if (count(value[0]) > 120) throw new Error("第 " + (index + 1) + " 行项目名不能超过 120 个码点。");
        var key = uniqueKey(value[0]);
        if (seen.has(key)) throw new Error("第 " + (index + 1) + " 行项目名重复。");
        seen.add(key);
        var tokens = tokenList(value[1], "第 " + (index + 1) + " 行标记");
        var matched = tokens.filter(function (token) { return eventSet.has(token); });
        return { item: value[0], tokens: tokens, matched: matched };
      });
      var hits = rules.filter(function (rule) { return rule.matched.length; }).length;
      var lines = ["变更触发匹配报告", "事件：" + events.join(", "), "规则：" + rules.length + "｜MATCH：" + hits + "｜QUIET：" + (rules.length - hits), ""];
      rules.forEach(function (rule, index) {
        lines.push((index + 1) + ". " + rule.item + "｜" + (rule.matched.length ? "MATCH" : "QUIET") + "｜规则 " + rule.tokens.join(",") + "｜命中 " + (rule.matched.join(",") || "—"));
      });
      return lines.join("\n");
    }

    function parsePack() {
      var raw = fieldRaw("tasks", 15000, "任务输入");
      var budgetField = named("budget");
      var budgetRaw = fieldRaw("budget", 3, "每日上限").trim();
      var budget;
      try { budget = asciiInteger(budgetRaw, 30, 480, "每日上限"); } catch (error) { error.field = budgetField; throw error; }
      var seen = new Set();
      var tasks = rows(raw, 100, "任务记录").map(function (line, index) {
        var value = parts(line, 3, index);
        if (count(value[0]) > 120) throw new Error("第 " + (index + 1) + " 行任务名不能超过 120 个码点。");
        var key = uniqueKey(value[0]);
        if (seen.has(key)) throw new Error("第 " + (index + 1) + " 行任务名重复。");
        seen.add(key);
        var minutes = asciiInteger(value[1], 1, 240, "第 " + (index + 1) + " 行分钟");
        if (minutes > budget) throw new Error("第 " + (index + 1) + " 行分钟超过每日上限。");
        if (!/^[a-z][a-z0-9-]{0,29}$/.test(value[2])) throw new Error("第 " + (index + 1) + " 行区域须为小写 ASCII 标记。");
        return { task: value[0], minutes: minutes, zone: value[2] };
      });
      var days = [];
      tasks.forEach(function (task) {
        var day = days[days.length - 1];
        if (!day || day.used + task.minutes > budget) {
          day = { used: 0, tasks: [] };
          days.push(day);
        }
        day.tasks.push(task);
        day.used += task.minutes;
      });
      var lines = ["复查背包分批报告", "任务：" + tasks.length + "｜每日上限：" + budget + " 分钟｜批次：" + days.length, ""];
      days.forEach(function (day, index) {
        lines.push("DAY " + (index + 1) + "｜已用 " + day.used + "｜剩余 " + (budget - day.used));
        day.tasks.forEach(function (task, taskIndex) {
          lines.push("  " + (taskIndex + 1) + ". " + task.task + "｜" + task.minutes + " 分钟｜" + task.zone);
        });
      });
      return lines.join("\n");
    }

    function parseWindows() {
      var raw = fieldRaw("windows", 15000, "窗口输入");
      var exactSeen = new Set();
      var topics = new Map();
      var records = rows(raw, 100, "覆盖窗口").map(function (line, index) {
        var value = parts(line, 3, index);
        if (count(value[0]) > 100) throw new Error("第 " + (index + 1) + " 行主题不能超过 100 个码点。");
        var start = dateValue(value[1], "第 " + (index + 1) + " 行开始日");
        var end = dateValue(value[2], "第 " + (index + 1) + " 行结束日");
        if (start > end) throw new Error("第 " + (index + 1) + " 行开始日晚于结束日。");
        var key = uniqueKey(value[0]);
        var exact = key + "\u0001" + value[1] + "\u0001" + value[2];
        if (exactSeen.has(exact)) throw new Error("第 " + (index + 1) + " 行与前面的窗口完全重复。");
        exactSeen.add(exact);
        if (!topics.has(key)) topics.set(key, { topic: value[0], order: topics.size, records: [] });
        var record = { start: start, end: end, startText: value[1], endText: value[2], index: index };
        topics.get(key).records.push(record);
        return record;
      });
      var mergedCount = 0;
      var totalGaps = 0;
      var lines = ["覆盖窗口拼接报告", "原始窗口：" + records.length + "｜主题：" + topics.size, ""];
      topics.forEach(function (group) {
        group.records.sort(function (a, b) { return a.start - b.start || a.index - b.index; });
        var merged = [];
        group.records.forEach(function (record) {
          var last = merged[merged.length - 1];
          if (last && record.start <= last.end + DAY) {
            if (record.end > last.end) last.end = record.end;
          } else {
            merged.push({ start: record.start, end: record.end });
          }
        });
        mergedCount += merged.length;
        lines.push(group.topic + "｜" + group.records.length + " 窗口 → " + merged.length + " 覆盖段");
        merged.forEach(function (segment, index) {
          lines.push("  段 " + (index + 1) + "：" + dateText(segment.start) + " → " + dateText(segment.end));
          if (index < merged.length - 1) {
            var gap = Math.round((merged[index + 1].start - segment.end) / DAY) - 1;
            totalGaps += gap;
            lines.push("  空档：" + gap + " 天");
          }
        });
      });
      lines.splice(2, 0, "拼接后覆盖段：" + mergedCount + "｜空档天数：" + totalGaps);
      return lines.join("\n");
    }

    var parsers = [parseDueRoutes, parseStatuses, parseTriggers, parsePack, parseWindows];
    submitButton.disabled = false;
    resetButton.disabled = false;
    formStatus.textContent = "工具已就绪；输入只在当前浏览器计算。";
    toolForm.addEventListener("input", invalidate);
    toolForm.addEventListener("submit", function (event) {
      event.preventDefault();
      clearErrors();
      try {
        currentReport = parsers[toolIndex]();
        output.textContent = currentReport;
        formStatus.textContent = "完整报告已生成，共 " + currentReport.split("\n").length + " 行。";
        reportCopy.disabled = false;
        copyStatus.textContent = "";
      } catch (error) {
        fail(error, error.field);
      }
    });
    toolForm.addEventListener("reset", function () {
      window.setTimeout(function () {
        Object.keys(initialValues).forEach(function (name) { if (named(name)) named(name).value = initialValues[name]; });
        clearErrors();
        currentReport = "";
        output.textContent = "等待有效输入。";
        formStatus.textContent = "样例已恢复；请生成新的完整报告。";
        reportCopy.disabled = true;
        copyStatus.textContent = "";
        var first = toolForm.querySelector("textarea,input");
        if (first) first.focus();
      }, 0);
    });
    reportCopy.addEventListener("click", function () {
      if (!currentReport) return;
      copyText(currentReport, copyStatus, "完整报告已复制。");
    });
  }

  var searchForm = document.querySelector("[data-fr77-search]");
  if (searchForm) {
    var query = searchForm.elements.query;
    var searchButton = searchForm.querySelector('button[type="submit"]');
    var searchResult = searchForm.querySelector("[data-fr77-search-result]");
    var destinations = [
      { words: ["来源", "文章", "观察", "记录", "日期", "修订"], url: "field-journal.html", label: "观察簿" },
      { words: ["工具", "复查", "状态", "触发", "窗口", "路线"], url: "tool-shed.html", label: "巡护工具" },
      { words: ["披露", "关系", "推广"], url: "relation-marker.html", label: "关系路标" },
      { words: ["更正", "联系", "反馈"], url: "correction-desk.html", label: "更正信箱" },
      { words: ["隐私", "数据"], url: "data-practice.html", label: "数据足迹" },
      { words: ["首页", "营地"], url: "index.html", label: "返回营地" }
    ];
    searchButton.disabled = false;
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      searchResult.replaceChildren();
      var value;
      try { value = cleanRaw(query.value, 80, "查询").trim().toLocaleLowerCase("zh-CN"); }
      catch (error) { searchResult.textContent = error.message; query.focus(); return; }
      if (!value) { searchResult.textContent = "请输入一个主题，例如“复查”或“来源”。"; query.focus(); return; }
      var hit = destinations.find(function (destination) {
        return destination.words.some(function (word) { return value.includes(word); });
      });
      if (!hit) { searchResult.textContent = "本地路标表没有匹配项，请缩短主题或返回营地。"; return; }
      searchResult.append("找到最近入口：");
      var link = document.createElement("a");
      link.href = hit.url;
      link.textContent = hit.label;
      searchResult.appendChild(link);
    });
    query.addEventListener("input", function () { searchResult.textContent = "查询已变化，提交后重新查找。"; });
  }
}());
