"use strict";

(function () {
  document.body.classList.add("grv-js");

  var navButton = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-navigation");
  if (navButton && nav) {
    navButton.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") !== "true";
      nav.setAttribute("data-open", String(open));
      navButton.setAttribute("aria-expanded", String(open));
    });
  }

  var themeButton = document.querySelector("[data-theme-toggle]");
  var savedTheme = "";
  try { savedTheme = localStorage.getItem("grove-theme") || ""; } catch (error) { savedTheme = ""; }
  if (savedTheme === "dark" || savedTheme === "light") document.documentElement.setAttribute("data-theme", savedTheme);
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("grove-theme", next); } catch (error) { /* storage may be unavailable */ }
    });
  }

  function copyText(value, button) {
    var done = function () {
      var old = button.textContent;
      button.textContent = "已复制";
      window.setTimeout(function () { button.textContent = old; }, 1600);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(done).catch(function () { fallbackCopy(value, done); });
    } else {
      fallbackCopy(value, done);
    }
  }

  function fallbackCopy(value, done) {
    var area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    done();
  }

  document.querySelectorAll("[data-copy-target]").forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.getElementById(button.getAttribute("data-copy-target"));
      if (target) copyText(target.textContent.trim(), button);
    });
  });

  var catalogSearch = document.getElementById("catalog-search");
  if (catalogSearch) {
    var rows = Array.from(document.querySelectorAll("[data-entry-row]"));
    var status = document.querySelector("[data-catalog-status]");
    var empty = document.querySelector("[data-catalog-empty]");
    catalogSearch.addEventListener("input", function () {
      var query = catalogSearch.value.trim().toLocaleLowerCase();
      var count = 0;
      rows.forEach(function (row) {
        var match = !query || (row.getAttribute("data-search") || row.textContent).toLocaleLowerCase().includes(query);
        row.hidden = !match;
        if (match) count += 1;
      });
      if (status) status.textContent = String(count) + " 条记录";
      if (empty) empty.hidden = count !== 0;
    });
  }
})();
