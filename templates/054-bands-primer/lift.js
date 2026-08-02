/* 054 behaviors: nav fold, invite copy, net-fee tool */
(function () {
  "use strict";

  var btn = document.getElementById("cap-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      var nav = document.getElementById("cap-nav");
      if (!nav) return;
      var open = nav.classList.toggle("wide");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var cp = document.getElementById("bp-copy");
  if (cp) {
    cp.addEventListener("click", function () {
      var code = document.getElementById("bp-code");
      if (!code) return;
      var text = code.textContent.trim();
      var done = function () {
        cp.textContent = "已复制";
        setTimeout(function () { cp.textContent = "复制"; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { grab(code, done); });
      } else {
        grab(code, done);
      }
    });
  }

  function grab(node, then) {
    var range = document.createRange();
    range.selectNodeContents(node);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try {
      document.execCommand("copy");
      then();
    } catch (e) {
      /* selection kept */
    }
  }

  var run = document.getElementById("nf-run");
  var netForm = document.getElementById("nf-form");
  if (run && netForm) {
    var volumeInput = document.getElementById("nf-vol");
    var rateInput = document.getElementById("nf-rate");
    var offInput = document.getElementById("nf-off");
    var netInputs = [volumeInput, rateInput, offInput];
    netInputs.forEach(function (input) {
      input.addEventListener("input", function () { input.removeAttribute("aria-invalid"); });
    });
    netForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var vol = parseFloat(volumeInput.value);
      var rate = parseFloat(rateInput.value);
      var off = parseFloat(offInput.value);
      var out = document.getElementById("nf-out");
      netInputs.forEach(function (input) { input.removeAttribute("aria-invalid"); });
      var invalidVolume = isNaN(vol) || vol < 0;
      var invalidRate = isNaN(rate) || rate < 0 || rate > 100;
      var invalidOff = isNaN(off) || off < 0 || off > 100;
      if (invalidVolume || invalidRate || invalidOff) {
        if (invalidVolume) volumeInput.setAttribute("aria-invalid", "true");
        if (invalidRate) rateInput.setAttribute("aria-invalid", "true");
        if (invalidOff) offInput.setAttribute("aria-invalid", "true");
        out.textContent = "请补全三项；金额不能为负，费率与减免比例须在 0—100% 之间。";
        (invalidVolume ? volumeInput : invalidRate ? rateInput : offInput).focus();
        return;
      }
      var full = vol * rate / 100;
      var net = full * (1 - off / 100);
      out.textContent = "名义手续费约 " + full.toFixed(4) + "，减免 " + off + "% 后约 " + net.toFixed(4) + "。演示口径，实际以平台结算为准。";
    });
  }
})();
