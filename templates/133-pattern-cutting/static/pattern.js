(function () {
  "use strict";
  var root = document.documentElement;
  var toggle = document.querySelector("[data-pc133-ink-toggle]");
  var storageKey = "pc133-ink";
  function text(node, value) { if (node) node.textContent = value; }
  function stored() { try { return localStorage.getItem(storageKey); } catch (error) { return null; } }
  function store(value) { try { localStorage.setItem(storageKey, value); } catch (error) { return; } }
  function paint(value) {
    var ink = value === "blueprint" ? "blueprint" : "chalk"; root.dataset.pc133Ink = ink;
    if (toggle) { toggle.setAttribute("aria-pressed", String(ink === "blueprint")); text(toggle, ink === "blueprint" ? "关闭蓝图灯" : "启用蓝图灯"); }
    var meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = ink === "blueprint" ? "#082d5c" : "#dfcca2";
  }
  paint(stored() || root.dataset.pc133Ink || "chalk");
  if (toggle) toggle.addEventListener("click", function () { var next = root.dataset.pc133Ink === "blueprint" ? "chalk" : "blueprint"; paint(next); store(next); });

  var progress = document.querySelector(".pc133-progress");
  if (progress) { var update = function () { var maximum = document.documentElement.scrollHeight - innerHeight; progress.value = maximum > 0 ? Math.min(100, Math.max(0, scrollY / maximum * 100)) : 100; }; addEventListener("scroll", update, { passive: true }); addEventListener("resize", update); update(); }

  function copy(value, status, success) {
    if (!value) return;
    var fallback = function () { var area = document.createElement("textarea"); area.value = value; area.style.position = "fixed"; area.style.opacity = "0"; document.body.appendChild(area); area.select(); var okay = false; try { okay = document.execCommand("copy"); } catch (error) { okay = false; } area.remove(); text(status, okay ? success : "复制失败，请手动选择文字。"); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(value).then(function () { text(status, success); }, fallback); else fallback();
  }
  var story = document.querySelector("[data-pc133-copy-story]"); var policy = document.querySelector("[data-pc133-copy-policy]");
  if (story) story.addEventListener("click", function () { copy("纸样交接：裁片、边码、对接码、缝份、状态与版本逐项对应；真实纸样、放码、人体、样衣、面料、工艺、生产、权利与发布批准另行确认。", document.querySelector("[data-pc133-copy-status]"), "纸样交接摘要已复制。"); });
  if (policy) policy.addEventListener("click", function () { copy("纸样制作边界：页面只核对文字边码、对接码、缝份与状态；真实纸样、人体、样衣、面料、工艺、生产质量、作品权利与发布由对应责任人另行核验。", document.querySelector("[data-pc133-copy-status]"), "制作边界摘要已复制。"); });
  document.querySelectorAll(".pc133-seam-book details").forEach(function (detail) { detail.addEventListener("toggle", function () { if (detail.open) document.querySelectorAll(".pc133-seam-book details").forEach(function (other) { if (other !== detail) other.open = false; }); }); });

  var search = document.querySelector("[data-pc133-search]");
  if (search) {
    var clue = document.getElementById("pc133-clue"); var searchStatus = document.querySelector("[data-pc133-search-status]");
    search.addEventListener("submit", function (event) {
      event.preventDefault(); var raw = clue.value.normalize("NFKC").trim(); text(searchStatus, "");
      if (!raw) { text(searchStatus, "请输入纸样线索。"); clue.focus(); return; }
      if (Array.from(raw).length > 80) { text(searchStatus, "线索最多 80 个 Unicode 字符。"); clue.focus(); return; }
      var route = ""; var message = "";
      if (/主版|纸样|丝缕|缺口|札记/.test(raw)) { route = "article.html"; message = "已找到纸样制作札记，正在打开。"; }
      else if (/边码|对接|缝份|裁片|核对/.test(raw)) { route = "tool.html"; message = "已找到缝合边核对台，正在打开。"; }
      else if (/样衣|面料|工艺|生产|权利|边界/.test(raw)) { route = "legal.html"; message = "已找到纸样制作边界，正在打开。"; }
      if (route) { text(searchStatus, message); location.href = route; } else text(searchStatus, "没有匹配裁片。请返回纸样裁床查看现有档案。");
    });
  }

  var form = document.querySelector("[data-pc133-edge-form]"); if (!form) return;
  var input = document.getElementById("pc133-rows"); var errorNode = document.querySelector("[data-pc133-error]"); var formStatus = document.querySelector("[data-pc133-form-status]"); var report = document.querySelector(".pc133-report"); var stateNode = document.querySelector("[data-pc133-report-state]"); var pieceCount = document.querySelector("[data-pc133-piece-count]"); var edgeCount = document.querySelector("[data-pc133-edge-count]"); var pairCount = document.querySelector("[data-pc133-pair-count]"); var statusCount = document.querySelector("[data-pc133-status-count]"); var findingSummary = document.querySelector("[data-pc133-finding-summary]"); var findingList = document.querySelector("[data-pc133-finding-list]"); var edgeSummary = document.querySelector("[data-pc133-edge-summary]"); var edgeList = document.querySelector("[data-pc133-edge-list]"); var note = document.querySelector("[data-pc133-note]"); var copyReport = document.querySelector("[data-pc133-copy-report]"); var copyStatus = document.querySelector("[data-pc133-copy-status]"); var currentReport = "";
  var presets = {
    matched: "前身片 | A-01 | B-01 | 10 | 定版\n后身片 | B-01 | A-01 | 10 | 定版\n袖片 | S-02 | A-02 | 12.5 | 定版\n前身片 | A-02 | S-02 | 12.5 | 定版",
    missing: "前身片 | A-01 | B-01 | 10 | 定版\n后身片 | B-01 | A-01 | 10 | 定版\n领片 | C-01 | X-99 | 8 | 定版",
    allowance: "前身片 | A-03 | B-03 | 10 | 定版\n后身片 | B-03 | A-03 | 12.5 | 定版",
    review: "前身片 | A-04 | B-04 | 10 | 样衣\n后身片 | B-04 | A-04 | 12 | 纸样\n袖片 | S-05 | A-05 | 10 | 定版\n前身片 | A-05 | S-05 | 10 | 定版"
  };
  function count(value) { return Array.from(value).length; }
  function key(value) { return value.normalize("NFKC").trim().replace(/\s+/gu, " ").toLocaleLowerCase(); }
  function forbidden(value) { return /[\p{Cc}\p{Cf}]/u.test(value); }
  function piece(raw, line) { if (forbidden(raw)) throw new Error("第 " + line + " 行的裁片不能包含 Unicode 控制或格式字符。"); var value = raw.normalize("NFKC").trim().replace(/\s+/gu, " "); if (count(value) < 2 || count(value) > 24) throw new Error("第 " + line + " 行的裁片须为 2–24 个 Unicode 字符。"); return value; }
  function edgeCode(raw, label, line) { var value = raw.normalize("NFKC").trim().toUpperCase(); if (!/^[A-Z0-9](?:[A-Z0-9-]{0,10}[A-Z0-9])$/.test(value)) throw new Error("第 " + line + " 行的" + label + "须为 2–12 位大写字母、数字或中间连字符。"); return value; }
  function allowance(raw, line) { var value = raw.normalize("NFKC").trim(); if (!/^(?:0(?:\.\d)?|[1-9]\d*(?:\.\d)?)$/.test(value)) throw new Error("第 " + line + " 行的缝份须为 0–50 的普通十进制，最多一位小数，不能有符号或前导零。"); var parts = value.split("."); var scaled = Number(parts[0]) * 10 + Number(parts[1] || "0"); if (scaled > 500) throw new Error("第 " + line + " 行的缝份不能超过 50 mm。"); return scaled; }
  function parse(raw) {
    if (count(raw) > 6000) throw new Error("裁片缝合边记录最多 6000 个 Unicode 字符。");
    var lines = raw.split(/\r?\n/).map(function (value, index) { return { value: value, line: index + 1 }; }).filter(function (item) { return item.value.trim() !== ""; });
    if (lines.length < 2 || lines.length > 120) throw new Error("请输入 2–120 条非空缝合边记录。");
    var edgeLines = new Map(); var records = [];
    lines.forEach(function (item) {
      var fields = item.value.normalize("NFKC").split("|"); if (fields.length !== 5) throw new Error("第 " + item.line + " 行须严格包含 5 个字段。");
      var name = piece(fields[0], item.line); var code = edgeCode(fields[1], "边码", item.line); var mate = edgeCode(fields[2], "对接码", item.line); var seam = allowance(fields[3], item.line); var status = fields[4].trim();
      if (code === mate) throw new Error("第 " + item.line + " 行的边码不能指向自己。");
      if (!/^(?:纸样|样衣|定版)$/.test(status)) throw new Error("第 " + item.line + " 行的状态须为纸样、样衣或定版。");
      if (edgeLines.has(code)) throw new Error("第 " + item.line + " 行与第 " + edgeLines.get(code) + " 行使用重复边码 " + code + "。");
      edgeLines.set(code, item.line); records.push({ line: item.line, piece: name, pieceKey: key(name), code: code, mate: mate, seam: seam, status: status });
    }); return records;
  }
  function seamText(value) { return value % 10 ? (value / 10).toFixed(1) : String(value / 10); }
  function analyze(records) {
    var byCode = new Map(records.map(function (record) { return [record.code, record]; })); var pairFlags = []; var statusFlags = []; var findings = []; var checked = new Set();
    records.forEach(function (record) {
      var target = byCode.get(record.mate);
      if (!target) { var missing = record.piece + " / " + record.code + "：对接码 " + record.mate + " 不在当前清单。"; pairFlags.push(missing); findings.push(missing); }
      else if (target.mate !== record.code) { var oneWay = record.piece + " / " + record.code + " 指向 " + target.code + "，但目标回指 " + target.mate + "。"; pairFlags.push(oneWay); findings.push(oneWay); }
      else {
        var pairKey = [record.code, target.code].sort().join("|");
        if (!checked.has(pairKey)) { checked.add(pairKey); if (record.seam !== target.seam) { var mismatch = record.code + " ⇄ " + target.code + "：缝份 " + seamText(record.seam) + " 与 " + seamText(target.seam) + " mm 不一致。"; pairFlags.push(mismatch); findings.push(mismatch); } }
      }
      if (record.status !== "定版") { statusFlags.push(record); findings.push(record.piece + " / " + record.code + "：第 " + record.line + " 行为“" + record.status + "”，尚未定版。"); }
    });
    var pieces = new Set(records.map(function (record) { return record.pieceKey; })); return { pieces: pieces.size, pairFlags: pairFlags, statusFlags: statusFlags, findings: findings, byCode: byCode };
  }
  function add(parent, tag, value) { var node = document.createElement(tag); node.textContent = value; parent.appendChild(node); return node; }
  function clear() { report.dataset.ready = "false"; text(stateNode, "UNSET"); text(pieceCount, "0"); text(edgeCount, "0"); text(pairCount, "0"); text(statusCount, "0"); text(findingSummary, "等待计算"); findingList.replaceChildren(); add(findingList, "li", "报告生成后在此显示缺失、非互指、缝份与状态提示。"); text(edgeSummary, "等待计算"); edgeList.replaceChildren(); add(edgeList, "p", "等待边码记录。"); copyReport.disabled = true; text(copyStatus, ""); currentReport = ""; }
  function render(records, data) {
    var state = "MATCHED"; if (data.pairFlags.length && data.statusFlags.length) state = "REVIEW " + data.findings.length; else if (data.pairFlags.length) state = "PAIR FLAGS " + data.pairFlags.length; else if (data.statusFlags.length) state = "STATUS FLAGS " + data.statusFlags.length;
    report.dataset.ready = "true"; text(stateNode, state); text(pieceCount, String(data.pieces)); text(edgeCount, String(records.length)); text(pairCount, String(data.pairFlags.length)); text(statusCount, String(data.statusFlags.length));
    text(findingSummary, data.findings.length ? data.findings.length + " 条机械提示" : "无机械提示"); findingList.replaceChildren(); if (!data.findings.length) add(findingList, "li", "全部边码互指存在、缝份一致，且所有记录已定版。"); data.findings.slice(0, 40).forEach(function (finding) { add(findingList, "li", finding); }); if (data.findings.length > 40) add(findingList, "li", "界面仅显示前 40 条；完整复制报告保留全部 " + data.findings.length + " 条提示。");
    text(edgeSummary, records.length + " 条边码"); edgeList.replaceChildren(); records.slice(0, 40).forEach(function (record, index) { var card = document.createElement("article"); add(card, "b", String(index + 1).padStart(2, "0")); add(card, "strong", record.code + " ⇄ " + record.mate); add(card, "small", record.piece + " / " + seamText(record.seam) + " mm"); add(card, "span", (data.byCode.has(record.mate) && data.byCode.get(record.mate).mate === record.code ? "RECIPROCAL" : "CHECK PAIR") + " · " + record.status); edgeList.appendChild(card); }); if (records.length > 40) add(edgeList, "p", "界面仅显示前 40 条边码；完整复制报告保留全部 " + records.length + " 条边码。");
    var lines = ["裁片缝合边机械审计报告", "状态：" + state, "裁片：" + data.pieces + "｜边码：" + records.length + "｜配对提示：" + data.pairFlags.length + "｜未定版：" + data.statusFlags.length, "", "提示："]; if (!data.findings.length) lines.push("- 无机械提示。"); data.findings.forEach(function (finding) { lines.push("- " + finding); }); lines.push("", "边码："); records.forEach(function (record, index) { lines.push(String(index + 1).padStart(3, "0") + ". " + record.piece + "｜" + record.code + " ⇄ " + record.mate + "｜缝份 " + seamText(record.seam) + " mm｜" + record.status); }); lines.push("", note.textContent.trim()); currentReport = lines.join("\n"); copyReport.disabled = false; text(copyStatus, ""); text(formStatus, "报告已生成，仍须核对真实纸样、人体、样衣、面料、工艺、生产质量、权利与发布批准。");
  }
  function stale() { if (report.dataset.ready === "true") { clear(); text(formStatus, "输入已改变，请重新生成报告。"); } text(errorNode, ""); }
  form.addEventListener("submit", function (event) { event.preventDefault(); text(errorNode, ""); try { var records = parse(input.value); render(records, analyze(records)); } catch (error) { clear(); text(errorNode, error.message); text(formStatus, "请修正输入后重新生成。"); input.focus(); } });
  form.addEventListener("reset", function () { setTimeout(function () { clear(); text(errorNode, ""); text(formStatus, "等待至少两条缝合边记录。"); }, 0); }); input.addEventListener("input", stale);
  document.querySelectorAll("[data-pc133-preset]").forEach(function (button) { button.addEventListener("click", function () { var value = presets[button.dataset.pc133Preset]; if (!value) return; input.value = value; stale(); input.focus(); }); }); copyReport.addEventListener("click", function () { copy(currentReport, copyStatus, "完整裁片缝合边报告已复制。"); });
}());
