(() => {
  'use strict';
  const station=document.querySelector('[data-machine]');if(!station)return;
  const form=station.querySelector('form'),output=station.querySelector('[data-result]'),detail=station.querySelector('[data-detail]'),chart=station.querySelector('[data-chart]'),error=station.querySelector('[data-error]'),copy=station.querySelector('[data-copy-result]'),notice=station.querySelector('[data-copy-note]');
  let saved='',revision=0;
  const field=name=>form.elements.namedItem(name);
  const fail=(name,message)=>{field(name).setAttribute('aria-invalid','true');throw new Error(message);};
  function n(name,min,max,integer=false){const value=field(name).value.trim(),number=Number(value);if(!value||!Number.isFinite(number)||number<min||number>max||(integer&&!Number.isInteger(number)))fail(name,`请输入 ${min} 到 ${max} 的${integer?'整数':'有限数值'}。`);return number;}
  const fmt=value=>new Intl.NumberFormat('zh-CN',{maximumFractionDigits:6}).format(value);
  function reset(idle=false){revision++;saved='';copy.disabled=true;notice.textContent='';error.textContent='';output.textContent=idle?'等待输入':'输入已变化';detail.textContent=idle?'当前浏览器本地计算，不发送数据。':'旧读数已失效，请再次核对。';chart.replaceChildren();form.querySelectorAll('[aria-invalid]').forEach(x=>x.removeAttribute('aria-invalid'));}
  form.addEventListener('input',()=>reset());form.addEventListener('change',()=>reset());form.addEventListener('reset',()=>reset(true));
  form.addEventListener('submit',e=>{e.preventDefault();reset(true);let title,note,points=[];
    try{switch(station.dataset.machine){
      case 'threshold-check':{const value=n('value',-1e12,1e12),warn=n('warn',-1e12,1e12),alarm=n('alarm',-1e12,1e12),direction=field('direction').value;if(!['high','low'].includes(direction))fail('direction','请选择有效的风险方向。');const high=direction==='high';if(high?warn>=alarm:warn<=alarm)fail('warn',high?'提醒线必须低于告警线。':'提醒线必须高于告警线。');const crossed=line=>high?value>=line:value<=line;title=crossed(alarm)?'触发告警':crossed(warn)?'进入复核':'正常观察';note=`当前 ${fmt(value)} · 提醒 ${fmt(warn)} · 告警 ${fmt(alarm)}。边界相等视为越线；仅做数值比较，不替代阈值依据。`;points=[crossed(alarm)?1:crossed(warn)?.6:.2];break;}
      case 'smooth-series':{const raw=field('series').value.trim();if(!raw||raw.length>15000)fail('series','请填写 1–500 个有限数字，输入不超过 15,000 字符。');const pieces=raw.split(/[\s,，]+/);if(pieces.length>500||pieces.some(s=>!s||!/^[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?$/i.test(s)))fail('series','序列仅接受逗号或空白分隔的数字，最多 500 个。');const numbers=pieces.map(Number);if(numbers.some(x=>!Number.isFinite(x)||Math.abs(x)>1e9))fail('series','每个值的绝对值不能超过十亿。');const alpha=n('alpha',.01,1);let smooth=numbers[0];const result=[smooth];for(const value of numbers.slice(1)){smooth=alpha*value+(1-alpha)*smooth;result.push(smooth);}title=fmt(smooth);note=`最后平滑值；α=${alpha}，首值初始化。完整序列：${result.map(fmt).join(' → ')}。指数平滑会滞后，不是预测。`;const min=Math.min(...result),max=Math.max(...result);points=result.slice(-40).map(x=>max===min?.5:(x-min)/(max-min));break;}
      case 'rate-window':{const count=n('count',0,1e9,true),seconds=n('seconds',.001,1e9),rate=count/seconds;title=fmt(rate)+' / 秒';note=`每分钟 ${fmt(rate*60)} · 每小时 ${fmt(rate*3600)}。依据 ${fmt(count)} 次 / ${fmt(seconds)} 秒；外推仅作等速换算，不表示未来流量。`;points=rate?[1/3600,1/60,1]:[0,0,0];break;}
      case 'uptime-budget':{const availability=n('availability',0,100),days=n('days',1,366,true),seconds=days*86400*(1-availability/100);title=fmt(seconds/60)+' 分钟';note=`${days} 天窗口允许不可用 ${fmt(seconds)} 秒。目标 ${availability}%；按连续时间比例计算，不考虑计划维护或业务时段豁免。`;points=[1-availability/100];break;}
      case 'sample-stride':{const population=n('population',1,100000,true),sample=n('sample',1,500,true),offset=n('offset',0,.999999);if(sample>population)fail('sample','样本数量不能大于总体。');const interval=population/sample,indices=Array.from({length:sample},(_,i)=>Math.floor((i+offset)*interval)+1);title=indices.join(' · ');note=`${sample} / ${population} 项；间隔 ${fmt(interval)}，起点偏移 ${offset}。按原顺序等距抽取，不是随机抽样；周期性排序可能引入偏差。`;points=indices.slice(0,40).map(i=>i/population);break;}
      default:throw new Error('仪器未识别。');
    }
    if(station.dataset.machine==='smooth-series')note+=' 图形按本组最小/最大值归一化，只显示最后 40 个平滑点。';
    if(station.dataset.machine==='sample-stride')note+=' 图形只显示前 40 个索引相对于总体的位置；文字列出全部样本。';
    if(station.dataset.machine==='rate-window')note+=' 三条图形按每小时数值归一化，依次表示秒、分、时。';
    output.textContent=title;detail.textContent=note;for(const p of points){const bar=document.createElement('i');bar.style.height=`${Math.max(0,Math.min(100,p*100))}%`;chart.append(bar);}saved=title+'\n'+note;copy.disabled=false;
    }catch(problem){output.textContent='请修正输入';error.textContent=problem.message;form.querySelector('[aria-invalid=true]')?.focus();}
  });
  copy.addEventListener('click',async()=>{if(!saved)return;const current=revision;try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(saved);else{const box=document.createElement('textarea');box.value=saved;box.style.position='fixed';box.style.left='-9999px';document.body.append(box);box.select();const ok=document.execCommand('copy');box.remove();if(!ok)throw new Error('copy');}if(revision===current)notice.textContent='读数已复制';}catch{if(revision===current)notice.textContent='请手动选择读数复制';}});
})();
