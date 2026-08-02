(function () {
    "use strict";
    var here = location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".toc a");
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute("href") === here) {
            links[i].className = "here";
            links[i].setAttribute("aria-current", "page");
        }
    }

    var copy = document.getElementById("slip-copy");
    if (copy) copy.addEventListener("click", function () {
        var node = document.getElementById("slip-code");
        var done = function () { copy.textContent = "已复制"; setTimeout(function () { copy.textContent = "复制"; }, 1500); };
        var fallback = function () {
            var range = document.createRange(); range.selectNodeContents(node);
            var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
            try { document.execCommand("copy"); done(); } catch (e) { copy.textContent = "已选中"; }
        };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(node.textContent.trim()).then(done, fallback);
        else fallback();
    });

    var boxes = document.querySelectorAll(".ck");
    if (!boxes.length) return;
    var refresh = function () {
        var done = 0;
        for (var j = 0; j < boxes.length; j++) if (boxes[j].checked) done++;
        document.getElementById("ck-tally").textContent = "已完成 " + done + " / " + boxes.length + (done === boxes.length ? " · 可以进入下一章" : "");
    };
    for (var k = 0; k < boxes.length; k++) boxes[k].addEventListener("change", refresh);
})();
