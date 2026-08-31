(() => {
  "use strict";

  const root = document.documentElement;
  const paletteKey = "straw-fanfold-062-palette";
  const paletteButtons = [...document.querySelectorAll("[data-palette-toggle]")];
  const setPalette = (value) => {
    const palette = value === "ink" ? "ink" : "straw";
    root.dataset.theme = palette;
    paletteButtons.forEach((button) => {
      button.textContent = palette === "straw" ? "夜读" : "日读";
      button.setAttribute("aria-label", palette === "straw" ? "切换到夜读主题" : "切换到日读主题");
    });
  };
  let storedPalette = "straw";
  try { storedPalette = localStorage.getItem(paletteKey) || "straw"; } catch (_) { storedPalette = "straw"; }
  setPalette(storedPalette);
  paletteButtons.forEach((button) => button.addEventListener("click", () => {
    const next = root.dataset.theme === "straw" ? "ink" : "straw";
    setPalette(next);
    try { localStorage.setItem(paletteKey, next); } catch (_) { /* The active page still keeps the chosen palette. */ }
  }));

  const menuButton = document.querySelector(".sf62-menu-button");
  const menu = document.querySelector(".sf62-menu");
  const closeMenu = (restore = false) => {
    if (!menuButton || !menu) return;
    menu.classList.remove("sf62-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (restore) menuButton.focus();
  };
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const open = !menu.classList.contains("sf62-open");
      menu.classList.toggle("sf62-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      if (open) {
        const firstLink = menu.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("sf62-open")) closeMenu(true);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu(false);
    });
  }

  const copyText = async (text) => {
    if (!text) return false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) { /* Use a local selection fallback. */ }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    let copied = false;
    try { copied = document.execCommand("copy"); } catch (_) { copied = false; }
    area.remove();
    return copied;
  };
  const bindCopy = (buttonSelector, sourceSelector, statusSelector, success) => {
    const button = document.querySelector(buttonSelector);
    const source = document.querySelector(sourceSelector);
    const status = document.querySelector(statusSelector);
    if (!button || !source || !status) return;
    button.addEventListener("click", async () => {
      const ok = await copyText(source.textContent.trim());
      status.textContent = ok ? success : "复制失败，请手动选择文字。";
    });
  };
  bindCopy("[data-copy-handoff]", "[data-handoff-text]", "[data-handoff-status]", "交接单已复制。");
  bindCopy("[data-copy-disclosure]", "[data-disclosure-text]", "[data-disclosure-status]", "简短披露已复制。");

  const progress = document.querySelector("[data-reading-progress]");
  if (progress) {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const percent = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100;
      progress.style.width = `${percent}%`;
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const anchorForm = document.querySelector("[data-anchor-form]");
  if (anchorForm) {
    const headings = anchorForm.elements.headings;
    const separator = anchorForm.elements.separator;
    const prefix = anchorForm.elements.prefix;
    const error = document.querySelector("[data-heading-error]");
    const status = document.querySelector("[data-anchor-status]");
    const output = document.querySelector(".sf62-anchor-output");
    const state = document.querySelector("[data-anchor-state]");
    const count = document.querySelector("[data-anchor-count]");
    const renamed = document.querySelector("[data-anchor-renamed]");
    const longest = document.querySelector("[data-anchor-longest]");
    const list = document.querySelector("[data-anchor-list]");
    const note = document.querySelector("[data-anchor-note]");
    const copyButton = document.querySelector("[data-copy-anchors]");
    const copyStatus = document.querySelector("[data-anchor-copy-status]");
    let ready = false;
    let copyPayload = "";

    const unicodeLength = (value) => Array.from(value).length;
    const takeUnicode = (value, max) => Array.from(value).slice(0, max).join("");
    const normalizedLines = () => headings.value
      .normalize("NFKC")
      .replace(/\r\n?/g, "\n")
      .split("\n")
      .map((line) => line.trim().replace(/\s+/gu, " "))
      .filter(Boolean);
    const slugBase = (title, joiner) => {
      let value = title.normalize("NFKD").replace(/\p{M}+/gu, "").toLocaleLowerCase();
      value = value.replace(/[^\p{L}\p{N}]+/gu, joiner);
      const escaped = joiner === "-" ? /-+/g : /_+/g;
      value = value.replace(escaped, joiner);
      while (value.startsWith(joiner)) value = value.slice(joiner.length);
      while (value.endsWith(joiner)) value = value.slice(0, -joiner.length);
      value = takeUnicode(value, 48);
      while (value.endsWith(joiner)) value = value.slice(0, -joiner.length);
      if (!value) value = "section";
      if (prefix.checked && /^\p{N}/u.test(value)) value = `s${joiner}${value}`;
      return value;
    };
    const clearOutput = (message = "锚点会按输入顺序排列。") => {
      ready = false;
      copyPayload = "";
      output.removeAttribute("data-ready");
      state.textContent = "待编排";
      count.textContent = "0";
      renamed.textContent = "0";
      longest.textContent = "0";
      note.textContent = message;
      copyButton.disabled = true;
      copyStatus.textContent = "";
      const item = document.createElement("li");
      const number = document.createElement("span");
      const body = document.createElement("div");
      const title = document.createElement("b");
      const code = document.createElement("code");
      number.textContent = "01";
      title.textContent = "生成后显示标题";
      code.textContent = "#section";
      body.append(title, code);
      item.append(number, body);
      list.replaceChildren(item);
    };
    const markStale = () => {
      if (!ready) return;
      clearOutput("设置已改变，请重新展开锚点清单。");
      state.textContent = "已失效";
      status.textContent = "输入或样式已改变，旧清单已失效。";
    };
    headings.addEventListener("input", markStale);
    separator.addEventListener("change", markStale);
    prefix.addEventListener("change", markStale);

    const presets = {
      chinese: "规则入口\n适用范围\n证据记录\n编辑交接",
      mixed: "API Reference\n账户 Scope 2026\nFAQ / 常见问题\n第 3 章：复核",
      duplicate: "规则说明\n规则说明\nRules & Notes\nRules Notes"
    };
    anchorForm.querySelectorAll("[data-anchor-preset]").forEach((button) => button.addEventListener("click", () => {
      const value = presets[button.dataset.anchorPreset];
      if (!value) return;
      headings.value = value;
      headings.removeAttribute("aria-invalid");
      error.textContent = "";
      markStale();
      status.textContent = "示例已装载，点击展开锚点清单。";
    }));

    anchorForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const rawLength = unicodeLength(headings.value);
      const lines = normalizedLines();
      let message = "";
      if (!headings.value.trim() || lines.length === 0) message = "请输入至少一个非空章节标题。";
      else if (rawLength > 5000) message = "总输入最多 5000 个 Unicode 字符。";
      else if (lines.length > 50) message = "非空章节标题最多 50 行。";
      else {
        const longIndex = lines.findIndex((line) => unicodeLength(line) > 120);
        if (longIndex >= 0) message = `第 ${longIndex + 1} 个非空标题超过 120 个字符。`;
      }
      error.textContent = message;
      if (message) {
        headings.setAttribute("aria-invalid", "true");
        clearOutput("修正标题后再展开清单。");
        state.textContent = "检查输入";
        status.textContent = "章节标题未通过检查。";
        headings.focus();
        return;
      }
      headings.removeAttribute("aria-invalid");
      const joiner = separator.value === "underscore" ? "_" : "-";
      const used = new Set();
      const baseCounts = new Map();
      let renamedCount = 0;
      const entries = lines.map((title) => {
        const base = slugBase(title, joiner);
        let occurrence = (baseCounts.get(base) || 0) + 1;
        baseCounts.set(base, occurrence);
        let slug = occurrence === 1 ? base : `${base}${joiner}${occurrence}`;
        while (used.has(slug)) {
          occurrence += 1;
          baseCounts.set(base, occurrence);
          slug = `${base}${joiner}${occurrence}`;
        }
        used.add(slug);
        if (slug !== base) renamedCount += 1;
        return { title, slug };
      });
      const fragment = document.createDocumentFragment();
      entries.forEach((entry, index) => {
        const item = document.createElement("li");
        const number = document.createElement("span");
        const body = document.createElement("div");
        const title = document.createElement("b");
        const code = document.createElement("code");
        number.textContent = String(index + 1).padStart(2, "0");
        title.textContent = entry.title;
        code.textContent = `#${entry.slug}`;
        body.append(title, code);
        item.append(number, body);
        fragment.append(item);
      });
      list.replaceChildren(fragment);
      count.textContent = String(entries.length);
      renamed.textContent = String(renamedCount);
      longest.textContent = String(Math.max(...entries.map((entry) => unicodeLength(entry.slug))));
      state.textContent = "清单就绪";
      note.textContent = `${entries.length} 个唯一锚点 · ${joiner === "-" ? "连字符" : "下划线"}样式`;
      copyPayload = entries.map((entry) => `[${entry.title}](#${entry.slug})`).join("\n");
      copyButton.disabled = false;
      copyStatus.textContent = "";
      output.dataset.ready = "true";
      ready = true;
      status.textContent = `已生成 ${entries.length} 个唯一锚点。`;
    });

    anchorForm.addEventListener("reset", () => {
      window.setTimeout(() => {
        headings.removeAttribute("aria-invalid");
        error.textContent = "";
        clearOutput();
        status.textContent = "标题与样式已清空。";
        headings.focus();
      }, 0);
    });
    copyButton.addEventListener("click", async () => {
      const ok = await copyText(copyPayload);
      copyStatus.textContent = ok ? "目录草稿已复制。" : "复制失败，请手动选择清单。";
    });
  }

  const searchForm = document.querySelector("[data-folio-search]");
  if (searchForm) {
    const input = searchForm.querySelector("input");
    const result = document.querySelector("[data-folio-result]");
    const routes = [
      { words: ["来源", "入口", "边界", "证据", "文章", "方法"], title: "编纂札记", href: "article.html" },
      { words: ["锚点", "目录", "标题", "id", "工具"], title: "章节锚点工坊", href: "tool.html" },
      { words: ["披露", "更正", "利益", "公约", "联系"], title: "编辑公约", href: "legal.html" },
      { words: ["首页", "展册", "折扇"], title: "展册首页", href: "index.html" }
    ];
    let searched = false;
    input.addEventListener("input", () => {
      if (!searched) return;
      searched = false;
      result.textContent = "查找词已改变，请重新查找页签。";
    });
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.normalize("NFKC").trim().slice(0, 80);
      result.replaceChildren();
      searched = true;
      if (!query) {
        result.textContent = "请输入一个编辑词，例如“来源”或“锚点”。";
        input.focus();
        return;
      }
      const route = routes.find((entry) => entry.words.some((word) => query.toLocaleLowerCase().includes(word)));
      if (!route) {
        result.append(document.createTextNode(`没有找到与“${query}”直接对应的页签。`));
        const link = document.createElement("a");
        link.href = "index.html";
        link.textContent = "返回展册";
        result.append(link);
        return;
      }
      result.append(document.createTextNode("最近页签："));
      const link = document.createElement("a");
      link.href = route.href;
      link.textContent = route.title;
      result.append(link);
    });
  }
})();
