(function () {
  "use strict";

  var btn = document.getElementById("stagebar-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      var nav = document.getElementById("stagebar-nav");
      if (!nav) return;
      var open = nav.classList.toggle("curtained");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var gapForm = document.getElementById("tg-form");
  if (gapForm) {
    var volumeField = document.getElementById("tg-vol");
    var goalField = document.getElementById("tg-goal");
    var daysField = document.getElementById("tg-days");
    var out = document.getElementById("tg-out");
    var fields = [volumeField, goalField, daysField];
    fields.forEach(function (field) {
      field.addEventListener("input", function () {
        field.removeAttribute("aria-invalid");
      });
    });
    gapForm.addEventListener("submit", function (event) {
      event.preventDefault();
      fields.forEach(function (field) { field.removeAttribute("aria-invalid"); });
      var vol = Number(volumeField.value);
      var goal = Number(goalField.value);
      var days = daysField.value.trim() === "" ? null : Number(daysField.value);
      var invalid = [];
      if (volumeField.value.trim() === "" || !Number.isFinite(vol) || vol < 0) {
        invalid.push({ field: volumeField, message: "当前 30 天交易量须填写不小于 0 的数字。" });
      }
      if (goalField.value.trim() === "" || !Number.isFinite(goal) || goal <= 0) {
        invalid.push({ field: goalField, message: "下一档门槛须填写大于 0 的数字。" });
      }
      if (days !== null && (!Number.isInteger(days) || days < 1)) {
        invalid.push({ field: daysField, message: "剩余天数可留空；填写时须为不小于 1 的整数。" });
      }
      if (invalid.length) {
        invalid.forEach(function (item) { item.field.setAttribute("aria-invalid", "true"); });
        out.textContent = invalid[0].message;
        invalid[0].field.focus();
        return;
      }
      if (vol >= goal) {
        out.innerHTML = "已经站上这一档（" + vol.toFixed(0) + " / " + goal.toFixed(0) + "）——去规则页确认档位生效时间。";
        return;
      }
      var gap = goal - vol;
      var pct = vol / goal * 100;
      var text = "进度 <b>" + pct.toFixed(1) + "%</b> · 还差 <b>" + gap.toFixed(0) + "</b>";
      if (days !== null) {
        text += "<br>剩 " + days + " 天，日均还需约 <b>" + (gap / days).toFixed(0) + "</b> 的量。";
      } else {
        text += "<br>填上剩余天数，可折算日均需求。";
      }
      out.innerHTML = text + "<br>演示口径，档位规则以平台页面为准；不建议为凑档而过度交易。";
    });
  }
})();
