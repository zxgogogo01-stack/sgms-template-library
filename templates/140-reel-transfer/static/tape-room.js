(() => {
  "use strict";

  const root = document.documentElement;
  const sideButton = document.querySelector("[data-tp140-side-toggle]");
  const copyStatuses = document.querySelectorAll("[data-tp140-copy-status]");
  const sideKey = "tp140-tape-box-side";
  const setText = (node, value) => { if (node) node.textContent = value; };
  const announceCopy = (message) => copyStatuses.forEach((node) => setText(node, message));
  const copyText = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (_) {
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.append(field);
      field.select();
      const copied = document.execCommand("copy");
      field.remove();
      return copied;
    }
  };

  const readSide = () => {
    try { return localStorage.getItem(sideKey) === "paper" ? "paper" : "oxide"; }
    catch (_) { return "oxide"; }
  };
  const applySide = (side) => {
    const oxide = side === "oxide";
    root.dataset.tp140Side = oxide ? "oxide" : "paper";
    if (sideButton) {
      sideButton.setAttribute("aria-pressed", String(oxide));
      sideButton.textContent = oxide ? "翻到纸盒" : "返回氧化带面";
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = oxide ? "#381d17" : "#e9dbc3";
  };
  applySide(readSide());
  sideButton?.addEventListener("click", () => {
    const next = root.dataset.tp140Side === "oxide" ? "paper" : "oxide";
    applySide(next);
    try { localStorage.setItem(sideKey, next); } catch (_) { /* mode still changes */ }
  });

  const progress = document.querySelector(".tp140-read-progress");
  if (progress) {
    let queued = false;
    const updateProgress = () => {
      const height = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const measured = Math.min(100, Math.round((window.scrollY / height) * 100));
      const value = measured >= 95 ? 100 : measured;
      progress.value = value;
      progress.setAttribute("value", String(value));
      queued = false;
    };
    window.addEventListener("scroll", () => {
      if (!queued) {
        queued = true;
        window.requestAnimationFrame(updateProgress);
      }
    }, { passive: true });
    updateProgress();
  }

  document.querySelector("[data-tp140-copy-note]")?.addEventListener("click", async () => {
    const text = [
      "开盘磁带转录札记摘要",
      "1. 来源记录应区分可见标记、已核实事实与未知信息。",
      "2. 卷长和走带速度只用于容量数学，实际速度与轨制须另行确认。",
      "3. 介质检查、清洁、处理、修复和回放属于独立专业判断。",
      "4. 原始采集与处理版本应分开保存，并记录采集链与变更。",
      "5. 交接应包含来源、设备、参数、文件、校验、异常、权利和责任人。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "转录摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const boxes = Array.from(document.querySelectorAll(".tp140-box-list details"));
  boxes.forEach((box) => box.addEventListener("toggle", () => {
    if (!box.open) return;
    boxes.forEach((peer) => { if (peer !== box) peer.open = false; });
  }));
  document.querySelector("[data-tp140-copy-policy]")?.addEventListener("click", async () => {
    const text = [
      "磁带转录责任边界摘要",
      "页面不鉴定介质、历史处理或可播放状态。",
      "网页不核验回放设备、磁头、轨制、速度、校准或采集链。",
      "页面不判断转录、处理、音质、文件完整性、备份或存储制度。",
      "工具只计算用户输入的卷长、速度、节目秒数、预留秒数和文档状态。",
      "版权、隐私、操作与安全责任必须由对应责任人确认。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "边界摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const searchForm = document.querySelector("[data-tp140-search]");
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = searchForm.querySelector("#tp140-clue");
    const status = searchForm.querySelector("[data-tp140-search-status]");
    const clue = input.value.trim();
    const length = Array.from(clue).length;
    if (!length) { setText(status, "请输入来源、容量或权利边界线索。"); return; }
    if (length > 80) { setText(status, "线索最多 80 个字符，请缩短后再扫描。"); return; }
    const routes = [
      { terms: ["来源", "磁带", "速度", "检查", "转录", "交接"], page: "article.html", label: "转录札记" },
      { terms: ["时长", "容量", "计算", "卷盘", "预留", "预算"], page: "tool.html", label: "卷盘时长表" },
      { terms: ["版权", "隐私", "设备", "校准", "安全", "边界", "权利"], page: "legal.html", label: "责任边界" }
    ];
    const route = routes.find((item) => item.terms.some((term) => clue.includes(term))) || { page: "index.html", label: "转录室首页" };
    setText(status, `已匹配“${route.label}”，正在倒带。`);
    window.setTimeout(() => window.location.assign(route.page), 350);
  });

  const reelForm = document.querySelector("[data-tp140-reel-form]");
  if (!reelForm) return;
  const input = reelForm.querySelector("#tp140-rows");
  const errorNode = reelForm.querySelector("[data-tp140-error]");
  const formStatus = reelForm.querySelector("[data-tp140-form-status]");
  const report = document.querySelector(".tp140-reel-report");
  const q = (selector) => report.querySelector(selector);
  const stateNode = q("[data-tp140-report-state]");
  const peakNode = q("[data-tp140-peak]");
  const peakLabelNode = q("[data-tp140-peak-label]");
  const dialNode = q("[data-tp140-dial]");
  const reelCountNode = q("[data-tp140-reel-count]");
  const plannedTotalNode = q("[data-tp140-planned-total]");
  const durationCountNode = q("[data-tp140-duration-count]");
  const statusCountNode = q("[data-tp140-status-count]");
  const findingSummary = q("[data-tp140-finding-summary]");
  const findingList = q("[data-tp140-finding-list]");
  const reelSummary = q("[data-tp140-reel-summary]");
  const reelList = q("[data-tp140-reel-list]");
  const copyButton = q("[data-tp140-copy-report]");
  const lengthPattern = /^(?:0\.[1-9]|[1-9]\d{0,3}(?:\.\d)?|10000(?:\.0)?)$/;
  const speedPattern = /^(?:0\.(?:0[1-9]|[1-9]\d?)|[1-9]\d?(?:\.\d{1,2})?|100(?:\.0{1,2})?)$/;
  const plainIntegerPattern = /^(?:0|[1-9]\d*)$/;
  const validStatuses = new Set(["草案", "校准", "锁定"]);
  const presets = {
    clear: "母带 A | 550.0 | 19.05 | 1200 | 120 | 锁定\n访谈 B | 366.0 | 9.53 | 1800 | 60 | 锁定",
    near: "讲座 C | 90.0 | 10.00 | 780 | 30 | 锁定\n素材 D | 240.0 | 20.00 | 600 | 60 | 锁定",
    multi: "演出 E | 60.0 | 10.00 | 650 | 0 | 锁定\n口述 F | 90.0 | 10.00 | 780 | 30 | 锁定",
    review: "演出 G | 60.0 | 10.00 | 650 | 0 | 草案\n访谈 H | 240.0 | 20.00 | 600 | 60 | 校准"
  };
  let currentReport = "";

  const normalizeName = (name) => name.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("zh-CN");
  const parseTenths = (value) => {
    const [whole, decimal = "0"] = value.split(".");
    return BigInt(whole) * 10n + BigInt(decimal);
  };
  const parseHundredths = (value) => {
    const [whole, decimal = ""] = value.split(".");
    return BigInt(whole) * 100n + BigInt(decimal.padEnd(2, "0") || "0");
  };
  const parseBoundedInteger = (text, min, max, message) => {
    if (!plainIntegerPattern.test(text)) throw new Error(message);
    const value = BigInt(text);
    if (value < min || value > max) throw new Error(message);
    return value;
  };
  const formatTenths = (value) => `${value / 10n}.${value % 10n}`;
  const formatHundredths = (value) => `${value / 100n}.${String(value % 100n).padStart(2, "0")}`;
  const formatPercent = (part, whole) => {
    const scaled = (part * 10000n + whole / 2n) / whole;
    return `${scaled / 100n}.${String(scaled % 100n).padStart(2, "0")}%`;
  };
  const formatClock = (seconds) => {
    const hours = seconds / 3600n;
    const minutes = (seconds % 3600n) / 60n;
    const rest = seconds % 60n;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
  };

  const resetReport = (message = "等待至少两只卷盘记录。") => {
    currentReport = "";
    report.dataset.ready = "false";
    setText(stateNode, "UNSET");
    setText(peakNode, "—");
    setText(peakLabelNode, "等待计算");
    dialNode.style.setProperty("--tp140-turn", "0deg");
    setText(reelCountNode, "0");
    setText(plannedTotalNode, "0");
    setText(durationCountNode, "0");
    setText(statusCountNode, "0");
    setText(findingSummary, "等待计算");
    findingList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "报告生成后显示接近/超出容量和文档状态提示。" }));
    setText(reelSummary, "等待计算");
    reelList.replaceChildren(Object.assign(document.createElement("p"), { textContent: "等待卷盘记录。" }));
    copyButton.disabled = true;
    setText(formStatus, message);
    announceCopy("");
  };
  const fail = (message) => {
    setText(errorNode, message);
    resetReport("输入未通过校核，报告未生成。");
  };

  const parseRows = (raw) => {
    if (Array.from(raw).length > 6000) throw new Error("全部输入最多 6000 个字符。");
    const lines = raw.split(/\r?\n/u).map((line) => line.trim()).filter(Boolean);
    if (lines.length < 2) throw new Error("请至少输入 2 只卷盘。");
    if (lines.length > 100) throw new Error("一次最多计算 100 只卷盘。");
    const exact = new Set();
    const normalized = new Set();
    return lines.map((line, index) => {
      const fields = line.split("|").map((field) => field.trim());
      const row = index + 1;
      if (fields.length !== 6) throw new Error(`第 ${row} 行须包含 6 项，并以 | 分隔。`);
      const [name, lengthText, speedText, programText, leaderText, status] = fields;
      const nameLength = Array.from(name).length;
      if (nameLength < 2 || nameLength > 24) throw new Error(`第 ${row} 行卷标须为 2–24 个字符。`);
      if (/\p{Cc}|\p{Cf}/u.test(name)) throw new Error(`第 ${row} 行卷标含不可见控制字符。`);
      if (exact.has(name)) throw new Error(`第 ${row} 行卷标与前文完全重复：${name}。`);
      exact.add(name);
      const key = normalizeName(name);
      if (normalized.has(key)) throw new Error(`第 ${row} 行卷标规范化后重复：${name}。`);
      normalized.add(key);
      if (!lengthPattern.test(lengthText)) throw new Error(`第 ${row} 行长度须为 0.1–10000.0 米、最多一位小数的普通数字。`);
      if (!speedPattern.test(speedText)) throw new Error(`第 ${row} 行速度须为 0.01–100.00 cm/s、最多两位小数的普通数字。`);
      const program = parseBoundedInteger(programText, 1n, 86400n, `第 ${row} 行节目秒数须为 1–86400 的普通十进制整数。`);
      const leader = parseBoundedInteger(leaderText, 0n, 3600n, `第 ${row} 行预留秒数须为 0–3600 的普通十进制整数。`);
      if (!validStatuses.has(status)) throw new Error(`第 ${row} 行状态只能是“草案”“校准”或“锁定”。`);
      const lengthTenths = parseTenths(lengthText);
      const speedHundredths = parseHundredths(speedText);
      const capacityNumerator = lengthTenths * 1000n;
      const capacityFloor = capacityNumerator / speedHundredths;
      const planned = program + leader;
      const plannedScaled = planned * speedHundredths;
      const ratio = formatPercent(plannedScaled, capacityNumerator);
      const exceeded = plannedScaled > capacityNumerator;
      const near = !exceeded && plannedScaled * 100n >= capacityNumerator * 90n;
      return { name, lengthTenths, speedHundredths, program, leader, status, capacityNumerator, capacityFloor, planned, plannedScaled, ratio, exceeded, near };
    });
  };

  const addLimited = (container, values, factory) => {
    const fragment = document.createDocumentFragment();
    values.slice(0, 40).forEach((value, index) => fragment.append(factory(value, index)));
    if (values.length > 40) {
      const more = document.createElement(container.tagName === "UL" ? "li" : "p");
      more.textContent = `界面仅显示前 40 项，另有 ${values.length - 40} 项已写入复制报告。`;
      fragment.append(more);
    }
    container.replaceChildren(fragment);
  };

  const render = (reels) => {
    const durationFlags = reels.filter((reel) => reel.exceeded || reel.near);
    const statusFlags = reels.filter((reel) => reel.status !== "锁定");
    const findings = [
      ...durationFlags.map((reel) => reel.exceeded
        ? `${reel.name}：计划 ${reel.planned} 秒，超出按用户输入卷长与速度换算的容量 ${formatClock(reel.capacityFloor)}。`
        : `${reel.name}：计划占用达到换算容量的 ${reel.ratio}，请复核长度、速度、节目与预留。`),
      ...statusFlags.map((reel) => `${reel.name}：当前状态为“${reel.status}”，尚未记录为锁定。`)
    ];
    let state = "TAPE CLEAR";
    if (durationFlags.length && statusFlags.length) state = `REVIEW ${findings.length}`;
    else if (durationFlags.length) state = `CAPACITY FLAGS ${durationFlags.length}`;
    else if (statusFlags.length) state = `STATUS FLAGS ${statusFlags.length}`;
    const peak = reels.reduce((best, reel) => !best || reel.plannedScaled * best.capacityNumerator > best.plannedScaled * reel.capacityNumerator ? reel : best, null);
    const peakRatio = formatPercent(peak.plannedScaled, peak.capacityNumerator);
    const turn = Math.min(360, Number(peak.plannedScaled * 36000n / peak.capacityNumerator) / 100);
    const totalPlanned = reels.reduce((sum, reel) => sum + reel.planned, 0n);
    const totalCapacityFloor = reels.reduce((sum, reel) => sum + reel.capacityFloor, 0n);

    report.dataset.ready = "true";
    setText(stateNode, state);
    setText(peakNode, peakRatio);
    setText(peakLabelNode, `${peak.name} · 最高计划占用`);
    dialNode.style.setProperty("--tp140-turn", `${turn.toFixed(2)}deg`);
    setText(reelCountNode, String(reels.length));
    setText(plannedTotalNode, String(totalPlanned));
    setText(durationCountNode, String(durationFlags.length));
    setText(statusCountNode, String(statusFlags.length));
    setText(findingSummary, findings.length ? `${findings.length} 项交接提示` : "没有容量或未锁定状态提示");
    addLimited(findingList, findings.length ? findings : ["全部计划低于换算容量的 90%，且状态均为锁定。"], (finding) => Object.assign(document.createElement("li"), { textContent: finding }));
    setText(reelSummary, `${reels.length} 只卷盘 · 逐卷取整容量合计 ${formatClock(totalCapacityFloor)}`);
    addLimited(reelList, reels, (reel) => {
      const card = document.createElement("article");
      card.className = "tp140-reel-card";
      const title = document.createElement("b");
      const detail = document.createElement("span");
      const ratio = document.createElement("strong");
      title.textContent = `${reel.name} · ${reel.status}`;
      detail.textContent = `${formatTenths(reel.lengthTenths)} m / ${formatHundredths(reel.speedHundredths)} cm/s · 容量 ${formatClock(reel.capacityFloor)} · 计划 ${reel.program}+${reel.leader} s`;
      ratio.textContent = reel.ratio;
      card.append(title, detail, ratio);
      return card;
    });

    currentReport = [
      "卷盘容量报告",
      `状态：${state}`,
      `最高计划占用：${peak.name} / ${peakRatio}`,
      `卷盘：${reels.length}`,
      `计划秒数合计：${totalPlanned}`,
      `逐卷容量向下取整合计：${formatClock(totalCapacityFloor)}`,
      `容量提示：${durationFlags.length}`,
      `状态提示：${statusFlags.length}`,
      "",
      "逐卷预算：",
      ...reels.map((reel, index) => `${index + 1}. ${reel.name} | ${formatTenths(reel.lengthTenths)} m | ${formatHundredths(reel.speedHundredths)} cm/s | 节目 ${reel.program} s | 预留 ${reel.leader} s | 容量 ${formatClock(reel.capacityFloor)} | ${reel.ratio} | ${reel.status}`),
      "",
      "交接提示：",
      ...(findings.length ? findings.map((finding, index) => `${index + 1}. ${finding}`) : ["无。全部计划低于换算容量的 90%，且状态均为锁定。"]),
      "",
      "边界：报告只计算用户输入的卷长、速度、节目秒数、预留秒数与文档状态；不识别介质、卷径、轨制、方向、设备、校准、节目、文件、权利、存储或安全状态。"
    ].join("\n");
    copyButton.disabled = false;
    setText(formStatus, `已计算 ${reels.length} 只卷盘；容量只由用户输入的卷长与速度换算。`);
  };

  reelForm.querySelectorAll("[data-tp140-preset]").forEach((button) => button.addEventListener("click", () => {
    input.value = presets[button.dataset.tp140Preset];
    setText(errorNode, "");
    resetReport("示例已装载，请生成容量报告。");
    input.focus();
  }));
  input.addEventListener("input", () => {
    setText(errorNode, "");
    if (report.dataset.ready === "true") resetReport("输入已改变，请重新生成报告。");
  });
  reelForm.addEventListener("reset", () => window.setTimeout(() => {
    setText(errorNode, "");
    resetReport("报告已弹出，输入已恢复初始示例。");
  }, 0));
  reelForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setText(errorNode, "");
    announceCopy("");
    try { render(parseRows(input.value)); }
    catch (error) { fail(error instanceof Error ? error.message : "输入未通过校核。"); }
  });
  copyButton.addEventListener("click", async () => {
    if (!currentReport) return;
    announceCopy((await copyText(currentReport)) ? "完整报告已复制。" : "复制失败，请手动选择内容。");
  });
})();
