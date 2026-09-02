(function () {
  "use strict";
  var form = document.getElementById("signal-tool");
  if (!form) return;
  var output = document.querySelector("[data-tool-output]");
  var copyButton = document.querySelector("[data-copy-result]");
  var lastText = "";
  function field(name) { return form.elements.namedItem(name); }
  function number(name) { return Number(field(name).value); }
  function finite(values) { return values.every(function (value) { return Number.isFinite(value); }); }
  function setResult(main, detail, error) {
    output.classList.toggle("is-error", Boolean(error));
    output.querySelector("strong").textContent = main;
    output.querySelector("span").textContent = detail;
    lastText = error ? "" : main + " — " + detail;
    copyButton.disabled = Boolean(error);
  }
  function runWindow() {
    var start = new Date(field("start").value + "T00:00:00");
    var end = new Date(field("end").value + "T00:00:00");
    var step = number("step");
    if (!field("start").value || !field("end").value || !finite([step])) return setResult("无法计算", "请填写起止日期与间隔天数。", true);
    if (end <= start || step < 1 || step > 365) return setResult("参数不成立", "结束日须晚于起始日，间隔须在 1–365 天。", true);
    var days = Math.round((end - start) / 86400000);
    var count = Math.floor(days / step) + 1 + (days % step === 0 ? 0 : 1);
    setResult(days + " 天 / " + count + " 个检查点", "包含起始日与结束日，建议按固定间隔记录同一组指标。", false);
  }
  function runRetention() {
    var base = number("base"), current = number("current");
    if (!finite([base, current]) || base < 0 || base > 100 || current < 0 || current > 100) return setResult("无法比较", "两个比例都必须位于 0–100%。", true);
    var points = current - base;
    var sign = points > 0 ? "+" : "";
    var relative = base === 0 ? "基线为 0，相对变化不可计算" : "相对变化 " + (points / base * 100 >= 0 ? "+" : "") + (points / base * 100).toFixed(2) + "%";
    setResult(sign + points.toFixed(2) + " 个百分点", relative, false);
  }
  function runInterval() {
    var success = number("success"), total = number("total");
    if (!finite([success, total]) || !Number.isInteger(success) || !Number.isInteger(total) || total < 1 || total > 1000000 || success < 0 || success > total) return setResult("样本无效", "次数须为整数，且成功次数不能超过总数。", true);
    var z = 1.96, p = success / total, z2 = z * z;
    var center = (p + z2 / (2 * total)) / (1 + z2 / total);
    var margin = z * Math.sqrt((p * (1 - p) + z2 / (4 * total)) / total) / (1 + z2 / total);
    setResult((p * 100).toFixed(2) + "%", "Wilson 95% 区间 " + Math.max(0, (center - margin) * 100).toFixed(2) + "% – " + Math.min(100, (center + margin) * 100).toFixed(2) + "%", false);
  }
  function runNormalize() {
    var events = number("events"), people = number("people"), days = number("days");
    if (!finite([events, people, days]) || events < 0 || people <= 0 || days <= 0) return setResult("参数无效", "事件不能为负，人数和天数必须大于 0。", true);
    setResult("人均 " + (events / people).toFixed(2) + " 次", "日均 " + (events / days).toFixed(2) + " 次 · 人日均 " + (events / people / days).toFixed(3) + " 次", false);
  }
  function runPriority() {
    var evidence = number("evidence"), impact = number("impact"), urgency = number("urgency"), effort = number("effort");
    if (!finite([evidence, impact, urgency, effort]) || evidence < 0 || evidence > 5 || impact < 0 || impact > 5 || urgency < 0 || urgency > 5 || effort < 1 || effort > 5) return setResult("评分无效", "前三项须在 0–5，工作量须在 1–5。", true);
    var score = ((evidence * .4 + impact * .35 + urgency * .25) / 5 * 100) * (1 - (effort - 1) * .1);
    var band = score >= 70 ? "优先观察" : score >= 45 ? "进入候选" : "暂存队列";
    setResult(score.toFixed(1) + " / 100", band + "；这是排序提示，不替代编辑判断。", false);
  }
  var runners = { window: runWindow, retention: runRetention, interval: runInterval, normalize: runNormalize, priority: runPriority };
  form.addEventListener("submit", function (event) { event.preventDefault(); runners[form.getAttribute("data-tool")](); });
  form.addEventListener("reset", function () { window.setTimeout(function () {
    output.classList.remove("is-error");
    output.querySelector("strong").textContent = "等待输入";
    output.querySelector("span").textContent = "填写参数后运行；结果只用于观察与记录。";
    lastText = "";
    copyButton.disabled = true;
  }, 0); });
  copyButton.addEventListener("click", function () {
    if (!lastText) return;
    var task;
    if (navigator.clipboard && navigator.clipboard.writeText) task = navigator.clipboard.writeText(lastText);
    else {
      var area = document.createElement("textarea");
      area.value = lastText; area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0";
      document.body.appendChild(area); area.select(); document.execCommand("copy"); document.body.removeChild(area);
      task = Promise.resolve();
    }
    task.then(function () { copyButton.textContent = "结果已复制"; window.setTimeout(function () { copyButton.textContent = "复制结果"; }, 1600); }).catch(function () { setResult("复制失败", "请手动选择结果文字。", true); });
  });
})();
