(function () {
  'use strict';

  var btn = document.getElementById('topfold-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var nav = document.getElementById('topfold-nav');
      if (!nav) return;
      var open = nav.classList.toggle('leafed80');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var foldForm = document.getElementById('fd-form');
  if (foldForm) {
    var volField = document.getElementById('fd-vol');
    var rateField = document.getElementById('fd-rate');
    var cutField = document.getElementById('fd-cut');
    var out = document.getElementById('fd-out');
    var fields = [volField, rateField, cutField];
    fields.forEach(function (field) {
      field.addEventListener('input', function () { field.removeAttribute('aria-invalid'); });
    });
    foldForm.addEventListener('submit', function (event) {
      event.preventDefault();
      fields.forEach(function (field) { field.removeAttribute('aria-invalid'); });
      var vol = Number(volField.value);
      var rate = Number(rateField.value);
      var hasCut = cutField.value.trim() !== '';
      var cut = hasCut ? Number(cutField.value) : 0;
      var invalid = [];
      if (volField.value.trim() === '' || !Number.isFinite(vol) || vol <= 0) invalid.push(volField);
      if (rateField.value.trim() === '' || !Number.isFinite(rate) || rate < 0 || rate > 100) invalid.push(rateField);
      if (hasCut && (!Number.isFinite(cut) || cut < 0 || cut > 100)) invalid.push(cutField);
      if (invalid.length) {
        invalid.forEach(function (field) { field.setAttribute('aria-invalid', 'true'); });
        if (invalid[0] === volField) {
          out.textContent = '单笔金额须填写大于 0 的数字。';
        } else if (invalid[0] === rateField) {
          out.textContent = '费率须为 0–100 之间的百分数。';
        } else {
          out.textContent = '返佣比例可留空；填写时须为 0–100 之间的百分数。';
        }
        invalid[0].focus();
        return;
      }
      var steps = [1, 5, 10, 30];
      var lines = '';
      for (var i = 0; i < steps.length; i++) {
        var n = steps[i];
        var fee = vol * rate / 100 * n;
        var net = fee * (1 - cut / 100);
        lines += n + ' 笔：手续费 <b>' + fee.toFixed(2) + '</b>，净成本 <b>' + net.toFixed(2) + '</b><br>';
      }
      out.innerHTML = lines + '按同额同费率折页展开，演示口径，实际以平台结算为准。';
    });
  }
})();
