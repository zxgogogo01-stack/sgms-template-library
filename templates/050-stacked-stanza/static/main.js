(function () {
  'use strict';
  const root = document.documentElement, themeButton = document.querySelector('[data-theme-button]');
  const storageKey = 'stacked-stanza-050-theme';
  function setTheme(theme) {
    root.dataset.theme = theme;
    if (!themeButton) return;
    themeButton.textContent = theme === 'dark' ? '日间' : '夜间';
    themeButton.setAttribute('aria-label', theme === 'dark' ? '切换到日间模式' : '切换到夜间模式');
  }
  let saved = 'light';
  try { saved = localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light'; } catch (_) { /* Reading does not require storage. */ }
  setTheme(saved);
  themeButton?.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; setTheme(theme);
    try { localStorage.setItem(storageKey, theme); } catch (_) { /* Keep the in-page selection. */ }
  });
  const menuButton = document.querySelector('[data-menu-button]'), nav = document.querySelector('[data-site-nav]');
  function menu(open) {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', String(open)); menuButton.textContent = open ? '收起' : '目录'; nav.dataset.open = String(open);
  }
  menuButton?.addEventListener('click', () => menu(menuButton.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', event => { if (event.target.closest('a')) menu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') { menu(false); menuButton.focus(); }
  });
  document.querySelector('[data-copy-invite]')?.addEventListener('click', async () => {
    const status = document.querySelector('[data-invite-status]');
    try { await navigator.clipboard.writeText(document.querySelector('[data-invite-code]').textContent.trim()); status.textContent = '识别码已复制'; }
    catch (_) { status.textContent = '暂时无法复制，请手动选择识别码。'; }
  });
  const search = document.querySelector('[data-guide-search]'), buttons = [...document.querySelectorAll('[data-guide-filter]')];
  const leaves = [...document.querySelectorAll('[data-guide]')], count = document.querySelector('[data-guide-status]'), empty = document.querySelector('[data-guide-empty]');
  const normalize = value => String(value).normalize('NFKC').trim().toLowerCase();
  let topic = 'all';
  function filter() {
    const query = normalize(search?.value || ''); let matches = 0;
    for (const leaf of leaves) {
      leaf.hidden = !(topic === 'all' || leaf.dataset.topic === topic) || !normalize(leaf.dataset.search + ' ' + leaf.textContent).includes(query);
      if (!leaf.hidden) matches++;
    }
    if (count) count.textContent = matches + ' / ' + leaves.length;
    if (empty) empty.hidden = matches !== 0;
  }
  document.querySelector('[data-catalog-filter]')?.addEventListener('submit', event => { event.preventDefault(); filter(); });
  search?.addEventListener('input', filter);
  buttons.forEach(button => button.addEventListener('click', () => {
    topic = button.dataset.guideFilter;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button))); filter();
  }));
  filter();
  const finder = document.querySelector('[data-leaf-finder]');
  if (finder) {
    const field = finder.elements.query, feedback = document.querySelector('[data-finder-status]'), results = document.querySelector('[data-finder-results]');
    const routes = [['书笺目录','leaves.html','文章书笺阅读目录'],['首折探索','shelves/first-fold.html','主题分类书架'],['排版工作桌','desk.html','工具排版配页分栏断行'],['隐私说明','privacy.html','隐私数据本地']];
    field.addEventListener('input', () => { feedback.textContent = ''; results.replaceChildren(); });
    finder.addEventListener('submit', event => {
      event.preventDefault(); results.replaceChildren(); const query = normalize(field.value);
      if (!query) { feedback.textContent = '请输入要查找的内容。'; field.focus(); return; }
      const found = routes.filter(route => normalize(route[0] + route[2]).includes(query));
      feedback.textContent = found.length ? '找到 ' + found.length + ' 个入口。' : '没有匹配入口，请使用下方栏目导航。';
      found.forEach(([label,href]) => { const li = document.createElement('li'), a = document.createElement('a'); a.href = href; a.textContent = label; li.append(a); results.append(li); });
    });
  }
}());
