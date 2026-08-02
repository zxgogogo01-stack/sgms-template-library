(function () {
  'use strict';

  var btn = document.getElementById('menubar-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var nav = document.getElementById('menubar-nav');
      if (!nav) return;
      var open = nav.classList.toggle('popped');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var copyBtn = document.getElementById('sn-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var node = document.getElementById('sn-code');
      if (!node) return;
      var text = node.textContent.trim();
      var done = function () {
        copyBtn.textContent = '已复制';
        setTimeout(function () { copyBtn.textContent = '复制'; }, 1400);
      };
      var fallback = function () {
        var r = document.createRange();
        r.selectNodeContents(node);
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
        try { document.execCommand('copy'); done(); } catch (e) {}
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
    });
  }

  var rvForm = document.getElementById('rv-form');
  if (rvForm) {
    var amtInput = document.getElementById('rv-amt');
    var rateInput = document.getElementById('rv-rate');
    var paidInput = document.getElementById('rv-paid');
    var rvInputs = [amtInput, rateInput, paidInput];
    rvInputs.forEach(function (input) {
      input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
    });
    rvForm.addEventListener('submit', function (event) {
      event.preventDefault();
      rvInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
      var amt = amtInput.value.trim() === '' ? NaN : Number(amtInput.value);
      var rate = rateInput.value.trim() === '' ? NaN : Number(rateInput.value);
      var paid = paidInput.value.trim() === '' ? NaN : Number(paidInput.value);
      var out = document.getElementById('rv-out');
      var invalid = [];
      if (!Number.isFinite(amt) || amt <= 0) invalid.push(amtInput);
      if (!Number.isFinite(rate) || rate <= 0 || rate > 100) invalid.push(rateInput);
      if (!Number.isFinite(paid) || paid < 0) invalid.push(paidInput);
      if (invalid.length) {
        invalid.forEach(function (input) { input.setAttribute('aria-invalid', 'true'); });
        out.textContent = '请检查标红字段：交易额须大于 0，官方费率须在 0–100 之间，实付手续费不能为负。';
        invalid[0].focus();
        return;
      }
      var full = amt * rate / 100;
      if (full <= 0) {
        out.textContent = '官方费率下手续费为 0，无法还原比例';
        return;
      }
      if (paid > full) {
        paidInput.setAttribute('aria-invalid', 'true');
        out.innerHTML = '实付 <b>' + paid.toFixed(2) + '</b> 高于官方口径 <b>' + full.toFixed(2) + '</b>——先核对费率档位或交易额。';
        paidInput.focus();
        return;
      }
      var cut = (1 - paid / full) * 100;
      out.innerHTML = '官方口径手续费 <b>' + full.toFixed(2) + '</b>，实付 <b>' + paid.toFixed(2)
        + '</b>。<br>推算你的实际减免比例约 <b>' + cut.toFixed(1) + '%</b>。<br>演示口径，实际以平台结算为准。';
    });
  }
})();
