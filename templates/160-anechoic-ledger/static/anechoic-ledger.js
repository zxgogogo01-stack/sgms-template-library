(() => {
  "use strict";

  const root = document.documentElement;
  const modeKey = "ac160-mode";

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

  const storedMode = () => {
    try {
      return localStorage.getItem(modeKey);
    } catch (_error) {
      return null;
    }
  };

  const saveMode = (mode) => {
    try {
      localStorage.setItem(modeKey, mode);
    } catch (_error) {
      // Keep the selected mode for this page when browser storage is unavailable.
    }
  };

  const applyMode = (mode) => {
    const next = mode === "light" ? "light" : "dark";
    root.dataset.ac160Mode = next;
    const light = next === "light";
    document.querySelectorAll("[data-ac160-mode-toggle]").forEach((button) => {
      button.textContent = light ? "暗场" : "明场";
      button.setAttribute("aria-pressed", String(light));
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", light ? "#f4f0e8" : "#121214");
  };

  applyMode(storedMode());
  document.querySelectorAll("[data-ac160-mode-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = root.dataset.ac160Mode === "light" ? "dark" : "light";
      applyMode(next);
      saveMode(next);
    });
  });

  const codeButton = document.querySelector("[data-ac160-copy-code]");
  if (codeButton) {
    codeButton.addEventListener("click", async () => {
      const value = codeButton.closest("div")?.querySelector("strong")?.textContent?.trim() || "";
      const copied = value && (await copyText(value));
      const status = document.querySelector("[data-ac160-code-status]");
      if (status) status.textContent = copied ? "校准号已复制。" : "复制失败，请手动选择校准号。";
    });
  }

  const summaryButton = document.querySelector("[data-ac160-copy-summary]");
  if (summaryButton) {
    summaryButton.addEventListener("click", async () => {
      const summary = [...document.querySelectorAll(".ac160-bandnote")].map((note) => {
        const number = note.querySelector("header span")?.textContent?.trim() || "";
        const title = note.querySelector("h2")?.textContent?.replace(/\s+/g, " ").trim() || "";
        return `${number}｜${title}`;
      });
      const copied = await copyText(`六段听位摘要\n${summary.join("\n")}`);
      const status = document.querySelector("[data-ac160-summary-status]");
      if (status) status.textContent = copied ? "六段听位摘要已复制。" : "复制失败，请手动选择摘要。";
    });
  }

  const policyButton = document.querySelector("[data-ac160-copy-policy]");
  if (policyButton) {
    policyButton.addEventListener("click", async () => {
      const summary = [...document.querySelectorAll(".ac160-rules article")].map((rule) => {
        const title = rule.querySelector("header b")?.textContent?.trim() || "";
        const body = rule.querySelector("p")?.textContent?.replace(/\s+/g, " ").trim() || "";
        return `${title}：${body}`;
      });
      const copied = await copyText(`六项测量边界\n${summary.join("\n")}`);
      const status = document.querySelector("[data-ac160-policy-status]");
      if (status) status.textContent = copied ? "六项测量边界已复制。" : "复制失败，请手动选择摘要。";
    });
  }

  const progress = document.querySelector("[data-ac160-progress]");
  if (progress) {
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - innerHeight;
      const ratio = distance <= 0 ? 100 : Math.min(100, Math.max(0, scrollY / distance * 100));
      progress.value = Math.round(ratio);
    };
    updateProgress();
    addEventListener("scroll", updateProgress, { passive: true });
    addEventListener("resize", updateProgress);
  }

  const routeForm = document.querySelector("[data-ac160-route-form]");
  if (routeForm) {
    routeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = routeForm.querySelector("[data-ac160-clue]");
      const output = routeForm.querySelector("[data-ac160-route-status]");
      const normalized = input.value.normalize("NFKC");
      const clue = normalized.trim().replace(/\s+/g, " ");
      output.replaceChildren();
      if (!clue || Array.from(clue).length > 80 || /[\p{Cc}\p{Cf}]/u.test(normalized)) {
        output.textContent = "请输入 1–80 个可见字符。";
        return;
      }
      let href = "index.html";
      let label = "响应室";
      if (/听位|文章|阅读|频带|笔记/u.test(clue)) {
        href = "article.html";
        label = "六段听位";
      } else if (/漂移|工具|报告|左右|目标/u.test(clue)) {
        href = "tool.html";
        label = "响应漂移台";
      } else if (/边界|责任|隐私|安全|规则/u.test(clue)) {
        href = "legal.html";
        label = "六项测量边界";
      }
      const link = document.createElement("a");
      link.href = href;
      link.textContent = `前往${label} ↗`;
      output.append("本地推荐：", link);
    });
  }

  const form = document.querySelector("[data-ac160-form]");
  if (!form) return;

  const recordsInput = form.querySelector("[data-ac160-records]");
  const balanceInput = form.querySelector("[data-ac160-balance]");
  const targetInput = form.querySelector("[data-ac160-target]");
  const depthInput = form.querySelector("[data-ac160-depth]");
  const errorOutput = form.querySelector("[data-ac160-error]");
  const formStatus = form.querySelector("[data-ac160-form-status]");
  const report = document.querySelector("[data-ac160-report]");
  const stateOutput = report.querySelector("[data-ac160-state]");
  const plot = report.querySelector("[data-ac160-plot]");
  const findingsSummary = document.querySelector("[data-ac160-findings-summary]");
  const findingsList = document.querySelector("[data-ac160-findings]");
  const recordList = document.querySelector("[data-ac160-record-list]");
  const copyReportButton = report.querySelector("[data-ac160-copy-report]");
  const copyStatus = report.querySelector("[data-ac160-copy-status]");
  const metrics = new Map([...document.querySelectorAll("[data-ac160-metric]")].map((node) => [node.dataset.ac160Metric, node]));
  let completeReport = "";

  const presets = {
    clear: "ROOM A | 63 | -18.0 | -17.5 | -18.0 | 锁定\nROOM A | 250 | -17.0 | -17.5 | -18.0 | 锁定\nROOM A | 1000 | -18.5 | -18.0 | -18.0 | 复核\nROOM B | 63 | -18.0 | -18.0 | -18.0 | 锁定\nROOM B | 500 | -17.5 | -18.0 | -18.0 | 复核\nROOM B | 2000 | -18.0 | -17.0 | -18.0 | 锁定",
    balance: "ROOM C | 63 | -18.0 | -15.0 | -18.0 | 锁定\nROOM C | 250 | -18.0 | -17.5 | -18.0 | 复核",
    target: "ROOM D | 63 | -10.0 | -10.0 | -18.0 | 锁定\nROOM D | 250 | -18.0 | -18.0 | -18.0 | 复核",
    order: "ROOM E | 250 | -18.0 | -18.0 | -18.0 | 锁定\nROOM E | 63 | -17.5 | -18.0 | -18.0 | 复核",
    mixed: "ROOM X | 250 | -18.0 | -15.0 | -18.0 | 草测\nROOM X | 63 | -10.0 | -10.0 | -18.0 | 锁定\nROOM Y | 100 | -18.0 | -18.0 | -18.0 | 草测"
  };

  const codePointLength = (value) => Array.from(value).length;
  const formatTenths = (value) => (value / 10).toFixed(1);

  const parseUnsigned = (raw, minimum, maximum, label) => {
    const value = raw.trim();
    if (!/^(?:0|[1-9]\d*)$/.test(value)) throw new Error(`${label}必须是 ${minimum}–${maximum} 的普通无符号整数，不能含前导零、小数或指数。`);
    const number = Number(value);
    if (!Number.isSafeInteger(number) || number < minimum || number > maximum) throw new Error(`${label}必须在 ${minimum}–${maximum} 之间。`);
    return number;
  };

  const parseTenths = (raw, minimum, maximum, label, signed) => {
    const value = raw.trim();
    const signedPattern = /^(?:0(?:\.\d)?|[1-9]\d*(?:\.\d)?|-[1-9]\d*(?:\.\d)?)$/;
    const unsignedPattern = /^(?:0(?:\.\d)?|[1-9]\d*(?:\.\d)?)$/;
    if (!(signed ? signedPattern : unsignedPattern).test(value)) throw new Error(`${label}必须是 ${formatTenths(minimum)}–${formatTenths(maximum)} 的普通十进制数，最多一位小数。`);
    const number = Number(value);
    const tenths = Math.round(number * 10);
    if (!Number.isFinite(number) || tenths < minimum || tenths > maximum) throw new Error(`${label}必须在 ${formatTenths(minimum)}–${formatTenths(maximum)} 之间。`);
    return tenths;
  };

  const parseRecords = () => {
    const raw = recordsInput.value;
    if (codePointLength(raw) > 8000) throw new Error("频响记录最多 8000 个 Unicode 字符。");
    const lines = raw.split(/\r?\n/).filter((line) => line.trim());
    if (lines.length < 2 || lines.length > 80) throw new Error("请输入 2–80 行非空频响记录。");
    const identities = new Set();
    return lines.map((line, index) => {
      const fields = line.split("|");
      if (fields.length !== 6) throw new Error(`第 ${index + 1} 行必须正好包含 6 个字段。`);
      if (fields.some((field) => !field.trim())) throw new Error(`第 ${index + 1} 行存在空字段。`);
      const [roomRaw, frequencyRaw, leftRaw, rightRaw, targetRaw, stateRaw] = fields;
      const normalizedRoomRaw = roomRaw.normalize("NFKC");
      const room = normalizedRoomRaw.trim().replace(/\s+/g, " ");
      if (codePointLength(room) < 2 || codePointLength(room) > 20 || /[\p{Cc}\p{Cf}]/u.test(normalizedRoomRaw)) throw new Error(`第 ${index + 1} 行的房间名须为 2–20 个可见字符。`);
      const frequency = parseUnsigned(frequencyRaw, 20, 20000, `第 ${index + 1} 行频率`);
      const left = parseTenths(leftRaw, -1200, 240, `第 ${index + 1} 行左声道`, true);
      const right = parseTenths(rightRaw, -1200, 240, `第 ${index + 1} 行右声道`, true);
      const target = parseTenths(targetRaw, -1200, 240, `第 ${index + 1} 行目标`, true);
      const state = stateRaw.normalize("NFKC").trim();
      if (!["草测", "复核", "锁定"].includes(state)) throw new Error(`第 ${index + 1} 行的状态只能是“草测”“复核”或“锁定”。`);
      const normalizedId = room.toLocaleLowerCase();
      const identity = `${normalizedId}\u0000${frequency}`;
      if (identities.has(identity)) throw new Error(`第 ${index + 1} 行与已有记录的“房间 + 频率”重复。`);
      identities.add(identity);
      return { source: index + 1, room, normalizedId, frequency, left, right, target, state };
    });
  };

  const analyse = (records, balanceLimit, targetLimit, minimumDepth) => {
    const rooms = new Map();
    records.forEach((record) => {
      if (!rooms.has(record.normalizedId)) rooms.set(record.normalizedId, []);
      rooms.get(record.normalizedId).push(record);
    });
    const buckets = { order: [], balance: [], target: [], depth: [], drafts: [] };
    let maxBalance = 0;
    let maxDeviation = 0;
    rooms.forEach((items) => {
      for (let index = 1; index < items.length; index += 1) {
        if (items[index].frequency <= items[index - 1].frequency) buckets.order.push(`${items[index].room} 的 ${items[index - 1].frequency}→${items[index].frequency} Hz 未严格递增。`);
      }
      if (items.length < minimumDepth) buckets.depth.push(`${items[0].room} 只有 ${items.length} 个频带，低于最低 ${minimumDepth} 个。`);
    });
    records.forEach((record) => {
      const channelDifference = Math.abs(record.left - record.right);
      const targetDeviation = Math.max(Math.abs(record.left - record.target), Math.abs(record.right - record.target));
      maxBalance = Math.max(maxBalance, channelDifference);
      maxDeviation = Math.max(maxDeviation, targetDeviation);
      if (channelDifference > balanceLimit) buckets.balance.push(`${record.room} / ${record.frequency} Hz 的左右差为 ${formatTenths(channelDifference)} dB，超过 ${formatTenths(balanceLimit)} dB。`);
      if (targetDeviation > targetLimit) buckets.target.push(`${record.room} / ${record.frequency} Hz 的最大目标偏离为 ${formatTenths(targetDeviation)} dB，超过 ${formatTenths(targetLimit)} dB。`);
      if (record.state === "草测") buckets.drafts.push(`${record.room} / ${record.frequency} Hz 仍处于草测状态。`);
    });
    const counts = Object.fromEntries(Object.entries(buckets).map(([key, values]) => [key, values.length]));
    const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
    const active = Object.entries(counts).filter(([, count]) => count > 0);
    const labels = { order: "ORDER FLAGS", balance: "BALANCE FLAGS", target: "TARGET FLAGS", depth: "DEPTH FLAGS", drafts: "STATUS FLAGS" };
    const state = total === 0 ? "RESPONSE CLEAR" : active.length === 1 ? `${labels[active[0][0]]} ${active[0][1]}` : `REVIEW ${total}`;
    return { rooms, buckets, counts, total, maxBalance, maxDeviation, state };
  };

  const resetReport = (message = "输入已变更，请重新生成响应报告。") => {
    completeReport = "";
    report.dataset.ac160Ready = "false";
    stateOutput.textContent = "UNSET";
    plot.replaceChildren(Object.assign(document.createElement("em"), { textContent: "等待频响记录" }));
    metrics.forEach((node) => { node.textContent = "0"; });
    findingsSummary.textContent = "尚未校样";
    findingsList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "生成后将列出频率次序、左右平衡、目标偏离、采样深度与草测提示。" }));
    recordList.replaceChildren();
    copyReportButton.disabled = true;
    copyStatus.textContent = "";
    errorOutput.textContent = "";
    formStatus.textContent = message;
  };

  const fail = (message) => {
    resetReport("请修正输入后重新生成。");
    stateOutput.textContent = "INPUT ERROR";
    errorOutput.textContent = message;
    errorOutput.focus();
  };

  const render = (records, balanceLimit, targetLimit, minimumDepth, result) => {
    const sorted = [...records].sort((a, b) => a.normalizedId.localeCompare(b.normalizedId) || a.frequency - b.frequency);
    const allFindings = ["order", "balance", "target", "depth", "drafts"].flatMap((key) => result.buckets[key]);
    const tones = ["#c9f35b", "#b6a0ff", "#75dce2", "#ff6a3d"];
    report.dataset.ac160Ready = "true";
    stateOutput.textContent = result.state;
    plot.replaceChildren();
    sorted.slice(0, 40).forEach((record, index) => {
      const column = document.createElement("span");
      column.className = "ac160-column";
      const average = (record.left + record.right) / 2;
      const height = Math.round(Math.max(10, Math.min(100, 10 + (average + 1200) / 1440 * 90)));
      column.style.setProperty("--column-height", `${height}%`);
      column.style.setProperty("--column-tone", tones[index % tones.length]);
      column.title = `${record.room} / ${record.frequency} Hz`;
      plot.append(column);
    });
    if (sorted.length > 40) plot.append(Object.assign(document.createElement("em"), { textContent: `+${sorted.length - 40}` }));

    const values = {
      count: records.length,
      rooms: result.rooms.size,
      maxfreq: Math.max(...records.map((record) => record.frequency)),
      maxbalance: formatTenths(result.maxBalance),
      maxdeviation: formatTenths(result.maxDeviation),
      ...result.counts
    };
    Object.entries(values).forEach(([key, value]) => {
      const node = metrics.get(key);
      if (node) node.textContent = String(value);
    });

    findingsSummary.textContent = allFindings.length ? `发现 ${allFindings.length} 项漂移提示` : "响应记录结构清晰";
    findingsList.replaceChildren();
    (allFindings.length ? allFindings.slice(0, 40) : ["未发现频率次序、左右平衡、目标偏离、采样深度或草测提示。"]).forEach((message) => {
      findingsList.append(Object.assign(document.createElement("li"), { textContent: message }));
    });
    if (allFindings.length > 40) findingsList.append(Object.assign(document.createElement("li"), { textContent: `另有 ${allFindings.length - 40} 项见完整报告。` }));

    recordList.replaceChildren();
    sorted.slice(0, 40).forEach((record, index) => {
      const card = document.createElement("article");
      card.className = "ac160-reading";
      card.style.setProperty("--reading-tone", tones[index % tones.length]);
      const heading = document.createElement("b");
      heading.textContent = `${record.room} / ${record.frequency} Hz`;
      const numbers = document.createElement("span");
      numbers.textContent = `L ${formatTenths(record.left)} · R ${formatTenths(record.right)} · REF ${formatTenths(record.target)}`;
      const note = document.createElement("small");
      note.textContent = `${record.state} · 源行 #${record.source}`;
      card.append(heading, numbers, note);
      recordList.append(card);
    });

    const findingLines = allFindings.length ? allFindings.map((message, index) => `${index + 1}. ${message}`) : ["1. 未发现结构或漂移提示。"];
    const recordLines = sorted.map((record) => `${record.room} | ${record.frequency} | ${formatTenths(record.left)} | ${formatTenths(record.right)} | ${formatTenths(record.target)} | ${record.state}`);
    completeReport = [
      "消声响应漂移校样报告",
      `结论：${result.state}`,
      `记录：${records.length}｜房间：${result.rooms.size}｜最高频率：${values.maxfreq} Hz`,
      `最大左右差：${values.maxbalance} dB｜最大目标偏离：${values.maxdeviation} dB`,
      `阈值：左右差严格超过 ${formatTenths(balanceLimit)} dB、目标偏离严格超过 ${formatTenths(targetLimit)} dB 提示｜每房间严格少于 ${minimumDepth} 个频带提示`,
      "",
      "漂移提示",
      ...findingLines,
      "",
      "全部记录",
      ...recordLines,
      "",
      "能力边界：本报告只核对当前页面文本结构与十进制算术，不读取音频，不判断设备、房间、听感、声压级或听力安全。"
    ].join("\n");
    copyReportButton.disabled = false;
    errorOutput.textContent = "";
    formStatus.textContent = `报告已生成：${result.state}。`;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const balanceLimit = parseTenths(balanceInput.value, 0, 240, "左右差上限", false);
      const targetLimit = parseTenths(targetInput.value, 0, 240, "目标偏离上限", false);
      const minimumDepth = parseUnsigned(depthInput.value, 1, 80, "最低频带数");
      const records = parseRecords();
      render(records, balanceLimit, targetLimit, minimumDepth, analyse(records, balanceLimit, targetLimit, minimumDepth));
    } catch (error) {
      fail(error instanceof Error ? error.message : "输入无法解析，请核对格式。");
    }
  });

  [recordsInput, balanceInput, targetInput, depthInput].forEach((input) => input.addEventListener("input", () => {
    if (report.dataset.ac160Ready === "true" || stateOutput.textContent === "INPUT ERROR") resetReport();
  }));

  form.addEventListener("reset", () => {
    requestAnimationFrame(() => {
      recordsInput.value = "";
      balanceInput.value = "1.0";
      targetInput.value = "3.0";
      depthInput.value = "3";
      resetReport("控制台已清空；等待新的频响记录。");
    });
  });

  document.querySelectorAll("[data-ac160-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.ac160Preset;
      recordsInput.value = presets[key] || presets.clear;
      balanceInput.value = "1.0";
      targetInput.value = "3.0";
      depthInput.value = key === "clear" ? "3" : "2";
      if (key === "mixed") depthInput.value = "2";
      resetReport(`已载入“${button.textContent.trim()}”，请生成报告。`);
      recordsInput.focus();
    });
  });

  copyReportButton.addEventListener("click", async () => {
    if (!completeReport) return;
    const copied = await copyText(completeReport);
    copyStatus.textContent = copied ? "完整响应报告已复制。" : "复制失败，请手动选择报告。";
  });
})();
