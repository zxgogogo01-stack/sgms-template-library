(() => {
  "use strict";
  const form = document.querySelector("form[data-instrument]");
  if (!form) return;
  const output = document.querySelector("[data-output]");
  const error = document.querySelector("[data-error]");
  const status = document.querySelector("[data-result-status]");
  const empty = "[[TOOL_RESULT_EMPTY]]";
  const show = (text) => { output.textContent = text; error.textContent = ""; };
  const fail = (message) => { output.textContent = empty; error.textContent = message; };
  const decimal = (value, message) => {
    if (!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(String(value).trim())) throw new Error(message);
    const number = Number(value);
    if (!Number.isFinite(number)) throw new Error(message);
    return number;
  };
  const cents = (value) => Math.round((value + Number.EPSILON) * 100);
  const money = (value) => (value / 100).toFixed(2);
  const luhnValid = (digits) => {
    let sum = 0;
    let double = false;
    for (let index = digits.length - 1; index >= 0; index -= 1) {
      let digit = Number(digits[index]);
      if (double) { digit *= 2; if (digit > 9) digit -= 9; }
      sum += digit;
      double = !double;
    }
    return sum % 10 === 0;
  };
  const checkDigit = (base) => {
    for (let digit = 0; digit <= 9; digit += 1) if (luhnValid(base + digit)) return String(digit);
    return "0";
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    try {
      if (form.dataset.instrument === "split") {
        const total = decimal(data.get("total"), "[[TOOL_01_FORMAT_ERROR]]");
        const people = Number(data.get("people"));
        if (total <= 0 || total > 9999999.99) throw new Error("[[TOOL_01_TOTAL_ERROR]]");
        if (!Number.isInteger(people) || people < 1 || people > 100) throw new Error("[[TOOL_01_PEOPLE_ERROR]]");
        const totalCents = cents(total);
        const base = Math.floor(totalCents / people);
        const remainder = totalCents % people;
        const rows = Array.from({ length: people }, (_, index) => `${String(index + 1).padStart(2, "0")}  ${money(base + (index < remainder ? 1 : 0))}${index < remainder ? "  +0.01" : ""}`);
        show(`[[TOOL_01_TOTAL_LABEL]] ${money(totalCents)}\n[[TOOL_01_BASE_LABEL]] ${money(base)}\n[[TOOL_01_REMAINDER_LABEL]] ${remainder}\n\n${rows.join("\n")}`);
      } else if (form.dataset.instrument === "unit") {
        const value = decimal(data.get("value"), "[[TOOL_02_FORMAT_ERROR]]");
        if (Math.abs(value) > 1e12) throw new Error("[[TOOL_02_RANGE_ERROR]]");
        const factor = { mm: 1, cm: 10, m: 1000, in: 25.4, ft: 304.8 };
        const from = String(data.get("from"));
        const to = String(data.get("to"));
        if (!(from in factor) || !(to in factor)) throw new Error("[[TOOL_02_UNIT_ERROR]]");
        const result = value * factor[from] / factor[to];
        show(`${value} ${from} = ${Number(result.toPrecision(12))} ${to}`);
      } else if (form.dataset.instrument === "tolerance") {
        const nominal = decimal(data.get("nominal"), "[[TOOL_03_NOMINAL_ERROR]]");
        const values = String(data.get("tolerances") || "").split(/[\s,]+/).filter(Boolean).map((value) => decimal(value, "[[TOOL_03_FORMAT_ERROR]]"));
        if (!values.length || values.length > 100 || values.some((value) => value < 0 || value > 1e9)) throw new Error("[[TOOL_03_RANGE_ERROR]]");
        const tolerance = data.get("mode") === "rss" ? Math.sqrt(values.reduce((sum, value) => sum + value ** 2, 0)) : values.reduce((sum, value) => sum + value, 0);
        show(`[[TOOL_03_NOMINAL_LABEL]] ${nominal}\n[[TOOL_03_STACK_LABEL]] ±${Number(tolerance.toPrecision(12))}\n[[TOOL_03_RANGE_LABEL]] ${Number((nominal - tolerance).toPrecision(12))} … ${Number((nominal + tolerance).toPrecision(12))}`);
      } else if (form.dataset.instrument === "ratio") {
        const total = decimal(data.get("total"), "[[TOOL_04_TOTAL_ERROR]]");
        if (total <= 0 || total > 9999999.99) throw new Error("[[TOOL_04_TOTAL_ERROR]]");
        const rows = String(data.get("weights") || "").split(/\r?\n/).map((row) => row.trim()).filter(Boolean).map((row) => {
          const match = row.match(/^([^:]{1,60}):\s*(\d+(?:\.\d+)?)$/);
          if (!match) throw new Error("[[TOOL_04_FORMAT_ERROR]]: " + row);
          return { name: match[1].trim(), weight: Number(match[2]) };
        });
        if (!rows.length || rows.length > 100 || rows.some((row) => row.weight <= 0)) throw new Error("[[TOOL_04_RANGE_ERROR]]");
        if (new Set(rows.map((row) => row.name.toLocaleLowerCase())).size !== rows.length) throw new Error("[[TOOL_04_DUPLICATE_ERROR]]");
        const totalCents = cents(total);
        const weightSum = rows.reduce((sum, row) => sum + row.weight, 0);
        const shares = rows.map((row, index) => { const raw = totalCents * row.weight / weightSum; return { ...row, index, amount: Math.floor(raw), fraction: raw - Math.floor(raw) }; });
        let remaining = totalCents - shares.reduce((sum, row) => sum + row.amount, 0);
        [...shares].sort((left, right) => right.fraction - left.fraction || left.index - right.index).forEach((row) => { if (remaining > 0) { row.amount += 1; remaining -= 1; } });
        show(shares.map((row) => `${row.name}  ${money(row.amount)}  (${row.weight})`).join("\n") + `\n\n[[TOOL_04_CHECK_LABEL]] ${money(shares.reduce((sum, row) => sum + row.amount, 0))}`);
      } else {
        const digits = String(data.get("code") || "").replace(/[ -]/g, "");
        if (!/^\d{1,64}$/.test(digits)) throw new Error("[[TOOL_05_FORMAT_ERROR]]");
        if (data.get("mode") === "append") show(`[[TOOL_05_DIGIT_LABEL]] ${checkDigit(digits)}\n[[TOOL_05_COMPLETE_LABEL]] ${digits + checkDigit(digits)}`);
        else {
          if (digits.length < 2) throw new Error("[[TOOL_05_LENGTH_ERROR]]");
          show(luhnValid(digits) ? "[[TOOL_05_VALID]]" : "[[TOOL_05_INVALID]]");
        }
      }
    } catch (caught) { fail(caught instanceof Error ? caught.message : "[[TOOL_GENERIC_ERROR]]"); }
  });
  form.addEventListener("input", () => { output.textContent = empty; error.textContent = ""; if (status) status.textContent = ""; });
  form.addEventListener("reset", () => requestAnimationFrame(() => { output.textContent = empty; error.textContent = ""; if (status) status.textContent = ""; }));
  document.querySelector("[data-copy-output]")?.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(output.textContent.trim()); if (status) status.textContent = "[[COPY_SUCCESS]]"; }
    catch { if (status) status.textContent = "[[COPY_FALLBACK]]"; }
  });
})();
