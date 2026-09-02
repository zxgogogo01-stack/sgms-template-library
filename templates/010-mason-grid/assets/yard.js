(function () {
  "use strict";

  var root = document.documentElement;
  var themeButton = document.querySelector("[data-theme-cycle]");
  var themes = ["system", "light", "dark"];
  var labels = { system: "系统", light: "浅色", dark: "深色" };
  function applyTheme(value) {
    if (value === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", value);
    if (themeButton) themeButton.textContent = labels[value];
    try { localStorage.setItem("mason-theme", value); } catch (ignore) {}
  }
  var saved = "system";
  try { saved = localStorage.getItem("mason-theme") || "system"; } catch (ignore) {}
  if (themes.indexOf(saved) < 0) saved = "system";
  applyTheme(saved);
  if (themeButton) themeButton.addEventListener("click", function () {
    var current = root.getAttribute("data-theme") || "system";
    applyTheme(themes[(themes.indexOf(current) + 1) % themes.length]);
  });

  function copyText(text, done, failed) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, failed);
      return;
    }
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); done(); } catch (error) { failed(); }
    area.remove();
  }
  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-copy-target]");
    if (!button) return;
    var node = document.getElementById(button.getAttribute("data-copy-target"));
    if (!node) return;
    var before = button.textContent;
    copyText(node.textContent.trim(), function () {
      button.textContent = button.getAttribute("data-copy-label") || "已复制";
      window.setTimeout(function () { button.textContent = before; }, 1600);
    }, function () { button.textContent = "请手动复制"; });
  });

  var filterBar = document.querySelector("[data-brick-filters]");
  if (filterBar) filterBar.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-filter]");
    if (!button) return;
    var key = button.getAttribute("data-filter");
    var cards = document.querySelectorAll("[data-brick-kind]");
    var visible = 0;
    cards.forEach(function (card) {
      var show = key === "all" || card.getAttribute("data-brick-kind") === key;
      card.hidden = !show;
      if (show) visible += 1;
    });
    filterBar.querySelectorAll("button").forEach(function (item) { item.setAttribute("aria-pressed", item === button ? "true" : "false"); });
    var count = document.getElementById("brick-count");
    if (count) count.textContent = "当前显示 " + visible + " 块";
  });

  var form = document.querySelector("form[data-tool]");
  if (!form) return;
  var output = document.getElementById("tool-result");
  var copyResult = output.querySelector("[data-copy-result]");
  function show(state, headline, detail) {
    output.setAttribute("data-state", state);
    output.querySelector(".machine-result__state").textContent = state === "error" ? "CHECK INPUT" : "RESULT";
    output.querySelector("strong").textContent = headline;
    output.querySelector("p").textContent = detail;
    copyResult.disabled = state === "error";
  }
  function isoDate(date) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }
  function parseDate(id) {
    var value = document.getElementById(id).value;
    return value ? new Date(value + "T00:00:00") : null;
  }
  function fnv1a(text) {
    var hash = 0x811c9dc5;
    for (var i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16).padStart(8, "0").toUpperCase();
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var kind = form.getAttribute("data-tool");
    if (kind === "date") {
      var start = parseDate("date-start");
      var end = parseDate("date-end");
      if (!start || !end) return show("error", "日期不完整", "请选择起始与结束日期。");
      var days = Math.round((end - start) / 86400000);
      if (days < 0) return show("error", "顺序有误", "结束日期不能早于起始日期。");
      return show("ready", days + " 天", days === 0 ? "两个日期在同一天。" : "自然日跨度，不包含时区与小时差异。");
    }
    if (kind === "weight") {
      var values = ["weight-a", "weight-b", "weight-c"].map(function (id) { return Number(document.getElementById(id).value); });
      if (values.some(function (n) { return !Number.isFinite(n) || n < 0; })) return show("error", "权重无效", "三项都必须是大于或等于零的数字。");
      var sum = values[0] + values[1] + values[2];
      if (sum === 0) return show("error", "总权重为零", "至少给一项设置正数权重。");
      var parts = values.map(function (n) { return (n / sum * 100).toFixed(1) + "%"; });
      return show("ready", parts.join(" / "), "依次对应 A、B、C，已按总和归一化。");
    }
    if (kind === "fingerprint") {
      var text = document.getElementById("fingerprint-text").value.trim();
      if (!text) return show("error", "没有文本", "输入至少一个可见字符。");
      return show("ready", fnv1a(text), "FNV-1a 32 位短标记；用于快速对照，不是密码学哈希。");
    }
    if (kind === "cadence") {
      var first = parseDate("cadence-start");
      var interval = Number(document.getElementById("cadence-days").value);
      var rounds = Number(document.getElementById("cadence-rounds").value);
      if (!first || !Number.isInteger(interval) || interval < 1 || interval > 365 || !Number.isInteger(rounds) || rounds < 1 || rounds > 12) return show("error", "参数超出范围", "间隔为 1–365 天，轮次为 1–12 次。");
      var dates = [];
      for (var r = 0; r < rounds; r += 1) { var d = new Date(first); d.setDate(d.getDate() + interval * r); dates.push(isoDate(d)); }
      return show("ready", rounds + " 次复核", dates.join(" · "));
    }
    var population = Number(document.getElementById("sample-population").value);
    var margin = Number(document.getElementById("sample-margin").value);
    if (!Number.isInteger(population) || population < 1 || population > 10000000 || !Number.isFinite(margin) || margin < 1 || margin > 50) return show("error", "参数超出范围", "总体需为 1–10,000,000，误差需为 1%–50%。");
    var z = 1.96;
    var p = 0.5;
    var e = margin / 100;
    var n0 = z * z * p * (1 - p) / (e * e);
    var sample = Math.ceil(n0 / (1 + (n0 - 1) / population));
    return show("ready", sample + " 个样本", "按 95% 置信度、最保守比例与有限总体修正估算。");
  });
  form.addEventListener("reset", function () {
    window.setTimeout(function () { show("ready", "等待输入", "结果会在这里出现。"); copyResult.disabled = true; }, 0);
  });
  copyResult.addEventListener("click", function () {
    var text = output.querySelector("strong").textContent + " — " + output.querySelector("p").textContent;
    copyText(text, function () { copyResult.textContent = "结果已复制"; window.setTimeout(function () { copyResult.textContent = "复制结果"; }, 1500); }, function () { copyResult.textContent = "请手动复制"; });
  });
}());
