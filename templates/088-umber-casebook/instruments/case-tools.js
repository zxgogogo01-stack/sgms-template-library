(() => {
  "use strict";
  const form = document.querySelector("[data-uc88-tool-form]");
  if (!form) return;
  const kind = document.querySelector("[data-uc88-tool]")?.dataset.uc88Tool;
  const input = form.querySelector("textarea");
  const submit = form.querySelector('button[type="submit"]');
  const error = form.querySelector("[data-uc88-tool-error]");
  const status = form.querySelector("[data-uc88-tool-status]");
  const report = document.querySelector("[data-uc88-tool-report]");
  const output = report.querySelector("[data-uc88-tool-output]");
  const count = report.querySelector("[data-uc88-tool-count]");
  const copyButton = report.querySelector("[data-uc88-tool-copy]");
  const copyStatus = report.querySelector("[data-uc88-tool-copy-status]");
  let last = "";
  let revision = 0;
  const points = (value) => Array.from(value).length;
  const malformed = (value) => /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]/u.test(value);
  const controls = (value) => /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u.test(value);
  const cell = (value, row, label, max = 80) => {
    if (!value || points(value) > max) throw new Error(`第 ${row} 行${label}须为 1–${max} 个字符。`);
    return value;
  };
  const rows = (fields) => {
    const raw = input.value;
    if (!raw.trim()) throw new Error("请输入至少一条非空记录。");
    if (points(raw) > 40000) throw new Error("输入不能超过 40,000 个 Unicode 字符。");
    if (malformed(raw)) throw new Error("输入包含不完整的 Unicode 字符。");
    if (controls(raw)) throw new Error("输入包含不允许的控制字符。");
    const lines = raw.normalize("NFKC").split(/\r?\n/u).map((line) => line.trim()).filter(Boolean);
    if (lines.length < 1 || lines.length > 300) throw new Error("记录须为 1–300 个非空行。");
    return lines.map((line, index) => {
      const parts = line.split("|").map((part) => part.trim());
      if (parts.length !== fields) throw new Error(`第 ${index + 1} 行须包含 ${fields} 个字段。`);
      return parts;
    });
  };
  const parsers = {
    claims() {
      const seen = new Set();
      const allowed = new Set(["CONFIRMED", "OPEN", "CONTESTED"]);
      const items = rows(3).map((parts, index) => {
        const claim = cell(parts[0], index + 1, "断言", 120);
        const key = claim.toLocaleLowerCase();
        if (seen.has(key)) throw new Error(`第 ${index + 1} 行断言重复。`);
        seen.add(key);
        const state = parts[1].toLocaleUpperCase();
        if (!allowed.has(state)) throw new Error(`第 ${index + 1} 行状态须为 CONFIRMED、OPEN 或 CONTESTED。`);
        const source = cell(parts[2], index + 1, "来源", 200);
        return { claim, state, source, missing: source === "-" };
      });
      const confirmed = items.filter((item) => item.state === "CONFIRMED").length;
      const open = items.filter((item) => item.state === "OPEN").length;
      const contested = items.filter((item) => item.state === "CONTESTED").length;
      const missing = items.filter((item) => item.missing).length;
      const coverage = ((items.length - missing) * 100 / items.length).toFixed(1);
      return ["断言状态盘点", "", `断言总数：${items.length}`, `已确认：${confirmed}`, `待核：${open}`, `有争议：${contested}`, `来源覆盖：${coverage}%`, `来源缺口：${missing}`, "", ...items.map((item, index) => `${index + 1}. ${item.claim}｜${item.state}｜${item.source}`), "", "提示：本工具只检查记录结构，不验证事实或来源质量。"].join("\n");
    },
    sources() {
      const pairs = new Set(), claims = new Map(), sources = new Set();
      const items = rows(3).map((parts, index) => {
        const claim = cell(parts[0], index + 1, "断言"), source = cell(parts[1], index + 1, "来源", 120);
        if (source === "-") throw new Error(`第 ${index + 1} 行来源不能为“-”。`);
        const role = parts[2].toLocaleUpperCase();
        if (!/^(?:DIRECT|CORROBORATING)$/u.test(role)) throw new Error(`第 ${index + 1} 行角色须为 DIRECT 或 CORROBORATING。`);
        const claimKey = claim.toLocaleLowerCase(), sourceKey = source.toLocaleLowerCase(), pair = `${claimKey}\u0000${sourceKey}`;
        if (pairs.has(pair)) throw new Error(`第 ${index + 1} 行断言与来源组合重复。`);
        pairs.add(pair); sources.add(sourceKey);
        if (!claims.has(claimKey)) claims.set(claimKey, { label: claim, direct: 0, supporting: 0 });
        const entry = claims.get(claimKey); role === "DIRECT" ? entry.direct += 1 : entry.supporting += 1;
        return { claim, source, role };
      });
      const direct = Array.from(claims.values()).filter((entry) => entry.direct > 0).length;
      const gaps = Array.from(claims.values()).filter((entry) => entry.direct === 0);
      return ["来源覆盖矩阵", "", `关系总数：${items.length}`, `独立断言：${claims.size}`, `不同来源：${sources.size}`, `含直接来源：${direct}`, `直接来源缺口：${gaps.length}`, "", ...Array.from(claims.values()).map((entry, index) => `${index + 1}. ${entry.label}｜直接 ${entry.direct}｜佐证 ${entry.supporting}｜${entry.direct ? "已覆盖" : "待补直接来源"}`)].join("\n");
    },
    timeline() {
      const seen = new Set(); let previousEnd = null, firstStart = null, dwell = 0, gaps = 0;
      const moment = (value, row, label) => {
        const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/u);
        if (!match) throw new Error(`第 ${row} 行${label}须为 YYYY-MM-DDTHH:MM。`);
        const parts = match.slice(1).map(Number);
        if (parts[0] < 2000 || parts[0] > 2100 || parts[3] > 23 || parts[4] > 59) throw new Error(`第 ${row} 行${label}超出允许范围。`);
        const stamp = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4]);
        const date = new Date(stamp);
        if (date.getUTCFullYear() !== parts[0] || date.getUTCMonth() !== parts[1] - 1 || date.getUTCDate() !== parts[2] || date.getUTCHours() !== parts[3] || date.getUTCMinutes() !== parts[4]) throw new Error(`第 ${row} 行${label}不是有效日期时间。`);
        return stamp / 60000;
      };
      const items = rows(3).map((parts, index) => {
        const event = cell(parts[0], index + 1, "事件");
        const key = event.toLocaleLowerCase();
        if (seen.has(key)) throw new Error(`第 ${index + 1} 行事件重复。`);
        seen.add(key);
        const start = moment(parts[1], index + 1, "开始时间"), end = moment(parts[2], index + 1, "结束时间");
        if (end <= start) throw new Error(`第 ${index + 1} 行结束时间须晚于开始时间。`);
        if (previousEnd !== null && start < previousEnd) throw new Error(`第 ${index + 1} 行与上一事件重叠或顺序错误。`);
        if (firstStart === null) firstStart = start;
        const gap = previousEnd === null ? 0 : start - previousEnd, duration = end - start;
        gaps += gap; dwell += duration; previousEnd = end;
        return { event, start: parts[1], end: parts[2], gap, duration };
      });
      return ["时间线缝隙报告", "", `事件总数：${items.length}`, `事件时长：${dwell} 分钟`, `空档合计：${gaps} 分钟`, `首尾跨度：${previousEnd - firstStart} 分钟`, "", ...items.map((item, index) => `${index + 1}. ${item.event}｜${item.start}–${item.end}｜时长 ${item.duration}｜前置空档 ${item.gap}`)].join("\n");
    },
    custody() {
      const grouped = new Map(), pairKeys = new Set();
      const items = rows(4).map((parts, index) => {
        const item = cell(parts[0], index + 1, "物件"), custodian = cell(parts[2], index + 1, "保管人");
        if (!/^[1-9]\d*$/u.test(parts[1])) throw new Error(`第 ${index + 1} 行序号须为正普通整数。`);
        const sequence = BigInt(parts[1]);
        if (sequence > 1000000n) throw new Error(`第 ${index + 1} 行序号不能超过 1,000,000。`);
        const state = parts[3].toLocaleUpperCase();
        if (!/^(?:RECEIVED|TRANSFERRED|SEALED)$/u.test(state)) throw new Error(`第 ${index + 1} 行状态须为 RECEIVED、TRANSFERRED 或 SEALED。`);
        const key = item.toLocaleLowerCase(), pair = `${key}\u0000${sequence}`;
        if (pairKeys.has(pair)) throw new Error(`第 ${index + 1} 行物件序号重复。`);
        pairKeys.add(pair);
        if (!grouped.has(key)) grouped.set(key, []);
        const chain = grouped.get(key), expected = BigInt(chain.length + 1);
        if (sequence !== expected) throw new Error(`第 ${index + 1} 行${item}的序号须为 ${expected}。`);
        if (!chain.length && state !== "RECEIVED") throw new Error(`第 ${index + 1} 行${item}的首条状态须为 RECEIVED。`);
        if (chain.at(-1)?.state === "SEALED") throw new Error(`第 ${index + 1} 行${item}已封存，不能追加记录。`);
        const entry = { item, sequence, custodian, state }; chain.push(entry); return entry;
      });
      const chains = Array.from(grouped.values()), sealed = chains.filter((chain) => chain.at(-1).state === "SEALED").length;
      return ["保管链核验", "", `记录总数：${items.length}`, `物件总数：${chains.length}`, `已封存：${sealed}`, `流转中：${chains.length - sealed}`, "", ...items.map((entry) => `${entry.item} #${entry.sequence}｜${entry.custodian}｜${entry.state}`)].join("\n");
    },
    closure() {
      const seen = new Set();
      const items = rows(3).map((parts, index) => {
        const gate = cell(parts[0], index + 1, "门槛");
        const key = gate.toLocaleLowerCase();
        if (seen.has(key)) throw new Error(`第 ${index + 1} 行门槛重复。`);
        seen.add(key);
        const priority = parts[1].toLocaleUpperCase(), state = parts[2].toLocaleUpperCase();
        if (!/^(?:REQUIRED|OPTIONAL)$/u.test(priority)) throw new Error(`第 ${index + 1} 行级别须为 REQUIRED 或 OPTIONAL。`);
        if (!/^(?:PASS|OPEN|WAIVED)$/u.test(state)) throw new Error(`第 ${index + 1} 行状态须为 PASS、OPEN 或 WAIVED。`);
        if (priority === "REQUIRED" && state === "WAIVED") throw new Error(`第 ${index + 1} 行必选门槛不能标记为 WAIVED。`);
        return { gate, priority, state };
      });
      const blockers = items.filter((item) => item.priority === "REQUIRED" && item.state === "OPEN");
      const passed = items.filter((item) => item.state === "PASS").length, waived = items.filter((item) => item.state === "WAIVED").length;
      return ["结案门核验", "", `门槛总数：${items.length}`, `已通过：${passed}`, `可选豁免：${waived}`, `必选阻塞：${blockers.length}`, `结案状态：${blockers.length ? "NOT READY" : "READY"}`, "", ...items.map((item, index) => `${index + 1}. ${item.gate}｜${item.priority}｜${item.state}`), ...(blockers.length ? ["", "待处理：", ...blockers.map((item) => `- ${item.gate}`)] : [])].join("\n");
    }
  };
  const stale = () => {
    revision += 1; last = ""; report.hidden = true; copyButton.disabled = true; copyStatus.textContent = ""; error.textContent = ""; status.textContent = "输入已更改，请重新核验。";
  };
  const reset = () => {
    revision += 1; last = ""; report.hidden = true; output.textContent = ""; count.textContent = "0 ROWS"; copyButton.disabled = true; copyStatus.textContent = ""; error.textContent = ""; status.textContent = "等待输入本地记录。";
  };
  const fail = (message) => {
    revision += 1; last = ""; report.hidden = true; output.textContent = ""; count.textContent = "0 ROWS"; copyButton.disabled = true; copyStatus.textContent = ""; error.textContent = message; status.textContent = "核验未完成。"; input.focus();
  };
  submit.disabled = false;
  input.addEventListener("input", stale);
  form.addEventListener("reset", () => setTimeout(reset, 0));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const parser = parsers[kind];
      if (!parser) throw new Error("未识别工具合同。");
      last = parser(); revision += 1; output.textContent = last;
      count.textContent = `${input.value.normalize("NFKC").split(/\r?\n/u).map((line) => line.trim()).filter(Boolean).length} ROWS`;
      report.hidden = false; copyButton.disabled = false; copyStatus.textContent = ""; error.textContent = ""; status.textContent = "核验完成。";
    } catch (caught) { fail(caught.message); }
  });
  copyButton.addEventListener("click", async () => {
    if (!last) return;
    const expectedRevision = revision;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(last);
      else {
        const field = document.createElement("textarea"); field.value = last; field.setAttribute("readonly", ""); field.style.position = "fixed"; field.style.opacity = "0"; document.body.append(field); field.select(); const okay = document.execCommand("copy"); field.remove(); if (!okay) throw new Error("copy");
      }
      if (expectedRevision === revision && last) copyStatus.textContent = "完整报告已复制。";
    } catch (_error) { if (expectedRevision === revision && last) copyStatus.textContent = "复制未完成，请手动选择报告。"; }
  });
})();
