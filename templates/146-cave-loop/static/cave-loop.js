(() => {
  "use strict";
  const root = document.documentElement;
  const surfaceButton = document.querySelector("[data-cv146-surface-toggle]");
  const statuses = document.querySelectorAll("[data-cv146-copy-status]");
  const surfaceKey = "cv146-survey-surface";
  const setText = (node, value) => { if (node) node.textContent = value; };
  const announce = (message) => statuses.forEach((node) => setText(node, message));
  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
      const field = document.createElement("textarea"); field.value = text; field.setAttribute("readonly", ""); field.style.position = "fixed"; field.style.opacity = "0"; document.body.append(field); field.select(); const copied = document.execCommand("copy"); field.remove(); return copied;
    } catch { return false; }
  };
  const applySurface = (cave) => {
    root.dataset.cv146Surface = cave ? "cave" : "paper";
    if (surfaceButton) { surfaceButton.textContent = cave ? "展开纸图" : "收起纸图"; surfaceButton.setAttribute("aria-pressed", String(cave)); }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", cave ? "#0d1113" : "#e9e1d2");
  };
  let caveSurface = true;
  try { caveSurface = localStorage.getItem(surfaceKey) !== "paper"; } catch { caveSurface = true; }
  applySurface(caveSurface);
  surfaceButton?.addEventListener("click", () => { caveSurface = root.dataset.cv146Surface !== "cave"; applySurface(caveSurface); try { localStorage.setItem(surfaceKey, caveSurface ? "cave" : "paper"); } catch { /* optional preference */ } });

  document.querySelector("[data-cv146-copy-code]")?.addEventListener("click", async () => { const value = document.querySelector("[data-cv146-code]")?.textContent.trim() || ""; announce((await copyText(value)) ? "闭环编号已复制。" : "复制失败，请手动选择编号。"); });
  const progress = document.querySelector(".cv146-progress");
  if (progress) {
    let queued = false;
    const update = () => { const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2; progress.setAttribute("value", String(atEnd ? 100 : Math.min(99, Math.round((window.scrollY / range) * 100)))); queued = false; };
    const request = () => { if (!queued) { queued = true; window.requestAnimationFrame(update); } }; update(); window.addEventListener("scroll", request, { passive: true }); window.addEventListener("resize", request);
  }
  document.querySelector("[data-cv146-copy-note]")?.addEventListener("click", async () => {
    const text = ["洞穴闭环草图摘要", "1. 每个二维坐标必须记录原点、轴向、单位、来源、日期和复核人。", "2. 工具按输入顺序连接站点，并从末点自动闭合回首点。", "3. 面积使用十分之一米整数鞋带公式；周长只作近似显示。", "4. 非相邻线段相交只描述图形，不代表真实洞道相通。", "5. 页面不是地图、导航、路线、通行、装备、救援或安全建议。"].join("\n");
    announce((await copyText(text)) ? "测记摘要已复制。" : "复制失败，请手动选择内容。");
  });
  const gates = Array.from(document.querySelectorAll(".cv146-gate-list details"));
  gates.forEach((item) => item.addEventListener("toggle", () => { if (item.open) gates.forEach((other) => { if (other !== item) other.open = false; }); }));
  document.querySelector("[data-cv146-copy-policy]")?.addEventListener("click", async () => {
    const text = ["洞穴草图现场边界", "页面不验证坐标、测量、深度、坡度、断面、闭合差或数据来源。", "页面不判断地质、水文、天气、空气、气体、落石、洪水或通行条件。", "页面不是地图、导航、路线、装备、通信、急救、救援或安全建议。", "许可、土地、隐私、文化、生态、版权和发布权利须由责任人确认。"].join("\n");
    announce((await copyText(text)) ? "现场边界已复制。" : "复制失败，请手动选择内容。");
  });
  const search = document.querySelector("[data-cv146-search]");
  search?.addEventListener("submit", (event) => {
    event.preventDefault(); const input = search.querySelector("#cv146-clue"); const status = search.querySelector("[data-cv146-search-status]"); const clue = input.value.trim(); const length = Array.from(clue).length;
    if (!length) { setText(status, "请输入坐标、闭环或现场边界线索。"); return; } if (length > 80) { setText(status, "线索最多 80 个字符，请缩短后再寻找。"); return; }
    const routes = [
      { terms: ["坐标", "站点", "来源", "顺序", "测记", "交接"], page: "article.html", label: "坐标测记" },
      { terms: ["闭环", "面积", "周长", "相交", "轮廓", "草图"], page: "tool.html", label: "闭环草图" },
      { terms: ["地质", "水文", "路线", "通行", "救援", "安全", "权利", "隐私"], page: "legal.html", label: "现场边界" }
    ];
    const route = routes.find((item) => item.terms.some((term) => clue.includes(term))) || { page: "index.html", label: "入口" };
    setText(status, `已匹配“${route.label}”，正在沿本地测线返回。`); window.setTimeout(() => window.location.assign(route.page), 350);
  });

  const form = document.querySelector("[data-cv146-loop-form]");
  if (!form) return;
  const input = form.querySelector("#cv146-rows"); const errorNode = form.querySelector("[data-cv146-error]"); const formStatus = form.querySelector("[data-cv146-form-status]"); const report = document.querySelector(".cv146-loop-report"); const q = (selector) => report.querySelector(selector);
  const stateNode = q("[data-cv146-report-state]"); const preview = q("[data-cv146-loop-preview]"); const pointCount = q("[data-cv146-point-count]"); const areaNode = q("[data-cv146-area]"); const perimeterNode = q("[data-cv146-perimeter]"); const orientationNode = q("[data-cv146-orientation]"); const findingSummary = q("[data-cv146-finding-summary]"); const findingList = q("[data-cv146-finding-list]"); const legSummary = q("[data-cv146-leg-summary]"); const legList = q("[data-cv146-leg-list]"); const copyButton = q("[data-cv146-copy-report]");
  const validStates = new Set(["草测", "复核", "封图"]); const numberPattern = /^-?(?:0|[1-9]\d{0,3})(?:\.\d)?$/u;
  const presets = {
    clear: "站点 A | 0 | 0 | 封图\n站点 B | 12 | 0 | 封图\n站点 C | 12 | 8 | 封图\n站点 D | 0 | 8 | 封图",
    reverse: "站点 A | 0 | 0 | 封图\n站点 D | 0 | 8 | 封图\n站点 C | 12 | 8 | 封图\n站点 B | 12 | 0 | 封图",
    cross: "站点 A | 0 | 0 | 封图\n站点 B | 10 | 10 | 封图\n站点 C | 0 | 10 | 封图\n站点 D | 10 | 0 | 封图",
    review: "站点 A | 0 | 0 | 草测\n站点 B | 10 | 10 | 复核\n站点 C | 0 | 10 | 封图\n站点 D | 10 | 0 | 封图"
  };
  let currentReport = "";
  const normalize = (value) => value.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("zh-CN");
  const parseCoord = (value, row, axis) => {
    if (!numberPattern.test(value) || (/^-0(?:\.0)?$/u.test(value))) throw new Error(`第 ${row} 行 ${axis} 须为 −9999.9–9999.9 的普通十进制数，最多一位小数且不接受负零。`);
    return Math.round(Number(value) * 10);
  };
  const resetReport = (message = "等待至少三个站点。") => {
    currentReport = ""; report.dataset.ready = "false"; setText(stateNode, "UNSET"); setText(pointCount, "0"); setText(areaNode, "0 m²"); setText(perimeterNode, "0 m"); setText(orientationNode, "—"); setText(findingSummary, "等待校核"); findingList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "生成后显示退化、非相邻边相交与未封图状态。" })); setText(legSummary, "等待测线"); legList.replaceChildren(Object.assign(document.createElement("p"), { textContent: "等待站点记录。" })); preview.replaceChildren(Object.assign(document.createElement("span"), { textContent: "等待测线" })); copyButton.disabled = true; setText(formStatus, message); announce("");
  };
  const fail = (message) => { setText(errorNode, message); resetReport("输入未通过校核，闭环草图未生成。"); };
  const parseRows = (raw) => {
    if (Array.from(raw).length > 6000) throw new Error("全部站点输入最多 6000 个字符。"); const lines = raw.split(/\r?\n/u).map((line) => line.trim()).filter(Boolean); if (lines.length < 3) throw new Error("请至少输入 3 个站点。"); if (lines.length > 60) throw new Error("一次最多计算 60 个站点。");
    const exact = new Set(); const normalized = new Set();
    const points = lines.map((line, index) => {
      const row = index + 1; const fields = line.split("|").map((field) => field.trim()); if (fields.length !== 4) throw new Error(`第 ${row} 行须包含 4 项，并以 | 分隔。`); const [id, xText, yText, status] = fields; const length = Array.from(id).length;
      if (length < 2 || length > 24) throw new Error(`第 ${row} 行站点号须为 2–24 个字符。`); if (/\p{Cc}|\p{Cf}/u.test(id)) throw new Error(`第 ${row} 行站点号含不可见控制字符。`); if (exact.has(id)) throw new Error(`第 ${row} 行站点号与前文完全重复：${id}。`); exact.add(id); const key = normalize(id); if (normalized.has(key)) throw new Error(`第 ${row} 行站点号规范化后重复：${id}。`); normalized.add(key);
      if (!validStates.has(status)) throw new Error(`第 ${row} 行状态只能是“草测”“复核”或“封图”。`); return { id, key, x: parseCoord(xText, row, "X"), y: parseCoord(yText, row, "Y"), status };
    });
    for (let index = 1; index < points.length; index += 1) if (points[index].x === points[index - 1].x && points[index].y === points[index - 1].y) throw new Error(`第 ${index + 1} 行与前一站点坐标相同，会形成零长度边。`);
    const first = points[0]; const last = points[points.length - 1]; if (first.x === last.x && first.y === last.y) throw new Error("末站与首站坐标相同；工具会自动闭合，请删除重复末站。"); return points;
  };
  const cross = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const onSegment = (a, b, p) => cross(a, b, p) === 0 && p.x >= Math.min(a.x, b.x) && p.x <= Math.max(a.x, b.x) && p.y >= Math.min(a.y, b.y) && p.y <= Math.max(a.y, b.y);
  const intersects = (a, b, c, d) => {
    const abC = cross(a, b, c); const abD = cross(a, b, d); const cdA = cross(c, d, a); const cdB = cross(c, d, b);
    if (((abC > 0 && abD < 0) || (abC < 0 && abD > 0)) && ((cdA > 0 && cdB < 0) || (cdA < 0 && cdB > 0))) return true;
    return (abC === 0 && onSegment(a, b, c)) || (abD === 0 && onSegment(a, b, d)) || (cdA === 0 && onSegment(c, d, a)) || (cdB === 0 && onSegment(c, d, b));
  };
  const addLimited = (container, values, factory) => { const fragment = document.createDocumentFragment(); values.slice(0, 40).forEach((value, index) => fragment.append(factory(value, index))); if (values.length > 40) { const more = document.createElement(container.tagName === "UL" ? "li" : "p"); more.textContent = `界面仅显示前 40 项，另有 ${values.length - 40} 项已写入复制交接。`; fragment.append(more); } container.replaceChildren(fragment); };
  const renderPreview = (points) => {
    const namespace = "http://www.w3.org/2000/svg"; const svg = document.createElementNS(namespace, "svg"); svg.setAttribute("viewBox", "0 0 1000 520"); svg.setAttribute("role", "img"); svg.setAttribute("aria-label", "用户输入站点的闭合二维草图");
    const xs = points.map((point) => point.x); const ys = points.map((point) => point.y); const minX = Math.min(...xs); const maxX = Math.max(...xs); const minY = Math.min(...ys); const maxY = Math.max(...ys); const spanX = Math.max(1, maxX - minX); const spanY = Math.max(1, maxY - minY); const project = (point) => ({ x: 70 + ((point.x - minX) / spanX) * 860, y: 45 + ((maxY - point.y) / spanY) * 430 }); const projected = points.map(project);
    const polygon = document.createElementNS(namespace, "polygon"); polygon.setAttribute("points", projected.map((point) => `${point.x},${point.y}`).join(" ")); polygon.setAttribute("class", "cv146-svg-loop"); svg.append(polygon);
    projected.forEach((point, index) => { const circle = document.createElementNS(namespace, "circle"); circle.setAttribute("cx", String(point.x)); circle.setAttribute("cy", String(point.y)); circle.setAttribute("r", "11"); circle.setAttribute("class", "cv146-svg-point"); const label = document.createElementNS(namespace, "text"); label.setAttribute("x", String(point.x + 17)); label.setAttribute("y", String(point.y - 14)); label.textContent = String(index + 1); svg.append(circle, label); }); preview.replaceChildren(svg);
  };
  const render = (points) => {
    const edges = points.map((point, index) => ({ a: point, b: points[(index + 1) % points.length], index })); let twiceArea = 0; let perimeter = 0;
    edges.forEach((edge) => { twiceArea += edge.a.x * edge.b.y - edge.b.x * edge.a.y; perimeter += Math.hypot(edge.b.x - edge.a.x, edge.b.y - edge.a.y) / 10; });
    const crossings = [];
    for (let i = 0; i < edges.length; i += 1) for (let j = i + 1; j < edges.length; j += 1) { if ((i + 1) % edges.length === j || (j + 1) % edges.length === i) continue; if (intersects(edges[i].a, edges[i].b, edges[j].a, edges[j].b)) crossings.push([edges[i], edges[j]]); }
    const geometry = [...(twiceArea === 0 ? ["闭合轮廓的二维面积为 0，当前草图退化。"] : []), ...crossings.map(([a, b]) => `测段 ${a.index + 1}（${a.a.id}→${a.b.id}）与测段 ${b.index + 1}（${b.a.id}→${b.b.id}）相交。`)]; const stateFlags = points.filter((point) => point.status !== "封图"); const findings = [...geometry, ...stateFlags.map((point) => `${point.id}：当前状态为“${point.status}”，尚未记录为封图。`)];
    let state = "LOOP CLEAR"; if (geometry.length && stateFlags.length) state = `REVIEW ${findings.length}`; else if (geometry.length) state = `GEOMETRY FLAGS ${geometry.length}`; else if (stateFlags.length) state = `STATUS FLAGS ${stateFlags.length}`;
    const orientation = twiceArea > 0 ? "逆时针" : twiceArea < 0 ? "顺时针" : "退化"; const area = Math.abs(twiceArea) / 200;
    report.dataset.ready = "true"; setText(stateNode, state); setText(pointCount, String(points.length)); setText(areaNode, `${area.toFixed(2)} m²`); setText(perimeterNode, `约 ${perimeter.toFixed(2)} m`); setText(orientationNode, orientation); setText(findingSummary, findings.length ? `${findings.length} 项闭环提示` : "没有退化、非相邻边相交或未封图提示"); addLimited(findingList, findings.length ? findings : ["轮廓面积非零、非相邻边不相交，且全部站点均为封图。"], (finding) => Object.assign(document.createElement("li"), { textContent: finding }));
    setText(legSummary, `${edges.length} 段闭合测线 · ${crossings.length} 对相交`); addLimited(legList, edges, (edge) => { const card = document.createElement("article"); card.className = "cv146-leg-card"; const title = document.createElement("b"); const relation = document.createElement("span"); const distance = document.createElement("strong"); title.textContent = `测段 ${edge.index + 1}`; relation.textContent = `${edge.a.id} → ${edge.b.id}`; distance.textContent = `约 ${(Math.hypot(edge.b.x - edge.a.x, edge.b.y - edge.a.y) / 10).toFixed(2)} m`; card.append(title, relation, distance); return card; }); renderPreview(points);
    currentReport = ["站点闭环交接", `状态：${state}`, `站点：${points.length}`, `二维面积：${area.toFixed(2)} m²`, `近似周长：约 ${perimeter.toFixed(2)} m`, `输入方向：${orientation}`, `非相邻边相交：${crossings.length} 对`, "", "逐点记录：", ...points.map((point, index) => `${index + 1}. ${point.id} | X ${(point.x / 10).toFixed(1)} | Y ${(point.y / 10).toFixed(1)} | ${point.status}`), "", "闭环提示：", ...(findings.length ? findings.map((finding, index) => `${index + 1}. ${finding}`) : ["无。轮廓面积非零、非相邻边不相交，且全部站点均为封图。"]), "", "计算口径：按输入顺序连接相邻站点并自动从末点闭合回首点；坐标以十分之一米整数参与鞋带面积和整数线段相交测试；周长只作近似显示。", "边界：报告不读取或判断真实经纬度、高程、深度、坡度、断面、地质、水文、天气、通行、装备、通信、救援或现场安全。"].join("\n"); copyButton.disabled = false; setText(formStatus, `已闭合 ${points.length} 个站点；二维草图不代表真实路线或通行条件。`);
  };
  form.querySelectorAll("[data-cv146-preset]").forEach((button) => button.addEventListener("click", () => { input.value = presets[button.dataset.cv146Preset]; setText(errorNode, ""); resetReport("示例已展开，请生成闭环草图。"); input.focus(); }));
  input.addEventListener("input", () => { setText(errorNode, ""); if (report.dataset.ready === "true") resetReport("站点或顺序已改变，请重新生成闭环草图。"); });
  form.addEventListener("reset", () => window.setTimeout(() => { setText(errorNode, ""); resetReport("测线已撤下，输入已恢复初始示例。"); }, 0));
  form.addEventListener("submit", (event) => { event.preventDefault(); setText(errorNode, ""); announce(""); try { render(parseRows(input.value)); } catch (error) { fail(error instanceof Error ? error.message : "输入未通过校核。"); } });
  copyButton.addEventListener("click", async () => { if (currentReport) announce((await copyText(currentReport)) ? "完整闭环交接已复制。" : "复制失败，请手动选择内容。"); });
})();
