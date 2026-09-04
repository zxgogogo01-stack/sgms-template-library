/* 058 · navigation, local theme and progressive enhancement. No business data is stored. */
(function () {
  'use strict';
  const root = document.documentElement;
  root.classList.remove('gl58-nojs');
  const themeKey = 'graphite-line-058-theme';
  const buttons = [...document.querySelectorAll('[data-theme-toggle]')];
  function applyTheme(theme) {
    root.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#151716' : '#e9e9e5';
    buttons.forEach(b => { b.textContent = theme === 'dark' ? 'LIGHT' : 'DARK'; b.setAttribute('aria-pressed', String(theme === 'dark')); });
  }
  let saved = 'light';
  try { if (localStorage.getItem(themeKey) === 'dark') saved = 'dark'; } catch (_) { /* Storage is optional. */ }
  applyTheme(saved);
  buttons.forEach(b => b.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem(themeKey, theme); } catch (_) { /* Session remains usable. */ }
  }));
  const toggle = document.getElementById('gl58-nav-button'), nav = document.getElementById('gl58-nav');
  function closeNav(focus) {
    if (!toggle || !nav) return;
    nav.classList.remove('gl58-open'); toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('[aria-hidden]').textContent = '＋';
    toggle.querySelector('.gl58-sr').textContent = '打开导航';
    if (focus) toggle.focus();
  }
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      if (toggle.getAttribute('aria-expanded') === 'true') { closeNav(false); return; }
      nav.classList.add('gl58-open'); toggle.setAttribute('aria-expanded', 'true');
      toggle.querySelector('[aria-hidden]').textContent = '−'; toggle.querySelector('.gl58-sr').textContent = '关闭导航';
      const first = nav.querySelector('a'); if (first) first.focus();
    });
    nav.addEventListener('click', e => { if (e.target.closest('a')) closeNav(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeNav(true); });
    window.addEventListener('resize', () => { if (window.innerWidth > 700) closeNav(false); });
  }
  const copy = document.querySelector('[data-copy-code]'), code = document.getElementById('gl58-code'), state = document.querySelector('[data-code-state]');
  if (copy && code && state) {
    copy.disabled = false;
    copy.addEventListener('click', async () => {
      copy.disabled = true; state.textContent = '正在复制…';
      try { await navigator.clipboard.writeText(code.textContent.trim()); state.textContent = '已复制，可粘贴使用。'; }
      catch (_) { state.textContent = '复制不可用，请手动选择邀请码。'; }
      finally { copy.disabled = false; }
    });
  }
  const filters = [...document.querySelectorAll('[data-axis-filter]')], records = [...document.querySelectorAll('[data-record-axis]')];
  if (filters.length && records.length) {
    document.querySelectorAll('[data-js-controls]').forEach(e => { e.hidden = false; });
    filters.forEach(b => b.addEventListener('click', () => {
      const axis = b.dataset.axisFilter;
      filters.forEach(other => other.setAttribute('aria-pressed', String(other === b)));
      records.forEach(r => { r.hidden = axis !== 'all' && r.dataset.recordAxis !== axis; });
      const status = document.querySelector('[data-axis-state]');
      if (status) status.textContent = '显示 ' + records.filter(r => !r.hidden).length + ' 张图纸。';
    }));
  }
  const search = document.querySelector('[data-local-search]');
  if (search) {
    search.querySelector('button[type="submit"]').disabled = false;
    search.addEventListener('submit', e => {
      e.preventDefault();
      const query = search.elements.query.value.normalize('NFKC').trim().toLowerCase();
      const items = [...document.querySelectorAll('[data-search-item]')];
      items.forEach(item => { item.hidden = !item.textContent.normalize('NFKC').toLowerCase().includes(query); });
      document.querySelector('[data-search-state]').textContent = '找到 ' + items.filter(item => !item.hidden).length + ' 个本地标题。';
    });
  }
  const progress = document.querySelector('[data-reading-progress]');
  if (progress) {
    const update = () => { const limit = root.scrollHeight - innerHeight; progress.style.width = Math.max(0, Math.min(100, limit > 0 ? scrollY / limit * 100 : 100)) + '%'; };
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update);
    window.addEventListener('load', update);
  }
}());
