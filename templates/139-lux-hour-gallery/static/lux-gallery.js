(() => {
  "use strict";

  const root = document.documentElement;
  const sceneButton = document.querySelector("[data-lx139-scene-toggle]");
  const copyStatuses = document.querySelectorAll("[data-lx139-copy-status]");
  const sceneKey = "lx139-gallery-scene";
  const setText = (node, value) => { if (node) node.textContent = value; };
  const announceCopy = (message) => copyStatuses.forEach((node) => setText(node, message));
  const copyText = async (value) => {
    try { await navigator.clipboard.writeText(value); return true; }
    catch (_) {
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

  const readScene = () => {
    try { return localStorage.getItem(sceneKey) === "work" ? "work" : "dark"; }
    catch (_) { return "dark"; }
  };
  const applyScene = (scene) => {
    const dark = scene === "dark";
    root.dataset.lx139Scene = dark ? "dark" : "work";
    if (sceneButton) {
      sceneButton.setAttribute("aria-pressed", String(dark));
      sceneButton.textContent = dark ? "开启工作灯" : "返回暗场展厅";
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? "#0d0d0f" : "#e8e2d8";
  };
  applyScene(readScene());
  sceneButton?.addEventListener("click", () => {
    const next = root.dataset.lx139Scene === "dark" ? "work" : "dark";
    applyScene(next);
    try { localStorage.setItem(sceneKey, next); } catch (_) { /* visual mode still works */ }
  });

  const progress = document.querySelector(".lx139-progress");
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

  document.querySelector("[data-lx139-copy-note]")?.addEventListener("click", async () => {
    const text = [
      "展厅照明备忘摘要",
      "1. 材料敏感性与年度限额必须由可靠鉴定和保管依据支持。",
      "2. 灯具光谱、调光、距离、角度、反射、热与紫外应独立核定。",
      "3. 照度读数要保留仪器、校准、测点、朝向、环境光与时间。",
      "4. 累计照度时数等于照度乘每日小时再乘展期。",
      "5. 开放时数、展期、展位、灯具或限额变化后必须重新复核。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "照明摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const labels = Array.from(document.querySelectorAll(".lx139-label-list details"));
  labels.forEach((label) => label.addEventListener("toggle", () => {
    if (!label.open) return;
    labels.forEach((peer) => { if (peer !== label) peer.open = false; });
  }));
  document.querySelector("[data-lx139-copy-policy]")?.addEventListener("click", async () => {
    const text = [
      "展览照明责任边界摘要",
      "页面不鉴定材料、既往处理、光敏感性或保管等级。",
      "网页不校验照度仪器、校准、测点、环境光或数据真实性。",
      "页面不推荐灯具、光谱、紫外、调光、距离、角度、热或配光方案。",
      "限额比例只与用户输入比较，不决定轮换、闭馆、借展、运输或保管措施。",
      "真实照明、安装、展览和安全决定必须由对应责任人批准。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "边界摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const searchForm = document.querySelector("[data-lx139-search]");
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = searchForm.querySelector("#lx139-clue");
    const status = searchForm.querySelector("[data-lx139-search-status]");
    const clue = input.value.trim();
    const length = Array.from(clue).length;
    if (!length) { setText(status, "请输入藏品、剂量或责任边界线索。"); return; }
    if (length > 80) { setText(status, "线索最多 80 个字符，请缩短后再查找。"); return; }
    const routes = [
      { terms: ["藏品", "材料", "光源", "测量", "备忘", "交接"], page: "article.html", label: "照明备忘" },
      { terms: ["照度", "剂量", "时数", "限额", "预算", "计算"], page: "tool.html", label: "光剂量表" },
      { terms: ["保管", "安装", "安全", "仪器", "权利", "边界"], page: "legal.html", label: "责任边界" }
    ];
    const route = routes.find((item) => item.terms.some((term) => clue.includes(term))) || { page: "index.html", label: "展厅首页" };
    setText(status, `已匹配“${route.label}”，正在打开。`);
    window.setTimeout(() => window.location.assign(route.page), 350);
  });

  const doseForm = document.querySelector("[data-lx139-dose-form]");
  if (!doseForm) return;
  const input = doseForm.querySelector("#lx139-rows");
  const errorNode = doseForm.querySelector("[data-lx139-error]");
  const formStatus = doseForm.querySelector("[data-lx139-form-status]");
  const report = document.querySelector(".lx139-dose-report");
  const q = (selector) => report.querySelector(selector);
  const stateNode = q("[data-lx139-report-state]");
  const utilizationNode = q("[data-lx139-utilization]");
  const ringNode = q("[data-lx139-ring]");
  const totalNode = q("[data-lx139-total]");
  const objectCountNode = q("[data-lx139-object-count]");
  const doseTotalNode = q("[data-lx139-dose-total]");
  const doseCountNode = q("[data-lx139-dose-count]");
  const statusCountNode = q("[data-lx139-status-count]");
  const findingSummary = q("[data-lx139-finding-summary]");
  const findingList = q("[data-lx139-finding-list]");
  const objectSummary = q("[data-lx139-object-summary]");
  const objectList = q("[data-lx139-object-list]");
  const copyButton = q("[data-lx139-copy-report]");
  const luxPattern = /^(?:[1-9]\d{0,4}|100000)$/;
  const hourPattern = /^(?:0\.[1-9]|[1-9](?:\.\d)?|1\d(?:\.\d)?|2[0-3](?:\.\d)?|24(?:\.0)?)$/;
  const dayPattern = /^(?:[1-9]\d?|[12]\d{2}|3[0-5]\d|36[0-6])$/;
  const limitPattern = /^(?:[1-9]\d{0,8}|1000000000)$/;
  const validStatuses = new Set(["草案", "复核", "定稿"]);
  const presets = {
    clear: "纸本 A | 50 | 8.0 | 30 | 150000 | 定稿\n织物 B | 30 | 6.0 | 30 | 100000 | 定稿",
    near: "版画 C | 50 | 8.0 | 300 | 150000 | 定稿\n织物 D | 30 | 6.0 | 30 | 100000 | 定稿",
    multi: "手稿 E | 100 | 8.0 | 200 | 150000 | 定稿\n织物 F | 50 | 8.0 | 300 | 150000 | 定稿",
    review: "手稿 G | 100 | 8.0 | 200 | 150000 | 草案\n照片 H | 30 | 6.0 | 30 | 100000 | 复核"
  };
  let currentReport = "";

  const normalizeName = (name) => name.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("zh-CN");
  const parseTenths = (value) => {
    const [whole, decimal = "0"] = value.split(".");
    return BigInt(whole) * 10n + BigInt(decimal);
  };
  const formatTenths = (value) => `${value / 10n}.${value % 10n}`;
  const formatPercent = (part, whole) => {
    const scaled = (part * 10000n + whole / 2n) / whole;
    return `${scaled / 100n}.${String(scaled % 100n).padStart(2, "0")}%`;
  };

  const resetReport = (message = "等待至少两件展品记录。") => {
    currentReport = "";
    report.dataset.ready = "false";
    setText(stateNode, "UNSET");
    setText(utilizationNode, "—");
    ringNode.style.setProperty("--lx139-fill", "0deg");
    setText(totalNode, "等待计算");
    setText(objectCountNode, "0");
    setText(doseTotalNode, "0");
    setText(doseCountNode, "0");
    setText(statusCountNode, "0");
    setText(findingSummary, "等待计算");
    findingList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "报告生成后显示接近/超出用户限额和文档状态提示。" }));
    setText(objectSummary, "等待计算");
    objectList.replaceChildren(Object.assign(document.createElement("p"), { textContent: "等待展品记录。" }));
    copyButton.disabled = true;
    setText(formStatus, message);
    announceCopy("");
  };
  const fail = (message) => { setText(errorNode, message); resetReport("输入未通过校核，报告未生成。"); };

  const parseRows = (raw) => {
    if (Array.from(raw).length > 6000) throw new Error("全部输入最多 6000 个字符。");
    const lines = raw.split(/\r?\n/u).map((line) => line.trim()).filter(Boolean);
    if (lines.length < 2) throw new Error("请至少输入 2 件展品。");
    if (lines.length > 100) throw new Error("一次最多计算 100 件展品。");
    const exact = new Set();
    const normalized = new Set();
    return lines.map((line, index) => {
      const fields = line.split("|").map((field) => field.trim());
      const row = index + 1;
      if (fields.length !== 6) throw new Error(`第 ${row} 行须包含 6 项，并以 | 分隔。`);
      const [name, luxText, hoursText, daysText, limitText, status] = fields;
      const length = Array.from(name).length;
      if (length < 2 || length > 24) throw new Error(`第 ${row} 行展签须为 2–24 个字符。`);
      if (/\p{Cc}|\p{Cf}/u.test(name)) throw new Error(`第 ${row} 行展签含不可见控制字符。`);
      if (exact.has(name)) throw new Error(`第 ${row} 行展签与前文完全重复：${name}。`);
      exact.add(name);
      const key = normalizeName(name);
      if (normalized.has(key)) throw new Error(`第 ${row} 行展签规范化后重复：${name}。`);
      normalized.add(key);
      if (!luxPattern.test(luxText)) throw new Error(`第 ${row} 行照度须为 1–100000 的普通十进制整数。`);
      if (!hourPattern.test(hoursText)) throw new Error(`第 ${row} 行每日小时须为 0.1–24.0、最多一位小数的普通数字。`);
      if (!dayPattern.test(daysText)) throw new Error(`第 ${row} 行展期须为 1–366 的普通十进制整数。`);
      if (!limitPattern.test(limitText)) throw new Error(`第 ${row} 行年度限额须为 1–1000000000 的普通十进制整数。`);
      if (!validStatuses.has(status)) throw new Error(`第 ${row} 行状态只能是“草案”“复核”或“定稿”。`);
      const lux = BigInt(luxText);
      const hourTenths = parseTenths(hoursText);
      const days = BigInt(daysText);
      const limit = BigInt(limitText);
      const doseTenths = lux * hourTenths * days;
      const limitTenths = limit * 10n;
      const ratio = formatPercent(doseTenths, limitTenths);
      const exceeded = doseTenths > limitTenths;
      const near = !exceeded && doseTenths * 100n >= limitTenths * 80n;
      return { name, lux, hourTenths, days, limit, status, doseTenths, limitTenths, ratio, exceeded, near };
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

  const render = (objects) => {
    const doseFlags = objects.filter((object) => object.exceeded || object.near);
    const statusFlags = objects.filter((object) => object.status !== "定稿");
    const findings = [
      ...doseFlags.map((object) => object.exceeded
        ? `${object.name}：计划剂量 ${formatTenths(object.doseTenths)} lx·h，超出用户输入限额 ${object.limit} lx·h。`
        : `${object.name}：计划剂量已达到用户输入限额的 ${object.ratio}，请复核展期与测量假设。`),
      ...statusFlags.map((object) => `${object.name}：当前状态为“${object.status}”，尚未记录为定稿。`)
    ];
    let state = "LIGHT CLEAR";
    if (doseFlags.length && statusFlags.length) state = `REVIEW ${findings.length}`;
    else if (doseFlags.length) state = `DOSE FLAGS ${doseFlags.length}`;
    else if (statusFlags.length) state = `STATUS FLAGS ${statusFlags.length}`;
    const totalDose = objects.reduce((sum, object) => sum + object.doseTenths, 0n);
    const totalLimit = objects.reduce((sum, object) => sum + object.limitTenths, 0n);
    const utilization = formatPercent(totalDose, totalLimit);
    const fill = Math.min(360, Number(totalDose * 36000n / totalLimit) / 100);

    report.dataset.ready = "true";
    setText(stateNode, state);
    setText(utilizationNode, utilization);
    ringNode.style.setProperty("--lx139-fill", `${fill.toFixed(2)}deg`);
    setText(totalNode, `总计划剂量 ${formatTenths(totalDose)} / 总输入限额 ${formatTenths(totalLimit)} lx·h`);
    setText(objectCountNode, String(objects.length));
    setText(doseTotalNode, formatTenths(totalDose));
    setText(doseCountNode, String(doseFlags.length));
    setText(statusCountNode, String(statusFlags.length));
    setText(findingSummary, findings.length ? `${findings.length} 项交接提示` : "没有剂量或未定稿状态提示");
    addLimited(findingList, findings.length ? findings : ["全部计划剂量低于用户输入限额的 80%，且状态均为定稿。"], (finding) => Object.assign(document.createElement("li"), { textContent: finding }));
    setText(objectSummary, `${objects.length} 件展品的逐项预算`);
    addLimited(objectList, objects, (object) => {
      const card = document.createElement("article");
      card.className = "lx139-object-card";
      const title = document.createElement("b");
      const detail = document.createElement("span");
      const ratio = document.createElement("strong");
      title.textContent = `${object.name} · ${object.status}`;
      detail.textContent = `${object.lux} lx × ${formatTenths(object.hourTenths)} h × ${object.days} day = ${formatTenths(object.doseTenths)} lx·h / 限额 ${object.limit}`;
      ratio.textContent = object.ratio;
      card.append(title, detail, ratio);
      return card;
    });

    currentReport = [
      "展览光剂量报告",
      `状态：${state}`,
      `总加权利用率：${utilization}`,
      `展品：${objects.length}`,
      `总计划剂量：${formatTenths(totalDose)} lx·h`,
      `总输入限额：${formatTenths(totalLimit)} lx·h`,
      `剂量提示：${doseFlags.length}`,
      `状态提示：${statusFlags.length}`,
      "",
      "逐件预算：",
      ...objects.map((object, index) => `${index + 1}. ${object.name} | ${object.lux} lx | ${formatTenths(object.hourTenths)} h/day | ${object.days} day | 剂量 ${formatTenths(object.doseTenths)} lx·h | 限额 ${object.limit} lx·h | ${object.ratio} | ${object.status}`),
      "",
      "交接提示：",
      ...(findings.length ? findings.map((finding, index) => `${index + 1}. ${finding}`) : ["无。全部计划剂量低于用户输入限额的 80%，且状态均为定稿。"]),
      "",
      "边界：本报告只计算用户输入的照度、每日小时、展期、照度时数、限额比例与文档状态；不鉴定材料，不推荐限额、灯具、光谱、测点、展期、保管、安装或安全方案。"
    ].join("\n");
    copyButton.disabled = false;
    setText(formStatus, `已计算 ${objects.length} 件展品；比例只与用户输入的限额比较。`);
  };

  doseForm.querySelectorAll("[data-lx139-preset]").forEach((button) => button.addEventListener("click", () => {
    input.value = presets[button.dataset.lx139Preset];
    setText(errorNode, "");
    resetReport("示例已载入，请生成光剂量报告。");
    input.focus();
  }));
  input.addEventListener("input", () => {
    setText(errorNode, "");
    if (report.dataset.ready === "true") resetReport("输入已改变，请重新生成报告。");
  });
  doseForm.addEventListener("reset", () => window.setTimeout(() => {
    setText(errorNode, "");
    resetReport("报告已清空，输入已恢复初始示例。");
  }, 0));
  doseForm.addEventListener("submit", (event) => {
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
