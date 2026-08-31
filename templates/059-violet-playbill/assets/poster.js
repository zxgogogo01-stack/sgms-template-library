/* 059 · Violet Playbill interactions */
(function () {
  "use strict";

  var root = document.documentElement;
  var themeKey = "violet-playbill-059-theme";
  var themeButtons = Array.prototype.slice.call(document.querySelectorAll("[data-theme-toggle]"));
  function savedTheme() {
    try {
      var saved = localStorage.getItem(themeKey);
      if (saved === "dark" || saved === "light") return saved;
    } catch (error) {}
    return "dark";
  }
  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#171020" : "#f2e9da");
    themeButtons.forEach(function (button) {
      button.textContent = theme === "dark" ? "LIGHTS ON" : "LIGHTS OFF";
      button.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    });
  }
  setTheme(savedTheme());
  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next);
      try { localStorage.setItem(themeKey, next); } catch (error) {}
    });
  });

  var menuButton = document.querySelector(".vp59-menu-button");
  var menu = document.getElementById("vp59-menu");
  function closeMenu(returnFocus) {
    if (!menuButton || !menu) return;
    menu.classList.remove("vp59-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector("[aria-hidden]").textContent = "MENU";
    menuButton.querySelector(".vp59-sr").textContent = "打开导航";
    if (returnFocus) menuButton.focus();
  }
  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      var opening = menuButton.getAttribute("aria-expanded") !== "true";
      if (!opening) { closeMenu(false); return; }
      menu.classList.add("vp59-open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.querySelector("[aria-hidden]").textContent = "CLOSE";
      menuButton.querySelector(".vp59-sr").textContent = "关闭导航";
      var first = menu.querySelector("a");
      if (first) first.focus();
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") closeMenu(true);
    });
  }

  function copyText(text, callback) {
    function fallback() {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      var copied = false;
      try { copied = document.execCommand("copy"); } catch (error) {}
      area.remove();
      callback(copied);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { callback(true); }, fallback);
    } else {
      fallback();
    }
  }
  function bindCopy(buttonSelector, textSelector, statusSelector) {
    var button = document.querySelector(buttonSelector);
    var text = document.querySelector(textSelector);
    var status = document.querySelector(statusSelector);
    if (!button || !text || !status) return;
    button.addEventListener("click", function () {
      copyText(text.textContent.trim(), function (ok) {
        status.textContent = ok ? "已复制，可粘贴使用。" : "复制失败，请手动选择文本。";
      });
    });
  }
  bindCopy("[data-copy-handoff]", ".vp59-handoff p", "[data-handoff-status]");
  bindCopy("[data-copy-disclosure]", ".vp59-disclosure p", "[data-disclosure-status]");

  var progress = document.querySelector("[data-reading-progress]");
  if (progress) {
    var updateProgress = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? window.scrollY / max : 1;
      progress.style.width = Math.max(0, Math.min(100, ratio * 100)) + "%";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  function normalizedLines(text) {
    var seen = new Set();
    var lines = [];
    text.split(/\r?\n/).forEach(function (line) {
      var value = line.normalize("NFKC").trim();
      if (value && !seen.has(value)) {
        seen.add(value);
        lines.push(value);
      }
    });
    return lines;
  }

  var compareForm = document.getElementById("vp59-compare-form");
  if (compareForm) {
    var textA = document.getElementById("vp59-text-a");
    var textB = document.getElementById("vp59-text-b");
    var countA = document.querySelector("[data-count-a]");
    var countB = document.querySelector("[data-count-b]");
    var message = document.getElementById("vp59-compare-message");
    var state = document.querySelector("[data-compare-state]");
    var verdict = document.querySelector("[data-compare-verdict]");
    var commonCount = document.querySelector("[data-common-count]");
    var onlyACount = document.querySelector("[data-only-a-count]");
    var onlyBCount = document.querySelector("[data-only-b-count]");
    var commonList = document.querySelector("[data-common-list]");
    var onlyAList = document.querySelector("[data-only-a-list]");
    var onlyBList = document.querySelector("[data-only-b-list]");
    var copyButton = document.querySelector("[data-copy-comparison]");
    var copyStatus = document.querySelector("[data-comparison-status]");
    var resetButton = document.querySelector("[data-compare-reset]");
    var presetButtons = Array.prototype.slice.call(document.querySelectorAll("[data-compare-preset]"));
    var resultText = "";

    function replaceList(node, items, emptyLabel) {
      while (node.firstChild) node.removeChild(node.firstChild);
      (items.length ? items : [emptyLabel]).forEach(function (text) {
        var item = document.createElement("li");
        item.textContent = text;
        node.appendChild(item);
      });
    }
    function updateCounts() {
      countA.textContent = normalizedLines(textA.value).length + " 条";
      countB.textContent = normalizedLines(textB.value).length + " 条";
    }
    function blankResult(label) {
      state.textContent = label;
      verdict.textContent = "尚未生成对照";
      commonCount.textContent = "—";
      onlyACount.textContent = "—";
      onlyBCount.textContent = "—";
      replaceList(commonList, [], "等待比较");
      replaceList(onlyAList, [], "等待比较");
      replaceList(onlyBList, [], "等待比较");
      copyButton.disabled = true;
      copyStatus.textContent = "";
      resultText = "";
    }
    function compare() {
      textA.removeAttribute("aria-invalid");
      textB.removeAttribute("aria-invalid");
      var listA = normalizedLines(textA.value);
      var listB = normalizedLines(textB.value);
      updateCounts();
      var invalid = [];
      if (!listA.length || listA.length > 50) { textA.setAttribute("aria-invalid", "true"); invalid.push(textA); }
      if (!listB.length || listB.length > 50) { textB.setAttribute("aria-invalid", "true"); invalid.push(textB); }
      if (invalid.length) {
        message.textContent = "两侧都须包含 1–50 条非空要点，请检查标红文本框。";
        blankResult("无法比较");
        invalid[0].focus();
        return;
      }
      var setA = new Set(listA);
      var setB = new Set(listB);
      var common = listA.filter(function (item) { return setB.has(item); });
      var onlyA = listA.filter(function (item) { return !setB.has(item); });
      var onlyB = listB.filter(function (item) { return !setA.has(item); });
      var differences = onlyA.length + onlyB.length;
      state.textContent = "比较完成";
      verdict.textContent = differences === 0 ? "两版逐行口径一致" : common.length === 0 ? "两版没有共同条目" : "发现 " + differences + " 项逐行差异";
      commonCount.textContent = String(common.length);
      onlyACount.textContent = String(onlyA.length);
      onlyBCount.textContent = String(onlyB.length);
      replaceList(commonList, common, "无共同项");
      replaceList(onlyAList, onlyA, "无");
      replaceList(onlyBList, onlyB, "无");
      message.textContent = "对照报告已生成。";
      copyButton.disabled = false;
      copyStatus.textContent = "";
      resultText = "规则台词对照\n共同（" + common.length + "）：" + (common.length ? common.join("；") : "无") + "\n仅 A（" + onlyA.length + "）：" + (onlyA.length ? onlyA.join("；") : "无") + "\n仅 B（" + onlyB.length + "）：" + (onlyB.length ? onlyB.join("；") : "无") + "\n提醒：完全匹配不代表语义或事实正确。";
    }

    [textA, textB].forEach(function (input) {
      input.addEventListener("input", function () {
        input.removeAttribute("aria-invalid");
        updateCounts();
        if (resultText) {
          message.textContent = "文本已改变，请重新比较。";
          blankResult("待重新比较");
        }
      });
    });
    compareForm.addEventListener("submit", function (event) {
      event.preventDefault();
      compare();
    });
    presetButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var kind = button.getAttribute("data-compare-preset");
        if (kind === "same") {
          textA.value = "适用现货产品\n2026-01-19 生效\n适用现货产品";
          textB.value = "适用现货产品\n2026-01-19 生效";
        } else if (kind === "changed") {
          textA.value = "现货产品\n合约产品\n2026-01-19 生效";
          textB.value = "现货产品\n期权产品\n2026-01-20 生效";
        } else {
          textA.value = "费率 ０．０５％\n生效时间";
          textB.value = "费率 0.05%\n生效时间";
        }
        updateCounts();
        compare();
      });
    });
    resetButton.addEventListener("click", function () {
      compareForm.reset();
      textA.value = "";
      textB.value = "";
      textA.removeAttribute("aria-invalid");
      textB.removeAttribute("aria-invalid");
      updateCounts();
      message.textContent = "两侧各输入至少一条后开始比较。";
      blankResult("等待输入");
      textA.focus();
    });
    copyButton.addEventListener("click", function () {
      if (!resultText) return;
      copyText(resultText, function (ok) {
        copyStatus.textContent = ok ? "已复制，可粘贴使用。" : "复制失败，请手动记录结果。";
      });
    });
    updateCounts();
  }

  var searchForm = document.querySelector("[data-play-search]");
  if (searchForm) {
    var searchInput = document.getElementById("vp59-query");
    var searchResult = document.querySelector("[data-play-result]");
    var routes = [
      { words: ["费率", "文章", "核对", "来源", "主舞台"], label: "打开主舞台拆解", href: "article.html" },
      { words: ["对照", "文本", "差异", "工具", "台词"], label: "打开规则台词对照台", href: "tool.html" },
      { words: ["披露", "免责", "风险", "联系", "规则"], label: "打开剧场规则", href: "legal.html" },
      { words: ["首页", "节目", "本期"], label: "返回本期节目单", href: "index.html" }
    ];
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var query = searchInput.value.normalize("NFKC").trim().toLowerCase();
      while (searchResult.firstChild) searchResult.removeChild(searchResult.firstChild);
      if (!query) {
        searchResult.textContent = "请输入要查找的节目关键词。";
        searchInput.focus();
        return;
      }
      var match = routes.find(function (route) {
        return route.words.some(function (word) { return query.indexOf(word) !== -1; });
      });
      if (!match) {
        searchResult.textContent = "没有匹配节目；试试“费率”“对照”或“披露”。";
        return;
      }
      searchResult.appendChild(document.createTextNode("找到："));
      var link = document.createElement("a");
      link.href = match.href;
      link.textContent = match.label;
      searchResult.appendChild(link);
    });
    searchInput.addEventListener("input", function () {
      searchResult.textContent = "输入已改变，请重新询问前台。";
    });
  }
})();
