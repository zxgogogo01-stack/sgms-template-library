(function () {
  "use strict";
  var root = document.documentElement;
  var weather = document.querySelector("[data-weather-toggle]");
  var saved = null;
  try { saved = localStorage.getItem("prairie-sky-15"); } catch (error) { saved = null; }
  if (saved === "night") root.setAttribute("data-prairie", "night");
  function paintWeather() { if (weather) weather.setAttribute("aria-pressed", root.getAttribute("data-prairie") === "night" ? "true" : "false"); }
  paintWeather();
  if (weather) weather.addEventListener("click", function () { var next = root.getAttribute("data-prairie") === "night" ? "day" : "night"; root.setAttribute("data-prairie", next); paintWeather(); try { localStorage.setItem("prairie-sky-15", next); } catch (error) { /* storage may be unavailable */ } });

  function copyValue(value, button) {
    function success() { var previous = button.textContent; button.textContent = "已复制"; setTimeout(function () { button.textContent = previous; }, 1300); }
    function fallback() { var area = document.createElement("textarea"); area.value = value; area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0"; document.body.appendChild(area); area.select(); try { document.execCommand("copy"); success(); } catch (error) { button.textContent = "请手动复制"; } document.body.removeChild(area); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(value).then(success, fallback); else fallback();
  }
  var inviteCopy = document.querySelector("[data-invite-copy]");
  if (inviteCopy) inviteCopy.addEventListener("click", function () { var source = document.querySelector("[data-invite-source]"); if (source) copyValue(source.textContent.trim(), inviteCopy); });

  function number(form, name) { var raw = form.elements[name].value.trim(); return raw === "" ? NaN : Number(raw); }
  function show(form, value, error) { var result = form.querySelector(".gauge-result"); var copy = form.querySelector("[data-result-copy]"); result.textContent = value; result.classList.toggle("result-error", Boolean(error)); copy.disabled = Boolean(error) || !value; }
  function flag(form, name, message) { var field = form.elements[name]; if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); } show(form, message, true); }
  function clean(form) { var fields = form.querySelectorAll("[aria-invalid]"); for (var i = 0; i < fields.length; i += 1) fields[i].setAttribute("aria-invalid", "false"); }
  function format(value) { return Number(value.toFixed(4)).toLocaleString("zh-CN", { maximumFractionDigits: 4 }); }
  function pace(form) { var posts = number(form, "posts"), days = number(form, "days"); if (!Number.isInteger(posts) || posts < 1) return flag(form, "posts", "计划篇数需为大于 0 的整数。"); if (!Number.isInteger(days) || days < 1) return flag(form, "days", "可用天数需为大于 0 的整数。"); var gap = posts === 1 ? days : days / (posts - 1); show(form, "共 " + posts + " 篇；平均每 " + format(gap) + " 天安排一次；日均 " + format(posts / days) + " 篇。", false); }
  function reading(form) { var value = form.elements.text.value.trim(), speed = number(form, "speed"); if (!value) return flag(form, "text", "请先粘贴需要估算的文字。"); if (!Number.isFinite(speed) || speed <= 0) return flag(form, "speed", "阅读速度必须大于 0。"); var count = value.replace(/\s/g, "").length; var minutes = count / speed; show(form, "有效字符 " + count + "；预计 " + format(minutes) + " 分钟；按整分钟预留 " + Math.max(1, Math.ceil(minutes)) + " 分钟。", false); }
  function change(form) { var oldValue = number(form, "oldValue"), newValue = number(form, "newValue"); if (!Number.isFinite(oldValue)) return flag(form, "oldValue", "请输入有效的原始数值。"); if (oldValue === 0) return flag(form, "oldValue", "原始数值不能为 0，否则百分比没有定义。"); if (!Number.isFinite(newValue)) return flag(form, "newValue", "请输入有效的新数值。"); var delta = newValue - oldValue, percent = delta / Math.abs(oldValue) * 100; show(form, "变化量 " + format(delta) + "；变化幅度 " + format(percent) + "%；方向：" + (delta === 0 ? "无变化" : delta > 0 ? "上升" : "下降") + "。", false); }
  function freshness(form) { var source = form.elements.sourceDate.value, reference = form.elements.referenceDate.value; if (!source) return flag(form, "sourceDate", "请选择资料日期。"); if (!reference) return flag(form, "referenceDate", "请选择核对日期。"); var start = new Date(source + "T00:00:00Z"), end = new Date(reference + "T00:00:00Z"); var days = Math.round((end - start) / 86400000); if (days < 0) return flag(form, "referenceDate", "核对日期不能早于资料日期。"); var band = days === 0 ? "同日记录" : days <= 30 ? "30 天内" : days <= 90 ? "31–90 天" : "超过 90 天"; show(form, "相隔 " + days + " 天；归入“" + band + "”。请结合资料类型自行决定是否重新核对。", false); }
  function sifter(form) { var raw = form.elements.lines.value; if (!raw.trim()) return flag(form, "lines", "请至少填写一行内容。"); var caseSensitive = form.elements.caseSensitive.checked, lines = raw.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean), seen = Object.create(null), kept = [], removed = 0; for (var i = 0; i < lines.length; i += 1) { var key = caseSensitive ? lines[i] : lines[i].toLocaleLowerCase(); if (seen[key]) removed += 1; else { seen[key] = true; kept.push(lines[i]); } } show(form, "保留 " + kept.length + " 行，移除 " + removed + " 条重复：\n" + kept.join("\n"), false); }
  var handlers = { pace: pace, reading: reading, change: change, freshness: freshness, sifter: sifter };
  var forms = document.querySelectorAll("[data-gauge]");
  for (var n = 0; n < forms.length; n += 1) (function (form) {
    form.addEventListener("submit", function (event) { event.preventDefault(); clean(form); handlers[form.getAttribute("data-gauge")](form); });
    form.querySelector("[data-gauge-reset]").addEventListener("click", function () { form.reset(); clean(form); show(form, "", false); form.querySelector("[data-result-copy]").disabled = true; });
    form.querySelector("[data-result-copy]").addEventListener("click", function () { var value = form.querySelector(".gauge-result").textContent.trim(); if (value) copyValue(value, this); });
    var entries = form.querySelectorAll("input,textarea"); for (var j = 0; j < entries.length; j += 1) entries[j].addEventListener("input", function () { this.setAttribute("aria-invalid", "false"); });
  })(forms[n]);
})();
