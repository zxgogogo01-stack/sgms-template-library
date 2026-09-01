(() => {
  "use strict";

  const root = document.documentElement;
  const proofToggle = document.querySelector("[data-rp143-proof-toggle]");
  const copyStatuses = document.querySelectorAll("[data-rp143-copy-status]");
  const proofKey = "rp143-proof-light";
  const setText = (node, value) => { if (node) node.textContent = value; };
  const announceCopy = (message) => copyStatuses.forEach((node) => setText(node, message));

  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.append(field);
      field.select();
      const success = document.execCommand("copy");
      field.remove();
      return success;
    } catch { return false; }
  };

  const applyProofLight = (day) => {
    root.dataset.rp143Proof = day ? "day" : "night";
    if (proofToggle) {
      proofToggle.textContent = day ? "切换夜间校样" : "恢复日间校样";
      proofToggle.setAttribute("aria-pressed", String(day));
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", day ? "#f1ecd9" : "#151824");
  };
  let dayProof = true;
  try { dayProof = localStorage.getItem(proofKey) !== "night"; } catch { dayProof = true; }
  applyProofLight(dayProof);
  proofToggle?.addEventListener("click", () => {
    dayProof = root.dataset.rp143Proof !== "day";
    applyProofLight(dayProof);
    try { localStorage.setItem(proofKey, dayProof ? "day" : "night"); } catch { /* optional preference */ }
  });

  document.querySelector("[data-rp143-copy-code]")?.addEventListener("click", async () => {
    const value = document.querySelector("[data-rp143-proof-code]")?.textContent.trim() || "";
    announceCopy((await copyText(value)) ? "校样编号已复制。" : "复制失败，请手动选择编号。");
  });

  const progress = document.querySelector(".rp143-progress");
  if (progress) {
    let queued = false;
    const update = () => {
      const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.setAttribute("value", String(Math.min(100, Math.round((window.scrollY / range) * 100))));
      queued = false;
    };
    const request = () => { if (!queued) { queued = true; window.requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }

  document.querySelector("[data-rp143-copy-note]")?.addEventListener("click", async () => {
    const text = [
      "套准校样摘要",
      "1. 先确认文件、印版与内容版本，再解释任何测量结果。",
      "2. 偏移尺把 X/Y 转为百分之一毫米整数，以平方关系和用户容差比较。",
      "3. 径向偏移显示值为近似；超差判断不使用舍入显示值。",
      "4. 容差来自项目，不是页面推荐的设备或质量标准。",
      "5. 颜色、材料、设备、生产、权利与放行由对应责任人确认。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "套准摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const policyDetails = Array.from(document.querySelectorAll(".rp143-policy-list details"));
  policyDetails.forEach((detail) => detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    policyDetails.forEach((other) => { if (other !== detail) other.open = false; });
  }));
  document.querySelector("[data-rp143-copy-policy]")?.addEventListener("click", async () => {
    const text = [
      "套准校样责任摘要",
      "页面不核验真实生产文件、字体、图像、分色、出血、裁切或输出设置。",
      "CSS 叠色不是色样；真实颜色、材料、设备、测量与观察条件须另行确认。",
      "本地坐标报告不是签样、调机、返工、采购、生产、验收或交付指令。",
      "客户、员工、文件、字体、图像、设计与商标须核对隐私、保密、许可和权利。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "责任摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const searchForm = document.querySelector("[data-rp143-search]");
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = searchForm.querySelector("#rp143-clue");
    const status = searchForm.querySelector("[data-rp143-search-status]");
    const clue = input.value.trim();
    const length = Array.from(clue).length;
    if (!length) { setText(status, "请输入版本、偏移或责任边界线索。"); return; }
    if (length > 80) { setText(status, "线索最多 80 个字符，请缩短后再套准。"); return; }
    const routes = [
      { terms: ["版本", "文件", "坐标", "容差", "观察", "札记"], page: "article.html", label: "套准札记" },
      { terms: ["偏移", "向量", "X", "Y", "测量", "版位"], page: "tool.html", label: "偏移测量尺" },
      { terms: ["颜色", "材料", "设备", "报价", "权利", "隐私", "生产"], page: "legal.html", label: "责任页" }
    ];
    const route = routes.find((item) => item.terms.some((term) => clue.includes(term))) || { page: "index.html", label: "校样台首页" };
    setText(status, `已匹配“${route.label}”，正在重新套版。`);
    window.setTimeout(() => window.location.assign(route.page), 350);
  });

  const vectorForm = document.querySelector("[data-rp143-vector-form]");
  if (!vectorForm) return;
  const input = vectorForm.querySelector("#rp143-rows");
  const errorNode = vectorForm.querySelector("[data-rp143-error]");
  const formStatus = vectorForm.querySelector("[data-rp143-form-status]");
  const report = document.querySelector(".rp143-vector-report");
  const q = (selector) => report.querySelector(selector);
  const stateNode = q("[data-rp143-report-state]");
  const highestNode = q("[data-rp143-highest]");
  const highestLabel = q("[data-rp143-highest-label]");
  const xMark = q("[data-rp143-x-mark]");
  const yMark = q("[data-rp143-y-mark]");
  const plateCount = q("[data-rp143-plate-count]");
  const driftCount = q("[data-rp143-drift-count]");
  const statusCount = q("[data-rp143-status-count]");
  const findingSummary = q("[data-rp143-finding-summary]");
  const findingList = q("[data-rp143-finding-list]");
  const plateSummary = q("[data-rp143-plate-summary]");
  const plateList = q("[data-rp143-plate-list]");
  const copyButton = q("[data-rp143-copy-report]");
  const offsetPattern = /^-?(?:0|[1-9]\d?)(?:\.\d{1,2})?$/;
  const tolerancePattern = /^(?:0\.(?:0[1-9]|[1-9]\d?)|[1-9]\d?(?:\.\d{1,2})?)$/;
  const validStatuses = new Set(["草稿", "套准", "锁版"]);
  const presets = {
    clear: "青版 A | 0.02 | -0.01 | 0.05 | 锁版\n红版 B | -0.03 | 0.04 | 0.06 | 锁版",
    edge: "黑版 C | 0.03 | 0.04 | 0.05 | 锁版\n黄版 D | 0.00 | 0.00 | 0.01 | 锁版",
    multi: "青版 E | 0.06 | 0.08 | 0.09 | 锁版\n红版 F | -0.09 | 0.12 | 0.14 | 锁版",
    review: "青版 G | 0.06 | 0.08 | 0.09 | 草稿\n黑版 H | -0.03 | 0.04 | 0.06 | 套准"
  };
  let currentReport = "";

  const normalizeName = (name) => name.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("zh-CN");
  const toCenti = (text) => {
    const negative = text.startsWith("-");
    const unsigned = negative ? text.slice(1) : text;
    const [whole, fraction = ""] = unsigned.split(".");
    const value = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
    return negative ? -value : value;
  };
  const formatCenti = (value, signed = false) => {
    const sign = value < 0 ? "−" : signed ? "+" : "";
    const absolute = Math.abs(value);
    return `${sign}${Math.floor(absolute / 100)}.${String(absolute % 100).padStart(2, "0")}`;
  };
  const magnitude = (plate) => Math.sqrt(plate.driftSquared) / 100;
  const utilization = (plate) => (Math.sqrt(plate.driftSquared) / plate.tolerance) * 100;

  const resetReport = (message = "等待至少两个版位。") => {
    currentReport = "";
    report.dataset.ready = "false";
    setText(stateNode, "UNSET");
    setText(highestNode, "—");
    setText(highestLabel, "等待测量");
    xMark.style.transform = "translate(0, 0)";
    yMark.style.transform = "translate(0, 0)";
    setText(plateCount, "0");
    setText(driftCount, "0");
    setText(statusCount, "0");
    setText(findingSummary, "等待测量");
    findingList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "报告生成后显示超出用户容差与未锁版状态。" }));
    setText(plateSummary, "等待测量");
    plateList.replaceChildren(Object.assign(document.createElement("p"), { textContent: "等待印版坐标。" }));
    copyButton.disabled = true;
    setText(formStatus, message);
    announceCopy("");
  };
  const fail = (message) => { setText(errorNode, message); resetReport("输入未通过校核，套准报告未生成。"); };

  const parseRows = (raw) => {
    if (Array.from(raw).length > 6000) throw new Error("全部输入最多 6000 个字符。");
    const lines = raw.split(/\r?\n/u).map((line) => line.trim()).filter(Boolean);
    if (lines.length < 2) throw new Error("请至少输入 2 个版位。");
    if (lines.length > 100) throw new Error("一次最多计算 100 个版位。");
    const exact = new Set();
    const normalized = new Set();
    return lines.map((line, index) => {
      const row = index + 1;
      const fields = line.split("|").map((field) => field.trim());
      if (fields.length !== 5) throw new Error(`第 ${row} 行须包含 5 项，并以 | 分隔。`);
      const [name, xText, yText, toleranceText, status] = fields;
      const nameLength = Array.from(name).length;
      if (nameLength < 2 || nameLength > 24) throw new Error(`第 ${row} 行版位须为 2–24 个字符。`);
      if (/\p{Cc}|\p{Cf}/u.test(name)) throw new Error(`第 ${row} 行版位含不可见控制字符。`);
      if (exact.has(name)) throw new Error(`第 ${row} 行版位与前文完全重复：${name}。`);
      exact.add(name);
      const key = normalizeName(name);
      if (normalized.has(key)) throw new Error(`第 ${row} 行版位规范化后重复：${name}。`);
      normalized.add(key);
      if (!offsetPattern.test(xText)) throw new Error(`第 ${row} 行 X 偏移须为 −99.99–99.99 mm、最多两位小数的普通十进制数。`);
      if (!offsetPattern.test(yText)) throw new Error(`第 ${row} 行 Y 偏移须为 −99.99–99.99 mm、最多两位小数的普通十进制数。`);
      if (!tolerancePattern.test(toleranceText)) throw new Error(`第 ${row} 行容差须为 0.01–99.99 mm、最多两位小数的普通正十进制数。`);
      if (!validStatuses.has(status)) throw new Error(`第 ${row} 行状态只能是“草稿”“套准”或“锁版”。`);
      const x = toCenti(xText);
      const y = toCenti(yText);
      const tolerance = toCenti(toleranceText);
      const driftSquared = x * x + y * y;
      const toleranceSquared = tolerance * tolerance;
      const outside = driftSquared > toleranceSquared;
      return { name, x, y, tolerance, status, driftSquared, toleranceSquared, outside };
    });
  };

  const addLimited = (container, values, factory) => {
    const fragment = document.createDocumentFragment();
    values.slice(0, 40).forEach((value, index) => fragment.append(factory(value, index)));
    if (values.length > 40) {
      const more = document.createElement(container.tagName === "OL" ? "li" : "p");
      more.textContent = `界面仅显示前 40 项，另有 ${values.length - 40} 项已写入复制交接。`;
      fragment.append(more);
    }
    container.replaceChildren(fragment);
  };

  const render = (plates) => {
    const driftFlags = plates.filter((plate) => plate.outside);
    const statusFlags = plates.filter((plate) => plate.status !== "锁版");
    const findings = [
      ...driftFlags.map((plate) => `${plate.name}：径向偏移约 ${magnitude(plate).toFixed(2)} mm，超出用户容差 ${formatCenti(plate.tolerance)} mm。`),
      ...statusFlags.map((plate) => `${plate.name}：当前状态为“${plate.status}”，尚未记录为锁版。`)
    ];
    let state = "DRIFT CLEAR";
    if (driftFlags.length && statusFlags.length) state = `REVIEW ${findings.length}`;
    else if (driftFlags.length) state = `DRIFT FLAGS ${driftFlags.length}`;
    else if (statusFlags.length) state = `STATUS FLAGS ${statusFlags.length}`;
    const highest = plates.reduce((best, plate) => {
      if (!best) return plate;
      const left = BigInt(plate.driftSquared) * BigInt(best.toleranceSquared);
      const right = BigInt(best.driftSquared) * BigInt(plate.toleranceSquared);
      return left > right ? plate : best;
    }, null);
    const util = utilization(highest);
    const clamp = (value) => Math.max(-58, Math.min(58, value));
    const xPosition = clamp((highest.x / highest.tolerance) * 44);
    const yPosition = clamp((highest.y / highest.tolerance) * 44);

    report.dataset.ready = "true";
    setText(stateNode, state);
    setText(highestNode, `≈ ${util.toFixed(2)}%`);
    setText(highestLabel, `${highest.name} · 径向约 ${magnitude(highest).toFixed(2)} mm / 容差 ${formatCenti(highest.tolerance)} mm`);
    xMark.style.transform = `translate(${xPosition.toFixed(1)}px, ${yPosition.toFixed(1)}px)`;
    yMark.style.transform = `translate(${xPosition.toFixed(1)}px, ${yPosition.toFixed(1)}px)`;
    setText(plateCount, String(plates.length));
    setText(driftCount, String(driftFlags.length));
    setText(statusCount, String(statusFlags.length));
    setText(findingSummary, findings.length ? `${findings.length} 项校样提示` : "没有超差或未锁版提示");
    addLimited(findingList, findings.length ? findings : ["全部二维偏移均未超出用户容差，且状态均为锁版。"], (finding) => Object.assign(document.createElement("li"), { textContent: finding }));
    setText(plateSummary, `${plates.length} 个版位 · ${driftFlags.length} 个超差`);
    addLimited(plateList, plates, (plate) => {
      const card = document.createElement("article");
      card.className = "rp143-plate-card";
      const title = document.createElement("b");
      const vector = document.createElement("span");
      const radial = document.createElement("strong");
      title.textContent = `${plate.name} · ${plate.status}`;
      vector.textContent = `X ${formatCenti(plate.x, true)} mm · Y ${formatCenti(plate.y, true)} mm · 容差 ${formatCenti(plate.tolerance)} mm`;
      radial.textContent = `≈ ${magnitude(plate).toFixed(2)} mm`;
      card.append(title, vector, radial);
      return card;
    });

    currentReport = [
      "套准校样交接",
      `状态：${state}`,
      `最高容差占用：${highest.name} / 约 ${util.toFixed(2)}%`,
      `版位：${plates.length}`,
      `超差提示：${driftFlags.length}`,
      `状态提示：${statusFlags.length}`,
      "",
      "逐版坐标：",
      ...plates.map((plate, index) => `${index + 1}. ${plate.name} | X ${formatCenti(plate.x, true)} mm | Y ${formatCenti(plate.y, true)} mm | 径向约 ${magnitude(plate).toFixed(2)} mm | 容差 ${formatCenti(plate.tolerance)} mm | ${plate.outside ? "超差" : "未超差"} | ${plate.status}`),
      "",
      "校样提示：",
      ...(findings.length ? findings.map((finding, index) => `${index + 1}. ${finding}`) : ["无。全部二维偏移均未超出用户容差，且状态均为锁版。"]),
      "",
      "计算口径：X、Y 与容差先按百分之一毫米转换为整数，是否超差以 X²+Y² > 容差² 判断；径向显示值与百分比为近似展示。",
      "边界：报告不读取或判断真实文件、印版、颜色、材料、设备、测量仪、工艺、人员、成本、生产、权利或交付。"
    ].join("\n");
    copyButton.disabled = false;
    setText(formStatus, `已测量 ${plates.length} 个版位；容差完全来自用户输入。`);
  };

  vectorForm.querySelectorAll("[data-rp143-preset]").forEach((button) => button.addEventListener("click", () => {
    input.value = presets[button.dataset.rp143Preset];
    setText(errorNode, "");
    resetReport("示例已放上校样台，请生成套准报告。");
    input.focus();
  }));
  input.addEventListener("input", () => {
    setText(errorNode, "");
    if (report.dataset.ready === "true") resetReport("坐标已改变，请重新生成套准报告。");
  });
  vectorForm.addEventListener("reset", () => window.setTimeout(() => {
    setText(errorNode, "");
    resetReport("校样已撤下，输入已恢复初始示例。");
  }, 0));
  vectorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setText(errorNode, "");
    announceCopy("");
    try { render(parseRows(input.value)); }
    catch (error) { fail(error instanceof Error ? error.message : "输入未通过校核。"); }
  });
  copyButton.addEventListener("click", async () => {
    if (!currentReport) return;
    announceCopy((await copyText(currentReport)) ? "完整校样交接已复制。" : "复制失败，请手动选择内容。");
  });
})();
