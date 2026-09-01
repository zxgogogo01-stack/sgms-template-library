(() => {
  "use strict";

  const root = document.documentElement;
  const inkToggle = document.querySelector("[data-ink-toggle]");
  const storageKey = "cinnabar-almanac-068-ink";

  function setInk(value) {
    const ink = value === "night" ? "night" : "day";
    root.dataset.ink = ink;
    if (inkToggle) {
      inkToggle.textContent = ink === "night" ? "日读" : "夜读";
      inkToggle.setAttribute("aria-label", ink === "night" ? "切换到日读主题" : "切换到夜读主题");
    }
  }

  try {
    setInk(localStorage.getItem(storageKey) || "day");
  } catch (error) {
    setInk("day");
  }

  inkToggle?.addEventListener("click", () => {
    const next = root.dataset.ink === "night" ? "day" : "night";
    setInk(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch (error) {
      // 主题仍在当前页面生效。
    }
  });

  const menuButton = document.querySelector(".ca68-menu-button");
  const menu = document.querySelector(".ca68-menu");

  function closeMenu(returnFocus = false) {
    if (!menuButton || !menu) return;
    menu.classList.remove("ca68-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (returnFocus) menuButton.focus();
  }

  menuButton?.addEventListener("click", () => {
    const open = !menu.classList.contains("ca68-open");
    menu.classList.toggle("ca68-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    if (open) menu.querySelector("a,button")?.focus();
  });
  menu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.classList.contains("ca68-open")) closeMenu(true);
  });
  window.addEventListener("resize", () => {
    if (innerWidth > 960) closeMenu();
  });

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
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - innerHeight;
      const value = available > 0 ? Math.min(100, Math.max(0, scrollY / available * 100)) : 100;
      progress.style.width = `${value}%`;
    };
    updateProgress();
    addEventListener("scroll", updateProgress, { passive: true });
    addEventListener("resize", updateProgress);
  }

  const entryForm = document.querySelector("[data-entry-form]");
  if (entryForm) {
    const input = entryForm.querySelector("#ca68-entries");
    const error = entryForm.querySelector("[data-entry-error]");
    const status = entryForm.querySelector("[data-entry-status]");
    const report = document.querySelector(".ca68-ruler-report");
    const state = report.querySelector("[data-entry-state]");
    const entryCount = report.querySelector("[data-entry-count]");
    const dateCount = report.querySelector("[data-date-count]");
    const sameCount = report.querySelector("[data-same-count]");
    const longestGap = report.querySelector("[data-longest-gap]");
    const list = report.querySelector("[data-gap-list]");
    const note = report.querySelector("[data-entry-note]");
    const copyButton = report.querySelector("[data-copy-entry-report]");
    const copyStatus = report.querySelector("[data-entry-copy-status]");
    let latest = "";

    const presets = {
      steady: "2026-01-03 | 栏目边界初校\n2026-01-10 | 来源字段补记\n2026-01-17 | 工具说明复核\n2026-01-24 | 公开边注复校",
      "same-day": "2026-02-08 | 方法页第二校\n2026-02-08 | 工具边界补记\n2026-02-11 | 首页入口复核\n2026-02-18 | 来源路径检查",
      gaps: "2025-11-02 | 旧卷封存\n2025-11-06 | 更正记录\n2026-01-12 | 新卷起笔\n2026-03-30 | 季度复校"
    };

    function placeholder(text = "校对后显示按日期排序的前 20 个相邻间隔。") {
      const item = document.createElement("li");
      item.textContent = text;
      list.replaceChildren(item);
    }

    function zero() {
      entryCount.textContent = "0";
      dateCount.textContent = "0";
      sameCount.textContent = "0";
      longestGap.textContent = "0 天";
    }

    function fail(message) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = message;
      status.textContent = "未生成报告，请修正输入。";
      report.dataset.ready = "false";
      state.textContent = "退校";
      zero();
      placeholder("输入有误，修正后重新校对。");
      note.textContent = "间隔仅供编辑复查，不代表内容应按固定频率发布。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latest = "";
    }

    function markStale() {
      if (report.dataset.ready !== "true") return;
      report.dataset.ready = "false";
      state.textContent = "待复校";
      status.textContent = "日期条目已变化，请重新校对。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latest = "";
    }

    function parseDate(value) {
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
      if (!match) return null;
      const year = Number(match[1]);
      const month = Number(match[2]);
      const day = Number(match[3]);
      if (year < 2000 || year > 2099) return null;
      const time = Date.UTC(year, month - 1, day);
      const date = new Date(time);
      if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
      return time;
    }

    input.addEventListener("input", markStale);

    entryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = input.value.replace(/\r\n?/g, "\n");
      const length = Array.from(text).length;
      input.removeAttribute("aria-invalid");
      error.textContent = "";

      if (!text.trim()) {
        fail("请先输入至少一条日期记录。");
        input.focus();
        return;
      }
      if (length > 10000) {
        fail(`输入共 ${length} 个字符，最多允许 10000 个。`);
        input.focus();
        return;
      }

      const rows = text.split("\n").map((value, index) => ({ value: value.trim(), line: index + 1 })).filter((row) => row.value);
      if (rows.length > 120) {
        fail(`检测到 ${rows.length} 条记录，最多允许 120 条。`);
        input.focus();
        return;
      }

      const entries = [];
      for (const row of rows) {
        const parts = row.value.normalize("NFKC").split("|");
        if (parts.length !== 2) {
          fail(`第 ${row.line} 行必须且只能包含一个“|”分隔符。`);
          input.focus();
          return;
        }
        const date = parts[0].trim();
        const title = parts[1].trim();
        const time = parseDate(date);
        if (time === null) {
          fail(`第 ${row.line} 行不是 2000–2099 范围内的真实 YYYY-MM-DD 日期。`);
          input.focus();
          return;
        }
        if (!title) {
          fail(`第 ${row.line} 行缺少题名。`);
          input.focus();
          return;
        }
        if (Array.from(title).length > 80) {
          fail(`第 ${row.line} 行题名超过 80 个字符。`);
          input.focus();
          return;
        }
        entries.push({ date, time, title, order: row.line });
      }

      entries.sort((a, b) => a.time - b.time || a.order - b.order);
      const dates = new Map();
      for (const entry of entries) {
        if (!dates.has(entry.date)) dates.set(entry.date, []);
        dates.get(entry.date).push(entry.title);
      }
      const uniqueDates = [...dates.keys()];
      const sameDates = [...dates.entries()].filter((item) => item[1].length > 1);
      const gaps = [];
      for (let index = 1; index < uniqueDates.length; index += 1) {
        const from = uniqueDates[index - 1];
        const to = uniqueDates[index];
        const days = Math.round((parseDate(to) - parseDate(from)) / 86400000);
        gaps.push({ from, to, days });
      }
      const longest = gaps.reduce((max, gap) => Math.max(max, gap.days), 0);

      entryCount.textContent = String(entries.length);
      dateCount.textContent = String(uniqueDates.length);
      sameCount.textContent = String(sameDates.length);
      longestGap.textContent = `${longest} 天`;
      list.replaceChildren();

      if (!gaps.length) {
        placeholder("只有一个唯一日期，暂时没有相邻间隔。");
      } else {
        gaps.slice(0, 20).forEach((gap, index) => {
          const item = document.createElement("li");
          const number = document.createElement("b");
          const range = document.createElement("span");
          const days = document.createElement("em");
          number.textContent = String(index + 1).padStart(2, "0");
          range.textContent = `${gap.from} → ${gap.to}`;
          days.textContent = `${gap.days} 天`;
          item.append(number, range, days);
          list.append(item);
        });
      }

      note.textContent = sameDates.length
        ? `同日多条：${sameDates.slice(0, 5).map((item) => `${item[0]}（${item[1].length} 条）`).join("、")}${sameDates.length > 5 ? "等" : ""}`
        : "没有同日多条记录；仍需人工判断间隔含义。";
      latest = [
        "日期条目间隔报告",
        `条目：${entries.length}`,
        `唯一日期：${uniqueDates.length}`,
        `同日多条日期：${sameDates.length}`,
        `最长间隔：${longest} 天`,
        ...gaps.slice(0, 20).map((gap) => `${gap.from} → ${gap.to}：${gap.days} 天`),
        "说明：间隔只描述输入时间线，不判断更新必要性。"
      ].join("\n");
      report.dataset.ready = "true";
      state.textContent = "已校";
      status.textContent = `校对完成：${entries.length} 条记录覆盖 ${uniqueDates.length} 个日期。`;
      copyButton.disabled = false;
      copyStatus.textContent = "";
    });

    entryForm.querySelectorAll("[data-entry-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        const hadReadyReport = report.dataset.ready === "true";
        input.value = presets[button.dataset.entryPreset];
        input.removeAttribute("aria-invalid");
        error.textContent = "";
        if (hadReadyReport) {
          markStale();
        } else {
          report.dataset.ready = "false";
          state.textContent = "待校";
          zero();
          placeholder();
          note.textContent = "间隔仅供编辑复查，不代表内容应按固定频率发布。";
          copyButton.disabled = true;
          copyStatus.textContent = "";
          latest = "";
        }
        status.textContent = "样例已装载，点击校对生成报告。";
        input.focus();
      });
    });

    copyButton.addEventListener("click", async () => {
      if (!latest) return;
      try {
        await copyText(latest);
        copyStatus.textContent = "报告已复制。";
      } catch (error) {
        copyStatus.textContent = "浏览器未允许复制。";
      }
    });

    entryForm.addEventListener("reset", () => setTimeout(() => {
      input.removeAttribute("aria-invalid");
      error.textContent = "";
      status.textContent = "等待输入日期条目。";
      report.dataset.ready = "false";
      state.textContent = "待笔";
      zero();
      placeholder();
      note.textContent = "间隔仅供编辑复查，不代表内容应按固定频率发布。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latest = "";
    }, 0));
  }

  const search = document.querySelector("[data-index-search]");
  if (search) {
    const query = search.querySelector("input");
    const output = search.querySelector("[data-index-result]");
    const routes = [
      { href: "article.html", label: "校历方法", words: ["日期", "方法", "复核", "同日"] },
      { href: "tool.html", label: "条目间隔校对尺", words: ["间隔", "工具", "空档", "条目"] },
      { href: "legal.html", label: "公开边注", words: ["披露", "边界", "利益", "更正"] },
      { href: "index.html", label: "今卷首页", words: ["首页", "今卷", "总览", "登记"] }
    ];

    search.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = query.value.trim();
      if (!value) {
        output.textContent = "请输入一个卷内词。";
        query.focus();
        return;
      }
      const normalized = value.normalize("NFKC").toLocaleLowerCase();
      const found = routes.find((route) => route.words.some((word) => normalized.includes(word)));
      const route = found || routes[3];
      const link = document.createElement("a");
      link.href = route.href;
      link.textContent = route.label;
      output.replaceChildren(
        document.createTextNode(found ? "最近的卷内页：" : "未找到精确条目，建议先返回"),
        link,
        document.createTextNode("。")
      );
    });

    query.addEventListener("input", () => {
      output.textContent = "卷内词已变化，提交后重新检索。";
    });
  }
})();
