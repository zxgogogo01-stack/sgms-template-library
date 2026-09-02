(function () {
  "use strict";

  function number(form, name) {
    var input = form.elements.namedItem(name);
    var value = input ? Number(input.value) : NaN;
    return { input: input, value: value };
  }

  function fail(form, output, message, field) {
    var old = form.querySelector(".tool-form__error");
    if (old) old.remove();
    if (field) field.setAttribute("aria-invalid", "true");
    var error = document.createElement("p");
    error.className = "tool-form__error";
    error.textContent = message;
    form.appendChild(error);
    output.setAttribute("data-state", "error");
    output.querySelector("strong").textContent = message;
    output.focus();
    if (field) field.focus();
  }

  function success(form, output, message, detail) {
    var old = form.querySelector(".tool-form__error");
    if (old) old.remove();
    var fields = form.querySelectorAll("input");
    for (var index = 0; index < fields.length; index += 1) fields[index].removeAttribute("aria-invalid");
    output.setAttribute("data-state", "success");
    output.querySelector("span").textContent = "计算完成";
    output.querySelector("strong").textContent = message;
    output.querySelector("small").textContent = detail;
    output.focus();
  }

  function calculate(form, output) {
    var kind = form.getAttribute("data-tool");
    if (kind === "fee") {
      var amount = number(form, "amount");
      var rate = number(form, "rate");
      if (!Number.isFinite(amount.value) || amount.value <= 0) return fail(form, output, "请输入大于 0 的交易金额。", amount.input);
      if (!Number.isFinite(rate.value) || rate.value < 0 || rate.value > 100) return fail(form, output, "费率应在 0% 到 100% 之间。", rate.input);
      var fee = amount.value * rate.value / 100;
      return success(form, output, "估算费用：" + fee.toFixed(8), amount.value + " × " + rate.value + "% = " + fee.toFixed(8));
    }

    if (kind === "risk") {
      var capital = number(form, "capital");
      var risk = number(form, "risk");
      var stop = number(form, "stop");
      if (!Number.isFinite(capital.value) || capital.value <= 0) return fail(form, output, "账户规模必须大于 0。", capital.input);
      if (!Number.isFinite(risk.value) || risk.value <= 0 || risk.value > 100) return fail(form, output, "风险比例应大于 0% 且不超过 100%。", risk.input);
      if (!Number.isFinite(stop.value) || stop.value <= 0 || stop.value > 100) return fail(form, output, "退出距离应大于 0% 且不超过 100%。", stop.input);
      var budget = capital.value * risk.value / 100;
      var position = budget / (stop.value / 100);
      return success(form, output, "风险预算 " + budget.toFixed(2) + " · 理论仓位 " + position.toFixed(2), "未计入滑点、跳空、费用和相关敞口。相同风险下，退出距离越大，理论仓位越小。");
    }

    if (kind === "recurring") {
      var total = number(form, "budget");
      var periods = number(form, "periods");
      if (!Number.isFinite(total.value) || total.value <= 0) return fail(form, output, "总预算必须大于 0。", total.input);
      if (!Number.isInteger(periods.value) || periods.value < 1 || periods.value > 365) return fail(form, output, "执行次数必须是 1 到 365 之间的整数。", periods.input);
      var each = total.value / periods.value;
      return success(form, output, "每次分配：" + each.toFixed(2), "总预算 " + total.value.toFixed(2) + " ÷ " + periods.value + " 次。实际执行前仍需核对最低金额与费用。");
    }

    if (kind === "transfer") {
      var send = number(form, "send");
      var networkFee = number(form, "networkFee");
      if (!Number.isFinite(send.value) || send.value <= 0) return fail(form, output, "发送数量必须大于 0。", send.input);
      if (!Number.isFinite(networkFee.value) || networkFee.value < 0) return fail(form, output, "网络费用不能为负数。", networkFee.input);
      if (networkFee.value >= send.value) return fail(form, output, "网络费用必须小于发送数量。", networkFee.input);
      var net = send.value - networkFee.value;
      var burden = networkFee.value / send.value * 100;
      return success(form, output, "估算净额 " + net.toFixed(8) + " · 费用占比 " + burden.toFixed(4) + "%", "这是输入值的静态差额，不代表实际到账时间或最终费用。");
    }

    if (kind === "breakeven") {
      var entry = number(form, "entry");
      var exit = number(form, "exit");
      var buyFee = number(form, "buyFee");
      var sellFee = number(form, "sellFee");
      if (!Number.isFinite(entry.value) || entry.value <= 0) return fail(form, output, "买入参考价必须大于 0。", entry.input);
      if (!Number.isFinite(exit.value) || exit.value <= 0) return fail(form, output, "卖出参考价必须大于 0。", exit.input);
      if (!Number.isFinite(buyFee.value) || buyFee.value < 0 || buyFee.value > 100) return fail(form, output, "买入费率应在 0% 到 100% 之间。", buyFee.input);
      if (!Number.isFinite(sellFee.value) || sellFee.value < 0 || sellFee.value > 100) return fail(form, output, "卖出费率应在 0% 到 100% 之间。", sellFee.input);
      var cost = entry.value * (1 + buyFee.value / 100);
      var proceeds = exit.value * (1 - sellFee.value / 100);
      var change = (proceeds - cost) / cost * 100;
      return success(form, output, "估算净变化：" + (change >= 0 ? "+" : "") + change.toFixed(4) + "%", "以 1 个单位计算：成本 " + cost.toFixed(8) + "，扣除卖出费后的所得 " + proceeds.toFixed(8) + "。");
    }
  }

  var forms = document.querySelectorAll("[data-tool]");
  for (var formIndex = 0; formIndex < forms.length; formIndex += 1) {
    (function (form) {
      var output = form.parentElement.querySelector(".tool-output");
      var copy = form.querySelector("[data-copy-output]");
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        calculate(form, output);
      });
      form.addEventListener("reset", function () {
        window.setTimeout(function () {
          var old = form.querySelector(".tool-form__error");
          if (old) old.remove();
          var fields = form.querySelectorAll("input");
          for (var index = 0; index < fields.length; index += 1) fields[index].removeAttribute("aria-invalid");
          output.removeAttribute("data-state");
          output.querySelector("span").textContent = "等待输入";
          output.querySelector("strong").textContent = "完成字段后运行计算。";
          output.querySelector("small").textContent = "工具不会保存或发送你的输入。";
        }, 0);
      });
      copy.addEventListener("click", function () {
        var value = output.querySelector("strong").textContent + " " + output.querySelector("small").textContent;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(value).then(function () {
            copy.textContent = "已复制";
            window.setTimeout(function () { copy.textContent = "复制结果"; }, 1800);
          });
        } else {
          output.focus();
        }
      });
    }(forms[formIndex]));
  }
}());
