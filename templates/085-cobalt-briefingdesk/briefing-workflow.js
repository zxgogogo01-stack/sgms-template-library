(() => {
  "use strict";

  const root = document.documentElement;
  const points = (value) => Array.from(value).length;
  const clear = (node) => {
    while (node && node.firstChild) node.firstChild.remove();
  };

  let copyRevision = 0;
  const copyText = async (value, status, success) => {
    const revision = ++copyRevision;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.append(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (!copied) throw new Error("copy");
      }
      if (status && revision === copyRevision) status.textContent = success;
    } catch (_error) {
      if (status && revision === copyRevision) status.textContent = "复制未完成，请手动选择文字。";
    }
  };

  const themeButtons = Array.from(document.querySelectorAll("[data-bd85-mode-toggle]"));
  const applyTheme = (value) => {
    const theme = value === "paper" ? "paper" : "blue";
    root.dataset.bd85Mode = theme;
    themeButtons.forEach((button) => {
      button.disabled = false;
      button.setAttribute("aria-pressed", String(theme === "paper"));
      button.textContent = theme === "paper" ? "恢复钴蓝" : "切换纸本";
    });
  };
  let storedTheme = null;
  try {
    storedTheme = localStorage.getItem("bd85-mode");
  } catch (_error) {
    storedTheme = null;
  }
  applyTheme(storedTheme || root.dataset.bd85Mode);
  if (themeButtons.length) {
    themeButtons.forEach((button) => button.addEventListener("click", () => {
      const next = root.dataset.bd85Mode === "paper" ? "blue" : "paper";
      applyTheme(next);
      try {
        localStorage.setItem("bd85-mode", next);
      } catch (_error) {
        root.dataset.bd85Mode = next;
      }
    }));
  }

  const menuButton = document.querySelector(".bd85-menu");
  const menu = document.querySelector("#bd85-nav");
  if (menuButton && menu) {
    const setMenu = (open, refocus) => {
      menuButton.setAttribute("aria-expanded", String(open));
      document.body.dataset.bd85Menu = open ? "open" : "closed";
      const label = menuButton.querySelector("span");
      if (label) label.textContent = open ? "收起简报目录" : "展开简报目录";
      if (open) {
        const first = menu.querySelector("a");
        if (first) first.focus();
      } else if (refocus) {
        menuButton.focus();
      }
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

  const progress = document.querySelector("[data-bd85-progress]");
  const progressLabel = document.querySelector("[data-bd85-progress-label]");
  if (progress && progressLabel) {
    const update = () => {
      const maximum = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const value = Math.max(0, Math.min(100, Math.round(scrollY / maximum * 100)));
      progress.style.setProperty("--bd85-read", value + "%");
      progressLabel.value = value + "%";
      progressLabel.textContent = value + "%";
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
  }

  const codeButton = document.querySelector("[data-bd85-copy-code]");
  const codeSource = document.querySelector("[data-bd85-copy-source]");
  if (codeButton && codeSource) {
    codeButton.disabled = false;
    codeButton.addEventListener("click", () => copyText(
      codeSource.textContent.trim(),
      codeButton.parentElement.querySelector("[data-bd85-copy-status]"),
      "识别码已复制。"
    ));
  }
  document.querySelectorAll("[data-bd85-copy]").forEach((button) => {
    button.disabled = false;
    button.addEventListener("click", () => copyText(
      button.dataset.bd85Copy || "",
      button.parentElement.querySelector("[data-bd85-copy-status]"),
      "交接卡已复制。"
    ));
  });

  const filters = Array.from(document.querySelectorAll("[data-bd85-filter]"));
  const cards = Array.from(document.querySelectorAll("[data-bd85-desk]"));
  const filterStatus = document.querySelector("[data-bd85-filter-status]");
  filters.forEach((button) => button.addEventListener("click", () => {
    const selected = button.dataset.bd85Filter;
    let shown = 0;
    filters.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
    cards.forEach((card) => {
      const visible = selected === "all" || card.dataset.bd85Desk === selected;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (filterStatus) filterStatus.textContent = "当前显示 " + shown + " 份简报。";
  }));

  const search = document.querySelector("[data-bd85-search]");
  if (search) {
    const input = search.querySelector("#bd85-query");
    const result = search.querySelector("[data-bd85-search-result]");
    const routes = [
      { href: "brief-register.html", label: "十二份简报", words: ["简报", "文章", "收件", "研判", "行动", "复盘"] },
      { href: "instrument-drawer.html", label: "五件本地仪表", words: ["工具", "仪表", "检查", "计算", "raci", "5w1h"] },
      { href: "commercial-disclosure.html", label: "推广披露", words: ["推广", "披露", "商业", "合作"] },
      { href: "local-data-note.html", label: "本地数据说明", words: ["隐私", "数据", "本地"] },
      { href: "index.html", label: "总览桌", words: ["首页", "总览", "桌面", "分发"] }
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
    input.addEventListener("input", () => show("输入已更改，按“重新分发”搜索。"));
    search.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.normalize("NFKC").trim();
      if (!query) {
        show("请输入主题，例如“简报”或“仪表”。");
        input.focus();
        return;
      }
      if (points(query) > 80) {
        show("搜索词不能超过 80 个 Unicode 字符。");
        input.focus();
        return;
      }
      const lowered = query.toLocaleLowerCase();
      const route = routes.find((candidate) => candidate.words.some((word) => lowered.includes(word)));
      show(route ? "最近的本地分发是：" : "没有完全匹配；建议先返回", route || routes[4]);
    });
  }
})();
