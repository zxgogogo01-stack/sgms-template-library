(() => {
  'use strict';
  const form = document.querySelector('[data-instrument]');
  if (!form) return;
  form.querySelector('button[type="submit"]').disabled = false;
  const result = document.querySelector('[data-result-text]');
  const state = document.querySelector('[data-result-state]');
  const error = form.querySelector('[data-input-error]');
  const copy = document.querySelector('[data-copy-result]');
  const copied = document.querySelector('[data-result-copy-state]');
  let revision = 0;
  function fail(message, field = 'rows') { const e = new Error(message); e.field = field; throw e; }
  function lines(max, min = 1) {
    const raw = form.elements.rows.value.trim();
    if (Array.from(raw).length > 6500) fail('输入超过 6500 个 Unicode 字符。');
    const rows = raw ? raw.split(/\r?\n/).map(s => s.trim()) : [];
    if (rows.length < min || rows.length > max || rows.some(s => !s)) fail('请填写 ' + min + '–' + max + ' 个非空行，内部不要留空行。');
    return rows;
  }
  function number(raw) {
    if (!/^-?(?:0|[1-9]\d*)(?:\.\d{1,3})?$/.test(raw) || raw.length > 12) fail('数值须为普通十进制，最多三位小数，不使用前导加号或千分位。');
    const negative = raw.startsWith('-');
    const [whole, fraction = ''] = raw.replace(/^-/, '').split('.');
    const n = BigInt(whole) * 1000n + BigInt(fraction.padEnd(3, '0'));
    if (n > 1000000000n) fail('每个数值必须在 −1,000,000 至 1,000,000 之间。');
    return negative ? -n : n;
  }
  function pairs(min) {
    return lines(100, min).map((line, i) => {
      const parts = line.split(',').map(s => s.trim());
      if (parts.length !== 2) fail('第 ' + (i + 1) + ' 行应为两个数，以英文逗号分隔。');
      return parts.map(number);
    });
  }
  // Rational rounding: nearest at the requested decimal place, ties away from zero.
  function ratio(n, d, places = 6) {
    if (d === 0n) throw new Error('Zero denominator');
    const negative = (n < 0n) !== (d < 0n);
    const a = n < 0n ? -n : n, b = d < 0n ? -d : d;
    const scale = 10n ** BigInt(places), q = (a * scale * 2n + b) / (2n * b);
    const text = q.toString().padStart(places + 1, '0');
    return (negative && q !== 0n ? '-' : '') + (places ? text.slice(0, -places) + '.' + text.slice(-places) : text);
  }
  const fixed = n => ratio(n, 1000n, 3);
  const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
  function calculate() {
    switch (form.dataset.instrument) {
      case 'run-strips': {
        const rows = lines(100).map(s => s.normalize('NFKC'));
        if (rows.some(s => Array.from(s).length > 60)) fail('归一化后每个符号最多 60 个 Unicode 字符。');
        const runs = [];
        rows.forEach((symbol, i) => {
          const last = runs.at(-1);
          if (last && last.symbol === symbol) { last.count++; last.end = i + 1; }
          else runs.push({symbol, count: 1, start: i + 1, end: i + 1});
        });
        return ['总记录：' + rows.length, '连续段：' + runs.length, '最长段：' + Math.max(...runs.map(r => r.count)), '', ...runs.map((r, i) => (i + 1) + '. [' + r.start + '–' + r.end + '] ' + r.symbol + ' × ' + r.count)].join('\n');
      }
      case 'area-trace': {
        const pts = pairs(2), segments = [];
        let total = 0n;
        for (let i = 1; i < pts.length; i++) {
          const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
          if (x1 <= x0) fail('横坐标 x 必须逐行严格递增；不自动排序或合并。');
          const area2 = (x1 - x0) * (y0 + y1);
          total += area2;
          segments.push(i + '. ' + fixed(x0) + ' → ' + fixed(x1) + '：' + ratio(area2, 2000000n));
        }
        return ['带符号面积：' + ratio(total, 2000000n), '点数：' + pts.length, '横向跨度：' + fixed(pts.at(-1)[0] - pts[0][0]), '', ...segments].join('\n');
      }
      case 'line-fit': {
        const pts = pairs(2), n = BigInt(pts.length);
        let sx = 0n, sy = 0n, xx = 0n, yy = 0n, xy = 0n;
        for (const [x, y] of pts) { sx += x; sy += y; xx += x * x; yy += y * y; xy += x * y; }
        const sxx = n * xx - sx * sx, syy = n * yy - sy * sy, sxy = n * xy - sx * sy;
        if (sxx === 0n) fail('所有 x 相同，无法确定直线斜率；至少需要两个不同的 x。');
        return ['点数：' + pts.length, '斜率 b：' + ratio(sxy, sxx), '截距 a：' + ratio(sy * sxx - sxy * sx, n * sxx * 1000n), 'R²：' + (syy === 0n ? '未定义（y 为常量）' : ratio(sxy * sxy, sxx * syy)), 'SSE：' + ratio(sxx * syy - sxy * sxy, sxx * n * 1000000n), '', '模型：y = a + bx', '仅为等权描述性拟合，不外推、不生成预测区间。'].join('\n');
      }
      case 'overlap-ruler': {
        const intervals = pairs(1).sort((a, b) => compare(a[0], b[0]) || compare(a[1], b[1]));
        const merged = [], events = new Map();
        let total = 0n;
        for (const [start, end] of intervals) {
          if (start >= end) fail('每个区间的开始必须小于结束。');
          total += end - start;
          events.set(start, (events.get(start) || 0) + 1);
          events.set(end, (events.get(end) || 0) - 1);
          const last = merged.at(-1);
          if (last && start <= last[1]) { if (end > last[1]) last[1] = end; }
          else merged.push([start, end]);
        }
        let depth = 0, peak = 0;
        for (const [, delta] of [...events].sort((a, b) => compare(a[0], b[0]))) { depth += delta; peak = Math.max(peak, depth); }
        const covered = merged.reduce((sum, [a, b]) => sum + b - a, 0n);
        return ['实际覆盖：' + fixed(covered), '输入长度合计：' + fixed(total), '合并段数：' + merged.length, '最大重叠：' + peak, '', ...merged.map(([a, b], i) => (i + 1) + '. [' + fixed(a) + ', ' + fixed(b) + ')')].join('\n');
      }
      case 'median-window': {
        const values = lines(101, 3).map(number), raw = form.elements.window.value.trim();
        if (!/^(?:[3-9]|1\d|2[01])$/.test(raw)) fail('窗口必须为 3–21 的奇数。', 'window');
        const w = Number(raw);
        if (w % 2 === 0 || w > values.length) fail('窗口必须为奇数，且不能长于输入序列。', 'window');
        const medians = [];
        for (let i = 0; i <= values.length - w; i++) {
          const sorted = values.slice(i, i + w).sort(compare);
          medians.push({start: i + 1, end: i + w, center: i + (w + 1) / 2, value: sorted[(w - 1) / 2]});
        }
        return ['输入数：' + values.length, '窗口：' + w, '输出数：' + medians.length, '', ...medians.map(m => '[' + m.start + '–' + m.end + '] 中心 ' + m.center + '：' + fixed(m.value))].join('\n');
      }
      default: throw new Error('Unknown instrument');
    }
  }
  function invalidate(message) {
    revision++;
    result.textContent = '';
    state.textContent = message;
    copied.textContent = '';
    error.textContent = '';
    copy.disabled = true;
    form.querySelectorAll('[aria-invalid]').forEach(e => {
      e.removeAttribute('aria-invalid');
      e.removeAttribute('aria-errormessage');
    });
  }
  form.addEventListener('input', () => invalidate('输入已变更，请重新计算。'));
  form.addEventListener('reset', () => invalidate('已恢复示例，请重新计算。'));
  form.addEventListener('submit', event => {
    event.preventDefault();
    invalidate('正在计算。');
    try {
      const text = calculate();
      result.textContent = text;
      state.textContent = '计算完成。';
      copy.disabled = false;
    } catch (e) {
      error.textContent = e.field ? e.message : '无法完成计算，请检查输入后重试。';
      state.textContent = '没有可用结果。';
      const field = form.elements[e.field || 'rows'];
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-errormessage', 'so52-field-error');
      field.focus();
    }
  });
  copy.addEventListener('click', async () => {
    const token = revision, text = result.textContent;
    if (!text || copy.disabled) return;
    copy.disabled = true;
    copied.textContent = '';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      if (token === revision) copied.textContent = '结果已复制。';
    } catch { if (token === revision) copied.textContent = '复制未获许可，请选中结果手动复制。'; }
    finally { if (token === revision) copy.disabled = false; }
  });
})();
