/* 053 行为：折叠导航、复制邀请码、净费率计算 */
(function () {
    'use strict';

    var btn = document.getElementById('spine-btn');
    if (btn) {
        btn.addEventListener('click', function () {
            var nav = document.getElementById('spine-nav');
            if (!nav) return;
            var open = nav.classList.toggle('agape');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    var cp = document.getElementById('ap-copy');
    if (cp) {
        cp.addEventListener('click', function () {
            var code = document.getElementById('ap-code');
            if (!code) return;
            var text = code.textContent.trim();
            var fine = function () {
                cp.textContent = '已复制';
                setTimeout(function () { cp.textContent = '复制'; }, 1500);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(fine, function () { mark(code, fine); });
            } else {
                mark(code, fine);
            }
        });
    }

    function mark(node, cb) {
        var r = document.createRange();
        r.selectNodeContents(node);
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
        try {
            document.execCommand('copy');
            cb();
        } catch (e) {
            // 已选中，可手动复制
        }
    }

    // 净费率：名义费率 × (1 - 减免比例)
    var go = document.getElementById('nf-go');
    var netForm = document.getElementById('nf-form');
    if (go && netForm) {
        var rateInput = document.getElementById('nf-rate');
        var offInput = document.getElementById('nf-off');
        var netInputs = [rateInput, offInput];
        netInputs.forEach(function (input) {
            input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
        });
        netForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var rate = parseFloat(rateInput.value);
            var off = parseFloat(offInput.value);
            var out = document.getElementById('nf-out');
            netInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
            var invalidRate = isNaN(rate) || rate < 0 || rate > 100;
            var invalidOff = isNaN(off) || off < 0 || off > 100;
            if (invalidRate || invalidOff) {
                if (invalidRate) rateInput.setAttribute('aria-invalid', 'true');
                if (invalidOff) offInput.setAttribute('aria-invalid', 'true');
                out.textContent = '请输入有效数值；名义费率与减免比例须在 0—100% 之间。';
                (invalidRate ? rateInput : offInput).focus();
                return;
            }
            var net = rate * (1 - off / 100);
            out.textContent = '名义费率 ' + rate + '%，减免 ' + off + '% 后净费率约 ' + net.toFixed(4) + '%。演示口径，实际以平台页面为准。';
        });
    }
})();
