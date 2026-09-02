(function () {
  "use strict";
  var root = document.documentElement;
  var themeButton = document.querySelector("[data-theme-toggle]");
  var savedTheme = null;
  try { savedTheme = localStorage.getItem("walnut-theme"); } catch (error) { savedTheme = null; }
  if (savedTheme === "dark") root.setAttribute("data-theme", "dark");
  function updateThemeButton() { if (themeButton) themeButton.setAttribute("aria-pressed", root.getAttribute("data-theme") === "dark" ? "true" : "false"); }
  updateThemeButton();
  if (themeButton) themeButton.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next); updateThemeButton();
    try { localStorage.setItem("walnut-theme", next); } catch (error) { /* private browsing */ }
  });

  function copyText(text, button) {
    function done() { var old = button.textContent; button.textContent = "已复制"; setTimeout(function () { button.textContent = old; }, 1400); }
    function fallback() { var area = document.createElement("textarea"); area.value = text; area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0"; document.body.appendChild(area); area.select(); try { document.execCommand("copy"); done(); } catch (error) { button.textContent = "请手动复制"; } document.body.removeChild(area); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  }
  var inviteButton = document.querySelector("[data-copy-invite]");
  if (inviteButton) inviteButton.addEventListener("click", function () { var source = document.querySelector("[data-copy-source]"); if (source) copyText(source.textContent.trim(), inviteButton); });

  function number(form, name) { var raw = form.elements[name].value.trim(); return raw === "" ? NaN : Number(raw); }
  function finite(value) { return Number.isFinite(value); }
  function setResult(form, message, error) {
    var output = form.querySelector(".measure-result"); var copy = form.querySelector("[data-copy-result]");
    output.textContent = message; output.classList.toggle("is-error", Boolean(error)); copy.disabled = Boolean(error) || !message;
  }
  function mark(form, name) { var field = form.elements[name]; if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); } }
  function clearMarks(form) { var fields = form.querySelectorAll("[aria-invalid]"); for (var i = 0; i < fields.length; i += 1) fields[i].setAttribute("aria-invalid", "false"); }
  function invalid(form, name, message) { mark(form, name); setResult(form, message, true); }
  function format(value) { return Math.abs(value) >= 1000000 ? value.toExponential(4) : Number(value.toFixed(6)).toLocaleString("zh-CN", { maximumFractionDigits: 6 }); }

  function divider(form) {
    var total = number(form, "total"); var raw = form.elements.weights.value.trim();
    if (!finite(total) || total < 0) return invalid(form, "total", "请输入大于或等于 0 的总量。");
    var weights = raw.split(/[，,\s]+/).filter(Boolean).map(Number);
    if (weights.length < 2 || weights.some(function (item) { return !finite(item) || item <= 0; })) return invalid(form, "weights", "请填写至少两个大于 0 的有效权重。");
    var sum = weights.reduce(function (acc, item) { return acc + item; }, 0);
    var shares = weights.map(function (item, index) { return "第" + (index + 1) + "份 " + format(total * item / sum); });
    setResult(form, shares.join("；") + "。合计 " + format(total) + "。", false);
  }
  function unitCost(form) {
    var ca = number(form, "costA"), qa = number(form, "qtyA"), cb = number(form, "costB"), qb = number(form, "qtyB");
    if (!finite(ca) || ca < 0) return invalid(form, "costA", "记录 A 的成本需大于或等于 0。");
    if (!finite(qa) || qa <= 0) return invalid(form, "qtyA", "记录 A 的数量必须大于 0。");
    if (!finite(cb) || cb < 0) return invalid(form, "costB", "记录 B 的成本需大于或等于 0。");
    if (!finite(qb) || qb <= 0) return invalid(form, "qtyB", "记录 B 的数量必须大于 0。");
    var a = ca / qa, b = cb / qb, delta = b - a;
    setResult(form, "A 单位值 " + format(a) + "；B 单位值 " + format(b) + "；B 相对 A " + (delta === 0 ? "无差额" : (delta > 0 ? "高 " : "低 ") + format(Math.abs(delta))) + "。", false);
  }
  function overlap(form) {
    var as = number(form, "aStart"), ae = number(form, "aEnd"), bs = number(form, "bStart"), be = number(form, "bEnd");
    if (!finite(as)) return invalid(form, "aStart", "请输入区间 A 的有效起点。");
    if (!finite(ae) || ae < as) return invalid(form, "aEnd", "区间 A 的终点不能小于起点。");
    if (!finite(bs)) return invalid(form, "bStart", "请输入区间 B 的有效起点。");
    if (!finite(be) || be < bs) return invalid(form, "bEnd", "区间 B 的终点不能小于起点。");
    var start = Math.max(as, bs), end = Math.min(ae, be), length = Math.max(0, end - start);
    setResult(form, length > 0 ? "重合区间为 [" + format(start) + ", " + format(end) + "]，长度 " + format(length) + "。" : "两段区间没有正长度重合。", false);
  }
  function mod97(form) {
    var raw = form.elements.digits.value.trim(); var digits = raw.replace(/[\s-]/g, "");
    if (!/^\d{2,64}$/.test(digits)) return invalid(form, "digits", "请填写 2 至 64 位数字；仅可穿插空格或连字符。");
    var remainder = 0; for (var i = 0; i < digits.length; i += 1) remainder = (remainder * 10 + Number(digits.charAt(i))) % 97;
    setResult(form, "模 97 余数为 " + remainder + (remainder === 1 ? "；符合余数 1 规则。" : "；不符合余数 1 规则。"), false);
  }
  function matrix(form) {
    var names = ["weight1", "weight2", "scoreA1", "scoreA2", "scoreB1", "scoreB2"]; var values = {};
    for (var i = 0; i < names.length; i += 1) { values[names[i]] = number(form, names[i]); if (!finite(values[names[i]])) return invalid(form, names[i], "请补齐所有权重与评分。"); }
    if (values.weight1 < 0 || values.weight2 < 0 || values.weight1 + values.weight2 <= 0) return invalid(form, "weight1", "权重不能为负，且至少一项权重大于 0。");
    for (var s = 2; s < names.length; s += 1) if (values[names[s]] < 0 || values[names[s]] > 10) return invalid(form, names[s], "评分必须在 0 到 10 之间。");
    var sum = values.weight1 + values.weight2; var a = (values.scoreA1 * values.weight1 + values.scoreA2 * values.weight2) / sum; var b = (values.scoreB1 * values.weight1 + values.scoreB2 * values.weight2) / sum;
    setResult(form, "方案 A " + format(a) + " 分；方案 B " + format(b) + " 分；" + (a === b ? "两案同分。" : a > b ? "方案 A 得分较高。" : "方案 B 得分较高。"), false);
  }
  var handlers = { divider: divider, "unit-cost": unitCost, overlap: overlap, mod97: mod97, matrix: matrix };
  var forms = document.querySelectorAll("[data-tool]");
  for (var f = 0; f < forms.length; f += 1) {
    (function (form) {
      form.addEventListener("submit", function (event) { event.preventDefault(); clearMarks(form); handlers[form.getAttribute("data-tool")](form); });
      form.querySelector("[data-reset]").addEventListener("click", function () { form.reset(); clearMarks(form); setResult(form, "", false); form.querySelector("[data-copy-result]").disabled = true; });
      form.querySelector("[data-copy-result]").addEventListener("click", function () { var value = form.querySelector(".measure-result").textContent.trim(); if (value) copyText(value, this); });
      var fields = form.querySelectorAll("input,textarea"); for (var i = 0; i < fields.length; i += 1) fields[i].addEventListener("input", function () { this.setAttribute("aria-invalid", "false"); });
    })(forms[f]);
  }
})();
