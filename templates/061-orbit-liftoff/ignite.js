(() => {
  "use strict";

  const root = document.documentElement;
  const themeKey = "orbit-liftoff-061-theme";
  const themeButtons = [...document.querySelectorAll("[data-theme-toggle]")];
  const setTheme = (value) => {
    const theme = value === "light" ? "light" : "dark";
    root.dataset.theme = theme;
    themeButtons.forEach((button) => {
      button.textContent = theme === "dark" ? "LIGHT MODE" : "DARK MODE";
      button.setAttribute("aria-label", theme === "dark" ? "切换到浅色主题" : "切换到深色主题");
    });
  };

  let storedTheme = "dark";
  try { storedTheme = localStorage.getItem(themeKey) || "dark"; } catch (_) { storedTheme = "dark"; }
  setTheme(storedTheme);
  themeButtons.forEach((button) => button.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem(themeKey, next); } catch (_) { /* Theme still applies in memory. */ }
  }));

  const menuButton = document.querySelector(".ol61-menu-button");
  const menu = document.querySelector(".ol61-menu");
  const closeMenu = (restoreFocus = false) => {
    if (!menuButton || !menu) return;
    menu.classList.remove("ol61-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) menuButton.focus();
  };
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const willOpen = !menu.classList.contains("ol61-open");
      menu.classList.toggle("ol61-open", willOpen);
      menuButton.setAttribute("aria-expanded", String(willOpen));
      if (willOpen) {
        const firstLink = menu.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("ol61-open")) closeMenu(true);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) closeMenu(false);
    });
  }

  const copyText = async (text) => {
    if (!text) return false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) { /* Use the local fallback below. */ }
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

  const bindCopy = (buttonSelector, textSelector, statusSelector) => {
    const button = document.querySelector(buttonSelector);
    const source = document.querySelector(textSelector);
    const status = document.querySelector(statusSelector);
    if (!button || !source || !status) return;
    button.addEventListener("click", async () => {
      const ok = await copyText(source.textContent.trim());
      status.textContent = ok ? "已复制，可粘贴到任务记录。" : "复制失败，请手动选择文字。";
    });
  };
  bindCopy("[data-copy-handoff]", "[data-handoff-text]", "[data-copy-status]");
  bindCopy("[data-copy-disclosure]", "[data-disclosure-text]", "[data-disclosure-status]");

  const progress = document.querySelector("[data-reading-progress]");
  if (progress) {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const percent = available > 0 ? Math.min(100, Math.max(0, (window.scrollY / available) * 100)) : 100;
      progress.style.width = `${percent}%`;
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const sampler = document.querySelector("[data-sampler]");
  if (sampler) {
    const totalInput = sampler.elements.total;
    const sizeInput = sampler.elements.size;
    const seedInput = sampler.elements.seed;
    const report = document.querySelector(".ol61-report");
    const list = document.querySelector("[data-sample-list]");
    const state = document.querySelector("[data-report-state]");
    const coverage = document.querySelector("[data-coverage]");
    const minimum = document.querySelector("[data-min]");
    const maximum = document.querySelector("[data-max]");
    const checksum = document.querySelector("[data-checksum]");
    const note = document.querySelector("[data-report-note]");
    const formStatus = document.querySelector("[data-form-status]");
    const copyButton = document.querySelector("[data-copy-sample]");
    const copyStatus = document.querySelector("[data-sample-copy-status]");
    const errors = {
      total: document.querySelector('[data-error="total"]'),
      size: document.querySelector('[data-error="size"]'),
      seed: document.querySelector('[data-error="seed"]')
    };
    let currentOutput = "";
    let ready = false;

    const normalize = (value) => value.normalize("NFKC").trim();
    const parseInteger = (input, min, max, label) => {
      const value = normalize(input.value);
      if (!value) return { error: `请输入${label}。` };
      if (!/^(?:0|[1-9]\d*)$/.test(value)) return { error: `${label}只接受不含前导零的十进制整数。` };
      const number = Number(value);
      if (!Number.isSafeInteger(number) || number < min || number > max) return { error: `${label}必须在 ${min}–${max} 之间。` };
      return { number, value };
    };
    const parseSeed = () => {
      const value = normalize(seedInput.value);
      const count = Array.from(value).length;
      if (!value) return { error: "请输入固定种子。" };
      if (count > 32) return { error: "固定种子最多 32 个字符。" };
      if(/[\u0000-\u001f\u007f]/.test(value)) return { error: "固定种子不能包含控制字符。" };
      return { value };
    };
    const setError = (name, input, message) => {
      errors[name].textContent = message || "";
      if (message) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    };
    const hash = (value) => {
      let result = 2166136261;
      for (const character of value) {
        const point = character.codePointAt(0);
        result ^= point;
        result = Math.imul(result, 16777619);
        if (point > 65535) {
          result ^= point >>> 16;
          result = Math.imul(result, 16777619);
        }
      }
      return result >>> 0;
    };
    const randomFactory = (initial) => {
      let value = initial || 0x6d2b79f5;
      return () => {
        value ^= value << 13;
        value ^= value >>> 17;
        value ^= value << 5;
        return (value >>> 0) / 4294967296;
      };
    };
    const makeSample = (total, size, seed) => {
      const pool = Array.from({ length: total }, (_, index) => index + 1);
      const random = randomFactory(hash(`${seed}|${total}|${size}`));
      for (let index = 0; index < size; index += 1) {
        const target = index + Math.floor(random() * (total - index));
        const held = pool[index];
        pool[index] = pool[target];
        pool[target] = held;
      }
      return pool.slice(0, size).sort((a, b) => a - b);
    };
    const checksumFor = (values) => hash(values.join(",")).toString(16).toUpperCase().padStart(8, "0");
    const clearReport = (message = "相同参数会得到相同清单。") => {
      ready = false;
      currentOutput = "";
      report.removeAttribute("data-ready");
      state.textContent = "STANDBY";
      coverage.textContent = "—";
      minimum.textContent = "—";
      maximum.textContent = "—";
      checksum.textContent = "—";
      note.textContent = message;
      copyButton.disabled = true;
      copyStatus.textContent = "";
      const item = document.createElement("li");
      item.textContent = "生成后在这里显示索引。";
      list.replaceChildren(item);
    };
    const markStale = () => {
      if (!ready) return;
      clearReport("参数已改变，请重新生成样本。");
      state.textContent = "STALE";
      formStatus.textContent = "参数已改变，旧结果已失效。";
    };
    [totalInput, sizeInput, seedInput].forEach((input) => input.addEventListener("input", markStale));

    sampler.querySelectorAll("[data-preset]").forEach((button) => button.addEventListener("click", () => {
      const presets = { review: ["100", "10", "AUDIT-01"], full: ["7", "7", "FULL"], spot: ["10000", "1", "SPOT"] };
      const selected = presets[button.dataset.preset];
      if (!selected) return;
      totalInput.value = selected[0];
      sizeInput.value = selected[1];
      seedInput.value = selected[2];
      Object.entries(errors).forEach(([name, node]) => {
        node.textContent = "";
        sampler.elements[name].removeAttribute("aria-invalid");
      });
      markStale();
      formStatus.textContent = "预设已装载，点击生成复核样本。";
    }));

    sampler.addEventListener("submit", (event) => {
      event.preventDefault();
      const total = parseInteger(totalInput, 1, 10000, "总记录数");
      const size = parseInteger(sizeInput, 1, 500, "样本数");
      const seed = parseSeed();
      setError("total", totalInput, total.error);
      setError("size", sizeInput, size.error);
      setError("seed", seedInput, seed.error);
      if (!size.error && !total.error && size.number > total.number) {
        size.error = "样本数不能超过总记录数。";
        setError("size", sizeInput, size.error);
      }
      const firstInvalid = [totalInput, sizeInput, seedInput].find((input) => input.getAttribute("aria-invalid") === "true");
      if (firstInvalid) {
        clearReport("修正参数后再生成样本。");
        state.textContent = "CHECK INPUT";
        formStatus.textContent = "参数未通过检查。";
        firstInvalid.focus();
        return;
      }
      totalInput.value = total.value;
      sizeInput.value = size.value;
      seedInput.value = seed.value;
      const values = makeSample(total.number, size.number, seed.value);
      const code = checksumFor(values);
      const fragment = document.createDocumentFragment();
      values.forEach((value) => {
        const item = document.createElement("li");
        item.textContent = String(value);
        fragment.append(item);
      });
      list.replaceChildren(fragment);
      state.textContent = "SAMPLE READY";
      coverage.textContent = `${((size.number / total.number) * 100).toFixed(2)}%`;
      minimum.textContent = String(values[0]);
      maximum.textContent = String(values[values.length - 1]);
      checksum.textContent = code;
      note.textContent = `${size.number} 个唯一索引 · 种子 ${seed.value}`;
      currentOutput = `总记录数：${total.number}\n样本数：${size.number}\n固定种子：${seed.value}\n校验码：${code}\n索引：${values.join(", ")}`;
      copyButton.disabled = false;
      copyStatus.textContent = "";
      report.dataset.ready = "true";
      ready = true;
      formStatus.textContent = `已生成 ${size.number} 个无重复索引。`;
    });

    sampler.addEventListener("reset", () => {
      window.setTimeout(() => {
        Object.entries(errors).forEach(([name, node]) => {
          node.textContent = "";
          sampler.elements[name].removeAttribute("aria-invalid");
        });
        clearReport();
        formStatus.textContent = "参数已清空。";
        totalInput.focus();
      }, 0);
    });
    copyButton.addEventListener("click", async () => {
      const ok = await copyText(currentOutput);
      copyStatus.textContent = ok ? "抽样清单已复制。" : "复制失败，请手动选择清单。";
    });
  }

  const searchForm = document.querySelector("[data-mission-search]");
  if (searchForm) {
    const input = searchForm.querySelector("input");
    const result = document.querySelector("[data-mission-result]");
    const routes = [
      { words: ["来源", "规则", "范围", "核对", "文章"], title: "任务简报", href: "article.html" },
      { words: ["抽样", "样本", "种子", "记录", "工具"], title: "确定性抽样器", href: "tool.html" },
      { words: ["披露", "更正", "利益", "隐私", "责任"], title: "披露与更正", href: "legal.html" },
      { words: ["首页", "控制舱", "任务"], title: "任务控制舱", href: "index.html" }
    ];
    let searched = false;
    input.addEventListener("input", () => {
      if (!searched) return;
      searched = false;
      result.textContent = "关键词已改变，请重新定位航点。";
    });
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.normalize("NFKC").trim().slice(0, 80);
      result.replaceChildren();
      searched = true;
      if (!query) {
        result.textContent = "请输入任务词，例如“来源”或“抽样”。";
        input.focus();
        return;
      }
      const route = routes.find((entry) => entry.words.some((word) => query.includes(word)));
      if (!route) {
        const text = document.createTextNode(`没有找到与“${query}”直接对应的航点。`);
        const link = document.createElement("a");
        link.href = "index.html";
        link.textContent = "返回控制舱";
        result.append(text, link);
        return;
      }
      const text = document.createTextNode("最近航点：");
      const link = document.createElement("a");
      link.href = route.href;
      link.textContent = route.title;
      result.append(text, link);
    });
  }
})();
