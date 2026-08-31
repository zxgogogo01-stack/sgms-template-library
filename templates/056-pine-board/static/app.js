/* 056 松木看板：主题、无障碍导航、复制、阅读进度、泳道容量与安全查找 */
(function () {
  "use strict";

  var root = document.documentElement;
  var themeButton = document.getElementById("pb56-theme-button");
  var themeKey = "pine-board-056-theme";

  function preferredTheme() {
    try {
      var saved = localStorage.getItem(themeKey);
      if (saved === "light" || saved === "dark") return saved;
    } catch (error) {
      // 无存储权限时仍按系统偏好显示。
    }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (themeButton) {
      var next = theme === "dark" ? "浅色" : "夜间";
      themeButton.textContent = next;
      themeButton.setAttribute("aria-label", "切换到" + next + "模式");
    }
    if (persist) {
      try { localStorage.setItem(themeKey, theme); } catch (error) { /* 无存储权限 */ }
    }
  }

  setTheme(preferredTheme(), false);
  if (themeButton) themeButton.addEventListener("click", function () { setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true); });

  var navButton = document.getElementById("pb56-gable-btn");
  var nav = document.getElementById("pb56-gable-menu");

  function closeNav(restoreFocus) {
    if (!navButton || !nav) return;
    nav.classList.remove("pb56-ajar");
    navButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) navButton.focus();
  }

  if (navButton && nav) {
    navButton.addEventListener("click", function () {
      var open = !nav.classList.contains("pb56-ajar");
      nav.classList.toggle("pb56-ajar", open);
      navButton.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        var firstLink = nav.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });
    nav.addEventListener("click", function (event) { if (event.target.closest("a")) closeNav(false); });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape" && nav.classList.contains("pb56-ajar")) closeNav(true); });
  }

  function normalize(value) {
    return String(value == null ? "" : value).normalize("NFKC").trim();
  }

  function fallbackCopy(text, callback) {
    var field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (error) { ok = false; }
    field.remove();
    callback(ok);
  }

  function copyText(text, button, status) {
    function done(ok) {
      if (status) status.textContent = ok ? "已复制，可粘贴使用。" : "复制失败，请手动选择文本。";
      if (button && ok) {
        var original = button.textContent;
        button.textContent = "已复制";
        window.setTimeout(function () { button.textContent = original; }, 1600);
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallbackCopy(text, done); });
    else fallbackCopy(text, done);
  }

  function bindPortableCopy(buttonSelector, statusSelector) {
    var button = document.querySelector(buttonSelector);
    var status = document.querySelector(statusSelector);
    if (!button) return;
    button.addEventListener("click", function () {
      var note = button.closest(".pb56-portable-note");
      var paragraph = note && note.querySelector("p");
      if (paragraph) copyText(normalize(paragraph.textContent), button, status);
    });
  }

  bindPortableCopy("[data-copy-board-note]", "[data-board-note-status]");
  bindPortableCopy("[data-copy-disclosure]", "[data-disclosure-status]");

  var progress = document.querySelector("[data-reading-progress]");
  if (progress) {
    function updateProgress() {
      var available = document.documentElement.scrollHeight - window.innerHeight;
      var percent = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100;
      progress.style.width = percent.toFixed(2) + "%";
    }
    updateProgress();
    document.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  function parseInteger(value, minimum, maximum) {
    var text = normalize(value);
    if (!/^(?:0|[1-9]\d*)$/.test(text)) return null;
    var number = Number(text);
    return Number.isSafeInteger(number) && number >= minimum && number <= maximum ? number : null;
  }

  var capacityForm = document.getElementById("pb56-capacity-form");
  if (capacityForm) {
    var totalInput = document.getElementById("pb56-capacity-total");
    var lanesInput = document.getElementById("pb56-capacity-lanes");
    var featuredInput = document.getElementById("pb56-capacity-featured");
    var capacityInputs = [totalInput, lanesInput, featuredInput];
    var capacityMessage = document.getElementById("pb56-capacity-message");
    var capacityState = capacityForm.querySelector("[data-capacity-state]");
    var rangeResult = capacityForm.querySelector("[data-capacity-range]");
    var regularResult = capacityForm.querySelector("[data-capacity-regular]");
    var heavyResult = capacityForm.querySelector("[data-capacity-heavy]");
    var lightResult = capacityForm.querySelector("[data-capacity-light]");
    var featuredResult = capacityForm.querySelector("[data-capacity-featured-result]");
    var capacityList = capacityForm.querySelector("[data-capacity-list]");
    var capacityCopy = capacityForm.querySelector("[data-copy-capacity]");
    var capacityCopyStatus = capacityForm.querySelector("[data-capacity-copy-status]");
    var capacityReset = capacityForm.querySelector("[data-capacity-reset]");
    var lastCapacity = "";

    function clearCapacity(stale) {
      capacityState.textContent = stale ? "方案待更新" : "等待输入";
      rangeResult.textContent = "—";
      regularResult.textContent = "—";
      heavyResult.textContent = "—";
      lightResult.textContent = "—";
      featuredResult.textContent = "—";
      capacityList.replaceChildren();
      capacityCopy.disabled = true;
      capacityCopyStatus.textContent = "";
      lastCapacity = "";
    }

    capacityInputs.forEach(function (input) {
      input.addEventListener("input", function () {
        input.removeAttribute("aria-invalid");
        capacityMessage.textContent = "";
        clearCapacity(true);
      });
    });

    capacityForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var total = parseInteger(totalInput.value, 1, 999);
      var lanes = parseInteger(lanesInput.value, 1, 12);
      var featured = parseInteger(featuredInput.value, 0, 999);
      var values = [total, lanes, featured];
      capacityInputs.forEach(function (input, index) {
        if (values[index] == null) input.setAttribute("aria-invalid", "true");
        else input.removeAttribute("aria-invalid");
      });
      var invalidCount = values.filter(function (value) { return value == null; }).length;
      if (invalidCount) {
        capacityMessage.textContent = "有 " + invalidCount + " 项输入无效；总数 1–999、泳道 1–12、置顶 0–999，且都必须是整数。";
        capacityState.textContent = "请修正输入";
        capacityCopy.disabled = true;
        capacityInputs[values.findIndex(function (value) { return value == null; })].focus();
        return;
      }
      if (featured > total) {
        featuredInput.setAttribute("aria-invalid", "true");
        capacityMessage.textContent = "置顶卡片数不能超过卡片总数。";
        capacityState.textContent = "数量关系错误";
        capacityCopy.disabled = true;
        featuredInput.focus();
        return;
      }

      capacityMessage.textContent = "";
      var regular = total - featured;
      var base = Math.floor(regular / lanes);
      var remainder = regular % lanes;
      var highest = base + (remainder ? 1 : 0);
      var range = base === highest ? base + " 张 / 栏" : base + "–" + highest + " 张 / 栏";
      capacityState.textContent = "分栏已生成";
      rangeResult.textContent = range;
      regularResult.textContent = regular + " 张";
      heavyResult.textContent = remainder ? remainder + " 条 × " + highest + " 张" : "0 条（全部均衡）";
      lightResult.textContent = (lanes - remainder) + " 条 × " + base + " 张";
      featuredResult.textContent = featured + " 张";
      capacityList.replaceChildren();
      var distribution = [];
      for (var index = 0; index < lanes; index += 1) {
        var count = base + (index < remainder ? 1 : 0);
        distribution.push(count);
        var item = document.createElement("li");
        item.textContent = "泳道 " + (index + 1) + " · " + count + " 张";
        capacityList.appendChild(item);
      }
      lastCapacity = "共 " + total + " 张卡片，其中置顶 " + featured + " 张；其余 " + regular + " 张分入 " + lanes + " 条泳道，逐栏为 " + distribution.join("、") + " 张，每栏最多相差 1 张。";
      capacityCopy.disabled = false;
    });

    capacityForm.querySelectorAll("[data-capacity-preset]").forEach(function (button) {
      button.addEventListener("click", function () {
        var values = button.getAttribute("data-capacity-preset").split(",");
        totalInput.value = values[0];
        lanesInput.value = values[1];
        featuredInput.value = values[2];
        capacityForm.requestSubmit();
      });
    });

    capacityReset.addEventListener("click", function () {
      capacityForm.reset();
      capacityInputs.forEach(function (input) { input.removeAttribute("aria-invalid"); });
      capacityMessage.textContent = "";
      clearCapacity(false);
      totalInput.focus();
    });

    capacityCopy.addEventListener("click", function () { if (lastCapacity) copyText(lastCapacity, capacityCopy, capacityCopyStatus); });
  }

  var searchForm = document.querySelector("[data-board-search]");
  if (searchForm) {
    var query = document.getElementById("pb56-board-query");
    var feedback = document.querySelector("[data-board-feedback]");
    var topics = [
      { words: "看板 首页 泳道 卡片 目录", label: "回到松木知识看板", href: "index.html" },
      { words: "文章 费率 规则 账单 核对", label: "阅读看板文章", href: "article.html" },
      { words: "容量 分栏 泳道 置顶 规划", label: "使用分栏容量规划器", href: "tool.html" },
      { words: "披露 免责 联系 风险", label: "查看披露与风险边界", href: "legal.html" }
    ];
    query.addEventListener("input", function () { feedback.textContent = "输入已变化，请重新查找。"; });
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var term = normalize(query.value).toLowerCase();
      feedback.replaceChildren();
      if (!term) {
        feedback.textContent = "请先输入要查找的内容。";
        query.focus();
        return;
      }
      var match = topics.find(function (topic) { return (topic.words + " " + topic.label).normalize("NFKC").toLowerCase().indexOf(term) !== -1; });
      if (!match) {
        feedback.textContent = "没有直接匹配。可尝试“泳道”“容量”或“披露”。";
        return;
      }
      feedback.append("找到：");
      var link = document.createElement("a");
      link.href = match.href;
      link.textContent = match.label;
      feedback.appendChild(link);
    });
  }
})();
