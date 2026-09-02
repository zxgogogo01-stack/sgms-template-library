(() => {
  "use strict";

  const root = document.documentElement;
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const storageKey = "tp153-tide-mode";
  const tideButton = document.querySelector("[data-tp153-tide-toggle]");

  function applyTide(mode) {
    const next = mode === "night" ? "night" : "day";
    root.setAttribute("data-tp153-tide", next);
    if (themeMeta) themeMeta.setAttribute("content", next === "night" ? "#102d35" : "#f1eadc");
    if (tideButton) {
      tideButton.textContent = next === "night" ? "返回日潮" : "切到夜潮";
      tideButton.setAttribute("aria-pressed", next === "night" ? "true" : "false");
    }
  }

  let remembered = "day";
  try { remembered = localStorage.getItem(storageKey) || "day"; } catch (_) { remembered = "day"; }
  applyTide(remembered);
  if (tideButton) tideButton.addEventListener("click", () => {
    const next = root.getAttribute("data-tp153-tide") === "night" ? "day" : "night";
    applyTide(next);
    try { localStorage.setItem(storageKey, next); } catch (_) { /* local persistence may be unavailable */ }
  });

  async function copyText(text, status, success) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const helper = document.createElement("textarea");
        helper.value = text;
        helper.setAttribute("readonly", "");
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        if (!document.execCommand("copy")) throw new Error("copy failed");
        helper.remove();
      }
      if (status) status.textContent = success;
    } catch (_) {
      if (status) status.textContent = "复制失败，请手动选择文字。";
    }
  }

  const sharedCopyStatus = document.querySelector("[data-tp153-copy-status]");
  const panelCopy = document.querySelector("[data-tp153-copy-panel]");
  if (panelCopy) panelCopy.addEventListener("click", () => copyText("{{PANEL_CODE}}", sharedCopyStatus, "样带编号已复制。"));

  const notesCopy = document.querySelector("[data-tp153-copy-notes]");
  if (notesCopy) notesCopy.addEventListener("click", () => copyText(
    "潮池样方六札：稳定命名；覆盖率采用 0–100 普通整数；四层潮位带缺口单独记录；群组份额以整数乘法和用户上限精确比较；草记逐条保留状态提示；交接同时保存数字、标签、原始记录与使用边界。",
    sharedCopyStatus,
    "六札摘要已复制。"
  ));

  const policyCopy = document.querySelector("[data-tp153-copy-policy]");
  if (policyCopy) policyCopy.addEventListener("click", () => copyText(
    "潮间带样方使用边界：页面不替代调查设计与口径、物种与样本鉴定、现场与潮汐安全、敏感地点与隐私管理、生态解释与影响评估、许可权利与发布批准。现实结论须回到原始记录、正式方法、现场条件和责任人。",
    sharedCopyStatus,
    "六层使用边界已复制。"
  ));

  const progress = document.querySelector("[data-tp153-progress]");
  if (progress) {
    const updateProgress = () => {
      const available = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.value = Math.max(0, Math.min(100, Math.round(window.scrollY / available * 100)));
    };
    updateProgress();
    addEventListener("scroll", updateProgress, { passive: true });
    addEventListener("resize", updateProgress, { passive: true });
  }

  const form = document.querySelector("[data-tp153-form]");
  if (form) {
    const recordsInput = form.querySelector("[data-tp153-records]");
    const limitInput = form.querySelector("[data-tp153-limit]");
    const errorBox = form.querySelector("[data-tp153-error]");
    const formStatus = form.querySelector("[data-tp153-form-status]");
    const report = document.querySelector(".tp153-report");
    const stateOut = report.querySelector("[data-tp153-state]");
    const preview = report.querySelector("[data-tp153-preview]");
    const findingsList = report.querySelector("[data-tp153-findings]");
    const findingsSummary = report.querySelector("[data-tp153-summary]");
    const bandList = report.querySelector("[data-tp153-band-list]");
    const copyReportButton = report.querySelector("[data-tp153-copy-report]");
    const reportCopyStatus = report.querySelector("[data-tp153-copy-status]");
    const metric = {
      rows: report.querySelector("[data-tp153-rows]"),
      quadrats: report.querySelector("[data-tp153-quadrats]"),
      cover: report.querySelector("[data-tp153-cover]"),
      groups: report.querySelector("[data-tp153-groups]"),
      bands: report.querySelector("[data-tp153-bands]"),
      dominant: report.querySelector("[data-tp153-dominant]"),
      over: report.querySelector("[data-tp153-over]"),
      drafts: report.querySelector("[data-tp153-drafts]"),
      limit: report.querySelector("[data-tp153-limit-out]")
    };
    const bands = ["高潮带", "中潮带", "低潮带", "潮下带"];
    const groups = ["藻类", "贝类", "甲壳类", "棘皮类", "其他"];
    const states = ["草记", "复核", "锁定"];
    const groupColours = { "藻类": "#267d61", "贝类": "#ff6458", "甲壳类": "#d7b163", "棘皮类": "#714fc8", "其他": "#102e34" };
    const defaultRecords = recordsInput.value;
    const defaultLimit = limitInput.value;
    let fullReport = "";

    const presets = {
      clear: {
        limit: "45",
        rows: "H01 | 高潮带 | 藻类 | 25 | 4 | 锁定\nH01 | 高潮带 | 贝类 | 20 | 5 | 复核\nM01 | 中潮带 | 甲壳类 | 30 | 6 | 锁定\nM01 | 中潮带 | 藻类 | 25 | 3 | 复核\nL01 | 低潮带 | 贝类 | 35 | 8 | 锁定\nL01 | 低潮带 | 棘皮类 | 15 | 2 | 复核\nS01 | 潮下带 | 其他 | 25 | 5 | 锁定\nS01 | 潮下带 | 藻类 | 25 | 4 | 复核"
      },
      over: {
        limit: "60",
        rows: "H02 | 高潮带 | 藻类 | 65 | 10 | 锁定\nH02 | 高潮带 | 贝类 | 50 | 7 | 复核\nM02 | 中潮带 | 甲壳类 | 30 | 5 | 锁定\nL02 | 低潮带 | 棘皮类 | 25 | 3 | 复核\nS02 | 潮下带 | 其他 | 20 | 2 | 锁定"
      },
      gap: {
        limit: "70",
        rows: "H03 | 高潮带 | 藻类 | 30 | 4 | 锁定\nH03 | 高潮带 | 贝类 | 20 | 2 | 复核\nM03 | 中潮带 | 甲壳类 | 35 | 5 | 锁定\nL03 | 低潮带 | 棘皮类 | 25 | 3 | 复核\nL03 | 低潮带 | 其他 | 15 | 2 | 锁定"
      },
      mixed: {
        limit: "42",
        rows: "H04 | 高潮带 | 藻类 | 70 | 8 | 草记\nH04 | 高潮带 | 贝类 | 45 | 5 | 复核\nM04 | 中潮带 | 藻类 | 40 | 6 | 草记\nM04 | 中潮带 | 甲壳类 | 20 | 3 | 锁定\nL04 | 低潮带 | 棘皮类 | 25 | 2 | 复核\nL04 | 低潮带 | 其他 | 15 | 2 | 锁定"
      }
    };

    function setText(node, value) { node.textContent = String(value); }

    function invalidate(message) {
      fullReport = "";
      report.setAttribute("data-tp153-ready", "false");
      copyReportButton.disabled = true;
      stateOut.textContent = "UNSET";
      if (reportCopyStatus) reportCopyStatus.textContent = "";
      formStatus.textContent = message || "输入已变化，请重新生成样带交接。";
    }

    function ordinaryInteger(raw, min, max, label, line) {
      if (!/^(0|[1-9]\d*)$/.test(raw)) throw new Error(`第 ${line} 行${label}须为 ${min}–${max} 的普通十进制整数。`);
      const value = Number(raw);
      if (!Number.isSafeInteger(value) || value < min || value > max) throw new Error(`第 ${line} 行${label}须在 ${min}–${max} 之间。`);
      return value;
    }

    function normalizedName(raw, line) {
      if (/[\p{Cc}\p{Cf}]/u.test(raw)) throw new Error(`第 ${line} 行样方号含控制或格式字符。`);
      const display = raw.normalize("NFKC").trim().replace(/\s+/gu, " ");
      const length = Array.from(display).length;
      if (length < 2 || length > 20) throw new Error(`第 ${line} 行样方号须为 2–20 个字符。`);
      return { display, key: display.toLocaleLowerCase("zh-Hans") };
    }

    function parseInput() {
      const raw = recordsInput.value;
      if (Array.from(raw).length > 8000) throw new Error("样方记录不得超过 8000 个 Unicode 字符。");
      const lines = raw.split(/\r?\n/).map(value => value.trim()).filter(Boolean);
      if (lines.length < 2 || lines.length > 80) throw new Error("请输入 2–80 条非空样方记录。");
      const seen = new Set();
      const quadratBands = new Map();
      const parsed = lines.map((source, index) => {
        const line = index + 1;
        if (/[\p{Cc}\p{Cf}]/u.test(source)) throw new Error(`第 ${line} 行含控制或格式字符。`);
        const parts = source.normalize("NFKC").split("|").map(value => value.trim());
        if (parts.length !== 6 || parts.some(value => value === "")) throw new Error(`第 ${line} 行须包含 6 个非空字段，并以 | 分隔。`);
        const name = normalizedName(parts[0], line);
        const band = parts[1];
        const group = parts[2];
        if (!bands.includes(band)) throw new Error(`第 ${line} 行潮位带只能是高潮带、中潮带、低潮带或潮下带。`);
        if (!groups.includes(group)) throw new Error(`第 ${line} 行生物组不在允许列表中。`);
        const cover = ordinaryInteger(parts[3], 0, 100, "覆盖率", line);
        const samples = ordinaryInteger(parts[4], 0, 999, "样本数", line);
        const state = parts[5];
        if (!states.includes(state)) throw new Error(`第 ${line} 行状态只能是草记、复核或锁定。`);
        if (quadratBands.has(name.key) && quadratBands.get(name.key) !== band) throw new Error(`第 ${line} 行样方“${name.display}”与此前潮位带不一致。`);
        quadratBands.set(name.key, band);
        const pair = `${name.key}\u0000${group}`;
        if (seen.has(pair)) throw new Error(`第 ${line} 行样方“${name.display}”与生物组“${group}”重复。`);
        seen.add(pair);
        return { line, name: name.display, key: name.key, band, group, cover, samples, state };
      });
      const limitRaw = limitInput.value.normalize("NFKC").trim();
      if (!/^[1-9]\d*$/.test(limitRaw)) throw new Error("份额上限须为 1–100 的普通十进制整数。");
      const limit = Number(limitRaw);
      if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) throw new Error("份额上限须在 1–100 之间。");
      return { records: parsed, limit };
    }

    function makeElement(tag, text, className) {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined) node.textContent = String(text);
      return node;
    }

    function renderPreview(records) {
      preview.replaceChildren();
      bands.forEach(band => {
        const row = makeElement("div", undefined, "tp153-band-row");
        row.appendChild(makeElement("b", band));
        records.filter(record => record.band === band).slice(0, 20).forEach(record => {
          const dot = makeElement("i", record.cover, undefined);
          dot.style.setProperty("--size", `${Math.max(22, Math.min(64, 22 + record.cover * 0.42))}px`);
          dot.style.setProperty("--organism", groupColours[record.group]);
          dot.setAttribute("title", `${record.name} · ${record.group} · ${record.cover}%`);
          row.appendChild(dot);
        });
        preview.appendChild(row);
      });
    }

    function renderBands(bandTotals, bandQuadrats) {
      bandList.replaceChildren();
      bands.forEach(band => {
        const card = makeElement("article", undefined, "tp153-band-card");
        card.appendChild(makeElement("b", band));
        card.appendChild(makeElement("span", `${bandTotals.get(band) || 0}%`));
        card.appendChild(makeElement("small", `${(bandQuadrats.get(band) || new Set()).size} 个样方 · 内部覆盖合计`));
        bandList.appendChild(card);
      });
    }

    function generate(event) {
      event.preventDefault();
      errorBox.textContent = "";
      try {
        const parsed = parseInput();
        const records = parsed.records;
        const limit = parsed.limit;
        const quadrats = new Map();
        const bandTotals = new Map(bands.map(band => [band, 0]));
        const bandQuadrats = new Map(bands.map(band => [band, new Set()]));
        const groupTotals = new Map(groups.map(group => [group, 0]));
        let totalCover = 0;
        let totalSamples = 0;
        let drafts = 0;

        records.forEach(record => {
          if (!quadrats.has(record.key)) quadrats.set(record.key, { name: record.name, band: record.band, cover: 0 });
          quadrats.get(record.key).cover += record.cover;
          bandTotals.set(record.band, bandTotals.get(record.band) + record.cover);
          bandQuadrats.get(record.band).add(record.key);
          groupTotals.set(record.group, groupTotals.get(record.group) + record.cover);
          totalCover += record.cover;
          totalSamples += record.samples;
          if (record.state === "草记") drafts += 1;
        });

        const coverFindings = [];
        let overCount = 0;
        quadrats.forEach(quadrat => {
          if (quadrat.cover > 100) {
            overCount += 1;
            coverFindings.push(`样方“${quadrat.name}”覆盖合计 ${quadrat.cover}%，严格超过 100%。`);
          }
        });
        bands.forEach(band => {
          if (bandQuadrats.get(band).size === 0) coverFindings.push(`${band}没有记录，形成样带缺口。`);
        });
        if (totalCover > 0) groups.forEach(group => {
          const amount = groupTotals.get(group);
          if (amount * 100 > totalCover * limit) coverFindings.push(`${group}覆盖 ${amount}/${totalCover}，严格超过 ${limit}% 份额上限。`);
        });
        const statusFindings = records.filter(record => record.state === "草记").map(record => `第 ${record.line} 行“${record.name} / ${record.group}”仍为草记。`);
        const allFindings = coverFindings.concat(statusFindings);
        let state = "TRANSECT CLEAR";
        if (coverFindings.length && statusFindings.length) state = `REVIEW ${allFindings.length}`;
        else if (coverFindings.length) state = `COVER FLAGS ${coverFindings.length}`;
        else if (statusFindings.length) state = `STATUS FLAGS ${statusFindings.length}`;

        const usedGroups = groups.filter(group => groupTotals.get(group) > 0);
        const usedBands = bands.filter(band => bandQuadrats.get(band).size > 0);
        const dominant = totalCover === 0 ? "—" : groups.slice().sort((a, b) => groupTotals.get(b) - groupTotals.get(a) || groups.indexOf(a) - groups.indexOf(b))[0];
        const dominantText = totalCover === 0 ? "—" : `${dominant} ${(groupTotals.get(dominant) * 100 / totalCover).toFixed(1)}%`;

        setText(metric.rows, records.length);
        setText(metric.quadrats, quadrats.size);
        setText(metric.cover, `${totalCover}%`);
        setText(metric.groups, usedGroups.length);
        setText(metric.bands, `${usedBands.length}/4`);
        setText(metric.dominant, dominantText);
        setText(metric.over, overCount);
        setText(metric.drafts, drafts);
        setText(metric.limit, `${limit}%`);
        stateOut.textContent = state;
        findingsSummary.textContent = allFindings.length ? `${allFindings.length} 项需要复核` : "没有内部提示";
        findingsList.replaceChildren();
        if (allFindings.length === 0) findingsList.appendChild(makeElement("li", "覆盖合计、四层潮带、群组份额与状态均通过当前内部规则。"));
        allFindings.slice(0, 40).forEach(finding => findingsList.appendChild(makeElement("li", finding)));
        if (allFindings.length > 40) findingsList.appendChild(makeElement("li", `界面省略 ${allFindings.length - 40} 项；完整复制保留全部提示。`));
        renderPreview(records);
        renderBands(bandTotals, bandQuadrats);

        const reportLines = [
          "潮间带样方交接",
          `状态：${state}`,
          `记录数：${records.length}`,
          `样方数：${quadrats.size}`,
          `覆盖合计：${totalCover}%`,
          `样本数合计：${totalSamples}`,
          `使用群组：${usedGroups.length}`,
          `已填潮带：${usedBands.length}/4`,
          `主导群组：${dominantText}`,
          `过载样方：${overCount}`,
          `草记数：${drafts}`,
          `单一群组份额上限：${limit}%`,
          "",
          "四层覆盖：",
          ...bands.map(band => `- ${band}：${bandTotals.get(band)}% / ${bandQuadrats.get(band).size} 个样方`),
          "",
          "原始记录：",
          ...records.map(record => `- ${record.name} | ${record.band} | ${record.group} | ${record.cover}% | ${record.samples} | ${record.state}`),
          "",
          "提示：",
          ...(allFindings.length ? allFindings.map(finding => `- ${finding}`) : ["- 无内部提示。"]),
          "",
          "边界：本报告只整理用户输入的内部标签与整数关系，不构成物种鉴定、调查设计、统计推断、生态影响、潮汐判断、现场安全、许可或发布批准。"
        ];
        fullReport = reportLines.join("\n");
        report.setAttribute("data-tp153-ready", "true");
        copyReportButton.disabled = false;
        formStatus.textContent = `已生成 ${records.length} 条记录的样带交接。`;
      } catch (error) {
        errorBox.textContent = error instanceof Error ? error.message : "输入无法解析。";
        invalidate("生成失败，请修正输入后重试。");
      }
    }

    form.addEventListener("submit", generate);
    recordsInput.addEventListener("input", () => invalidate());
    limitInput.addEventListener("input", () => invalidate());
    form.querySelectorAll("[data-tp153-preset]").forEach(button => button.addEventListener("click", () => {
      const preset = presets[button.getAttribute("data-tp153-preset")];
      if (!preset) return;
      recordsInput.value = preset.rows;
      limitInput.value = preset.limit;
      errorBox.textContent = "";
      invalidate("场景已装入，请生成样带交接。");
    }));
    form.addEventListener("reset", () => setTimeout(() => {
      recordsInput.value = defaultRecords;
      limitInput.value = defaultLimit;
      errorBox.textContent = "";
      invalidate("记录已重置，等待重新生成。");
    }, 0));
    copyReportButton.addEventListener("click", () => {
      if (fullReport) copyText(fullReport, reportCopyStatus, "完整样带交接已复制。");
    });
  }

  const routeForm = document.querySelector("[data-tp153-route-form]");
  if (routeForm) {
    const clue = routeForm.querySelector("[data-tp153-clue]");
    const routeStatus = routeForm.querySelector("[data-tp153-route-status]");
    routeForm.addEventListener("submit", event => {
      event.preventDefault();
      const value = clue.value.normalize("NFKC").trim();
      const length = Array.from(value).length;
      if (length === 0) { routeStatus.textContent = "请输入一个样方线索。"; return; }
      if (length > 80) { routeStatus.textContent = "线索最多 80 个 Unicode 字符。"; return; }
      let target = "index.html";
      let label = "样带首页";
      if (/札|笔记|样方|潮池|记录/i.test(value)) { target = "article.html"; label = "潮池札"; }
      else if (/覆盖|比例|计算|审计|工具/i.test(value)) { target = "tool.html"; label = "覆盖台"; }
      else if (/边界|责任|许可|安全|权利/i.test(value)) { target = "legal.html"; label = "海岸边界"; }
      routeStatus.textContent = `正在返回${label}。`;
      window.location.href = target;
    });
  }
})();
