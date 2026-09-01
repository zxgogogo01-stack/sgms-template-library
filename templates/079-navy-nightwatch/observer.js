(() => {
  "use strict";

  const root = document.documentElement;
  const countCharacters = (value) => Array.from(value).length;
  const setText = (node, value) => {
    if (node) node.textContent = value;
  };

  const copyText = async (value, statusNode, successMessage) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
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
      }
      setText(statusNode, successMessage);
    } catch (_error) {
      setText(statusNode, "复制失败，请手动选择文字。");
    }
  };

  const initializeMode = () => {
    const toggles = [...document.querySelectorAll("[data-nw79-mode-toggle]")];
    if (!toggles.length) return;
    let saved = null;
    try {
      saved = localStorage.getItem("nw79-mode");
    } catch (_error) {
      saved = null;
    }
    const apply = (mode) => {
      root.dataset.nw79Mode = mode;
      toggles.forEach((toggle) => {
        const isDay = mode === "day";
        toggle.setAttribute("aria-pressed", String(isDay));
        toggle.textContent = isDay ? "熄灯" : "亮灯";
      });
    };
    apply(saved === "day" || saved === "night" ? saved : "night");
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const next = root.dataset.nw79Mode === "day" ? "night" : "day";
        apply(next);
        try {
          localStorage.setItem("nw79-mode", next);
        } catch (_error) {
          // The current page can still use the selected mode.
        }
      });
    });
  };

  const initializeMenu = () => {
    const button = document.querySelector(".nw79-menu");
    const navigation = document.querySelector("#nw79-nav");
    if (!button || !navigation) return;
    const close = (restoreFocus = false) => {
      navigation.classList.remove("nw79-open");
      button.setAttribute("aria-expanded", "false");
      if (restoreFocus) button.focus();
    };
    const open = () => {
      navigation.classList.add("nw79-open");
      button.setAttribute("aria-expanded", "true");
      const firstLink = navigation.querySelector("a");
      if (firstLink) firstLink.focus();
    };
    button.addEventListener("click", () => {
      if (navigation.classList.contains("nw79-open")) close();
      else open();
    });
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a") && window.innerWidth <= 760) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("nw79-open")) close(true);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) close();
    });
  };

  const initializeProgress = () => {
    const meter = document.querySelector("[data-nw79-progress]");
    if (!meter) return;
    const update = () => {
      const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const percentage = maximum === 0 ? 100 : Math.min(100, Math.max(0, (window.scrollY / maximum) * 100));
      meter.style.height = `${percentage}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  };

  const initializeCopies = () => {
    const handoffButton = document.querySelector("[data-nw79-copy-handoff]");
    const handoffStatus = document.querySelector("[data-nw79-handoff-status]");
    if (handoffButton) {
      handoffButton.addEventListener("click", () => {
        const format = "巡夜交接格式\n1. UTC 时间戳\n2. 原始信号与位置\n3. 已确认差异\n4. 未决问题与升级条件\n5. 下一复核点与负责人";
        copyText(format, handoffStatus, "交接格式已复制。");
      });
    }
    const disclosureButton = document.querySelector("[data-nw79-copy-disclosure]");
    const disclosure = document.querySelector("[data-nw79-disclosure]");
    const disclosureStatus = document.querySelector("[data-nw79-disclosure-status]");
    if (disclosureButton && disclosure) {
      disclosureButton.addEventListener("click", () => {
        copyText(disclosure.textContent.trim(), disclosureStatus, "简短披露已复制。");
      });
    }
  };

  const parseUtcTimestamp = (value) => {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/u);
    if (!match) return null;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const hour = Number(match[4]);
    const minute = Number(match[5]);
    if (year < 2000 || year > 2099 || hour > 23 || minute > 59) return null;
    const milliseconds = Date.UTC(year, month - 1, day, hour, minute);
    const date = new Date(milliseconds);
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day ||
      date.getUTCHours() !== hour ||
      date.getUTCMinutes() !== minute
    ) return null;
    return milliseconds;
  };

  const initializeTimeline = () => {
    const form = document.querySelector("[data-nw79-timeline-form]");
    if (!form) return;
    const field = form.querySelector("#nw79-events");
    const thresholdField = form.querySelector("#nw79-threshold");
    const errorNode = form.querySelector("[data-nw79-event-error]");
    const statusNode = form.querySelector("[data-nw79-event-status]");
    const report = document.querySelector(".nw79-timeline-report");
    const stateNode = report.querySelector("[data-nw79-timeline-state]");
    const lineCountNode = report.querySelector("[data-nw79-line-count]");
    const reversalCountNode = report.querySelector("[data-nw79-reversal-count]");
    const duplicateCountNode = report.querySelector("[data-nw79-duplicate-count]");
    const gapCountNode = report.querySelector("[data-nw79-gap-count]");
    const rangeNode = report.querySelector("[data-nw79-timeline-range]");
    const listNode = report.querySelector("[data-nw79-anomaly-list]");
    const noteNode = report.querySelector("[data-nw79-report-note]");
    const copyButton = report.querySelector("[data-nw79-copy-report]");
    const copyStatus = report.querySelector("[data-nw79-report-status]");
    let lastReport = "";

    const clearList = () => {
      while (listNode.firstChild) listNode.firstChild.remove();
    };
    const addItem = (primary, secondary = "", kind = "") => {
      const item = document.createElement("li");
      if (kind) item.dataset.kind = kind;
      const lamp = document.createElement("i");
      lamp.setAttribute("aria-hidden", "true");
      const title = document.createElement("b");
      title.textContent = primary;
      item.append(lamp, title);
      if (secondary) {
        const detail = document.createElement("span");
        detail.textContent = secondary;
        item.append(detail);
      }
      listNode.append(item);
    };

    const markStale = () => {
      field.removeAttribute("aria-invalid");
      setText(errorNode, "");
      setText(copyStatus, "");
      if (report.dataset.ready === "true") {
        report.dataset.ready = "stale";
        setText(stateNode, "RESCAN");
        setText(statusNode, "输入或阈值已更改，请重新扫描时间线。");
        copyButton.disabled = true;
      }
      lastReport = "";
    };

    const resetReport = () => {
      report.dataset.ready = "false";
      field.removeAttribute("aria-invalid");
      setText(errorNode, "");
      setText(statusNode, "等待输入事件日志。");
      setText(stateNode, "STANDBY");
      setText(lineCountNode, "0");
      setText(reversalCountNode, "0");
      setText(duplicateCountNode, "0");
      setText(gapCountNode, "0");
      setText(rangeNode, "—");
      clearList();
      addItem("扫描后显示前 50 个连续性异常。");
      setText(noteNode, "断档不一定是错误，但必须让下一班知道这段时间没有记录。");
      setText(copyStatus, "");
      copyButton.disabled = true;
      lastReport = "";
    };

    const showError = (message) => {
      resetReport();
      field.setAttribute("aria-invalid", "true");
      setText(errorNode, message);
      setText(statusNode, "未生成报告，请修正输入。");
      setText(stateNode, "INPUT ERROR");
      clearList();
      addItem("事件日志未通过格式检查。");
      setText(noteNode, "修正输入后再次扫描；现有报告已清除。");
      field.focus();
    };

    const parse = () => {
      if (countCharacters(field.value) > 10000) return { error: "总输入不能超过 10,000 个 Unicode 字符。" };
      const normalized = field.value.normalize("NFKC");
      const lines = normalized.split(/\r?\n/u).filter((line) => line.trim() !== "");
      if (!lines.length) return { error: "请至少输入 1 条事件。" };
      if (lines.length > 200) return { error: "非空事件不能超过 200 行。" };
      const threshold = Number(thresholdField.value);
      if (![15, 30, 60, 120].includes(threshold)) return { error: "请选择有效的断档阈值。" };
      const events = [];
      for (let index = 0; index < lines.length; index += 1) {
        const parts = lines[index].split("|");
        if (parts.length !== 2) return { error: `第 ${index + 1} 行须且只能包含一个竖线分隔符。` };
        const timestamp = parts[0].trim();
        const label = parts[1].trim();
        const milliseconds = parseUtcTimestamp(timestamp);
        if (milliseconds === null) return { error: `第 ${index + 1} 行时间无效：须为 2000–2099 年真实 UTC 时间 YYYY-MM-DD HH:MM。` };
        if (!label) return { error: `第 ${index + 1} 行事件文字不能为空。` };
        if (countCharacters(label) > 100) return { error: `第 ${index + 1} 行事件文字不能超过 100 个 Unicode 字符。` };
        events.push({ timestamp, milliseconds, label, index: index + 1 });
      }
      const anomalies = [];
      for (let index = 1; index < events.length; index += 1) {
        const previous = events[index - 1];
        const current = events[index];
        const delta = (current.milliseconds - previous.milliseconds) / 60000;
        if (delta < 0) {
          anomalies.push({ kind: "reversal", primary: `${previous.timestamp} → ${current.timestamp}`, secondary: `倒序 ${Math.abs(delta).toLocaleString("zh-CN")} 分钟；第 ${current.index} 行「${current.label}」` });
        } else if (delta === 0) {
          anomalies.push({ kind: "duplicate", primary: current.timestamp, secondary: `重复时间戳；第 ${previous.index} 与 ${current.index} 行` });
        } else if (delta > threshold) {
          anomalies.push({ kind: "gap", primary: `${previous.timestamp} → ${current.timestamp}`, secondary: `断档 ${delta.toLocaleString("zh-CN")} 分钟；阈值 ${threshold} 分钟` });
        }
      }
      return { events, anomalies, threshold };
    };

    const render = (data) => {
      const reversals = data.anomalies.filter((item) => item.kind === "reversal").length;
      const duplicates = data.anomalies.filter((item) => item.kind === "duplicate").length;
      const gaps = data.anomalies.filter((item) => item.kind === "gap").length;
      const clean = data.anomalies.length === 0;
      const times = data.events.map((event) => event.milliseconds);
      const first = data.events[times.indexOf(Math.min(...times))].timestamp;
      const last = data.events[times.indexOf(Math.max(...times))].timestamp;
      const range = `${first} — ${last}`;
      field.removeAttribute("aria-invalid");
      setText(errorNode, "");
      report.dataset.ready = "true";
      setText(stateNode, clean ? "TIMELINE CLEAR" : "REVIEW SIGNALS");
      setText(lineCountNode, String(data.events.length));
      setText(reversalCountNode, String(reversals));
      setText(duplicateCountNode, String(duplicates));
      setText(gapCountNode, String(gaps));
      setText(rangeNode, range);
      setText(statusNode, `已扫描 ${data.events.length} 条：${reversals} 处倒序，${duplicates} 处重复，${gaps} 处断档。`);
      setText(copyStatus, "");
      clearList();
      if (clean) addItem("时间线连续，未发现倒序、重复或超阈值断档。");
      else data.anomalies.slice(0, 50).forEach((item) => addItem(item.primary, item.secondary, item.kind));
      if (data.anomalies.length > 50) setText(noteNode, `屏幕仅显示前 50 项，共 ${data.anomalies.length} 项；复制报告会包含全部异常。`);
      else if (clean) setText(noteNode, `当前序列通过 ${data.threshold} 分钟阈值检查；仍应核对来源与交接内容。`);
      else setText(noteNode, `共发现 ${data.anomalies.length} 项连续性异常；请逐项确认记录中断或时钟错误。`);

      const lines = [
        "事件时间线连续性报告",
        "时区：UTC",
        `事件：${data.events.length}`,
        `覆盖：${range}`,
        `断档阈值：${data.threshold} 分钟`,
        `倒序：${reversals}`,
        `重复：${duplicates}`,
        `断档：${gaps}`,
        "",
        "异常明细",
      ];
      if (clean) lines.push("时间线连续，未发现异常。");
      else data.anomalies.forEach((item) => lines.push(`${item.kind.toUpperCase()}｜${item.primary}｜${item.secondary}`));
      lastReport = lines.join("\n");
      copyButton.disabled = false;
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const result = parse();
      if (result.error) showError(result.error);
      else render(result);
    });
    field.addEventListener("input", markStale);
    thresholdField.addEventListener("change", markStale);
    form.addEventListener("reset", () => window.setTimeout(resetReport, 0));
    const presets = {
      mixed: "2026-09-01 00:00 | 班次开始\n2026-09-01 00:20 | 捕获新版本\n2026-09-01 00:20 | 补记来源\n2026-09-01 00:10 | 校正观察时间\n2026-09-01 01:30 | 完成复核",
      clean: "2026-09-01 00:00 | 班次开始\n2026-09-01 00:15 | 捕获信号\n2026-09-01 00:30 | 完成辨认\n2026-09-01 00:45 | 提交复核",
      midnight: "2026-12-31 23:40 | 年末班次开始\n2026-12-31 23:58 | 最后一次旧年观察\n2027-01-01 00:12 | 新年首次检查\n2027-01-01 00:30 | 完成交接",
    };
    form.querySelectorAll("[data-nw79-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        field.value = presets[button.dataset.nw79Preset] || "";
        markStale();
        field.focus();
      });
    });
    copyButton.addEventListener("click", () => {
      if (lastReport) copyText(lastReport, copyStatus, "完整报告已复制。");
    });
  };

  const initializeSearch = () => {
    const form = document.querySelector("[data-nw79-search]");
    if (!form) return;
    const input = form.querySelector("#nw79-query");
    const result = form.querySelector("[data-nw79-search-result]");
    const routes = [
      { href: "article.html", label: "巡夜手册", words: ["值守", "手册", "来源", "差异", "交接"] },
      { href: "tool.html", label: "时间线审计器", words: ["时间线", "倒序", "重复", "断档", "工具"] },
      { href: "legal.html", label: "信号说明", words: ["披露", "隐私", "说明", "更正", "边界"] },
      { href: "index.html", label: "观测台首页", words: ["首页", "观测", "雷达", "日志", "频道"] },
    ];
    const clear = () => {
      while (result.firstChild) result.firstChild.remove();
    };
    const showText = (value) => {
      clear();
      result.textContent = value;
    };
    const showLink = (prefix, route) => {
      clear();
      result.append(document.createTextNode(prefix));
      const link = document.createElement("a");
      link.href = route.href;
      link.textContent = route.label;
      result.append(link, document.createTextNode("。"));
    };
    input.addEventListener("input", () => showText("输入已更改，按“重新扫描”搜索。"));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.normalize("NFKC").trim();
      if (!query) {
        showText("请输入主题，例如“时间线”或“来源”。");
        input.focus();
        return;
      }
      if (countCharacters(query) > 80) {
        showText("搜索词不能超过 80 个 Unicode 字符。");
        input.focus();
        return;
      }
      const route = routes.find((candidate) => candidate.words.some((word) => query.includes(word)));
      if (route) showLink("最近的本地航标是：", route);
      else showLink("没有完全匹配；建议先返回", routes[3]);
    });
  };

  initializeMode();
  initializeMenu();
  initializeProgress();
  initializeCopies();
  initializeTimeline();
  initializeSearch();
})();
