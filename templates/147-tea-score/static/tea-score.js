(() => {
  "use strict";
  const root = document.documentElement;
  const lightButton = document.querySelector("[data-ts147-light-toggle]");
  const copyStatuses = document.querySelectorAll("[data-ts147-copy-status]");
  const lightKey = "ts147-tea-light";
  const setText = (node, value) => { if (node) node.textContent = value; };
  const announce = (message) => copyStatuses.forEach((node) => setText(node, message));
  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
      const field = document.createElement("textarea"); field.value = text; field.setAttribute("readonly", ""); field.style.position = "fixed"; field.style.opacity = "0"; document.body.append(field); field.select(); const copied = document.execCommand("copy"); field.remove(); return copied;
    } catch { return false; }
  };
  const applyLight = (morning) => {
    root.dataset.ts147Light = morning ? "morning" : "evening";
    if (lightButton) { lightButton.textContent = morning ? "移入暮席" : "掀开晨席"; lightButton.setAttribute("aria-pressed", String(morning)); }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", morning ? "#efe5cf" : "#18201b");
  };
  let morning = true;
  try { morning = localStorage.getItem(lightKey) !== "evening"; } catch { morning = true; }
  applyLight(morning);
  lightButton?.addEventListener("click", () => { morning = root.dataset.ts147Light !== "morning"; applyLight(morning); try { localStorage.setItem(lightKey, morning ? "morning" : "evening"); } catch { /* optional preference */ } });

  document.querySelector("[data-ts147-copy-code]")?.addEventListener("click", async () => { const value = document.querySelector("[data-ts147-code]")?.textContent.trim() || ""; announce((await copyText(value)) ? "交接编号已拓印。" : "拓印失败，请手动选择编号。"); });
  const reading = document.querySelector(".ts147-reading");
  if (reading) {
    let queued = false;
    const update = () => { const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2; reading.setAttribute("value", String(atEnd ? 100 : Math.min(99, Math.round((window.scrollY / range) * 100)))); queued = false; };
    const request = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    update(); window.addEventListener("scroll", request, { passive: true }); window.addEventListener("resize", request);
  }
  document.querySelector("[data-ts147-copy-note]")?.addEventListener("click", async () => {
    const text = ["茶席节拍五札摘要", "1. 阶段、开始秒、持续秒与状态应来自当前记录。", "2. 主壶、公道、茶盏只是抽象时间通道。", "3. 每段使用半开区间，端点相接不算重叠。", "4. 跨器位并行有效，同器位相撞会被逐对指出。", "5. 页面不提供配方、温度、剂量、食安、健康或现场服务判断。"].join("\n");
    announce((await copyText(text)) ? "五札摘要已拓印。" : "拓印失败，请手动选择内容。");
  });
  const leaves = Array.from(document.querySelectorAll(".ts147-gate-list details"));
  leaves.forEach((leaf) => leaf.addEventListener("toggle", () => { if (leaf.open) leaves.forEach((other) => { if (other !== leaf) other.open = false; }); }));
  document.querySelector("[data-ts147-copy-policy]")?.addEventListener("click", async () => {
    const text = ["茶席现场边界", "页面不验证茶叶、产地、批次、克数、水量、比例、冲泡次数、风味或品质。", "页面不判断水温、热源、器具容量、材质、清洁、消毒或防烫。", "页面不判断水质、污染、过敏原、食品安全、健康、医疗或个体耐受。", "人员、场地、服务、许可、隐私、商标、版权和发布权利由责任人确认。"].join("\n");
    announce((await copyText(text)) ? "现场边界已拓印。" : "拓印失败，请手动选择内容。");
  });
  const search = document.querySelector("[data-ts147-search]");
  search?.addEventListener("submit", (event) => {
    event.preventDefault(); const input = search.querySelector("#ts147-clue"); const status = search.querySelector("[data-ts147-search-status]"); const clue = input.value.trim(); const length = Array.from(clue).length;
    if (!length) { setText(status, "请输入茶席、时间或现场边界线索。"); return; }
    if (length > 80) { setText(status, "线索最多 80 个字符，请缩短后再寻找。"); return; }
    const routes = [
      { terms: ["茶席", "阶段", "来源", "札记", "记录", "交接"], page: "article.html", label: "茶席札记" },
      { terms: ["时间", "秒", "器位", "重叠", "排演", "并行"], page: "tool.html", label: "注水排演" },
      { terms: ["温度", "剂量", "过敏", "烫伤", "食品", "安全", "权利"], page: "legal.html", label: "现场边界" }
    ];
    const route = routes.find((item) => item.terms.some((term) => clue.includes(term))) || { page: "index.html", label: "茶席入口" };
    setText(status, `已找到“${route.label}”，正在沿茶痕返回。`); window.setTimeout(() => window.location.assign(route.page), 350);
  });

  const form = document.querySelector("[data-ts147-score-form]");
  if (!form) return;
  const input = form.querySelector("#ts147-rows"); const errorNode = form.querySelector("[data-ts147-error]"); const formStatus = form.querySelector("[data-ts147-form-status]"); const report = document.querySelector(".ts147-score-report"); const q = (selector) => report.querySelector(selector);
  const stateNode = q("[data-ts147-report-state]"); const timeline = q("[data-ts147-timeline]"); const stepCount = q("[data-ts147-step-count]"); const spanNode = q("[data-ts147-span]"); const activeNode = q("[data-ts147-active]"); const peakNode = q("[data-ts147-peak]"); const findingSummary = q("[data-ts147-finding-summary]"); const findingList = q("[data-ts147-finding-list]"); const stepSummary = q("[data-ts147-step-summary]"); const stepList = q("[data-ts147-step-list]"); const copyButton = q("[data-ts147-copy-report]");
  const vessels = ["主壶", "公道", "茶盏"]; const validVessels = new Set(vessels); const validStates = new Set(["草排", "复核", "定谱"]); const integerPattern = /^(?:0|[1-9]\d{0,3})$/u;
  const presets = {
    clear: "温壶 | 主壶 | 0 | 20 | 定谱\n醒茶 | 公道 | 20 | 15 | 定谱\n首注 | 主壶 | 35 | 45 | 定谱\n分盏 | 茶盏 | 80 | 30 | 定谱",
    parallel: "温壶 | 主壶 | 0 | 20 | 定谱\n备盏 | 茶盏 | 0 | 30 | 定谱\n醒茶 | 公道 | 20 | 20 | 定谱\n首注 | 主壶 | 40 | 45 | 定谱",
    collision: "温壶 | 主壶 | 0 | 30 | 定谱\n醒茶 | 公道 | 15 | 20 | 定谱\n首注 | 主壶 | 20 | 45 | 定谱\n分盏 | 茶盏 | 65 | 25 | 定谱",
    review: "温壶 | 主壶 | 0 | 30 | 草排\n醒茶 | 公道 | 15 | 20 | 复核\n首注 | 主壶 | 20 | 45 | 定谱\n分盏 | 茶盏 | 65 | 25 | 定谱"
  };
  let currentReport = "";
  const normalize = (value) => value.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("zh-CN");
  const parseInteger = (value, row, label, min, max) => { if (!integerPattern.test(value)) throw new Error(`第 ${row} 行${label}须为 ${min}–${max} 的整数，不接受正号、小数、指数或前导零。`); const number = Number(value); if (number < min || number > max) throw new Error(`第 ${row} 行${label}须在 ${min}–${max} 之间。`); return number; };
  const resetReport = (message = "等待至少三个阶段。") => {
    currentReport = ""; report.dataset.ready = "false"; setText(stateNode, "UNSET"); setText(stepCount, "0"); setText(spanNode, "0 秒"); setText(activeNode, "0 秒"); setText(peakNode, "0"); setText(findingSummary, "等待校核"); findingList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "生成后显示同器位相撞与未定谱状态。" })); setText(stepSummary, "等待阶段"); stepList.replaceChildren(Object.assign(document.createElement("p"), { textContent: "等待排演记录。" })); timeline.replaceChildren(Object.assign(document.createElement("span"), { textContent: "等待时间谱" })); copyButton.disabled = true; setText(formStatus, message); announce("");
  };
  const fail = (message) => { setText(errorNode, message); resetReport("输入未通过校核，时间谱未生成。"); };
  const parseRows = (raw) => {
    if (Array.from(raw).length > 6000) throw new Error("全部阶段输入最多 6000 个字符。"); const lines = raw.split(/\r?\n/u).map((line) => line.trim()).filter(Boolean); if (lines.length < 3) throw new Error("请至少输入 3 个阶段。"); if (lines.length > 60) throw new Error("一次最多排演 60 个阶段。");
    const exact = new Set(); const normalized = new Set();
    return lines.map((line, index) => {
      const row = index + 1; const fields = line.split("|").map((field) => field.trim()); if (fields.length !== 5) throw new Error(`第 ${row} 行须包含 5 项，并以 | 分隔。`); const [id, vessel, startText, durationText, status] = fields; const length = Array.from(id).length;
      if (length < 2 || length > 24) throw new Error(`第 ${row} 行阶段名须为 2–24 个字符。`); if (/\p{Cc}|\p{Cf}/u.test(id)) throw new Error(`第 ${row} 行阶段名含不可见控制字符。`); if (exact.has(id)) throw new Error(`第 ${row} 行阶段名与前文完全重复：${id}。`); exact.add(id); const key = normalize(id); if (normalized.has(key)) throw new Error(`第 ${row} 行阶段名规范化后重复：${id}。`); normalized.add(key);
      if (!validVessels.has(vessel)) throw new Error(`第 ${row} 行器位只能是“主壶”“公道”或“茶盏”。`); const start = parseInteger(startText, row, "开始秒", 0, 3599); const duration = parseInteger(durationText, row, "持续秒", 1, 600); const end = start + duration; if (end > 3600) throw new Error(`第 ${row} 行结束秒为 ${end}，不得超过 3600。`); if (!validStates.has(status)) throw new Error(`第 ${row} 行状态只能是“草排”“复核”或“定谱”。`);
      return { id, key, vessel, start, duration, end, status, index };
    });
  };
  const addLimited = (container, values, factory) => { const fragment = document.createDocumentFragment(); values.slice(0, 40).forEach((value, index) => fragment.append(factory(value, index))); if (values.length > 40) { const more = document.createElement(container.tagName === "UL" ? "li" : "p"); more.textContent = `界面仅显示前 40 项，另有 ${values.length - 40} 项已写入复制交接。`; fragment.append(more); } container.replaceChildren(fragment); };
  const renderTimeline = (steps, minStart, maxEnd, collisions) => {
    const span = Math.max(1, maxEnd - minStart); const collided = new Set(collisions.flatMap((pair) => pair.map((step) => step.index))); const fragment = document.createDocumentFragment();
    vessels.forEach((vessel) => { const lane = document.createElement("div"); lane.className = "ts147-lane"; const label = document.createElement("strong"); label.textContent = vessel; lane.append(label); steps.filter((step) => step.vessel === vessel).forEach((step) => { const bar = document.createElement("span"); bar.className = "ts147-bar"; bar.style.left = `${((step.start - minStart) / span) * 100}%`; bar.style.width = `${Math.max(1.2, (step.duration / span) * 100)}%`; if (collided.has(step.index)) bar.style.outline = "3px solid var(--ts147-vermilion)"; bar.textContent = `${step.id} · ${step.duration}s`; lane.append(bar); }); fragment.append(lane); }); timeline.replaceChildren(fragment);
  };
  const render = (steps) => {
    const collisions = [];
    for (let i = 0; i < steps.length; i += 1) for (let j = i + 1; j < steps.length; j += 1) if (steps[i].vessel === steps[j].vessel && steps[i].start < steps[j].end && steps[j].start < steps[i].end) collisions.push([steps[i], steps[j]]);
    const minStart = Math.min(...steps.map((step) => step.start)); const maxEnd = Math.max(...steps.map((step) => step.end)); const span = maxEnd - minStart; const sorted = steps.map((step) => [step.start, step.end]).sort((a, b) => a[0] - b[0] || a[1] - b[1]); let union = 0; let from = sorted[0][0]; let to = sorted[0][1]; for (const [start, end] of sorted.slice(1)) { if (start > to) { union += to - from; from = start; to = end; } else to = Math.max(to, end); } union += to - from; const idle = span - union;
    const events = steps.flatMap((step) => [{ time: step.start, delta: 1 }, { time: step.end, delta: -1 }]).sort((a, b) => a.time - b.time || a.delta - b.delta); let concurrent = 0; let peak = 0; events.forEach((event) => { concurrent += event.delta; peak = Math.max(peak, concurrent); });
    const timing = collisions.map(([a, b]) => `${a.vessel}相撞：${a.id} [${a.start}, ${a.end}) 与 ${b.id} [${b.start}, ${b.end})。`); const statusFlags = steps.filter((step) => step.status !== "定谱"); const findings = [...timing, ...statusFlags.map((step) => `${step.id}：当前状态为“${step.status}”，尚未记录为定谱。`)]; let state = "SEQUENCE CLEAR"; if (timing.length && statusFlags.length) state = `REVIEW ${findings.length}`; else if (timing.length) state = `TIMING FLAGS ${timing.length}`; else if (statusFlags.length) state = `STATUS FLAGS ${statusFlags.length}`;
    report.dataset.ready = "true"; setText(stateNode, state); setText(stepCount, String(steps.length)); setText(spanNode, `${span} 秒`); setText(activeNode, `${union} 秒`); setText(peakNode, String(peak)); setText(findingSummary, findings.length ? `${findings.length} 项排演提示` : "没有同器位相撞或未定谱提示"); addLimited(findingList, findings.length ? findings : ["全部阶段时间有效，同器位区间不相交，且状态均为定谱。"], (finding) => Object.assign(document.createElement("li"), { textContent: finding }));
    setText(stepSummary, `${steps.length} 段 · ${collisions.length} 对同器位相撞 · 全局空档 ${idle} 秒`); addLimited(stepList, steps, (step) => { const card = document.createElement("article"); card.className = "ts147-step-card"; const title = document.createElement("b"); const relation = document.createElement("span"); const duration = document.createElement("strong"); title.textContent = step.id; relation.textContent = `${step.vessel} · ${step.status}`; duration.textContent = `${step.start}–${step.end}s`; card.append(title, relation, duration); return card; }); renderTimeline(steps, minStart, maxEnd, collisions);
    currentReport = ["茶席节拍排演交接", `状态：${state}`, `阶段：${steps.length}`, `时间跨度：${span} 秒`, `全局活动：${union} 秒`, `全局空档：${idle} 秒`, `最大并行：${peak}`, `同器位相撞：${collisions.length} 对`, "", "逐段记录：", ...steps.map((step, index) => `${index + 1}. ${step.id} | ${step.vessel} | ${step.start}–${step.end} 秒 | 持续 ${step.duration} 秒 | ${step.status}`), "", "排演提示：", ...(findings.length ? findings.map((finding, index) => `${index + 1}. ${finding}`) : ["无。全部阶段时间有效，同器位区间不相交，且状态均为定谱。"]), "", "计算口径：每段使用 [开始秒, 结束秒) 半开区间；端点相接不算重叠；跨器位并行有效；活动秒数为全部区间的全局并集；最大并行在同秒结束事件先于开始事件处理。", "边界：报告不读取或判断茶叶、产地、温度、剂量、水质、容量、器具、热源、过敏、健康、食品安全、人员、宾客、场地、服务或许可。"].join("\n"); copyButton.disabled = false; setText(formStatus, `已排演 ${steps.length} 个阶段；时间谱不构成配方或现场服务判断。`);
  };
  form.querySelectorAll("[data-ts147-preset]").forEach((button) => button.addEventListener("click", () => { input.value = presets[button.dataset.ts147Preset]; setText(errorNode, ""); resetReport("示例已铺开，请生成时间谱。"); input.focus(); }));
  input.addEventListener("input", () => { setText(errorNode, ""); if (report.dataset.ready === "true") resetReport("阶段或秒数已改变，请重新铺开时间谱。"); });
  form.addEventListener("reset", () => window.setTimeout(() => { setText(errorNode, ""); resetReport("时间谱已收卷，输入已恢复初始示例。"); }, 0));
  form.addEventListener("submit", (event) => { event.preventDefault(); setText(errorNode, ""); announce(""); try { render(parseRows(input.value)); } catch (error) { fail(error instanceof Error ? error.message : "输入未通过校核。"); } });
  copyButton.addEventListener("click", async () => { if (currentReport) announce((await copyText(currentReport)) ? "完整排演交接已拓印。" : "拓印失败，请手动选择内容。"); });
})();
