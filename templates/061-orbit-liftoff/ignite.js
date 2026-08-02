/* 061 交互 */
(function () {
    'use strict';

    var btn = document.getElementById('gantry-btn');
    var menu = document.getElementById('gantry-menu');
    if (!btn && menu) {
        btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'gantry-btn';
        btn.id = 'gantry-btn';
        btn.setAttribute('aria-label', '主导航');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', 'gantry-menu');
        btn.textContent = '☰';
        menu.parentNode.insertBefore(btn, menu);
    }
    if (btn) {
        btn.addEventListener('click', function () {
            var menu = document.getElementById('gantry-menu');
            if (!menu) return;
            var open = menu.classList.toggle('deployed');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    var copyBtn = document.getElementById('bd-copy');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            var node = document.getElementById('bd-code');
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

    /* 目标进度估算 */
    var goForm = document.getElementById('gp-form');
    if (goForm) {
        var goalInput = document.getElementById('gp-goal');
        var doneInput = document.getElementById('gp-done');
        var monthlyInput = document.getElementById('gp-month');
        var progressInputs = [goalInput, doneInput, monthlyInput];
        progressInputs.forEach(function (input) {
            input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
        });
        goForm.addEventListener('submit', function (event) {
            event.preventDefault();
            progressInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
            var goal = goalInput.value.trim() === '' ? NaN : Number(goalInput.value);
            var done = doneInput.value.trim() === '' ? NaN : Number(doneInput.value);
            var monthlyRaw = monthlyInput.value.trim();
            var monthly = monthlyRaw === '' ? NaN : Number(monthlyRaw);
            var out = document.getElementById('gp-out');
            var invalid = [];
            if (!Number.isFinite(goal) || goal <= 0) invalid.push(goalInput);
            if (!Number.isFinite(done) || done < 0) invalid.push(doneInput);
            if (monthlyRaw !== '' && (!Number.isFinite(monthly) || monthly <= 0)) invalid.push(monthlyInput);
            if (invalid.length) {
                invalid.forEach(function (input) { input.setAttribute('aria-invalid', 'true'); });
                out.textContent = '请检查标红字段：目标须大于 0，已返金额不能为负；月均返佣可留空，填写时须大于 0。';
                invalid[0].focus();
                return;
            }
            var pct = Math.min(100, done / goal * 100);
            var text = '已完成 <b>' + pct.toFixed(1) + '%</b>（' + done.toFixed(2) + ' / ' + goal.toFixed(2) + '）';
            if (done >= goal) {
                text += '<br>目标已达成。';
            } else if (monthlyRaw !== '') {
                var months = Math.ceil((goal - done) / monthly);
                text += '<br>按月均 ' + monthly.toFixed(2) + ' 估算，还需约 <b>' + months + '</b> 个月。';
            } else {
                text += '<br>填上月均返佣，可估算达成时间。';
            }
            out.innerHTML = text + '<br>演示口径，实际以平台结算为准。';
        });
    }
})();
