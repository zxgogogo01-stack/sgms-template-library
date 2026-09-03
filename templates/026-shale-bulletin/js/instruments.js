(() => {
  "use strict";
  const form = document.querySelector("form[data-tool]");
  if (!form) return;
  const output = document.querySelector("[data-output]");
  const error = document.querySelector("[data-error]");
  const status = document.querySelector("[data-copy-status]");

  const write = (value) => {
    output.textContent = value;
    error.textContent = "";
  };
  const fail = (message) => {
    error.textContent = message;
    output.textContent = "%TOOL_RESULT_EMPTY%";
  };
  const parseVersion = (raw) => {
    const match = String(raw).trim().match(/^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/);
    if (!match) throw new Error("%TOOL_VERSION_ERROR%");
    return { core: match.slice(1, 4).map(Number), pre: match[4] ? match[4].split(".") : [] };
  };
  const compareVersions = (left, right) => {
    for (let index = 0; index < 3; index += 1) {
      if (left.core[index] !== right.core[index]) return Math.sign(left.core[index] - right.core[index]);
    }
    if (!left.pre.length && !right.pre.length) return 0;
    if (!left.pre.length) return 1;
    if (!right.pre.length) return -1;
    for (let index = 0; index < Math.max(left.pre.length, right.pre.length); index += 1) {
      if (left.pre[index] === undefined) return -1;
      if (right.pre[index] === undefined) return 1;
      if (left.pre[index] === right.pre[index]) continue;
      const leftNumeric = /^\d+$/.test(left.pre[index]);
      const rightNumeric = /^\d+$/.test(right.pre[index]);
      if (leftNumeric && rightNumeric) return Math.sign(Number(left.pre[index]) - Number(right.pre[index]));
      if (leftNumeric !== rightNumeric) return leftNumeric ? -1 : 1;
      return left.pre[index].localeCompare(right.pre[index]);
    }
    return 0;
  };
  const parseMap = (text, required) => {
    const result = new Map();
    const pattern = required ? /^([\w.-]+)\s*>=\s*(\d+(?:\.\d+){1,2})$/ : /^([\w.-]+)\s*=\s*(\d+(?:\.\d+){1,2})$/;
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (!lines.length) throw new Error("%TOOL_LIST_EMPTY_ERROR%");
    lines.forEach((line) => {
      const match = line.match(pattern);
      if (!match) throw new Error("%TOOL_LIST_FORMAT_ERROR%: " + line);
      result.set(match[1], match[2].split(".").map(Number));
    });
    return result;
  };
  const compareLoose = (left, right) => {
    for (let index = 0; index < 3; index += 1) {
      const delta = (left[index] || 0) - (right[index] || 0);
      if (delta) return Math.sign(delta);
    }
    return 0;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    try {
      if (form.dataset.tool === "semver") {
        const a = String(data.get("a") || "").trim();
        const b = String(data.get("b") || "").trim();
        const result = compareVersions(parseVersion(a), parseVersion(b));
        write(result === 0 ? `${a} = ${b}` : result > 0 ? `${a} > ${b}` : `${a} < ${b}`);
      } else if (form.dataset.tool === "changelog") {
        const lines = String(data.get("log") || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
        if (!lines.length) throw new Error("%TOOL_CHANGELOG_EMPTY_ERROR%");
        const groups = { Added: [], Fixed: [], Changed: [], Removed: [], Other: [] };
        lines.forEach((line) => {
          const match = line.match(/^(add(?:ed)?|fix(?:ed)?|chang(?:e|ed)|remov(?:e|ed))\s*[:\-]\s*(.+)$/i);
          const key = !match ? "Other" : /^add/i.test(match[1]) ? "Added" : /^fix/i.test(match[1]) ? "Fixed" : /^chang/i.test(match[1]) ? "Changed" : "Removed";
          groups[key].push(match ? match[2] : line);
        });
        if (data.get("mode") === "count") write(Object.entries(groups).map(([key, value]) => `${key}: ${value.length}`).join("\n"));
        else write(Object.entries(groups).filter(([, value]) => value.length).map(([key, value]) => `## ${key}\n${value.map((item) => `- ${item}`).join("\n")}`).join("\n\n"));
      } else if (form.dataset.tool === "compat") {
        const required = parseMap(String(data.get("required") || ""), true);
        const available = parseMap(String(data.get("available") || ""), false);
        const rows = [];
        required.forEach((minimum, name) => {
          const actual = available.get(name);
          rows.push(!actual ? `MISSING  ${name}` : compareLoose(actual, minimum) >= 0 ? `PASS     ${name} ${actual.join(".")}` : `LOW      ${name} ${actual.join(".")} < ${minimum.join(".")}`);
        });
        write(rows.join("\n"));
      } else if (form.dataset.tool === "risk") {
        const total = data.getAll("risk").reduce((sum, value) => sum + Number(value), 0);
        const mitigation = Number(data.get("mitigation"));
        if (!Number.isFinite(mitigation) || mitigation < 0 || mitigation > 10) throw new Error("%TOOL_RISK_RANGE_ERROR%");
        const score = Math.max(0, Math.min(14, total - mitigation));
        const grade = score <= 3 ? "%TOOL_RISK_LOW%" : score <= 7 ? "%TOOL_RISK_MEDIUM%" : "%TOOL_RISK_HIGH%";
        write(`%TOOL_RISK_SCORE%: ${score}/14\n%TOOL_RISK_GRADE%: ${grade}`);
      } else {
        const start = new Date(String(data.get("start") || ""));
        const duration = Number(data.get("duration"));
        const buffer = Number(data.get("buffer"));
        if (Number.isNaN(start.getTime())) throw new Error("%TOOL_WINDOW_DATE_ERROR%");
        if (!Number.isFinite(duration) || duration < 1 || duration > 10080 || !Number.isFinite(buffer) || buffer < 0 || buffer > 1440) throw new Error("%TOOL_WINDOW_RANGE_ERROR%");
        const workEnd = new Date(start.getTime() + duration * 60000);
        const fullEnd = new Date(workEnd.getTime() + buffer * 60000);
        const format = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });
        write(`%TOOL_WINDOW_START%: ${format.format(start)}\n%TOOL_WINDOW_WORK_END%: ${format.format(workEnd)}\n%TOOL_WINDOW_FULL_END%: ${format.format(fullEnd)}\n%TOOL_WINDOW_TOTAL%: ${duration + buffer} min`);
      }
    } catch (caught) {
      fail(caught instanceof Error ? caught.message : "%TOOL_GENERIC_ERROR%");
    }
  });

  form.addEventListener("reset", () => {
    requestAnimationFrame(() => {
      error.textContent = "";
      output.textContent = "%TOOL_RESULT_EMPTY%";
      if (status) status.textContent = "";
    });
  });
  document.querySelector("[data-copy-output]")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.textContent.trim());
      if (status) status.textContent = "%COPY_SUCCESS%";
    } catch {
      if (status) status.textContent = "%COPY_FALLBACK%";
    }
  });
})();
