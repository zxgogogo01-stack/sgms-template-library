(function () {
  "use strict";
  var root = document.documentElement;

  function legacyCopy(text) {
    var field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    var success = false;
    try { success = document.execCommand("copy"); } catch (_) { success = false; }
    field.remove();
    return success;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }

  var modeButton = document.querySelector("[data-rw-mode]");
  var storedMode = null;
  try { storedMode = localStorage.getItem("raftwire-mode"); } catch (_) { storedMode = null; }
  if (storedMode === "dark") root.setAttribute("data-rw-theme", "dark");

  function syncMode() {
    if (!modeButton) return;
    var dark = root.getAttribute("data-rw-theme") === "dark";
    modeButton.setAttribute("aria-pressed", String(dark));
    var label = modeButton.querySelector("span");
    if (label) label.textContent = dark ? "日班" : "夜班";
  }

  syncMode();
  if (modeButton) modeButton.addEventListener("click", function () {
    var next = root.getAttribute("data-rw-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-rw-theme", next);
    try { localStorage.setItem("raftwire-mode", next); } catch (_) {}
    syncMode();
  });

  var codeButton = document.querySelector("[data-code-copy]");
  if (codeButton) codeButton.addEventListener("click", function () {
    var source = document.querySelector("[data-code-source]");
    var status = document.querySelector("[data-code-status]");
    copyText(source ? source.textContent.trim() : "").then(function (success) {
      if (status) status.textContent = success ? "邀请码已复制" : "复制失败，请手动选择";
    });
  });

  function numeric(form, name) {
    var raw = form.elements[name].value.trim();
    if (raw === "") return NaN;
    var value = Number(raw);
    return Number.isFinite(value) ? value : NaN;
  }

  function runConsole(form) {
    var mode = form.getAttribute("data-console");
    if (mode === "timestamp") {
      var stamp = numeric(form, "stamp");
      var unit = form.elements.unit.value;
      if (!Number.isFinite(stamp) || !Number.isInteger(stamp)) throw new Error("请输入有效的整数时间戳。");
      var milliseconds = unit === "seconds" ? stamp * 1000 : stamp;
      if (!Number.isSafeInteger(milliseconds)) throw new Error("时间戳超出安全整数范围。");
      var date = new Date(milliseconds);
      if (Number.isNaN(date.getTime())) throw new Error("时间戳超出可解析日期范围。");
      return "ISO：" + date.toISOString() + "\nUTC：" + date.toUTCString() + "\n本地：" + date.toLocaleString();
    }
    if (mode === "reading") {
      var characters = numeric(form, "characters");
      var speed = numeric(form, "speed");
      if (!Number.isInteger(characters) || characters < 0) throw new Error("字符数须为不小于 0 的整数。");
      if (!Number.isInteger(speed) || speed < 50 || speed > 2000) throw new Error("阅读速度须为 50–2000 的整数。");
      var minutes = characters / speed;
      return "预计阅读：" + minutes.toFixed(2) + " 分钟\n约合：" + Math.ceil(minutes * 60) + " 秒";
    }
    if (mode === "change") {
      var before = numeric(form, "before");
      var after = numeric(form, "after");
      if (!Number.isFinite(before) || !Number.isFinite(after)) throw new Error("请输入两个有效数值。");
      if (before === 0) throw new Error("起始值不可为 0，变化率无定义。");
      var difference = after - before;
      var percent = difference / Math.abs(before) * 100;
      return "绝对变化：" + difference.toFixed(4) + "\n变化率：" + percent.toFixed(2) + "%";
    }
    if (mode === "confidence") {
      var sources = numeric(form, "sources");
      var quality = numeric(form, "quality");
      var freshness = numeric(form, "freshness");
      if (!Number.isInteger(sources) || sources < 1 || sources > 50) throw new Error("独立来源数须为 1–50 的整数。");
      if (![quality, freshness].every(Number.isFinite) || quality < 0 || quality > 100 || freshness < 0 || freshness > 100) throw new Error("质量与时效性须在 0–100 之间。");
      var sourceScore = Math.min(sources / 5, 1) * 100;
      var score = sourceScore * .3 + quality * .5 + freshness * .2;
      var band = score >= 80 ? "高" : score >= 60 ? "中" : "低";
      return "加权得分：" + score.toFixed(1) + " / 100\n参考等级：" + band + "\n提示：该结果仅用于编辑排序，不代替事实核验。";
    }
    var headline = form.elements.headline.value.trim();
    var limit = numeric(form, "limit");
    if (!headline) throw new Error("请输入待检查标题。");
    if (!Number.isInteger(limit) || limit < 10 || limit > 120) throw new Error("目标上限须为 10–120 的整数。");
    var length = Array.from(headline).length;
    return "当前长度：" + length + " 字符\n目标上限：" + limit + " 字符\n状态：" + (length <= limit ? "在范围内" : "超出 " + (length - limit) + " 字符");
  }

  document.querySelectorAll("form[data-console]").forEach(function (form) {
    var output = form.querySelector(".rw-console-output");
    var copyButton = form.querySelector("[data-result-copy]");

    function render(message, failed) {
      output.textContent = message;
      output.setAttribute("data-status", failed ? "error" : "ready");
      copyButton.disabled = failed || !message;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      try { render(runConsole(form), false); }
      catch (error) { render(error.message, true); }
    });

    form.addEventListener("reset", function () {
      window.setTimeout(function () {
        output.textContent = "";
        output.removeAttribute("data-status");
        copyButton.disabled = true;
      }, 0);
    });

    copyButton.addEventListener("click", function () {
      copyText(output.textContent.trim()).then(function (success) {
        var label = copyButton.textContent;
        copyButton.textContent = success ? "已复制" : "请手动复制";
        window.setTimeout(function () { copyButton.textContent = label; }, 1400);
      });
    });
  });
}());
