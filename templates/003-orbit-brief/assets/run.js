(function () {
  "use strict";
  var key = "orbit-brief-theme";
  var button = document.querySelector("[data-theme-toggle]");
  var states = ["system", "light", "dark"];
  var labels = { system: "主题：跟随系统", light: "主题：浅色", dark: "主题：深色" };
  function stored() { try { return localStorage.getItem(key) || "system"; } catch (error) { return "system"; } }
  function apply(theme) {
    if (theme === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", theme);
    if (button) button.textContent = labels[theme];
  }
  var theme = states.indexOf(stored()) >= 0 ? stored() : "system";
  apply(theme);
  if (button) button.addEventListener("click", function () {
    theme = states[(states.indexOf(theme) + 1) % states.length];
    try { localStorage.setItem(key, theme); } catch (error) { /* storage is optional */ }
    apply(theme);
  });

  var copy = document.querySelector("[data-copy-invite]");
  var code = document.querySelector("[data-invite-code]");
  var status = document.querySelector("[data-copy-status]");
  function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(value);
    var area = document.createElement("textarea");
    area.value = value; area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0";
    document.body.appendChild(area); area.select(); document.execCommand("copy"); document.body.removeChild(area);
    return Promise.resolve();
  }
  if (copy && code) copy.addEventListener("click", function () {
    copyText(code.textContent.trim()).then(function () {
      copy.textContent = "已复制";
      if (status) status.textContent = "邀请码已复制。";
      window.setTimeout(function () { copy.textContent = "复制邀请码"; }, 1800);
    }).catch(function () { if (status) status.textContent = "复制失败，请手动选择邀请码。"; });
  });

  var filters = Array.prototype.slice.call(document.querySelectorAll("[data-channel-filter]"));
  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-channel]"));
  filters.forEach(function (filter) { filter.addEventListener("click", function () {
    var wanted = filter.getAttribute("data-channel-filter");
    filters.forEach(function (item) { item.setAttribute("aria-pressed", item === filter ? "true" : "false"); });
    cards.forEach(function (item) { item.hidden = wanted !== "all" && item.getAttribute("data-channel") !== wanted; });
  }); });
})();
