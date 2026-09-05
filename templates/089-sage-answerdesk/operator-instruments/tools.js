(function () {
  "use strict";

  const routeNames = ["BOUNDARY", "SOURCE", "LIMIT", "UPDATE"];
  const cp = (value) => [...value].length;
  const clear = (node) => { while (node.firstChild) node.firstChild.remove(); };
  const hasUnpairedSurrogate = (value) => {
    for (let index = 0; index < value.length; index += 1) {
      const unit = value.charCodeAt(index);
      if (unit >= 0xd800 && unit <= 0xdbff) {
        const next = value.charCodeAt(index + 1);
        if (!(next >= 0xdc00 && next <= 0xdfff)) return true;
        index += 1;
      } else if (unit >= 0xdc00 && unit <= 0xdfff) return true;
    }
    return false;
  };
  const forbiddenControl = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/u;
  const normalize = (value) => value.normalize("NFKC").trim();
  const key = (value) => normalize(value).toLocaleLowerCase();

  function parseLines(raw) {
    if (!raw.trim()) throw new Error("请输入至少一行记录。");
    if (cp(raw) > 40000) throw new Error("输入不能超过 40,000 个 Unicode 字符。");
    if (hasUnpairedSurrogate(raw)) throw new Error("输入含有不完整的 Unicode 代理项。");
    if (forbiddenControl.test(raw)) throw new Error("输入含有不允许的控制字符。");
    const lines = raw.split(/\r?\n/u).map((value, index) => ({ value: normalize(value), line: index + 1 })).filter((item) => item.value);
    if (lines.length < 1 || lines.length > 300) throw new Error("记录须为 1–300 个非空行。");
    return lines;
  }

  function fields(item, count) {
    const parts = item.value.split("|").map(normalize);
    if (parts.length !== count || parts.some((part) => !part)) throw new Error(`第 ${item.line} 行必须恰有 ${count} 个非空字段。`);
    if (parts.some((part) => cp(part) > 240)) throw new Error(`第 ${item.line} 行字段不能超过 240 个 Unicode 字符。`);
    return parts;
  }

  function strictDate(value, line) {
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) throw new Error(`第 ${line} 行日期必须为 YYYY-MM-DD。`);
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) throw new Error(`第 ${line} 行包含不存在的日期。`);
    return date;
  }

  function uniquePair(seen, left, right, line) {
    const token = `${key(left)}\u0000${key(right)}`;
    if (seen.has(token)) throw new Error(`第 ${line} 行与前面的关系重复。`);
    seen.add(token);
  }

  const engines = {
    questions(lines) {
      const groups = new Map();
      for (const item of lines) {
        if (cp(item.value) < 2 || cp(item.value) > 300) throw new Error(`第 ${item.line} 行问句须为 2–300 个字符。`);
        const token = key(item.value).replace(/\s+/gu, "").replace(/[?？!！。．.]+$/gu, "");
        if (!token) throw new Error(`第 ${item.line} 行归一后不能为空。`);
        if (!groups.has(token)) groups.set(token, { label: item.value, lines: [] });
        groups.get(token).lines.push(item.line);
      }
      const duplicates = [...groups.values()].filter((group) => group.lines.length > 1);
      return [
        "QUESTION DEDUPER / COMPLETE",
        `原始问句：${lines.length}`,
        `独立问句：${groups.size}`,
        `重复组：${duplicates.length}`,
        `可减少：${lines.length - groups.size}`,
        "",
        ...[...groups.values()].map((group, index) => `${index + 1}. ${group.label} | ${group.lines.length} 次 | 行 ${group.lines.join("、")}`),
        "",
        "规则：NFKC、不区分大小写、移除空白与末尾标点；仍需人工核对语义。"
      ].join("\n");
    },
    coverage(lines) {
      const seen = new Set();
      const records = new Map();
      for (const item of lines) {
        const [record, field, state] = fields(item, 3);
        const status = state.toLocaleUpperCase();
        if (!new Set(["PRESENT", "MISSING"]).has(status)) throw new Error(`第 ${item.line} 行状态只能是 PRESENT 或 MISSING。`);
        uniquePair(seen, record, field, item.line);
        const token = key(record);
        if (!records.has(token)) records.set(token, { label: record, present: 0, missing: 0 });
        records.get(token)[status === "PRESENT" ? "present" : "missing"] += 1;
      }
      const missing = [...records.values()].reduce((sum, record) => sum + record.missing, 0);
      return ["FIELD COVERAGE / COMPLETE", `记录：${records.size}`, `独立关系：${seen.size}`, `缺失字段：${missing}`, "", ...[...records.values()].map((record) => `${record.label} | PRESENT ${record.present} | MISSING ${record.missing} | ${record.missing ? "OPEN" : "READY"}`)].join("\n");
    },
    age(lines) {
      const seen = new Set();
      let fresh = 0;
      let stale = 0;
      const rows = [];
      for (const item of lines) {
        const [answer, reviewedRaw, validRaw, asOfRaw] = fields(item, 4);
        const reviewed = strictDate(reviewedRaw, item.line);
        const asOf = strictDate(asOfRaw, item.line);
        if (!/^\d+$/u.test(validRaw)) throw new Error(`第 ${item.line} 行有效天数必须为整数。`);
        const validDays = Number(validRaw);
        if (validDays < 1 || validDays > 3650) throw new Error(`第 ${item.line} 行有效天数须为 1–3650。`);
        if (reviewed > asOf) throw new Error(`第 ${item.line} 行复核日期不得晚于核对日期。`);
        const token = key(answer);
        if (seen.has(token)) throw new Error(`第 ${item.line} 行回答名称重复。`);
        seen.add(token);
        const elapsed = Math.floor((asOf - reviewed) / 86400000);
        const status = elapsed <= validDays ? "FRESH" : "STALE";
        if (status === "FRESH") fresh += 1; else stale += 1;
        rows.push(`${answer} | ${elapsed}/${validDays} 天 | ${status}`);
      }
      return ["ANSWER AGE / COMPLETE", `回答：${rows.length}`, `仍有效：${fresh}`, `需复核：${stale}`, "", ...rows].join("\n");
    },
    sources(lines) {
      const seen = new Set();
      const counts = { PRIMARY: 0, SECONDARY: 0, INFERENCE: 0 };
      const answers = new Set();
      const rows = [];
      for (const item of lines) {
        const [answer, source, tierRaw] = fields(item, 3);
        const tier = tierRaw.toLocaleUpperCase();
        if (!Object.hasOwn(counts, tier)) throw new Error(`第 ${item.line} 行层级只能是 PRIMARY、SECONDARY 或 INFERENCE。`);
        uniquePair(seen, answer, source, item.line);
        answers.add(key(answer));
        counts[tier] += 1;
        rows.push(`${answer} ← ${source} | ${tier}`);
      }
      return ["SOURCE TIER / COMPLETE", `回答：${answers.size}`, `独立关系：${seen.size}`, `PRIMARY：${counts.PRIMARY}`, `SECONDARY：${counts.SECONDARY}`, `INFERENCE：${counts.INFERENCE}`, "", ...rows].join("\n");
    },
    routes(lines) {
      const seen = new Set();
      const answers = new Map();
      for (const item of lines) {
        const [answer, routeRaw, stateRaw] = fields(item, 3);
        const route = routeRaw.toLocaleUpperCase();
        const state = stateRaw.toLocaleUpperCase();
        if (!routeNames.includes(route)) throw new Error(`第 ${item.line} 行线路必须是 ${routeNames.join("、")}。`);
        if (!new Set(["PASS", "OPEN"]).has(state)) throw new Error(`第 ${item.line} 行状态只能是 PASS 或 OPEN。`);
        uniquePair(seen, answer, route, item.line);
        const token = key(answer);
        if (!answers.has(token)) answers.set(token, { label: answer, routes: new Map() });
        answers.get(token).routes.set(route, state);
      }
      let ready = 0;
      let blocked = 0;
      const rows = [];
      for (const answer of answers.values()) {
        const missing = routeNames.filter((route) => !answer.routes.has(route));
        const open = routeNames.filter((route) => answer.routes.get(route) === "OPEN");
        const status = !missing.length && !open.length ? "READY" : "BLOCKED";
        if (status === "READY") ready += 1; else blocked += 1;
        rows.push(`${answer.label} | ${status} | 缺线路 ${missing.join("、") || "无"} | 待处理 ${open.join("、") || "无"}`);
      }
      return ["ROUTE READINESS / COMPLETE", `回答：${answers.size}`, `READY：${ready}`, `BLOCKED：${blocked}`, "", ...rows].join("\n");
    }
  };

  async function copy(value, output, revision, current) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.append(field);
        field.select();
        const ok = document.execCommand("copy");
        field.remove();
        if (!ok) throw new Error("copy unavailable");
      }
      if (revision === current()) output.textContent = "报告已复制。";
    } catch (_error) {
      if (revision === current()) output.textContent = "复制失败，请手动选择报告。";
    }
  }

  document.querySelectorAll("[data-sa89-instrument]").forEach((shell) => {
    const type = shell.dataset.sa89Instrument;
    const engine = engines[type];
    const form = shell.querySelector("form");
    const input = shell.querySelector("textarea");
    const error = shell.querySelector("[data-sa89-tool-error]");
    const status = shell.querySelector("[data-sa89-tool-status]");
    const state = shell.querySelector("[data-sa89-tool-state]");
    const report = shell.querySelector("[data-sa89-tool-report]");
    const copyButton = shell.querySelector("[data-sa89-tool-copy]");
    const copyStatus = shell.querySelector("[data-sa89-tool-copy-status]");
    let lastReport = "";
    let revision = 0;
    form.querySelectorAll("button").forEach((button) => button.removeAttribute("disabled"));

    const stale = () => {
      revision += 1;
      lastReport = "";
      error.textContent = "";
      status.textContent = "输入已更改，请重新检测。";
      state.textContent = "STALE";
      report.textContent = "旧报告已失效。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
    };
    const reset = () => {
      revision += 1;
      lastReport = "";
      error.textContent = "";
      status.textContent = "等待输入。";
      state.textContent = "UNSET";
      report.textContent = "检测结果将在这里显示。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
    };
    input.addEventListener("input", stale);
    form.addEventListener("reset", () => setTimeout(reset, 0));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      revision += 1;
      copyStatus.textContent = "";
      try {
        lastReport = engine(parseLines(input.value));
        error.textContent = "";
        status.textContent = "检测完成。";
        state.textContent = "COMPLETE";
        report.textContent = lastReport;
        copyButton.disabled = false;
      } catch (problem) {
        lastReport = "";
        error.textContent = problem instanceof Error ? problem.message : "输入无效。";
        status.textContent = "检测未完成。";
        state.textContent = "INVALID";
        report.textContent = "请修正输入后重新检测；旧报告已清除。";
        copyButton.disabled = true;
        input.focus();
      }
    });
    copyButton.addEventListener("click", () => {
      if (lastReport) copy(lastReport, copyStatus, revision, () => revision);
    });
  });
})();
