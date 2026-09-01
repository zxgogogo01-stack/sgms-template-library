(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var modeKey = "pm113-mode";

  function unicodeLength(value) {
    return Array.from(value).length;
  }

  function normalizeWords(value) {
    return value.normalize("NFKC").trim().replace(/\s+/gu, " ");
  }

  function normalizeKey(value) {
    return normalizeWords(value).toLocaleLowerCase();
  }

  function putText(node, value) {
    if (node) node.replaceChildren(document.createTextNode(value));
  }

  function addText(parent, tag, value) {
    var element = document.createElement(tag);
    element.textContent = value;
    parent.appendChild(element);
    return element;
  }

  function copyText(value, status, message) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      putText(status, "当前浏览器不支持自动复制，请手动选择内容。");
      return;
    }
    navigator.clipboard.writeText(value).then(function () {
      putText(status, message);
    }).catch(function () {
      putText(status, "复制失败，请手动选择内容。");
    });
  }

  function setMode(value) {
    var next = value === "blueprint" ? "blueprint" : "lab";
    root.dataset.pm113Mode = next;
    document.querySelectorAll("[data-pm113-mode-toggle]").forEach(function (button) {
      var blue = next === "blueprint";
      button.setAttribute("aria-pressed", String(blue));
      button.textContent = blue ? "恢复白光模式" : "切换蓝图模式";
    });
  }

  try {
    setMode(localStorage.getItem(modeKey) || root.dataset.pm113Mode);
  } catch (error) {
    setMode(root.dataset.pm113Mode);
  }

  document.querySelectorAll("[data-pm113-mode-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      var next = root.dataset.pm113Mode === "blueprint" ? "lab" : "blueprint";
      setMode(next);
      try {
        localStorage.setItem(modeKey, next);
      } catch (error) {
        /* Mode remains usable without persistent storage. */
      }
    });
  });

  var menuButton = document.querySelector(".pm113-menu");
  var menu = document.getElementById("pm113-nav");

  function closeMenu(restoreFocus) {
    if (!menuButton) return;
    delete body.dataset.pm113Menu;
    menuButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) menuButton.focus();
  }

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      if (body.dataset.pm113Menu === "open") {
        closeMenu(false);
        return;
      }
      body.dataset.pm113Menu = "open";
      menuButton.setAttribute("aria-expanded", "true");
      var firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && body.dataset.pm113Menu === "open") closeMenu(true);
    });
  }

  var progressBar = document.querySelector("[data-pm113-progress]");
  var progressLabel = document.querySelector("[data-pm113-progress-label]");
  if (progressBar) {
    var updateProgress = function () {
      var available = document.documentElement.scrollHeight - window.innerHeight;
      var percent = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100;
      root.style.setProperty("--pm113-read", percent.toFixed(1) + "%");
      progressBar.setAttribute("aria-label", "阅读进度 " + Math.round(percent) + "%");
      if (progressLabel) progressLabel.textContent = Math.round(percent) + "%";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  var recordCopy = document.querySelector("[data-pm113-copy-record]");
  if (recordCopy) {
    recordCopy.addEventListener("click", function () {
      var note = document.querySelector("[data-pm113-record-note]");
      var status = document.querySelector("[data-pm113-record-status]");
      copyText(note ? note.textContent.trim() : "", status, "计量交接已复制。");
    });
  }

  var policyCopy = document.querySelector("[data-pm113-copy-policy]");
  if (policyCopy) {
    policyCopy.addEventListener("click", function () {
      var note = document.querySelector("[data-pm113-policy-note]");
      var status = document.querySelector("[data-pm113-policy-status]");
      copyText(note ? note.textContent.trim() : "", status, "质量边界摘要已复制。");
    });
  }

  var searchForm = document.querySelector("[data-pm113-search]");
  if (searchForm) {
    var searchInput = document.getElementById("pm113-query");
    var searchResult = document.querySelector("[data-pm113-search-result]");
    var routes = [
      { href: "article.html", label: "追溯记录：一微米如何进入出货记录", words: "trace record datum article 追溯 记录 微米 图纸 量具" },
      { href: "tool.html", label: "批量尺寸链最坏情况核算器", words: "stack tolerance chain tool 尺寸链 公差 核算 最坏情况" },
      { href: "legal.html", label: "图纸、计量与质量边界", words: "quality calibration legal correction 图纸 计量 质量 校准 更正" },
      { href: "index.html", label: "精密计量室首页", words: "lab home metrology measurement 计量室 首页 测量 能力" }
    ];
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var raw = searchInput ? searchInput.value : "";
      if (unicodeLength(raw) > 80) {
        putText(searchResult, "线索最多 80 个 Unicode 字符。");
        return;
      }
      var query = normalizeKey(raw);
      if (!query) {
        putText(searchResult, "请输入记录名称或主题线索。");
        return;
      }
      var match = routes.find(function (route) {
        return normalizeKey(route.label + " " + route.words).includes(query);
      });
      searchResult.replaceChildren();
      if (!match) {
        searchResult.appendChild(document.createTextNode("没有匹配公开记录。请缩短线索，或"));
        var home = document.createElement("a");
        home.href = "index.html";
        home.textContent = "返回计量室";
        searchResult.appendChild(home);
        searchResult.appendChild(document.createTextNode("。"));
        return;
      }
      searchResult.appendChild(document.createTextNode("找到："));
      var link = document.createElement("a");
      link.href = match.href;
      link.textContent = match.label;
      searchResult.appendChild(link);
      searchResult.appendChild(document.createTextNode("。"));
    });
  }

  var stackForm = document.querySelector("[data-pm113-stack-form]");
  if (!stackForm) return;

  var bandInput = document.getElementById("pm113-band");
  var rowsInput = document.getElementById("pm113-rows");
  var errorNode = document.querySelector("[data-pm113-error]");
  var formStatus = document.querySelector("[data-pm113-form-status]");
  var result = document.querySelector(".pm113-result");
  var reportState = document.querySelector("[data-pm113-report-state]");
  var chainCount = document.querySelector("[data-pm113-chain-count]");
  var termCount = document.querySelector("[data-pm113-term-count]");
  var wideCount = document.querySelector("[data-pm113-wide-count]");
  var singleCount = document.querySelector("[data-pm113-single-count]");
  var findingSummary = document.querySelector("[data-pm113-finding-summary]");
  var findingList = document.querySelector("[data-pm113-finding-list]");
  var chainSummary = document.querySelector("[data-pm113-chain-summary]");
  var chainList = document.querySelector("[data-pm113-chain-list]");
  var noteNode = document.querySelector("[data-pm113-note]");
  var copyButton = document.querySelector("[data-pm113-copy-report]");
  var copyStatus = document.querySelector("[data-pm113-copy-status]");
  var currentReport = "";
  var ordinaryPositive = /^(?:0\.[0-9]{1,3}|[1-9][0-9]*(?:\.[0-9]{1,3})?)$/;
  var ordinaryNonnegative = /^(?:0|0\.[0-9]{1,3}|[1-9][0-9]*(?:\.[0-9]{1,3})?)$/;
  var controlCharacter = /\p{Cc}/u;
  var presets = {
    controlled: "CHAIN-A | BASE-01 | + | 25.000 | 0.020 | 0.010\nCHAIN-A | PIN-02 | + | 8.000 | 0.015 | 0.015\nCHAIN-A | COVER-03 | - | 12.000 | 0.010 | 0.010",
    wide: "CHAIN-B | FRAME-01 | + | 80.000 | 0.180 | 0.180\nCHAIN-B | SPACER-02 | + | 12.000 | 0.120 | 0.120\nCHAIN-B | SHAFT-03 | - | 35.000 | 0.100 | 0.100",
    single: "CHAIN-C | DATUM-ONLY | + | 16.000 | 0.010 | 0.010\nCHAIN-D | BASE-01 | + | 30.000 | 0.020 | 0.020\nCHAIN-D | SHAFT-02 | - | 10.000 | 0.015 | 0.015",
    mixed: "CHAIN-E | DATUM-ONLY | + | 16.000 | 0.010 | 0.010\nCHAIN-F | FRAME-01 | + | 80.000 | 0.220 | 0.220\nCHAIN-F | SHAFT-02 | - | 35.000 | 0.180 | 0.180"
  };

  function toMicrons(value) {
    var parts = value.split(".");
    return Number(parts[0]) * 1000 + Number((parts[1] || "").padEnd(3, "0"));
  }

  function formatMillimeters(value) {
    var sign = value < 0 ? "-" : "";
    var absolute = Math.abs(value);
    return sign + Math.floor(absolute / 1000) + "." + String(absolute % 1000).padStart(3, "0");
  }

  function parseBand(raw) {
    var normalized = normalizeWords(raw);
    if (!ordinaryNonnegative.test(normalized)) throw new Error("允许总带宽须为 0–1000、最多三位小数的普通十进制数。");
    var value = toMicrons(normalized);
    if (value > 1000000) throw new Error("允许总带宽须在 0–1000 mm 之间。");
    return value;
  }

  function parseRows(raw) {
    if (unicodeLength(raw) > 12000) throw new Error("总输入最多 12000 个 Unicode 字符。");
    var lines = raw.split(/\r?\n/u).filter(function (line) { return line.trim(); });
    if (lines.length < 2 || lines.length > 100) throw new Error("请输入 2–100 条非空尺寸项。");
    var itemKeysByChain = new Map();
    return lines.map(function (line, index) {
      var fields = line.split("|").map(function (field) { return field.trim(); });
      var number = index + 1;
      if (fields.length !== 6) throw new Error("第 " + number + " 行必须恰好包含 6 个字段。");
      var chain = normalizeWords(fields[0]);
      var item = normalizeWords(fields[1]);
      var chainLength = unicodeLength(chain);
      var itemLength = unicodeLength(item);
      if (chainLength < 2 || chainLength > 20) throw new Error("第 " + number + " 行链组须为 2–20 个 Unicode 字符。");
      if (itemLength < 2 || itemLength > 120) throw new Error("第 " + number + " 行尺寸项须为 2–120 个 Unicode 字符。");
      if (controlCharacter.test(chain) || controlCharacter.test(item)) throw new Error("第 " + number + " 行链组或尺寸项含控制字符。");
      var chainKey = normalizeKey(chain);
      var itemKey = normalizeKey(item);
      if (!itemKeysByChain.has(chainKey)) itemKeysByChain.set(chainKey, new Set());
      if (itemKeysByChain.get(chainKey).has(itemKey)) throw new Error("第 " + number + " 行尺寸项与同链组前文归一后重复。");
      itemKeysByChain.get(chainKey).add(itemKey);
      var direction = normalizeWords(fields[2]);
      if (direction !== "+" && direction !== "-") throw new Error("第 " + number + " 行方向须为 + 或 -。");
      if (!ordinaryPositive.test(fields[3])) throw new Error("第 " + number + " 行名义值须为 0.001–1000000、最多三位小数的普通十进制数。");
      if (!ordinaryNonnegative.test(fields[4]) || !ordinaryNonnegative.test(fields[5])) throw new Error("第 " + number + " 行上下偏差须为 0–1000、最多三位小数的普通十进制数。");
      var nominal = toMicrons(fields[3]);
      var upper = toMicrons(fields[4]);
      var lower = toMicrons(fields[5]);
      if (nominal < 1 || nominal > 1000000000) throw new Error("第 " + number + " 行名义值须在 0.001–1000000 mm 之间。");
      if (upper > 1000000 || lower > 1000000) throw new Error("第 " + number + " 行上下偏差须在 0–1000 mm 之间。");
      if (nominal - lower <= 0) throw new Error("第 " + number + " 行下偏差必须小于名义值，使尺寸下限保持大于 0。");
      return { chain: chain, chainKey: chainKey, item: item, direction: direction, nominal: nominal, upper: upper, lower: lower };
    });
  }

  function calculate(records, band) {
    var groups = new Map();
    records.forEach(function (record) {
      if (!groups.has(record.chainKey)) groups.set(record.chainKey, { name: record.chain, records: [], nominal: 0, minimum: 0, maximum: 0 });
      var group = groups.get(record.chainKey);
      group.records.push(record);
      if (record.direction === "+") {
        group.nominal += record.nominal;
        group.minimum += record.nominal - record.lower;
        group.maximum += record.nominal + record.upper;
      } else {
        group.nominal -= record.nominal;
        group.minimum -= record.nominal + record.upper;
        group.maximum -= record.nominal - record.lower;
      }
    });
    var chains = Array.from(groups.values()).map(function (group) {
      group.width = group.maximum - group.minimum;
      group.single = group.records.length === 1;
      group.wide = group.width > band;
      return group;
    });
    var wide = chains.filter(function (chain) { return chain.wide; });
    var single = chains.filter(function (chain) { return chain.single; });
    var findings = [];
    wide.forEach(function (chain) { findings.push(chain.name + "：最坏情况带宽 " + formatMillimeters(chain.width) + " mm，超过门槛 " + formatMillimeters(band) + " mm。"); });
    single.forEach(function (chain) { findings.push(chain.name + "：仅含 1 个尺寸项，尚未形成可复核的尺寸链。"); });
    return { chains: chains, wide: wide, single: single, findings: findings, band: band };
  }

  function clearReport() {
    currentReport = "";
    result.dataset.ready = "false";
    reportState.textContent = "UNSET";
    chainCount.textContent = "0";
    termCount.textContent = "0";
    wideCount.textContent = "0";
    singleCount.textContent = "0";
    findingSummary.textContent = "等待计算";
    findingList.replaceChildren();
    addText(findingList, "li", "报告生成后在此显示宽带和单项链提示。");
    chainSummary.textContent = "等待计算";
    putText(chainList, "等待尺寸项。");
    copyButton.disabled = true;
    putText(copyStatus, "");
  }

  function markStale() {
    putText(errorNode, "");
    if (result.dataset.ready === "true") {
      result.dataset.ready = "false";
      reportState.textContent = "STALE";
      currentReport = "";
      copyButton.disabled = true;
    }
    putText(formStatus, rowsInput.value.trim() ? "输入已更新，请重新生成报告。" : "等待至少两条尺寸项。");
    putText(copyStatus, "");
  }

  function render(records, analysis) {
    var state = "WITHIN BAND";
    if (analysis.wide.length && analysis.single.length) state = "REVIEW " + analysis.findings.length;
    else if (analysis.wide.length) state = "WIDE BANDS " + analysis.wide.length;
    else if (analysis.single.length) state = "SINGLE TERMS " + analysis.single.length;
    result.dataset.ready = "true";
    reportState.textContent = state;
    chainCount.textContent = String(analysis.chains.length);
    termCount.textContent = String(records.length);
    wideCount.textContent = String(analysis.wide.length);
    singleCount.textContent = String(analysis.single.length);
    findingSummary.textContent = analysis.findings.length ? analysis.findings.length + " 条提示" : "无机械提示";
    findingList.replaceChildren();
    if (!analysis.findings.length) addText(findingList, "li", "所有链组均含至少两个尺寸项，且最坏情况带宽未超过所填门槛。");
    analysis.findings.slice(0, 40).forEach(function (finding) { addText(findingList, "li", finding); });
    if (analysis.findings.length > 40) addText(findingList, "li", "界面仅显示前 40 条；完整复制报告保留全部 " + analysis.findings.length + " 条提示。");
    chainSummary.textContent = analysis.chains.length + " 个链组";
    chainList.replaceChildren();
    analysis.chains.slice(0, 40).forEach(function (chain, index) {
      var card = document.createElement("article");
      addText(card, "b", String(index + 1).padStart(2, "0"));
      addText(card, "small", chain.name + " / " + chain.records.length + " TERMS");
      addText(card, "strong", formatMillimeters(chain.minimum) + " → " + formatMillimeters(chain.maximum));
      var flags = [];
      if (chain.wide) flags.push("WIDE");
      if (chain.single) flags.push("SINGLE");
      if (!flags.length) flags.push("WITHIN BAND");
      addText(card, "span", "NOMINAL " + formatMillimeters(chain.nominal) + " · WIDTH " + formatMillimeters(chain.width) + " · " + flags.join(" / "));
      chainList.appendChild(card);
    });
    if (analysis.chains.length > 40) addText(chainList, "p", "界面仅显示前 40 个链组；完整复制报告保留全部 " + analysis.chains.length + " 个链组。");
    var lines = [
      "尺寸链最坏情况报告",
      "状态：" + state,
      "门槛：" + formatMillimeters(analysis.band) + " mm",
      "链组：" + analysis.chains.length + "｜尺寸项：" + records.length + "｜宽带：" + analysis.wide.length + "｜单项链：" + analysis.single.length,
      "",
      "提示："
    ];
    if (!analysis.findings.length) lines.push("- 无机械提示。");
    analysis.findings.forEach(function (finding) { lines.push("- " + finding); });
    lines.push("", "链组窗口：");
    analysis.chains.forEach(function (chain, index) {
      var flags = [];
      if (chain.wide) flags.push("WIDE");
      if (chain.single) flags.push("SINGLE");
      if (!flags.length) flags.push("WITHIN BAND");
      lines.push(String(index + 1).padStart(2, "0") + ". " + chain.name + "｜" + chain.records.length + " 项｜名义 " + formatMillimeters(chain.nominal) + "｜最小 " + formatMillimeters(chain.minimum) + "｜最大 " + formatMillimeters(chain.maximum) + "｜带宽 " + formatMillimeters(chain.width) + "｜" + flags.join(" / "));
    });
    lines.push("", "尺寸项：");
    records.forEach(function (record, index) {
      lines.push(String(index + 1).padStart(3, "0") + ". " + record.chain + "｜" + record.item + "｜" + record.direction + "｜" + formatMillimeters(record.nominal) + "｜+" + formatMillimeters(record.upper) + "｜-" + formatMillimeters(record.lower));
    });
    lines.push("", noteNode.textContent.trim());
    currentReport = lines.join("\n");
    copyButton.disabled = false;
    putText(copyStatus, "");
    putText(formStatus, "报告已生成，仍须由合格人员回到真实图纸复核。");
  }

  stackForm.addEventListener("submit", function (event) {
    event.preventDefault();
    putText(errorNode, "");
    try {
      var band = parseBand(bandInput.value.normalize("NFKC"));
      var records = parseRows(rowsInput.value.normalize("NFKC"));
      render(records, calculate(records, band));
    } catch (error) {
      clearReport();
      putText(errorNode, error.message);
      putText(formStatus, "请修正输入后重新生成。");
      if (error.message.startsWith("允许总带宽")) bandInput.focus();
      else rowsInput.focus();
    }
  });

  stackForm.addEventListener("reset", function () {
    window.setTimeout(function () {
      clearReport();
      putText(errorNode, "");
      putText(formStatus, "等待至少两条尺寸项。");
    }, 0);
  });

  bandInput.addEventListener("input", markStale);
  rowsInput.addEventListener("input", markStale);
  document.querySelectorAll("[data-pm113-preset]").forEach(function (button) {
    button.addEventListener("click", function () {
      bandInput.value = "0.300";
      rowsInput.value = presets[button.dataset.pm113Preset] || "";
      markStale();
      rowsInput.focus();
    });
  });
  copyButton.addEventListener("click", function () {
    copyText(currentReport, copyStatus, "完整尺寸链报告已复制。");
  });
})();
