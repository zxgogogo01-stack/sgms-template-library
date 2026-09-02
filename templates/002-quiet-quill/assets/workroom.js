(function () {
  "use strict";
  function output(form, primary, secondary) {
    var panel = form.closest(".bench-grid");
    panel.querySelector("[data-tool-primary]").textContent = primary;
    panel.querySelector("[data-tool-secondary]").textContent = secondary;
  }
  function fail(form, field, message) {
    form.querySelector("[data-tool-error]").textContent = message;
    if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); }
  }
  function clearState(form) {
    form.querySelector("[data-tool-error]").textContent = "";
    form.querySelectorAll("[aria-invalid]").forEach(function (field) { field.removeAttribute("aria-invalid"); });
  }
  function field(form, name) { return form.elements.namedItem(name); }
  function number(form, name) { var input = field(form, name); return { field: input, value: Number(input.value) }; }
  function reading(form) {
    var input = field(form, "text");
    var text = input.value.trim();
    if (!text) return fail(form, input, "请先输入需要估算的文本。");
    var compact = text.replace(/\s/g, "");
    var cjk = (text.match(/[\u3400-\u9fff]/g) || []).length;
    var words = (text.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length;
    var minutes = Math.max(1, Math.ceil((cjk + words) / 300));
    var pages = Math.max(1, Math.ceil(compact.length / 600));
    output(form, "约 " + minutes + " 分钟", compact.length + " 个有效字符 · 约 " + pages + " 页稿纸");
  }
  function age(form) {
    var source = field(form, "sourceDate");
    var review = field(form, "reviewDate");
    if (!source.value) return fail(form, source, "请选择来源发布日期。");
    if (!review.value) return fail(form, review, "请选择计划复核日期。");
    var sourceDate = new Date(source.value + "T00:00:00Z");
    var reviewDate = new Date(review.value + "T00:00:00Z");
    var days = Math.round((reviewDate - sourceDate) / 86400000);
    if (days < 0) return fail(form, source, "来源日期不能晚于复核日期。");
    var label = days <= 30 ? "近期材料" : days <= 180 ? "需要查看更新" : "较旧材料";
    output(form, days + " 天", label + " · 仍需人工判断主题是否发生变化");
  }
  function revision(form) {
    var oldField = field(form, "oldText");
    var newField = field(form, "newText");
    if (!oldField.value.trim()) return fail(form, oldField, "请输入原版本。");
    if (!newField.value.trim()) return fail(form, newField, "请输入修订版本。");
    var oldLines = oldField.value.split(/\n/).map(function (line) { return line.trim(); }).filter(Boolean);
    var newLines = newField.value.split(/\n/).map(function (line) { return line.trim(); }).filter(Boolean);
    var oldSet = new Set(oldLines);
    var newSet = new Set(newLines);
    var added = newLines.filter(function (line) { return !oldSet.has(line); }).length;
    var removed = oldLines.filter(function (line) { return !newSet.has(line); }).length;
    var ratio = ((added + removed) / Math.max(1, oldLines.length + newLines.length) * 100).toFixed(1);
    output(form, ratio + "% 发生变化", "新增 " + added + " 行 · 移除 " + removed + " 行");
  }
  function mix(form) {
    var values = ["primary", "official", "secondary", "anonymous"].map(function (name) { return number(form, name); });
    var invalid = values.find(function (item) { return !Number.isInteger(item.value) || item.value < 0; });
    if (invalid) return fail(form, invalid.field, "来源数量必须是大于或等于 0 的整数。");
    var total = values.reduce(function (sum, item) { return sum + item.value; }, 0);
    if (!total) return fail(form, values[0].field, "至少填写一条来源。");
    var share = (values[0].value + values[1].value) / total * 100;
    var note = values[3].value ? "仍有 " + values[3].value + " 条出处未确认" : "没有未确认出处的材料";
    output(form, share.toFixed(1) + "% 可优先复核", "共 " + total + " 条来源 · " + note);
  }
  function citation(form) {
    var length = number(form, "length");
    var rate = number(form, "rate");
    if (!Number.isFinite(length.value) || length.value <= 0) return fail(form, length.field, "正文字符数必须大于 0。");
    if (!Number.isFinite(rate.value) || rate.value <= 0 || rate.value > 20) return fail(form, rate.field, "核对点密度必须在 0 到 20 之间。");
    var count = Math.max(1, Math.ceil(length.value / 1000 * rate.value));
    var interval = Math.round(length.value / count);
    output(form, count + " 个核对点", "约每 " + interval + " 个字符安排一次复核");
  }
  var runners = { reading: reading, age: age, revision: revision, mix: mix, citation: citation };
  document.querySelectorAll("[data-tool]").forEach(function (form) {
    form.addEventListener("submit", function (event) { event.preventDefault(); clearState(form); runners[form.getAttribute("data-tool")](form); });
    form.addEventListener("reset", function () { window.setTimeout(function () { clearState(form); output(form, "等待输入", "填写表单后生成结果。"); }, 0); });
    var copy = form.closest(".bench-grid").querySelector("[data-copy-result]");
    copy.addEventListener("click", function () {
      var panel = form.closest(".bench-grid");
      var value = panel.querySelector("[data-tool-primary]").textContent + " — " + panel.querySelector("[data-tool-secondary]").textContent;
      var status = panel.querySelector("[data-tool-copy-status]");
      if (!navigator.clipboard || !navigator.clipboard.writeText) { status.textContent = "当前浏览器不支持自动复制。"; return; }
      navigator.clipboard.writeText(value).then(function () { status.textContent = "结果已复制。"; }).catch(function () { status.textContent = "复制失败，请手动选择。"; });
    });
  });
})();
