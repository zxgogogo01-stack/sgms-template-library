/* 074 behaviors */
(function () {
  'use strict';

  var btn = document.getElementById('dialbar-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var nav = document.getElementById('dialbar-nav');
      if (!nav) return;
      var open = nav.classList.toggle('tuned');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* blended maker/taker rate */
  var mixForm = document.getElementById('mx-form');
  if (mixForm) {
    var makerField = document.getElementById('mx-maker');
    var takerField = document.getElementById('mx-taker');
    var shareField = document.getElementById('mx-share');
    var out = document.getElementById('mx-out');
    var fields = [makerField, takerField, shareField];
    var bad = function (field, value) {
      return field.value.trim() === '' || !Number.isFinite(value) || value < 0 || value > 100;
    };
    fields.forEach(function (field) {
      field.addEventListener('input', function () { field.removeAttribute('aria-invalid'); });
    });
    mixForm.addEventListener('submit', function (event) {
      event.preventDefault();
      fields.forEach(function (field) { field.removeAttribute('aria-invalid'); });
      var maker = Number(makerField.value);
      var taker = Number(takerField.value);
      var share = Number(shareField.value);
      var invalid = [];
      if (bad(makerField, maker)) invalid.push(makerField);
      if (bad(takerField, taker)) invalid.push(takerField);
      if (bad(shareField, share)) invalid.push(shareField);
      if (invalid.length) {
        invalid.forEach(function (field) { field.setAttribute('aria-invalid', 'true'); });
        if (invalid.length === fields.length) {
          out.textContent = '请完整填写三项 0–100 的百分数：挂单费率、吃单费率和挂单占比。';
        } else if (invalid[0] === makerField) {
          out.textContent = '挂单费率须为 0–100 之间的百分数。';
        } else if (invalid[0] === takerField) {
          out.textContent = '吃单费率须为 0–100 之间的百分数。';
        } else {
          out.textContent = '挂单占比须为 0–100 之间的百分数。';
        }
        invalid[0].focus();
        return;
      }
      var mixed = maker * share / 100 + taker * (100 - share) / 100;
      var perWan = mixed / 100 * 10000;
      out.innerHTML = '混合费率约 <b>' + mixed.toFixed(4) + '%</b> · 每万元手续费约 <b>' + perWan.toFixed(2)
        + '</b><br>挂单占比越高，混合费率越靠近挂单档。<br>演示口径，实际以平台结算为准。';
    });
  }
})();
