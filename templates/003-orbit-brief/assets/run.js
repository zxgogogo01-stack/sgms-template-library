(function () {
  "use strict";

  var form = document.getElementById("cd-form");
  if (!form) return;

  var input = document.getElementById("cd-date");
  var out = document.getElementById("cd-out");
  var quick = document.getElementById("cd-week");

  var isoDate = function (date) {
    var local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  };

  if (quick) {
    quick.addEventListener("click", function () {
      var target = new Date();
      target.setDate(target.getDate() + 7);
      input.value = isoDate(target);
      input.focus();
    });
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (!input.value) {
      out.className = "cd-panel__show is-error";
      out.textContent = "尚未计算：请先选择一个目标日期。";
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }

    input.removeAttribute("aria-invalid");
    var target = new Date(input.value + "T00:00:00");
    var diff = target.getTime() - Date.now();
    if (isNaN(diff)) {
      out.className = "cd-panel__show is-error";
      out.textContent = "日期格式无法识别，请重新选择。";
      return;
    }
    if (diff <= 0) {
      out.className = "cd-panel__show is-error";
      out.textContent = "这个日期已经过去，请设定下一次观察窗口。";
      return;
    }

    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var checkDay = Math.max(1, Math.ceil(days / 2));
    out.className = "cd-panel__show is-success";
    out.innerHTML = "<strong>还剩 " + days + " 天 " + hours + " 小时</strong><span>建议在第 " + checkDay + " 天做一次中途检查，目标日再完成正式复盘。</span>";
  });
})();
