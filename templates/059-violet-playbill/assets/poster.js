/* Violet Playbill: theatre lights, native navigation, title filters. No content persistence. */
(function () {
  'use strict';
  const root = document.documentElement, key = 'violet-playbill-059-theme';
  root.classList.remove('vp59-nojs');
  const buttons = [...document.querySelectorAll('[data-theme-toggle]')];
  function setTheme(theme) {
    root.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#171020' : '#f2e9da';
    buttons.forEach(b => { b.textContent = theme === 'dark' ? 'LIGHTS ON' : 'LIGHTS OFF'; b.setAttribute('aria-pressed', String(theme === 'light')); });
  }
  let saved = 'dark';
  try { if (localStorage.getItem(key) === 'light') saved = 'light'; } catch (_) { /* Storage is optional. */ }
  setTheme(saved);
  buttons.forEach(b => b.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; setTheme(theme);
    try { localStorage.setItem(key, theme); } catch (_) { /* Keep the current page usable. */ }
  }));
  const toggle = document.getElementById('vp59-menu-button'), menu = document.getElementById('vp59-menu');
  function closeMenu(focus) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('vp59-open');
    toggle.querySelector('[aria-hidden]').textContent = 'MENU'; toggle.querySelector('.vp59-sr').textContent = '打开导航';
    if (focus) toggle.focus();
  }
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      if (toggle.getAttribute('aria-expanded') === 'true') { closeMenu(false); return; }
      toggle.setAttribute('aria-expanded', 'true'); menu.classList.add('vp59-open');
      toggle.querySelector('[aria-hidden]').textContent = 'CLOSE'; toggle.querySelector('.vp59-sr').textContent = '关闭导航';
      const first = menu.querySelector('a'); if (first) first.focus();
    });
    menu.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true); });
    window.addEventListener('resize', () => { if (innerWidth > 680) closeMenu(false); });
  }
  const copy = document.querySelector('[data-copy-code]'), code = document.getElementById('vp59-code'), status = document.querySelector('[data-code-state]');
  if (copy && code && status) {
    copy.disabled = false;
    copy.addEventListener('click', async () => {
      copy.disabled = true; status.textContent = '正在复制…';
      try { await navigator.clipboard.writeText(code.textContent.trim()); status.textContent = '邀请码已复制。'; }
      catch (_) { status.textContent = '复制不可用，请手动选择邀请码。'; }
      finally { copy.disabled = false; }
    });
  }
  const filter = document.querySelector('[data-programme-filter]');
  if (filter) {
    const rows = [...document.querySelectorAll('[data-scene-act]')], state = document.querySelector('[data-programme-state]');
    function update() {
      const act = filter.elements.act.value, query = filter.elements.titleQuery.value.normalize('NFKC').trim().toLowerCase();
      rows.forEach(row => { row.hidden = (act !== 'all' && row.dataset.sceneAct !== act) || !row.querySelector('a').textContent.normalize('NFKC').toLowerCase().includes(query); });
      state.textContent = '显示 ' + rows.filter(row => !row.hidden).length + ' 场。';
    }
    filter.hidden = false; filter.addEventListener('input', update); filter.addEventListener('change', update);
    filter.addEventListener('submit', e => { e.preventDefault(); update(); });
    filter.addEventListener('reset', () => { setTimeout(update, 0); });
  }
  const search = document.querySelector('[data-local-search]');
  if (search) {
    search.querySelector('button[type="submit"]').disabled = false;
    search.addEventListener('submit', e => {
      e.preventDefault();
      const query = search.elements.query.value.normalize('NFKC').trim().toLowerCase();
      const entries = [...document.querySelectorAll('[data-search-item]')];
      entries.forEach(item => { item.hidden = !item.textContent.normalize('NFKC').toLowerCase().includes(query); });
      document.querySelector('[data-search-state]').textContent = '找到 ' + entries.filter(item => !item.hidden).length + ' 个本地标题。';
    });
  }
  const progress = document.querySelector('[data-reading-progress]');
  if (progress) {
    const update = () => { const limit = root.scrollHeight - innerHeight; progress.style.width = Math.max(0, Math.min(100, limit > 0 ? scrollY / limit * 100 : 100)) + '%'; };
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); window.addEventListener('load', update);
  }
}());
