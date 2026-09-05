(function () {
  "use strict";
  const by = (selector, root) => [...(root || document).querySelectorAll(selector)];
  const clear = (node) => { while (node && node.firstChild) node.firstChild.remove(); };
  let copyRevision = 0;
  async function copy(value, output) {
    const revision = ++copyRevision;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const field = document.createElement("textarea"); field.value = value; field.setAttribute("readonly", ""); field.style.position = "fixed"; field.style.opacity = "0"; document.body.append(field); field.select(); const okay = document.execCommand("copy"); field.remove(); if (!okay) throw new Error("copy unavailable");
      }
      if (output && revision === copyRevision) output.textContent = "已复制。";
    } catch (_error) { if (output && revision === copyRevision) output.textContent = "复制失败，请手动选择。"; }
  }
  function initBase() {
    if (!document.body.dataset.pj90Menu) document.body.dataset.pj90Menu = "closed";
    by("[data-pj90-proof-toggle]").forEach((button) => button.removeAttribute("disabled"));
    by("[data-pj90-copy-value]").forEach((button) => {
      button.removeAttribute("disabled");
      button.addEventListener("click", () => {
        const target = document.querySelector(button.dataset.pj90CopyValue);
        const output = document.querySelector(button.dataset.pj90CopyOutput || "");
        if (target) copy(target.textContent.trim(), output); else if (output) output.textContent = "未找到可复制内容。";
      });
    });
  }
  function initFilters() {
    by("[data-pj90-filter-set]").forEach((set) => {
      const scope = document.querySelector(set.dataset.pj90FilterSet), buttons = by("[data-pj90-filter]", set), output = set.querySelector("[data-pj90-filter-status]");
      if (!scope || !buttons.length) return;
      const cards = by("[data-pj90-folio]", scope);
      const apply = (value) => {
        let count = 0;
        cards.forEach((card) => { const visible = value === "all" || card.dataset.pj90Folio === value; card.hidden = !visible; if (visible) count += 1; });
        buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.pj90Filter === value)));
        if (output) output.textContent = `显示 ${count} 张印样`;
      };
      buttons.forEach((button) => button.addEventListener("click", () => apply(button.dataset.pj90Filter)));
      apply("all");
    });
  }
  function initSearch() {
    const form = document.querySelector("[data-pj90-safe-search]"); if (!form) return;
    const input = form.querySelector("input[type='search']"), output = form.querySelector("[data-pj90-safe-result]");
    const routes = [
      { href: "portrait-register.html", label: "人物内容总表", words: ["人物", "内容", "印样", "文章"] },
      { href: "studio-tools.html", label: "编辑室工具", words: ["工具", "匿名", "引语", "核对"] },
      { href: "relationship-disclosure.html", label: "关系与来源披露", words: ["披露", "关系", "合作", "来源"] },
      { href: "index.html", label: "肖像日志首页", words: ["首页", "日志", "目录", "返回"] }
    ];
    const show = (prefix, route) => { clear(output); output.append(document.createTextNode(prefix)); if (route) { const link = document.createElement("a"); link.href = route.href; link.textContent = route.label; output.append(link, document.createTextNode("。")); } };
    input.addEventListener("input", () => show("输入已更改，请重新查找。"));
    form.addEventListener("submit", (event) => { event.preventDefault(); const query = input.value.normalize("NFKC").trim(); if (!query) { show("请输入要寻找的主题。"); input.focus(); return; } if ([...query].length > 80) { show("搜索词不能超过 80 个 Unicode 字符。"); input.focus(); return; } const lower = query.toLocaleLowerCase(), route = routes.find((item) => item.words.some((word) => lower.includes(word))); show(route ? "最近的已知栏目：" : "没有完全匹配，建议返回", route || routes[3]); });
  }
  initBase(); initFilters(); initSearch();
})();
