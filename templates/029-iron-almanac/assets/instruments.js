"use strict";
(() => {
  const form = document.querySelector("[data-instrument]");
  if (!form) return;
  const output = form.querySelector("[data-result]");
  const error = form.querySelector("[data-form-error]");
  const copy = form.querySelector("[data-copy-result]");
  let lastText = "";
  const toNumber = (value) => String(value).trim() === "" ? Number.NaN : Number(value);
  const numberList = (value) => String(value).trim() === "" ? [] : value.split(/[\s,;]+/).filter(Boolean).map(Number).filter(Number.isFinite);
  const show = (headline, detail) => { lastText = `${headline}\n${detail}`; output.querySelector("strong").textContent = headline; output.querySelector("small").textContent = detail; error.textContent = ""; };
  const fail = (message) => { error.textContent = message; lastText = ""; output.querySelector("strong").textContent = "请检查输入"; output.querySelector("small").textContent = "修正字段后重新计算。"; };
  const invalidate = () => { lastText = ""; output.querySelector("strong").textContent = "结果待更新"; output.querySelector("small").textContent = "输入已改变，请重新计算。"; error.textContent = ""; };
  form.addEventListener("input", invalidate);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const kind = form.dataset.instrument;
    if (kind === "cagr-path") {
      const start = toNumber(data.get("start")); const end = toNumber(data.get("end")); const periods = toNumber(data.get("periods"));
      if (!(start > 0) || !(end >= 0) || !Number.isInteger(periods) || periods < 1 || periods > 100) return fail("起点须大于 0，终点不得为负，期间数须为 1–100 的整数。");
      const rate = end === 0 ? -1 : Math.pow(end / start, 1 / periods) - 1;
      const path = Array.from({ length: periods + 1 }, (_, i) => `${i}: ${(start * Math.pow(1 + rate, i)).toFixed(2)}`).join(" · ");
      show(`${(rate * 100).toFixed(2)}% / 期`, `等比路径 ${path}`);
    } else if (kind === "base-index") {
      const values = numberList(String(data.get("values"))); const base = toNumber(data.get("base"));
      if (values.length < 2 || !Number.isInteger(base) || base < 1 || base > values.length || values[base - 1] === 0) return fail("至少输入两个有效数值；基期序号须落在序列内，且基期值不能为 0。");
      const indexed = values.map((value) => value / values[base - 1] * 100);
      show(`基期 ${base} = 100`, indexed.map((value, i) => `${i + 1}: ${value.toFixed(2)}`).join(" · "));
    } else if (kind === "percentile-rank") {
      const values = numberList(String(data.get("values"))); const target = toNumber(data.get("target"));
      if (!values.length || !Number.isFinite(target)) return fail("请输入至少一个有效样本和一个有效目标值。");
      const less = values.filter(v => v < target).length / values.length * 100; const atMost = values.filter(v => v <= target).length / values.length * 100;
      show(`${less.toFixed(1)}% < 目标`, `不大于目标的样本占 ${atMost.toFixed(1)}%；样本数 ${values.length}。`);
    } else if (kind === "yoy-table") {
      const rows = String(data.get("pairs")).split(/\n+/).map(line => line.split(/[,，\s]+/)).filter(parts => parts.length >= 2).map(parts => [parts[0], Number(parts[1])]);
      if (rows.length < 2 || rows.some(row => !row[0] || !Number.isFinite(row[1]))) return fail("请至少输入两行“年份,数值”，数值必须有效。");
      const result = rows.slice(1).map((row, i) => { const previous = rows[i][1]; const delta = row[1] - previous; const rate = previous === 0 ? "不可计算" : `${(delta / Math.abs(previous) * 100).toFixed(2)}%`; return `${row[0]}: ${delta >= 0 ? "+" : ""}${delta.toFixed(2)} / ${rate}`; });
      show(`${rows.length} 个年份`, result.join("\n"));
    } else if (kind === "unit-scale") {
      const value = toNumber(data.get("value")); const from = toNumber(data.get("from")); const to = toNumber(data.get("to"));
      if (![value, from, to].every(Number.isFinite) || from <= 0 || to <= 0) return fail("请输入有效数值并选择有效单位。");
      const converted = value * from / to;
      show(converted.toLocaleString("zh-CN", { maximumFractionDigits: 8 }), `换算式：${value} × ${from} ÷ ${to}`);
    }
  });
  form.addEventListener("reset", () => setTimeout(() => { lastText = ""; error.textContent = ""; output.querySelector("strong").textContent = "等待输入"; output.querySelector("small").textContent = "修改任一输入后，旧结果会立即失效。"; }, 0));
  copy.addEventListener("click", async () => {
    if (!lastText) return fail("请先完成一次有效计算，再复制结果。");
    try { await navigator.clipboard.writeText(lastText); copy.textContent = "已复制"; }
    catch { copy.textContent = "复制权限不可用"; }
  });
})();
