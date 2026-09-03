(function () {
  "use strict";

  var page = document.documentElement;
  var themeButton = document.querySelector("[data-bb34-theme-toggle]");
  var menuButton = document.querySelector("[data-bb34-menu]");
  var menu = document.getElementById("bb34-nav");
  var saved = null;

  try { saved = localStorage.getItem("booth-briefing-light"); } catch (error) { saved = null; }
  if (saved === "night" || saved === "hall") page.setAttribute("data-bb34-theme", saved);

  if (themeButton) themeButton.addEventListener("click", function () {
    var next = page.getAttribute("data-bb34-theme") === "night" ? "hall" : "night";
    page.setAttribute("data-bb34-theme", next);
    themeButton.textContent = next === "night" ? "亮场" : "暗场";
    try { localStorage.setItem("booth-briefing-light", next); } catch (error) { /* persistence is optional */ }
  });

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      var open = menu.getAttribute("data-open") !== "true";
      menu.setAttribute("data-open", open ? "true" : "false");
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
      menuButton.textContent = open ? "收起目录" : "场馆目录";
      if (open) { var first = menu.querySelector("a"); if (first) first.focus(); }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.getAttribute("data-open") === "true") {
        menu.setAttribute("data-open", "false");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "场馆目录";
        menuButton.focus();
      }
    });
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-bb34-copy]");
    if (!button) return;
    var target = document.getElementById(button.getAttribute("data-bb34-copy"));
    if (!target) return;
    copyText(target.textContent.trim()).then(function () {
      var original = button.textContent;
      button.textContent = "已复制";
      window.setTimeout(function () { button.textContent = original; }, 8000);
    }, function () { button.textContent = "请手动复制"; });
  });

  var search = document.getElementById("bb34-search");
  var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-bb34-filter]"));
  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-bb34-brief]"));
  var empty = document.querySelector("[data-bb34-empty]");
  var reset = document.querySelector("[data-bb34-reset]");
  var current = "all";

  if (search && cards.length) {
    search.addEventListener("input", filterCards);
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        current = button.getAttribute("data-bb34-filter") || "all";
        buttons.forEach(function (item) { item.setAttribute("aria-pressed", item === button ? "true" : "false"); });
        filterCards();
      });
    });
    if (reset) reset.addEventListener("click", function () {
      search.value = "";
      current = "all";
      buttons.forEach(function (item) { item.setAttribute("aria-pressed", item.getAttribute("data-bb34-filter") === "all" ? "true" : "false"); });
      filterCards();
      search.focus();
    });
  }

  function filterCards() {
    var query = search.value.normalize("NFKC").trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var inHall = current === "all" || card.getAttribute("data-hall") === current;
      var text = (card.getAttribute("data-search") + " " + card.textContent).normalize("NFKC").toLowerCase();
      var shown = inHall && (!query || text.indexOf(query) !== -1);
      card.hidden = !shown;
      if (shown) visible += 1;
    });
    var status = document.querySelector("[data-bb34-count]");
    if (status) status.textContent = visible + " 张可见";
    if (empty) empty.hidden = visible !== 0;
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
