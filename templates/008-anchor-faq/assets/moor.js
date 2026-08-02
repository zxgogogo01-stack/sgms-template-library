(function () {
  "use strict";

  var search = document.getElementById("faq-search");
  if (search) {
    var units = document.querySelectorAll(".qa-block__unit");
    var blocks = document.querySelectorAll(".qa-block");
    var empty = document.getElementById("faq-empty");
    var status = document.getElementById("faq-status");
    var clear = document.getElementById("faq-clear");
    function filterFaq() {
      var q = search.value.trim().toLowerCase();
      var visible = 0;
      for (var i = 0; i < units.length; i++) {
        var hay = (units[i].textContent + " " + (units[i].getAttribute("data-search") || "")).toLowerCase();
        units[i].hidden = q !== "" && hay.indexOf(q) === -1;
        if (!units[i].hidden) visible++;
      }
      for (var j = 0; j < blocks.length; j++) blocks[j].hidden = q !== "" && !blocks[j].querySelector(".qa-block__unit:not([hidden])");
      empty.hidden = visible !== 0;
      status.textContent = q === "" ? "6 个常见问题" : (visible ? "找到 " + visible + " 个答案" : "没有匹配答案");
    }
    search.addEventListener("input", filterFaq);
    clear.addEventListener("click", function () { search.value = ""; filterFaq(); search.focus(); });
  }

  var invite = document.querySelector(".invite-belt__act");
  if (invite) invite.addEventListener("click", function () { copyText(document.getElementById("belt-code").textContent.trim(), invite, "已复制"); });

  var form = document.getElementById("ticket-form");
  if (form) {
    var type = document.getElementById("tk-type");
    var what = document.getElementById("tk-what");
    var when = document.getElementById("tk-when");
    var error = document.getElementById("tk-error");
    var tried = document.getElementById("tk-tried");
    var out = document.getElementById("tk-out");
    var state = document.getElementById("ticket-state");
    var copy = document.getElementById("ticket-copy");

    [type, what].forEach(function (field) {
      field.addEventListener("input", function () {
        if ((field === type && field.value) || (field === what && field.value.trim())) {
          field.removeAttribute("aria-invalid");
        }
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var invalid = [];
      if (!type.value) invalid.push(type);
      if (!what.value.trim()) invalid.push(what);
      [type, what].forEach(function (field) { field.setAttribute("aria-invalid", invalid.indexOf(field) !== -1 ? "true" : "false"); });
      if (invalid.length) {
        state.textContent = "请完成两个必填项";
        state.className = "is-error";
        out.value = "";
        copy.disabled = true;
        invalid[0].focus();
        return;
      }
      var lines = ["【问题分类】" + type.value, "【问题描述】" + what.value.trim()];
      if (when.value) lines.push("【发生时间】" + when.value.replace("T", " "));
      if (error.value.trim()) lines.push("【错误提示】" + error.value.trim());
      if (tried.value.trim()) lines.push("【已尝试】" + tried.value.trim());
      lines.push("【相关页面】{{SITE_DOMAIN}}", "【补充说明】请勿在工单中发送密码、验证码或恢复码。");
      out.value = lines.join("\n");
      state.textContent = "报告已生成，可以复制";
      state.className = "is-success";
      copy.disabled = false;
    });
    form.addEventListener("reset", function () { setTimeout(function () { out.value = ""; state.textContent = "等待填写"; state.className = ""; copy.disabled = true; [type, what].forEach(function (field) { field.removeAttribute("aria-invalid"); }); }, 0); });
    copy.addEventListener("click", function () { copyText(out.value, copy, "已复制结果"); });
  }

  function copyText(text, button, done) {
    var success = function () { var old = button.textContent; button.textContent = done; setTimeout(function () { button.textContent = old; }, 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(success, function () { fallback(text, success); });
    else fallback(text, success);
  }
  function fallback(text, success) {
    var area = document.createElement("textarea"); area.value = text; area.style.position = "fixed"; area.style.opacity = "0"; document.body.appendChild(area); area.select();
    try { document.execCommand("copy"); success(); } catch (e) {} document.body.removeChild(area);
  }
})();
