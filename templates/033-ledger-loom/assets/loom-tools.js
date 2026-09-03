(function () {
  "use strict";

  var main = document.querySelector("[data-tool]");
  if (!main) return;
  var type = main.getAttribute("data-tool");
  var form = main.querySelector("form");
  var errorBox = main.querySelector("[data-tool-error]");
  var resultBox = main.querySelector("[data-tool-result]");
  var mainOutput = main.querySelector("[data-result-main]");
  var detailOutput = main.querySelector("[data-result-detail]");
  var sampleButton = main.querySelector("[data-tool-sample]");
  var copyButton = main.querySelector("[data-tool-copy]");
  var copyStatus = main.querySelector("[data-copy-status]");
  var lastResult = "";

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearInvalid();
    try {
      var result = calculate();
      showResult(result.main, result.detail);
    } catch (error) {
      showError(error.message, error.field);
    }
  });

  form.addEventListener("input", invalidate);
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

  function number(id, options) {
    var field = document.getElementById(id);
    var raw = field.value.trim();
    if (!raw) problem("请完整填写所有输入项。", field);
    if (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$/.test(raw)) problem("请输入最多两位小数的有效数字。", field);
    var value = Number(raw.replace(/,/g, ""));
    if (!Number.isFinite(value) || Math.abs(value) > 1000000000000) problem("数值超出安全计算范围。", field);
    if (options && options.positive && value <= 0) problem("该数值必须大于零。", field);
    if (options && options.nonnegative && value < 0) problem("该数值不能小于零。", field);
    return value;
  }

  function lines(id) {
    var field = document.getElementById(id);
    var list = field.value.split(/\r?\n/).map(function (item) { return item.trim(); }).filter(Boolean);
    if (!list.length) problem("每份清单至少需要一项。", field);
    if (list.length > 500) problem("单次最多处理 500 行，请分批复核。", field);
    if (list.some(function (item) { return item.length > 120; })) problem("单行不得超过 120 个字符。", field);
    return list;
  }

  function calculate() {
    if (type === "runway-calculator") {
      var cash = number("cash", { nonnegative: true });
      var burn = number("burn", { positive: true });
      var months = cash / burn;
      if (months > 1200) problem("结果超过 1,200 个月，请核对输入量级。", document.getElementById("burn"));
      return { main: format(months, 2) + " 个月", detail: "期初资金 " + money(cash) + "\n月度净消耗 " + money(burn) + "\n完整覆盖 " + Math.floor(months) + " 个月" };
    }
    if (type === "break-even-calculator") {
      var fixed = number("fixed", { nonnegative: true });
      var price = number("price", { positive: true });
      var variable = number("variable", { nonnegative: true });
      if (price <= variable) problem("单价必须高于单位变动成本。", document.getElementById("price"));
      var margin = price - variable;
      var units = Math.ceil(fixed / margin);
      if (!Number.isSafeInteger(units) || units > 1000000000) problem("结果超出安全数量范围。", document.getElementById("fixed"));
      return { main: units + " 单位", detail: "单位贡献 " + money(margin) + "\n固定成本 " + money(fixed) + "\n向上取整至最低覆盖数量" };
    }
    if (type === "due-date-scheduler") {
      var dateField = document.getElementById("issued");
      var dateValue = dateField.value;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) problem("请选择有效的开具日期。", dateField);
      var days = number("terms", { nonnegative: true });
      if (!Number.isInteger(days) || days > 3650) problem("账期必须是 0 至 3,650 的整数天。", document.getElementById("terms"));
      var date = new Date(dateValue + "T12:00:00Z");
      if (Number.isNaN(date.getTime())) problem("日期无法识别。", dateField);
      date.setUTCDate(date.getUTCDate() + days);
      var iso = date.toISOString().slice(0, 10);
      return { main: iso, detail: "开具日期 " + dateValue + "\n约定账期 " + days + " 天\n按自然日推算，不自动跳过节假日" };
    }
    if (type === "reconciliation-matcher") {
      var left = lines("left-list");
      var right = lines("right-list");
      var leftSet = new Set(left);
      var rightSet = new Set(right);
      var onlyLeft = Array.from(leftSet).filter(function (item) { return !rightSet.has(item); });
      var onlyRight = Array.from(rightSet).filter(function (item) { return !leftSet.has(item); });
      var matched = Array.from(leftSet).filter(function (item) { return rightSet.has(item); }).length;
      return { main: onlyLeft.length + onlyRight.length ? (onlyLeft.length + onlyRight.length) + " 个差异" : "完全匹配", detail: "匹配 " + matched + " 项\n仅 A：" + (onlyLeft.join("、") || "无") + "\n仅 B：" + (onlyRight.join("、") || "无") };
    }
    if (type === "allocation-splitter") {
      var amount = number("amount", { nonnegative: true });
      var rawWeights = lines("weights");
      if (rawWeights.length > 100) problem("单次最多分配 100 项。", document.getElementById("weights"));
      var weights = rawWeights.map(function (item) {
        if (!/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,4})?$/.test(item)) problem("权重必须是正数，每行一项。", document.getElementById("weights"));
        var value = Number(item.replace(/,/g, ""));
        if (!Number.isFinite(value) || value <= 0 || value > 1000000000) problem("权重超出安全范围。", document.getElementById("weights"));
        return value;
      });
      var totalWeight = weights.reduce(function (sum, value) { return sum + value; }, 0);
      var cents = Math.round(amount * 100);
      var used = 0;
      var shares = weights.map(function (weight, index) {
        var share = index === weights.length - 1 ? cents - used : Math.round(cents * weight / totalWeight);
        used += share;
        return share / 100;
      });
      return { main: shares.length + " 项已分配", detail: shares.map(function (share, index) { return (index + 1) + ". 权重 " + weights[index] + " → " + money(share); }).join("\n") + "\n合计 " + money(amount) };
    }
    problem("当前工具类型无法识别。", null);
  }

  function loadSample() {
    var samples = {
      "runway-calculator": { cash: "120000", burn: "18000" },
      "break-even-calculator": { fixed: "30000", price: "800", variable: "260" },
      "due-date-scheduler": { issued: "2026-09-03", terms: "30" },
      "reconciliation-matcher": { "left-list": "INV-101\nINV-102\nINV-103", "right-list": "INV-101\nINV-103\nINV-104" },
      "allocation-splitter": { amount: "10000", weights: "3\n2\n1" }
    };
    Object.keys(samples[type]).forEach(function (id) { document.getElementById(id).value = samples[type][id]; });
    invalidate();
    form.querySelector("input, textarea").focus();
  }

  function showResult(mainText, detailText) {
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

  function format(value, digits) { return new Intl.NumberFormat("zh-CN", { maximumFractionDigits: digits }).format(value); }
  function money(value) { return new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 2 }).format(value).replace("CN¥", "¥"); }

  function copyText(value) {
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        if (document.execCommand("copy")) { resolve(); return; }
        if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(value).then(resolve, reject); return; }
        throw new Error("copy failed");
      }
      catch (error) { reject(error); }
      finally { area.remove(); }
    });
  }
})();
