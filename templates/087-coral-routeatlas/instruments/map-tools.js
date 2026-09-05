(() => {
  "use strict";
  const form = document.querySelector("[data-ca87-tool-form]");
  if (!form) return;
  const kind = document.querySelector("[data-ca87-tool]")?.dataset.ca87Tool;
  const input = form.querySelector("textarea");
  const error = form.querySelector("[data-ca87-error]");
  const submit = form.querySelector('button[type="submit"]');
  const report = document.querySelector("[data-ca87-report]");
  const output = report.querySelector("[data-ca87-output]");
  const count = report.querySelector("[data-ca87-count]");
  const copyButton = report.querySelector("[data-ca87-result-copy]");
  const copyStatus = report.querySelector("[data-ca87-copy-status]");
  let last = "";
  let revision = 0;
  const points = (value) => Array.from(value).length;
  const invalidUnicode = (value) => /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]/u.test(value);
  const control = (value) => /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u.test(value);
  const name = (value, row, label = "名称") => {
    if (!value || points(value) > 80) throw new Error(`第 ${row} 行${label}须为 1–80 个字符。`);
    return value;
  };
  const unsigned = (value, row, label, allowZero = false) => {
    const re = allowZero ? /^(?:0|[1-9]\d*)$/u : /^[1-9]\d*$/u;
    if (!re.test(value)) throw new Error(`第 ${row} 行${label}须为${allowZero ? "非负" : "正"}普通整数。`);
    const number = BigInt(value);
    if (number > 1000000000000n) throw new Error(`第 ${row} 行${label}不能超过 1,000,000,000,000。`);
    return number;
  };
  const signed = (value, row, label) => {
    if (!/^(?:0|-?[1-9]\d*)$/u.test(value)) throw new Error(`第 ${row} 行${label}须为普通整数。`);
    const number = BigInt(value);
    if (number < -1000000000000n || number > 1000000000000n) throw new Error(`第 ${row} 行${label}须在 ±1,000,000,000,000 内。`);
    return number;
  };
  const rows = (fields) => {
    const raw = input.value;
    if (!raw.trim()) throw new Error("请输入至少一条非空记录。");
    if (points(raw) > 40000) throw new Error("输入不能超过 40,000 个 Unicode 字符。");
    if (invalidUnicode(raw)) throw new Error("输入包含不完整的 Unicode 字符。");
    if (control(raw)) throw new Error("输入包含不允许的控制字符。");
    const lines = raw.normalize("NFKC").split(/\r?\n/u).map((line) => line.trim()).filter(Boolean);
    if (lines.length < 1 || lines.length > 300) throw new Error("记录须为 1–300 个非空行。");
    return lines.map((line, index) => {
      const parts = line.split("|").map((part) => part.trim());
      if (parts.length !== fields) throw new Error(`第 ${index + 1} 行须包含 ${fields} 个字段。`);
      return parts;
    });
  };
  const parsers = {
    waypoint() {
      const seen = new Set();
      let firstOpen = "无";
      const items = rows(3).map((parts, index) => {
        const order = unsigned(parts[0], index + 1, "序号");
        if (order !== BigInt(index + 1)) throw new Error(`第 ${index + 1} 行序号须为 ${index + 1}。`);
        const label = name(parts[1], index + 1, "航标名");
        const key = label.toLocaleLowerCase();
        if (seen.has(key)) throw new Error(`第 ${index + 1} 行航标名重复。`);
        seen.add(key);
        const status = parts[2].toLocaleUpperCase();
        if (!/^(?:VERIFIED|OPEN)$/u.test(status)) throw new Error(`第 ${index + 1} 行状态须为 VERIFIED 或 OPEN。`);
        if (status === "OPEN" && firstOpen === "无") firstOpen = `${index + 1}. ${label}`;
        return { order, label, status };
      });
      const verified = items.filter((item) => item.status === "VERIFIED").length;
      return ["航标顺序核验报告", "", `航标总数：${items.length}`, `已核验：${verified}`, `待核验：${items.length - verified}`, `首个待核验：${firstOpen}`, "", ...items.map((item) => `${item.order}. ${item.label}｜${item.status === "VERIFIED" ? "已核验" : "待核验"}`)].join("\n");
    },
    segment() {
      const seen = new Set();
      let previous = null;
      let total = 0n;
      const items = rows(3).map((parts, index) => {
        const from = name(parts[0], index + 1, "起点");
        const to = name(parts[1], index + 1, "终点");
        const fromKey = from.toLocaleLowerCase(), toKey = to.toLocaleLowerCase();
        if (fromKey === toKey) throw new Error(`第 ${index + 1} 行起点与终点不能相同。`);
        if (previous && previous !== fromKey) throw new Error(`第 ${index + 1} 行起点没有接上上一段终点。`);
        const key = `${fromKey}\u0000${toKey}`;
        if (seen.has(key)) throw new Error(`第 ${index + 1} 行航段重复。`);
        seen.add(key);
        const distance = unsigned(parts[2], index + 1, "距离");
        total += distance;
        previous = toKey;
        return { from, to, distance, cumulative: total };
      });
      return ["连续航段里程报告", "", `航段总数：${items.length}`, `累计距离：${total}`, `起点：${items[0].from}`, `终点：${items.at(-1).to}`, "", ...items.map((item, i) => `${i + 1}. ${item.from} → ${item.to}｜本段 ${item.distance}｜累计 ${item.cumulative}`)].join("\n");
    },
    schedule() {
      const seen = new Set();
      let previousDeparture = null, firstArrival = null, dwell = 0, gaps = 0;
      const toMinute = (value, row, label) => {
        if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/u.test(value)) throw new Error(`第 ${row} 行${label}须为 00:00–23:59 的 HH:MM。`);
        const [h, m] = value.split(":").map(Number);
        return h * 60 + m;
      };
      const items = rows(3).map((parts, index) => {
        const label = name(parts[0], index + 1, "停靠点");
        const key = label.toLocaleLowerCase();
        if (seen.has(key)) throw new Error(`第 ${index + 1} 行停靠点重复。`);
        seen.add(key);
        const arrival = toMinute(parts[1], index + 1, "到达时间"), departure = toMinute(parts[2], index + 1, "离开时间");
        if (departure <= arrival) throw new Error(`第 ${index + 1} 行离开时间须晚于到达时间。`);
        if (firstArrival === null) firstArrival = arrival;
        if (previousDeparture !== null && arrival < previousDeparture) throw new Error(`第 ${index + 1} 行与上一停靠窗口重叠。`);
        const gap = previousDeparture === null ? 0 : arrival - previousDeparture;
        const stay = departure - arrival;
        dwell += stay; gaps += gap; previousDeparture = departure;
        return { label, arrival: parts[1], departure: parts[2], stay, gap };
      });
      const span = previousDeparture - firstArrival;
      return ["停靠窗口缝隙报告", "", `停靠总数：${items.length}`, `停留合计：${dwell} 分钟`, `缝隙合计：${gaps} 分钟`, `首尾跨度：${span} 分钟`, "", ...items.map((item, i) => `${i + 1}. ${item.label}｜${item.arrival}–${item.departure}｜停留 ${item.stay}｜前置缝隙 ${item.gap}`)].join("\n");
    },
    grid() {
      const seen = new Set();
      let total = 0n, previous = null;
      let minX, maxX, minY, maxY;
      const items = rows(3).map((parts, index) => {
        const label = name(parts[0], index + 1, "航标名"), key = label.toLocaleLowerCase();
        if (seen.has(key)) throw new Error(`第 ${index + 1} 行航标名重复。`);
        seen.add(key);
        const x = signed(parts[1], index + 1, "X"), y = signed(parts[2], index + 1, "Y");
        const leg = previous ? (x > previous.x ? x - previous.x : previous.x - x) + (y > previous.y ? y - previous.y : previous.y - y) : 0n;
        total += leg;
        minX = minX === undefined || x < minX ? x : minX; maxX = maxX === undefined || x > maxX ? x : maxX;
        minY = minY === undefined || y < minY ? y : minY; maxY = maxY === undefined || y > maxY ? y : maxY;
        previous = { x, y };
        return { label, x, y, leg, cumulative: total };
      });
      const first = items[0], lastItem = items.at(-1);
      const displacement = (lastItem.x > first.x ? lastItem.x - first.x : first.x - lastItem.x) + (lastItem.y > first.y ? lastItem.y - first.y : first.y - lastItem.y);
      return ["方格路径轨迹报告", "", `航标总数：${items.length}`, `曼哈顿全程：${total}`, `最终位移：${displacement}`, `边界：X ${minX}…${maxX}｜Y ${minY}…${maxY}`, "", ...items.map((item, i) => `${i + 1}. ${item.label}｜(${item.x},${item.y})｜本段 ${item.leg}｜累计 ${item.cumulative}`)].join("\n");
    },
    capacity() {
      const seen = new Set();
      let capacityTotal = 0n, demandTotal = 0n;
      const percent = (demand, capacity) => { const scaled = (demand * 100000n + capacity / 2n) / capacity; return `${scaled / 1000n}.${String(scaled % 1000n).padStart(3, "0")}%`; };
      const items = rows(3).map((parts, index) => {
        const label = name(parts[0], index + 1, "补给站");
        const key = label.toLocaleLowerCase();
        if (seen.has(key)) throw new Error(`第 ${index + 1} 行补给站重复。`);
        seen.add(key);
        const capacity = unsigned(parts[1], index + 1, "容量"), demand = unsigned(parts[2], index + 1, "需求", true);
        capacityTotal += capacity; demandTotal += demand;
        return { label, capacity, demand, balance: capacity - demand, utilization: percent(demand, capacity) };
      });
      const balance = capacityTotal - demandTotal;
      return ["补给站容量盘点报告", "", `补给站总数：${items.length}`, `总容量：${capacityTotal}`, `总需求：${demandTotal}`, `总差额：${balance}`, `总体状态：${balance < 0n ? "超载" : "有余量"}`, "", ...items.map((item, i) => `${i + 1}. ${item.label}｜容量 ${item.capacity}｜需求 ${item.demand}｜差额 ${item.balance}｜使用率 ${item.utilization}｜${item.balance < 0n ? "超载" : "有余量"}`)].join("\n");
    }
  };
  const presets = {
    waypoint: { standard: "1 | 起点 | VERIFIED\n2 | 勘测点 | OPEN\n3 | 复盘点 | OPEN", edge: "1 | 唯一航标 | VERIFIED", fullwidth: "１ ｜ 起点 ｜ ＶＥＲＩＦＩＥＤ\n２ ｜ 终点 ｜ ＯＰＥＮ" },
    segment: { standard: "起点 | 中继 | 120\n中继 | 终点 | 85", edge: "甲 | 乙 | 1", fullwidth: "甲 ｜ 乙 ｜ １２０\n乙 ｜ 丙 ｜ ８５" },
    schedule: { standard: "起点 | 09:00 | 09:45\n采样 | 10:00 | 11:10\n复盘 | 11:30 | 12:00", edge: "唯一站 | 00:00 | 00:01", fullwidth: "起点 ｜ ０９：００ ｜ ０９：４５\n终点 ｜ １０：００ ｜ １０：３０" },
    grid: { standard: "起点 | 0 | 0\n东站 | 3 | 4\n北站 | -2 | 7", edge: "原点 | 0 | 0", fullwidth: "起点 ｜ ０ ｜ ０\n终点 ｜ ３ ｜ ４" },
    capacity: { standard: "北站 | 100 | 80\n南站 | 60 | 75\n中继 | 40 | 20", edge: "唯一站 | 1 | 0", fullwidth: "北站 ｜ １００ ｜ ８０\n南站 ｜ ６０ ｜ ７５" }
  };
  const stale = () => {
    revision += 1;
    error.textContent = "";
    report.hidden = true;
    output.textContent = "";
    count.textContent = "0 ROWS";
    copyButton.disabled = true;
    copyStatus.textContent = "";
    last = "";
  };
  const fail = (message) => {
    stale();
    error.textContent = message;
    input.setAttribute("aria-invalid", "true");
    input.focus();
  };
  const render = (value) => {
    error.textContent = "";
    input.removeAttribute("aria-invalid");
    last = value;
    output.textContent = value;
    count.textContent = `${input.value.normalize("NFKC").split(/\r?\n/u).map((line) => line.trim()).filter(Boolean).length} ROWS`;
    report.hidden = false;
    copyButton.disabled = false;
    copyStatus.textContent = "";
    output.focus();
  };
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try { render(parsers[kind]()); } catch (caught) { fail(caught.message); }
  });
  input.addEventListener("input", stale);
  form.addEventListener("reset", () => setTimeout(() => { stale(); input.removeAttribute("aria-invalid"); input.focus(); }, 0));
  form.querySelectorAll("[data-ca87-preset]").forEach((button) => button.addEventListener("click", () => {
    input.value = presets[kind][button.dataset.ca87Preset];
    stale();
    input.focus();
  }));
  const copyResult = async () => {
    const ownRevision = revision;
    try {
      await navigator.clipboard.writeText(last);
      if (ownRevision === revision && last) copyStatus.textContent = "完整报告已复制。";
    } catch (_error) {
      if (ownRevision === revision && last) copyStatus.textContent = "复制未完成，请手动选择报告。";
    }
  };
  copyButton.addEventListener("click", copyResult);
  submit.disabled = false;
})();
