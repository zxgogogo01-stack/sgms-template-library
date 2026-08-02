(function () {
    "use strict";

    var btn = document.getElementById("shopfront-btn");
    if (btn) {
        btn.addEventListener("click", function () {
            var nav = document.getElementById("shopfront-nav");
            if (!nav) return;
            var open = nav.classList.toggle("dooropen");
            btn.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }

    /* stacked discount: base × (1-d1) × (1-d2) */
    var stackForm = document.getElementById("sd-form");
    if (stackForm) {
        var baseField = document.getElementById("sd-base");
        var d1Field = document.getElementById("sd-d1");
        var d2Field = document.getElementById("sd-d2");
        var out = document.getElementById("sd-out");
        var fields = [baseField, d1Field, d2Field];
        var invalidPercent = function (field, value, optional) {
            if (optional && field.value.trim() === "") return false;
            return field.value.trim() === "" || !Number.isFinite(value) || value < 0 || value > 100;
        };
        fields.forEach(function (field) {
            field.addEventListener("input", function () { field.removeAttribute("aria-invalid"); });
        });
        stackForm.addEventListener("submit", function (event) {
            event.preventDefault();
            fields.forEach(function (field) { field.removeAttribute("aria-invalid"); });
            var base = Number(baseField.value);
            var d1 = Number(d1Field.value);
            var d2 = d2Field.value.trim() === "" ? 0 : Number(d2Field.value);
            var invalid = [];
            if (invalidPercent(baseField, base, false)) invalid.push(baseField);
            if (invalidPercent(d1Field, d1, false)) invalid.push(d1Field);
            if (invalidPercent(d2Field, d2, true)) invalid.push(d2Field);
            if (invalid.length) {
                invalid.forEach(function (field) { field.setAttribute("aria-invalid", "true"); });
                if (invalid[0] === baseField) {
                    out.textContent = "基础费率须填写 0–100 之间的百分数。";
                } else if (invalid[0] === d1Field) {
                    out.textContent = "第一层减免须填写 0–100 之间的百分数。";
                } else {
                    out.textContent = "第二层减免可留空；填写时须为 0–100 之间的百分数。";
                }
                invalid[0].focus();
                return;
            }
            var final = base * (1 - d1 / 100) * (1 - d2 / 100);
            var saved = base - final;
            var perWan = final / 100 * 10000;
            out.innerHTML = "叠加后费率约 <b>" + final.toFixed(4) + "%</b>（省 " + saved.toFixed(4)
                + " 个百分点）· 每万元手续费约 <b>" + perWan.toFixed(2)
                + "</b><br>叠加按乘法算：两层 20% 不是 40%，是 36%。<br>演示口径，能否叠加以平台规则为准。";
        });
    }
})();
