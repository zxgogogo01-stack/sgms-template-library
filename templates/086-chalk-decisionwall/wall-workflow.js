(() => {
  "use strict";
  const root = document.documentElement;
  const points = (value) => Array.from(value).length;
  const clear = (node) => { while (node && node.firstChild) node.firstChild.remove(); };
  let copyRevision = 0;
  const copyText = async (value, status, success) => {
    const revision = ++copyRevision;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.append(field);
        field.select();
        const okay = document.execCommand("copy");
        field.remove();
        if (!okay) throw new Error("copy");
      }
      if (status && revision === copyRevision) status.textContent = success;
    } catch (_error) {
      if (status && revision === copyRevision) status.textContent = "复制未完成，请手动选择文字。";
    }
  };
  const toggles = Array.from(document.querySelectorAll("[data-dw86-board-toggle]"));
  const applyTheme = (value) => {
    const theme = value === "day" ? "day" : "night";
    root.dataset.dw86Board = theme;
    toggles.forEach((button) => {
      button.disabled = false;
      button.setAttribute("aria-pressed", String(theme === "day"));
      button.textContent = theme === "day" ? "恢复夜间板" : "切换日光板";
    });
  };
  let stored = null;
  try { stored = localStorage.getItem("dw86-board"); } catch (_error) { stored = null; }
  applyTheme(stored || root.dataset.dw86Board);
  toggles.forEach((button) => button.addEventListener("click", () => {
    const next = root.dataset.dw86Board === "day" ? "night" : "day";
    applyTheme(next);
    try { localStorage.setItem("dw86-board", next); } catch (_error) { root.dataset.dw86Board = next; }
  }));
  const menuButton = document.querySelector(".dw86-menu");
  const menu = document.querySelector("#dw86-nav");
  if (menuButton && menu) {
    const setMenu = (open, refocus) => {
      menuButton.setAttribute("aria-expanded", String(open));
      document.body.dataset.dw86Menu = open ? "open" : "closed";
      const label = menuButton.querySelector("span");
      if (label) label.textContent = open ? "收起墙面目录" : "展开墙面目录";
      if (open) menu.querySelector("a")?.focus();
      else if (refocus) menuButton.focus();
    };
    setMenu(false, false);
    menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true", false));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") setMenu(false, true);
    });
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a") && matchMedia("(max-width:760px)").matches) setMenu(false, false);
    });
  }
  const meter = document.querySelector("[data-dw86-progress]");
  const meterLabel = document.querySelector("[data-dw86-progress-label]");
  if (meter && meterLabel) {
    const update = () => {
      const maximum = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const value = Math.max(0, Math.min(100, Math.round(scrollY / maximum * 100)));
      meter.style.setProperty("--dw86-read", value + "%");
      meterLabel.value = value + "%";
      meterLabel.textContent = value + "%";
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
  }
  const codeButton = document.querySelector("[data-dw86-copy-code]");
  const codeSource = document.querySelector("[data-dw86-copy-source]");
  if (codeButton && codeSource) {
    codeButton.disabled = false;
    codeButton.addEventListener("click", () => copyText(codeSource.textContent.trim(), codeButton.parentElement.querySelector("[data-dw86-copy-status]"), "识别码已复制。"));
  }
  document.querySelectorAll("[data-dw86-copy]").forEach((button) => {
    button.disabled = false;
    button.addEventListener("click", () => copyText(button.dataset.dw86Copy || "", button.parentElement.querySelector("[data-dw86-copy-status]"), "交接单已复制。"));
  });
  const filters = Array.from(document.querySelectorAll("[data-dw86-filter]"));
  const cards = Array.from(document.querySelectorAll("[data-dw86-wall]"));
  const filterStatus = document.querySelector("[data-dw86-filter-status]");
  filters.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.dw86Filter;
    let shown = 0;
    filters.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
    cards.forEach((card) => {
      const visible = filter === "all" || card.dataset.dw86Wall === filter;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (filterStatus) filterStatus.textContent = "当前显示 " + shown + " 张便签。";
  }));
  const search = document.querySelector("[data-dw86-search]");
  if (search) {
    const input = search.querySelector("#dw86-query");
    const result = search.querySelector("[data-dw86-search-result]");
    const routes = [
      {href:"wall-register.html",label:"十二张方法便签",words:["便签","文章","问题","标准","证据","复盘"]},
      {href:"chalk-instruments.html",label:"五件粉笔仪表",words:["工具","仪表","权重","门槛","后悔值"]},
      {href:"relationship-note.html",label:"关系披露",words:["推广","披露","商业","合作"]},
      {href:"local-wall-privacy.html",label:"本地隐私",words:["隐私","数据","本地"]},
      {href:"index.html",label:"决策墙",words:["首页","墙面","决定","反证"]}
    ];
    const show = (message, route) => {
      clear(result);
      result.append(document.createTextNode(message));
      if (route) {
        const link = document.createElement("a");
        link.href = route.href;
        link.textContent = route.label;
        result.append(link, document.createTextNode("。"));
      }
    };
    input.addEventListener("input", () => show("输入已更改，按“寻找粉笔痕迹”重新搜索。"));
    search.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.normalize("NFKC").trim();
      if (!query) { show("请输入主题，例如“标准”或“仪表”。"); input.focus(); return; }
      if (points(query) > 80) { show("搜索词不能超过 80 个 Unicode 字符。"); input.focus(); return; }
      const lowered = query.toLocaleLowerCase();
      const route = routes.find((candidate) => candidate.words.some((word) => lowered.includes(word)));
      show(route ? "最近的本地粉笔痕迹是：" : "没有完全匹配；建议先返回", route || routes[4]);
    });
  }
})();
