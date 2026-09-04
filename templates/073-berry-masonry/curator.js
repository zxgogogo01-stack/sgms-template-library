/* Local curator: progressively enhance static exhibits; never upload reader input. */
(() => {
  'use strict';
  const page = document.documentElement, palette = document.querySelector('[data-palette-toggle]');
  page.classList.add('bm73-enhanced');
  function paint(value) {
    page.dataset.palette = value === 'ink' ? 'ink' : 'cream';
    if (palette) { palette.disabled = false; palette.textContent = page.dataset.palette === 'ink' ? '奶油' : '墨莓'; palette.setAttribute('aria-label', page.dataset.palette === 'ink' ? '切换到奶油主题' : '切换到墨莓主题'); }
  }
  try { paint(localStorage.getItem('berry-masonry-073-palette')); } catch (_) { paint('cream'); }
  palette?.addEventListener('click', () => { paint(page.dataset.palette === 'ink' ? 'cream' : 'ink'); try { localStorage.setItem('berry-masonry-073-palette', page.dataset.palette); } catch (_) { /* Optional theme preference. */ } });
  const menu = document.getElementById('bm73-menu'), menuButton = document.getElementById('bm73-menu-button');
  function shutMenu(focus = false) { menu?.classList.remove('bm73-open'); menuButton?.setAttribute('aria-expanded', 'false'); if (focus) menuButton?.focus(); }
  menuButton?.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menu?.classList.toggle('bm73-open', open); if (open) menu?.querySelector('a')?.focus(); });
  menu?.addEventListener('click', e => { if (e.target.closest('a')) shutMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') shutMenu(true); });
  matchMedia('(min-width: 961px)').addEventListener('change', () => shutMenu());
  const code = document.querySelector('[data-copy-code]');
  if (code) { code.disabled = false; code.addEventListener('click', async () => { const note = document.querySelector('[data-code-state]'); try { await navigator.clipboard.writeText(document.getElementById('bm73-code').textContent); note.textContent = '代码已复制。'; } catch (_) { note.textContent = '未能复制，请手动选择上方代码。'; } }); }
  const filter = document.querySelector('[data-exhibit-filter]');
  if (filter) {
    const exhibits = [...document.querySelectorAll('[data-exhibit-hang]')];
    const refresh = () => {
      const group = filter.elements.hang.value, word = filter.elements.keyword.value.normalize('NFKC').trim().toLocaleLowerCase(); let count = 0;
      for (const e of exhibits) { const show = (group === 'all' || group === e.dataset.exhibitHang) && e.querySelector('h3').textContent.normalize('NFKC').toLocaleLowerCase().includes(word); e.hidden = !show; if (show) count++; }
      filter.querySelector('[data-filter-state]').textContent = count ? '当前展示 ' + count + ' 张卡片。' : '没有匹配展品，可修改条件或重置筛选。';
    };
    filter.hidden = false; filter.addEventListener('input', refresh); filter.addEventListener('change', refresh); filter.addEventListener('submit', e => { e.preventDefault(); refresh(); }); filter.addEventListener('reset', () => setTimeout(refresh, 0)); refresh();
  }
  const search = document.querySelector('[data-local-search]');
  if (search) {
    search.querySelector('button').disabled = false;
    const refresh = () => { const word = search.elements.query.value.normalize('NFKC').trim().toLocaleLowerCase(); let count = 0; document.querySelectorAll('[data-search-item]').forEach(e => { e.hidden = !e.textContent.normalize('NFKC').toLocaleLowerCase().includes(word); if (!e.hidden) count++; }); search.querySelector('[data-search-state]').textContent = count ? '找到 ' + count + ' 个入口。' : '没有匹配入口，请换一个关键词。'; };
    search.addEventListener('input', refresh); search.addEventListener('submit', e => { e.preventDefault(); refresh(); }); refresh();
  }
  const track = document.querySelector('[data-reading-progress]');
  if (track) { const measure = () => { const h = page.scrollHeight - innerHeight; track.style.width = (h > 0 ? Math.min(100, Math.max(0, scrollY / h * 100)) : 100) + '%'; }; addEventListener('scroll', measure, { passive: true }); addEventListener('resize', measure); addEventListener('load', measure); measure(); }

  const form = document.querySelector('[data-studio]');
  if (!form) return;
  const report = document.querySelector('[data-result-text]'), copy = document.querySelector('[data-copy-result]'), message = form.querySelector('[data-tool-state]'), copyNote = document.querySelector('[data-result-copy-state]');
  let generation = 0;
  function reject(field, text) { const error = new Error(text); error.field = field; throw error; }
  function read(field, limit) {
    const text = form.elements[field].value;
    if (!text.isWellFormed() || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/u.test(text)) reject(field, '包含不完整 Unicode 或禁止控制符。');
    if ([...text].length > limit) reject(field, '原始输入最多 ' + limit + ' 个 Unicode 码点。');
    return text;
  }
  function list(field, limit, maximum) {
    const rows = read(field, limit).normalize('NFKC').split(/\r\n|\r|\n/).map((text, i) => ({ text: text.trim(), row: i + 1 })).filter(e => e.text);
    if (!rows.length || rows.length > maximum) reject(field, '需要 1–' + maximum + ' 个非空行。');
    return rows;
  }
  function split(entry, count, field) { const parts = entry.text.split('|').map(s => s.trim()); if (parts.length !== count) reject(field, '第 ' + entry.row + ' 行需要恰好 ' + (count - 1) + ' 个 |。'); return parts; }
  function label(text, limit, field, row) { const clean = text.replace(/\s+/gu, ' '); if (!clean || [...clean].length > limit) reject(field, '第 ' + row + ' 行文字须为 1–' + limit + ' 个码点。'); return clean; }
  function identifier(text, field, row) { const key = text.toUpperCase(); if (!/^[A-Z][A-Z0-9-]{0,15}$/.test(key)) reject(field, '第 ' + row + ' 行编号须为 1–16 位字母、数字或短横线，且以字母开头。'); return key; }
  function natural(text, min, max, field) { if (!/^(?:0|[1-9][0-9]*)$/.test(text) || text.length > 10) reject(field, '请填写普通 ASCII 整数，不使用单位、符号、小数、指数或前导零。'); const n = Number(text); if (n < min || n > max) reject(field, '整数范围为 ' + min + '–' + max + '。'); return n; }
  const scalar = (field, min, max) => natural(read(field, 100).trim(), min, max, field);
  function balance() {
    const seen = new Set();
    const cards = list('cards', 8000, 60).map(e => { const [a, b] = split(e, 2, 'cards'), title = label(a, 80, 'cards', e.row), key = title.toLocaleLowerCase(); if (seen.has(key)) reject('cards', '第 ' + e.row + ' 行卡片标题重复。'); seen.add(key); return { ...e, title, height: natural(b, 80, 1200, 'cards') }; });
    const count = scalar('columns', 2, 5), gap = scalar('gap', 0, 120), heights = Array(count).fill(0), placements = [];
    cards.forEach(card => { let column = 0; for (let i = 1; i < count; i++) if (heights[i] < heights[column]) column = i; const top = heights[column] ? heights[column] + gap : 0; heights[column] = top + card.height; placements.push({ ...card, column: column + 1, top, bottom: heights[column] }); });
    return ['卡片：' + cards.length + ' · 列数：' + count + ' · 间隔：' + gap, '最终列高：' + heights.join(' / ') + ' · 极差：' + (Math.max(...heights) - Math.min(...heights)), ...placements.map((e, i) => (i + 1) + '. 第 ' + e.row + ' 行 · C' + e.column + ' · ' + e.title + '\n高度 ' + e.height + ' · 顶部 ' + e.top + ' · 底部 ' + e.bottom), '只是预估高度模型，不是真实像素测量，也不是全局最优保证。'].join('\n\n');
  }
  function weave() {
    const groups = new Map(), seen = new Set();
    const entries = list('entries', 10000, 100);
    entries.forEach(e => { const [a, b] = split(e, 2, 'entries'), name = label(a, 30, 'entries', e.row), title = label(b, 80, 'entries', e.row), groupKey = name.toLocaleLowerCase(), titleKey = title.toLocaleLowerCase(); if (seen.has(titleKey)) reject('entries', '第 ' + e.row + ' 行卡片标题重复。'); seen.add(titleKey); if (!groups.has(groupKey)) groups.set(groupKey, { name, items: [] }); groups.get(groupKey).items.push({ ...e, title }); });
    if (groups.size > 12) reject('entries', '最多 12 个分组。');
    const queues = [...groups.values()], rounds = Math.max(...queues.map(g => g.items.length)), lines = [];
    for (let round = 0; round < rounds; round++) for (const group of queues) if (group.items[round]) { const e = group.items[round]; lines.push((lines.length + 1) + '. 第 ' + e.row + ' 行 · 轮次 ' + (round + 1) + ' · ' + group.name + ' · ' + e.title); }
    return ['卡片：' + entries.length + ' · 分组：' + groups.size + ' · 轮次：' + rounds, '分组顺序：' + queues.map(g => g.name).join(' / '), ...lines, '各组均保留原次序；分组耗尽后跳过，不生成空卡。'].join('\n');
  }
  function crop() {
    const w = scalar('imageWidth', 1, 20000), h = scalar('imageHeight', 1, 20000), fw = scalar('frameWidth', 1, 20000), fh = scalar('frameHeight', 1, 20000), fx = scalar('focalX', 0, 100), fy = scalar('focalY', 0, 100);
    const cover = Math.max(fw / w, fh / h), cw = Math.min(w, fw / cover), ch = Math.min(h, fh / cover), x = Math.max(0, Math.min(w - cw, w * fx / 100 - cw / 2)), y = Math.max(0, Math.min(h - ch, h * fy / 100 - ch / 2));
    const contain = Math.min(fw / w, fh / h), dw = Math.min(fw, w * contain), dh = Math.min(fh, h * contain), n = v => v > 0 && v < .0005 ? v.toFixed(6) : v.toFixed(3);
    return ['源图：' + w + ' × ' + h + ' · 容器：' + fw + ' × ' + fh, '焦点：' + fx + '% / ' + fy + '%', '覆盖比例：' + cover.toFixed(6), '源图裁切窗口\n左 ' + n(x) + ' · 上 ' + n(y) + '\n宽 ' + n(cw) + ' · 高 ' + n(ch) + '\n右 ' + n(x + cw) + ' · 下 ' + n(y + ch), '完整放入比例：' + contain.toFixed(6) + '\n显示宽 ' + n(dw) + ' · 显示高 ' + n(dh) + '\n左右各留白 ' + n((fw - dw) / 2) + ' · 上下各留白 ' + n((fh - dh) / 2), '坐标通常保留三位小数，小于 0.0005 的正值保留六位；不校验实际图片或 CSS。'].join('\n\n');
  }
  function sequence(field) { const used = new Set(); return list(field, 4000, 100).map(e => { const key = identifier(e.text, field, e.row); if (used.has(key)) reject(field, '第 ' + e.row + ' 行编号重复。'); used.add(key); return { key, row: e.row }; }); }
  function order() {
    const before = sequence('before'), after = sequence('after'), positions = new Map(before.map((e, i) => [e.key, { ...e, index: i }]));
    if (before.length !== after.length || after.some(e => !positions.has(e.key))) reject('after', '两份清单必须包含完全相同的唯一编号。');
    const indices = after.map(e => positions.get(e.key).index), lengths = Array(indices.length).fill(1); let inversions = 0;
    for (let i = 0; i < indices.length; i++) for (let j = 0; j < i; j++) { if (indices[j] > indices[i]) inversions++; else lengths[i] = Math.max(lengths[i], lengths[j] + 1); }
    const stable = Math.max(...lengths), fixed = indices.filter((n, i) => n === i).length;
    return ['编号：' + before.length + ' · 同位：' + fixed + ' · 位置变化：' + (before.length - fixed), '逆序对：' + inversions + ' · 最长递增子序列：' + stable + ' · 最少单项移位：' + (before.length - stable), ...after.map((e, i) => { const old = positions.get(e.key), delta = i - old.index; return (i + 1) + '. ' + e.key + ' · 原位置 ' + (old.index + 1) + ' → 新位置 ' + (i + 1) + ' · 差值 ' + (delta > 0 ? '+' : '') + delta + '\n原始行 ' + old.row + ' · 调整后行 ' + e.row; }), '同位计数不同于最优保留集合。本报告不验证网页视觉序或键盘序。'].join('\n\n');
  }
  function earlier(a, b) { for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) return a[i] < b[i]; return a.length < b.length; }
  function selection() {
    const seen = new Set(), entries = list('items', 6000, 30).map(e => { const [a, b, c] = split(e, 3, 'items'), key = identifier(a, 'items', e.row); if (seen.has(key)) reject('items', '第 ' + e.row + ' 行编号重复。'); seen.add(key); return { ...e, key, height: natural(b, 1, 5000, 'items'), score: natural(c, 1, 1000, 'items') }; });
    const capacity = scalar('capacity', 1, 5000), dp = Array(capacity + 1).fill(null); dp[0] = { score: 0, chosen: [] };
    entries.forEach((e, index) => { for (let space = capacity; space >= e.height; space--) { const previous = dp[space - e.height]; if (!previous) continue; const candidate = { score: previous.score + e.score, chosen: [...previous.chosen, index] }, current = dp[space]; if (!current || candidate.score > current.score || (candidate.score === current.score && earlier(candidate.chosen, current.chosen))) dp[space] = candidate; } });
    let best = dp[0], used = 0;
    // Ascending capacities keeps the least-used-space tie without inventing priorities.
    for (let space = 1; space <= capacity; space++) if (dp[space] && dp[space].score > best.score) { best = dp[space]; used = space; }
    const chosen = new Set(best.chosen);
    return ['项目：' + entries.length + ' · 容量：' + capacity, '入选：' + best.chosen.length + ' · 总优先分：' + best.score + ' · 占用：' + used + ' · 剩余：' + (capacity - used), '选中编号：' + (best.chosen.map(i => entries[i].key).join(',') || '无'), ...entries.map((e, i) => (i + 1) + '. 第 ' + e.row + ' 行 · ' + e.key + ' · ' + (chosen.has(i) ? '入选' : '未选') + ' · 高度 ' + e.height + ' · 优先分 ' + e.score), '同分先取较少占用，再取原始序号字典序更小的组合。分值来自手输，不是内容质量判断。'].join('\n\n');
  }
  function invalidate() {
    generation++; report.textContent = ''; copy.disabled = true; copyNote.textContent = '';
    form.querySelectorAll('[aria-invalid]').forEach(e => { e.removeAttribute('aria-invalid'); e.removeAttribute('aria-errormessage'); }); form.querySelectorAll('[data-field-error]').forEach(e => { e.textContent = ''; }); message.textContent = '输入已变化，请重新生成报告。';
  }
  form.querySelector('button[type=submit]').disabled = false;
  form.addEventListener('input', invalidate); form.addEventListener('change', e => { if (e.target.tagName === 'SELECT') invalidate(); });
  form.addEventListener('reset', () => { invalidate(); setTimeout(() => { message.textContent = '已恢复示例，请重新计算。'; }, 0); });
  form.querySelectorAll('[data-balance-preset]').forEach(button => { button.disabled = false; button.addEventListener('click', () => { const samples = { even: '阅读顺序 | 240\n来源边界 | 240\n移动复核 | 240\n编辑交接 | 240\n公开展签 | 240\n更正入口 | 240', editorial: '头条观察 | 420\n短讯入口 | 180\n来源方法 | 300\n编辑札记 | 230\n长篇背景 | 520\n公开边界 | 260\n移动检查 | 210', skewed: '长篇专论 | 980\n简短提醒 | 100\n快速入口 | 100\n状态标签 | 100\n来源链接 | 100' }; form.elements.cards.value = samples[button.dataset.balancePreset]; invalidate(); message.textContent = '已装载示例，请重新计算。'; form.elements.cards.focus(); }); });
  form.addEventListener('submit', e => { e.preventDefault(); invalidate(); try { report.textContent = [balance, weave, crop, order, selection][Number(form.dataset.studio)](); copy.disabled = false; message.textContent = '计算完成，完整报告在右侧或下方。'; } catch (error) { const field = error.field && form.elements[error.field]; if (field) { const note = form.querySelector('[data-field-error="' + error.field + '"]'); note.textContent = error.message; field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-errormessage', note.id); field.focus(); message.textContent = '输入未通过校验，请检查标记字段。'; } else message.textContent = '暂时无法生成报告，请刷新后重试。'; } });
  copy.addEventListener('click', async () => { if (copy.disabled || !report.textContent) return; const revision = generation, value = report.textContent; try { await navigator.clipboard.writeText(value); if (revision === generation) copyNote.textContent = '完整报告已复制。'; } catch (_) { if (revision === generation) copyNote.textContent = '未能复制，请手动选择上方报告。'; } });
})();
