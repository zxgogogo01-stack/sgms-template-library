(function () {
    "use strict";

    var links = document.querySelectorAll(".menu a");
    var here = location.pathname.split("/").pop() || "index.html";
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute("href") === here) {
            links[i].className = "here";
            links[i].setAttribute("aria-current", "page");
        }
    }

    var button = document.getElementById("rt-go");
    if (!button) return;

    var field = document.getElementById("rt-text");
    var out = document.getElementById("rt-out");
    field.addEventListener("input", function () {
        field.removeAttribute("aria-invalid");
    });

    button.addEventListener("click", function () {
        var txt = field.value;
        var cjk = (txt.match(/[一-鿿]/g) || []).length;
        var words = (txt.match(/[A-Za-z]+/g) || []).length;
        if (cjk + words === 0) {
            field.setAttribute("aria-invalid", "true");
            out.className = "is-error";
            out.textContent = "请先粘贴需要估算的文章内容。";
            field.focus();
            return;
        }
        field.setAttribute("aria-invalid", "false");
        var mins = cjk / 400 + words / 200;
        var whole = Math.max(1, Math.ceil(mins));
        out.className = "";
        out.textContent = "预计阅读约 " + whole + " 分钟 · 中文 " + cjk + " 字 · 英文 " + words + " 词";
    });
})();
