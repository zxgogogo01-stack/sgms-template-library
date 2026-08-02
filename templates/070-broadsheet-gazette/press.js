/* 070 behaviors */
(function () {
  'use strict';

  var btn = document.getElementById('pressbar-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var nav = document.getElementById('pressbar-nav');
      if (!nav) return;
      var open = nav.classList.toggle('unfurled');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* two-column ledger: income vs spend */
  var ledgerForm = document.getElementById('lg-form');
  if (ledgerForm) {
    var incomeInput = document.getElementById('lg-in');
    var spendInput = document.getElementById('lg-out-fee');
    var ledgerInputs = [incomeInput, spendInput];
    ledgerInputs.forEach(function (input) {
      input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
    });
    ledgerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      ledgerInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
      var income = incomeInput.value.trim() === '' ? NaN : Number(incomeInput.value);
      var spend = spendInput.value.trim() === '' ? NaN : Number(spendInput.value);
      var out = document.getElementById('lg-result');
      var invalid = [];
      if (!Number.isFinite(income) || income < 0) invalid.push(incomeInput);
      if (!Number.isFinite(spend) || spend < 0) invalid.push(spendInput);
      if (invalid.length) {
        invalid.forEach(function (input) { input.setAttribute('aria-invalid', 'true'); });
        out.textContent = '请检查标红字段：月返佣收入与月手续费支出均须填写不小于 0 的金额。';
        invalid[0].focus();
        return;
      }
      var net = income - spend;
      var cover = spend > 0 ? income / spend * 100 : (income > 0 ? Infinity : 0);
      var coverText = cover === Infinity ? '支出为零' : cover.toFixed(1) + '%';
      var verdict;
      if (net >= 0) {
        verdict = '返佣已覆盖全部手续费，净结余 ' + net.toFixed(2) + '。';
      } else {
        verdict = '还差 ' + Math.abs(net).toFixed(2) + ' 未覆盖，覆盖率 ' + coverText + '。';
      }
      out.innerHTML = '收入栏 <b>' + income.toFixed(2) + '</b> · 支出栏 <b>' + spend.toFixed(2)
        + '</b> · 覆盖率 <b>' + coverText + '</b><br>' + verdict + '<br>演示口径，实际以平台结算为准。';
    });
  }
})();
