(function () {
    "use strict";

    var here = location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".kinds a");
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute("href") === here) {
            links[i].className = "here";
            links[i].setAttribute("aria-current", "page");
        }
    }

    var copy = document.getElementById("chip-btn");
    if (copy) copy.addEventListener("click", function () {
        var node = document.getElementById("chip-val");
        var done = function () { copy.textContent = "已复制"; setTimeout(function () { copy.textContent = "复制"; }, 1400); };
        var fallback = function () {
            var range = document.createRange();
            range.selectNodeContents(node);
            var selection = getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            try { document.execCommand("copy"); done(); } catch (e) { copy.textContent = "已选中"; }
        };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(node.textContent.trim()).then(done, fallback);
        else fallback();
    });

    function value(id) { return parseFloat(document.getElementById(id).value); }
    function clearState(fields, out) {
        for (var n = 0; n < fields.length; n++) fields[n].setAttribute("aria-invalid", "false");
        out.className = "calc-out";
    }
    function fail(field, out, message) {
        field.setAttribute("aria-invalid", "true");
        out.className = "calc-out is-error";
        out.textContent = message;
        field.focus();
    }
    function result(out, message) {
        out.className = "calc-out";
        out.textContent = message;
    }

    var bp = document.getElementById("bp-in");
    var pct = document.getElementById("pct-in");
    if (bp && pct) {
        bp.addEventListener("input", function () {
            var number = parseFloat(bp.value);
            pct.value = Number.isFinite(number) ? (number / 100).toFixed(4) : "";
        });
        pct.addEventListener("input", function () {
            var number = parseFloat(pct.value);
            bp.value = Number.isFinite(number) ? (number * 100).toFixed(2) : "";
        });
    }

    var changeGo = document.getElementById("change-go");
    if (changeGo) changeGo.addEventListener("click", function () {
        var startField = document.getElementById("change-start");
        var endField = document.getElementById("change-end");
        var out = document.getElementById("change-out");
        clearState([startField, endField], out);
        var start = value("change-start");
        var end = value("change-end");
        if (!Number.isFinite(start) || start === 0) return fail(startField, out, "请输入非零的期初数值。");
        if (!Number.isFinite(end)) return fail(endField, out, "请输入有效的期末数值。");
        var delta = ((end - start) / Math.abs(start)) * 100;
        result(out, (delta >= 0 ? "上涨 " : "下跌 ") + Math.abs(delta).toFixed(2) + "%");
    });

    var averageGo = document.getElementById("average-go");
    if (averageGo) averageGo.addEventListener("click", function () {
        var ids = ["qty-1", "price-1", "qty-2", "price-2"];
        var fields = ids.map(function (id) { return document.getElementById(id); });
        var out = document.getElementById("average-out");
        clearState(fields, out);
        var q1 = value(ids[0]), p1 = value(ids[1]), q2 = value(ids[2]), p2 = value(ids[3]);
        if (!Number.isFinite(q1) || q1 <= 0) return fail(fields[0], out, "第一笔数量必须大于 0。");
        if (!Number.isFinite(p1)) return fail(fields[1], out, "请输入第一笔有效价格。");
        if (!Number.isFinite(q2) || q2 <= 0) return fail(fields[2], out, "第二笔数量必须大于 0。");
        if (!Number.isFinite(p2)) return fail(fields[3], out, "请输入第二笔有效价格。");
        result(out, "加权均价 " + ((q1 * p1 + q2 * p2) / (q1 + q2)).toFixed(4));
    });

    var ratioGo = document.getElementById("ratio-go");
    if (ratioGo) ratioGo.addEventListener("click", function () {
        var ids = ["entry-price", "target-price", "stop-price"];
        var fields = ids.map(function (id) { return document.getElementById(id); });
        var out = document.getElementById("ratio-out");
        clearState(fields, out);
        var entry = value(ids[0]), target = value(ids[1]), stop = value(ids[2]);
        if (!Number.isFinite(entry)) return fail(fields[0], out, "请输入有效入场价。");
        if (!Number.isFinite(target)) return fail(fields[1], out, "请输入有效目标价。");
        if (!Number.isFinite(stop)) return fail(fields[2], out, "请输入有效止损价。");
        var reward = Math.abs(target - entry);
        var risk = Math.abs(entry - stop);
        if (reward === 0) return fail(fields[1], out, "目标价不能与入场价相同。");
        if (risk === 0) return fail(fields[2], out, "止损价不能与入场价相同。");
        result(out, "风险回报比 1 : " + (reward / risk).toFixed(2));
    });

    var calcFields = document.querySelectorAll(".tool-panel input");
    for (var c = 0; c < calcFields.length; c++) calcFields[c].addEventListener("input", function () {
        this.setAttribute("aria-invalid", "false");
    });
})();
