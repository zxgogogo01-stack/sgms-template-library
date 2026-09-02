(() => {
  "use strict";

  const root = document.documentElement;
  const heatKey = "fd158-heat";
  const heatButtons = document.querySelectorAll("[data-fd158-heat-toggle]");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  const applyHeat = (heat) => {
    const warm = heat === "warm";
    root.dataset.fd158Heat = warm ? "warm" : "cool";
    heatButtons.forEach((button) => {
      button.textContent = warm ? "冷案色" : "暖炉色";
      button.setAttribute("aria-pressed", String(warm));
    });
    if (themeMeta) themeMeta.content = warm ? "#291819" : "#f2e8ce";
  };

  try {
    applyHeat(window.localStorage.getItem(heatKey) === "warm" ? "warm" : "cool");
  } catch (_error) {
    applyHeat("cool");
  }

  heatButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const next = root.dataset.fd158Heat === "warm" ? "cool" : "warm";
      applyHeat(next);
      try {
        window.localStorage.setItem(heatKey, next);
      } catch (_error) {
        // The visible color mode remains usable when storage is unavailable.
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

  const bindCopy = (buttonSelector, valueFactory, statusSelector, message) => {
    const button = document.querySelector(buttonSelector);
    const status = document.querySelector(statusSelector);
    if (!button || !status) return;
    button.addEventListener("click", async () => {
      try {
        await copyText(valueFactory(button));
        status.textContent = message;
      } catch (_error) {
        status.textContent = "复制失败，请手动选择文字。";
      }
    });
  };

  bindCopy("[data-fd158-copy-code]", (button) => {
    const code = button.parentElement ? button.parentElement.querySelector("strong") : null;
    return code ? code.textContent.trim() : "";
  }, "[data-fd158-copy-status]", "工坊编号已复制。");

  bindCopy("[data-fd158-copy-summary]", () => [
    "折层六记摘要",
    "1. 先记录批次、折次、折法、温度、松弛与状态。",
    "2. 单折按三倍、双折按四倍建立内部层数模型。",
    "3. 温度使用有来源的闭区间，等于边界通过。",
    "4. 松弛时间按最低值复核，等于最低值通过。",
    "5. 层数逐步累乘，并设置明确复核上限。",
    "6. 草记保持醒目，正式结论回到受控记录与有权限人员。"
  ].join("\n"), "[data-fd158-summary-status]", "折层六记摘要已复制。");

  bindCopy("[data-fd158-copy-policy]", () => "工坊边界摘要：本模板只整理本地折层清单，不验证配方、原料、实际层数、冷链、过敏原、交叉接触、设备校准、人员资质、卫生程序、生产放行或法律要求；高影响判断必须回到正式记录、适用规范和有权限人员。", "[data-fd158-policy-status]", "工坊边界摘要已复制。");

  const progress = document.querySelector("[data-fd158-progress]");
  if (progress) {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progress.value = scrollable > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / scrollable) * 100))) : 100;
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const form = document.querySelector("[data-fd158-form]");
  if (form) {
    const recordsInput = form.querySelector("[data-fd158-records]");
    const lowInput = form.querySelector("[data-fd158-low]");
    const highInput = form.querySelector("[data-fd158-high]");
    const restInput = form.querySelector("[data-fd158-rest]");
    const layerInput = form.querySelector("[data-fd158-layer]");
    const errorOutput = form.querySelector("[data-fd158-error]");
    const formStatus = form.querySelector("[data-fd158-form-status]");
    const stateOutput = document.querySelector("[data-fd158-state]");
    const preview = document.querySelector("[data-fd158-preview]");
    const report = document.querySelector("[data-fd158-report]");
    const copyReportButton = document.querySelector("[data-fd158-copy-report]");
    const copyStatus = document.querySelector("[data-fd158-copy-report-status]");
    const findingsSummary = document.querySelector("[data-fd158-findings-summary]");
    const findingsList = document.querySelector("[data-fd158-findings]");
    const recordList = document.querySelector("[data-fd158-record-list]");
    const metrics = Object.fromEntries(Array.from(document.querySelectorAll("[data-fd158-metric]")).map((node) => [node.dataset.fd158Metric, node]));
    const foldTypes = new Set(["单折", "双折"]);
    const states = new Set(["草记", "核对", "封存"]);
    const forbiddenCharacters = /[\p{Cc}\p{Cf}]/u;
    const foldTones = { "单折": "#f2bd3f", "双折": "#6cb6bd" };
    const presets = {
      clear: "A-01 | 1 | 单折 | 18.0 | 30 | 封存\nA-01 | 2 | 双折 | 19.5 | 35 | 封存\nB-02 | 1 | 双折 | 17.0 | 25 | 核对\nB-02 | 2 | 单折 | 18.5 | 30 | 封存",
      temperature: "C-03 | 1 | 单折 | 12.0 | 30 | 封存\nC-03 | 2 | 单折 | 25.0 | 30 | 核对\nD-04 | 1 | 双折 | 20.0 | 25 | 封存",
      sequence: "E-05 | 1 | 单折 | 18.0 | 30 | 封存\nE-05 | 3 | 双折 | 19.0 | 35 | 封存\nF-06 | 2 | 单折 | 18.5 | 30 | 核对",
      mixed: "G-07 | 1 | 单折 | 25.0 | 10 | 草记\nG-07 | 3 | 双折 | 18.0 | 30 | 封存\nH-08 | 2 | 双折 | 14.0 | 15 | 草记\nH-08 | 3 | 双折 | 19.0 | 30 | 核对"
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
    const parseTenths = (value, minimum, maximum, label) => {
      if (!/^-?(?:0|[1-9]\d*)(?:\.\d)?$/u.test(value)) throw new Error(`${label}必须是最多一位小数的普通十进制。`);
      const scaled = Math.round(Number(value) * 10);
      if (!Number.isSafeInteger(scaled) || scaled < minimum || scaled > maximum) throw new Error(`${label}必须在 ${(minimum / 10).toFixed(1)}–${(maximum / 10).toFixed(1)} 之间。`);
      return scaled;
    };
    const formatTenths = (value) => (value / 10).toFixed(1);
    const normalizeBatch = (value, lineNumber) => {
      if (forbiddenCharacters.test(value)) throw new Error(`第 ${lineNumber} 行批次号不能包含控制或格式字符。`);
      const display = value.normalize("NFKC").trim().replace(/\s+/gu, " ");
      const length = lengthOf(display);
      if (length < 2 || length > 20) throw new Error(`第 ${lineNumber} 行批次号归一后必须为 2–20 个 Unicode 字符。`);
      return { display, key: display.toLocaleLowerCase("en") };
    };
    const parseRecords = () => {
      const raw = recordsInput.value;
      if (lengthOf(raw) > 8000) throw new Error("折层输入不能超过 8000 个 Unicode 字符。");
      const lines = raw.split(/\r?\n/u).filter((line) => line.trim() !== "");
      if (lines.length < 2 || lines.length > 80) throw new Error("请输入 2–80 条非空折层记录。");
      const identities = new Set();
      return lines.map((line, index) => {
        const lineNumber = index + 1;
        if (forbiddenCharacters.test(line)) throw new Error(`第 ${lineNumber} 行不能包含控制或格式字符。`);
        const fields = line.normalize("NFKC").split("|").map((field) => field.trim());
        if (fields.length !== 6 || fields.some((field) => field === "")) throw new Error(`第 ${lineNumber} 行必须恰好包含 6 个非空字段，并以 | 分隔。`);
        const batchId = normalizeBatch(fields[0], lineNumber);
        const fold = parseInteger(fields[1], 1, 12, `第 ${lineNumber} 行折次`);
        const identity = `${batchId.key}|${fold}`;
        if (identities.has(identity)) throw new Error(`第 ${lineNumber} 行批次号与折次组合归一后重复。`);
        identities.add(identity);
        if (!foldTypes.has(fields[2])) throw new Error(`第 ${lineNumber} 行折法只能是单折或双折。`);
        const temperature = parseTenths(fields[3], -50, 400, `第 ${lineNumber} 行面团温度`);
        const rest = parseInteger(fields[4], 0, 600, `第 ${lineNumber} 行松弛分钟`);
        if (!states.has(fields[5])) throw new Error(`第 ${lineNumber} 行状态只能是草记、核对或封存。`);
        return { lineNumber, batchId: batchId.display, batchNorm: batchId.key, fold, foldType: fields[2], temperature, rest, state: fields[5], layers: 0 };
      });
    };
    const renderPreview = (records) => {
      preview.replaceChildren();
      records.slice(0, 40).forEach((record, index) => {
        const strip = document.createElement("article");
        strip.className = "fd158-foldstrip";
        strip.style.setProperty("--fold-tone", foldTones[record.foldType]);
        strip.style.setProperty("--fold-offset", `${(index % 4) * 2}%`);
        addElement(strip, "b", `${record.batchId} · ${record.foldType}`);
        addElement(strip, "small", `#${record.fold} / ${record.layers} 层`);
        preview.appendChild(strip);
      });
      if (records.length > 40) addElement(preview, "em", `另有 ${records.length - 40} 条记录保留在完整报告中。`);
    };
    const renderRecords = (records) => {
      recordList.replaceChildren();
      records.slice(0, 40).forEach((record) => {
        const card = document.createElement("article");
        card.className = "fd158-record-card";
        card.style.setProperty("--card-tone", foldTones[record.foldType]);
        addElement(card, "b", `${record.batchId} · 第 ${record.fold} 折`);
        addElement(card, "span", `${record.layers} 层`);
        addElement(card, "small", `${record.foldType} · ${formatTenths(record.temperature)}°C · 松弛 ${record.rest} 分钟 · ${record.state}`);
        recordList.appendChild(card);
      });
      if (records.length > 40) addElement(recordList, "p", `界面仅显示前 40 条；完整报告保留全部 ${records.length} 条。`);
    };
    const renderFindings = (groups) => {
      const all = groups.flat();
      findingsList.replaceChildren();
      if (!all.length) {
        addElement(findingsList, "li", "未发现温度、折次、层数、松弛或草记状态提示。");
        findingsSummary.textContent = "折层清晰";
        return;
      }
      all.slice(0, 40).forEach((finding) => addElement(findingsList, "li", finding));
      if (all.length > 40) addElement(findingsList, "li", `另有 ${all.length - 40} 条提示保留在完整报告中。`);
      findingsSummary.textContent = `${all.length} 条待复核提示`;
    };
    const invalidate = () => {
      reportText = "";
      report.dataset.fd158Ready = "false";
      copyReportButton.disabled = true;
      copyStatus.textContent = "";
      formStatus.textContent = "输入已变化，请重新生成折层报告。";
    };

    document.querySelectorAll("[data-fd158-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.dataset.fd158Preset;
        recordsInput.value = presets[name];
        lowInput.value = "16.0";
        highInput.value = "22.0";
        restInput.value = "20";
        layerInput.value = name === "mixed" ? "10" : "1000";
        errorOutput.textContent = "";
        invalidate();
        recordsInput.focus();
      });
    });
    [recordsInput, lowInput, highInput, restInput, layerInput].forEach((input) => input.addEventListener("input", invalidate));
    form.addEventListener("reset", () => {
      window.setTimeout(() => {
        errorOutput.textContent = "";
        stateOutput.textContent = "UNSET";
        preview.replaceChildren();
        addElement(preview, "em", "等待折层记录");
        metrics.count.textContent = "0";
        metrics.batches.textContent = "0";
        metrics.layers.textContent = "0";
        metrics.temperature.textContent = "0";
        metrics.sequence.textContent = "0";
        metrics.layer.textContent = "0";
        metrics.rest.textContent = "0";
        metrics.drafts.textContent = "0";
        findingsSummary.textContent = "尚未校样";
        findingsList.replaceChildren();
        addElement(findingsList, "li", "生成报告后，这里会列出温度、折次、层数、松弛与状态提示。");
        recordList.replaceChildren();
        invalidate();
        formStatus.textContent = "已清空重置，等待生成折层报告。";
      }, 0);
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      errorOutput.textContent = "";
      copyStatus.textContent = "";
      try {
        const records = parseRecords();
        const low = parseTenths(lowInput.value, -50, 400, "温度下界");
        const high = parseTenths(highInput.value, -50, 400, "温度上界");
        if (low > high) throw new Error("温度下界不能高于温度上界。");
        const minimumRest = parseInteger(restInput.value, 0, 600, "最低松弛分钟");
        const layerCeiling = parseInteger(layerInput.value, 3, 16777216, "层数复核上限");
        const temperatureFindings = records.filter((record) => record.temperature < low || record.temperature > high).map((record) => `${record.batchId} #${record.fold} 的 ${formatTenths(record.temperature)}°C 落在 ${formatTenths(low)}–${formatTenths(high)}°C 闭区间之外。`);
        const restFindings = records.filter((record) => record.rest < minimumRest).map((record) => `${record.batchId} #${record.fold} 的松弛 ${record.rest} 分钟严格低于最低值 ${minimumRest} 分钟。`);
        const statusFindings = records.filter((record) => record.state === "草记").map((record) => `${record.batchId} #${record.fold} 仍处于草记状态。`);
        const batches = new Map();
        records.forEach((record) => {
          if (!batches.has(record.batchNorm)) batches.set(record.batchNorm, []);
          batches.get(record.batchNorm).push(record);
        });
        const sequenceFindings = [];
        const layerFindings = [];
        let highestLayers = 0;
        batches.forEach((batch) => {
          const ordered = [...batch].sort((a, b) => a.fold - b.fold);
          if (ordered[0].fold !== 1) sequenceFindings.push(`${ordered[0].batchId} 的最小折次为 ${ordered[0].fold}，未从 1 开始。`);
          let layers = 1;
          ordered.forEach((record, index) => {
            if (index > 0 && record.fold !== ordered[index - 1].fold + 1) sequenceFindings.push(`${record.batchId} 从第 ${ordered[index - 1].fold} 折跳到第 ${record.fold} 折，折次不连续。`);
            layers *= record.foldType === "单折" ? 3 : 4;
            record.layers = layers;
            highestLayers = Math.max(highestLayers, layers);
            if (layers > layerCeiling) layerFindings.push(`${record.batchId} #${record.fold} 计算为 ${layers} 层，严格超过复核上限 ${layerCeiling} 层。`);
          });
        });
        const categories = [temperatureFindings, sequenceFindings, layerFindings, restFindings, statusFindings];
        const findingCount = categories.flat().length;
        let state = "FOLD CLEAR";
        if (temperatureFindings.length && findingCount === temperatureFindings.length) state = `TEMPERATURE FLAGS ${temperatureFindings.length}`;
        else if (sequenceFindings.length && findingCount === sequenceFindings.length) state = `SEQUENCE FLAGS ${sequenceFindings.length}`;
        else if (layerFindings.length && findingCount === layerFindings.length) state = `LAYER FLAGS ${layerFindings.length}`;
        else if (restFindings.length && findingCount === restFindings.length) state = `REST FLAGS ${restFindings.length}`;
        else if (statusFindings.length && findingCount === statusFindings.length) state = `STATUS FLAGS ${statusFindings.length}`;
        else if (findingCount) state = `REVIEW ${findingCount}`;

        metrics.count.textContent = String(records.length);
        metrics.batches.textContent = String(batches.size);
        metrics.layers.textContent = String(highestLayers);
        metrics.temperature.textContent = String(temperatureFindings.length);
        metrics.sequence.textContent = String(sequenceFindings.length);
        metrics.layer.textContent = String(layerFindings.length);
        metrics.rest.textContent = String(restFindings.length);
        metrics.drafts.textContent = String(statusFindings.length);
        stateOutput.textContent = state;
        renderPreview(records);
        renderRecords(records);
        renderFindings(categories);

        const allFindings = categories.flat();
        reportText = [
          "折层批次校样报告",
          `状态：${state}`,
          `记录数：${records.length}`,
          `批次数：${batches.size}`,
          `最高计算层数：${highestLayers}`,
          `温度闭区间：${formatTenths(low)}–${formatTenths(high)}°C（等于边界通过）`,
          `最低松弛：${minimumRest} 分钟（等于通过）`,
          `层数复核上限：${layerCeiling}（等于通过）`,
          `草记数：${statusFindings.length}`,
          "",
          "复核提示：",
          ...(allFindings.length ? allFindings.map((finding, index) => `${index + 1}. ${finding}`) : ["无"]),
          "",
          "折层记录：",
          ...records.map((record, index) => `${index + 1}. ${record.batchId} | #${record.fold} | ${record.foldType} | ${formatTenths(record.temperature)}°C | 松弛 ${record.rest} 分钟 | ${record.layers} 层 | ${record.state}`),
          "",
          "边界：结果仅用于本地清单整理，不构成配方、食品安全、过敏原、设备校准、实际层数、感官质量、生产放行或法律批准。"
        ].join("\n");
        report.dataset.fd158Ready = "true";
        copyReportButton.disabled = false;
        formStatus.textContent = `已生成：${state}。`;
      } catch (error) {
        reportText = "";
        report.dataset.fd158Ready = "false";
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
        copyStatus.textContent = "完整折层报告已复制。";
      } catch (_error) {
        copyStatus.textContent = "复制失败，请手动选择折层内容。";
      }
    });
  }

  const routeForm = document.querySelector("[data-fd158-route-form]");
  if (routeForm) {
    const clueInput = routeForm.querySelector("[data-fd158-clue]");
    const routeStatus = routeForm.querySelector("[data-fd158-route-status]");
    routeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const clue = clueInput.value.trim();
      const length = Array.from(clue).length;
      if (length < 1 || length > 80 || /[\p{Cc}\p{Cf}]/u.test(clue)) {
        routeStatus.textContent = "请输入 1–80 个不含控制或格式字符的 Unicode 线索。";
        return;
      }
      let href = "index.html";
      let label = "折层工坊";
      if (/六记|文章|阅读|温度|松弛|层数/u.test(clue)) {
        href = "article.html";
        label = "折层六记";
      } else if (/校样|工具|批次|折次|报告/u.test(clue)) {
        href = "tool.html";
        label = "折层校样台";
      } else if (/边界|责任|食品|隐私|法律|安全/u.test(clue)) {
        href = "legal.html";
        label = "六道工坊边界";
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
