(() => {
  'use strict';
  const form=document.querySelector('[data-instrument]');if(!form)return;form.querySelector('[type=submit]').disabled=false;
  const result=document.querySelector('[data-result-text]'),status=document.querySelector('[data-result-state]'),error=document.querySelector('[data-input-error]'),copy=document.querySelector('[data-copy-result]'),copyStatus=document.querySelector('[data-result-copy-state]');let revision=0;
  const read=name=>form.elements[name].value.normalize('NFKC').trim();
  function fail(message,field){const e=new Error(message);e.field=field;throw e;}
  function intValue(value,min,max,field){if(!/^(0|[1-9]\d*)$/.test(value)||value.length>8)fail('数值使用普通非负整数，不带前导零、符号、小数或指数。',field);const n=Number(value);if(n<min||n>max)fail('数值须在 '+min+'–'+max+' 范围内。',field);return n;}
  const integer=(name,min,max)=>intValue(read(name),min,max,name);
  function lines(field,max){const text=read(field);if(!text||text.length>6000)fail('请填写 1–6000 个代码单元的文本。',field);const rows=text.split(/\r?\n/).map(s=>s.trim());if(rows.length>max||rows.some(s=>!s))fail('最多 '+max+' 行，不留中间空行。',field);return rows;}
  function uniqueLabel(text,seen,field){const value=text.trim();if(!value||[...value].length>20||/[,:\n\r]/.test(value))fail('名称需为 1–20 个码点，不包含逗号、冒号或换行。',field);const key=value.toLowerCase();if(seen.has(key))fail('名称重复：'+value,field);seen.add(key);return value;}
  function decimal(n,d,places){const scale=10n**BigInt(places),q=(n*scale*2n+d)/(2n*d),s=q.toString().padStart(places+1,'0');return s.slice(0,-places)+'.'+s.slice(-places);}
  function weightedRows(field,max,maxValue){const seen=new Set();return lines(field,max).map((s,i)=>{const p=s.split(':');if(p.length!==2)fail('第 '+(i+1)+' 行使用 名称:整数。',field);return {name:uniqueLabel(p[0],seen,field),value:intValue(p[1].trim(),1,maxValue,field),index:i};});}
  function calculate(){switch(form.dataset.instrument){
    case 'lane-capacity':{
      const total=integer('total',1,10000),pinned=integer('pinned',0,10000);if(pinned>total)fail('置顶数不能超过卡片总数。','pinned');const rows=weightedRows('weights',8,1000);if(rows.length<2)fail('至少填写两条泳道。','weights');const free=total-pinned,sum=rows.reduce((s,r)=>s+BigInt(r.value),0n);
      const quotas=rows.map(r=>({...r,count:Number(BigInt(free)*BigInt(r.value)/sum),remainder:BigInt(free)*BigInt(r.value)%sum})),remaining=free-quotas.reduce((s,r)=>s+r.count,0);[...quotas].sort((a,b)=>a.remainder===b.remainder?a.index-b.index:a.remainder>b.remainder?-1:1).slice(0,remaining).forEach(r=>{r.count++;});
      return ['卡片总数：'+total,'独立置顶：'+pinned,'普通卡片：'+free,'泳道数：'+rows.length,'权重合计：'+sum,'',...quotas.map(r=>r.name+'：'+r.count+' 张（权重 '+r.value+'）'),'','使用最大余数法；余数相同按输入顺序优先，不限制各泳道卡片数相差 1。'].join('\n');
    }
    case 'wip-ledger':{
      const seen=new Set(),rows=lines('stages',12).map((s,i)=>{const p=s.split(',').map(v=>v.trim());if(p.length!==5)fail('第 '+(i+1)+' 行使用 名称,期初,新增,完成,上限。','stages');const name=uniqueLabel(p[0],seen,'stages'),values=p.slice(1).map(v=>intValue(v,0,1000000,'stages')),[start,added,done,limit]=values;if(done>start+added)fail('第 '+(i+1)+' 行完成量超过可处理量。','stages');const end=start+added-done;return {name,start,added,done,limit,end};});
      return ['泳道数：'+rows.length,'期末合计：'+rows.reduce((s,r)=>s+r.end,0),'超限泳道：'+rows.filter(r=>r.end>r.limit).length,'',...rows.flatMap(r=>[r.name+'：期末 '+r.end+' / 上限 '+r.limit,(r.end>r.limit?'超限 '+(r.end-r.limit):r.end===r.limit?'已满':'可用 '+(r.limit-r.end))+'；占用率 '+(r.limit?decimal(BigInt(r.end)*100n,BigInt(r.limit),2)+'%':'不适用（上限为 0）')]),'','期末 = 期初 + 新增 − 完成。仅核对输入账面数量，不自动关联泳道之间的流转。'].join('\n');
    }
    case 'card-reconcile':{
      function ids(field){const text=read(field);if(text.length>6000)fail('每侧最多 6000 个代码单元。',field);if(!text)return [];const ids=text.split(/[\s,]+/).filter(Boolean);if(ids.length>200)fail('每侧最多 200 个编号。',field);if(ids.some(s=>! /^[A-Za-z0-9][A-Za-z0-9_-]{0,31}$/.test(s)))fail('编号为 1–32 个 ASCII 字母、数字、下划线或连字符，首位为字母或数字。',field);return ids.map(s=>s.toUpperCase());}
      const old=ids('current'),next=ids('incoming');if(!old.length&&!next.length)fail('至少有一侧包含编号。','current');const a=new Set(old),b=new Set(next),common=[...b].filter(s=>a.has(s)),added=[...b].filter(s=>!a.has(s)),removed=[...a].filter(s=>!b.has(s));
      return ['当前不同编号：'+a.size,'导入不同编号：'+b.size,'当前重复条目：'+(old.length-a.size),'导入重复条目：'+(next.length-b.size),'','保留（'+common.length+'）：'+(common.join(', ')||'无'),'新增（'+added.length+'）：'+(added.join(', ')||'无'),'移出（'+removed.length+'）：'+(removed.join(', ')||'无'),'','按 NFKC 后的大写编号对账，不核对卡片正文。保留和新增按导入首次出现顺序，移出按当前首次出现顺序。'].join('\n');
    }
    case 'review-balance':{
      const people=integer('reviewers',1,8),tasks=weightedRows('tasks',60,1440),buckets=Array.from({length:people},(_,i)=>({index:i,load:0,tasks:[]}));for(const task of [...tasks].sort((a,b)=>b.value-a.value||a.index-b.index)){const target=buckets.reduce((best,b)=>b.load<best.load?b:best);target.tasks.push(task);target.load+=task.value;}
      const loads=buckets.map(b=>b.load);return ['任务数：'+tasks.length,'审阅人数：'+people,'总预计分钟：'+tasks.reduce((s,t)=>s+t.value,0),'最高负载：'+Math.max(...loads)+' 分钟','最低负载：'+Math.min(...loads)+' 分钟','负载差：'+(Math.max(...loads)-Math.min(...loads))+' 分钟','',...buckets.flatMap(b=>['审阅者 '+(b.index+1)+'：'+b.load+' 分钟 / '+b.tasks.length+' 项',b.tasks.map(t=>t.name+'（'+t.value+' 分钟）').join('、')||'无任务']),'','按预计时长降序安排到当前负载最低者；同值按输入/人员顺序优先。此为 LPT 启发式，不保证全局最优，不考虑依赖或个人能力。'].join('\n');
    }
    case 'tag-cover':{
      const norm=s=>s.trim().toLowerCase();function tags(text,field){const values=text.split(',').map(norm);if(!values.length||values.length>12||values.some(t=>!t||[...t].length>16||! /^[\p{L}\p{N}_-]+$/u.test(t)))fail('标签为 1–16 个字母、数字、下划线或连字符，用英文逗号分隔，最多 12 项。',field);if(new Set(values).size!==values.length)fail('标签重复，请合并后输入。',field);return values;}
      const required=tags(read('required'),'required'),seen=new Set(),cards=lines('cards',16).map((s,i)=>{const p=s.split(':');if(p.length!==2)fail('第 '+(i+1)+' 行使用 卡片名称:标签,标签。','cards');const name=uniqueLabel(p[0],seen,'cards'),list=tags(p[1],'cards');let mask=0;for(const tag of list){const index=required.indexOf(tag);if(index<0)fail('卡片包含目标之外的标签：'+tag,'cards');mask|=1<<index;}return {name,mask,index:i};}),full=(1<<required.length)-1,union=cards.reduce((m,c)=>m|c.mask,0);
      if(union!==full)return ['无法完整覆盖目标标签。','缺少：'+required.filter((_,i)=>!(union&(1<<i))).join(', '),'','请补充确实承载这些标签的卡片；工具不会推断正文含义。'].join('\n');
      let answer=null;const suffix=Array(cards.length+1).fill(0);for(let i=cards.length-1;i>=0;i--)suffix[i]=suffix[i+1]|cards[i].mask;
      function search(start,remaining,mask,picked){if(!remaining){if(mask===full){answer=[...picked];return true;}return false;}if(cards.length-start<remaining||(mask|suffix[start])!==full)return false;for(let i=start;i<=cards.length-remaining;i++)if(search(i+1,remaining-1,mask|cards[i].mask,picked.concat(i)))return true;return false;}
      for(let size=1;size<=cards.length;size++)if(search(0,size,0,[]))break;
      return ['目标标签：'+required.length,'候选卡片：'+cards.length,'最少卡片：'+answer.length,'',...answer.map(i=>cards[i].name+'：'+required.filter((_,j)=>cards[i].mask&(1<<j)).join(', ')),'','精确枚举最小数量的覆盖组合；同数量取输入索引序列字典序最小者。标签来自输入，不判断卡片实际内容是否充分。'].join('\n');
    }
    default:throw Error('Unknown instrument');
  }}
  function clear(message){revision++;result.textContent='';error.textContent='';copyStatus.textContent='';status.textContent=message;copy.disabled=true;form.querySelectorAll('[aria-invalid]').forEach(e=>{e.removeAttribute('aria-invalid');e.removeAttribute('aria-errormessage');});}
  form.addEventListener('input',()=>clear('输入已变化，请重新计算。'));form.addEventListener('reset',()=>clear('已恢复示例，请重新计算。'));
  form.addEventListener('submit',e=>{e.preventDefault();clear('正在计算。');try{result.textContent=calculate();status.textContent='计算完成。';copy.disabled=false;}catch(e){error.textContent=e.field?e.message:'暂时无法计算，请检查输入。';status.textContent='没有可用结果。';if(e.field){const field=form.elements[e.field];field.setAttribute('aria-invalid','true');field.setAttribute('aria-errormessage','pb56-field-error');field.focus();}}});
  copy.addEventListener('click',async()=>{if(copy.disabled||!result.textContent)return;const turn=revision,text=result.textContent;copy.disabled=true;copyStatus.textContent='';try{if(!navigator.clipboard?.writeText)throw Error('Unavailable');await navigator.clipboard.writeText(text);if(turn===revision)copyStatus.textContent='结果已复制。';}catch{if(turn===revision)copyStatus.textContent='复制未获许可，请选择结果手动复制。';}finally{if(turn===revision)copy.disabled=false;}});
})();
