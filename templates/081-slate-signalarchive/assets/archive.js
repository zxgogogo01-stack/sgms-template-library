/* 081 交互 */
(function () {
    "use strict";

    var btn = document.getElementById("archbar-btn");
    if (btn) {
        btn.addEventListener("click", function () {
            var nav = document.getElementById("archbar-nav");
            if (!nav) return;
            var open = nav.classList.toggle("pulled81");
            btn.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }

    /* 邀请返佣 vs 自返模式对比 */
    var cmForm = document.getElementById("cm-form");
    if (cmForm) {
        var feeField = document.getElementById("cm-fee");
        var inviteField = document.getElementById("cm-invite");
        var selfField = document.getElementById("cm-self");
        var out = document.getElementById("cm-out");
        var fields = [feeField, inviteField, selfField];
        fields.forEach(function (field) {
            field.addEventListener("input", function () {
                field.removeAttribute("aria-invalid");
            });
        });
        cmForm.addEventListener("submit", function (event) {
            event.preventDefault();
            fields.forEach(function (field) { field.removeAttribute("aria-invalid"); });
            var fee = Number(feeField.value);
            var invite = Number(inviteField.value);
            var self = Number(selfField.value);
            var invalid = [];
            if (feeField.value.trim() === "" || !Number.isFinite(fee) || fee < 0) {
                invalid.push({ field: feeField, message: "月手续费合计须填写不小于 0 的数字。" });
            }
            if (inviteField.value.trim() === "" || !Number.isFinite(invite) || invite < 0 || invite > 100) {
                invalid.push({ field: inviteField, message: "邀请返佣比例须为 0–100 之间的百分数。" });
            }
            if (selfField.value.trim() === "" || !Number.isFinite(self) || self < 0 || self > 100) {
                invalid.push({ field: selfField, message: "自返比例须为 0–100 之间的百分数。" });
            }
            if (invalid.length) {
                invalid.forEach(function (item) { item.field.setAttribute("aria-invalid", "true"); });
                out.textContent = invalid[0].message;
                invalid[0].field.focus();
                return;
            }
            var inviteBack = fee * invite / 100;
            var selfBack = fee * self / 100;
            var diff = inviteBack - selfBack;
            var verdict;
            if (Math.abs(diff) < 0.005) {
                verdict = "两种模式打平，选流程省事的那个。";
            } else if (diff > 0) {
                verdict = "邀请返佣模式每月多拿约 " + diff.toFixed(2) + "。";
            } else {
                verdict = "自返模式每月多拿约 " + Math.abs(diff).toFixed(2) + "。";
            }
            out.innerHTML = "邀请返佣 <b>" + inviteBack.toFixed(2) + "</b>/月 · 自返 <b>" + selfBack.toFixed(2)
                + "</b>/月<br>" + verdict + "<br>演示口径，两种模式能否同享以平台规则为准。";
        });
    }
})();
