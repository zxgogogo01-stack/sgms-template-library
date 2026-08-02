(function () {
    'use strict';

    var btn = document.getElementById('typebar-btn');
    if (btn) {
        btn.addEventListener('click', function () {
            var nav = document.getElementById('typebar-nav');
            if (!nav) return;
            var open = nav.classList.toggle('stamped');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    /* reverse-solve needed rebate share */
    var rvForm = document.getElementById('nv-form');
    if (rvForm) {
        var baseField = document.getElementById('nv-base');
        var targetField = document.getElementById('nv-target');
        var out = document.getElementById('nv-out');
        var fields = [baseField, targetField];
        fields.forEach(function (field) {
            field.addEventListener('input', function () {
                field.removeAttribute('aria-invalid');
            });
        });
        rvForm.addEventListener('submit', function (event) {
            event.preventDefault();
            fields.forEach(function (field) { field.removeAttribute('aria-invalid'); });
            var base = Number(baseField.value);
            var target = Number(targetField.value);
            var invalid = [];
            if (baseField.value.trim() === '' || !Number.isFinite(base) || base <= 0 || base > 100) {
                invalid.push({ field: baseField, message: '基础费率须填写大于 0 且不超过 100 的百分数。' });
            }
            if (targetField.value.trim() === '' || !Number.isFinite(target) || target < 0 || target > 100) {
                invalid.push({ field: targetField, message: '目标净费率须填写 0–100 之间的百分数。' });
            }
            if (invalid.length) {
                invalid.forEach(function (item) { item.field.setAttribute('aria-invalid', 'true'); });
                out.textContent = invalid[0].message;
                invalid[0].field.focus();
                return;
            }
            if (target >= base) {
                out.innerHTML = '目标净费率不低于基础费率——不需要返佣就已达标，或者目标写高了。';
                return;
            }
            var need = (1 - target / base) * 100;
            var feasible = need <= 60
                ? '这个比例在常见邀请返佣区间内，可以谈。'
                : need <= 90
                    ? '这个比例偏高，通常要靠活动或高档口返佣叠加。'
                    : '这个比例接近全返，市面上基本不存在，警惕"秒返"话术。';
            out.innerHTML = '从 <b>' + base.toFixed(4) + '%</b> 降到 <b>' + target.toFixed(4)
                + '%</b>，需要返佣比例约 <b>' + need.toFixed(1) + '%</b><br>' + feasible
                + '<br>演示口径，实际以平台结算为准。';
        });
    }
})();
