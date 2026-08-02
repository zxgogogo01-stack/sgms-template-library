(function () {
  'use strict';

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var form = document.getElementById('tool-form');
  if (form) {
    var volumeField = document.getElementById('trade-volume');
    var feeField = document.getElementById('fee-rate');
    var rebateField = document.getElementById('rebate-rate');
    var output = document.getElementById('tool-result');
    var fields = [volumeField, feeField, rebateField];
    fields.forEach(function (field) {
      field.addEventListener('input', function () {
        field.removeAttribute('aria-invalid');
      });
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      fields.forEach(function (field) { field.removeAttribute('aria-invalid'); });
      var volume = Number(volumeField.value);
      var feeRate = Number(feeField.value);
      var rebateRate = Number(rebateField.value);
      var invalid = [];
      if (volumeField.value.trim() === '' || !Number.isFinite(volume) || volume < 0) {
        invalid.push({ field: volumeField, message: '交易额须填写不小于 0 的数字。' });
      }
      if (feeField.value.trim() === '' || !Number.isFinite(feeRate) || feeRate < 0) {
        invalid.push({ field: feeField, message: '手续费率须填写不小于 0 的百分数。' });
      }
      if (rebateField.value.trim() === '' || !Number.isFinite(rebateRate) || rebateRate < 0 || rebateRate > 100) {
        invalid.push({ field: rebateField, message: '返佣比例须填写 0–100 之间的百分数。' });
      }
      if (invalid.length) {
        invalid.forEach(function (item) { item.field.setAttribute('aria-invalid', 'true'); });
        output.textContent = invalid[0].message;
        invalid[0].field.focus();
        return;
      }

      var grossFee = volume * feeRate / 100;
      var rebate = grossFee * rebateRate / 100;
      var netFee = grossFee - rebate;
      output.innerHTML =
        '预计手续费：<strong>' + grossFee.toFixed(2) + '</strong><br>' +
        '预计返佣：<strong>' + rebate.toFixed(2) + '</strong><br>' +
        '返佣后净手续费：<strong>' + netFee.toFixed(2) + '</strong>';
    });
  }
})();
