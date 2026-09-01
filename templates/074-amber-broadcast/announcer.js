(() => {
  "use strict";
  const root = document.documentElement;
  const studioToggle = document.querySelector("[data-studio-toggle]");
  const studioKey = "amber-broadcast-074-studio";
  function setStudio(value) {
    const studio = value === "day" ? "day" : "night";
    root.dataset.studio = studio;
    if (studioToggle) { studioToggle.textContent = studio === "day" ? "夜班" : "日班"; studioToggle.setAttribute("aria-label", studio === "day" ? "切换到夜间演播室" : "切换到日间演播室"); }
  }
  try { setStudio(localStorage.getItem(studioKey) || "night"); } catch (error) { setStudio("night"); }
  studioToggle?.addEventListener("click", () => { const next = root.dataset.studio === "day" ? "night" : "day"; setStudio(next); try { localStorage.setItem(studioKey, next); } catch (error) { /* Theme still works. */ } });

  const menuButton = document.querySelector(".ab74-menu-button");
  const menu = document.querySelector("#ab74-menu");
  function closeMenu(returnFocus = false) { if (!menuButton || !menu) return; menu.classList.remove("ab74-open"); menuButton.setAttribute("aria-expanded", "false"); if (returnFocus) menuButton.focus(); }
  menuButton?.addEventListener("click", () => { const open = !menu.classList.contains("ab74-open"); menu.classList.toggle("ab74-open", open); menuButton.setAttribute("aria-expanded", String(open)); if (open) menu.querySelector("a,button")?.focus(); });
  menu?.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && menu?.classList.contains("ab74-open")) closeMenu(true); });
  addEventListener("resize", () => { if (innerWidth > 960) closeMenu(); });

  async function copyText(value) {
    if (navigator.clipboard && isSecureContext) { await navigator.clipboard.writeText(value); return; }
    const area = document.createElement("textarea"); area.value = value; area.readOnly = true; area.style.position = "fixed"; area.style.opacity = "0"; document.body.append(area); area.select(); const copied = document.execCommand("copy"); area.remove(); if (!copied) throw new Error("copy unavailable");
  }
  function bindCopy(buttonSelector, sourceSelector, statusSelector) {
    const button = document.querySelector(buttonSelector), source = document.querySelector(sourceSelector), status = document.querySelector(statusSelector);
    button?.addEventListener("click", async () => { try { await copyText(source.textContent.trim()); status.textContent = "已复制，请按真实节目补齐。"; } catch (error) { status.textContent = "浏览器未允许复制，请手动选择文字。"; } });
  }
  bindCopy("[data-copy-handoff]", "[data-handoff-text]", "[data-handoff-status]");
  bindCopy("[data-copy-disclosure]", "[data-disclosure-text]", "[data-disclosure-status]");

  const progress = document.querySelector("[data-reading-progress]");
  if (progress) { const update = () => { const available = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${available > 0 ? Math.min(100, Math.max(0, scrollY / available * 100)) : 100}%`; }; update(); addEventListener("scroll", update, { passive: true }); addEventListener("resize", update); }

  function formatTime(seconds) { const safe = Math.max(0, Math.floor(seconds)); return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`; }
  const voiceForm = document.querySelector("[data-voice-form]");
  if (voiceForm) {
    const input = voiceForm.querySelector("#ab74-script"), speedField = voiceForm.querySelector("#ab74-speed"), error = voiceForm.querySelector("[data-voice-error]"), status = voiceForm.querySelector("[data-voice-status]");
    const report = document.querySelector(".ab74-voice-report"), state = report.querySelector("[data-voice-state]"), paragraphCount = report.querySelector("[data-paragraph-count]"), unitCount = report.querySelector("[data-unit-count]"), totalTime = report.querySelector("[data-total-time]"), longCount = report.querySelector("[data-long-count]"), list = report.querySelector("[data-voice-list]"), note = report.querySelector("[data-voice-note]"), copyButton = report.querySelector("[data-copy-voice-report]"), copyStatus = report.querySelector("[data-voice-copy-status]");
    let latest = "";
    const presets = {
      brief: "今天先说明能够确认的内容。\n直接来源和适用范围会放在页面说明里。\n仍待核实的部分将在确认后更新。",
      mixed: "欢迎收听本期节目，我们先复述今天要回答的问题。\n第一部分核对直接来源、查看日期和适用范围，并把仍然冲突的说法分别列出。\n接下来用一个短例子说明判断方法。\n最后给出更正入口。",
      long: "这是一段故意写得很长的口播样例，用来提醒编辑：同一个段落如果连续承载背景、来源、判断、限制、例子、转折和下一步，主持人会难以找到自然呼吸点，听众也更难记住主要信息；更可靠的处理方式是先保留完整事实，再按一个段落一个职责拆分，并在数字、缩写和专有名词旁增加发音提示。"
    };
    function placeholder(value = "估算后显示前 20 段、起止时间与发音单位。") { const item = document.createElement("li"); item.textContent = value; list.replaceChildren(item); }
    function zero() { paragraphCount.textContent = "0"; unitCount.textContent = "0"; totalTime.textContent = "00:00"; longCount.textContent = "0"; }
    function fail(message) { input.setAttribute("aria-invalid", "true"); error.textContent = message; status.textContent = "未生成时间线，请修正输入。"; report.dataset.ready = "false"; state.textContent = "CHECK"; zero(); placeholder("输入有误，修正后重新估算。"); note.textContent = "时长是编辑估算，不是真人录音结果。"; copyButton.disabled = true; copyStatus.textContent = ""; latest = ""; }
    function stale() { if (report.dataset.ready !== "true") return; report.dataset.ready = "false"; state.textContent = "STALE"; status.textContent = "逐字稿或语速已变化，请重新估算。"; copyButton.disabled = true; copyStatus.textContent = ""; latest = ""; }
    input.addEventListener("input", stale); speedField.addEventListener("change", stale);
    voiceForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = input.value.replace(/\r\n?/g, "\n"), inputLength = Array.from(text).length;
      input.removeAttribute("aria-invalid"); error.textContent = "";
      if (!text.trim()) { fail("请先输入至少一个口播段落。"); input.focus(); return; }
      if (inputLength > 10000) { fail(`输入共 ${inputLength} 个字符，最多允许 10000 个。`); input.focus(); return; }
      const lines = text.split("\n").map((value, index) => ({ value: value.trim(), line: index + 1 })).filter((line) => line.value);
      if (lines.length > 80) { fail(`检测到 ${lines.length} 个段落，最多允许 80 个。`); input.focus(); return; }
      const speed = Number(speedField.value);
      if (![180, 220, 260].includes(speed)) { fail("语速必须是 180、220 或 260 单位/分钟。"); speedField.focus(); return; }
      const paragraphs = [];
      for (const line of lines) {
        const value = line.value.normalize("NFKC").replace(/\s+/g, " ").trim(), length = Array.from(value).length;
        if (length > 500) { fail(`第 ${line.line} 行超过 500 个字符。`); input.focus(); return; }
        let halfUnits = 0;
        for (const character of Array.from(value)) { if (/\s/u.test(character)) continue; halfUnits += /\p{P}/u.test(character) ? 1 : 2; }
        const seconds = Math.max(1, Math.ceil(halfUnits / 2 / speed * 60));
        paragraphs.push({ value, halfUnits, seconds });
      }
      let cursor = 0;
      const timeline = paragraphs.map((paragraph, index) => { const start = cursor; cursor += paragraph.seconds; return { ...paragraph, index: index + 1, start, end: cursor }; });
      const totalHalfUnits = paragraphs.reduce((sum, paragraph) => sum + paragraph.halfUnits, 0), longParagraphs = paragraphs.filter((paragraph) => paragraph.seconds > 45).length;
      paragraphCount.textContent = String(paragraphs.length); unitCount.textContent = totalHalfUnits % 2 ? (totalHalfUnits / 2).toFixed(1) : String(totalHalfUnits / 2); totalTime.textContent = formatTime(cursor); longCount.textContent = String(longParagraphs); list.replaceChildren();
      timeline.slice(0, 20).forEach((item) => { const row = document.createElement("li"), time = document.createElement("b"), body = document.createElement("span"), excerpt = document.createTextNode(item.value), detail = document.createElement("small"), units = document.createElement("em"); time.textContent = `${formatTime(item.start)}–${formatTime(item.end)}`; detail.textContent = `第 ${item.index} 段 · ${item.seconds} 秒${item.seconds > 45 ? " · 长段" : ""}`; units.textContent = `${item.halfUnits % 2 ? (item.halfUnits / 2).toFixed(1) : item.halfUnits / 2} U`; body.append(excerpt, detail); row.append(time, body, units); list.append(row); });
      note.textContent = `按 ${speed} 单位/分钟估算，总时长 ${formatTime(cursor)}；${longParagraphs ? `${longParagraphs} 段超过 45 秒，建议试读。` : "没有超过 45 秒的段落。"}`;
      latest = ["口播段落时间线", `语速：${speed} 单位/分钟`, `段落：${paragraphs.length}`, `发音单位：${totalHalfUnits / 2}`, `预计总时长：${formatTime(cursor)}`, `超过 45 秒：${longParagraphs}`, ...timeline.slice(0, 20).map((item) => `${String(item.index).padStart(2, "0")} · ${formatTime(item.start)}–${formatTime(item.end)} · ${item.halfUnits / 2} U · ${item.value}`), "说明：字符估算不是真人录音时长。"].join("\n");
      report.dataset.ready = "true"; state.textContent = longParagraphs ? "REVIEW" : "READY"; status.textContent = `估算完成：${paragraphs.length} 段约 ${formatTime(cursor)}。`; copyButton.disabled = false; copyStatus.textContent = "";
    });
    voiceForm.querySelectorAll("[data-voice-preset]").forEach((button) => button.addEventListener("click", () => { const hadReady = report.dataset.ready === "true"; input.value = presets[button.dataset.voicePreset]; input.removeAttribute("aria-invalid"); error.textContent = ""; if (hadReady) stale(); else { report.dataset.ready = "false"; state.textContent = "LOADED"; zero(); placeholder(); note.textContent = "时长是编辑估算，不是真人录音结果。"; copyButton.disabled = true; copyStatus.textContent = ""; latest = ""; } status.textContent = "样例已装载，点击估算生成时间线。"; input.focus(); }));
    copyButton.addEventListener("click", async () => { if (!latest) return; try { await copyText(latest); copyStatus.textContent = "时间线已复制。"; } catch (error) { copyStatus.textContent = "浏览器未允许复制。"; } });
    voiceForm.addEventListener("reset", () => setTimeout(() => { input.removeAttribute("aria-invalid"); error.textContent = ""; status.textContent = "等待输入逐字稿。"; report.dataset.ready = "false"; state.textContent = "STANDBY"; zero(); placeholder(); note.textContent = "时长是编辑估算，不是真人录音结果。"; copyButton.disabled = true; copyStatus.textContent = ""; latest = ""; }, 0));
  }

  const search = document.querySelector("[data-channel-search]");
  if (search) {
    const query = search.querySelector("input"), output = search.querySelector("[data-channel-result]");
    const routes = [{ href: "article.html", label: "可复核逐字稿方法", words: ["逐字稿", "发音", "事实", "录音"] }, { href: "tool.html", label: "口播段落计时尺", words: ["计时", "口播", "语速", "时长"] }, { href: "legal.html", label: "广播台规与内容边界", words: ["台规", "披露", "边界", "更正"] }, { href: "index.html", label: "模拟直播台", words: ["首页", "直播", "频道", "节目"] }];
    search.addEventListener("submit", (event) => { event.preventDefault(); const value = query.value.trim(); if (!value) { output.textContent = "请输入一个节目词。"; query.focus(); return; } const normalized = value.normalize("NFKC").toLocaleLowerCase(), found = routes.find((route) => route.words.some((word) => normalized.includes(word))), route = found || routes[3], link = document.createElement("a"); link.href = route.href; link.textContent = route.label; output.replaceChildren(document.createTextNode(found ? "最近的频道页：" : "未找到精确节目，建议先返回"), link, document.createTextNode("。")); });
    query.addEventListener("input", () => { output.textContent = "节目词已变化，提交后重新调谐。"; });
  }
})();
