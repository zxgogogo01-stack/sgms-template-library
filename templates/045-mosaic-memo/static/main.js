(function(){
  'use strict';
  var root=document.documentElement;
  var themeKey='mosaic-memo-045-theme';
  function by(selector,scope){return(scope||document).querySelector(selector);}
  function all(selector,scope){return Array.prototype.slice.call((scope||document).querySelectorAll(selector));}
  function normalize(value){return String(value||'').normalize('NFKC').trim();}
  function cleanText(value){return String(value||'').normalize('NFC').replace(/\s+/g,' ').trim();}
  function searchText(value){return normalize(value).replace(/\s+/g,' ');}
  function units(value){return Array.from(value);}
  function setTheme(theme,save){root.setAttribute('data-theme',theme);var label=by('[data-theme-label]');if(label){label.textContent=theme==='dark'?'亮色':'暗色';}if(save){try{localStorage.setItem(themeKey,theme);}catch(error){}}}
  var preferred='light';
  try{preferred=localStorage.getItem(themeKey)||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}catch(error){preferred=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
  setTheme(preferred,false);
  var themeButton=by('[data-theme-button]');
  if(themeButton){themeButton.addEventListener('click',function(){setTheme(root.getAttribute('data-theme')==='dark'?'light':'dark',true);});}

  var menuButton=by('[data-menu-button]');
  var siteNav=by('[data-site-nav]');
  if(menuButton&&siteNav){
    function closeMenu(){siteNav.setAttribute('data-open','false');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='菜单';}
    menuButton.addEventListener('click',function(){var open=siteNav.getAttribute('data-open')!=='true';siteNav.setAttribute('data-open',open?'true':'false');menuButton.setAttribute('aria-expanded',open?'true':'false');menuButton.textContent=open?'收起':'菜单';});
    all('a',siteNav).forEach(function(link){link.addEventListener('click',closeMenu);});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'&&siteNav.getAttribute('data-open')==='true'){closeMenu();menuButton.focus();}});
  }

  function copyText(text,done){
    if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(function(){done(true);},function(){done(false);});return;}
    var field=document.createElement('textarea');field.value=text;field.setAttribute('readonly','');field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();var ok=false;try{ok=document.execCommand('copy');}catch(error){}field.remove();done(ok);
  }

  var memoSearch=by('[data-memo-search]');
  var memoFilters=by('[data-memo-filters]');
  if(memoSearch&&memoFilters){
    var active='all';var cards=all('[data-memo]');var memoEmpty=by('[data-memo-empty]');var memoStatus=by('[data-memo-status]');
    function filterMemos(){var query=searchText(memoSearch.value).toLocaleLowerCase();var visible=0;cards.forEach(function(card){var category=card.getAttribute('data-category');var haystack=searchText(card.getAttribute('data-search')+' '+card.textContent).toLocaleLowerCase();var show=(active==='all'||category===active)&&(!query||haystack.indexOf(query)>-1);card.hidden=!show;if(show){visible+=1;}});if(memoEmpty){memoEmpty.hidden=visible!==0;}if(memoStatus){memoStatus.textContent='显示 '+visible+' / '+cards.length+' 块';}}
    memoSearch.addEventListener('input',filterMemos);
    all('[data-filter]',memoFilters).forEach(function(button){button.addEventListener('click',function(){active=button.getAttribute('data-filter');all('[data-filter]',memoFilters).forEach(function(item){item.setAttribute('aria-pressed',item===button?'true':'false');});filterMemos();});});
  }

  var progress=by('[data-read-progress]');
  if(progress){function updateProgress(){var max=document.documentElement.scrollHeight-window.innerHeight;var ratio=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;progress.style.width=(ratio*100)+'%';}window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();}
  var checklistButton=by('[data-copy-checklist]');
  if(checklistButton){checklistButton.addEventListener('click',function(){var text='周摘六步检查：\n1. 收集真实调用过的片段\n2. 补齐来源与时间\n3. 拆开事实与解释\n4. 写出改变的动作\n5. 设置复核日期\n6. 删除没有用途的块';var status=by('[data-checklist-status]');copyText(text,function(ok){if(status){status.textContent=ok?'清单已复制。':'复制失败，请手动选择清单。';}});});}

  var cutForm=by('[data-cut-form]');
  if(cutForm){
    var source=by('[data-cut-source]');var capInput=by('[data-cut-cap]');var ending=by('[data-cut-ending]');var message=by('[data-cut-message]');var preview=by('[data-cut-preview]');var previewState=by('[data-preview-state]');var sourceCount=by('[data-source-count]');var copyButton=by('[data-copy-cut]');var copyStatus=by('[data-copy-status]');var currentResult='';
    message.id='mm45-cut-message';message.setAttribute('role','alert');message.setAttribute('aria-atomic','true');
    function updateSourceCount(){sourceCount.textContent=units(cleanText(source.value)).length+' 字';}
    function setStats(original,result){by('[data-stat-source]').textContent=String(original);by('[data-stat-result]').textContent=String(result);by('[data-stat-ratio]').textContent=original?Math.round(result/original*100)+'%':'—';}
    function resetPreview(state){currentResult='';preview.innerHTML='<span>MEMO / DRAFT</span><h3>摘要会出现在这里</h3><p>完成裁剪后，你会看到最终字数、压缩比例与结尾处理方式。</p>';previewState.textContent=state||'等待原文';copyButton.disabled=true;setStats(0,0);if(copyStatus){copyStatus.textContent='';}}
    function invalidate(){source.removeAttribute('aria-invalid');capInput.removeAttribute('aria-invalid');ending.removeAttribute('aria-invalid');message.textContent='';if(currentResult){resetPreview('资料已修改，请重新生成');}}
    function trimAtSentence(text,cap){var chars=units(text);if(chars.length<=cap){return text;}var slice=chars.slice(0,cap);var minimum=Math.floor(cap*.58);for(var i=slice.length-1;i>=minimum;i-=1){if(/[。！？；.!?;]/.test(slice[i])){return slice.slice(0,i+1).join('');}}return chars.slice(0,Math.max(1,cap-1)).join('').trimEnd()+'…';}
    function strictTrim(text,cap){var chars=units(text);if(chars.length<=cap){return text;}return chars.slice(0,Math.max(1,cap-1)).join('').trimEnd()+'…';}
    function renderResult(result,original){currentResult=result;preview.innerHTML='';var label=document.createElement('span');label.textContent='MEMO / READY';var title=document.createElement('h3');title.textContent='裁剪完成';var body=document.createElement('p');body.textContent=result;preview.append(label,title,body);previewState.textContent='可以复制';copyButton.disabled=false;setStats(original,units(result).length);message.textContent='已生成摘要，请确认数字、否定词与句意是否完整。';}
    source.addEventListener('input',function(){updateSourceCount();invalidate();});capInput.addEventListener('input',invalidate);ending.addEventListener('change',invalidate);
    all('[data-preset]').forEach(function(button){button.addEventListener('click',function(){capInput.value=button.getAttribute('data-preset');all('[data-preset]',cutForm).forEach(function(item){item.setAttribute('aria-pressed',item===button?'true':'false');});invalidate();});});
    var sampleButton=by('[data-load-sample]');
    if(sampleButton){sampleButton.addEventListener('click',function(){source.value='本周复查了十二个移动端页面，发现影响阅读的主要问题并不是字号太小，而是过长行宽、不可换行标签与信息块之间缺少清楚停顿。下一轮会先调整内容结构，再复核字体与对比度。';updateSourceCount();invalidate();message.textContent='示例已载入，可以直接生成。';source.focus();});}
    var clearButton=by('[data-clear-cut]');
    if(clearButton){clearButton.addEventListener('click',function(){source.value='';updateSourceCount();invalidate();resetPreview();source.focus();});}
    cutForm.addEventListener('submit',function(event){event.preventDefault();source.removeAttribute('aria-invalid');capInput.removeAttribute('aria-invalid');ending.removeAttribute('aria-invalid');copyStatus.textContent='';var text=cleanText(source.value);var capValue=normalize(capInput.value);var original=units(text).length;
      if(!text){source.setAttribute('aria-invalid','true');message.textContent='请先放入需要裁剪的原文。';resetPreview();source.focus();return;}
      if(original>20000){source.setAttribute('aria-invalid','true');message.textContent='原文最多 20000 个字符。';resetPreview();source.focus();return;}
      if(!/^\d+$/.test(capValue)){capInput.setAttribute('aria-invalid','true');message.textContent='目标字数必须是 12 到 240 之间的整数。';resetPreview('目标无效');capInput.focus();return;}
      var cap=Number(capValue);if(!Number.isSafeInteger(cap)||cap<12||cap>240){capInput.setAttribute('aria-invalid','true');message.textContent='目标字数必须是 12 到 240 之间的整数。';resetPreview('目标无效');capInput.focus();return;}
      if(['sentence','ellipsis'].indexOf(ending.value)===-1){ending.setAttribute('aria-invalid','true');message.textContent='请选择列表中的结尾处理方式。';resetPreview('规则无效');ending.focus();return;}
      var result=ending.value==='sentence'?trimAtSentence(text,cap):strictTrim(text,cap);renderResult(result,original);
    });
    copyButton.addEventListener('click',function(){if(!currentResult){return;}copyText(currentResult,function(ok){copyStatus.textContent=ok?'摘要已复制。':'复制失败，请手动选择摘要。';});});
    updateSourceCount();resetPreview();
  }

  var rulesButton=by('[data-copy-rules]');
  if(rulesButton){rulesButton.addEventListener('click',function(){var text='内容边界摘要：本站内容用于整理，不替代专业意见；外部内容由原发布者负责；页面保留版本但不保证实时；工具输入仅在当前浏览器处理；更正请附页面位置与可核验证据。';var status=by('[data-rules-status]');copyText(text,function(ok){if(status){status.textContent=ok?'摘要已复制。':'复制失败，请手动选择。';}});});}

  var lostForm=by('[data-404-form]');
  if(lostForm){
    var lostInput=by('#lost-search');var lostStatus=by('[data-404-status]');var lostResults=by('[data-404-results]');var pages=[{title:'本周留下的六块',keywords:'本周 拼图 观察 判断 周摘',href:'index.html'},{title:'一份周摘真正需要留下什么',keywords:'整理 方法 复核 归档',href:'article.html'},{title:'摘要裁剪台',keywords:'摘要 裁剪 工具 文本',href:'tool.html'},{title:'边界说明',keywords:'规则 来源 隐私 更正',href:'legal.html'}];
    lostInput.addEventListener('input',function(){lostInput.removeAttribute('aria-invalid');lostStatus.textContent='';lostResults.innerHTML='';lostResults.hidden=true;});
    lostForm.addEventListener('submit',function(event){event.preventDefault();var query=searchText(lostInput.value).toLocaleLowerCase();lostResults.innerHTML='';if(!query){lostInput.setAttribute('aria-invalid','true');lostResults.hidden=true;lostStatus.textContent='先输入一个主题或页面名称。';lostInput.focus();return;}var matches=pages.filter(function(item){return searchText(item.title+' '+item.keywords).toLocaleLowerCase().indexOf(query)>-1;});if(!matches.length){lostResults.hidden=true;lostStatus.textContent='没有找到匹配页面，试试“裁剪”“复核”或“规则”。';return;}matches.forEach(function(item){var li=document.createElement('li');var link=document.createElement('a');link.href=item.href;link.textContent=item.title;var marker=document.createElement('span');marker.textContent='进入';li.append(link,marker);lostResults.appendChild(li);});lostResults.hidden=false;lostStatus.textContent='找到 '+matches.length+' 个匹配页面。';});
  }
}());
