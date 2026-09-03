(function () {
  "use strict";

  var root = document.documentElement;
  var themeButton = document.querySelector("[data-loom-theme-toggle]");
  var menuButton = document.querySelector("[data-loom-menu]");
  var menu = document.getElementById("loom-nav");
  var savedTheme = null;

  try { savedTheme = localStorage.getItem("ledger-loom-theme"); } catch (error) { savedTheme = null; }
  if (savedTheme === "night" || savedTheme === "ivory") root.setAttribute("data-loom-theme", savedTheme);

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var next = root.getAttribute("data-loom-theme") === "night" ? "ivory" : "night";
      root.setAttribute("data-loom-theme", next);
      try { localStorage.setItem("ledger-loom-theme", next); } catch (error) { /* storage is optional */ }
    });
  }

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      var open = menu.getAttribute("data-open") !== "true";
      menu.setAttribute("data-open", open ? "true" : "false");
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
      menuButton.textContent = open ? "收起目录" : "展开目录";
    });
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-copy-target]");
    if (!button) return;
    var target = document.getElementById(button.getAttribute("data-copy-target"));
    if (!target) return;
    copyText(target.textContent.trim()).then(function () {
      var original = button.textContent;
      button.textContent = button.getAttribute("data-copy-success") || "已复制";
      window.setTimeout(function () { button.textContent = original; }, 8000);
    }, function () {
      button.textContent = "请手动复制";
    });
  });

  var search = document.getElementById("folio-search");
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-folio-filter]"));
  var folios = Array.prototype.slice.call(document.querySelectorAll("[data-folio]"));
  var currentFilter = "all";
  if (search && folios.length) {
    search.addEventListener("input", filterFolios);
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        currentFilter = button.getAttribute("data-folio-filter") || "all";
        filterButtons.forEach(function (item) { item.setAttribute("aria-pressed", item === button ? "true" : "false"); });
        filterFolios();
      });
    });
  }

  function filterFolios() {
    var query = search.value.trim().toLowerCase();
    var visible = 0;
    folios.forEach(function (folio) {
      var inBook = currentFilter === "all" || folio.getAttribute("data-book") === currentFilter;
      var text = (folio.getAttribute("data-title") + " " + folio.textContent).toLowerCase();
      var shown = inBook && (!query || text.indexOf(query) !== -1);
      folio.hidden = !shown;
      if (shown) visible += 1;
    });
    var status = document.querySelector("[data-folio-status]");
    if (status) status.textContent = visible + " 页可见";
  }

  function copyText(value) {
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        if (document.execCommand("copy")) { resolve(); return; }
        if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(value).then(resolve, reject); return; }
        throw new Error("copy failed");
      } catch (error) { reject(error); }
      finally { area.remove(); }
    });
  }
})();
