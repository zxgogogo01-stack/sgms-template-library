/* 057 · Oat Profile interactions */
(function () {
  "use strict";

  var root = document.documentElement;
  var storageKey = "oat-profile-057-theme";
  var themeButtons = Array.prototype.slice.call(document.querySelectorAll("[data-theme-toggle]"));

  function preferredTheme() {
    try {
      var saved = window.localStorage.getItem(storageKey);
      if (saved === "light" || saved === "dark") return saved;
    } catch (error) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#181512" : "#eee7da");
    themeButtons.forEach(function (button) {
      button.textContent = theme === "dark" ? "日间" : "夜间";
      button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    });
  }

  setTheme(preferredTheme());
  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next);
      try { window.localStorage.setItem(storageKey, next); } catch (error) {}
    });
  });

  var menuButton = document.querySelector(".op57-menu-button");
  var menu = document.getElementById("op57-menu");
  function closeMenu(restoreFocus) {
    if (!menuButton || !menu) return;
    menu.classList.remove("op57-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector("[aria-hidden]") .textContent = "≡";
    menuButton.querySelector(".op57-sr").textContent = "打开导航";
    if (restoreFocus) menuButton.focus();
  }
  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      var open = menuButton.getAttribute("aria-expanded") !== "true";
      if (!open) { closeMenu(false); return; }
      menu.classList.add("op57-open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.querySelector("[aria-hidden]").textContent = "×";
      menuButton.querySelector(".op57-sr").textContent = "关闭导航";
      var firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") closeMenu(true);
    });
  }

  function copyText(text, onDone) {
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
      onDone(ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { onDone(true); }, fallback);
    } else {
      fallback();
    }
  }

  function bindCopy(buttonSelector, textSelector, statusSelector) {
    var button = document.querySelector(buttonSelector);
    var source = document.querySelector(textSelector);
    var status = document.querySelector(statusSelector);
    if (!button || !source || !status) return;
    button.addEventListener("click", function () {
      copyText(source.textContent.trim(), function (ok) {
        status.textContent = ok ? "已复制，可粘贴使用。" : "复制失败，请手动选择文本。";
      });
    });
  }

  bindCopy("[data-copy-article]", ".op57-copy-note span", "[data-article-status]");
  bindCopy("[data-copy-disclosure]", ".op57-disclosure-copy p", "[data-disclosure-status]");

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

  var evidenceForm = document.getElementById("op57-evidence-form");
  if (evidenceForm) {
    var checks = Array.prototype.slice.call(evidenceForm.querySelectorAll('input[name="evidence"]'));
    var fieldset = evidenceForm.querySelector("fieldset");
    var message = document.getElementById("op57-tool-message");
    var state = document.querySelector("[data-evidence-state]");
    var scoreNode = document.querySelector("[data-evidence-score]");
    var meter = document.querySelector("[data-evidence-meter]");
    var verdict = document.querySelector("[data-evidence-verdict]");
    var advice = document.querySelector("[data-evidence-advice]");
    var missingList = document.querySelector("[data-evidence-missing]");
    var copyButton = document.querySelector("[data-copy-report]");
    var copyStatus = document.querySelector("[data-report-status]");
    var resetButton = document.querySelector("[data-evidence-reset]");
    var presetButtons = Array.prototype.slice.call(document.querySelectorAll("[data-evidence-preset]"));
    var reportText = "";

    function replaceMissing(labels) {
      while (missingList.firstChild) missingList.removeChild(missingList.firstChild);
      labels.forEach(function (label) {
        var item = document.createElement("li");
        item.textContent = label;
        missingList.appendChild(item);
      });
    }

    function blankReport(label) {
      state.textContent = label;
      scoreNode.textContent = "—";
      meter.value = 0;
      verdict.textContent = "尚未生成发布建议";
      advice.textContent = "勾选左侧已有证据字段。";
      replaceMissing(["等待检查"]);
      copyButton.disabled = true;
      copyStatus.textContent = "";
      reportText = "";
    }

    function runReport() {
      var selected = checks.filter(function (check) { return check.checked; });
      fieldset.removeAttribute("aria-invalid");
      if (!selected.length) {
        fieldset.setAttribute("aria-invalid", "true");
        message.textContent = "请至少勾选一项已留存的证据字段。";
        blankReport("无法生成");
        checks[0].focus();
        return;
      }

      var score = selected.reduce(function (sum, check) {
        return sum + Number(check.getAttribute("data-weight"));
      }, 0);
      var absent = checks.filter(function (check) { return !check.checked; }).map(function (check) {
        return check.getAttribute("data-label");
      });
      var title;
      var note;
      if (score >= 85) {
        title = "可进入人工终审";
        note = "关键证据字段基本齐备；发布前仍需打开一手来源逐项确认。";
      } else if (score >= 60) {
        title = "补证后再复核";
        note = "已有部分关键字段，但缺项可能改变结论适用范围。";
      } else {
        title = "暂缓发布";
        note = "证据字段不足，先补齐来源与适用边界。";
      }

      state.textContent = "检查完成";
      scoreNode.textContent = String(score);
      meter.value = score;
      verdict.textContent = title;
      advice.textContent = note;
      replaceMissing(absent.length ? absent : ["无；请继续人工终审"]);
      message.textContent = "完整度结果已生成。";
      copyButton.disabled = false;
      copyStatus.textContent = "";
      reportText = "资料完整度：" + score + "/100\n建议：" + title + "\n仍缺少：" + (absent.length ? absent.join("、") : "无") + "\n提醒：结果只检查字段完整度，发布前仍需人工终审。";
    }

    checks.forEach(function (check) {
      check.addEventListener("change", function () {
        fieldset.removeAttribute("aria-invalid");
        if (reportText) {
          message.textContent = "勾选项已改变，请重新生成建议。";
          blankReport("待重新生成");
        } else {
          message.textContent = "至少勾选一项后再生成建议。";
        }
      });
    });

    evidenceForm.addEventListener("submit", function (event) {
      event.preventDefault();
      runReport();
    });

    presetButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var values = button.getAttribute("data-evidence-preset").split(",");
        checks.forEach(function (check) { check.checked = values.indexOf(check.value) !== -1; });
        runReport();
      });
    });

    resetButton.addEventListener("click", function () {
      evidenceForm.reset();
      fieldset.removeAttribute("aria-invalid");
      message.textContent = "至少勾选一项后再生成建议。";
      blankReport("等待检查");
      checks[0].focus();
    });

    copyButton.addEventListener("click", function () {
      if (!reportText) return;
      copyText(reportText, function (ok) {
        copyStatus.textContent = ok ? "已复制，可粘贴使用。" : "复制失败，请手动记录结果。";
      });
    });
  }

  var routeForm = document.querySelector("[data-route-search]");
  if (routeForm) {
    var routeInput = document.getElementById("op57-route-query");
    var routeResult = document.querySelector("[data-route-result]");
    var routes = [
      { words: ["费率", "文章", "笔记", "基数", "来源", "证据"], label: "打开费率与来源笔记", href: "article.html" },
      { words: ["检查", "完整", "发布", "工具", "终审"], label: "打开发布前资料检查", href: "tool.html" },
      { words: ["披露", "免责", "风险", "联系", "更正"], label: "打开披露与免责", href: "legal.html" },
      { words: ["首页", "名片", "主理人"], label: "返回首页名片", href: "index.html" }
    ];
    routeForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var query = routeInput.value.normalize("NFKC").trim().toLowerCase();
      while (routeResult.firstChild) routeResult.removeChild(routeResult.firstChild);
      if (!query) {
        routeResult.textContent = "请输入要查找的主题词。";
        routeInput.focus();
        return;
      }
      var match = routes.find(function (route) {
        return route.words.some(function (word) { return query.indexOf(word) !== -1; });
      });
      if (!match) {
        routeResult.textContent = "没有匹配卡片；试试“费率”“发布”或“披露”。";
        return;
      }
      routeResult.appendChild(document.createTextNode("找到："));
      var link = document.createElement("a");
      link.href = match.href;
      link.textContent = match.label;
      routeResult.appendChild(link);
    });
    routeInput.addEventListener("input", function () {
      routeResult.textContent = "输入已改变，请重新查找。";
    });
  }
})();
