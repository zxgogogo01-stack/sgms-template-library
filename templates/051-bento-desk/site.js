// 051 bento-desk 行为：折叠导航 / 邀请码复制 / 手续费对比
(function () {
    'use strict';

    var fold = document.getElementById('fold-btn');
    if (fold) {
        fold.addEventListener('click', function () {
            var nav = document.getElementById('crown-nav');
            if (!nav) return;
            var open = nav.classList.toggle('unfold');
            fold.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    var copyBtn = document.getElementById('pass-copy');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            var code = document.getElementById('pass-code');
            if (!code) return;
            var text = code.textContent.trim();
            var done = function () {
                copyBtn.textContent = '已复制';
                setTimeout(function () { copyBtn.textContent = '复制'; }, 1600);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(code, done); });
            } else {
                fallbackCopy(code, done);
            }
        });
    }

    function fallbackCopy(node, then) {
        var range = document.createRange();
        range.selectNodeContents(node);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try {
            document.execCommand('copy');
            then();
        } catch (err) {
            // 保留选中，用户可手动复制
        }
    }

    // 手续费对比器（tool.html）
    var cmp = document.getElementById('cmp-run');
    var cmpForm = document.getElementById('cmp-form');
    if (cmp && cmpForm) {
        var cmpVol = document.getElementById('cmp-vol');
        var cmpA = document.getElementById('cmp-a');
        var cmpB = document.getElementById('cmp-b');
        var cmpInputs = [cmpVol, cmpA, cmpB];
        cmpInputs.forEach(function (input) {
            input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
        });
        cmpForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var vol = parseFloat(cmpVol.value);
            var ra = parseFloat(cmpA.value);
            var rb = parseFloat(cmpB.value);
            var out = document.getElementById('cmp-out');
            cmpInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
            var invalidVol = isNaN(vol) || vol < 0;
            var invalidA = isNaN(ra) || ra < 0 || ra > 100;
            var invalidB = isNaN(rb) || rb < 0 || rb > 100;
            if (invalidVol || invalidA || invalidB) {
                if (invalidVol) cmpVol.setAttribute('aria-invalid', 'true');
                if (invalidA) cmpA.setAttribute('aria-invalid', 'true');
                if (invalidB) cmpB.setAttribute('aria-invalid', 'true');
                out.textContent = '请补全三个数；金额不能为负，费率须在 0—100% 之间。';
                (invalidVol ? cmpVol : invalidA ? cmpA : cmpB).focus();
                return;
            }
            var fa = vol * ra / 100;
            var fb = vol * rb / 100;
            var gap = Math.abs(fa - fb);
            var line = '平台 A 约收 ' + fa.toFixed(4) + '，平台 B 约收 ' + fb.toFixed(4);
            if (gap < 1e-9) {
                line += '，两边打平。';
            } else {
                line += '，' + (fa < fb ? 'A' : 'B') + ' 便宜 ' + gap.toFixed(4) + '。';
            }
            out.textContent = line + ' 仅按输入费率估算，实际以平台结算为准。';
        });
    }
})();
