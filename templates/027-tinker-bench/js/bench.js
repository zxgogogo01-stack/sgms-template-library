(() => {
  "use strict";
  const root = document.documentElement;
  const menuButton = document.querySelector("[data-bench-menu]");
  const menu = menuButton ? document.getElementById(menuButton.getAttribute("aria-controls")) : null;
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        menu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }
  const themeButton = document.querySelector("[data-bench-theme]");
  const savedTheme = localStorage.getItem("tinker-bench-theme");
  if (savedTheme === "paper" || savedTheme === "night") root.dataset.benchTheme = savedTheme;
  const syncTheme = () => {
    if (!themeButton) return;
    const night = root.dataset.benchTheme === "night";
    themeButton.setAttribute("aria-pressed", String(night));
    themeButton.setAttribute("aria-label", night ? "切换至浅色主题" : "切换至深色主题");
  };
  syncTheme();
  themeButton?.addEventListener("click", () => {
    const next = root.dataset.benchTheme === "night" ? "paper" : "night";
    root.dataset.benchTheme = next;
    localStorage.setItem("tinker-bench-theme", next);
    syncTheme();
  });
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const source = document.querySelector(button.dataset.copy);
      const status = button.closest(".tkw-pass")?.querySelector("[data-copy-status]");
      try {
        await navigator.clipboard.writeText(source?.textContent?.trim() || "");
        if (status) status.textContent = "[[COPY_SUCCESS]]";
      } catch {
        if (status) status.textContent = "[[COPY_FALLBACK]]";
      }
    });
  });
  const search = document.querySelector("#manual-filter");
  const manuals = [...document.querySelectorAll("[data-manual]")];
  const count = document.querySelector("[data-manual-count]");
  const empty = document.querySelector("[data-manual-empty]");
  if (search && manuals.length) {
    const update = () => {
      const query = search.value.trim().toLocaleLowerCase();
      let visible = 0;
      manuals.forEach((manual) => {
        const match = !query || manual.textContent.toLocaleLowerCase().includes(query);
        manual.hidden = !match;
        if (match) visible += 1;
      });
      if (count) count.textContent = String(visible);
      if (empty) empty.hidden = visible !== 0;
    };
    search.addEventListener("input", update);
    update();
  }
})();
