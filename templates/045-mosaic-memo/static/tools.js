(() => {
  'use strict';
  const panel = document.querySelector('[data-tool]');
  if (!panel) return;
  const form = panel.querySelector('form'), result = panel.querySelector('[data-result]');
  const detail = panel.querySelector('[data-detail]'), error = panel.querySelector('[data-error]');
  const button = panel.querySelector('[data-copy-result]'), notice = panel.querySelector('[data-copy-note]');
  const meter = panel.querySelector('[data-meter]');
  let copyText = '', version = 0;
  function field(name) { return form.elements.namedItem(name); }
  function reject(name, message) { field(name)?.setAttribute('aria-invalid', 'true'); throw new Error(message); }
  function number(name, min, max, integer = false) {
    const raw = field(name).value.trim(), n = Number(raw);
    if (!raw || !Number.isFinite(n) || n < min || n > max || (integer && !Number.isInteger(n))) reject(name, `请填写 ${min}–${max} 之间的${integer ? '整数' : '数字'}。`);
    return n;
  }
  function text(name) {
    const value = field(name).value.trim();
    if (!value || Array.from(value).length > 20000) reject(name, '文字不能为空，且不能超过 20,000 个字符。');
    return value;
  }
  function clear(waiting = false) {
    version++; copyText = ''; button.disabled = true; notice.textContent = ''; error.textContent = '';
    form.querySelectorAll('[aria-invalid]').forEach(f => f.removeAttribute('aria-invalid'));
    result.textContent = waiting ? '等待输入' : '输入已变更';
    detail.textContent = waiting ? '所有输入只在当前浏览器计算，不上传。' : '请重新计算，旧结果不再有效。';
    meter.replaceChildren();
  }
  form.addEventListener('input', () => clear());
  form.addEventListener('change', () => clear());
  form.addEventListener('reset', () => { clear(true); });
  form.addEventListener('submit', e => {
    e.preventDefault(); clear(true);
    let title, description, ratio = 0;
    try {
      switch (panel.dataset.tool) {
        case 'cut-note': {
          const chars = Array.from(text('text')), limit = number('limit', 1, 1000, true), ending = field('ending').value;
          if (!['ellipsis', 'plain'].includes(ending)) reject('ending', '请选择有效的结尾方式。');
          title = chars.length <= limit ? chars.join('') : chars.slice(0, ending === 'ellipsis' ? limit - 1 : limit).join('') + (ending === 'ellipsis' ? '…' : '');
          ratio = Array.from(title).length / chars.length;
          description = `原文 ${chars.length} 字符 · 输出 ${Array.from(title).length} 字符 · 保留 ${(ratio * 100).toFixed(1)}%。按 Unicode 码点计数，非语义摘要。`;
          break;
        }
        case 'priority-mix': {
          const impact = number('impact', 1, 10), confidence = number('confidence', 1, 10), effort = number('effort', 1, 10);
          const score = impact * confidence / effort;
          title = score.toFixed(2) + ' 分'; ratio = score / 100;
          description = `影响力 × 把握度 ÷ 投入 = ${impact} × ${confidence} ÷ ${effort}。仅用于同一评分尺度下的相对排序，不代表客观成功率。`;
          break;
        }
        case 'issue-budget': {
          const total = number('total', 100, 50000, true), weights = ['signal', 'decision', 'question'].map(n => number(n, 0, 100));
          const sum = weights.reduce((a, b) => a + b, 0);
          if (!sum) reject('signal', '至少一项权重必须大于零。');
          const exact = weights.map(w => total * w / sum), allocated = exact.map(Math.floor);
          const order = exact.map((v, i) => ({ i, remainder: v - allocated[i] })).sort((a, b) => b.remainder - a.remainder || a.i - b.i);
          const rest = total - allocated.reduce((a, b) => a + b, 0);
          for (let i = 0; i < rest; i++) allocated[order[i].i]++;
          title = allocated.join(' / '); ratio = allocated[0] / total;
          description = `观察 ${allocated[0]} · 判断 ${allocated[1]} · 问题 ${allocated[2]}；合计 ${total}。按权重分配，再用最大余数法补齐整数。`;
          break;
        }
        case 'evidence-mix': {
          const values = ['observed', 'inferred', 'action'].map(n => number(n, 0, 10000, true)), sum = values.reduce((a, b) => a + b, 0);
          if (!sum) reject('observed', '至少填写一条记录。');
          ratio = values[0] / sum; title = (ratio * 100).toFixed(1) + '% 直接观察';
          description = `共 ${sum} 条：观察 ${(values[0] / sum * 100).toFixed(1)}% · 推断 ${(values[1] / sum * 100).toFixed(1)}% · 行动 ${(values[2] / sum * 100).toFixed(1)}%。配比不等于证据质量。`;
          break;
        }
        case 'revision-delta': {
          const tokenize = value => new Set(value.toLocaleLowerCase().replace(/\p{Script=Han}/gu, ' $& ').match(/[\p{L}\p{N}]+/gu) || []);
          const a = tokenize(text('before')), b = tokenize(text('after'));
          if (!a.size || !b.size) reject(!a.size ? 'before' : 'after', '每份文字需至少包含一个字、单词或数字。');
          const shared = [...a].filter(t => b.has(t)).length, union = a.size + b.size - shared;
          ratio = 1 - shared / union; title = (ratio * 100).toFixed(1) + '% 词集变化';
          description = `共有 ${shared} · 新增 ${b.size - shared} · 移除 ${a.size - shared}。使用 Jaccard 距离；汉字逐字、其他文字按词计，不比较顺序、重复或含义。`;
          break;
        }
        default: throw new Error('未识别的仪器。');
      }
      result.textContent = title; detail.textContent = description;
      const bar = document.createElement('span'); bar.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`; meter.append(bar);
      copyText = title + '\n' + description; button.disabled = false;
    } catch (failure) {
      result.textContent = '需要修正输入'; error.textContent = failure.message;
      form.querySelector('[aria-invalid="true"]')?.focus();
    }
  });
  button.addEventListener('click', async () => {
    if (!copyText) return;
    const current = version, value = copyText;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const box = document.createElement('textarea'); box.value = value; box.style.position = 'fixed'; box.style.left = '-9999px'; document.body.append(box); box.select();
        const ok = document.execCommand('copy'); box.remove(); if (!ok) throw new Error('copy');
      }
      if (current === version) notice.textContent = '已复制结果';
    } catch (_) { if (current === version) notice.textContent = '复制不可用，请选择结果文字手动复制。'; }
  });
})();
