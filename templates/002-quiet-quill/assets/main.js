(function () {
  "use strict";
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  var stored = "";
  try { stored = localStorage.getItem("quiet-quill-theme") || ""; } catch (error) { stored = ""; }
  if (stored === "light" || stored === "dark") root.setAttribute("data-theme", stored);
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      if (!current) current = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      toggle.setAttribute("aria-label", next === "dark" ? "切换到浅色主题" : "切换到深色主题");
      try { localStorage.setItem("quiet-quill-theme", next); } catch (error) { return; }
    });
  }
  function copyText(value, status, button) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) { if (status) status.textContent = "当前浏览器不支持自动复制，请手动选择。"; return; }
    navigator.clipboard.writeText(value).then(function () {
      if (status) status.textContent = "已复制。";
      if (button) { var before = button.textContent; button.textContent = "已复制"; window.setTimeout(function () { button.textContent = before; }, 1400); }
    }).catch(function () { if (status) status.textContent = "复制失败，请手动选择。"; });
  }
  document.querySelectorAll("[data-copy-target]").forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.getElementById(button.getAttribute("data-copy-target"));
      if (target) copyText(target.textContent.trim(), document.querySelector("[data-copy-status]"), button);
    });
  });
  var filterButtons = Array.from(document.querySelectorAll("[data-library-filter]"));
  var entries = Array.from(document.querySelectorAll("[data-library-entry]"));
  var empty = document.querySelector("[data-library-empty]");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var group = button.getAttribute("data-library-filter");
      var visible = 0;
      filterButtons.forEach(function (item) { item.setAttribute("aria-pressed", item === button ? "true" : "false"); });
      entries.forEach(function (entry) { var show = group === "all" || entry.getAttribute("data-group") === group; entry.hidden = !show; if (show) visible += 1; });
      if (empty) empty.hidden = visible !== 0;
    });
  });
})();
