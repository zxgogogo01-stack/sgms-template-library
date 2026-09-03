(function () {
  "use strict";
  var deck = document.querySelector("[data-tool]");
  if (!deck) return;
  var form = document.getElementById("tool-form");
  var input = document.getElementById("tool-input");
  var secondary = document.getElementById("tool-secondary");
  var result = document.getElementById("tool-result");
  var output = document.getElementById("tool-output");
  var error = document.getElementById("tool-error");
  var status = document.getElementById("tool-status");
  var copyButton = document.getElementById("tool-copy");
  function clearState() {
    input.removeAttribute("aria-invalid");
    error.textContent = "";
    status.textContent = "";
    result.hidden = true;
    output.value = "";
  }
  function lines(value) {
    return value.replace(/\r\n?/g, "\n").split("\n");
  }
  function width(value, mode) {
    var out = "";
    for (var i = 0; i < value.length; i += 1) {
      var code = value.charCodeAt(i);
      if (mode === "full") {
        if (code === 32) code = 0x3000;
        else if (code >= 0x21 && code <= 0x7e) code += 0xfee0;
      } else {
        if (code === 0x3000) code = 32;
        else if (code >= 0xff01 && code <= 0xff5e) code -= 0xfee0;
      }
      out += String.fromCharCode(code);
    }
    return out;
  }
  function anchorize(value, prefix) {
    var seen = {};
    return lines(value)
      .filter(function (line) {
        return line.trim();
      })
      .map(function (line) {
        var slug =
          line
            .trim()
            .toLocaleLowerCase()
            .normalize("NFKD")
            .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
            .replace(/^-|-$/g, "") || "clause";
        var base =
          (prefix
            ? prefix.replace(/[^a-z0-9-]/gi, "").toLocaleLowerCase() + "-"
            : "") + slug;
        seen[base] = (seen[base] || 0) + 1;
        return "#" + base + (seen[base] > 1 ? "-" + seen[base] : "");
      })
      .join("\n");
  }
  function force(value, ignore) {
    var flags = ignore ? "gi" : "g";
    function count(word) {
      return (value.match(new RegExp("\\b" + word + "\\b", flags)) || [])
        .length;
    }
    return [
      "MUST: " + count("MUST"),
      "SHOULD: " + count("SHOULD"),
      "MAY: " + count("MAY"),
      "TOTAL: " + (count("MUST") + count("SHOULD") + count("MAY")),
    ].join("\n");
  }
  function diff(before, after) {
    var a = lines(before).filter(Boolean),
      b = lines(after).filter(Boolean),
      aset = new Set(a),
      bset = new Set(b),
      added = b.filter(function (x) {
        return !aset.has(x);
      }),
      removed = a.filter(function (x) {
        return !bset.has(x);
      }),
      kept = b.filter(function (x) {
        return aset.has(x);
      });
    return ["ADDED " + added.length]
      .concat(
        added.map(function (x) {
          return "+ " + x;
        }),
        ["", "REMOVED " + removed.length],
        removed.map(function (x) {
          return "- " + x;
        }),
        ["", "KEPT " + kept.length],
        kept.map(function (x) {
          return "= " + x;
        }),
      )
      .join("\n");
  }
  function evidence(value, separator) {
    var sep = separator || "|",
      rows = lines(value).filter(function (x) {
        return x.trim();
      });
    var invalid = [];
    rows.forEach(function (row, i) {
      var cells = row.split(sep).map(function (x) {
        return x.trim();
      });
      if (
        cells.length !== 3 ||
        cells.some(function (x) {
          return !x;
        })
      )
        invalid.push(i + 1);
    });
    return [
      "ROWS: " + rows.length,
      "COMPLETE: " + (rows.length - invalid.length),
      "NEEDS REVIEW: " + invalid.length,
      invalid.length ? "LINES: " + invalid.join(", ") : "LINES: none",
    ].join("\n");
  }
  function calculate() {
    var raw = input.value;
    if (!raw.trim()) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = "请先输入需要处理的文字。";
      result.hidden = true;
      input.focus();
      return;
    }
    if (raw.length >= 16000) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = "输入已达到 16,000 字符边界，请缩短后再试。";
      result.hidden = true;
      input.focus();
      return;
    }
    var type = deck.dataset.tool;
    var value = "";
    if (type === "width") {
      var mode = (secondary.value || "half").trim().toLocaleLowerCase();
      if (mode !== "half" && mode !== "full") {
        error.textContent = "转换方向只能填写 half 或 full。";
        secondary.focus();
        result.hidden = true;
        return;
      }
      value = width(raw, mode);
    } else if (type === "anchor")
      value = anchorize(raw, (secondary.value || "").trim());
    else if (type === "force") value = force(raw, secondary.checked);
    else if (type === "diff") {
      if (!secondary.value.trim()) {
        error.textContent = "请补充新版本文字。";
        secondary.focus();
        result.hidden = true;
        return;
      }
      value = diff(raw, secondary.value);
    } else value = evidence(raw, (secondary.value || "|").trim());
    input.removeAttribute("aria-invalid");
    error.textContent = "";
    status.textContent = "";
    output.value = value;
    result.hidden = false;
    output.focus();
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    calculate();
  });
  form.addEventListener("reset", function () {
    setTimeout(function () {
      clearState();
      input.focus();
    }, 0);
  });
  input.addEventListener("input", clearState);
  if (secondary) {
    secondary.addEventListener("input", clearState);
    secondary.addEventListener("change", clearState);
  }
  copyButton.addEventListener("click", function () {
    if (!output.value) return;
    var done = function () {
      status.textContent = "校对结果已复制";
    };
    if (navigator.clipboard && navigator.clipboard.writeText)
      navigator.clipboard
        .writeText(output.value)
        .then(done)
        .catch(function () {
          output.select();
          document.execCommand("copy");
          done();
        });
    else {
      output.select();
      document.execCommand("copy");
      done();
    }
  });
})();
