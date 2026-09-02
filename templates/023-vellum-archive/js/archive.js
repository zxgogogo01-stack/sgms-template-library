(function () {
  "use strict";
  var root = document.documentElement;
  var storageKey = "vlm-theme";
  var themeButton = document.querySelector("[data-vlm-theme]");
  function storedTheme() {
    try { return window.localStorage.getItem(storageKey); } catch (_) { return null; }
  }
  function saveTheme(value) {
    try { window.localStorage.setItem(storageKey, value); } catch (_) { return; }
  }
  function applyTheme(value) {
    if (value === "night") root.setAttribute("data-theme", "night");
    else root.removeAttribute("data-theme");
    if (themeButton) themeButton.setAttribute("aria-pressed", value === "night" ? "true" : "false");
  }
  applyTheme(storedTheme() === "night" ? "night" : "day");
  if (themeButton) themeButton.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "night" ? "day" : "night";
    applyTheme(next);
    saveTheme(next);
  });

  function fallbackCopy(value) {
    var field = document.createElement("textarea");
    var okay = false;
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    try { okay = document.execCommand("copy"); } catch (_) { okay = false; }
    field.remove();
    return okay;
  }
  window.vlmCopyText = function (value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value).then(function () { return true; }, function () { return fallbackCopy(value); });
    }
    return Promise.resolve(fallbackCopy(value));
  };
  var copyButton = document.querySelector("[data-vlm-copy]");
  var code = document.querySelector("[data-vlm-code]");
  var copyStatus = document.querySelector("[data-vlm-copy-status]");
  if (copyButton && code && copyStatus) copyButton.addEventListener("click", function () {
    window.vlmCopyText(code.textContent.trim()).then(function (okay) {
      copyStatus.textContent = okay ? "%COPY_SUCCESS%" : "%COPY_FAILURE%";
    });
  });

  var filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-vlm-filter]"));
  var records = Array.prototype.slice.call(document.querySelectorAll("[data-vlm-record]"));
  var filterStatus = document.querySelector("[data-vlm-filter-status]");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var wanted = button.getAttribute("data-vlm-filter");
      var count = 0;
      filterButtons.forEach(function (item) { item.setAttribute("aria-pressed", item === button ? "true" : "false"); });
      records.forEach(function (record) {
        var show = wanted === "all" || record.getAttribute("data-vlm-record") === wanted;
        record.hidden = !show;
        if (show) count += 1;
      });
      if (filterStatus) filterStatus.textContent = "%FILTER_STATUS_PREFIX%" + count + "%FILTER_STATUS_SUFFIX%";
    });
  });
}());
