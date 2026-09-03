(function () {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-button]');
  const key = 'canvas-chronicle-049-theme';
  function setTheme(theme) {
    root.dataset.theme = theme;
    if (!themeButton) return;
    themeButton.textContent = theme === 'dark' ? '日间' : '夜间';
    themeButton.setAttribute('aria-label', theme === 'dark' ? '切换到日间模式' : '切换到夜间模式');
  }
  let theme = 'light';
  try { theme = localStorage.getItem(key) === 'dark' ? 'dark' : 'light'; } catch (_) { /* Storage is optional. */ }
  setTheme(theme);
  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem(key, next); } catch (_) { /* Keep the current-page theme. */ }
  });
  const menu = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-site-nav]');
  function toggleMenu(open) {
    if (!menu || !nav) return;
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? '收起' : '目录';
    nav.dataset.open = String(open);
  }
  menu?.addEventListener('click', () => toggleMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', event => { if (event.target.closest('a')) toggleMenu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { toggleMenu(false); menu.focus(); }
  });
  document.querySelector('[data-copy-invite]')?.addEventListener('click', async () => {
    const status = document.querySelector('[data-copy-status]');
    const code = document.querySelector('[data-invite-code]');
    try { await navigator.clipboard.writeText(code.textContent.trim()); status.textContent = '识别码已复制'; }
    catch (_) { status.textContent = '暂时无法复制，请手动选择识别码。'; }
  });
  const search = document.querySelector('[data-record-search]');
  const filters = [...document.querySelectorAll('[data-record-filter]')];
  const records = [...document.querySelectorAll('[data-record]')];
  const status = document.querySelector('[data-record-status]');
  const empty = document.querySelector('[data-record-empty]');
  let category = 'all';
  const normalize = text => String(text).normalize('NFKC').trim().toLowerCase();
  function filterRecords() {
    const query = normalize(search?.value || '');
    let count = 0;
    records.forEach(record => {
      record.hidden = !(category === 'all' || record.dataset.category === category) || !normalize(record.dataset.search + ' ' + record.textContent).includes(query);
      if (!record.hidden) count++;
    });
    if (status) status.textContent = count + ' / ' + records.length + ' 条';
    if (empty) empty.hidden = count !== 0;
  }
  search?.addEventListener('input', filterRecords);
  filters.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.recordFilter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filterRecords();
  }));
  filterRecords();
  const finder = document.querySelector('[data-archive-finder]');
  if (finder) {
    const field = finder.elements.query;
    const feedback = document.querySelector('[data-finder-status]');
    const list = document.querySelector('[data-finder-results]');
    const routes = [
      ['编年索引', 'chronicle.html', '记录文章时间索引'],
      ['时点刻度', 'bands/instants.html', '时点分类'],
      ['时间工作台', 'workbench.html', '工具工作台区间偏移序号'],
      ['隐私说明', 'privacy.html', '隐私数据本地处理']
    ];
    finder.addEventListener('submit', event => {
      event.preventDefault();
      list.replaceChildren();
      const query = normalize(field.value);
      if (!query) { feedback.textContent = '请输入要查找的主题。'; field.focus(); return; }
      const found = routes.filter(route => normalize(route[0] + route[2]).includes(query));
      feedback.textContent = found.length ? '找到 ' + found.length + ' 个入口。' : '未找到匹配入口，可以使用下方栏目导航。';
      found.forEach(([label, href]) => {
        const li = document.createElement('li'); const a = document.createElement('a');
        a.href = href; a.textContent = label; li.append(a); list.append(li);
      });
    });
    field.addEventListener('input', () => { feedback.textContent = ''; list.replaceChildren(); });
  }
}());
