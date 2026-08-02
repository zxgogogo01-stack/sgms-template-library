(function () {
  "use strict";

  var knob = document.getElementById("awning-knob");
  if (knob) {
    knob.addEventListener("click", function () {
      var nav = document.getElementById("awning-nav");
      if (!nav) return;
      var open = nav.classList.toggle("unrolled");
      knob.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var copyBtn = document.getElementById("wa-copy");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var node = document.getElementById("wa-code");
      if (!node) return;
      var text = node.textContent.trim();
      var done = function () {
        copyBtn.textContent = "已复制";
        setTimeout(function () { copyBtn.textContent = "复制"; }, 1400);
      };
      var fallback = function () {
        var r = document.createRange();
        r.selectNodeContents(node);
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
        try { document.execCommand("copy"); done(); } catch (e) {}
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
    });
  }

  var tallyForm = document.getElementById("bk-form");
  if (tallyForm) {
    var feeInputs = ["bk-f1", "bk-f2", "bk-f3"].map(function (id) { return document.getElementById(id); });
    var cutInput = document.getElementById("bk-cut");
    var tallyInputs = feeInputs.concat(cutInput);
    tallyInputs.forEach(function (input) {
      input.addEventListener("input", function () { input.removeAttribute("aria-invalid"); });
    });
    tallyForm.addEventListener("submit", function (event) {
      event.preventDefault();
      tallyInputs.forEach(function (input) { input.removeAttribute("aria-invalid"); });
      var sum = 0;
      var used = 0;
      var invalidFees = [];
      for (var i = 0; i < feeInputs.length; i++) {
        var raw = feeInputs[i].value.trim();
        if (raw === "") continue;
        var v = Number(raw);
        if (!Number.isFinite(v) || v < 0) { invalidFees.push(feeInputs[i]); continue; }
        sum += v;
        used++;
      }
      var cutRaw = cutInput.value.trim();
      var cut = cutRaw === "" ? NaN : Number(cutRaw);
      var out = document.getElementById("bk-out");
      if (invalidFees.length) {
        invalidFees.forEach(function (input) { input.setAttribute("aria-invalid", "true"); });
        out.textContent = "请检查标红字段：手续费不能为负数。";
        invalidFees[0].focus();
        return;
      }
      if (used === 0) {
        feeInputs[0].setAttribute("aria-invalid", "true");
        out.textContent = "至少填写一笔不小于 0 的手续费。";
        feeInputs[0].focus();
        return;
      }
      if (!Number.isFinite(cut) || cut < 0 || cut > 100) {
        cutInput.setAttribute("aria-invalid", "true");
        out.textContent = "返佣比例须填写 0–100 之间的百分数。";
        cutInput.focus();
        return;
      }
      var back = sum * cut / 100;
      out.innerHTML = "共记 " + used + " 笔，合计手续费 <b>" + sum.toFixed(2) + "</b>，按 " + cut + "% 估算返佣 <b>" + back.toFixed(2) + "</b>。<br>演示口径，实际以平台结算为准。";
    });
  }
})();
