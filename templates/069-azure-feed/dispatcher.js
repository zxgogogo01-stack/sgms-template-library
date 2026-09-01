(() => {
  "use strict";
  const root = document.documentElement;
  const signalToggle = document.querySelector("[data-signal-toggle]");
  const themeKey = "azure-feed-069-signal";

  function setSignal(value) {
    const signal = value === "deep" ? "deep" : "light";
    root.dataset.signal = signal;
    if (signalToggle) {
      signalToggle.textContent = signal === "deep" ? "天青" : "深蓝";
      signalToggle.setAttribute("aria-label", signal === "deep" ? "切换到天青主题" : "切换到深蓝主题");
    }
  }
  try { setSignal(localStorage.getItem(themeKey) || "light"); } catch (error) { setSignal("light"); }
  signalToggle?.addEventListener("click", () => {
    const next = root.dataset.signal === "deep" ? "light" : "deep";
    setSignal(next);
    try { localStorage.setItem(themeKey, next); } catch (error) { /* 当前页仍生效。 */ }
  });

  const menuButton = document.querySelector(".af69-menu-button");
  const menu = document.querySelector(".af69-menu");
  function closeMenu(returnFocus = false) {
    if (!menuButton || !menu) return;
    menu.classList.remove("af69-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (returnFocus) menuButton.focus();
  }
  menuButton?.addEventListener("click", () => {
    const open = !menu.classList.contains("af69-open");
    menu.classList.toggle("af69-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    if (open) menu.querySelector("a,button")?.focus();
  });
  menu?.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.classList.contains("af69-open")) closeMenu(true);
  });
  addEventListener("resize", () => { if (innerWidth > 900) closeMenu(); });

  async function copyText(value) {
    if (navigator.clipboard && isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
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
      try {
        await copyText(source.textContent.trim());
        status.textContent = "已复制，请按真实资料补齐。";
      } catch (error) {
        status.textContent = "浏览器未允许复制，请手动选择文字。";
      }
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

  const form = document.querySelector("[data-card-form]");
  if (form) {
    const input = form.querySelector("#af69-cards");
    const error = form.querySelector("[data-card-error]");
    const status = form.querySelector("[data-card-status]");
    const report = document.querySelector(".af69-card-report");
    const state = report.querySelector("[data-card-state]");
    const cardCount = report.querySelector("[data-card-count]");
    const totalCount = report.querySelector("[data-total-count]");
    const duplicateCount = report.querySelector("[data-duplicate-count]");
    const overCount = report.querySelector("[data-over-count]");
    const list = report.querySelector("[data-card-list]");
    const note = report.querySelector("[data-card-note]");
    const copyButton = report.querySelector("[data-copy-card-report]");
    const copyStatus = report.querySelector("[data-card-copy-status]");
    let latest = "";
    const presets = {
      brief: "变化：新增来源字段。依据：编辑协议第二校。\n\n范围：只调整内容结构，不改变事实结论。\n\n未知项：旧页面是否需要同步，待下一轮复核。",
      duplicate: "来源页面已记录查看日期。\n\nＳＯＵＲＣＥ page has a review date.\n\nsource page has a review date.\n\n来源页面已记录查看日期。",
      mixed: `短讯：当前字段已经复核。\n\n${"这是一张用于检查建议长度的演示动态卡。".repeat(20)}\n\n边界：超长只提示拆分，不代表内容错误。`
    };

    function placeholder(text = "生成后显示前 20 张卡片预览。") {
      const item = document.createElement("li");
      item.textContent = text;
      list.replaceChildren(item);
    }
    function zero() {
      cardCount.textContent = "0";
      totalCount.textContent = "0";
      duplicateCount.textContent = "0";
      overCount.textContent = "0";
    }
    function fail(message) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = message;
      status.textContent = "未生成报告，请修正输入。";
      report.dataset.ready = "false";
      state.textContent = "CHECK";
      zero();
      placeholder("输入有误，修正后重新生成。");
      note.textContent = "长度只反映文本规模，不代表内容质量。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latest = "";
    }
    function markStale() {
      if (report.dataset.ready !== "true") return;
      report.dataset.ready = "false";
      state.textContent = "STALE";
      status.textContent = "动态草稿已变化，请重新生成。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latest = "";
    }
    input.addEventListener("input", markStale);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = input.value.replace(/\r\n?/g, "\n");
      const inputLength = Array.from(text).length;
      input.removeAttribute("aria-invalid");
      error.textContent = "";
      if (!text.trim()) {
        fail("请先输入至少一张动态卡片。");
        input.focus();
        return;
      }
      if (inputLength > 10000) {
        fail(`输入共 ${inputLength} 个字符，最多允许 10000 个。`);
        input.focus();
        return;
      }
      const blocks = text.trim().split(/\n\s*\n+/).map((value) => value.normalize("NFKC").replace(/\s+/g, " ").trim()).filter(Boolean);
      if (blocks.length > 60) {
        fail(`检测到 ${blocks.length} 张卡片，最多允许 60 张。`);
        input.focus();
        return;
      }
      const cards = [];
      const seen = new Map();
      for (let index = 0; index < blocks.length; index += 1) {
        const textValue = blocks[index];
        const length = Array.from(textValue).length;
        if (length > 1000) {
          fail(`第 ${index + 1} 张卡片超过 1000 个字符。`);
          input.focus();
          return;
        }
        const key = textValue.toLocaleLowerCase();
        const duplicateOf = seen.has(key) ? seen.get(key) : null;
        if (!seen.has(key)) seen.set(key, index + 1);
        cards.push({ text: textValue, length, duplicateOf, over: length > 280 });
      }
      const duplicateCards = cards.filter((card) => card.duplicateOf !== null);
      const overCards = cards.filter((card) => card.over);
      const total = cards.reduce((sum, card) => sum + card.length, 0);
      cardCount.textContent = String(cards.length);
      totalCount.textContent = String(total);
      duplicateCount.textContent = String(duplicateCards.length);
      overCount.textContent = String(overCards.length);
      list.replaceChildren();
      cards.slice(0, 20).forEach((card, index) => {
        const item = document.createElement("li");
        const number = document.createElement("b");
        const preview = document.createElement("span");
        const length = document.createElement("em");
        number.textContent = String(index + 1).padStart(2, "0");
        preview.textContent = card.text;
        length.textContent = `${card.length} 字符`;
        item.append(number, preview, length);
        const flags = [];
        if (card.duplicateOf !== null) flags.push(`与第 ${card.duplicateOf} 张重复`);
        if (card.over) flags.push("超过 280 字符建议线");
        if (flags.length) {
          const flag = document.createElement("small");
          flag.textContent = flags.join(" · ");
          item.append(flag);
        }
        list.append(item);
      });
      note.textContent = duplicateCards.length || overCards.length
        ? `需人工复查：${duplicateCards.length} 张重复，${overCards.length} 张超过 280 字符建议线。`
        : "没有重复或超出建议长度的卡片；仍需人工核对事实。";
      latest = [
        "动态卡分段报告",
        `卡片：${cards.length}`,
        `总字符：${total}`,
        `重复卡：${duplicateCards.length}`,
        `超过 280 字符：${overCards.length}`,
        ...cards.slice(0, 20).map((card, index) => `${String(index + 1).padStart(2, "0")} · ${card.length} 字符${card.duplicateOf !== null ? ` · 重复第 ${card.duplicateOf} 张` : ""}${card.over ? " · 建议拆分" : ""}`),
        "说明：长度与重复只描述文本结构，不判断内容质量。"
      ].join("\n");
      report.dataset.ready = "true";
      state.textContent = duplicateCards.length || overCards.length ? "REVIEW" : "READY";
      status.textContent = `生成完成：${cards.length} 张卡片，共 ${total} 个字符。`;
      copyButton.disabled = false;
      copyStatus.textContent = "";
    });

    form.querySelectorAll("[data-card-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        const hadReady = report.dataset.ready === "true";
        input.value = presets[button.dataset.cardPreset];
        input.removeAttribute("aria-invalid");
        error.textContent = "";
        if (hadReady) markStale();
        else {
          report.dataset.ready = "false";
          state.textContent = "LOADED";
          zero();
          placeholder();
          note.textContent = "长度只反映文本规模，不代表内容质量。";
          copyButton.disabled = true;
          copyStatus.textContent = "";
          latest = "";
        }
        status.textContent = "样例已装载，点击生成报告。";
        input.focus();
      });
    });
    copyButton.addEventListener("click", async () => {
      if (!latest) return;
      try { await copyText(latest); copyStatus.textContent = "报告已复制。"; }
      catch (error) { copyStatus.textContent = "浏览器未允许复制。"; }
    });
    form.addEventListener("reset", () => setTimeout(() => {
      input.removeAttribute("aria-invalid");
      error.textContent = "";
      status.textContent = "等待输入动态草稿。";
      report.dataset.ready = "false";
      state.textContent = "STANDBY";
      zero();
      placeholder();
      note.textContent = "长度只反映文本规模，不代表内容质量。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latest = "";
    }, 0));
  }

  const search = document.querySelector("[data-signal-search]");
  if (search) {
    const query = search.querySelector("input");
    const output = search.querySelector("[data-signal-result]");
    const routes = [
      { href: "article.html", label: "动态编辑协议", words: ["来源", "协议", "范围", "未知"] },
      { href: "tool.html", label: "动态卡分段器", words: ["分段", "卡片", "重复", "长度"] },
      { href: "legal.html", label: "公开台", words: ["披露", "边界", "利益", "更正"] },
      { href: "index.html", label: "快讯台", words: ["首页", "快讯", "动态", "频道"] }
    ];
    search.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = query.value.trim();
      if (!value) { output.textContent = "请输入一个频道词。"; query.focus(); return; }
      const normalized = value.normalize("NFKC").toLocaleLowerCase();
      const found = routes.find((route) => route.words.some((word) => normalized.includes(word)));
      const route = found || routes[3];
      const link = document.createElement("a");
      link.href = route.href;
      link.textContent = route.label;
      output.replaceChildren(document.createTextNode(found ? "最近的频道页：" : "未找到精确信号，建议先返回"), link, document.createTextNode("。"));
    });
    query.addEventListener("input", () => { output.textContent = "频道词已变化，提交后重新检索。"; });
  }
})();
