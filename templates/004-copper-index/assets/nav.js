(function () {
  "use strict";

  var goBtn = document.getElementById("dedupe-go");
  if (!goBtn) return;

  var src = document.getElementById("dedupe-in");
  var dst = document.getElementById("dedupe-out");
  var info = document.getElementById("dedupe-info");
  var clear = document.getElementById("dedupe-clear");
  var trimSlash = document.getElementById("trim-slash");
  var dropHash = document.getElementById("drop-hash");

  var normalize = function (raw) {
    var value = raw.trim();
    if (!value) return null;
    try {
      var url = new URL(value);
      if (url.protocol !== "http:" && url.protocol !== "https:") return null;
      url.hostname = url.hostname.toLowerCase();
      if (dropHash.checked) url.hash = "";
      if (trimSlash.checked && url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
      if (trimSlash.checked && url.pathname === "/" && !url.search) url.pathname = "";
      return url.toString();
    } catch (error) {
      return null;
    }
  };

  goBtn.addEventListener("click", function () {
    var lines = src.value.split(/\r?\n/).filter(function (line) { return line.trim(); });
    if (!lines.length) {
      dst.value = "";
      info.className = "dedupe__meta is-error";
      info.textContent = "还没有可整理的内容，请先粘贴至少一个链接。";
      src.setAttribute("aria-invalid", "true");
      src.focus();
      return;
    }

    src.removeAttribute("aria-invalid");
    var seen = Object.create(null);
    var kept = [];
    var invalid = 0;
    var repeated = 0;
    lines.forEach(function (line) {
      var value = normalize(line);
      if (!value) { invalid += 1; return; }
      if (seen[value]) { repeated += 1; return; }
      seen[value] = true;
      kept.push(value);
    });
    dst.value = kept.join("\n");
    info.className = kept.length ? "dedupe__meta is-success" : "dedupe__meta is-error";
    info.innerHTML = "<strong>保留 " + kept.length + " 条</strong><span>原始 " + lines.length + " · 重复 " + repeated + " · 无效 " + invalid + "</span>";
  });

  clear.addEventListener("click", function () {
    src.value = "";
    dst.value = "";
    info.className = "dedupe__meta";
    info.textContent = "等待输入链接。";
    src.removeAttribute("aria-invalid");
    src.focus();
  });
})();
