(function () {
  "use strict";
  function raw(form, name, label) {
    var value = String(form.elements[name].value || "").trim();
    if (!value) throw new Error(label + "：%ERROR_REQUIRED%");
    return value;
  }
  function number(form, name, label, min, max, integer) {
    var value = Number(raw(form, name, label));
    if (!Number.isFinite(value) || value < min || value > max || (integer && !Number.isInteger(value))) throw new Error(label + "：%ERROR_RANGE%");
    return value;
  }
  function accession(form) {
    var prefix = raw(form, "prefix", "%TOOL_01_FIELD_01%").toUpperCase();
    var series = raw(form, "series", "%TOOL_01_FIELD_02%").toUpperCase();
    var year = number(form, "year", "%TOOL_01_FIELD_03%", 1900, 2200, true);
    var start = number(form, "start", "%TOOL_01_FIELD_04%", 1, 999999, true);
    var count = number(form, "count", "%TOOL_01_FIELD_05%", 1, 50, true);
    if (!/^[A-Z0-9]{2,6}$/.test(prefix) || !/^[A-Z0-9]{2,6}$/.test(series)) throw new Error("%TOOL_01_ERROR_CODE%");
    if (start + count - 1 > 999999) throw new Error("%TOOL_01_ERROR_OVERFLOW%");
    var width = Math.max(4, String(start + count - 1).length);
    var rows = [];
    for (var i = 0; i < count; i += 1) rows.push(prefix + "-" + year + "-" + series + "-" + String(start + i).padStart(width, "0"));
    return rows.join("\n");
  }
  function citation(form) {
    var title = raw(form, "title", "%TOOL_02_FIELD_01%");
    var source = raw(form, "source", "%TOOL_02_FIELD_02%");
    var year = number(form, "year", "%TOOL_02_FIELD_03%", 1000, 2200, true);
    var url = raw(form, "url", "%TOOL_02_FIELD_04%");
    try { new URL(url); } catch (_) { throw new Error("%TOOL_02_ERROR_URL%"); }
    if (form.elements.style.value === "catalog") return source.toUpperCase() + " · " + year + " · " + title + "\n" + url;
    return title + ". " + source + ", " + year + ". " + url;
  }
  function daysBetween(a, b) { return Math.round((b.getTime() - a.getTime()) / 86400000); }
  function dates(form) {
    var eventDate = new Date(raw(form, "event", "%TOOL_03_FIELD_01%") + "T00:00:00Z");
    var published = new Date(raw(form, "published", "%TOOL_03_FIELD_02%") + "T00:00:00Z");
    var verified = new Date(raw(form, "verified", "%TOOL_03_FIELD_03%") + "T00:00:00Z");
    if ([eventDate, published, verified].some(function (date) { return Number.isNaN(date.getTime()); })) throw new Error("%TOOL_03_ERROR_DATE%");
    if (eventDate > published || published > verified) throw new Error("%TOOL_03_ERROR_ORDER%");
    return "%TOOL_03_RESULT_EVENT_PUBLISH%：" + daysBetween(eventDate, published) + "\n%TOOL_03_RESULT_PUBLISH_VERIFY%：" + daysBetween(published, verified) + "\n%TOOL_03_RESULT_TOTAL%：" + daysBetween(eventDate, verified);
  }
  function fnv1a(value) {
    var hash = 2166136261;
    for (var i = 0; i < value.length; i += 1) { hash ^= value.charCodeAt(i); hash = Math.imul(hash, 16777619); }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }
  function fingerprint(form) {
    var value = raw(form, "sourceText", "%TOOL_04_FIELD_01%");
    if (value.length > 10000) throw new Error("%TOOL_04_ERROR_LENGTH%");
    var source = form.elements.mode.value === "normalized" ? value.normalize("NFKC").replace(/\s+/g, " ").trim() : value;
    return "%TOOL_04_RESULT_HASH%：FNV1A-" + fnv1a(source).toUpperCase() + "\n%TOOL_04_RESULT_CHARS%：" + source.length + "\n%TOOL_04_RESULT_LINES%：" + source.split(/\r?\n/).length + "\n%TOOL_04_RESULT_NOTE%";
  }
  function priority(form) {
    var relevance = number(form, "relevance", "%TOOL_05_FIELD_01%", 0, 5, true);
    var provenance = number(form, "provenance", "%TOOL_05_FIELD_02%", 0, 5, true);
    var currency = number(form, "currency", "%TOOL_05_FIELD_03%", 0, 5, true);
    var effort = number(form, "effort", "%TOOL_05_FIELD_04%", 0, 5, true);
    var score = (relevance * 4 + provenance * 3 + currency * 2 + (5 - effort)) / 10;
    var band = score >= 4 ? "%TOOL_05_BAND_HIGH%" : score >= 2.5 ? "%TOOL_05_BAND_MIDDLE%" : "%TOOL_05_BAND_LOW%";
    return "%TOOL_05_RESULT_SCORE%：" + score.toFixed(2) + " / 5\n%TOOL_05_RESULT_BAND%：" + band + "\n%TOOL_05_RESULT_NOTE%";
  }
  function calculate(form) {
    var kind = form.getAttribute("data-vlm-tool");
    if (kind === "accession") return accession(form);
    if (kind === "citation") return citation(form);
    if (kind === "dates") return dates(form);
    if (kind === "fingerprint") return fingerprint(form);
    return priority(form);
  }
  document.querySelectorAll("form[data-vlm-tool]").forEach(function (form) {
    var desk = form.parentElement;
    var output = desk.querySelector("[data-vlm-output]");
    var error = form.querySelector("[data-vlm-error]");
    var copyButton = desk.querySelector("[data-vlm-result-copy]");
    var copyNote = desk.querySelector("[data-vlm-copy-note]");
    function clearInvalid() { form.querySelectorAll("[aria-invalid=true]").forEach(function (field) { field.removeAttribute("aria-invalid"); }); }
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearInvalid();
      error.textContent = "";
      copyNote.textContent = "";
      try {
        output.textContent = calculate(form);
        copyButton.disabled = false;
      } catch (problem) {
        error.textContent = problem.message;
        output.textContent = "%RESULT_ERROR%";
        copyButton.disabled = true;
        var first = Array.prototype.find.call(form.elements, function (field) { return field.matches && field.matches("input,textarea") && !String(field.value || "").trim(); });
        if (!first) first = form.querySelector("input,textarea,select");
        if (first) { first.setAttribute("aria-invalid", "true"); first.focus(); }
      }
    });
    form.addEventListener("reset", function () {
      window.setTimeout(function () { clearInvalid(); error.textContent = ""; output.textContent = "%RESULT_IDLE%"; copyButton.disabled = true; copyNote.textContent = ""; }, 0);
    });
    copyButton.addEventListener("click", function () {
      window.vlmCopyText(output.textContent.trim()).then(function (okay) { copyNote.textContent = okay ? "%COPY_SUCCESS%" : "%COPY_FAILURE%"; });
    });
  });
}());
