(() => {
  "use strict";

  const main = document.querySelector("[data-cc84-tool]");
  const form = document.querySelector("[data-cc84-tool-form]");
  if (!main || !form) return;

  const kind = main.dataset.cc84Tool;
  const input = form.querySelector("#cc84-input");
  const submit = form.querySelector("button[type=submit]");
  const errorNode = form.querySelector("[data-cc84-error]");
  const report = document.querySelector("[data-cc84-report]");
  const countNode = report.querySelector("[data-cc84-count]");
  const output = report.querySelector("[data-cc84-output]");
  const copy = report.querySelector("[data-cc84-result-copy]");
  const copyStatus = report.querySelector("[data-cc84-copy-status]");
  let currentReport = "";
  let revision = 0;
  submit.disabled = false;

  const points = (value) => Array.from(value).length;
  const hasControl = (value) => /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value);
  const hasUnpaired = (value) => {
    for (let index = 0; index < value.length; index += 1) {
      const code = value.charCodeAt(index);
      if (code >= 0xd800 && code <= 0xdbff) {
        const next = value.charCodeAt(index + 1);
        if (!(next >= 0xdc00 && next <= 0xdfff)) return true;
        index += 1;
      } else if (code >= 0xdc00 && code <= 0xdfff) {
        return true;
      }
    }
    return false;
  };
  const invalidate = () => {
    revision += 1;
    currentReport = "";
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-errormessage");
    errorNode.textContent = "";
    copyStatus.textContent = "";
    copy.disabled = true;
    report.hidden = true;
    output.textContent = "";
    countNode.textContent = "0 ROWS";
  };
  const fail = (message) => {
    invalidate();
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-errormessage", errorNode.id);
    errorNode.textContent = message;
    input.focus();
  };
  const rows = (parts) => {
    const raw = input.value;
    if (raw.length > 40000 || points(raw) > 40000) throw new Error("总输入不能超过 40,000 个 Unicode 字符。");
    if (hasControl(raw)) throw new Error("输入包含不允许的控制字符；换行和制表符除外。");
    if (hasUnpaired(raw)) throw new Error("输入包含不完整的 Unicode 代理对。");
    const lines = raw.split(/\r?\n/u).filter((line) => line.trim());
    if (!lines.length) throw new Error("请至少输入 1 条记录。");
    if (lines.length > 300) throw new Error("非空记录不能超过 300 行。");
    return lines.map((line, index) => {
      const fields = line.normalize("NFKC").replaceAll("−", "-").split("|").map((part) => part.trim());
      if (fields.length !== parts) throw new Error("第 " + (index + 1) + " 行须且只能包含 " + (parts - 1) + " 个竖线分隔符。");
      if (fields.some((field) => !field)) throw new Error("第 " + (index + 1) + " 行存在空字段。");
      if (points(fields[0]) > 100) throw new Error("第 " + (index + 1) + " 行名称不能超过 100 个 Unicode 字符。");
      return { fields, line: index + 1 };
    });
  };
  const integer = (value, line, label, minimum, maximum) => {
    if (!/^(?:0|[1-9][0-9]*)$/u.test(value)) throw new Error("第 " + line + " 行" + label + "须为无前导零的十进制整数。");
    const number = Number(value);
    if (!Number.isSafeInteger(number) || number < minimum || number > maximum) throw new Error("第 " + line + " 行" + label + "须在 " + minimum + "–" + maximum + " 之间。");
    return number;
  };
  const list = (value, line, label, numeric) => {
    const entries = value.split(",").map((entry) => entry.trim());
    if (!entries.length || entries.some((entry) => !entry)) throw new Error("第 " + line + " 行" + label + "存在空项。");
    if (entries.length > 50) throw new Error("第 " + line + " 行" + label + "不能超过 50 项。");
    if (numeric) return entries.map((entry) => integer(entry, line, label, 1, 1000000));
    const normalized = entries.map((entry) => entry.normalize("NFKC").toLocaleLowerCase());
    if (normalized.some((entry) => points(entry) > 60)) throw new Error("第 " + line + " 行" + label + "单项不能超过 60 个 Unicode 字符。");
    if (new Set(normalized).size !== normalized.length) throw new Error("第 " + line + " 行" + label + "存在重复项。");
    return normalized;
  };

  const scanColumns = () => {
    const records = rows(5).map(({ fields, line }) => {
      const total = integer(fields[1], line, "容器宽度", 320, 1000000000);
      const columns = integer(fields[2], line, "栏数", 1, 24);
      const gutter = integer(fields[3], line, "沟槽", 0, 1000000);
      const margin = integer(fields[4], line, "单侧边距", 0, 100000000);
      const gutterTotal = (columns - 1) * gutter;
      const marginTotal = margin * 2;
      const usable = total - gutterTotal - marginTotal;
      if (usable <= 0) throw new Error("第 " + line + " 行沟槽与边距占满容器；可用宽度必须大于 0。");
      return { id: fields[0], total, columns, gutter, margin, gutterTotal, marginTotal, usable, width: usable / columns };
    });
    const out = ["柱廊栏宽完整报告", "方案：" + records.length, ""];
    records.forEach((record) => out.push(record.id + "｜可用 " + record.usable + " px｜" + record.columns + " 栏｜单栏 " + record.width.toFixed(3) + " px｜沟槽总宽 " + record.gutterTotal + " px｜边距总宽 " + record.marginTotal + " px"));
    out.push("", "边界：数值报告不读取 CSS、不判断真实断点，也不证明视觉质量。");
    return { count: records.length, text: out.join("\n") };
  };

  const scanWeights = () => {
    const records = rows(4).map(({ fields, line }) => {
      const total = integer(fields[1], line, "总宽", 1, 1000000000);
      const weights = list(fields[2], line, "权重", true);
      if (weights.length > 24) throw new Error("第 " + line + " 行权重不能超过 24 项。");
      const gap = integer(fields[3], line, "间隔", 0, 1000000);
      const available = total - gap * (weights.length - 1);
      if (available <= 0) throw new Error("第 " + line + " 行间隔占满总宽；可分配宽度必须大于 0。");
      const sum = weights.reduce((value, weight) => value + weight, 0);
      const widths = weights.map((weight) => Math.floor(available * weight / sum));
      let left = available - widths.reduce((value, width) => value + width, 0);
      const order = weights.map((weight, index) => ({ index, remainder: available * weight % sum })).sort((leftItem, rightItem) => rightItem.remainder - leftItem.remainder || leftItem.index - rightItem.index);
      for (let index = 0; index < left; index += 1) widths[order[index].index] += 1;
      return { id: fields[0], available, widths, sum };
    });
    const out = ["包厢权重完整报告", "方案：" + records.length, ""];
    records.forEach((record) => out.push(record.id + "｜可分配 " + record.available + " px｜权重总和 " + record.sum + "｜栏宽 " + record.widths.join(",") + "｜校验 " + record.widths.reduce((value, width) => value + width, 0) + " px"));
    out.push("", "边界：最大余数只完成整数像素分配，不替代内容最小宽度、字体或响应式验证。");
    return { count: records.length, text: out.join("\n") };
  };

  const scanCues = () => {
    const records = rows(2).map(({ fields, line }) => ({ id: fields[0], parent: fields[1], line, key: fields[0].normalize("NFKC").toLocaleLowerCase(), parentKey: fields[1].normalize("NFKC").toLocaleLowerCase() }));
    const byKey = new Map();
    records.forEach((record) => {
      if (byKey.has(record.key)) throw new Error("第 " + record.line + " 行场记名称重复。");
      byKey.set(record.key, record);
    });
    const issues = [];
    records.forEach((record) => {
      if (record.parentKey === record.key) issues.push(record.id + " 自指。");
      else if (record.parentKey !== "root" && !byKey.has(record.parentKey)) issues.push(record.id + " 缺少前置 " + record.parent + "。");
    });
    const indegree = new Map(records.map((record) => [record.key, 0]));
    const children = new Map(records.map((record) => [record.key, []]));
    records.forEach((record) => {
      if (record.parentKey !== "root" && record.parentKey !== record.key && byKey.has(record.parentKey)) {
        indegree.set(record.key, indegree.get(record.key) + 1);
        children.get(record.parentKey).push(record.key);
      }
    });
    const queue = records.filter((record) => indegree.get(record.key) === 0).map((record) => record.key);
    const order = [];
    while (queue.length) {
      const key = queue.shift();
      order.push(key);
      children.get(key).forEach((child) => {
        indegree.set(child, indegree.get(child) - 1);
        if (indegree.get(child) === 0) queue.push(child);
      });
    }
    if (order.length !== records.length) issues.push("检测到依赖环，环内场记不能形成完整顺序。");
    const labels = order.map((key) => byKey.get(key).id);
    const out = ["场记顺序完整报告", "场记：" + records.length, "问题：" + issues.length, "", "稳定顺序：" + (labels.join(" → ") || "无"), "", "问题"];
    out.push(...(issues.length ? issues : ["无依赖问题。"]));
    out.push("", "边界：只检查单前置关系；不推断内容语义、人工审批或真实发布依赖。");
    return { count: records.length, text: out.join("\n") };
  };

  const parseDate = (value, line, label) => {
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) throw new Error("第 " + line + " 行" + label + "须为 YYYY-MM-DD。");
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) throw new Error("第 " + line + " 行" + label + "不是有效公历日期。");
    return date;
  };
  const iso = (date) => date.toISOString().slice(0, 10);
  const scanCadence = () => {
    const dayMs = 86400000;
    const records = rows(4).map(({ fields, line }) => {
      const base = parseDate(fields[1], line, "基准日");
      const interval = integer(fields[2], line, "间隔天", 1, 3650);
      const observed = parseDate(fields[3], line, "观察日");
      const difference = Math.floor((observed - base) / dayMs);
      const steps = Math.max(0, Math.ceil(difference / interval));
      const due = new Date(base.getTime() + steps * interval * dayMs);
      const remaining = Math.round((due - observed) / dayMs);
      return { id: fields[0], due: iso(due), remaining, cycles: steps };
    });
    const out = ["复核节奏完整报告", "项目：" + records.length, ""];
    records.forEach((record) => out.push(record.id + "｜下一复核 " + record.due + "｜" + (record.remaining === 0 ? "今日到期" : record.remaining + " 天后") + "｜周期 " + record.cycles));
    out.push("", "边界：采用 UTC 公历整日与固定天数间隔，不处理时区时刻、工作日、节假日或外部事件。");
    return { count: records.length, text: out.join("\n") };
  };

  const scanCoverage = () => {
    const records = rows(3).map(({ fields, line }) => {
      const existing = list(fields[1], line, "已有标签", false);
      const required = list(fields[2], line, "必需标签", false);
      const existingSet = new Set(existing);
      const missing = required.filter((tag) => !existingSet.has(tag));
      return { id: fields[0], existing, required, missing };
    });
    const out = ["证据幕布完整报告", "项目：" + records.length, "完整：" + records.filter((record) => !record.missing.length).length, ""];
    records.forEach((record) => out.push(record.id + "｜已有 " + record.existing.length + "｜必需 " + record.required.length + "｜缺口 " + (record.missing.join(",") || "无")));
    out.push("", "边界：标签匹配使用 NFKC 与不区分大小写的精确文本，不判断来源质量、真实性或证据充分性。");
    return { count: records.length, text: out.join("\n") };
  };

  const scans = { columns: scanColumns, weights: scanWeights, cues: scanCues, cadence: scanCadence, coverage: scanCoverage };
  const presets = {
    columns: { standard: "桌面 | 1440 | 12 | 24 | 72\n移动 | 390 | 4 | 12 | 20", edge: "单栏 | 320 | 1 | 0 | 0\n宽屏 | 1000000000 | 24 | 1000000 | 100000000", fullwidth: "桌面 ｜ １４４０ ｜ １２ ｜ ２４ ｜ ７２" },
    weights: { standard: "头版 | 1200 | 2,5,3 | 24", edge: "单栏 | 1 | 1 | 0\n余数 | 10 | 1,1,1 | 0", fullwidth: "头版 ｜ １２００ ｜ ２，５，３ ｜ ２４" },
    cues: { standard: "开场 | ROOT\n证据 | 开场\n结论 | 证据", edge: "自指 | 自指\n缺失 | 不存在", fullwidth: "开场 ｜ ＲＯＯＴ\n证据 ｜ 开场" },
    cadence: { standard: "季度复核 | 2026-01-01 | 90 | 2026-04-15", edge: "闰日 | 2024-02-29 | 365 | 2025-02-28", fullwidth: "季度复核 ｜ ２０２６－０１－０１ ｜ ９０ ｜ ２０２６－０４－１５" },
    coverage: { standard: "陈述 A | source,date,scope | source,date,scope\n陈述 B | source | source,date", edge: "大小写 | SOURCE,DATE | source,date", fullwidth: "陈述 ｜ 来源，日期 ｜ 来源，日期" }
  };

  input.addEventListener("input", invalidate);
  form.addEventListener("reset", () => setTimeout(invalidate));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const result = scans[kind]();
      invalidate();
      currentReport = result.text;
      output.textContent = result.text;
      countNode.textContent = result.count + " ROWS";
      report.hidden = false;
      copy.disabled = false;
      output.focus();
    } catch (error) {
      fail(error.message);
    }
  });
  form.querySelectorAll("[data-cc84-preset]").forEach((button) => button.addEventListener("click", () => {
    input.value = presets[kind][button.dataset.cc84Preset];
    invalidate();
    input.focus();
  }));
  copy.addEventListener("click", async () => {
    const capturedRevision = revision;
    const capturedReport = currentReport;
    try {
      await navigator.clipboard.writeText(capturedReport);
      if (capturedRevision === revision && capturedReport === currentReport && currentReport) copyStatus.textContent = "完整报告已复制。";
    } catch (_error) {
      if (capturedRevision === revision) copyStatus.textContent = "复制未完成，请手动选择报告。";
    }
  });
})();
