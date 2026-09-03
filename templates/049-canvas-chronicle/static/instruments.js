(function () {
  'use strict';
  const instrument = document.querySelector('[data-instrument]');
  if (!instrument) return;
  const form = instrument.querySelector('form');
  const result = instrument.querySelector('[data-result]');
  const detail = instrument.querySelector('[data-detail]');
  const rows = instrument.querySelector('[data-rows]');
  const error = instrument.querySelector('[data-error]');
  const copy = instrument.querySelector('[data-copy-result]');
  const status = instrument.querySelector('[data-result-status]');
  const fields = [...form.querySelectorAll('input,textarea')];
  error.id = 'cc49-input-error';
  fields.forEach(field => field.setAttribute('aria-describedby', error.id));
  let clipboardText = '', generation = 0;
  const value = name => form.elements[name].value.trim();
  function fail(name, message) { const problem = new Error(message); problem.field = name; throw problem; }
  function clear(message = '等待输入') {
    generation++; clipboardText = ''; copy.disabled = true; status.textContent = ''; error.textContent = '';
    fields.forEach(field => field.removeAttribute('aria-invalid'));
    result.textContent = message; detail.textContent = '输入不会离开当前浏览器。'; rows.replaceChildren();
  }
  function integer(raw, min, max, name) {
    if (!/^-?\d+$/.test(raw) || !Number.isSafeInteger(Number(raw)) || Number(raw) < min || Number(raw) > max)
      fail(name, '请输入 ' + min + ' 至 ' + max + ' 之间的普通整数。');
    return Number(raw);
  }
  const computations = {
    'interval-union'() {
      const lines = value('intervals').split(/\r?\n/).map(x => x.trim()).filter(Boolean);
      if (!lines.length || lines.length > 200) fail('intervals', '请填写 1–200 行区间，每行两个整数，以逗号分隔。');
      const intervals = lines.map(line => {
        const pair = line.split(',').map(x => x.trim());
        if (pair.length !== 2) fail('intervals', '每行须为 起点,终点。');
        const [a, b] = pair.map(x => integer(x, -1000000, 1000000, 'intervals'));
        if (b <= a) fail('intervals', '每个区间的终点必须大于起点。');
        return [a, b];
      }).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      const merged = [], total = intervals.reduce((sum, [a,b]) => sum + b - a, 0);
      for (const [a,b] of intervals) {
        const last = merged.at(-1);
        if (last && a <= last[1]) last[1] = Math.max(last[1], b); else merged.push([a,b]);
      }
      const coverage = merged.reduce((sum, [a,b]) => sum + b - a, 0);
      const span = merged.at(-1)[1] - merged[0][0];
      return [coverage + ' / 覆盖长度', '按半开区间 [起点,终点) 计算；相邻区间合并。长度单位由输入定义。', [
        ['输入总长度', total], ['重复覆盖长度', total - coverage], ['首尾跨度', span], ['跨度内空白', span - coverage],
        ...merged.map(([a,b], i) => ['合并段 ' + (i+1), '[' + a + ', ' + b + ')'])
      ]];
    },
    'utc-offset'() {
      const raw = value('stamp'); const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(raw);
      if (!match) fail('stamp', '请填写有效的日期和时分。');
      const [year, month, day, hour, minute] = match.slice(1).map(Number);
      const date = new Date(0); date.setUTCFullYear(year, month - 1, day); date.setUTCHours(hour, minute, 0, 0);
      if (year < 1 || year > 9999 || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day || hour > 23 || minute > 59)
        fail('stamp', '日期须真实存在，年份范围为 0001–9999。');
      function offset(name) {
        const m = /^([+-])(\d{2}):(\d{2})$/.exec(value(name));
        if (!m || +m[2] > 14 || +m[3] > 59 || (+m[2] === 14 && +m[3] !== 0)) fail(name, '偏移须为 ±HH:MM，范围为 −14:00 至 +14:00。');
        return (m[1] === '-' ? -1 : 1) * (+m[2] * 60 + +m[3]);
      }
      const from = offset('from'), to = offset('to');
      const utc = new Date(date.getTime() - from * 60000);
      const target = new Date(utc.getTime() + to * 60000);
      if ([utc, target].some(d => d.getUTCFullYear() < 1 || d.getUTCFullYear() > 9999)) fail('stamp', '换算结果超出 0001–9999 年，请调整输入。');
      const display = d => d.toISOString().slice(0,16).replace('T',' ');
      return [display(target), '仅计算固定偏移，不推断地理时区、夏令时或历史时区规则。', [
        ['来源时刻', raw.replace('T',' ') + ' ' + value('from')], ['UTC 时刻', display(utc) + ' +00:00'],
        ['目标偏移', value('to')], ['时差（分钟）', to - from]
      ]];
    },
    'sequence-gaps'() {
      const raw = value('sequence'); const parts = raw ? raw.split(/[,\s]+/) : [];
      if (!parts.length || parts.length > 500) fail('sequence', '请填写 1–500 个序号，使用逗号或空白分隔。');
      const counts = new Map();
      parts.forEach(part => { const n = integer(part, 1, 1000000, 'sequence'); counts.set(n, (counts.get(n) || 0) + 1); });
      const unique = [...counts.keys()].sort((a,b) => a - b), missing = [];
      let count = 0;
      for (let i = 1; i < unique.length; i++) {
        const start = unique[i-1] + 1, end = unique[i] - 1;
        if (end >= start) { count += end - start + 1; missing.push(start === end ? String(start) : start + '–' + end); }
      }
      const repeats = [...counts].filter(([,n]) => n > 1).sort((a,b) => a[0] - b[0]);
      return [count + ' 个缺号 / ' + (parts.length - unique.length) + ' 次重复', '只检查已输入最小值至最大值之间的整数，不推测范围外序号。重复次数按额外出现次数计。', [
        ['检查范围', unique[0] + '–' + unique.at(-1)], ['独立序号', unique.length],
        ['缺号区间', missing.join('，') || '无'], ['重复明细', repeats.map(([n,c]) => n + ' × ' + c).join('，') || '无']
      ]];
    },
    'timeline-position'() {
      function decimal(name) {
        const raw = value(name);
        if (!/^-?(?:\d+|\d*\.\d{1,6})$/.test(raw) || Math.abs(Number(raw)) > 1000000000) fail(name, '请填写 −10 亿至 10 亿之间的普通十进制数，最多 6 位小数。');
        const negative = raw.startsWith('-'); const [whole, fraction = ''] = raw.replace('-','').split('.');
        return BigInt((whole || '0') + fraction.padEnd(6,'0')) * (negative ? -1n : 1n);
      }
      const start = decimal('start'), end = decimal('end'), point = decimal('point');
      if (end <= start) fail('end', '终点必须大于起点。');
      const delta = point - start, span = end - start;
      const percent = (Number(delta) / Number(span) * 100).toFixed(3);
      const position = point < start ? '起点之前' : point > end ? '终点之后' : '区间内部（含端点）';
      return [percent + '%', '相对位置 =（事件位置 − 起点）÷（终点 − 起点）。允许区间外结果，不强行截断为 0–100%。', [
        ['起点', value('start')], ['终点', value('end')], ['事件位置', value('point')], ['所在位置', position]
      ]];
    },
    'version-order'() {
      const lines = value('versions').split(/\r?\n/).map(x => x.trim()).filter(Boolean);
      if (!lines.length || lines.length > 100) fail('versions', '请填写 1–100 行数字点号版本。');
      const versions = lines.map((raw, index) => {
        if (!/^\d{1,18}(?:\.\d{1,18}){0,7}$/.test(raw)) fail('versions', '每个版本由 1–8 个数字段组成，每段最多 18 位；不接受前缀或预发布标签。');
        const parts = raw.split('.').map(BigInt), normalized = parts.slice();
        while (normalized.length > 1 && normalized.at(-1) === 0n) normalized.pop();
        return {raw, index, parts, key: normalized.join('.')};
      });
      versions.sort((a,b) => {
        for (let i = 0; i < Math.max(a.parts.length, b.parts.length); i++) {
          const x = a.parts[i] || 0n, y = b.parts[i] || 0n;
          if (x !== y) return x < y ? -1 : 1;
        }
        return a.index - b.index;
      });
      const groups = new Set(versions.map(v => v.key)).size;
      return [versions.length + ' 个版本 / ' + groups + ' 个等价组', '数字段逐段比较，缺省尾段视为 0；等价项保留输入顺序。这不是完整的 SemVer 解析器。',
        versions.map((v,i) => [String(i+1).padStart(2,'0'), v.raw + ' · 标准组 ' + v.key])];
    }
  };
  form.addEventListener('input', () => clear('输入已修改，请重新读取'));
  form.addEventListener('change', () => clear('输入已修改，请重新读取'));
  form.addEventListener('reset', () => clear());
  form.addEventListener('submit', event => {
    event.preventDefault(); clear();
    try {
      const [heading, explanation, entries] = computations[instrument.dataset.instrument]();
      result.textContent = heading; detail.textContent = explanation;
      entries.forEach(([label, text]) => {
        const row = document.createElement('div'), b = document.createElement('b'), span = document.createElement('span');
        b.textContent = label; span.textContent = String(text); row.append(b,span); rows.append(row);
      });
      clipboardText = [heading, explanation, ...entries.map(([a,b]) => a + '：' + b)].join('\n'); copy.disabled = false;
    } catch (problem) {
      result.textContent = '输入有误'; error.textContent = problem.message;
      const field = form.elements[problem.field];
      if (field) { field.setAttribute('aria-invalid', 'true'); field.focus(); }
    }
  });
  copy.addEventListener('click', async () => {
    if (!clipboardText || copy.disabled) return;
    const version = generation;
    try { await navigator.clipboard.writeText(clipboardText); if (version === generation) status.textContent = '结果已复制'; }
    catch (_) { if (version === generation) status.textContent = '暂时无法复制，请手动选择结果。'; }
  });
}());
