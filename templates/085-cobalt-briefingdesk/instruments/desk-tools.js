(() => {
  "use strict";

  const main = document.querySelector("[data-bd85-tool]");
  const form = document.querySelector("[data-bd85-tool-form]");
  if (!main || !form) return;

  const kind = main.dataset.bd85Tool;
  const input = form.querySelector("#bd85-input");
  const submit = form.querySelector("button[type=submit]");
  const errorNode = form.querySelector("[data-bd85-error]");
  const report = document.querySelector("[data-bd85-report]");
  const countNode = report.querySelector("[data-bd85-count]");
  const output = report.querySelector("[data-bd85-output]");
  const copy = report.querySelector("[data-bd85-result-copy]");
  const copyStatus = report.querySelector("[data-bd85-copy-status]");
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
  const parseRows = (parts, allowEmpty = false) => {
    const raw = input.value;
    if (raw.length > 40000 || points(raw) > 40000) throw new Error("总输入不能超过 40,000 个 Unicode 字符。");
    if (hasControl(raw)) throw new Error("输入包含不允许的控制字符；换行、回车和制表符除外。");
    if (hasUnpaired(raw)) throw new Error("输入包含不完整的 Unicode 代理对。");
    const lines = raw.split(/\r?\n/u).filter((line) => line.trim());
    if (!lines.length) throw new Error("请至少输入 1 条记录。");
    if (lines.length > 300) throw new Error("非空记录不能超过 300 行。");
    return lines.map((source, index) => {
      const fields = source.normalize("NFKC").replaceAll("−", "-").split("|").map((field) => field.trim());
      if (fields.length !== parts) throw new Error("第 " + (index + 1) + " 行须且只能包含 " + (parts - 1) + " 个竖线分隔符。");
      if (!fields[0]) throw new Error("第 " + (index + 1) + " 行名称不能为空。");
      if (!allowEmpty && fields.some((field) => !field)) throw new Error("第 " + (index + 1) + " 行存在空字段。");
      if (points(fields[0]) > 100) throw new Error("第 " + (index + 1) + " 行名称不能超过 100 个 Unicode 字符。");
      return { fields, line: index + 1 };
    });
  };
  const unsigned = (value, line, label, minimum, maximum) => {
    if (!/^(?:0|[1-9][0-9]*)$/u.test(value)) throw new Error("第 " + line + " 行" + label + "须为无前导零的十进制整数。");
    const number = Number(value);
    if (!Number.isSafeInteger(number) || number < minimum || number > maximum) throw new Error("第 " + line + " 行" + label + "须在 " + minimum + "–" + maximum + " 之间。");
    return number;
  };
  const signed = (value, line, label) => {
    if (!/^(?:0|-?[1-9][0-9]*)$/u.test(value)) throw new Error("第 " + line + " 行" + label + "须为不含前导零的十进制整数。");
    const number = Number(value);
    if (!Number.isSafeInteger(number) || number < -1000000 || number > 1000000) throw new Error("第 " + line + " 行" + label + "须在 -1,000,000–1,000,000 之间。");
    return number;
  };
  const key = (value) => value.normalize("NFKC").toLocaleLowerCase();
  const exactScore = (numerator, denominator) => {
    const scaled = (numerator * 1000n + denominator / 2n) / denominator;
    return (scaled / 1000n).toString() + "." + (scaled % 1000n).toString().padStart(3, "0");
  };

  const scanBrief = () => {
    const records = parseRows(7, true).map(({ fields, line }) => {
      const answers = fields.slice(1);
      answers.forEach((answer, index) => {
        if (points(answer) > 300) throw new Error("第 " + line + " 行第 " + (index + 1) + " 个回答不能超过 300 个 Unicode 字符。");
      });
      const total = answers.reduce((sum, answer) => sum + points(answer), 0);
      if (total > 1200) throw new Error("第 " + line + " 行六项合计不能超过 1,200 个 Unicode 字符。");
      const missing = answers.map((answer, index) => answer ? "" : ["WHAT", "WHY", "WHO", "WHEN", "WHERE", "HOW"][index]).filter(Boolean);
      const verbose = answers.map((answer, index) => points(answer) > 120 ? ["WHAT", "WHY", "WHO", "WHEN", "WHERE", "HOW"][index] : "").filter(Boolean);
      return { id: fields[0], total, missing, verbose };
    });
    const out = ["六问完整度批检报告", "简报：" + records.length, "完整：" + records.filter((record) => !record.missing.length).length, ""];
    records.forEach((record) => out.push(record.id + "｜" + (record.missing.length ? "缺项 " + record.missing.join(",") : "六问完整") + "｜" + (record.verbose.length ? "超建议线 " + record.verbose.join(",") : "长度正常") + "｜总字符 " + record.total));
    out.push("", "边界：完整度与长度只反映字段形态，不证明事实正确、信息充分或建议可行。");
    return { count: records.length, text: out.join("\n") };
  };

  const scanOptions = () => {
    const records = parseRows(5).map(({ fields, line }, order) => {
      const value = unsigned(fields[1], line, "价值", 1, 1000000);
      const confidence = unsigned(fields[2], line, "置信度", 1, 1000000);
      const cost = unsigned(fields[3], line, "成本", 1, 1000000);
      const risk = unsigned(fields[4], line, "风险", 1, 1000000);
      return { id: fields[0], numerator: BigInt(value) * BigInt(confidence), denominator: BigInt(cost + risk), order };
    });
    records.sort((left, right) => {
      const l = left.numerator * right.denominator;
      const r = right.numerator * left.denominator;
      return l === r ? left.order - right.order : l > r ? -1 : 1;
    });
    const out = ["选项精确排序报告", "选项：" + records.length, ""];
    records.forEach((record, index) => out.push((index + 1) + ". " + record.id + "｜分数 " + exactScore(record.numerator, record.denominator) + "｜精确比 " + record.numerator + "/" + record.denominator));
    out.push("", "边界：排序严格依赖输入量表；工具不校验价值、置信度、成本或风险的事实依据。");
    return { count: records.length, text: out.join("\n") };
  };

  const scanRaci = () => {
    const rows = parseRows(3).map(({ fields, line }) => {
      const role = fields[2].toUpperCase();
      if (!/^[RACI]$/u.test(role)) throw new Error("第 " + line + " 行角色须为 R、A、C 或 I。");
      if (points(fields[1]) > 100) throw new Error("第 " + line + " 行姓名不能超过 100 个 Unicode 字符。");
      return { task: fields[0], taskKey: key(fields[0]), person: fields[1], personKey: key(fields[1]), role, line };
    });
    const groups = new Map();
    rows.forEach((row) => {
      if (!groups.has(row.taskKey)) groups.set(row.taskKey, { label: row.task, rows: [] });
      groups.get(row.taskKey).rows.push(row);
    });
    const out = ["RACI 责任冲突报告", "任务：" + groups.size, "分派：" + rows.length, ""];
    let issueCount = 0;
    groups.forEach((group) => {
      const issues = [];
      const accountable = group.rows.filter((row) => row.role === "A");
      const responsible = group.rows.filter((row) => row.role === "R");
      if (accountable.length !== 1) issues.push("A 应恰有 1 人，当前 " + accountable.length);
      if (!responsible.length) issues.push("缺少 R");
      const pairs = new Set();
      const people = new Map();
      group.rows.forEach((row) => {
        const pair = row.personKey + "\u0000" + row.role;
        if (pairs.has(pair)) issues.push(row.person + " 重复分派 " + row.role);
        pairs.add(pair);
        if (!people.has(row.personKey)) people.set(row.personKey, new Set());
        people.get(row.personKey).add(row.role);
      });
      people.forEach((roles, person) => {
        if (roles.has("A") && roles.has("R")) issues.push(group.rows.find((row) => row.personKey === person).person + " 同时承担 A/R");
      });
      issueCount += issues.length;
      out.push(group.label + "｜" + (issues.length ? issues.join("；") : "责任结构通过"));
    });
    out.splice(3, 0, "问题：" + issueCount);
    out.push("", "边界：检查只识别分派结构，不判断人员能力、授权真实性或实际执行情况。");
    return { count: rows.length, text: out.join("\n") };
  };

  const scanPath = () => {
    const records = parseRows(4).map(({ fields, line }, order) => ({
      id: fields[0],
      key: key(fields[0]),
      duration: unsigned(fields[1], line, "工期", 1, 3650),
      parent: fields[2],
      parentKey: key(fields[2]),
      deadline: unsigned(fields[3], line, "截止日序号", 1, 1000000),
      order,
      line
    }));
    const byKey = new Map();
    records.forEach((record) => {
      if (byKey.has(record.key)) throw new Error("第 " + record.line + " 行任务名称重复。");
      byKey.set(record.key, record);
    });
    records.forEach((record) => {
      if (record.parentKey === record.key) throw new Error("第 " + record.line + " 行任务不能以前置指向自己。");
      if (record.parentKey !== "root" && !byKey.has(record.parentKey)) throw new Error("第 " + record.line + " 行前置任务不存在。");
    });
    const indegree = new Map(records.map((record) => [record.key, record.parentKey === "root" ? 0 : 1]));
    const children = new Map(records.map((record) => [record.key, []]));
    records.forEach((record) => {
      if (record.parentKey !== "root") children.get(record.parentKey).push(record.key);
    });
    const queue = records.filter((record) => indegree.get(record.key) === 0).sort((a, b) => a.order - b.order);
    const ordered = [];
    while (queue.length) {
      const record = queue.shift();
      ordered.push(record);
      children.get(record.key).forEach((childKey) => {
        indegree.set(childKey, indegree.get(childKey) - 1);
        if (indegree.get(childKey) === 0) queue.push(byKey.get(childKey));
      });
      queue.sort((a, b) => a.order - b.order);
    }
    if (ordered.length !== records.length) throw new Error("检测到依赖环，无法计算完整期限窗口。");
    const finish = new Map();
    const out = ["前置与期限窗口报告", "任务：" + records.length, "", "稳定顺序：" + ordered.map((record) => record.id).join(" → "), ""];
    ordered.forEach((record) => {
      const start = record.parentKey === "root" ? 0 : finish.get(record.parentKey);
      const end = start + record.duration;
      finish.set(record.key, end);
      const slack = record.deadline - end;
      out.push(record.id + "｜最早完成第 " + end + " 日｜截止第 " + record.deadline + " 日｜" + (slack < 0 ? "逾期 " + Math.abs(slack) : "余量 " + slack) + " 日");
    });
    out.push("", "边界：采用整数自然日与单一前置关系，不处理并行资源、工作日、时区或真实审批延迟。");
    return { count: records.length, text: out.join("\n") };
  };

  const scanSensitivity = () => {
    const records = parseRows(4).map(({ fields, line }) => {
      const base = signed(fields[1], line, "基准值");
      const change = signed(fields[2], line, "变化值");
      const threshold = signed(fields[3], line, "阈值");
      const adjusted = base + change;
      if (!Number.isSafeInteger(adjusted) || adjusted < -2000000 || adjusted > 2000000) throw new Error("第 " + line + " 行调整值超出 -2,000,000–2,000,000。");
      const gap = adjusted - threshold;
      return { id: fields[0], base, change, threshold, adjusted, gap };
    });
    const out = ["假设敏感度阈值报告", "场景：" + records.length, "达到或超过阈值：" + records.filter((record) => record.gap >= 0).length, ""];
    records.forEach((record) => out.push(record.id + "｜基准 " + record.base + "｜变化 " + record.change + "｜调整 " + record.adjusted + "｜阈值 " + record.threshold + "｜" + (record.gap >= 0 ? "高于阈值 " + record.gap : "低于阈值 " + Math.abs(record.gap))));
    out.push("", "边界：只做整数情景加减与阈值比较，不推断概率、因果或真实业务结果。");
    return { count: records.length, text: out.join("\n") };
  };

  const scans = { brief: scanBrief, options: scanOptions, raci: scanRaci, path: scanPath, sensitivity: scanSensitivity };
  const presets = {
    brief: {
      standard: "发布简报 | 新版口径 | 避免误读 | 编辑负责人 | 2026-09-12 | 帮助中心 | 复核后发布\n复盘说明 | 实际与目标偏离 | 继承证据 | 项目负责人 | 月末 | 内部记录 | 登记差值",
      edge: "缺责任 | 事项 | 理由 | | 明日 | 工作区 | 复核\n精简 | 事项 | 理由 | 负责人 | 明日 | 工作区 | 行动",
      fullwidth: "全角简报 ｜ 新口径 ｜ 避免误读 ｜ 编辑 ｜ 明日 ｜ 帮助中心 ｜ 复核发布"
    },
    options: {
      standard: "方案甲 | 80 | 75 | 30 | 15\n方案乙 | 70 | 90 | 20 | 25\n方案丙 | 95 | 60 | 50 | 10",
      edge: "并列甲 | 1 | 2 | 1 | 1\n并列乙 | 2 | 1 | 1 | 1",
      fullwidth: "全角方案 ｜ ８０ ｜ ７５ ｜ ３０ ｜ １５"
    },
    raci: {
      standard: "资料复核 | 林青 | A\n资料复核 | 周澄 | R\n页面发布 | 周澄 | A\n页面发布 | 林青 | R",
      edge: "缺A任务 | 林青 | R\n冲突任务 | 周澄 | A\n冲突任务 | 周澄 | R",
      fullwidth: "资料复核 ｜ 林青 ｜ Ａ\n资料复核 ｜ 周澄 ｜ Ｒ"
    },
    path: {
      standard: "资料 | 2 | ROOT | 3\n复核 | 1 | 资料 | 4\n发布 | 1 | 复核 | 5",
      edge: "根任务 | 3650 | ROOT | 3650\n紧任务 | 1 | 根任务 | 3650",
      fullwidth: "资料 ｜ ２ ｜ ＲＯＯＴ ｜ ３\n复核 ｜ １ ｜ 资料 ｜ ４"
    },
    sensitivity: {
      standard: "基准 | 120 | -15 | 100\n压力 | 120 | -35 | 100\n上行 | -20 | 50 | 0",
      edge: "下界 | -1000000 | 0 | -1000000\n上界 | 1000000 | 0 | 1000000",
      fullwidth: "基准 ｜ １２０ ｜ －１５ ｜ １００"
    }
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
  form.querySelectorAll("[data-bd85-preset]").forEach((button) => button.addEventListener("click", () => {
    input.value = presets[kind][button.dataset.bd85Preset];
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
