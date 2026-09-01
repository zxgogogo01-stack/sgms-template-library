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
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.append(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (!copied) throw new Error("copy unavailable");
      }
      setText(statusNode, successMessage);
    } catch (_error) {
      setText(statusNode, "复制失败，请手动选择文字。");
    }
  };

  const initializeLight = () => {
    const toggles = [...document.querySelectorAll("[data-ka78-light-toggle]")];
    if (!toggles.length) return;

    let saved = null;
    try {
      saved = localStorage.getItem("ka78-light");
    } catch (_error) {
      saved = null;
    }
    const initial = saved === "night" || saved === "dune" ? saved : "dune";

    const apply = (mode) => {
      root.dataset.ka78Light = mode;
      toggles.forEach((toggle) => {
        const isNight = mode === "night";
        toggle.setAttribute("aria-pressed", String(isNight));
        toggle.textContent = isNight ? "日勘" : "夜勘";
      });
    };

    apply(initial);
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const next = root.dataset.ka78Light === "night" ? "dune" : "night";
        apply(next);
        try {
          localStorage.setItem("ka78-light", next);
        } catch (_error) {
          // The selected mode still applies for the current page.
        }
      });
    });
  };

  const initializeMenu = () => {
    const button = document.querySelector(".ka78-menu");
    const navigation = document.querySelector("#ka78-nav");
    if (!button || !navigation) return;

    const close = (restoreFocus = false) => {
      navigation.classList.remove("ka78-open");
      button.setAttribute("aria-expanded", "false");
      if (restoreFocus) button.focus();
    };
    const open = () => {
      navigation.classList.add("ka78-open");
      button.setAttribute("aria-expanded", "true");
      const firstLink = navigation.querySelector("a");
      if (firstLink) firstLink.focus();
    };

    button.addEventListener("click", () => {
      if (navigation.classList.contains("ka78-open")) close();
      else open();
    });
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a") && window.innerWidth <= 760) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("ka78-open")) close(true);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) close();
    });
  };

  const initializeProgress = () => {
    const meter = document.querySelector("[data-ka78-progress]");
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

  const initializeStaticCopies = () => {
    const handoffButton = document.querySelector("[data-ka78-copy-handoff]");
    const handoffStatus = document.querySelector("[data-ka78-handoff-status]");
    if (handoffButton) {
      handoffButton.addEventListener("click", () => {
        const checklist = "入藏交接清单\n1. 稳定编号\n2. 直接来源\n3. 现场描述\n4. 解释与前提\n5. 最近核对日";
        copyText(checklist, handoffStatus, "入藏清单已复制。");
      });
    }

    const disclosureButton = document.querySelector("[data-ka78-copy-disclosure]");
    const disclosure = document.querySelector("[data-ka78-disclosure]");
    const disclosureStatus = document.querySelector("[data-ka78-disclosure-status]");
    if (disclosureButton && disclosure) {
      disclosureButton.addEventListener("click", () => {
        copyText(disclosure.textContent.trim(), disclosureStatus, "简短披露已复制。");
      });
    }
  };

  const initializeIdentifierChecker = () => {
    const form = document.querySelector("[data-ka78-id-form]");
    if (!form) return;

    const field = form.querySelector("#ka78-ids");
    const errorNode = form.querySelector("[data-ka78-id-error]");
    const statusNode = form.querySelector("[data-ka78-id-status]");
    const report = document.querySelector(".ka78-id-report");
    const stateNode = report.querySelector("[data-ka78-id-state]");
    const lineCountNode = report.querySelector("[data-ka78-line-count]");
    const gapCountNode = report.querySelector("[data-ka78-gap-count]");
    const duplicateCountNode = report.querySelector("[data-ka78-duplicate-count]");
    const rangeNode = report.querySelector("[data-ka78-range]");
    const listNode = report.querySelector("[data-ka78-id-list]");
    const noteNode = report.querySelector("[data-ka78-id-note]");
    const copyButton = report.querySelector("[data-ka78-copy-report]");
    const copyStatus = report.querySelector("[data-ka78-report-status]");
    const pattern = /^([A-Z][A-Z0-9]{1,11})-([0-9]{3,6})$/;
    let lastReport = "";

    const formatIdentifier = (prefix, width, value) => `${prefix}-${String(value).padStart(width, "0")}`;

    const clearList = () => {
      while (listNode.firstChild) listNode.firstChild.remove();
    };

    const addListItem = (primary, secondary = "", kind = "") => {
      const item = document.createElement("li");
      if (kind) item.dataset.kind = kind;
      const identifier = document.createElement("b");
      identifier.textContent = primary;
      item.append(identifier);
      if (secondary) {
        const label = document.createElement("span");
        label.textContent = secondary;
        item.append(label);
      }
      listNode.append(item);
    };

    const markStale = () => {
      field.removeAttribute("aria-invalid");
      setText(errorNode, "");
      setText(copyStatus, "");
      if (report.dataset.ready === "true") {
        report.dataset.ready = "stale";
        setText(stateNode, "RECHECK");
        setText(statusNode, "输入已更改，请重新检查序列。");
        copyButton.disabled = true;
      }
      lastReport = "";
    };

    const showError = (message) => {
      field.setAttribute("aria-invalid", "true");
      setText(errorNode, message);
      setText(statusNode, "未生成报告，请修正输入。");
      report.dataset.ready = "false";
      setText(stateNode, "UNFILED");
      setText(lineCountNode, "0");
      setText(gapCountNode, "0");
      setText(duplicateCountNode, "0");
      setText(rangeNode, "—");
      clearList();
      addListItem("输入未通过格式检查。");
      setText(noteNode, "修正输入后再次检查；现有报告已清除。");
      copyButton.disabled = true;
      setText(copyStatus, "");
      lastReport = "";
      field.focus();
    };

    const parse = () => {
      if (characterCount(field.value) > 10000) {
        return { error: "总输入不能超过 10,000 个 Unicode 字符。" };
      }

      const normalized = field.value.normalize("NFKC");
      const lines = normalized.split(/\r?\n/u).filter((line) => line.trim() !== "");
      if (!lines.length) return { error: "请至少输入 1 个记录编号。" };
      if (lines.length > 500) return { error: "非空记录编号不能超过 500 行。" };

      let prefix = "";
      let width = 0;
      const counts = new Map();

      for (let index = 0; index < lines.length; index += 1) {
        const candidate = lines[index].toUpperCase();
        const match = candidate.match(pattern);
        if (!match) {
          return { error: `第 ${index + 1} 行格式无效：须为 2–12 位前缀、一个连字符和 3–6 位数字。` };
        }
        if (index === 0) {
          prefix = match[1];
          width = match[2].length;
        } else if (match[1] !== prefix) {
          return { error: `第 ${index + 1} 行前缀为 ${match[1]}，应与首行 ${prefix} 一致。` };
        } else if (match[2].length !== width) {
          return { error: `第 ${index + 1} 行数字为 ${match[2].length} 位，应与首行 ${width} 位一致。` };
        }

        const number = Number(match[2]);
        counts.set(number, (counts.get(number) || 0) + 1);
      }

      const values = [...counts.keys()].sort((a, b) => a - b);
      const minimum = values[0];
      const maximum = values[values.length - 1];
      if (maximum - minimum > 10000) {
        return { error: `数字跨度为 ${(maximum - minimum).toLocaleString("zh-CN")}，不能超过 10,000。` };
      }

      const gaps = [];
      for (let number = minimum; number <= maximum; number += 1) {
        if (!counts.has(number)) gaps.push(number);
      }
      const duplicates = values
        .filter((number) => counts.get(number) > 1)
        .map((number) => ({ number, count: counts.get(number) }));
      const anomalies = [
        ...gaps.map((number) => ({ number, kind: "gap", label: "缺号" })),
        ...duplicates.map(({ number, count }) => ({ number, kind: "duplicate", label: `重复 ×${count}` })),
      ].sort((a, b) => a.number - b.number || a.kind.localeCompare(b.kind));

      return { lines, prefix, width, minimum, maximum, gaps, duplicates, anomalies };
    };

    const render = (data) => {
      const clean = data.anomalies.length === 0;
      const firstIdentifier = formatIdentifier(data.prefix, data.width, data.minimum);
      const lastIdentifier = formatIdentifier(data.prefix, data.width, data.maximum);
      const range = `${firstIdentifier} — ${lastIdentifier}`;

      field.removeAttribute("aria-invalid");
      setText(errorNode, "");
      report.dataset.ready = "true";
      setText(stateNode, clean ? "SERIES CLEAN" : "CHECK SERIES");
      setText(lineCountNode, String(data.lines.length));
      setText(gapCountNode, String(data.gaps.length));
      setText(duplicateCountNode, String(data.duplicates.length));
      setText(rangeNode, range);
      setText(statusNode, `已检查 ${data.lines.length} 行：${data.gaps.length} 个缺号，${data.duplicates.length} 个重复编号。`);
      setText(copyStatus, "");
      clearList();

      if (clean) {
        addListItem("序列连续且无重复号。");
      } else {
        data.anomalies.slice(0, 50).forEach((anomaly) => {
          addListItem(formatIdentifier(data.prefix, data.width, anomaly.number), anomaly.label, anomaly.kind);
        });
      }

      if (data.anomalies.length > 50) {
        setText(noteNode, `屏幕仅显示前 50 项，共 ${data.anomalies.length} 项；复制报告会包含全部异常。`);
      } else if (clean) {
        setText(noteNode, "当前序列连续且无重复；归档前仍应核对撤销记录。 ");
      } else {
        setText(noteNode, `共发现 ${data.anomalies.length} 项异常；缺号可能是已撤销记录，确认后再补号。`);
      }

      const reportLines = [
        "记录编号完整性报告",
        `输入行：${data.lines.length}`,
        `序列范围：${range}`,
        `缺号：${data.gaps.length}`,
        `重复编号：${data.duplicates.length}`,
        "",
        "异常明细",
      ];
      if (clean) reportLines.push("序列连续且无重复号。");
      else {
        data.anomalies.forEach((anomaly) => {
          reportLines.push(`${formatIdentifier(data.prefix, data.width, anomaly.number)}｜${anomaly.label}`);
        });
      }
      lastReport = reportLines.join("\n");
      copyButton.disabled = false;
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const result = parse();
      if (result.error) showError(result.error);
      else render(result);
    });

    field.addEventListener("input", markStale);
    form.addEventListener("reset", () => {
      window.setTimeout(() => {
        report.dataset.ready = "false";
        field.removeAttribute("aria-invalid");
        setText(errorNode, "");
        setText(statusNode, "等待输入记录编号。");
        setText(stateNode, "UNFILED");
        setText(lineCountNode, "0");
        setText(gapCountNode, "0");
        setText(duplicateCountNode, "0");
        setText(rangeNode, "—");
        clearList();
        addListItem("检查后显示前 50 个缺号或重复号。");
        setText(noteNode, "缺号可能是已撤销记录；确认后再补号，不要自动复用。");
        setText(copyStatus, "");
        copyButton.disabled = true;
        lastReport = "";
      }, 0);
    });

    const presets = {
      gaps: "OBS-001\nOBS-002\nOBS-004\nOBS-004\nOBS-007",
      clean: "ARC-001\nARC-002\nARC-003\nARC-004\nARC-005",
      wide: "REC-000001\nREC-000002\nREC-000004",
    };
    form.querySelectorAll("[data-ka78-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        field.value = presets[button.dataset.ka78Preset] || "";
        markStale();
        field.focus();
      });
    });

    copyButton.addEventListener("click", () => {
      if (lastReport) copyText(lastReport, copyStatus, "完整报告已复制。");
    });
  };

  const initializeLocalSearch = () => {
    const form = document.querySelector("[data-ka78-search]");
    if (!form) return;
    const input = form.querySelector("#ka78-query");
    const result = form.querySelector("[data-ka78-search-result]");
    const routes = [
      { href: "article.html", label: "现场记录", words: ["来源", "记录", "文章", "证据", "更正"] },
      { href: "tool.html", label: "编号检查器", words: ["编号", "缺号", "工具", "序列", "重复"] },
      { href: "legal.html", label: "档案说明", words: ["披露", "隐私", "说明", "联系", "条款"] },
      { href: "index.html", label: "探方首页", words: ["首页", "探方", "抽屉", "入藏"] },
    ];

    const clearResult = () => {
      while (result.firstChild) result.firstChild.remove();
    };
    const showText = (value) => {
      clearResult();
      result.textContent = value;
    };
    const showLink = (prefix, route) => {
      clearResult();
      result.append(document.createTextNode(prefix));
      const link = document.createElement("a");
      link.href = route.href;
      link.textContent = route.label;
      result.append(link, document.createTextNode("。"));
    };

    input.addEventListener("input", () => showText("输入已更改，按“翻查抽屉”重新搜索。"));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const raw = input.value.normalize("NFKC").trim();
      if (!raw) {
        showText("请输入要查找的主题，例如“编号”或“来源”。");
        input.focus();
        return;
      }
      if (characterCount(raw) > 80) {
        showText("搜索词不能超过 80 个 Unicode 字符。");
        input.focus();
        return;
      }
      const route = routes.find((candidate) => candidate.words.some((word) => raw.includes(word)));
      if (route) showLink("最近的本地抽屉是：", route);
      else showLink("没有完全匹配；建议先返回", routes[3]);
    });
  };

  initializeLight();
  initializeMenu();
  initializeProgress();
  initializeStaticCopies();
  initializeIdentifierChecker();
  initializeLocalSearch();
})();
