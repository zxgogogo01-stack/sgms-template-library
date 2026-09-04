/* 058 · five bounded, local-only instruments. All user text is rendered as textContent. */
(function () {
  'use strict';
  const form = document.querySelector('[data-instrument]');
  if (!form) return;
  const error = document.querySelector('[data-input-error]'), result = document.querySelector('[data-result-text]');
  const state = document.querySelector('[data-result-state]'), copy = document.querySelector('[data-copy-result]');
  const copyState = document.querySelector('[data-result-copy-state]');
  let revision = 0;
  const field = name => form.elements.namedItem(name);
  const fail = (name, message) => { const e = new Error(message); e.field = name; throw e; };
  const normalize = value => value.normalize('NFKC').trim();
  const value = name => normalize(field(name).value);
  const pad = n => String(n).padStart(2, '0');
  function clear() {
    revision++; result.textContent = ''; error.textContent = ''; copyState.textContent = ''; copy.disabled = true;
    state.textContent = '等待运行。';
    form.querySelectorAll('[aria-invalid]').forEach(e => { e.removeAttribute('aria-invalid'); e.removeAttribute('aria-errormessage'); });
  }
  function lines(name, min, max) {
    const raw = field(name).value.normalize('NFKC');
    if (raw.length > 6000) fail(name, '单个列表最多 6000 个 UTF-16 单元。');
    const text = raw.trim(), rows = text ? text.split(/\r\n|\r|\n/).map(s => s.trim()) : [];
    if (rows.length < min || rows.length > max || rows.some(s => !s)) fail(name, '请填写 ' + min + '–' + max + ' 行，列表内部不能留空行。');
    return rows;
  }
  function label(raw, name) {
    const text = normalize(raw);
    if (!text || [...text].length > 20 || /[,:\r\n\u0000-\u001f\u007f]/.test(text)) fail(name, '名称须为 1–20 个码点，不含逗号、冒号或控制字符。');
    return text;
  }
  function integer(raw, max, name) {
    if (!/^(0|[1-9]\d*)$/.test(raw) || raw.length > 12 || Number(raw) > max) fail(name, '数值须为 0–' + max + ' 的普通整数，不带前导零、符号或指数。');
    return Number(raw);
  }
  function minute(raw, name, allowEnd) {
    const m = /^(\d{2}):(\d{2})$/.exec(raw);
    if (!m || +m[2] > 59 || +m[1] > 23 && !(allowEnd && m[1] === '24' && m[2] === '00')) fail(name, '时间须为 HH:MM；仅结束时间可用 24:00。');
    return +m[1] * 60 + +m[2];
  }
  const clock = n => pad(Math.floor(n / 60)) + ':' + pad(n % 60);
  const format = d => d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + ' ' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes());
  function fixedOffset() {
    const raw = value('date'), m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
    const d = m ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])) : null;
    if (!m || +m[1] < 2000 || +m[1] > 2099 || d.getUTCFullYear() !== +m[1] || d.getUTCMonth() !== +m[2] - 1 || d.getUTCDate() !== +m[3]) fail('date', '请填写 2000–2099 年内真实的 YYYY-MM-DD 日期。');
    const t = minute(value('time'), 'time', false);
    function offset(name) {
      const m = /^([+-])(\d{2}):(\d{2})$/.exec(value(name));
      const n = m ? (m[1] === '-' ? -1 : 1) * (+m[2] * 60 + +m[3]) : NaN;
      if (!m || +m[2] > 14 || +m[3] > 59 || n < -720 || n > 840) fail(name, '偏移须带正负号 HH:MM，范围 −12:00 至 +14:00。');
      return n;
    }
    const a = offset('sourceOffset'), b = offset('targetOffset'), source = d.getTime() + t * 60000;
    const utc = source - a * 60000, target = utc + b * 60000;
    const days = Math.floor(target / 86400000) - Math.floor(source / 86400000);
    const zone = n => (n < 0 ? '-' : '+') + clock(Math.abs(n));
    return ['来源时间：' + format(new Date(source)) + ' / UTC' + zone(a), 'UTC 时间：' + format(new Date(utc)), '目标时间：' + format(new Date(target)) + ' / UTC' + zone(b), '日期差：' + (days > 0 ? '+' : '') + days + ' 天', '固定偏移换算，不包含夏令时。'].join('\n');
  }
  function revisionOrder() {
    const rows = lines('revisions', 1, 60), groups = new Map();
    rows.forEach(row => {
      const parts = row.split('.');
      if (parts.length > 6 || parts.some(s => !/^(0|[1-9]\d{0,11})$/.test(s))) fail('revisions', '每行填 1–6 段数字，各段 0–999999999999，不带前导零或后缀。');
      while (parts.length > 1 && parts[parts.length - 1] === '0') parts.pop();
      const key = parts.join('.'); groups.set(key, (groups.get(key) || 0) + 1);
    });
    const keys = [...groups.keys()].sort((a, b) => {
      const x = a.split('.').map(BigInt), y = b.split('.').map(BigInt);
      for (let i = 0; i < Math.max(x.length, y.length); i++) { const p = x[i] || 0n, q = y[i] || 0n; if (p !== q) return p < q ? -1 : 1; } return 0;
    });
    return ['输入编号：' + rows.length, '不同编号：' + keys.length, '合并重复：' + (rows.length - keys.length), '升序：', ...keys.map(k => k + ' × ' + groups.get(k)), '最高编号：' + keys[keys.length - 1], '仅比较数字分段，不是完整 SemVer。'].join('\n');
  }
  function slotConflicts() {
    const seen = new Set();
    const slots = lines('slots', 1, 30).map(row => {
      const parts = row.split(',').map(s => s.trim());
      if (parts.length !== 3) fail('slots', '每行格式为 名称,开始,结束。');
      const name = label(parts[0], 'slots'), key = name.toLowerCase();
      if (seen.has(key)) fail('slots', '名称不能重复（忽略大小写与宽窄字符差异）。'); seen.add(key);
      const a = minute(parts[1], 'slots', false), b = minute(parts[2], 'slots', true);
      if (b <= a) fail('slots', '结束时间须晚于开始时间，不支持跨日。');
      return { name, a, b };
    });
    let total = 0, busy = 0, peak = 0, active = 0, end = -1;
    const events = [], overlaps = [];
    for (const s of [...slots].sort((a, b) => a.a - b.a || a.b - b.b)) {
      total += s.b - s.a; busy += Math.max(0, s.b - Math.max(s.a, end)); end = Math.max(end, s.b);
      events.push([s.a, 1], [s.b, -1]);
    }
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]).forEach(e => { active += e[1]; peak = Math.max(peak, active); });
    for (let i = 0; i < slots.length; i++) for (let j = i + 1; j < slots.length; j++) {
      const a = Math.max(slots[i].a, slots[j].a), b = Math.min(slots[i].b, slots[j].b);
      if (a < b) overlaps.push(slots[i].name + ' × ' + slots[j].name + '：' + clock(a) + '–' + clock(b) + ' / ' + (b - a) + ' 分钟');
    }
    return ['输入时段：' + slots.length, '原始合计：' + total + ' 分钟', '占用并集：' + busy + ' 分钟', '全天空闲：' + (1440 - busy) + ' 分钟', '峰值并发：' + peak, '冲突配对：' + overlaps.length, ...(overlaps.length ? overlaps : ['没有重叠时段。']), '采用半开区间；首尾相接不算冲突。'].join('\n');
  }
  function editDistance() {
    const parse = name => {
      const raw = field(name).value;
      if (raw.length > 2000) fail(name, '单个文本最多 2000 个 UTF-16 单元。');
      const chars = [...raw.replace(/\r\n|\r/g, '\n')];
      if (chars.length > 240) fail(name, '单个文本最多 240 个 Unicode 码点。');
      return chars;
    };
    const a = parse('before'), b = parse('after');
    const dp = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1));
    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    let i = a.length, j = b.length, inserted = 0, deleted = 0, replaced = 0;
    const operations = [];
    while (i || j) {
      if (i && j && dp[i][j] === dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) {
        if (a[i - 1] !== b[j - 1]) { replaced++; operations.push('替换：原 ' + i + ' → 新 ' + j + ' / ' + JSON.stringify(a[i - 1]) + ' → ' + JSON.stringify(b[j - 1])); } i--; j--;
      } else if (i && dp[i][j] === dp[i - 1][j] + 1) {
        deleted++; operations.push('删除：原 ' + i + ' / ' + JSON.stringify(a[i - 1])); i--;
      } else {
        inserted++; operations.push('插入：原 ' + (i + 1) + ' 前 → 新 ' + j + ' / ' + JSON.stringify(b[j - 1])); j--;
      }
    }
    return ['编辑距离：' + dp[a.length][b.length], '原文码点：' + a.length, '新文码点：' + b.length, '插入：' + inserted, '删除：' + deleted, '替换：' + replaced, '操作（原文位置 1 起算；末尾可为原长度 + 1）：', ...(operations.length ? operations.reverse() : ['无需编辑。']), '按码点计算，不衡量语义或字形相似度。'].join('\n');
  }
  function shortestRoute() {
    const nodes = lines('nodes', 1, 20).map(s => label(s, 'nodes')), ids = new Map();
    nodes.forEach((n, i) => { const key = n.toLowerCase(); if (ids.has(key)) fail('nodes', '节点名称不能重复（忽略大小写与宽窄字符差异）。'); ids.set(key, i); });
    const graph = nodes.map(() => []), seen = new Set();
    lines('edges', 0, 60).forEach(row => {
      const parts = row.split(',').map(s => s.trim());
      if (parts.length !== 3) fail('edges', '每行格式为 起点,终点,成本。');
      const a = ids.get(label(parts[0], 'edges').toLowerCase()), b = ids.get(label(parts[1], 'edges').toLowerCase());
      if (a === undefined || b === undefined) fail('edges', '边的两端必须是已列出的节点。');
      if (a === b || seen.has(a + ':' + b)) fail('edges', '不接受自环或重复的同向边，反向边可单独填写。');
      seen.add(a + ':' + b); graph[a].push({ to: b, cost: integer(parts[2], 1000000, 'edges') });
    });
    const endpoint = name => { const id = ids.get(label(field(name).value, name).toLowerCase()); if (id === undefined) fail(name, '起点与终点必须在节点列表内。'); return id; };
    const start = endpoint('start'), end = endpoint('end'), distances = nodes.map(() => Infinity), previous = nodes.map(() => -1), visited = new Set();
    distances[start] = 0;
    for (let step = 0; step < nodes.length; step++) {
      let current = -1;
      for (let k = 0; k < nodes.length; k++) if (!visited.has(k) && distances[k] < Infinity && (current < 0 || distances[k] < distances[current])) current = k;
      if (current < 0) break;
      visited.add(current); if (current === end) break;
      for (const edge of graph[current]) if (!visited.has(edge.to) && distances[current] + edge.cost < distances[edge.to]) { distances[edge.to] = distances[current] + edge.cost; previous[edge.to] = current; }
    }
    if (!Number.isFinite(distances[end])) return '节点数量：' + nodes.length + '\n有向边：' + seen.size + '\n未找到可达路径：' + nodes[start] + ' → ' + nodes[end] + '\n不可达是有效结果，不等于输入错误。';
    const route = []; let cursor = end;
    while (cursor !== -1) { route.unshift(cursor); cursor = previous[cursor]; }
    return ['节点数量：' + nodes.length, '有向边：' + seen.size, '最短路径：' + route.map(k => nodes[k]).join(' → '), '总成本：' + distances[end], '路径边数：' + (route.length - 1), '同成本保留首个发现的路径，不保证最少边数。'].join('\n');
  }
  const calculators = { 'fixed-offset': fixedOffset, 'revision-order': revisionOrder, 'slot-conflicts': slotConflicts, 'edit-distance': editDistance, 'shortest-route': shortestRoute };
  const calculate = calculators[form.dataset.instrument];
  if (!calculate) return;
  form.querySelector('button[type="submit"]').disabled = false;
  // Input events invalidate immediately; a later native change event must not erase an Enter result.
  form.addEventListener('input', clear);
  form.addEventListener('reset', clear);
  form.addEventListener('submit', event => {
    event.preventDefault(); clear();
    try { result.textContent = calculate(); state.textContent = '已生成，仅在当前页面保留。'; copy.disabled = false; }
    catch (e) {
      error.textContent = e.field ? e.message : '当前环境无法完成计算，请检查输入后重试。'; state.textContent = '未生成结果。';
      const input = field(e.field || form.querySelector('input,textarea').name);
      input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-errormessage', 'gl58-field-error'); input.focus();
    }
  });
  copy.addEventListener('click', async () => {
    const snapshot = revision, text = result.textContent;
    if (!text) return;
    copy.disabled = true; copyState.textContent = '正在复制…';
    try { await navigator.clipboard.writeText(text); if (snapshot === revision) copyState.textContent = '结果已复制。'; }
    catch (_) { if (snapshot === revision) copyState.textContent = '复制不可用，请手动选择结果文字。'; }
    finally { if (snapshot === revision) copy.disabled = false; }
  });
}());
