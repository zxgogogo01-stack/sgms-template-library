(() => {
  "use strict";

  const root = document.documentElement;
  const modeButton = document.querySelector("[data-ec154-mode-toggle]");
  const modeKey = "ec154-mode";

  const setMode = (mode) => {
    const nextMode = mode === "blueprint" ? "blueprint" : "studio";
    root.dataset.ec154Mode = nextMode;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = nextMode === "blueprint" ? "#e5e0d5" : "#11100f";
    if (modeButton) {
      modeButton.setAttribute("aria-pressed", String(nextMode === "blueprint"));
      modeButton.textContent = nextMode === "blueprint" ? "关图纸灯" : "开图纸灯";
    }
  };

  let savedMode = "studio";
  try {
    savedMode = localStorage.getItem(modeKey) || "studio";
  } catch (_error) {
    savedMode = "studio";
  }
  setMode(savedMode);

  if (modeButton) {
    modeButton.addEventListener("click", () => {
      const nextMode = root.dataset.ec154Mode === "blueprint" ? "studio" : "blueprint";
      setMode(nextMode);
      try {
        localStorage.setItem(modeKey, nextMode);
      } catch (_error) {
        // The theme still works when storage is unavailable.
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

  const wireCopy = (buttonSelector, statusSelector, value) => {
    const button = document.querySelector(buttonSelector);
    const status = document.querySelector(statusSelector);
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

  wireCopy("[data-ec154-copy-panel]", "[data-ec154-copy-status]", "{{PANEL_CODE}}");
  wireCopy(
    "[data-ec154-copy-notes]",
    "[data-ec154-copy-status]",
    "构件札复核：先确认对象与版本，再记录结构关系、材料来源、尺度证据、制造边界、安全验证与发布责任。未经验证的描述保持为待核信息。"
  );
  wireCopy(
    "[data-ec154-copy-policy]",
    "[data-ec154-copy-status]",
    "责任图复核：资料来源、结构判断、人体工学、材料制造、使用安全、法规权利和发布批准均需由相应责任人独立核实。"
  );

  const progress = document.querySelector("[data-ec154-progress]");
  if (progress) {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 1;
      progress.value = Math.max(0, Math.min(100, Math.round(ratio * 100)));
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const form = document.querySelector("[data-ec154-form]");
  if (form) {
    const partsInput = form.querySelector("[data-ec154-parts]");
    const ceilingInput = form.querySelector("[data-ec154-ceiling]");
    const errorOutput = form.querySelector("[data-ec154-error]");
    const formStatus = form.querySelector("[data-ec154-form-status]");
    const report = document.querySelector(".ec154-report");
    const stateOutput = document.querySelector("[data-ec154-state]");
    const preview = document.querySelector("[data-ec154-preview]");
    const findingsSummary = document.querySelector("[data-ec154-summary]");
    const findingsList = document.querySelector("[data-ec154-findings]");
    const treeList = document.querySelector("[data-ec154-tree-list]");
    const copyReportButton = document.querySelector("[data-ec154-copy-report]");
    const copyReportStatus = document.querySelector("[data-ec154-copy-status]");
    const metric = {
      count: document.querySelector("[data-ec154-count]"),
      roots: document.querySelector("[data-ec154-roots]"),
      materials: document.querySelector("[data-ec154-materials]"),
      quantity: document.querySelector("[data-ec154-quantity]"),
      mass: document.querySelector("[data-ec154-mass]"),
      depth: document.querySelector("[data-ec154-depth]"),
      branches: document.querySelector("[data-ec154-branches]"),
      drafts: document.querySelector("[data-ec154-drafts]"),
      ceiling: document.querySelector("[data-ec154-ceiling-out]")
    };
    const materials = new Set(["榉木", "钢", "铝", "皮革", "织物", "其他"]);
    const states = new Set(["草模", "校核", "定版"]);
    const controlCharacters = /[\p{Cc}\p{Cf}]/u;
    const integerPattern = /^[1-9]\d*$/;
    const presets = {
      clear: "座面 | 榉木 | ROOT | 1 | 3400 | 定版\n左前腿 | 榉木 | 座面 | 1 | 900 | 校核\n右前腿 | 榉木 | 座面 | 1 | 900 | 校核\n左后腿 | 榉木 | 座面 | 1 | 1100 | 定版\n右后腿 | 榉木 | 座面 | 1 | 1100 | 定版\n靠背框 | 钢 | 座面 | 1 | 1600 | 校核\n靠垫 | 织物 | 靠背框 | 1 | 700 | 定版\n脚垫 | 其他 | 座面 | 4 | 40 | 定版",
      orphan: "主框 | 铝 | ROOT | 1 | 2200 | 定版\n托片 | 钢 | 未登记框 | 2 | 180 | 校核",
      cycle: "基座 | 钢 | ROOT | 1 | 1800 | 定版\n支杆A1 | 铝 | 支杆B1 | 1 | 320 | 校核\n支杆B1 | 铝 | 支杆A1 | 1 | 320 | 校核",
      mixed: "基座甲 | 钢 | ROOT | 1 | 6000 | 草模\n基座乙 | 铝 | ROOT | 1 | 5000 | 定版\n悬片 | 皮革 | 未登记件 | 2 | 700 | 草模\n连杆A1 | 钢 | 连杆B1 | 1 | 800 | 校核\n连杆B1 | 钢 | 连杆A1 | 1 | 800 | 定版"
    };
    let completeReport = "";

    const unicodeLength = (value) => Array.from(value).length;
    const normalizeSpaces = (value) => value.normalize("NFKC").trim().replace(/\s+/gu, " ");
    const appendTextElement = (parent, tag, value) => {
      const element = document.createElement(tag);
      element.textContent = value;
      parent.appendChild(element);
      return element;
    };

    const parseInteger = (raw, min, max, lineNumber, label) => {
      const value = raw.trim();
      const location = Number.isInteger(lineNumber) ? `第 ${lineNumber} 行` : "";
      if (!integerPattern.test(value)) {
        throw new Error(`${location}${label}必须是无符号、无小数、无前导零的普通十进制整数。`);
      }
      const number = Number(value);
      if (!Number.isSafeInteger(number) || number < min || number > max) {
        throw new Error(`${location}${label}必须在 ${min}–${max} 之间。`);
      }
      return number;
    };

    const normalizeId = (raw, lineNumber, label) => {
      if (controlCharacters.test(raw)) {
        throw new Error(`第 ${lineNumber} 行${label}不能包含控制或格式字符。`);
      }
      const display = normalizeSpaces(raw);
      const length = unicodeLength(display);
      if (length < 2 || length > 20) {
        throw new Error(`第 ${lineNumber} 行${label}归一后必须为 2–20 个 Unicode 字符。`);
      }
      return { display, key: display.toLocaleLowerCase("zh-Hans") };
    };

    const parseRecords = () => {
      const raw = partsInput.value;
      if (unicodeLength(raw) > 8000) throw new Error("构件输入不能超过 8000 个 Unicode 字符。");
      const lines = raw.split(/\r?\n/u).filter((line) => line.trim() !== "");
      if (lines.length < 2 || lines.length > 80) throw new Error("请输入 2–80 条非空构件记录。");
      const seen = new Set();
      return lines.map((line, index) => {
        const lineNumber = index + 1;
        if (controlCharacters.test(line)) throw new Error(`第 ${lineNumber} 行不能包含控制或格式字符。`);
        const fields = line.normalize("NFKC").split("|").map((field) => field.trim());
        if (fields.length !== 6 || fields.some((field) => field === "")) {
          throw new Error(`第 ${lineNumber} 行必须恰好包含 6 个非空字段，并以 | 分隔。`);
        }
        const part = normalizeId(fields[0], lineNumber, "部件号");
        if (part.key === "root") throw new Error(`第 ${lineNumber} 行部件号不能使用保留字 ROOT。`);
        if (seen.has(part.key)) throw new Error(`第 ${lineNumber} 行部件号与已有记录归一后重复。`);
        seen.add(part.key);
        if (!materials.has(fields[1])) throw new Error(`第 ${lineNumber} 行材料不在允许清单内。`);
        let parent = null;
        if (fields[2] !== "ROOT") parent = normalizeId(fields[2], lineNumber, "父部件");
        const quantity = parseInteger(fields[3], 1, 99, lineNumber, "数量");
        const mass = parseInteger(fields[4], 1, 100000, lineNumber, "单件质量");
        if (!states.has(fields[5])) throw new Error(`第 ${lineNumber} 行状态只能是草模、校核或定版。`);
        return {
          lineNumber,
          part: part.display,
          key: part.key,
          material: fields[1],
          parent: parent ? parent.display : "ROOT",
          parentKey: parent ? parent.key : null,
          quantity,
          mass,
          state: fields[5]
        };
      });
    };

    const findCycles = (records, byKey) => {
      const findings = [];
      const cycles = new Set();
      records.forEach((record) => {
        const path = [];
        const positions = new Map();
        let current = record;
        while (current && current.parentKey && byKey.has(current.parentKey) && current.parentKey !== current.key) {
          if (positions.has(current.key)) {
            const start = positions.get(current.key);
            const cycleRecords = path.slice(start);
            const cycleKey = cycleRecords.map((item) => item.key).sort().join("|");
            if (!cycles.has(cycleKey)) {
              cycles.add(cycleKey);
              const names = cycleRecords.map((item) => item.part);
              findings.push(`父链形成闭环：${names.join(" → ")} → ${names[0]}。`);
            }
            break;
          }
          positions.set(current.key, path.length);
          path.push(current);
          current = byKey.get(current.parentKey);
        }
      });
      return findings;
    };

    const calculateDepth = (record, byKey) => {
      const seen = new Set();
      let current = record;
      let depth = 0;
      while (current.parentKey !== null) {
        if (seen.has(current.key) || current.parentKey === current.key || !byKey.has(current.parentKey)) return null;
        seen.add(current.key);
        current = byKey.get(current.parentKey);
        depth += 1;
      }
      return depth;
    };

    const renderPreview = (records, byKey) => {
      preview.replaceChildren();
      const color = { "榉木": "#e8d3aa", "钢": "#b8bdc3", "铝": "#dce1e3", "皮革": "#a54a32", "织物": "#194d8e", "其他": "#e6c723" };
      records.slice(0, 40).forEach((record, index) => {
        const part = document.createElement("span");
        part.className = "ec154-part";
        const depth = calculateDepth(record, byKey);
        part.style.setProperty("--x", `${8 + ((index * 17 + (depth || 0) * 7) % 78)}%`);
        part.style.setProperty("--y", `${8 + ((index * 29 + (depth || 0) * 11) % 72)}%`);
        part.style.setProperty("--w", `${42 + ((record.quantity * 9 + index * 5) % 58)}px`);
        part.style.setProperty("--h", `${16 + ((record.mass + index * 7) % 24)}px`);
        part.style.setProperty("--turn", `${-15 + ((index * 11) % 31)}deg`);
        part.style.setProperty("--mat", color[record.material]);
        part.textContent = record.quantity > 1 ? `${record.part} ×${record.quantity}` : record.part;
        preview.appendChild(part);
      });
      if (records.length > 40) appendTextElement(preview, "small", `另有 ${records.length - 40} 条构件保留在完整交接中。`);
    };

    const renderTree = (records) => {
      treeList.replaceChildren();
      records.slice(0, 40).forEach((record) => {
        const card = document.createElement("article");
        card.className = "ec154-tree-card";
        appendTextElement(card, "b", record.part);
        appendTextElement(card, "span", `父部件：${record.parent}`);
        appendTextElement(card, "small", `${record.material} · 数量 ${record.quantity} · ${record.mass}g/件 · ${record.state}`);
        treeList.appendChild(card);
      });
      if (records.length > 40) appendTextElement(treeList, "p", `界面仅显示前 40 条；完整交接保留全部 ${records.length} 条。`);
    };

    const renderFindings = (assemblyFindings, statusFindings) => {
      const allFindings = [...assemblyFindings, ...statusFindings];
      findingsList.replaceChildren();
      if (allFindings.length === 0) {
        appendTextElement(findingsList, "li", "未发现装配关系、名义质量或草模状态提示。");
        findingsSummary.textContent = "装配关系清晰";
        return;
      }
      allFindings.slice(0, 40).forEach((finding) => appendTextElement(findingsList, "li", finding));
      if (allFindings.length > 40) appendTextElement(findingsList, "li", `另有 ${allFindings.length - 40} 条提示保留在完整复制中。`);
      findingsSummary.textContent = `${allFindings.length} 条待复核提示`;
    };

    const invalidate = () => {
      completeReport = "";
      report.dataset.ec154Ready = "false";
      copyReportButton.disabled = true;
      copyReportStatus.textContent = "";
      formStatus.textContent = "输入已变化，请重新生成装配交接。";
    };

    document.querySelectorAll("[data-ec154-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.dataset.ec154Preset;
        partsInput.value = presets[name];
        ceilingInput.value = name === "mixed" ? "10000" : "12000";
        errorOutput.textContent = "";
        invalidate();
        partsInput.focus();
      });
    });

    partsInput.addEventListener("input", invalidate);
    ceilingInput.addEventListener("input", invalidate);
    form.addEventListener("reset", () => {
      window.setTimeout(() => {
        errorOutput.textContent = "";
        stateOutput.textContent = "UNSET";
        preview.replaceChildren();
        appendTextElement(preview, "span", "等待装配关系");
        invalidate();
        formStatus.textContent = "已重置构件，等待生成装配交接。";
      }, 0);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      errorOutput.textContent = "";
      copyReportStatus.textContent = "";
      try {
        const records = parseRecords();
        const ceiling = parseInteger(ceilingInput.value, 1, 1000000000, null, "名义总质量上限");
        const byKey = new Map(records.map((record) => [record.key, record]));
        const roots = records.filter((record) => record.parentKey === null);
        const assemblyFindings = [];
        if (roots.length !== 1) assemblyFindings.push(`根构件数量为 ${roots.length}，内部规则要求恰好 1 个。`);
        records.forEach((record) => {
          if (record.parentKey === record.key) {
            assemblyFindings.push(`${record.part} 把自身登记为父部件。`);
          } else if (record.parentKey !== null && !byKey.has(record.parentKey)) {
            assemblyFindings.push(`${record.part} 的父部件“${record.parent}”未登记。`);
          }
        });
        assemblyFindings.push(...findCycles(records, byKey));
        const totalQuantity = records.reduce((sum, record) => sum + record.quantity, 0);
        const totalMass = records.reduce((sum, record) => sum + record.quantity * record.mass, 0);
        if (totalMass > ceiling) assemblyFindings.push(`名义总质量 ${totalMass}g 严格超过上限 ${ceiling}g。`);
        const statusFindings = records
          .filter((record) => record.state === "草模")
          .map((record) => `${record.part} 仍处于草模状态。`);
        let state = "ASSEMBLY CLEAR";
        if (assemblyFindings.length && statusFindings.length) state = `REVIEW ${assemblyFindings.length + statusFindings.length}`;
        else if (assemblyFindings.length) state = `ASSEMBLY FLAGS ${assemblyFindings.length}`;
        else if (statusFindings.length) state = `STATUS FLAGS ${statusFindings.length}`;
        const depths = records.map((record) => calculateDepth(record, byKey)).filter((value) => value !== null);
        const maxDepth = depths.length ? Math.max(...depths) : null;
        const childCounts = new Map();
        records.forEach((record) => {
          if (record.parentKey && byKey.has(record.parentKey) && record.parentKey !== record.key) {
            childCounts.set(record.parentKey, (childCounts.get(record.parentKey) || 0) + 1);
          }
        });
        const branchCount = [...childCounts.values()].filter((count) => count > 1).length;
        const materialCount = new Set(records.map((record) => record.material)).size;

        metric.count.textContent = String(records.length);
        metric.roots.textContent = String(roots.length);
        metric.materials.textContent = String(materialCount);
        metric.quantity.textContent = String(totalQuantity);
        metric.mass.textContent = `${totalMass} g`;
        metric.depth.textContent = maxDepth === null ? "—" : String(maxDepth);
        metric.branches.textContent = String(branchCount);
        metric.drafts.textContent = String(statusFindings.length);
        metric.ceiling.textContent = `${ceiling} g`;
        stateOutput.textContent = state;
        renderPreview(records, byKey);
        renderTree(records);
        renderFindings(assemblyFindings, statusFindings);

        const allFindings = [...assemblyFindings, ...statusFindings];
        const reportLines = [
          "爆炸图装配交接",
          `状态：${state}`,
          `构件数：${records.length}`,
          `根构件：${roots.length}`,
          `材料数：${materialCount}`,
          `总数量：${totalQuantity}`,
          `名义总质量：${totalMass} g`,
          `质量上限：${ceiling} g`,
          `最大层级：${maxDepth === null ? "无法完整计算" : maxDepth}`,
          `分支节点：${branchCount}`,
          `草模数：${statusFindings.length}`,
          "",
          "复核提示：",
          ...(allFindings.length ? allFindings.map((finding, index) => `${index + 1}. ${finding}`) : ["无"]),
          "",
          "构件清单：",
          ...records.map((record, index) => `${index + 1}. ${record.part} | ${record.material} | ${record.parent} | ${record.quantity} | ${record.mass}g | ${record.state}`),
          "",
          "边界：结果仅用于本地整理，不构成结构、人体工学、材料、制造、质量、安全、法规、知识产权或发布批准。"
        ];
        completeReport = reportLines.join("\n");
        report.dataset.ec154Ready = "true";
        copyReportButton.disabled = false;
        formStatus.textContent = `已生成：${state}。`;
      } catch (error) {
        completeReport = "";
        report.dataset.ec154Ready = "false";
        copyReportButton.disabled = true;
        stateOutput.textContent = "INPUT ERROR";
        errorOutput.textContent = error instanceof Error ? error.message : "输入无法解析。";
        formStatus.textContent = "未生成，请修正输入。";
        errorOutput.focus();
      }
    });

    copyReportButton.addEventListener("click", async () => {
      if (!completeReport) return;
      try {
        await copyText(completeReport);
        copyReportStatus.textContent = "完整装配交接已复制。";
      } catch (_error) {
        copyReportStatus.textContent = "复制失败，请手动选择交接内容。";
      }
    });
  }

  const routeForm = document.querySelector("[data-ec154-route-form]");
  if (routeForm) {
    const clueInput = routeForm.querySelector("[data-ec154-clue]");
    const routeStatus = routeForm.querySelector("[data-ec154-route-status]");
    routeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const clue = clueInput.value.trim();
      const length = Array.from(clue).length;
      if (length < 1 || length > 80) {
        routeStatus.textContent = "请输入 1–80 个 Unicode 字符的去向线索。";
        return;
      }
      let destination = "index.html";
      let label = "装配厅";
      if (/札|笔记|构件|部件/u.test(clue)) {
        destination = "article.html";
        label = "构件札";
      } else if (/结构|关系|质量|审计|工具/u.test(clue)) {
        destination = "tool.html";
        label = "结构台";
      } else if (/责任|边界|安全|权利/u.test(clue)) {
        destination = "legal.html";
        label = "责任图";
      }
      routeStatus.replaceChildren();
      routeStatus.append("建议前往：");
      const link = document.createElement("a");
      link.href = destination;
      link.textContent = label;
      routeStatus.appendChild(link);
    });
  }
})();
