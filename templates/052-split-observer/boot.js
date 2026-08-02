(function () {
  'use strict';

  var btn = document.getElementById('mast-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var nav = document.getElementById('mast-nav');
      if (!nav) return;
      var open = nav.classList.toggle('ajar');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var copy = document.getElementById('cp-copy');
  if (copy) {
    copy.addEventListener('click', function () {
      var code = document.getElementById('cp-code');
      if (!code) return;
      var text = code.textContent.trim();
      var ok = function () {
        copy.textContent = '已复制';
        setTimeout(function () { copy.textContent = '复制'; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(ok, function () { pick(code, ok); });
      } else {
        pick(code, ok);
      }
    });
  }

  function pick(node, then) {
    var range = document.createRange();
    range.selectNodeContents(node);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try {
      document.execCommand('copy');
      then();
    } catch (e) {}
  }

  var run = document.getElementById('rb-run');
  var rebateForm = document.getElementById('rb-form');
  if (run && rebateForm) {
    var volumeInput = document.getElementById('rb-vol');
    var feeInput = document.getElementById('rb-fee');
    var cutInput = document.getElementById('rb-cut');
    var rebateInputs = [volumeInput, feeInput, cutInput];
    rebateInputs.forEach(function (input) {
      input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
    });
    rebateForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var vol = parseFloat(volumeInput.value);
      var fee = parseFloat(feeInput.value);
      var cut = parseFloat(cutInput.value);
      var out = document.getElementById('rb-out');
      rebateInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
      var invalidVolume = isNaN(vol) || vol < 0;
      var invalidFee = isNaN(fee) || fee < 0 || fee > 100;
      var invalidCut = isNaN(cut) || cut < 0 || cut > 100;
      if (invalidVolume || invalidFee || invalidCut) {
        if (invalidVolume) volumeInput.setAttribute('aria-invalid', 'true');
        if (invalidFee) feeInput.setAttribute('aria-invalid', 'true');
        if (invalidCut) cutInput.setAttribute('aria-invalid', 'true');
        out.textContent = '请补全三项；金额不能为负，费率与分成比例须在 0—100% 之间。';
        (invalidVolume ? volumeInput : invalidFee ? feeInput : cutInput).focus();
        return;
      }
      var feeSum = vol * fee / 100;
      var back = feeSum * cut / 100;
      out.textContent = '手续费约 ' + feeSum.toFixed(4) + '，按 ' + cut + '% 分成，预估返佣 ' + back.toFixed(4) + '。演示口径，实际以平台结算为准。';
    });
  }
})();
