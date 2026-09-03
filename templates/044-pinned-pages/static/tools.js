(function(){
  'use strict';
  function copyText(value){if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(value);return new Promise(function(resolve,reject){var area=document.createElement('textarea');area.value=value;area.readOnly=true;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();try{document.execCommand('copy')?resolve():reject(new Error('copy failed'));}catch(error){reject(error);}area.remove();});}
  function number(field,min,max){var value=Number(field.value);if(!Number.isFinite(value)||value<min||value>max)throw new Error('请填写 '+min+'–'+max+' 范围内的有效数字。');return value;}
  function isoDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))throw new Error('请选择有效日期。');var date=new Date(value+'T12:00:00Z');if(Number.isNaN(date.getTime()))throw new Error('请选择有效日期。');return date;}
  document.querySelectorAll('[data-tool]').forEach(function(panel){
    var form=panel.querySelector('form'),result=panel.querySelector('[data-result]'),detail=panel.querySelector('[data-detail]'),error=panel.querySelector('[data-error]'),copy=panel.querySelector('[data-copy-result]'),note=panel.querySelector('[data-copy-note]'),meter=panel.querySelector('[data-meter]'),summary='';
    function stale(){result.textContent='等待输入';detail.textContent='填写参数后运行。';error.textContent='';note.textContent='';copy.disabled=true;summary='';meter.style.setProperty('--meter','0%');}
    function done(primary,secondary,percent){result.textContent=primary;detail.textContent=secondary;error.textContent='';copy.disabled=false;summary=primary+'｜'+secondary;meter.style.setProperty('--meter',Math.max(0,Math.min(100,percent))+'%');}
    function fail(message){stale();error.textContent=message;}
    form.addEventListener('input',function(){if(summary){result.textContent='输入已变化';detail.textContent='请重新运行以更新结果。';copy.disabled=true;note.textContent='';summary='';}});
    form.addEventListener('submit',function(event){event.preventDefault();try{
      if(panel.dataset.tool==='relevance-rank'){
        var match=number(form.elements.match,0,10),trust=number(form.elements.trust,0,10),fresh=number(form.elements.fresh,0,10);var score=match*.45+trust*.35+fresh*.2;var label=score>=8?'优先置顶':score>=6?'进入候选':'暂缓收藏';done(score.toFixed(1)+' / 10 · '+label,'任务匹配 45% + 来源可信 35% + 新鲜度 20%。',score*10);
      }else if(panel.dataset.tool==='review-scheduler'){
        var start=isoDate(form.elements.date.value),pace=number(form.elements.pace,7,90),risk=number(form.elements.risk,.5,2),days=Math.max(1,Math.round(pace*risk));start.setUTCDate(start.getUTCDate()+days);var labelDate=start.toISOString().slice(0,10);done(labelDate,'建议在 '+days+' 天后复核；风险越高，周期越短。',Math.min(100,days/1.8));
      }else if(panel.dataset.tool==='url-sieve'){
        var lines=form.elements.urls.value.split(/\r?\n/).map(function(x){return x.trim();}).filter(Boolean);if(!lines.length)throw new Error('请至少填写一个 HTTPS 入口。');if(lines.length>50)throw new Error('单次最多检查 50 个入口。');var unique=new Set(),invalid=0,duplicate=0;lines.forEach(function(line){try{var url=new URL(line);if(url.protocol!=='https:'||url.username||url.password)invalid+=1;else if(unique.has(url.href))duplicate+=1;else unique.add(url.href);}catch(e){invalid+=1;}});if(invalid)throw new Error('发现 '+invalid+' 个无效或非 HTTPS 入口。');done(unique.size+' 个可保留','重复 '+duplicate+' 个；本工具只检查格式与协议，不验证网页在线状态。',Math.min(100,unique.size/lines.length*100));
      }else if(panel.dataset.tool==='tag-balance'){
        var raw=form.elements.tags.value.split(/[,，\n]/).map(function(x){return x.normalize('NFKC').trim();}).filter(Boolean);if(!raw.length)throw new Error('请至少填写一个标签。');if(raw.length>100)throw new Error('单次最多分析 100 个标签。');var limit=number(form.elements.limit,10,100),counts=new Map();raw.forEach(function(tag){counts.set(tag,(counts.get(tag)||0)+1);});var top=[...counts.entries()].sort(function(a,b){return b[1]-a[1];})[0],share=top[1]/raw.length*100;done(counts.size+' 个独立标签',top[0]+' 占 '+share.toFixed(1)+'%，'+(share<=limit?'分布在设定范围内':'超过设定上限')+'。',share);
      }else if(panel.dataset.tool==='reading-time'){
        var text=form.elements.text.value.normalize('NFKC').trim();if(!text)throw new Error('请粘贴需要评估的文字。');if(Array.from(text).length>50000)throw new Error('单次最多评估 50,000 个字符。');var cjkRate=number(form.elements.cjk,50,1000),latinRate=number(form.elements.latin,50,1000),cjk=(text.match(/[\u3400-\u9fff]/g)||[]).length,latin=(text.replace(/[\u3400-\u9fff]/g,' ').match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)||[]).length,minutes=cjk/cjkRate+latin/latinRate;done(Math.max(1,Math.ceil(minutes))+' 分钟','中文字符 '+cjk+' · 英文词 '+latin+' · 混合速率估算。',Math.min(100,minutes*10));
      }
    }catch(e){fail(e.message);}});
    form.addEventListener('reset',function(){setTimeout(stale,0);});
    copy.addEventListener('click',function(){if(!summary)return;copyText(summary).then(function(){note.textContent='结果已复制';}).catch(function(){note.textContent='复制失败，请手动选择';});});
    stale();
  });
})();
