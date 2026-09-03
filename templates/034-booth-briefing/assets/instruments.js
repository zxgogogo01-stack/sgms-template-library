(function () {
  "use strict";

  var lab = document.querySelector("[data-bb34-tool]");
  if (!lab) return;
  var type = lab.getAttribute("data-bb34-tool");
  var form = lab.querySelector("form");
  var errorBox = lab.querySelector("[data-bb34-error]");
  var resultBox = lab.querySelector("[data-bb34-result]");
  var mainOutput = lab.querySelector("[data-bb34-main]");
  var detailOutput = lab.querySelector("[data-bb34-detail]");
  var sampleButton = lab.querySelector("[data-bb34-sample]");
  var copyButton = lab.querySelector("[data-bb34-copy-result]");
  var copyStatus = lab.querySelector("[data-bb34-copy-status]");
  var lastResult = "";

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearInvalid();
    try {
      var result = calculate();
      showResult(result.main, result.detail);
    } catch (error) { showError(error.message, error.field); }
  });
  form.addEventListener("input", invalidate);
  form.addEventListener("change", invalidate);
  form.addEventListener("reset", function () { window.setTimeout(invalidate, 0); });
  sampleButton.addEventListener("click", loadSample);
  copyButton.addEventListener("click", function () {
    if (!lastResult) return;
    copyText(lastResult).then(function () {
      copyStatus.textContent = "结果已复制。";
      copyButton.textContent = "已复制";
      window.setTimeout(function () { copyButton.textContent = "复制结果"; }, 8000);
    }, function () { copyStatus.textContent = "复制失败，请手动选择结果。"; });
  });

  function invalidate() {
    clearInvalid();
    errorBox.textContent = "";
    resultBox.hidden = true;
    mainOutput.textContent = "";
    detailOutput.textContent = "";
    copyStatus.textContent = "";
    lastResult = "";
  }
  function clearInvalid() {
    Array.prototype.forEach.call(form.querySelectorAll("[aria-invalid]"), function (field) { field.removeAttribute("aria-invalid"); });
  }
  function problem(message, field) {
    var error = new Error(message);
    error.field = field;
    throw error;
  }
  function decimal(id, options) {
    var field = document.getElementById(id);
    var raw = field.value.normalize("NFKC").trim();
    if (!raw) problem("请完整填写所有输入项。", field);
    if (!/^(?:0|[1-9]\d*)(?:\.\d{1,4})?$/.test(raw)) problem("请输入非负普通十进制数，最多四位小数。", field);
    var value = Number(raw);
    if (!Number.isFinite(value) || value > 1000000000) problem("数值超出 0 至十亿的安全范围。", field);
    if (options && options.positive && value <= 0) problem("该数值必须大于零。", field);
    return value;
  }
  function integer(id, min, max) {
    var field = document.getElementById(id);
    var raw = field.value.normalize("NFKC").trim();
    if (!raw) problem("请完整填写所有输入项。", field);
    if (!/^(?:0|[1-9]\d*)$/.test(raw)) problem("请输入不带前导零的普通整数。", field);
    var value = Number(raw);
    if (!Number.isSafeInteger(value) || value < min || value > max) problem("整数超出允许范围。", field);
    return value;
  }
  function records(id, parts, min, max) {
    var field = document.getElementById(id);
    var raw = field.value.normalize("NFKC");
    if (raw.length > 12000) problem("输入超过 12,000 字符，请分批处理。", field);
    var rows = raw.split(/\r?\n/).map(function (line, i) { return { line: line.trim(), number: i + 1 }; }).filter(function (row) { return row.line; });
    if (rows.length < min || rows.length > max) problem("有效行数必须在 " + min + " 至 " + max + " 之间。", field);
    return rows.map(function (row) {
      var fields = row.line.split("|").map(function (item) { return item.trim(); });
      if (fields.length !== parts || fields.some(function (item) { return !item; })) problem("第 " + row.number + " 行格式不正确。", field);
      return { fields: fields, line: row.number };
    });
  }
  function strictNumber(value, field, max) {
    if (!/^(?:0|[1-9]\d*)(?:\.\d{1,4})?$/.test(value)) problem("数值字段必须是普通十进制数。", field);
    var number = Number(value);
    if (!Number.isFinite(number) || number > max) problem("数值字段超出允许范围。", field);
    return number;
  }
  function cleanName(value, field) {
    var name = value.replace(/\s+/g, " ").trim();
    if (Array.from(name).length > 60) problem("名称不得超过 60 个字符。", field);
    return name;
  }

  function calculate() {
    if (type === "supplier-scorer") {
      var scoreField = document.getElementById("score-lines");
      var scoreRows = records("score-lines", 3, 2, 20);
      var seenScores = new Set();
      var totalWeight = 0;
      var weighted = 0;
      var details = scoreRows.map(function (row) {
        var name = cleanName(row.fields[0], scoreField);
        var normalized = name.toLowerCase();
        if (seenScores.has(normalized)) problem("评分维度不能重复。", scoreField);
        seenScores.add(normalized);
        var score = strictNumber(row.fields[1], scoreField, 100);
        var weight = strictNumber(row.fields[2], scoreField, 1000);
        if (weight <= 0) problem("权重必须大于零。", scoreField);
        totalWeight += weight;
        weighted += score * weight;
        return name + "：" + score + " × " + weight;
      });
      var average = weighted / totalWeight;
      return { main: format(average, 2) + " / 100", detail: details.join("\n") + "\n总权重：" + format(totalWeight, 4) + "\n加权分：" + format(average, 2) };
    }
    if (type === "reorder-point") {
      var demand = decimal("daily-demand", { positive: true });
      var lead = integer("lead-days", 0, 3650);
      var safety = decimal("safety-stock");
      var point = demand * lead + safety;
      if (!Number.isFinite(point) || point > 1000000000000) problem("补货点超出安全计算范围。", document.getElementById("daily-demand"));
      return { main: format(point, 4) + " 单位", detail: "日均需求：" + format(demand, 4) + "\n提前期：" + lead + " 天\n安全库存：" + format(safety, 4) + "\n公式：日均需求 × 提前期 + 安全库存" };
    }
    if (type === "container-fit") {
      var item = [decimal("item-length", {positive:true}),decimal("item-width", {positive:true}),decimal("item-height", {positive:true})];
      var box = [decimal("box-length", {positive:true}),decimal("box-width", {positive:true}),decimal("box-height", {positive:true})];
      var orders = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
      var best = { count: 0, fit: [0,0,0], order: orders[0] };
      orders.forEach(function (order) {
        var fit = box.map(function (value,index) { return Math.floor(value / item[order[index]]); });
        var count = fit[0] * fit[1] * fit[2];
        if (count > best.count) best = { count: count, fit: fit, order: order };
      });
      var used = best.count * item[0] * item[1] * item[2];
      var volume = box[0] * box[1] * box[2];
      return { main: best.count + " 件", detail: "最佳轴向：" + best.order.map(function(i){return ["长","宽","高"][i];}).join(" × ") + "\n排列：" + best.fit.join(" × ") + "\n体积利用率：" + format(volume ? used / volume * 100 : 0, 2) + "%\n未计包装间隙、承重和装卸路径" };
    }
    if (type === "sku-comparator") {
      var aField = document.getElementById("sku-a");
      var bField = document.getElementById("sku-b");
      var aRows = records("sku-a", 2, 2, 30);
      var bRows = records("sku-b", 2, 2, 30);
      var parse = function (rows, field) {
        var map = new Map();
        rows.forEach(function (row) {
          var name = cleanName(row.fields[0], field);
          var key = name.toLowerCase();
          if (map.has(key)) problem("同一方案内字段不能重复。", field);
          map.set(key, { name:name, value:strictNumber(row.fields[1],field,1000000000) });
        });
        return map;
      };
      var amap = parse(aRows,aField), bmap = parse(bRows,bField);
      var keys = Array.from(new Set(Array.from(amap.keys()).concat(Array.from(bmap.keys()))));
      var changed = 0;
      var lines = keys.map(function (key) {
        var av = amap.get(key), bv = bmap.get(key), name = (av || bv).name;
        if (!av) { changed += 1; return name + "：仅 B = " + format(bv.value,4); }
        if (!bv) { changed += 1; return name + "：仅 A = " + format(av.value,4); }
        var diff = bv.value - av.value;
        if (diff !== 0) changed += 1;
        return name + "：A " + format(av.value,4) + " / B " + format(bv.value,4) + " / 差 " + signed(diff);
      });
      return { main: changed ? changed + " 个差异" : "数值完全一致", detail: lines.join("\n") };
    }
    if (type === "procurement-timeline") {
      var dateField = document.getElementById("start-date");
      var rawDate = dateField.value;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) problem("请选择有效的项目起始日。", dateField);
      var cursor = new Date(rawDate + "T12:00:00Z");
      if (Number.isNaN(cursor.getTime())) problem("项目起始日无法识别。", dateField);
      var phaseField = document.getElementById("phase-lines");
      var phaseRows = records("phase-lines", 2, 2, 20);
      var seenPhases = new Set();
      var total = 0;
      var phaseDetails = phaseRows.map(function (row,index) {
        var name = cleanName(row.fields[0],phaseField);
        var key = name.toLowerCase();
        if (seenPhases.has(key)) problem("阶段名称不能重复。",phaseField);
        seenPhases.add(key);
        if (!/^(?:0|[1-9]\d*)$/.test(row.fields[1])) problem("阶段天数必须是不带前导零的整数。",phaseField);
        var days = Number(row.fields[1]);
        if (days < 0 || days > 3650 || total + days > 36500) problem("阶段或总周期超出允许范围。",phaseField);
        total += days;
        cursor.setUTCDate(cursor.getUTCDate() + days);
        return (index + 1) + ". " + name + " / " + days + " 天 / " + cursor.toISOString().slice(0,10);
      });
      return { main: total + " 天", detail: "起始：" + rawDate + "\n" + phaseDetails.join("\n") + "\n按自然日顺推，不自动跳过节假日" };
    }
    problem("当前测量器类型无法识别。", null);
  }

  function loadSample() {
    var samples = {
      "supplier-scorer": { "score-lines":"交付稳定 | 82 | 3\n规格一致 | 94 | 4\n沟通响应 | 76 | 2" },
      "reorder-point": { "daily-demand":"24", "lead-days":"12", "safety-stock":"80" },
      "container-fit": { "item-length":"40", "item-width":"30", "item-height":"25", "box-length":"120", "box-width":"100", "box-height":"80" },
      "sku-comparator": { "sku-a":"重量 | 12.5\n功率 | 80\n保修月数 | 24", "sku-b":"重量 | 11.8\n功率 | 85\n保修月数 | 24" },
      "procurement-timeline": { "start-date":"2026-09-03", "phase-lines":"询价 | 5\n打样 | 12\n复核 | 4\n交付 | 18" }
    };
    Object.keys(samples[type]).forEach(function (id) { document.getElementById(id).value = samples[type][id]; });
    invalidate();
    var first = form.querySelector("input,textarea");
    if (first) first.focus();
  }
  function showResult(mainText, detailText) {
    errorBox.textContent = "";
    mainOutput.textContent = mainText;
    detailOutput.textContent = detailText;
    lastResult = mainText + "\n" + detailText;
    resultBox.hidden = false;
    resultBox.focus();
  }
  function showError(message, field) {
    invalidate();
    errorBox.textContent = message;
    if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); }
  }
  function format(value, digits) { return new Intl.NumberFormat("zh-CN", { maximumFractionDigits:digits }).format(value); }
  function signed(value) { return (value > 0 ? "+" : "") + format(value,4); }
  function copyText(value) {
    return new Promise(function (resolve,reject) {
      var area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly","");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        if (document.execCommand("copy")) { resolve(); return; }
        if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(value).then(resolve,reject); return; }
        throw new Error("copy failed");
      } catch (error) { reject(error); }
      finally { area.remove(); }
    });
  }
})();
