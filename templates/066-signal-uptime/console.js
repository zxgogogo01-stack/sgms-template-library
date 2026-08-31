(() => {
  "use strict";

  const root = document.documentElement;
  const signalButton = document.querySelector("[data-signal-toggle]");
  const signalKey = "signal-uptime-066-theme";
  const setSignal = (theme) => {
    const next = theme === "light" ? "light" : "dark";
    root.dataset.signal = next;
    if (signalButton) {
      signalButton.textContent = next === "light" ? "暗台" : "亮台";
      signalButton.setAttribute("aria-label", next === "light" ? "切换到暗台主题" : "切换到亮台主题");
    }
  };
  try {
    setSignal(localStorage.getItem(signalKey) || "dark");
  } catch (_error) {
    setSignal("dark");
  }
  signalButton?.addEventListener("click", () => {
    const next = root.dataset.signal === "light" ? "dark" : "light";
    setSignal(next);
    try {
      localStorage.setItem(signalKey, next);
    } catch (_error) {
      // The theme works even when storage is unavailable.
    }
  });

  const menuButton = document.querySelector(".sl66-menu-button");
  const menu = document.querySelector(".sl66-menu");
  const closeMenu = (restoreFocus = false) => {
    if (!menu || !menuButton) return;
    menu.classList.remove("sl66-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) menuButton.focus();
  };
  menuButton?.addEventListener("click", () => {
    if (!menu) return;
    const opening = !menu.classList.contains("sl66-open");
    menu.classList.toggle("sl66-open", opening);
    menuButton.setAttribute("aria-expanded", String(opening));
    if (opening) menu.querySelector("a, button")?.focus();
  });
  menu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.classList.contains("sl66-open")) closeMenu(true);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 940) closeMenu();
  });

  const copyText = async (value) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const helper = document.createElement("textarea");
    helper.value = value;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.append(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    if (!copied) throw new Error("copy unavailable");
  };
  const bindCopy = (buttonSelector, sourceSelector, statusSelector) => {
    const button = document.querySelector(buttonSelector);
    const source = document.querySelector(sourceSelector);
    const status = document.querySelector(statusSelector);
    button?.addEventListener("click", async () => {
      if (!source || !status) return;
      try {
        await copyText(source.textContent.trim());
        status.textContent = "已复制，请按真实事件补齐后再使用。";
      } catch (_error) {
        status.textContent = "浏览器未允许复制，请手动选择上方文字。";
      }
    });
  };
  bindCopy("[data-copy-handoff]", "[data-handoff-text]", "[data-handoff-status]");
  bindCopy("[data-copy-disclosure]", "[data-disclosure-text]", "[data-disclosure-status]");

  const readingProgress = document.querySelector("[data-reading-progress]");
  if (readingProgress) {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100;
      readingProgress.style.width = `${percentage}%`;
    };
    updateProgress();
    document.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const windowForm = document.querySelector("[data-window-form]");
  if (windowForm) {
    const input = windowForm.querySelector("#sl66-windows");
    const error = windowForm.querySelector("[data-window-error]");
    const status = windowForm.querySelector("[data-window-status]");
    const report = document.querySelector(".sl66-window-report");
    const reportState = report.querySelector("[data-window-state]");
    const inputCount = report.querySelector("[data-input-window-count]");
    const mergedCount = report.querySelector("[data-merged-window-count]");
    const absorbedCount = report.querySelector("[data-absorbed-window-count]");
    const uniqueDuration = report.querySelector("[data-unique-duration]");
    const overlapDuration = report.querySelector("[data-overlap-duration]");
    const list = report.querySelector("[data-window-list]");
    const note = report.querySelector("[data-window-note]");
    const copyButton = report.querySelector("[data-copy-window-report]");
    const copyStatus = report.querySelector("[data-window-copy-status]");
    const presets = {
      separate: "2026-01-22 09:00 | 2026-01-22 10:00\n2026-01-22 11:00 | 2026-01-22 12:00",
      overlap: "2026-01-22 09:00 | 2026-01-22 10:30\n2026-01-22 10:00 | 2026-01-22 11:00\n2026-01-22 10:45 | 2026-01-22 12:00",
      touching: "2026-01-22 09:00 | 2026-01-22 10:00\n2026-01-22 10:00 | 2026-01-22 11:00"
    };
    let latestReport = "";

    const durationLabel = (minutes) => {
      const days = Math.floor(minutes / 1440);
      const hours = Math.floor(minutes % 1440 / 60);
      const rest = minutes % 60;
      const parts = [];
      if (days) parts.push(`${days} 天`);
      if (hours) parts.push(`${hours} 小时`);
      if (rest || parts.length === 0) parts.push(`${rest} 分钟`);
      return parts.join(" ");
    };
    const formatMinute = (minute) => {
      const iso = new Date(minute * 60000).toISOString();
      return `${iso.slice(0, 10)} ${iso.slice(11, 16)}`;
    };
    const setPlaceholder = (message = "合并后按开始时间显示窗口。") => {
      const item = document.createElement("li");
      item.textContent = message;
      list.replaceChildren(item);
    };
    const resetStats = () => {
      inputCount.textContent = "0";
      mergedCount.textContent = "0";
      absorbedCount.textContent = "0";
      uniqueDuration.textContent = "0 分钟";
      overlapDuration.textContent = "0 分钟";
    };
    const fail = (message) => {
      input.setAttribute("aria-invalid", "true");
      error.textContent = message;
      status.textContent = "未生成报告，请修正输入。";
      report.dataset.ready = "false";
      reportState.textContent = "CHECK INPUT";
      resetStats();
      note.textContent = "相接窗口会合并，但不会产生重叠分钟。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latestReport = "";
      setPlaceholder("输入有误，修正后重新合并。");
    };
    const setStale = () => {
      if (report.dataset.ready !== "true") return;
      report.dataset.ready = "false";
      reportState.textContent = "STALE";
      status.textContent = "窗口已变化，请重新合并。";
      note.textContent = "当前报告已过期；重新合并后再复制。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latestReport = "";
    };
    const parseMoment = (values, side, lineNumber) => {
      const year = Number(values[0]);
      const month = Number(values[1]);
      const day = Number(values[2]);
      const hour = Number(values[3]);
      const minute = Number(values[4]);
      if (year < 2000 || year > 2099 || hour > 23 || minute > 59) {
        throw new Error(`第 ${lineNumber} 行${side}时间超出允许范围。`);
      }
      const milliseconds = Date.UTC(year, month - 1, day, hour, minute);
      const date = new Date(milliseconds);
      if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
        throw new Error(`第 ${lineNumber} 行${side}日期不存在。`);
      }
      return milliseconds / 60000;
    };
    const parseLine = (line, lineNumber) => {
      const match = line.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\s*\|\s*(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/u);
      if (!match) throw new Error(`第 ${lineNumber} 行格式不正确。`);
      const start = parseMoment(match.slice(1, 6), "开始", lineNumber);
      const end = parseMoment(match.slice(6, 11), "结束", lineNumber);
      if (start >= end) throw new Error(`第 ${lineNumber} 行开始时间必须早于结束时间。`);
      if (end - start > 366 * 1440) throw new Error(`第 ${lineNumber} 行跨度超过 366 天。`);
      return { start, end, sourceCount: 1 };
    };
    const renderMerged = (windows) => {
      const fragment = document.createDocumentFragment();
      windows.forEach((windowItem, index) => {
        const item = document.createElement("li");
        const number = document.createElement("b");
        number.textContent = String(index + 1).padStart(2, "0");
        const body = document.createElement("div");
        const interval = document.createElement("time");
        interval.textContent = `${formatMinute(windowItem.start)} → ${formatMinute(windowItem.end)}`;
        const sources = document.createElement("span");
        sources.textContent = `由 ${windowItem.sourceCount} 个原始窗口组成`;
        const duration = document.createElement("em");
        duration.textContent = durationLabel(windowItem.end - windowItem.start);
        body.append(interval, sources);
        item.append(number, body, duration);
        fragment.append(item);
      });
      list.replaceChildren(fragment);
    };

    windowForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const normalized = input.value.replace(/\r\n?/g, "\n");
      const length = Array.from(normalized).length;
      input.removeAttribute("aria-invalid");
      error.textContent = "";
      if (normalized.trim() === "") {
        fail("请先输入至少一个时间窗口。");
        input.focus();
        return;
      }
      if (length > 10000) {
        fail(`输入共 ${length} 个字符，最多允许 10000 个。`);
        input.focus();
        return;
      }
      const sourceLines = normalized.split("\n");
      const lines = sourceLines.map((line, index) => ({ text: line.trim(), number: index + 1 })).filter((line) => line.text !== "");
      if (lines.length > 100) {
        fail(`检测到 ${lines.length} 个窗口，最多允许 100 个。`);
        input.focus();
        return;
      }
      let windows;
      try {
        windows = lines.map((line) => parseLine(line.text, line.number));
      } catch (parseError) {
        fail(parseError.message);
        input.focus();
        return;
      }
      windows.sort((left, right) => left.start - right.start || left.end - right.end);
      const totalMinutes = windows.reduce((sum, item) => sum + item.end - item.start, 0);
      const merged = [];
      let absorbed = 0;
      windows.forEach((windowItem) => {
        const last = merged[merged.length - 1];
        if (!last || windowItem.start > last.end) {
          merged.push({ ...windowItem });
        } else {
          last.end = Math.max(last.end, windowItem.end);
          last.sourceCount += 1;
          absorbed += 1;
        }
      });
      const uniqueMinutes = merged.reduce((sum, item) => sum + item.end - item.start, 0);
      const overlapMinutes = totalMinutes - uniqueMinutes;
      inputCount.textContent = String(windows.length);
      mergedCount.textContent = String(merged.length);
      absorbedCount.textContent = String(absorbed);
      uniqueDuration.textContent = durationLabel(uniqueMinutes);
      overlapDuration.textContent = durationLabel(overlapMinutes);
      renderMerged(merged);
      report.dataset.ready = "true";
      reportState.textContent = "READY";
      status.textContent = `合并完成：${windows.length} 个原始窗口归并为 ${merged.length} 个。`;
      note.textContent = overlapMinutes > 0
        ? `原始窗口重复覆盖 ${durationLabel(overlapMinutes)}；请确认是否为同一时间语义。`
        : "没有重复覆盖；首尾相接的窗口仍会归并。";
      latestReport = [
        "服务窗口合并报告",
        `原始窗口：${windows.length}`,
        `合并后：${merged.length}`,
        `吸收窗口：${absorbed}`,
        `独占时长：${durationLabel(uniqueMinutes)}`,
        `重叠时长：${durationLabel(overlapMinutes)}`,
        ...merged.map((item, index) => `${index + 1}. ${formatMinute(item.start)} → ${formatMinute(item.end)}（${durationLabel(item.end - item.start)}；${item.sourceCount} 个原始窗口）`),
        "说明：按统一标记时间的连续分钟网格计算，不处理时区或夏令时。"
      ].join("\n");
      copyButton.disabled = false;
      copyStatus.textContent = "";
    });
    input.addEventListener("input", setStale);
    windowForm.querySelectorAll("[data-window-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        input.value = presets[button.dataset.windowPreset];
        input.removeAttribute("aria-invalid");
        error.textContent = "";
        setStale();
        status.textContent = "示例已装载，点击合并生成报告。";
        input.focus();
      });
    });
    copyButton.addEventListener("click", async () => {
      if (!latestReport) return;
      try {
        await copyText(latestReport);
        copyStatus.textContent = "报告已复制。";
      } catch (_error) {
        copyStatus.textContent = "浏览器未允许复制，请手动记录上方结果。";
      }
    });
    windowForm.addEventListener("reset", () => {
      window.setTimeout(() => {
        input.removeAttribute("aria-invalid");
        error.textContent = "";
        status.textContent = "等待输入时间窗口。";
        report.dataset.ready = "false";
        reportState.textContent = "STANDBY";
        resetStats();
        note.textContent = "相接窗口会合并，但不会产生重叠分钟。";
        copyButton.disabled = true;
        copyStatus.textContent = "";
        latestReport = "";
        setPlaceholder();
      }, 0);
    });
  }

  const channelSearch = document.querySelector("[data-channel-search]");
  if (channelSearch) {
    const query = channelSearch.querySelector("input");
    const result = channelSearch.querySelector("[data-channel-result]");
    const channels = [
      { href: "article.html", label: "事件复盘", words: ["事件", "复盘", "隔离", "关闭", "证据"] },
      { href: "tool.html", label: "服务窗口合并器", words: ["窗口", "时间", "合并", "重叠", "维护"] },
      { href: "legal.html", label: "传输说明", words: ["披露", "利益", "更正", "免责", "说明"] },
      { href: "index.html", label: "信号总览", words: ["首页", "信号", "频道", "总览"] }
    ];
    const showResult = (prefix, channel) => {
      const link = document.createElement("a");
      link.href = channel.href;
      link.textContent = channel.label;
      result.replaceChildren(document.createTextNode(prefix), link, document.createTextNode("。"));
    };
    channelSearch.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = query.value.trim();
      if (!value) {
        result.textContent = "请输入一个信号词。";
        query.focus();
        return;
      }
      const normalized = value.normalize("NFKC").toLocaleLowerCase();
      const channel = channels.find((item) => item.words.some((word) => normalized.includes(word)));
      if (channel) {
        showResult("最近的控制台：", channel);
      } else {
        showResult("未找到精确频道，建议先返回", channels[3]);
      }
    });
    query.addEventListener("input", () => {
      result.textContent = "信号词已变化，提交后重新查找。";
    });
  }
})();
