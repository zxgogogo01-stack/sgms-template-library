(() => {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.querySelector("[data-signal-theme]");

  const storedMode = () => {
    try {
      return window.localStorage.getItem("signal-digest-mode") === "dark" ? "dark" : "light";
    } catch (_error) {
      return "light";
    }
  };

  const applyMode = (mode) => {
    if (mode === "dark") root.setAttribute("data-signal-mode", "dark");
    else root.removeAttribute("data-signal-mode");
    if (themeButton) {
      themeButton.textContent = mode === "dark" ? "亮场" : "暗场";
      themeButton.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
    }
  };

  let mode = storedMode();
  applyMode(mode);
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      mode = mode === "dark" ? "light" : "dark";
      applyMode(mode);
      try {
        window.localStorage.setItem("signal-digest-mode", mode);
      } catch (_error) {
        /* The current page can still switch theme without persistence. */
      }
    });
  }

  const copyText = async (value) => {
    if (!value) throw new Error("没有可复制的内容");
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const helper = document.createElement("textarea");
    helper.value = value;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    if (!copied) throw new Error("复制未获浏览器许可");
  };

  const signalCopy = document.querySelector("[data-copy-signal]");
  if (signalCopy) {
    const note = document.querySelector("[data-copy-note]");
    signalCopy.addEventListener("click", async () => {
      const initial = signalCopy.textContent;
      try {
        await copyText(signalCopy.dataset.copyValue || "");
        signalCopy.textContent = "已复制";
        if (note) note.textContent = "邀请码已复制，可前往对应页面手动填写。";
      } catch (_error) {
        signalCopy.textContent = "请手动复制";
        if (note) note.textContent = "浏览器未开放剪贴板，请长按或选中代码复制。";
      }
      window.setTimeout(() => {
        signalCopy.textContent = initial;
      }, 1700);
    });
  }

  const formatNumber = (value, digits = 4) => new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: digits
  }).format(value);

  const setInvalid = (field, invalid) => {
    if (!field) return;
    if (invalid) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  };

  const parseNumbers = (value) => String(value || "")
    .trim()
    .split(/[\s,，;；]+/)
    .filter(Boolean)
    .map(Number);

  const resultFor = (form) => form.closest(".meter-workbench").querySelector("[data-meter-output]");

  const publishResult = (form, status, title, detail, copyValue) => {
    const output = resultFor(form);
    if (!output) return;
    const statusNode = output.querySelector("span");
    const titleNode = output.querySelector("strong");
    const detailNode = output.querySelector("p");
    const copyButton = output.querySelector("[data-copy-meter]");
    output.classList.toggle("is-error", status === "ERROR");
    output.classList.toggle("is-ready", status === "MEASURED");
    if (statusNode) statusNode.textContent = status;
    if (titleNode) titleNode.textContent = title;
    if (detailNode) detailNode.textContent = detail;
    output.dataset.copyText = copyValue || "";
    if (copyButton) {
      copyButton.disabled = !copyValue;
      copyButton.textContent = "复制结果";
    }
  };

  const clearValidity = (form) => {
    form.querySelectorAll("input, textarea").forEach((field) => setInvalid(field, false));
  };

  const measureChange = (form) => {
    const startField = form.elements.namedItem("start");
    const endField = form.elements.namedItem("end");
    const start = Number(startField.value);
    const end = Number(endField.value);
    const startBad = startField.value === "" || !Number.isFinite(start) || start === 0;
    const endBad = endField.value === "" || !Number.isFinite(end);
    setInvalid(startField, startBad);
    setInvalid(endField, endBad);
    if (startBad || endBad) {
      publishResult(form, "ERROR", "变化率无法计算", "期初值和期末值都要是有效数字，且期初值不能为 0。", "");
      return;
    }
    const change = (end - start) / Math.abs(start) * 100;
    const direction = change > 0 ? "上升" : change < 0 ? "下降" : "不变";
    const absolute = end - start;
    const title = direction + " " + formatNumber(Math.abs(change), 2) + "%";
    const details = ["期初 " + formatNumber(start) + " · 期末 " + formatNumber(end)];
    if (form.elements.namedItem("absolute").checked) details.push("绝对差值 " + formatNumber(absolute));
    publishResult(form, "MEASURED", title, details.join("\n"), title + "；" + details.join("；"));
  };

  const measureRange = (form) => {
    const lowField = form.elements.namedItem("low");
    const currentField = form.elements.namedItem("current");
    const highField = form.elements.namedItem("high");
    const low = Number(lowField.value);
    const current = Number(currentField.value);
    const high = Number(highField.value);
    const lowBad = lowField.value === "" || !Number.isFinite(low);
    const currentBad = currentField.value === "" || !Number.isFinite(current);
    const highBad = highField.value === "" || !Number.isFinite(high) || (!lowBad && high <= low);
    setInvalid(lowField, lowBad || (!highBad && high <= low));
    setInvalid(currentField, currentBad);
    setInvalid(highField, highBad);
    if (lowBad || currentBad || highBad) {
      publishResult(form, "ERROR", "区间无法成立", "三个输入都要是有效数字，并且高点必须大于低点。", "");
      return;
    }
    const position = (current - low) / (high - low) * 100;
    const location = current < low ? "低于区间" : current > high ? "高于区间" : current === low ? "位于低点" : current === high ? "位于高点" : "位于区间内";
    const title = formatNumber(position, 2) + "% · " + location;
    const detail = "低点 " + formatNumber(low) + " · 当前 " + formatNumber(current) + " · 高点 " + formatNumber(high);
    publishResult(form, "MEASURED", title, detail, title + "；" + detail);
  };

  const measureAverage = (form) => {
    const valuesField = form.elements.namedItem("values");
    const windowField = form.elements.namedItem("window");
    const values = parseNumbers(valuesField.value);
    const windowSize = Number(windowField.value);
    const valuesBad = values.length < 2 || values.some((value) => !Number.isFinite(value));
    const windowBad = !Number.isInteger(windowSize) || windowSize < 2 || windowSize > 50 || (!valuesBad && windowSize > values.length);
    setInvalid(valuesField, valuesBad);
    setInvalid(windowField, windowBad);
    if (valuesBad || windowBad) {
      publishResult(form, "ERROR", "滚动窗口无法计算", "请输入至少两个有效数值；窗口须为 2–50 的整数且不能超过数值个数。", "");
      return;
    }
    const rolling = [];
    for (let index = windowSize - 1; index < values.length; index += 1) {
      const windowValues = values.slice(index - windowSize + 1, index + 1);
      rolling.push(windowValues.reduce((sum, value) => sum + value, 0) / windowSize);
    }
    const title = rolling.length + " 个滚动均值";
    const detail = "窗口 " + windowSize + " · " + rolling.map((value, index) => "#" + (index + 1) + " " + formatNumber(value)).join(" · ");
    publishResult(form, "MEASURED", title, detail, title + "；" + detail);
  };

  const quantile = (sorted, fraction) => {
    const position = (sorted.length - 1) * fraction;
    const lower = Math.floor(position);
    const upper = Math.ceil(position);
    if (lower === upper) return sorted[lower];
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
  };

  const measureOutlier = (form) => {
    const valuesField = form.elements.namedItem("values");
    const values = parseNumbers(valuesField.value);
    const factor = Number(form.elements.namedItem("factor").value);
    const valuesBad = values.length < 4 || values.some((value) => !Number.isFinite(value));
    setInvalid(valuesField, valuesBad);
    if (valuesBad || ![1.5, 3].includes(factor)) {
      publishResult(form, "ERROR", "样本不足", "请输入至少四个有效数值，再选择探针强度。", "");
      return;
    }
    const sorted = values.slice().sort((a, b) => a - b);
    const q1 = quantile(sorted, 0.25);
    const q3 = quantile(sorted, 0.75);
    const iqr = q3 - q1;
    const lowFence = q1 - factor * iqr;
    const highFence = q3 + factor * iqr;
    const outliers = sorted.filter((value) => value < lowFence || value > highFence);
    const title = outliers.length ? "发现 " + outliers.length + " 个异常候选" : "未发现异常候选";
    const detail = "Q1 " + formatNumber(q1) + " · Q3 " + formatNumber(q3) + " · IQR " + formatNumber(iqr) + "\n边界 " + formatNumber(lowFence) + " 至 " + formatNumber(highFence) + (outliers.length ? " · 候选 " + outliers.map((value) => formatNumber(value)).join("、") : "");
    publishResult(form, "MEASURED", title, detail, title + "；" + detail.replace("\n", "；"));
  };

  const parseIsoDate = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
    return date;
  };

  const measureCadence = (form) => {
    const datesField = form.elements.namedItem("dates");
    const toleranceField = form.elements.namedItem("tolerance");
    const rawDates = String(datesField.value || "").split(/[\s,，;；]+/).filter(Boolean);
    const dates = rawDates.map(parseIsoDate);
    const tolerance = Number(toleranceField.value);
    const datesBad = rawDates.length < 2 || dates.some((date) => !date) || new Set(rawDates).size !== rawDates.length;
    const toleranceBad = !Number.isInteger(tolerance) || tolerance < 0 || tolerance > 365;
    setInvalid(datesField, datesBad);
    setInvalid(toleranceField, toleranceBad);
    if (datesBad || toleranceBad) {
      publishResult(form, "ERROR", "日期序列无法比较", "请输入至少两个互不重复的有效 YYYY-MM-DD 日期；容许波动须为 0–365 天的整数。", "");
      return;
    }
    dates.sort((a, b) => a - b);
    const gaps = [];
    for (let index = 1; index < dates.length; index += 1) gaps.push((dates[index] - dates[index - 1]) / 86400000);
    const average = gaps.reduce((sum, value) => sum + value, 0) / gaps.length;
    const min = Math.min(...gaps);
    const max = Math.max(...gaps);
    const stable = max - min <= tolerance;
    const title = stable ? "节奏在容许范围内" : "节奏波动超过容许值";
    const detail = "平均间隔 " + formatNumber(average, 2) + " 天 · 最短 " + min + " 天 · 最长 " + max + " 天\n各段：" + gaps.join("、") + " 天";
    publishResult(form, "MEASURED", title, detail, title + "；" + detail.replace("\n", "；"));
  };

  const handlers = {
    change: measureChange,
    range: measureRange,
    average: measureAverage,
    outlier: measureOutlier,
    cadence: measureCadence
  };

  document.querySelectorAll("form[data-signal-tool]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearValidity(form);
      const handler = handlers[form.dataset.signalTool];
      if (handler) handler(form);
    });
    form.addEventListener("reset", () => {
      window.setTimeout(() => {
        clearValidity(form);
        publishResult(form, "STANDBY", "等待输入", "所有计算只在当前页面完成。", "");
      }, 0);
    });
  });

  document.querySelectorAll("[data-copy-meter]").forEach((button) => {
    button.addEventListener("click", async () => {
      const output = button.closest("[data-meter-output]");
      const value = output ? output.dataset.copyText || "" : "";
      if (!value) return;
      const initial = button.textContent;
      try {
        await copyText(value);
        button.textContent = "结果已复制";
      } catch (_error) {
        button.textContent = "复制失败，请手动选择";
      }
      window.setTimeout(() => {
        button.textContent = initial;
      }, 1700);
    });
  });
})();
