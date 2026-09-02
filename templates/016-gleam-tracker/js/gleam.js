(function () {
  "use strict";

  var root = document.documentElement;
  var exposure = document.querySelector("[data-exposure]");
  var saved = null;
  try { saved = window.localStorage.getItem("gleam-spectrum"); } catch (error) { saved = null; }
  if (saved === "light" || saved === "dark") root.setAttribute("data-spectrum", saved);

  if (exposure) {
    exposure.setAttribute("aria-pressed", root.getAttribute("data-spectrum") === "light" ? "true" : "false");
    exposure.addEventListener("click", function () {
      var next = root.getAttribute("data-spectrum") === "light" ? "dark" : "light";
      root.setAttribute("data-spectrum", next);
      exposure.setAttribute("aria-pressed", next === "light" ? "true" : "false");
      try { window.localStorage.setItem("gleam-spectrum", next); } catch (error) { /* storage is optional */ }
    });
  }

  function copyText(value, done, failed) {
    function legacyCopy() {
      var field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      try { document.execCommand("copy"); done(); } catch (error) { failed(); }
      field.remove();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(done, legacyCopy);
      return;
    }
    legacyCopy();
  }

  var inviteCopy = document.querySelector("[data-invite-copy]");
  if (inviteCopy) {
    inviteCopy.addEventListener("click", function () {
      var source = document.querySelector("[data-invite-source]");
      var status = document.querySelector("[data-invite-status]");
      copyText(source ? source.textContent.trim() : "", function () {
        inviteCopy.textContent = "已复制";
        if (status) status.textContent = "邀请码已复制";
      }, function () {
        if (status) status.textContent = "复制失败，请手动选择邀请码";
      });
    });
  }

  function numbers(value) {
    if (!value.trim()) return null;
    var list = value.split(/[\s,，;；]+/).filter(Boolean).map(Number);
    return list.length && list.every(Number.isFinite) ? list : null;
  }
  function rounded(value, digits) {
    return Number(value.toFixed(digits)).toString();
  }

  var forms = document.querySelectorAll("[data-instrument]");
  Array.prototype.forEach.call(forms, function (form) {
    var output = form.querySelector(".instrument-output");
    var copy = form.querySelector("[data-tool-copy]");
    function show(value, isError) {
      output.textContent = value;
      output.setAttribute("data-state", isError ? "error" : "ready");
      copy.disabled = isError || !value;
    }
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var mode = form.getAttribute("data-instrument");
      if (mode === "zscore") {
        var zValues = numbers(form.elements.series.value);
        if (!zValues || zValues.length < 2) { show("请至少输入两个有效数值。", true); return; }
        var mean = zValues.reduce(function (sum, value) { return sum + value; }, 0) / zValues.length;
        var variance = zValues.reduce(function (sum, value) { return sum + Math.pow(value - mean, 2); }, 0) / zValues.length;
        var deviation = Math.sqrt(variance);
        if (deviation === 0) { show("所有数值相同，标准差为 0，无法换算标准分。", true); return; }
        show("均值 " + rounded(mean, 4) + "；总体标准差 " + rounded(deviation, 4) + "；标准分：" + zValues.map(function (value) { return rounded((value - mean) / deviation, 4); }).join(", "), false);
        return;
      }
      if (mode === "moving") {
        var movingValues = numbers(form.elements.series.value);
        var windowSize = Number(form.elements.window.value);
        if (!movingValues) { show("请填写有效数值序列。", true); return; }
        if (!Number.isInteger(windowSize) || windowSize < 1 || windowSize > movingValues.length) { show("窗口大小必须是 1 到序列长度之间的整数。", true); return; }
        var averages = [];
        for (var i = 0; i <= movingValues.length - windowSize; i += 1) {
          var slice = movingValues.slice(i, i + windowSize);
          averages.push(rounded(slice.reduce(function (sum, value) { return sum + value; }, 0) / windowSize, 4));
        }
        show("窗口 " + windowSize + "；输出 " + averages.length + " 项：" + averages.join(", "), false);
        return;
      }
      if (mode === "sample") {
        var proportion = Number(form.elements.proportion.value);
        var margin = Number(form.elements.margin.value);
        var z = Number(form.elements.confidence.value);
        if (![proportion, margin, z].every(Number.isFinite) || proportion <= 0 || proportion >= 100 || margin <= 0 || margin > 50) { show("请填写大于 0 且小于 100% 的预估比例，以及大于 0 的允许误差。", true); return; }
        var p = proportion / 100;
        var e = margin / 100;
        var size = Math.ceil((z * z * p * (1 - p)) / (e * e));
        show("最低样本量约 " + size + "；本结果使用简单随机抽样近似，未计有限总体修正与无应答损耗。", false);
        return;
      }
      if (mode === "consensus") {
        var positive = Number(form.elements.positive.value);
        var neutral = Number(form.elements.neutral.value);
        var negative = Number(form.elements.negative.value);
        if (![positive, neutral, negative].every(Number.isFinite) || [positive, neutral, negative].some(function (value) { return value < 0 || !Number.isInteger(value); })) { show("三类票数必须是非负整数。", true); return; }
        var total = positive + neutral + negative;
        if (total === 0) { show("总票数不能为 0。", true); return; }
        var score = ((positive - negative) / total) * 100;
        var direction = score > 0 ? "正向" : score < 0 ? "负向" : "中性";
        show("共 " + total + " 票；净共识分 " + rounded(score, 2) + "；方向：" + direction + "。", false);
        return;
      }
      var value = Number(form.elements.value.value);
      var sourceMin = Number(form.elements.sourceMin.value);
      var sourceMax = Number(form.elements.sourceMax.value);
      var targetMin = Number(form.elements.targetMin.value);
      var targetMax = Number(form.elements.targetMax.value);
      if (![value, sourceMin, sourceMax, targetMin, targetMax].every(Number.isFinite)) { show("请完整填写五个有效数值。", true); return; }
      if (sourceMin === sourceMax) { show("原量程最大值与最小值不能相同。", true); return; }
      var mapped = targetMin + ((value - sourceMin) / (sourceMax - sourceMin)) * (targetMax - targetMin);
      show("映射结果：" + rounded(mapped, 6) + "。输入超出原量程时会按同一线性关系外推。", false);
    });
    form.addEventListener("reset", function () {
      window.setTimeout(function () { output.textContent = ""; output.removeAttribute("data-state"); copy.disabled = true; copy.textContent = "复制结果"; }, 0);
    });
    copy.addEventListener("click", function () {
      copyText(output.textContent, function () { copy.textContent = "已复制"; }, function () { copy.textContent = "请手动复制"; });
    });
  });
}());
