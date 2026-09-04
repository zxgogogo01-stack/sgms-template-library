(() => {
  'use strict';
  const form = document.querySelector('[data-instrument]');
  if (!form) return;
  form.querySelector('[type="submit"]').disabled = false;
  const output = document.querySelector('[data-result-text]'), state = document.querySelector('[data-result-state]');
  const error = form.querySelector('[data-input-error]'), copy = document.querySelector('[data-copy-result]'), copyState = document.querySelector('[data-result-copy-state]');
  let revision = 0;
  const raw = name => form.elements[name].value.trim();
  const fail = (message, field) => { const e = new Error(message); e.field = field; throw e; };
  const abs = x => x < 0n ? -x : x;
  function gcd(a, b) { a = abs(a); b = abs(b); while (b) [a, b] = [b, a % b]; return a; }
  const mod = (a, m) => (a % m + m) % m;
  function integer(name, min, max) {
    const text = raw(name);
    if (!/^-?(?:0|[1-9]\d*)$/.test(text) || text.length > 15) fail('请填写普通整数，不使用前导加号、前导零、小数或科学计数法。', name);
    const value = BigInt(text);
    if (value < min || value > max) fail('此字段须在 ' + min + ' 至 ' + max + ' 之间。', name);
    return value;
  }
  function natural(name, max) {
    if (!/^(?:0|[1-9]\d*)$/.test(raw(name))) fail('请填写普通非负整数，不带符号或前导零。', name);
    return integer(name, 0n, max);
  }
  function decimal(n, d, places = 12) {
    const q = (abs(n) * (10n ** BigInt(places)) * 2n + d) / (2n * d);
    const text = q.toString().padStart(places + 1, '0');
    return (n < 0n && q ? '-' : '') + text.slice(0, -places) + '.' + text.slice(-places);
  }
  function fraction(name) {
    const parts = raw(name).split('/').map(s => s.trim());
    if (parts.length !== 2 || parts.some(s => !/^-?(?:0|[1-9]\d*)$/.test(s) || s.length > 14)) fail('请填写 分子/分母，二者均为普通整数。', name);
    let [n, d] = parts.map(BigInt);
    if (abs(n) > 1000000000000n || abs(d) > 1000000000000n) fail('分子与分母的绝对值不能超过 1,000,000,000,000。', name);
    if (!d) fail('分母不能为 0。', name);
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n, d); return [n / g, d / g];
  }
  function logic() {
    const source = raw('expression');
    if (!source || source.length > 200) fail('请填写 1–200 字符的布尔表达式。', 'expression');
    const expr = source.replace(/\s+/g, '');
    if (!/^[A-D01!&|()]+$/.test(expr)) fail('只接受 A–D、0/1、!、&、| 和括号。', 'expression');
    let position = 0;
    function atom(depth) {
      if (depth > 32) fail('括号或连续否定的嵌套过深，最多 32 层。', 'expression');
      const c = expr[position++];
      if (c === '!') return {op: '!', child: atom(depth + 1)};
      if (c === '(') { const node = or(depth + 1); if (expr[position++] !== ')') fail('括号不完整或位置不正确。', 'expression'); return node; }
      if (c && /^[A-D01]$/.test(c)) return {leaf: c};
      fail('第 ' + position + ' 个位置需要变量、常量、否定或左括号。', 'expression');
    }
    function and(depth) { let node = atom(depth); while (expr[position] === '&') { position++; node = {op: '&', left: node, right: atom(depth)}; } return node; }
    function or(depth) { let node = and(depth); while (expr[position] === '|') { position++; node = {op: '|', left: node, right: and(depth)}; } return node; }
    const tree = or(0);
    if (position !== expr.length) fail('表达式有多余字符，变量之间必须写明运算符。', 'expression');
    const vars = [...new Set(expr.match(/[A-D]/g) || [])].sort();
    function evaluate(node, values) { if (node.leaf) return node.leaf === '1' ? true : node.leaf === '0' ? false : values[node.leaf]; if (node.op === '!') return !evaluate(node.child, values); return node.op === '&' ? evaluate(node.left, values) && evaluate(node.right, values) : evaluate(node.left, values) || evaluate(node.right, values); }
    const count = 2 ** vars.length, rows = []; let truth = 0;
    for (let i = 0; i < count; i++) {
      const bits = vars.map((_, j) => (i >> (vars.length - 1 - j)) & 1), values = Object.fromEntries(vars.map((key, j) => [key, !!bits[j]]));
      const value = Number(evaluate(tree, values)); truth += value;
      rows.push((bits.length ? bits.join('  ') : '—') + '  →  ' + value);
    }
    return ['表达式：' + expr, '变量：' + (vars.join(' ') || '无'), '行数：' + count, '成立行数：' + truth, '类型：' + (truth === count ? '永真式' : truth === 0 ? '矛盾式' : '可满足但非永真'), '', (vars.join('  ') || '常量') + '  →  输出', ...rows].join('\n');
  }
  function calculate() {
    switch (form.dataset.instrument) {
      case 'logic-grid': return logic();
      case 'rational-pair': {
        const [a, b] = fraction('left'), [c, d] = fraction('right'), op = raw('operation'); let n, den;
        if (op === '+') { n = a * d + c * b; den = b * d; }
        else if (op === '-') { n = a * d - c * b; den = b * d; }
        else if (op === '*') { n = a * c; den = b * d; }
        else if (op === '/') { if (!c) fail('不能除以零分数，请修改右侧分数。', 'right'); n = a * d; den = b * c; }
        else fail('请选择有效运算。', 'operation');
        if (den < 0n) { n = -n; den = -den; }
        const g = gcd(n, den); n /= g; den /= g;
        return ['最简分数：' + n + '/' + den, '分子：' + n, '分母：' + den, '小数近似：' + decimal(n, den), '', '输入：(' + a + '/' + b + ') ' + op + ' (' + c + '/' + d + ')', '小数为十二位舍入值；精确结果以分数为准。'].join('\n');
      }
      case 'choice-count': {
        const n = natural('n', 200n), k = natural('k', 200n);
        if (k > n) fail('选取数量 k 不能大于元素总数 n。', 'k');
        const r = k < n - k ? k : n - k; let c = 1n, permutation = 1n;
        for (let i = 1n; i <= r; i++) c = c * (n - r + i) / i;
        for (let i = 0n; i < k; i++) permutation *= n - i;
        return ['n：' + n + '；k：' + k, '无序组合 C：' + c, '有序排列 P：' + permutation, '', '元素互不相同、不重复选取。', '空选择计数为 1；结果不是概率。'].join('\n');
      }
      case 'congruence-axis': {
        const a = integer('a', -1000000000000n, 1000000000000n), b = integer('b', -1000000000000n, 1000000000000n), m = natural('modulus', 1000000n);
        if (m < 1n) fail('模数 m 必须为 1–1,000,000 的整数。', 'modulus');
        let oldR = mod(a, m), r = m, oldS = 1n, s = 0n;
        while (r) { const q = oldR / r; [oldR, r] = [r, oldR - q * r]; [oldS, s] = [s, oldS - q * s]; }
        const g = oldR, condition = a + 'x ≡ ' + b + ' (mod ' + m + ')';
        if (b % g !== 0n) return ['条件：' + condition, '最大公约数：' + g, '结果：无整数解', '原因：最大公约数不能整除 b。'].join('\n');
        const step = m / g, x0 = mod(oldS * (b / g), step);
        return ['条件：' + condition, '最大公约数：' + g, '最小非负代表：' + x0, '解族：x = ' + x0 + ' + ' + step + 't', '模 m 不同余数解：' + g, '', 't 为任意整数；用参数形式完整表示，不逐个枚举。'].join('\n');
      }
      case 'base-bridge': {
        const from = Number(natural('from', 36n)), to = Number(natural('to', 36n));
        if (from < 2) fail('输入进制必须在 2–36 之间。', 'from');
        if (to < 2) fail('输出进制必须在 2–36 之间。', 'to');
        const text = raw('value').toUpperCase(), negative = text.startsWith('-'), digits = negative ? text.slice(1) : text;
        if (!/^[0-9A-Z]{1,200}$/.test(digits)) fail('请输入最多 200 个有效数位，可带一个前导负号。', 'value');
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; let value = 0n;
        for (const digit of digits) { const d = alphabet.indexOf(digit); if (d >= from) fail('数位 ' + digit + ' 不属于 ' + from + ' 进制。', 'value'); value = value * BigInt(from) + BigInt(d); }
        let working = value, converted = '';
        do { converted = alphabet[Number(working % BigInt(to))] + converted; working /= BigInt(to); } while (working);
        const sign = negative && value !== 0n ? '-' : '';
        return ['目标进制结果：' + sign + converted, '输入进制：' + from, '输出进制：' + to, '十进制：' + sign + value, '绝对值二进制位数：' + value.toString(2).length, '', '按整数数值转换，不解释补码、字节序或字符编码。'].join('\n');
      }
      default: throw new Error('Unknown instrument');
    }
  }
  function invalidate(message) {
    revision++; output.textContent = ''; error.textContent = ''; copyState.textContent = ''; copy.disabled = true; state.textContent = message;
    form.querySelectorAll('[aria-invalid]').forEach(e => { e.removeAttribute('aria-invalid'); e.removeAttribute('aria-errormessage'); });
  }
  form.addEventListener('input', () => invalidate('输入条件已变化，请重新推演。'));
  form.addEventListener('change', () => invalidate('输入条件已变化，请重新推演。'));
  form.addEventListener('reset', () => invalidate('已恢复示例，请重新推演。'));
  form.addEventListener('submit', e => {
    e.preventDefault(); invalidate('正在推演。');
    try { output.textContent = calculate(); copy.disabled = false; state.textContent = '推演完成。'; }
    catch (e) {
      error.textContent = e.field ? e.message : '无法完成推演，请检查输入后重试。'; state.textContent = '没有可用结果。';
      const field = form.elements[e.field || (form.dataset.instrument === 'logic-grid' ? 'expression' : 'value')];
      if (field) { field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-errormessage', 'aa53-field-error'); field.focus(); }
    }
  });
  copy.addEventListener('click', async () => {
    const current = revision, text = output.textContent;
    if (!text || copy.disabled) return;
    copy.disabled = true; copyState.textContent = '';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Unavailable');
      await navigator.clipboard.writeText(text);
      if (current === revision) copyState.textContent = '推演结果已复制。';
    } catch { if (current === revision) copyState.textContent = '复制未获许可，请选中结果手动复制。'; }
    finally { if (current === revision) copy.disabled = false; }
  });
})();
