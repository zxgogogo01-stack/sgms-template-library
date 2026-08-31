/* 058 · Graphite Line interactions */
(function () {
  "use strict";

  var root = document.documentElement;
  var themeKey = "graphite-line-058-theme";
  var themeButtons = Array.prototype.slice.call(document.querySelectorAll("[data-theme-toggle]"));

  function initialTheme() {
    try {
      var saved = localStorage.getItem(themeKey);
      if (saved === "light" || saved === "dark") return saved;
    } catch (error) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#151716" : "#e9e9e5");
    themeButtons.forEach(function (button) {
      button.textContent = theme === "dark" ? "LIGHT" : "DARK";
      button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    });
  }
  applyTheme(initialTheme());
  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(themeKey, next); } catch (error) {}
    });
  });

  var navButton = document.querySelector(".gl58-nav-button");
  var nav = document.getElementById("gl58-nav");
  function closeNav(returnFocus) {
    if (!navButton || !nav) return;
    nav.classList.remove("gl58-open");
    navButton.setAttribute("aria-expanded", "false");
    navButton.querySelector("[aria-hidden]").textContent = "＋";
    navButton.querySelector(".gl58-sr").textContent = "打开导航";
    if (returnFocus) navButton.focus();
  }
  if (navButton && nav) {
    navButton.addEventListener("click", function () {
      var open = navButton.getAttribute("aria-expanded") !== "true";
      if (!open) { closeNav(false); return; }
      nav.classList.add("gl58-open");
      navButton.setAttribute("aria-expanded", "true");
      navButton.querySelector("[aria-hidden]").textContent = "−";
      navButton.querySelector(".gl58-sr").textContent = "关闭导航";
      var first = nav.querySelector("a");
      if (first) first.focus();
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navButton.getAttribute("aria-expanded") === "true") closeNav(true);
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
    var textNode = document.querySelector(textSelector);
    var status = document.querySelector(statusSelector);
    if (!button || !textNode || !status) return;
    button.addEventListener("click", function () {
      copyText(textNode.textContent.trim(), function (ok) {
        status.textContent = ok ? "已复制，可粘贴使用。" : "复制失败，请手动选择文本。";
      });
    });
  }
  bindCopy("[data-copy-note]", ".gl58-copy-block p", "[data-note-status]");
  bindCopy("[data-copy-disclosure]", ".gl58-portable p", "[data-disclosure-status]");

  var progress = document.querySelector("[data-reading-progress]");
  if (progress) {
    var updateProgress = function () {
      var limit = document.documentElement.scrollHeight - window.innerHeight;
      var amount = limit > 0 ? window.scrollY / limit : 1;
      progress.style.width = Math.max(0, Math.min(100, amount * 100)) + "%";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  function pad(number) { return String(number).padStart(2, "0"); }
  function parseDate(raw) {
    var normalized = raw.normalize("NFKC").trim();
    var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(normalized);
    if (!match) return null;
    var year = Number(match[1]);
    var month = Number(match[2]);
    var day = Number(match[3]);
    if (year < 2000 || year > 2099) return null;
    var value = new Date(Date.UTC(year, month - 1, day));
    if (value.getUTCFullYear() !== year || value.getUTCMonth() !== month - 1 || value.getUTCDate() !== day) return null;
    return { year: year, month: month, day: day, text: year + "-" + pad(month) + "-" + pad(day) };
  }
  function parseTime(raw) {
    var normalized = raw.normalize("NFKC").trim();
    var match = /^(\d{2}):(\d{2})$/.exec(normalized);
    if (!match) return null;
    var hour = Number(match[1]);
    var minute = Number(match[2]);
    if (hour > 23 || minute > 59) return null;
    return { hour: hour, minute: minute, text: pad(hour) + ":" + pad(minute) };
  }
  function formatUtcDate(date) {
    return date.getUTCFullYear() + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + " " + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes());
  }
  function zoneLabel(select) { return select.options[select.selectedIndex].textContent.trim(); }

  var timeForm = document.getElementById("gl58-time-form");
  if (timeForm) {
    var dateInput = document.getElementById("gl58-date");
    var timeInput = document.getElementById("gl58-time");
    var sourceZone = document.getElementById("gl58-source-zone");
    var targetZone = document.getElementById("gl58-target-zone");
    var message = document.getElementById("gl58-time-message");
    var state = document.querySelector("[data-time-state]");
    var sourceOut = document.querySelector("[data-source-time]");
    var utcOut = document.querySelector("[data-utc-time]");
    var targetOut = document.querySelector("[data-target-time]");
    var shiftOut = document.querySelector("[data-day-shift]");
    var copyButton = document.querySelector("[data-copy-time]");
    var copyStatus = document.querySelector("[data-time-copy-status]");
    var resetButton = document.querySelector("[data-time-reset]");
    var presets = Array.prototype.slice.call(document.querySelectorAll("[data-time-preset]"));
    var resultText = "";

    function clearResult(label) {
      state.textContent = label;
      sourceOut.textContent = "—";
      sourceOut.removeAttribute("datetime");
      utcOut.textContent = "—";
      utcOut.removeAttribute("datetime");
      targetOut.textContent = "—";
      targetOut.removeAttribute("datetime");
      shiftOut.textContent = "尚未生成日期关系";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      resultText = "";
    }

    function calculate() {
      dateInput.removeAttribute("aria-invalid");
      timeInput.removeAttribute("aria-invalid");
      var date = parseDate(dateInput.value);
      var time = parseTime(timeInput.value);
      var invalid = [];
      if (!date) { dateInput.setAttribute("aria-invalid", "true"); invalid.push(dateInput); }
      if (!time) { timeInput.setAttribute("aria-invalid", "true"); invalid.push(timeInput); }
      if (invalid.length) {
        message.textContent = "请检查标红字段：日期须真实存在且在 2000–2099 年，时间须为 HH:MM。";
        clearResult("无法换算");
        invalid[0].focus();
        return;
      }

      var sourceOffset = Number(sourceZone.value);
      var targetOffset = Number(targetZone.value);
      var sourceStamp = Date.UTC(date.year, date.month - 1, date.day, time.hour, time.minute);
      var utcStamp = sourceStamp - sourceOffset * 3600000;
      var utcDate = new Date(utcStamp);
      var targetDate = new Date(utcStamp + targetOffset * 3600000);
      var sourceText = date.text + " " + time.text + " " + zoneLabel(sourceZone);
      var utcText = formatUtcDate(utcDate) + " UTC";
      var targetText = formatUtcDate(targetDate) + " " + zoneLabel(targetZone);
      var targetDayStamp = Date.UTC(targetDate.getUTCFullYear(), targetDate.getUTCMonth(), targetDate.getUTCDate());
      var sourceDayStamp = Date.UTC(date.year, date.month - 1, date.day);
      var shift = Math.round((targetDayStamp - sourceDayStamp) / 86400000);
      var shiftText = shift === 0 ? "目标时间仍在同一日" : shift === 1 ? "目标时间进入次日" : shift === -1 ? "目标时间回到前一日" : "目标时间跨越 " + Math.abs(shift) + " 日" + (shift > 0 ? "之后" : "之前");

      sourceOut.textContent = sourceText;
      sourceOut.setAttribute("datetime", date.text + "T" + time.text);
      utcOut.textContent = utcText;
      utcOut.setAttribute("datetime", utcDate.toISOString());
      targetOut.textContent = targetText;
      targetOut.setAttribute("datetime", targetDate.toISOString());
      shiftOut.textContent = shiftText;
      state.textContent = "换算完成";
      message.textContent = "时间线已生成。";
      copyButton.disabled = false;
      copyStatus.textContent = "";
      resultText = "来源时间：" + sourceText + "\nUTC：" + utcText + "\n目标时间：" + targetText + "\n日期关系：" + shiftText;
    }

    [dateInput, timeInput, sourceZone, targetZone].forEach(function (control) {
      control.addEventListener("input", function () {
        control.removeAttribute("aria-invalid");
        if (resultText) {
          message.textContent = "输入已改变，请重新换算。";
          clearResult("待重新换算");
        }
      });
      control.addEventListener("change", function () {
        if (resultText) {
          message.textContent = "时区已改变，请重新换算。";
          clearResult("待重新换算");
        }
      });
    });
    timeForm.addEventListener("submit", function (event) {
      event.preventDefault();
      calculate();
    });
    presets.forEach(function (button) {
      button.addEventListener("click", function () {
        var values = button.getAttribute("data-time-preset").split(",");
        dateInput.value = values[0];
        timeInput.value = values[1];
        sourceZone.value = values[2];
        targetZone.value = values[3];
        calculate();
      });
    });
    resetButton.addEventListener("click", function () {
      timeForm.reset();
      dateInput.value = "";
      timeInput.value = "";
      dateInput.removeAttribute("aria-invalid");
      timeInput.removeAttribute("aria-invalid");
      message.textContent = "填写日期和时间后开始换算。";
      clearResult("等待输入");
      dateInput.focus();
    });
    copyButton.addEventListener("click", function () {
      if (!resultText) return;
      copyText(resultText, function (ok) {
        copyStatus.textContent = ok ? "已复制，可粘贴使用。" : "复制失败，请手动记录结果。";
      });
    });
  }

  var searchForm = document.querySelector("[data-line-search]");
  if (searchForm) {
    var searchInput = document.getElementById("gl58-query");
    var searchResult = document.querySelector("[data-line-result]");
    var destinations = [
      { words: ["费率", "基数", "文章", "拆解", "来源"], label: "打开规则变更拆解", href: "article.html" },
      { words: ["时间", "时区", "公告", "utc", "换算"], label: "打开公告时区换算器", href: "tool.html" },
      { words: ["披露", "免责", "风险", "联系", "更正"], label: "打开披露与免责", href: "legal.html" },
      { words: ["首页", "记录", "时间线"], label: "返回变更登记线", href: "index.html" }
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
      var found = destinations.find(function (item) {
        return item.words.some(function (word) { return query.indexOf(word) !== -1; });
      });
      if (!found) {
        searchResult.textContent = "没有匹配记录；试试“费率”“时区”或“披露”。";
        return;
      }
      searchResult.appendChild(document.createTextNode("找到："));
      var link = document.createElement("a");
      link.href = found.href;
      link.textContent = found.label;
      searchResult.appendChild(link);
    });
    searchInput.addEventListener("input", function () {
      searchResult.textContent = "输入已改变，请重新查找。";
    });
  }
})();
