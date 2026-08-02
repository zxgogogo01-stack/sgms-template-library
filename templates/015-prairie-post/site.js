(function () {
    "use strict";
    var here = location.pathname.split("/").pop() || "index.html";
    var nav = document.querySelectorAll(".trail a");
    for (var i = 0; i < nav.length; i++) if (nav[i].getAttribute("href") === here) { nav[i].className = "here"; nav[i].setAttribute("aria-current", "page"); }
    var tags = document.querySelectorAll(".tagset button");
    var posts = document.querySelectorAll(".hay");
    var status = document.getElementById("filter-status");
    for (var j = 0; j < tags.length; j++) tags[j].addEventListener("click", function () {
        var wanted = this.getAttribute("data-tag"); var count = 0;
        for (var k = 0; k < tags.length; k++) tags[k].className = tags[k] === this ? "active" : "";
        for (var n = 0; n < posts.length; n++) { var show = wanted === "全部" || posts[n].getAttribute("data-tags").indexOf(wanted) !== -1; posts[n].hidden = !show; if (show) count++; }
        if (status) status.textContent = wanted === "全部" ? "正在显示全部文章" : "“" + wanted + "”共 " + count + " 篇";
    });
    var go = document.getElementById("pc-go");
    if (go) go.addEventListener("click", function () {
        var postsCount = parseInt(document.getElementById("pc-posts").value, 10); var days = parseInt(document.getElementById("pc-days").value, 10); var out = document.getElementById("pc-out");
        if (!Number.isFinite(postsCount) || !Number.isFinite(days) || postsCount <= 0 || days <= 0) { out.textContent = "请输入大于 0 的整数。"; return; }
        out.textContent = "平均 " + (days / postsCount).toFixed(1) + " 天更新一篇，按 30 天折算约 " + (postsCount / days * 30).toFixed(1) + " 篇。";
    });
})();
