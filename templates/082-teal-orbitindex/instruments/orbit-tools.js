(() => {
  "use strict";

  const main = document.querySelector("[data-oi82-tool]");
  const form = document.querySelector("[data-oi82-tool-form]");
  if (!main || !form) return;

  const kind = main.dataset.oi82Tool;
  const field = form.querySelector("#oi82-input");
  const submit = form.querySelector("button[type=submit]");
  const errorNode = form.querySelector("[data-oi82-error]");
  const report = document.querySelector("[data-oi82-report]");
  const rowCount = report.querySelector("[data-oi82-count]");
  const output = report.querySelector("[data-oi82-output]");
  const copyButton = report.querySelector("[data-oi82-result-copy]");
  const copyStatus = report.querySelector("[data-oi82-copy-status]");
  const unicodeCount = (value) => Array.from(value).length;
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
    if (raw.length > 40000 || unicodeCount(raw) > 40000) throw new Error("总输入不能超过 40,000 个 Unicode 字符。");
    if (hasControl(raw)) throw new Error("输入包含不允许的控制字符；换行和制表符除外。");
    if (hasUnpairedSurrogate(raw)) throw new Error("输入包含不完整的 Unicode 代理对。");
    const lines = raw.split(/\r?\n/u).filter((line) => line.trim() !== "");
    const maximum = kind === "coordinate" || kind === "separation" ? 200 : 300;
    if (!lines.length) throw new Error("请至少输入 1 条记录。");
    if (lines.length > maximum) throw new Error(`非空记录不能超过 ${maximum} 行。`);
    return lines.map((rawLine, index) => {
      const normalized = rawLine.normalize("NFKC").replaceAll("−", "-");
      const parts = normalized.split("|").map((part) => part.trim());
      if (parts.length !== partCount) throw new Error(`第 ${index + 1} 行须且只能包含 ${partCount - 1} 个竖线分隔符。`);
      if (parts.some((part) => !part)) throw new Error(`第 ${index + 1} 行存在空字段。`);
      if (unicodeCount(parts[0]) > 120) throw new Error(`第 ${index + 1} 行对象名不能超过 120 个 Unicode 字符。`);
      return { parts, line: index + 1 };
    });
  };
  const groups = (records, getter) => {
    const map = new Map();
    records.forEach((record) => {
      const key = getter(record);
      const entries = map.get(key) || [];
      entries.push(record);
      map.set(key, entries);
    });
    return map;
  };
  const sexagesimal = (value, line, mode) => {
    if (mode === "ra") {
      const match = value.match(/^(\d{2}):(\d{2}):(\d{2})$/u);
      if (!match) throw new Error(`第 ${line} 行赤经须为 HH:MM:SS。`);
      const hour = Number(match[1]), minute = Number(match[2]), second = Number(match[3]);
      if (hour > 23 || minute > 59 || second > 59) throw new Error(`第 ${line} 行赤经超出 00:00:00–23:59:59。`);
      const totalSeconds = hour * 3600 + minute * 60 + second;
      return { degrees: totalSeconds / 240, key: String(totalSeconds) };
    }
    const match = value.match(/^([+-])(\d{2}):(\d{2}):(\d{2})$/u);
    if (!match) throw new Error(`第 ${line} 行赤纬须为 ±DD:MM:SS。`);
    const degree = Number(match[2]), minute = Number(match[3]), second = Number(match[4]);
    if (degree > 90 || minute > 59 || second > 59 || (degree === 90 && (minute || second))) throw new Error(`第 ${line} 行赤纬超出 -90:00:00–+90:00:00。`);
    const unsigned = degree * 3600 + minute * 60 + second;
    const signed = unsigned === 0 ? 0 : (match[1] === "-" ? -unsigned : unsigned);
    return { degrees: signed / 3600, key: String(signed) };
  };
  const decimal = (value, line, label, minimum, maximum, excludeUpper = false) => {
    if (!/^[+-]?(?:0|[1-9][0-9]*)(?:\.[0-9]{1,6})?$/u.test(value)) throw new Error(`第 ${line} 行${label}须为最多六位小数的十进制度。`);
    const number = Number(value);
    if (number < minimum || (excludeUpper ? number >= maximum : number > maximum)) throw new Error(`第 ${line} 行${label}超出 ${minimum}–${maximum}${excludeUpper ? "（不含上限）" : ""}。`);
    return number;
  };

  const scanCoordinate = () => {
    const records = parseRows(3).map(({ parts, line }) => {
      const ra = sexagesimal(parts[1], line, "ra"), dec = sexagesimal(parts[2], line, "dec");
      return { id: parts[0], idKey: parts[0].toLocaleLowerCase(), ra, dec, line };
    });
    const names = [...groups(records, (record) => record.idKey).values()].filter((entries) => entries.length > 1);
    const positions = [...groups(records, (record) => `${record.ra.key}|${record.dec.key}`).values()].filter((entries) => entries.length > 1);
    const lines = ["赤经赤纬归一报告", `记录：${records.length}`, `唯一对象：${new Set(records.map((record) => record.idKey)).size}`, `唯一坐标：${new Set(records.map((record) => `${record.ra.key}|${record.dec.key}`)).size}`, `对象重名组：${names.length}`, `坐标重复组：${positions.length}`, ""];
    names.forEach((entries) => lines.push(`NAME｜${entries[0].id}｜行 ${entries.map((entry) => entry.line).join("、")}`));
    positions.forEach((entries) => lines.push(`POSITION｜${entries.map((entry) => entry.id).join(" / ")}`));
    records.forEach((record) => lines.push(`${record.id}｜RA ${record.ra.degrees.toFixed(6)}°｜DEC ${record.dec.degrees >= 0 ? "+" : ""}${record.dec.degrees.toFixed(6)}°`));
    lines.push("", "边界：换算不连接星表、不验证对象身份或历元。");
    return { rows: records.length, text: lines.join("\n") };
  };
  const scanSeparation = () => {
    const toRadians = (degrees) => degrees * Math.PI / 180;
    const records = parseRows(5).map(({ parts, line }) => {
      const ra1 = decimal(parts[1], line, "RA1", 0, 360, true), dec1 = decimal(parts[2], line, "DEC1", -90, 90);
      const ra2 = decimal(parts[3], line, "RA2", 0, 360, true), dec2 = decimal(parts[4], line, "DEC2", -90, 90);
      const latitudeDelta = toRadians(dec2 - dec1);
      let longitudeDelta = toRadians(ra2 - ra1);
      longitudeDelta = ((longitudeDelta + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
      const haversine = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(toRadians(dec1)) * Math.cos(toRadians(dec2)) * Math.sin(longitudeDelta / 2) ** 2;
      const radians = 2 * Math.atan2(Math.sqrt(Math.max(0, haversine)), Math.sqrt(Math.max(0, 1 - haversine)));
      return { id: parts[0], degrees: radians * 180 / Math.PI };
    });
    const values = records.map((record) => record.degrees);
    const lines = ["球面角距报告", `记录：${records.length}`, `最小角距：${Math.min(...values).toFixed(6)}°`, `最大角距：${Math.max(...values).toFixed(6)}°`, ""];
    records.forEach((record) => lines.push(`${record.id}｜${record.degrees.toFixed(6)}°`));
    lines.push("", "边界：算法把输入视为同一坐标系中的球面点，不核验对象、历元或测量误差。");
    return { rows: records.length, text: lines.join("\n") };
  };
  const microdegrees = (value, line, label) => {
    if (!/^(?:0|[1-9][0-9]*)(?:\.[0-9]{1,6})?$/u.test(value)) throw new Error(`第 ${line} 行${label}须为 0–360° 内最多六位小数。`);
    const [whole, fraction = ""] = value.split(".");
    const result = BigInt(whole) * 1000000n + BigInt(fraction.padEnd(6, "0"));
    if (result >= 360000000n) throw new Error(`第 ${line} 行${label}须小于 360°。`);
    return result;
  };
  const formatMicrodegree = (value) => {
    const sign = value < 0n ? "-" : "+";
    const absolute = value < 0n ? -value : value;
    return `${sign}${absolute / 1000000n}.${String(absolute % 1000000n).padStart(6, "0")}°`;
  };
  const scanDelta = () => {
    const full = 360000000n, half = 180000000n;
    const records = parseRows(3).map(({ parts, line }) => {
      const first = microdegrees(parts[1], line, "赤经 A"), second = microdegrees(parts[2], line, "赤经 B");
      const signed = ((second - first + half) % full + full) % full - half;
      return { id: parts[0], signed, absolute: signed < 0n ? -signed : signed };
    });
    const lines = ["赤经最短弧报告", `记录：${records.length}`, "约定：有向弧范围 [-180°, +180°)", ""];
    records.forEach((record) => lines.push(`${record.id}｜有向 ${formatMicrodegree(record.signed)}｜绝对 ${formatMicrodegree(record.absolute).slice(1)}`));
    lines.push("", "边界：计算使用整数微度，不判断观测方向、对象运动或坐标历元。");
    return { rows: records.length, text: lines.join("\n") };
  };
  const scanWindow = () => {
    const records = parseRows(3).map(({ parts, line }) => {
      if (!/^(0|[1-9][0-9]*)$/u.test(parts[1]) || !/^(0|[1-9][0-9]*)$/u.test(parts[2])) throw new Error(`第 ${line} 行起止分钟须为十进制整数。`);
      const start = Number(parts[1]), end = Number(parts[2]);
      if (start < 0 || start > 1439 || end < 0 || end > 1440) throw new Error(`第 ${line} 行起点须为 0–1439，终点须为 0–1440。`);
      if (start === end) throw new Error(`第 ${line} 行起止相同会产生歧义，请明确非零窗口。`);
      return { id: parts[0], start, end };
    });
    const segments = [];
    records.forEach((record) => {
      if (record.start < record.end) segments.push([record.start, record.end]);
      else { if (record.start < 1440) segments.push([record.start, 1440]); if (record.end > 0) segments.push([0, record.end]); }
    });
    segments.sort((left, right) => left[0] - right[0] || left[1] - right[1]);
    const merged = [];
    segments.forEach(([start, end]) => {
      const previous = merged.at(-1);
      if (previous && start <= previous[1]) previous[1] = Math.max(previous[1], end);
      else merged.push([start, end]);
    });
    const gaps = [];
    let cursor = 0;
    merged.forEach(([start, end]) => { if (start > cursor) gaps.push([cursor, start]); cursor = Math.max(cursor, end); });
    if (cursor < 1440) gaps.push([cursor, 1440]);
    const covered = merged.reduce((sum, interval) => sum + interval[1] - interval[0], 0);
    const lines = ["环日观测窗口报告", `输入窗口：${records.length}`, `合并区间：${merged.length}`, `覆盖分钟：${covered}`, `空档分钟：${1440 - covered}`, "", "覆盖区间"];
    merged.forEach((interval) => lines.push(`${interval[0]}–${interval[1]}`));
    lines.push("", "空档区间");
    if (!gaps.length) lines.push("无"); else gaps.forEach((interval) => lines.push(`${interval[0]}–${interval[1]}`));
    lines.push("", "边界：窗口按 [start,end) 处理，相邻窗口合并；结果不考虑日期、时区或天气。");
    return { rows: records.length, text: lines.join("\n") };
  };
  const integer = (value, line, label, positive = false) => {
    if (!/^[+-]?(?:0|[1-9][0-9]*)$/u.test(value)) throw new Error(`第 ${line} 行${label}须为十进制整数。`);
    if (value.replace(/^[+-]/u, "").length > 120) throw new Error(`第 ${line} 行${label}过长。`);
    const result = BigInt(value);
    if (positive && result <= 0n) throw new Error(`第 ${line} 行${label}须大于 0。`);
    return result;
  };
  const percent = (elapsed, period) => {
    const scaled = elapsed * 100000000n / period;
    return `${scaled / 1000000n}.${String(scaled % 1000000n).padStart(6, "0")}%`;
  };
  const scanPhase = () => {
    const records = parseRows(4).map(({ parts, line }) => {
      const period = integer(parts[1], line, "周期", true), offset = integer(parts[2], line, "偏移"), timestamp = integer(parts[3], line, "时间戳");
      const elapsed = ((timestamp - offset) % period + period) % period;
      return { id: parts[0], period, elapsed, remaining: elapsed === 0n ? 0n : period - elapsed };
    });
    const lines = ["周期相位定位报告", `记录：${records.length}`, ""];
    records.forEach((record) => lines.push(`${record.id}｜相位 ${percent(record.elapsed, record.period)}｜已过 ${record.elapsed} 秒｜下一过境 ${record.remaining} 秒`));
    lines.push("", "边界：计算采用标准非负余数；整数时间戳的语义与单位一致性仍需人工确认。");
    return { rows: records.length, text: lines.join("\n") };
  };

  const scanners = { coordinate: scanCoordinate, separation: scanSeparation, delta: scanDelta, window: scanWindow, phase: scanPhase };
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
      rowCount.textContent = `${result.rows} ${result.rows === 1 ? "ROW" : "ROWS"}`;
      report.hidden = false;
      copyButton.disabled = false;
      copyStatus.textContent = "";
      report.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (error) { fail(error instanceof Error ? error.message : "输入无法校准。"); }
  });
  field.addEventListener("input", invalidate);
  form.addEventListener("reset", () => setTimeout(invalidate, 0));

  const copyText = async (value) => {
    if (navigator.clipboard && isSecureContext) { await navigator.clipboard.writeText(value); return; }
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
    const snapshot = currentReport, startedAt = revision;
    copyStatus.textContent = "正在复制…";
    try {
      await copyText(snapshot);
      if (startedAt === revision && snapshot === currentReport) copyStatus.textContent = "完整报告已复制。";
    } catch (_error) {
      if (startedAt === revision && snapshot === currentReport) copyStatus.textContent = "复制失败，请手动选择报告。";
    }
  });
})();
