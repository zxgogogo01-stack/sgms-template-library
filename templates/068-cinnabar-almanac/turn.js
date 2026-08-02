(function () {
  'use strict';

  var btn = document.getElementById('eaves-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var nav = document.getElementById('eaves-nav');
      if (!nav) return;
      var open = nav.classList.toggle('unlatched');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var avgForm = document.getElementById('da-form');
  if (avgForm) {
    var feeInput = document.getElementById('da-fee');
    var backInput = document.getElementById('da-back');
    var daysInput = document.getElementById('da-days');
    var avgInputs = [feeInput, backInput, daysInput];
    avgInputs.forEach(function (input) {
      input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
    });
    avgForm.addEventListener('submit', function (event) {
      event.preventDefault();
      avgInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
      var fee = feeInput.value.trim() === '' ? NaN : Number(feeInput.value);
      var backRaw = backInput.value.trim();
      var back = backRaw === '' ? 0 : Number(backRaw);
      var days = daysInput.value.trim() === '' ? NaN : Number(daysInput.value);
      var out = document.getElementById('da-out');
      var invalid = [];
      if (!Number.isFinite(fee) || fee < 0) invalid.push(feeInput);
      if (!Number.isFinite(back) || back < 0) invalid.push(backInput);
      if (!Number.isFinite(days) || days <= 0 || !Number.isInteger(days)) invalid.push(daysInput);
      if (invalid.length) {
        invalid.forEach(function (input) { input.setAttribute('aria-invalid', 'true'); });
        out.textContent = '请检查标红字段：月手续费与返佣不能为负，天数须为正整数；返佣可留空按 0 计算。';
        invalid[0].focus();
        return;
      }
      if (back > fee) {
        backInput.setAttribute('aria-invalid', 'true');
        out.textContent = '返佣大于手续费，请先核对两个数的统计口径。';
        backInput.focus();
        return;
      }
      var net = fee - back;
      var daily = net / days;
      out.innerHTML = '月净成本 <b>' + net.toFixed(2) + '</b> · 日均 <b>' + daily.toFixed(2)
        + '</b> · 年化约 <b>' + (net * 12).toFixed(2) + '</b><br>演示口径，实际以平台结算为准。';
    });
  }
})();
