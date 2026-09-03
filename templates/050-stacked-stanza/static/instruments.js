(function () {
  'use strict';
  const instrument = document.querySelector('[data-instrument]');
  if (!instrument) return;
  const form = instrument.querySelector('form'), result = instrument.querySelector('[data-result]'), detail = instrument.querySelector('[data-detail]');
  const rows = instrument.querySelector('[data-rows]'), error = instrument.querySelector('[data-error]'), copy = instrument.querySelector('[data-copy-result]'), status = instrument.querySelector('[data-result-status]');
  const fields = [...form.querySelectorAll('input,textarea')];
  error.id = 'sz50-input-error'; fields.forEach(field => field.setAttribute('aria-describedby',error.id));
  let revision = 0, copyText = '';
  const value = name => form.elements[name].value.trim();
  function fail(field, message) { const problem = new Error(message); problem.field = field; throw problem; }
  function clear(message = '等待输入') {
    revision++; copyText = ''; copy.disabled = true; error.textContent = ''; status.textContent = ''; rows.replaceChildren();
    result.textContent = message; detail.textContent = '数据仅在当前浏览器处理。'; fields.forEach(field => field.removeAttribute('aria-invalid'));
  }
  function integer(name, min, max) {
    const raw = value(name), n = Number(raw);
    if (!/^\d+$/.test(raw) || !Number.isSafeInteger(n) || n < min || n > max) fail(name,'请输入 '+min+' 至 '+max+' 的普通整数。');
    return n;
  }
  function decimal(name, min, max) {
    const raw = value(name);
    if (!/^(?:\d+|\d*\.\d{1,3})$/.test(raw) || Number(raw) < min || Number(raw) > max) fail(name,'请输入 '+min+' 至 '+max+' 的普通十进制数，最多 3 位小数。');
    const [whole, fraction = ''] = raw.split('.'); return Number((whole || '0') + fraction.padEnd(3,'0'));
  }
  function text(name) {
    const raw = value(name);
    if (!raw || Array.from(raw).length > 20000) fail(name,'请输入 1–20000 个 Unicode 码点的文本。');
    return raw;
  }
  const algorithms = {
    'signature-planner'() {
      const pages = integer('pages',1,256), copies = integer('copies',1,10000);
      const sheets = Math.ceil(pages/4), padded = sheets*4;
      const page = n => n <= pages ? String(n) : '空白（'+n+'）';
      const entries = [['内容页数',pages],['补齐空白页',padded-pages],['全部纸张',sheets*copies+' 张 / '+copies+' 份']];
      for (let i=0;i<sheets;i++) {
        entries.push(['第 '+(i+1)+' 张正面',page(padded-i*2)+' / '+page(1+i*2)]);
        entries.push(['第 '+(i+1)+' 张反面',page(2+i*2)+' / '+page(padded-1-i*2)]);
      }
      return [sheets+' 张 / 每份','从外张到内张，给出左至右页序；打印机翻转、裁切和出血仍需打样核对。',entries];
    },
    'column-fit'() {
      const width = decimal('width',1,10000), margin = decimal('margin',0,10000), gutter = decimal('gutter',0,10000), minimum = decimal('minimum',.001,10000);
      const inner = width - 2*margin;
      if (inner <= 0) fail('margin','两侧页边占满了页面，请减少页边或增加页面宽度。');
      const count = Math.min(12,Math.floor((inner+gutter)/(minimum+gutter)));
      if (count < 1) fail('minimum','可用内宽小于最小列宽，连一列也放不下。');
      const actual = (inner-(count-1)*gutter)/count/1000;
      return [count+' 列','按同一单位计算等宽分栏，最多安排 12 列；实际列宽四舍五入到 3 位小数。',[
        ['实际列宽',actual.toFixed(3)],['页面总宽',(width/1000).toFixed(3)],['可用内宽',(inner/1000).toFixed(3)],['列间距合计',((count-1)*gutter/1000).toFixed(3)],['最小列宽',(minimum/1000).toFixed(3)]
      ]];
    },
    'reading-pace'() {
      const raw = text('text'), hanRate = integer('hanRate',100,2000), wordRate = integer('wordRate',50,1000);
      const han = (raw.match(/\p{Script=Han}/gu) || []).length;
      const other = (raw.replace(/\p{Script=Han}/gu,' ').match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || []).length;
      if (!han && !other) fail('text','文本中没有可计数的汉字或字母数字词元。');
      const numerator = (BigInt(han)*BigInt(wordRate)+BigInt(other)*BigInt(hanRate))*60n;
      const denominator = BigInt(hanRate)*BigInt(wordRate);
      const seconds = Number((numerator+denominator-1n)/denominator);
      return [seconds+' 秒','这是按输入速度线性累加的估算，不包含理解、停顿和注释阅读时间。',[
        ['汉字',han],['其他词元',other],['汉字速度',hanRate+' / 分钟'],['其他词元速度',wordRate+' / 分钟'],['时分秒',Math.floor(seconds/3600)+' 小时 '+Math.floor(seconds%3600/60)+' 分 '+seconds%60+' 秒']
      ]];
    },
    'balanced-lines'() {
      const raw = text('text'), columns = integer('columns',5,120), words = raw.split(/\s+/);
      if (words.length > 200) fail('text','最多处理 200 个空白分隔词元。');
      const width = word => Array.from(word).reduce((sum,character)=>sum+(/\p{Script=Han}/u.test(character)?2:1),0);
      const widths = words.map(width);
      if (widths.some(w=>w>columns)) fail('text','有词元宽于整行；请增加行宽或手动提供可断开的位置。');
      const n = words.length, costs = Array(n+1).fill(Infinity), next = Array(n); costs[n] = 0;
      for (let i=n-1;i>=0;i--) {
        let used = 0;
        for (let j=i;j<n;j++) {
          used += widths[j]+(j>i?1:0); if (used>columns) break;
          const candidate = (j===n-1?0:(columns-used)**2)+costs[j+1];
          if (candidate<costs[i]) { costs[i]=candidate; next[i]=j+1; }
        }
      }
      const lines = [];
      for (let i=0;i<n;i=next[i]) lines.push(words.slice(i,next[i]).join(' '));
      return [lines.length+' 行','用非末行剩余宽度的平方和衡量松散度；这里的单位是码点近似，不是目标字体的实际像素宽度。',[
        ['松散度',costs[0]],['行宽',columns+' 单位'],...lines.map((line,i)=>['第 '+(i+1)+' 行 · '+width(line)+' 单位',line])
      ]];
    },
    'dependency-order'() {
      const lines = text('graph').split(/\r?\n/).map(line=>line.trim()).filter(Boolean);
      if (lines.length > 60) fail('graph','最多安排 60 个章节。');
      const valid = /^[a-z][a-z0-9-]{0,23}$/;
      const nodes = lines.map(line=>{
        const parts = line.split(':');
        if (parts.length!==2 || !valid.test(parts[0].trim())) fail('graph','每行格式为 章节:前置一,前置二；章节标识须符合小写标识规则。');
        const name = parts[0].trim(), deps = parts[1].trim() ? parts[1].split(',').map(s=>s.trim()) : [];
        if (deps.some(d=>!valid.test(d))) fail('graph','前置章节标识无效或存在空项。');
        if (new Set(deps).size!==deps.length) fail('graph','同一章不能重复列出相同的前置章节。');
        if (deps.includes(name)) fail('graph','章节不能依赖自身：'+name);
        return {name,deps};
      });
      const names = new Set(nodes.map(n=>n.name));
      if (names.size!==nodes.length) fail('graph','章节标识重复，请为每章提供唯一标识。');
      for (const node of nodes) for (const dep of node.deps) if (!names.has(dep)) fail('graph','未声明的前置章节：'+dep);
      const done = new Set(), layers = [];
      while (done.size<nodes.length) {
        const ready = nodes.filter(n=>!done.has(n.name)&&n.deps.every(d=>done.has(d)));
        if (!ready.length) fail('graph','存在循环依赖，无法继续安排：'+nodes.filter(n=>!done.has(n.name)).map(n=>n.name).join('、'));
        layers.push(ready.map(n=>n.name)); ready.forEach(n=>done.add(n.name));
      }
      return [layers.length+' 层 / '+nodes.length+' 章','同层章节的前置条件都已满足；同层保留输入顺序。依赖层级不表示时间或工期。',[
        ['前置关系',nodes.reduce((sum,n)=>sum+n.deps.length,0)],...layers.map((layer,i)=>['第 '+(i+1)+' 层',layer.join(' · ')])
      ]];
    }
  };
  form.addEventListener('input',()=>clear('输入已修改，请重新整理'));
  form.addEventListener('change',()=>clear('输入已修改，请重新整理'));
  form.addEventListener('reset',()=>clear());
  form.addEventListener('submit',event=>{
    event.preventDefault(); clear();
    try {
      const [heading, explanation, entries] = algorithms[instrument.dataset.instrument]();
      result.textContent=heading; detail.textContent=explanation;
      entries.forEach(([label,text])=>{const row=document.createElement('div'),b=document.createElement('b'),span=document.createElement('span');b.textContent=label;span.textContent=String(text);row.append(b,span);rows.append(row);});
      copyText=[heading,explanation,...entries.map(([a,b])=>a+'：'+b)].join('\n');copy.disabled=false;
    } catch(problem) {
      result.textContent='输入有误';error.textContent=problem.message;
      const field=form.elements[problem.field];if(field){field.setAttribute('aria-invalid','true');field.focus();}
    }
  });
  copy.addEventListener('click',async()=>{
    if(copy.disabled||!copyText)return;const version=revision;
    try{await navigator.clipboard.writeText(copyText);if(version===revision)status.textContent='结果已复制';}
    catch(_){if(version===revision)status.textContent='暂时无法复制，请手动选择结果。';}
  });
}());
