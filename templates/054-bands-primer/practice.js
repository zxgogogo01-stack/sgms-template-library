(() => {
  'use strict';
  const form = document.querySelector('[data-instrument]'); if (!form) return;
  form.querySelector('[type=submit]').disabled = false;
  const output = document.querySelector('[data-result-text]'), state = document.querySelector('[data-result-state]'), error = document.querySelector('[data-input-error]'), copy = document.querySelector('[data-copy-result]'), copied = document.querySelector('[data-result-copy-state]');
  let revision = 0;
  const raw = name => form.elements[name].value.normalize('NFKC').trim();
  function fail(message, field) { const e = new Error(message); e.field = field; throw e; }
  function integer(name, min, max) { const s = raw(name); if (!/^(0|[1-9]\d*)$/.test(s) || s.length > 7) fail('请使用普通非负整数，不带符号、小数、前导零或指数。', name); const n = Number(s); if (n < min || n > max) fail('此字段须为 ' + min + '–' + max + ' 的整数。', name); return n; }
  function lines(name, max) { const text = raw(name); if (!text || text.length > 5000) fail('请填写 1–5000 字符的输入。', name); const rows = text.split(/\r?\n/); if (rows.length > max || rows.some(r => !r.trim())) fail('最多 ' + max + ' 行，行与行之间不留空行。', name); return rows.map(s => s.trim()); }
  const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return a; };
  function decimal(text, field, max) { if (!/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(text) || text.length > 12) fail('数值须为非负普通小数，最多两位小数，无前导零或指数。', field); const [a, b = ''] = text.split('.'), value = BigInt(a) * 100n + BigInt(b.padEnd(2, '0')); if (value > max) fail('得分/满分最多 1,000,000，权重最多 100。', field); return value; }
  const fixed = cents => (cents / 100n) + '.' + (cents % 100n).toString().padStart(2, '0');
  function calculate() {
    switch (form.dataset.instrument) {
      case 'lesson-load': {
        const courses = integer('courses', 1, 120), days = integer('days', 1, 365), minutes = integer('minutes', 1, 600);
        const active = Math.min(courses, days), low = Math.floor(courses / active), extra = courses % active;
        const daily = Array.from({length:active}, (_, i) => low + (i < extra ? 1 : 0));
        return ['课程总数：' + courses, '实际学习日：' + active, '留白天数：' + (days - active), '总学习分钟：' + courses * minutes, '高峰日分钟：' + Math.max(...daily) * minutes, '', ...daily.map((n, i) => '第 ' + (i + 1) + ' 日：' + n + ' 课 / ' + n * minutes + ' 分钟'), '', '先安排较多课数，学习日之间最多相差一课；未计休息。'].join('\n');
      }
      case 'prerequisite-order': {
        const rows = lines('dependencies', 20), graph = new Map();
        for (const [i, row] of rows.entries()) {
          const pair = row.split(':'); if (pair.length !== 2) fail('第 ' + (i + 1) + ' 行须为 标识: 前置标识列表。', 'dependencies');
          const id = pair[0].trim().toUpperCase(), deps = pair[1].trim() ? pair[1].split(',').map(s => s.trim().toUpperCase()) : [];
          if (!/^[A-Z][A-Z0-9_-]{0,15}$/.test(id) || deps.some(s => !/^[A-Z][A-Z0-9_-]{0,15}$/.test(s))) fail('标识用字母开头的 1–16 位字母、数字、下划线或连字符。', 'dependencies');
          if (graph.has(id) || new Set(deps).size !== deps.length) fail('任务标识或同一行的前置标识重复。', 'dependencies');
          if (deps.includes(id)) fail('任务不能依赖自身。', 'dependencies'); graph.set(id, deps);
        }
        for (const deps of graph.values()) if (deps.some(d => !graph.has(d))) fail('每个前置标识都必须另占一行声明。', 'dependencies');
        const completed = new Set(), layers = [];
        while (completed.size < graph.size) { const ready = [...graph.keys()].filter(id => !completed.has(id) && graph.get(id).every(d => completed.has(d))).sort(); if (!ready.length) fail('存在依赖环，无法形成完整顺序；请检查互相依赖的任务。', 'dependencies'); layers.push(ready); ready.forEach(id => completed.add(id)); }
        return ['任务数：' + graph.size, '前置层数：' + layers.length, '', ...layers.map((ids, i) => '第 ' + (i + 1) + ' 层：' + ids.join('、')), '', '稳定顺序：' + layers.flat().join(' → '), '同层任务无未完成的前置依赖；层数不等于工期。'].join('\n');
      }
      case 'review-dates': {
        const date = raw('start'); if (!/^20\d{2}-\d{2}-\d{2}$/.test(date)) fail('起始日期使用 2000–2099 年的 YYYY-MM-DD。', 'start');
        const start = new Date(date + 'T00:00:00Z'); if (!Number.isFinite(start.getTime()) || start.toISOString().slice(0, 10) !== date) fail('起始日期不存在，请核对月份与天数。', 'start');
        const text = raw('gaps'); if (!text || text.length > 200) fail('填写 1–12 个间隔，用逗号分开。', 'gaps'); const chunks = text.split(',').map(s => s.trim());
        if (chunks.length > 12 || chunks.some(s => !/^[1-9]\d{0,2}$/.test(s) || Number(s) > 365)) fail('每个间隔为 1–365 天，最多 12 个，不留空项。', 'gaps');
        let sum = 0; const dates = chunks.map((s, i) => { sum += Number(s); const d = new Date(start.getTime() + sum * 86400000); return '第 ' + (i + 1) + ' 次：' + d.toISOString().slice(0, 10) + '（累计 ' + sum + ' 天）'; });
        return ['起点：' + date, '复习次数：' + chunks.length, ...dates, '', '每个间隔从上一次日期继续累加；按 UTC 公历日计算，不跳过周末或节假日。'].join('\n');
      }
      case 'focus-blocks': {
        const budget = integer('budget', 1, 1440), focus = integer('focus', 1, 180), rest = integer('rest', 0, 60);
        let cursor = 0, focusTotal = 0, restTotal = 0, sessions = 0; const schedule = [];
        while (cursor < budget) { const length = Math.min(focus, budget - cursor); sessions++; schedule.push('专注 ' + sessions + '：第 ' + cursor + '–' + (cursor + length) + ' 分钟'); focusTotal += length; cursor += length; if (budget - cursor <= rest) break; if (rest) { schedule.push('休息：第 ' + cursor + '–' + (cursor + rest) + ' 分钟'); cursor += rest; restTotal += rest; } }
        return ['专注段数：' + sessions, '专注分钟：' + focusTotal, '休息分钟：' + restTotal, '未使用分钟：' + (budget - cursor), '', ...schedule, '', '允许最后一段专注缩短；只在还能安排下一段专注时插入完整休息，不以休息收尾。'].join('\n');
      }
      case 'weighted-rubric': {
        const rows = lines('scores', 20), seen = new Set(); let numerator = 0n, denominator = 1n, weightSum = 0n; const details = [];
        rows.forEach((row, i) => { const parts = row.split(',').map(s => s.trim()); if (parts.length !== 4 || !parts[0] || [...parts[0]].length > 30) fail('第 ' + (i + 1) + ' 行须为 名称,得分,满分,权重；名称 1–30 字。', 'scores'); const [name, a, b, c] = parts; if (seen.has(name.toLowerCase())) fail('评分项名称不能重复。', 'scores'); seen.add(name.toLowerCase()); const score = decimal(a, 'scores', 100000000n), max = decimal(b, 'scores', 100000000n), weight = decimal(c, 'scores', 10000n); if (!max || score > max) fail('满分须大于零，得分不能大于满分。', 'scores'); numerator = numerator * max + score * weight * denominator; denominator *= max; const g = gcd(numerator, denominator); numerator /= g; denominator /= g; weightSum += weight; details.push(name + '：' + fixed(score) + ' / ' + fixed(max) + '；权重 ' + fixed(weight)); });
        if (!weightSum) fail('至少有一个评分项的权重大于零。', 'scores'); const den = denominator * weightSum, percent = (numerator * 10000n * 2n + den) / (2n * den);
        return ['加权完成度：' + fixed(percent) + '%', '评分项：' + rows.length, '权重合计：' + fixed(weightSum), '', ...details, '', '先按各项满分归一化，再按权重求平均；精确有理数计算，百分比两位四舍五入。结果不代表能力认证。'].join('\n');
      }
      default: throw new Error('Unknown instrument');
    }
  }
  function invalidate(message) { revision++; output.textContent = ''; error.textContent = ''; copied.textContent = ''; copy.disabled = true; state.textContent = message; form.querySelectorAll('[aria-invalid]').forEach(e => { e.removeAttribute('aria-invalid'); e.removeAttribute('aria-errormessage'); }); }
  form.addEventListener('input', () => invalidate('条件已改动，请重新整理。'));
  form.addEventListener('reset', () => invalidate('已恢复示例，请重新整理。'));
  form.addEventListener('submit', e => { e.preventDefault(); invalidate('正在整理。'); try { output.textContent = calculate(); state.textContent = '整理完成。'; copy.disabled = false; } catch (e) { error.textContent = e.field ? e.message : '暂时无法整理，请检查输入。'; state.textContent = '没有可用结果。'; const field = e.field && form.elements[e.field]; if (field) { field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-errormessage', 'bp54-field-error'); field.focus(); } } });
  copy.addEventListener('click', async () => { const current = revision, text = output.textContent; if (!text || copy.disabled) return; copy.disabled = true; copied.textContent = ''; try { if (!navigator.clipboard?.writeText) throw new Error('Unavailable'); await navigator.clipboard.writeText(text); if (current === revision) copied.textContent = '结果已复制。'; } catch { if (current === revision) copied.textContent = '复制未获许可，请选中结果手动复制。'; } finally { if (current === revision) copy.disabled = false; } });
})();
