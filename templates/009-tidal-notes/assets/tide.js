(function () {
  "use strict";

  // Day-gap calculator on tool.html
  var runBtn = document.getElementById("gap-run");
  if (!runBtn) return;

  var start = document.getElementById("gap-a");
  var end = document.getElementById("gap-b");
  var out = document.getElementById("gap-out");

  [start, end].forEach(function (field) {
    field.addEventListener("input", function () {
      field.removeAttribute("aria-invalid");
    });
  });

  runBtn.addEventListener("click", function () {
    var a = start.value;
    var b = end.value;
    if (!a || !b) {
      start.setAttribute("aria-invalid", a ? "false" : "true");
      end.setAttribute("aria-invalid", b ? "false" : "true");
      out.className = "is-error";
      out.textContent = "请先选择起始日期和结束日期。";
      (a ? end : start).focus();
      return;
    }
    start.setAttribute("aria-invalid", "false");
    end.setAttribute("aria-invalid", "false");
    out.className = "";
    var da = new Date(a + "T00:00:00");
    var db = new Date(b + "T00:00:00");
    var ms = db.getTime() - da.getTime();
    var days = Math.round(ms / 86400000);
    if (days === 0) {
      out.textContent = "两次记录在同一天。";
    } else if (days > 0) {
      out.textContent = "相隔 " + days + " 天，结束日期在后。";
    } else {
      out.textContent = "相隔 " + Math.abs(days) + " 天，起始日期反而更晚。";
    }
  });
})();
