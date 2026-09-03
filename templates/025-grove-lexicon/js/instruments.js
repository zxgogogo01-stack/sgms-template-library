"use strict";

(function () {
  function lines(value) {
    return value.split(/\r?\n/).map(function (item) { return item.trim(); }).filter(Boolean);
  }

  function terms(value) {
    return value.split(/[\s,，、;；\n]+/).map(function (item) { return item.trim(); }).filter(Boolean);
  }

  function normalize(value) {
    return value.normalize("NFKC").trim().toLocaleLowerCase().replace(/[\s_-]+/g, " ");
  }

  function concordance(data) {
    var term = data.get("term").trim();
    var corpus = data.get("corpus").trim();
    if (!term || !corpus) throw new Error("请同时填写检索词与语料。");
    var haystack = corpus.toLocaleLowerCase();
    var needle = term.toLocaleLowerCase();
    var indexes = [];
    var start = 0;
    while (start < haystack.length && indexes.length < 200) {
      var found = haystack.indexOf(needle, start);
      if (found < 0) break;
      indexes.push(found);
      start = found + Math.max(needle.length, 1);
    }
    var contexts = indexes.slice(0, 8).map(function (index, i) {
      var left = Math.max(0, index - 28);
      var right = Math.min(corpus.length, index + term.length + 28);
      return String(i + 1).padStart(2, "0") + " · " + corpus.slice(left, right).replace(/\s+/g, " ");
    });
    return ["命中次数：" + indexes.length, "语料字符：" + corpus.length, "", "语境切片：", contexts.length ? contexts.join("\n") : "未发现匹配语境。"].join("\n");
  }

  function rhythm(data) {
    var text = data.get("text").trim();
    var threshold = Number(data.get("threshold"));
    if (!text) throw new Error("请先粘贴需要分析的文字。");
    if (!Number.isFinite(threshold) || threshold < 2 || threshold > 30) throw new Error("长词阈值需在 2 到 30 之间。");
    var units = text.match(/[\p{Script=Han}]|[\p{L}\p{N}]+/gu) || [];
    var lengths = units.map(function (item) { return item.length; });
    var total = lengths.reduce(function (sum, item) { return sum + item; }, 0);
    var long = units.filter(function (item) { return item.length >= threshold; });
    var buckets = { short: 0, medium: 0, long: 0 };
    lengths.forEach(function (size) { if (size <= 2) buckets.short += 1; else if (size < threshold) buckets.medium += 1; else buckets.long += 1; });
    return ["分析单元：" + units.length, "平均长度：" + (units.length ? (total / units.length).toFixed(2) : "0.00"), "短 / 中 / 长：" + buckets.short + " / " + buckets.medium + " / " + buckets.long, "", "达到阈值的形式：", long.length ? Array.from(new Set(long)).slice(0, 40).join(" · ") : "无"].join("\n");
  }

  function overlap(data) {
    var a = new Set(terms(data.get("setA")).map(normalize));
    var b = new Set(terms(data.get("setB")).map(normalize));
    if (!a.size || !b.size) throw new Error("两个术语集合都需要至少一项。");
    var shared = Array.from(a).filter(function (item) { return b.has(item); });
    var onlyA = Array.from(a).filter(function (item) { return !b.has(item); });
    var onlyB = Array.from(b).filter(function (item) { return !a.has(item); });
    var union = new Set(Array.from(a).concat(Array.from(b)));
    var ratio = union.size ? shared.length / union.size : 0;
    return ["集合 A：" + a.size, "集合 B：" + b.size, "交集：" + shared.length, "Jaccard：" + (ratio * 100).toFixed(1) + "%", "", "共同项：" + (shared.join(" · ") || "无"), "仅 A：" + (onlyA.join(" · ") || "无"), "仅 B：" + (onlyB.join(" · ") || "无")].join("\n");
  }

  function variants(data) {
    var source = lines(data.get("variants"));
    var mode = data.get("mode");
    if (!source.length) throw new Error("请逐行输入至少一个词形。");
    var map = new Map();
    source.forEach(function (item) {
      var key = mode === "strict" ? item.normalize("NFKC").trim() : normalize(item);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(item);
    });
    var collisions = Array.from(map.values()).filter(function (group) { return group.length > 1; });
    var groups = Array.from(map.entries()).map(function (pair) { return pair[0] + " ← " + pair[1].join(" | "); });
    return ["原始形式：" + source.length, "归一结果：" + map.size, "合并组：" + collisions.length, "", groups.join("\n")].join("\n");
  }

  function cards(data) {
    var source = lines(data.get("cards"));
    if (!source.length) throw new Error("请逐行输入词条与释义。");
    var invalid = [];
    var parsed = [];
    source.forEach(function (line, index) {
      var split = line.search(/[:：]/);
      if (split <= 0 || split === line.length - 1) invalid.push(index + 1);
      else parsed.push({ term: line.slice(0, split).trim(), definition: line.slice(split + 1).trim() });
    });
    if (invalid.length) throw new Error("这些行缺少完整的“词条：释义”结构：" + invalid.join("、"));
    parsed.sort(function (a, b) { return a.term.localeCompare(b.term, undefined, { numeric: true, sensitivity: "base" }); });
    if (data.get("order") === "za") parsed.reverse();
    return ["词条卡：" + parsed.length, "", parsed.map(function (item, i) { return String(i + 1).padStart(2, "0") + "  " + item.term + "\n    " + item.definition; }).join("\n\n")].join("\n");
  }

  var calculators = { concordance: concordance, rhythm: rhythm, overlap: overlap, variants: variants, cards: cards };

  document.querySelectorAll("[data-instrument]").forEach(function (form) {
    var output = form.parentElement.querySelector("[data-output]");
    var error = form.querySelector("[data-error]");
    var copy = form.parentElement.querySelector("[data-copy-output]");
    var copyStatus = form.parentElement.querySelector("[data-copy-status]");
    var initial = output.textContent;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      error.textContent = "";
      try {
        output.textContent = calculators[form.getAttribute("data-instrument")](new FormData(form));
      } catch (problem) {
        error.textContent = problem.message;
        output.textContent = initial;
      }
    });
    form.addEventListener("reset", function () {
      window.setTimeout(function () { error.textContent = ""; output.textContent = initial; copyStatus.textContent = ""; }, 0);
    });
    copy.addEventListener("click", function () {
      var value = output.textContent.trim();
      if (!value || value === initial.trim()) { copyStatus.textContent = "暂无可复制结果"; return; }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(function () { copyStatus.textContent = "结果已复制"; }).catch(function () { copyStatus.textContent = "复制失败，请手动选择"; });
      } else {
        var area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
        copyStatus.textContent = "结果已复制";
      }
    });
  });
})();
