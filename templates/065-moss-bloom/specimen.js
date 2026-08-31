(() => {
  "use strict";

  const root = document.documentElement;
  const paperButton = document.querySelector("[data-paper-toggle]");
  const paperKey = "moss-bloom-065-paper";
  const setPaper = (paper) => {
    const next = paper === "night" ? "night" : "day";
    root.dataset.paper = next;
    if (paperButton) {
      paperButton.textContent = next === "night" ? "日藏" : "夜藏";
      paperButton.setAttribute("aria-label", next === "night" ? "切换到日藏主题" : "切换到夜藏主题");
    }
  };
  try {
    setPaper(localStorage.getItem(paperKey) || "day");
  } catch (_error) {
    setPaper("day");
  }
  paperButton?.addEventListener("click", () => {
    const next = root.dataset.paper === "night" ? "day" : "night";
    setPaper(next);
    try {
      localStorage.setItem(paperKey, next);
    } catch (_error) {
      // The visual switch remains usable without storage.
    }
  });

  const drawerButton = document.querySelector(".hb65-drawer-button");
  const drawer = document.querySelector(".hb65-drawer");
  const closeDrawer = (restoreFocus = false) => {
    if (!drawer || !drawerButton) return;
    drawer.classList.remove("hb65-open");
    drawerButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) drawerButton.focus();
  };
  drawerButton?.addEventListener("click", () => {
    if (!drawer) return;
    const opening = !drawer.classList.contains("hb65-open");
    drawer.classList.toggle("hb65-open", opening);
    drawerButton.setAttribute("aria-expanded", String(opening));
    if (opening) drawer.querySelector("a, button")?.focus();
  });
  drawer?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeDrawer();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer?.classList.contains("hb65-open")) closeDrawer(true);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) closeDrawer();
  });

  const copyText = async (value) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const helper = document.createElement("textarea");
    helper.value = value;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.append(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    if (!copied) throw new Error("copy unavailable");
  };
  const bindCopy = (buttonSelector, sourceSelector, statusSelector) => {
    const button = document.querySelector(buttonSelector);
    const source = document.querySelector(sourceSelector);
    const status = document.querySelector(statusSelector);
    button?.addEventListener("click", async () => {
      if (!source || !status) return;
      try {
        await copyText(source.textContent.trim());
        status.textContent = "已复制，请按实际资料补齐后再使用。";
      } catch (_error) {
        status.textContent = "浏览器未允许复制，请手动选择上方文字。";
      }
    });
  };
  bindCopy("[data-copy-handoff]", "[data-handoff-text]", "[data-handoff-status]");
  bindCopy("[data-copy-disclosure]", "[data-disclosure-text]", "[data-disclosure-status]");

  const readingProgress = document.querySelector("[data-reading-progress]");
  if (readingProgress) {
    const updateReading = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100;
      if (window.innerWidth <= 920) {
        readingProgress.style.height = "100%";
        readingProgress.style.width = `${percentage}%`;
      } else {
        readingProgress.style.height = `${percentage}%`;
        readingProgress.style.width = "100%";
      }
    };
    updateReading();
    document.addEventListener("scroll", updateReading, { passive: true });
    window.addEventListener("resize", updateReading);
  }

  const claimForm = document.querySelector("[data-claim-form]");
  if (claimForm) {
    const input = claimForm.querySelector("#hb65-claims");
    const error = claimForm.querySelector("[data-claim-error]");
    const status = claimForm.querySelector("[data-claim-status]");
    const report = document.querySelector(".hb65-scan-report");
    const reportState = report.querySelector("[data-claim-state]");
    const findings = report.querySelector("[data-claim-findings]");
    const note = report.querySelector("[data-claim-note]");
    const copyButton = report.querySelector("[data-copy-claim-report]");
    const copyStatus = report.querySelector("[data-claim-copy-status]");
    const counters = {
      sentence: report.querySelector("[data-sentence-count]"),
      flagged: report.querySelector("[data-flagged-count]"),
      promise: report.querySelector("[data-promise-count]"),
      extreme: report.querySelector("[data-extreme-count]"),
      fresh: report.querySelector("[data-fresh-count]"),
      numeric: report.querySelector("[data-numeric-count]")
    };
    const labels = { promise: "承诺", extreme: "极值", fresh: "时效", numeric: "数字" };
    const lexicon = {
      promise: ["保证", "确保", "一定", "必然", "永久", "零风险", "无风险", "稳赚"],
      extreme: ["最高", "最低", "第一", "最快", "唯一", "全网", "百分之百", "100%"],
      fresh: ["最新", "当前", "目前", "实时", "截至", "现行"]
    };
    const presets = {
      risk: "本方案保证长期稳赚，当前全网最高可达 20%。\n到账一定实时完成。",
      sourced: "截至 2026-01-22，页面显示费率为 0.1%；适用范围为示例账户。来源与访问日期已记录。",
      plain: "先保存原始页面。再标注适用范围和访问时间。无法核实的内容保持待核实状态。"
    };
    let latestReport = "";

    const setPlaceholder = (message = "扫描后按原顺序显示句子与复核标签。") => {
      const paragraph = document.createElement("p");
      paragraph.textContent = message;
      findings.replaceChildren(paragraph);
    };
    const zeroCounters = () => {
      Object.values(counters).forEach((item) => { item.textContent = "0"; });
    };
    const fail = (message) => {
      input.setAttribute("aria-invalid", "true");
      error.textContent = message;
      status.textContent = "未生成报告，请修正输入。";
      report.dataset.ready = "false";
      reportState.textContent = "CHECK INPUT";
      zeroCounters();
      note.textContent = "工具只定位预设词类，不理解上下文。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latestReport = "";
      setPlaceholder("输入有误，修正后重新扫描。");
    };
    const setStale = () => {
      if (report.dataset.ready !== "true") return;
      report.dataset.ready = "false";
      reportState.textContent = "STALE";
      status.textContent = "文字已变化，请重新扫描。";
      note.textContent = "当前报告已过期；重新扫描后再复制。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latestReport = "";
    };
    const isDigit = (character) => /^\d$/u.test((character || "").normalize("NFKC"));
    const splitSentences = (text) => {
      const characters = Array.from(text);
      const sentences = [];
      let buffer = "";
      const push = () => {
        const trimmed = buffer.trim();
        if (trimmed) sentences.push(trimmed);
        buffer = "";
      };
      for (let index = 0; index < characters.length; index += 1) {
        const character = characters[index];
        buffer += character;
        let boundary = character === "\n" || "。！？!?；;".includes(character);
        if (character === "." || character === "．") {
          const decimalPoint = isDigit(characters[index - 1]) && isDigit(characters[index + 1]);
          boundary = !decimalPoint && (!characters[index + 1] || /^\s$/u.test(characters[index + 1]));
        }
        if (boundary) {
          if (characters[index + 1] && "”’\"'】）)]".includes(characters[index + 1])) {
            buffer += characters[index + 1];
            index += 1;
          }
          push();
        }
      }
      push();
      return sentences;
    };
    const classify = (sentence) => {
      const normalized = sentence.normalize("NFKC").toLocaleLowerCase();
      const categories = [];
      for (const key of ["promise", "extreme", "fresh"]) {
        if (lexicon[key].some((word) => normalized.includes(word))) categories.push(key);
      }
      if (/\d+(?:\.\d+)?\s*(?:%|元|美元|人民币|天|日|小时|分钟|倍|bps|基点)/iu.test(normalized)) categories.push("numeric");
      return categories;
    };
    const renderFindings = (records) => {
      const fragment = document.createDocumentFragment();
      records.forEach((record, index) => {
        const article = document.createElement("article");
        article.className = record.categories.length ? "hb65-finding hb65-flagged" : "hb65-finding";
        const number = document.createElement("b");
        number.textContent = String(index + 1).padStart(2, "0");
        const body = document.createElement("div");
        const sentence = document.createElement("p");
        sentence.textContent = record.sentence;
        const tags = document.createElement("div");
        tags.className = "hb65-tags";
        const values = record.categories.length ? record.categories.map((key) => labels[key]) : ["未命中"];
        values.forEach((value) => {
          const tag = document.createElement("span");
          tag.textContent = value;
          tags.append(tag);
        });
        body.append(sentence, tags);
        article.append(number, body);
        fragment.append(article);
      });
      findings.replaceChildren(fragment);
    };

    claimForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const normalizedLineBreaks = input.value.replace(/\r\n?/g, "\n");
      const length = Array.from(normalizedLineBreaks).length;
      input.removeAttribute("aria-invalid");
      error.textContent = "";
      if (normalizedLineBreaks.trim() === "") {
        fail("请先粘贴至少一个非空句子。");
        input.focus();
        return;
      }
      if (length > 6000) {
        fail(`输入共 ${length} 个字符，最多允许 6000 个。`);
        input.focus();
        return;
      }
      const sentences = splitSentences(normalizedLineBreaks);
      if (sentences.length > 80) {
        fail(`检测到 ${sentences.length} 个句子，最多允许 80 个。`);
        input.focus();
        return;
      }
      const records = sentences.map((sentence) => ({ sentence, categories: classify(sentence) }));
      const categoryCounts = { promise: 0, extreme: 0, fresh: 0, numeric: 0 };
      records.forEach((record) => record.categories.forEach((key) => { categoryCounts[key] += 1; }));
      const flagged = records.filter((record) => record.categories.length > 0).length;
      counters.sentence.textContent = String(records.length);
      counters.flagged.textContent = String(flagged);
      Object.keys(categoryCounts).forEach((key) => { counters[key].textContent = String(categoryCounts[key]); });
      renderFindings(records);
      report.dataset.ready = "true";
      reportState.textContent = "READY";
      status.textContent = `扫描完成：${records.length} 个句子，${flagged} 个需要人工复核。`;
      note.textContent = flagged > 0
        ? "命中只表示需要补证据、范围或时间说明，不等于文字错误。"
        : "未命中预设词类；仍需人工核对事实、上下文与遗漏。";
      const flaggedLines = records
        .map((record, index) => ({ ...record, index }))
        .filter((record) => record.categories.length)
        .map((record) => `${record.index + 1}. [${record.categories.map((key) => labels[key]).join("/")}] ${record.sentence}`);
      latestReport = [
        "主张风险词扫描报告",
        `句子：${records.length}`,
        `需复核句：${flagged}`,
        `承诺：${categoryCounts.promise}；极值：${categoryCounts.extreme}；时效：${categoryCounts.fresh}；数字：${categoryCounts.numeric}`,
        flaggedLines.length ? "需复核：" : "需复核：未命中预设词类。",
        ...flaggedLines,
        "说明：命中仅用于提示人工复核，不是事实或合规结论。"
      ].join("\n");
      copyButton.disabled = false;
      copyStatus.textContent = "";
    });
    input.addEventListener("input", setStale);
    claimForm.querySelectorAll("[data-claim-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        input.value = presets[button.dataset.claimPreset];
        input.removeAttribute("aria-invalid");
        error.textContent = "";
        setStale();
        status.textContent = "示例已装入，点击扫描生成报告。";
        input.focus();
      });
    });
    copyButton.addEventListener("click", async () => {
      if (!latestReport) return;
      try {
        await copyText(latestReport);
        copyStatus.textContent = "报告已复制。";
      } catch (_error) {
        copyStatus.textContent = "浏览器未允许复制，请手动记录上方结果。";
      }
    });
    claimForm.addEventListener("reset", () => {
      window.setTimeout(() => {
        input.removeAttribute("aria-invalid");
        error.textContent = "";
        status.textContent = "等待装入文字。";
        report.dataset.ready = "false";
        reportState.textContent = "STANDBY";
        zeroCounters();
        note.textContent = "工具只定位预设词类，不理解上下文。";
        copyButton.disabled = true;
        copyStatus.textContent = "";
        latestReport = "";
        setPlaceholder();
      }, 0);
    });
  }

  const cabinetSearch = document.querySelector("[data-cabinet-search]");
  if (cabinetSearch) {
    const query = cabinetSearch.querySelector("input");
    const result = cabinetSearch.querySelector("[data-cabinet-result]");
    const records = [
      { href: "article.html#source", label: "人工核对方法", words: ["来源", "证据", "方法", "主体", "范围", "时间"] },
      { href: "tool.html", label: "主张风险词扫描台", words: ["承诺", "极值", "时效", "数字", "最高", "扫描"] },
      { href: "legal.html", label: "公开说明", words: ["披露", "利益", "更正", "免责", "隐私", "边界"] },
      { href: "index.html", label: "标本总览", words: ["首页", "馆藏", "标本", "总览"] }
    ];
    const showResult = (prefix, record) => {
      const link = document.createElement("a");
      link.href = record.href;
      link.textContent = record.label;
      result.replaceChildren(document.createTextNode(prefix), link, document.createTextNode("。"));
    };
    cabinetSearch.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = query.value.trim();
      if (!value) {
        result.textContent = "请输入一个馆藏标签。";
        query.focus();
        return;
      }
      const normalized = value.normalize("NFKC").toLocaleLowerCase();
      const record = records.find((item) => item.words.some((word) => normalized.includes(word)));
      if (record) {
        showResult("最近的馆藏页：", record);
      } else {
        showResult("未找到精确标签，建议先返回", records[3]);
      }
    });
    query.addEventListener("input", () => {
      result.textContent = "标签已变化，提交后重新检索。";
    });
  }
})();
