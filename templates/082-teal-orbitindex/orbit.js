/* 082 behaviors */
(function () {
  'use strict';

  var btn = document.getElementById('orbitbar-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var nav = document.getElementById('orbitbar-nav');
      if (!nav) return;
      var open = nav.classList.toggle('spunout');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* fee erosion vs P&L */
  var erForm = document.getElementById('er-form');
  if (erForm) {
    var pnlField = document.getElementById('er-pnl');
    var feeField = document.getElementById('er-fee');
    var out = document.getElementById('er-out');
    var fields = [pnlField, feeField];
    fields.forEach(function (field) {
      field.addEventListener('input', function () {
        field.removeAttribute('aria-invalid');
      });
    });
    erForm.addEventListener('submit', function (event) {
      event.preventDefault();
      fields.forEach(function (field) { field.removeAttribute('aria-invalid'); });
      var pnl = Number(pnlField.value);
      var fee = Number(feeField.value);
      var invalid = [];
      if (pnlField.value.trim() === '' || !Number.isFinite(pnl)) {
        invalid.push({ field: pnlField, message: '期间净盈亏须填写有效数字，可为负数。' });
      }
      if (feeField.value.trim() === '' || !Number.isFinite(fee) || fee < 0) {
        invalid.push({ field: feeField, message: '期间手续费须填写不小于 0 的数字。' });
      }
      if (invalid.length) {
        invalid.forEach(function (item) { item.field.setAttribute('aria-invalid', 'true'); });
        out.textContent = invalid[0].message;
        invalid[0].field.focus();
        return;
      }
      var gross = pnl + fee;
      var text = '毛盈亏（未扣费）约 <b>' + gross.toFixed(2) + '</b> · 手续费 <b>' + fee.toFixed(2) + '</b>';
      if (gross > 0) {
        var ratio = fee / gross * 100;
        var verdict;
        if (ratio < 10) verdict = '费用占毛利不到一成，蚕食度低。';
        else if (ratio < 30) verdict = '费用吃掉毛利的 ' + ratio.toFixed(1) + '%——值得做返佣优化。';
        else verdict = '费用吃掉毛利的 ' + ratio.toFixed(1) + '%——先降频或降费，再谈别的。';
        text += '<br>蚕食度 <b>' + ratio.toFixed(1) + '%</b>：' + verdict;
      } else {
        text += '<br>毛盈亏为负，本期费用全部是净支出——把频率和费率一起复盘。';
      }
      out.innerHTML = text + '<br>演示口径，仅供复盘参考，不构成投资建议。';
    });
  }
})();
