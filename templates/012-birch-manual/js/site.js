(() => {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.querySelector("[data-birch-theme]");

  const storedTheme = () => {
    try {
      return window.localStorage.getItem("birch-manual-mode") === "night" ? "night" : "day";
    } catch (_error) {
      return "day";
    }
  };

  const applyTheme = (mode) => {
    if (mode === "night") {
      root.setAttribute("data-birch-mode", "night");
    } else {
      root.removeAttribute("data-birch-mode");
    }
    if (themeButton) {
      themeButton.textContent = mode === "night" ? "日光" : "夜读";
      themeButton.setAttribute("aria-pressed", mode === "night" ? "true" : "false");
    }
  };

  let theme = storedTheme();
  applyTheme(theme);

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      theme = theme === "night" ? "day" : "night";
      applyTheme(theme);
      try {
        window.localStorage.setItem("birch-manual-mode", theme);
      } catch (_error) {
        /* The visual choice still remains active for this page. */
      }
    });
  }

  const copyText = async (value) => {
    if (!value) {
      throw new Error("没有可复制的内容");
    }
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
    if (!copied) {
      throw new Error("复制未获浏览器许可");
    }
  };

  const codeButton = document.querySelector("[data-copy-code]");
  if (codeButton) {
    const copyStatus = document.querySelector("[data-copy-status]");
    codeButton.addEventListener("click", async () => {
      const original = codeButton.textContent;
      try {
        await copyText(codeButton.dataset.copyValue || "");
        codeButton.textContent = "已复制";
        if (copyStatus) copyStatus.textContent = "邀请码已复制，可以在对应页面手动填写。";
      } catch (_error) {
        codeButton.textContent = "请手动复制";
        if (copyStatus) copyStatus.textContent = "当前浏览器没有开放剪贴板，请长按代码复制。";
      }
      window.setTimeout(() => {
        codeButton.textContent = original;
      }, 1700);
    });
  }

  const setInvalid = (field, invalid) => {
    if (!field) return;
    if (invalid) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  };

  const resultFor = (form) => form.parentElement.querySelector("[data-tool-output]");

  const publishResult = (form, status, title, detail, copyValue) => {
    const output = resultFor(form);
    if (!output) return;
    const statusNode = output.querySelector("span");
    const titleNode = output.querySelector("strong");
    const detailNode = output.querySelector("p");
    const copyButton = output.querySelector("[data-copy-output]");
    output.classList.toggle("is-error", status === "ERROR");
    output.classList.toggle("is-measured", status === "MEASURED");
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

  const measureReading = (form) => {
    const field = form.elements.namedItem("text");
    const paceField = form.elements.namedItem("pace");
    const value = String(field.value || "").trim();
    setInvalid(field, value.length === 0);
    if (!value) {
      publishResult(form, "ERROR", "还没有可测文字", "粘贴至少一个可见字符后再测量。", "");
      return;
    }
    const pace = paceField ? paceField.value : "normal";
    const rates = {
      quick: { cjk: 420, latin: 300, label: "快速浏览" },
      normal: { cjk: 300, latin: 220, label: "一般阅读" },
      careful: { cjk: 190, latin: 140, label: "仔细核对" }
    };
    const selected = rates[pace] || rates.normal;
    const cjk = (value.match(/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g) || []).length;
    const latin = (value.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length;
    const punctuation = (value.match(/[，。！？；：,.!?;:]/g) || []).length;
    const minutes = Math.max(1, Math.ceil(cjk / selected.cjk + latin / selected.latin));
    const title = "约 " + minutes + " 分钟";
    const detail = selected.label + " · 中文字符 " + cjk + " · 拉丁单词 " + latin + " · 标点 " + punctuation;
    publishResult(form, "MEASURED", title, detail, title + "；" + detail);
  };

  const measureOutline = (form) => {
    const field = form.elements.namedItem("text");
    const includeDuplicates = form.elements.namedItem("duplicates");
    const value = String(field.value || "").trim();
    const headings = value.split(/\r?\n/).map((line, index) => {
      const found = line.match(/^(#{1,6})\s+(.+?)\s*$/);
      return found ? { level: found[1].length, title: found[2].trim(), line: index + 1 } : null;
    }).filter(Boolean);
    setInvalid(field, headings.length === 0);
    if (!headings.length) {
      publishResult(form, "ERROR", "没有读到 Markdown 标题", "请按“## 小标题”的格式输入至少一行。", "");
      return;
    }
    const jumps = [];
    const duplicateTitles = [];
    const seen = new Set();
    headings.forEach((heading, index) => {
      if (index && heading.level - headings[index - 1].level > 1) {
        jumps.push("第 " + heading.line + " 行 H" + headings[index - 1].level + "→H" + heading.level);
      }
      const normalized = heading.title.toLocaleLowerCase();
      if (seen.has(normalized) && includeDuplicates.checked) duplicateTitles.push(heading.title);
      seen.add(normalized);
    });
    const h1Count = headings.filter((heading) => heading.level === 1).length;
    const title = jumps.length || h1Count !== 1 || duplicateTitles.length ? "发现需要复核的层级" : "标题结构连续";
    const notes = [
      "标题 " + headings.length + " 个",
      "H1 " + h1Count + " 个",
      jumps.length ? "跨级：" + jumps.join("、") : "无跨级",
      duplicateTitles.length ? "重复：" + duplicateTitles.join("、") : "无重复标题"
    ];
    publishResult(form, "MEASURED", title, notes.join("\n"), title + "；" + notes.join("；"));
  };

  const measureExcerpt = (form) => {
    const titleField = form.elements.namedItem("title");
    const descField = form.elements.namedItem("description");
    const titleTargetField = form.elements.namedItem("titleTarget");
    const descTargetField = form.elements.namedItem("descTarget");
    const titleValue = String(titleField.value || "").trim();
    const descValue = String(descField.value || "").trim();
    const titleTarget = Number(titleTargetField.value);
    const descTarget = Number(descTargetField.value);
    const titleBad = !titleValue;
    const descBad = !descValue;
    const titleTargetBad = !Number.isInteger(titleTarget) || titleTarget < 10 || titleTarget > 120;
    const descTargetBad = !Number.isInteger(descTarget) || descTarget < 40 || descTarget > 300;
    setInvalid(titleField, titleBad);
    setInvalid(descField, descBad);
    setInvalid(titleTargetField, titleTargetBad);
    setInvalid(descTargetField, descTargetBad);
    if (titleBad || descBad || titleTargetBad || descTargetBad) {
      publishResult(form, "ERROR", "输入不完整", "标题与摘要不能为空；两个参考上限也要在允许范围内。", "");
      return;
    }
    const titleCount = Array.from(titleValue).length;
    const descCount = Array.from(descValue).length;
    const sentenceComplete = /[。！？.!?]$/.test(descValue);
    const notes = [
      "标题 " + titleCount + " / " + titleTarget + " 字符" + (titleCount > titleTarget ? "（超过参考上限）" : ""),
      "摘要 " + descCount + " / " + descTarget + " 字符" + (descCount > descTarget ? "（超过参考上限）" : ""),
      sentenceComplete ? "摘要以完整句结束" : "摘要末尾不像完整句"
    ];
    publishResult(form, "MEASURED", "校样已完成", notes.join("\n"), notes.join("；"));
  };

  const measureCalendar = (form) => {
    const startField = form.elements.namedItem("start");
    const daysField = form.elements.namedItem("days");
    const roundsField = form.elements.namedItem("rounds");
    const includeStart = form.elements.namedItem("includeStart");
    const startValue = String(startField.value || "");
    const days = Number(daysField.value);
    const rounds = Number(roundsField.value);
    const startBad = !/^\d{4}-\d{2}-\d{2}$/.test(startValue);
    const daysBad = !Number.isInteger(days) || days < 1 || days > 365;
    const roundsBad = !Number.isInteger(rounds) || rounds < 1 || rounds > 12;
    setInvalid(startField, startBad);
    setInvalid(daysField, daysBad);
    setInvalid(roundsField, roundsBad);
    if (startBad || daysBad || roundsBad) {
      publishResult(form, "ERROR", "日期参数不完整", "起始日期必填；间隔为 1–365 天，轮数为 1–12。", "");
      return;
    }
    const start = new Date(startValue + "T00:00:00Z");
    if (Number.isNaN(start.getTime())) {
      setInvalid(startField, true);
      publishResult(form, "ERROR", "日期无法识别", "请重新选择有效起始日期。", "");
      return;
    }
    const rows = [];
    if (includeStart.checked) rows.push("第 0 次：" + start.toLocaleDateString("zh-CN", { timeZone: "UTC" }));
    for (let round = 1; round <= rounds; round += 1) {
      const next = new Date(start.getTime() + days * round * 86400000);
      rows.push("第 " + round + " 次：" + next.toLocaleDateString("zh-CN", { timeZone: "UTC" }));
    }
    const title = rounds + " 轮复核日期";
    publishResult(form, "MEASURED", title, rows.join("\n"), title + "；" + rows.join("；"));
  };

  const measureSources = (form) => {
    const names = ["official", "primary", "secondary", "claims"];
    const values = {};
    let invalid = false;
    names.forEach((name) => {
      const field = form.elements.namedItem(name);
      const value = Number(field.value);
      const bad = !Number.isInteger(value) || value < (name === "claims" ? 1 : 0) || value > 99;
      setInvalid(field, bad);
      invalid = invalid || bad;
      values[name] = value;
    });
    const total = values.official + values.primary + values.secondary;
    if (!invalid && total === 0) {
      ["official", "primary", "secondary"].forEach((name) => setInvalid(form.elements.namedItem(name), true));
      invalid = true;
    }
    if (invalid) {
      publishResult(form, "ERROR", "来源数字不可计算", "来源至少有 1 条；各项须为 0–99 的整数，关键结论为 1–99。", "");
      return;
    }
    const pct = (value) => Math.round(value / total * 100);
    const supported = Math.min(total, values.claims);
    const title = total + " 条来源 / " + values.claims + " 个关键结论";
    const detail = "官方 " + pct(values.official) + "% · 原始 " + pct(values.primary) + "% · 二手 " + pct(values.secondary) + "%\n按一条来源至少支撑一个结论粗看，当前最多覆盖 " + supported + " 个结论；仍需人工核对相关性。";
    publishResult(form, "MEASURED", title, detail, title + "；" + detail.replace("\n", " "));
  };

  const handlers = {
    reading: measureReading,
    outline: measureOutline,
    excerpt: measureExcerpt,
    calendar: measureCalendar,
    sources: measureSources
  };

  document.querySelectorAll("form[data-birch-tool]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearValidity(form);
      const handler = handlers[form.dataset.birchTool];
      if (handler) handler(form);
    });
    form.addEventListener("reset", () => {
      window.setTimeout(() => {
        clearValidity(form);
        publishResult(form, "READY", "等待输入", "结果会留在本页，不会发送到外部服务。", "");
      }, 0);
    });
  });

  document.querySelectorAll("[data-copy-output]").forEach((button) => {
    button.addEventListener("click", async () => {
      const output = button.closest("[data-tool-output]");
      const value = output ? output.dataset.copyText || "" : "";
      if (!value) return;
      const original = button.textContent;
      try {
        await copyText(value);
        button.textContent = "结果已复制";
      } catch (_error) {
        button.textContent = "复制失败，请手动选择";
      }
      window.setTimeout(() => {
        button.textContent = original;
      }, 1700);
    });
  });
})();
