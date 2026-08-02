/* 077 交互 */
(function () {
    'use strict';

    var btn = document.getElementById('lintel-btn');
    if (btn) {
        btn.addEventListener('click', function () {
            var nav = document.getElementById('lintel-nav');
            if (!nav) return;
            var open = nav.classList.toggle('parted');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    /* 保本量：固定成本 ÷（费率×返佣比例） */
    var beForm = document.getElementById('be-form');
    if (beForm) {
        var costField = document.getElementById('be-cost');
        var rateField = document.getElementById('be-rate');
        var cutField = document.getElementById('be-cut');
        var out = document.getElementById('be-out');
        var fields = [costField, rateField, cutField];
        fields.forEach(function (field) {
            field.addEventListener('input', function () { field.removeAttribute('aria-invalid'); });
        });
        beForm.addEventListener('submit', function (event) {
            event.preventDefault();
            fields.forEach(function (field) { field.removeAttribute('aria-invalid'); });
            var cost = Number(costField.value);
            var rate = Number(rateField.value);
            var cut = Number(cutField.value);
            var invalid = [];
            if (costField.value.trim() === '' || !Number.isFinite(cost) || cost <= 0) invalid.push(costField);
            if (rateField.value.trim() === '' || !Number.isFinite(rate) || rate <= 0 || rate > 100) invalid.push(rateField);
            if (cutField.value.trim() === '' || !Number.isFinite(cut) || cut <= 0 || cut > 100) invalid.push(cutField);
            if (invalid.length) {
                invalid.forEach(function (field) { field.setAttribute('aria-invalid', 'true'); });
                if (invalid[0] === costField) {
                    out.textContent = '月固定成本须填写大于 0 的数字。';
                } else if (invalid[0] === rateField) {
                    out.textContent = '手续费率须填写大于 0 且不超过 100 的百分数。';
                } else {
                    out.textContent = '返佣比例须填写大于 0 且不超过 100 的百分数。';
                }
                invalid[0].focus();
                return;
            }
            var backPerUnit = rate / 100 * cut / 100;
            var volume = cost / backPerUnit;
            out.innerHTML = '每 1 元交易量约产生返佣 <b>' + backPerUnit.toFixed(6)
                + '</b> 元<br>要覆盖每月 ' + cost.toFixed(2) + ' 的成本，约需月交易量 <b>' + volume.toFixed(0)
                + '</b><br>演示口径，实际以平台结算为准。';
        });
    }
})();
