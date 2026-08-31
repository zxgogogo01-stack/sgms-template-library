/* 054 色带入门：主题、无障碍导航、课程进度、复制、学习计划与安全查找 */
(function () {
  "use strict";

  var root = document.documentElement;
  var themeButton = document.getElementById("bp54-theme-button");
  var themeKey = "bands-primer-054-theme";

  function preferredTheme() {
    try {
      var saved = localStorage.getItem(themeKey);
      if (saved === "light" || saved === "dark") return saved;
    } catch (error) {
      // 无存储权限时仍使用系统偏好。
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
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  var navButton = document.getElementById("bp54-cap-btn");
  var nav = document.getElementById("bp54-cap-nav");

  function closeNav(restoreFocus) {
    if (!navButton || !nav) return;
    nav.classList.remove("bp54-wide");
    navButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) navButton.focus();
  }

  if (navButton && nav) {
    navButton.addEventListener("click", function () {
      var open = !nav.classList.contains("bp54-wide");
      nav.classList.toggle("bp54-wide", open);
      navButton.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        var firstLink = nav.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("bp54-wide")) closeNav(true);
    });
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
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }

  function bindPortableCopy(buttonSelector, statusSelector) {
    var button = document.querySelector(buttonSelector);
    var status = document.querySelector(statusSelector);
    if (!button) return;
    button.addEventListener("click", function () {
      var note = button.closest(".bp54-portable-note");
      var paragraph = note && note.querySelector("p");
      if (paragraph) copyText(normalize(paragraph.textContent), button, status);
    });
  }

  bindPortableCopy("[data-copy-lesson]", "[data-lesson-status]");
  bindPortableCopy("[data-copy-disclosure]", "[data-disclosure-status]");

  var progress = document.querySelector("[data-reading-progress]");
  if (progress) {
    function updateReadingProgress() {
      var available = document.documentElement.scrollHeight - window.innerHeight;
      var percent = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100;
      progress.style.width = percent.toFixed(2) + "%";
    }
    updateReadingProgress();
    document.addEventListener("scroll", updateReadingProgress, { passive: true });
    window.addEventListener("resize", updateReadingProgress);
  }

  var routeForm = document.querySelector("[data-route-checklist]");
  if (routeForm) {
    var routeBoxes = Array.prototype.slice.call(routeForm.querySelectorAll("input[type=checkbox]"));
    var routeProgress = routeForm.querySelector("[data-route-progress]");
    var routeCount = document.querySelector("[data-route-count]");
    function updateRoute() {
      var complete = routeBoxes.filter(function (box) { return box.checked; }).length;
      routeProgress.value = complete;
      routeCount.textContent = complete + " / " + routeBoxes.length + " 已完成";
    }
    routeForm.addEventListener("change", updateRoute);
    routeForm.addEventListener("reset", function () { window.setTimeout(updateRoute, 0); });
    updateRoute();
  }

  function parseInteger(value, minimum, maximum) {
    var text = normalize(value);
    if (!/^[1-9]\d*$/.test(text)) return null;
    var number = Number(text);
    if (!Number.isSafeInteger(number) || number < minimum || number > maximum) return null;
    return number;
  }

  var planForm = document.getElementById("bp54-plan-form");
  if (planForm) {
    var lessonsInput = document.getElementById("bp54-plan-lessons");
    var daysInput = document.getElementById("bp54-plan-days");
    var minutesInput = document.getElementById("bp54-plan-minutes");
    var planInputs = [lessonsInput, daysInput, minutesInput];
    var planMessage = document.getElementById("bp54-plan-message");
    var planState = planForm.querySelector("[data-plan-state]");
    var dailyResult = planForm.querySelector("[data-plan-daily]");
    var totalResult = planForm.querySelector("[data-plan-total]");
    var peakResult = planForm.querySelector("[data-plan-peak]");
    var activeResult = planForm.querySelector("[data-plan-active]");
    var lastResult = planForm.querySelector("[data-plan-last]");
    var planCopy = planForm.querySelector("[data-copy-plan]");
    var planCopyStatus = planForm.querySelector("[data-plan-copy-status]");
    var planReset = planForm.querySelector("[data-plan-reset]");
    var lastPlan = "";

    function clearPlan(stale) {
      planState.textContent = stale ? "计划待更新" : "等待输入";
      dailyResult.textContent = "—";
      totalResult.textContent = "—";
      peakResult.textContent = "—";
      activeResult.textContent = "—";
      lastResult.textContent = "—";
      planCopy.disabled = true;
      planCopyStatus.textContent = "";
      lastPlan = "";
    }

    planInputs.forEach(function (input) {
      input.addEventListener("input", function () {
        input.removeAttribute("aria-invalid");
        planMessage.textContent = "";
        clearPlan(true);
      });
    });

    planForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var lessons = parseInteger(lessonsInput.value, 1, 120);
      var days = parseInteger(daysInput.value, 1, 365);
      var minutes = parseInteger(minutesInput.value, 1, 600);
      var values = [lessons, days, minutes];
      planInputs.forEach(function (input, index) {
        if (values[index] == null) input.setAttribute("aria-invalid", "true");
        else input.removeAttribute("aria-invalid");
      });
      var invalidCount = values.filter(function (value) { return value == null; }).length;
      if (invalidCount) {
        planMessage.textContent = "有 " + invalidCount + " 项输入无效；课程 1–120、天数 1–365、每课 1–600，且都必须是整数。";
        planState.textContent = "请修正输入";
        planCopy.disabled = true;
        planInputs[values.findIndex(function (value) { return value == null; })].focus();
        return;
      }

      planMessage.textContent = "";
      var daily = Math.ceil(lessons / days);
      var activeDays = Math.ceil(lessons / daily);
      var flexibleDays = days - activeDays;
      var lastDayLessons = lessons - daily * (activeDays - 1);
      var totalMinutes = lessons * minutes;
      var peakMinutes = daily * minutes;
      var lastMinutes = lastDayLessons * minutes;

      planState.textContent = "节奏已生成";
      dailyResult.textContent = "每天 " + daily + " 课";
      totalResult.textContent = totalMinutes + " 分钟";
      peakResult.textContent = peakMinutes + " 分钟";
      activeResult.textContent = activeDays + " 天（留白 " + flexibleDays + " 天）";
      lastResult.textContent = lastDayLessons + " 课 / " + lastMinutes + " 分钟";
      lastPlan = "共 " + lessons + " 课，在 " + days + " 天内按每天 " + daily + " 课安排；总学习时间 " + totalMinutes + " 分钟，高峰日 " + peakMinutes + " 分钟，实际学习 " + activeDays + " 天，留白 " + flexibleDays + " 天，最后一天 " + lastDayLessons + " 课。";
      planCopy.disabled = false;
    });

    planForm.querySelectorAll("[data-plan-preset]").forEach(function (button) {
      button.addEventListener("click", function () {
        var values = button.getAttribute("data-plan-preset").split(",");
        lessonsInput.value = values[0];
        daysInput.value = values[1];
        minutesInput.value = values[2];
        planForm.requestSubmit();
      });
    });

    planReset.addEventListener("click", function () {
      planForm.reset();
      planInputs.forEach(function (input) { input.removeAttribute("aria-invalid"); });
      planMessage.textContent = "";
      clearPlan(false);
      lessonsInput.focus();
    });

    planCopy.addEventListener("click", function () {
      if (lastPlan) copyText(lastPlan, planCopy, planCopyStatus);
    });
  }

  var searchForm = document.querySelector("[data-band-search]");
  if (searchForm) {
    var query = document.getElementById("bp54-band-query");
    var feedback = document.querySelector("[data-band-feedback]");
    var topics = [
      { words: "入门 首页 色带 课程 路线", label: "回到四带入门首页", href: "index.html" },
      { words: "资金流 手续费 账单 计佣 读物", label: "阅读资金流入门课", href: "article.html" },
      { words: "学习计划 课程 天数 分钟 节奏", label: "生成学习计划", href: "tool.html" },
      { words: "披露 免责 联系 风险", label: "查看披露与风险边界", href: "legal.html" }
    ];
    query.addEventListener("input", function () { feedback.textContent = "输入已变化，请重新查找。"; });
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var term = normalize(query.value).toLowerCase();
      feedback.replaceChildren();
      if (!term) {
        feedback.textContent = "请先输入要查找的课程主题。";
        query.focus();
        return;
      }
      var match = topics.find(function (topic) {
        return (topic.words + " " + topic.label).normalize("NFKC").toLowerCase().indexOf(term) !== -1;
      });
      if (!match) {
        feedback.textContent = "没有直接匹配。可尝试“资金流”“学习计划”或“披露”。";
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
