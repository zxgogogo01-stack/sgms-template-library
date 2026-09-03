(function(){
  'use strict';
  var root=document.documentElement;
  var storageKey='pinned-pages-044-theme';
  var themeButton=document.querySelector('[data-theme-button]');
  var themeLabel=document.querySelector('[data-theme-label]');
  function preferredTheme(){try{return localStorage.getItem(storageKey)||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}catch(error){return 'light';}}
  function paintTheme(theme){root.dataset.theme=theme;if(themeLabel)themeLabel.textContent=theme==='dark'?'亮板':'暗板';if(themeButton)themeButton.setAttribute('aria-label',theme==='dark'?'切换到亮色模式':'切换到深色模式');}
  paintTheme(preferredTheme());
  if(themeButton)themeButton.addEventListener('click',function(){var next=root.dataset.theme==='dark'?'light':'dark';paintTheme(next);try{localStorage.setItem(storageKey,next);}catch(error){}});

  var menuButton=document.querySelector('[data-menu-button]');
  var siteNav=document.querySelector('[data-site-nav]');
  function closeMenu(){if(!siteNav||!menuButton)return;siteNav.dataset.open='false';menuButton.setAttribute('aria-expanded','false');}
  if(menuButton&&siteNav){menuButton.addEventListener('click',function(){var open=siteNav.dataset.open!=='true';siteNav.dataset.open=String(open);menuButton.setAttribute('aria-expanded',String(open));});siteNav.addEventListener('click',function(event){if(event.target.closest('a'))closeMenu();});document.addEventListener('keydown',function(event){if(event.key==='Escape'&&siteNav.dataset.open==='true'){closeMenu();menuButton.focus();}});}

  function normalize(value){return String(value||'').normalize('NFKC').trim();}
  function copyText(value){if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(value);return new Promise(function(resolve,reject){var area=document.createElement('textarea');area.value=value;area.readOnly=true;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();try{document.execCommand('copy')?resolve():reject(new Error('copy failed'));}catch(error){reject(error);}area.remove();});}
  var inviteButton=document.querySelector('[data-copy-invite]');
  var inviteCode=document.querySelector('#invite-code');
  var inviteStatus=document.querySelector('[data-invite-status]');
  if(inviteButton&&inviteCode)inviteButton.addEventListener('click',function(){copyText(inviteCode.textContent.trim()).then(function(){inviteStatus.textContent='邀请码已复制';}).catch(function(){inviteStatus.textContent='复制失败，请手动选择';});});

  var pinSearch=document.querySelector('[data-pin-search]');
  var pinFilters=document.querySelector('[data-pin-filters]');
  var pins=Array.prototype.slice.call(document.querySelectorAll('[data-pin]'));
  var pinStatus=document.querySelector('[data-pin-status]');
  var pinEmpty=document.querySelector('[data-pin-empty]');
  var activeFilter='all';
  function filterPins(){var query=normalize(pinSearch?pinSearch.value:'').toLocaleLowerCase();var shown=0;pins.forEach(function(pin){var categoryMatch=activeFilter==='all'||pin.dataset.category===activeFilter;var hay=normalize((pin.dataset.search||'')+' '+pin.textContent).toLocaleLowerCase();pin.hidden=!(categoryMatch&&(!query||hay.indexOf(query)>-1));if(!pin.hidden)shown+=1;});if(pinStatus)pinStatus.textContent='显示 '+shown+' / '+pins.length+' 张卡片';if(pinEmpty)pinEmpty.hidden=shown!==0;}
  if(pinSearch)pinSearch.addEventListener('input',filterPins);
  if(pinFilters)pinFilters.addEventListener('click',function(event){var button=event.target.closest('[data-filter]');if(!button)return;activeFilter=button.dataset.filter;pinFilters.querySelectorAll('[data-filter]').forEach(function(item){item.setAttribute('aria-pressed',String(item===button));});filterPins();});

  var lostForm=document.querySelector('[data-404-form]');
  var lostStatus=document.querySelector('[data-404-status]');
  var lostResults=document.querySelector('[data-404-results]');
  var boardIndex=[{title:'工作集',keys:'工作 使用 卡片',href:'shelves/working-set.html'},{title:'参考栈',keys:'参考 来源 阅读',href:'shelves/reference-stack.html'},{title:'维护抽屉',keys:'维护 复核 归档',href:'shelves/maintenance-drawer.html'},{title:'整理仪器',keys:'工具 计算 检查',href:'instruments.html'}];
  function clearNode(node){while(node&&node.firstChild)node.removeChild(node.firstChild);}
  if(lostForm){var input=lostForm.querySelector('input');input.addEventListener('input',function(){lostStatus.textContent='';clearNode(lostResults);lostResults.hidden=true;input.removeAttribute('aria-invalid');});lostForm.addEventListener('submit',function(event){event.preventDefault();var query=normalize(input.value).toLocaleLowerCase();clearNode(lostResults);if(!query){input.setAttribute('aria-invalid','true');lostStatus.textContent='先输入一个主题关键词。';lostResults.hidden=true;input.focus();return;}var found=boardIndex.filter(function(item){return normalize(item.title+' '+item.keys).toLocaleLowerCase().indexOf(query)>-1;});if(!found.length){lostStatus.textContent='当前板面没有匹配入口。';lostResults.hidden=true;return;}lostStatus.textContent='找到 '+found.length+' 个可访问入口。';lostResults.hidden=false;found.forEach(function(item){var li=document.createElement('li');var a=document.createElement('a');a.href=item.href;a.textContent=item.title;li.appendChild(a);lostResults.appendChild(li);});});}
})();
