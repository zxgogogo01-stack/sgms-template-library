(function () {
  "use strict";

  // Copy the invite code, clipboard first, selection fallback
  var copyBtn = document.querySelector(".code-plate__copy");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var node = document.getElementById("plate-code");
      if (!node) return;
      var text = node.textContent.trim();
      var toast = function () {
        copyBtn.textContent = "已复制";
        setTimeout(function () { copyBtn.textContent = "复制代码"; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(toast, function () { fallbackSelect(node, toast); });
      } else {
        fallbackSelect(node, toast);
      }
    });
  }

  function fallbackSelect(node, done) {
    var range = document.createRange();
    range.selectNodeContents(node);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try {
      document.execCommand("copy");
      done();
    } catch (e) {
      // selection left in place on purpose
    }
  }

  // Category filter on tool.html
  var bar = document.getElementById("kind-bar");
  if (bar) {
    bar.addEventListener("click", function (ev) {
      var b = ev.target.closest("button[data-kind]");
      if (!b) return;
      var kind = b.getAttribute("data-kind");
      var rows = document.querySelectorAll("#kind-list li");
      var visible = 0;
      for (var i = 0; i < rows.length; i++) {
        var match = kind === "all" || rows[i].getAttribute("data-kind") === kind;
        rows[i].hidden = !match;
        if (match) visible++;
      }
      var marks = bar.querySelectorAll("button");
      for (var j = 0; j < marks.length; j++) {
        marks[j].setAttribute("aria-pressed", marks[j] === b ? "true" : "false");
      }
      var count = document.getElementById("kind-count");
      if (count) count.textContent = "当前显示 " + visible + " 项资源";
    });
  }
})();
