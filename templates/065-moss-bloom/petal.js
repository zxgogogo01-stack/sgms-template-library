/* 065 交互 */
(function () {
    'use strict';

    var btn = document.getElementById('arbor-btn');
    if (btn) {
        btn.addEventListener('click', function () {
            var nav = document.getElementById('arbor-nav');
            if (!nav) return;
            var open = nav.classList.toggle('leafed');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    /* 定投手续费累计 */
    var dcaForm = document.getElementById('dc-form');
    if (dcaForm) {
        var perInput = document.getElementById('dc-per');
        var timesInput = document.getElementById('dc-times');
        var rateInput = document.getElementById('dc-rate');
        var cutInput = document.getElementById('dc-cut');
        var dcaInputs = [perInput, timesInput, rateInput, cutInput];
        dcaInputs.forEach(function (input) {
            input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
        });
        dcaForm.addEventListener('submit', function (event) {
            event.preventDefault();
            dcaInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
            var per = perInput.value.trim() === '' ? NaN : Number(perInput.value);
            var times = timesInput.value.trim() === '' ? NaN : Number(timesInput.value);
            var rate = rateInput.value.trim() === '' ? NaN : Number(rateInput.value);
            var cutRaw = cutInput.value.trim();
            var cut = cutRaw === '' ? 0 : Number(cutRaw);
            var out = document.getElementById('dc-out');
            var invalid = [];
            if (!Number.isFinite(per) || per <= 0) invalid.push(perInput);
            if (!Number.isFinite(times) || times <= 0 || !Number.isInteger(times)) invalid.push(timesInput);
            if (!Number.isFinite(rate) || rate < 0 || rate > 100) invalid.push(rateInput);
            if (!Number.isFinite(cut) || cut < 0 || cut > 100) invalid.push(cutInput);
            if (invalid.length) {
                invalid.forEach(function (input) { input.setAttribute('aria-invalid', 'true'); });
                out.textContent = '请检查标红字段：每次金额须大于 0，每月次数须为正整数，费率与返佣比例须在 0–100 之间；返佣比例可留空按 0 计算。';
                invalid[0].focus();
                return;
            }
            var monthFee = per * times * rate / 100;
            var monthBack = monthFee * cut / 100;
            var yearNet = (monthFee - monthBack) * 12;
            out.innerHTML = '每月手续费 <b>' + monthFee.toFixed(2) + '</b> · 每月返佣 <b>' + monthBack.toFixed(2)
                + '</b><br>全年净成本约 <b>' + yearNet.toFixed(2) + '</b>。<br>演示口径，实际以平台结算为准。';
        });
    }
})();
