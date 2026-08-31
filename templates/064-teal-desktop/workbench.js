(() => {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.querySelector("[data-desk-toggle]");
  const themeKey = "teal-desktop-064-theme";
  const setTheme = (theme) => {
    const next = theme === "night" ? "night" : "teal";
    root.dataset.theme = next;
    if (themeButton) {
      themeButton.textContent = next === "night" ? "日班" : "夜班";
      themeButton.setAttribute("aria-label", next === "night" ? "切换到日班主题" : "切换到夜班主题");
    }
  };
  try {
    setTheme(localStorage.getItem(themeKey) || "teal");
  } catch (_error) {
    setTheme("teal");
  }
  themeButton?.addEventListener("click", () => {
    const next = root.dataset.theme === "night" ? "teal" : "night";
    setTheme(next);
    try {
      localStorage.setItem(themeKey, next);
    } catch (_error) {
      // The theme still works when storage is unavailable.
    }
  });

  const menuButton = document.querySelector(".td64-menu-button");
  const menu = document.querySelector(".td64-menu");
  const closeMenu = (restoreFocus = false) => {
    if (!menu || !menuButton) return;
    menu.classList.remove("td64-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) menuButton.focus();
  };
  menuButton?.addEventListener("click", () => {
    if (!menu) return;
    const opening = !menu.classList.contains("td64-open");
    menu.classList.toggle("td64-open", opening);
    menuButton.setAttribute("aria-expanded", String(opening));
    if (opening) menu.querySelector("a, button")?.focus();
  });
  menu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.classList.contains("td64-open")) closeMenu(true);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
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
  const bindCopy = (buttonSelector, textSelector, statusSelector) => {
    const button = document.querySelector(buttonSelector);
    const source = document.querySelector(textSelector);
    const status = document.querySelector(statusSelector);
    button?.addEventListener("click", async () => {
      if (!source || !status) return;
      try {
        await copyText(source.textContent.trim());
        status.textContent = "已复制，可粘贴后按实际页面调整。";
      } catch (_error) {
        status.textContent = "浏览器未允许复制，请手动选择上方文字。";
      }
    });
  };
  bindCopy("[data-copy-handoff]", "[data-handoff-text]", "[data-handoff-status]");
  bindCopy("[data-copy-disclosure]", "[data-disclosure-text]", "[data-disclosure-status]");

  const progress = document.querySelector("[data-reading-progress]");
  if (progress) {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100;
      progress.style.width = `${percentage}%`;
    };
    updateProgress();
    document.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const tableForm = document.querySelector("[data-table-form]");
  if (tableForm) {
    const input = tableForm.querySelector("#td64-table");
    const delimiterSelect = tableForm.querySelector("#td64-delimiter");
    const error = tableForm.querySelector("[data-table-error]");
    const status = tableForm.querySelector("[data-table-status]");
    const report = document.querySelector(".td64-table-report");
    const reportState = report.querySelector("[data-table-state]");
    const rowCount = report.querySelector("[data-row-count]");
    const columnCount = report.querySelector("[data-column-count]");
    const raggedCount = report.querySelector("[data-ragged-count]");
    const emptyCount = report.querySelector("[data-empty-count]");
    const delimiterLabel = report.querySelector("[data-delimiter-label]");
    const preview = report.querySelector("[data-table-preview]");
    const note = report.querySelector("[data-table-note]");
    const copyButton = report.querySelector("[data-copy-table-report]");
    const copyStatus = report.querySelector("[data-table-copy-status]");
    const delimiters = {
      comma: { character: ",", label: "逗号" },
      tab: { character: "\t", label: "Tab" },
      semicolon: { character: ";", label: "分号" },
      pipe: { character: "|", label: "竖线" }
    };
    const presets = {
      clean: "来源,状态,日期\n帮助中心,已核对,2026-01-22\n账户页,待核实,2026-01-23",
      ragged: "记录|状态|负责人\nA-01|已核对|编辑A\nA-02|待核实\nA-03||编辑B",
      quoted: "标题,说明,状态\n\"规则,版本A\",\"包含\"\"引号\"\"的说明\",已核对\n\"多行\n标题\",第二行内容,待核实"
    };
    let latestSummary = "";

    const showPlaceholder = (message = "检查后显示前 10 行与前 10 列。") => {
      const row = document.createElement("div");
      row.setAttribute("role", "row");
      const cell = document.createElement("span");
      cell.setAttribute("role", "cell");
      cell.textContent = message;
      row.append(cell);
      preview.replaceChildren(row);
    };
    const setStale = () => {
      if (report.dataset.ready !== "true") return;
      report.dataset.ready = "false";
      reportState.textContent = "STALE";
      status.textContent = "输入已变化，请重新检查。";
      note.textContent = "当前报告已过期；重新检查后再复制。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latestSummary = "";
    };
    const fail = (message) => {
      input.setAttribute("aria-invalid", "true");
      error.textContent = message;
      status.textContent = "未生成报告，请修正输入。";
      report.dataset.ready = "false";
      reportState.textContent = "CHECK INPUT";
      rowCount.textContent = "0";
      columnCount.textContent = "0";
      raggedCount.textContent = "0";
      emptyCount.textContent = "0";
      delimiterLabel.textContent = "—";
      note.textContent = "检查只描述文本结构，不验证事实。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latestSummary = "";
      showPlaceholder("输入有误，修正后重新检查。");
    };
    const detectDelimiter = (text) => {
      const candidates = ["tab", "comma", "semicolon", "pipe"];
      const counts = Object.fromEntries(candidates.map((key) => [key, 0]));
      let quoted = false;
      for (let index = 0; index < text.length; index += 1) {
        const character = text[index];
        if (character === "\"") {
          if (quoted && text[index + 1] === "\"") {
            index += 1;
          } else {
            quoted = !quoted;
          }
          continue;
        }
        if (quoted) continue;
        for (const key of candidates) {
          if (character === delimiters[key].character) counts[key] += 1;
        }
      }
      let selected = candidates[0];
      for (const key of candidates.slice(1)) {
        if (counts[key] > counts[selected]) selected = key;
      }
      return counts[selected] === 0
        ? { character: ",", label: "单列" }
        : delimiters[selected];
    };
    const parseTable = (text, delimiter) => {
      const rows = [];
      let row = [];
      let field = "";
      let inQuotes = false;
      let justClosed = false;
      const pushField = () => {
        row.push(field);
        field = "";
        justClosed = false;
      };
      const pushRow = () => {
        pushField();
        rows.push(row);
        row = [];
      };
      for (let index = 0; index < text.length; index += 1) {
        const character = text[index];
        if (inQuotes) {
          if (character === "\"") {
            if (text[index + 1] === "\"") {
              field += "\"";
              index += 1;
            } else {
              inQuotes = false;
              justClosed = true;
            }
          } else {
            field += character;
          }
          continue;
        }
        if (justClosed) {
          if (character === delimiter) {
            pushField();
          } else if (character === "\n") {
            pushRow();
          } else if (!/\s/u.test(character)) {
            throw new Error("闭合引号后存在非法字符。");
          }
          continue;
        }
        if (character === delimiter) {
          pushField();
        } else if (character === "\n") {
          pushRow();
        } else if (character === "\"") {
          if (field.length > 0) throw new Error("双引号只能从字段开头进入。");
          inQuotes = true;
        } else {
          field += character;
        }
      }
      if (inQuotes) throw new Error("存在未闭合的双引号字段。");
      pushRow();
      return rows.filter((item) => !(item.length === 1 && item[0].trim() === ""));
    };
    const renderPreview = (rows, maximumColumns) => {
      const fragment = document.createDocumentFragment();
      const visibleColumns = Math.min(10, maximumColumns);
      rows.slice(0, 10).forEach((rowData, rowIndex) => {
        const row = document.createElement("div");
        row.setAttribute("role", "row");
        for (let columnIndex = 0; columnIndex < visibleColumns; columnIndex += 1) {
          const cell = document.createElement("span");
          cell.setAttribute("role", rowIndex === 0 ? "columnheader" : "cell");
          const value = rowData[columnIndex] || "";
          const characters = Array.from(value);
          cell.textContent = characters.length > 120 ? `${characters.slice(0, 120).join("")}…` : value;
          row.append(cell);
        }
        fragment.append(row);
      });
      preview.replaceChildren(fragment);
    };

    tableForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const normalized = input.value.replace(/\r\n?/g, "\n");
      const length = Array.from(normalized).length;
      input.removeAttribute("aria-invalid");
      error.textContent = "";
      if (normalized.trim() === "") {
        fail("请先粘贴至少一个非空单元格。");
        input.focus();
        return;
      }
      if (length > 20000) {
        fail(`输入共 ${length} 个字符，最多允许 20000 个。`);
        input.focus();
        return;
      }
      const selection = delimiterSelect.value === "auto"
        ? detectDelimiter(normalized)
        : delimiters[delimiterSelect.value];
      let rows;
      try {
        rows = parseTable(normalized, selection.character);
      } catch (parseError) {
        fail(parseError.message);
        input.focus();
        return;
      }
      if (rows.length === 0) {
        fail("没有找到可检查的逻辑行。");
        input.focus();
        return;
      }
      const maximumColumns = Math.max(...rows.map((item) => item.length));
      if (rows.length > 200) {
        fail(`检测到 ${rows.length} 个逻辑行，最多允许 200 行。`);
        input.focus();
        return;
      }
      if (maximumColumns > 20) {
        fail(`检测到最多 ${maximumColumns} 列，最多允许 20 列。`);
        input.focus();
        return;
      }
      const ragged = rows.filter((item) => item.length !== maximumColumns).length;
      const empty = rows.reduce((total, item) => total + item.filter((cell) => cell.trim() === "").length, 0);
      rowCount.textContent = String(rows.length);
      columnCount.textContent = String(maximumColumns);
      raggedCount.textContent = String(ragged);
      emptyCount.textContent = String(empty);
      delimiterLabel.textContent = selection.label;
      renderPreview(rows, maximumColumns);
      report.dataset.ready = "true";
      reportState.textContent = "READY";
      status.textContent = `检查完成：${rows.length} 行，最多 ${maximumColumns} 列。`;
      note.textContent = ragged > 0
        ? `发现 ${ragged} 行列数不齐；请回到原始资料逐行核对。`
        : "各行列数一致；内容事实仍需回到来源核对。";
      latestSummary = [
        "表格形状检查报告",
        `分隔符：${selection.label}`,
        `逻辑行：${rows.length}`,
        `最大列：${maximumColumns}`,
        `列数不齐：${ragged}`,
        `空单元格：${empty}`,
        "说明：本报告只描述文本结构，不验证事实。"
      ].join("\n");
      copyButton.disabled = false;
      copyStatus.textContent = "";
    });
    input.addEventListener("input", setStale);
    delimiterSelect.addEventListener("change", setStale);
    tableForm.querySelectorAll("[data-table-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        input.value = presets[button.dataset.tablePreset];
        delimiterSelect.value = "auto";
        input.removeAttribute("aria-invalid");
        error.textContent = "";
        setStale();
        status.textContent = "示例已装载，点击检查生成报告。";
        input.focus();
      });
    });
    copyButton.addEventListener("click", async () => {
      if (!latestSummary) return;
      try {
        await copyText(latestSummary);
        copyStatus.textContent = "报告摘要已复制。";
      } catch (_error) {
        copyStatus.textContent = "浏览器未允许复制，请手动记录上方统计。";
      }
    });
    tableForm.addEventListener("reset", () => {
      window.setTimeout(() => {
        input.removeAttribute("aria-invalid");
        error.textContent = "";
        status.textContent = "等待粘贴表格。";
        report.dataset.ready = "false";
        reportState.textContent = "STANDBY";
        rowCount.textContent = "0";
        columnCount.textContent = "0";
        raggedCount.textContent = "0";
        emptyCount.textContent = "0";
        delimiterLabel.textContent = "—";
        note.textContent = "检查只描述文本结构，不验证事实。";
        copyButton.disabled = true;
        copyStatus.textContent = "";
        latestSummary = "";
        showPlaceholder();
      }, 0);
    });
  }

  const deskSearch = document.querySelector("[data-desk-search]");
  if (deskSearch) {
    const query = deskSearch.querySelector("input");
    const result = deskSearch.querySelector("[data-desk-result]");
    const folders = [
      { href: "article.html#source", label: "来源核对笔记", words: ["来源", "核对", "证据", "笔记", "规则"] },
      { href: "tool.html", label: "表格形状检查器", words: ["表格", "csv", "tsv", "分隔", "列", "空单元"] },
      { href: "legal.html", label: "公开说明", words: ["披露", "推广", "隐私", "更正", "边界", "利益"] },
      { href: "index.html", label: "研究桌首页", words: ["首页", "研究", "桌面", "资料夹"] }
    ];
    const showSearchResult = (prefix, folder) => {
      const text = document.createTextNode(prefix);
      const link = document.createElement("a");
      link.href = folder.href;
      link.textContent = folder.label;
      result.replaceChildren(text, link, document.createTextNode("。"));
    };
    deskSearch.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = query.value.trim();
      if (!value) {
        result.textContent = "请输入一个研究词。";
        query.focus();
        return;
      }
      const normalized = value.toLocaleLowerCase();
      const folder = folders.find((item) => item.words.some((word) => normalized.includes(word)));
      if (folder) {
        showSearchResult("最近的资料夹：", folder);
      } else {
        showSearchResult("未找到精确标签，建议先返回", folders[3]);
      }
    });
    query.addEventListener("input", () => {
      result.textContent = "输入已变化，提交后重新查找。";
    });
  }
})();
