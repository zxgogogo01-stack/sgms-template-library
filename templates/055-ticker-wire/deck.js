/* 055 behaviors */
(function () {
    'use strict';

    var btn = document.getElementById('console-btn');
    if (btn) {
        btn.addEventListener('click', function () {
            var nav = document.getElementById('console-nav');
            if (!nav) return;
            var open = nav.classList.toggle('lit');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    var cp = document.getElementById('hp-copy');
    if (cp) {
        cp.addEventListener('click', function () {
            var code = document.getElementById('hp-code');
            if (!code) return;
            var text = code.textContent.trim();
            var ok = function () {
                cp.textContent = '已复制';
                setTimeout(function () { cp.textContent = '复制'; }, 1500);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(ok, function () { hold(code, ok); });
            } else {
                hold(code, ok);
            }
        });
    }

    function hold(node, cb) {
        var range = document.createRange();
        range.selectNodeContents(node);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try {
            document.execCommand('copy');
            cb();
        } catch (e) { /* selection kept */ }
    }

    /* rebate converter on tool page */
    var run = document.getElementById('cv-run');
    var converterForm = document.getElementById('cv-form');
    if (run && converterForm) {
        var feeInput = document.getElementById('cv-fee');
        var cutInput = document.getElementById('cv-cut');
        var converterInputs = [feeInput, cutInput];
        converterInputs.forEach(function (input) {
            input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
        });
        converterForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var fee = parseFloat(feeInput.value);
            var cut = parseFloat(cutInput.value);
            var out = document.getElementById('cv-out');
            converterInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
            var invalidFee = isNaN(fee) || fee < 0;
            var invalidCut = isNaN(cut) || cut < 0 || cut > 100;
            if (invalidFee || invalidCut) {
                if (invalidFee) feeInput.setAttribute('aria-invalid', 'true');
                if (invalidCut) cutInput.setAttribute('aria-invalid', 'true');
                out.textContent = '请补全两项；手续费不能为负，分成比例须在 0—100% 之间。';
                (invalidFee ? feeInput : cutInput).focus();
                return;
            }
            var back = fee * cut / 100;
            var eff = fee - back;
            out.textContent = '每 ' + fee.toFixed(4) + ' 手续费返 ' + back.toFixed(4) + '，等效净负担 ' + eff.toFixed(4) + '。演示口径，实际以平台结算为准。';
        });
    }
})();
