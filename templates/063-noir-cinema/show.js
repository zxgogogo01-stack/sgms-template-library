(function () {
    "use strict";

    var btn = document.getElementById("lobby-btn");
    if (btn) {
        btn.addEventListener("click", function () {
            var nav = document.getElementById("lobby-nav");
            if (!nav) return;
            var open = nav.classList.toggle("aglow");
            btn.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }

    var copyBtn = document.getElementById("ad-copy");
    if (copyBtn) {
        copyBtn.addEventListener("click", function () {
            var node = document.getElementById("ad-code");
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

    /* 到账日估算：结算周期 + 达标日期 -> 下次到账日（演示口径） */
    var payForm = document.getElementById("pd-form");
    if (payForm) {
        var dateInput = document.getElementById("pd-date");
        dateInput.addEventListener("input", function () { dateInput.removeAttribute("aria-invalid"); });
        payForm.addEventListener("submit", function (event) {
            event.preventDefault();
            dateInput.removeAttribute("aria-invalid");
            var cycle = document.getElementById("pd-cycle").value;
            var baseRaw = dateInput.value;
            var out = document.getElementById("pd-out");
            if (!baseRaw) {
                dateInput.setAttribute("aria-invalid", "true");
                out.textContent = "请先选择达标日期。";
                dateInput.focus();
                return;
            }
            var base = new Date(baseRaw + "T00:00:00");
            if (isNaN(base.getTime())) {
                dateInput.setAttribute("aria-invalid", "true");
                out.textContent = "日期格式无效，请重新选择。";
                dateInput.focus();
                return;
            }
            var next = new Date(base.getTime());
            var label;
            if (cycle === "daily") {
                next.setDate(next.getDate() + 1);
                label = "日结（次日到账）";
            } else if (cycle === "weekly") {
                var day = next.getDay();
                var add = (8 - day) % 7;
                if (add === 0) add = 7;
                next.setDate(next.getDate() + add);
                label = "周结（下周一到账）";
            } else {
                next.setMonth(next.getMonth() + 1, 1);
                label = "月结（次月 1 日到账）";
            }
            var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
            var stamp = next.getFullYear() + "-" + pad(next.getMonth() + 1) + "-" + pad(next.getDate());
            out.innerHTML = label + "：预计 <b>" + stamp + "</b> 前后到账。<br>演示口径，各平台结算节奏不同，以官方规则为准。";
        });
    }
})();
