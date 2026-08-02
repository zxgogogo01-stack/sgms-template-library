/* 078 behaviors */
(function () {
  "use strict";

  var btn = document.getElementById("fieldbar-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      var nav = document.getElementById("fieldbar-nav");
      if (!nav) return;
      var open = nav.classList.toggle("pitched");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* platform-switch saving estimate */
  var swForm = document.getElementById("sw-form");
  if (swForm) {
    var volField = document.getElementById("sw-vol");
    var raField = document.getElementById("sw-ra");
    var rbField = document.getElementById("sw-rb");
    var out = document.getElementById("sw-out");
    var fields = [volField, raField, rbField];
    var badRate = function (field, value) {
      return field.value.trim() === "" || !Number.isFinite(value) || value < 0 || value > 100;
    };
    fields.forEach(function (field) {
      field.addEventListener("input", function () { field.removeAttribute("aria-invalid"); });
    });
    swForm.addEventListener("submit", function (event) {
      event.preventDefault();
      fields.forEach(function (field) { field.removeAttribute("aria-invalid"); });
      var vol = Number(volField.value);
      var ra = Number(raField.value);
      var rb = Number(rbField.value);
      var invalid = [];
      if (volField.value.trim() === "" || !Number.isFinite(vol) || vol <= 0) invalid.push(volField);
      if (badRate(raField, ra)) invalid.push(raField);
      if (badRate(rbField, rb)) invalid.push(rbField);
      if (invalid.length) {
        invalid.forEach(function (field) { field.setAttribute("aria-invalid", "true"); });
        if (invalid[0] === volField) {
          out.textContent = "月交易量须填写大于 0 的数字。";
        } else if (invalid[0] === raField) {
          out.textContent = "A 的净费率须为 0–100 之间的百分数。";
        } else {
          out.textContent = "B 的净费率须为 0–100 之间的百分数。";
        }
        invalid[0].focus();
        return;
      }
      var diffRate = ra - rb;
      var monthly = vol * diffRate / 100;
      var yearly = monthly * 12;
      var verdict;
      if (Math.abs(monthly) < 0.005) {
        verdict = "两边基本打平，迁移意义不大。";
      } else if (monthly > 0) {
        verdict = "换到 B 每月约省 " + monthly.toFixed(2) + "，一年约 " + yearly.toFixed(2) + "——再权衡迁移成本与深度差异。";
      } else {
        verdict = "B 反而更贵，每月多花 " + Math.abs(monthly).toFixed(2) + "，先别搬。";
      }
      out.innerHTML = "净费率差 <b>" + diffRate.toFixed(4) + "%</b> · 月差额 <b>" + monthly.toFixed(2)
        + "</b> · 年差额 <b>" + yearly.toFixed(2) + "</b><br>" + verdict + "<br>演示口径，实际以平台结算为准。";
    });
  }
})();
