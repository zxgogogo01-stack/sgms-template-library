(() => {
  "use strict";

  const root = document.documentElement;
  const modeButton = document.querySelector("[data-sl145-mode-toggle]");
  const copyStatuses = document.querySelectorAll("[data-sl145-copy-status]");
  const modeKey = "sl145-gallery-room";
  const put = (node, value) => { if (node) node.textContent = value; };
  const announce = (message) => copyStatuses.forEach((node) => put(node, message));
  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
      const field = document.createElement("textarea");
      field.value = text; field.setAttribute("readonly", ""); field.style.position = "fixed"; field.style.opacity = "0";
      document.body.append(field); field.select(); const copied = document.execCommand("copy"); field.remove(); return copied;
    } catch { return false; }
  };

  const setRoom = (day) => {
    root.dataset.sl145Room = day ? "day" : "after";
    if (modeButton) { modeButton.textContent = day ? "闭馆灯" : "开馆灯"; modeButton.setAttribute("aria-pressed", String(day)); }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", day ? "#f0eadf" : "#17171c");
  };
  let dayRoom = true;
  try { dayRoom = localStorage.getItem(modeKey) !== "after"; } catch { dayRoom = true; }
  setRoom(dayRoom);
  modeButton?.addEventListener("click", () => {
    dayRoom = root.dataset.sl145Room !== "day"; setRoom(dayRoom);
    try { localStorage.setItem(modeKey, dayRoom ? "day" : "after"); } catch { /* optional preference */ }
  });

  document.querySelector("[data-sl145-copy-plan]")?.addEventListener("click", async () => {
    const value = document.querySelector("[data-sl145-plan]")?.textContent.trim() || "";
    announce((await copyText(value)) ? "图纸编号已复制。" : "复制失败，请手动选择编号。");
  });

  const progress = document.querySelector(".sl145-reading");
  if (progress) {
    let queued = false;
    const update = () => {
      const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      progress.setAttribute("value", String(atEnd ? 100 : Math.min(99, Math.round((window.scrollY / range) * 100)))); queued = false;
    };
    const request = () => { if (!queued) { queued = true; window.requestAnimationFrame(update); } };
    update(); window.addEventListener("scroll", request, { passive: true }); window.addEventListener("resize", request);
  }
  document.querySelector("[data-sl145-copy-note]")?.addEventListener("click", async () => {
    const text = ["挂墙排布记录摘要", "1. 作品、画框、墙面、开口与障碍尺寸必须有当前来源。", "2. X、Y 以墙面左上角为原点，向右和向下增加。", "3. 内部同时横纵相交才计重叠；边缘或角点接触不计。", "4. 工具不判断墙体、承重、固定、材料、照明、通行或现场安全。", "5. 作品、尺寸、坐标或墙面变化后重新生成并交接。"].join("\n");
    announce((await copyText(text)) ? "排布摘要已复制。" : "复制失败，请手动选择内容。");
  });
  const labels = Array.from(document.querySelectorAll(".sl145-label-list details"));
  labels.forEach((item) => item.addEventListener("toggle", () => { if (item.open) labels.forEach((other) => { if (other !== item) other.open = false; }); }));
  document.querySelector("[data-sl145-copy-policy]")?.addEventListener("click", async () => {
    const text = ["挂墙安装边界摘要", "页面不验证真实尺寸、坐标、单位、测量来源或误差。", "矩形报告不判断墙体构造、承重、固定点、挂件、材料或现场适配。", "页面不判断玻璃、照明、消防、通行、施工、运营或人员安全。", "鉴定、来源、价值、保险、运输、验收、隐私与权利由对应责任人确认。"].join("\n");
    announce((await copyText(text)) ? "边界摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const search = document.querySelector("[data-sl145-search]");
  search?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = search.querySelector("#sl145-clue"); const status = search.querySelector("[data-sl145-search-status]");
    const clue = input.value.trim(); const length = Array.from(clue).length;
    if (!length) { put(status, "请输入尺寸、墙面或责任边界线索。"); return; }
    if (length > 80) { put(status, "线索最多 80 个字符，请缩短后再寻找。"); return; }
    const routes = [
      { terms: ["观察", "作品", "尺寸", "标注", "交接", "札记"], page: "article.html", label: "排布札记" },
      { terms: ["墙面", "坐标", "排布", "重叠", "边界", "图纸"], page: "tool.html", label: "矩形图纸" },
      { terms: ["承重", "安装", "玻璃", "安全", "权利", "价值", "隐私"], page: "legal.html", label: "安装边界" }
    ];
    const route = routes.find((item) => item.terms.some((term) => clue.includes(term))) || { page: "index.html", label: "前厅" };
    put(status, `已匹配“${route.label}”，正在前往对应展墙。`); window.setTimeout(() => window.location.assign(route.page), 350);
  });

  const form = document.querySelector("[data-sl145-plan-form]");
  if (!form) return;
  const wallWField = form.querySelector("#sl145-wall-w"); const wallHField = form.querySelector("#sl145-wall-h"); const rowsField = form.querySelector("#sl145-rows");
  const errorNode = form.querySelector("[data-sl145-error]"); const formStatus = form.querySelector("[data-sl145-form-status]"); const report = document.querySelector(".sl145-plan-report");
  const q = (selector) => report.querySelector(selector);
  const stateNode = q("[data-sl145-report-state]"); const preview = q("[data-sl145-wall-preview]"); const workCount = q("[data-sl145-work-count]"); const outsideCount = q("[data-sl145-outside-count]"); const overlapCount = q("[data-sl145-overlap-count]"); const areaPercent = q("[data-sl145-area-percent]"); const findingSummary = q("[data-sl145-finding-summary]"); const findingList = q("[data-sl145-finding-list]"); const workSummary = q("[data-sl145-work-summary]"); const workList = q("[data-sl145-work-list]"); const copyButton = q("[data-sl145-copy-report]");
  const numericPattern = /^(?:0|[1-9]\d{0,3})(?:\.\d)?$/u;
  const statuses = new Set(["草图", "核位", "封存"]);
  const presets = {
    clear: { w: "600", h: "300", rows: "作品 01 | 40 | 55 | 120 | 90 | 封存\n作品 02 | 210 | 35 | 150 | 120 | 封存\n作品 03 | 420 | 80 | 110 | 145 | 封存" },
    outside: { w: "500", h: "260", rows: "作品 04 | 35 | 40 | 120 | 100 | 封存\n作品 05 | 430 | 70 | 100 | 120 | 封存" },
    overlap: { w: "500", h: "280", rows: "作品 06 | 70 | 45 | 180 | 140 | 封存\n作品 07 | 220 | 110 | 160 | 120 | 封存" },
    review: { w: "500", h: "280", rows: "作品 08 | 40 | 45 | 190 | 140 | 草图\n作品 09 | 190 | 120 | 180 | 125 | 核位\n作品 10 | 440 | 40 | 90 | 100 | 封存" }
  };
  let fullReport = "";
  const normalize = (value) => value.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("zh-CN");
  const parseNumber = (value, label, allowZero) => {
    if (!numericPattern.test(value)) throw new Error(`${label}须为 0–9999.9 的普通十进制数，最多一位小数。`);
    const units = Math.round(Number(value) * 10);
    if (!allowZero && units === 0) throw new Error(`${label}必须大于 0。`);
    return units;
  };
  const resetReport = (message = "等待至少两件作品。") => {
    fullReport = ""; report.dataset.ready = "false"; put(stateNode, "UNSET"); put(workCount, "0"); put(outsideCount, "0"); put(overlapCount, "0"); put(areaPercent, "0%"); put(findingSummary, "等待校核"); findingList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "生成后显示越界、相交与未封存状态。" })); put(workSummary, "等待作品"); workList.replaceChildren(Object.assign(document.createElement("p"), { textContent: "等待矩形记录。" })); preview.replaceChildren(Object.assign(document.createElement("span"), { textContent: "等待图纸" })); copyButton.disabled = true; put(formStatus, message); announce("");
  };
  const fail = (message) => { put(errorNode, message); resetReport("输入未通过校核，挂墙图纸未生成。"); };
  const parse = () => {
    const wallW = parseNumber(wallWField.value.trim(), "墙宽", false); const wallH = parseNumber(wallHField.value.trim(), "墙高", false); const raw = rowsField.value;
    if (Array.from(raw).length > 7000) throw new Error("全部作品输入最多 7000 个字符。");
    const lines = raw.split(/\r?\n/u).map((line) => line.trim()).filter(Boolean);
    if (lines.length < 2) throw new Error("请至少输入 2 件作品。"); if (lines.length > 80) throw new Error("一次最多计算 80 件作品。");
    const exact = new Set(); const normalized = new Set();
    const works = lines.map((line, index) => {
      const fields = line.split("|").map((field) => field.trim()); const row = index + 1;
      if (fields.length !== 6) throw new Error(`第 ${row} 行须包含 6 项，并以 | 分隔。`);
      const [id, xText, yText, wText, hText, status] = fields; const length = Array.from(id).length;
      if (length < 2 || length > 24) throw new Error(`第 ${row} 行作品号须为 2–24 个字符。`); if (/\p{Cc}|\p{Cf}/u.test(id)) throw new Error(`第 ${row} 行作品号含不可见控制字符。`);
      if (exact.has(id)) throw new Error(`第 ${row} 行作品号与前文完全重复：${id}。`); exact.add(id); const key = normalize(id); if (normalized.has(key)) throw new Error(`第 ${row} 行作品号规范化后重复：${id}。`); normalized.add(key);
      const x = parseNumber(xText, `第 ${row} 行 X`, true); const y = parseNumber(yText, `第 ${row} 行 Y`, true); const width = parseNumber(wText, `第 ${row} 行宽`, false); const height = parseNumber(hText, `第 ${row} 行高`, false);
      if (!statuses.has(status)) throw new Error(`第 ${row} 行状态只能是“草图”“核位”或“封存”。`);
      return { id, key, x, y, width, height, status };
    });
    return { wallW, wallH, works };
  };
  const addLimited = (container, values, factory) => {
    const fragment = document.createDocumentFragment(); values.slice(0, 40).forEach((value, index) => fragment.append(factory(value, index)));
    if (values.length > 40) { const more = document.createElement(container.tagName === "UL" ? "li" : "p"); more.textContent = `界面仅显示前 40 项，另有 ${values.length - 40} 项已写入复制交接。`; fragment.append(more); }
    container.replaceChildren(fragment);
  };
  const render = ({ wallW, wallH, works }) => {
    const outside = works.filter((work) => work.x + work.width > wallW || work.y + work.height > wallH);
    const overlaps = [];
    for (let i = 0; i < works.length; i += 1) for (let j = i + 1; j < works.length; j += 1) {
      const a = works[i]; const b = works[j];
      if (Math.max(a.x, b.x) < Math.min(a.x + a.width, b.x + b.width) && Math.max(a.y, b.y) < Math.min(a.y + a.height, b.y + b.height)) overlaps.push([a, b]);
    }
    const statusFlags = works.filter((work) => work.status !== "封存");
    const geometry = [...outside.map((work) => `${work.id}：矩形超出墙面右边或下边。`), ...overlaps.map(([a, b]) => `${a.id} × ${b.id}：两个矩形内部相交。`)];
    const findings = [...geometry, ...statusFlags.map((work) => `${work.id}：当前状态为“${work.status}”，尚未记录为封存。`)];
    let state = "WALL CLEAR"; if (geometry.length && statusFlags.length) state = `REVIEW ${findings.length}`; else if (geometry.length) state = `GEOMETRY FLAGS ${geometry.length}`; else if (statusFlags.length) state = `STATUS FLAGS ${statusFlags.length}`;
    const area = works.reduce((sum, work) => sum + work.width * work.height, 0); const percent = (area / (wallW * wallH) * 100).toFixed(2);
    report.dataset.ready = "true"; put(stateNode, state); put(workCount, String(works.length)); put(outsideCount, String(outside.length)); put(overlapCount, String(overlaps.length)); put(areaPercent, `${percent}%`); put(findingSummary, findings.length ? `${findings.length} 项排布提示` : "没有越界、相交或未封存提示");
    addLimited(findingList, findings.length ? findings : ["全部作品均在墙面内，彼此不相交，且状态均为封存。"], (finding) => Object.assign(document.createElement("li"), { textContent: finding }));
    put(workSummary, `${works.length} 件作品 · 墙面 ${(wallW / 10).toFixed(1)} × ${(wallH / 10).toFixed(1)} cm`);
    addLimited(workList, works, (work) => { const card = document.createElement("article"); card.className = "sl145-work-card"; const title = document.createElement("b"); const coord = document.createElement("span"); const size = document.createElement("small"); const status = document.createElement("strong"); title.textContent = work.id; coord.textContent = `X ${(work.x / 10).toFixed(1)} · Y ${(work.y / 10).toFixed(1)}`; size.textContent = `${(work.width / 10).toFixed(1)} × ${(work.height / 10).toFixed(1)} cm`; status.textContent = work.status; card.append(title, coord, size, status); return card; });
    const wallFragment = document.createDocumentFragment(); const caption = document.createElement("span"); caption.textContent = `${(wallW / 10).toFixed(1)} × ${(wallH / 10).toFixed(1)} cm`; wallFragment.append(caption);
    works.forEach((work, index) => { const box = document.createElement("i"); box.textContent = String(index + 1); box.title = work.id; box.style.left = `${(work.x / wallW) * 100}%`; box.style.top = `${(work.y / wallH) * 100}%`; box.style.width = `${(work.width / wallW) * 100}%`; box.style.height = `${(work.height / wallH) * 100}%`; if (outside.includes(work)) box.dataset.outside = "true"; wallFragment.append(box); }); preview.replaceChildren(wallFragment);
    fullReport = ["挂墙排布交接", `状态：${state}`, `墙面：${(wallW / 10).toFixed(1)} × ${(wallH / 10).toFixed(1)} cm`, `作品：${works.length}`, `越界：${outside.length}`, `重叠对：${overlaps.length}`, `名义作品面积：${(area / 100).toFixed(2)} cm²`, `名义占墙：约 ${percent}%`, "", "逐件作品：", ...works.map((work, index) => `${index + 1}. ${work.id} | X ${(work.x / 10).toFixed(1)} | Y ${(work.y / 10).toFixed(1)} | ${(work.width / 10).toFixed(1)} × ${(work.height / 10).toFixed(1)} cm | ${work.status}`), "", "排布提示：", ...(findings.length ? findings.map((finding, index) => `${index + 1}. ${finding}`) : ["无。全部作品均在墙面内，彼此不相交，且状态均为封存。"]), "", "计算口径：全部长度以十分之一厘米整数计算；矩形内部横纵均有正长度交集才计重叠，边缘或角点接触不计；名义面积不扣除重叠。", "边界：报告不读取或判断真实测量、墙体、承重、固定、材料、玻璃、照明、消防、通行、价值、权利或现场安全。"].join("\n");
    copyButton.disabled = false; put(formStatus, `已校核 ${works.length} 件作品；矩形关系不代表现场可安装。`);
  };
  form.querySelectorAll("[data-sl145-preset]").forEach((button) => button.addEventListener("click", () => { const preset = presets[button.dataset.sl145Preset]; wallWField.value = preset.w; wallHField.value = preset.h; rowsField.value = preset.rows; put(errorNode, ""); resetReport("示例已展开，请生成挂墙图纸。"); rowsField.focus(); }));
  [wallWField, wallHField, rowsField].forEach((field) => field.addEventListener("input", () => { put(errorNode, ""); if (report.dataset.ready === "true") resetReport("墙面或作品数据已改变，请重新生成图纸。"); }));
  form.addEventListener("reset", () => window.setTimeout(() => { put(errorNode, ""); resetReport("图纸已撤下，输入已恢复初始示例。"); }, 0));
  form.addEventListener("submit", (event) => { event.preventDefault(); put(errorNode, ""); announce(""); try { render(parse()); } catch (error) { fail(error instanceof Error ? error.message : "输入未通过校核。"); } });
  copyButton.addEventListener("click", async () => { if (fullReport) announce((await copyText(fullReport)) ? "完整排布交接已复制。" : "复制失败，请手动选择内容。"); });
})();
