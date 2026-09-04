(() => {
  "use strict";

  const root = document.documentElement;
  const codePoints = (value) => Array.from(value).length;
  const text = (node, value) => { if (node) node.textContent = value; };
  const hasBrokenUnicode = (value) => {
    for (let index = 0; index < value.length; index += 1) {
      const unit = value.charCodeAt(index);
      if (unit >= 0xd800 && unit <= 0xdbff) {
        const next = value.charCodeAt(index + 1);
        if (!(next >= 0xdc00 && next <= 0xdfff)) return true;
        index += 1;
      } else if (unit >= 0xdc00 && unit <= 0xdfff) return true;
    }
    return false;
  };
  const hasControls = (value) => /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value);
  const prepare = (value, maximum) => {
    if (codePoints(value) > maximum) return { error: `原始输入不能超过 ${maximum.toLocaleString("zh-CN")} 个 Unicode 码点。` };
    if (hasBrokenUnicode(value)) return { error: "输入含不完整 Unicode 代理项，请重新粘贴纯文本。" };
    if (hasControls(value)) return { error: "输入含不允许的控制字符。" };
    return { value: value.normalize("NFKC") };
  };

  let copySequence = 0;
  const copyText = async (value, statusNode, successMessage, token = ++copySequence) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const helper = document.createElement("textarea");
        helper.value = value;
        helper.readOnly = true;
        helper.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        document.body.append(helper);
        helper.select();
        const copied = document.execCommand("copy");
        helper.remove();
        if (!copied) throw new Error("copy unavailable");
      }
      if (token === copySequence) text(statusNode, successMessage);
    } catch (_error) {
      if (token === copySequence) text(statusNode, "复制失败，请手动选择文字。");
    }
  };

  const initializeMode = () => {
    const toggles = [...document.querySelectorAll("[data-nw79-mode-toggle]")];
    if (!toggles.length) return;
    let saved = null;
    try { saved = localStorage.getItem("nw79-mode"); } catch (_error) { saved = null; }
    const apply = (mode) => {
      const day = mode === "day";
      root.dataset.nw79Mode = day ? "day" : "night";
      root.style.colorScheme = day ? "light" : "dark";
      toggles.forEach((toggle) => {
        toggle.disabled = false;
        toggle.setAttribute("aria-pressed", String(day));
        toggle.textContent = day ? "熄灯" : "亮灯";
      });
    };
    apply(saved === "day" ? "day" : "night");
    toggles.forEach((toggle) => toggle.addEventListener("click", () => {
      const next = root.dataset.nw79Mode === "day" ? "night" : "day";
      apply(next);
      try { localStorage.setItem("nw79-mode", next); } catch (_error) { /* optional */ }
    }));
  };

  const initializeMenu = () => {
    const button = document.querySelector(".nw79-menu");
    const navigation = document.querySelector("#nw79-nav");
    if (!button || !navigation) return;
    const close = (restore = false) => {
      navigation.classList.remove("nw79-open");
      button.setAttribute("aria-expanded", "false");
      text(button.querySelector("span"), "打开航标");
      if (restore) button.focus();
    };
    const open = () => {
      navigation.classList.add("nw79-open");
      button.setAttribute("aria-expanded", "true");
      text(button.querySelector("span"), "关闭航标");
      navigation.querySelector("a,button")?.focus();
    };
    button.addEventListener("click", () => navigation.classList.contains("nw79-open") ? close() : open());
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a") && window.innerWidth <= 760) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("nw79-open")) close(true);
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 760) close(); });
  };

  const initializeProgress = () => {
    const meter = document.querySelector("[data-nw79-progress]");
    if (!meter) return;
    const update = () => {
      const maximum = Math.max(0, root.scrollHeight - window.innerHeight);
      const percent = maximum === 0 ? 100 : Math.min(100, Math.max(0, window.scrollY / maximum * 100));
      meter.style.height = `${percent}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  };

  const initializeCodeCopies = () => {
    [
      ["[data-nw79-copy-home]", "#nw79-home-code", "[data-nw79-home-status]"],
      ["[data-nw79-copy-code]", "#nw79-handoff-code", "[data-nw79-code-status]"],
    ].forEach(([buttonSelector, codeSelector, statusSelector]) => {
      const button = document.querySelector(buttonSelector);
      const code = document.querySelector(codeSelector);
      const status = document.querySelector(statusSelector);
      if (!button || !code) return;
      button.disabled = false;
      button.addEventListener("click", () => copyText(code.textContent.trim(), status, "代码已复制。"));
    });
  };

  const initializeFilter = () => {
    const form = document.querySelector("[data-nw79-filter]");
    if (!form) return;
    const cards = [...document.querySelectorAll(".nw79-dispatch-grid > li")];
    const sector = form.elements.sector;
    const keyword = form.elements.keyword;
    const status = form.querySelector("[data-nw79-filter-status]");
    form.hidden = false;
    const apply = () => {
      const normalized = keyword.value.normalize("NFKC").trim().toLocaleLowerCase("zh-CN");
      let visible = 0;
      cards.forEach((card) => {
        const sectorMatch = sector.value === "all" || card.dataset.nw79Sector === sector.value;
        const keywordMatch = !normalized || card.textContent.normalize("NFKC").toLocaleLowerCase("zh-CN").includes(normalized);
        card.hidden = !(sectorMatch && keywordMatch);
        if (!card.hidden) visible += 1;
      });
      text(status, visible ? `显示 ${visible} / ${cards.length} 条事件。` : "没有匹配事件，可清除筛选。");
    };
    form.addEventListener("input", apply);
    form.addEventListener("change", apply);
    form.addEventListener("reset", () => window.setTimeout(apply, 0));
    apply();
  };

  const parseUtc = (value) => {
    const match = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/u.exec(value);
    if (!match) return null;
    const [year, month, day, hour, minute] = match.slice(1).map(Number);
    if (year < 2000 || year > 2099 || hour > 23 || minute > 59) return null;
    const milliseconds = Date.UTC(year, month - 1, day, hour, minute);
    const date = new Date(milliseconds);
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day || date.getUTCHours() !== hour || date.getUTCMinutes() !== minute) return null;
    return milliseconds;
  };
  const splitLines = (value, maximum) => {
    const lines = value.split(/\r?\n/u).filter((line) => line.trim());
    if (!lines.length) return { error: "请至少输入 1 条记录。" };
    if (lines.length > maximum) return { error: `非空记录不能超过 ${maximum} 行。` };
    return { lines };
  };
  const exactParts = (line, count) => {
    const parts = line.split("|").map((part) => part.trim());
    return parts.length === count ? parts : null;
  };
  const asciiToken = /^[A-Z][A-Z0-9-]{0,63}$/u;
  const lowerToken = /^[a-z][a-z0-9-]{0,63}$/u;

  const toolParsers = [
    (value, form) => {
      const prepared = prepare(value, 30000);
      if (prepared.error) return prepared;
      const rows = splitLines(prepared.value, 300);
      if (rows.error) return rows;
      const threshold = Number(form.elements.threshold.value);
      if (![15, 30, 60, 120].includes(threshold)) return { field: "threshold", error: "请选择 15、30、60 或 120 分钟。" };
      const events = [];
      for (let index = 0; index < rows.lines.length; index += 1) {
        const parts = exactParts(rows.lines[index], 2);
        if (!parts) return { error: `第 ${index + 1} 行须且只能有 2 段。` };
        const milliseconds = parseUtc(parts[0]);
        if (milliseconds === null) return { error: `第 ${index + 1} 行须为 2000–2099 年真实 UTC 分钟。` };
        if (!asciiToken.test(parts[1])) return { error: `第 ${index + 1} 行事件标记须为 1–64 位大写 ASCII、数字或连字符。` };
        events.push({ timestamp: parts[0], label: parts[1], milliseconds });
      }
      const anomalies = [];
      events.slice(1).forEach((current, offset) => {
        const previous = events[offset];
        const delta = (current.milliseconds - previous.milliseconds) / 60000;
        if (delta < 0) anomalies.push(`倒序｜行 ${offset + 1}→${offset + 2}｜${Math.abs(delta)} 分钟`);
        else if (delta === 0) anomalies.push(`重复｜行 ${offset + 1}→${offset + 2}｜${current.timestamp}`);
        else if (delta > threshold) anomalies.push(`断档｜行 ${offset + 1}→${offset + 2}｜${delta} 分钟（阈值 ${threshold}）`);
      });
      const report = [
        "UTC CONTINUITY / 完整报告",
        `记录：${events.length}｜异常：${anomalies.length}｜阈值：${threshold} 分钟`,
        "", "[原序事件]",
        ...events.map((event, index) => `${String(index + 1).padStart(3, "0")}｜${event.timestamp}Z｜${event.label}`),
        "", "[相邻异常]",
        ...(anomalies.length ? anomalies : ["未发现倒序、重复或严格超阈值断档。"]),
      ].join("\n");
      return { report, status: `已扫描 ${events.length} 条事件，发现 ${anomalies.length} 个相邻异常。` };
    },
    (value, form) => {
      const prepared = prepare(value, 30000);
      if (prepared.error) return prepared;
      const rows = splitLines(prepared.value, 300);
      if (rows.error) return rows;
      const quorum = Number(form.elements.quorum.value);
      if (![2, 3, 4, 5].includes(quorum)) return { field: "quorum", error: "最低复核人数须为 2–5。" };
      const seen = new Set();
      const signals = [];
      for (let index = 0; index < rows.lines.length; index += 1) {
        const parts = exactParts(rows.lines[index], 2);
        if (!parts) return { error: `第 ${index + 1} 行须且只能有 2 段。` };
        if (!asciiToken.test(parts[0])) return { error: `第 ${index + 1} 行信号须为 1–64 位大写 ASCII、数字或连字符。` };
        const key = parts[0].toLocaleLowerCase("en-US");
        if (seen.has(key)) return { error: `第 ${index + 1} 行信号重复。` };
        seen.add(key);
        const observers = parts[1].split(",").map((item) => item.trim());
        if (!observers.length || observers.some((item) => !lowerToken.test(item))) return { error: `第 ${index + 1} 行观察员须为逗号分隔的小写 ASCII 标记。` };
        const observerSet = new Set(observers);
        if (observerSet.size !== observers.length) return { error: `第 ${index + 1} 行含重复观察员。` };
        if (observers.length > 20) return { error: `第 ${index + 1} 行观察员不能超过 20 人。` };
        signals.push({ signal: parts[0], observers });
      }
      const qualified = signals.filter((item) => item.observers.length >= quorum).length;
      const report = [
        "SIGNAL QUORUM / 完整报告",
        `信号：${signals.length}｜达到门槛：${qualified}｜不足：${signals.length - qualified}｜门槛：${quorum} 人`,
        "", ...signals.map((item, index) => `${String(index + 1).padStart(3, "0")}｜${item.signal}｜${item.observers.join(", ")}｜${item.observers.length >= quorum ? "合格" : `不足 ${quorum - item.observers.length} 人`}`),
      ].join("\n");
      return { report, status: `已评估 ${signals.length} 个信号，${qualified} 个达到复核门槛。` };
    },
    (value) => {
      const prepared = prepare(value, 20000);
      if (prepared.error) return prepared;
      const rows = splitLines(prepared.value, 200);
      if (rows.error) return rows;
      const windows = [];
      const toMinute = (clock) => {
        const match = /^(\d{2}):(\d{2})$/u.exec(clock);
        if (!match || Number(match[1]) > 23 || Number(match[2]) > 59) return null;
        return Number(match[1]) * 60 + Number(match[2]);
      };
      for (let index = 0; index < rows.lines.length; index += 1) {
        const parts = exactParts(rows.lines[index], 2);
        if (!parts) return { error: `第 ${index + 1} 行须且只能有 2 段。` };
        if (!lowerToken.test(parts[0])) return { error: `第 ${index + 1} 行频道须为 1–64 位小写 ASCII、数字或连字符。` };
        const match = /^(\d{2}:\d{2})-(\d{2}:\d{2})$/u.exec(parts[1]);
        if (!match) return { error: `第 ${index + 1} 行窗口须为 HH:MM-HH:MM。` };
        const start = toMinute(match[1]), rawEnd = toMinute(match[2]);
        if (start === null || rawEnd === null) return { error: `第 ${index + 1} 行含无效时刻。` };
        if (start === rawEnd) return { error: `第 ${index + 1} 行不能是零长度窗口。` };
        windows.push({ channel: parts[0], start, end: rawEnd <= start ? rawEnd + 1440 : rawEnd, source: parts[1] });
      }
      const groups = new Map();
      windows.forEach((item) => {
        if (!groups.has(item.channel)) groups.set(item.channel, []);
        groups.get(item.channel).push(item);
      });
      const format = (minute) => `${minute >= 1440 ? "+1d " : ""}${String(Math.floor((minute % 1440) / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
      const mergedLines = [];
      let mergedCount = 0;
      [...groups].forEach(([channel, items]) => {
        const merged = [];
        items.slice().sort((a, b) => a.start - b.start || a.end - b.end).forEach((item) => {
          const last = merged.at(-1);
          if (last && item.start <= last.end) last.end = Math.max(last.end, item.end);
          else merged.push({ start: item.start, end: item.end });
        });
        mergedCount += merged.length;
        mergedLines.push(`[${channel}]`, ...merged.map((item) => `${format(item.start)} → ${format(item.end)}｜${item.end - item.start} 分钟`));
      });
      const report = [
        "WATCH WINDOW UNION / 完整报告",
        `原始窗口：${windows.length}｜频道：${groups.size}｜合并后：${mergedCount}`,
        "", "[原始输入]",
        ...windows.map((item, index) => `${String(index + 1).padStart(3, "0")}｜${item.channel}｜${item.source}｜${item.end - item.start} 分钟${item.end >= 1440 ? "｜跨午夜" : ""}`),
        "", "[按频道并集]", ...mergedLines,
      ].join("\n");
      return { report, status: `已将 ${windows.length} 个窗口合并为 ${mergedCount} 段。` };
    },
    (value) => {
      const prepared = prepare(value, 30000);
      if (prepared.error) return prepared;
      const rows = splitLines(prepared.value, 300);
      if (rows.error) return rows;
      const versions = [];
      const previous = new Map();
      let regressions = 0, unchanged = 0, leaps = 0;
      const compare = (left, right) => {
        for (let index = 0; index < 3; index += 1) if (left[index] !== right[index]) return left[index] - right[index];
        return 0;
      };
      for (let index = 0; index < rows.lines.length; index += 1) {
        const parts = exactParts(rows.lines[index], 2);
        if (!parts) return { error: `第 ${index + 1} 行须且只能有 2 段。` };
        if (!lowerToken.test(parts[0])) return { error: `第 ${index + 1} 行来源须为 1–64 位小写 ASCII、数字或连字符。` };
        const match = /^(0|[1-9]\d{0,5})\.(0|[1-9]\d{0,5})\.(0|[1-9]\d{0,5})$/u.exec(parts[1]);
        if (!match) return { error: `第 ${index + 1} 行版本须为三段 0–999999 的无前导零整数。` };
        const tuple = match.slice(1).map(Number);
        const prior = previous.get(parts[0]);
        let state = "首条";
        if (prior) {
          const delta = compare(tuple, prior);
          if (delta < 0) { state = "回退"; regressions += 1; }
          else if (delta === 0) { state = "不变"; unchanged += 1; }
          else {
            const changed = tuple.findIndex((part, partIndex) => part !== prior[partIndex]);
            const leap = tuple[changed] - prior[changed] > 1;
            state = `${["主版本", "次版本", "修订版"][changed]}推进${leap ? " / 跨级" : ""}`;
            if (leap) leaps += 1;
          }
        }
        versions.push({ source: parts[0], version: parts[1], state });
        previous.set(parts[0], tuple);
      }
      const report = [
        "VERSION SEQUENCE WATCH / 完整报告",
        `记录：${versions.length}｜来源：${previous.size}｜回退：${regressions}｜不变：${unchanged}｜跨级：${leaps}`,
        "", ...versions.map((item, index) => `${String(index + 1).padStart(3, "0")}｜${item.source}｜${item.version}｜${item.state}`),
      ].join("\n");
      return { report, status: `已检查 ${versions.length} 个版本点，发现 ${regressions} 次回退。` };
    },
    (value) => {
      const prepared = prepare(value, 40000);
      if (prepared.error) return prepared;
      const rows = splitLines(prepared.value, 300);
      if (rows.error) return rows;
      const limits = { P1: 15, P2: 60, P3: 240 };
      const seen = new Set();
      const alerts = [];
      for (let index = 0; index < rows.lines.length; index += 1) {
        const parts = exactParts(rows.lines[index], 4);
        if (!parts) return { error: `第 ${index + 1} 行须且只能有 4 段。` };
        if (!asciiToken.test(parts[0])) return { error: `第 ${index + 1} 行编号须为 1–64 位大写 ASCII、数字或连字符。` };
        const key = parts[0].toLocaleLowerCase("en-US");
        if (seen.has(key)) return { error: `第 ${index + 1} 行编号重复。` };
        seen.add(key);
        if (!(parts[1] in limits)) return { error: `第 ${index + 1} 行优先级须为 P1、P2 或 P3。` };
        const opened = parseUtc(parts[2]), acknowledged = parseUtc(parts[3]);
        if (opened === null || acknowledged === null) return { error: `第 ${index + 1} 行含无效 UTC 分钟。` };
        if (acknowledged < opened) return { error: `第 ${index + 1} 行响应时间早于打开时间。` };
        const duration = (acknowledged - opened) / 60000;
        alerts.push({ id: parts[0], priority: parts[1], opened: parts[2], acknowledged: parts[3], duration, limit: limits[parts[1]], over: Math.max(0, duration - limits[parts[1]]), order: index });
      }
      const ordered = alerts.slice().sort((a, b) => Number(b.over > 0) - Number(a.over > 0) || b.over - a.over || b.duration - a.duration || a.order - b.order);
      const breaches = alerts.filter((item) => item.over > 0).length;
      const report = [
        "ACKNOWLEDGEMENT SLA / 完整报告",
        `告警：${alerts.length}｜按时：${alerts.length - breaches}｜超时：${breaches}`,
        "排序：先超时，再按超出分钟、响应分钟和原始顺序。", "",
        ...ordered.map((item, index) => `${String(index + 1).padStart(3, "0")}｜${item.id}｜${item.priority}｜${item.opened}Z → ${item.acknowledged}Z｜${item.duration} 分钟 / ${item.limit} 分钟｜${item.over ? `超时 ${item.over} 分钟` : "按时"}`),
      ].join("\n");
      return { report, status: `已计算 ${alerts.length} 条告警，${breaches} 条超时。` };
    },
  ];

  const initializeTool = () => {
    const form = document.querySelector("[data-nw79-tool]");
    if (!form) return;
    const parser = toolParsers[Number(form.dataset.nw79Tool)];
    const primary = form.querySelector("textarea");
    const output = document.querySelector("[data-tool-output]");
    const status = form.querySelector("[data-form-status]");
    const submit = form.querySelector('[type="submit"]');
    const reset = form.querySelector('[type="reset"]');
    const copy = document.querySelector("[data-copy-tool]");
    const copyStatus = document.querySelector("[data-copy-status]");
    let report = "";
    let generation = 0;
    [...form.elements].forEach((field) => {
      if (!field.name) return;
      const error = form.querySelector(`[data-field-error="${field.name}"]`);
      if (error) field.setAttribute("aria-errormessage", error.id);
    });
    submit.disabled = false;
    reset.disabled = false;
    const clearErrors = () => {
      [...form.querySelectorAll("[aria-invalid]")].forEach((field) => field.removeAttribute("aria-invalid"));
      [...form.querySelectorAll("[data-field-error]")].forEach((node) => text(node, ""));
    };
    const stale = () => {
      generation += 1;
      copySequence += 1;
      clearErrors();
      report = "";
      copy.disabled = true;
      text(copyStatus, "");
      text(output, "输入已改变；旧报告已失效。请重新生成。");
      text(status, "等待重新生成完整报告。");
    };
    form.addEventListener("input", stale);
    form.addEventListener("change", stale);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearErrors();
      const result = parser ? parser(primary.value, form) : { error: "工具配置无效。" };
      if (result.error) {
        const field = result.field ? form.elements[result.field] : primary;
        const error = form.querySelector(`[data-field-error="${field.name}"]`);
        field.setAttribute("aria-invalid", "true");
        text(error, result.error);
        text(status, "未生成报告，请修正输入。");
        text(output, `INPUT ERROR\n${result.error}`);
        report = "";
        copy.disabled = true;
        field.focus();
        return;
      }
      generation += 1;
      report = result.report;
      text(output, report);
      text(status, result.status);
      text(copyStatus, "");
      copy.disabled = false;
    });
    form.addEventListener("reset", () => window.setTimeout(() => {
      generation += 1;
      copySequence += 1;
      clearErrors();
      report = "";
      copy.disabled = true;
      text(copyStatus, "");
      text(output, "等待有效输入。");
      text(status, "样例已恢复，等待生成完整报告。");
    }, 0));
    copy.addEventListener("click", () => {
      if (!report) return;
      const localGeneration = generation;
      const token = ++copySequence;
      const guardedStatus = {
        set textContent(value) { if (localGeneration === generation) copyStatus.textContent = value; },
      };
      copyText(report, guardedStatus, "完整报告已复制。", token);
    });
  };

  const initializeSearch = () => {
    const form = document.querySelector("[data-nw79-search]");
    if (!form) return;
    const input = form.elements.query;
    const button = form.querySelector("button");
    const result = form.querySelector("[data-nw79-search-result]");
    const entries = [
      ["事件 文章 观察 记录 日志", "observation-log.html", "事件簿"],
      ["工具 控制 计算 扫描 时间 版本", "watch-console.html", "本地控制室"],
      ["联系 邮箱", "contact-beacon.html", "联系航标"],
      ["更正 纠错", "correction-channel.html", "更正频道"],
      ["隐私 本地", "local-privacy.html", "本地隐私"],
      ["关系 推广 披露", "relation-signal.html", "关系信号"],
      ["章程 关于 编辑", "station-charter.html", "观测站章程"],
    ];
    button.disabled = false;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const prepared = prepare(input.value, 80);
      if (prepared.error) {
        input.setAttribute("aria-invalid", "true");
        text(result, prepared.error);
        input.focus();
        return;
      }
      input.removeAttribute("aria-invalid");
      const query = prepared.value.trim().toLocaleLowerCase("zh-CN");
      if (!query) {
        text(result, "请输入主题后重新扫描。");
        input.focus();
        return;
      }
      const match = entries.find((entry) => entry[0].includes(query) || query.split(/\s+/u).some((word) => entry[0].includes(word)));
      result.replaceChildren();
      if (!match) {
        text(result, "没有命中预设航标。可返回观测台或打开事件簿。");
        return;
      }
      result.append("找到航标：");
      const link = document.createElement("a");
      link.href = match[1];
      link.textContent = match[2];
      result.append(link);
    });
  };

  root.classList.add("nw79-enhanced");
  initializeMode();
  initializeMenu();
  initializeProgress();
  initializeCodeCopies();
  initializeFilter();
  initializeTool();
  initializeSearch();
})();
