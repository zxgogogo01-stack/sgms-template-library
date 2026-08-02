(function () {
    "use strict";
    var here = location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".vols a");
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute("href") === here) {
            links[i].className = "now";
            links[i].setAttribute("aria-current", "page");
        }
    }

    var copy = document.getElementById("bar-copy");
    if (copy) copy.addEventListener("click", function () {
        var box = document.getElementById("bar-code");
        var done = function () { copy.textContent = "已复制"; setTimeout(function () { copy.textContent = "复制"; }, 1500); };
        var fallback = function () { box.select(); try { document.execCommand("copy"); done(); } catch (e) { copy.textContent = "已选中"; } };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(box.value).then(done, fallback);
        else fallback();
    });

    var go = document.getElementById("dv-go");
    if (go) go.addEventListener("click", function () {
        var startField = document.getElementById("dv-a");
        var endField = document.getElementById("dv-b");
        var start = parseFloat(startField.value);
        var end = parseFloat(endField.value);
        var out = document.getElementById("dv-out");
        startField.setAttribute("aria-invalid", "false");
        endField.setAttribute("aria-invalid", "false");
        out.className = "";
        if (!Number.isFinite(start) || !Number.isFinite(end) || start === 0) {
            var bad = !Number.isFinite(start) || start === 0 ? startField : endField;
            bad.setAttribute("aria-invalid", "true");
            out.textContent = "请输入有效数值，且期初数值不能为 0。";
            out.className = "is-error";
            bad.focus();
            return;
        }
        var pct = ((end - start) / Math.abs(start)) * 100;
        out.textContent = (pct >= 0 ? "上涨 " : "下跌 ") + Math.abs(pct).toFixed(2) + "%";
    });

    var deltaFields = document.querySelectorAll("#dv-a, #dv-b");
    for (var d = 0; d < deltaFields.length; d++) deltaFields[d].addEventListener("input", function () {
        this.setAttribute("aria-invalid", "false");
    });
})();
