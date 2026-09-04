(() => {
  "use strict";

  const main = document.querySelector("[data-tc83-tool]");
  const form = document.querySelector("[data-tc83-tool-form]");
  if (!main || !form) return;
  const kind = main.dataset.tc83Tool;
  const input = form.querySelector("#tc83-input");
  const submit = form.querySelector("button[type=submit]");
  const errorNode = form.querySelector("[data-tc83-error]");
  const report = document.querySelector("[data-tc83-report]");
  const countNode = report.querySelector("[data-tc83-count]");
  const output = report.querySelector("[data-tc83-output]");
  const copy = report.querySelector("[data-tc83-result-copy]");
  const copyStatus = report.querySelector("[data-tc83-copy-status]");
  let currentReport = "";
  let revision = 0;
  submit.disabled = false;

  const codePoints = (value) => Array.from(value).length;
  const hasControl = (value) => /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value);
  const hasUnpaired = (value) => {
    for (let index = 0; index < value.length; index += 1) {
      const code = value.charCodeAt(index);
      if (code >= 0xd800 && code <= 0xdbff) {
        const next = value.charCodeAt(index + 1);
        if (!(next >= 0xdc00 && next <= 0xdfff)) return true;
        index += 1;
      } else if (code >= 0xdc00 && code <= 0xdfff) return true;
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
    if (raw.length > 40000 || codePoints(raw) > 40000) throw new Error("总输入不能超过 40,000 个 Unicode 字符。");
    if (hasControl(raw)) throw new Error("输入包含不允许的控制字符；换行和制表符除外。");
    if (hasUnpaired(raw)) throw new Error("输入包含不完整的 Unicode 代理对。");
    const lines = raw.split(/\r?\n/u).filter((line) => line.trim());
    const maximum = kind === "outline" ? 200 : 300;
    if (!lines.length) throw new Error("请至少输入 1 条记录。");
    if (lines.length > maximum) throw new Error(`非空记录不能超过 ${maximum} 行。`);
    return lines.map((line, index) => {
      const fields = line.normalize("NFKC").replaceAll("−", "-").split("|").map((part) => part.trim());
      if (fields.length !== parts) throw new Error(`第 ${index + 1} 行须且只能包含 ${parts - 1} 个竖线分隔符。`);
      if (fields.some((field) => !field)) throw new Error(`第 ${index + 1} 行存在空字段。`);
      if (codePoints(fields[0]) > 100) throw new Error(`第 ${index + 1} 行名称不能超过 100 个 Unicode 字符。`);
      return { fields, line: index + 1 };
    });
  };
  const integer = (value, line, label, minimum, maximum) => {
    if (!/^(?:0|[1-9][0-9]*)$/u.test(value)) throw new Error(`第 ${line} 行${label}须为无前导零的十进制整数。`);
    const number = Number(value);
    if (number < minimum || number > maximum) throw new Error(`第 ${line} 行${label}须在 ${minimum}–${maximum} 之间。`);
    return number;
  };
  const milli = (value, line, label, minimum, maximum) => {
    if (!/^(?:0|[1-9][0-9]*)(?:\.[0-9]{1,3})?$/u.test(value)) throw new Error(`第 ${line} 行${label}须为最多三位小数且无前导零。`);
    const [whole, fraction = ""] = value.split(".");
    const scaled = BigInt(whole) * 1000n + BigInt(fraction.padEnd(3, "0"));
    if (scaled < BigInt(minimum) || scaled > BigInt(maximum)) throw new Error(`第 ${line} 行${label}超出允许范围。`);
    return scaled;
  };
  const formatMilli = (value) => `${value / 1000n}.${String(value % 1000n).padStart(3, "0")}`;
  const gcd = (left, right) => { let a = left < 0n ? -left : left; let b = right < 0n ? -right : right; while (b) [a, b] = [b, a % b]; return a; };

  const outline = () => {
    const records = rows(2).map(({ fields, line }) => {
      const level = integer(fields[0], line, "层级", 1, 6);
      if (codePoints(fields[1]) > 100) throw new Error(`第 ${line} 行标题不能超过 100 个 Unicode 字符。`);
      return { level, title: fields[1].replace(/\s+/gu, " "), line };
    });
    const issues = [];
    if (records[0].level !== 1) issues.push("首项必须为 H1。");
    const h1 = records.filter((record) => record.level === 1).length;
    if (h1 !== 1) issues.push(`H1 数量应为 1，当前 ${h1}。`);
    records.forEach((record, index) => { if (index && record.level - records[index - 1].level > 1) issues.push(`第 ${record.line} 行从 H${records[index - 1].level} 跳到 H${record.level}。`); });
    const seen = new Map();
    records.forEach((record) => {
      const key = record.title.normalize("NFKC").toLocaleLowerCase();
      const found = seen.get(key) || [];
      found.push(record.line);
      seen.set(key, found);
    });
    [...seen.entries()].filter((entry) => entry[1].length > 1).forEach(([title, lines]) => issues.push(`重复标题“${title}”：行 ${lines.join("、")}。`));
    const out = ["层级大纲校样报告", `标题：${records.length}`, `H1：${h1}`, `最深层级：${Math.max(...records.map((r) => r.level))}`, `问题：${issues.length}`, "", "大纲"];
    records.forEach((record) => out.push(`${"  ".repeat(record.level - 1)}H${record.level}｜${record.title}`));
    out.push("", "问题");
    out.push(...(issues.length ? issues : ["无结构问题。"]));
    out.push("", "边界：只校验输入的大纲合同，不读取网页或证明可访问性与 SEO 表现。");
    return { count: records.length, text: out.join("\n") };
  };
  const measure = () => {
    const records = rows(4).map(({ fields, line }) => {
      const width = milli(fields[1], line, "版心宽", 100000, 4000000);
      const font = milli(fields[2], line, "字号", 8000, 200000);
      const average = milli(fields[3], line, "平均字宽", 200, 2000);
      const capacity = Number(width * 1000n / (font * average));
      return { id: fields[0], capacity, status: capacity < 45 ? "偏短" : capacity > 75 ? "偏长" : "舒适" };
    });
    const out = ["版心行长规划报告", `方案：${records.length}`, `舒适方案：${records.filter((r) => r.status === "舒适").length}`, ""];
    records.forEach((record) => out.push(`${record.id}｜每行 ${record.capacity} 字符｜${record.status}`));
    out.push("", "边界：平均字宽由编辑提供；结果不测量真实字体、语言断行或浏览器渲染。");
    return { count: records.length, text: out.join("\n") };
  };
  const baseline = () => {
    const records = rows(4).map(({ fields, line }) => {
      const font = milli(fields[1], line, "字号", 1000, 500000);
      const lineHeight = milli(fields[2], line, "行高", 1000, 1000000);
      if (lineHeight < font) throw new Error(`第 ${line} 行行高不能小于字号。`);
      const count = BigInt(integer(fields[3], line, "行数", 1, 10000));
      return { id: fields[0], font, lineHeight, count, height: lineHeight * count };
    });
    const step = records.map((record) => record.lineHeight).reduce(gcd);
    const total = records.reduce((sum, record) => sum + record.height, 0n);
    const out = ["基线公约数报告", `区块：${records.length}`, `公共基线步长：${formatMilli(step)} px`, `总排印高度：${formatMilli(total)} px`, ""];
    records.forEach((record) => out.push(`${record.id}｜行高 ${formatMilli(record.lineHeight)} px｜${record.count} 行｜高度 ${formatMilli(record.height)} px`));
    out.push("", "边界：结果是数值公约关系，不验证实际 CSS、字体度量、缩放或像素取整。");
    return { count: records.length, text: out.join("\n") };
  };
  const rag = () => {
    const records = rows(3).map(({ fields, line }) => {
      const width = integer(fields[1], line, "每行字符", 10, 120);
      const words = fields[2].split(/\s+/u);
      if (words.length > 100) throw new Error(`第 ${line} 行文字不能超过 100 个词。`);
      if (words.some((word) => codePoints(word) > width)) throw new Error(`第 ${line} 行存在长于行宽的单词。`);
      const best = Array(words.length + 1).fill(null);
      best[words.length] = { cost: 0, lines: [] };
      for (let start = words.length - 1; start >= 0; start -= 1) {
        let used = 0;
        for (let end = start; end < words.length; end += 1) {
          used += codePoints(words[end]) + (end === start ? 0 : 1);
          if (used > width) break;
          const penalty = end === words.length - 1 ? 0 : (width - used) ** 2;
          const candidate = { cost: penalty + best[end + 1].cost, lines: [words.slice(start, end + 1).join(" "), ...best[end + 1].lines] };
          if (!best[start] || candidate.cost < best[start].cost) best[start] = candidate;
        }
      }
      return { id: fields[0], width, ...best[0] };
    });
    const out = ["参差边断行报告", `段落：${records.length}`, `总惩罚：${records.reduce((sum, record) => sum + record.cost, 0)}`, ""];
    records.forEach((record) => { out.push(`${record.id}｜行宽 ${record.width}｜${record.lines.length} 行｜惩罚 ${record.cost}`); record.lines.forEach((line, index) => out.push(`  ${index + 1}. ${line}`)); });
    out.push("", "边界：字符数不等于真实字形宽度；算法不处理连字符、禁则、语言断词或浏览器排版。");
    return { count: records.length, text: out.join("\n") };
  };
  const widow = () => {
    const records = rows(4).map(({ fields, line }) => {
      const paragraph = integer(fields[1], line, "段落行数", 1, 10000);
      const page = integer(fields[2], line, "每页行数", 3, 500);
      const used = integer(fields[3], line, "当前页已用行数", 0, page - 1);
      const first = Math.min(paragraph, page - used);
      const remaining = paragraph - first;
      const last = remaining ? ((remaining - 1) % page) + 1 : first;
      const pages = remaining ? 1 + Math.ceil(remaining / page) : 1;
      const flags = [];
      if (paragraph > first && first === 1) flags.push("页尾孤行");
      if (remaining && last === 1) flags.push("次页寡行");
      return { id: fields[0], first, last, pages, flags };
    });
    const out = ["孤行寡行分页报告", `段落：${records.length}`, `需复核：${records.filter((record) => record.flags.length).length}`, ""];
    records.forEach((record) => out.push(`${record.id}｜占 ${record.pages} 页｜首片 ${record.first} 行｜末片 ${record.last} 行｜${record.flags.join("、") || "无单行碎片"}`));
    out.push("", "边界：模拟使用给定行数，不测量真实页面、字体、段前后距、浮动元素或打印机分页。");
    return { count: records.length, text: out.join("\n") };
  };
  const scans = { outline, measure, baseline, rag, widow };
  const presets = {
    outline: { standard: "1 | 页面主标题\n2 | 第一章\n3 | 子问题\n2 | 第二章", edge: "2 | 无主标题\n4 | 跳级\n4 | 跳级", fullwidth: "１ ｜ 页面主标题\n２ ｜ 第一章" },
    measure: { standard: "正文 | 720 | 18 | 0.55\n旁注 | 280 | 14 | 0.52", edge: "窄栏 | 320 | 24 | 0.8\n宽栏 | 1600 | 14 | 0.45", fullwidth: "正文 ｜ ７２０ ｜ １８ ｜ ０．５５" },
    baseline: { standard: "正文 | 18 | 30 | 12\n旁注 | 14 | 24 | 8", edge: "标题 | 64 | 72 | 2\n正文 | 16 | 24 | 10000", fullwidth: "正文 ｜ １８ ｜ ３０ ｜ １２" },
    rag: { standard: "导语 | 18 | 先决定 内容之间 是什么关系 再决定 这些关系 应该多大", edge: "短行 | 10 | 每一个 词组 都要 找到 合适 位置", fullwidth: "导语 ｜ １８ ｜ 先决定 内容关系 再安排 视觉节奏" },
    widow: { standard: "段落 A | 8 | 12 | 10\n段落 B | 20 | 12 | 0", edge: "孤行 | 8 | 12 | 11\n寡行 | 13 | 12 | 0", fullwidth: "段落 ｜ ８ ｜ １２ ｜ １０" }
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
      countNode.textContent = `${result.count} ROWS`;
      report.hidden = false;
      copy.disabled = false;
      output.focus();
    } catch (error) { fail(error.message); }
  });
  form.querySelectorAll("[data-tc83-preset]").forEach((button) => button.addEventListener("click", () => {
    input.value = presets[kind][button.dataset.tc83Preset];
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
