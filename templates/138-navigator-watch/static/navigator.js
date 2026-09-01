(() => {
  "use strict";

  const root = document.documentElement;
  const modeButton = document.querySelector("[data-nv138-mode-toggle]");
  const copyStatuses = document.querySelectorAll("[data-nv138-copy-status]");
  const modeKey = "nv138-chart-mode";
  const setText = (node, value) => { if (node) node.textContent = value; };

  const announceCopy = (message) => copyStatuses.forEach((node) => setText(node, message));
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

  const readMode = () => {
    try { return localStorage.getItem(modeKey) === "day" ? "day" : "night"; }
    catch (_) { return "night"; }
  };
  const applyMode = (mode) => {
    const night = mode === "night";
    root.dataset.nv138Mode = night ? "night" : "day";
    if (modeButton) {
      modeButton.setAttribute("aria-pressed", String(night));
      modeButton.textContent = night ? "切换日间海图" : "返回夜间海图";
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = night ? "#061826" : "#e8e8df";
  };
  applyMode(readMode());
  modeButton?.addEventListener("click", () => {
    const next = root.dataset.nv138Mode === "night" ? "day" : "night";
    applyMode(next);
    try { localStorage.setItem(modeKey, next); } catch (_) { /* visual control remains usable */ }
  });

  const progress = document.querySelector(".nv138-progress");
  if (progress) {
    let scheduled = false;
    const update = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const measured = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      const value = measured >= 95 ? 100 : measured;
      progress.value = value;
      progress.setAttribute("value", String(value));
      scheduled = false;
    };
    window.addEventListener("scroll", () => {
      if (!scheduled) { scheduled = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  document.querySelector("[data-nv138-copy-log]")?.addEventListener("click", async () => {
    const text = [
      "蓝水离岸日志摘要",
      "1. 出发点应连同海图、定位设备、时间源与读数精度记录。",
      "2. 真航向、磁航向、船首向和数据来源不能混写。",
      "3. 水流假设须同时记录方向、速度、时长与时效。",
      "4. 每次交班应公开航速、流况、最后可靠定位和未决状态。",
      "5. 接近陆标时，推算必须让位于可靠定位和真实航行判断。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "日志摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const doors = Array.from(document.querySelectorAll(".nv138-door-list details"));
  doors.forEach((door) => door.addEventListener("toggle", () => {
    if (!door.open) return;
    doors.forEach((peer) => { if (peer !== door) peer.open = false; });
  }));
  document.querySelector("[data-nv138-copy-policy]")?.addEventListener("click", async () => {
    const text = [
      "航海责任界线摘要",
      "网页不证明真实位置、海图、测深、航标、浅滩或港口信息。",
      "工具不校验航向来源、磁差、罗差、定位和传感器状态。",
      "恒定水流只是数学假设，不是气象、潮汐、洋流或海况预报。",
      "输出不构成航线、避碰、进出港、值守、适航、救生或应急指令。",
      "真实航行必须使用可靠资料、适航设备并由合格责任人判断。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "界线摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const searchForm = document.querySelector("[data-nv138-search]");
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = searchForm.querySelector("#nv138-clue");
    const status = searchForm.querySelector("[data-nv138-search-status]");
    const clue = input.value.trim();
    const length = Array.from(clue).length;
    if (!length) { setText(status, "请输入日志、推算或安全界线线索。"); return; }
    if (length > 80) { setText(status, "线索最多 80 个字符，请缩短后再查找。"); return; }
    const routes = [
      { terms: ["日志", "离岸", "航向", "水流", "值守", "陆标"], page: "article.html", label: "离岸日志" },
      { terms: ["向量", "推算", "距离", "方位", "偏流", "航段"], page: "tool.html", label: "航迹推算" },
      { terms: ["安全", "适航", "避碰", "设备", "权利", "界线"], page: "legal.html", label: "责任界线" }
    ];
    const route = routes.find((item) => item.terms.some((term) => clue.includes(term))) || { page: "index.html", label: "海图首页" };
    setText(status, `已匹配“${route.label}”，正在打开。`);
    window.setTimeout(() => window.location.assign(route.page), 350);
  });

  const legForm = document.querySelector("[data-nv138-leg-form]");
  if (!legForm) return;

  const input = legForm.querySelector("#nv138-legs");
  const errorNode = legForm.querySelector("[data-nv138-error]");
  const formStatus = legForm.querySelector("[data-nv138-form-status]");
  const report = document.querySelector(".nv138-track-report");
  const q = (selector) => report.querySelector(selector);
  const stateNode = q("[data-nv138-report-state]");
  const bearingNode = q("[data-nv138-bearing]");
  const distanceNode = q("[data-nv138-distance]");
  const countNode = q("[data-nv138-leg-count]");
  const minutesNode = q("[data-nv138-minutes]");
  const driftCountNode = q("[data-nv138-drift-count]");
  const statusCountNode = q("[data-nv138-status-count]");
  const findingSummary = q("[data-nv138-finding-summary]");
  const findingList = q("[data-nv138-finding-list]");
  const legSummary = q("[data-nv138-leg-summary]");
  const legList = q("[data-nv138-leg-list]");
  const lineNode = q("[data-nv138-track-points]");
  const endNode = q("[data-nv138-track-end]");
  const copyButton = q("[data-nv138-copy-report]");
  const degreePattern = /^(?:0|[1-9]\d?|[12]\d{2}|3[0-5]\d)$/;
  const vesselSpeedPattern = /^(?:0\.[1-9]|[1-9](?:\.\d)?|[1-7]\d(?:\.\d)?|80(?:\.0)?)$/;
  const currentSpeedPattern = /^(?:0(?:\.\d)?|[1-9](?:\.\d)?|1\d(?:\.\d)?|20(?:\.0)?)$/;
  const minutePattern = /^(?:[1-9]\d{0,2}|1[0-3]\d{2}|14[0-3]\d|1440)$/;
  const validStatuses = new Set(["计划", "核对", "记录"]);
  const presets = {
    clear: "离岸 A | 30 | 8.0 | 60 | 90 | 0 | 记录\n外海 B | 30 | 8.0 | 60 | 90 | 0 | 记录",
    drift: "离岸 C | 0 | 8.0 | 60 | 90 | 2.0 | 记录\n外海 D | 0 | 8.0 | 60 | 0 | 0 | 记录",
    multi: "北上 E | 0 | 7.5 | 90 | 90 | 2.0 | 记录\n转向 F | 45 | 8.0 | 75 | 135 | 1.8 | 记录",
    review: "离岸 G | 0 | 8.0 | 60 | 90 | 2.0 | 计划\n外海 H | 0 | 8.0 | 60 | 0 | 0 | 核对"
  };
  let currentReport = "";

  const normalizeName = (name) => name.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("zh-CN");
  const bearingLabel = (value) => `${String(Math.round(value) % 360).padStart(3, "0")}°`;
  const angleDifference = (to, from) => ((to - from + 540) % 360) - 180;
  const finiteRound = (value, digits = 2) => Number(value.toFixed(digits));

  const resetReport = (message = "等待至少两个航段。") => {
    currentReport = "";
    report.dataset.ready = "false";
    setText(stateNode, "UNSET");
    setText(bearingNode, "—");
    setText(distanceNode, "等待计算");
    setText(countNode, "0");
    setText(minutesNode, "0");
    setText(driftCountNode, "0");
    setText(statusCountNode, "0");
    setText(findingSummary, "等待计算");
    findingList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "报告生成后显示航迹偏角与文档状态提示。" }));
    setText(legSummary, "等待计算");
    legList.replaceChildren(Object.assign(document.createElement("p"), { textContent: "等待航段记录。" }));
    lineNode.setAttribute("points", "40,260 600,40");
    endNode.setAttribute("cx", "600");
    endNode.setAttribute("cy", "40");
    copyButton.disabled = true;
    setText(formStatus, message);
    announceCopy("");
  };
  const fail = (message) => { setText(errorNode, message); resetReport("输入未通过校核，报告未生成。"); };

  const parseRows = (raw) => {
    if (Array.from(raw).length > 6000) throw new Error("全部输入最多 6000 个字符。");
    const lines = raw.split(/\r?\n/u).map((line) => line.trim()).filter(Boolean);
    if (lines.length < 2) throw new Error("请至少输入 2 个航段。");
    if (lines.length > 80) throw new Error("一次最多推算 80 个航段。");
    const exact = new Set();
    const normalized = new Set();
    return lines.map((line, index) => {
      const fields = line.split("|").map((field) => field.trim());
      const row = index + 1;
      if (fields.length !== 7) throw new Error(`第 ${row} 行须包含 7 项，并以 | 分隔。`);
      const [name, courseText, speedText, minutesText, currentText, currentSpeedText, status] = fields;
      const length = Array.from(name).length;
      if (length < 2 || length > 24) throw new Error(`第 ${row} 行航段名须为 2–24 个字符。`);
      if (/\p{Cc}|\p{Cf}/u.test(name)) throw new Error(`第 ${row} 行航段名含不可见控制字符。`);
      if (exact.has(name)) throw new Error(`第 ${row} 行航段名与前文完全重复：${name}。`);
      exact.add(name);
      const key = normalizeName(name);
      if (normalized.has(key)) throw new Error(`第 ${row} 行航段名规范化后重复：${name}。`);
      normalized.add(key);
      if (!degreePattern.test(courseText) || !degreePattern.test(currentText)) throw new Error(`第 ${row} 行航向和流向须为 0–359 的普通十进制整数。`);
      if (!vesselSpeedPattern.test(speedText)) throw new Error(`第 ${row} 行航速须为 0.1–80.0、最多一位小数的普通数字。`);
      if (!minutePattern.test(minutesText)) throw new Error(`第 ${row} 行时长须为 1–1440 的普通十进制整数。`);
      if (!currentSpeedPattern.test(currentSpeedText)) throw new Error(`第 ${row} 行流速须为 0–20.0、最多一位小数的普通数字。`);
      if (!validStatuses.has(status)) throw new Error(`第 ${row} 行状态只能是“计划”“核对”或“记录”。`);
      const course = Number(courseText);
      const speed = Number(speedText);
      const minutes = Number(minutesText);
      const current = Number(currentText);
      const currentSpeed = Number(currentSpeedText);
      const vesselDistance = speed * minutes / 60;
      const driftDistance = currentSpeed * minutes / 60;
      const radians = (degree) => degree * Math.PI / 180;
      const east = Math.sin(radians(course)) * vesselDistance + Math.sin(radians(current)) * driftDistance;
      const north = Math.cos(radians(course)) * vesselDistance + Math.cos(radians(current)) * driftDistance;
      const distance = Math.hypot(east, north);
      const bearing = distance < 1e-9 ? null : (Math.atan2(east, north) * 180 / Math.PI + 360) % 360;
      const deviation = bearing === null ? null : angleDifference(bearing, course);
      return { name, course, speed, minutes, current, currentSpeed, status, east, north, distance, bearing, deviation };
    });
  };

  const addLimited = (container, values, factory) => {
    const fragment = document.createDocumentFragment();
    values.slice(0, 40).forEach((value, index) => fragment.append(factory(value, index)));
    if (values.length > 40) {
      const more = document.createElement(container.tagName === "UL" ? "li" : "p");
      more.textContent = `界面仅显示前 40 项，另有 ${values.length - 40} 项已写入复制报告。`;
      fragment.append(more);
    }
    container.replaceChildren(fragment);
  };

  const plotPoints = (legs) => {
    const points = [{ east: 0, north: 0 }];
    legs.forEach((leg) => {
      const prior = points[points.length - 1];
      points.push({ east: prior.east + leg.east, north: prior.north + leg.north });
    });
    const minEast = Math.min(...points.map((point) => point.east));
    const maxEast = Math.max(...points.map((point) => point.east));
    const minNorth = Math.min(...points.map((point) => point.north));
    const maxNorth = Math.max(...points.map((point) => point.north));
    const rangeEast = Math.max(.001, maxEast - minEast);
    const rangeNorth = Math.max(.001, maxNorth - minNorth);
    const scale = Math.min(520 / rangeEast, 220 / rangeNorth);
    const usedWidth = rangeEast * scale;
    const usedHeight = rangeNorth * scale;
    const offsetX = 60 + (520 - usedWidth) / 2;
    const offsetY = 260 - (220 - usedHeight) / 2;
    const mapped = points.map((point) => ({ x: offsetX + (point.east - minEast) * scale, y: offsetY - (point.north - minNorth) * scale }));
    lineNode.setAttribute("points", mapped.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" "));
    const last = mapped[mapped.length - 1];
    endNode.setAttribute("cx", last.x.toFixed(1));
    endNode.setAttribute("cy", last.y.toFixed(1));
  };

  const render = (legs) => {
    const driftLegs = legs.filter((leg) => leg.deviation === null || Math.abs(leg.deviation) >= 5 - 1e-9);
    const statusLegs = legs.filter((leg) => leg.status !== "记录");
    const findings = [
      ...driftLegs.map((leg) => leg.deviation === null
        ? `${leg.name}：船速与水流向量近似抵消，合成方向无法定义。`
        : `${leg.name}：合成方向相对输入航向偏离 ${Math.abs(leg.deviation).toFixed(1)}°，请复核流况假设。`),
      ...statusLegs.map((leg) => `${leg.name}：当前状态为“${leg.status}”，尚未记录为完成航段。`)
    ];
    let state = "TRACK CLEAR";
    if (driftLegs.length && statusLegs.length) state = `REVIEW ${findings.length}`;
    else if (driftLegs.length) state = `DRIFT HINTS ${driftLegs.length}`;
    else if (statusLegs.length) state = `STATUS FLAGS ${statusLegs.length}`;
    const east = legs.reduce((sum, leg) => sum + leg.east, 0);
    const north = legs.reduce((sum, leg) => sum + leg.north, 0);
    const distance = Math.hypot(east, north);
    const bearing = distance < 1e-9 ? null : (Math.atan2(east, north) * 180 / Math.PI + 360) % 360;
    const totalMinutes = legs.reduce((sum, leg) => sum + leg.minutes, 0);
    const bearingText = bearing === null ? "N/A" : bearingLabel(bearing);

    report.dataset.ready = "true";
    setText(stateNode, state);
    setText(bearingNode, bearingText);
    setText(distanceNode, `累计直线位移 ${distance.toFixed(2)} nm · 东 ${east.toFixed(2)} / 北 ${north.toFixed(2)} nm`);
    setText(countNode, String(legs.length));
    setText(minutesNode, `${totalMinutes} min`);
    setText(driftCountNode, String(driftLegs.length));
    setText(statusCountNode, String(statusLegs.length));
    setText(findingSummary, findings.length ? `${findings.length} 项交接提示` : "没有偏流或未记录状态提示");
    addLimited(findingList, findings.length ? findings : ["全部航段合成偏角小于 5°，且状态均为记录。"], (finding) => Object.assign(document.createElement("li"), { textContent: finding }));
    setText(legSummary, `${legs.length} 个航段的向量结果`);
    addLimited(legList, legs, (leg) => {
      const card = document.createElement("article");
      card.className = "nv138-leg-card";
      const title = document.createElement("b");
      const detail = document.createElement("span");
      const bearing = document.createElement("strong");
      title.textContent = `${leg.name} · ${leg.status}`;
      detail.textContent = `航向 ${bearingLabel(leg.course)} · ${leg.speed.toFixed(1)} kn × ${leg.minutes} min · 流 ${bearingLabel(leg.current)} / ${leg.currentSpeed.toFixed(1)} kn · 位移 ${leg.distance.toFixed(2)} nm`;
      bearing.textContent = leg.bearing === null ? "N/A" : bearingLabel(leg.bearing);
      card.append(title, detail, bearing);
      return card;
    });
    plotPoints(legs);

    currentReport = [
      "航迹向量推算报告",
      `状态：${state}`,
      `累计方位：${bearingText}`,
      `累计直线位移：${distance.toFixed(2)} nm`,
      `累计东向分量：${east.toFixed(2)} nm`,
      `累计北向分量：${north.toFixed(2)} nm`,
      `航段：${legs.length}`,
      `总时长：${totalMinutes} min`,
      `偏流提示：${driftLegs.length}`,
      `状态提示：${statusLegs.length}`,
      "",
      "逐段结果：",
      ...legs.map((leg, index) => `${index + 1}. ${leg.name} | 航向 ${bearingLabel(leg.course)} | 航速 ${leg.speed.toFixed(1)} kn | ${leg.minutes} min | 流 ${bearingLabel(leg.current)} / ${leg.currentSpeed.toFixed(1)} kn | 合成 ${leg.bearing === null ? "N/A" : bearingLabel(leg.bearing)} / ${leg.distance.toFixed(2)} nm | ${leg.status}`),
      "",
      "交接提示：",
      ...(findings.length ? findings.map((finding, index) => `${index + 1}. ${finding}`) : ["无。全部航段合成偏角小于 5°，且状态均为记录。"]),
      "",
      "边界：本报告只按输入数字进行平面向量演示；不考虑地球曲率、位置、风、浪、潮汐变化、磁差、罗差、操舵与设备误差、浅滩、交通、法规或紧急情况，不可用于真实导航或安全决定。"
    ].join("\n");
    copyButton.disabled = false;
    setText(formStatus, `已计算 ${legs.length} 个航段；图形按结果自动缩放，不代表真实地理位置。`);
  };

  legForm.querySelectorAll("[data-nv138-preset]").forEach((button) => button.addEventListener("click", () => {
    input.value = presets[button.dataset.nv138Preset];
    setText(errorNode, "");
    resetReport("示例已载入，请绘制推算航迹。");
    input.focus();
  }));
  input.addEventListener("input", () => {
    setText(errorNode, "");
    if (report.dataset.ready === "true") resetReport("输入已改变，请重新生成报告。");
  });
  legForm.addEventListener("reset", () => window.setTimeout(() => {
    setText(errorNode, "");
    resetReport("报告已清空，输入已恢复初始示例。");
  }, 0));
  legForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setText(errorNode, "");
    announceCopy("");
    try { render(parseRows(input.value)); }
    catch (error) { fail(error instanceof Error ? error.message : "输入未通过校核。"); }
  });
  copyButton.addEventListener("click", async () => {
    if (!currentReport) return;
    announceCopy((await copyText(currentReport)) ? "完整报告已复制。" : "复制失败，请手动选择内容。");
  });
})();
