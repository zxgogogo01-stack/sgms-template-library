(() => {
  "use strict";
  document.body.dataset.uc88Menu = "closed";
  document.querySelectorAll("[data-uc88-file-toggle]").forEach((button) => { button.disabled = false; });
  let copyRevision = 0;
  const copy = async (value, status, message) => {
    const revision = ++copyRevision;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.append(field);
        field.select();
        const okay = document.execCommand("copy");
        field.remove();
        if (!okay) throw new Error("copy unavailable");
      }
      if (status && revision === copyRevision) status.textContent = message;
    } catch (_error) {
      if (status && revision === copyRevision) status.textContent = "复制未完成，请手动选择文字。";
    }
  };
  document.querySelectorAll("[data-uc88-copy-code]").forEach((button) => {
    const scope = button.closest(".uc88-access-slip,.uc88-promo-card");
    const source = scope?.querySelector("[data-uc88-copy-source]");
    const status = scope?.querySelector("[data-uc88-copy-status]");
    if (!source) return;
    button.disabled = false;
    button.addEventListener("click", () => copy(source.textContent.trim(), status, "识别码已复制。"));
  });
  const filters = Array.from(document.querySelectorAll("[data-uc88-filter]"));
  const cards = Array.from(document.querySelectorAll("[data-uc88-desk]"));
  const filterStatus = document.querySelector("[data-uc88-filter-status]");
  filters.forEach((button) => {
    button.disabled = false;
    button.addEventListener("click", () => {
      const selected = button.dataset.uc88Filter;
      let shown = 0;
      filters.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
      cards.forEach((card) => {
        const visible = selected === "all" || card.dataset.uc88Desk === selected;
        card.hidden = !visible;
        if (visible) shown += 1;
      });
      if (filterStatus) filterStatus.textContent = `当前显示 ${shown} 份记录。`;
    });
  });
  const search = document.querySelector("[data-uc88-v2-search]");
  if (search) {
    const input = search.querySelector("#uc88-v2-query");
    const result = search.querySelector("[data-uc88-v2-search-result]");
    const routes = [
      { href: "case-register.html", label: "十二个内容档案位", words: ["内容", "档案", "文章", "来源"] },
      { href: "case-instruments.html", label: "五件本地案卷工具", words: ["工具", "盘点", "时间", "门槛"] },
      { href: "casebook-charter.html", label: "模板公开说明", words: ["说明", "边界", "披露", "隐私"] },
      { href: "index.html", label: "赭色案卷台", words: ["首页", "案卷", "入口"] }
    ];
    const clear = () => { while (result.firstChild) result.firstChild.remove(); };
    const show = (message, route) => {
      clear();
      result.append(document.createTextNode(message));
      if (route) {
        const link = document.createElement("a");
        link.href = route.href;
        link.textContent = route.label;
        result.append(link, document.createTextNode("。"));
      }
    };
    input.addEventListener("input", () => show("输入已更改，请重新检索本地目录。"));
    search.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.normalize("NFKC").trim();
      if (!query) { show("请输入主题，例如“来源”或“工具”。"); input.focus(); return; }
      if (Array.from(query).length > 80) { show("搜索词不能超过 80 个 Unicode 字符。"); input.focus(); return; }
      const lowered = query.toLocaleLowerCase();
      const route = routes.find((candidate) => candidate.words.some((word) => lowered.includes(word)));
      show(route ? "最近的本地档案是：" : "没有完全匹配；建议先返回", route || routes[3]);
    });
  }
})();
