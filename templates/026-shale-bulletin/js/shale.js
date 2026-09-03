(() => {
  "use strict";
  const root = document.documentElement;
  root.classList.add("shb-js");

  const menu = document.querySelector("[data-menu]");
  const nav = menu ? document.getElementById(menu.getAttribute("aria-controls")) : null;
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menu.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        menu.setAttribute("aria-expanded", "false");
      }
    });
  }

  const themeButton = document.querySelector("[data-tone]");
  const savedTheme = localStorage.getItem("shale-theme");
  if (savedTheme === "dark" || savedTheme === "light") root.dataset.shaleTheme = savedTheme;
  const syncThemeLabel = () => {
    if (!themeButton) return;
    const dark = root.dataset.shaleTheme === "dark";
    themeButton.setAttribute("aria-label", dark ? "切换至浅色主题" : "切换至深色主题");
    themeButton.setAttribute("aria-pressed", String(dark));
  };
  syncThemeLabel();
  themeButton?.addEventListener("click", () => {
    const next = root.dataset.shaleTheme === "dark" ? "light" : "dark";
    root.dataset.shaleTheme = next;
    localStorage.setItem("shale-theme", next);
    syncThemeLabel();
  });

  const copyText = async (value, status) => {
    try {
      await navigator.clipboard.writeText(value);
      if (status) status.textContent = "%COPY_SUCCESS%";
    } catch {
      if (status) status.textContent = "%COPY_FALLBACK%";
    }
  };
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => {
      const selector = button.dataset.copy.startsWith("#") ? button.dataset.copy : `#${button.dataset.copy}`;
      const target = document.querySelector(selector);
      const status = button.closest(".shb-access-ticket, .shb-entry-panel")?.querySelector("[data-copy-status]");
      copyText(target?.textContent?.trim() || "", status);
    });
  });

  const filter = document.querySelector("#release-filter");
  const releases = [...document.querySelectorAll("[data-release]")];
  const count = document.querySelector("[data-release-count]");
  const empty = document.querySelector("[data-release-empty]");
  if (filter && releases.length) {
    const update = () => {
      const query = filter.value.trim().toLocaleLowerCase();
      let visible = 0;
      releases.forEach((release) => {
        const match = !query || release.textContent.toLocaleLowerCase().includes(query);
        release.hidden = !match;
        if (match) visible += 1;
      });
      if (count) count.textContent = String(visible).padStart(2, "0");
      if (empty) empty.hidden = visible !== 0;
    };
    filter.addEventListener("input", update);
    update();
  }
})();
