(() => {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.querySelector("[data-tide-theme]");
  const themeModes = ["system", "light", "dark"];
  const themeLabels = { system: "跟随系统", light: "浅色航图", dark: "夜航模式" };

  const readStoredTheme = () => {
    try {
      const stored = window.localStorage.getItem("harbor-column-theme");
      return themeModes.includes(stored) ? stored : "system";
    } catch (_error) {
      return "system";
    }
  };

  const applyTheme = (mode) => {
    if (mode === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", mode);
    }
    if (themeButton) {
      themeButton.textContent = themeLabels[mode];
      themeButton.dataset.themeMode = mode;
    }
  };

  let currentTheme = readStoredTheme();
  applyTheme(currentTheme);

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      currentTheme = themeModes[(themeModes.indexOf(currentTheme) + 1) % themeModes.length];
      applyTheme(currentTheme);
      try {
        window.localStorage.setItem("harbor-column-theme", currentTheme);
      } catch (_error) {
        /* The preference remains active for this page view. */
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
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    if (!copied) {
      throw new Error("浏览器没有允许复制");
    }
  };

  const passButton = document.querySelector("[data-copy-pass]");
  if (passButton) {
    const passStatus = document.querySelector("[data-pass-status]");
    passButton.addEventListener("click", async () => {
      const originalLabel = passButton.textContent;
      try {
        await copyText(passButton.dataset.copyValue || "");
        passButton.textContent = "已复制";
        if (passStatus) {
          passStatus.textContent = "邀请码已复制到剪贴板。";
        }
      } catch (_error) {
        passButton.textContent = "请手动复制";
        if (passStatus) {
          passStatus.textContent = "当前浏览器未开放剪贴板，请长按代码手动复制。";
        }
      }
      window.setTimeout(() => {
        passButton.textContent = originalLabel;
      }, 1800);
    });
  }

  const filterButtons = Array.from(document.querySelectorAll("[data-wharf-filter]"));
  const dispatches = Array.from(document.querySelectorAll(".dispatch-slip[data-pier]"));
  const filterCount = document.querySelector("[data-wharf-count]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.wharfFilter || "all";
      let visible = 0;
      filterButtons.forEach((item) => {
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
      dispatches.forEach((dispatch) => {
        const show = selected === "all" || dispatch.dataset.pier === selected;
        dispatch.hidden = !show;
        if (show) {
          visible += 1;
        }
      });
      if (filterCount) {
        filterCount.textContent = "显示 " + visible + " 篇";
      }
    });
  });

  const setInvalid = (field, invalid) => {
    if (!field) {
      return;
    }
    if (invalid) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
  };

  const setResult = (form, status, title, detail, copyValue) => {
    const result = form.parentElement.querySelector("[data-instrument-result]");
    if (!result) {
      return;
    }
    const statusNode = result.querySelector("span");
    const titleNode = result.querySelector("strong");
    const detailNode = result.querySelector("p");
    const copyButton = result.querySelector("[data-copy-output]");
    const value = copyValue || "";
    result.classList.toggle("is-error", status === "ERROR");
    result.classList.toggle("is-ok", status === "MEASURED");
    if (statusNode) {
      statusNode.textContent = status;
    }
    if (titleNode) {
      titleNode.textContent = title;
    }
    if (detailNode) {
      detailNode.textContent = detail;
    }
    result.dataset.copyText = value;
    if (copyButton) {
      copyButton.disabled = !value;
      copyButton.textContent = "复制结果";
    }
  };

  const markAllValid = (form) => {
    form.querySelectorAll("input, textarea").forEach((field) => setInvalid(field, false));
  };

  const measureReadtime = (form) => {
    const field = form.elements.namedItem("text");
    const value = String(field.value || "").trim();
    const invalid = value.length === 0;
    setInvalid(field, invalid);
    if (invalid) {
      setResult(form, "ERROR", "先放入一段文字", "空白内容无法估算。请输入至少一个可见字符。");
      return;
    }
    const cjkMatches = value.match(/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g);
    const latinMatches = value.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g);
    const cjkCount = cjkMatches ? cjkMatches.length : 0;
    const wordCount = latinMatches ? latinMatches.length : 0;
    const minutes = Math.max(1, Math.ceil(cjkCount / 300 + wordCount / 220));
    const title = "约 " + minutes + " 分钟";
    const detail = "中文字符 " + cjkCount + " 个 · 拉丁单词 " + wordCount +
      " 个\n按中文 300 字/分钟、拉丁文字 220 词/分钟估算。";
    setResult(form, "MEASURED", title, detail, title + "；" + detail.replace("\n", " "));
  };

  const measureHeadings = (form) => {
    const field = form.elements.namedItem("text");
    const value = String(field.value || "").trim();
    const headings = value.split(/\r?\n/).map((line, lineIndex) => {
      const match = line.match(/^(#{1,6})\s+\S/);
      return match ? { level: match[1].length, line: lineIndex + 1 } : null;
    }).filter(Boolean);
    const invalid = headings.length === 0;
    setInvalid(field, invalid);
    if (invalid) {
      setResult(form, "ERROR", "没有读到 Markdown 标题", "请用“## 标题”这样的格式输入至少一个标题。");
      return;
    }
    const skips = [];
    for (let index = 1; index < headings.length; index += 1) {
      if (headings[index].level - headings[index - 1].level > 1) {
        skips.push(headings[index - 1].level + "→" + headings[index].level +
          "（第 " + headings[index].line + " 行）");
      }
    }
    const deepest = Math.max(...headings.map((heading) => heading.level));
    const title = skips.length ? "发现 " + skips.length + " 处跨级" : "标题航道连续";
    const detail = "共 " + headings.length + " 个标题 · 最深 H" + deepest + "\n" +
      (skips.length ? skips.join("；") : "没有从浅层直接跳到两级以上的情况。");
    setResult(form, "MEASURED", title, detail, title + "；" + detail.replace("\n", " "));
  };

  const measureExcerpt = (form) => {
    const field = form.elements.namedItem("text");
    const targetField = form.elements.namedItem("target");
    const value = String(field.value || "").trim();
    const target = Number(targetField.value);
    const textInvalid = value.length === 0;
    const targetInvalid = !Number.isInteger(target) || target < 1 || target > 500;
    setInvalid(field, textInvalid);
    setInvalid(targetField, targetInvalid);
    if (textInvalid || targetInvalid) {
      setResult(form, "ERROR", "输入还不能测量", "摘要不能为空；目标字符数须为 1–500 的整数。");
      return;
    }
    const count = Array.from(value).length;
    const difference = count - target;
    const title = count + " / " + target + " 字符";
    let detail = "刚好达到目标字符数。";
    if (difference > 0) {
      detail = "超过目标 " + difference + " 个字符；可优先删去重复限定语。";
    } else if (difference < 0) {
      detail = "距离目标还差 " + Math.abs(difference) + " 个字符；不必为了凑数补空话。";
    }
    setResult(form, "MEASURED", title, detail, title + "；" + detail);
  };

  const measureWatch = (form) => {
    const startField = form.elements.namedItem("start");
    const daysField = form.elements.namedItem("days");
    const roundsField = form.elements.namedItem("rounds");
    const startValue = String(startField.value || "");
    const days = Number(daysField.value);
    const rounds = Number(roundsField.value);
    const startInvalid = !/^\d{4}-\d{2}-\d{2}$/.test(startValue);
    const daysInvalid = !Number.isInteger(days) || days < 1 || days > 365;
    const roundsInvalid = !Number.isInteger(rounds) || rounds < 1 || rounds > 12;
    setInvalid(startField, startInvalid);
    setInvalid(daysField, daysInvalid);
    setInvalid(roundsField, roundsInvalid);
    if (startInvalid || daysInvalid || roundsInvalid) {
      setResult(form, "ERROR", "日期参数不完整", "请选择起始日期；间隔须为 1–365 天，轮数须为 1–12。");
      return;
    }
    const startDate = new Date(startValue + "T00:00:00Z");
    if (Number.isNaN(startDate.getTime())) {
      setInvalid(startField, true);
      setResult(form, "ERROR", "日期无法识别", "请使用日期选择器重新选择一个有效日期。");
      return;
    }
    const dates = [];
    for (let round = 1; round <= rounds; round += 1) {
      const date = new Date(startDate.getTime() + days * round * 86400000);
      dates.push("第 " + round + " 轮：" +
        date.toLocaleDateString("zh-CN", { timeZone: "UTC" }));
    }
    const title = rounds + " 轮复核值更";
    const detail = dates.join("\n");
    setResult(form, "MEASURED", title, detail, title + "；" + dates.join("；"));
  };

  const measureBallast = (form) => {
    const keys = ["primary", "secondary", "opinion"];
    const fields = keys.map((key) => form.elements.namedItem(key));
    const values = fields.map((field) => Number(field.value));
    let invalid = false;
    fields.forEach((field, index) => {
      const bad = !Number.isFinite(values[index]) || values[index] < 0 ||
        !Number.isInteger(values[index]);
      setInvalid(field, bad);
      invalid = invalid || bad;
    });
    const total = values.reduce((sum, value) => sum + value, 0);
    if (invalid || total <= 0) {
      if (total <= 0) {
        fields.forEach((field) => setInvalid(field, true));
      }
      setResult(form, "ERROR", "来源数量无效", "三项都须为非负整数，且合计至少为 1 条。");
      return;
    }
    const rawShares = values.map((value) => (value / total) * 100);
    const shares = rawShares.map(Math.floor);
    let remainder = 100 - shares.reduce((sum, value) => sum + value, 0);
    const remainderOrder = rawShares.map((value, index) => ({
      index,
      fraction: value - Math.floor(value)
    })).sort((a, b) => b.fraction - a.fraction);
    for (let index = 0; index < remainder; index += 1) {
      shares[remainderOrder[index].index] += 1;
    }
    const title = total + " 条来源";
    const detail = "原始来源 " + shares[0] + "% · 二手解释 " + shares[1] +
      "% · 观点材料 " + shares[2] + "%\n占比只描述结构，不代表来源已经可靠。";
    setResult(form, "MEASURED", title, detail, title + "；" + detail.replace("\n", " "));
  };

  const handlers = {
    readtime: measureReadtime,
    headings: measureHeadings,
    excerpt: measureExcerpt,
    watch: measureWatch,
    ballast: measureBallast
  };

  document.querySelectorAll("[data-instrument]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      markAllValid(form);
      const handler = handlers[form.dataset.instrument];
      if (handler) {
        handler(form);
      }
    });
    form.addEventListener("reset", () => {
      markAllValid(form);
      window.setTimeout(() => {
        setResult(form, "READY", "等待输入", "结果会留在这张深色仪表盘里。");
      }, 0);
    });
  });

  document.querySelectorAll("[data-copy-output]").forEach((button) => {
    button.addEventListener("click", async () => {
      const result = button.closest("[data-instrument-result]");
      const value = result ? result.dataset.copyText || "" : "";
      try {
        await copyText(value);
        button.textContent = "结果已复制";
      } catch (_error) {
        button.textContent = "请手动选择结果";
      }
      window.setTimeout(() => {
        button.textContent = "复制结果";
      }, 1800);
    });
  });
})();
