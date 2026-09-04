"use strict";
function celestialCalculate(kind,values){
 const fail=(field,message)=>{const e=new Error(message);e.field=field;throw e},order=(a,b)=>a<b?-1:a>b?1:0;
 const raw=(field,max,empty=false)=>{const s=String(values[field]??'').replace(/\r\n?/g,'\n');if(Array.from(s).length>max)fail(field,'最多允许 '+max+' 个 Unicode 字符。');if(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]|\p{Surrogate}/u.test(s))fail(field,'请移除控制字符或不完整 Unicode。');if(!empty&&!s.trim())fail(field,'请输入非空内容。');return s};
 const label=(s,field)=>{const display=s.normalize('NFKC').trim();if(!display)fail(field,'连接两端必须有标签。');if(Array.from(display).length>30)fail(field,'单个标签最多 30 个 Unicode 字符。');return {display,key:display.toLowerCase()}};
 const lines=(field,max,count,empty=false)=>{const rows=raw(field,max,empty).split('\n').map((s,i)=>({s:s.trim(),line:i+1})).filter(x=>x.s);if(rows.length>count)fail(field,'非空行最多 '+count+' 行。');return rows};
 if(kind==='cooccurrence-map'){
  const rows=lines('tags',8000,100),names=new Map(),records=[];
  for(const {s,line}of rows){const keys=new Set();for(const part of s.normalize('NFKC').split(',')){if(!part.trim())continue;const x=label(part,'tags');keys.add(x.key);if(!names.has(x.key))names.set(x.key,x.display)}if(keys.size>12)fail('tags','第 '+line+' 行最多 12 个不同标签。');if(keys.size)records.push([...keys]);if(names.size>80)fail('tags','最多 80 个唯一标签。')}
  if(!records.length)fail('tags','没有找到非空标签记录。');
  const pairs=new Map(),connected=new Set();
  for(const row of records)for(let i=0;i<row.length;i++)for(let j=i+1;j<row.length;j++){const [a,b]=[row[i],row[j]].sort(order),key=JSON.stringify([a,b]);pairs.set(key,(pairs.get(key)||0)+1);connected.add(a);connected.add(b)}
  const items=[...pairs].map(([key,count])=>({keys:JSON.parse(key),count})).sort((a,b)=>b.count-a.count||order(a.keys[0],b.keys[0])||order(a.keys[1],b.keys[1])),isolated=[...names.keys()].filter(k=>!connected.has(k));
  return ['标签共现图谱','有效记录：'+records.length,'唯一标签：'+names.size,'不同连接：'+items.length,'孤立标签：'+(isolated.map(k=>names.get(k)).join('、')||'无'),'完整连接：',...items.map((p,i)=>(i+1)+'. '+p.keys.map(k=>names.get(k)).join(' ↔ ')+'：'+p.count+' 次'),'连接只表示输入中的共现，不代表因果、质量或搜索价值。'].join('\n');
 }
 if(kind==='set-overlap'){
  const parse=field=>{const names=new Map();for(const {s}of lines(field,8000,200,true)){const x=label(s,field);if(!names.has(x.key))names.set(x.key,x.display)}if(names.size>100)fail(field,'每组最多 100 个唯一标签。');return names},left=parse('left'),right=parse('right');
  const common=[...left.keys()].filter(k=>right.has(k)),onlyLeft=[...left.keys()].filter(k=>!right.has(k)),onlyRight=[...right.keys()].filter(k=>!left.has(k)),union=common.length+onlyLeft.length+onlyRight.length;
  const list=(keys,source)=>keys.map(k=>source.get(k)).join('、')||'（空）';
  return ['标签集合重合','左集：'+left.size,'右集：'+right.size,'交集：'+common.length,'并集：'+union,'Jaccard：'+(union?common.length/union*100:100).toFixed(2)+'%','交集标签：'+list(common,left),'仅左侧：'+list(onlyLeft,left),'仅右侧：'+list(onlyRight,right),'两组都为空时按相同空集约定显示 100%，不解释为质量或抄袭判断。'].join('\n');
 }
 const names=new Map(),edges=[],seen=new Set();
 for(const {s,line}of lines('edges',10000,200)){const parts=s.normalize('NFKC').split('|');if(parts.length!==2)fail('edges','第 '+line+' 行应有且只有一个竖线：A | B。');const [a,b]=parts.map(p=>label(p,'edges'));for(const x of [a,b])if(!names.has(x.key))names.set(x.key,x.display);if(names.size>80)fail('edges','最多 80 个唯一节点。');const pair=[a.key,b.key],key=JSON.stringify(pair);if(!seen.has(key)){seen.add(key);edges.push(pair)}}
 const nodes=[...names.keys()],adj=new Map(nodes.map(n=>[n,[]]));for(const[a,b]of edges)adj.get(a).push(b);
 if(kind==='shortest-route'){
  const start=label(raw('start',60),'start').key,end=label(raw('end',60),'end').key;
  if(!names.has(start))fail('start','起点未登记在图中。');if(!names.has(end))fail('end','终点未登记在图中。');
  const queue=[start],parents=new Map([[start,null]]);for(let pos=0;pos<queue.length&&!parents.has(end);pos++){for(const next of adj.get(queue[pos]))if(!parents.has(next)){parents.set(next,queue[pos]);queue.push(next)}}
  const route=[];if(parents.has(end)){let at=end;while(at!==null){route.unshift(names.get(at));at=parents.get(at)}}
  return ['最短连接路径','节点数：'+nodes.length,'单向边：'+edges.length,'起点：'+names.get(start),'终点：'+names.get(end),route.length?'最少步数：'+(route.length-1):'结果：不可达','路线：'+(route.join(' → ')||'无'),'同长路线按首次输入邻接次序选择；步数不等于耗时、费用或实际距离。'].join('\n');
 }
 if(kind==='dependency-layers'){
  const degree=new Map(nodes.map(n=>[n,0]));for(const[,b]of edges)degree.set(b,degree.get(b)+1);const done=new Set(),layers=[];
  while(true){const layer=nodes.filter(n=>!done.has(n)&&degree.get(n)===0);if(!layer.length)break;layers.push(layer);for(const n of layer)done.add(n);for(const n of layer)for(const next of adj.get(n))degree.set(next,degree.get(next)-1)}
  const residual=nodes.filter(n=>!done.has(n));return ['前置层级编排','节点数：'+nodes.length,'单向边：'+edges.length,'已排节点：'+done.size,'层数：'+layers.length,...layers.map((layer,i)=>'层 '+(i+1)+'：'+layer.map(n=>names.get(n)).join('、')),'残留节点：'+(residual.map(n=>names.get(n)).join('、')||'无'),'残留包括环成员以及依赖环的节点，不能把整个残留清单视为全部环成员。'].join('\n');
 }
 if(kind==='connected-islands'){
  const parent=new Map(nodes.map(n=>[n,n])),find=n=>{while(parent.get(n)!==n){parent.set(n,parent.get(parent.get(n)));n=parent.get(n)}return n};
  const unique=new Set();let loops=0;
  for(const[a,b]of edges){const key=JSON.stringify([a,b].sort(order));if(unique.has(key))continue;unique.add(key);if(a===b)loops++;else{const ar=find(a),br=find(b);if(ar!==br)parent.set(br,ar)}}
  const groups=new Map();for(const n of nodes){const r=find(n);if(!groups.has(r))groups.set(r,[]);groups.get(r).push(n)}
  return ['连通群岛划分','节点数：'+nodes.length,'不同无向边：'+(unique.size-loops),'自环：'+loops,'群岛数：'+groups.size,...[...groups.values()].map((g,i)=>'群岛 '+(i+1)+'（'+g.length+' 节点）：'+g.map(n=>names.get(n)).join('、')),'连通只表示有路径；分组不构成主题分类或内容价值结论。'].join('\n');
 }
 fail('edges','未知计算器。');
}
(function calculationRuntime(){
 const form=document.querySelector('[data-calculation]');if(!form)return;
 const result=document.querySelector('[data-result-text]'),copy=document.querySelector('[data-copy-result]'),state=document.querySelector('[data-run-state]'),tag=document.querySelector('[data-report-state]'),copyState=document.querySelector('[data-result-copy-state]');
 const values=()=>Object.fromEntries([...form.elements].filter(e=>e.name).map(e=>[e.name,e.value])),stamp=()=>JSON.stringify(values());let signature=stamp(),revision=0,latest='';
 const clear=()=>{form.querySelectorAll('[aria-invalid]').forEach(e=>{e.removeAttribute('aria-invalid');e.removeAttribute('aria-errormessage')});form.querySelectorAll('[data-input-error]').forEach(e=>e.textContent='')};
 const invalidate=()=>{revision++;latest='';result.textContent='';copy.disabled=true;copyState.textContent='';tag.textContent='STANDBY'};
 const changed=()=>{if(stamp()===signature)return;signature=stamp();invalidate();clear();state.textContent='输入已变化，请重新计算。'};
 form.querySelector('[type=submit]').disabled=false;form.addEventListener('input',changed);form.addEventListener('change',changed);form.addEventListener('reset',()=>{invalidate();clear();state.textContent='已恢复输入，等待计算。';setTimeout(()=>signature=stamp(),0)});
 const presets={cluster:'A,B,C\nA,B\nB,C',isolated:'A,B\nC',duplicates:'Ａ,a,A,B\nB,a'};form.querySelectorAll('[data-tag-preset]').forEach(b=>{b.disabled=false;b.addEventListener('click',()=>{form.elements.tags.value=presets[b.dataset.tagPreset];changed();state.textContent='已装载例子，请重新计算。';form.elements.tags.focus()})});
 form.addEventListener('submit',e=>{e.preventDefault();invalidate();clear();signature=stamp();try{latest=celestialCalculate(form.dataset.calculation,values());result.textContent=latest;tag.textContent='READY';state.textContent='本地计算完成。';copy.disabled=false}catch(error){tag.textContent='CHECK INPUT';state.textContent='未生成报告，请修正输入。';const field=form.elements.namedItem(error.field)||form.querySelector('textarea,input'),message=document.getElementById(field.id+'-error');message.textContent=error.message;field.setAttribute('aria-invalid','true');field.setAttribute('aria-errormessage',message.id);field.focus()}});
 copy.addEventListener('click',async()=>{if(!latest)return;const rev=revision,text=latest;copy.disabled=true;try{await navigator.clipboard.writeText(text);if(revision===rev)copyState.textContent='完整记录已复制。'}catch{if(revision===rev)copyState.textContent='浏览器未允许复制，请手动选择完整记录。'}finally{if(revision===rev)copy.disabled=false}});
})();
