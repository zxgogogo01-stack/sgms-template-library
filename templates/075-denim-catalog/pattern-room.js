(function () {
  "use strict";

  var root = document.documentElement;
  var themeButton = document.querySelector("[data-dc75-theme-toggle]");
  var themeKey = "dc75-theme";

  function storedTheme() {
    try {
      var value = window.localStorage.getItem(themeKey);
      return value === "paper" ? "paper" : "indigo";
    } catch (error) {
      return "indigo";
    }
  }

  function applyTheme(value, remember) {
    var next = value === "paper" ? "paper" : "indigo";
    root.setAttribute("data-dc75-theme", next);
    if (themeButton) {
      themeButton.setAttribute("aria-pressed", next === "paper" ? "true" : "false");
      themeButton.lastChild.nodeValue = next === "paper" ? "深色丹宁" : "浅色纸样";
    }
    if (remember) {
      try { window.localStorage.setItem(themeKey, next); } catch (error) { /* storage is optional */ }
    }
  }

  applyTheme(storedTheme(), false);
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      applyTheme(root.getAttribute("data-dc75-theme") === "paper" ? "indigo" : "paper", true);
    });
  }

  var menu = document.querySelector(".dc75-menu");
  if (menu) {
    var menuSummary = menu.querySelector("summary");
    if (menuSummary) {
      menuSummary.addEventListener("click", function () {
        window.setTimeout(function () {
          if (menu.open && window.matchMedia("(max-width: 720px)").matches) {
            var firstLink = menu.querySelector("nav a");
            if (firstLink) firstLink.focus();
          }
        }, 60);
      });
    }
    menu.addEventListener("toggle", function () {
      if (menu.open && window.matchMedia("(max-width: 720px)").matches) {
        window.setTimeout(function () {
          var firstLink = menu.querySelector("nav a");
          if (firstLink) firstLink.focus();
        }, 0);
      }
    });
    menu.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.open) {
        menu.open = false;
        var summary = menu.querySelector("summary");
        if (summary) summary.focus();
      }
    });
  }

  var progress = document.querySelector("[data-dc75-progress]");
  if (progress) {
    var updateProgress = function () {
      var distance = document.documentElement.scrollHeight - window.innerHeight;
      var percentage = distance > 0 ? Math.min(100, Math.max(0, window.scrollY / distance * 100)) : 100;
      progress.style.width = percentage.toFixed(2) + "%";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  function copyText(text, status, successMessage) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      status.textContent = "当前浏览器不支持自动复制，请手动选择文字。";
      return;
    }
    navigator.clipboard.writeText(text).then(function () {
      status.textContent = successMessage;
    }).catch(function () {
      status.textContent = "复制未完成，请允许剪贴板权限后重试。";
    });
  }

  var briefButton = document.querySelector("[data-dc75-copy-brief]");
  if (briefButton) {
    briefButton.addEventListener("click", function () {
      var status = document.querySelector("[data-dc75-copy-status]");
      copyText("编辑交接清单\n1. 复核直接来源是否仍有效\n2. 确认核对日期和适用范围\n3. 把无法直接支持的句子标为推断\n4. 记录本次修改与下一次复查条件", status, "交接清单已复制。" );
    });
  }

  var disclosureButton = document.querySelector("[data-dc75-copy-disclosure]");
  if (disclosureButton) {
    disclosureButton.addEventListener("click", function () {
      var text = document.querySelector("[data-dc75-disclosure-text]");
      var status = document.querySelector("[data-dc75-disclosure-status]");
      copyText(text ? text.textContent.trim() : "", status, "简短披露已复制。" );
    });
  }

  var ratioForm = document.querySelector("[data-dc75-ratio-form]");
  if (ratioForm) {
    var ratioInput = document.getElementById("dc75-ratios");
    var ratioError = document.querySelector("[data-dc75-ratio-error]");
    var ratioStatus = document.querySelector("[data-dc75-ratio-status]");
    var ratioReport = document.querySelector(".dc75-ratio-report");
    var ratioState = document.querySelector("[data-dc75-ratio-state]");
    var itemCount = document.querySelector("[data-dc75-item-count]");
    var weightTotal = document.querySelector("[data-dc75-weight-total]");
    var gridPreview = document.querySelector("[data-dc75-grid-preview]");
    var ratioList = document.querySelector("[data-dc75-ratio-list]");
    var ratioNote = document.querySelector("[data-dc75-ratio-note]");
    var copyReportButton = document.querySelector("[data-dc75-copy-report]");
    var reportCopyStatus = document.querySelector("[data-dc75-report-copy-status]");
    var lastReport = [];

    var presets = {
      balanced: "深度方法 | 4\n案例拆解 | 4\n快速答疑 | 4\n更新记录 | 4",
      hero: "重点专题 | 8\n方法指南 | 4\n案例拆解 | 3\n常见问题 | 1",
      many: "观察 | 6\n数据 | 5\n方法 | 5\n案例 | 4\n人物 | 3\n工具 | 3\n问答 | 2\n更新 | 2"
    };

    function lengthOf(value) { return Array.from(value).length; }

    function invalidateReport() {
      if (ratioReport.getAttribute("data-ready") === "true") {
        ratioReport.setAttribute("data-ready", "stale");
        ratioState.textContent = "RE-MARK";
        ratioStatus.textContent = "输入已经变化，请重新裁版。";
        copyReportButton.disabled = true;
      }
      ratioInput.removeAttribute("aria-invalid");
      ratioError.textContent = "";
      reportCopyStatus.textContent = "";
    }

    function fail(message) {
      ratioInput.setAttribute("aria-invalid", "true");
      ratioError.textContent = message;
      ratioStatus.textContent = "尚未生成配比。";
      ratioInput.focus();
      return null;
    }

    function parseRatios() {
      var raw = ratioInput.value;
      if (lengthOf(raw) > 1000) return fail("总输入不能超过 1,000 个 Unicode 字符。");
      var normalized = raw.normalize("NFKC");
      var lines = normalized.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
      if (!lines.length) return fail("请先输入至少两个栏目。空白行会自动忽略。");
      if (lines.length < 2) return fail("至少需要两个栏目才能计算配比。");
      if (lines.length > 12) return fail("最多处理 12 个非空栏目。");
      var seen = new Set();
      var items = [];
      for (var index = 0; index < lines.length; index += 1) {
        var parts = lines[index].split("|");
        if (parts.length !== 2) return fail("第 " + (index + 1) + " 行必须且只能有一个竖线：栏目名 | 权重。");
        var title = parts[0].trim();
        var weightText = parts[1].trim();
        if (!title) return fail("第 " + (index + 1) + " 行缺少栏目名。");
        if (lengthOf(title) > 80) return fail("第 " + (index + 1) + " 行栏目名不能超过 80 个 Unicode 字符。");
        var key = title.toLocaleLowerCase();
        if (seen.has(key)) return fail("栏目名不能重复：" + title + "。");
        if (!/^(?:[1-9]\d{0,2}|1000)$/.test(weightText)) return fail("第 " + (index + 1) + " 行权重须为 1–1000 的普通十进制整数。");
        seen.add(key);
        items.push({ title: title, weight: Number(weightText), index: index });
      }
      var total = items.reduce(function (sum, item) { return sum + item.weight; }, 0);
      if (total > 10000) return fail("权重合计不能超过 10,000。");
      return { items: items, total: total };
    }

    function allocate(items, total) {
      var assigned = 0;
      items.forEach(function (item) {
        var exact = item.weight / total * 24;
        item.cells = Math.floor(exact);
        item.remainder = exact - item.cells;
        item.percentage = item.weight / total * 100;
        assigned += item.cells;
      });
      items.slice().sort(function (left, right) {
        return right.remainder - left.remainder || left.index - right.index;
      }).slice(0, 24 - assigned).forEach(function (item) { item.cells += 1; });
      return items;
    }

    function render(result) {
      var items = allocate(result.items, result.total);
      ratioList.replaceChildren();
      gridPreview.replaceChildren();
      items.forEach(function (item, itemIndex) {
        var row = document.createElement("li");
        var title = document.createElement("b");
        var weight = document.createElement("span");
        var share = document.createElement("strong");
        title.textContent = item.title;
        weight.textContent = "权重 " + item.weight + " · " + item.percentage.toFixed(1) + "%";
        share.textContent = item.cells + " 格";
        row.append(title, weight, share);
        ratioList.appendChild(row);
        for (var cellIndex = 0; cellIndex < item.cells; cellIndex += 1) {
          var cell = document.createElement("i");
          cell.style.setProperty("--dc75-tone", String(itemIndex % 5));
          cell.setAttribute("aria-hidden", "true");
          gridPreview.appendChild(cell);
        }
      });
      itemCount.textContent = String(items.length);
      weightTotal.textContent = String(result.total);
      ratioReport.setAttribute("data-ready", "true");
      ratioState.textContent = "CUT READY";
      ratioNote.textContent = "24 格已完整分配；相同余数按输入顺序补格。";
      ratioStatus.textContent = "已为 " + items.length + " 个栏目分配 24 个版面格。";
      ratioInput.removeAttribute("aria-invalid");
      ratioError.textContent = "";
      copyReportButton.disabled = false;
      lastReport = items.map(function (item) {
        return item.title + "｜权重 " + item.weight + "｜" + item.percentage.toFixed(1) + "%｜" + item.cells + " 格";
      });
    }

    ratioForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var result = parseRatios();
      if (result) render(result);
    });

    ratioInput.addEventListener("input", invalidateReport);

    document.querySelectorAll("[data-dc75-preset]").forEach(function (button) {
      button.addEventListener("click", function () {
        ratioInput.value = presets[button.getAttribute("data-dc75-preset")];
        invalidateReport();
        ratioInput.focus();
      });
    });

    ratioForm.addEventListener("reset", function () {
      window.setTimeout(function () {
        ratioReport.setAttribute("data-ready", "false");
        ratioState.textContent = "UNMARKED";
        itemCount.textContent = "0";
        weightTotal.textContent = "0";
        gridPreview.replaceChildren();
        ratioList.replaceChildren(document.createElement("li"));
        ratioList.firstElementChild.textContent = "计算后显示每个栏目的占比、权重和格数。";
        ratioNote.textContent = "权重代表相对优先级，不代表访问量预测。";
        ratioStatus.textContent = "工作台已清空。";
        ratioError.textContent = "";
        reportCopyStatus.textContent = "";
        ratioInput.removeAttribute("aria-invalid");
        copyReportButton.disabled = true;
        lastReport = [];
        ratioInput.focus();
      }, 0);
    });

    copyReportButton.addEventListener("click", function () {
      if (!lastReport.length || ratioReport.getAttribute("data-ready") !== "true") return;
      copyText("栏目权重配比｜24 格\n" + lastReport.join("\n") + "\n说明：权重是相对优先级，不是访问量预测。", reportCopyStatus, "配比结果已复制。" );
    });
  }

  var searchForm = document.querySelector("[data-dc75-search]");
  if (searchForm) {
    var searchInput = document.getElementById("dc75-query");
    var searchResult = document.querySelector("[data-dc75-search-result]");
    var destinations = [
      { words: ["方法", "来源", "日期", "文章", "工艺"], url: "article.html", label: "工艺单" },
      { words: ["配比", "权重", "裁片", "工具", "栏目"], url: "tool.html", label: "配比尺" },
      { words: ["披露", "条款", "隐私", "联系", "说明", "更正"], url: "legal.html", label: "布边说明" },
      { words: ["首页", "目录", "裁版", "记录"], url: "index.html", label: "裁版台" }
    ];

    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var query = searchInput.value.normalize("NFKC").trim();
      searchResult.replaceChildren();
      if (!query) {
        searchResult.textContent = "请输入一个主题，例如“方法”或“配比”。";
        searchInput.focus();
        return;
      }
      if (Array.from(query).length > 80) {
        searchResult.textContent = "查询不能超过 80 个 Unicode 字符。";
        searchInput.focus();
        return;
      }
      var hit = destinations.find(function (destination) {
        return destination.words.some(function (word) { return query.toLocaleLowerCase().includes(word); });
      });
      if (!hit) {
        searchResult.textContent = "本地目录没有匹配项。请换一个更短的主题，或返回裁版台。";
        return;
      }
      searchResult.append("找到最近的工作区：");
      var link = document.createElement("a");
      link.href = hit.url;
      link.textContent = hit.label;
      searchResult.appendChild(link);
    });

    searchInput.addEventListener("input", function () {
      searchResult.textContent = "查询已变化，提交后重新检索本地目录。";
    });
  }
})();
