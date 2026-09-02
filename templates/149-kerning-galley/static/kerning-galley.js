(function () {
  "use strict";

  const root = document.documentElement;
  const modeButton = document.querySelector("[data-is149-mode-toggle]");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const storageKey = "is149-kerning-mode";

  function setMode(mode, persist) {
    const next = mode === "ultraviolet" ? "ultraviolet" : "stock";
    root.dataset.is149Mode = next;
    if (modeButton) {
      modeButton.textContent = next === "stock" ? "打开紫外灯" : "关闭紫外灯";
      modeButton.setAttribute("aria-pressed", next === "stock" ? "true" : "false");
    }
    if (themeMeta) themeMeta.content = next === "stock" ? "#ede8dc" : "#17131f";
    if (persist) {
      try { localStorage.setItem(storageKey, next); } catch (_) { /* local-only preference */ }
    }
  }

  try { setMode(localStorage.getItem(storageKey) || root.dataset.is149Mode, false); }
  catch (_) { setMode(root.dataset.is149Mode, false); }
  if (modeButton) modeButton.addEventListener("click", function () {
    setMode(root.dataset.is149Mode === "stock" ? "ultraviolet" : "stock", true);
  });

  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }

  function bindCopy(buttonSelector, text, success) {
    const button = document.querySelector(buttonSelector);
    if (!button) return;
    const output = document.querySelector("[data-is149-copy-status]");
    button.addEventListener("click", async function () {
      try {
        await copyText(text);
        if (output) output.textContent = success;
      } catch (_) {
        if (output) output.textContent = "复制失败，请手动选择文字。";
      }
    });
  }

  const codeButton = document.querySelector("[data-is149-copy-code]");
  if (codeButton) {
    codeButton.addEventListener("click", async function () {
      const output = document.querySelector("[data-is149-copy-status]");
      const code = codeButton.parentElement.querySelector("strong").textContent.trim();
      try { await copyText(code); output.textContent = "校样编号已复制。"; }
      catch (_) { output.textContent = "复制失败，请手动选择编号。"; }
    });
  }

  bindCopy("[data-is149-copy-notes]", "字距校样五记：先看字形轮廓；按标题、正文、数字记录语境；正负整数只是内部决定；反向字偶分别留档；交接时回到真实字体与输出环境复核。", "五记摘要已复制。");
  bindCopy("[data-is149-copy-policy]", "字距校样边界：页面不读取或修改字体文件，不判断语言、可读性、无障碍、输出一致性、授权或发布许可；真实结论由责任人在目标环境复核。", "使用边界已复制。");

  const progress = document.querySelector(".is149-progress");
  if (progress) {
    const updateProgress = function () {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.value = Math.min(100, Math.round(window.scrollY / max * 100));
    };
    updateProgress();
    addEventListener("scroll", updateProgress, { passive: true });
    addEventListener("resize", updateProgress);
  }

  const slips = Array.from(document.querySelectorAll(".is149-slip-list details"));
  slips.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      slips.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });

  const form = document.querySelector("[data-is149-form]");
  if (form) {
    const pairInput = form.querySelector("[data-is149-pairs]");
    const limitInput = form.querySelector("[data-is149-limit]");
    const error = form.querySelector("[data-is149-error]");
    const formStatus = form.querySelector("[data-is149-form-status]");
    const report = document.querySelector(".is149-report");
    const reportState = report.querySelector("[data-is149-report-state]");
    const preview = report.querySelector("[data-is149-preview]");
    const findingList = report.querySelector("[data-is149-finding-list]");
    const pairList = report.querySelector("[data-is149-pair-list]");
    const copyButton = report.querySelector("[data-is149-copy-report]");
    const copyStatus = report.querySelector("[data-is149-copy-status]");
    const metric = function (name) { return report.querySelector("[data-is149-" + name + "]"); };
    let fullReport = "";

    const examples = {
      balanced: {
        limit: "100",
        rows: "AV | -40 | 标题 | 定稿\nTo | -25 | 正文 | 定稿\n11 | 10 | 数字 | 定稿\nWa | -15 | 标题 | 定稿"
      },
      reverse: {
        limit: "100",
        rows: "AV | -40 | 标题 | 定稿\nVA | -35 | 标题 | 定稿\nTo | -25 | 正文 | 定稿\n11 | 10 | 数字 | 定稿"
      },
      limit: {
        limit: "100",
        rows: "AV | -100 | 标题 | 定稿\nTo | 101 | 正文 | 定稿\n11 | 0 | 数字 | 定稿\nWa | -15 | 标题 | 定稿"
      },
      review: {
        limit: "100",
        rows: "AV | -130 | 标题 | 草校\nVA | -35 | 标题 | 复核\nTo | -25 | 正文 | 定稿\n11 | 10 | 数字 | 定稿"
      }
    };

    function unicodeLength(value) { return Array.from(value).length; }
    function signed(value) { return value > 0 ? "+" + value : String(value); }
    function clearNode(node) { while (node.firstChild) node.removeChild(node.firstChild); }

    function resetReport(message) {
      report.dataset.ready = "false";
      reportState.textContent = "UNSET";
      metric("count").textContent = "0";
      metric("total").textContent = "0";
      metric("median").textContent = "—";
      metric("max").textContent = "—";
      metric("reverse").textContent = "0";
      metric("threshold").textContent = "—";
      metric("summary").textContent = "等待字偶";
      clearNode(preview);
      const waiting = document.createElement("span");
      waiting.textContent = "等待校样";
      preview.appendChild(waiting);
      clearNode(findingList);
      const item = document.createElement("li");
      item.textContent = "生成报告后显示关系、阈值与状态提示。";
      findingList.appendChild(item);
      clearNode(pairList);
      copyButton.disabled = true;
      copyStatus.textContent = "";
      fullReport = "";
      if (message) formStatus.textContent = message;
    }

    function parseRows(raw) {
      if (unicodeLength(raw) > 8000) throw new Error("全部校样输入最多 8000 个 Unicode 字符。");
      const lines = raw.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
      if (lines.length < 3) throw new Error("请至少输入 3 个字偶。");
      if (lines.length > 80) throw new Error("一次最多整理 80 个字偶。");
      const seen = new Set();
      return lines.map(function (line, index) {
        const parts = line.split("|").map(function (part) { return part.trim(); });
        const lineNo = index + 1;
        if (parts.length !== 4) throw new Error("第 " + lineNo + " 行须包含 4 项，并以 | 分隔。");
        const pair = parts[0].normalize("NFKC");
        const chars = Array.from(pair);
        if (chars.length !== 2) throw new Error("第 " + lineNo + " 行字偶须恰好包含 2 个 Unicode 码点。");
        if (/[\p{Cc}\p{Cf}\s]/u.test(pair)) throw new Error("第 " + lineNo + " 行字偶含空白、控制字符或格式字符。");
        if (seen.has(pair)) throw new Error("第 " + lineNo + " 行字偶规范化后重复：" + pair + "。");
        seen.add(pair);
        if (!/^(?:0|-?[1-9]\d{0,2})$/.test(parts[1])) throw new Error("第 " + lineNo + " 行调整值须为 -200–200 的整数，不接受正号、小数、指数、前导零或 -0。");
        const value = Number(parts[1]);
        if (value < -200 || value > 200) throw new Error("第 " + lineNo + " 行调整值须在 -200–200 之间。");
        if (!["标题", "正文", "数字"].includes(parts[2])) throw new Error("第 " + lineNo + " 行用途只能是“标题”“正文”或“数字”。");
        if (!["草校", "复核", "定稿"].includes(parts[3])) throw new Error("第 " + lineNo + " 行状态只能是“草校”“复核”或“定稿”。");
        return { pair: pair, chars: chars, value: value, purpose: parts[2], status: parts[3], index: index };
      });
    }

    function parseLimit(raw) {
      if (!/^(?:0|[1-9]\d{0,2})$/.test(raw)) throw new Error("绝对值复核线须为 0–200 的整数，不接受正负号、小数、指数或前导零。");
      const value = Number(raw);
      if (value > 200) throw new Error("绝对值复核线须在 0–200 之间。");
      return value;
    }

    function buildReport(rows, limit) {
      const byPair = new Map(rows.map(function (row) { return [row.pair, row]; }));
      const reverseFindings = [];
      rows.forEach(function (row) {
        const reverse = row.chars[1] + row.chars[0];
        const other = byPair.get(reverse);
        if (reverse !== row.pair && other && row.index < other.index) {
          reverseFindings.push("反向关系：" + row.pair + "（" + signed(row.value) + "）与 " + other.pair + "（" + signed(other.value) + "）须分别复核。");
        }
      });
      const extremeFindings = rows.filter(function (row) { return Math.abs(row.value) > limit; }).map(function (row) {
        return "越线字偶：" + row.pair + " 的记录为 " + signed(row.value) + "，绝对值大于复核线 " + limit + "。";
      });
      const statusFindings = rows.filter(function (row) { return row.status !== "定稿"; }).map(function (row) {
        return "状态待办：" + row.pair + " 仍为“" + row.status + "”。";
      });
      const spacingFindings = reverseFindings.concat(extremeFindings);
      const findings = spacingFindings.concat(statusFindings);
      const total = rows.reduce(function (sum, row) { return sum + row.value; }, 0);
      const values = rows.map(function (row) { return row.value; }).sort(function (a, b) { return a - b; });
      const middle = Math.floor(values.length / 2);
      const median = values.length % 2 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
      const maxAbs = Math.max.apply(null, rows.map(function (row) { return Math.abs(row.value); }));
      let state = "PROOF CLEAR";
      if (spacingFindings.length && statusFindings.length) state = "REVIEW " + findings.length;
      else if (spacingFindings.length) state = "SPACING FLAGS " + spacingFindings.length;
      else if (statusFindings.length) state = "STATUS FLAGS " + statusFindings.length;
      return { reverseFindings: reverseFindings, extremeFindings: extremeFindings, statusFindings: statusFindings, findings: findings, total: total, median: median, maxAbs: maxAbs, state: state };
    }

    function render(rows, limit, result) {
      report.dataset.ready = "true";
      reportState.textContent = result.state;
      metric("count").textContent = String(rows.length);
      metric("total").textContent = signed(result.total);
      metric("median").textContent = signed(result.median);
      metric("max").textContent = String(result.maxAbs);
      metric("reverse").textContent = String(result.reverseFindings.length);
      metric("threshold").textContent = String(limit);
      metric("summary").textContent = rows.length + " 个字偶 · " + result.reverseFindings.length + " 组反向关系 · " + result.extremeFindings.length + " 个越线记录 · " + result.statusFindings.length + " 个状态待办";

      clearNode(preview);
      rows.forEach(function (row) {
        const item = document.createElement("span");
        item.className = "is149-preview-pair";
        item.appendChild(document.createTextNode(row.chars[0]));
        const second = document.createElement("i");
        second.textContent = row.chars[1];
        second.style.marginLeft = Math.max(-10, Math.min(10, row.value / 20)) + "px";
        item.appendChild(second);
        item.title = row.pair + " · " + signed(row.value) + " · " + row.purpose;
        preview.appendChild(item);
      });

      clearNode(findingList);
      const shown = result.findings.length ? result.findings.slice(0, 40) : ["无反向关系、越线记录或未定稿状态；仍须在真实字体与输出环境复核。"];
      shown.forEach(function (text) { const li = document.createElement("li"); li.textContent = text; findingList.appendChild(li); });
      if (result.findings.length > 40) {
        const li = document.createElement("li");
        li.textContent = "界面省略 " + (result.findings.length - 40) + " 项；完整复制报告保留全部提示。";
        findingList.appendChild(li);
      }

      clearNode(pairList);
      rows.slice(0, 40).forEach(function (row) {
        const item = document.createElement("div");
        item.className = "is149-pair-row";
        const pair = document.createElement("b"); pair.textContent = row.pair;
        const meta = document.createElement("span"); meta.textContent = row.purpose + " · " + row.status;
        const value = document.createElement("strong"); value.textContent = signed(row.value);
        item.append(pair, meta, value); pairList.appendChild(item);
      });
      if (rows.length > 40) {
        const note = document.createElement("p"); note.textContent = "目录省略 " + (rows.length - 40) + " 条；上方基线预览与复制报告保留全部字偶。"; pairList.appendChild(note);
      }

      fullReport = [
        "字偶校样交接", "状态: " + result.state, "字偶数: " + rows.length, "总调整: " + signed(result.total), "中位数: " + signed(result.median), "最大绝对值: " + result.maxAbs, "反向关系: " + result.reverseFindings.length, "绝对值复核线: " + limit,
        "", "校样提示", ...(result.findings.length ? result.findings : ["无内部提示；仍须在真实字体与输出环境复核。"]),
        "", "全部记录", ...rows.map(function (row, index) { return (index + 1) + ". " + row.pair + " | " + signed(row.value) + " | " + row.purpose + " | " + row.status; }),
        "", "边界: 本报告不读取字体文件，不判断字体工程、语言、可读性、无障碍、授权或发布许可。"
      ].join("\n");
      copyButton.disabled = false;
      formStatus.textContent = "已整理 " + rows.length + " 个字偶；请回到真实字体、字号与输出环境复核。";
    }

    form.querySelectorAll("[data-is149-preset]").forEach(function (button) {
      button.addEventListener("click", function () {
        const data = examples[button.dataset.is149Preset];
        pairInput.value = data.rows;
        limitInput.value = data.limit;
        error.textContent = "";
        resetReport("样张已装入，请压出校样报告。");
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      error.textContent = "";
      copyStatus.textContent = "";
      try {
        const rows = parseRows(pairInput.value);
        const limit = parseLimit(limitInput.value.trim());
        render(rows, limit, buildReport(rows, limit));
      } catch (problem) {
        resetReport("");
        error.textContent = String(problem.message || problem).trim();
        formStatus.textContent = "输入未通过，请按提示修正。";
      }
    });

    [pairInput, limitInput].forEach(function (input) {
      input.addEventListener("input", function () {
        if (report.dataset.ready === "true") resetReport("字偶或复核线已改变，请重新生成校样报告。");
      });
    });

    form.addEventListener("reset", function () {
      setTimeout(function () {
        error.textContent = "";
        resetReport("校样已清空，输入已恢复初始示例。");
      }, 0);
    });

    copyButton.addEventListener("click", async function () {
      if (!fullReport) return;
      try { await copyText(fullReport); copyStatus.textContent = "完整校样交接已复制。"; }
      catch (_) { copyStatus.textContent = "复制失败，请手动选择报告。"; }
    });
  }

  const routeForm = document.querySelector("[data-is149-route-form]");
  if (routeForm) {
    const clue = routeForm.querySelector("[data-is149-clue]");
    const status = routeForm.querySelector("[data-is149-route-status]");
    routeForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const value = clue.value.trim();
      status.textContent = "";
      if (!value) { status.textContent = "请输入字形、调整或使用边界线索。"; return; }
      if (Array.from(value).length > 80) { status.textContent = "线索最多 80 个 Unicode 字符，请缩短后再寻找。"; return; }
      const articleWords = /字形|校记|光学|语境|方向|上下文|阅读/;
      const toolWords = /字偶|调整|阈值|整数|反向|校样|工作台|报告/;
      const legalWords = /字体|授权|版权|许可|可读|无障碍|语言|发布|隐私|责任/;
      let target = "index.html";
      if (legalWords.test(value)) target = "legal.html";
      else if (toolWords.test(value)) target = "tool.html";
      else if (articleWords.test(value)) target = "article.html";
      status.textContent = "正在沿基线前往“" + target.replace(".html", "") + "”。";
      setTimeout(function () { location.href = target; }, 350);
    });
  }
})();
