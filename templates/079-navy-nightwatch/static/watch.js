(function () {
    'use strict';

    var btn = document.getElementById('watchbar-btn');
    if (btn) {
        btn.addEventListener('click', function () {
            var nav = document.getElementById('watchbar-nav');
            if (!nav) return;
            var open = nav.classList.toggle('hoisted');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    /* round-trip fee: open + close legs */
    var rtForm = document.getElementById('rt-form');
    if (rtForm) {
        var sizeField = document.getElementById('rt-size');
        var rateField = document.getElementById('rt-rate');
        var cutField = document.getElementById('rt-cut');
        var out = document.getElementById('rt-out');
        var fields = [sizeField, rateField, cutField];
        fields.forEach(function (field) {
            field.addEventListener('input', function () { field.removeAttribute('aria-invalid'); });
        });
        rtForm.addEventListener('submit', function (event) {
            event.preventDefault();
            fields.forEach(function (field) { field.removeAttribute('aria-invalid'); });
            var size = Number(sizeField.value);
            var rate = Number(rateField.value);
            var hasCut = cutField.value.trim() !== '';
            var cut = hasCut ? Number(cutField.value) : 0;
            var invalid = [];
            if (sizeField.value.trim() === '' || !Number.isFinite(size) || size <= 0) invalid.push(sizeField);
            if (rateField.value.trim() === '' || !Number.isFinite(rate) || rate < 0 || rate > 100) invalid.push(rateField);
            if (hasCut && (!Number.isFinite(cut) || cut < 0 || cut > 100)) invalid.push(cutField);
            if (invalid.length) {
                invalid.forEach(function (field) { field.setAttribute('aria-invalid', 'true'); });
                if (invalid[0] === sizeField) {
                    out.textContent = '单笔仓位金额须填写大于 0 的数字。';
                } else if (invalid[0] === rateField) {
                    out.textContent = '单边费率须为 0–100 之间的百分数。';
                } else {
                    out.textContent = '返佣比例可留空；填写时须为 0–100 之间的百分数。';
                }
                invalid[0].focus();
                return;
            }
            var oneLeg = size * rate / 100;
            var round = oneLeg * 2;
            var back = round * cut / 100;
            out.innerHTML = '单边手续费 <b>' + oneLeg.toFixed(2) + '</b> · 开平往返 <b>' + round.toFixed(2)
                + '</b><br>返佣约 <b>' + back.toFixed(2) + '</b>，净成本 <b>' + (round - back).toFixed(2)
                + '</b><br>演示口径（开平同费率），实际以平台结算为准。';
        });
    }
})();
