(function () {
  "use strict";

  var form = document.getElementById("share-form");
  if (!form) return;

  var partInput = document.getElementById("share-part");
  var totalInput = document.getElementById("share-total");
  var output = document.getElementById("share-out");
  var breakdown = document.getElementById("share-breakdown");
  var breakdownValues = breakdown.querySelectorAll("strong");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var part = Number(partInput.value);
    var total = Number(totalInput.value);
    var invalid = [];

    clearInvalid();
    if (!Number.isFinite(part) || part < 0 || partInput.value.trim() === "") invalid.push(partInput);
    if (!Number.isFinite(total) || total <= 0 || totalInput.value.trim() === "") invalid.push(totalInput);
    if (Number.isFinite(part) && Number.isFinite(total) && part > total) invalid.push(partInput, totalInput);

    if (invalid.length) {
      invalid.forEach(function (field) { field.setAttribute("aria-invalid", "true"); });
      output.className = "share-result share-result--error";
      output.innerHTML = "<span class=\"share-result__label\">CHECK THE VALUES</span><strong>无法计算这组数值</strong><small>总体必须大于 0，且部分值不能为负数或超过总体。</small>";
      resetBreakdown();
      invalid[0].focus();
      return;
    }

    var share = (part / total) * 100;
    var remaining = total - part;
    var ratio = part === 0 ? "0 : 1" : "1 : " + formatNumber(total / part, 2);
    output.className = "share-result share-result--success";
    output.innerHTML = "<span class=\"share-result__label\">CALCULATION COMPLETE</span><strong>" + formatNumber(part, 2) + " 占 " + formatNumber(total, 2) + " 的 " + share.toFixed(2) + "%</strong><small>计算只说明数值关系，不判断来源质量或实际意义。</small>";
    breakdownValues[0].textContent = share.toFixed(2) + "%";
    breakdownValues[1].textContent = formatNumber(remaining, 2);
    breakdownValues[2].textContent = ratio;
    breakdown.setAttribute("aria-hidden", "false");
  });

  form.addEventListener("reset", function () {
    window.setTimeout(function () {
      clearInvalid();
      output.className = "share-result";
      output.innerHTML = "<span class=\"share-result__label\">WAITING FOR INPUT</span><strong>输入部分值与总体值</strong><small>结果会同时显示占比、剩余值与相对比例。</small>";
      resetBreakdown();
    }, 0);
  });

  function clearInvalid() {
    partInput.removeAttribute("aria-invalid");
    totalInput.removeAttribute("aria-invalid");
  }

  function resetBreakdown() {
    breakdownValues.forEach(function (node) { node.textContent = "—"; });
    breakdown.setAttribute("aria-hidden", "true");
  }

  function formatNumber(value, maximumDecimals) {
    return value.toLocaleString(undefined, { maximumFractionDigits: maximumDecimals });
  }
})();
