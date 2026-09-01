(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var proofKey = "mc112-proof";

  function unicodeLength(value) {
    return Array.from(value).length;
  }

  function normalizedWords(value) {
    return value.normalize("NFKC").trim().replace(/\s+/gu, " ");
  }

  function normalizedKey(value) {
    return normalizedWords(value).toLocaleLowerCase();
  }

  function replaceChildrenWithText(node, value) {
    if (!node) return;
    node.replaceChildren(document.createTextNode(value));
  }

  function appendTextItem(parent, tagName, value) {
    var item = document.createElement(tagName);
    item.textContent = value;
    parent.appendChild(item);
    return item;
  }

  function clipboardWrite(value, status, successMessage) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      replaceChildrenWithText(status, "当前浏览器不支持自动复制，请手动选择内容。");
      return;
    }
    navigator.clipboard.writeText(value).then(function () {
      replaceChildrenWithText(status, successMessage);
    }).catch(function () {
      replaceChildrenWithText(status, "复制失败，请手动选择内容。");
    });
  }

  function setProof(mode) {
    var next = mode === "mono" ? "mono" : "color";
    root.dataset.mc112Proof = next;
    document.querySelectorAll("[data-mc112-proof-toggle]").forEach(function (button) {
      var isMono = next === "mono";
      button.setAttribute("aria-pressed", String(isMono));
      button.textContent = isMono ? "恢复彩色封面" : "切换黑白校样";
    });
  }

  try {
    setProof(localStorage.getItem(proofKey) || root.dataset.mc112Proof);
  } catch (error) {
    setProof(root.dataset.mc112Proof);
  }

  document.querySelectorAll("[data-mc112-proof-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      var next = root.dataset.mc112Proof === "mono" ? "color" : "mono";
      setProof(next);
      try {
        localStorage.setItem(proofKey, next);
      } catch (error) {
        /* The visual switch still works when storage is unavailable. */
      }
    });
  });

  var menuButton = document.querySelector(".mc112-menu");
  var menu = document.getElementById("mc112-nav");

  function closeMenu(restoreFocus) {
    if (!menuButton) return;
    delete body.dataset.mc112Menu;
    menuButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) menuButton.focus();
  }

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      var opening = body.dataset.mc112Menu !== "open";
      if (!opening) {
        closeMenu(false);
        return;
      }
      body.dataset.mc112Menu = "open";
      menuButton.setAttribute("aria-expanded", "true");
      var firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && body.dataset.mc112Menu === "open") closeMenu(true);
    });
  }

  var progress = document.querySelector("[data-mc112-progress]");
  var progressLabel = document.querySelector("[data-mc112-progress-label]");
  if (progress) {
    var updateProgress = function () {
      var available = document.documentElement.scrollHeight - window.innerHeight;
      var amount = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100;
      root.style.setProperty("--mc112-read", amount.toFixed(1) + "%");
      progress.setAttribute("aria-label", "阅读进度 " + Math.round(amount) + "%");
      if (progressLabel) progressLabel.textContent = Math.round(amount) + "%";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  var storyButton = document.querySelector("[data-mc112-copy-story]");
  if (storyButton) {
    storyButton.addEventListener("click", function () {
      var note = document.querySelector("[data-mc112-story-note]");
      var status = document.querySelector("[data-mc112-story-status]");
      clipboardWrite(note ? note.textContent.trim() : "", status, "封面交接已复制。");
    });
  }

  var policyButton = document.querySelector("[data-mc112-copy-policy]");
  if (policyButton) {
    policyButton.addEventListener("click", function () {
      var note = document.querySelector("[data-mc112-policy-note]");
      var status = document.querySelector("[data-mc112-policy-status]");
      clipboardWrite(note ? note.textContent.trim() : "", status, "编辑边界摘要已复制。");
    });
  }

  var searchForm = document.querySelector("[data-mc112-search]");
  if (searchForm) {
    var queryInput = document.getElementById("mc112-query");
    var searchResult = document.querySelector("[data-mc112-search-result]");
    var routes = [
      { href: "article.html", label: "封面故事：城市开始发光", words: "story city night light article 封面故事 城市 夜晚 光线" },
      { href: "tool.html", label: "批量封面文字适配审计器", words: "fit copy title line tool 文字 适配 标题 封面线" },
      { href: "legal.html", label: "版权、署名与编辑边界", words: "copyright right font privacy correction legal 版权 字体 隐私 更正" },
      { href: "index.html", label: "本期封面与目录", words: "cover issue home magazine 封面 本期 首页 杂志" }
    ];

    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var raw = queryInput ? queryInput.value : "";
      if (unicodeLength(raw) > 80) {
        replaceChildrenWithText(searchResult, "线索最多 80 个 Unicode 字符。");
        return;
      }
      var query = normalizedKey(raw);
      if (!query) {
        replaceChildrenWithText(searchResult, "请输入页面名称或主题线索。");
        return;
      }
      var match = routes.find(function (route) {
        return normalizedKey(route.label + " " + route.words).includes(query);
      });
      searchResult.replaceChildren();
      if (!match) {
        searchResult.appendChild(document.createTextNode("没有匹配公开页面。请缩短线索，或"));
        var homeLink = document.createElement("a");
        homeLink.href = "index.html";
        homeLink.textContent = "返回本期封面";
        searchResult.appendChild(homeLink);
        searchResult.appendChild(document.createTextNode("。"));
        return;
      }
      searchResult.appendChild(document.createTextNode("找到："));
      var routeLink = document.createElement("a");
      routeLink.href = match.href;
      routeLink.textContent = match.label;
      searchResult.appendChild(routeLink);
      searchResult.appendChild(document.createTextNode("。"));
    });
  }

  var copyForm = document.querySelector("[data-mc112-copy-form]");
  if (!copyForm) return;

  var rowsInput = document.getElementById("mc112-rows");
  var errorNode = document.querySelector("[data-mc112-error]");
  var formStatus = document.querySelector("[data-mc112-form-status]");
  var report = document.querySelector(".mc112-report");
  var reportState = document.querySelector("[data-mc112-report-state]");
  var countNode = document.querySelector("[data-mc112-count]");
  var fitNode = document.querySelector("[data-mc112-fit]");
  var overflowNode = document.querySelector("[data-mc112-overflow]");
  var hierarchyNode = document.querySelector("[data-mc112-hierarchy]");
  var findingSummary = document.querySelector("[data-mc112-finding-summary]");
  var findingList = document.querySelector("[data-mc112-finding-list]");
  var slotSummary = document.querySelector("[data-mc112-slot-summary]");
  var slotList = document.querySelector("[data-mc112-slot-list]");
  var copyReportButton = document.querySelector("[data-mc112-copy-report]");
  var copyStatus = document.querySelector("[data-mc112-copy-status]");
  var noteNode = document.querySelector("[data-mc112-note]");
  var currentReport = "";
  var allowedRoles = ["主标题", "眉题", "摘要", "封面线"];
  var plainInteger = /^(?:[1-9]|[1-9][0-9]+)$/;
  var controlCharacter = /\p{Cc}/u;
  var presets = {
    ready: "C-01 | 主标题 | 城市开始发光 | 8 | 2\nC-02 | 眉题 | 夜行者手册 | 8 | 1\nC-03 | 摘要 | 玻璃街灯与窗口重画夜色 | 9 | 2\nC-04 | 封面线 | 凌晨两点的便利店 | 10 | 1",
    overflow: "C-01 | 主标题 | 太阳落下以后城市开始发出自己的光 | 6 | 2\nC-02 | 眉题 | 夜行者手册 | 8 | 1\nC-03 | 摘要 | 十二扇窗口组成另一张地图 | 8 | 2",
    hierarchy: "C-01 | 主标题 | 城市开始发光 | 8 | 2\nC-02 | 主标题 | 夜行者手册 | 8 | 2\nC-03 | 封面线 | 末班电车 | 8 | 1\nC-04 | 封面线 | 末班电车 | 8 | 1",
    mixed: "C-01 | 眉题 | 夜行者手册 | 8 | 1\nC-02 | 摘要 | 太阳落下以后城市开始发出自己的光 | 6 | 2\nC-03 | 封面线 | 雨后的天台 | 8 | 1\nC-04 | 封面线 | 雨后的天台 | 8 | 1"
  };

  function clearReport() {
    currentReport = "";
    report.dataset.ready = "false";
    reportState.textContent = "UNSET";
    countNode.textContent = "0";
    fitNode.textContent = "0";
    overflowNode.textContent = "0";
    hierarchyNode.textContent = "0";
    findingSummary.textContent = "等待计算";
    replaceChildrenWithText(findingList, "");
    appendTextItem(findingList, "li", "报告生成后在此显示溢出、主标题与重复文案提示。");
    slotSummary.textContent = "等待计算";
    replaceChildrenWithText(slotList, "等待封面文案。");
    copyReportButton.disabled = true;
    replaceChildrenWithText(copyStatus, "");
  }

  function markStale() {
    replaceChildrenWithText(errorNode, "");
    if (report.dataset.ready === "true") {
      report.dataset.ready = "false";
      reportState.textContent = "STALE";
      copyReportButton.disabled = true;
      currentReport = "";
    }
    replaceChildrenWithText(formStatus, rowsInput.value.trim() ? "输入已更新，请生成报告。" : "等待至少三条文案。");
    replaceChildrenWithText(copyStatus, "");
  }

  function parseRows(raw) {
    if (unicodeLength(raw) > 12000) throw new Error("总输入最多 12000 个 Unicode 字符。");
    var lines = raw.split(/\r?\n/u).filter(function (line) { return line.trim(); });
    if (lines.length < 3 || lines.length > 80) throw new Error("请输入 3–80 条非空封面文案。");
    var idKeys = new Set();
    return lines.map(function (line, index) {
      var parts = line.split("|").map(function (part) { return part.trim(); });
      var lineNumber = index + 1;
      if (parts.length !== 5) throw new Error("第 " + lineNumber + " 行必须恰好包含 5 个字段。");
      var id = normalizedWords(parts[0]);
      var role = normalizedWords(parts[1]);
      var copy = normalizedWords(parts[2]);
      var idLength = unicodeLength(id);
      var copyLength = unicodeLength(copy);
      if (idLength < 2 || idLength > 16) throw new Error("第 " + lineNumber + " 行文案 ID 须为 2–16 个 Unicode 字符。");
      if (controlCharacter.test(id)) throw new Error("第 " + lineNumber + " 行文案 ID 含控制字符。");
      var idKey = normalizedKey(id);
      if (idKeys.has(idKey)) throw new Error("第 " + lineNumber + " 行文案 ID 与前文归一后重复。");
      idKeys.add(idKey);
      if (!allowedRoles.includes(role)) throw new Error("第 " + lineNumber + " 行层级须为主标题、眉题、摘要或封面线。");
      if (copyLength < 1 || copyLength > 200) throw new Error("第 " + lineNumber + " 行文字须为 1–200 个 Unicode 字符。");
      if (controlCharacter.test(copy)) throw new Error("第 " + lineNumber + " 行文字含控制字符。");
      if (!plainInteger.test(parts[3])) throw new Error("第 " + lineNumber + " 行每行字符须为 1–40 的普通整数。");
      if (!plainInteger.test(parts[4])) throw new Error("第 " + lineNumber + " 行最大行数须为 1–8 的普通整数。");
      var perLine = Number(parts[3]);
      var maxLines = Number(parts[4]);
      if (perLine < 1 || perLine > 40) throw new Error("第 " + lineNumber + " 行每行字符须在 1–40 之间。");
      if (maxLines < 1 || maxLines > 8) throw new Error("第 " + lineNumber + " 行最大行数须在 1–8 之间。");
      return {
        id: id,
        role: role,
        copy: copy,
        copyKey: normalizedKey(copy),
        count: copyLength,
        perLine: perLine,
        maxLines: maxLines,
        estimatedLines: Math.ceil(copyLength / perLine),
        duplicate: false
      };
    });
  }

  function evaluate(records) {
    var overflowFindings = [];
    var hierarchyFindings = [];
    var copyKeys = new Map();
    var primaryTitles = records.filter(function (record) { return record.role === "主标题"; });
    if (primaryTitles.length === 0) hierarchyFindings.push("层级：缺少主标题，封面必须且只能有一个主标题。");
    if (primaryTitles.length > 1) hierarchyFindings.push("层级：检测到 " + primaryTitles.length + " 个主标题，封面必须且只能有一个主标题。");
    records.forEach(function (record) {
      if (record.estimatedLines > record.maxLines) {
        overflowFindings.push(record.id + "：估算 " + record.estimatedLines + " 行，超过上限 " + record.maxLines + " 行。");
      }
      if (copyKeys.has(record.copyKey)) {
        record.duplicate = true;
        hierarchyFindings.push(record.id + "：文案与 " + copyKeys.get(record.copyKey) + " 归一后重复。");
      } else {
        copyKeys.set(record.copyKey, record.id);
      }
    });
    return { overflow: overflowFindings, hierarchy: hierarchyFindings };
  }

  function renderReport(records, findings) {
    var allFindings = findings.overflow.concat(findings.hierarchy);
    var overflowIds = new Set(findings.overflow.map(function (finding) { return finding.split("：")[0]; }));
    var fitCount = records.filter(function (record) {
      return !overflowIds.has(record.id) && !record.duplicate;
    }).length;
    var state = "FIT READY";
    if (findings.overflow.length && findings.hierarchy.length) state = "REVIEW " + allFindings.length;
    else if (findings.overflow.length) state = "OVERFLOW " + findings.overflow.length;
    else if (findings.hierarchy.length) state = "HIERARCHY " + findings.hierarchy.length;

    report.dataset.ready = "true";
    reportState.textContent = state;
    countNode.textContent = String(records.length);
    fitNode.textContent = String(fitCount);
    overflowNode.textContent = String(findings.overflow.length);
    hierarchyNode.textContent = String(findings.hierarchy.length);
    findingSummary.textContent = allFindings.length ? allFindings.length + " 条提示" : "无机械提示";
    findingList.replaceChildren();
    if (!allFindings.length) appendTextItem(findingList, "li", "层级唯一，所有文案均在所填字符容量内。");
    allFindings.slice(0, 40).forEach(function (finding) { appendTextItem(findingList, "li", finding); });
    if (allFindings.length > 40) appendTextItem(findingList, "li", "界面仅显示前 40 条；完整复制报告保留全部 " + allFindings.length + " 条提示。");

    slotSummary.textContent = records.length + " 个文字槽";
    slotList.replaceChildren();
    records.slice(0, 40).forEach(function (record, index) {
      var article = document.createElement("article");
      appendTextItem(article, "b", String(index + 1).padStart(2, "0"));
      appendTextItem(article, "small", record.role + " / " + record.id);
      appendTextItem(article, "strong", record.copy);
      var status = record.estimatedLines > record.maxLines ? "OVERFLOW +" + (record.estimatedLines - record.maxLines) : "FIT";
      if (record.duplicate) status += " · DUPLICATE";
      appendTextItem(article, "span", record.count + " CHARS / " + record.estimatedLines + " OF " + record.maxLines + " LINES · " + status);
      slotList.appendChild(article);
    });
    if (records.length > 40) appendTextItem(slotList, "p", "界面仅显示前 40 个文字槽；完整复制报告保留全部 " + records.length + " 条记录。");

    var reportLines = [
      "封面文字适配报告",
      "状态：" + state,
      "文案：" + records.length + "｜适配：" + fitCount + "｜溢出：" + findings.overflow.length + "｜层级提示：" + findings.hierarchy.length,
      "",
      "提示："
    ];
    if (!allFindings.length) reportLines.push("- 无机械提示。");
    allFindings.forEach(function (finding) { reportLines.push("- " + finding); });
    reportLines.push("", "文字槽：");
    records.forEach(function (record, index) {
      var status = record.estimatedLines > record.maxLines ? "OVERFLOW +" + (record.estimatedLines - record.maxLines) : "FIT";
      if (record.duplicate) status += " / DUPLICATE";
      reportLines.push(String(index + 1).padStart(2, "0") + ". " + record.id + "｜" + record.role + "｜" + record.copy + "｜" + record.count + " 字符｜" + record.estimatedLines + "/" + record.maxLines + " 行｜" + status);
    });
    reportLines.push("", noteNode.textContent.trim());
    currentReport = reportLines.join("\n");
    copyReportButton.disabled = false;
    replaceChildrenWithText(copyStatus, "");
    replaceChildrenWithText(formStatus, "报告已生成，仍须进入真实字体与输出校样。");
  }

  copyForm.addEventListener("submit", function (event) {
    event.preventDefault();
    replaceChildrenWithText(errorNode, "");
    try {
      var records = parseRows(rowsInput.value.normalize("NFKC"));
      renderReport(records, evaluate(records));
    } catch (error) {
      clearReport();
      replaceChildrenWithText(errorNode, error.message);
      replaceChildrenWithText(formStatus, "请修正输入后重新生成。");
      rowsInput.focus();
    }
  });

  copyForm.addEventListener("reset", function () {
    window.setTimeout(function () {
      clearReport();
      replaceChildrenWithText(errorNode, "");
      replaceChildrenWithText(formStatus, "等待至少三条文案。");
    }, 0);
  });

  rowsInput.addEventListener("input", markStale);

  document.querySelectorAll("[data-mc112-preset]").forEach(function (button) {
    button.addEventListener("click", function () {
      rowsInput.value = presets[button.dataset.mc112Preset] || "";
      markStale();
      replaceChildrenWithText(errorNode, "");
      rowsInput.focus();
    });
  });

  copyReportButton.addEventListener("click", function () {
    clipboardWrite(currentReport, copyStatus, "完整适配报告已复制。");
  });
})();
