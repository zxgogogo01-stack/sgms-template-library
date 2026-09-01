(() => {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.querySelector("[data-ml137-surface-toggle]");
  const copyStatusNodes = document.querySelectorAll("[data-ml137-copy-status]");
  const storageKey = "ml137-surface";

  const setText = (node, value) => {
    if (node) node.textContent = value;
  };

  const announceCopy = (message) => {
    copyStatusNodes.forEach((node) => setText(node, message));
  };

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

  const readTheme = () => {
    try {
      return localStorage.getItem(storageKey) === "night" ? "night" : "day";
    } catch (_) {
      return "day";
    }
  };

  const applyTheme = (surface) => {
    const night = surface === "night";
    root.dataset.ml137Surface = night ? "night" : "day";
    if (themeButton) {
      themeButton.setAttribute("aria-pressed", String(night));
      themeButton.textContent = night ? "返回日间测面" : "切换夜间测面";
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = night ? "#151a18" : "#d9d3c7";
  };

  applyTheme(readTheme());
  themeButton?.addEventListener("click", () => {
    const next = root.dataset.ml137Surface === "night" ? "day" : "night";
    applyTheme(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch (_) {
      /* The visual toggle remains available when storage is blocked. */
    }
  });

  const progress = document.querySelector(".ml137-progress");
  if (progress) {
    let scheduled = false;
    const updateProgress = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const measured = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      const value = measured >= 95 ? 100 : measured;
      progress.value = value;
      progress.setAttribute("value", String(value));
      scheduled = false;
    };
    window.addEventListener("scroll", () => {
      if (!scheduled) {
        scheduled = true;
        window.requestAnimationFrame(updateProgress);
      }
    }, { passive: true });
    updateProgress();
  }

  const storyButton = document.querySelector("[data-ml137-copy-story]");
  storyButton?.addEventListener("click", async () => {
    const story = [
      "石材板面札记摘要",
      "1. 名称和外观不等于来源证据，来源应由批次、单据或检测支持。",
      "2. 色带、层理、孔洞与裂隙须结合实物、尺度和连续板编号确认。",
      "3. 避让面积是加工交接数据，不是材料判废或使用批准。",
      "4. 表面处理可能改变颜色、反射、触感、孔隙和维护表现。",
      "5. 厚度、支撑、锚固、荷载、胶黏剂、运输与安装须回到真实项目核定。"
    ].join("\n");
    announceCopy((await copyText(story)) ? "材料摘要已复制。" : "复制失败，请手动选择内容。 ");
  });

  const plateDetails = Array.from(document.querySelectorAll(".ml137-plate-list details"));
  plateDetails.forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) return;
      plateDetails.forEach((peer) => {
        if (peer !== detail) peer.open = false;
      });
    });
  });

  const policyButton = document.querySelector("[data-ml137-copy-policy]");
  policyButton?.addEventListener("click", async () => {
    const policy = [
      "石材项目边界摘要",
      "页面与工具不鉴定石种、矿物、产地、等级、批次或来源合规性。",
      "避让数据不证明裂隙、孔洞、补胶、背网或板面变化已完整识别。",
      "页面不制定加工、处理、搬运、结构、锚固、安装、维护或现场安全方案。",
      "出材率不等于报价、采购数量、损耗承诺、质量验收或使用批准。",
      "真实项目须由相应责任人依据实物、图纸、检测、样板与现场条件确认。"
    ].join("\n");
    announceCopy((await copyText(policy)) ? "边界摘要已复制。" : "复制失败，请手动选择内容。 ");
  });

  const searchForm = document.querySelector("[data-ml137-search]");
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = searchForm.querySelector("#ml137-clue");
    const status = searchForm.querySelector("[data-ml137-search-status]");
    const clue = input.value.trim();
    const length = Array.from(clue).length;
    if (length === 0) {
      setText(status, "请输入材料、面积或项目边界线索。");
      return;
    }
    if (length > 80) {
      setText(status, "线索最多 80 个字符，请缩短后再查找。");
      return;
    }
    const routes = [
      { terms: ["石材", "原石", "纹理", "板面", "切割", "札记"], page: "article.html", label: "材料札记" },
      { terms: ["面积", "尺寸", "避让", "出材", "清单", "计算"], page: "tool.html", label: "板面清单" },
      { terms: ["结构", "安装", "材料", "成本", "权利", "边界"], page: "legal.html", label: "项目边界" }
    ];
    const route = routes.find((item) => item.terms.some((term) => clue.includes(term))) || { page: "index.html", label: "板面首页" };
    setText(status, `已匹配“${route.label}”，正在打开。`);
    window.setTimeout(() => window.location.assign(route.page), 350);
  });

  const slabForm = document.querySelector("[data-ml137-slab-form]");
  if (!slabForm) return;

  const rowsInput = slabForm.querySelector("#ml137-rows");
  const errorNode = slabForm.querySelector("[data-ml137-error]");
  const formStatus = slabForm.querySelector("[data-ml137-form-status]");
  const report = document.querySelector(".ml137-report");
  const reportState = report.querySelector("[data-ml137-report-state]");
  const yieldNode = report.querySelector("[data-ml137-yield]");
  const totalNode = report.querySelector("[data-ml137-total]");
  const slabCountNode = report.querySelector("[data-ml137-slab-count]");
  const grossNode = report.querySelector("[data-ml137-gross]");
  const cutCountNode = report.querySelector("[data-ml137-cut-count]");
  const statusCountNode = report.querySelector("[data-ml137-status-count]");
  const findingSummary = report.querySelector("[data-ml137-finding-summary]");
  const findingList = report.querySelector("[data-ml137-finding-list]");
  const slabSummary = report.querySelector("[data-ml137-slab-summary]");
  const slabList = report.querySelector("[data-ml137-slab-list]");
  const copyReportButton = report.querySelector("[data-ml137-copy-report]");
  const presets = {
    clear: "板面 A01 | 2400 | 1200 | 0 | 放行\n板面 A02 | 2200 | 1100 | 0 | 放行",
    avoid: "板面 B01 | 2400 | 1200 | 50000 | 放行\n板面 B02 | 2200 | 1100 | 0 | 放行",
    multi: "板面 C01 | 2600 | 1400 | 80000 | 放行\n板面 C02 | 2100 | 1050 | 35000 | 放行",
    review: "板面 D01 | 2400 | 1200 | 50000 | 测量\n板面 D02 | 2200 | 1100 | 0 | 复核"
  };
  const dimensionPattern = /^(?:[1-9]\d{2,3}|10000)$/;
  const avoidPattern = /^(?:0|[1-9]\d{0,7}|100000000)$/;
  const validStatuses = new Set(["测量", "复核", "放行"]);
  let currentReport = "";

  const pad2 = (value) => String(value).padStart(2, "0");
  const formatPercent = (net, gross) => {
    const scaled = (net * 10000n + gross / 2n) / gross;
    return `${scaled / 100n}.${pad2(scaled % 100n)}%`;
  };
  const formatSquareMetres = (area) => {
    const scaled = (area * 100n + 500000n) / 1000000n;
    return `${scaled / 100n}.${pad2(scaled % 100n)}`;
  };
  const normalName = (name) => name.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("zh-CN");

  const resetReport = (message = "等待至少两块板面记录。") => {
    currentReport = "";
    report.dataset.ready = "false";
    setText(reportState, "UNSET");
    setText(yieldNode, "—");
    setText(totalNode, "等待计算");
    setText(slabCountNode, "0");
    setText(grossNode, "0");
    setText(cutCountNode, "0");
    setText(statusCountNode, "0");
    setText(findingSummary, "等待计算");
    findingList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "报告生成后在此显示避让面积与清单状态提示。" }));
    setText(slabSummary, "等待计算");
    slabList.replaceChildren(Object.assign(document.createElement("p"), { textContent: "等待板面记录。" }));
    copyReportButton.disabled = true;
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
    if (lines.length < 2) throw new Error("请至少输入 2 块板面。");
    if (lines.length > 120) throw new Error("一次最多校核 120 块板面。");
    const exactNames = new Set();
    const normalizedNames = new Set();
    return lines.map((line, index) => {
      const fields = line.split("|").map((field) => field.trim());
      const row = index + 1;
      if (fields.length !== 5) throw new Error(`第 ${row} 行须包含 5 项，并以 | 分隔。`);
      const [name, lengthText, widthText, avoidText, status] = fields;
      const nameLength = Array.from(name).length;
      if (nameLength < 2 || nameLength > 24) throw new Error(`第 ${row} 行板号须为 2–24 个字符。`);
      if (/\p{Cc}|\p{Cf}/u.test(name)) throw new Error(`第 ${row} 行板号含不可见控制字符。`);
      if (exactNames.has(name)) throw new Error(`第 ${row} 行板号与前文完全重复：${name}。`);
      exactNames.add(name);
      const normalized = normalName(name);
      if (normalizedNames.has(normalized)) throw new Error(`第 ${row} 行板号规范化后重复：${name}。`);
      normalizedNames.add(normalized);
      if (!dimensionPattern.test(lengthText) || !dimensionPattern.test(widthText)) throw new Error(`第 ${row} 行长和宽须为 100–10000 的普通十进制整数。`);
      if (!avoidPattern.test(avoidText)) throw new Error(`第 ${row} 行避让面积须为 0–100000000 的普通十进制整数。`);
      if (!validStatuses.has(status)) throw new Error(`第 ${row} 行状态只能是“测量”“复核”或“放行”。`);
      const length = BigInt(lengthText);
      const width = BigInt(widthText);
      const avoid = BigInt(avoidText);
      const gross = length * width;
      if (avoid > gross) throw new Error(`第 ${row} 行避让面积不能大于该板毛面积。`);
      const net = gross - avoid;
      return { name, length, width, avoid, status, gross, net, yield: formatPercent(net, gross) };
    });
  };

  const addLimitedItems = (container, values, factory) => {
    const fragment = document.createDocumentFragment();
    values.slice(0, 40).forEach((value, index) => fragment.append(factory(value, index)));
    if (values.length > 40) {
      const more = document.createElement(container.tagName === "UL" ? "li" : "p");
      more.textContent = `界面仅显示前 40 项，另有 ${values.length - 40} 项已写入复制报告。`;
      fragment.append(more);
    }
    container.replaceChildren(fragment);
  };

  const renderReport = (slabs) => {
    const totalGross = slabs.reduce((sum, slab) => sum + slab.gross, 0n);
    const totalNet = slabs.reduce((sum, slab) => sum + slab.net, 0n);
    const cuts = slabs.filter((slab) => slab.avoid > 0n);
    const statuses = slabs.filter((slab) => slab.status !== "放行");
    const findings = [
      ...cuts.map((slab) => `${slab.name}：避让 ${slab.avoid} mm²，需在切割交接中确认位置与原因。`),
      ...statuses.map((slab) => `${slab.name}：当前状态为“${slab.status}”，尚未记录为放行。`)
    ];
    let state = "YIELD CLEAR";
    if (cuts.length && statuses.length) state = `REVIEW ${findings.length}`;
    else if (cuts.length) state = `CUT HINTS ${cuts.length}`;
    else if (statuses.length) state = `STATUS FLAGS ${statuses.length}`;
    const totalYield = formatPercent(totalNet, totalGross);

    report.dataset.ready = "true";
    setText(reportState, state);
    setText(yieldNode, totalYield);
    setText(totalNode, `${totalNet} / ${totalGross} mm²`);
    setText(slabCountNode, String(slabs.length));
    setText(grossNode, formatSquareMetres(totalGross));
    setText(cutCountNode, String(cuts.length));
    setText(statusCountNode, String(statuses.length));
    setText(findingSummary, findings.length ? `${findings.length} 项交接提示` : "没有避让或未放行状态");
    addLimitedItems(findingList, findings.length ? findings : ["全部板面避让面积为 0，且状态均为放行。"], (finding) => Object.assign(document.createElement("li"), { textContent: finding }));
    setText(slabSummary, `${slabs.length} 块板面的逐项结果`);
    addLimitedItems(slabList, slabs, (slab) => {
      const card = document.createElement("article");
      card.className = "ml137-slab-card";
      const title = document.createElement("b");
      const detail = document.createElement("span");
      const rate = document.createElement("strong");
      title.textContent = `${slab.name} · ${slab.status}`;
      detail.textContent = `${slab.length} × ${slab.width} mm · 毛 ${slab.gross} · 避让 ${slab.avoid} · 净 ${slab.net} mm²`;
      rate.textContent = slab.yield;
      card.append(title, detail, rate);
      return card;
    });

    const reportLines = [
      "板面出材报告",
      `状态：${state}`,
      `总出材率：${totalYield}`,
      `板面数量：${slabs.length}`,
      `总毛面积：${totalGross} mm²（${formatSquareMetres(totalGross)} m²）`,
      `总净面积：${totalNet} mm²`,
      `避让提示：${cuts.length}`,
      `状态提示：${statuses.length}`,
      "",
      "逐块板面：",
      ...slabs.map((slab, index) => `${index + 1}. ${slab.name} | ${slab.length} × ${slab.width} mm | 毛 ${slab.gross} mm² | 避让 ${slab.avoid} mm² | 净 ${slab.net} mm² | ${slab.yield} | ${slab.status}`),
      "",
      "交接提示：",
      ...(findings.length ? findings.map((finding, index) => `${index + 1}. ${finding}`) : ["无。全部板面避让面积为 0，且状态均为放行。"]),
      "",
      "边界：本报告只汇总文字板号、整数尺寸、避让面积、净面积、出材比例与文档状态；不鉴定石种、纹理、裂隙、强度、厚度、背网、荷载、支撑、锚固、胶黏剂、防滑、耐候、安装质量、成本或项目安全。"
    ];
    currentReport = reportLines.join("\n");
    copyReportButton.disabled = false;
    setText(formStatus, `已校核 ${slabs.length} 块板面，报告按总毛面积加权。`);
  };

  slabForm.querySelectorAll("[data-ml137-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      rowsInput.value = presets[button.dataset.ml137Preset];
      setText(errorNode, "");
      resetReport("示例已载入，请生成出材报告。");
      rowsInput.focus();
    });
  });

  rowsInput.addEventListener("input", () => {
    setText(errorNode, "");
    if (report.dataset.ready === "true") resetReport("输入已改变，请重新生成报告。");
  });

  slabForm.addEventListener("reset", () => {
    window.setTimeout(() => {
      setText(errorNode, "");
      resetReport("报告已清空，输入已恢复初始示例。");
    }, 0);
  });

  slabForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setText(errorNode, "");
    announceCopy("");
    try {
      renderReport(parseRows(rowsInput.value));
    } catch (error) {
      fail(error instanceof Error ? error.message : "输入未通过校核。");
    }
  });

  copyReportButton.addEventListener("click", async () => {
    if (!currentReport) return;
    announceCopy((await copyText(currentReport)) ? "完整报告已复制。" : "复制失败，请手动选择内容。 ");
  });
})();
