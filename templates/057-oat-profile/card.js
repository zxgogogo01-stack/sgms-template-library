/* 057 交互：复制邀请码 + 估算器 */
(function () {
    "use strict";

    var copyBtn = document.getElementById("tk-copy");
    if (copyBtn) {
        copyBtn.addEventListener("click", function () {
            var node = document.getElementById("tk-code");
            if (!node) return;
            var text = node.textContent.trim();
            var done = function () {
                copyBtn.textContent = "已复制";
                setTimeout(function () { copyBtn.textContent = "复制"; }, 1400);
            };
            var fallback = function () {
                var r = document.createRange();
                r.selectNodeContents(node);
                var s = window.getSelection();
                s.removeAllRanges();
                s.addRange(r);
                try { document.execCommand("copy"); done(); } catch (e) {}
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(done, fallback);
            } else {
                fallback();
            }
        });
    }

    /* 累计返佣估算 */
    var estForm = document.getElementById("es-form");
    if (estForm) {
        var dailyInput = document.getElementById("es-daily");
        var daysInput = document.getElementById("es-days");
        var cutInput = document.getElementById("es-cut");
        var estInputs = [dailyInput, daysInput, cutInput];
        var clearInvalid = function () {
            estInputs.forEach(function (input) { input.removeAttribute("aria-invalid"); });
        };
        estInputs.forEach(function (input) {
            input.addEventListener("input", function () { input.removeAttribute("aria-invalid"); });
        });
        estForm.addEventListener("submit", function (event) {
            event.preventDefault();
            clearInvalid();
            var daily = dailyInput.value.trim() === "" ? NaN : Number(dailyInput.value);
            var days = daysInput.value.trim() === "" ? NaN : Number(daysInput.value);
            var cut = cutInput.value.trim() === "" ? NaN : Number(cutInput.value);
            var out = document.getElementById("es-out");
            var invalid = [];
            if (!Number.isFinite(daily) || daily < 0) invalid.push(dailyInput);
            if (!Number.isFinite(days) || days <= 0 || !Number.isInteger(days)) invalid.push(daysInput);
            if (!Number.isFinite(cut) || cut < 0 || cut > 100) invalid.push(cutInput);
            if (invalid.length) {
                invalid.forEach(function (input) { input.setAttribute("aria-invalid", "true"); });
                out.textContent = "请检查标红字段：手续费不能为负数，天数须为正整数，返佣比例须在 0–100 之间。";
                invalid[0].focus();
                return;
            }
            var total = daily * days * cut / 100;
            var monthly = daily * 30 * cut / 100;
            out.innerHTML = "期内累计返佣约 <b>" + total.toFixed(2) + "</b>，折合每月约 <b>" + monthly.toFixed(2) + "</b>。<br>演示口径，实际以平台结算为准。";
        });
    }
})();
