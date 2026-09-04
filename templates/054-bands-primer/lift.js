(() => {
  'use strict';
  const root = document.documentElement, themeButton = document.getElementById('bp54-theme-button');
  root.classList.remove('bp54-nojs');
  const themeKey = 'bands-primer-054-theme';
  function theme(value) { root.dataset.theme = value; themeButton.textContent = value === 'dark' ? '日间' : '夜间'; themeButton.setAttribute('aria-label', value === 'dark' ? '切换到日间模式' : '切换到夜间模式'); }
  let saved; try { saved = localStorage.getItem(themeKey); } catch { /* Optional persistence. */ }
  theme(['light', 'dark'].includes(saved) ? saved : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  themeButton.addEventListener('click', () => { const next = root.dataset.theme === 'dark' ? 'light' : 'dark'; theme(next); try { localStorage.setItem(themeKey, next); } catch { /* Local mode works without storage. */ } });
  const menu = document.getElementById('bp54-cap-btn'), nav = document.getElementById('bp54-cap-nav');
  function close(restore = false) { nav.classList.remove('bp54-wide'); menu.setAttribute('aria-expanded', 'false'); if (restore) menu.focus(); }
  menu.addEventListener('click', () => { const open = nav.classList.toggle('bp54-wide'); menu.setAttribute('aria-expanded', String(open)); if (open) nav.querySelector('a')?.focus(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('bp54-wide')) close(true); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => close()));
  matchMedia('(min-width:621px)').addEventListener('change', e => { if (e.matches) close(); });
  const copy = document.querySelector('[data-copy-code]');
  copy?.addEventListener('click', async () => {
    const status = document.querySelector('[data-code-state]'); copy.disabled = true; status.textContent = '';
    try { if (!navigator.clipboard?.writeText) throw new Error('Unavailable'); await navigator.clipboard.writeText(document.getElementById('bp54-code').textContent.trim()); status.textContent = '邀请码已复制。'; }
    catch { status.textContent = '复制未获许可，请选择邀请码手动复制。'; }
    finally { copy.disabled = false; }
  });
  const route = document.querySelector('[data-route-checklist]');
  if (route) {
    const boxes = [...route.querySelectorAll('input[type=checkbox]')], count = document.querySelector('[data-route-count]'), progress = route.querySelector('[data-route-progress]');
    boxes.forEach(b => { b.disabled = false; });
    function update() { const completed = boxes.filter(b => b.checked).length; count.textContent = completed + ' / ' + boxes.length + ' 已完成'; progress.max = boxes.length; progress.value = completed; progress.textContent = completed + ' / ' + boxes.length; }
    route.addEventListener('change', update); route.addEventListener('reset', () => { boxes.forEach(b => { b.checked = false; }); update(); }); update();
  }
  document.querySelectorAll('[data-js-controls]').forEach(e => { e.hidden = false; });
  const filters = [...document.querySelectorAll('[data-band-filter]')];
  filters.forEach(button => button.addEventListener('click', () => { let count = 0; document.querySelectorAll('[data-lesson]').forEach(item => { item.hidden = button.dataset.bandFilter !== 'all' && item.dataset.band !== button.dataset.bandFilter; if (!item.hidden) count++; }); filters.forEach(b => b.setAttribute('aria-pressed', String(b === button))); document.querySelector('[data-filter-state]').textContent = '这条色带包含 ' + count + ' 个读物入口。'; }));
  const search = document.querySelector('[data-local-search]');
  if (search) {
    search.hidden = false;
    search.addEventListener('submit', e => { e.preventDefault(); const query = search.elements.query.value.normalize('NFKC').trim().toLowerCase(); let count = 0; document.querySelectorAll('[data-search-item]').forEach(item => { item.hidden = !item.textContent.normalize('NFKC').toLowerCase().includes(query); if (!item.hidden) count++; }); search.querySelector('[data-search-state]').textContent = count ? '找到 ' + count + ' 个入口。' : '没有匹配项；清空关键词可查看全部。'; });
    search.addEventListener('input', () => { document.querySelectorAll('[data-search-item]').forEach(e => { e.hidden = false; }); search.querySelector('[data-search-state]').textContent = '关键词已改动，请重新查找。'; });
  }
  const progress = document.querySelector('[data-reading-progress]');
  if (progress) { const update = () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.width = (max > 0 ? Math.min(100, Math.max(0, scrollY / max * 100)) : 100) + '%'; }; addEventListener('scroll', update, {passive:true}); addEventListener('resize', update); update(); }
})();
