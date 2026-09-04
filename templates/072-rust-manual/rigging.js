/* Rust Manual: progressive enhancement; input stays in this document. */
(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('rm72-enhanced');
  const themeButton = document.querySelector('[data-finish-toggle]');
  function finish(value) {
    root.dataset.finish = value === 'carbon' ? 'carbon' : 'paper';
    if (themeButton) {
      themeButton.textContent = root.dataset.finish === 'paper' ? '碳页' : '纸页';
      themeButton.setAttribute('aria-label', root.dataset.finish === 'paper' ? '切换为碳页主题' : '切换为纸页主题');
      themeButton.disabled = false;
    }
  }
  let saved = 'paper';
  try { saved = localStorage.getItem('rust-manual-072-finish'); } catch (_) { /* optional storage */ }
  finish(saved);
  themeButton?.addEventListener('click', () => {
    finish(root.dataset.finish === 'paper' ? 'carbon' : 'paper');
    try { localStorage.setItem('rust-manual-072-finish', root.dataset.finish); } catch (_) { /* stays in memory */ }
  });
  const menu = document.getElementById('rm72-menu'), menuButton = document.getElementById('rm72-menu-button');
  function closeMenu() { menu?.classList.remove('rm72-open'); menuButton?.setAttribute('aria-expanded', 'false'); }
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menu?.classList.toggle('rm72-open', open); menuButton.setAttribute('aria-expanded', String(open));
    if (open) menu?.querySelector('a')?.focus();
  });
  menu?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
  matchMedia('(min-width: 961px)').addEventListener('change', closeMenu);
  const codeButton = document.querySelector('[data-copy-code]');
  if (codeButton) {
    codeButton.disabled = false;
    codeButton.addEventListener('click', async () => {
      const state = document.querySelector('[data-code-state]');
      try { await navigator.clipboard.writeText(document.getElementById('rm72-code').textContent); state.textContent = '代码已复制。'; }
      catch (_) { state.textContent = '未能复制，请手动选择上方代码。'; }
    });
  }
  const filter = document.querySelector('[data-leaf-filter]');
  if (filter) {
    const items = [...document.querySelectorAll('[data-leaf-division]')];
    const update = () => {
      const division = filter.elements.division.value, word = filter.elements.keyword.value.normalize('NFKC').trim().toLocaleLowerCase();
      let count = 0;
      items.forEach(item => { const show = (division === 'all' || item.dataset.leafDivision === division) && item.querySelector('h3').textContent.normalize('NFKC').toLocaleLowerCase().includes(word); item.hidden = !show; if (show) count++; });
      filter.querySelector('[data-filter-state]').textContent = count ? '当前显示 ' + count + ' 个页签。' : '没有匹配页签，请修改条件或清除筛选。';
    };
    filter.hidden = false; filter.addEventListener('submit', e => { e.preventDefault(); update(); });
    filter.addEventListener('input', update); filter.addEventListener('change', update);
    filter.addEventListener('reset', () => setTimeout(update, 0)); update();
  }
  const search = document.querySelector('[data-local-search]');
  if (search) {
    search.querySelector('button').disabled = false;
    const update = () => {
      const word = search.elements.query.value.normalize('NFKC').trim().toLocaleLowerCase(); let count = 0;
      document.querySelectorAll('[data-search-item]').forEach(item => { item.hidden = !item.textContent.normalize('NFKC').toLocaleLowerCase().includes(word); if (!item.hidden) count++; });
      search.querySelector('[data-search-state]').textContent = count ? '找到 ' + count + ' 个入口。' : '没有匹配入口，请换一个关键词。';
    };
    search.addEventListener('submit', e => { e.preventDefault(); update(); }); search.addEventListener('input', update); update();
  }
  const progress = document.querySelector('[data-reading-progress]');
  if (progress) {
    const update = () => { const distance = root.scrollHeight - innerHeight; progress.style.width = (distance > 0 ? Math.max(0, Math.min(100, scrollY / distance * 100)) : 100) + '%'; };
    addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); addEventListener('load', update); update();
  }

  const form = document.querySelector('[data-bench]');
  if (!form) return;
  const result = document.querySelector('[data-result-text]'), copy = document.querySelector('[data-copy-result]');
  const state = form.querySelector('[data-tool-state]'), copyState = document.querySelector('[data-result-copy-state]');
  let revision = 0;
  function fail(field, message) { const error = new Error(message); error.field = field; throw error; }
  function raw(field) {
    const text = form.elements[field].value;
    if (!text.isWellFormed() || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/u.test(text)) fail(field, '包含不完整 Unicode 或禁止控制符，请检查输入。');
    if ([...text].length > 10000) fail(field, '原始输入不能超过 10000 个 Unicode 码点。');
    return text;
  }
  function rows(field, min, max) {
    const entries = raw(field).normalize('NFKC').split(/\r\n|\r|\n/).map((text, i) => ({ text: text.trim(), row: i + 1 })).filter(e => e.text);
    if (entries.length < min || entries.length > max) fail(field, '需要 ' + min + '–' + max + ' 个非空行。');
    return entries;
  }
  function columns(entry, count, field) {
    const values = entry.text.split('|').map(x => x.trim());
    if (values.length !== count) fail(field, '第 ' + entry.row + ' 行需要恰好 ' + (count - 1) + ' 个 |。');
    return values;
  }
  function id(value, field, row) {
    const key = value.toUpperCase();
    if (!/^[A-Z][A-Z0-9-]{0,15}$/.test(key)) fail(field, '第 ' + row + ' 行编号须以英文字母开头，限 1–16 位字母、数字或短横线。');
    return key;
  }
  function title(value, max, field, row) {
    const text = value.replace(/\s+/gu, ' ');
    if (!text || [...text].length > max) fail(field, '第 ' + row + ' 行文字须为 1–' + max + ' 个码点。');
    return text;
  }
  function integer(value, min, max, field) {
    if (!/^[0-9]+$/.test(value) || value.length > 16) fail(field, '请填写范围内的 ASCII 整数，不使用符号、小数或指数。');
    const n = BigInt(value);
    if (n < BigInt(min) || n > BigInt(max)) fail(field, '整数范围为 ' + min + '–' + max + '。');
    return n;
  }
  function unique(map, key, field, row) { if (map.has(key)) fail(field, '第 ' + row + ' 行编号重复：' + key + '。'); }
  function dependency() {
    const entries = rows('steps', 1, 100), map = new Map();
    for (const e of entries) {
      const [a, b, c] = columns(e, 3, 'steps'), key = id(a, 'steps', e.row); unique(map, key, 'steps', e.row);
      const deps = b === '-' ? [] : b.split(',').map(x => id(x.trim(), 'steps', e.row));
      if (deps.length > 10 || new Set(deps).size !== deps.length) fail('steps', '第 ' + e.row + ' 行依赖最多 10 个，且不能重复。');
      if (deps.includes(key)) fail('steps', '第 ' + e.row + ' 行不能依赖自身。');
      map.set(key, { key, row: e.row, name: title(c, 100, 'steps', e.row), deps });
    }
    for (const e of map.values()) for (const d of e.deps) if (!map.has(d)) fail('steps', '第 ' + e.row + ' 行依赖编号未定义：' + d + '。');
    const ordered = [], done = new Set(); let level = 1;
    while (done.size < map.size) {
      const available = [...map.values()].filter(e => !done.has(e.key) && e.deps.every(d => done.has(d)));
      if (!available.length) fail('steps', '存在循环或受循环阻塞的步骤，无法生成完整层级。');
      available.forEach(e => { ordered.push({ ...e, level }); done.add(e.key); }); level++;
    }
    return ['步骤：' + map.size + ' · 层级：' + (level - 1), ...ordered.map((e, i) => (i + 1) + '. 层级 ' + e.level + ' · 第 ' + e.row + ' 行 · ' + e.key + ' · ' + e.name + '\n直接依赖：' + (e.deps.join(',') || '-')), '仅为编号依赖模型，不包含时长、资源或真实操作权限。'].join('\n\n');
  }
  function rules() {
    const size = Number(integer(raw('flags').trim(), 1, 8, 'flags'));
    const entries = rows('rules', 1, 80).map(e => { const [pattern, name] = columns(e, 2, 'rules'); if (pattern.length !== size || /[^01-]/.test(pattern)) fail('rules', '第 ' + e.row + ' 行模式长度应为 ' + size + '，只用 0、1、-。'); return { ...e, pattern, name: title(name, 80, 'rules', e.row) }; });
    let gap = 0, single = 0, overlap = 0; const lines = [];
    for (let n = 0; n < 2 ** size; n++) {
      const bits = n.toString(2).padStart(size, '0'), hits = entries.filter(e => [...e.pattern].every((c, i) => c === '-' || c === bits[i]));
      if (!hits.length) gap++; else if (hits.length === 1) single++; else overlap++;
      lines.push(bits + ' · ' + (!hits.length ? '未覆盖' : hits.length === 1 ? '唯一' : '重叠') + '\n' + (hits.map(e => '第 ' + e.row + ' 行：' + e.name).join('；') || '无匹配规则'));
    }
    return ['规则：' + entries.length + ' · 状态：' + 2 ** size, '未覆盖：' + gap + ' · 唯一：' + single + ' · 重叠：' + overlap, ...lines, '所有匹配均保留，没有首条优先或自动决策。'].join('\n\n');
  }
  function references() {
    const defs = new Map();
    for (const e of rows('definitions', 1, 100)) {
      const [a, b] = columns(e, 2, 'definitions'), key = id(a, 'definitions', e.row); unique(defs, key, 'definitions', e.row);
      defs.set(key, { key, name: title(b, 100, 'definitions', e.row), row: e.row, count: 0 });
    }
    const text = raw('text'), hits = [...text.matchAll(/\[([A-Za-z][A-Za-z0-9-]{0,15})\]/g)];
    if (hits.length > 1000) fail('text', '识别到超过 1000 次引用，请分段核对。');
    let known = 0;
    const lines = hits.map((m, i) => {
      const key = m[1].toUpperCase(), def = defs.get(key), prefix = text.slice(0, m.index), lf = prefix.lastIndexOf('\n');
      if (def) { def.count++; known++; }
      return (i + 1) + '. [' + key + '] · ' + (def ? '已定义' : '未定义') + ' · 码点 ' + ([...prefix].length + 1) + ' · 行 ' + (prefix.split('\n').length) + ' 列 ' + ([...prefix.slice(lf + 1)].length + 1);
    });
    return ['引用：' + hits.length + ' · 已定义：' + known + ' · 未定义：' + (hits.length - known), ...lines, '定义使用清单', ...[...defs.values()].map(e => '[' + e.key + '] · 第 ' + e.row + ' 行 · ' + e.name + ' · 次数 ' + e.count + (e.count ? '' : ' · 未引用')), '位置以 Unicode 码点计，行分隔按 LF；原文未改写。'].join('\n');
  }
  function quantity() {
    const sets = integer(raw('sets').trim(), 1, 1000000000, 'sets'), map = new Map(); let kits = null, shortages = 0;
    for (const e of rows('parts', 1, 100)) {
      const [a, b, c] = columns(e, 3, 'parts'), key = id(a, 'parts', e.row); unique(map, key, 'parts', e.row);
      const per = integer(b, 0, 1000000000, 'parts'), have = integer(c, 0, 1000000000, 'parts'), need = per * sets;
      const shortage = need > have ? need - have : 0n, surplus = have > need ? have - need : 0n;
      if (shortage > 0n) shortages++;
      if (per > 0n) { const possible = have / per; if (kits === null || possible < kits) kits = possible; }
      map.set(key, { ...e, key, per, have, need, shortage, surplus });
    }
    return ['项目：' + map.size + ' · 目标套数：' + sets, '缺口项目：' + shortages + ' · 可配完整套数：' + (kits === null ? '未定义（无正需求项）' : kits), ...[...map.values()].map((e, i) => (i + 1) + '. 第 ' + e.row + ' 行 · ' + e.key + '\n每套 ' + e.per + ' · 需求 ' + e.need + ' · 已有 ' + e.have + ' · 缺口 ' + e.shortage + ' · 余量 ' + e.surplus), '不汇总不同项目的数量；不包含耗损、规格或实物适配。'].join('\n\n');
  }
  function pairwise() {
    const factors = [], seen = new Map();
    for (const e of rows('factors', 2, 6)) {
      const [a, b] = columns(e, 2, 'factors'), key = id(a, 'factors', e.row); unique(seen, key, 'factors', e.row); seen.set(key, true);
      const values = b.split(',').map(s => s.trim());
      if (values.length < 2 || values.length > 4 || new Set(values).size !== values.length || values.some(v => !v || [...v].length > 20)) fail('factors', '第 ' + e.row + ' 行需要 2–4 个唯一值，每值 1–20 码点。');
      factors.push({ key, values });
    }
    const cases = rows('cases', 1, 100).map(e => { const values = columns(e, factors.length, 'cases'); if (values.some((v, i) => !factors[i].values.includes(v))) fail('cases', '第 ' + e.row + ' 行含不属于对应因素的取值，大小写区分。'); return { ...e, values }; });
    const lines = []; let covered = 0;
    for (let a = 0; a < factors.length; a++) for (let b = a + 1; b < factors.length; b++) for (const av of factors[a].values) for (const bv of factors[b].values) {
      const hits = cases.filter(c => c.values[a] === av && c.values[b] === bv).map(c => c.row);
      if (hits.length) covered++;
      lines.push((lines.length + 1) + '. ' + factors[a].key + '=' + av + ' × ' + factors[b].key + '=' + bv + '\n' + (hits.length ? '命中用例行：' + hits.join(',') : '缺失'));
    }
    return ['因素：' + factors.length + ' · 用例：' + cases.length + ' · 二元组合：' + lines.length, '已覆盖：' + covered + ' · 缺失：' + (lines.length - covered), ...lines, '成对覆盖不是全部多因素组合覆盖，也不保证测试充分。'].join('\n\n');
  }
  function clear() {
    revision++; result.textContent = ''; copy.disabled = true; copyState.textContent = '';
    form.querySelectorAll('[aria-invalid]').forEach(e => { e.removeAttribute('aria-invalid'); e.removeAttribute('aria-errormessage'); });
    form.querySelectorAll('[data-field-error]').forEach(e => { e.textContent = ''; });
    state.textContent = '输入已变更，请重新生成检查单。';
  }
  form.querySelector('button[type=submit]').disabled = false;
  form.addEventListener('input', clear);
  form.addEventListener('reset', () => { clear(); setTimeout(() => { state.textContent = '已恢复示例，请重新检查。'; }, 0); });
  form.addEventListener('submit', e => {
    e.preventDefault(); clear();
    try { result.textContent = [dependency, rules, references, quantity, pairwise][Number(form.dataset.bench)](); copy.disabled = false; state.textContent = '检查完成，完整结果在右侧或下方。'; }
    catch (error) {
      const field = error.field && form.elements[error.field];
      if (field) { const note = form.querySelector('[data-field-error="' + error.field + '"]'); note.textContent = error.message; field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-errormessage', note.id); field.focus(); state.textContent = '输入未通过检查，请核对标记字段。'; }
      else { state.textContent = '未能生成检查单，请刷新后重试。'; }
    }
  });
  copy.addEventListener('click', async () => {
    if (copy.disabled || !result.textContent) return;
    const version = revision, text = result.textContent;
    try { await navigator.clipboard.writeText(text); if (version === revision) copyState.textContent = '完整检查单已复制。'; }
    catch (_) { if (version === revision) copyState.textContent = '未能复制，请手动选择上方检查单。'; }
  });
})();
