(() => {
  "use strict";

  const root = document.documentElement;
  const storageKey = "sv156-mode";
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const modeButtons = document.querySelectorAll("[data-sv156-mode-toggle]");

  const applyMode = (mode) => {
    const dusk = mode === "dusk";
    root.dataset.sv156Mode = dusk ? "dusk" : "noon";
    modeButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(dusk));
      button.textContent = dusk ? "正午" : "入暮";
    });
    if (themeMeta) themeMeta.content = dusk ? "#14151d" : "#eee9df";
  };

  try {
    applyMode(window.localStorage.getItem(storageKey) === "dusk" ? "dusk" : "noon");
  } catch (_error) {
    applyMode("noon");
  }

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const next = root.dataset.sv156Mode === "dusk" ? "noon" : "dusk";
      applyMode(next);
      try {
        window.localStorage.setItem(storageKey, next);
      } catch (_error) {
        // The visible theme remains usable when storage is unavailable.
      }
    });
  });

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

  bindCopy("[data-sv156-copy-code]", (button) => {
    const code = button.parentElement ? button.parentElement.querySelector("strong") : null;
    return code ? code.textContent.trim() : "";
  }, "[data-sv156-copy-status]", "观测编号已复制。");

  bindCopy("[data-sv156-copy-summary]", () => [
    "六段日光观测摘要",
    "1. 先定义观察对象、来源和用途。",
    "2. 统一区域、朝向、单位与目标口径。",
    "3. 让同一区域的采样时刻严格递增。",
    "4. 用精确边界读取偏离，不把提示写成定论。",
    "5. 交接原始证据、修订和责任人。",
    "6. 把物理、设计、法规、安全与权利留给适当复核。"
  ].join("\n"), "[data-sv156-summary-status]", "六段摘要已复制。");

  bindCopy("[data-sv156-copy-policy]", () => "边界摘要：本模板只整理本地采样清单，不验证资料真实性、仪器校准、建筑物理、设计施工、法规安全或隐私权利；高影响决定必须回到现场证据、适用标准和具备权限的专业人员。", "[data-sv156-policy-status]", "边界摘要已复制。");

  const progress = document.querySelector("[data-sv156-progress]");
  if (progress) {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progress.value = scrollable > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / scrollable) * 100))) : 100;
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const form = document.querySelector("[data-sv156-form]");
  if (form) {
    const samplesInput = form.querySelector("[data-sv156-samples]");
    const minInput = form.querySelector("[data-sv156-min]");
    const maxInput = form.querySelector("[data-sv156-max]");
    const gapInput = form.querySelector("[data-sv156-gap]");
    const errorOutput = form.querySelector("[data-sv156-error]");
    const formStatus = form.querySelector("[data-sv156-form-status]");
    const stateOutput = document.querySelector("[data-sv156-state]");
    const preview = document.querySelector("[data-sv156-preview]");
    const result = document.querySelector("[data-sv156-result]");
    const copyReportButton = document.querySelector("[data-sv156-copy-report]");
    const copyStatus = document.querySelector("[data-sv156-copy-report-status]");
    const findingsSummary = document.querySelector("[data-sv156-findings-summary]");
    const findingsList = document.querySelector("[data-sv156-findings]");
    const sampleList = document.querySelector("[data-sv156-sample-list]");
    const metrics = Object.fromEntries(Array.from(document.querySelectorAll("[data-sv156-metric]")).map((node) => [node.dataset.sv156Metric, node]));
    const allowedDirections = new Set(["北", "东北", "东", "东南", "南", "西南", "西", "西北"]);
    const directionColors = { "北": "#6682ff", "东北": "#7c73e6", "东": "#f5c928", "东南": "#ef9e36", "南": "#ef7451", "西南": "#c65137", "西": "#a98bc0", "西北": "#6d5681" };
    const allowedStates = new Set(["草测", "复核", "归档"]);
    const forbiddenCharacters = /[\p{Cc}\p{Cf}]/u;
    const presets = {
      clear: "东廊 | 08:00 | 东 | 50000 | 1500 | 归档\n东廊 | 10:00 | 东 | 60000 | 2100 | 归档\n中庭 | 11:00 | 南 | 72000 | 2880 | 复核\n中庭 | 13:00 | 南 | 80000 | 3200 | 归档",
      band: "北厅 | 09:00 | 北 | 40000 | 400 | 归档\n北厅 | 11:00 | 北 | 50000 | 3000 | 归档\n南厅 | 12:00 | 南 | 80000 | 3200 | 复核\n南厅 | 14:00 | 南 | 70000 | 2450 | 归档",
      sequence: "展廊 | 10:00 | 西 | 60000 | 2400 | 归档\n展廊 | 09:30 | 西 | 52000 | 1820 | 归档\n天井 | 08:00 | 东南 | 45000 | 1350 | 复核\n天井 | 13:30 | 南 | 75000 | 3000 | 归档",
      mixed: "东翼 | 07:30 | 东 | 42000 | 420 | 草测\n东翼 | 12:00 | 东南 | 70000 | 4200 | 归档\n东翼 | 11:30 | 东 | 65000 | 1950 | 草测\n西翼 | 14:00 | 西 | 68000 | 2380 | 复核\n西翼 | 18:30 | 西 | 30000 | 2100 | 归档"
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
    const normalizeZone = (value, lineNumber) => {
      if (forbiddenCharacters.test(value)) throw new Error(`第 ${lineNumber} 行区域不能包含控制或格式字符。`);
      const display = value.normalize("NFKC").trim().replace(/\s+/gu, " ");
      const length = lengthOf(display);
      if (length < 2 || length > 20) throw new Error(`第 ${lineNumber} 行区域归一后必须为 2–20 个 Unicode 字符。`);
      return { display, key: display.toLocaleLowerCase("zh-Hans") };
    };
    const parseTime = (value, lineNumber) => {
      if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/u.test(value)) throw new Error(`第 ${lineNumber} 行时刻必须为 00:00–23:59 的 HH:MM。`);
      const [hour, minute] = value.split(":").map(Number);
      return { display: value, minute: hour * 60 + minute };
    };
    const parseSamples = () => {
      const raw = samplesInput.value;
      if (lengthOf(raw) > 8000) throw new Error("采样输入不能超过 8000 个 Unicode 字符。");
      const lines = raw.split(/\r?\n/u).filter((line) => line.trim() !== "");
      if (lines.length < 2 || lines.length > 80) throw new Error("请输入 2–80 条非空采样记录。");
      const identities = new Set();
      return lines.map((line, index) => {
        const lineNumber = index + 1;
        if (forbiddenCharacters.test(line)) throw new Error(`第 ${lineNumber} 行不能包含控制或格式字符。`);
        const fields = line.normalize("NFKC").split("|").map((field) => field.trim());
        if (fields.length !== 6 || fields.some((field) => field === "")) throw new Error(`第 ${lineNumber} 行必须恰好包含 6 个非空字段，并以 | 分隔。`);
        const zone = normalizeZone(fields[0], lineNumber);
        const time = parseTime(fields[1], lineNumber);
        const identity = `${zone.key}|${time.display}`;
        if (identities.has(identity)) throw new Error(`第 ${lineNumber} 行与已有记录的区域和时刻归一后重复。`);
        identities.add(identity);
        if (!allowedDirections.has(fields[2])) throw new Error(`第 ${lineNumber} 行朝向不在八方位清单内。`);
        const outside = parseInteger(fields[3], 1, 1000000, `第 ${lineNumber} 行外照度`);
        const inside = parseInteger(fields[4], 0, 1000000, `第 ${lineNumber} 行内照度`);
        if (!allowedStates.has(fields[5])) throw new Error(`第 ${lineNumber} 行状态只能是草测、复核或归档。`);
        return { lineNumber, zone: zone.display, zoneKey: zone.key, time: time.display, minute: time.minute, direction: fields[2], outside, inside, state: fields[5], factorRounded: Math.round((inside * 10000) / outside) };
      });
    };
    const renderPreview = (records) => {
      preview.replaceChildren();
      records.slice(0, 40).forEach((record) => {
        const ray = document.createElement("article");
        ray.className = "sv156-ray";
        ray.style.setProperty("--tone", directionColors[record.direction]);
        ray.style.setProperty("--reach", `${Math.min(100, Math.max(0, Math.round(record.factorRounded / 100)))}%`);
        addElement(ray, "b", record.zone);
        addElement(ray, "span", record.time);
        addElement(ray, "small", `${record.factorRounded} bp`);
        preview.appendChild(ray);
      });
      if (records.length > 40) addElement(preview, "em", `另有 ${records.length - 40} 条采样保留在完整报告中。`);
    };
    const renderSamples = (records) => {
      sampleList.replaceChildren();
      records.slice(0, 40).forEach((record) => {
        const card = document.createElement("article");
        card.className = "sv156-sample";
        card.style.setProperty("--tone", directionColors[record.direction]);
        addElement(card, "b", `${record.zone} · ${record.time}`);
        addElement(card, "span", `${record.factorRounded} bp`);
        addElement(card, "small", `${record.direction} · 外 ${record.outside} lx · 内 ${record.inside} lx · ${record.state}`);
        sampleList.appendChild(card);
      });
      if (records.length > 40) addElement(sampleList, "p", `界面仅显示前 40 条；完整报告保留全部 ${records.length} 条。`);
    };
    const renderFindings = (bandFindings, sequenceFindings, statusFindings) => {
      const all = [...bandFindings, ...sequenceFindings, ...statusFindings];
      findingsList.replaceChildren();
      if (!all.length) {
        addElement(findingsList, "li", "未发现照度因子带、时序间隔、朝向一致或草测状态提示。");
        findingsSummary.textContent = "采样序列清晰";
        return;
      }
      all.slice(0, 40).forEach((finding) => addElement(findingsList, "li", finding));
      if (all.length > 40) addElement(findingsList, "li", `另有 ${all.length - 40} 条提示保留在完整报告中。`);
      findingsSummary.textContent = `${all.length} 条待复核提示`;
    };
    const invalidate = () => {
      reportText = "";
      result.dataset.sv156Ready = "false";
      copyReportButton.disabled = true;
      copyStatus.textContent = "";
      formStatus.textContent = "输入已变化，请重新生成采光交接。";
    };

    document.querySelectorAll("[data-sv156-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.dataset.sv156Preset;
        samplesInput.value = presets[name];
        minInput.value = "250";
        maxInput.value = "500";
        gapInput.value = name === "mixed" ? "180" : "240";
        errorOutput.textContent = "";
        invalidate();
        samplesInput.focus();
      });
    });
    [samplesInput, minInput, maxInput, gapInput].forEach((input) => input.addEventListener("input", invalidate));
    form.addEventListener("reset", () => {
      window.setTimeout(() => {
        errorOutput.textContent = "";
        stateOutput.textContent = "UNSET";
        preview.replaceChildren();
        addElement(preview, "em", "等待采样序列");
        invalidate();
        formStatus.textContent = "已重置采样，等待生成采光交接。";
      }, 0);
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      errorOutput.textContent = "";
      copyStatus.textContent = "";
      try {
        const records = parseSamples();
        const minimum = parseInteger(minInput.value, 0, 10000, "因子下界");
        const maximum = parseInteger(maxInput.value, 0, 10000, "因子上界");
        const gapCeiling = parseInteger(gapInput.value, 1, 1440, "最大间隔");
        if (minimum > maximum) throw new Error("因子下界不能大于因子上界。");
        const bandFindings = [];
        records.forEach((record) => {
          const scaled = record.inside * 10000;
          if (scaled < record.outside * minimum) bandFindings.push(`${record.zone} ${record.time} 的照度因子 ${record.factorRounded}bp 严格低于下界 ${minimum}bp。`);
          else if (scaled > record.outside * maximum) bandFindings.push(`${record.zone} ${record.time} 的照度因子 ${record.factorRounded}bp 严格高于上界 ${maximum}bp。`);
        });
        const sequenceFindings = [];
        const zoneReferences = new Map();
        let largestGap = 0;
        records.forEach((record) => {
          const reference = zoneReferences.get(record.zoneKey);
          if (!reference) {
            zoneReferences.set(record.zoneKey, { direction: record.direction, previous: record });
            return;
          }
          if (record.direction !== reference.direction) sequenceFindings.push(`${record.zone} ${record.time} 的朝向“${record.direction}”与本区域首条“${reference.direction}”不一致。`);
          const difference = record.minute - reference.previous.minute;
          if (difference <= 0) sequenceFindings.push(`${record.zone} ${record.time} 未按录入顺序严格晚于上一时刻 ${reference.previous.time}。`);
          else {
            largestGap = Math.max(largestGap, difference);
            if (difference > gapCeiling) sequenceFindings.push(`${record.zone} 从 ${reference.previous.time} 到 ${record.time} 的间隔 ${difference} 分钟严格超过上限 ${gapCeiling} 分钟。`);
          }
          reference.previous = record;
        });
        const statusFindings = records.filter((record) => record.state === "草测").map((record) => `${record.zone} ${record.time} 仍处于草测状态。`);
        const totalFindings = bandFindings.length + sequenceFindings.length + statusFindings.length;
        let state = "SUNPATH CLEAR";
        if (bandFindings.length && !sequenceFindings.length && !statusFindings.length) state = `BAND FLAGS ${bandFindings.length}`;
        else if (!bandFindings.length && sequenceFindings.length && !statusFindings.length) state = `SEQUENCE FLAGS ${sequenceFindings.length}`;
        else if (!bandFindings.length && !sequenceFindings.length && statusFindings.length) state = `STATUS FLAGS ${statusFindings.length}`;
        else if (totalFindings) state = `REVIEW ${totalFindings}`;
        const insideCount = records.length - bandFindings.length;
        const outsideTotal = records.reduce((sum, record) => sum + record.outside, 0);
        const insideTotal = records.reduce((sum, record) => sum + record.inside, 0);
        const weightedFactor = Math.round((insideTotal * 10000) / outsideTotal);

        metrics.count.textContent = String(records.length);
        metrics.zones.textContent = String(zoneReferences.size);
        metrics.inside.textContent = String(insideCount);
        metrics.weighted.textContent = `${weightedFactor} bp`;
        metrics.band.textContent = String(bandFindings.length);
        metrics.sequence.textContent = String(sequenceFindings.length);
        metrics.drafts.textContent = String(statusFindings.length);
        metrics.largest.textContent = `${largestGap} min`;
        stateOutput.textContent = state;
        renderPreview(records);
        renderSamples(records);
        renderFindings(bandFindings, sequenceFindings, statusFindings);

        const allFindings = [...bandFindings, ...sequenceFindings, ...statusFindings];
        reportText = [
          "高窗采光序列交接",
          `状态：${state}`,
          `采样数：${records.length}`,
          `区域数：${zoneReferences.size}`,
          `因子区间：${minimum}–${maximum}bp（等于边界通过）`,
          `区间内：${insideCount}`,
          `加权照度因子：${weightedFactor}bp`,
          `最大允许间隔：${gapCeiling} 分钟`,
          `本次最长正向间隔：${largestGap} 分钟`,
          `草测数：${statusFindings.length}`,
          "",
          "复核提示：",
          ...(allFindings.length ? allFindings.map((finding, index) => `${index + 1}. ${finding}`) : ["无"]),
          "",
          "采样清单：",
          ...records.map((record, index) => `${index + 1}. ${record.zone} | ${record.time} | ${record.direction} | 外 ${record.outside}lx | 内 ${record.inside}lx | ${record.factorRounded}bp | ${record.state}`),
          "",
          "边界：结果仅用于本地清单整理，不构成资料真实性、仪器校准、建筑物理、眩光热工、设计施工、法规安全、隐私权利或专业批准。"
        ].join("\n");
        result.dataset.sv156Ready = "true";
        copyReportButton.disabled = false;
        formStatus.textContent = `已生成：${state}。`;
      } catch (error) {
        reportText = "";
        result.dataset.sv156Ready = "false";
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
        copyStatus.textContent = "完整采光交接已复制。";
      } catch (_error) {
        copyStatus.textContent = "复制失败，请手动选择交接内容。";
      }
    });
  }

  const routeForm = document.querySelector("[data-sv156-route-form]");
  if (routeForm) {
    const clueInput = routeForm.querySelector("[data-sv156-clue]");
    const routeStatus = routeForm.querySelector("[data-sv156-route-status]");
    routeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const clue = clueInput.value.trim();
      const length = Array.from(clue).length;
      if (length < 1 || length > 80 || /[\p{Cc}\p{Cf}]/u.test(clue)) {
        routeStatus.textContent = "请输入 1–80 个不含控制或格式字符的 Unicode 线索。";
        return;
      }
      let href = "index.html";
      let label = "光井首页";
      if (/观测|笔记|文章|口径|时刻/u.test(clue)) {
        href = "article.html";
        label = "六段观测";
      } else if (/照度|因子|采样|序列|工具|间隔/u.test(clue)) {
        href = "tool.html";
        label = "采样照度台";
      } else if (/责任|边界|法规|安全|隐私|权利/u.test(clue)) {
        href = "legal.html";
        label = "六个边界面";
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
