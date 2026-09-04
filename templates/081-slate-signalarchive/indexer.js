(() => {
  "use strict";

  const doc = document;
  const root = doc.documentElement;
  const count = (value) => Array.from(value).length;
  const filmKey = "sa81-film";
  root.classList.add("sa81-js");

  const filmButtons = [...doc.querySelectorAll("[data-sa81-film-toggle]")];
  const readFilm = () => {
    try { return localStorage.getItem(filmKey); } catch (_error) { return null; }
  };
  const applyFilm = (value, persist = false) => {
    const next = value === "lightbox" ? "lightbox" : "slate";
    root.dataset.sa81Film = next;
    filmButtons.forEach((button) => {
      button.disabled = false;
      button.setAttribute("aria-pressed", String(next === "lightbox"));
      button.textContent = next === "lightbox" ? "灰蓝片" : "灯箱";
    });
    if (persist) {
      try { localStorage.setItem(filmKey, next); } catch (_error) { /* private mode */ }
    }
  };
  applyFilm(readFilm() || root.dataset.sa81Film || "slate");
  filmButtons.forEach((button) => button.addEventListener("click", () => {
    applyFilm(root.dataset.sa81Film === "lightbox" ? "slate" : "lightbox", true);
  }));

  const menuButton = doc.querySelector(".sa81-menu");
  const navigation = doc.getElementById("sa81-nav");
  const closeMenu = (returnFocus = false) => {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("sa81-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (returnFocus) menuButton.focus();
  };
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const opening = menuButton.getAttribute("aria-expanded") !== "true";
      navigation.classList.toggle("sa81-open", opening);
      menuButton.setAttribute("aria-expanded", String(opening));
      if (opening) navigation.querySelector("a")?.focus();
    });
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    doc.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("sa81-open")) closeMenu(true);
    });
    doc.addEventListener("click", (event) => {
      if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    addEventListener("resize", () => { if (innerWidth > 760) closeMenu(); }, { passive: true });
  }

  const progress = doc.querySelector("[data-sa81-progress]");
  if (progress) {
    const updateProgress = () => {
      const maximum = Math.max(1, doc.documentElement.scrollHeight - innerHeight);
      progress.style.height = `${Math.min(100, Math.max(0, scrollY / maximum * 100))}%`;
    };
    addEventListener("scroll", updateProgress, { passive: true });
    addEventListener("resize", updateProgress, { passive: true });
    updateProgress();
  }

  const copyText = async (value) => {
    if (navigator.clipboard && isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const field = doc.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    doc.body.append(field);
    field.select();
    const copied = doc.execCommand("copy");
    field.remove();
    if (!copied) throw new Error("copy unavailable");
  };
  let copySequence = 0;
  doc.querySelectorAll("[data-sa81-copy]").forEach((button) => { button.disabled = false; });
  doc.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-sa81-copy]");
    if (!button) return;
    const sequence = ++copySequence;
    const value = button.dataset.sa81Copy || "";
    const scope = button.closest("section,aside,article,main") || doc;
    const status = scope.querySelector("[data-sa81-copy-status]") || doc.querySelector("[data-sa81-copy-status]");
    if (status) status.textContent = "正在复制…";
    try {
      await copyText(value);
      if (sequence === copySequence && status) status.textContent = "已复制到剪贴板。";
    } catch (_error) {
      if (sequence === copySequence && status) status.textContent = "自动复制不可用，请手动选择文字。";
    }
  });

  const searchForm = doc.querySelector("[data-sa81-search]");
  if (searchForm) {
    const input = searchForm.querySelector("input[type=search]");
    const result = searchForm.querySelector("[data-sa81-search-result]");
    const routes = [
      { href: "archive-register.html", label: "打开十二卷宗", terms: "卷宗 文章 捕获 编码 摘要 字节 版本 语境" },
      { href: "instrument-bay.html", label: "打开五件本地仪器", terms: "工具 仪器 sha 哈希 指纹 汉明 清单 链路" },
      { href: "archive-charter.html", label: "打开库藏章程", terms: "关于 章程 身份 库藏" },
      { href: "signal-desk.html", label: "打开信号联络", terms: "联系 邮箱 反馈" },
      { href: "amendment-log.html", label: "打开修订规则", terms: "更正 修订 勘误" },
      { href: "relation-frame.html", label: "打开关系披露", terms: "披露 推广 关系" },
      { href: "local-privacy.html", label: "打开本地隐私", terms: "隐私 本地 数据" },
      { href: "capture-method.html", label: "打开捕获方法", terms: "方法 来源 捕获" }
    ];
    const showText = (message) => result.replaceChildren(doc.createTextNode(message));
    input.addEventListener("input", () => showText("输入已更改，请重新扫描。"));
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const raw = input.value;
      if (/[\u0000-\u001f\u007f]/u.test(raw)) {
        showText("搜索词包含不可用控制字符。"); input.focus(); return;
      }
      const query = raw.normalize("NFKC").trim().toLowerCase();
      if (!query) { showText("请输入页面名称或主题。"); input.focus(); return; }
      if (count(query) > 80) { showText("搜索词不能超过 80 个 Unicode 字符。"); input.focus(); return; }
      const hit = routes.find((route) => route.terms.includes(query) || query.includes(route.terms.split(" ")[0]));
      result.replaceChildren();
      if (!hit) { showText("没有完全匹配；可展开页尾的完整胶卷目录。"); return; }
      result.append("找到：");
      const link = doc.createElement("a");
      link.href = hit.href;
      link.textContent = hit.label;
      result.append(link);
      link.focus();
    });
  }
})();
