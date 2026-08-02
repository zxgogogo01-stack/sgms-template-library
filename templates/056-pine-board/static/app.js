(function () {
  'use strict';

  var nb = document.getElementById('gable-btn');
  if (nb) {
    nb.addEventListener('click', function () {
      var menu = document.getElementById('gable-menu');
      if (!menu) return;
      var open = menu.classList.toggle('ajar');
      nb.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var cbtn = document.getElementById('gt-copy');
  if (cbtn) {
    cbtn.addEventListener('click', function () {
      var node = document.getElementById('gt-code');
      if (!node) return;
      var text = node.textContent.trim();
      var done = function () {
        cbtn.textContent = '已复制';
        setTimeout(function () { cbtn.textContent = '复制'; }, 1400);
      };
      var pick = function () {
        var r = document.createRange();
        r.selectNodeContents(node);
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
        try { document.execCommand('copy'); done(); } catch (e) {}
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, pick);
      } else {
        pick();
      }
    });
  }

  var fb = document.getElementById('fee-run');
  var feeForm = document.getElementById('fee-form');
  if (fb && feeForm) {
    var amountInput = document.getElementById('fee-amt');
    var rateInput = document.getElementById('fee-rate');
    var cutInput = document.getElementById('fee-cut');
    var feeInputs = [amountInput, rateInput, cutInput];
    feeInputs.forEach(function (input) {
      input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
    });
    feeForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var amt = parseFloat(amountInput.value);
      var rate = parseFloat(rateInput.value);
      var cut = cutInput.value.trim() ? parseFloat(cutInput.value) : 0;
      var out = document.getElementById('fee-out');
      feeInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
      var invalidAmount = isNaN(amt) || amt < 0;
      var invalidRate = isNaN(rate) || rate < 0 || rate > 100;
      var invalidCut = isNaN(cut) || cut < 0 || cut > 100;
      if (invalidAmount || invalidRate || invalidCut) {
        if (invalidAmount) amountInput.setAttribute('aria-invalid', 'true');
        if (invalidRate) rateInput.setAttribute('aria-invalid', 'true');
        if (invalidCut) cutInput.setAttribute('aria-invalid', 'true');
        out.textContent = '请填写有效金额与费率；百分比须在 0—100% 之间。';
        (invalidAmount ? amountInput : invalidRate ? rateInput : cutInput).focus();
        return;
      }
      var fee = amt * rate / 100;
      var back = fee * cut / 100;
      out.innerHTML = '手续费 <b>' + fee.toFixed(2) + '</b> · 预计返佣 <b>' + back.toFixed(2) + '</b> · 净成本 <b>' + (fee - back).toFixed(2) + '</b><br>演示口径，实际以平台结算为准。';
    });
  }
})();
