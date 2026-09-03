(function () {
  "use strict";
  function required(form, name, label) {
    var value = String(form.elements[name].value || "").trim();
    if (!value) throw new Error(label + "：%ERROR_REQUIRED%");
    return value;
  }
  function bounded(form, name, label, min, max) {
    var value = Number(required(form, name, label));
    if (!Number.isFinite(value) || !Number.isInteger(value) || value < min || value > max) throw new Error(label + "：%ERROR_RANGE%");
    return value;
  }
  function sample(form) {
    var rows = required(form, "items", "%TOOL_01_FIELD_01%").split(/\r?\n/).map(function (v) { return v.trim(); }).filter(Boolean);
    var count = bounded(form, "count", "%TOOL_01_FIELD_02%", 1, 20);
    if (rows.length < 2 || rows.length > 200) throw new Error("%TOOL_01_ERROR_ITEMS%");
    if (count > rows.length) throw new Error("%TOOL_01_ERROR_COUNT%");
    var seed = rows.join("|").split("").reduce(function (sum, ch) { return (sum * 31 + ch.charCodeAt(0)) >>> 0; }, 2166136261);
    var pool = rows.slice();
    for (var i = pool.length - 1; i > 0; i -= 1) { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; var j = seed % (i + 1); var hold = pool[i]; pool[i] = pool[j]; pool[j] = hold; }
    return "%TOOL_01_RESULT_LABEL%\n" + pool.slice(0, count).map(function (row, i) { return String(i + 1).padStart(2, "0") + " · " + row; }).join("\n");
  }
  function passphrase(form) {
    var phrase = required(form, "phrase", "%TOOL_02_FIELD_01%");
    if (phrase.length > 256) throw new Error("%TOOL_02_ERROR_LENGTH%");
    var classes = [/[a-z]/.test(phrase), /[A-Z]/.test(phrase), /\d/.test(phrase), /[^A-Za-z0-9]/.test(phrase)].filter(Boolean).length;
    var words = phrase.trim().split(/\s+/).filter(Boolean).length;
    var entropy = form.elements.model.value === "words" ? words * Math.log2(2048) : phrase.length * Math.log2(Math.max(2, classes * 24));
    var band = entropy >= 80 ? "%TOOL_02_BAND_HIGH%" : entropy >= 50 ? "%TOOL_02_BAND_MID%" : "%TOOL_02_BAND_LOW%";
    return "%TOOL_02_RESULT_BITS%：" + entropy.toFixed(1) + "\n%TOOL_02_RESULT_BAND%：" + band + "\n%TOOL_02_RESULT_NOTE%";
  }
  function permission(form) {
    var selected = Array.prototype.slice.call(form.querySelectorAll('input[name="risk"]:checked'));
    if (!selected.length) throw new Error("%TOOL_03_ERROR_SELECT%");
    var sum = selected.reduce(function (total, item) { return total + Number(item.value); }, 0);
    var multiplier = Number(form.elements.scope.value);
    var score = Math.min(100, Math.round(sum * multiplier * 3.4));
    var band = score >= 70 ? "%TOOL_03_BAND_HIGH%" : score >= 35 ? "%TOOL_03_BAND_MID%" : "%TOOL_03_BAND_LOW%";
    return "%TOOL_03_RESULT_SCORE%：" + score + " / 100\n%TOOL_03_RESULT_BAND%：" + band + "\n%TOOL_03_RESULT_NOTE%";
  }
  function recovery(form) {
    var total = form.querySelectorAll('input[name="ready"]').length;
    var done = form.querySelectorAll('input[name="ready"]:checked').length;
    if (!done) throw new Error("%TOOL_04_ERROR_SELECT%");
    var score = Math.round(done / total * 100);
    return "%TOOL_04_RESULT_READY%：" + done + " / " + total + "\n%TOOL_04_RESULT_SCORE%：" + score + "%\n" + (score === 100 ? "%TOOL_04_RESULT_COMPLETE%" : "%TOOL_04_RESULT_PENDING%");
  }
  function windowResult(form) {
    var start = new Date(required(form, "start", "%TOOL_05_FIELD_01%"));
    var end = new Date(required(form, "end", "%TOOL_05_FIELD_02%"));
    var target = bounded(form, "target", "%TOOL_05_FIELD_03%", 1, 10080);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) throw new Error("%TOOL_05_ERROR_DATE%");
    if (end <= start) throw new Error("%TOOL_05_ERROR_ORDER%");
    var minutes = Math.round((end.getTime() - start.getTime()) / 60000);
    var delta = minutes - target;
    return "%TOOL_05_RESULT_DURATION%：" + minutes + " min\n%TOOL_05_RESULT_TARGET%：" + target + " min\n%TOOL_05_RESULT_DELTA%：" + (delta > 0 ? "+" : "") + delta + " min\n" + (delta <= 0 ? "%TOOL_05_RESULT_WITHIN%" : "%TOOL_05_RESULT_OUTSIDE%");
  }
  function calculate(form) {
    var kind = form.getAttribute("data-brz-tool");
    if (kind === "sample") return sample(form);
    if (kind === "passphrase") return passphrase(form);
    if (kind === "permission") return permission(form);
    if (kind === "recovery") return recovery(form);
    return windowResult(form);
  }
  document.querySelectorAll("form[data-brz-tool]").forEach(function (form) {
    var bench = form.parentElement; var output = bench.querySelector("[data-brz-output]"); var error = form.querySelector("[data-brz-error]"); var copy = bench.querySelector("[data-brz-result-copy]"); var note = bench.querySelector("[data-brz-copy-note]");
    function clearInvalid() { form.querySelectorAll("[aria-invalid=true]").forEach(function (field) { field.removeAttribute("aria-invalid"); }); }
    form.addEventListener("submit", function (event) {
      event.preventDefault(); clearInvalid(); error.textContent = ""; note.textContent = "";
      try { output.textContent = calculate(form); copy.disabled = false; }
      catch (problem) { error.textContent = problem.message; output.textContent = "%RESULT_ERROR%"; copy.disabled = true; var first = Array.prototype.find.call(form.elements, function (field) { return field.matches && field.matches("input,textarea") && !String(field.value || "").trim(); }); if (!first) first = form.querySelector("input,textarea,select"); if (first) { first.setAttribute("aria-invalid", "true"); first.focus(); } }
    });
    form.addEventListener("reset", function () { window.setTimeout(function () { clearInvalid(); error.textContent = ""; output.textContent = "%RESULT_IDLE%"; copy.disabled = true; note.textContent = ""; }, 0); });
    copy.addEventListener("click", function () { window.brzCopyText(output.textContent.trim()).then(function (okay) { note.textContent = okay ? "%COPY_SUCCESS%" : "%COPY_FAILURE%"; }); });
  });
}());
