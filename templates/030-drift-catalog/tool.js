(function () {
    "use strict";

    var form = document.getElementById("clean-form");
    var input = document.getElementById("url-input");
    var error = document.getElementById("url-error");
    var result = document.getElementById("tool-result");
    var output = document.getElementById("url-output");
    var summary = document.getElementById("result-summary");
    var status = document.getElementById("tool-status");
    var reset = document.getElementById("reset-tool");
    var copy = document.getElementById("copy-output");
    var samples = Array.prototype.slice.call(document.querySelectorAll("[data-sample]"));
    var trackingKeys = /^(utm_.+|fbclid|gclid|dclid|msclkid|mc_cid|mc_eid|ref|referrer|source)$/i;

    function cleanLine(value) {
        var url;
        try { url = new URL(value); } catch (_) { throw new Error("不是完整有效的链接"); }
        if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("只支持 http 或 https 链接");
        if (url.username || url.password) throw new Error("链接不得包含账号或密码");
        var removed = 0;
        Array.from(url.searchParams.keys()).forEach(function (key) {
            if (trackingKeys.test(key)) {
                url.searchParams.delete(key);
                removed += 1;
            }
        });
        url.hash = "";
        if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
        return { url: url.toString(), removed: removed };
    }

    function fail(message) {
        input.setAttribute("aria-invalid", "true");
        error.textContent = message;
        output.value = "";
        summary.textContent = "净化完成";
        status.textContent = "";
        result.hidden = true;
        input.focus();
    }

    function invalidateResult() {
        input.removeAttribute("aria-invalid");
        error.textContent = "";
        output.value = "";
        summary.textContent = "净化完成";
        status.textContent = "";
        result.hidden = true;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var rows = input.value.split(/\r?\n/).map(function (row) { return row.trim(); }).filter(Boolean);
        input.removeAttribute("aria-invalid");
        error.textContent = "";
        status.textContent = "";
        if (!rows.length) {
            fail("请先粘贴至少一条完整链接。");
            return;
        }
        if (input.value.length > 20000) {
            fail("单次输入不得超过 20,000 个字符。");
            return;
        }
        if (rows.length > 20) {
            fail("单次最多处理 20 条链接，请分批净化。");
            return;
        }
        var cleaned = [];
        var removed = 0;
        for (var i = 0; i < rows.length; i += 1) {
            try {
                var item = cleanLine(rows[i]);
                cleaned.push(item.url);
                removed += item.removed;
            } catch (problem) {
                fail("第 " + (i + 1) + " 行无法识别：" + problem.message + "。");
                return;
            }
        }
        output.value = cleaned.join("\n");
        summary.textContent = "已净化 " + cleaned.length + " 条链接，移除 " + removed + " 个追踪参数";
        result.hidden = false;
        output.focus();
    });

    input.addEventListener("input", invalidateResult);

    copy.addEventListener("click", function () {
        var fallback = function () {
            output.select();
            document.execCommand("copy");
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(output.value).catch(fallback);
        } else {
            fallback();
        }
        status.textContent = "净化结果已复制";
    });

    reset.addEventListener("click", function () {
        form.reset();
        input.removeAttribute("aria-invalid");
        error.textContent = "";
        output.value = "";
        summary.textContent = "净化完成";
        result.hidden = true;
        status.textContent = "";
        input.focus();
    });

    samples.forEach(function (button) {
        button.addEventListener("click", function () {
            input.value = button.dataset.sample;
            invalidateResult();
            input.focus();
        });
    });
})();
