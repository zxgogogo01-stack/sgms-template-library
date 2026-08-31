(function () {
  "use strict";

  var clauseSearch = document.getElementById("clause-search");
  var clauses = Array.prototype.slice.call(document.querySelectorAll("[data-clause]"));
  var clauseFilters = Array.prototype.slice.call(document.querySelectorAll("[data-clause-filter]"));
  var clauseCount = document.getElementById("clause-count");
  var clauseEmpty = document.getElementById("clause-empty");
  var resetClauses = document.getElementById("reset-clauses");
  var activeKind = "all";

  function normalize(value) {
    return value.toLocaleLowerCase().replace(/\s+/g, " ").trim();
  }

  function renderClauses() {
    if (!clauseSearch || !clauseCount) return;
    var query = normalize(clauseSearch.value);
    var visible = 0;
    clauses.forEach(function (clause) {
      var kindMatch = activeKind === "all" || clause.dataset.kind === activeKind;
      var textMatch = !query || normalize(clause.textContent).indexOf(query) !== -1;
      clause.hidden = !(kindMatch && textMatch);
      if (!clause.hidden) visible += 1;
    });
    clauseCount.textContent = visible + " / " + clauses.length + " 条原则可见";
    clauseEmpty.hidden = visible !== 0;
  }

  if (clauseSearch) {
    clauseSearch.addEventListener("input", renderClauses);
    clauseFilters.forEach(function (button) {
      button.addEventListener("click", function () {
        activeKind = button.dataset.clauseFilter;
        clauseFilters.forEach(function (item) {
          item.setAttribute("aria-pressed", item === button ? "true" : "false");
        });
        renderClauses();
      });
    });
    resetClauses.addEventListener("click", function () {
      activeKind = "all";
      clauseSearch.value = "";
      clauseFilters.forEach(function (button) {
        button.setAttribute("aria-pressed", button.dataset.clauseFilter === "all" ? "true" : "false");
      });
      renderClauses();
      clauseSearch.focus();
    });
    renderClauses();
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-act]");
    if (!button) return;
    var action = button.dataset.act;
    if (action === "copy-reference") copyReference(button);
    if (action === "convert") convertWidth();
    if (action === "copy-output") copyOutput();
    if (action === "clear-tool") clearTool();
    if (action === "load-sample") loadSample();
  });

  function writeClipboard(text, fallbackNode, done) {
    var fallback = function () {
      fallbackNode.focus();
      if (fallbackNode.select) fallbackNode.select();
      document.execCommand("copy");
      done();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else {
      fallback();
    }
  }

  function copyReference(button) {
    var status = button.parentElement.querySelector("[data-inline-status]");
    writeClipboard(button.dataset.reference, button, function () {
      button.textContent = "已复制引用";
      if (status) status.textContent = button.dataset.reference + " 已复制";
    });
  }

  var source = document.getElementById("width-source");
  var output = document.getElementById("width-output");

  function invalidateTool() {
    if (!source) return;
    source.removeAttribute("aria-invalid");
    document.getElementById("tool-error").textContent = "";
    document.getElementById("tool-status").textContent = "";
    document.getElementById("tool-result").hidden = true;
    output.value = "";
    document.getElementById("output-count").textContent = "0 字符";
    document.getElementById("changed-count").textContent = "0";
    document.getElementById("mode-label").textContent = "—";
  }

  if (source) {
    source.addEventListener("input", function () {
      document.getElementById("source-count").textContent = source.value.length + " 字符";
      invalidateTool();
    });
    Array.prototype.forEach.call(document.querySelectorAll('input[name="width-mode"]'), function (radio) {
      radio.addEventListener("change", invalidateTool);
    });
    output.addEventListener("input", function () {
      document.getElementById("output-count").textContent = output.value.length + " 字符";
      document.getElementById("tool-status").textContent = "";
    });
  }

  function selectedMode() {
    var checked = document.querySelector('input[name="width-mode"]:checked');
    return checked ? checked.value : "half";
  }

  function toHalf(text) {
    var out = "";
    for (var i = 0; i < text.length; i += 1) {
      var code = text.charCodeAt(i);
      if (code === 0x3000) code = 32;
      else if (code >= 0xff01 && code <= 0xff5e) code -= 0xfee0;
      out += String.fromCharCode(code);
    }
    return out;
  }

  function toFull(text) {
    var out = "";
    for (var i = 0; i < text.length; i += 1) {
      var code = text.charCodeAt(i);
      if (code === 32) code = 0x3000;
      else if (code >= 0x21 && code <= 0x7e) code += 0xfee0;
      out += String.fromCharCode(code);
    }
    return out;
  }

  function convertWidth() {
    var input = document.getElementById("width-source");
    var output = document.getElementById("width-output");
    var error = document.getElementById("tool-error");
    var panel = document.getElementById("tool-result");
    var status = document.getElementById("tool-status");
    if (!input.value) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = "请先输入需要规范化的文本。";
      panel.hidden = true;
      input.focus();
      return;
    }
    if (input.value.length > 20000) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = "单次输入不得超过 20,000 个字符。";
      panel.hidden = true;
      input.focus();
      return;
    }
    var mode = selectedMode();
    var converted = mode === "half" ? toHalf(input.value) : toFull(input.value);
    var changed = 0;
    for (var i = 0; i < input.value.length; i += 1) {
      if (input.value[i] !== converted[i]) changed += 1;
    }
    input.removeAttribute("aria-invalid");
    error.textContent = "";
    status.textContent = "";
    output.value = converted;
    document.getElementById("output-count").textContent = converted.length + " 字符";
    document.getElementById("changed-count").textContent = changed;
    document.getElementById("mode-label").textContent = mode === "half" ? "全角 → 半角" : "半角 → 全角";
    panel.hidden = false;
    output.focus();
  }

  function copyOutput() {
    var output = document.getElementById("width-output");
    var status = document.getElementById("tool-status");
    if (!output || !output.value) return;
    writeClipboard(output.value, output, function () { status.textContent = "规范化结果已复制"; });
  }

  function clearTool() {
    var input = document.getElementById("width-source");
    input.value = "";
    document.getElementById("source-count").textContent = "0 字符";
    document.getElementById("mode-half").checked = true;
    invalidateTool();
    input.focus();
  }

  function loadSample() {
    var input = document.getElementById("width-source");
    input.value = "版本：Ｖ２．４　负责人：ＥＤＩＴＯＲ\n状态：ＡＣＣＥＰＴＥＤ　日期：２０２６－０８－０１";
    document.getElementById("source-count").textContent = input.value.length + " 字符";
    invalidateTool();
    input.focus();
  }
})();
