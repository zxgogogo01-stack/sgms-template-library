(function () {
  "use strict";

  // Copy invite code to clipboard, with a selection fallback
  var copyBtn = document.querySelector(".invite-strip__copy");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var codeEl = document.getElementById("invite-code");
      var hint = document.querySelector(".invite-strip__hint");
      if (!codeEl) return;
      var text = codeEl.textContent.trim();
      function done() {
        if (hint) {
          hint.hidden = false;
          setTimeout(function () { hint.hidden = true; }, 2000);
        }
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {
          selectFallback(codeEl, done);
        });
      } else {
        selectFallback(codeEl, done);
      }
    });
  }

  function selectFallback(el, done) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try {
      document.execCommand("copy");
      done();
    } catch (e) {
      // leave the text selected so the user can copy manually
    }
  }

  // Rate table filtering by venue / tier selects
  var venueSel = document.getElementById("pick-venue");
  var tierSel = document.getElementById("pick-tier");
  var table = document.getElementById("rate-table");
  var resetFilter = document.getElementById("reset-filter");
  var emptyState = document.getElementById("rate-empty");
  if (table && (venueSel || tierSel)) {
    function applyFilter() {
      var v = venueSel ? venueSel.value : "";
      var t = tierSel ? tierSel.value : "";
      var rows = table.querySelectorAll("tbody tr");
      var shown = 0;
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var okV = !v || row.getAttribute("data-venue") === v;
        var okT = !t || row.getAttribute("data-tier") === t;
        var visible = okV && okT;
        row.hidden = !visible;
        if (visible) shown += 1;
      }
      if (emptyState) emptyState.hidden = shown !== 0;
    }
    if (venueSel) venueSel.addEventListener("change", applyFilter);
    if (tierSel) tierSel.addEventListener("change", applyFilter);
    if (resetFilter) {
      resetFilter.addEventListener("click", function () {
        if (venueSel) venueSel.value = "";
        if (tierSel) tierSel.value = "";
        applyFilter();
        if (venueSel) venueSel.focus();
      });
    }
  }

  // Fee estimator on tool.html
  var calcForm = document.getElementById("fee-calc");
  if (calcForm) {
    calcForm.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var amountInput = document.getElementById("calc-amount");
      var rateInput = document.getElementById("calc-rate");
      var amount = parseFloat(amountInput.value);
      var rate = parseFloat(rateInput.value);
      var out = document.getElementById("calc-result");
      amountInput.removeAttribute("aria-invalid");
      rateInput.removeAttribute("aria-invalid");
      out.removeAttribute("data-state");
      if (isNaN(amount) || amount <= 0) {
        amountInput.setAttribute("aria-invalid", "true");
        out.setAttribute("data-state", "error");
        out.textContent = "请输入大于 0 的金额。";
        amountInput.focus();
        return;
      }
      if (isNaN(rate) || rate < 0) {
        rateInput.setAttribute("aria-invalid", "true");
        out.setAttribute("data-state", "error");
        out.textContent = "请输入不小于 0 的费率。";
        rateInput.focus();
        return;
      }
      var fee = amount * (rate / 100);
      out.setAttribute("data-state", "success");
      out.textContent = "预估费用：" + fee.toFixed(4) + "（金额 " + amount + " × 费率 " + rate + "%）";
    });
  }
})();
