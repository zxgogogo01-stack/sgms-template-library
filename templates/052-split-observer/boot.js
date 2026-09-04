(() => {
  'use strict';
  const doc = document.documentElement;
  doc.classList.remove('so52-nojs');
  const themeKey = 'split-observer-052-theme';
  const themeButton = document.getElementById('so52-theme-button');
  function setTheme(theme) {
    doc.dataset.theme = theme;
    if (themeButton) {
      themeButton.textContent = theme === 'dark' ? '日间' : '夜间';
      themeButton.setAttribute('aria-label', theme === 'dark' ? '切换到日间模式' : '切换到夜间模式');
    }
  }
  let saved;
  try { saved = localStorage.getItem(themeKey); } catch { /* Storage is optional. */ }
  setTheme(['light', 'dark'].includes(saved) ? saved : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  themeButton?.addEventListener('click', () => {
    const theme = doc.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem(themeKey, theme); } catch { /* Keep this page usable without storage. */ }
  });
  const menu = document.getElementById('so52-mast-nav');
  const menuButton = document.getElementById('so52-mast-btn');
  function closeMenu(focus) {
    menu?.classList.remove('so52-ajar');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (focus) menuButton?.focus();
  }
  menuButton?.addEventListener('click', () => {
    const opened = menu.classList.toggle('so52-ajar');
    menuButton.setAttribute('aria-expanded', String(opened));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.classList.contains('so52-ajar')) closeMenu(true);
  });
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu(false)));
  matchMedia('(min-width: 621px)').addEventListener('change', event => { if (event.matches) closeMenu(false); });
  const codeButton = document.querySelector('[data-copy-code]');
  codeButton?.addEventListener('click', async () => {
    const state = document.querySelector('[data-code-state]');
    const value = document.getElementById('so52-code').textContent.trim();
    codeButton.disabled = true;
    state.textContent = '';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      state.textContent = '邀请码已复制。';
    } catch { state.textContent = '复制未获许可，请选中邀请码手动复制。'; }
    finally { codeButton.disabled = false; }
  });
  document.querySelectorAll('[data-js-controls]').forEach(e => { e.hidden = false; });
  const filters = document.querySelectorAll('[data-collection-filter]');
  filters.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.collectionFilter;
    let count = 0;
    document.querySelectorAll('[data-observation]').forEach(row => {
      row.hidden = key !== 'all' && row.dataset.collection !== key;
      if (!row.hidden) count++;
    });
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    document.querySelector('[data-filter-state]').textContent = '显示 ' + count + ' 条观察。';
  }));
  const search = document.querySelector('[data-local-search]');
  if (search) {
    search.hidden = false;
    search.addEventListener('submit', event => {
      event.preventDefault();
      const query = search.elements.query.value.trim().normalize('NFKC').toLocaleLowerCase();
      let count = 0;
      document.querySelectorAll('[data-search-item]').forEach(item => {
        item.hidden = !item.textContent.normalize('NFKC').toLocaleLowerCase().includes(query);
        if (!item.hidden) count++;
      });
      search.querySelector('[data-search-state]').textContent = count ? '找到 ' + count + ' 个目录入口。' : '没有匹配项。请调整关键词，或清空后查看全部。';
    });
    search.addEventListener('input', () => {
      document.querySelectorAll('[data-search-item]').forEach(item => { item.hidden = false; });
      search.querySelector('[data-search-state]').textContent = '关键词已变更，请重新查找。';
    });
  }
})();
