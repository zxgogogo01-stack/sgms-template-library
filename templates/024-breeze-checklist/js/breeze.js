(function () {
  "use strict";
  var root = document.documentElement;
  var theme = document.querySelector("[data-brz-theme]");
  var key = "brz-theme";
  function getTheme() { try { return window.localStorage.getItem(key); } catch (_) { return null; } }
  function setTheme(value) { try { window.localStorage.setItem(key, value); } catch (_) { return; } }
  function applyTheme(value) {
    if (value === "night") root.setAttribute("data-theme", "night"); else root.removeAttribute("data-theme");
    if (theme) theme.setAttribute("aria-pressed", value === "night" ? "true" : "false");
  }
  applyTheme(getTheme() === "night" ? "night" : "day");
  if (theme) theme.addEventListener("click", function () { var next = root.hasAttribute("data-theme") ? "day" : "night"; applyTheme(next); setTheme(next); });

  function fallbackCopy(value) {
    var area = document.createElement("textarea");
    area.value = value; area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0";
    document.body.appendChild(area); area.select();
    var okay = false; try { okay = document.execCommand("copy"); } catch (_) { okay = false; }
    area.remove(); return okay;
  }
  window.brzCopyText = function (value) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(value).then(function () { return true; }, function () { return fallbackCopy(value); });
    return Promise.resolve(fallbackCopy(value));
  };
  document.querySelectorAll("[data-brz-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var field = document.querySelector("[data-brz-code]");
      var value = button.getAttribute("data-brz-copy-value") || (field ? field.textContent.trim() : "");
      var status = button.parentElement.querySelector("[data-brz-copy-status]") || document.querySelector("[data-brz-copy-status]");
      window.brzCopyText(value).then(function (okay) { if (status) status.textContent = okay ? "%COPY_SUCCESS%" : "%COPY_FAILURE%"; });
    });
  });

  var checks = Array.prototype.slice.call(document.querySelectorAll("[data-brz-check]"));
  var orbit = document.querySelector("[data-brz-orbit]");
  function updateChecks() {
    if (!checks.length || !orbit) return;
    var done = checks.filter(function (item) { return item.checked; }).length;
    var percent = Math.round(done / checks.length * 100);
    orbit.style.setProperty("--progress", String(percent));
    document.querySelector("[data-brz-percent]").textContent = percent + "%";
    document.querySelector("[data-brz-done]").textContent = String(done);
    document.querySelector("[data-brz-left]").textContent = String(checks.length - done);
  }
  checks.forEach(function (item) { item.addEventListener("change", updateChecks); });
  var reset = document.querySelector("[data-brz-reset]");
  if (reset) reset.addEventListener("click", function () { checks.forEach(function (item) { item.checked = false; }); updateChecks(); if (checks[0]) checks[0].focus(); });
  updateChecks();

  var filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-brz-filter]"));
  var records = Array.prototype.slice.call(document.querySelectorAll("[data-brz-record]"));
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var wanted = button.getAttribute("data-brz-filter"); var count = 0;
      filterButtons.forEach(function (item) { item.setAttribute("aria-pressed", item === button ? "true" : "false"); });
      records.forEach(function (record) { var show = wanted === "all" || record.getAttribute("data-brz-record") === wanted; record.hidden = !show; if (show) count += 1; });
      var status = document.querySelector("[data-brz-filter-status]"); if (status) status.textContent = "%FILTER_STATUS_PREFIX%" + count + "%FILTER_STATUS_SUFFIX%";
    });
  });
}());
