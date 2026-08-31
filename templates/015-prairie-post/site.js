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
        for (var k = 0; k < tags.length; k++) {
            tags[k].className = tags[k] === this ? "active" : "";
            tags[k].setAttribute("aria-pressed", tags[k] === this ? "true" : "false");
        }
        for (var n = 0; n < posts.length; n++) { var show = wanted === "全部" || posts[n].getAttribute("data-tags").indexOf(wanted) !== -1; posts[n].hidden = !show; if (show) count++; }
        if (status) status.textContent = wanted === "全部" ? "正在显示全部文章" : "“" + wanted + "”共 " + count + " 篇";
    });
    var go = document.getElementById("pc-go");
    if (go) go.addEventListener("click", function () {
        var postsField = document.getElementById("pc-posts");
        var daysField = document.getElementById("pc-days");
        var postsCount = Number(postsField.value); var days = Number(daysField.value); var out = document.getElementById("pc-out");
        postsField.setAttribute("aria-invalid", "false"); daysField.setAttribute("aria-invalid", "false"); out.className = "";
        if (!Number.isInteger(postsCount) || postsCount <= 0) { postsField.setAttribute("aria-invalid", "true"); out.className = "is-error"; out.textContent = "文章数必须是大于 0 的整数。"; postsField.focus(); return; }
        if (!Number.isInteger(days) || days <= 0) { daysField.setAttribute("aria-invalid", "true"); out.className = "is-error"; out.textContent = "写作天数必须是大于 0 的整数。"; daysField.focus(); return; }
        out.textContent = "平均 " + (days / postsCount).toFixed(1) + " 天更新一篇，按 30 天折算约 " + (postsCount / days * 30).toFixed(1) + " 篇。";
    });
    var paceFields = document.querySelectorAll("#pc-posts, #pc-days");
    for (var p = 0; p < paceFields.length; p++) paceFields[p].addEventListener("input", function () {
        this.setAttribute("aria-invalid", "false");
    });
})();
