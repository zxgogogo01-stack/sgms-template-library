(() => {
  "use strict";
  const root = document.documentElement;
  const paletteToggle = document.querySelector("[data-palette-toggle]");
  const paletteKey = "berry-masonry-073-palette";

  function setPalette(value) {
    const palette = value === "ink" ? "ink" : "cream";
    root.dataset.palette = palette;
    if (paletteToggle) {
      paletteToggle.textContent = palette === "ink" ? "奶油" : "墨莓";
      paletteToggle.setAttribute("aria-label", palette === "ink" ? "切换到奶油主题" : "切换到墨莓主题");
    }
  }
  try { setPalette(localStorage.getItem(paletteKey) || "cream"); } catch (error) { setPalette("cream"); }
  paletteToggle?.addEventListener("click", () => {
    const next = root.dataset.palette === "ink" ? "cream" : "ink";
    setPalette(next);
    try { localStorage.setItem(paletteKey, next); } catch (error) { /* Theme still works without storage. */ }
  });

  const menuButton = document.querySelector(".bm73-menu-button");
  const menu = document.querySelector("#bm73-menu");
  function closeMenu(returnFocus = false) {
    if (!menuButton || !menu) return;
    menu.classList.remove("bm73-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (returnFocus) menuButton.focus();
  }
  menuButton?.addEventListener("click", () => {
    const open = !menu.classList.contains("bm73-open");
    menu.classList.toggle("bm73-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    if (open) menu.querySelector("a,button")?.focus();
  });
  menu?.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && menu?.classList.contains("bm73-open")) closeMenu(true); });
  addEventListener("resize", () => { if (innerWidth > 960) closeMenu(); });

  async function copyText(value) {
    if (navigator.clipboard && isSecureContext) { await navigator.clipboard.writeText(value); return; }
    const area = document.createElement("textarea");
    area.value = value;
    area.readOnly = true;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    if (!copied) throw new Error("copy unavailable");
  }
  function bindCopy(buttonSelector, sourceSelector, statusSelector) {
    const button = document.querySelector(buttonSelector);
    const source = document.querySelector(sourceSelector);
    const status = document.querySelector(statusSelector);
    button?.addEventListener("click", async () => {
      try { await copyText(source.textContent.trim()); status.textContent = "已复制，请按真实内容补齐。"; }
      catch (error) { status.textContent = "浏览器未允许复制，请手动选择文字。"; }
    });
  }
  bindCopy("[data-copy-handoff]", "[data-handoff-text]", "[data-handoff-status]");
  bindCopy("[data-copy-disclosure]", "[data-disclosure-text]", "[data-disclosure-status]");

  const progress = document.querySelector("[data-reading-progress]");
  if (progress) {
    const update = () => {
      const available = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = `${available > 0 ? Math.min(100, Math.max(0, scrollY / available * 100)) : 100}%`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
  }

  const balanceForm = document.querySelector("[data-balance-form]");
  if (balanceForm) {
    const input = balanceForm.querySelector("#bm73-cards");
    const columnsField = balanceForm.querySelector("#bm73-columns");
    const error = balanceForm.querySelector("[data-balance-error]");
    const status = balanceForm.querySelector("[data-balance-status]");
    const report = document.querySelector(".bm73-balance-report");
    const state = report.querySelector("[data-balance-state]");
    const cardCount = report.querySelector("[data-card-count]");
    const columnCount = report.querySelector("[data-column-count]");
    const tallestHeight = report.querySelector("[data-tallest-height]");
    const heightSpread = report.querySelector("[data-height-spread]");
    const list = report.querySelector("[data-balance-list]");
    const note = report.querySelector("[data-balance-note]");
    const copyButton = report.querySelector("[data-copy-balance-report]");
    const copyStatus = report.querySelector("[data-balance-copy-status]");
    let latest = "";
    const presets = {
      even: "阅读顺序 | 240\n来源边界 | 240\n移动复核 | 240\n编辑交接 | 240\n公开展签 | 240\n更正入口 | 240",
      editorial: "头条观察 | 420\n短讯入口 | 180\n来源方法 | 300\n编辑札记 | 230\n长篇背景 | 520\n公开边界 | 260\n移动检查 | 210",
      skewed: "长篇专论 | 980\n简短提醒 | 100\n快速入口 | 100\n状态标签 | 100\n来源链接 | 100"
    };

    function placeholder(value = "模拟后显示前 20 张卡的列号与累计高度。") {
      const item = document.createElement("li");
      item.textContent = value;
      list.replaceChildren(item);
    }
    function zero() {
      cardCount.textContent = "0";
      columnCount.textContent = "0";
      tallestHeight.textContent = "0";
      heightSpread.textContent = "0";
    }
    function fail(message) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = message;
      status.textContent = "未生成落点，请修正输入。";
      report.dataset.ready = "false";
      state.textContent = "CHECK";
      zero();
      placeholder("输入有误，修正后重新模拟。");
      note.textContent = "高度是编辑预估，不是真实渲染像素。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latest = "";
    }
    function stale() {
      if (report.dataset.ready !== "true") return;
      report.dataset.ready = "false";
      state.textContent = "STALE";
      status.textContent = "卡片或列数已变化，请重新模拟。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latest = "";
    }
    input.addEventListener("input", stale);
    columnsField.addEventListener("change", stale);

    balanceForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = input.value.replace(/\r\n?/g, "\n");
      const inputLength = Array.from(text).length;
      input.removeAttribute("aria-invalid");
      error.textContent = "";
      if (!text.trim()) { fail("请先输入至少一张卡片。"); input.focus(); return; }
      if (inputLength > 8000) { fail(`输入共 ${inputLength} 个字符，最多允许 8000 个。`); input.focus(); return; }
      const lines = text.split("\n").map((value, index) => ({ value: value.trim(), line: index + 1 })).filter((line) => line.value);
      if (lines.length > 60) { fail(`检测到 ${lines.length} 张卡片，最多允许 60 张。`); input.focus(); return; }
      const cards = [];
      const titleKeys = new Map();
      for (const line of lines) {
        const parts = line.value.normalize("NFKC").split("|");
        if (parts.length !== 2) { fail(`第 ${line.line} 行必须且只能包含一个竖线分隔符。`); input.focus(); return; }
        const title = parts[0].replace(/\s+/g, " ").trim();
        const heightText = parts[1].trim();
        if (!title) { fail(`第 ${line.line} 行缺少卡片标题。`); input.focus(); return; }
        if (Array.from(title).length > 80) { fail(`第 ${line.line} 行标题超过 80 个字符。`); input.focus(); return; }
        const titleKey = title.toLocaleLowerCase();
        if (titleKeys.has(titleKey)) { fail(`第 ${line.line} 行标题与第 ${titleKeys.get(titleKey)} 行重复。`); input.focus(); return; }
        if (!/^(?:0|[1-9]\d*)$/.test(heightText)) { fail(`第 ${line.line} 行高度必须是普通十进制整数。`); input.focus(); return; }
        const height = Number(heightText);
        if (height < 80 || height > 1200) { fail(`第 ${line.line} 行高度必须在 80–1200 之间。`); input.focus(); return; }
        titleKeys.set(titleKey, line.line);
        cards.push({ title, height });
      }
      const columns = Number(columnsField.value);
      if (![2, 3, 4, 5].includes(columns)) { fail("列数必须是 2–5。"); columnsField.focus(); return; }
      const heights = Array(columns).fill(0);
      const placements = [];
      for (const card of cards) {
        let target = 0;
        for (let index = 1; index < columns; index += 1) if (heights[index] < heights[target]) target = index;
        const start = heights[target] === 0 ? 0 : heights[target] + 24;
        heights[target] = start + card.height;
        placements.push({ ...card, column: target + 1, cumulative: heights[target] });
      }
      const tallest = Math.max(...heights);
      const shortest = Math.min(...heights);
      const spread = tallest - shortest;
      cardCount.textContent = String(cards.length);
      columnCount.textContent = String(columns);
      tallestHeight.textContent = String(tallest);
      heightSpread.textContent = String(spread);
      list.replaceChildren();
      placements.slice(0, 20).forEach((placement) => {
        const item = document.createElement("li");
        const column = document.createElement("b");
        const body = document.createElement("span");
        const title = document.createTextNode(placement.title);
        const detail = document.createElement("small");
        const total = document.createElement("em");
        column.textContent = `C${placement.column}`;
        detail.textContent = `预估高度 ${placement.height}`;
        total.textContent = `Σ ${placement.cumulative}`;
        body.append(title, detail);
        item.append(column, body, total);
        list.append(item);
      });
      note.textContent = `模拟完成：${columns} 列最终高度为 ${heights.join(" / ")}，列高差 ${spread}。`;
      latest = ["卡片墙落点报告", `卡片：${cards.length}`, `列数：${columns}`, `最终列高：${heights.join(" / ")}`, `列高差：${spread}`, ...placements.slice(0, 20).map((item, index) => `${String(index + 1).padStart(2, "0")} · C${item.column} · ${item.title} · ${item.height} · 累计 ${item.cumulative}`), "说明：高度为编辑预估，不是真实渲染像素。"].join("\n");
      report.dataset.ready = "true";
      state.textContent = spread <= Math.max(80, tallest * .2) ? "BALANCED" : "REVIEW";
      status.textContent = `模拟完成：${cards.length} 张卡片分入 ${columns} 列。`;
      copyButton.disabled = false;
      copyStatus.textContent = "";
    });

    balanceForm.querySelectorAll("[data-balance-preset]").forEach((button) => button.addEventListener("click", () => {
      const hadReady = report.dataset.ready === "true";
      input.value = presets[button.dataset.balancePreset];
      input.removeAttribute("aria-invalid");
      error.textContent = "";
      if (hadReady) stale(); else { report.dataset.ready = "false"; state.textContent = "LOADED"; zero(); placeholder(); note.textContent = "高度是编辑预估，不是真实渲染像素。"; copyButton.disabled = true; copyStatus.textContent = ""; latest = ""; }
      status.textContent = "样例已装载，点击模拟生成落点。";
      input.focus();
    }));
    copyButton.addEventListener("click", async () => {
      if (!latest) return;
      try { await copyText(latest); copyStatus.textContent = "落点报告已复制。"; }
      catch (error) { copyStatus.textContent = "浏览器未允许复制。"; }
    });
    balanceForm.addEventListener("reset", () => setTimeout(() => {
      input.removeAttribute("aria-invalid"); error.textContent = ""; status.textContent = "等待输入卡片清单。"; report.dataset.ready = "false"; state.textContent = "STANDBY"; zero(); placeholder(); note.textContent = "高度是编辑预估，不是真实渲染像素。"; copyButton.disabled = true; copyStatus.textContent = ""; latest = "";
    }, 0));
  }

  const search = document.querySelector("[data-wall-search]");
  if (search) {
    const query = search.querySelector("input");
    const output = search.querySelector("[data-wall-result]");
    const routes = [
      { href: "article.html", label: "错落墙阅读方法", words: ["阅读", "顺序", "高度", "证据"] },
      { href: "tool.html", label: "卡片墙分栏平衡器", words: ["分栏", "卡片", "平衡", "列高"] },
      { href: "legal.html", label: "公开展签与内容边界", words: ["披露", "展签", "边界", "更正"] },
      { href: "index.html", label: "策展瀑布墙", words: ["首页", "瀑布", "展墙", "策展"] }
    ];
    search.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = query.value.trim();
      if (!value) { output.textContent = "请输入一个展签词。"; query.focus(); return; }
      const normalized = value.normalize("NFKC").toLocaleLowerCase();
      const found = routes.find((route) => route.words.some((word) => normalized.includes(word)));
      const route = found || routes[3];
      const link = document.createElement("a");
      link.href = route.href;
      link.textContent = route.label;
      output.replaceChildren(document.createTextNode(found ? "最近的展墙页：" : "未找到精确卡片，建议先返回"), link, document.createTextNode("。"));
    });
    query.addEventListener("input", () => { output.textContent = "展签词已变化，提交后重新检索。"; });
  }
})();
