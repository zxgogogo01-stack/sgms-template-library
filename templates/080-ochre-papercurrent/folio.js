"use strict";
(() => {
  const doc = document;
  const root = doc.documentElement;
  root.classList.add("pc80-js");
  const themeButton = doc.querySelector("[data-pc80-paper-toggle]");
  const menuButton = doc.querySelector(".pc80-menu");
  const nav = doc.getElementById("pc80-nav");
  const progress = doc.querySelector("[data-pc80-progress]");
  const themeKey = "pc80-paper";
  doc.querySelectorAll("[data-pc80-copy]").forEach(button => { button.disabled = false; });

  function storedTheme() {
    try { return localStorage.getItem(themeKey); } catch (_) { return null; }
  }
  function setTheme(value, persist) {
    const next = value === "ink" ? "ink" : "cream";
    root.dataset.pc80Paper = next;
    if (themeButton) {
      themeButton.disabled = false;
      themeButton.setAttribute("aria-pressed", String(next === "ink"));
      themeButton.textContent = next === "ink" ? "奶油纸" : "墨纸";
    }
    if (persist) {
      try { localStorage.setItem(themeKey, next); } catch (_) { /* private mode */ }
    }
  }
  setTheme(storedTheme() || root.dataset.pc80Paper || "cream", false);
  if (themeButton) themeButton.addEventListener("click", () => setTheme(root.dataset.pc80Paper === "ink" ? "cream" : "ink", true));

  function closeMenu() {
    if (!menuButton || !nav) return;
    nav.classList.remove("pc80-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      nav.classList.toggle("pc80-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      if (open) nav.querySelector("a")?.focus();
    });
    nav.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
    doc.addEventListener("keydown", event => { if (event.key === "Escape") { closeMenu(); menuButton.focus(); } });
    doc.addEventListener("click", event => { if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
  }

  if (progress) {
    const update = () => {
      const total = Math.max(1, doc.documentElement.scrollHeight - innerHeight);
      progress.style.width = `${Math.min(100, Math.max(0, scrollY / total * 100))}%`;
    };
    addEventListener("scroll", update, {passive:true});
    addEventListener("resize", update, {passive:true});
    update();
  }

  async function copyText(value) {
    if (navigator.clipboard && isSecureContext) { await navigator.clipboard.writeText(value); return; }
    const area = doc.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    doc.body.append(area);
    area.select();
    const ok = doc.execCommand("copy");
    area.remove();
    if (!ok) throw new Error("copy unavailable");
  }
  doc.addEventListener("click", async event => {
    const button = event.target.closest("[data-pc80-copy]");
    if (!button) return;
    const status = button.closest("main,section,aside")?.querySelector("[data-pc80-copy-status]") || doc.querySelector("[data-pc80-copy-status]");
    try {
      await copyText(button.dataset.pc80Copy || "");
      if (status) status.textContent = "已复制到剪贴板。";
    } catch (_) {
      if (status) status.textContent = "当前环境未授权自动复制，请手动选择。";
    }
  });

  const searchForm = doc.querySelector("[data-pc80-search]");
  if (searchForm) {
    const input = searchForm.querySelector("input[type=search]");
    const result = searchForm.querySelector("[data-pc80-search-result]");
    const pages = [
      ["篇章 文章 书目", "folio-register.html", "打开十二篇章"],
      ["工具 校样 脚注 页序 引用 修订 证据", "proofing-desk.html", "打开校样桌"],
      ["章程 关于 身份", "edition-charter.html", "打开刊物章程"],
      ["联系 邮箱 反馈", "editorial-desk.html", "打开联系编辑室"],
      ["更正 勘误", "corrigenda-policy.html", "打开勘误规则"],
      ["披露 推广 关系", "relation-insert.html", "打开关系披露"],
      ["隐私 本地", "local-privacy.html", "打开本地隐私"],
      ["编辑 方法 来源", "editorial-method.html", "打开编辑方法"]
    ];
    searchForm.addEventListener("submit", event => {
      event.preventDefault();
      const query = input.value.normalize("NFKC").trim().toLowerCase();
      result.replaceChildren();
      if (!query) { result.textContent = "请输入页面名称或主题。"; input.focus(); return; }
      if (Array.from(query).length > 80) { result.textContent = "搜索词不能超过 80 个字符。"; input.focus(); return; }
      if (/[\u0000-\u001f\u007f]/.test(query)) { result.textContent = "搜索词包含不可用控制字符。"; input.focus(); return; }
      const hit = pages.find(row => row[0].toLowerCase().includes(query));
      if (!hit) { result.textContent = "没有匹配页；可展开页尾的完整页序。"; return; }
      result.append("找到：");
      const link = doc.createElement("a");
      link.href = hit[1]; link.textContent = hit[2];
      result.append(link);
      link.focus();
    });
  }
})();
