(() => {
  "use strict";

  const root = document.documentElement;
  const lampKey = "noir-cinema-063-lamp";
  const lampButtons = [...document.querySelectorAll("[data-lamp-toggle]")];
  const setLamp = (value) => {
    const theme = value === "house" ? "house" : "noir";
    root.dataset.theme = theme;
    lampButtons.forEach((button) => {
      button.textContent = theme === "noir" ? "亮灯" : "熄灯";
      button.setAttribute("aria-label", theme === "noir" ? "切换到亮灯主题" : "切换到黑场主题");
    });
  };
  let storedLamp = "noir";
  try { storedLamp = localStorage.getItem(lampKey) || "noir"; } catch (_) { storedLamp = "noir"; }
  setLamp(storedLamp);
  lampButtons.forEach((button) => button.addEventListener("click", () => {
    const next = root.dataset.theme === "noir" ? "house" : "noir";
    setLamp(next);
    try { localStorage.setItem(lampKey, next); } catch (_) { /* The current page still changes theme. */ }
  }));

  const menuButton = document.querySelector(".nc63-menu-button");
  const menu = document.querySelector(".nc63-menu");
  const closeMenu = (restore = false) => {
    if (!menuButton || !menu) return;
    menu.classList.remove("nc63-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (restore) menuButton.focus();
  };
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const open = !menu.classList.contains("nc63-open");
      menu.classList.toggle("nc63-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      if (open) {
        const firstLink = menu.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("nc63-open")) closeMenu(true);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu(false);
    });
  }

  const copyText = async (text) => {
    if (!text) return false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) { /* Fall through to a local selection copy. */ }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    let copied = false;
    try { copied = document.execCommand("copy"); } catch (_) { copied = false; }
    area.remove();
    return copied;
  };
  const bindCopy = (buttonSelector, sourceSelector, statusSelector, success) => {
    const button = document.querySelector(buttonSelector);
    const source = document.querySelector(sourceSelector);
    const status = document.querySelector(statusSelector);
    if (!button || !source || !status) return;
    button.addEventListener("click", async () => {
      const ok = await copyText(source.textContent.trim());
      status.textContent = ok ? success : "复制失败，请手动选择文字。";
    });
  };
  bindCopy("[data-copy-handoff]", "[data-handoff-text]", "[data-handoff-status]", "交接提示已复制。");
  bindCopy("[data-copy-disclosure]", "[data-disclosure-text]", "[data-disclosure-status]", "简短披露已复制。");

  const progress = document.querySelector("[data-reading-progress]");
  if (progress) {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const percent = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100;
      progress.style.width = `${percent}%`;
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const cueForm = document.querySelector("[data-cue-form]");
  if (cueForm) {
    const scenesInput = cueForm.elements.scenes;
    const error = document.querySelector("[data-scenes-error]");
    const status = document.querySelector("[data-cue-status]");
    const output = document.querySelector(".nc63-cue-output");
    const state = document.querySelector("[data-cue-state]");
    const count = document.querySelector("[data-cue-count]");
    const total = document.querySelector("[data-cue-total]");
    const longest = document.querySelector("[data-cue-longest]");
    const list = document.querySelector("[data-cue-list]");
    const note = document.querySelector("[data-cue-note]");
    const copyButton = document.querySelector("[data-copy-cues]");
    const copyStatus = document.querySelector("[data-cue-copy-status]");
    let ready = false;
    let copyPayload = "";

    const unicodeLength = (value) => Array.from(value).length;
    const timecode = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainder = seconds % 60;
      return [hours, minutes, remainder].map((value) => String(value).padStart(2, "0")).join(":");
    };
    const durationLabel = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
    const emptyItem = () => {
      const item = document.createElement("li");
      const number = document.createElement("span");
      const body = document.createElement("div");
      const title = document.createElement("b");
      const timing = document.createElement("small");
      const duration = document.createElement("code");
      number.textContent = "01";
      title.textContent = "生成后显示镜次";
      timing.textContent = "IN 00:00:00 · OUT 00:00:00";
      duration.textContent = "00:00";
      body.append(title, timing);
      item.append(number, body, duration);
      return item;
    };
    const clearOutput = (message = "出点会自动成为下一镜入点。") => {
      ready = false;
      copyPayload = "";
      output.removeAttribute("data-ready");
      state.textContent = "STANDBY";
      count.textContent = "0";
      total.textContent = "00:00:00";
      longest.textContent = "—";
      note.textContent = message;
      copyButton.disabled = true;
      copyStatus.textContent = "";
      list.replaceChildren(emptyItem());
    };
    const markStale = () => {
      if (!ready) return;
      clearOutput("镜次已改变，请重新生成提示单。");
      state.textContent = "STALE";
      status.textContent = "输入已改变，旧提示单已失效。";
    };
    scenesInput.addEventListener("input", markStale);

    const presets = {
      brief: "开场摘要 | 0:45\n来源核对 | 2:10\n编辑交接 | 1:30",
      feature: "正式入口 | 1:45\n适用边界 | 1:35\n证据状态 | 1:50\n编辑交接 | 1:20",
      minute: "开场 | 0:15\n要点 | 0:15\n证据 | 0:15\n收束 | 0:15"
    };
    cueForm.querySelectorAll("[data-cue-preset]").forEach((button) => button.addEventListener("click", () => {
      const value = presets[button.dataset.cuePreset];
      if (!value) return;
      scenesInput.value = value;
      scenesInput.removeAttribute("aria-invalid");
      error.textContent = "";
      markStale();
      status.textContent = "示例已装载，点击生成提示单。";
    }));

    cueForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const normalized = scenesInput.value.normalize("NFKC").replace(/\r\n?/g, "\n");
      const rawLength = unicodeLength(normalized);
      const lines = normalized.split("\n").map((line) => line.trim()).filter(Boolean);
      let message = "";
      let parsed = [];
      if (!normalized.trim() || lines.length === 0) message = "请输入至少一个非空镜次。";
      else if (rawLength > 6000) message = "总输入最多 6000 个 Unicode 字符。";
      else if (lines.length > 60) message = "镜次最多 60 行。";
      else {
        for (let index = 0; index < lines.length; index += 1) {
          const parts = lines[index].split("|");
          if (parts.length !== 2) { message = `第 ${index + 1} 个镜次必须且只能包含一个 |。`; break; }
          const title = parts[0].trim().replace(/\s+/gu, " ");
          const duration = parts[1].trim();
          if (!title) { message = `第 ${index + 1} 个镜次缺少标题。`; break; }
          if (unicodeLength(title) > 80) { message = `第 ${index + 1} 个镜次标题超过 80 个字符。`; break; }
          const match = duration.match(/^(?:0|[1-9]\d{0,2}):([0-5]\d)$/);
          if (!match) { message = `第 ${index + 1} 个镜次时长应为分:秒，例如 2:35。`; break; }
          const minutes = Number(duration.slice(0, duration.indexOf(":")));
          const seconds = minutes * 60 + Number(match[1]);
          if (seconds === 0) { message = `第 ${index + 1} 个镜次时长不能为 0:00。`; break; }
          parsed.push({ title, seconds });
        }
      }
      const totalSeconds = parsed.reduce((sum, scene) => sum + scene.seconds, 0);
      if (!message && totalSeconds > 43200) message = "总片长不能超过 12:00:00。";
      error.textContent = message;
      if (message) {
        scenesInput.setAttribute("aria-invalid", "true");
        clearOutput("修正镜次后再生成提示单。");
        state.textContent = "CHECK INPUT";
        status.textContent = "镜次未通过检查。";
        scenesInput.focus();
        return;
      }
      scenesInput.removeAttribute("aria-invalid");
      const fragment = document.createDocumentFragment();
      let cursor = 0;
      const rows = parsed.map((scene, index) => {
        const start = cursor;
        const end = cursor + scene.seconds;
        cursor = end;
        const item = document.createElement("li");
        const number = document.createElement("span");
        const body = document.createElement("div");
        const title = document.createElement("b");
        const timing = document.createElement("small");
        const duration = document.createElement("code");
        number.textContent = String(index + 1).padStart(2, "0");
        title.textContent = scene.title;
        timing.textContent = `IN ${timecode(start)} · OUT ${timecode(end)}`;
        duration.textContent = durationLabel(scene.seconds);
        body.append(title, timing);
        item.append(number, body, duration);
        fragment.append(item);
        return { title: scene.title, start, end, duration: scene.seconds };
      });
      list.replaceChildren(fragment);
      const longestScene = parsed.reduce((best, scene) => scene.seconds > best.seconds ? scene : best, parsed[0]);
      count.textContent = String(parsed.length);
      total.textContent = timecode(totalSeconds);
      longest.textContent = `${longestScene.title} · ${durationLabel(longestScene.seconds)}`;
      state.textContent = "CUE READY";
      note.textContent = `${parsed.length} 个镜次 · 连续无间隙时间码`;
      copyPayload = rows.map((row, index) => `${String(index + 1).padStart(2, "0")} ${timecode(row.start)}–${timecode(row.end)} ${row.title} (${durationLabel(row.duration)})`).join("\n") + `\nTOTAL ${timecode(totalSeconds)}`;
      copyButton.disabled = false;
      copyStatus.textContent = "";
      output.dataset.ready = "true";
      ready = true;
      status.textContent = `已生成 ${parsed.length} 个连续镜次。`;
    });

    cueForm.addEventListener("reset", () => {
      window.setTimeout(() => {
        scenesInput.removeAttribute("aria-invalid");
        error.textContent = "";
        clearOutput();
        status.textContent = "镜次已清空。";
        scenesInput.focus();
      }, 0);
    });
    copyButton.addEventListener("click", async () => {
      const ok = await copyText(copyPayload);
      copyStatus.textContent = ok ? "提示单已复制。" : "复制失败，请手动选择清单。";
    });
  }

  const searchForm = document.querySelector("[data-reel-search]");
  if (searchForm) {
    const input = searchForm.querySelector("input");
    const result = document.querySelector("[data-reel-result]");
    const routes = [
      { words: ["来源", "入口", "范围", "证据", "调查", "文章"], title: "调查场刊", href: "article.html" },
      { words: ["时间码", "镜次", "时长", "提示", "工具"], title: "时间码提示单", href: "tool.html" },
      { words: ["披露", "更正", "利益", "声明", "联系"], title: "片尾声明", href: "legal.html" },
      { words: ["首页", "放映馆", "资料"], title: "资料放映馆", href: "index.html" }
    ];
    let searched = false;
    input.addEventListener("input", () => {
      if (!searched) return;
      searched = false;
      result.textContent = "检索词已改变，请重新检索放映表。";
    });
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.normalize("NFKC").trim().slice(0, 80);
      result.replaceChildren();
      searched = true;
      if (!query) {
        result.textContent = "请输入资料词，例如“来源”或“时间码”。";
        input.focus();
        return;
      }
      const route = routes.find((entry) => entry.words.some((word) => query.toLocaleLowerCase().includes(word)));
      if (!route) {
        result.append(document.createTextNode(`没有找到与“${query}”直接对应的场次。`));
        const link = document.createElement("a");
        link.href = "index.html";
        link.textContent = "返回放映馆";
        result.append(link);
        return;
      }
      result.append(document.createTextNode("最近场次："));
      const link = document.createElement("a");
      link.href = route.href;
      link.textContent = route.title;
      result.append(link);
    });
  }
})();
