(() => {
  "use strict";

  const documentRoot = document.documentElement;
  const toneButton = document.querySelector("[data-km155-tone-toggle]");
  const toneKey = "km155-tone";

  const applyTone = (tone) => {
    const next = tone === "night" ? "night" : "day";
    documentRoot.dataset.km155Tone = next;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = next === "night" ? "#121923" : "#f1eadb";
    if (toneButton) {
      toneButton.textContent = next === "night" ? "天明" : "入夜";
      toneButton.setAttribute("aria-pressed", String(next === "night"));
    }
  };

  let storedTone = "day";
  try {
    storedTone = localStorage.getItem(toneKey) || "day";
  } catch (_error) {
    storedTone = "day";
  }
  applyTone(storedTone);

  if (toneButton) {
    toneButton.addEventListener("click", () => {
      const next = documentRoot.dataset.km155Tone === "night" ? "day" : "night";
      applyTone(next);
      try {
        localStorage.setItem(toneKey, next);
      } catch (_error) {
        // A storage restriction does not prevent the current-page theme change.
      }
    });
  }

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
    document.body.appendChild(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    if (!copied) throw new Error("copy failed");
  };

  const connectCopy = (buttonSelector, value) => {
    const button = document.querySelector(buttonSelector);
    const status = document.querySelector("[data-km155-copy-status]");
    if (!button || !status) return;
    button.addEventListener("click", async () => {
      try {
        await copyText(value);
        status.textContent = "已复制。";
      } catch (_error) {
        status.textContent = "复制失败，请手动选择文字。";
      }
    });
  };

  connectCopy("[data-km155-copy-code]", "{{JOINERY_CODE}}");
  connectCopy(
    "[data-km155-copy-notes]",
    "组子木札复核：确认板块与版本，分别核对横纵节距和整格余数，对照同纹样节距，保留草排提示，并回到正式图样、材料与加工方案完成现实复核。"
  );
  connectCopy(
    "[data-km155-copy-policy]",
    "责任格复核：资料版本、木材环境、结构连接、加工安装、检验安全、身份权利与发布许可均需由相应责任人独立核实。"
  );

  const readingProgress = document.querySelector("[data-km155-progress]");
  if (readingProgress) {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = available > 0 ? window.scrollY / available : 1;
      readingProgress.value = Math.max(0, Math.min(100, Math.round(ratio * 100)));
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const form = document.querySelector("[data-km155-form]");
  if (form) {
    const panelsInput = form.querySelector("[data-km155-panels]");
    const ceilingInput = form.querySelector("[data-km155-ceiling]");
    const errorOutput = form.querySelector("[data-km155-error]");
    const formStatus = form.querySelector("[data-km155-form-status]");
    const result = document.querySelector(".km155-result");
    const stateOutput = document.querySelector("[data-km155-state]");
    const preview = document.querySelector("[data-km155-preview]");
    const findingsSummary = document.querySelector("[data-km155-summary]");
    const findingsList = document.querySelector("[data-km155-findings]");
    const panelList = document.querySelector("[data-km155-panel-list]");
    const copyReportButton = document.querySelector("[data-km155-copy-report]");
    const copyStatus = document.querySelector("[data-km155-copy-status]");
    const metrics = {
      count: document.querySelector("[data-km155-count]"),
      patterns: document.querySelector("[data-km155-patterns]"),
      full: document.querySelector("[data-km155-full]"),
      cells: document.querySelector("[data-km155-cells]"),
      remainders: document.querySelector("[data-km155-remainders]"),
      pitches: document.querySelector("[data-km155-pitches]"),
      drafts: document.querySelector("[data-km155-drafts]"),
      ceiling: document.querySelector("[data-km155-ceiling-out]")
    };
    const allowedPatterns = new Set(["麻叶", "胡麻", "桔梗", "角麻", "其他"]);
    const allowedStates = new Set(["草排", "校核", "定稿"]);
    const forbiddenCharacters = /[\p{Cc}\p{Cf}]/u;
    const decimalInteger = /^[1-9]\d*$/;
    const presets = {
      clear: "玄关上屏 | 麻叶 | 900 | 600 | 30 | 30 | 定稿\n玄关下屏 | 麻叶 | 600 | 450 | 30 | 30 | 校核\n书房侧屏 | 桔梗 | 720 | 480 | 24 | 24 | 定稿\n茶室欄间 | 胡麻 | 540 | 360 | 30 | 20 | 校核",
      remainder: "门厅主屏 | 角麻 | 905 | 604 | 30 | 30 | 校核\n门厅侧屏 | 角麻 | 620 | 470 | 30 | 30 | 定稿",
      drift: "东侧上屏 | 麻叶 | 900 | 600 | 30 | 30 | 定稿\n东侧下屏 | 麻叶 | 960 | 600 | 24 | 30 | 校核\n西侧欄间 | 桔梗 | 720 | 480 | 24 | 24 | 定稿",
      mixed: "主厅上屏 | 麻叶 | 905 | 600 | 30 | 30 | 草排\n主厅下屏 | 麻叶 | 640 | 455 | 32 | 28 | 校核\n侧厅屏风 | 桔梗 | 960 | 720 | 24 | 24 | 草排\n茶室欄间 | 胡麻 | 840 | 630 | 30 | 20 | 定稿"
    };
    const patternColors = { "麻叶": "#a74425", "胡麻": "#c8922d", "桔梗": "#68745b", "角麻": "#526f93", "其他": "#76536b" };
    let reportText = "";

    const lengthOf = (value) => Array.from(value).length;
    const normalizeText = (value) => value.normalize("NFKC").trim().replace(/\s+/gu, " ");
    const addElement = (parent, tag, text) => {
      const element = document.createElement(tag);
      element.textContent = text;
      parent.appendChild(element);
      return element;
    };

    const parseInteger = (raw, min, max, line, label) => {
      const value = raw.trim();
      const location = Number.isInteger(line) ? `第 ${line} 行` : "";
      if (!decimalInteger.test(value)) {
        throw new Error(`${location}${label}必须是无符号、无小数、无前导零的普通十进制整数。`);
      }
      const number = Number(value);
      if (!Number.isSafeInteger(number) || number < min || number > max) {
        throw new Error(`${location}${label}必须在 ${min}–${max} 之间。`);
      }
      return number;
    };

    const normalizeId = (raw, line) => {
      if (forbiddenCharacters.test(raw)) throw new Error(`第 ${line} 行板块号不能包含控制或格式字符。`);
      const display = normalizeText(raw);
      const length = lengthOf(display);
      if (length < 2 || length > 20) throw new Error(`第 ${line} 行板块号归一后必须为 2–20 个 Unicode 字符。`);
      return { display, key: display.toLocaleLowerCase("zh-Hans") };
    };

    const parsePanels = () => {
      const raw = panelsInput.value;
      if (lengthOf(raw) > 8000) throw new Error("板块输入不能超过 8000 个 Unicode 字符。");
      const lines = raw.split(/\r?\n/u).filter((line) => line.trim() !== "");
      if (lines.length < 2 || lines.length > 80) throw new Error("请输入 2–80 条非空板块记录。");
      const ids = new Set();
      return lines.map((line, index) => {
        const lineNumber = index + 1;
        if (forbiddenCharacters.test(line)) throw new Error(`第 ${lineNumber} 行不能包含控制或格式字符。`);
        const fields = line.normalize("NFKC").split("|").map((field) => field.trim());
        if (fields.length !== 7 || fields.some((field) => field === "")) {
          throw new Error(`第 ${lineNumber} 行必须恰好包含 7 个非空字段，并以 | 分隔。`);
        }
        const id = normalizeId(fields[0], lineNumber);
        if (ids.has(id.key)) throw new Error(`第 ${lineNumber} 行板块号与已有记录归一后重复。`);
        ids.add(id.key);
        if (!allowedPatterns.has(fields[1])) throw new Error(`第 ${lineNumber} 行纹样不在允许清单内。`);
        const width = parseInteger(fields[2], 1, 100000, lineNumber, "横宽");
        const height = parseInteger(fields[3], 1, 100000, lineNumber, "纵高");
        const pitchX = parseInteger(fields[4], 1, 10000, lineNumber, "横节距");
        const pitchY = parseInteger(fields[5], 1, 10000, lineNumber, "纵节距");
        if (!allowedStates.has(fields[6])) throw new Error(`第 ${lineNumber} 行状态只能是草排、校核或定稿。`);
        return {
          lineNumber,
          id: id.display,
          key: id.key,
          pattern: fields[1],
          width,
          height,
          pitchX,
          pitchY,
          state: fields[6],
          remainderX: width % pitchX,
          remainderY: height % pitchY,
          modulesX: Math.floor(width / pitchX),
          modulesY: Math.floor(height / pitchY)
        };
      });
    };

    const renderPreview = (records) => {
      preview.replaceChildren();
      records.slice(0, 40).forEach((record) => {
        const swatch = document.createElement("article");
        swatch.className = "km155-swatch";
        swatch.style.setProperty("--tone", patternColors[record.pattern]);
        swatch.style.setProperty("--gx", `${Math.max(7, Math.min(30, Math.round(190 / Math.max(1, record.modulesX))))}px`);
        swatch.style.setProperty("--gy", `${Math.max(7, Math.min(30, Math.round(110 / Math.max(1, record.modulesY))))}px`);
        addElement(swatch, "b", record.id);
        addElement(swatch, "small", `${record.modulesX} × ${record.modulesY} 格`);
        preview.appendChild(swatch);
      });
      if (records.length > 40) addElement(preview, "small", `另有 ${records.length - 40} 条板块保留在完整交接中。`);
    };

    const renderPanelList = (records) => {
      panelList.replaceChildren();
      records.slice(0, 40).forEach((record) => {
        const card = document.createElement("article");
        card.className = "km155-panel-card";
        card.style.setProperty("--tone", patternColors[record.pattern]);
        addElement(card, "b", record.id);
        addElement(card, "span", record.pattern);
        addElement(card, "small", `${record.width}×${record.height}mm · 节距 ${record.pitchX}×${record.pitchY}mm · 完整格 ${record.modulesX * record.modulesY} · ${record.state}`);
        panelList.appendChild(card);
      });
      if (records.length > 40) addElement(panelList, "p", `界面仅显示前 40 条；完整交接保留全部 ${records.length} 条。`);
    };

    const renderFindings = (geometryFindings, statusFindings) => {
      const all = [...geometryFindings, ...statusFindings];
      findingsList.replaceChildren();
      if (all.length === 0) {
        addElement(findingsList, "li", "未发现整格余数、节距漂移、格数上限或草排状态提示。");
        findingsSummary.textContent = "板块模数清晰";
        return;
      }
      all.slice(0, 40).forEach((finding) => addElement(findingsList, "li", finding));
      if (all.length > 40) addElement(findingsList, "li", `另有 ${all.length - 40} 条提示保留在完整复制中。`);
      findingsSummary.textContent = `${all.length} 条待复核提示`;
    };

    const invalidate = () => {
      reportText = "";
      result.dataset.km155Ready = "false";
      copyReportButton.disabled = true;
      copyStatus.textContent = "";
      formStatus.textContent = "输入已变化，请重新生成模数交接。";
    };

    document.querySelectorAll("[data-km155-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.dataset.km155Preset;
        panelsInput.value = presets[name];
        ceilingInput.value = name === "mixed" ? "1200" : "2000";
        errorOutput.textContent = "";
        invalidate();
        panelsInput.focus();
      });
    });

    panelsInput.addEventListener("input", invalidate);
    ceilingInput.addEventListener("input", invalidate);
    form.addEventListener("reset", () => {
      window.setTimeout(() => {
        errorOutput.textContent = "";
        stateOutput.textContent = "UNSET";
        preview.replaceChildren();
        addElement(preview, "span", "等待板块模数");
        invalidate();
        formStatus.textContent = "已重置板块，等待生成模数交接。";
      }, 0);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      errorOutput.textContent = "";
      copyStatus.textContent = "";
      try {
        const records = parsePanels();
        const ceiling = parseInteger(ceilingInput.value, 1, 1000000000000, null, "完整格数上限");
        const geometryFindings = [];
        records.forEach((record) => {
          if (record.remainderX !== 0 || record.remainderY !== 0) {
            geometryFindings.push(`${record.id} 不能整格铺满：横余 ${record.remainderX}mm，纵余 ${record.remainderY}mm。`);
          }
        });
        const patternReference = new Map();
        records.forEach((record) => {
          const reference = patternReference.get(record.pattern);
          if (!reference) {
            patternReference.set(record.pattern, record);
          } else if (reference.pitchX !== record.pitchX || reference.pitchY !== record.pitchY) {
            geometryFindings.push(`${record.id} 的节距 ${record.pitchX}×${record.pitchY}mm 与纹样“${record.pattern}”的本次参照 ${reference.pitchX}×${reference.pitchY}mm 不一致。`);
          }
        });
        const totalCells = records.reduce((sum, record) => sum + record.modulesX * record.modulesY, 0);
        if (totalCells > ceiling) geometryFindings.push(`完整格数 ${totalCells} 严格超过上限 ${ceiling}。`);
        const statusFindings = records.filter((record) => record.state === "草排").map((record) => `${record.id} 仍处于草排状态。`);
        let state = "GRID CLEAR";
        if (geometryFindings.length && statusFindings.length) state = `REVIEW ${geometryFindings.length + statusFindings.length}`;
        else if (geometryFindings.length) state = `GEOMETRY FLAGS ${geometryFindings.length}`;
        else if (statusFindings.length) state = `STATUS FLAGS ${statusFindings.length}`;
        const patternCount = new Set(records.map((record) => record.pattern)).size;
        const pitchGroupCount = new Set(records.map((record) => `${record.pattern}|${record.pitchX}|${record.pitchY}`)).size;
        const fullCount = records.filter((record) => record.remainderX === 0 && record.remainderY === 0).length;
        const remainderCount = records.length - fullCount;

        metrics.count.textContent = String(records.length);
        metrics.patterns.textContent = String(patternCount);
        metrics.full.textContent = String(fullCount);
        metrics.cells.textContent = String(totalCells);
        metrics.remainders.textContent = String(remainderCount);
        metrics.pitches.textContent = String(pitchGroupCount);
        metrics.drafts.textContent = String(statusFindings.length);
        metrics.ceiling.textContent = String(ceiling);
        stateOutput.textContent = state;
        renderPreview(records);
        renderPanelList(records);
        renderFindings(geometryFindings, statusFindings);

        const allFindings = [...geometryFindings, ...statusFindings];
        reportText = [
          "组子板块模数交接",
          `状态：${state}`,
          `板块数：${records.length}`,
          `纹样数：${patternCount}`,
          `整格板：${fullCount}`,
          `余数板：${remainderCount}`,
          `节距组：${pitchGroupCount}`,
          `完整格数：${totalCells}`,
          `完整格数上限：${ceiling}`,
          `草排数：${statusFindings.length}`,
          "",
          "复核提示：",
          ...(allFindings.length ? allFindings.map((finding, index) => `${index + 1}. ${finding}`) : ["无"]),
          "",
          "板块清单：",
          ...records.map((record, index) => `${index + 1}. ${record.id} | ${record.pattern} | ${record.width}mm | ${record.height}mm | ${record.pitchX}mm | ${record.pitchY}mm | ${record.state} | 横余 ${record.remainderX}mm | 纵余 ${record.remainderY}mm | 完整格 ${record.modulesX * record.modulesY}`),
          "",
          "边界：结果仅用于本地清单整理，不构成木材、结构、连接、加工、安装、质量、安全、法规、知识产权或发布批准。"
        ].join("\n");
        result.dataset.km155Ready = "true";
        copyReportButton.disabled = false;
        formStatus.textContent = `已生成：${state}。`;
      } catch (error) {
        reportText = "";
        result.dataset.km155Ready = "false";
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
        copyStatus.textContent = "完整模数交接已复制。";
      } catch (_error) {
        copyStatus.textContent = "复制失败，请手动选择交接内容。";
      }
    });
  }

  const routeForm = document.querySelector("[data-km155-route-form]");
  if (routeForm) {
    const clueInput = routeForm.querySelector("[data-km155-clue]");
    const routeStatus = routeForm.querySelector("[data-km155-route-status]");
    routeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const clue = clueInput.value.trim();
      const length = Array.from(clue).length;
      if (length < 1 || length > 80) {
        routeStatus.textContent = "请输入 1–80 个 Unicode 字符的板块线索。";
        return;
      }
      let href = "index.html";
      let label = "格构厅";
      if (/札|笔记|纹样/u.test(clue)) {
        href = "article.html";
        label = "六则木札";
      } else if (/模数|余数|节距|校核|工具|板块/u.test(clue)) {
        href = "tool.html";
        label = "模数台";
      } else if (/责任|边界|安全|权利/u.test(clue)) {
        href = "legal.html";
        label = "责任格";
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
