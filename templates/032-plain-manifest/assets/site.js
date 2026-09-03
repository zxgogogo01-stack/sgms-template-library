(function () {
  "use strict";
  var root = document.documentElement;
  var theme = document.querySelector("button[data-theme]");
  var menu = document.querySelector("[data-menu]");
  var nav = document.querySelector("[data-nav]");
  try {
    var saved = localStorage.getItem("pm32-theme");
    if (saved === "night") root.dataset.theme = "night";
  } catch (e) {}
  if (theme)
    theme.addEventListener("click", function () {
      var next = root.dataset.theme === "night" ? "paper" : "night";
      root.dataset.theme = next;
      try {
        localStorage.setItem("pm32-theme", next);
      } catch (e) {}
      theme.setAttribute(
        "aria-label",
        next === "night" ? "切换纸张主题" : "切换夜读主题",
      );
    });
  if (menu && nav)
    menu.addEventListener("click", function () {
      var open = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", String(!open));
      if (open) nav.removeAttribute("data-open");
      else nav.setAttribute("data-open", "");
    });
  function copy(text, done, node) {
    var finish = function () {
      done();
    };
    if (navigator.clipboard && navigator.clipboard.writeText)
      navigator.clipboard
        .writeText(text)
        .then(finish)
        .catch(function () {
          fallback(text, node, finish);
        });
    else fallback(text, node, finish);
  }
  function fallback(text, node, done) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    done();
    if (node) node.focus();
  }
  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-copy]");
    if (!button) return;
    var source = document.getElementById(button.dataset.copy);
    if (!source) return;
    copy(
      source.textContent || source.value,
      function () {
        button.textContent = button.dataset.success || "已复制";
        button.dataset.copied = "true";
      },
      button,
    );
  });
  var search = document.getElementById("clause-search");
  var cards = [].slice.call(document.querySelectorAll("[data-clause-card]"));
  var filters = [].slice.call(document.querySelectorAll("[data-filter]"));
  var status = document.querySelector("[data-filter-status]");
  var active = "all";
  function update() {
    if (!search || !cards.length) return;
    var q = search.value.trim().toLocaleLowerCase();
    var count = 0;
    cards.forEach(function (card) {
      var hit =
        (active === "all" || card.dataset.chapter === active) &&
        (!q ||
          (card.dataset.title + " " + card.textContent)
            .toLocaleLowerCase()
            .indexOf(q) !== -1);
      card.hidden = !hit;
      if (hit) count += 1;
    });
    if (status) status.textContent = count + " 份条款可见";
  }
  if (search) {
    search.addEventListener("input", update);
    filters.forEach(function (button) {
      button.addEventListener("click", function () {
        active = button.dataset.filter;
        filters.forEach(function (item) {
          item.setAttribute("aria-pressed", String(item === button));
        });
        update();
      });
    });
    update();
  }
})();
