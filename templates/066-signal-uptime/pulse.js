/* 066 behaviors */
(function () {
  "use strict";

  var btn = document.getElementById("pylon-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      var nav = document.getElementById("pylon-nav");
      if (!nav) return;
      var open = nav.classList.toggle("lit66");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* fee deviation check */
  var devForm = document.getElementById("dv-form");
  if (devForm) {
    var amtInput = document.getElementById("dv-amt");
    var rateInput = document.getElementById("dv-rate");
    var paidInput = document.getElementById("dv-paid");
    var devInputs = [amtInput, rateInput, paidInput];
    devInputs.forEach(function (input) {
      input.addEventListener("input", function () { input.removeAttribute("aria-invalid"); });
    });
    devForm.addEventListener("submit", function (event) {
      event.preventDefault();
      devInputs.forEach(function (input) { input.removeAttribute("aria-invalid"); });
      var amt = amtInput.value.trim() === "" ? NaN : Number(amtInput.value);
      var rate = rateInput.value.trim() === "" ? NaN : Number(rateInput.value);
      var paid = paidInput.value.trim() === "" ? NaN : Number(paidInput.value);
      var out = document.getElementById("dv-out");
      var invalid = [];
      if (!Number.isFinite(amt) || amt <= 0) invalid.push(amtInput);
      if (!Number.isFinite(rate) || rate < 0 || rate > 100) invalid.push(rateInput);
      if (!Number.isFinite(paid) || paid < 0) invalid.push(paidInput);
      if (invalid.length) {
        invalid.forEach(function (input) { input.setAttribute("aria-invalid", "true"); });
        out.textContent = "请检查标红字段：交易额须大于 0，费率须在 0–100 之间，实付手续费不能为负。";
        invalid[0].focus();
        return;
      }
      var expect = amt * rate / 100;
      var diff = paid - expect;
      var pct = expect > 0 ? diff / expect * 100 : null;
      var verdict;
      if (expect === 0 && paid > 0) {
        paidInput.setAttribute("aria-invalid", "true");
        verdict = "口径应付为 0，但存在实付手续费——请核对费率档位、费用类型或交易额。";
        paidInput.focus();
      } else if (expect === 0) {
        verdict = "口径与实付均为 0，未发现偏差。";
      } else if (Math.abs(pct) <= 2) {
        verdict = "口径一致，正常范围。";
      } else if (pct > 2) {
        verdict = "实付偏高 " + pct.toFixed(1) + "%——核对费率档位、结算币种或是否含滑点。";
      } else {
        verdict = "实付低于口径 " + Math.abs(pct).toFixed(1) + "%——大概率是减免生效了。";
      }
      out.innerHTML = "口径应付 <b>" + expect.toFixed(2) + "</b> · 实付 <b>" + paid.toFixed(2)
        + "</b> · 偏差 <b>" + diff.toFixed(2) + "</b><br>" + verdict + "<br>演示口径，实际以平台结算为准。";
    });
  }
})();
