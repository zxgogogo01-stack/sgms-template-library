/* 069 交互 */
(function () {
    "use strict";

    var btn = document.getElementById("skybar-btn");
    if (btn) {
        btn.addEventListener("click", function () {
            var nav = document.getElementById("skybar-nav");
            if (!nav) return;
            var open = nav.classList.toggle("surfaced");
            btn.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }

    /* 高频小单成本 */
    var microForm = document.getElementById("mi-form");
    if (microForm) {
        var countInput = document.getElementById("mi-count");
        var avgInput = document.getElementById("mi-avg");
        var rateInput = document.getElementById("mi-rate");
        var cutInput = document.getElementById("mi-cut");
        var microInputs = [countInput, avgInput, rateInput, cutInput];
        microInputs.forEach(function (input) {
            input.addEventListener("input", function () { input.removeAttribute("aria-invalid"); });
        });
        microForm.addEventListener("submit", function (event) {
            event.preventDefault();
            microInputs.forEach(function (input) { input.removeAttribute("aria-invalid"); });
            var count = countInput.value.trim() === "" ? NaN : Number(countInput.value);
            var avg = avgInput.value.trim() === "" ? NaN : Number(avgInput.value);
            var rate = rateInput.value.trim() === "" ? NaN : Number(rateInput.value);
            var cutRaw = cutInput.value.trim();
            var cut = cutRaw === "" ? 0 : Number(cutRaw);
            var out = document.getElementById("mi-out");
            var invalid = [];
            if (!Number.isFinite(count) || count <= 0 || !Number.isInteger(count)) invalid.push(countInput);
            if (!Number.isFinite(avg) || avg <= 0) invalid.push(avgInput);
            if (!Number.isFinite(rate) || rate < 0 || rate > 100) invalid.push(rateInput);
            if (!Number.isFinite(cut) || cut < 0 || cut > 100) invalid.push(cutInput);
            if (invalid.length) {
                invalid.forEach(function (input) { input.setAttribute("aria-invalid", "true"); });
                out.textContent = "请检查标红字段：日均笔数须为正整数，单笔均额须大于 0，费率与返佣比例须在 0–100 之间；返佣比例可留空按 0 计算。";
                invalid[0].focus();
                return;
            }
            var dayFee = count * avg * rate / 100;
            var dayBack = dayFee * cut / 100;
            var monthNet = (dayFee - dayBack) * 30;
            out.innerHTML = "日手续费 <b>" + dayFee.toFixed(2) + "</b> · 日返佣 <b>" + dayBack.toFixed(2)
                + "</b><br>按 30 天折算月净成本约 <b>" + monthNet.toFixed(2) + "</b>。<br>演示口径，实际以平台结算为准。";
        });
    }
})();
