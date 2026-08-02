(function () {
    'use strict';

    var btn = document.getElementById('postbar-btn');
    if (btn) {
        btn.addEventListener('click', function () {
            var nav = document.getElementById('postbar-nav');
            if (!nav) return;
            var open = nav.classList.toggle('slidopen');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    /* rebate reconciliation: expected vs received */
    var recForm = document.getElementById('rc-form');
    if (recForm) {
        var feeInput = document.getElementById('rc-fee');
        var cutInput = document.getElementById('rc-cut');
        var gotInput = document.getElementById('rc-got');
        var recInputs = [feeInput, cutInput, gotInput];
        recInputs.forEach(function (input) {
            input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
        });
        recForm.addEventListener('submit', function (event) {
            event.preventDefault();
            recInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
            var fee = feeInput.value.trim() === '' ? NaN : Number(feeInput.value);
            var cut = cutInput.value.trim() === '' ? NaN : Number(cutInput.value);
            var got = gotInput.value.trim() === '' ? NaN : Number(gotInput.value);
            var out = document.getElementById('rc-out');
            var invalid = [];
            if (!Number.isFinite(fee) || fee < 0) invalid.push(feeInput);
            if (!Number.isFinite(cut) || cut < 0 || cut > 100) invalid.push(cutInput);
            if (!Number.isFinite(got) || got < 0) invalid.push(gotInput);
            if (invalid.length) {
                invalid.forEach(function (input) { input.setAttribute('aria-invalid', 'true'); });
                out.textContent = '请检查标红字段：期间手续费与实收返佣不能为负，约定比例须在 0–100 之间。';
                invalid[0].focus();
                return;
            }
            var expect = fee * cut / 100;
            var diff = got - expect;
            var verdict;
            if (expect === 0) {
                verdict = '按口径期望返佣为 0——先核对手续费与比例。';
            } else if (Math.abs(diff) / expect <= 0.03) {
                verdict = '账对上了，差异在 3% 以内（通常是四舍五入或结算币价差）。';
            } else if (diff < 0) {
                verdict = '实收偏少 ' + Math.abs(diff).toFixed(2) + '——核对结算周期是否跨期、比例是否有阶梯。';
            } else {
                verdict = '实收偏多 ' + diff.toFixed(2) + '——可能有活动加成，留意活动截止时间。';
            }
            out.innerHTML = '期望返佣 <b>' + expect.toFixed(2) + '</b> · 实收 <b>' + got.toFixed(2)
                + '</b> · 差额 <b>' + diff.toFixed(2) + '</b><br>' + verdict + '<br>演示口径，实际以平台结算为准。';
        });
    }
})();
