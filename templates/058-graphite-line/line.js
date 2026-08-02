/* 058 behaviors: nav, copy, tier lookup */
(function () {
  'use strict';

  var burger = document.getElementById('crest-burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var nav = document.getElementById('crest-nav');
      if (!nav) return;
      var open = nav.classList.toggle('agape');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var copyBtn = document.getElementById('vc-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var node = document.getElementById('vc-code');
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

  /* demo tier table lookup, local only */
  var tiers = [
    { cap: 100000, taker: 0.06, maker: 0.02 },
    { cap: 1000000, taker: 0.05, maker: 0.016 },
    { cap: 10000000, taker: 0.04, maker: 0.012 },
    { cap: Infinity, taker: 0.03, maker: 0.008 }
  ];

  var lookupForm = document.getElementById('tq-form');
  if (lookupForm) {
    var volInput = document.getElementById('tq-vol');
    var cutInput = document.getElementById('tq-cut');
    [volInput, cutInput].forEach(function (input) {
      input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
    });
    lookupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      volInput.removeAttribute('aria-invalid');
      cutInput.removeAttribute('aria-invalid');
      var vol = volInput.value.trim() === '' ? NaN : Number(volInput.value);
      var cutRaw = cutInput.value.trim();
      var cut = cutRaw === '' ? 30 : Number(cutRaw);
      var out = document.getElementById('tq-out');
      if (!Number.isFinite(vol) || vol < 0) {
        volInput.setAttribute('aria-invalid', 'true');
        out.textContent = '请填写不小于 0 的 30 天交易量。';
        volInput.focus();
        return;
      }
      if (!Number.isFinite(cut) || cut < 0 || cut > 100) {
        cutInput.setAttribute('aria-invalid', 'true');
        out.textContent = '返佣比例可留空使用 30%，填写时须在 0–100 之间。';
        cutInput.focus();
        return;
      }
      var t = tiers[0];
      for (var i = 0; i < tiers.length; i++) {
        if (vol < tiers[i].cap) { t = tiers[i]; break; }
      }
      var fee = vol * t.taker / 100;
      var back = fee * cut / 100;
      out.innerHTML = '演示档位：吃单 <b>' + t.taker.toFixed(3) + '%</b> · 挂单 <b>' + t.maker.toFixed(3)
        + '%</b><br>按全吃单估算：手续费 <b>' + fee.toFixed(2) + '</b>，返佣（' + cut + '%）约 <b>' + back.toFixed(2)
        + '</b><br>表内数字为演示，实际以平台档位页为准。';
    });
  }
})();
