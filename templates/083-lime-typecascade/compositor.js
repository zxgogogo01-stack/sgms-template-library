(() => {
  "use strict";

  const root = document.documentElement;
  const storageKey = "tc83-proof";
  const themeButton = document.querySelector("[data-tc83-proof-toggle]");
  const menuButton = document.querySelector(".tc83-menu");
  const menu = document.querySelector("#tc83-nav");
  let stored = "";
  try { stored = localStorage.getItem(storageKey) || ""; } catch (_error) {}
  if (stored === "paper" || stored === "ink") root.dataset.tc83Proof = stored;
  if (themeButton) {
    themeButton.disabled = false;
    const sync = () => {
      const paper = root.dataset.tc83Proof === "paper";
      themeButton.setAttribute("aria-pressed", String(paper));
      themeButton.textContent = paper ? "切换黑墨" : "切换纸样";
    };
    sync();
    themeButton.addEventListener("click", () => {
      root.dataset.tc83Proof = root.dataset.tc83Proof === "paper" ? "ink" : "paper";
      try { localStorage.setItem(storageKey, root.dataset.tc83Proof); } catch (_error) {}
      sync();
    });
  }

  if (menuButton && menu) {
    document.body.dataset.tc83Menu = "closed";
    const close = (returnFocus = false) => {
      document.body.dataset.tc83Menu = "closed";
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.querySelector("span").textContent = "展开版面目录";
      if (returnFocus) menuButton.focus();
    };
    menuButton.addEventListener("click", () => {
      const open = document.body.dataset.tc83Menu !== "open";
      document.body.dataset.tc83Menu = open ? "open" : "closed";
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.querySelector("span").textContent = open ? "收起版面目录" : "展开版面目录";
      if (open) menu.querySelector("a")?.focus();
    });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && document.body.dataset.tc83Menu === "open") close(true); });
    matchMedia("(min-width: 761px)").addEventListener("change", (event) => { if (event.matches) close(false); });
  }

  const progress = document.querySelector("[data-tc83-progress]");
  const progressLabel = document.querySelector("[data-tc83-progress-label]");
  if (progress && progressLabel) {
    const update = () => {
      const distance = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const value = Math.max(0, Math.min(100, scrollY / distance * 100));
      progress.style.setProperty("--tc83-read", `${value}%`);
      progressLabel.value = `${Math.round(value)}%`;
      progressLabel.textContent = `${Math.round(value)}%`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update, { passive: true });
  }

  document.querySelectorAll("[data-tc83-copy]").forEach((button) => {
    button.disabled = false;
    let revision = 0;
    const status = button.parentElement?.querySelector("[data-tc83-copy-status]") || button.closest("aside")?.querySelector("[data-tc83-copy-status]");
    button.addEventListener("click", async () => {
      const current = ++revision;
      try {
        await navigator.clipboard.writeText(button.dataset.tc83Copy || "");
        if (current === revision && status) status.textContent = "已复制。";
      } catch (_error) {
        if (current === revision && status) status.textContent = "复制未完成，请手动选择文字。";
      }
    });
  });

  const filters = [...document.querySelectorAll("[data-tc83-filter]")];
  const filterStatus = document.querySelector("[data-tc83-filter-status]");
  if (filters.length) filters.forEach((button) => button.addEventListener("click", () => {
    const choice = button.dataset.tc83Filter;
    let visible = 0;
    filters.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    document.querySelectorAll("[data-tc83-group]").forEach((item) => {
      const show = choice === "all" || item.dataset.tc83Group === choice;
      item.hidden = !show;
      if (show) visible += 1;
    });
    if (filterStatus) filterStatus.textContent = `显示 ${visible} 张校样。`;
  }));

  const search = document.querySelector("[data-tc83-search]");
  if (search) {
    const input = search.querySelector("input");
    const result = search.querySelector("[data-tc83-search-result]");
    const routes = [
      { words: ["标题", "文章", "字样", "长文"], href: "proof-register.html", label: "十二张长条校样" },
      { words: ["工具", "校样", "计算", "检查"], href: "proof-room.html", label: "五台本地校样工具" },
      { words: ["声明", "边界", "公开", "关于"], href: "press-charter.html", label: "排演场章程" },
      { words: ["首页", "头版", "返回"], href: "index.html", label: "返回头版" }
    ];
    const clear = () => { while (result.firstChild) result.removeChild(result.firstChild); };
    search.addEventListener("submit", (event) => {
      event.preventDefault();
      clear();
      const raw = input.value;
      const count = Array.from(raw).length;
      if (!raw.trim()) { result.textContent = "请输入要查找的字样。"; input.focus(); return; }
      if (count > 80) { result.textContent = "查询不能超过 80 个 Unicode 字符。"; input.focus(); return; }
      const normalized = raw.normalize("NFKC").toLocaleLowerCase();
      const route = routes.find((candidate) => candidate.words.some((word) => normalized.includes(word)));
      result.append(document.createTextNode(route ? "最近的本地行号：" : "没有完全匹配；建议先"));
      const link = document.createElement("a");
      link.href = route ? route.href : "index.html";
      link.textContent = route ? route.label : "返回头版";
      result.append(link);
    });
    input.addEventListener("input", () => { clear(); });
  }
})();
