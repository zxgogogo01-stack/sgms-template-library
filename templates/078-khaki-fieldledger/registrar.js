(function () {
  "use strict";

  var root = document.documentElement;
  var modeButton = document.querySelector("[data-ka78-light-toggle]");
  var menuButton = document.querySelector(".ka78-menu");
  var menu = document.getElementById("ka78-nav");
  var copySequence = 0;
  var DAY = 86400000;
  var CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/;
  root.classList.add("ka78-enhanced");

  function count(value) { return Array.from(value).length; }
  function hasBrokenUnicode(value) {
    for (var i = 0; i < value.length; i += 1) {
      var code = value.charCodeAt(i);
      if (code >= 0xd800 && code <= 0xdbff) {
        if (i + 1 >= value.length) return true;
        var next = value.charCodeAt(i + 1);
        if (next < 0xdc00 || next > 0xdfff) return true;
        i += 1;
      } else if (code >= 0xdc00 && code <= 0xdfff) return true;
    }
    return false;
  }
  function cleanRaw(value, limit, label) {
    if (hasBrokenUnicode(value)) throw new Error(label + "含有残缺 Unicode 字符。");
    if (count(value) > limit) throw new Error(label + "不能超过 " + limit.toLocaleString("zh-CN") + " 个 Unicode 码点。");
    if (CONTROL.test(value)) throw new Error(label + "不能包含控制字符。");
    return value.normalize("NFKC");
  }
  function rows(value, maximum, label) {
    var list = value.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
    if (!list.length) throw new Error("请至少输入一行" + label + "。");
    if (list.length > maximum) throw new Error(label + "最多接受 " + maximum + " 个非空行。");
    return list;
  }
  function pipeParts(line, expected, index) {
    var list = line.split("|").map(function (item) { return item.trim(); });
    if (list.length !== expected || list.some(function (item) { return !item; })) throw new Error("第 " + (index + 1) + " 行必须包含 " + expected + " 个非空字段。");
    return list;
  }
  function integer(value, min, max, label, signed) {
    var pattern = signed ? /^-?(0|[1-9]\d*)$/ : /^(0|[1-9]\d*)$/;
    if (!pattern.test(value)) throw new Error(label + "必须是普通 ASCII 十进制整数。");
    var number = Number(value);
    if (!Number.isSafeInteger(number) || number < min || number > max) throw new Error(label + "必须在 " + min + "–" + max + " 之间。");
    return number;
  }
  function dateValue(value, label) {
    var match = /^(20\d{2})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) throw new Error(label + "必须是 2000–2099 的 YYYY-MM-DD 日期。");
    var year = Number(match[1]), month = Number(match[2]), day = Number(match[3]);
    var stamp = Date.UTC(year, month - 1, day), check = new Date(stamp);
    if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) throw new Error(label + "不是有效公历日期。");
    return stamp;
  }
  function key(value) { return value.toLocaleLowerCase("zh-CN"); }
  function setMode(value, remember) {
    var mode = value === "night" ? "night" : "dune";
    root.setAttribute("data-ka78-light", mode);
    root.style.colorScheme = mode === "night" ? "dark" : "light";
    if (modeButton) {
      modeButton.disabled = false;
      modeButton.setAttribute("aria-pressed", mode === "night" ? "true" : "false");
      modeButton.textContent = mode === "night" ? "日勘" : "夜勘";
      modeButton.setAttribute("aria-label", mode === "night" ? "切换到日间勘测" : "切换到夜间勘测");
    }
    if (remember) try { localStorage.setItem("ka78-light", mode); } catch (error) { /* optional */ }
  }
  var stored = "dune";
  try { stored = localStorage.getItem("ka78-light") === "night" ? "night" : "dune"; } catch (error) { /* optional */ }
  setMode(stored, false);
  if (modeButton) modeButton.addEventListener("click", function () { setMode(root.getAttribute("data-ka78-light") === "night" ? "dune" : "night", true); });

  function closeMenu(restore) {
    if (!menu || !menuButton) return;
    menu.classList.remove("ka78-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (restore) menuButton.focus();
  }
  if (menu && menuButton) {
    menuButton.addEventListener("click", function () {
      var opening = !menu.classList.contains("ka78-open");
      if (opening) {
        menu.classList.add("ka78-open");
        menuButton.setAttribute("aria-expanded", "true");
        var first = menu.querySelector("a,button:not([disabled])");
        if (first) first.focus();
      } else closeMenu(false);
    });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape" && menu.classList.contains("ka78-open")) closeMenu(true); });
    window.addEventListener("resize", function () { if (window.innerWidth > 760) closeMenu(false); });
  }

  var progress = document.querySelector("[data-ka78-progress]");
  if (progress) {
    var updateProgress = function () {
      var distance = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (distance > 0 ? Math.min(100, Math.max(0, window.scrollY / distance * 100)) : 100).toFixed(2) + "%";
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
    var button = document.querySelector(buttonSelector), code = document.querySelector(codeSelector), status = document.querySelector(statusSelector);
    if (!button || !code) return;
    button.disabled = false;
    button.addEventListener("click", function () { copyText(code.textContent.trim(), status, "代码已复制。"); });
  }
  wireCode("[data-ka78-copy-home]", "#ka78-home-code", "[data-ka78-home-status]");
  wireCode("[data-ka78-copy-code]", "#ka78-custody-code", "[data-ka78-code-status]");

  var filter = document.querySelector("[data-ka78-filter]");
  if (filter) {
    var group = filter.elements.group, keyword = filter.elements.keyword, status = filter.querySelector("[data-ka78-filter-status]");
    var cards = Array.from(document.querySelectorAll("li[data-ka78-group]"));
    var applyFilter = function () {
      var wantedGroup = group.value, wantedText = keyword.value.normalize("NFKC").trim().toLocaleLowerCase("zh-CN"), visible = 0;
      cards.forEach(function (card) {
        var matches = (wantedGroup === "all" || card.getAttribute("data-ka78-group") === wantedGroup) && (!wantedText || card.textContent.normalize("NFKC").toLocaleLowerCase("zh-CN").includes(wantedText));
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      status.textContent = "显示 " + visible + " / " + cards.length + " 份记录。";
    };
    filter.hidden = false;
    filter.addEventListener("input", applyFilter);
    filter.addEventListener("change", applyFilter);
    filter.addEventListener("reset", function () { window.setTimeout(applyFilter, 0); });
    applyFilter();
  }

  var toolForm = document.querySelector("form[data-ka78-tool]");
  if (toolForm) {
    var toolIndex = Number(toolForm.getAttribute("data-ka78-tool"));
    var output = document.querySelector("[data-tool-output]"), formStatus = toolForm.querySelector("[data-form-status]");
    var copyButton = document.querySelector("[data-copy-tool]"), copyStatus = document.querySelector("[data-copy-status]");
    var submitButton = toolForm.querySelector('button[type="submit"]'), resetButton = toolForm.querySelector('button[type="reset"]');
    var initialValues = {}, currentReport = "";
    Array.from(toolForm.elements).forEach(function (field) { if (field.name) initialValues[field.name] = field.value; });
    function named(name) { return toolForm.elements[name]; }
    function clearErrors() {
      Array.from(toolForm.querySelectorAll("[aria-invalid]")).forEach(function (field) { field.removeAttribute("aria-invalid"); field.removeAttribute("aria-errormessage"); });
      Array.from(toolForm.querySelectorAll("[data-field-error]")).forEach(function (box) { box.textContent = ""; });
    }
    function invalidate() {
      copySequence += 1;
      currentReport = "";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      output.textContent = "输入已变化；请重新生成完整档案。";
      formStatus.textContent = "输入已变化，旧档案已失效。";
      clearErrors();
    }
    function fail(error, field) {
      clearErrors();
      field = field || toolForm.querySelector("textarea,input,select");
      var box = toolForm.querySelector('[data-field-error="' + field.name + '"]');
      field.setAttribute("aria-invalid", "true");
      if (box) { field.setAttribute("aria-errormessage", box.id); box.textContent = error.message; }
      output.textContent = "未生成档案。请修正标记的输入。";
      formStatus.textContent = "输入未通过边界检查。";
      currentReport = "";
      copyButton.disabled = true;
      field.focus();
    }
    function fieldRaw(name, limit, label) {
      var field = named(name);
      try { return cleanRaw(field.value, limit, label); } catch (error) { error.field = field; throw error; }
    }

    function accessionReport() {
      var raw = fieldRaw("ids", 10000, "编号输入"), pattern = /^([A-Z][A-Z0-9]{1,11})-([0-9]{3,6})$/;
      var prefix = "", width = 0, counts = new Map(), normalized = [];
      rows(raw, 500, "入藏编号").forEach(function (line, index) {
        var value = line.toUpperCase(), match = pattern.exec(value);
        if (!match) throw new Error("第 " + (index + 1) + " 行须为 2–12 位前缀、连字符和 3–6 位数字。");
        if (!index) { prefix = match[1]; width = match[2].length; }
        else if (match[1] !== prefix) throw new Error("第 " + (index + 1) + " 行前缀与首行不一致。");
        else if (match[2].length !== width) throw new Error("第 " + (index + 1) + " 行数字位宽与首行不一致。");
        var number = Number(match[2]);
        counts.set(number, (counts.get(number) || 0) + 1);
        normalized.push({ value: value, number: number, index: index });
      });
      var values = Array.from(counts.keys()).sort(function (a, b) { return a - b; }), min = values[0], max = values[values.length - 1];
      if (max - min > 10000) throw new Error("数字跨度不能超过 10,000。");
      var gaps = [];
      for (var number = min; number <= max; number += 1) if (!counts.has(number)) gaps.push(number);
      var duplicates = values.filter(function (number) { return counts.get(number) > 1; });
      var format = function (number) { return prefix + "-" + String(number).padStart(width, "0"); };
      var lines = ["入藏编号序列审计", "输入：" + normalized.length + "｜唯一：" + values.length + "｜缺号：" + gaps.length + "｜重复号：" + duplicates.length, "范围：" + format(min) + " → " + format(max), "", "完整输入"];
      normalized.forEach(function (item) { lines.push((item.index + 1) + ". " + item.value + (counts.get(item.number) > 1 ? "｜重复 ×" + counts.get(item.number) : "｜已登记")); });
      lines.push("", "缺号清单");
      if (!gaps.length) lines.push("— 无缺号 —"); else gaps.forEach(function (number, index) { lines.push((index + 1) + ". " + format(number)); });
      return lines.join("\n");
    }

    function strataReport() {
      var raw = fieldRaw("relations", 15000, "层位关系"), nodeOrder = new Map(), edges = [], seen = new Set();
      rows(raw, 200, "层位关系").forEach(function (line, index) {
        var relation = line.split(">").map(function (part) { return part.trim().toUpperCase(); });
        if (relation.length !== 2 || relation.some(function (part) { return !/^[A-Z][A-Z0-9-]{0,19}$/.test(part); })) throw new Error("第 " + (index + 1) + " 行须为“大写节点 > 大写节点”。");
        if (relation[0] === relation[1]) throw new Error("第 " + (index + 1) + " 行不能自指。");
        var pair = relation.join(">");
        if (seen.has(pair)) throw new Error("第 " + (index + 1) + " 行关系重复。");
        seen.add(pair);
        relation.forEach(function (node) { if (!nodeOrder.has(node)) nodeOrder.set(node, nodeOrder.size); });
        edges.push({ upper: relation[0], lower: relation[1], index: index });
      });
      var indegree = new Map(), children = new Map(), level = new Map();
      nodeOrder.forEach(function (_, node) { indegree.set(node, 0); children.set(node, []); level.set(node, 0); });
      edges.forEach(function (edge) { children.get(edge.upper).push(edge.lower); indegree.set(edge.lower, indegree.get(edge.lower) + 1); });
      var queue = Array.from(nodeOrder.keys()).filter(function (node) { return indegree.get(node) === 0; }).sort(function (a, b) { return nodeOrder.get(a) - nodeOrder.get(b); }), ordered = [];
      while (queue.length) {
        var node = queue.shift(); ordered.push(node);
        children.get(node).forEach(function (child) {
          level.set(child, Math.max(level.get(child), level.get(node) + 1));
          indegree.set(child, indegree.get(child) - 1);
          if (indegree.get(child) === 0) { queue.push(child); queue.sort(function (a, b) { return nodeOrder.get(a) - nodeOrder.get(b); }); }
        });
      }
      if (ordered.length !== nodeOrder.size) throw new Error("层位关系含有闭环，无法生成先后顺序。");
      var lines = ["层位先后关系档案", "关系：" + edges.length + "｜节点：" + ordered.length + "｜最大层级：" + Math.max.apply(null, Array.from(level.values())), ""];
      ordered.forEach(function (node, index) { lines.push((index + 1) + ". " + node + "｜层级 " + level.get(node) + "｜下接 " + (children.get(node).join(",") || "—")); });
      return lines.join("\n");
    }

    function coordinateReport() {
      var raw = fieldRaw("points", 15000, "坐标输入"), seen = new Set(), sumN = 0, sumE = 0, sumD = 0;
      var points = rows(raw, 200, "坐标记录").map(function (line, index) {
        var value = pipeParts(line, 4, index), id = key(value[0]);
        if (count(value[0]) > 80) throw new Error("第 " + (index + 1) + " 行项目名不能超过 80 个码点。");
        if (seen.has(id)) throw new Error("第 " + (index + 1) + " 行项目名重复。");
        seen.add(id);
        var north = integer(value[1], -100000, 100000, "第 " + (index + 1) + " 行北向", true);
        var east = integer(value[2], -100000, 100000, "第 " + (index + 1) + " 行东向", true);
        var depth = integer(value[3], -100000, 100000, "第 " + (index + 1) + " 行深度", true);
        sumN += north; sumE += east; sumD += depth;
        return { item: value[0], north: north, east: east, depth: depth, index: index };
      });
      var norths = points.map(function (x) { return x.north; }), easts = points.map(function (x) { return x.east; }), depths = points.map(function (x) { return x.depth; });
      var minN = Math.min.apply(null, norths), maxN = Math.max.apply(null, norths), minE = Math.min.apply(null, easts), maxE = Math.max.apply(null, easts), minD = Math.min.apply(null, depths), maxD = Math.max.apply(null, depths);
      var sorted = points.slice().sort(function (a, b) { return b.depth - a.depth || a.index - b.index; });
      var lines = ["探方坐标登记档案", "记录：" + points.length + "｜北向 " + minN + "…" + maxN + "｜东向 " + minE + "…" + maxE + "｜深度 " + minD + "…" + maxD, "跨度：N " + (maxN - minN) + "｜E " + (maxE - minE) + "｜D " + (maxD - minD), "质心：N " + (sumN / points.length).toFixed(2) + "｜E " + (sumE / points.length).toFixed(2) + "｜D " + (sumD / points.length).toFixed(2), ""];
      sorted.forEach(function (point, index) { lines.push((index + 1) + ". " + point.item + "｜N " + point.north + "｜E " + point.east + "｜D " + point.depth + "｜原行 " + (point.index + 1)); });
      return lines.join("\n");
    }

    function timelineReport() {
      var raw = fieldRaw("events", 15000, "交接输入"), groups = new Map();
      rows(raw, 300, "交接事件").forEach(function (line, index) {
        var value = pipeParts(line, 3, index);
        if (count(value[0]) > 80) throw new Error("第 " + (index + 1) + " 行对象名不能超过 80 个码点。");
        if (!/^[a-z][a-z0-9-]{0,29}$/.test(value[2])) throw new Error("第 " + (index + 1) + " 行保管人须为小写 ASCII 标记。");
        var stamp = dateValue(value[1], "第 " + (index + 1) + " 行日期"), itemKey = key(value[0]);
        if (!groups.has(itemKey)) groups.set(itemKey, { item: value[0], events: [], dates: new Set() });
        var group = groups.get(itemKey);
        if (group.dates.has(stamp)) throw new Error("第 " + (index + 1) + " 行与同一对象已有日期冲突。");
        group.dates.add(stamp); group.events.push({ date: value[1], stamp: stamp, custodian: value[2], index: index });
      });
      var eventCount = 0, transitions = 0, lines = ["交接时间链档案", "对象：" + groups.size, ""];
      groups.forEach(function (group) {
        group.events.sort(function (a, b) { return a.stamp - b.stamp || a.index - b.index; });
        eventCount += group.events.length; transitions += Math.max(0, group.events.length - 1);
        lines.push(group.item + "｜事件 " + group.events.length);
        group.events.forEach(function (event, index) {
          var gap = index ? Math.round((event.stamp - group.events[index - 1].stamp) / DAY) : 0;
          lines.push("  " + (index + 1) + ". " + event.date + "｜" + event.custodian + (index ? "｜距上次 " + gap + " 天" : "｜入链"));
        });
      });
      lines.splice(2, 0, "事件：" + eventCount + "｜转移：" + transitions);
      return lines.join("\n");
    }

    function fixedRatio(numerator, denominator) {
      var scaled = numerator * 10000n, whole = scaled / denominator, remainder = scaled % denominator;
      if (remainder * 2n >= denominator) whole += 1n;
      var text = whole.toString().padStart(5, "0");
      return text.slice(0, -4) + "." + text.slice(-4);
    }
    function densityReport() {
      var raw = fieldRaw("squares", 15000, "密度输入"), unitField = named("unit"), unit = fieldRaw("unit", 5, "报告单位").trim();
      if (unit !== "sqm" && unit !== "sqm10") { var unitError = new Error("报告单位无效。"); unitError.field = unitField; throw unitError; }
      var factor = unit === "sqm" ? 10000n : 100000n, label = unit === "sqm" ? "每平方米" : "每十平方米", seen = new Set(), totalCount = 0n, totalArea = 0n;
      var squares = rows(raw, 200, "探方记录").map(function (line, index) {
        var value = pipeParts(line, 3, index), id = key(value[0]);
        if (count(value[0]) > 80) throw new Error("第 " + (index + 1) + " 行探方名不能超过 80 个码点。");
        if (seen.has(id)) throw new Error("第 " + (index + 1) + " 行探方名重复。");
        seen.add(id);
        var finds = integer(value[1], 0, 1000000, "第 " + (index + 1) + " 行计数", false), area = integer(value[2], 1, 1000000000, "第 " + (index + 1) + " 行面积", false);
        totalCount += BigInt(finds); totalArea += BigInt(area);
        return { square: value[0], finds: BigInt(finds), area: BigInt(area), index: index };
      });
      squares.sort(function (a, b) { var left = a.finds * b.area, right = b.finds * a.area; return left === right ? a.index - b.index : left > right ? -1 : 1; });
      var lines = ["探方密度换算档案", "探方：" + squares.length + "｜总计数：" + totalCount + "｜总面积：" + totalArea + " cm²", "加权总密度（" + label + "）：" + fixedRatio(totalCount * factor, totalArea), ""];
      squares.forEach(function (square, index) { lines.push((index + 1) + ". " + square.square + "｜计数 " + square.finds + "｜面积 " + square.area + " cm²｜" + label + " " + fixedRatio(square.finds * factor, square.area)); });
      return lines.join("\n");
    }

    var parsers = [accessionReport, strataReport, coordinateReport, timelineReport, densityReport];
    submitButton.disabled = false; resetButton.disabled = false;
    formStatus.textContent = "工具已就绪；输入只在当前浏览器计算。";
    toolForm.addEventListener("input", invalidate);
    toolForm.addEventListener("submit", function (event) {
      event.preventDefault(); clearErrors();
      try {
        currentReport = parsers[toolIndex](); output.textContent = currentReport;
        formStatus.textContent = "完整档案已生成，共 " + currentReport.split("\n").length + " 行。";
        copyButton.disabled = false; copyStatus.textContent = "";
      } catch (error) { fail(error, error.field); }
    });
    toolForm.addEventListener("reset", function () {
      window.setTimeout(function () {
        Object.keys(initialValues).forEach(function (name) { if (named(name)) named(name).value = initialValues[name]; });
        clearErrors(); currentReport = ""; output.textContent = "等待有效输入。";
        formStatus.textContent = "样例已恢复；请生成新的完整档案。"; copyButton.disabled = true; copyStatus.textContent = "";
        var first = toolForm.querySelector("textarea,input,select"); if (first) first.focus();
      }, 0);
    });
    copyButton.addEventListener("click", function () { if (currentReport) copyText(currentReport, copyStatus, "完整档案已复制。"); });
  }

  var searchForm = document.querySelector("[data-ka78-search]");
  if (searchForm) {
    var query = searchForm.elements.query, searchButton = searchForm.querySelector('button[type="submit"]'), result = searchForm.querySelector("[data-ka78-search-result]");
    var destinations = [
      { words: ["来源", "记录", "材料", "层位"], url: "field-register.html", label: "现场记录簿" },
      { words: ["工具", "编号", "坐标", "密度", "交接"], url: "survey-bench.html", label: "本地测量台" },
      { words: ["披露", "关系", "推广"], url: "relation-note.html", label: "关系标本签" },
      { words: ["联系", "安全"], url: "contact-drawer.html", label: "联系资料抽屉" },
      { words: ["更正", "勘误"], url: "correction-desk.html", label: "更正登记台" },
      { words: ["首页", "探方"], url: "index.html", label: "返回探方" }
    ];
    searchButton.disabled = false;
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault(); result.replaceChildren(); var value;
      try { value = cleanRaw(query.value, 80, "查询").trim().toLocaleLowerCase("zh-CN"); } catch (error) { result.textContent = error.message; query.focus(); return; }
      if (!value) { result.textContent = "请输入主题，例如“编号”或“来源”。"; query.focus(); return; }
      var hit = destinations.find(function (destination) { return destination.words.some(function (word) { return value.includes(word); }); });
      if (!hit) { result.textContent = "本地目录没有匹配项，请缩短主题或返回探方。"; return; }
      result.append("找到最近入口："); var link = document.createElement("a"); link.href = hit.url; link.textContent = hit.label; result.appendChild(link);
    });
    query.addEventListener("input", function () { result.textContent = "查询已变化，提交后重新翻查。"; });
  }
}());
