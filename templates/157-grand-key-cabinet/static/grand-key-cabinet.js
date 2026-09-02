(() => {
  "use strict";

  const root = document.documentElement;
  const sceneKey = "hq157-scene";
  const sceneButtons = document.querySelectorAll("[data-hq157-scene-toggle]");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  const applyScene = (scene) => {
    const night = scene === "night";
    root.dataset.hq157Scene = night ? "night" : "lobby";
    sceneButtons.forEach((button) => {
      button.textContent = night ? "日班" : "夜班";
      button.setAttribute("aria-pressed", String(night));
    });
    if (themeMeta) themeMeta.content = night ? "#100d14" : "#221923";
  };

  try {
    applyScene(window.localStorage.getItem(sceneKey) === "night" ? "night" : "lobby");
  } catch (_error) {
    applyScene("lobby");
  }

  sceneButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const next = root.dataset.hq157Scene === "night" ? "lobby" : "night";
      applyScene(next);
      try {
        window.localStorage.setItem(sceneKey, next);
      } catch (_error) {
        // The visible scene remains available when storage is blocked.
      }
    });
  });

  const menu = document.querySelector("[data-hq157-menu]");
  const openButton = document.querySelector("[data-hq157-menu-open]");
  const closeButton = document.querySelector("[data-hq157-menu-close]");
  if (menu && openButton && closeButton) {
    const closeMenu = () => {
      menu.hidden = true;
      openButton.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      openButton.focus();
    };
    openButton.addEventListener("click", () => {
      menu.hidden = false;
      openButton.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      closeButton.focus();
    });
    closeButton.addEventListener("click", closeMenu);
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      document.body.style.overflow = "";
    }));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !menu.hidden) closeMenu();
    });
  }

  const copyText = async (value) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const temporary = document.createElement("textarea");
    temporary.value = value;
    temporary.setAttribute("readonly", "");
    temporary.style.position = "fixed";
    temporary.style.opacity = "0";
    document.body.appendChild(temporary);
    temporary.select();
    const copied = document.execCommand("copy");
    temporary.remove();
    if (!copied) throw new Error("copy failed");
  };

  const bindCopy = (buttonSelector, valueFactory, statusSelector, successMessage) => {
    const button = document.querySelector(buttonSelector);
    const status = document.querySelector(statusSelector);
    if (!button || !status) return;
    button.addEventListener("click", async () => {
      try {
        await copyText(valueFactory(button));
        status.textContent = successMessage;
      } catch (_error) {
        status.textContent = "复制失败，请手动选择文字。";
      }
    });
  };

  bindCopy("[data-hq157-copy-code]", (button) => {
    const code = button.parentElement ? button.parentElement.querySelector("strong") : null;
    return code ? code.textContent.trim() : "";
  }, "[data-hq157-copy-status]", "柜号已复制。");

  bindCopy("[data-hq157-copy-summary]", () => [
    "六封礼宾交接信摘要",
    "1. 先确认编号、保管角色和授权用途。",
    "2. 借出与归还使用明确日期、时区和时刻。",
    "3. 核对序号连续、交接相撞和过长空档。",
    "4. 时长阈值是清单规则，不是安全结论。",
    "5. 完整交接证据、修改记录和工具局限。",
    "6. 安保、隐私、消防、设施和法律判断回到正式系统与专业人员。"
  ].join("\n"), "[data-hq157-summary-status]", "六封信摘要已复制。");

  bindCopy("[data-hq157-copy-policy]", () => "守则摘要：本模板只整理本地流转清单，不验证身份、授权、真实交接、安保、门禁、消防、设施、隐私、劳动或法律要求；敏感事件和高影响决定必须回到正式系统、现场预案与有权限的人员。", "[data-hq157-policy-status]", "守则摘要已复制。");

  const progress = document.querySelector("[data-hq157-progress]");
  if (progress) {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progress.value = scrollable > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / scrollable) * 100))) : 100;
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const form = document.querySelector("[data-hq157-form]");
  if (form) {
    const recordsInput = form.querySelector("[data-hq157-records]");
    const durationInput = form.querySelector("[data-hq157-duration]");
    const idleInput = form.querySelector("[data-hq157-idle]");
    const errorOutput = form.querySelector("[data-hq157-error]");
    const formStatus = form.querySelector("[data-hq157-form-status]");
    const stateOutput = document.querySelector("[data-hq157-state]");
    const preview = document.querySelector("[data-hq157-preview]");
    const report = document.querySelector("[data-hq157-report]");
    const copyReportButton = document.querySelector("[data-hq157-copy-report]");
    const copyStatus = document.querySelector("[data-hq157-copy-report-status]");
    const findingsSummary = document.querySelector("[data-hq157-findings-summary]");
    const findingsList = document.querySelector("[data-hq157-findings]");
    const recordList = document.querySelector("[data-hq157-record-list]");
    const metrics = Object.fromEntries(Array.from(document.querySelectorAll("[data-hq157-metric]")).map((node) => [node.dataset.hq157Metric, node]));
    const destinations = new Set(["客房", "前台", "工程", "安保", "仓储", "其他"]);
    const destinationColors = { "客房": "#cda858", "前台": "#b76d72", "工程": "#5d9b87", "安保": "#9c3f62", "仓储": "#8b7d70", "其他": "#7f6aa0" };
    const states = new Set(["草记", "核对", "封存"]);
    const forbiddenCharacters = /[\p{Cc}\p{Cf}]/u;
    const presets = {
      clear: "K-101 | 1 | 客房 | 08:00 | 09:00 | 封存\nK-101 | 2 | 客房 | 09:00 | 10:00 | 封存\nK-202 | 1 | 工程 | 10:30 | 11:15 | 核对\nK-202 | 2 | 前台 | 11:30 | 12:00 | 封存",
      custody: "K-301 | 1 | 客房 | 08:00 | 12:00 | 封存\nK-302 | 1 | 工程 | 10:00 | 14:00 | 核对\nK-303 | 1 | 安保 | 15:00 | 16:00 | 封存",
      sequence: "K-401 | 1 | 客房 | 08:00 | 09:00 | 封存\nK-401 | 3 | 前台 | 08:30 | 09:15 | 封存\nK-402 | 2 | 工程 | 10:00 | 11:00 | 核对",
      mixed: "K-501 | 1 | 客房 | 08:00 | 12:00 | 草记\nK-501 | 3 | 前台 | 11:00 | 12:00 | 封存\nK-502 | 2 | 工程 | 14:00 | 18:00 | 草记\nK-503 | 1 | 安保 | 19:00 | 19:45 | 核对"
    };
    let reportText = "";

    const lengthOf = (value) => Array.from(value).length;
    const addElement = (parent, tagName, value) => {
      const node = document.createElement(tagName);
      node.textContent = value;
      parent.appendChild(node);
      return node;
    };
    const parseInteger = (value, minimum, maximum, label) => {
      if (!/^(?:0|[1-9]\d*)$/u.test(value)) throw new Error(`${label}必须是无符号普通十进制整数。`);
      const parsed = Number(value);
      if (!Number.isSafeInteger(parsed) || parsed < minimum || parsed > maximum) throw new Error(`${label}必须在 ${minimum}–${maximum} 之间。`);
      return parsed;
    };
    const normalizeKey = (value, lineNumber) => {
      if (forbiddenCharacters.test(value)) throw new Error(`第 ${lineNumber} 行钥匙号不能包含控制或格式字符。`);
      const display = value.normalize("NFKC").trim().replace(/\s+/gu, " ");
      const length = lengthOf(display);
      if (length < 2 || length > 20) throw new Error(`第 ${lineNumber} 行钥匙号归一后必须为 2–20 个 Unicode 字符。`);
      return { display, key: display.toLocaleLowerCase("zh-Hans") };
    };
    const parseTime = (value, lineNumber, label) => {
      if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/u.test(value)) throw new Error(`第 ${lineNumber} 行${label}必须为 00:00–23:59 的 HH:MM。`);
      const [hour, minute] = value.split(":").map(Number);
      return { display: value, minute: hour * 60 + minute };
    };
    const parseRecords = () => {
      const raw = recordsInput.value;
      if (lengthOf(raw) > 8000) throw new Error("流转输入不能超过 8000 个 Unicode 字符。");
      const lines = raw.split(/\r?\n/u).filter((line) => line.trim() !== "");
      if (lines.length < 2 || lines.length > 80) throw new Error("请输入 2–80 条非空流转记录。");
      const identities = new Set();
      return lines.map((line, index) => {
        const lineNumber = index + 1;
        if (forbiddenCharacters.test(line)) throw new Error(`第 ${lineNumber} 行不能包含控制或格式字符。`);
        const fields = line.normalize("NFKC").split("|").map((field) => field.trim());
        if (fields.length !== 6 || fields.some((field) => field === "")) throw new Error(`第 ${lineNumber} 行必须恰好包含 6 个非空字段，并以 | 分隔。`);
        const keyId = normalizeKey(fields[0], lineNumber);
        const sequence = parseInteger(fields[1], 1, 9999, `第 ${lineNumber} 行序号`);
        const identity = `${keyId.key}|${sequence}`;
        if (identities.has(identity)) throw new Error(`第 ${lineNumber} 行钥匙号与序号组合归一后重复。`);
        identities.add(identity);
        if (!destinations.has(fields[2])) throw new Error(`第 ${lineNumber} 行去向不在允许清单内。`);
        const checkout = parseTime(fields[3], lineNumber, "借出时刻");
        const returned = parseTime(fields[4], lineNumber, "归还时刻");
        if (returned.minute <= checkout.minute) throw new Error(`第 ${lineNumber} 行归还必须严格晚于借出；跨日记录请拆分。`);
        if (!states.has(fields[5])) throw new Error(`第 ${lineNumber} 行状态只能是草记、核对或封存。`);
        return { lineNumber, keyId: keyId.display, keyNorm: keyId.key, sequence, destination: fields[2], checkout: checkout.display, checkoutMinute: checkout.minute, returned: returned.display, returnedMinute: returned.minute, duration: returned.minute - checkout.minute, state: fields[5] };
      });
    };
    const renderPreview = (records) => {
      preview.replaceChildren();
      records.slice(0, 40).forEach((record) => {
        const slot = document.createElement("article");
        slot.className = "hq157-slot";
        slot.style.setProperty("--tone", destinationColors[record.destination]);
        addElement(slot, "b", record.keyId);
        addElement(slot, "span", `#${record.sequence}`);
        addElement(slot, "small", `${record.checkout}–${record.returned} · ${record.destination}`);
        preview.appendChild(slot);
      });
      if (records.length > 40) addElement(preview, "em", `另有 ${records.length - 40} 条流转保留在完整报告中。`);
    };
    const renderRecords = (records) => {
      recordList.replaceChildren();
      records.slice(0, 40).forEach((record) => {
        const card = document.createElement("article");
        card.className = "hq157-card";
        card.style.setProperty("--tone", destinationColors[record.destination]);
        addElement(card, "b", `${record.keyId} · #${record.sequence}`);
        addElement(card, "span", `${record.duration} min`);
        addElement(card, "small", `${record.destination} · ${record.checkout}–${record.returned} · ${record.state}`);
        recordList.appendChild(card);
      });
      if (records.length > 40) addElement(recordList, "p", `界面仅显示前 40 条；完整报告保留全部 ${records.length} 条。`);
    };
    const renderFindings = (custodyFindings, sequenceFindings, statusFindings) => {
      const all = [...custodyFindings, ...sequenceFindings, ...statusFindings];
      findingsList.replaceChildren();
      if (!all.length) {
        addElement(findingsList, "li", "未发现占用时长、序号连续、交接冲突、空档或草记状态提示。");
        findingsSummary.textContent = "交接清晰";
        return;
      }
      all.slice(0, 40).forEach((finding) => addElement(findingsList, "li", finding));
      if (all.length > 40) addElement(findingsList, "li", `另有 ${all.length - 40} 条提示保留在完整报告中。`);
      findingsSummary.textContent = `${all.length} 条待复核提示`;
    };
    const invalidate = () => {
      reportText = "";
      report.dataset.hq157Ready = "false";
      copyReportButton.disabled = true;
      copyStatus.textContent = "";
      formStatus.textContent = "输入已变化，请重新生成交接报告。";
    };

    document.querySelectorAll("[data-hq157-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.dataset.hq157Preset;
        recordsInput.value = presets[name];
        durationInput.value = name === "mixed" ? "90" : "180";
        idleInput.value = "60";
        errorOutput.textContent = "";
        invalidate();
        recordsInput.focus();
      });
    });
    [recordsInput, durationInput, idleInput].forEach((input) => input.addEventListener("input", invalidate));
    form.addEventListener("reset", () => {
      window.setTimeout(() => {
        errorOutput.textContent = "";
        stateOutput.textContent = "UNSET";
        preview.replaceChildren();
        addElement(preview, "em", "等待流转记录");
        invalidate();
        formStatus.textContent = "已清空重置，等待生成交接报告。";
      }, 0);
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      errorOutput.textContent = "";
      copyStatus.textContent = "";
      try {
        const records = parseRecords();
        const durationCeiling = parseInteger(durationInput.value, 1, 1440, "单次时长上限");
        const idleCeiling = parseInteger(idleInput.value, 0, 1440, "空置间隔上限");
        const custodyFindings = records.filter((record) => record.duration > durationCeiling).map((record) => `${record.keyId} #${record.sequence} 占用 ${record.duration} 分钟，严格超过上限 ${durationCeiling} 分钟。`);
        const groups = new Map();
        records.forEach((record) => {
          if (!groups.has(record.keyNorm)) groups.set(record.keyNorm, []);
          groups.get(record.keyNorm).push(record);
        });
        const sequenceFindings = [];
        let largestIdle = 0;
        groups.forEach((group) => {
          const ordered = [...group].sort((a, b) => a.sequence - b.sequence);
          if (ordered[0].sequence !== 1) sequenceFindings.push(`${ordered[0].keyId} 的最小序号为 ${ordered[0].sequence}，未从 1 开始。`);
          for (let index = 1; index < ordered.length; index += 1) {
            const previous = ordered[index - 1];
            const current = ordered[index];
            if (current.sequence !== previous.sequence + 1) sequenceFindings.push(`${current.keyId} 从序号 ${previous.sequence} 跳到 ${current.sequence}，序号不连续。`);
            if (current.checkoutMinute < previous.returnedMinute) {
              sequenceFindings.push(`${current.keyId} #${current.sequence} 于 ${current.checkout} 借出，早于上一笔 ${previous.returned} 归还，发生交接冲突。`);
            } else {
              const idle = current.checkoutMinute - previous.returnedMinute;
              largestIdle = Math.max(largestIdle, idle);
              if (idle > idleCeiling) sequenceFindings.push(`${current.keyId} #${previous.sequence} 到 #${current.sequence} 的空档 ${idle} 分钟严格超过上限 ${idleCeiling} 分钟。`);
            }
          }
        });
        const statusFindings = records.filter((record) => record.state === "草记").map((record) => `${record.keyId} #${record.sequence} 仍处于草记状态。`);
        const findingCount = custodyFindings.length + sequenceFindings.length + statusFindings.length;
        let state = "KEY CLEAR";
        if (custodyFindings.length && !sequenceFindings.length && !statusFindings.length) state = `CUSTODY FLAGS ${custodyFindings.length}`;
        else if (!custodyFindings.length && sequenceFindings.length && !statusFindings.length) state = `SEQUENCE FLAGS ${sequenceFindings.length}`;
        else if (!custodyFindings.length && !sequenceFindings.length && statusFindings.length) state = `STATUS FLAGS ${statusFindings.length}`;
        else if (findingCount) state = `REVIEW ${findingCount}`;
        const totalMinutes = records.reduce((sum, record) => sum + record.duration, 0);
        const longestDuration = records.reduce((maximum, record) => Math.max(maximum, record.duration), 0);

        metrics.count.textContent = String(records.length);
        metrics.keys.textContent = String(groups.size);
        metrics.minutes.textContent = String(totalMinutes);
        metrics.longest.textContent = `${longestDuration} min`;
        metrics.custody.textContent = String(custodyFindings.length);
        metrics.sequence.textContent = String(sequenceFindings.length);
        metrics.drafts.textContent = String(statusFindings.length);
        metrics.idle.textContent = `${largestIdle} min`;
        stateOutput.textContent = state;
        renderPreview(records);
        renderRecords(records);
        renderFindings(custodyFindings, sequenceFindings, statusFindings);

        const allFindings = [...custodyFindings, ...sequenceFindings, ...statusFindings];
        reportText = [
          "礼宾钥匙流转交接",
          `状态：${state}`,
          `记录数：${records.length}`,
          `钥匙数：${groups.size}`,
          `占用总分钟：${totalMinutes}`,
          `最长单次占用：${longestDuration} 分钟`,
          `单次时长上限：${durationCeiling} 分钟（等于通过）`,
          `最大空置间隔：${largestIdle} 分钟`,
          `空置间隔上限：${idleCeiling} 分钟（等于通过）`,
          `草记数：${statusFindings.length}`,
          "",
          "复核提示：",
          ...(allFindings.length ? allFindings.map((finding, index) => `${index + 1}. ${finding}`) : ["无"]),
          "",
          "流转清单：",
          ...records.map((record, index) => `${index + 1}. ${record.keyId} | #${record.sequence} | ${record.destination} | ${record.checkout}–${record.returned} | ${record.duration} 分钟 | ${record.state}`),
          "",
          "边界：结果仅用于本地清单整理，不构成身份授权、真实交接、门禁安保、消防设施、隐私劳动、保险事件或法律批准。"
        ].join("\n");
        report.dataset.hq157Ready = "true";
        copyReportButton.disabled = false;
        formStatus.textContent = `已生成：${state}。`;
      } catch (error) {
        reportText = "";
        report.dataset.hq157Ready = "false";
        copyReportButton.disabled = true;
        stateOutput.textContent = "INPUT ERROR";
        errorOutput.textContent = error instanceof Error ? error.message : "输入无法解析。";
        formStatus.textContent = "未生成，请修正输入。";
        errorOutput.focus();
      }
    });
    copyReportButton.addEventListener("click", async () => {
      if (!reportText) return;
      try {
        await copyText(reportText);
        copyStatus.textContent = "完整交接报告已复制。";
      } catch (_error) {
        copyStatus.textContent = "复制失败，请手动选择交接内容。";
      }
    });
  }

  const routeForm = document.querySelector("[data-hq157-route-form]");
  if (routeForm) {
    const clueInput = routeForm.querySelector("[data-hq157-clue]");
    const routeStatus = routeForm.querySelector("[data-hq157-route-status]");
    routeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const clue = clueInput.value.trim();
      const length = Array.from(clue).length;
      if (length < 1 || length > 80 || /[\p{Cc}\p{Cf}]/u.test(clue)) {
        routeStatus.textContent = "请输入 1–80 个不含控制或格式字符的 Unicode 线索。";
        return;
      }
      let href = "index.html";
      let label = "礼宾门厅";
      if (/信|文章|阅读|编号|时刻/u.test(clue)) {
        href = "article.html";
        label = "六封礼宾信";
      } else if (/交接|钥匙|流转|时长|序列|工具/u.test(clue)) {
        href = "tool.html";
        label = "钥匙交接台";
      } else if (/守则|责任|安全|隐私|法规|权利/u.test(clue)) {
        href = "legal.html";
        label = "六条礼宾守则";
      }
      routeStatus.replaceChildren();
      routeStatus.append("建议前往：");
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      routeStatus.appendChild(link);
    });
  }
})();
