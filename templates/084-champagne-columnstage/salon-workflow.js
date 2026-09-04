(() => {
  "use strict";

  const root = document.documentElement;
  root.classList.add("cc84-js");
  const clear = (node) => {
    while (node && node.firstChild) node.firstChild.remove();
  };
  const points = (value) => Array.from(value).length;
  const copyText = async (value, status, success) => {
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
        const okay = document.execCommand("copy");
        field.remove();
        if (!okay) throw new Error("copy unavailable");
      }
      if (status) status.textContent = success;
    } catch (_error) {
      if (status) status.textContent = "复制未完成，请手动选择文字。";
    }
  };

  const toggles = Array.from(document.querySelectorAll("[data-cc84-salon-toggle]"));
  if (toggles.length) {
    const applyTheme = (value) => {
      const next = value === "morning" ? "morning" : "evening";
      root.dataset.cc84Salon = next;
      toggles.forEach((toggle) => {
        toggle.disabled = false;
        toggle.setAttribute("aria-pressed", String(next === "morning"));
        toggle.textContent = next === "morning" ? "恢复晚场" : "切换晨场";
      });
    };
    let saved = "";
    try {
      saved = localStorage.getItem("cc84-salon") || "";
    } catch (_error) {
      saved = "";
    }
    applyTheme(saved || root.dataset.cc84Salon);
    toggles.forEach((toggle) => toggle.addEventListener("click", () => {
      const next = root.dataset.cc84Salon === "morning" ? "evening" : "morning";
      applyTheme(next);
      try {
        localStorage.setItem("cc84-salon", next);
      } catch (_error) {
        root.dataset.cc84Salon = next;
      }
    }));
  }

  const menu = document.querySelector(".cc84-menu");
  const nav = document.querySelector("#cc84-nav");
  if (menu && nav) {
    const setMenu = (open, refocus) => {
      menu.setAttribute("aria-expanded", String(open));
      document.body.dataset.cc84Menu = open ? "open" : "closed";
      const label = menu.querySelector("span");
      if (label) label.textContent = open ? "收起沙龙目录" : "展开沙龙目录";
      if (open) {
        const first = nav.querySelector("a");
        if (first) first.focus();
      } else if (refocus) {
        menu.focus();
      }
    };
    setMenu(false, false);
    menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true", false));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") setMenu(false, true);
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a") && matchMedia("(max-width: 760px)").matches) setMenu(false, false);
    });
  }

  const meter = document.querySelector("[data-cc84-progress]");
  const meterLabel = document.querySelector("[data-cc84-progress-label]");
  if (meter && meterLabel) {
    const updateProgress = () => {
      const maximum = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const value = Math.max(0, Math.min(100, Math.round(scrollY / maximum * 100)));
      meter.style.setProperty("--cc84-read", value + "%");
      meterLabel.value = value + "%";
      meterLabel.textContent = value + "%";
    };
    updateProgress();
    addEventListener("scroll", updateProgress, { passive: true });
    addEventListener("resize", updateProgress);
  }

  const homeCopy = document.querySelector("[data-cc84-copy-code]");
  const homeSource = document.querySelector("[data-cc84-copy-source]");
  if (homeCopy && homeSource) {
    homeCopy.disabled = false;
    homeCopy.addEventListener("click", () => copyText(homeSource.textContent.trim(), document.querySelector(".cc84-access-ticket [data-cc84-copy-status]"), "凭条已复制。"));
  }
  document.querySelectorAll("[data-cc84-copy]").forEach((button) => {
    button.disabled = false;
    button.addEventListener("click", () => copyText(button.dataset.cc84Copy || "", button.parentElement.querySelector("[data-cc84-copy-status]"), "交接卡已复制。"));
  });

  const filterButtons = Array.from(document.querySelectorAll("[data-cc84-filter]"));
  const filterCards = Array.from(document.querySelectorAll("[data-cc84-room]"));
  const filterStatus = document.querySelector("[data-cc84-filter-status]");
  filterButtons.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.cc84Filter;
    let shown = 0;
    filterButtons.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
    filterCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.cc84Room === filter;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (filterStatus) filterStatus.textContent = "当前显示 " + shown + " 场节目。";
  }));

  const search = document.querySelector("[data-cc84-search]");
  if (search) {
    const input = search.querySelector("#cc84-query");
    const result = search.querySelector("[data-cc84-search-result]");
    const routes = [
      { href: "program-register.html", label: "十二场节目", words: ["节目", "文章", "栏目", "观众", "节奏"] },
      { href: "atelier-register.html", label: "五台本地工具", words: ["工具", "栏宽", "顺序", "覆盖", "计算"] },
      { href: "commercial-note.html", label: "商业关系节目单", words: ["推广", "披露", "商业", "合作"] },
      { href: "local-atelier-privacy.html", label: "本地工具隐私", words: ["隐私", "数据", "本地"] },
      { href: "index.html", label: "沙龙首页", words: ["首页", "沙龙", "入口", "舞台"] }
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
    input.addEventListener("input", () => show("输入已更改，按“查询场次”重新搜索。"));
    search.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.normalize("NFKC").trim();
      if (!query) {
        show("请输入主题，例如“节目”或“栏宽”。");
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
      show(route ? "最近的本地入口是：" : "没有完全匹配；建议先返回", route || routes[4]);
    });
  }
})();
