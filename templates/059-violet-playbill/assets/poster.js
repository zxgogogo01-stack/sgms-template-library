(function () {
    'use strict';

    var toggle = document.getElementById('frontis-toggle');
    if (toggle) {
        toggle.addEventListener('click', function () {
            var links = document.getElementById('frontis-links');
            if (!links) return;
            var open = links.classList.toggle('flung');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    var copyBtn = document.getElementById('sp-copy');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            var node = document.getElementById('sp-code');
            if (!node) return;
            var text = node.textContent.trim();
            var done = function () {
                copyBtn.textContent = '已复制';
                setTimeout(function () { copyBtn.textContent = '复制'; }, 1400);
            };
            /* execCommand fallback for older engines */
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

    /* net-rate duel: two platforms side by side */
    var duelForm = document.getElementById('nd-form');
    if (duelForm) {
        var duelInputs = [
            document.getElementById('nd-fee-a'),
            document.getElementById('nd-cut-a'),
            document.getElementById('nd-fee-b'),
            document.getElementById('nd-cut-b')
        ];
        duelInputs.forEach(function (input) {
            input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
        });
        duelForm.addEventListener('submit', function (event) {
            event.preventDefault();
            duelInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
            var values = duelInputs.map(function (input) {
                return input.value.trim() === '' ? NaN : Number(input.value);
            });
            var fa = values[0];
            var ca = values[1];
            var fb = values[2];
            var cb = values[3];
            var out = document.getElementById('nd-out');
            var bad = function (v) { return !Number.isFinite(v) || v < 0 || v > 100; };
            var invalid = duelInputs.filter(function (input, index) { return bad(values[index]); });
            if (invalid.length) {
                invalid.forEach(function (input) { input.setAttribute('aria-invalid', 'true'); });
                out.textContent = '请检查标红字段：四项均须填写 0–100 之间的百分数。';
                invalid[0].focus();
                return;
            }
            var na = fa * (1 - ca / 100);
            var nb = fb * (1 - cb / 100);
            var verdict;
            if (Math.abs(na - nb) < 1e-9) {
                verdict = '两边净费率打平。';
            } else if (na < nb) {
                verdict = '平台 A 净费率更低，低 ' + (nb - na).toFixed(4) + ' 个百分点。';
            } else {
                verdict = '平台 B 净费率更低，低 ' + (na - nb).toFixed(4) + ' 个百分点。';
            }
            out.innerHTML = 'A 净费率 <b>' + na.toFixed(4) + '%</b> · B 净费率 <b>' + nb.toFixed(4) + '%</b><br>'
                + verdict + '<br>演示口径，实际以平台结算为准。';
        });
    }
})();
