(() => {
  "use strict";

  const doc = document;
  const root = doc.documentElement;
  const count = (value) => Array.from(value).length;
  const themeKey = "oi82-sky";
  root.classList.add("oi82-js");

  const themeButtons = [...doc.querySelectorAll("[data-oi82-sky-toggle]")];
  const readTheme = () => { try { return localStorage.getItem(themeKey); } catch (_error) { return null; } };
  const applyTheme = (value, persist = false) => {
    const next = value === "exposed" ? "exposed" : "deep";
    root.dataset.oi82Sky = next;
    themeButtons.forEach((button) => {
      button.disabled = false;
      button.setAttribute("aria-pressed", String(next === "exposed"));
      button.textContent = next === "exposed" ? "恢复深空" : "切换曝光";
    });
    if (persist) { try { localStorage.setItem(themeKey, next); } catch (_error) { /* private mode */ } }
  };
  applyTheme(readTheme() || root.dataset.oi82Sky || "deep");
  themeButtons.forEach((button) => button.addEventListener("click", () => applyTheme(root.dataset.oi82Sky === "exposed" ? "deep" : "exposed", true)));

  const menuButton = doc.querySelector(".oi82-menu");
  const navigation = doc.getElementById("oi82-nav");
  const setMenu = (open, returnFocus = false) => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", String(open));
    doc.body.dataset.oi82Menu = open ? "open" : "closed";
    const label = menuButton.querySelector("span");
    if (label) label.textContent = open ? "收起观测目录" : "展开观测目录";
    if (open) navigation.querySelector("a")?.focus();
    else if (returnFocus) menuButton.focus();
  };
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
    navigation.addEventListener("click", (event) => { if (event.target.closest("a")) setMenu(false); });
    doc.addEventListener("keydown", (event) => { if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") setMenu(false, true); });
    doc.addEventListener("click", (event) => { if (!navigation.contains(event.target) && !menuButton.contains(event.target)) setMenu(false); });
    addEventListener("resize", () => { if (innerWidth > 760) setMenu(false); }, { passive: true });
  }

  const progress = doc.querySelector("[data-oi82-progress]");
  const progressLabel = doc.querySelector("[data-oi82-progress-label]");
  if (progress && progressLabel) {
    const update = () => {
      const maximum = Math.max(1, doc.documentElement.scrollHeight - innerHeight);
      const value = Math.min(100, Math.max(0, Math.round(scrollY / maximum * 100)));
      progress.style.setProperty("--oi82-progress", `${value}%`);
      progressLabel.value = `${value}%`;
      progressLabel.textContent = `${value}%`;
    };
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update, { passive: true });
    update();
  }

  const copyText = async (value) => {
    if (navigator.clipboard && isSecureContext) { await navigator.clipboard.writeText(value); return; }
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
  doc.querySelectorAll("[data-oi82-copy]").forEach((button) => { button.disabled = false; });
  doc.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-oi82-copy]");
    if (!button) return;
    const sequence = ++copySequence;
    const scope = button.closest("section,aside,article,main") || doc;
    const status = scope.querySelector("[data-oi82-copy-status]") || doc.querySelector("[data-oi82-copy-status]");
    if (status) status.textContent = "正在复制…";
    try {
      await copyText(button.dataset.oi82Copy || "");
      if (sequence === copySequence && status) status.textContent = "已复制到剪贴板。";
    } catch (_error) {
      if (sequence === copySequence && status) status.textContent = "自动复制不可用，请手动选择文字。";
    }
  });

  const searchForm = doc.querySelector("[data-oi82-search]");
  if (searchForm) {
    const input = searchForm.querySelector("input[type=search]");
    const result = searchForm.querySelector("[data-oi82-search-result]");
    const routes = [
      { href: "ephemeris-register.html", label: "打开十二次观测", terms: "文章 观测 轨道 来源 版本 证据 复核" },
      { href: "calibration-deck.html", label: "打开五台本地仪器", terms: "工具 仪器 坐标 赤经 赤纬 角距 窗口 相位" },
      { href: "station-charter.html", label: "打开台站章程", terms: "章程 关于 台站 身份" },
      { href: "observer-contact.html", label: "打开观测联络", terms: "联系 邮箱 反馈" },
      { href: "correction-ephemeris.html", label: "打开更正星历", terms: "更正 修订 勘误" },
      { href: "commercial-orbit.html", label: "打开关系轨道披露", terms: "披露 推广 关系" },
      { href: "local-observation-privacy.html", label: "打开本地观测隐私", terms: "隐私 本地 数据" },
      { href: "observation-method.html", label: "打开观测方法", terms: "方法 编辑 来源" }
    ];
    const showText = (message) => result.replaceChildren(doc.createTextNode(message));
    input.addEventListener("input", () => showText("输入已更改，请重新捕获。"));
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const raw = input.value;
      if (/[\u0000-\u001f\u007f]/u.test(raw)) { showText("搜索词包含不可用控制字符。"); input.focus(); return; }
      const query = raw.normalize("NFKC").trim().toLowerCase();
      if (!query) { showText("请输入页面名称或主题。"); input.focus(); return; }
      if (count(query) > 80) { showText("搜索词不能超过 80 个 Unicode 字符。"); input.focus(); return; }
      const hit = routes.find((route) => route.terms.includes(query) || query.includes(route.terms.split(" ")[0]));
      result.replaceChildren();
      if (!hit) { showText("没有完全匹配；可展开页尾的完整星历图。"); return; }
      result.append("找到：");
      const link = doc.createElement("a");
      link.href = hit.href;
      link.textContent = hit.label;
      result.append(link);
      link.focus();
    });
  }
})();
