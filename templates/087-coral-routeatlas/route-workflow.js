(() => {
  "use strict";
  document.body.dataset.ca87Menu = "closed";
  document.querySelectorAll("[data-ca87-palette-toggle]").forEach((button) => { button.disabled = false; });
  document.querySelectorAll("[data-ca87-copy-handoff],[data-ca87-copy-disclosure]").forEach((button) => { button.disabled = false; });
  let copyRevision = 0;
  const copy = async (value, status, success) => {
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
        if (!okay) throw new Error("copy");
      }
      if (status && revision === copyRevision) status.textContent = success;
    } catch (_error) {
      if (status && revision === copyRevision) status.textContent = "复制未完成，请手动选择文字。";
    }
  };
  document.querySelectorAll("[data-ca87-copy-code]").forEach((button) => {
    const scope = button.closest(".ca87-access-card,.ca87-promo");
    const source = scope?.querySelector("[data-ca87-copy-source]");
    const status = scope?.querySelector("[data-ca87-copy-status]");
    if (!source) return;
    button.disabled = false;
    button.addEventListener("click", () => copy(source.textContent.trim(), status, "路线标记已复制。"));
  });
  const filters = Array.from(document.querySelectorAll("[data-ca87-filter]"));
  const cards = Array.from(document.querySelectorAll("[data-ca87-sheet]"));
  const filterStatus = document.querySelector("[data-ca87-filter-status]");
  filters.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.ca87Filter;
    let shown = 0;
    filters.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
    cards.forEach((card) => {
      const visible = filter === "all" || card.dataset.ca87Sheet === filter;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (filterStatus) filterStatus.textContent = `当前显示 ${shown} 篇笔记。`;
  }));
  const search = document.querySelector("[data-ca87-route-search]");
  if (search) {
    const input = search.querySelector("#ca87-query");
    const result = search.querySelector("[data-ca87-search-result]");
    const routes = [
      { href: "route-register.html", label: "十二篇路线笔记", words: ["路线", "笔记", "来源", "分岔", "偏航"] },
      { href: "map-instruments.html", label: "五件测绘仪表", words: ["仪表", "工具", "坐标", "时刻", "容量"] },
      { href: "atlas-charter.html", label: "公开图例", words: ["图例", "边界", "披露", "更正", "隐私"] },
      { href: "index.html", label: "珊瑚路线图谱", words: ["首页", "地图", "图谱", "航线"] }
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
    input.addEventListener("input", () => show("输入已更改，按“定位最近坐标”重新搜索。"));
    search.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.normalize("NFKC").trim();
      if (!query) { show("请输入主题，例如“来源”或“仪表”。"); input.focus(); return; }
      if (Array.from(query).length > 80) { show("搜索词不能超过 80 个 Unicode 字符。"); input.focus(); return; }
      const lowered = query.toLocaleLowerCase();
      const route = routes.find((candidate) => candidate.words.some((word) => lowered.includes(word)));
      show(route ? "最近的本地坐标是：" : "没有完全匹配；建议先返回", route || routes[3]);
    });
  }
})();
