(function () {
  "use strict";

  const by = (selector, root) => [...(root || document).querySelectorAll(selector)];
  const clear = (node) => { while (node && node.firstChild) node.firstChild.remove(); };
  const codepoints = (value) => [...value].length;
  let copyRevision = 0;

  async function copyText(value, output, success) {
    const revision = ++copyRevision;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.append(field);
        field.select();
        const ok = document.execCommand("copy");
        field.remove();
        if (!ok) throw new Error("copy unavailable");
      }
      if (output && revision === copyRevision) output.textContent = success;
    } catch (_error) {
      if (output && revision === copyRevision) output.textContent = "复制失败，请手动选择。";
    }
  }

  function initSignals() {
    if (!document.body.dataset.sa89Menu) document.body.dataset.sa89Menu = "closed";
    by("[data-sa89-signal-toggle]").forEach((button) => button.removeAttribute("disabled"));
  }

  function initCopies() {
    by("[data-sa89-copy-value]").forEach((button) => {
      button.removeAttribute("disabled");
      button.addEventListener("click", () => {
        const target = document.querySelector(button.dataset.sa89CopyValue);
        const output = document.querySelector(button.dataset.sa89CopyOutput || "");
        if (!target) {
          if (output) output.textContent = "未找到可复制内容。";
          return;
        }
        copyText(target.textContent.trim(), output, "已复制。\n");
      });
    });
  }

  function initFilters() {
    by("[data-sa89-filter-set]").forEach((set) => {
      const buttons = by("[data-sa89-filter]", set);
      const scope = document.querySelector(set.dataset.sa89FilterSet);
      const output = set.querySelector("[data-sa89-filter-status]");
      if (!scope || !buttons.length) return;
      const cards = by("[data-sa89-channel]", scope);
      const apply = (key) => {
        let shown = 0;
        cards.forEach((card) => {
          const visible = key === "all" || card.dataset.sa89Channel === key;
          card.hidden = !visible;
          if (visible) shown += 1;
        });
        buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.sa89Filter === key)));
        if (output) output.textContent = `显示 ${shown} 条线路`;
      };
      buttons.forEach((button) => button.addEventListener("click", () => apply(button.dataset.sa89Filter)));
      apply("all");
    });
  }

  function initSafeSearch() {
    const form = document.querySelector("[data-sa89-safe-search]");
    if (!form) return;
    const input = form.querySelector("input[type='search']");
    const result = form.querySelector("[data-sa89-safe-result]");
    const routes = [
      { href: "answer-register.html", label: "回答线路总表", words: ["回答", "文章", "线路", "问题"] },
      { href: "operator-tools.html", label: "操作台工具", words: ["工具", "检测", "字段", "去重"] },
      { href: "source-disclosure.html", label: "关系与来源披露", words: ["披露", "关系", "来源", "合作"] },
      { href: "index.html", label: "问答交换台", words: ["首页", "交换台", "目录", "返回"] }
    ];
    const show = (prefix, route) => {
      clear(result);
      result.append(document.createTextNode(prefix));
      if (route) {
        const link = document.createElement("a");
        link.href = route.href;
        link.textContent = route.label;
        result.append(link, document.createTextNode("。"));
      }
    };
    input.addEventListener("input", () => show("输入已更改，请重新接线。"));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.normalize("NFKC").trim();
      if (!query) {
        show("请输入要寻找的主题。");
        input.focus();
        return;
      }
      if (codepoints(query) > 80) {
        show("搜索词不能超过 80 个 Unicode 字符。");
        input.focus();
        return;
      }
      const lower = query.toLocaleLowerCase();
      const route = routes.find((item) => item.words.some((word) => lower.includes(word)));
      show(route ? "最近的已知线路：" : "没有完全匹配，建议返回", route || routes[3]);
    });
  }

  initSignals();
  initCopies();
  initFilters();
  initSafeSearch();
})();
