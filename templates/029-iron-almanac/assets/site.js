"use strict";
(() => {
  const root = document.documentElement;
  const menuButton = document.querySelector("[data-menu-toggle]");
  const nav = document.getElementById("almanac-nav");
  const themeButton = document.querySelector("[data-theme-toggle]");
  const savedTheme = localStorage.getItem("iron-almanac-theme");
  if (savedTheme === "dark" || savedTheme === "light") root.dataset.theme = savedTheme;
  if (themeButton) themeButton.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("iron-almanac-theme", root.dataset.theme);
  });
  if (menuButton && nav) menuButton.addEventListener("click", () => {
    const open = nav.dataset.open !== "true";
    nav.dataset.open = String(open);
    menuButton.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll("[data-copy-source]").forEach((button) => button.addEventListener("click", async () => {
    const source = document.getElementById(button.dataset.copySource);
    if (!source) return;
    const value = source.value || source.textContent || "";
    try { await navigator.clipboard.writeText(value.trim()); button.textContent = button.dataset.copySuccess || "已复制"; }
    catch { const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(source); selection.removeAllRanges(); selection.addRange(range); button.textContent = "已选中，请复制"; }
  }));
  const editionNotes = { current: "[[CURRENT_EDITION_NOTE]]", prior: "[[PRIOR_EDITION_NOTE]]", method: "[[METHOD_EDITION_NOTE]]" };
  const editionOutput = document.querySelector("[data-edition-note]");
  document.querySelectorAll("[data-edition]").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("[data-edition]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    if (editionOutput) editionOutput.textContent = editionNotes[button.dataset.edition] || "";
  }));
  const search = document.querySelector("[data-archive-search]");
  if (search) {
    const cards = [...document.querySelectorAll("[data-record-card]")];
    const count = document.querySelector("[data-archive-count]");
    const empty = document.querySelector("[data-archive-empty]");
    const filter = () => {
      const term = search.value.trim().toLocaleLowerCase("zh-CN");
      let visible = 0;
      cards.forEach((card) => { const show = !term || card.dataset.search.toLocaleLowerCase("zh-CN").includes(term); card.hidden = !show; if (show) visible += 1; });
      if (count) count.textContent = `${visible} / ${cards.length} 项`;
      if (empty) empty.hidden = visible !== 0;
    };
    search.addEventListener("input", filter);
  }
})();
