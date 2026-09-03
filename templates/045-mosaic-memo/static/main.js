(() => {
  'use strict';
  const one = s => document.querySelector(s);
  const theme = one('[data-theme-button]');
  const applyTheme = value => {
    document.documentElement.dataset.theme = value;
    if (theme) {
      theme.setAttribute('aria-label', value === 'dark' ? '切换浅色主题' : '切换深色主题');
      one('[data-theme-label]').textContent = value === 'dark' ? '浅色' : '暗色';
    }
  };
  try { applyTheme(localStorage.getItem('mosaic-memo-045-theme') === 'dark' ? 'dark' : 'light'); } catch (_) { applyTheme('light'); }
  theme?.addEventListener('click', () => {
    const value = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(value);
    try { localStorage.setItem('mosaic-memo-045-theme', value); } catch (_) { /* Storage is optional. */ }
  });
  const menu = one('[data-menu-button]'), nav = one('[data-site-nav]');
  const openMenu = open => { if (menu && nav) { menu.setAttribute('aria-expanded', String(open)); nav.dataset.open = String(open); } };
  menu?.addEventListener('click', () => openMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', e => { if (e.target.closest('a')) openMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { openMenu(false); menu.focus(); } });
  async function copy(text) {
    if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return; }
    const field = document.createElement('textarea');
    field.value = text; field.readOnly = true; field.style.position = 'fixed'; field.style.left = '-9999px';
    document.body.append(field); field.select();
    const ok = document.execCommand('copy'); field.remove();
    if (!ok) throw new Error('copy');
  }
  one('[data-copy-invite]')?.addEventListener('click', async () => {
    const button = one('[data-copy-invite]');
    try { await copy(one('[data-invite]').textContent.trim()); button.textContent = '已复制'; }
    catch (_) { button.textContent = '请手动复制'; }
  });
  const search = one('[data-memo-search]'), cards = [...document.querySelectorAll('[data-memo]')];
  if (search && cards.length) {
    let selected = 'all';
    const filter = () => {
      const query = search.value.trim().toLocaleLowerCase();
      let count = 0;
      cards.forEach(card => {
        const show = (selected === 'all' || card.dataset.category === selected) && (card.dataset.search + ' ' + card.textContent).toLocaleLowerCase().includes(query);
        card.hidden = !show; count += Number(show);
      });
      one('[data-memo-status]').textContent = `显示 ${count} / ${cards.length} 块`;
      one('[data-memo-empty]').hidden = count !== 0;
    };
    search.addEventListener('input', filter);
    document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
      selected = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      filter();
    }));
  }
  one('[data-404-form]')?.addEventListener('submit', e => {
    e.preventDefault();
    const query = one('#missing-query').value.trim().toLocaleLowerCase();
    const results = one('[data-404-results]'), status = one('[data-404-status]');
    results.replaceChildren();
    if (!query) { status.textContent = '请输入要查找的线索。'; return; }
    const catalog = [
      ['观察线', 'lanes/observations.html', 'signal observation 观察 记录'],
      ['判断线', 'lanes/interpretations.html', 'decision interpretation 判断 分析'],
      ['待证线', 'lanes/next-questions.html', 'question review 问题 待证'],
      ['编辑工作台', 'workbench.html', 'tool workbench 工具 工作台']
    ];
    const found = catalog.filter(row => (row[0] + row[2]).toLocaleLowerCase().includes(query));
    found.forEach(([label, href]) => { const li = document.createElement('li'), link = document.createElement('a'); link.href = href; link.textContent = label; li.append(link); results.append(li); });
    status.textContent = found.length ? `找到 ${found.length} 个入口。` : '没有匹配入口，请尝试“观察”或“工具”。';
  });
})();
