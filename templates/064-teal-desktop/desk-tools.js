"use strict";
function deskCompute(kind,values){
 'use strict';
 const fail=(field,message)=>{const e=new Error(message);e.field=field;throw e;};
 const text=(field,max=20000)=>{const s=String(values[field]??'').replace(/\r\n?/g,'\n');if(Array.from(s).length>max)fail(field,'输入最多允许 '+max+' 个 Unicode 字符。');if(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]|\p{Surrogate}/u.test(s))fail(field,'不接受控制字符或不完整的 Unicode 字符。');if(!s.trim())fail(field,'请填写非空输入。');return s;};
 const choose=(field,allowed)=>{const s=values[field];if(!allowed.includes(s))fail(field,'请选择有效选项。');return s;};
 const integer=(field,max)=>{const s=text(field,20).normalize('NFKC').trim();if(!/^[1-9]\d*$/.test(s)||Number(s)>max)fail(field,'请输入 1 至 '+max+' 的整数，不使用前导零、小数或指数。');return Number(s);};
 const lines=(field,max)=>{const list=text(field).split('\n').map(s=>s.trim()).filter(Boolean);if(list.length>max)fail(field,'最多允许 '+max+' 个非空行。');return list;};
 const table=()=>{
  const s=text('data'),choice=choose('delimiter',['auto','comma','tab','semicolon','pipe']),chars={tab:'\t',comma:',',semicolon:';',pipe:'|'},labels={tab:'Tab',comma:'逗号',semicolon:'分号',pipe:'竖线'};
  let selected=choice,delim,label;
  if(choice==='auto'){const candidates=['tab','comma','semicolon','pipe'],counts={tab:0,comma:0,semicolon:0,pipe:0};let quoted=false;for(let i=0;i<s.length;i++){if(s[i]==='"'){if(quoted&&s[i+1]==='"')i++;else quoted=!quoted;continue;}if(!quoted)for(const k of candidates)if(s[i]===chars[k])counts[k]++;}
   selected=candidates.reduce((a,b)=>counts[b]>counts[a]?b:a);if(counts[selected]===0){delim=',';label='单列';}}
  delim??=chars[selected];label??=labels[selected];
  const rows=[];let row=[],field='',inQuotes=false,closed=false;
  const pushField=()=>{row.push(field);field='';closed=false;},pushRow=()=>{pushField();rows.push(row);row=[];};
  for(let i=0;i<s.length;i++){const c=s[i];if(inQuotes){if(c==='"'){if(s[i+1]==='"'){field+='"';i++;}else{inQuotes=false;closed=true;}}else field+=c;continue;}
   if(closed){if(c===delim)pushField();else if(c==='\n')pushRow();else if(!/\s/u.test(c))fail('data','闭合引号后存在非法字符。');continue;}
   if(c===delim)pushField();else if(c==='\n')pushRow();else if(c==='"'){if(field.length)fail('data','双引号只能从字段开头进入。');inQuotes=true;}else field+=c;
  }
  if(inQuotes)fail('data','存在未闭合的双引号字段。');pushRow();
  const clean=rows.filter(r=>!(r.length===1&&!r[0].trim()));if(!clean.length)fail('data','没有可检查的逻辑行。');if(clean.length>200)fail('data','最多允许 200 个逻辑行。');const columns=Math.max(...clean.map(r=>r.length));if(columns>20)fail('data','最多允许 20 列。');
  return {rows:clean,columns,label};
 };
 if(kind==='table-shape'){
  const {rows,columns,label}=table(),ragged=rows.filter(r=>r.length!==columns).length,empty=rows.reduce((n,r)=>n+r.filter(x=>!x.trim()).length,0);
  return {text:['表格形状检查报告','分隔符：'+label,'逻辑行：'+rows.length,'最大列：'+columns,'列数不齐：'+ragged,'空单元格：'+empty,'检查只描述文本结构，不验证事实。'].join('\n'),preview:rows};
 }
 if(kind==='column-turn'){
  const {rows,columns}=table(),mode=choose('ragged',['strict','pad']),missing=rows.reduce((n,r)=>n+columns-r.length,0);if(missing&&mode==='strict')fail('data','各行列数不同。请补齐数据，或明确选择空值补齐。');
  const result=Array.from({length:columns},(_,c)=>rows.map(r=>r[c]??'')),quote=s=>'"'+s.replaceAll('"','""')+'"';
  return {text:['行列转置报告','输入：'+rows.length+' 行 × '+columns+' 列','输出：'+columns+' 行 × '+rows.length+' 列','补齐空值：'+missing,'CSV 开始（所有字段保留引号）',...result.map(r=>r.map(quote).join(',')),'CSV 结束','不执行公式；导入表格软件前请检查以 = + - @ 开头的单元格。'].join('\n'),preview:result};
 }
 if(kind==='key-groups'){
  const mode=choose('matching',['exact','nfkc','fold']),keys=lines('keys',200),groups=new Map();
  keys.forEach((raw,i)=>{if(Array.from(raw).length>200)fail('keys','每个记录键最多 200 个字符。');const key=mode==='exact'?raw:mode==='nfkc'?raw.normalize('NFKC'):raw.normalize('NFKC').toLowerCase();if(!groups.has(key))groups.set(key,[]);groups.get(key).push(i+1);});
  const duplicate=[...groups.values()].filter(g=>g.length>1);
  return {text:['记录键分组报告','非空记录：'+keys.length,'不同键：'+groups.size,'重复组：'+duplicate.length,'多余记录：'+(keys.length-groups.size),'行号按忽略空行后的记录顺序。',...[...groups].map(([k,ids])=>JSON.stringify(k)+' | '+ids.length+' 次 | '+ids.join(', '))].join('\n')};
 }
 if(kind==='address-loupe'){
  const list=lines('addresses',60),origins=new Set(),report=[];
  list.forEach((raw,i)=>{if(Array.from(raw).length>2048||/[\s\\]/u.test(raw)||/%(?![0-9a-f]{2})/i.test(raw)||!/^https?:\/\//i.test(raw))fail('addresses','第 '+(i+1)+' 行须为完整 HTTP(S) 地址，不能有空白、反斜线或损坏的百分号编码。');
   let u;try{u=new URL(raw);}catch{fail('addresses','第 '+(i+1)+' 行地址无法解析。');}
   if(!u.hostname||u.username||u.password||!['https:','http:'].includes(u.protocol))fail('addresses','第 '+(i+1)+' 行地址无效或含用户名、密码。请移除凭据。');
   origins.add(u.origin);report.push('#'+(i+1),'来源：'+u.origin,'路径：'+u.pathname,'查询参数数：'+[...u.searchParams].length,'片段：'+(u.hash||'（无）'),'');
  });
  return {text:['地址结构检查报告','地址数：'+list.length,'不同来源：'+origins.size,'仅按浏览器 URL 规则解析，不联网、不验证安全或可达性。','查询参数值不显示；请勿粘贴含登录凭据的地址。',...report].join('\n')};
 }
 if(kind==='sample-apportion'){
  const count=integer('sample',100000),rows=lines('strata',50),data=rows.map((raw,i)=>{const parts=raw.split('|');if(parts.length!==2)fail('strata','第 '+(i+1)+' 行格式应为 名称 | 总量。');const name=parts[0].trim(),number=parts[1].normalize('NFKC').trim();if(!name||Array.from(name).length>80||!/^[1-9]\d*$/.test(number)||Number(number)>1000000000)fail('strata','每层名称限 1–80 字，总量限 1–1000000000 整数。');return {name,n:BigInt(number),i};});
  const total=data.reduce((n,r)=>n+r.n,0n),sample=BigInt(count);if(sample>total)fail('sample','样本总数不能大于所有层的总量。');
  const allocated=data.map(r=>({...r,take:sample*r.n/total,remainder:sample*r.n%total}));let left=sample-allocated.reduce((n,r)=>n+r.take,0n);
  const rank=[...allocated].sort((a,b)=>a.remainder===b.remainder?a.i-b.i:a.remainder>b.remainder?-1:1);for(let i=0;i<Number(left);i++)rank[i].take++;
  return {text:['分层样本分配报告','层数：'+data.length,'总体总量：'+total,'样本总数：'+sample,'方法：最大余数法；余数相同按输入顺序。',...allocated.map(r=>'#'+(r.i+1)+' '+r.name+' | 总量 '+r.n+' | 分配 '+r.take),'该工具只分配整数数量，不执行随机抽样或保证统计代表性。'].join('\n')};
 }
 fail('data','未知工具。');
}
(function toolRuntime(){
 const form=document.querySelector('[data-desk-tool]');if(!form)return;
 const result=document.querySelector('[data-result-text]'),preview=document.querySelector('[data-table-window]'),copy=document.querySelector('[data-copy-result]'),copyState=document.querySelector('[data-result-copy-state]'),state=document.querySelector('[data-run-state]'),badge=document.querySelector('[data-report-state]');
 let revision=0,latest='',signature='';
 const values=()=>Object.fromEntries([...form.elements].filter(e=>e.name).map(e=>[e.name,e.value])),stamp=()=>JSON.stringify(values());
 const clearErrors=()=>{for(const e of form.querySelectorAll('[aria-invalid]')){e.removeAttribute('aria-invalid');e.removeAttribute('aria-errormessage');}for(const e of form.querySelectorAll('[data-input-error]'))e.textContent='';};
 const invalidate=()=>{revision++;latest='';result.textContent='';preview.replaceChildren();copy.disabled=true;copyState.textContent='';badge.textContent='WAITING';};
 const changed=()=>{if(stamp()===signature)return;signature=stamp();invalidate();clearErrors();state.textContent='输入已变化，请重新运行。';};
 signature=stamp();form.querySelector('[type=submit]').disabled=false;form.addEventListener('input',changed);form.addEventListener('change',changed);
 form.addEventListener('reset',()=>{invalidate();clearErrors();state.textContent='已重置，等待运行。';setTimeout(()=>{signature=stamp();},0);});
 form.addEventListener('submit',e=>{e.preventDefault();invalidate();clearErrors();signature=stamp();try{const r=deskCompute(form.dataset.deskTool,values());latest=r.text;result.textContent=r.text;copy.disabled=false;badge.textContent='CHECKED';state.textContent='已生成本地报告。';if(r.preview){const table=document.createElement('table'),caption=document.createElement('caption');caption.textContent='前 10 行、前 10 列；每格最多显示 120 字符。';table.append(caption);const tbody=document.createElement('tbody');for(const row of r.preview.slice(0,10)){const tr=document.createElement('tr');for(const value of row.slice(0,10)){const td=document.createElement('td'),chars=Array.from(value);td.textContent=chars.length>120?chars.slice(0,120).join('')+'…':value;tr.append(td);}tbody.append(tr);}table.append(tbody);preview.append(table);}}
 catch(error){badge.textContent='CHECK INPUT';state.textContent='未生成报告，请修正输入。';const field=form.elements.namedItem(error.field)||form.querySelector('textarea,input,select'),message=document.getElementById(field.id+'-error');field.setAttribute('aria-invalid','true');field.setAttribute('aria-errormessage',message.id);message.textContent=error.message;field.focus();}});
 copy.addEventListener('click',async()=>{if(!latest)return;const rev=revision,value=latest;copy.disabled=true;try{await navigator.clipboard.writeText(value);if(revision===rev)copyState.textContent='报告已复制。';}catch{if(revision===rev)copyState.textContent='浏览器未允许复制，请手动选择报告文字。';}finally{if(revision===rev)copy.disabled=false;}});
})();
