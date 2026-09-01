(() => {
  "use strict";

  const root = document.documentElement;
  const characterCount = (value) => Array.from(value).length;
  const setText = (node, value) => {
    if (node) node.textContent = value;
  };

  const copyText = async (value, statusNode, successMessage) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
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
      }
      setText(statusNode, successMessage);
    } catch (_error) {
      setText(statusNode, "复制失败，请手动选择文字。");
    }
  };

  const initializePaper = () => {
    const toggles = [...document.querySelectorAll("[data-pc80-paper-toggle]")];
    if (!toggles.length) return;
    let saved = null;
    try {
      saved = localStorage.getItem("pc80-paper");
    } catch (_error) {
      saved = null;
    }
    const apply = (paper) => {
      root.dataset.pc80Paper = paper;
      toggles.forEach((toggle) => {
        const isInk = paper === "ink";
        toggle.setAttribute("aria-pressed", String(isInk));
        toggle.textContent = isInk ? "奶油纸" : "墨纸";
      });
    };
    apply(saved === "ink" || saved === "cream" ? saved : "cream");
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const next = root.dataset.pc80Paper === "ink" ? "cream" : "ink";
        apply(next);
        try {
          localStorage.setItem("pc80-paper", next);
        } catch (_error) {
          // The selection still applies to this page.
        }
      });
    });
  };

  const initializeMenu = () => {
    const button = document.querySelector(".pc80-menu");
    const navigation = document.querySelector("#pc80-nav");
    if (!button || !navigation) return;
    const close = (restoreFocus = false) => {
      navigation.classList.remove("pc80-open");
      button.setAttribute("aria-expanded", "false");
      if (restoreFocus) button.focus();
    };
    const open = () => {
      navigation.classList.add("pc80-open");
      button.setAttribute("aria-expanded", "true");
      const firstLink = navigation.querySelector("a");
      if (firstLink) firstLink.focus();
    };
    button.addEventListener("click", () => {
      if (navigation.classList.contains("pc80-open")) close();
      else open();
    });
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a") && window.innerWidth <= 760) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("pc80-open")) close(true);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) close();
    });
  };

  const initializeProgress = () => {
    const meter = document.querySelector("[data-pc80-progress]");
    if (!meter) return;
    const update = () => {
      const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const percentage = maximum === 0 ? 100 : Math.min(100, Math.max(0, (window.scrollY / maximum) * 100));
      meter.style.width = `${percentage}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  };

  const initializeCopies = () => {
    const handoffButton = document.querySelector("[data-pc80-copy-handoff]");
    const handoffStatus = document.querySelector("[data-pc80-handoff-status]");
    if (handoffButton) {
      handoffButton.addEventListener("click", () => {
        const format = "折页编辑交接\n1. 可核对陈述\n2. 直接材料与版本\n3. 脚注引用状态\n4. 下一复核日与负责人";
        copyText(format, handoffStatus, "交接格式已复制。");
      });
    }
    const disclosureButton = document.querySelector("[data-pc80-copy-disclosure]");
    const disclosure = document.querySelector("[data-pc80-disclosure]");
    const disclosureStatus = document.querySelector("[data-pc80-disclosure-status]");
    if (disclosureButton && disclosure) {
      disclosureButton.addEventListener("click", () => {
        copyText(disclosure.textContent.trim(), disclosureStatus, "简短披露已复制。");
      });
    }
  };

  const initializeFootnoteProof = () => {
    const form = document.querySelector("[data-pc80-footnote-form]");
    if (!form) return;
    const bodyField = form.querySelector("#pc80-body");
    const noteField = form.querySelector("#pc80-notes");
    const errorNode = form.querySelector("[data-pc80-footnote-error]");
    const statusNode = form.querySelector("[data-pc80-footnote-status]");
    const report = document.querySelector(".pc80-proof-report");
    const stateNode = report.querySelector("[data-pc80-proof-state]");
    const referenceCountNode = report.querySelector("[data-pc80-reference-count]");
    const definitionCountNode = report.querySelector("[data-pc80-definition-count]");
    const missingCountNode = report.querySelector("[data-pc80-missing-count]");
    const unusedCountNode = report.querySelector("[data-pc80-unused-count]");
    const listNode = report.querySelector("[data-pc80-issue-list]");
    const noteNode = report.querySelector("[data-pc80-report-note]");
    const copyButton = report.querySelector("[data-pc80-copy-report]");
    const copyStatus = report.querySelector("[data-pc80-report-status]");
    let lastReport = "";

    const clearList = () => {
      while (listNode.firstChild) listNode.firstChild.remove();
    };
    const addIssue = (number, message, kind = "") => {
      const item = document.createElement("li");
      if (kind) item.dataset.kind = kind;
      const identifier = document.createElement("b");
      identifier.textContent = number;
      const detail = document.createElement("span");
      detail.textContent = message;
      item.append(identifier, detail);
      listNode.append(item);
    };

    const clearInvalid = () => {
      bodyField.removeAttribute("aria-invalid");
      noteField.removeAttribute("aria-invalid");
      setText(errorNode, "");
    };
    const resetReport = () => {
      clearInvalid();
      report.dataset.ready = "false";
      setText(stateNode, "UNPROOFED");
      setText(referenceCountNode, "0");
      setText(definitionCountNode, "0");
      setText(missingCountNode, "0");
      setText(unusedCountNode, "0");
      clearList();
      addIssue("—", "对照后显示前 50 个问题。");
      setText(noteNode, "重复定义也会列入问题；屏幕限制不影响复制完整报告。");
      setText(statusNode, "等待正文和脚注定义。");
      setText(copyStatus, "");
      copyButton.disabled = true;
      lastReport = "";
    };
    const markStale = () => {
      clearInvalid();
      setText(copyStatus, "");
      if (report.dataset.ready === "true") {
        report.dataset.ready = "stale";
        setText(stateNode, "REPROOF");
        setText(statusNode, "正文或脚注已更改，请重新对照。");
        copyButton.disabled = true;
      }
      lastReport = "";
    };
    const showError = (message, target) => {
      resetReport();
      target.setAttribute("aria-invalid", "true");
      setText(errorNode, message);
      setText(statusNode, "未生成报告，请修正校样。");
      setText(stateNode, "INPUT ERROR");
      clearList();
      addIssue("—", "正文或脚注定义未通过格式检查。");
      setText(noteNode, "修正输入后再次对照；现有报告已清除。");
      target.focus();
    };

    const parse = () => {
      if (characterCount(bodyField.value) > 6000) return { error: "正文不能超过 6,000 个 Unicode 字符。", target: bodyField };
      if (characterCount(noteField.value) > 4000) return { error: "脚注定义不能超过 4,000 个 Unicode 字符。", target: noteField };
      const body = bodyField.value.normalize("NFKC");
      const notes = noteField.value.normalize("NFKC");
      if (!body.trim()) return { error: "请输入包含脚注引用的正文。", target: bodyField };

      const markers = [...body.matchAll(/\[\^([^\]]*)\]/gu)];
      if (!markers.length) return { error: "正文中至少需要一个形如 [^1] 的脚注引用。", target: bodyField };
      const references = [];
      for (let index = 0; index < markers.length; index += 1) {
        const value = markers[index][1];
        if (!/^[1-9]\d{0,2}$/u.test(value)) return { error: `第 ${index + 1} 个脚注标记无效：编号须为 1–999 且不能有前导零。`, target: bodyField };
        references.push(Number(value));
      }

      const lines = notes.split(/\r?\n/u).filter((line) => line.trim() !== "");
      if (!lines.length) return { error: "请至少输入 1 条脚注定义。", target: noteField };
      if (lines.length > 100) return { error: "非空脚注定义不能超过 100 行。", target: noteField };
      const definitions = new Map();
      for (let index = 0; index < lines.length; index += 1) {
        const parts = lines[index].split("|");
        if (parts.length !== 2) return { error: `脚注第 ${index + 1} 行须且只能包含一个竖线分隔符。`, target: noteField };
        const numberText = parts[0].trim();
        const description = parts[1].trim();
        if (!/^[1-9]\d{0,2}$/u.test(numberText)) return { error: `脚注第 ${index + 1} 行编号须为 1–999 且不能有前导零。`, target: noteField };
        if (!description) return { error: `脚注第 ${index + 1} 行来源说明不能为空。`, target: noteField };
        if (characterCount(description) > 200) return { error: `脚注第 ${index + 1} 行来源说明不能超过 200 个 Unicode 字符。`, target: noteField };
        const number = Number(numberText);
        const existing = definitions.get(number) || [];
        existing.push(description);
        definitions.set(number, existing);
      }

      const referenceSet = new Set(references);
      const missing = [...referenceSet].filter((number) => !definitions.has(number)).sort((a, b) => a - b);
      const unused = [...definitions.keys()].filter((number) => !referenceSet.has(number)).sort((a, b) => a - b);
      const duplicates = [...definitions.entries()].filter(([, entries]) => entries.length > 1).map(([number, entries]) => ({ number, count: entries.length })).sort((a, b) => a.number - b.number);
      const issues = [
        ...missing.map((number) => ({ number, kind: "missing", message: `正文引用 [^${number}]，但脚注区没有定义。` })),
        ...unused.map((number) => ({ number, kind: "unused", message: `脚注 [^${number}] 已定义，但正文没有引用。` })),
        ...duplicates.map(({ number, count }) => ({ number, kind: "duplicate", message: `脚注 [^${number}] 重复定义 ${count} 次，只应保留一条。` })),
      ].sort((a, b) => a.number - b.number || a.kind.localeCompare(b.kind));
      return { references, definitions, missing, unused, duplicates, issues };
    };

    const render = (data) => {
      const clean = data.issues.length === 0;
      clearInvalid();
      report.dataset.ready = "true";
      setText(stateNode, clean ? "PROOF CLEAN" : "CHECK NOTES");
      setText(referenceCountNode, String(data.references.length));
      setText(definitionCountNode, String(data.definitions.size));
      setText(missingCountNode, String(data.missing.length));
      setText(unusedCountNode, String(data.unused.length));
      setText(statusNode, `已对照 ${data.references.length} 个引用标记和 ${data.definitions.size} 个唯一脚注：${data.missing.length} 个缺失，${data.unused.length} 个未使用，${data.duplicates.length} 个重复定义。`);
      setText(copyStatus, "");
      clearList();
      if (clean) addIssue("✓", "正文引用与脚注定义一一对应，且没有重复定义。");
      else data.issues.slice(0, 50).forEach((issue) => addIssue(`[^${issue.number}]`, issue.message, issue.kind));
      if (data.issues.length > 50) setText(noteNode, `屏幕仅显示前 50 项，共 ${data.issues.length} 项；复制报告会包含全部问题。`);
      else if (clean) setText(noteNode, "脚注结构通过对照；发布前仍应人工核对每份材料是否真正支持对应陈述。");
      else setText(noteNode, `共发现 ${data.issues.length} 项结构问题；修正后重新对照。`);

      const lines = [
        "脚注引用对照报告",
        `引用标记：${data.references.length}`,
        `唯一脚注：${data.definitions.size}`,
        `缺失定义：${data.missing.length}`,
        `未使用定义：${data.unused.length}`,
        `重复定义：${data.duplicates.length}`,
        "",
        "问题明细",
      ];
      if (clean) lines.push("正文引用与脚注定义一一对应。");
      else data.issues.forEach((issue) => lines.push(`${issue.kind.toUpperCase()}｜[^${issue.number}]｜${issue.message}`));
      lastReport = lines.join("\n");
      copyButton.disabled = false;
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const result = parse();
      if (result.error) showError(result.error, result.target);
      else render(result);
    });
    bodyField.addEventListener("input", markStale);
    noteField.addEventListener("input", markStale);
    form.addEventListener("reset", () => window.setTimeout(resetReport, 0));
    const presets = {
      issues: { body: "第一项陈述需要材料。[^1] 第二项陈述等待补证。[^2]", notes: "1 | 第一份材料与核对日\n1 | 重复的第一份材料\n3 | 正文没有使用的材料" },
      clean: { body: "关键陈述紧邻来源。[^1]\n\n第二项陈述使用另一份材料。[^2]", notes: "1 | 第一份材料、发布者与核对日\n2 | 第二份材料、版本与适用范围" },
      repeat: { body: "同一材料第一次出现。[^1] 后文再次引用同一材料。[^1]", notes: "1 | 可复用的一份直接材料" },
    };
    form.querySelectorAll("[data-pc80-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        const preset = presets[button.dataset.pc80Preset];
        if (!preset) return;
        bodyField.value = preset.body;
        noteField.value = preset.notes;
        markStale();
        bodyField.focus();
      });
    });
    copyButton.addEventListener("click", () => {
      if (lastReport) copyText(lastReport, copyStatus, "完整报告已复制。");
    });
  };

  const initializeSearch = () => {
    const form = document.querySelector("[data-pc80-search]");
    if (!form) return;
    const input = form.querySelector("#pc80-query");
    const result = form.querySelector("[data-pc80-search-result]");
    const routes = [
      { href: "article.html", label: "长文样张", words: ["来源", "材料", "文章", "长文", "更正"] },
      { href: "tool.html", label: "脚注对照器", words: ["脚注", "引用", "对照", "工具", "注释"] },
      { href: "legal.html", label: "刊物说明", words: ["披露", "隐私", "说明", "联系", "边界"] },
      { href: "index.html", label: "本期折页", words: ["首页", "折页", "目录", "本期", "装订"] },
    ];
    const clear = () => {
      while (result.firstChild) result.firstChild.remove();
    };
    const showText = (value) => {
      clear();
      result.textContent = value;
    };
    const showLink = (prefix, route) => {
      clear();
      result.append(document.createTextNode(prefix));
      const link = document.createElement("a");
      link.href = route.href;
      link.textContent = route.label;
      result.append(link, document.createTextNode("。"));
    };
    input.addEventListener("input", () => showText("输入已更改，按“翻找页序”重新搜索。"));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.normalize("NFKC").trim();
      if (!query) {
        showText("请输入主题，例如“脚注”或“来源”。");
        input.focus();
        return;
      }
      if (characterCount(query) > 80) {
        showText("搜索词不能超过 80 个 Unicode 字符。");
        input.focus();
        return;
      }
      const route = routes.find((candidate) => candidate.words.some((word) => query.includes(word)));
      if (route) showLink("最近的本地页序是：", route);
      else showLink("没有完全匹配；建议先返回", routes[3]);
    });
  };

  initializePaper();
  initializeMenu();
  initializeProgress();
  initializeCopies();
  initializeFootnoteProof();
  initializeSearch();
})();
