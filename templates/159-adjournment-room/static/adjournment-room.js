(() => {
  "use strict";

  const root = document.documentElement;
  const themeKey = "ck159-board";

  const copyText = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (_error) {
      const helper = document.createElement("textarea");
      helper.value = value;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.append(helper);
      helper.select();
      const copied = document.execCommand("copy");
      helper.remove();
      return copied;
    }
  };

  const getSavedTheme = () => {
    try {
      return localStorage.getItem(themeKey);
    } catch (_error) {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem(themeKey, theme);
    } catch (_error) {
      // The visual preference remains active for this page when storage is unavailable.
    }
  };

  const applyTheme = (theme) => {
    const next = theme === "midnight" ? "midnight" : "porcelain";
    root.dataset.ck159Board = next;
    const dark = next === "midnight";
    document.querySelectorAll("[data-ck159-board-toggle]").forEach((button) => {
      button.textContent = dark ? "白方室" : "黑方室";
      button.setAttribute("aria-pressed", String(dark));
    });
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute("content", dark ? "#0e1110" : "#efece4");
  };

  applyTheme(getSavedTheme());
  document.querySelectorAll("[data-ck159-board-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = root.dataset.ck159Board === "midnight" ? "porcelain" : "midnight";
      applyTheme(next);
      saveTheme(next);
    });
  });

  const homeCopy = document.querySelector("[data-ck159-copy-code]");
  if (homeCopy) {
    homeCopy.addEventListener("click", async () => {
      const code = homeCopy.closest("div")?.querySelector("strong")?.textContent?.trim() || "";
      const status = document.querySelector("[data-ck159-copy-status]");
      const copied = code && (await copyText(code));
      if (status) status.textContent = copied ? "分析室号已复制。" : "复制失败，请手动选择室号。";
    });
  }

  const summaryCopy = document.querySelector("[data-ck159-copy-summary]");
  if (summaryCopy) {
    summaryCopy.addEventListener("click", async () => {
      const lines = [...document.querySelectorAll(".ck159-annotation")].map((item) => {
        const number = item.querySelector("header b")?.textContent?.trim() || "";
        const heading = item.querySelector("h2")?.textContent?.replace(/\s+/g, " ").trim() || "";
        return `${number}｜${heading}`;
      });
      const copied = await copyText(`六则封棋批注\n${lines.join("\n")}`);
      const status = document.querySelector("[data-ck159-summary-status]");
      if (status) status.textContent = copied ? "六则批注摘要已复制。" : "复制失败，请手动选择摘要。";
    });
  }

  const policyCopy = document.querySelector("[data-ck159-copy-policy]");
  if (policyCopy) {
    policyCopy.addEventListener("click", async () => {
      const lines = [...document.querySelectorAll(".ck159-rulings article")].map((item) => {
        const heading = item.querySelector("h2")?.textContent?.trim() || "";
        const body = item.querySelector("p")?.textContent?.replace(/\s+/g, " ").trim() || "";
        return `${heading}：${body}`;
      });
      const copied = await copyText(`六项分析边界\n${lines.join("\n")}`);
      const status = document.querySelector("[data-ck159-policy-status]");
      if (status) status.textContent = copied ? "分析边界摘要已复制。" : "复制失败，请手动选择摘要。";
    });
  }

  const progress = document.querySelector("[data-ck159-progress]");
  if (progress) {
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const value = distance <= 0 ? 100 : Math.min(100, Math.max(0, (window.scrollY / distance) * 100));
      progress.value = Math.round(value);
    };
    updateProgress();
    addEventListener("scroll", updateProgress, { passive: true });
    addEventListener("resize", updateProgress);
  }

  const routeForm = document.querySelector("[data-ck159-route-form]");
  if (routeForm) {
    routeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = routeForm.querySelector("[data-ck159-clue]");
      const output = routeForm.querySelector("[data-ck159-route-status]");
      const normalizedClue = input.value.normalize("NFKC");
      const clue = normalizedClue.trim().replace(/\s+/g, " ");
      output.replaceChildren();
      if (!clue || Array.from(clue).length > 80 || /[\p{Cc}\p{Cf}]/u.test(normalizedClue)) {
        output.textContent = "请输入 1–80 个可见字符。";
        return;
      }
      let page = "index.html";
      let label = "封棋局面室";
      if (/批注|文章|阅读|半回合|评估/u.test(clue)) {
        page = "article.html";
        label = "六则批注";
      } else if (/谱线|校样|工具|报告|摆幅/u.test(clue)) {
        page = "tool.html";
        label = "谱线校样台";
      } else if (/边界|责任|规则|隐私|安全/u.test(clue)) {
        page = "legal.html";
        label = "六项分析边界";
      }
      const link = document.createElement("a");
      link.href = page;
      link.textContent = `前往${label} ↗`;
      output.append("本地推荐：", link);
    });
  }

  const form = document.querySelector("[data-ck159-form]");
  if (!form) return;

  const recordsInput = form.querySelector("[data-ck159-records]");
  const swingInput = form.querySelector("[data-ck159-swing]");
  const depthInput = form.querySelector("[data-ck159-depth]");
  const errorOutput = form.querySelector("[data-ck159-error]");
  const formStatus = form.querySelector("[data-ck159-form-status]");
  const report = document.querySelector("[data-ck159-report]");
  const stateOutput = report.querySelector("[data-ck159-state]");
  const preview = report.querySelector("[data-ck159-preview]");
  const findingsSummary = document.querySelector("[data-ck159-findings-summary]");
  const findingsList = document.querySelector("[data-ck159-findings]");
  const recordList = document.querySelector("[data-ck159-record-list]");
  const copyReport = document.querySelector("[data-ck159-copy-report]");
  const copyReportStatus = document.querySelector("[data-ck159-copy-report-status]");
  const metricElements = new Map(
    [...document.querySelectorAll("[data-ck159-metric]")].map((item) => [item.dataset.ck159Metric, item])
  );
  let fullReport = "";

  const presets = {
    clear: "MAIN | 1 | 白 | e2 | e4 | 20 | 封存\nMAIN | 2 | 黑 | e7 | e5 | 10 | 封存\nMAIN | 3 | 白 | g1 | f3 | 25 | 复核\nALT | 1 | 白 | d2 | d4 | 15 | 封存\nALT | 2 | 黑 | d7 | d5 | 5 | 复核",
    swing: "CC | 1 | 白 | e2 | e4 | 0 | 封存\nCC | 2 | 黑 | e7 | e5 | 200 | 封存\nCC | 3 | 白 | g1 | f3 | 150 | 复核",
    order: "EE | 1 | 白 | e2 | e4 | 0 | 封存\nEE | 3 | 白 | g1 | f3 | 10 | 封存\nFF | 2 | 黑 | d7 | d5 | 5 | 复核\nFF | 3 | 白 | c2 | c4 | 8 | 封存",
    turn: "GG | 1 | 黑 | e2 | e4 | 0 | 封存\nGG | 2 | 白 | e7 | e5 | 10 | 复核",
    mixed: "HH | 1 | 黑 | e2 | e4 | 0 | 草析\nHH | 3 | 白 | g1 | f3 | 500 | 封存\nII | 1 | 白 | d2 | d4 | 20 | 草析"
  };

  const resetReport = (message = "输入已变更，请重新生成谱线报告。") => {
    fullReport = "";
    report.dataset.ck159Ready = "false";
    stateOutput.textContent = "UNSET";
    preview.replaceChildren(Object.assign(document.createElement("em"), { textContent: "等待谱线记录" }));
    metricElements.forEach((item) => { item.textContent = "0"; });
    findingsSummary.textContent = "尚未校样";
    findingsList.replaceChildren(Object.assign(document.createElement("li"), {
      textContent: "生成报告后，这里会列出次序、行棋方、摆幅、深度与草析提示。"
    }));
    recordList.replaceChildren();
    copyReport.disabled = true;
    copyReportStatus.textContent = "";
    errorOutput.textContent = "";
    formStatus.textContent = message;
  };

  const fail = (message) => {
    resetReport("请修正输入后重新生成。 ");
    stateOutput.textContent = "INPUT ERROR";
    errorOutput.textContent = message;
    errorOutput.focus();
  };

  const codePointLength = (value) => Array.from(value).length;
  const parseUnsigned = (value, minimum, maximum, label) => {
    const normalized = value.trim();
    if (!/^(?:0|[1-9]\d*)$/.test(normalized)) throw new Error(`${label}必须是 ${minimum}–${maximum} 的普通无符号整数，不能含前导零、小数或指数。`);
    const number = Number(normalized);
    if (!Number.isSafeInteger(number) || number < minimum || number > maximum) throw new Error(`${label}必须在 ${minimum}–${maximum} 之间。`);
    return number;
  };

  const parseRecords = () => {
    const raw = recordsInput.value;
    if (codePointLength(raw) > 8000) throw new Error("谱线记录最多 8000 个 Unicode 字符。");
    const lines = raw.split(/\r?\n/).filter((line) => line.trim());
    if (lines.length < 2 || lines.length > 80) throw new Error("请输入 2–80 行非空谱线记录。");
    const seen = new Set();
    return lines.map((line, index) => {
      const fields = line.split("|");
      if (fields.length !== 7) throw new Error(`第 ${index + 1} 行必须正好包含 7 个字段。`);
      const [lineRaw, plyRaw, sideRaw, fromRaw, toRaw, evalRaw, stateRaw] = fields.map((field) => field.trim());
      if (fields.some((field) => !field.trim())) throw new Error(`第 ${index + 1} 行存在空字段。`);

      const normalizedLineRaw = lineRaw.normalize("NFKC");
      const lineName = normalizedLineRaw.trim().replace(/\s+/g, " ");
      if (codePointLength(lineName) < 2 || codePointLength(lineName) > 20 || /[\p{Cc}\p{Cf}]/u.test(normalizedLineRaw)) {
        throw new Error(`第 ${index + 1} 行的谱线名须为 2–20 个可见字符。`);
      }
      const plyText = plyRaw.trim();
      if (!/^[1-9]\d*$/.test(plyText)) throw new Error(`第 ${index + 1} 行的半回合须为 1–300 的普通无符号整数。`);
      const ply = Number(plyText);
      if (!Number.isSafeInteger(ply) || ply > 300) throw new Error(`第 ${index + 1} 行的半回合须在 1–300 之间。`);

      const side = sideRaw.normalize("NFKC").trim();
      if (side !== "白" && side !== "黑") throw new Error(`第 ${index + 1} 行的行棋方只能是“白”或“黑”。`);
      const from = fromRaw.normalize("NFKC").trim().toLowerCase();
      const to = toRaw.normalize("NFKC").trim().toLowerCase();
      if (!/^[a-h][1-8]$/.test(from) || !/^[a-h][1-8]$/.test(to) || from === to) {
        throw new Error(`第 ${index + 1} 行须使用 a1–h8 的不同起止格位。`);
      }

      const evaluationText = evalRaw.trim();
      if (!/^(?:0|[1-9]\d*|-[1-9]\d*)$/.test(evaluationText)) {
        throw new Error(`第 ${index + 1} 行的评估须为 -9999–9999 的普通整数。`);
      }
      const evaluation = Number(evaluationText);
      if (!Number.isSafeInteger(evaluation) || evaluation < -9999 || evaluation > 9999) {
        throw new Error(`第 ${index + 1} 行的评估须在 -9999–9999 之间。`);
      }
      const state = stateRaw.normalize("NFKC").trim();
      if (!["草析", "复核", "封存"].includes(state)) throw new Error(`第 ${index + 1} 行的状态只能是“草析”“复核”或“封存”。`);

      const normalizedId = lineName.toLocaleLowerCase();
      const identity = `${normalizedId}\u0000${ply}`;
      if (seen.has(identity)) throw new Error(`第 ${index + 1} 行与已有记录的“谱线 + 半回合”重复。`);
      seen.add(identity);
      return { source: index + 1, lineName, normalizedId, ply, side, from, to, evaluation, state };
    });
  };

  const analyse = (records, threshold, minimumDepth) => {
    const groups = new Map();
    records.forEach((record) => {
      if (!groups.has(record.normalizedId)) groups.set(record.normalizedId, []);
      groups.get(record.normalizedId).push(record);
    });
    groups.forEach((items) => items.sort((a, b) => a.ply - b.ply));
    const buckets = { order: [], turn: [], swing: [], depth: [], drafts: [] };
    let maxSwing = 0;

    groups.forEach((items) => {
      const lineName = items[0].lineName;
      if (items[0].ply !== 1) buckets.order.push(`${lineName} 从半回合 ${items[0].ply} 开始，应从 1 开始。`);
      for (let index = 1; index < items.length; index += 1) {
        const previous = items[index - 1];
        const current = items[index];
        if (current.ply !== previous.ply + 1) buckets.order.push(`${lineName} 在半回合 ${previous.ply} 与 ${current.ply} 之间不连续。`);
        const difference = Math.abs(current.evaluation - previous.evaluation);
        maxSwing = Math.max(maxSwing, difference);
        if (difference > threshold) buckets.swing.push(`${lineName} 的 ${previous.ply}→${current.ply} 摆幅为 ${difference} cp，超过 ${threshold} cp。`);
      }
      if (items.length < minimumDepth) buckets.depth.push(`${lineName} 只有 ${items.length} 条记录，低于最低 ${minimumDepth} 条。`);
    });

    records.forEach((record) => {
      const expected = record.ply % 2 === 1 ? "白" : "黑";
      if (record.side !== expected) buckets.turn.push(`${record.lineName} 半回合 ${record.ply} 应标为${expected}方，当前为${record.side}方。`);
      if (record.state === "草析") buckets.drafts.push(`${record.lineName} 半回合 ${record.ply} 仍处于草析状态。`);
    });

    const counts = Object.fromEntries(Object.entries(buckets).map(([key, items]) => [key, items.length]));
    const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
    const active = Object.entries(counts).filter(([, value]) => value > 0);
    const labels = { order: "ORDER FLAGS", turn: "TURN FLAGS", swing: "SWING FLAGS", depth: "DEPTH FLAGS", drafts: "STATUS FLAGS" };
    const state = total === 0 ? "NOTATION CLEAR" : active.length === 1 ? `${labels[active[0][0]]} ${active[0][1]}` : `REVIEW ${total}`;
    return { groups, buckets, counts, total, maxSwing, state };
  };

  const render = (records, threshold, minimumDepth, result) => {
    const sorted = [...records].sort((a, b) => a.normalizedId.localeCompare(b.normalizedId) || a.ply - b.ply);
    const allFindings = ["order", "turn", "swing", "depth", "drafts"].flatMap((key) => result.buckets[key]);
    const tones = ["#d7ff3f", "#7da8ff", "#ff543e", "#efece4"];
    const offsets = ["-5px", "7px", "-2px", "4px"];
    stateOutput.textContent = result.state;
    report.dataset.ck159Ready = "true";
    preview.replaceChildren();
    sorted.slice(0, 40).forEach((record, index) => {
      const move = document.createElement("span");
      move.className = "ck159-move";
      move.style.setProperty("--move-tone", tones[index % tones.length]);
      move.style.setProperty("--move-offset", offsets[index % offsets.length]);
      move.textContent = `${record.ply}.${record.side} ${record.from}→${record.to}`;
      preview.append(move);
    });
    if (sorted.length > 40) preview.append(Object.assign(document.createElement("em"), { textContent: `另有 ${sorted.length - 40} 条见完整报告` }));

    const metrics = {
      count: records.length,
      lines: result.groups.size,
      maxply: Math.max(...records.map((record) => record.ply)),
      maxswing: result.maxSwing,
      ...result.counts
    };
    Object.entries(metrics).forEach(([key, value]) => {
      const item = metricElements.get(key);
      if (item) item.textContent = String(value);
    });

    findingsSummary.textContent = allFindings.length ? `发现 ${allFindings.length} 项结构提示` : "谱线结构清晰";
    findingsList.replaceChildren();
    (allFindings.length ? allFindings.slice(0, 40) : ["未发现次序、行棋方、摆幅、深度或草析提示。"]).forEach((message) => {
      findingsList.append(Object.assign(document.createElement("li"), { textContent: message }));
    });
    if (allFindings.length > 40) findingsList.append(Object.assign(document.createElement("li"), { textContent: `另有 ${allFindings.length - 40} 项见完整报告。` }));

    recordList.replaceChildren();
    sorted.slice(0, 40).forEach((record, index) => {
      const item = document.createElement("article");
      item.className = "ck159-record";
      item.style.setProperty("--record-tone", tones[index % tones.length]);
      const heading = document.createElement("b");
      heading.textContent = `${record.lineName} / ${record.ply}`;
      const body = document.createElement("span");
      body.textContent = `${record.side}方 · ${record.from}→${record.to} · ${record.evaluation} cp`;
      const note = document.createElement("small");
      note.textContent = `${record.state} · 源行 #${record.source}`;
      item.append(heading, body, note);
      recordList.append(item);
    });

    const findingLines = allFindings.length ? allFindings.map((message, index) => `${index + 1}. ${message}`) : ["1. 未发现结构提示。"];
    const recordLines = sorted.map((record) => `${record.lineName} | ${record.ply} | ${record.side} | ${record.from} | ${record.to} | ${record.evaluation} | ${record.state}`);
    fullReport = [
      "封棋谱线校样报告",
      `结论：${result.state}`,
      `记录：${records.length}｜谱线：${result.groups.size}｜最大半回合：${metrics.maxply}｜最大摆幅：${result.maxSwing} cp`,
      `阈值：严格超过 ${threshold} cp 提示｜最低记录数：严格少于 ${minimumDepth} 条提示`,
      "",
      "结构提示",
      ...findingLines,
      "",
      "全部记录",
      ...recordLines,
      "",
      "能力边界：本报告只核对本地文本结构与算术关系，不验证合法着法、最佳着法、引擎来源、裁判决定或比赛结果。"
    ].join("\n");
    copyReport.disabled = false;
    errorOutput.textContent = "";
    formStatus.textContent = `报告已生成：${result.state}。`;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const threshold = parseUnsigned(swingInput.value, 0, 9999, "评估摆幅上限");
      const minimumDepth = parseUnsigned(depthInput.value, 1, 80, "最低记录数");
      const records = parseRecords();
      render(records, threshold, minimumDepth, analyse(records, threshold, minimumDepth));
    } catch (error) {
      fail(error instanceof Error ? error.message : "输入无法解析，请核对格式。");
    }
  });

  [recordsInput, swingInput, depthInput].forEach((input) => input.addEventListener("input", () => {
    if (report.dataset.ck159Ready === "true" || stateOutput.textContent === "INPUT ERROR") resetReport();
  }));

  form.addEventListener("reset", () => {
    requestAnimationFrame(() => {
      recordsInput.value = "";
      swingInput.value = "100";
      depthInput.value = "2";
      resetReport("已清空；等待新的谱线记录。");
    });
  });

  document.querySelectorAll("[data-ck159-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.ck159Preset;
      recordsInput.value = presets[key] || presets.clear;
      swingInput.value = "100";
      depthInput.value = "2";
      resetReport(`已载入“${button.textContent.trim()}”，请生成报告。`);
      recordsInput.focus();
    });
  });

  copyReport.addEventListener("click", async () => {
    if (!fullReport) return;
    const copied = await copyText(fullReport);
    copyReportStatus.textContent = copied ? "完整谱线报告已复制。" : "复制失败，请手动选择报告。";
  });
})();
