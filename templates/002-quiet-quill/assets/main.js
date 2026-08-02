(function () {
  "use strict";

  var form = document.getElementById("sub-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var field = document.getElementById("sub-mail");
      var status = document.getElementById("sub-status");
      if (!field || !status) return;
      if (!field.validity.valid) {
        status.textContent = "请检查邮箱格式，再试一次。";
        status.className = "note-box__done is-error";
        field.setAttribute("aria-invalid", "true");
        field.focus();
        return;
      }
      field.removeAttribute("aria-invalid");
      status.textContent = "已记下这份订阅意愿。演示模板不会上传或保存邮箱。";
      status.className = "note-box__done is-success";
      form.reset();
    });
  }

  // Word / character counter on tool.html
  var field = document.getElementById("count-src");
  if (field) {
    var clear = document.getElementById("count-clear");
    var charsOut = document.getElementById("metric-chars");
    var wordsOut = document.getElementById("metric-words");
    var parasOut = document.getElementById("metric-paras");
    var timeOut = document.getElementById("metric-time");
    var hint = document.getElementById("count-hint");
    var update = function () {
      var text = field.value;
      var chars = text.replace(/\s/g, "").length;
      var cjk = (text.match(/[一-鿿]/g) || []).length;
      var words = (text.match(/[A-Za-z0-9]+/g) || []).length;
      var paras = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;
      var minutes = chars ? Math.max(1, Math.ceil((cjk + words) / 320)) : 0;
      charsOut.textContent = chars;
      wordsOut.textContent = words;
      parasOut.textContent = paras;
      timeOut.textContent = minutes;
      if (!chars) hint.textContent = "还没有文字。输入后会给出一条简短的篇幅提示。";
      else if (chars < 300) hint.textContent = "这更像一则短札记；如果是长文，可以再补一个事实或例子。";
      else if (chars < 1200) hint.textContent = "篇幅适合一封简短信札，读者可以在一次停留中读完。";
      else hint.textContent = "已经进入长文区间，建议用小标题为读者留出换气的位置。";
    };
    field.addEventListener("input", update);
    if (clear) clear.addEventListener("click", function () { field.value = ""; update(); field.focus(); });
    update();
  }
})();
