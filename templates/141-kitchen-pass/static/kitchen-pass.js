(() => {
  "use strict";

  const root = document.documentElement;
  const serviceButton = document.querySelector("[data-kp141-service-toggle]");
  const copyStatuses = document.querySelectorAll("[data-kp141-copy-status]");
  const serviceKey = "kp141-pass-service";
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

  const readService = () => {
    try { return localStorage.getItem(serviceKey) === "closed" ? "closed" : "open"; }
    catch (_) { return "open"; }
  };
  const applyService = (mode) => {
    const open = mode === "open";
    root.dataset.kp141Service = open ? "open" : "closed";
    if (serviceButton) {
      serviceButton.setAttribute("aria-pressed", String(open));
      serviceButton.textContent = open ? "熄灭出菜灯" : "重新点亮出菜口";
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = open ? "#f3ead8" : "#202624";
  };
  applyService(readService());
  serviceButton?.addEventListener("click", () => {
    const next = root.dataset.kp141Service === "open" ? "closed" : "open";
    applyService(next);
    try { localStorage.setItem(serviceKey, next); } catch (_) { /* visual mode still works */ }
  });

  const progress = document.querySelector(".kp141-progress");
  if (progress) {
    let pending = false;
    const update = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const measured = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      const value = measured >= 95 ? 100 : measured;
      progress.value = value;
      progress.setAttribute("value", String(value));
      pending = false;
    };
    window.addEventListener("scroll", () => {
      if (!pending) { pending = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  document.querySelector("[data-kp141-copy-note]")?.addEventListener("click", async () => {
    const text = [
      "厨师出菜口服务札记摘要",
      "1. 先确认菜单版本、桌号、时间、道数、状态与负责人。",
      "2. 入座时间只是用户输入的计划起点，不代表真实到店或首道出菜。",
      "3. 间隔分钟由用户提供，页面不根据菜单或桌号推荐节奏。",
      "4. 出菜口口令不能替代过敏、食安、桌况和责任人判断。",
      "5. 交接应记录假设、变更、异常、确认状态和公开内容更新时间。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "服务摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const legalTickets = Array.from(document.querySelectorAll(".kp141-legal-list details"));
  legalTickets.forEach((ticket) => ticket.addEventListener("toggle", () => {
    if (!ticket.open) return;
    legalTickets.forEach((peer) => { if (peer !== ticket) peer.open = false; });
  }));
  document.querySelector("[data-kp141-copy-policy]")?.addEventListener("click", async () => {
    const text = [
      "厨师出菜口责任边界摘要",
      "页面不读取或确认真实预订、桌位、人数与可用性。",
      "模板不核验菜单、供应、价格、过敏原、特殊饮食或食安合规。",
      "排程板不读取桌况、厨房能力、人员、设备或真实出菜时间。",
      "页面不处理订单、押金、退款、支付卡、发票或客人档案。",
      "所有业务信息、权限、隐私、发布与现场安全由对应责任人确认。"
    ].join("\n");
    announceCopy((await copyText(text)) ? "责任摘要已复制。" : "复制失败，请手动选择内容。");
  });

  const searchForm = document.querySelector("[data-kp141-search]");
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = searchForm.querySelector("#kp141-clue");
    const status = searchForm.querySelector("[data-kp141-search-status]");
    const clue = input.value.trim();
    const length = Array.from(clue).length;
    if (!length) { setText(status, "请输入节奏、排程或责任边界线索。"); return; }
    if (length > 80) { setText(status, "线索最多 80 个字符，请缩短后再寻找。"); return; }
    const routes = [
      { terms: ["备料", "起点", "节奏", "口令", "交接", "服务"], page: "article.html", label: "服务札记" },
      { terms: ["时间", "桌号", "道数", "最晚", "排程", "收尾"], page: "tool.html", label: "服务排程板" },
      { terms: ["预订", "菜单", "过敏", "食安", "支付", "隐私", "边界"], page: "legal.html", label: "责任单" }
    ];
    const route = routes.find((item) => item.terms.some((term) => clue.includes(term))) || { page: "index.html", label: "出菜口首页" };
    setText(status, `已匹配“${route.label}”，正在挂单。`);
    window.setTimeout(() => window.location.assign(route.page), 350);
  });

  const scheduleForm = document.querySelector("[data-kp141-schedule-form]");
  if (!scheduleForm) return;
  const input = scheduleForm.querySelector("#kp141-rows");
  const errorNode = scheduleForm.querySelector("[data-kp141-error]");
  const formStatus = scheduleForm.querySelector("[data-kp141-form-status]");
  const report = document.querySelector(".kp141-schedule-report");
  const q = (selector) => report.querySelector(selector);
  const stateNode = q("[data-kp141-report-state]");
  const tightestNode = q("[data-kp141-tightest]");
  const tightestLabelNode = q("[data-kp141-tightest-label]");
  const handNode = q("[data-kp141-clock-hand]");
  const ticketCountNode = q("[data-kp141-ticket-count]");
  const courseTotalNode = q("[data-kp141-course-total]");
  const deadlineCountNode = q("[data-kp141-deadline-count]");
  const statusCountNode = q("[data-kp141-status-count]");
  const findingSummary = q("[data-kp141-finding-summary]");
  const findingList = q("[data-kp141-finding-list]");
  const ticketSummary = q("[data-kp141-ticket-summary]");
  const ticketList = q("[data-kp141-ticket-list]");
  const copyButton = q("[data-kp141-copy-report]");
  const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  const coursePattern = /^(?:[2-9]|1[0-2])$/;
  const intervalPattern = /^(?:[5-9]|[1-8]\d|90)$/;
  const validStatuses = new Set(["草案", "确认", "出单"]);
  const presets = {
    clear: "桌 A | 18:00 | 7 | 12 | 19:45 | 出单\n桌 B | 18:20 | 6 | 15 | 20:10 | 出单",
    near: "桌 C | 18:00 | 6 | 15 | 19:30 | 出单\n桌 D | 18:15 | 5 | 12 | 19:40 | 出单",
    multi: "桌 E | 18:00 | 8 | 15 | 19:30 | 出单\n桌 F | 18:10 | 6 | 12 | 19:25 | 出单",
    review: "桌 G | 18:00 | 8 | 15 | 19:30 | 草案\n桌 H | 18:15 | 5 | 12 | 19:40 | 确认"
  };
  let currentReport = "";

  const normalizeName = (name) => name.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("zh-CN");
  const parseTime = (text) => {
    const [hours, minutes] = text.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const formatMoment = (minutes) => {
    const day = Math.floor(minutes / 1440);
    const clock = minutes % 1440;
    const hours = String(Math.floor(clock / 60)).padStart(2, "0");
    const rest = String(clock % 60).padStart(2, "0");
    return `${day ? `D+${day} ` : ""}${hours}:${rest}`;
  };
  const formatMargin = (margin) => `${margin < 0 ? "−" : "+"}${Math.abs(margin)} MIN`;

  const resetReport = (message = "等待至少两张服务单据。") => {
    currentReport = "";
    report.dataset.ready = "false";
    setText(stateNode, "UNSET");
    setText(tightestNode, "—");
    setText(tightestLabelNode, "等待计算");
    handNode.style.transform = "rotate(0deg)";
    setText(ticketCountNode, "0");
    setText(courseTotalNode, "0");
    setText(deadlineCountNode, "0");
    setText(statusCountNode, "0");
    setText(findingSummary, "等待计算");
    findingList.replaceChildren(Object.assign(document.createElement("li"), { textContent: "报告生成后显示接近/超过用户最晚时间和单据状态提示。" }));
    setText(ticketSummary, "等待计算");
    ticketList.replaceChildren(Object.assign(document.createElement("p"), { textContent: "等待服务单据。" }));
    copyButton.disabled = true;
    setText(formStatus, message);
    announceCopy("");
  };
  const fail = (message) => { setText(errorNode, message); resetReport("输入未通过校核，排程未生成。"); };

  const parseRows = (raw) => {
    if (Array.from(raw).length > 6000) throw new Error("全部输入最多 6000 个字符。");
    const lines = raw.split(/\r?\n/u).map((line) => line.trim()).filter(Boolean);
    if (lines.length < 2) throw new Error("请至少输入 2 张服务单据。");
    if (lines.length > 100) throw new Error("一次最多计算 100 张服务单据。");
    const exact = new Set();
    const normalized = new Set();
    return lines.map((line, index) => {
      const fields = line.split("|").map((field) => field.trim());
      const row = index + 1;
      if (fields.length !== 6) throw new Error(`第 ${row} 行须包含 6 项，并以 | 分隔。`);
      const [name, startText, coursesText, intervalText, deadlineText, status] = fields;
      const nameLength = Array.from(name).length;
      if (nameLength < 2 || nameLength > 24) throw new Error(`第 ${row} 行桌号须为 2–24 个字符。`);
      if (/\p{Cc}|\p{Cf}/u.test(name)) throw new Error(`第 ${row} 行桌号含不可见控制字符。`);
      if (exact.has(name)) throw new Error(`第 ${row} 行桌号与前文完全重复：${name}。`);
      exact.add(name);
      const key = normalizeName(name);
      if (normalized.has(key)) throw new Error(`第 ${row} 行桌号规范化后重复：${name}。`);
      normalized.add(key);
      if (!timePattern.test(startText)) throw new Error(`第 ${row} 行入座时间须为 00:00–23:59 的两位 24 小时格式。`);
      if (!coursePattern.test(coursesText)) throw new Error(`第 ${row} 行道数须为 2–12 的普通十进制整数。`);
      if (!intervalPattern.test(intervalText)) throw new Error(`第 ${row} 行间隔须为 5–90 分钟的普通十进制整数。`);
      if (!timePattern.test(deadlineText)) throw new Error(`第 ${row} 行最晚时间须为 00:00–23:59 的两位 24 小时格式。`);
      if (!validStatuses.has(status)) throw new Error(`第 ${row} 行状态只能是“草案”“确认”或“出单”。`);
      const start = parseTime(startText);
      const courses = Number(coursesText);
      const interval = Number(intervalText);
      const deadlineClock = parseTime(deadlineText);
      const deadline = deadlineClock < start ? deadlineClock + 1440 : deadlineClock;
      const finish = start + (courses - 1) * interval;
      const margin = deadline - finish;
      const late = margin < 0;
      const near = !late && margin <= 15;
      return { name, startText, start, courses, interval, deadlineText, deadline, finish, margin, status, late, near };
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

  const render = (tickets) => {
    const deadlineFlags = tickets.filter((ticket) => ticket.late || ticket.near);
    const statusFlags = tickets.filter((ticket) => ticket.status !== "出单");
    const findings = [
      ...deadlineFlags.map((ticket) => ticket.late
        ? `${ticket.name}：计划收尾 ${formatMoment(ticket.finish)}，晚于用户输入最晚时间 ${formatMoment(ticket.deadline)} ${Math.abs(ticket.margin)} 分钟。`
        : `${ticket.name}：计划收尾距离用户输入最晚时间仅 ${ticket.margin} 分钟，请复核时间假设。`),
      ...statusFlags.map((ticket) => `${ticket.name}：当前状态为“${ticket.status}”，尚未记录为出单。`)
    ];
    let state = "PACE CLEAR";
    if (deadlineFlags.length && statusFlags.length) state = `REVIEW ${findings.length}`;
    else if (deadlineFlags.length) state = `DEADLINE FLAGS ${deadlineFlags.length}`;
    else if (statusFlags.length) state = `STATUS FLAGS ${statusFlags.length}`;
    const tightest = tickets.reduce((best, ticket) => !best || ticket.margin < best.margin ? ticket : best, null);
    const totalCourses = tickets.reduce((sum, ticket) => sum + ticket.courses, 0);
    const angle = Math.max(-70, Math.min(70, tightest.margin)) * 1.2;

    report.dataset.ready = "true";
    setText(stateNode, state);
    setText(tightestNode, formatMargin(tightest.margin));
    setText(tightestLabelNode, `${tightest.name} · ${formatMoment(tightest.finish)} / 最晚 ${formatMoment(tightest.deadline)}`);
    handNode.style.transform = `rotate(${angle.toFixed(1)}deg)`;
    setText(ticketCountNode, String(tickets.length));
    setText(courseTotalNode, String(totalCourses));
    setText(deadlineCountNode, String(deadlineFlags.length));
    setText(statusCountNode, String(statusFlags.length));
    setText(findingSummary, findings.length ? `${findings.length} 项交接提示` : "没有时限或未出单状态提示");
    addLimited(findingList, findings.length ? findings : ["全部计划收尾距离用户最晚时间超过 15 分钟，且状态均为出单。"], (finding) => Object.assign(document.createElement("li"), { textContent: finding }));
    setText(ticketSummary, `${tickets.length} 张单据 · ${totalCourses} 道计划课程`);
    addLimited(ticketList, tickets, (ticket) => {
      const card = document.createElement("article");
      card.className = "kp141-ticket-card";
      const title = document.createElement("b");
      const detail = document.createElement("span");
      const margin = document.createElement("strong");
      title.textContent = `${ticket.name} · ${ticket.status}`;
      detail.textContent = `${ticket.startText} 开始 · ${ticket.courses} 道 × ${ticket.interval} min · 收尾 ${formatMoment(ticket.finish)} · 最晚 ${formatMoment(ticket.deadline)}`;
      margin.textContent = formatMargin(ticket.margin);
      card.append(title, detail, margin);
      return card;
    });

    currentReport = [
      "服务排程交接",
      `状态：${state}`,
      `最紧余量：${tightest.name} / ${formatMargin(tightest.margin)}`,
      `单据：${tickets.length}`,
      `计划总道数：${totalCourses}`,
      `时限提示：${deadlineFlags.length}`,
      `状态提示：${statusFlags.length}`,
      "",
      "逐桌排程：",
      ...tickets.map((ticket, index) => `${index + 1}. ${ticket.name} | 入座 ${ticket.startText} | ${ticket.courses} 道 | 间隔 ${ticket.interval} min | 收尾 ${formatMoment(ticket.finish)} | 最晚 ${formatMoment(ticket.deadline)} | ${formatMargin(ticket.margin)} | ${ticket.status}`),
      "",
      "交接提示：",
      ...(findings.length ? findings.map((finding, index) => `${index + 1}. ${finding}`) : ["无。全部计划收尾距离用户最晚时间超过 15 分钟，且状态均为出单。"]),
      "",
      "边界：本报告只执行用户输入的入座时间、道数、间隔、最晚时间和状态计算；不读取预订、桌况、菜单、过敏、食安、库存、厨房能力、人员、支付、隐私或现场安全。"
    ].join("\n");
    copyButton.disabled = false;
    setText(formStatus, `已计算 ${tickets.length} 张单据；15 分钟只是一条固定界面复核线。`);
  };

  scheduleForm.querySelectorAll("[data-kp141-preset]").forEach((button) => button.addEventListener("click", () => {
    input.value = presets[button.dataset.kp141Preset];
    setText(errorNode, "");
    resetReport("示例已挂单，请生成服务排程。");
    input.focus();
  }));
  input.addEventListener("input", () => {
    setText(errorNode, "");
    if (report.dataset.ready === "true") resetReport("输入已改变，请重新生成排程。");
  });
  scheduleForm.addEventListener("reset", () => window.setTimeout(() => {
    setText(errorNode, "");
    resetReport("排程已撤下，输入已恢复初始示例。");
  }, 0));
  scheduleForm.addEventListener("submit", (event) => {
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
