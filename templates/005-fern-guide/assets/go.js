(function () {
  "use strict";

  var copyButton = document.querySelector(".invite-nook__btn");
  if (copyButton) {
    copyButton.addEventListener("click", function () {
      var codeBox = document.getElementById("nook-code");
      var status = document.getElementById("copy-status");
      if (!codeBox || !status) return;

      var value = codeBox.textContent.trim();
      if (!value) {
        status.textContent = "暂时没有可复制的代码。";
        return;
      }

      var complete = function () {
        copyButton.textContent = "已复制";
        status.textContent = "代码已复制到剪贴板。";
        window.setTimeout(function () {
          copyButton.textContent = "复制代码";
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(complete, function () {
          selectAndCopy(codeBox, complete, status);
        });
      } else {
        selectAndCopy(codeBox, complete, status);
      }
    });
  }

  function selectAndCopy(node, complete, status) {
    var range = document.createRange();
    range.selectNodeContents(node);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand("copy");
      complete();
    } catch (error) {
      status.textContent = "自动复制失败，代码已选中，请手动复制。";
    }
  }

  var form = document.getElementById("prog-form");
  if (!form) return;

  var doneInput = document.getElementById("prog-done");
  var totalInput = document.getElementById("prog-total");
  var paceInput = document.getElementById("prog-pace");
  var output = document.getElementById("prog-out");
  var bar = document.getElementById("prog-bar");
  var track = form.querySelector(".prog__track");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var done = Number(doneInput.value);
    var total = Number(totalInput.value);
    var pace = Number(paceInput.value);
    var invalid = [];

    clearInvalid();

    if (!Number.isInteger(done) || done < 0) invalid.push(doneInput);
    if (!Number.isInteger(total) || total < 1) invalid.push(totalInput);
    if (Number.isInteger(done) && Number.isInteger(total) && done > total) {
      invalid.push(doneInput, totalInput);
    }

    if (invalid.length) {
      invalid.forEach(function (field) { field.setAttribute("aria-invalid", "true"); });
      output.className = "prog__result prog__result--error";
      output.innerHTML = "<span class=\"prog__result-kicker\">CHECK THE ROUTE</span><strong>请检查输入</strong><small>填写非负整数，并确保已完成章节不超过总章节数。</small>";
      bar.style.width = "0%";
      track.setAttribute("aria-valuenow", "0");
      invalid[0].focus();
      return;
    }

    var percent = Math.round((done / total) * 100);
    var remaining = total - done;
    var nextCount = Math.min(pace, remaining);
    var headline;
    var suggestion;

    if (remaining === 0) {
      headline = "路线已完成";
      suggestion = "回看笔记并标出仍需复核的内容，再开启下一轮学习。";
    } else if (percent < 35) {
      headline = "刚刚离开起点";
      suggestion = "下一次完成 " + nextCount + " 章，优先建立概念边界，不急着追求速度。";
    } else if (percent < 75) {
      headline = "已进入路线中段";
      suggestion = "下一次完成 " + nextCount + " 章，并把一个关键结论写成可核对的边界卡。";
    } else {
      headline = "终点已经可见";
      suggestion = "下一次完成 " + nextCount + " 章，同时预留十分钟做整段复盘。";
    }

    output.className = "prog__result prog__result--success";
    output.innerHTML = "<span class=\"prog__result-kicker\">ROUTE STATUS</span><strong>" + percent + "% · " + headline + "</strong><small>剩余 " + remaining + " 章。" + suggestion + "</small>";
    bar.style.width = percent + "%";
    track.setAttribute("aria-valuenow", String(percent));
  });

  form.addEventListener("reset", function () {
    window.setTimeout(function () {
      clearInvalid();
      output.className = "prog__result";
      output.innerHTML = "<span class=\"prog__result-kicker\">ROUTE STATUS</span><strong>等待输入路线数据</strong><small>填写后将显示完成比例、剩余章节与下一步建议。</small>";
      bar.style.width = "0%";
      track.setAttribute("aria-valuenow", "0");
    }, 0);
  });

  function clearInvalid() {
    doneInput.removeAttribute("aria-invalid");
    totalInput.removeAttribute("aria-invalid");
  }
})();
