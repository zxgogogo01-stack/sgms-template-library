(() => {
  "use strict";

  const root = document.documentElement;
  const finishToggle = document.querySelector("[data-finish-toggle]");
  const finishKey = "rust-manual-072-finish";

  function setFinish(value) {
    const finish = value === "carbon" ? "carbon" : "paper";
    root.dataset.finish = finish;
    if (finishToggle) {
      finishToggle.textContent = finish === "carbon" ? "纸页" : "碳页";
      finishToggle.setAttribute("aria-label", finish === "carbon" ? "切换到纸张主题" : "切换到碳纸主题");
    }
  }

  try {
    setFinish(localStorage.getItem(finishKey) || "paper");
  } catch (error) {
    setFinish("paper");
  }

  finishToggle?.addEventListener("click", () => {
    const next = root.dataset.finish === "carbon" ? "paper" : "carbon";
    setFinish(next);
    try {
      localStorage.setItem(finishKey, next);
    } catch (error) {
      // The theme still works when storage is unavailable.
    }
  });

  const menuButton = document.querySelector(".rm72-menu-button");
  const menu = document.querySelector("#rm72-menu");

  function closeMenu(returnFocus = false) {
    if (!menuButton || !menu) return;
    menu.classList.remove("rm72-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (returnFocus) menuButton.focus();
  }

  menuButton?.addEventListener("click", () => {
    const open = !menu.classList.contains("rm72-open");
    menu.classList.toggle("rm72-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    if (open) menu.querySelector("a,button")?.focus();
  });
  menu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.classList.contains("rm72-open")) closeMenu(true);
  });
  addEventListener("resize", () => {
    if (innerWidth > 960) closeMenu();
  });

  async function copyText(value) {
    if (navigator.clipboard && isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const area = document.createElement("textarea");
    area.value = value;
    area.readOnly = true;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    if (!copied) throw new Error("copy unavailable");
  }

  function bindCopy(buttonSelector, sourceSelector, statusSelector) {
    const button = document.querySelector(buttonSelector);
    const source = document.querySelector(sourceSelector);
    const status = document.querySelector(statusSelector);
    button?.addEventListener("click", async () => {
      try {
        await copyText(source.textContent.trim());
        status.textContent = "已复制，请按真实作业补齐。";
      } catch (error) {
        status.textContent = "浏览器未允许复制，请手动选择文字。";
      }
    });
  }

  bindCopy("[data-copy-handoff]", "[data-handoff-text]", "[data-handoff-status]");
  bindCopy("[data-copy-disclosure]", "[data-disclosure-text]", "[data-disclosure-status]");

  const progress = document.querySelector("[data-reading-progress]");
  if (progress) {
    const update = () => {
      const available = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = `${available > 0 ? Math.min(100, Math.max(0, scrollY / available * 100)) : 100}%`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
  }

  const dependencyForm = document.querySelector("[data-dependency-form]");
  if (dependencyForm) {
    const input = dependencyForm.querySelector("#rm72-steps");
    const error = dependencyForm.querySelector("[data-dependency-error]");
    const status = dependencyForm.querySelector("[data-dependency-status]");
    const report = document.querySelector(".rm72-dependency-report");
    const state = report.querySelector("[data-dependency-state]");
    const stepCount = report.querySelector("[data-step-count]");
    const edgeCount = report.querySelector("[data-edge-count]");
    const rootCount = report.querySelector("[data-root-count]");
    const levelCount = report.querySelector("[data-level-count]");
    const list = report.querySelector("[data-dependency-list]");
    const note = report.querySelector("[data-dependency-note]");
    const copyButton = report.querySelector("[data-copy-dependency-report]");
    const copyStatus = report.querySelector("[data-dependency-copy-status]");
    let latest = "";

    const presets = {
      linear: "PREP | - | 准备材料\nCHECK | PREP | 核对输入\nPUBLISH | CHECK | 发布并记录\nARCHIVE | PUBLISH | 保存证据",
      parallel: "SOURCE | - | 收集直接来源\nSCOPE | - | 确认适用范围\nDRAFT | SOURCE,SCOPE | 编写作业页\nREVIEW | DRAFT | 复核动作与证据\nLEGAL | DRAFT | 复核利益与边界\nPUBLISH | REVIEW,LEGAL | 发布并记录版本",
      cycle: "A | C | 准备\nB | A | 执行\nC | B | 复核"
    };

    function placeholder(value = "校验后显示前 20 个步骤与所在层级。") {
      const item = document.createElement("li");
      item.textContent = value;
      list.replaceChildren(item);
    }

    function zero() {
      stepCount.textContent = "0";
      edgeCount.textContent = "0";
      rootCount.textContent = "0";
      levelCount.textContent = "0";
    }

    function fail(message) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = message;
      status.textContent = "未生成层级，请修正输入。";
      report.dataset.ready = "false";
      state.textContent = "BLOCKED";
      zero();
      placeholder("依赖图被阻断，修正后重新校验。");
      note.textContent = "拓扑层级只描述编号关系，不代表真实操作安全。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latest = "";
    }

    function stale() {
      if (report.dataset.ready !== "true") return;
      report.dataset.ready = "false";
      state.textContent = "STALE";
      status.textContent = "步骤清单已变化，请重新校验。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latest = "";
    }

    input.addEventListener("input", stale);

    dependencyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = input.value.replace(/\r\n?/g, "\n");
      const inputLength = Array.from(text).length;
      input.removeAttribute("aria-invalid");
      error.textContent = "";

      if (!text.trim()) {
        fail("请先输入至少一个步骤。");
        input.focus();
        return;
      }
      if (inputLength > 10000) {
        fail(`输入共 ${inputLength} 个字符，最多允许 10000 个。`);
        input.focus();
        return;
      }

      const lines = text.split("\n").map((value, index) => ({ value: value.trim(), line: index + 1 })).filter((line) => line.value);
      if (lines.length > 100) {
        fail(`检测到 ${lines.length} 个步骤，最多允许 100 个。`);
        input.focus();
        return;
      }

      const nodes = [];
      const nodeMap = new Map();
      const idRule = /^[A-Z][A-Z0-9-]{0,15}$/;

      for (const line of lines) {
        const normalized = line.value.normalize("NFKC");
        const parts = normalized.split("|");
        if (parts.length !== 3) {
          fail(`第 ${line.line} 行必须且只能包含两个竖线分隔符。`);
          input.focus();
          return;
        }

        const id = parts[0].trim().toLocaleUpperCase();
        const dependencyText = parts[1].trim();
        const title = parts[2].replace(/\s+/g, " ").trim();

        if (!idRule.test(id)) {
          fail(`第 ${line.line} 行 ID 无效；请以字母开头，只用字母、数字、短横线，最多 16 个字符。`);
          input.focus();
          return;
        }
        if (nodeMap.has(id)) {
          fail(`第 ${line.line} 行 ID “${id}” 与第 ${nodeMap.get(id).line} 行重复。`);
          input.focus();
          return;
        }
        if (!title) {
          fail(`第 ${line.line} 行缺少步骤标题。`);
          input.focus();
          return;
        }
        if (Array.from(title).length > 100) {
          fail(`第 ${line.line} 行标题超过 100 个字符。`);
          input.focus();
          return;
        }

        let dependencies = [];
        if (dependencyText !== "-") {
          dependencies = dependencyText.split(",").map((value) => value.trim().toLocaleUpperCase());
          if (!dependencyText || dependencies.some((value) => !value)) {
            fail(`第 ${line.line} 行依赖列为空或含空依赖；根步骤请写“-”。`);
            input.focus();
            return;
          }
          if (dependencies.length > 10) {
            fail(`第 ${line.line} 行超过 10 个依赖。`);
            input.focus();
            return;
          }
          const invalid = dependencies.find((value) => !idRule.test(value));
          if (invalid) {
            fail(`第 ${line.line} 行依赖 ID “${invalid}” 无效。`);
            input.focus();
            return;
          }
          if (new Set(dependencies).size !== dependencies.length) {
            fail(`第 ${line.line} 行包含重复依赖。`);
            input.focus();
            return;
          }
          if (dependencies.includes(id)) {
            fail(`第 ${line.line} 行步骤 “${id}” 不能依赖自身。`);
            input.focus();
            return;
          }
        }

        const node = { id, dependencies, title, line: line.line, order: nodes.length };
        nodes.push(node);
        nodeMap.set(id, node);
      }

      const missing = [];
      for (const node of nodes) {
        for (const dependency of node.dependencies) {
          if (!nodeMap.has(dependency)) missing.push(`${node.id} → ${dependency}`);
        }
      }
      if (missing.length) {
        fail(`存在缺失依赖：${missing.slice(0, 6).join("、")}${missing.length > 6 ? " 等" : ""}。`);
        input.focus();
        return;
      }

      const indegree = new Map(nodes.map((node) => [node.id, node.dependencies.length]));
      const dependents = new Map(nodes.map((node) => [node.id, []]));
      for (const node of nodes) {
        for (const dependency of node.dependencies) dependents.get(dependency).push(node.id);
      }

      const levels = [];
      let frontier = nodes.filter((node) => indegree.get(node.id) === 0).map((node) => node.id);
      let processed = 0;
      while (frontier.length) {
        frontier.sort((left, right) => nodeMap.get(left).order - nodeMap.get(right).order);
        const current = [...frontier];
        levels.push(current);
        processed += current.length;
        const next = [];
        for (const id of current) {
          for (const dependent of dependents.get(id)) {
            const remaining = indegree.get(dependent) - 1;
            indegree.set(dependent, remaining);
            if (remaining === 0) next.push(dependent);
          }
        }
        frontier = next;
      }

      if (processed !== nodes.length) {
        const blocked = nodes.filter((node) => indegree.get(node.id) > 0).map((node) => node.id);
        fail(`检测到循环依赖或受环路阻塞的步骤：${blocked.slice(0, 8).join("、")}${blocked.length > 8 ? " 等" : ""}。`);
        input.focus();
        return;
      }

      const roots = nodes.filter((node) => node.dependencies.length === 0).length;
      const edges = nodes.reduce((sum, node) => sum + node.dependencies.length, 0);
      const ordered = [];
      levels.forEach((ids, levelIndex) => ids.forEach((id) => ordered.push({ node: nodeMap.get(id), level: levelIndex + 1 })));

      stepCount.textContent = String(nodes.length);
      edgeCount.textContent = String(edges);
      rootCount.textContent = String(roots);
      levelCount.textContent = String(levels.length);
      list.replaceChildren();
      ordered.slice(0, 20).forEach(({ node, level }) => {
        const item = document.createElement("li");
        const levelLabel = document.createElement("b");
        const body = document.createElement("span");
        const idLabel = document.createTextNode(node.id);
        const title = document.createElement("small");
        const dependencies = document.createElement("em");
        levelLabel.textContent = `L${level}`;
        title.textContent = node.title;
        dependencies.textContent = node.dependencies.length ? node.dependencies.join(", ") : "ROOT";
        body.append(idLabel, title);
        item.append(levelLabel, body, dependencies);
        list.append(item);
      });

      note.textContent = `依赖图有效：${nodes.length} 个步骤分布在 ${levels.length} 个执行层；同层步骤仅表示编号图上可并列。`;
      latest = [
        "步骤依赖层级报告",
        `步骤：${nodes.length}`,
        `关系：${edges}`,
        `根步骤：${roots}`,
        `层级：${levels.length}`,
        ...ordered.slice(0, 20).map(({ node, level }) => `L${level} · ${node.id} · ${node.title} · ${node.dependencies.length ? node.dependencies.join(", ") : "ROOT"}`),
        "说明：编号图有效不代表真实操作安全、合规、有权限或能够成功。"
      ].join("\n");
      report.dataset.ready = "true";
      state.textContent = "VALID";
      status.textContent = `校验通过：${nodes.length} 个步骤形成 ${levels.length} 个执行层。`;
      copyButton.disabled = false;
      copyStatus.textContent = "";
    });

    dependencyForm.querySelectorAll("[data-dependency-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        const hadReady = report.dataset.ready === "true";
        input.value = presets[button.dataset.dependencyPreset];
        input.removeAttribute("aria-invalid");
        error.textContent = "";
        if (hadReady) {
          stale();
        } else {
          report.dataset.ready = "false";
          state.textContent = "LOADED";
          zero();
          placeholder();
          note.textContent = "拓扑层级只描述编号关系，不代表真实操作安全。";
          copyButton.disabled = true;
          copyStatus.textContent = "";
          latest = "";
        }
        status.textContent = "样例已装载，点击校验生成层级。";
        input.focus();
      });
    });

    copyButton.addEventListener("click", async () => {
      if (!latest) return;
      try {
        await copyText(latest);
        copyStatus.textContent = "层级报告已复制。";
      } catch (error) {
        copyStatus.textContent = "浏览器未允许复制。";
      }
    });

    dependencyForm.addEventListener("reset", () => setTimeout(() => {
      input.removeAttribute("aria-invalid");
      error.textContent = "";
      status.textContent = "等待输入步骤清单。";
      report.dataset.ready = "false";
      state.textContent = "STANDBY";
      zero();
      placeholder();
      note.textContent = "拓扑层级只描述编号关系，不代表真实操作安全。";
      copyButton.disabled = true;
      copyStatus.textContent = "";
      latest = "";
    }, 0));
  }

  const search = document.querySelector("[data-manual-search]");
  if (search) {
    const query = search.querySelector("input");
    const output = search.querySelector("[data-manual-result]");
    const routes = [
      { href: "article.html", label: "可复核作业页", words: ["作业", "步骤", "证据", "操作"] },
      { href: "tool.html", label: "步骤依赖校验台", words: ["依赖", "编号", "环路", "校验"] },
      { href: "legal.html", label: "安全牌与内容边界", words: ["安全", "披露", "边界", "更正"] },
      { href: "index.html", label: "总装图", words: ["首页", "总装", "手册", "原则"] }
    ];

    search.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = query.value.trim();
      if (!value) {
        output.textContent = "请输入一个手册部件词。";
        query.focus();
        return;
      }
      const normalized = value.normalize("NFKC").toLocaleLowerCase();
      const found = routes.find((route) => route.words.some((word) => normalized.includes(word)));
      const route = found || routes[3];
      const link = document.createElement("a");
      link.href = route.href;
      link.textContent = route.label;
      output.replaceChildren(document.createTextNode(found ? "最近的手册页：" : "未找到精确部件，建议先返回"), link, document.createTextNode("。"));
    });

    query.addEventListener("input", () => {
      output.textContent = "检索词已变化，提交后重新查找。";
    });
  }
})();
