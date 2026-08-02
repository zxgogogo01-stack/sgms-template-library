/* 073 交互 */
(function () {
    'use strict';

    var btn = document.getElementById('cornice-btn');
    if (btn) {
        btn.addEventListener('click', function () {
            var nav = document.getElementById('cornice-nav');
            if (!nav) return;
            var open = nav.classList.toggle('spun');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    /* 实际费率诊断 */
    var dxForm = document.getElementById('dx-form');
    if (dxForm) {
        var volField = document.getElementById('dx-vol');
        var feeField = document.getElementById('dx-fee');
        var refField = document.getElementById('dx-ref');
        var out = document.getElementById('dx-out');
        var fields = [volField, feeField, refField];
        var clearInvalid = function () {
            fields.forEach(function (field) { field.removeAttribute('aria-invalid'); });
        };
        fields.forEach(function (field) {
            field.addEventListener('input', function () { field.removeAttribute('aria-invalid'); });
        });
        dxForm.addEventListener('submit', function (event) {
            event.preventDefault();
            clearInvalid();
            var vol = Number(volField.value);
            var fee = Number(feeField.value);
            var hasRef = refField.value.trim() !== '';
            var ref = Number(refField.value);
            var invalid = [];
            if (volField.value.trim() === '' || !Number.isFinite(vol) || vol <= 0) invalid.push(volField);
            if (feeField.value.trim() === '' || !Number.isFinite(fee) || fee < 0) invalid.push(feeField);
            if (hasRef && (!Number.isFinite(ref) || ref < 0 || ref > 100)) invalid.push(refField);
            if (invalid.length) {
                invalid.forEach(function (field) { field.setAttribute('aria-invalid', 'true'); });
                if (invalid.indexOf(volField) !== -1 && invalid.indexOf(feeField) !== -1) {
                    out.textContent = '请填写有效的期间交易量与手续费：交易量须大于 0，手续费不能为负数。';
                } else if (invalid.indexOf(volField) !== -1) {
                    out.textContent = '期间交易量须填写大于 0 的数字。';
                } else if (invalid.indexOf(feeField) !== -1) {
                    out.textContent = '期间手续费须填写不小于 0 的数字。';
                } else {
                    out.textContent = '口径费率可留空；填写时须为 0–100 之间的百分数。';
                }
                invalid[0].focus();
                return;
            }
            var actual = fee / vol * 100;
            var text = '实际费率约 <b>' + actual.toFixed(4) + '%</b>（手续费 ÷ 交易量）';
            if (hasRef) {
                var delta = actual - ref;
                if (Math.abs(delta) <= ref * 0.05) {
                    text += '<br>与口径费率 ' + ref.toFixed(4) + '% 基本一致。';
                } else if (delta > 0) {
                    text += '<br>比口径 ' + ref.toFixed(4) + '% 偏高 ' + delta.toFixed(4) + ' 个百分点——核对档位、币对或滑点。';
                } else {
                    text += '<br>比口径 ' + ref.toFixed(4) + '% 低 ' + Math.abs(delta).toFixed(4) + ' 个百分点——减免大概率已生效。';
                }
            } else {
                text += '<br>填上口径费率可对比偏差。';
            }
            out.innerHTML = text + '<br>演示口径，实际以平台结算为准。';
        });
    }
})();
