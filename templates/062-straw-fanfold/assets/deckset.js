/* 062 behaviors */
(function () {
  'use strict';

  var btn = document.getElementById('visor-btn');
  var nav = document.getElementById('visor-nav') || document.querySelector('.visor-nav');
  if (nav && !nav.id) nav.id = 'visor-nav';
  if (!btn && nav) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'visor-btn';
    btn.id = 'visor-btn';
    btn.setAttribute('aria-label', '主导航');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'visor-nav');
    btn.textContent = '☰';
    nav.parentNode.insertBefore(btn, nav);
  }
  if (btn) {
    btn.addEventListener('click', function () {
      var nav = document.getElementById('visor-nav');
      if (!nav) return;
      var open = nav.classList.toggle('tipped');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var copyBtn = document.getElementById('ct-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var node = document.getElementById('ct-code');
      if (!node) return;
      var text = node.textContent.trim();
      var done = function () {
        copyBtn.textContent = '已复制';
        setTimeout(function () { copyBtn.textContent = '复制'; }, 1400);
      };
      /* legacy fallback */
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

  /* annual cost estimate */
  var yrForm = document.getElementById('yc-form');
  if (yrForm) {
    var volInput = document.getElementById('yc-vol');
    var rateInput = document.getElementById('yc-rate');
    var cutInput = document.getElementById('yc-cut');
    var yearInputs = [volInput, rateInput, cutInput];
    yearInputs.forEach(function (input) {
      input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
    });
    yrForm.addEventListener('submit', function (event) {
      event.preventDefault();
      yearInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
      var vol = volInput.value.trim() === '' ? NaN : Number(volInput.value);
      var rate = rateInput.value.trim() === '' ? NaN : Number(rateInput.value);
      var cutRaw = cutInput.value.trim();
      var cut = cutRaw === '' ? 0 : Number(cutRaw);
      var out = document.getElementById('yc-out');
      var invalid = [];
      if (!Number.isFinite(vol) || vol < 0) invalid.push(volInput);
      if (!Number.isFinite(rate) || rate < 0 || rate > 100) invalid.push(rateInput);
      if (!Number.isFinite(cut) || cut < 0 || cut > 100) invalid.push(cutInput);
      if (invalid.length) {
        invalid.forEach(function (input) { input.setAttribute('aria-invalid', 'true'); });
        out.textContent = '请检查标红字段：月交易量不能为负，费率与返佣比例须在 0–100 之间；返佣比例可留空按 0 计算。';
        invalid[0].focus();
        return;
      }
      var yearFee = vol * rate / 100 * 12;
      var yearBack = yearFee * cut / 100;
      out.innerHTML = '全年手续费约 <b>' + yearFee.toFixed(2) + '</b> · 全年返佣约 <b>' + yearBack.toFixed(2)
        + '</b> · 净成本 <b>' + (yearFee - yearBack).toFixed(2) + '</b><br>按月量恒定折算，演示口径，实际以平台结算为准。';
    });
  }
})();
