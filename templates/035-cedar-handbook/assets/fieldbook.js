(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js-ready");

  var menu = document.querySelector("[data-ch35-menu]");
  var nav = document.getElementById("ch35-nav");
  if (menu && nav) {
    menu.addEventListener("click", function () {
      var open = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(open));
      if (open) nav.setAttribute("data-open", "");
      else nav.removeAttribute("data-open");
    });
  }

  var skin = document.querySelector("[data-ch35-skin-toggle]");
  if (skin) {
    skin.addEventListener("click", function () {
      root.setAttribute(
        "data-ch35-skin",
        root.getAttribute("data-ch35-skin") === "night" ? "paper" : "night"
      );
    });
  }

  function copy(text, button, status) {
    function done() {
      var old = button.textContent;
      button.textContent = "已复制";
      if (status) status.textContent = "结果已复制。";
      window.setTimeout(function () {
        button.textContent = old;
        if (status) status.textContent = "结果仅在本页生成。";
      }, 1400);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(done);
    }

    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      done();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      area.remove();
    }
  }

  document.querySelectorAll("[data-ch35-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var node = document.getElementById(button.getAttribute("data-ch35-copy"));
      if (node) copy(node.textContent, button, null);
    });
  });

  function filter(items, buttons, input, count, empty, options) {
    var active = "all";

    function apply() {
      var query = (input && input.value || "").toLowerCase().trim();
      var seen = 0;
      items.forEach(function (item) {
        var haystack = (item.getAttribute("data-search") || "") + " " + item.textContent;
        var matches = (active === "all" || item.getAttribute(options.itemAttribute) === active) &&
          (!query || haystack.toLowerCase().indexOf(query) !== -1);
        item.hidden = !matches;
        if (matches) seen += 1;
      });
      if (count) count.textContent = seen + options.countSuffix;
      if (empty) empty.hidden = seen !== 0;
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        active = button.getAttribute(options.buttonAttribute) || "all";
        buttons.forEach(function (candidate) {
          candidate.setAttribute("aria-pressed", String(candidate === button));
        });
        apply();
      });
    });
    if (input) input.addEventListener("input", apply);

    return function () {
      active = "all";
      if (input) input.value = "";
      buttons.forEach(function (button) {
        button.setAttribute(
          "aria-pressed",
          String((button.getAttribute(options.buttonAttribute) || "") === "all")
        );
      });
      apply();
      if (input) input.focus();
    };
  }

  var homeReset = filter(
    Array.from(document.querySelectorAll("[data-ch35-note]")),
    Array.from(document.querySelectorAll("[data-ch35-filter]")),
    document.getElementById("ch35-search"),
    document.querySelector("[data-ch35-count]"),
    document.querySelector("[data-ch35-empty]"),
    { itemAttribute: "data-sector", buttonAttribute: "data-ch35-filter", countSuffix: " 则可见" }
  );
  var homeResetButton = document.querySelector("[data-ch35-reset]");
  if (homeResetButton) homeResetButton.addEventListener("click", homeReset);

  var indexReset = filter(
    Array.from(document.querySelectorAll("[data-ch35-index-note]")),
    Array.from(document.querySelectorAll("[data-ch35-index-filter]")),
    document.getElementById("ch35-index-search"),
    document.querySelector("[data-ch35-index-count]"),
    document.querySelector("[data-ch35-index-empty]"),
    { itemAttribute: "data-sector", buttonAttribute: "data-ch35-index-filter", countSuffix: " 页" }
  );
  var indexResetButton = document.querySelector("[data-ch35-index-reset]");
  if (indexResetButton) indexResetButton.addEventListener("click", indexReset);

  window.CH35_COPY = copy;
}());
