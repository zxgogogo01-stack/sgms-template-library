"use strict";
function herbariumCompute(kind,values){
 'use strict';
 const fail=(field,message)=>{const error=new Error(message);error.field=field;throw error;};
 const read=(field,max,empty=false)=>{const s=String(values[field]??'').replace(/\r\n?/g,'\n');if(Array.from(s).length>max)fail(field,'最多允许 '+max+' 个 Unicode 字符。');if(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]|\p{Surrogate}/u.test(s))fail(field,'请移除控制字符或不完整的 Unicode 字符。');if(!empty&&!s.trim())fail(field,'请输入非空文字。');return s;};
 const choice=(field,list)=>{if(!list.includes(values[field]))fail(field,'请选择有效选项。');return values[field];};
 const transform=(s,mode)=>mode==='exact'?s:mode==='nfkc'?s.normalize('NFKC'):s.normalize('NFKC').toLowerCase();
 const boundedLines=(field,maxChars,maxRows,empty=false)=>{const rows=read(field,maxChars,empty).split('\n').map(s=>s.trim()).filter(Boolean);if(rows.length>maxRows)fail(field,'最多允许 '+maxRows+' 个非空行。');return rows;};
 if(kind==='claim-scan'){
  const input=read('claims',6000),chars=Array.from(input),sentences=[];let buffer='';
  const digit=c=>/^\d$/u.test((c||'').normalize('NFKC')),push=()=>{if(buffer.trim())sentences.push(buffer.trim());buffer='';};
  for(let i=0;i<chars.length;i++){const c=chars[i];buffer+=c;let boundary=c==='\n'||'。！？!?；;'.includes(c);if(c==='.'||c==='．')boundary=!(digit(chars[i-1])&&digit(chars[i+1]))&&(!chars[i+1]||/^\s$/u.test(chars[i+1]));if(boundary){if(chars[i+1]&&'”’"\'】）)]'.includes(chars[i+1]))buffer+=chars[++i];push();}}
  push();if(sentences.length>80)fail('claims','最多允许 80 个非空句子。');
  const lexicon={promise:['保证','确保','一定','必然','永久','零风险','无风险','稳赚'],extreme:['最高','最低','第一','最快','唯一','全网','百分之百','100%'],fresh:['最新','当前','目前','实时','截至','现行']},labels={promise:'承诺',extreme:'极值',fresh:'时效',numeric:'数字'},counts={promise:0,extreme:0,fresh:0,numeric:0};
  const records=sentences.map(sentence=>{const normalized=sentence.normalize('NFKC').toLowerCase(),tags=[];for(const k of ['promise','extreme','fresh'])if(lexicon[k].some(word=>normalized.includes(word)))tags.push(k);if(/\d+(?:\.\d+)?\s*(?:%|元|美元|人民币|天|日|小时|分钟|倍|bps|基点)/iu.test(normalized))tags.push('numeric');tags.forEach(k=>counts[k]++);return{sentence,tags:tags.map(k=>labels[k])};});
  return {text:['词类扫描报告','句子：'+records.length,'需复核句：'+records.filter(r=>r.tags.length).length,...Object.entries(counts).map(([k,n])=>labels[k]+'：'+n),'命中仅提示人工复核，不是事实或合规结论。',...records.map((r,i)=>(i+1)+'. ['+(r.tags.join('/')||'未命中')+'] '+r.sentence)].join('\n'),records};
 }
 if(kind==='keyword-quadrat'){
  const mode=choice('matching',['exact','nfkc','fold']),input=read('source',6000),words=boundedLines('terms',1500,20),windowText=read('window',3).normalize('NFKC').trim();
  if(!/^(0|[1-9]\d*)$/.test(windowText)||Number(windowText)>40)fail('window','上下文长度请输入 0–40 的整数。');const width=Number(windowText);
  const source=Array.from(transform(input,mode));if(source.length>18000)fail('source','规范化后的文字最多允许 18000 个字符。');const terms=[...new Set(words.map(word=>{if(Array.from(word).length>60)fail('terms','每个关键词最多 60 个字符。');return transform(word,mode);}))];
  const hits=[],counts=[];for(const word of terms){const needle=Array.from(word);let count=0;for(let start=0;start<=source.length-needle.length;start++){if(!needle.every((c,j)=>c===source[start+j]))continue;count++;if(hits.length>=1000)fail('source','命中超过 1000 处，请缩短文字或减少关键词。');hits.push({word,position:start+1,left:source.slice(Math.max(0,start-width),start).join(''),match:needle.join(''),right:source.slice(start+needle.length,start+needle.length+width).join('')});}counts.push(JSON.stringify(word)+'：'+count);}
  return {text:['关键词样方报告','不同关键词：'+terms.length,'总命中：'+hits.length,'位置是处理后文字的 1 基 Unicode 字符序号；允许重叠命中。',...counts,...hits.map(h=>JSON.stringify(h.word)+' @'+h.position+'\n  '+JSON.stringify(h.left)+' | '+JSON.stringify(h.match)+' | '+JSON.stringify(h.right))].join('\n')};
 }
 if(kind==='unicode-press'){
  const input=read('specimen',1000),mode=choice('normalization',['NFC','NFD','NFKC','NFKD']),normalized=input.normalize(mode),before=Array.from(input),after=Array.from(normalized);if(after.length>4000)fail('specimen','规范化结果超过 4000 个字符。');
  const inventory=s=>{const map=new Map();for(const char of s)map.set(char,(map.get(char)||0)+1);return [...map].sort((a,b)=>a[0].codePointAt(0)-b[0].codePointAt(0)).map(([c,n])=>'U+'+c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')+' '+JSON.stringify(c)+' × '+n);};
  return {text:['字符压片对照','方式：'+mode,'原文字符：'+before.length,'结果字符：'+after.length,'是否变化：'+(input===normalized?'否':'是'),'原文：'+JSON.stringify(input),'结果：'+JSON.stringify(normalized),'原文码点清单：',...inventory(before),'结果码点清单：',...inventory(after),'按 Unicode 码点计数，不等于字形或语言学字符数量。'].join('\n')};
 }
 if(kind==='word-distance'){
  const mode=choice('matching',['exact','nfkc','fold']),rawA=read('left',120,true),rawB=read('right',120,true),a=Array.from(transform(rawA,mode)),b=Array.from(transform(rawB,mode));if(a.length>120)fail('left','处理后的左侧文字最多 120 个字符。');if(b.length>120)fail('right','处理后的右侧文字最多 120 个字符。');
  const dp=Array.from({length:a.length+1},()=>new Uint16Array(b.length+1));for(let i=0;i<=a.length;i++)dp[i][0]=i;for(let j=0;j<=b.length;j++)dp[0][j]=j;
  for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  let i=a.length,j=b.length;const steps=[];while(i||j){if(i&&j&&dp[i][j]===dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1)){steps.push({op:a[i-1]===b[j-1]?'保留':'替换',a:a[i-1],b:b[j-1],i,j});i--;j--;}else if(i&&dp[i][j]===dp[i-1][j]+1){steps.push({op:'删除',a:a[i-1],b:'',i,j});i--;}else{steps.push({op:'插入',a:'',b:b[j-1],i,j});j--;}}steps.reverse();
  const count=op=>steps.filter(s=>s.op===op).length;
  return {text:['词形编辑距离','左侧字符：'+a.length,'右侧字符：'+b.length,'编辑距离：'+dp[a.length][b.length],'替换：'+count('替换'),'删除：'+count('删除'),'插入：'+count('插入'),'单位成本 Levenshtein 距离；按处理后的 Unicode 码点，不含交换操作。','同成本优先对角配对，再删除，再插入。',...steps.map(s=>s.op+' ['+s.i+','+s.j+'] '+JSON.stringify(s.a)+' → '+JSON.stringify(s.b))].join('\n')};
 }
 if(kind==='token-inventory'){
  const mode=choice('matching',['exact','nfkc','fold']);
  const collect=field=>{const rows=boundedLines(field,16000,200,true),map=new Map();rows.forEach(row=>{if(Array.from(row).length>80)fail(field,'每个词项最多 80 个字符。');const token=transform(row,mode);map.set(token,(map.get(token)||0)+1);});return {map,size:rows.length};};
  const left=collect('before'),right=collect('after'),keys=[...new Set([...left.map.keys(),...right.map.keys()])];let add=0,remove=0,keep=0;const rows=keys.map(k=>{const l=left.map.get(k)||0,r=right.map.get(k)||0;add+=Math.max(0,r-l);remove+=Math.max(0,l-r);keep+=Math.min(l,r);return JSON.stringify(k)+' | 原 '+l+' | 现 '+r+' | 差 '+(r-l>0?'+':'')+(r-l);});
  return {text:['词项数量对账','原记录：'+left.size,'现记录：'+right.size,'不同词项：'+keys.length,'保留数量：'+keep,'新增数量：'+add,'移除数量：'+remove,'每行一个词项；忽略空行和首尾空白。词项同名不代表现实实体相同。',...rows].join('\n')};
 }
 fail('claims','未知工具。');
}
(function benchRuntime(){
 const form=document.querySelector('[data-bench]');if(!form)return;
 const result=document.querySelector('[data-result-text]'),copy=document.querySelector('[data-copy-result]'),copyState=document.querySelector('[data-result-copy-state]'),state=document.querySelector('[data-run-state]'),tag=document.querySelector('[data-report-state]'),findings=document.querySelector('[data-findings]');
 const values=()=>Object.fromEntries([...form.elements].filter(e=>e.name).map(e=>[e.name,e.value])),stamp=()=>JSON.stringify(values());
 let revision=0,latest='',signature=stamp();
 const clear=()=>{form.querySelectorAll('[aria-invalid]').forEach(e=>{e.removeAttribute('aria-invalid');e.removeAttribute('aria-errormessage');});form.querySelectorAll('[data-input-error]').forEach(e=>e.textContent='');};
 const invalidate=()=>{revision++;latest='';result.textContent='';findings.replaceChildren();copy.disabled=true;copyState.textContent='';tag.textContent='UNREAD';};
 const changed=()=>{if(stamp()===signature)return;signature=stamp();invalidate();clear();state.textContent='输入已变化，请重新运行。';};
 form.querySelector('[type=submit]').disabled=false;form.addEventListener('input',changed);form.addEventListener('change',changed);
 form.addEventListener('reset',()=>{invalidate();clear();state.textContent='已重置，等待运行。';setTimeout(()=>{signature=stamp();},0);});
 form.addEventListener('submit',event=>{event.preventDefault();invalidate();clear();signature=stamp();try{const r=herbariumCompute(form.dataset.bench,values());latest=r.text;result.textContent=r.text;copy.disabled=false;state.textContent='本地处理完成。';tag.textContent='EXAMINED';if(r.records)for(const [i,record]of r.records.entries()){const article=document.createElement('article');article.className='hb65-finding';const number=document.createElement('b');number.textContent=String(i+1).padStart(2,'0');const body=document.createElement('div'),p=document.createElement('p'),tags=document.createElement('div');p.textContent=record.sentence;tags.className='hb65-tags';for(const label of record.tags.length?record.tags:['未命中']){const span=document.createElement('span');span.textContent=label;tags.append(span);}body.append(p,tags);article.append(number,body);findings.append(article);}}
 catch(error){tag.textContent='CHECK INPUT';state.textContent='未生成报告，请修正输入。';const field=form.elements.namedItem(error.field)||form.querySelector('input,textarea,select'),message=document.getElementById(field.id+'-error');message.textContent=error.message;field.setAttribute('aria-invalid','true');field.setAttribute('aria-errormessage',message.id);field.focus();}});
 copy.addEventListener('click',async()=>{if(!latest)return;const rev=revision,text=latest;copy.disabled=true;try{await navigator.clipboard.writeText(text);if(revision===rev)copyState.textContent='报告已复制。';}catch{if(revision===rev)copyState.textContent='浏览器未允许复制，请手动选择报告文字。';}finally{if(revision===rev)copy.disabled=false;}});
})();
