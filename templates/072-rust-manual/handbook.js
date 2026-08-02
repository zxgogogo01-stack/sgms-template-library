(function () {
  "use strict";

  var btn = document.getElementById("ridgepole-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      var nav = document.getElementById("ridgepole-nav");
      if (!nav) return;
      var open = nav.classList.toggle("swungopen");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var boxes = Array.prototype.slice.call(document.querySelectorAll(".checkline input[type=checkbox]"));
  if (boxes.length) {
    var fill = document.getElementById("ck-fill");
    var track = document.getElementById("ck-track");
    var pct = document.getElementById("ck-pct");
    var verdict = document.getElementById("ck-verdict");
    var update = function () {
      var doneCount = boxes.filter(function (b) { return b.checked; }).length;
      var ratio = Math.round(doneCount / boxes.length * 100);
      if (fill) fill.style.width = ratio + "%";
      if (track) track.setAttribute("aria-valuenow", String(ratio));
      if (pct) pct.textContent = ratio + "%";
      if (verdict) {
        if (ratio === 100) {
          verdict.textContent = "全部就绪——绑码链路没有明显漏洞。";
        } else if (ratio >= 60) {
          verdict.textContent = "大体就绪，把没勾上的项补完再操作。";
        } else {
          verdict.textContent = "先别急着注册，逐项核对完再动手。";
        }
      }
    };
    boxes.forEach(function (b) { b.addEventListener("change", update); });
    update();
  }
})();
