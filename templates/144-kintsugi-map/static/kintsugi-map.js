(() => {
  "use strict";

  const root = document.documentElement;
  const roomToggle = document.querySelector("[data-ki144-room-toggle]");
  const copyStatuses = document.querySelectorAll("[data-ki144-copy-status]");
  const roomKey = "ki144-repair-room";
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
      const copied = document.execCommand("copy");
      field.remove();
      return copied;
    } catch { return false; }
  };

  const applyRoom = (paper) => {
    root.dataset.ki144Room = paper ? "paper" : "lacquer";
    if (roomToggle) {
      roomToggle.textContent = paper ? "进入漆夜" : "回到和纸日光";
      roomToggle.setAttribute("aria-pressed", String(paper));
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", paper ? "#ebe4d5" : "#111313");
  };
  let paperRoom = true;
  try { paperRoom = localStorage.getItem(roomKey) !== "lacquer"; } catch { paperRoom = true; }
  applyRoom(paperRoom);
  roomToggle?.addEventListener("click", () => {
    paperRoom = root.dataset.ki144Room !== "paper";
    applyRoom(paperRoom);
    try { localStorage.setItem(roomKey, paperRoom ? "paper" : "lacquer"); } catch { /* optional preference */ }
  });

  document.querySelector("[data-ki144-copy-archive]")?.addEventListener("click", async () => {
    const value = document.querySelector("[data-ki144-archive]")?.textContent.trim() || "";
    announceCopy((await copyText(value)) ? "档案编号已复制。" : "复制失败，请手动选择编号。");
  });

  const progress = document.querySelector(".ki144-progress");
  if (progress) {
    let queued = false;
    const update = () => {
      const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      progress.setAttribute("value", String(atEnd ? 100 : Math.min(99, Math.round((window.scrollY / range) * 100))));
      queued = false;
    };
    const request = () => { if (!queued) { queued = true; window.requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }

  document.querySelector("[data-ki144-copy-note]")?.addEventListener("click", async () => {
    const text = [
      "器物修复记录摘要",
      "1. 身份、年代、材质、工艺、来源与权利陈述必须有当前依据。",
      "2. 拼片图只处理用户输入的无向关系，不判断真实碎片适配。",
      "3. 连通片组与闭环是图结构，不是修复质量或稳定性结论。",
      "4. 漆、胶、填料、金属粉、清洁、固化与安全由合格人员判断。",
      "5. 关系或状态变化后重新生成报告并保留交接证据。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "修复摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const legalItems = Array.from(document.querySelectorAll(".ki144-legal-list details"));
  legalItems.forEach((item) => item.addEventListener("toggle", () => {
    if (!item.open) return;
    legalItems.forEach((other) => { if (other !== item) other.open = false; });
  }));
  document.querySelector("[data-ki144-copy-policy]")?.addEventListener("click", async () => {
    const text = [
      "器物修复责任摘要",
      "页面不鉴定器物身份、年代、材质、真伪、来源、所有权或文化价值。",
      "拼片关系不读取照片、尺寸、轮廓、断面、旧修、稳定性或真实适配。",
      "页面不推荐材料与处理，也不判断保存、使用、食品接触或职业安全。",
      "价值、保险、运输、展陈、交易、隐私、许可与权利须由对应责任人确认。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "责任摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const searchForm = document.querySelector("[data-ki144-search]");
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = searchForm.querySelector("#ki144-clue");
    const status = searchForm.querySelector("[data-ki144-search-status]");
    const clue = input.value.trim();
    const length = Array.from(clue).length;
    if (!length) { setText(status, "请输入观察、片组或责任边界线索。"); return; }
    if (length > 80) { setText(status, "线索最多 80 个字符，请缩短后再寻找。"); return; }
    const routes = [
      { terms: ["观察", "器物", "接缝", "材料", "交接", "札记"], page: "article.html", label: "器物札记" },
      { terms: ["片组", "片号", "关系", "闭环", "图谱", "连通"], page: "tool.html", label: "拼片关系图" },
      { terms: ["鉴定", "来源", "安全", "价值", "运输", "权利", "隐私"], page: "legal.html", label: "责任卷" }
    ];
    const route = routes.find((item) => item.terms.some((term) => clue.includes(term))) || { page: "index.html", label: "修复台首页" };
    setText(status, `已匹配“${route.label}”，正在展开档案。`);
    window.setTimeout(() => window.location.assign(route.page), 350);
  });

  const graphForm = document.querySelector("[data-ki144-graph-form]");
  if (!graphForm) return;
  const input = graphForm.querySelector("#ki144-rows");
  const errorNode = graphForm.querySelector("[data-ki144-error]");
  const formStatus = graphForm.querySelector("[data-ki144-form-status]");
  const report = document.querySelector(".ki144-graph-report");
  const q = (selector) => report.querySelector(selector);
  const stateNode = q("[data-ki144-report-state]");
  const componentTotal = q("[data-ki144-component-total]");
  const componentLabel = q("[data-ki144-component-label]");
  const seamCount = q("[data-ki144-seam-count]");
  const pieceCount = q("[data-ki144-piece-count]");
  const cycleCount = q("[data-ki144-cycle-count]");
  const statusCount = q("[data-ki144-status-count]");
  const findingSummary = q("[data-ki144-finding-summary]");
  const findingList = q("[data-ki144-finding-list]");
  const seamSummary = q("[data-ki144-seam-summary]");
  const seamList = q("[data-ki144-seam-list]");
  const copyButton = q("[data-ki144-copy-report]");
  const validStatuses = new Set(["待描", "已合", "封存"]);
  const presets = {
    clear: "接缝 01 | 瓷片 A | 瓷片 B | 封存\n接缝 02 | 瓷片 B | 瓷片 C | 封存",
    split: "接缝 03 | 瓷片 A | 瓷片 B | 封存\n接缝 04 | 瓷片 C | 瓷片 D | 封存",
    cycle: "接缝 05 | 瓷片 A | 瓷片 B | 封存\n接缝 06 | 瓷片 B | 瓷片 C | 封存\n接缝 07 | 瓷片 C | 瓷片 A | 封存",
    review: "接缝 08 | 瓷片 A | 瓷片 B | 待描\n接缝 09 | 瓷片 C | 瓷片 D | 已合"
  };
  let currentReport = "";
  const normalize = (value) => value.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("zh-CN");

  const resetReport = (message = "等待至少两条接缝。") => {
    currentReport = "";
    report.dataset.ready = "false";
    setText(stateNode, "UNSET");
    setText(componentTotal, "—");
    setText(componentLabel, "等待绘图");
    setText(seamCount, "0");
    setText(pieceCount, "0");
    setText(cycleCount, "0");
    setText(statusCount, "0");
    setText(findingSummary, "等待绘图");
    findingList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "报告生成后显示分离片组和未封存状态。" }));
    setText(seamSummary, "等待绘图");
    seamList.replaceChildren(Object.assign(document.createElement("p"), { textContent: "等待接缝记录。" }));
    copyButton.disabled = true;
    setText(formStatus, message);
    announceCopy("");
  };
  const fail = (message) => { setText(errorNode, message); resetReport("输入未通过校核，拼片图谱未生成。"); };

  const parseRows = (raw) => {
    if (Array.from(raw).length > 6000) throw new Error("全部输入最多 6000 个字符。");
    const lines = raw.split(/\r?\n/u).map((line) => line.trim()).filter(Boolean);
    if (lines.length < 2) throw new Error("请至少输入 2 条接缝记录。");
    if (lines.length > 100) throw new Error("一次最多计算 100 条接缝记录。");
    const exactSeams = new Set();
    const normalizedSeams = new Set();
    const pairs = new Set();
    return lines.map((line, index) => {
      const row = index + 1;
      const fields = line.split("|").map((field) => field.trim());
      if (fields.length !== 4) throw new Error(`第 ${row} 行须包含 4 项，并以 | 分隔。`);
      const [seam, pieceA, pieceB, status] = fields;
      for (const [label, value] of [["接缝号", seam], ["片号 A", pieceA], ["片号 B", pieceB]]) {
        const length = Array.from(value).length;
        if (length < 2 || length > 24) throw new Error(`第 ${row} 行${label}须为 2–24 个字符。`);
        if (/\p{Cc}|\p{Cf}/u.test(value)) throw new Error(`第 ${row} 行${label}含不可见控制字符。`);
      }
      if (exactSeams.has(seam)) throw new Error(`第 ${row} 行接缝号与前文完全重复：${seam}。`);
      exactSeams.add(seam);
      const seamKey = normalize(seam);
      if (normalizedSeams.has(seamKey)) throw new Error(`第 ${row} 行接缝号规范化后重复：${seam}。`);
      normalizedSeams.add(seamKey);
      const aKey = normalize(pieceA);
      const bKey = normalize(pieceB);
      if (aKey === bKey) throw new Error(`第 ${row} 行不能把同一片号连接到自身。`);
      const pairKey = [aKey, bKey].sort().join("\u0000");
      if (pairs.has(pairKey)) throw new Error(`第 ${row} 行与前文重复连接同一对片号：${pieceA} / ${pieceB}。`);
      pairs.add(pairKey);
      if (!validStatuses.has(status)) throw new Error(`第 ${row} 行状态只能是“待描”“已合”或“封存”。`);
      return { seam, seamKey, pieceA, pieceB, aKey, bKey, status };
    });
  };

  const buildGraph = (seams) => {
    const labels = new Map();
    const order = [];
    const adjacency = new Map();
    for (const seam of seams) {
      for (const [key, label] of [[seam.aKey, seam.pieceA], [seam.bKey, seam.pieceB]]) {
        if (!labels.has(key)) { labels.set(key, label); order.push(key); adjacency.set(key, new Set()); }
      }
      adjacency.get(seam.aKey).add(seam.bKey);
      adjacency.get(seam.bKey).add(seam.aKey);
    }
    const seen = new Set();
    const components = [];
    for (const start of order) {
      if (seen.has(start)) continue;
      const stack = [start];
      const component = [];
      seen.add(start);
      while (stack.length) {
        const key = stack.pop();
        component.push(key);
        for (const next of adjacency.get(key)) if (!seen.has(next)) { seen.add(next); stack.push(next); }
      }
      component.sort((a, b) => order.indexOf(a) - order.indexOf(b));
      components.push(component);
    }
    components.sort((a, b) => b.length - a.length || order.indexOf(a[0]) - order.indexOf(b[0]));
    return { labels, order, components, cycles: seams.length - order.length + components.length };
  };

  const addLimited = (container, values, factory) => {
    const fragment = document.createDocumentFragment();
    values.slice(0, 40).forEach((value, index) => fragment.append(factory(value, index)));
    if (values.length > 40) {
      const more = document.createElement(container.tagName === "UL" ? "li" : "p");
      more.textContent = `界面仅显示前 40 项，另有 ${values.length - 40} 项已写入复制交接。`;
      fragment.append(more);
    }
    container.replaceChildren(fragment);
  };

  const render = (seams) => {
    const graph = buildGraph(seams);
    const structural = graph.components.slice(1);
    const statusFlags = seams.filter((seam) => seam.status !== "封存");
    const findings = [
      ...structural.map((component, index) => `分离片组 ${index + 2}：${component.map((key) => graph.labels.get(key)).join("、")}。`),
      ...statusFlags.map((seam) => `${seam.seam}：当前状态为“${seam.status}”，尚未记录为封存。`)
    ];
    let state = "NETWORK CLEAR";
    if (structural.length && statusFlags.length) state = `REVIEW ${findings.length}`;
    else if (structural.length) state = `STRUCTURE FLAGS ${structural.length}`;
    else if (statusFlags.length) state = `STATUS FLAGS ${statusFlags.length}`;
    const main = graph.components[0];

    report.dataset.ready = "true";
    setText(stateNode, state);
    setText(componentTotal, String(graph.components.length));
    setText(componentLabel, `主片组 ${main.length} 片${structural.length ? ` · 另有 ${structural.length} 个分离片组` : " · 所有片号连通"}`);
    setText(seamCount, String(seams.length));
    setText(pieceCount, String(graph.order.length));
    setText(cycleCount, String(graph.cycles));
    setText(statusCount, String(statusFlags.length));
    setText(findingSummary, findings.length ? `${findings.length} 项关系提示` : "没有分离片组或未封存状态提示");
    addLimited(findingList, findings.length ? findings : ["全部片号处于同一连通片组，且接缝状态均为封存。"], (finding) => Object.assign(document.createElement("li"), { textContent: finding }));
    setText(seamSummary, `${seams.length} 条接缝 · ${graph.order.length} 个片号 · ${graph.cycles} 个独立闭环`);
    addLimited(seamList, seams, (seam) => {
      const card = document.createElement("article");
      card.className = "ki144-seam-card";
      const title = document.createElement("b");
      const relation = document.createElement("span");
      const status = document.createElement("strong");
      title.textContent = seam.seam;
      relation.textContent = `${seam.pieceA} ↔ ${seam.pieceB}`;
      status.textContent = seam.status;
      card.append(title, relation, status);
      return card;
    });

    currentReport = [
      "拼片关系交接",
      `状态：${state}`,
      `接缝：${seams.length}`,
      `片号：${graph.order.length}`,
      `连通片组：${graph.components.length}`,
      `独立闭环：${graph.cycles}`,
      `状态提示：${statusFlags.length}`,
      "",
      "连通片组：",
      ...graph.components.map((component, index) => `${index + 1}. ${component.map((key) => graph.labels.get(key)).join("、")}`),
      "",
      "逐条接缝：",
      ...seams.map((seam, index) => `${index + 1}. ${seam.seam} | ${seam.pieceA} ↔ ${seam.pieceB} | ${seam.status}`),
      "",
      "关系提示：",
      ...(findings.length ? findings.map((finding, index) => `${index + 1}. ${finding}`) : ["无。全部片号处于同一连通片组，且接缝状态均为封存。"]),
      "",
      "计算口径：每条接缝视为两个规范化片号之间的一条无向边；重复无向关系与自连接在输入阶段拒绝；闭环数 = 接缝数 − 片号数 + 连通片组数。",
      "边界：报告不读取或判断真实照片、尺寸、轮廓、断面、材质、旧修、适配、处理、价值、所有权、运输、展陈或安全。"
    ].join("\n");
    copyButton.disabled = false;
    setText(formStatus, `已绘制 ${seams.length} 条接缝；图结构不代表真实碎片适配。`);
  };

  graphForm.querySelectorAll("[data-ki144-preset]").forEach((button) => button.addEventListener("click", () => {
    input.value = presets[button.dataset.ki144Preset];
    setText(errorNode, "");
    resetReport("示例已展开，请生成拼片图谱。");
    input.focus();
  }));
  input.addEventListener("input", () => {
    setText(errorNode, "");
    if (report.dataset.ready === "true") resetReport("接缝关系已改变，请重新生成图谱。");
  });
  graphForm.addEventListener("reset", () => window.setTimeout(() => {
    setText(errorNode, "");
    resetReport("图谱已撤下，输入已恢复初始示例。");
  }, 0));
  graphForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setText(errorNode, "");
    announceCopy("");
    try { render(parseRows(input.value)); }
    catch (error) { fail(error instanceof Error ? error.message : "输入未通过校核。"); }
  });
  copyButton.addEventListener("click", async () => {
    if (!currentReport) return;
    announceCopy((await copyText(currentReport)) ? "完整关系交接已复制。" : "复制失败，请手动选择内容。");
  });
})();
