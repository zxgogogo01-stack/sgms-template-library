/* 060 · Mist Collage interactions */
(function () {
  "use strict";

  var root = document.documentElement;
  var themeKey = "mist-collage-060-theme";
  var themeButtons = Array.prototype.slice.call(document.querySelectorAll("[data-theme-toggle]"));
  function getTheme() {
    try {
      var saved = localStorage.getItem(themeKey);
      if (saved === "light" || saved === "dark") return saved;
    } catch (error) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#17201f" : "#e8efed");
    themeButtons.forEach(function (button) {
      button.textContent = theme === "dark" ? "日间" : "夜间";
      button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    });
  }
  setTheme(getTheme());
  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next);
      try { localStorage.setItem(themeKey, next); } catch (error) {}
    });
  });

  var menuButton = document.querySelector(".mc60-menu-button");
  var menu = document.getElementById("mc60-menu");
  function closeMenu(returnFocus) {
    if (!menuButton || !menu) return;
    menu.classList.remove("mc60-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector("[aria-hidden]").textContent = "☰";
    menuButton.querySelector(".mc60-sr").textContent = "打开导航";
    if (returnFocus) menuButton.focus();
  }
  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      var open = menuButton.getAttribute("aria-expanded") !== "true";
      if (!open) { closeMenu(false); return; }
      menu.classList.add("mc60-open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.querySelector("[aria-hidden]").textContent = "×";
      menuButton.querySelector(".mc60-sr").textContent = "关闭导航";
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
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (error) {}
      area.remove();
      callback(ok);
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
  bindCopy("[data-copy-note]", ".mc60-handoff p", "[data-note-status]");
  bindCopy("[data-copy-disclosure]", ".mc60-disclosure p", "[data-disclosure-status]");

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

  function rawLines(value) {
    return value.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
  }
  var urlForm = document.getElementById("mc60-url-form");
  if (urlForm) {
    var urlInput = document.getElementById("mc60-urls");
    var lineCount = document.querySelector("[data-url-count]");
    var message = document.getElementById("mc60-url-message");
    var state = document.querySelector("[data-url-state]");
    var verdict = document.querySelector("[data-url-verdict]");
    var validCount = document.querySelector("[data-valid-count]");
    var domainCount = document.querySelector("[data-domain-count]");
    var duplicateCount = document.querySelector("[data-duplicate-count]");
    var invalidCount = document.querySelector("[data-invalid-count]");
    var validList = document.querySelector("[data-valid-list]");
    var invalidList = document.querySelector("[data-invalid-list]");
    var copyButton = document.querySelector("[data-copy-urls]");
    var copyStatus = document.querySelector("[data-url-copy-status]");
    var resetButton = document.querySelector("[data-url-reset]");
    var presets = Array.prototype.slice.call(document.querySelectorAll("[data-url-preset]"));
    var resultText = "";

    function updateCount() { lineCount.textContent = rawLines(urlInput.value).length + " 条"; }
    function replaceList(node, items, empty) {
      while (node.firstChild) node.removeChild(node.firstChild);
      (items.length ? items : [empty]).forEach(function (text) {
        var item = document.createElement("li");
        item.textContent = text;
        node.appendChild(item);
      });
    }
    function blank(label) {
      state.textContent = label;
      verdict.textContent = "尚未生成来源板";
      validCount.textContent = "—";
      domainCount.textContent = "—";
      duplicateCount.textContent = "—";
      invalidCount.textContent = "—";
      replaceList(validList, [], "等待整理");
      replaceList(invalidList, [], "等待整理");
      copyButton.disabled = true;
      copyStatus.textContent = "";
      resultText = "";
    }
    function organize() {
      urlInput.removeAttribute("aria-invalid");
      var lines = rawLines(urlInput.value);
      updateCount();
      if (!lines.length || lines.length > 30) {
        urlInput.setAttribute("aria-invalid", "true");
        message.textContent = "请输入 1–30 条非空链接。";
        blank("无法整理");
        urlInput.focus();
        return;
      }
      var valid = [];
      var invalid = [];
      var domains = new Set();
      var seen = new Set();
      var duplicates = 0;
      lines.forEach(function (line) {
        try {
          var url = new URL(line);
          if (url.protocol !== "http:" && url.protocol !== "https:") {
            invalid.push(line);
            return;
          }
          url.hash = "";
          var normalized = url.href;
          if (seen.has(normalized)) {
            duplicates++;
            return;
          }
          seen.add(normalized);
          valid.push(normalized);
          domains.add(url.hostname);
        } catch (error) {
          invalid.push(line);
        }
      });
      state.textContent = "整理完成";
      verdict.textContent = valid.length ? "保留 " + valid.length + " 条格式有效链接" : "没有可保留的 HTTP/HTTPS 链接";
      validCount.textContent = String(valid.length);
      domainCount.textContent = String(domains.size);
      duplicateCount.textContent = String(duplicates);
      invalidCount.textContent = String(invalid.length);
      replaceList(validList, valid, "无有效链接");
      replaceList(invalidList, invalid, "无");
      message.textContent = "来源板已生成。";
      copyButton.disabled = false;
      copyStatus.textContent = "";
      resultText = "来源链接整理结果\n有效：" + valid.length + "；域名：" + domains.size + "；重复：" + duplicates + "；无效：" + invalid.length + "\n保留链接：\n" + (valid.length ? valid.join("\n") : "无") + "\n无效或不支持：\n" + (invalid.length ? invalid.join("\n") : "无");
    }
    urlInput.addEventListener("input", function () {
      urlInput.removeAttribute("aria-invalid");
      updateCount();
      if (resultText) {
        message.textContent = "链接已改变，请重新整理。";
        blank("待重新整理");
      }
    });
    urlForm.addEventListener("submit", function (event) {
      event.preventDefault();
      organize();
    });
    presets.forEach(function (button) {
      button.addEventListener("click", function () {
        var type = button.getAttribute("data-url-preset");
        if (type === "mixed") {
          urlInput.value = "https:" + "//example.com/rules#section\nftp:" + "//example.com/file\n不是链接\nhttps:" + "//docs.example.org/notice";
        } else if (type === "duplicates") {
          urlInput.value = "https:" + "//example.com\nhttps:" + "//example.com/\nhttps:" + "//example.com/#top";
        } else {
          urlInput.value = "https:" + "//example.com/rules\nhttps:" + "//docs.example.org/notice\nhttps:" + "//status.example.net/archive";
        }
        updateCount();
        organize();
      });
    });
    resetButton.addEventListener("click", function () {
      urlForm.reset();
      urlInput.value = "";
      urlInput.removeAttribute("aria-invalid");
      updateCount();
      message.textContent = "输入至少一条候选链接。";
      blank("等待输入");
      urlInput.focus();
    });
    copyButton.addEventListener("click", function () {
      if (!resultText) return;
      copyText(resultText, function (ok) {
        copyStatus.textContent = ok ? "已复制，可粘贴使用。" : "复制失败，请手动记录结果。";
      });
    });
    updateCount();
  }

  var searchForm = document.querySelector("[data-collage-search]");
  if (searchForm) {
    var searchInput = document.getElementById("mc60-query");
    var searchResult = document.querySelector("[data-collage-result]");
    var routes = [
      { words: ["费率", "文章", "札记", "来源", "证据"], label: "打开研究札记", href: "article.html" },
      { words: ["链接", "整理", "域名", "工具", "url"], label: "打开来源链接整理板", href: "tool.html" },
      { words: ["披露", "免责", "风险", "联系", "更正"], label: "打开披露与免责", href: "legal.html" },
      { words: ["首页", "策展", "卡片"], label: "返回首页策展墙", href: "index.html" }
    ];
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var query = searchInput.value.normalize("NFKC").trim().toLowerCase();
      while (searchResult.firstChild) searchResult.removeChild(searchResult.firstChild);
      if (!query) {
        searchResult.textContent = "请输入要查找的主题词。";
        searchInput.focus();
        return;
      }
      var match = routes.find(function (route) {
        return route.words.some(function (word) { return query.indexOf(word) !== -1; });
      });
      if (!match) {
        searchResult.textContent = "没有匹配卡片；试试“来源”“链接”或“披露”。";
        return;
      }
      searchResult.appendChild(document.createTextNode("找到："));
      var link = document.createElement("a");
      link.href = match.href;
      link.textContent = match.label;
      searchResult.appendChild(link);
    });
    searchInput.addEventListener("input", function () {
      searchResult.textContent = "输入已改变，请重新查找。";
    });
  }
})();
