(() => {
  "use strict";

  const main = document.querySelector("[data-sa81-tool]");
  const form = document.querySelector("[data-sa81-tool-form]");
  if (!main || !form) return;

  const kind = main.dataset.sa81Tool;
  const field = form.querySelector("#sa81-input");
  const option = form.querySelector("#sa81-option");
  const submit = form.querySelector("button[type=submit]");
  const errorNode = form.querySelector("[data-sa81-error]");
  const report = document.querySelector("[data-sa81-report]");
  const rowCount = report.querySelector("[data-sa81-count]");
  const output = report.querySelector("[data-sa81-output]");
  const copyButton = report.querySelector("[data-sa81-result-copy]");
  const copyStatus = report.querySelector("[data-sa81-copy-status]");
  const unicodeCount = (value) => Array.from(value).length;
  const hashPattern = /^[0-9a-f]{64}$/u;
  const hasControl = (value) => /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value);
  const hasUnpairedSurrogate = (value) => {
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
  const pluralRows = (value) => `${value} ${value === 1 ? "ROW" : "ROWS"}`;
  let currentReport = "";
  let revision = 0;
  submit.disabled = false;

  const invalidate = () => {
    revision += 1;
    currentReport = "";
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-errormessage");
    errorNode.textContent = "";
    copyStatus.textContent = "";
    copyButton.disabled = true;
    report.hidden = true;
    output.textContent = "";
    rowCount.textContent = "0 ROWS";
  };

  const fail = (message) => {
    invalidate();
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-errormessage", errorNode.id);
    errorNode.textContent = message;
    field.focus();
  };

  const parseRows = (partCount) => {
    const raw = field.value;
    const characterLimit = kind === "hamming" ? 50000 : 30000;
    if (raw.length > characterLimit || unicodeCount(raw) > characterLimit) throw new Error(`总输入不能超过 ${characterLimit.toLocaleString("en-US")} 个 Unicode 字符。`);
    if (hasControl(raw)) throw new Error("输入包含不允许的控制字符；换行和制表符除外。");
    if (hasUnpairedSurrogate(raw)) throw new Error("输入包含不完整的 Unicode 代理对。");
    const lines = raw.split(/\r?\n/u).filter((line) => line.trim() !== "");
    const maximum = kind === "register" ? 200 : 300;
    if (!lines.length) throw new Error("请至少输入 1 条记录。");
    if (lines.length > maximum) throw new Error(`非空记录不能超过 ${maximum} 行。`);
    return lines.map((rawLine, index) => {
      const line = rawLine.normalize("NFKC");
      const parts = line.split("|").map((part) => part.trim());
      if (parts.length !== partCount) throw new Error(`第 ${index + 1} 行须且只能包含 ${partCount - 1} 个竖线分隔符。`);
      if (parts.some((part) => part === "")) throw new Error(`第 ${index + 1} 行存在空字段。`);
      if (unicodeCount(parts[0]) > 120) throw new Error(`第 ${index + 1} 行首字段不能超过 120 个 Unicode 字符。`);
      return { parts, line: index + 1 };
    });
  };

  const readHash = (value, line, label = "SHA-256") => {
    const hash = value.toLowerCase();
    if (!hashPattern.test(hash)) throw new Error(`第 ${line} 行 ${label} 无效：须为 64 位十六进制。`);
    return hash;
  };

  const grouped = (records, key) => {
    const groups = new Map();
    records.forEach((record) => {
      const value = key(record);
      const entries = groups.get(value) || [];
      entries.push(record);
      groups.set(value, entries);
    });
    return groups;
  };

  const scanRegister = () => {
    const records = parseRows(2).map(({ parts, line }) => ({
      id: parts[0], idKey: parts[0].toLocaleLowerCase(), hash: readHash(parts[1], line), line
    }));
    const titleGroups = [...grouped(records, (record) => record.idKey).values()].filter((entries) => entries.length > 1);
    const hashGroups = [...grouped(records, (record) => record.hash).values()].filter((entries) => entries.length > 1);
    const lines = [
      "摘要重复登记报告", `记录：${records.length}`, `唯一标题：${new Set(records.map((record) => record.idKey)).size}`,
      `唯一摘要：${new Set(records.map((record) => record.hash)).size}`, `重复标题组：${titleGroups.length}`, `重复摘要组：${hashGroups.length}`, ""
    ];
    if (!titleGroups.length && !hashGroups.length) lines.push("未形成标题或摘要重复组。");
    titleGroups.forEach((entries) => lines.push(`TITLE｜${entries[0].id}｜行 ${entries.map((entry) => entry.line).join("、")}`));
    hashGroups.forEach((entries) => lines.push(`DIGEST｜${entries[0].hash.slice(0, 16)}…｜${entries.map((entry) => entry.id).join(" / ")}`));
    lines.push("", "边界：摘要相同只表示登记值相同，不证明对象真实、来源可靠或内容正确。");
    return { rows: records.length, text: lines.join("\n") };
  };

  const scanPrefix = () => {
    const width = Number(option.value);
    if (![2, 4, 6, 8, 10, 12].includes(width)) throw new Error("前缀位数必须是 2、4、6、8、10 或 12。");
    const records = parseRows(2).map(({ parts, line }) => ({ id: parts[0], hash: readHash(parts[1], line), line }));
    const collisions = [...grouped(records, (record) => record.hash.slice(0, width)).entries()]
      .filter(([, entries]) => entries.length > 1)
      .sort((left, right) => left[0].localeCompare(right[0]));
    const lines = ["SHA-256 前缀碰撞报告", `记录：${records.length}`, `前缀：${width} 位十六进制`, `碰撞桶：${collisions.length}`, ""];
    if (!collisions.length) lines.push("此输入集没有形成前缀碰撞桶。");
    collisions.forEach(([prefix, entries]) => lines.push(`${prefix}｜${entries.length} 条｜${entries.map((entry) => entry.id).join(" / ")}`));
    lines.push("", "边界：短前缀碰撞是分组现象，不等同于完整 SHA-256 碰撞。");
    return { rows: records.length, text: lines.join("\n") };
  };

  const bitCount = (hexA, hexB) => {
    const nibbleBits = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];
    let distance = 0;
    for (let index = 0; index < 64; index += 1) {
      distance += nibbleBits[parseInt(hexA[index], 16) ^ parseInt(hexB[index], 16)];
    }
    return distance;
  };

  const scanHamming = () => {
    const records = parseRows(3).map(({ parts, line }) => {
      const first = readHash(parts[1], line, "摘要 A");
      const second = readHash(parts[2], line, "摘要 B");
      return { id: parts[0], distance: bitCount(first, second) };
    });
    const distances = records.map((record) => record.distance);
    const total = distances.reduce((sum, value) => sum + value, 0);
    const lines = ["256 位摘要汉明距离报告", `记录：${records.length}`, `最小距离：${Math.min(...distances)} / 256`, `最大距离：${Math.max(...distances)} / 256`, `平均距离：${(total / records.length).toFixed(2)} / 256`, ""];
    records.forEach((record) => lines.push(`${record.id}｜${record.distance} 位｜${(record.distance / 256 * 100).toFixed(2)}%`));
    lines.push("", "边界：位差是两个摘要字符串之间的数学关系，不衡量文本语义或来源真实性。");
    return { rows: records.length, text: lines.join("\n") };
  };

  const scanManifest = () => {
    const records = parseRows(3).map(({ parts, line }) => {
      if (!/^(0|[1-9][0-9]*)$/u.test(parts[1])) throw new Error(`第 ${line} 行字节数须为非负十进制整数。`);
      if (parts[1].length > 120) throw new Error(`第 ${line} 行字节数过长。`);
      return { id: parts[0], bytes: BigInt(parts[1]), hash: readHash(parts[2], line) };
    });
    const total = records.reduce((sum, record) => sum + record.bytes, 0n);
    const duplicates = [...grouped(records, (record) => record.hash).values()].filter((entries) => entries.length > 1);
    const lines = ["字节清单汇总报告", `文件：${records.length}`, `总字节：${total.toString()}`, `唯一摘要：${new Set(records.map((record) => record.hash)).size}`, `重复摘要组：${duplicates.length}`, ""];
    records.forEach((record) => lines.push(`${record.id}｜${record.bytes.toString()} bytes｜${record.hash.slice(0, 16)}…`));
    if (duplicates.length) {
      lines.push("", "重复摘要");
      duplicates.forEach((entries) => lines.push(`${entries[0].hash.slice(0, 16)}…｜${entries.map((entry) => entry.id).join(" / ")}`));
    }
    lines.push("", "边界：总量使用 BigInt 精确相加；登记字节数和摘要仍需对照原对象核验。");
    return { rows: records.length, text: lines.join("\n") };
  };

  const scanChain = () => {
    const records = parseRows(3).map(({ parts, line }) => ({
      id: parts[0], predecessor: parts[1].toUpperCase() === "ROOT" ? "ROOT" : parts[1], hash: readHash(parts[2], line), line
    }));
    const nodes = new Map();
    records.forEach((record) => {
      if (nodes.has(record.id)) throw new Error(`第 ${record.line} 行节点标识重复：${record.id}。`);
      nodes.set(record.id, record);
    });
    const roots = records.filter((record) => record.predecessor === "ROOT");
    const missing = records.filter((record) => record.predecessor !== "ROOT" && !nodes.has(record.predecessor));
    const self = records.filter((record) => record.predecessor === record.id);
    const children = grouped(records.filter((record) => record.predecessor !== "ROOT"), (record) => record.predecessor);
    const branches = [...children.entries()].filter(([, entries]) => entries.length > 1);
    const cycles = new Set();
    records.forEach((start) => {
      const order = [];
      const position = new Map();
      let cursor = start.id;
      while (cursor !== "ROOT" && nodes.has(cursor)) {
        if (position.has(cursor)) {
          const cycle = order.slice(position.get(cursor));
          const canonical = [...cycle].sort().join(" → ");
          cycles.add(canonical);
          break;
        }
        position.set(cursor, order.length);
        order.push(cursor);
        cursor = nodes.get(cursor).predecessor;
      }
    });
    const issues = missing.length + self.length + branches.length + cycles.size + (roots.length === 1 ? 0 : 1);
    const lines = ["捕获链连续性报告", `节点：${records.length}`, `根节点：${roots.length}`, `缺失前驱：${missing.length}`, `自指：${self.length}`, `循环：${cycles.size}`, `分叉前驱：${branches.length}`, `问题组：${issues}`, ""];
    if (!issues) lines.push("结构连续：恰有一个 ROOT，且未发现缺父、自指、循环或分叉。");
    if (roots.length !== 1) lines.push(`ROOT｜期望 1 个，实际 ${roots.length} 个：${roots.map((record) => record.id).join(" / ") || "无"}`);
    missing.forEach((record) => lines.push(`MISSING｜${record.id} 的前驱 ${record.predecessor} 不存在`));
    self.forEach((record) => lines.push(`SELF｜${record.id} 指向自身`));
    [...cycles].forEach((cycle) => lines.push(`CYCLE｜${cycle}`));
    branches.forEach(([parent, entries]) => lines.push(`BRANCH｜${parent} 被 ${entries.map((entry) => entry.id).join(" / ")} 共同引用`));
    lines.push("", "边界：结构连续不证明每次捕获真实、完整或获得适当授权。");
    return { rows: records.length, text: lines.join("\n") };
  };

  const scanners = { register: scanRegister, prefix: scanPrefix, hamming: scanHamming, manifest: scanManifest, chain: scanChain };
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const result = scanners[kind]();
      revision += 1;
      currentReport = result.text;
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-errormessage");
      errorNode.textContent = "";
      output.textContent = result.text;
      rowCount.textContent = pluralRows(result.rows);
      report.hidden = false;
      copyButton.disabled = false;
      copyStatus.textContent = "";
      report.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (error) {
      fail(error instanceof Error ? error.message : "输入无法扫描。");
    }
  });
  field.addEventListener("input", invalidate);
  option?.addEventListener("change", invalidate);
  form.addEventListener("reset", () => setTimeout(invalidate, 0));

  const copyText = async (value) => {
    if (navigator.clipboard && isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const temporary = document.createElement("textarea");
    temporary.value = value;
    temporary.setAttribute("readonly", "");
    temporary.style.position = "fixed";
    temporary.style.opacity = "0";
    document.body.append(temporary);
    temporary.select();
    const copied = document.execCommand("copy");
    temporary.remove();
    if (!copied) throw new Error("copy unavailable");
  };
  copyButton.addEventListener("click", async () => {
    if (!currentReport) return;
    const snapshot = currentReport;
    const startedAt = revision;
    copyStatus.textContent = "正在复制…";
    try {
      await copyText(snapshot);
      if (startedAt === revision && snapshot === currentReport) copyStatus.textContent = "完整报告已复制。";
    } catch (_error) {
      if (startedAt === revision && snapshot === currentReport) copyStatus.textContent = "复制失败，请手动选择报告。";
    }
  });
})();
