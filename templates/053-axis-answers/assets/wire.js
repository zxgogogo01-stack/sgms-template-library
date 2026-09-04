(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.remove('aa53-nojs');
  const themeButton = document.getElementById('aa53-theme-button');
  const themeKey = 'axis-answers-053-theme';
  function theme(value) {
    root.dataset.theme = value;
    themeButton.textContent = value === 'dark' ? '日间' : '夜间';
    themeButton.setAttribute('aria-label', value === 'dark' ? '切换到日间模式' : '切换到夜间模式');
  }
  let saved;
  try { saved = localStorage.getItem(themeKey); } catch { /* Optional storage. */ }
  theme(['light', 'dark'].includes(saved) ? saved : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  themeButton.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    theme(next);
    try { localStorage.setItem(themeKey, next); } catch { /* This page still works without storage. */ }
  });
  const nav = document.getElementById('aa53-spine-nav');
  const menu = document.getElementById('aa53-spine-btn');
  function close(restore) { nav.classList.remove('aa53-agape'); menu.setAttribute('aria-expanded', 'false'); if (restore) menu.focus(); }
  menu.addEventListener('click', () => {
    const opened = nav.classList.toggle('aa53-agape');
    menu.setAttribute('aria-expanded', String(opened));
    if (opened) nav.querySelector('a')?.focus();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('aa53-agape')) close(true); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => close(false)));
  matchMedia('(min-width: 621px)').addEventListener('change', e => { if (e.matches) close(false); });
  const codeButton = document.querySelector('[data-copy-code]');
  codeButton?.addEventListener('click', async () => {
    const state = document.querySelector('[data-code-state]');
    codeButton.disabled = true;
    state.textContent = '';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Unavailable');
      await navigator.clipboard.writeText(document.getElementById('aa53-code').textContent.trim());
      state.textContent = '邀请码已复制。';
    } catch { state.textContent = '复制未获许可，请选中邀请码手动复制。'; }
    finally { codeButton.disabled = false; }
  });
  document.querySelectorAll('[data-js-controls]').forEach(e => { e.hidden = false; });
  const filters = document.querySelectorAll('[data-strand-filter]');
  filters.forEach(button => button.addEventListener('click', () => {
    let count = 0;
    document.querySelectorAll('[data-question]').forEach(item => {
      item.hidden = button.dataset.strandFilter !== 'all' && item.dataset.strand !== button.dataset.strandFilter;
      if (!item.hidden) count++;
    });
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    document.querySelector('[data-filter-state]').textContent = '沿当前线索找到 ' + count + ' 个问题。';
  }));
  const search = document.querySelector('[data-local-search]');
  if (search) {
    search.hidden = false;
    search.addEventListener('submit', e => {
      e.preventDefault();
      const query = search.elements.query.value.normalize('NFKC').trim().toLocaleLowerCase();
      let count = 0;
      document.querySelectorAll('[data-search-item]').forEach(item => { item.hidden = !item.textContent.normalize('NFKC').toLocaleLowerCase().includes(query); if (!item.hidden) count++; });
      search.querySelector('[data-search-state]').textContent = count ? '找到 ' + count + ' 个入口。' : '没有匹配项。换一个关键词，或清空后查看全部。';
    });
    search.addEventListener('input', () => {
      document.querySelectorAll('[data-search-item]').forEach(e => { e.hidden = false; });
      search.querySelector('[data-search-state]').textContent = '关键词已变化，请重新查找。';
    });
  }
})();
