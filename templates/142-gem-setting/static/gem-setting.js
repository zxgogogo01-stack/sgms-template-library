(() => {
  "use strict";

  const root = document.documentElement;
  const lampButton = document.querySelector("[data-gs142-lamp-toggle]");
  const copyStatuses = document.querySelectorAll("[data-gs142-copy-status]");
  const lampKey = "gs142-bench-lamp";
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

  const applyLamp = (bright) => {
    root.dataset.gs142Lamp = bright ? "bright" : "dim";
    if (lampButton) {
      lampButton.textContent = bright ? "调暗珠宝灯" : "点亮珠宝灯";
      lampButton.setAttribute("aria-pressed", String(bright));
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", bright ? "#101412" : "#050706");
  };
  let lampBright = true;
  try { lampBright = localStorage.getItem(lampKey) !== "dim"; } catch { lampBright = true; }
  applyLamp(lampBright);
  lampButton?.addEventListener("click", () => {
    lampBright = root.dataset.gs142Lamp !== "bright";
    applyLamp(lampBright);
    try { localStorage.setItem(lampKey, lampBright ? "bright" : "dim"); } catch { /* local-only preference */ }
  });

  document.querySelector("[data-gs142-copy-archive]")?.addEventListener("click", async () => {
    const value = document.querySelector("[data-gs142-archive]")?.textContent.trim() || "";
    announceCopy((await copyText(value)) ? "档案编号已复制。" : "复制失败，请手动选择编号。");
  });

  const progress = document.querySelector(".gs142-progress");
  if (progress) {
    let ticking = false;
    const updateProgress = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.setAttribute("value", String(Math.min(100, Math.round((window.scrollY / scrollable) * 100))));
      ticking = false;
    };
    const requestProgress = () => {
      if (!ticking) { ticking = true; window.requestAnimationFrame(updateProgress); }
    };
    updateProgress();
    window.addEventListener("scroll", requestProgress, { passive: true });
    window.addEventListener("resize", requestProgress);
  }

  document.querySelector("[data-gs142-copy-note]")?.addEventListener("click", async () => {
    const text = [
      "珠宝工坊核对摘要",
      "1. 来源、身份、证书与权利陈述必须有当前依据。",
      "2. 配石台只进行用户输入的整数减法，不验证实际库存或规格。",
      "3. 复核线由用户提供，不构成采购、工艺或质量建议。",
      "4. 镶位、加工、安全、估值、保险与交易由对应责任人确认。",
      "5. 数量或状态变化后重新生成报告并保留交接证据。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "工坊摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const legalDrawers = Array.from(document.querySelectorAll(".gs142-legal-list details"));
  legalDrawers.forEach((drawer) => drawer.addEventListener("toggle", () => {
    if (!drawer.open) return;
    legalDrawers.forEach((other) => { if (other !== drawer) other.open = false; });
  }));
  document.querySelector("[data-gs142-copy-policy]")?.addEventListener("click", async () => {
    const text = [
      "珠宝工坊责任摘要",
      "页面与工具不鉴定宝石、金属、处理方式、来源、证书、质量或真伪。",
      "数量清点不连接真实库存，不是锁库、采购、发料、加工或交付指令。",
      "估值、报价、税费、保险、交易、验收、保修与售后须由当前合同和业务系统确认。",
      "设计、照片、证书、客户、员工与供应商资料须核对隐私、保密、合同与权利。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "责任摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const searchForm = document.querySelector("[data-gs142-search]");
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = searchForm.querySelector("#gs142-clue");
    const status = searchForm.querySelector("[data-gs142-search-status]");
    const clue = input.value.trim();
    const length = Array.from(clue).length;
    if (!length) { setText(status, "请输入来源、数量或责任边界线索。"); return; }
    if (length > 80) { setText(status, "线索最多 80 个字符，请缩短后再寻找。"); return; }
    const routes = [
      { terms: ["来源", "札记", "切面", "记录", "交接", "工艺"], page: "article.html", label: "工坊札记" },
      { terms: ["数量", "可用", "镶位", "预留", "复核", "配石"], page: "tool.html", label: "配石工作台" },
      { terms: ["证书", "鉴定", "价格", "交易", "隐私", "权利", "保险"], page: "legal.html", label: "责任匣" }
    ];
    const route = routes.find((item) => item.terms.some((term) => clue.includes(term))) || { page: "index.html", label: "镶嵌台首页" };
    setText(status, `已匹配“${route.label}”，正在取出档案。`);
    window.setTimeout(() => window.location.assign(route.page), 350);
  });

  const countForm = document.querySelector("[data-gs142-count-form]");
  if (!countForm) return;
  const input = countForm.querySelector("#gs142-rows");
  const errorNode = countForm.querySelector("[data-gs142-error]");
  const formStatus = countForm.querySelector("[data-gs142-form-status]");
  const report = document.querySelector(".gs142-count-report");
  const q = (selector) => report.querySelector(selector);
  const stateNode = q("[data-gs142-report-state]");
  const tightestNode = q("[data-gs142-tightest]");
  const tightestLabelNode = q("[data-gs142-tightest-label]");
  const gaugeNode = q("[data-gs142-gauge]");
  const lotCountNode = q("[data-gs142-lot-count]");
  const seatTotalNode = q("[data-gs142-seat-total]");
  const balanceCountNode = q("[data-gs142-balance-count]");
  const statusCountNode = q("[data-gs142-status-count]");
  const findingSummary = q("[data-gs142-finding-summary]");
  const findingList = q("[data-gs142-finding-list]");
  const lotSummary = q("[data-gs142-lot-summary]");
  const lotList = q("[data-gs142-lot-list]");
  const copyButton = q("[data-gs142-copy-report]");
  const zeroInteger = /^(?:0|[1-9]\d{0,3})$/;
  const positiveInteger = /^[1-9]\d{0,3}$/;
  const validStatuses = new Set(["草稿", "已核", "已封"]);
  const presets = {
    clear: "戒托 A | 120 | 96 | 12 | 5 | 已封\n坠托 B | 84 | 64 | 10 | 4 | 已封",
    near: "胸针 C | 109 | 96 | 8 | 5 | 已封\n耳托 D | 72 | 48 | 12 | 4 | 已封",
    multi: "戒托 E | 94 | 96 | 2 | 4 | 已封\n坠托 F | 70 | 60 | 8 | 2 | 已封",
    review: "戒托 G | 94 | 96 | 2 | 4 | 草稿\n胸针 H | 90 | 72 | 10 | 3 | 已核"
  };
  let currentReport = "";

  const normalizeName = (name) => name.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("zh-CN");
  const formatBalance = (balance) => `${balance < 0 ? "−" : "+"}${Math.abs(balance)} PCS`;

  const resetReport = (message = "等待至少两个配石批次。") => {
    currentReport = "";
    report.dataset.ready = "false";
    setText(stateNode, "UNSET");
    setText(tightestNode, "—");
    setText(tightestLabelNode, "等待清点");
    gaugeNode.style.transform = "rotate(0deg)";
    setText(lotCountNode, "0");
    setText(seatTotalNode, "0");
    setText(balanceCountNode, "0");
    setText(statusCountNode, "0");
    setText(findingSummary, "等待清点");
    findingList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "报告生成后显示缺口、触线余量和未封状态。" }));
    setText(lotSummary, "等待清点");
    lotList.replaceChildren(Object.assign(document.createElement("p"), { textContent: "等待配石批次。" }));
    copyButton.disabled = true;
    setText(formStatus, message);
    announceCopy("");
  };
  const fail = (message) => { setText(errorNode, message); resetReport("输入未通过校核，配石清单未生成。"); };

  const parseRows = (raw) => {
    if (Array.from(raw).length > 6000) throw new Error("全部输入最多 6000 个字符。");
    const lines = raw.split(/\r?\n/u).map((line) => line.trim()).filter(Boolean);
    if (lines.length < 2) throw new Error("请至少输入 2 个配石批次。");
    if (lines.length > 100) throw new Error("一次最多计算 100 个配石批次。");
    const exact = new Set();
    const normalized = new Set();
    return lines.map((line, index) => {
      const fields = line.split("|").map((field) => field.trim());
      const row = index + 1;
      if (fields.length !== 6) throw new Error(`第 ${row} 行须包含 6 项，并以 | 分隔。`);
      const [name, availableText, seatsText, reserveText, reviewText, status] = fields;
      const nameLength = Array.from(name).length;
      if (nameLength < 2 || nameLength > 24) throw new Error(`第 ${row} 行托位须为 2–24 个字符。`);
      if (/\p{Cc}|\p{Cf}/u.test(name)) throw new Error(`第 ${row} 行托位含不可见控制字符。`);
      if (exact.has(name)) throw new Error(`第 ${row} 行托位与前文完全重复：${name}。`);
      exact.add(name);
      const key = normalizeName(name);
      if (normalized.has(key)) throw new Error(`第 ${row} 行托位规范化后重复：${name}。`);
      normalized.add(key);
      if (!zeroInteger.test(availableText)) throw new Error(`第 ${row} 行可用数量须为 0–9999 的普通十进制整数。`);
      if (!positiveInteger.test(seatsText)) throw new Error(`第 ${row} 行镶位数量须为 1–9999 的普通十进制整数。`);
      if (!zeroInteger.test(reserveText)) throw new Error(`第 ${row} 行预留数量须为 0–9999 的普通十进制整数。`);
      if (!zeroInteger.test(reviewText)) throw new Error(`第 ${row} 行复核线须为 0–9999 的普通十进制整数。`);
      if (!validStatuses.has(status)) throw new Error(`第 ${row} 行状态只能是“草稿”“已核”或“已封”。`);
      const available = Number(availableText);
      const seats = Number(seatsText);
      const reserve = Number(reserveText);
      const review = Number(reviewText);
      const balance = available - seats - reserve;
      const short = balance < 0;
      const near = !short && balance <= review;
      return { name, available, seats, reserve, review, status, balance, short, near };
    });
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

  const render = (lots) => {
    const balanceFlags = lots.filter((lot) => lot.short || lot.near);
    const statusFlags = lots.filter((lot) => lot.status !== "已封");
    const findings = [
      ...balanceFlags.map((lot) => lot.short
        ? `${lot.name}：可用 ${lot.available}，镶位 ${lot.seats}，预留 ${lot.reserve}，缺口 ${Math.abs(lot.balance)}。`
        : `${lot.name}：剩余 ${lot.balance}，已达到用户输入的复核线 ${lot.review}。`),
      ...statusFlags.map((lot) => `${lot.name}：当前状态为“${lot.status}”，尚未记录为已封。`)
    ];
    let state = "SET CLEAR";
    if (balanceFlags.length && statusFlags.length) state = `REVIEW ${findings.length}`;
    else if (balanceFlags.length) state = `BALANCE FLAGS ${balanceFlags.length}`;
    else if (statusFlags.length) state = `STATUS FLAGS ${statusFlags.length}`;
    const tightest = lots.reduce((best, lot) => !best || lot.balance < best.balance ? lot : best, null);
    const totalSeats = lots.reduce((sum, lot) => sum + lot.seats, 0);
    const angle = Math.max(-60, Math.min(60, tightest.balance)) * 1.35;

    report.dataset.ready = "true";
    setText(stateNode, state);
    setText(tightestNode, formatBalance(tightest.balance));
    setText(tightestLabelNode, `${tightest.name} · 可用 ${tightest.available} / 镶位 ${tightest.seats} / 预留 ${tightest.reserve}`);
    gaugeNode.style.transform = `rotate(${angle.toFixed(1)}deg)`;
    setText(lotCountNode, String(lots.length));
    setText(seatTotalNode, String(totalSeats));
    setText(balanceCountNode, String(balanceFlags.length));
    setText(statusCountNode, String(statusFlags.length));
    setText(findingSummary, findings.length ? `${findings.length} 项工坊提示` : "没有数量或未封状态提示");
    addLimited(findingList, findings.length ? findings : ["全部剩余数量高于用户复核线，且状态均为已封。"], (finding) => Object.assign(document.createElement("li"), { textContent: finding }));
    setText(lotSummary, `${lots.length} 个批次 · ${totalSeats} 个计划镶位`);
    addLimited(lotList, lots, (lot) => {
      const card = document.createElement("article");
      card.className = "gs142-lot-card";
      const title = document.createElement("b");
      const detail = document.createElement("span");
      const balance = document.createElement("strong");
      title.textContent = `${lot.name} · ${lot.status}`;
      detail.textContent = `可用 ${lot.available} · 镶位 ${lot.seats} · 预留 ${lot.reserve} · 复核线 ${lot.review}`;
      balance.textContent = formatBalance(lot.balance);
      card.append(title, detail, balance);
      return card;
    });

    currentReport = [
      "配石工坊交接",
      `状态：${state}`,
      `最紧余量：${tightest.name} / ${formatBalance(tightest.balance)}`,
      `批次：${lots.length}`,
      `计划总镶位：${totalSeats}`,
      `数量提示：${balanceFlags.length}`,
      `状态提示：${statusFlags.length}`,
      "",
      "逐批次清点：",
      ...lots.map((lot, index) => `${index + 1}. ${lot.name} | 可用 ${lot.available} | 镶位 ${lot.seats} | 预留 ${lot.reserve} | 复核线 ${lot.review} | ${formatBalance(lot.balance)} | ${lot.status}`),
      "",
      "工坊提示：",
      ...(findings.length ? findings.map((finding, index) => `${index + 1}. ${finding}`) : ["无。全部剩余数量高于用户复核线，且状态均为已封。"]),
      "",
      "边界：本报告只执行用户输入的可用、镶位、预留、复核线和状态清点；不识别或判断宝石、金属、处理、来源、证书、质量、真实库存、适配、工艺、价值、保险、交易、权利或交付。"
    ].join("\n");
    copyButton.disabled = false;
    setText(formStatus, `已清点 ${lots.length} 个批次；复核线完全来自用户输入。`);
  };

  countForm.querySelectorAll("[data-gs142-preset]").forEach((button) => button.addEventListener("click", () => {
    input.value = presets[button.dataset.gs142Preset];
    setText(errorNode, "");
    resetReport("示例已放上镶台，请生成配石清单。");
    input.focus();
  }));
  input.addEventListener("input", () => {
    setText(errorNode, "");
    if (report.dataset.ready === "true") resetReport("输入已改变，请重新生成配石清单。");
  });
  countForm.addEventListener("reset", () => window.setTimeout(() => {
    setText(errorNode, "");
    resetReport("清单已撤下，输入已恢复初始示例。");
  }, 0));
  countForm.addEventListener("submit", (event) => {
    event.preventDefault();
    setText(errorNode, "");
    announceCopy("");
    try { render(parseRows(input.value)); }
    catch (error) { fail(error instanceof Error ? error.message : "输入未通过校核。"); }
  });
  copyButton.addEventListener("click", async () => {
    if (!currentReport) return;
    announceCopy((await copyText(currentReport)) ? "完整交接已复制。" : "复制失败，请手动选择内容。");
  });
})();
