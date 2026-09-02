(function () {
  "use strict";
  var root = document.documentElement;

  function legacyCopy(text) {
    var node = document.createElement("textarea");
    node.value = text;
    node.setAttribute("readonly", "");
    node.style.position = "fixed";
    node.style.opacity = "0";
    document.body.appendChild(node);
    node.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
    node.remove();
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }

  var themeButton = document.querySelector("[data-night]");
  var savedTheme;
  try { savedTheme = localStorage.getItem("atlas-night"); } catch (_) { savedTheme = null; }
  if (savedTheme === "night") root.setAttribute("data-atlas", "night");
  function syncTheme() {
    if (!themeButton) return;
    var night = root.getAttribute("data-atlas") === "night";
    themeButton.setAttribute("aria-pressed", String(night));
    var label = themeButton.querySelector("span");
    if (label) label.textContent = night ? "日图" : "夜图";
  }
  syncTheme();
  if (themeButton) themeButton.addEventListener("click", function () {
    var next = root.getAttribute("data-atlas") === "night" ? "day" : "night";
    root.setAttribute("data-atlas", next);
    try { localStorage.setItem("atlas-night", next); } catch (_) {}
    syncTheme();
  });

  var inviteButton = document.querySelector("[data-invite-copy]");
  if (inviteButton) inviteButton.addEventListener("click", function () {
    var source = document.querySelector("[data-invite-source]");
    var status = document.querySelector("[data-invite-status]");
    copyText(source ? source.textContent.trim() : "").then(function (ok) {
      if (status) status.textContent = ok ? "邀请码已复制" : "复制失败，请手动选择";
    });
  });

  function finite(form, name) {
    var raw = form.elements[name].value.trim();
    if (raw === "") return NaN;
    var value = Number(raw);
    return Number.isFinite(value) ? value : NaN;
  }
  function compassPoint(angle) {
    var points = ["北", "北东北", "东北", "东东北", "东", "东东南", "东南", "南东南", "南", "南西南", "西南", "西西南", "西", "西西北", "西北", "北西北"];
    return points[Math.round(angle / 22.5) % 16];
  }
  function calculate(form) {
    var mode = form.getAttribute("data-tool");
    if (mode === "bearing") {
      var degrees = finite(form, "degrees");
      if (!Number.isFinite(degrees) || degrees < 0 || degrees > 360) throw new Error("请输入 0–360 之间的有效角度。");
      degrees = degrees === 360 ? 0 : degrees;
      return "方位：" + compassPoint(degrees) + "\n标准角：" + degrees.toFixed(1) + "°";
    }
    if (mode === "scale") {
      var centimeters = finite(form, "centimeters");
      var denominator = finite(form, "denominator");
      if (!(centimeters > 0) || !(denominator > 0) || !Number.isInteger(denominator)) throw new Error("图上距离须大于 0，比例尺分母须为正整数。");
      var kilometers = centimeters * denominator / 100000;
      return "实地距离：" + kilometers.toLocaleString(undefined, { maximumFractionDigits: 8 }) + " 公里\n比例尺：1:" + denominator.toLocaleString();
    }
    if (mode === "slope") {
      var rise = finite(form, "rise");
      var run = finite(form, "run");
      if (rise < 0 || !(run > 0) || !Number.isFinite(rise)) throw new Error("高差不可为负，水平距离必须大于 0。");
      return "坡度：" + (rise / run * 100).toFixed(2) + "%\n坡角：" + (Math.atan(rise / run) * 180 / Math.PI).toFixed(2) + "°";
    }
    if (mode === "midpoint") {
      var latA = finite(form, "latA"), lonA = finite(form, "lonA"), latB = finite(form, "latB"), lonB = finite(form, "lonB");
      if (![latA, lonA, latB, lonB].every(Number.isFinite) || Math.abs(latA) > 90 || Math.abs(latB) > 90 || Math.abs(lonA) > 180 || Math.abs(lonB) > 180) throw new Error("纬度须在 ±90、经度须在 ±180 范围内。");
      var a = lonA * Math.PI / 180, b = lonB * Math.PI / 180;
      var x = Math.cos(a) + Math.cos(b), y = Math.sin(a) + Math.sin(b);
      if (Math.hypot(x, y) < 1e-10) throw new Error("两点经度互为对跖，无法确定唯一中间经度。");
      var lon = Math.atan2(y, x) * 180 / Math.PI;
      return "中点纬度：" + ((latA + latB) / 2).toFixed(6) + "\n中点经度：" + lon.toFixed(6);
    }
    var distance = finite(form, "distance"), hours = finite(form, "hours");
    if (!(distance > 0) || !(hours > 0)) throw new Error("距离和用时都必须大于 0。");
    return "平均速度：" + (distance / hours).toFixed(2) + " 公里/小时\n平均配速：" + (hours * 60 / distance).toFixed(2) + " 分钟/公里";
  }

  document.querySelectorAll("form[data-tool]").forEach(function (form) {
    var output = form.querySelector(".survey-output");
    var copy = form.querySelector("[data-copy]");
    function render(text, error) {
      output.textContent = text;
      output.dataset.state = error ? "error" : "ready";
      copy.disabled = error || !text;
    }
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      try { render(calculate(form), false); }
      catch (error) { render(error.message, true); }
    });
    form.addEventListener("reset", function () {
      window.setTimeout(function () { output.textContent = ""; delete output.dataset.state; copy.disabled = true; }, 0);
    });
    copy.addEventListener("click", function () {
      copyText(output.textContent.trim()).then(function (ok) {
        var original = copy.textContent;
        copy.textContent = ok ? "已复制" : "请手动复制";
        window.setTimeout(function () { copy.textContent = original; }, 1500);
      });
    });
  });
})();
