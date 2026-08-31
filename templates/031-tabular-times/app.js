(function () {
  "use strict";

  var search = document.getElementById("report-search");
  var rows = Array.prototype.slice.call(document.querySelectorAll("#report-body tr"));
  var filters = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var count = document.getElementById("report-count");
  var empty = document.getElementById("report-empty");
  var resetReport = document.getElementById("reset-report");
  var sortButton = document.querySelector("[data-sort]");
  var activeFilter = "all";
  var descending = true;

  function normalize(value) {
    return value.toLocaleLowerCase().replace(/\s+/g, " ").trim();
  }

  function renderReport() {
    if (!search || !count) return;
    var query = normalize(search.value);
    var visible = 0;
    rows.forEach(function (row) {
      var filterMatch = activeFilter === "all" || row.dataset.kind === activeFilter;
      var searchMatch = !query || normalize(row.textContent).indexOf(query) !== -1;
      row.hidden = !(filterMatch && searchMatch);
      if (!row.hidden) visible += 1;
    });
    count.textContent = visible + " / " + rows.length + " 项指标可见";
    empty.hidden = visible !== 0;
  }

  function sortRows() {
    rows.sort(function (left, right) {
      return descending ? Number(right.dataset.change) - Number(left.dataset.change) : Number(left.dataset.change) - Number(right.dataset.change);
    });
    rows.forEach(function (row) { document.getElementById("report-body").appendChild(row); });
  }

  if (search) {
    search.addEventListener("input", renderReport);
    filters.forEach(function (button) {
      button.addEventListener("click", function () {
        activeFilter = button.dataset.filter;
        filters.forEach(function (item) {
          item.setAttribute("aria-pressed", item === button ? "true" : "false");
        });
        renderReport();
      });
    });
    resetReport.addEventListener("click", function () {
      search.value = "";
      activeFilter = "all";
      filters.forEach(function (button) {
        button.setAttribute("aria-pressed", button.dataset.filter === "all" ? "true" : "false");
      });
      renderReport();
      search.focus();
    });
    sortButton.addEventListener("click", function () {
      descending = !descending;
      sortRows();
      sortButton.textContent = descending ? "按变化 ↓" : "按变化 ↑";
      sortButton.setAttribute("aria-label", descending ? "当前按变化从高到低排列" : "当前按变化从低到高排列");
    });
    sortRows();
    renderReport();
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-act]");
    if (!button) return;
    var action = button.dataset.act;
    if (action === "copy-access") copyAccess(button);
    if (action === "calculate") calculate();
    if (action === "copy-stats") copyStats();
    if (action === "reset-stats") resetStats();
    if (action === "preset") usePreset(button);
  });

  function writeClipboard(text, fallbackNode, done) {
    var fallback = function () {
      fallbackNode.focus();
      if (fallbackNode.select) fallbackNode.select();
      document.execCommand("copy");
      done();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else {
      fallback();
    }
  }

  function copyAccess(button) {
    var code = document.getElementById("access-code");
    var status = document.getElementById("access-status");
    if (!code || !status) return;
    writeClipboard(code.textContent.trim(), code, function () {
      status.textContent = "访问口令已复制";
      button.textContent = "已复制";
    });
  }

  function parseNumbers(value) {
    var tokens = value.split(/[\s,，;；]+/).filter(Boolean);
    var numbers = [];
    for (var i = 0; i < tokens.length; i += 1) {
      var number = Number(tokens[i]);
      if (!Number.isFinite(number)) return { error: "第 " + (i + 1) + " 项不是有效数字：" + tokens[i] };
      numbers.push(number);
    }
    return { numbers: numbers };
  }

  function format(number) {
    var absolute = Math.abs(number);
    if (absolute > 0 && (absolute < 0.0001 || absolute >= 1000000000000)) return number.toExponential(4);
    return Number(number.toFixed(4)).toLocaleString("zh-CN", { maximumFractionDigits: 4 });
  }

  function invalidateStats() {
    var input = document.getElementById("stats-input");
    if (!input) return;
    input.removeAttribute("aria-invalid");
    document.getElementById("stats-error").textContent = "";
    document.getElementById("stats-status").textContent = "";
    document.getElementById("stats-result").hidden = true;
  }

  function calculate() {
    var input = document.getElementById("stats-input");
    var error = document.getElementById("stats-error");
    var panel = document.getElementById("stats-result");
    var status = document.getElementById("stats-status");
    var raw = input.value.trim();
    input.removeAttribute("aria-invalid");
    error.textContent = "";
    status.textContent = "";
    if (!raw) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = "请先输入至少两个数字。";
      panel.hidden = true;
      input.focus();
      return;
    }
    if (raw.length > 20000) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = "单次输入不得超过 20,000 个字符。";
      panel.hidden = true;
      input.focus();
      return;
    }
    var parsed = parseNumbers(raw);
    if (parsed.error) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = parsed.error + "。";
      panel.hidden = true;
      input.focus();
      return;
    }
    var nums = parsed.numbers;
    if (nums.length < 2) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = "至少需要两个数字才能形成统计摘要。";
      panel.hidden = true;
      input.focus();
      return;
    }
    if (nums.length > 500) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = "单次最多处理 500 个数字，请分批计算。";
      panel.hidden = true;
      input.focus();
      return;
    }
    var sorted = nums.slice().sort(function (a, b) { return a - b; });
    var scale = nums.reduce(function (largest, value) { return Math.max(largest, Math.abs(value)); }, 0);
    var scaledMean = scale ? nums.reduce(function (total, value) { return total + value / scale; }, 0) / nums.length : 0;
    var mean = scaledMean * scale;
    var median = sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : scale ? (sorted[sorted.length / 2 - 1] / scale + sorted[sorted.length / 2] / scale) / 2 * scale : 0;
    var scaledVariance = scale ? nums.reduce(function (total, value) { return total + Math.pow(value / scale - scaledMean, 2); }, 0) / (nums.length - 1) : 0;
    var standardDeviation = Math.sqrt(scaledVariance) * scale;
    if (![mean, median, standardDeviation].every(Number.isFinite)) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = "数值跨度过大，无法生成有限的统计摘要。";
      panel.hidden = true;
      input.focus();
      return;
    }
    document.getElementById("stat-count").textContent = nums.length.toLocaleString("zh-CN");
    document.getElementById("stat-mean").textContent = format(mean);
    document.getElementById("stat-median").textContent = format(median);
    document.getElementById("stat-min").textContent = format(sorted[0]);
    document.getElementById("stat-max").textContent = format(sorted[sorted.length - 1]);
    document.getElementById("stat-sd").textContent = format(standardDeviation);
    panel.hidden = false;
    document.getElementById("stat-mean").focus();
  }

  function summaryText() {
    return "样本 " + document.getElementById("stat-count").textContent + "；平均 " + document.getElementById("stat-mean").textContent + "；中位 " + document.getElementById("stat-median").textContent + "；最小 " + document.getElementById("stat-min").textContent + "；最大 " + document.getElementById("stat-max").textContent + "；样本标准差 " + document.getElementById("stat-sd").textContent;
  }

  function copyStats() {
    var status = document.getElementById("stats-status");
    writeClipboard(summaryText(), document.getElementById("stats-input"), function () { status.textContent = "统计摘要已复制"; });
  }

  function resetStats() {
    var input = document.getElementById("stats-input");
    input.value = "";
    invalidateStats();
    input.focus();
  }

  function usePreset(button) {
    var input = document.getElementById("stats-input");
    input.value = button.dataset.values;
    invalidateStats();
    input.focus();
  }

  var statsInput = document.getElementById("stats-input");
  if (statsInput) statsInput.addEventListener("input", invalidateStats);
})();
