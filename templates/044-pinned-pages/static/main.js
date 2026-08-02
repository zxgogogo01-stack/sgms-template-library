(function(){
  'use strict';
  var root=document.documentElement;
  var storageKey='pinned-board-theme';
  var themeButton=document.querySelector('[data-theme-button]');
  var themeLabel=document.querySelector('[data-theme-label]');
  function preferredTheme(){try{return localStorage.getItem(storageKey)||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}catch(error){return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}}
  function paintTheme(theme){root.dataset.theme=theme;if(themeLabel){themeLabel.textContent=theme==='dark'?'亮板':'暗板';}if(themeButton){themeButton.setAttribute('aria-label',theme==='dark'?'切换到亮色模式':'切换到深色模式');}}
  paintTheme(preferredTheme());
  if(themeButton){themeButton.addEventListener('click',function(){var next=root.dataset.theme==='dark'?'light':'dark';paintTheme(next);try{localStorage.setItem(storageKey,next);}catch(error){}});}

  var menuButton=document.querySelector('[data-menu-button]');
  var siteNav=document.querySelector('[data-site-nav]');
  if(menuButton&&siteNav){function closeMenu(){siteNav.dataset.open='false';menuButton.setAttribute('aria-expanded','false');}menuButton.addEventListener('click',function(){var open=siteNav.dataset.open!=='true';siteNav.dataset.open=String(open);menuButton.setAttribute('aria-expanded',String(open));});siteNav.addEventListener('click',function(event){if(event.target.closest('a')){closeMenu();}});document.addEventListener('keydown',function(event){if(event.key==='Escape'&&siteNav.dataset.open==='true'){closeMenu();menuButton.focus();}});}

  function copyText(value){
    if(navigator.clipboard&&window.isSecureContext){return navigator.clipboard.writeText(value);}
    return new Promise(function(resolve,reject){var area=document.createElement('textarea');area.value=value;area.setAttribute('readonly','');area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();try{document.execCommand('copy')?resolve():reject(new Error('copy failed'));}catch(error){reject(error);}area.remove();});
  }

  var pinSearch=document.querySelector('[data-pin-search]');
  var pinFilters=document.querySelector('[data-pin-filters]');
  var pins=Array.prototype.slice.call(document.querySelectorAll('[data-pin]'));
  var pinStatus=document.querySelector('[data-pin-status]');
  var pinEmpty=document.querySelector('[data-pin-empty]');
  var activeFilter='all';
  function filterPins(){var query=pinSearch?pinSearch.value.trim().toLowerCase():'';var shown=0;pins.forEach(function(pin){var categoryMatch=activeFilter==='all'||pin.dataset.category===activeFilter;var text=(pin.dataset.search+' '+pin.textContent).toLowerCase();var searchMatch=!query||text.indexOf(query)>-1;pin.hidden=!(categoryMatch&&searchMatch);if(!pin.hidden){shown+=1;}});if(pinStatus){pinStatus.textContent='显示 '+shown+' / '+pins.length+' 张卡片';}if(pinEmpty){pinEmpty.hidden=shown!==0;}}
  if(pinSearch){pinSearch.addEventListener('input',filterPins);}
  if(pinFilters){pinFilters.addEventListener('click',function(event){var button=event.target.closest('[data-filter]');if(!button){return;}activeFilter=button.dataset.filter;pinFilters.querySelectorAll('[data-filter]').forEach(function(item){item.setAttribute('aria-pressed',String(item===button));});filterPins();});}

  var inviteButton=document.querySelector('[data-copy-invite]');
  var inviteCode=document.querySelector('#invite-code');
  var inviteStatus=document.querySelector('[data-invite-status]');
  if(inviteButton&&inviteCode){inviteButton.addEventListener('click',function(){copyText(inviteCode.textContent.trim()).then(function(){inviteStatus.textContent='邀请码已复制';}).catch(function(){inviteStatus.textContent='复制失败，请手动选择';});});}

  var progress=document.querySelector('[data-read-progress]');
  if(progress){var updateProgress=function(){var total=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(total>0?Math.min(100,window.scrollY/total*100):0)+'%';};window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();}
  var checklistButton=document.querySelector('[data-copy-checklist]');
  var checklistStatus=document.querySelector('[data-checklist-status]');
  if(checklistButton){checklistButton.addEventListener('click',function(){var list='入板清单：1.明确题名；2.写具体用途；3.核验来源与版本；4.选择唯一类别；5.设置复核日期；6.记录调用或归档。';copyText(list).then(function(){checklistStatus.textContent='整理清单已复制';}).catch(function(){checklistStatus.textContent='复制失败，请手动选择';});});}

  var pinForm=document.querySelector('[data-pin-form]');
  var preview=document.querySelector('[data-pin-preview]');
  var previewState=document.querySelector('[data-preview-state]');
  var pinMessage=document.querySelector('[data-pin-message]');
  var copyPin=document.querySelector('[data-copy-pin]');
  var queuePin=document.querySelector('[data-queue-pin]');
  var pinCopyStatus=document.querySelector('[data-pin-copy-status]');
  var queueList=document.querySelector('[data-queue-list]');
  var currentCard=null;
  var queueCount=0;
  var pinErrorFields=pinForm?[pinForm.elements.title,pinForm.elements.source,pinForm.elements.reason]:[];
  if(pinMessage){pinMessage.id='pin-message';pinMessage.setAttribute('role','alert');pinMessage.setAttribute('aria-atomic','true');pinErrorFields.forEach(function(field){field.setAttribute('aria-describedby','pin-message');field.addEventListener('input',function(){field.removeAttribute('aria-invalid');});});}
  var categoryNames={tool:'工具',reading:'阅读',data:'数据',ops:'站务'};
  var categoryColors={tool:'pin-yellow',reading:'pin-sky',data:'pin-rose',ops:'pin-green'};
  function cardSummary(card){return card.title+'｜'+categoryNames[card.category]+'｜'+card.state+'｜'+card.reason+'｜复核：'+card.review+' 天后｜来源：'+card.source;}
  if(pinForm){
    pinForm.addEventListener('submit',function(event){event.preventDefault();pinCopyStatus.textContent='';pinErrorFields.forEach(function(field){field.removeAttribute('aria-invalid');});var data=Object.fromEntries(new FormData(pinForm).entries());
      if(!data.title.trim()){pinForm.elements.title.setAttribute('aria-invalid','true');pinMessage.textContent='请先填写收藏题名。';pinForm.elements.title.focus();return;}
      if(!data.source.trim()){pinForm.elements.source.setAttribute('aria-invalid','true');pinMessage.textContent='请填写原始入口或来源名称。';pinForm.elements.source.focus();return;}
      if(/^www\./i.test(data.source.trim())){pinForm.elements.source.setAttribute('aria-invalid','true');pinMessage.textContent='网页地址请补全安全协议前缀，或改填来源名称。';pinForm.elements.source.focus();return;}
      if(data.reason.trim().length<12){pinForm.elements.reason.setAttribute('aria-invalid','true');pinMessage.textContent='用途备注至少写 12 个字，说明它会帮助哪个具体决定。';pinForm.elements.reason.focus();return;}
      pinMessage.textContent='';currentCard={title:data.title.trim(),source:data.source.trim(),category:data.category,review:data.review,state:data.state,reason:data.reason.trim()};
      preview.className='pin-preview '+categoryColors[data.category];preview.innerHTML='<span>PIN / READY</span><h3></h3><p class="preview-reason"></p><p class="preview-meta"></p>';
      preview.querySelector('h3').textContent=currentCard.title;preview.querySelector('.preview-reason').textContent=currentCard.reason;preview.querySelector('.preview-meta').textContent=categoryNames[currentCard.category]+' · '+currentCard.state+' · '+currentCard.review+' 天后复核';
      previewState.textContent='预检完成';copyPin.disabled=false;queuePin.disabled=false;
    });
    pinForm.addEventListener('reset',function(){setTimeout(function(){currentCard=null;pinMessage.textContent='';pinCopyStatus.textContent='';previewState.textContent='等待资料';copyPin.disabled=true;queuePin.disabled=true;pinErrorFields.forEach(function(field){field.removeAttribute('aria-invalid');});preview.className='pin-preview';preview.innerHTML='<span>PIN / DRAFT</span><p class="preview-empty">完成左侧预检后，这里会生成一张可维护的收藏卡。</p>';},0);});
    var sample=document.querySelector('[data-load-sample]');
    if(sample){sample.addEventListener('click',function(){pinForm.elements.title.value='中文长文排版检查清单';pinForm.elements.source.value='https://~SITE_DOMAIN~/article.html';pinForm.elements.category.value='tool';pinForm.elements.review.value='30';pinForm.elements.reason.value='用于发布前检查移动端断行、层级与键盘焦点。';pinForm.elements.state.value='本周使用';pinErrorFields.forEach(function(field){field.removeAttribute('aria-invalid');});pinMessage.textContent='示例已载入，可继续修改。';});}
  }
  if(copyPin){copyPin.addEventListener('click',function(){if(!currentCard){return;}copyText(cardSummary(currentCard)).then(function(){pinCopyStatus.textContent='卡片摘要已复制';}).catch(function(){pinCopyStatus.textContent='复制失败，请手动选择';});});}
  if(queuePin){queuePin.addEventListener('click',function(){if(!currentCard||!queueList){return;}var empty=queueList.querySelector('[data-queue-empty]');if(empty){empty.remove();}queueCount+=1;var li=document.createElement('li');var no=document.createElement('span');var title=document.createElement('strong');var button=document.createElement('button');no.textContent=String(queueCount).padStart(2,'0');title.textContent=currentCard.title+' · '+categoryNames[currentCard.category];button.type='button';button.textContent='移出';button.addEventListener('click',function(){li.remove();if(!queueList.children.length){queueList.innerHTML='<li class="queue-empty" data-queue-empty><span>00</span><strong>尚未加入收藏卡</strong><em>只在本页有效</em></li>';}});li.append(no,title,button);queueList.appendChild(li);pinCopyStatus.textContent='已加入本次整理队列';queuePin.disabled=true;});}

  var rulesButton=document.querySelector('[data-copy-rules]');
  var rulesStatus=document.querySelector('[data-rules-status]');
  if(rulesButton){rulesButton.addEventListener('click',function(){var summary='本站收藏仅作整理，不代表推荐；外部内容由原发布者负责，重要决定应回到一手来源核验。邀请码只开放整理权限，卡片按期保留、更新或归档。';copyText(summary).then(function(){rulesStatus.textContent='板规摘要已复制';}).catch(function(){rulesStatus.textContent='复制失败，请手动选择';});});}

  var lostForm=document.querySelector('[data-404-form]');
  var lostStatus=document.querySelector('[data-404-status]');
  var lostResults=document.querySelector('[data-404-results]');
  var boardIndex=[{title:'中文长文排版检查清单',keys:'排版 字体 工具 编辑',href:'index.html#board'},{title:'城市开放数据入口清单',keys:'城市 数据 统计',href:'index.html#board'},{title:'静态站发布前的十分钟检查',keys:'站务 发布 部署 检查',href:'index.html#board'},{title:'收藏入板预检',keys:'工具 预检 收藏',href:'tool.html'}];
  if(lostForm){lostForm.addEventListener('submit',function(event){event.preventDefault();var query=lostForm.querySelector('input').value.trim().toLowerCase();lostResults.innerHTML='';if(!query){lostStatus.textContent='先输入一个主题关键词。';lostResults.hidden=true;return;}var found=boardIndex.filter(function(item){return (item.title+' '+item.keys).toLowerCase().indexOf(query)>-1;});if(!found.length){lostStatus.textContent='当前板面没有匹配卡，试试“排版”或“数据”。';lostResults.hidden=true;return;}lostStatus.textContent='找到 '+found.length+' 张可访问卡片。';lostResults.hidden=false;found.forEach(function(item){var li=document.createElement('li');var a=document.createElement('a');a.href=item.href;a.textContent=item.title;li.appendChild(a);lostResults.appendChild(li);});});}
})();
