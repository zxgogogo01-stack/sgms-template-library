/* Local broadcast controls. No audio access, remote requests or user-input storage. */
(() => {
  'use strict';
  const root = document.documentElement, theme = document.querySelector('[data-studio-toggle]');
  root.classList.add('ab74-enhanced');
  function paint(value) {
    root.dataset.studio = value === 'day' ? 'day' : 'night';
    if (theme) { theme.disabled = false; theme.textContent = root.dataset.studio === 'day' ? '夜班' : '日班'; theme.setAttribute('aria-label', root.dataset.studio === 'day' ? '切换到夜间演播室' : '切换到日间演播室'); }
  }
  try { paint(localStorage.getItem('amber-broadcast-074-studio')); } catch (_) { paint('night'); }
  theme?.addEventListener('click', () => { paint(root.dataset.studio === 'day' ? 'night' : 'day'); try { localStorage.setItem('amber-broadcast-074-studio', root.dataset.studio); } catch (_) { /* Optional preference. */ } });
  const menu = document.getElementById('ab74-menu'), toggle = document.getElementById('ab74-menu-button');
  function closeMenu(focus = false) { menu?.classList.remove('ab74-open'); toggle?.setAttribute('aria-expanded', 'false'); if (focus) toggle?.focus(); }
  toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); menu?.classList.toggle('ab74-open', open); if (open) menu?.querySelector('a')?.focus(); });
  menu?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') closeMenu(true); });
  matchMedia('(min-width: 961px)').addEventListener('change', () => closeMenu());
  function copyStatic(buttonSelector, textSelector, noteSelector) {
    const button = document.querySelector(buttonSelector); if (!button) return;
    button.disabled = false;
    button.addEventListener('click', async () => { const note = document.querySelector(noteSelector); try { await navigator.clipboard.writeText(document.querySelector(textSelector).textContent.trim()); note.textContent = '已复制。'; } catch (_) { note.textContent = '未能复制，请手动选择文字。'; } });
  }
  copyStatic('[data-copy-code]', '#ab74-code', '[data-code-state]');
  copyStatic('[data-copy-handoff]', '[data-handoff-text]', '[data-handoff-status]');
  const filter = document.querySelector('[data-programme-filter]');
  if (filter) {
    const entries = [...document.querySelectorAll('[data-programme-band]')];
    const refresh = () => { const band = filter.elements.band.value, word = filter.elements.keyword.value.normalize('NFKC').trim().toLocaleLowerCase(); let count = 0; entries.forEach(e => { e.hidden = !((band === 'all' || band === e.dataset.programmeBand) && e.querySelector('h3').textContent.normalize('NFKC').toLocaleLowerCase().includes(word)); if (!e.hidden) count++; }); filter.querySelector('[data-filter-state]').textContent = count ? '当前节目单有 ' + count + ' 段。' : '没有匹配节目，可修改条件或重置筛选。'; };
    filter.hidden = false; filter.addEventListener('input', refresh); filter.addEventListener('change', refresh); filter.addEventListener('submit', e => { e.preventDefault(); refresh(); }); filter.addEventListener('reset', () => setTimeout(refresh, 0)); refresh();
  }
  const search = document.querySelector('[data-channel-search]');
  if (search) { search.querySelector('button').disabled = false; const refresh = () => { const word = search.elements.query.value.normalize('NFKC').trim().toLocaleLowerCase(); let count = 0; document.querySelectorAll('[data-search-item]').forEach(e => { e.hidden = !e.textContent.normalize('NFKC').toLocaleLowerCase().includes(word); if (!e.hidden) count++; }); search.querySelector('[data-search-state]').textContent = count ? '找到 ' + count + ' 个入口。' : '没有匹配入口，请换一个关键词。'; }; search.addEventListener('input', refresh); search.addEventListener('submit', e => { e.preventDefault(); refresh(); }); refresh(); }
  const track = document.querySelector('[data-reading-progress]');
  if (track) { const measure = () => { const available = root.scrollHeight - innerHeight; track.style.width = (available > 0 ? Math.min(100, Math.max(0, scrollY / available * 100)) : 100) + '%'; }; addEventListener('scroll', measure, { passive: true }); addEventListener('resize', measure); addEventListener('load', measure); measure(); }

  const form = document.querySelector('[data-console]'); if (!form) return;
  const report = document.querySelector('[data-result-text]'), copy = document.querySelector('[data-copy-result]'), state = form.querySelector('[data-tool-state]'), copyNote = document.querySelector('[data-result-copy-state]');
  let revision = 0;
  function reject(field, message) { const error = new Error(message); error.field = field; throw error; }
  function read(field, maximum) { const raw = form.elements[field].value; if (!raw.isWellFormed() || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/u.test(raw)) reject(field, '包含不完整 Unicode 或禁止控制符。'); if ([...raw].length > maximum) reject(field, '原始输入最多 ' + maximum + ' 个 Unicode 码点。'); return raw; }
  function rows(field, maximum, count, empty = false) { const list = read(field, maximum).normalize('NFKC').split(/\r\n|\r|\n/).map((text, i) => ({ text: text.trim(), row: i + 1 })).filter(e => e.text); if ((!empty && !list.length) || list.length > count) reject(field, '需要 ' + (empty ? '0' : '1') + '–' + count + ' 个非空行。'); return list; }
  function parts(row, count, field) { const values = row.text.split('|').map(x => x.trim()); if (values.length !== count) reject(field, '第 ' + row.row + ' 行需要恰好 ' + (count - 1) + ' 个 |。'); return values; }
  function label(text, limit, field, line) { const clean = text.replace(/\s+/gu, ' '); if (!clean || [...clean].length > limit) reject(field, '第 ' + line + ' 行文字须为 1–' + limit + ' 个码点。'); return clean; }
  function integer(text, minimum, maximum, field) { if (!/^(?:0|[1-9][0-9]*)$/.test(text) || text.length > 10) reject(field, '请填写 ASCII 整数，不使用符号、小数、指数、单位或前导零。'); const value = Number(text); if (value < minimum || value > maximum) reject(field, '整数范围为 ' + minimum + '–' + maximum + '。'); return value; }
  const scalar = (field, low, high) => integer(read(field, 100).trim(), low, high, field);
  function choice(field, options) { const value = read(field, 100); if (!options.includes(value)) reject(field, '请选择给定的有效选项。'); return Number(value); }
  const clock = seconds => String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
  function voice() {
    const lines = rows('script', 10000, 80), speed = choice('speed', ['180', '220', '260']); let cursor = 0, halfTotal = 0, long = 0;
    const result = lines.map((e, i) => { const text = e.text.replace(/\s+/gu, ' '); if ([...text].length > 500) reject('script', '第 ' + e.row + ' 行归一化后超过 500 个码点。'); let half = 0; for (const ch of text) if (!/\s/u.test(ch)) half += /\p{P}/u.test(ch) ? 1 : 2; const seconds = Math.ceil(half * 30 / speed), start = cursor; cursor += seconds; halfTotal += half; if (seconds > 45) long++; return (i + 1) + '. 第 ' + e.row + ' 行 · ' + clock(start) + '–' + clock(cursor) + ' · ' + seconds + ' 秒 · ' + (half / 2) + ' U' + (seconds > 45 ? ' · 长段' : '') + '\n' + text; });
    return ['段落：' + lines.length + ' · 语速：' + speed + ' U/分', '发音单位：' + halfTotal / 2 + ' · 总秒数：' + cursor + ' · 时间：' + clock(cursor) + ' · 超过 45 秒：' + long, ...result, '每段分别向上取整，完整输出；这是字符模型，不是真人录音时长。'].join('\n\n');
  }
  function crossfade() {
    const seen = new Set(), list = rows('cues', 10000, 80).map(e => { const [a, b, c] = parts(e, 3, 'cues'), name = label(a, 60, 'cues', e.row), key = name.toLocaleLowerCase(); if (seen.has(key)) reject('cues', '第 ' + e.row + ' 行段名重复。'); seen.add(key); return { ...e, name, duration: integer(b, 1, 3600, 'cues'), overlap: integer(c, 0, 3600, 'cues') }; });
    let cursor = 0, rawTotal = 0, overlapTotal = 0;
    const lines = list.map((e, i) => { if ((!i && e.overlap) || (i && e.overlap > Math.min(list[i - 1].duration, e.duration))) reject('cues', '第 ' + e.row + ' 行重叠无效：首段须为 0，后段不得超过相邻两段任一时长。'); const start = cursor - e.overlap; cursor = start + e.duration; rawTotal += e.duration; overlapTotal += e.overlap; return (i + 1) + '. 第 ' + e.row + ' 行 · ' + e.name + '\n开始 ' + start + ' · 结束 ' + cursor + ' · 时长 ' + e.duration + ' · 与前段重叠 ' + e.overlap; });
    return ['段落：' + list.length + ' · 原长合计：' + rawTotal + ' · 重叠合计：' + overlapTotal + ' · 排程总秒数：' + cursor, ...lines, '总秒数=原长合计−重叠合计；允许完全叠化或多段同时存在，不验证实际音频。'].join('\n\n');
  }
  function decimal(n, denominator) { const scale = 1000000n, rounded = (n * scale * 2n + denominator) / (denominator * 2n); return rounded / scale + '.' + String(rounded % scale).padStart(6, '0'); }
  function pcm() {
    const rate = choice('sampleRate', ['8000', '16000', '22050', '24000', '44100', '48000', '88200', '96000', '192000']), bits = choice('bits', ['8', '16', '24', '32']), channels = scalar('channels', 1, 8), seconds = scalar('seconds', 1, 86400);
    const samples = BigInt(rate) * BigInt(seconds), byteRate = BigInt(rate) * BigInt(bits / 8) * BigInt(channels), bytes = byteRate * BigInt(seconds);
    return ['采样率：' + rate + ' Hz · 位深：' + bits + ' bit · 声道：' + channels + ' · 秒数：' + seconds, '每声道样本：' + samples + '\n全部样本值：' + samples * BigInt(channels), '每秒字节：' + byteRate + '\n净数据字节：' + bytes, '十进制 MB：' + decimal(bytes, 1000000n) + '\n二进制 MiB：' + decimal(bytes, 1048576n), '整数净字节为精确结果；容量显示六位小数四舍五入。不含容器头、压缩和元数据。'].join('\n\n');
  }
  function windows() {
    const total = scalar('total', 1, 86400), length = scalar('windowLength', 1, total), list = rows('occupied', 6000, 100, true).map(e => { const [a, b] = parts(e, 2, 'occupied'), start = integer(a, 0, total, 'occupied'), end = integer(b, 0, total, 'occupied'); if (start >= end) reject('occupied', '第 ' + e.row + ' 行开始须小于结束，区间不能倒置或为空。'); return { ...e, start, end }; });
    const merged = [];
    for (const e of [...list].sort((a, b) => a.start - b.start || a.end - b.end)) { const last = merged.at(-1); if (last && e.start <= last.end) last.end = Math.max(last.end, e.end); else merged.push({ start: e.start, end: e.end }); }
    const gaps = []; let cursor = 0;
    for (const e of merged) { if (cursor < e.start) gaps.push({ start: cursor, end: e.start }); cursor = e.end; } if (cursor < total) gaps.push({ start: cursor, end: total });
    const occupied = merged.reduce((n, e) => n + e.end - e.start, 0), fits = gaps.filter(e => e.end - e.start >= length);
    return ['节目边界：' + total + ' · 插播长度：' + length, '占用行：' + list.length + ' · 合并段：' + merged.length + ' · 占用秒数：' + occupied + ' · 空闲秒数：' + (total - occupied), '可放入窗口：' + fits.length + ' · 最早起点：' + (fits.length ? fits[0].start : '无'), '输入区间\n' + (list.map((e, i) => (i + 1) + '. 第 ' + e.row + ' 行 · [' + e.start + ',' + e.end + ')').join('\n') || '无'), '合并占用\n' + (merged.map((e, i) => (i + 1) + '. [' + e.start + ',' + e.end + ')').join('\n') || '无'), '全部空档\n' + (gaps.map((e, i) => (i + 1) + '. [' + e.start + ',' + e.end + ') · 长 ' + (e.end - e.start) + (e.end - e.start >= length ? ' · 起点 ' + e.start + '–' + (e.end - length) : ' · 不足以放入')).join('\n') || '无'), '区间为左闭右开，候选起点允许等于最晚值；仅演算，不修改真实排程。'].join('\n\n');
  }
  function pronunciation() {
    const seen = new Set(), rules = rows('terms', 8000, 50).map(e => { const [a, b] = parts(e, 2, 'terms'), word = label(a, 40, 'terms', e.row), reading = label(b, 100, 'terms', e.row); if (/\s/u.test(word)) reject('terms', '第 ' + e.row + ' 行原词不得包含空白。'); if (seen.has(word)) reject('terms', '第 ' + e.row + ' 行原词重复。'); seen.add(word); return { ...e, word, reading, points: [...word], hits: 0 }; });
    const text = read('copy', 20000).replace(/\r\n|\r/g, '\n').normalize('NFKC'); if (!text.trim()) reject('copy', '请填写需要定位的文字。');
    const points = [...text], ordered = [...rules].sort((a, b) => b.points.length - a.points.length || a.row - b.row), matches = []; let row = 1, column = 1;
    for (let i = 0; i < points.length;) {
      const hit = ordered.find(rule => rule.points.every((ch, j) => points[i + j] === ch));
      if (hit) { if (matches.length === 1000) reject('copy', '命中超过 1000 个，请缩短文字；不会输出截断报告。'); hit.hits++; matches.push({ position: i + 1, row, column, rule: hit }); i += hit.points.length; column += hit.points.length; }
      else { if (points[i] === '\n') { row++; column = 1; } else column++; i++; }
    }
    return ['词条：' + rules.length + ' · 规范化码点：' + points.length + ' · 命中：' + matches.length, '词表计数\n' + rules.map((e, i) => (i + 1) + '. 词表第 ' + e.row + ' 行 · ' + e.word + ' → ' + e.reading + ' · 次数 ' + e.hits).join('\n'), '全部定位\n' + (matches.map((e, i) => (i + 1) + '. 位置 ' + e.position + ' · 行 ' + e.row + ' 列 ' + e.column + ' · ' + e.rule.word + ' → ' + e.rule.reading + ' · 词表行 ' + e.rule.row).join('\n') || '无匹配'), '位置为规范化后的一基码点行列，不是原始字节偏移。区分大小写，最长词优先且不重叠，不验证读法真实性。'].join('\n\n');
  }
  function invalidate() { revision++; report.textContent = ''; copy.disabled = true; copyNote.textContent = ''; form.querySelectorAll('[aria-invalid]').forEach(e => { e.removeAttribute('aria-invalid'); e.removeAttribute('aria-errormessage'); }); form.querySelectorAll('[data-field-error]').forEach(e => { e.textContent = ''; }); state.textContent = '输入已变化，请重新生成报告。'; }
  form.querySelector('button[type=submit]').disabled = false;
  form.addEventListener('input', invalidate); form.addEventListener('change', e => { if (e.target.tagName === 'SELECT') invalidate(); }); form.addEventListener('reset', () => { invalidate(); setTimeout(() => { state.textContent = '已恢复示例，请重新计算。'; }, 0); });
  form.querySelectorAll('[data-voice-preset]').forEach(button => { button.disabled = false; button.addEventListener('click', () => { const samples = { brief: '先核对文字。\n再记录来源。\n保留更正入口。', mixed: '这一段交代材料的上下文。\n将材料的来源、适用边界与尚未确认的问题分别留下，便于下一次核对。\n最后记录时间。', long: '这一段仅用于测试口播时间模型。'.repeat(30) }; form.elements.script.value = samples[button.dataset.voicePreset]; invalidate(); state.textContent = '样例已装载，请重新生成报告。'; form.elements.script.focus(); }); });
  form.addEventListener('submit', e => { e.preventDefault(); invalidate(); try { report.textContent = [voice, crossfade, pcm, windows, pronunciation][Number(form.dataset.console)](); copy.disabled = false; state.textContent = '计算完成，完整报告在右侧或下方。'; } catch (error) { const field = error.field && form.elements[error.field]; if (field) { const note = form.querySelector('[data-field-error="' + error.field + '"]'); note.textContent = error.message; field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-errormessage', note.id); field.focus(); state.textContent = '输入未通过校验，请检查标记字段。'; } else state.textContent = '暂时无法生成报告，请刷新后重试。'; } });
  copy.addEventListener('click', async () => { if (copy.disabled || !report.textContent) return; const at = revision, value = report.textContent; try { await navigator.clipboard.writeText(value); if (at === revision) copyNote.textContent = '完整报告已复制。'; } catch (_) { if (at === revision) copyNote.textContent = '未能复制，请手动选择报告。'; } });
})();
