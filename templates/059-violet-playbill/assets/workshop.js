/* Five local rehearsal instruments. User-provided names never become HTML or URLs. */
(function () {
  'use strict';
  const form = document.querySelector('[data-instrument]');
  if (!form) return;
  const output = document.querySelector('[data-result-text]'), error = document.querySelector('[data-input-error]');
  const state = document.querySelector('[data-result-state]'), copy = document.querySelector('[data-copy-result]'), copyState = document.querySelector('[data-result-copy-state]');
  let revision = 0;
  const field = name => form.elements.namedItem(name), normalized = raw => raw.normalize('NFKC').trim();
  const fail = (name, message) => { const e = new Error(message); e.field = name; throw e; };
  const controls = [...form.querySelectorAll('input,textarea,select')];
  let snapshot = controls.map(e => e.value).join('\u0000');
  function clear() {
    revision++; snapshot = controls.map(e => e.value).join('\u0000');
    output.textContent = ''; error.textContent = ''; copyState.textContent = ''; copy.disabled = true; state.textContent = '等待运行。';
    controls.forEach(e => { e.removeAttribute('aria-invalid'); e.removeAttribute('aria-errormessage'); });
  }
  function lines(name, min, max) {
    const raw = field(name).value.normalize('NFKC');
    if (raw.length > 6000) fail(name, '每个列表最多 6000 个归一化 UTF-16 单元。');
    const text = raw.trim(), rows = text ? text.split(/\r\n|\r|\n/).map(s => s.trim()) : [];
    if (rows.length < min || rows.length > max || rows.some(s => !s)) fail(name, '请填写 ' + min + '–' + max + ' 行，列表内部不要留空行。');
    return rows;
  }
  function label(text, name) {
    const s = normalized(text);
    if (!s || [...s].length > 20 || /[,:\u0000-\u001f\u007f-\u009f]/.test(s)) fail(name, '名称须为 1–20 码点，不含逗号、冒号或控制字符。');
    return s;
  }
  function roster(name, min, max) {
    const list = lines(name, min, max).map(s => label(s, name)), seen = new Set();
    list.forEach(s => { const key = s.toLowerCase(); if (seen.has(key)) fail(name, '名称不能重复（忽略大小写与宽窄字符差异）。'); seen.add(key); });
    return list;
  }
  function integer(name, min, max) {
    const s = normalized(field(name).value);
    if (!/^(0|[1-9]\d*)$/.test(s) || s.length > 6 || +s < min || +s > max) fail(name, '请填写 ' + min + '–' + max + ' 的普通整数，不使用前导零、符号或指数。');
    return +s;
  }
  function lineComparison() {
    function items(name) {
      const raw = field(name).value;
      if (raw.length > 6000) fail(name, '每侧原文最多 6000 个 UTF-16 单元。');
      if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/.test(raw)) fail(name, '请移除换行与制表符以外的控制字符。');
      const list = raw.split(/\r\n|\r|\n/).map(normalized).filter(Boolean);
      if (list.some(s => [...s].length > 200)) fail(name, '单个规范化条目最多 200 码点。');
      const unique = [...new Set(list)];
      if (!unique.length || unique.length > 50) fail(name, '每侧须有 1–50 个不同的非空条目。');
      return unique;
    }
    const a = items('textA'), b = items('textB'), left = new Set(a), right = new Set(b);
    const common = a.filter(s => right.has(s)), onlyA = a.filter(s => !right.has(s)), onlyB = b.filter(s => !left.has(s));
    const list = (title, rows) => [title + '（' + rows.length + '）：', ...(rows.length ? rows.map(s => '· ' + s) : ['无'])];
    return [onlyA.length + onlyB.length ? '存在独有条目。' : '规范化条目集合一致。', 'A 侧不同项：' + a.length, 'B 侧不同项：' + b.length, ...list('共同项', common), ...list('仅 A', onlyA), ...list('仅 B', onlyB), '完全匹配不代表语义或事实正确。'].join('\n');
  }
  const pad = n => String(n).padStart(2, '0'), duration = n => Math.floor(n / 60) + ':' + pad(n % 60);
  function cueRuntime() {
    const names = new Set(), cues = lines('cues', 1, 40).map(row => {
      const p = row.split(',').map(s => s.trim());
      if (p.length !== 2) fail('cues', '每行格式为 名称,M:SS。');
      const name = label(p[0], 'cues'), key = name.toLowerCase();
      if (names.has(key)) fail('cues', '场次名称不能重复。'); names.add(key);
      const m = /^(0|[1-9]\d{0,2}):(\d{2})$/.exec(p[1]);
      if (!m || +m[2] > 59 || +m[1] * 60 + +m[2] === 0) fail('cues', '时长须为大于零的 M:SS，分钟 0–999，秒 00–59。');
      return { name, seconds: +m[1] * 60 + +m[2] };
    });
    const m = /^(\d{2}):(\d{2}):(\d{2})$/.exec(normalized(field('start').value));
    if (!m || +m[1] > 23 || +m[2] > 59 || +m[3] > 59) fail('start', '开场须为 24 小时制 HH:MM:SS。');
    const start = +m[1] * 3600 + +m[2] * 60 + +m[3], gap = integer('gap', 0, 3600);
    const stamp = n => { const day = Math.floor(n / 86400), t = n % 86400; return '第 ' + day + ' 天 ' + pad(Math.floor(t / 3600)) + ':' + pad(Math.floor(t % 3600 / 60)) + ':' + pad(t % 60); };
    let cursor = start, performance = 0;
    const schedule = cues.map((cue, i) => { const begin = cursor; cursor += cue.seconds; performance += cue.seconds; const line = (i + 1) + '. ' + cue.name + ' / ' + stamp(begin) + ' → ' + stamp(cursor) + ' / ' + duration(cue.seconds); if (i < cues.length - 1) cursor += gap; return line; });
    return ['场次数：' + cues.length, '演出时长：' + duration(performance), '场间时长：' + duration(gap * (cues.length - 1)), '总时长：' + duration(cursor - start), '结束位置：' + stamp(cursor), ...schedule, '第 0 天为开场当日；不推断真实日期或时区。'].join('\n');
  }
  function castMatching() {
    const roles = roster('roles', 1, 12), people = roster('people', 1, 12);
    const roleId = new Map(roles.map((s, i) => [s.toLowerCase(), i])), personId = new Map(people.map((s, i) => [s.toLowerCase(), i]));
    const graph = roles.map(() => []), seen = new Set();
    lines('edges', 0, 72).forEach(row => {
      const p = row.split(',').map(s => s.trim());
      if (p.length !== 2) fail('edges', '关系每行为 角色,候选人。');
      const r = roleId.get(label(p[0], 'edges').toLowerCase()), a = personId.get(label(p[1], 'edges').toLowerCase());
      if (r === undefined || a === undefined) fail('edges', '关系只能引用列表内的角色和候选人。');
      const key = r + ':' + a; if (seen.has(key)) fail('edges', '同一角色与候选人关系不能重复。'); seen.add(key); graph[r].push(a);
    });
    const assigned = people.map(() => -1);
    function augment(r, visited) {
      for (const p of graph[r]) if (!visited.has(p)) {
        visited.add(p);
        if (assigned[p] === -1 || augment(assigned[p], visited)) { assigned[p] = r; return true; }
      }
      return false;
    }
    let count = 0; roles.forEach((_, r) => { if (augment(r, new Set())) count++; });
    const rolePeople = roles.map(() => -1); assigned.forEach((r, p) => { if (r !== -1) rolePeople[r] = p; });
    return ['角色数：' + roles.length, '候选人数：' + people.length, '允许关系：' + seen.size, '最大匹配：' + count, '未分配角色：' + (roles.length - count), ...roles.map((r, i) => r + ' → ' + (rolePeople[i] < 0 ? '未匹配' : people[rolePeople[i]])), '未使用候选人：' + (people.filter((_, p) => assigned[p] < 0).join('、') || '无'), '这里只验证关系中的最大数量，不评价能力、偏好或公平性。'].join('\n');
  }
  function luhnTicket() {
    const mode = field('mode').value, digits = normalized(field('digits').value);
    if (mode !== 'append' && mode !== 'verify') fail('mode', '请选择生成末位或验证完整编号。');
    const min = mode === 'append' ? 1 : 2, max = mode === 'append' ? 31 : 32;
    if (!/^\d+$/.test(digits) || digits.length < min || digits.length > max) fail('digits', '当前模式须填写 ' + min + '–' + max + ' 位纯数字，不含内部分隔符。');
    function sum(text) { let s = 0; for (let i = text.length - 1, position = 0; i >= 0; i--, position++) { let n = +text[i]; if (position % 2) { n *= 2; if (n > 9) n -= 9; } s += n; } return s; }
    if (mode === 'append') {
      const digit = (10 - sum(digits + '0') % 10) % 10;
      return ['原编号：' + digits, '校验位：' + digit, '完整编号：' + digits + digit, '总位数：' + (digits.length + 1), '校验位只能检测部分抄写错误，不能证明真实性。'].join('\n');
    }
    const remainder = sum(digits) % 10, payload = digits.slice(0, -1), expected = (10 - sum(payload + '0') % 10) % 10;
    return ['完整编号：' + digits, '校验结果：' + (remainder === 0 ? '通过' : '未通过'), '加权和模 10：' + remainder, '按前缀计算的末位：' + expected, '总位数：' + digits.length, '通过不代表编号存在，也不是身份认证。'].join('\n');
  }
  function combinations() {
    const choices = roster('choices', 1, 12), take = integer('take', 1, 6);
    if (take > choices.length) fail('take', '每组数量不能大于候选数。');
    const results = [];
    function collect(start, chosen) {
      if (chosen.length === take) { results.push(chosen.map(i => choices[i]).join('、')); return; }
      for (let i = start; i <= choices.length - (take - chosen.length); i++) collect(i + 1, [...chosen, i]);
    }
    collect(0, []);
    return ['候选数量：' + choices.length, '每组数量：' + take, '组合总数：' + results.length, ...results.map((s, i) => (i + 1) + '. ' + s), '只枚举组合，不判断表演顺序、适配性或冲突。'].join('\n');
  }
  const calculate = { 'line-comparison': lineComparison, 'cue-runtime': cueRuntime, 'cast-matching': castMatching, 'luhn-ticket': luhnTicket, 'programme-combinations': combinations }[form.dataset.instrument];
  if (!calculate) return;
  form.querySelector('button[type="submit"]').disabled = false;
  form.addEventListener('input', clear);
  form.addEventListener('change', () => { if (controls.map(e => e.value).join('\u0000') !== snapshot) clear(); });
  form.addEventListener('reset', () => { clear(); setTimeout(() => { snapshot = controls.map(e => e.value).join('\u0000'); }, 0); });
  form.addEventListener('submit', event => {
    event.preventDefault(); clear();
    try { output.textContent = calculate(); state.textContent = '已生成，仅在本页保留。'; copy.disabled = false; }
    catch (e) {
      error.textContent = e.field ? e.message : '当前环境无法完成计算，请检查输入后重试。'; state.textContent = '没有生成结果。';
      const target = field(e.field || controls[0].name); target.setAttribute('aria-invalid', 'true'); target.setAttribute('aria-errormessage', 'vp59-field-error'); target.focus();
    }
  });
  copy.addEventListener('click', async () => {
    const version = revision, text = output.textContent; if (!text) return;
    copy.disabled = true; copyState.textContent = '正在复制…';
    try { await navigator.clipboard.writeText(text); if (version === revision) copyState.textContent = '结果已复制。'; }
    catch (_) { if (version === revision) copyState.textContent = '复制不可用，请手动选择结果文字。'; }
    finally { if (version === revision) copy.disabled = false; }
  });
}());
