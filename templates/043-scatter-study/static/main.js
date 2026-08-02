(function(){
  'use strict';

  var root=document.documentElement;
  var storageKey='scatter-theme';
  var themeButton=document.querySelector('[data-theme-button]');
  var themeLabel=document.querySelector('[data-theme-label]');

  function preferredTheme(){
    try{return localStorage.getItem(storageKey)||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}catch(error){return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
  }
  function paintTheme(theme){
    root.dataset.theme=theme;
    if(themeLabel){themeLabel.textContent=theme==='dark'?'亮室':'暗室';}
    if(themeButton){themeButton.setAttribute('aria-label',theme==='dark'?'切换到亮色模式':'切换到深色模式');}
  }
  paintTheme(preferredTheme());
  if(themeButton){themeButton.addEventListener('click',function(){
    var next=root.dataset.theme==='dark'?'light':'dark';
    paintTheme(next);
    try{localStorage.setItem(storageKey,next);}catch(error){}
  });}

  var menuButton=document.querySelector('[data-menu-button]');
  var siteNav=document.querySelector('[data-site-nav]');
  if(menuButton&&siteNav){
    function closeMenu(){siteNav.dataset.open='false';menuButton.setAttribute('aria-expanded','false');}
    menuButton.addEventListener('click',function(){
      var open=siteNav.dataset.open!=='true';
      siteNav.dataset.open=String(open);
      menuButton.setAttribute('aria-expanded',String(open));
    });
    siteNav.addEventListener('click',function(event){if(event.target.closest('a')){closeMenu();}});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'&&siteNav.dataset.open==='true'){closeMenu();menuButton.focus();}});
  }

  function copyText(value){
    if(navigator.clipboard&&window.isSecureContext){return navigator.clipboard.writeText(value);}
    return new Promise(function(resolve,reject){
      var area=document.createElement('textarea');
      area.value=value;area.setAttribute('readonly','');area.style.position='fixed';area.style.opacity='0';
      document.body.appendChild(area);area.select();
      try{document.execCommand('copy')?resolve():reject(new Error('copy failed'));}catch(error){reject(error);}
      area.remove();
    });
  }

  var noteSearch=document.querySelector('[data-note-search]');
  var noteFilters=document.querySelector('[data-note-filters]');
  var notes=Array.prototype.slice.call(document.querySelectorAll('[data-note]'));
  var noteStatus=document.querySelector('[data-note-status]');
  var noteEmpty=document.querySelector('[data-note-empty]');
  var activeFilter='all';
  function filterNotes(){
    var query=noteSearch?noteSearch.value.trim().toLowerCase():'';
    var shown=0;
    notes.forEach(function(note){
      var stateMatch=activeFilter==='all'||note.dataset.status===activeFilter;
      var text=(note.dataset.search+' '+note.textContent).toLowerCase();
      var searchMatch=!query||text.indexOf(query)>-1;
      note.hidden=!(stateMatch&&searchMatch);
      if(!note.hidden){shown+=1;}
    });
    if(noteStatus){noteStatus.textContent='显示 '+shown+' / '+notes.length+' 份笔记';}
    if(noteEmpty){noteEmpty.hidden=shown!==0;}
  }
  if(noteSearch){noteSearch.addEventListener('input',filterNotes);}
  if(noteFilters){noteFilters.addEventListener('click',function(event){
    var button=event.target.closest('[data-filter]');if(!button){return;}
    activeFilter=button.dataset.filter;
    noteFilters.querySelectorAll('[data-filter]').forEach(function(item){item.setAttribute('aria-pressed',String(item===button));});
    filterNotes();
  });}

  var progress=document.querySelector('[data-read-progress]');
  if(progress){var updateProgress=function(){
    var total=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.width=(total>0?Math.min(100,window.scrollY/total*100):0)+'%';
  };window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();}

  var citationCopy=document.querySelector('[data-copy-citation]');
  var citationStatus=document.querySelector('[data-citation-status]');
  if(citationCopy){citationCopy.addEventListener('click',function(){
    var text='研究桌编辑. 街角温度计为什么总比气象站高[工作笔记]. ~SITE_NAME~, 2026.';
    copyText(text).then(function(){citationStatus.textContent='引用已复制';}).catch(function(){citationStatus.textContent='复制失败，请手动选择';});
  });}

  var citationForm=document.querySelector('[data-citation-form]');
  var preview=document.querySelector('[data-citation-preview]');
  var message=document.querySelector('[data-citation-message]');
  var styleLabel=document.querySelector('[data-output-style]');
  var copyOutput=document.querySelector('[data-copy-output]');
  var copyStatus=document.querySelector('[data-copy-status]');
  var generated='';
  var citationErrorFields=citationForm?[citationForm.elements.title,citationForm.elements.year,citationForm.elements.source]:[];
  if(message){message.id='citation-message';message.setAttribute('role','alert');message.setAttribute('aria-atomic','true');citationErrorFields.forEach(function(field){field.setAttribute('aria-describedby','citation-message');field.addEventListener('input',function(){field.removeAttribute('aria-invalid');});});}
  function buildCitation(data){
    var author=data.author.trim()||'作者不详';
    var year=data.year.trim()||'年份不详';
    var title=data.title.trim();
    var source=data.source.trim();
    var typeNames={report:'报告',article:'文章',dataset:'数据集',web:'网页',field:'现场记录'};
    if(data.style==='note'){
      return title+'｜'+author+'｜'+year+'｜'+typeNames[data.type]+(source?'｜'+source:'');
    }
    return author+'. '+title+'['+typeNames[data.type]+']. '+year+(source?'. '+source:'')+'.';
  }
  if(citationForm){
    citationForm.addEventListener('submit',function(event){
      event.preventDefault();copyStatus.textContent='';citationErrorFields.forEach(function(field){field.removeAttribute('aria-invalid');});
      var data=Object.fromEntries(new FormData(citationForm).entries());
      if(!data.title.trim()){citationForm.elements.title.setAttribute('aria-invalid','true');message.textContent='请先填写题名；没有题名的资料无法被可靠定位。';citationForm.elements.title.focus();return;}
      if(data.year.trim()&&!/^\d{4}$/.test(data.year.trim())){citationForm.elements.year.setAttribute('aria-invalid','true');message.textContent='年份应为四位数字，例如 2026。';citationForm.elements.year.focus();return;}
      if(data.source.trim()&&/^www\./i.test(data.source.trim())){citationForm.elements.source.setAttribute('aria-invalid','true');message.textContent='网页地址请补全安全协议前缀，或只填写来源名称。';citationForm.elements.source.focus();return;}
      message.textContent='';generated=buildCitation(data);
      preview.innerHTML='<span>OUTPUT / READY</span><blockquote></blockquote><p>请在使用前再次核对原始来源。</p>';
      preview.querySelector('blockquote').textContent=generated;
      styleLabel.textContent=data.style==='gb'?'GB/T 7714 简式':'研究笔记式';
      copyOutput.disabled=false;
    });
    citationForm.addEventListener('reset',function(){setTimeout(function(){
      generated='';message.textContent='';copyStatus.textContent='';styleLabel.textContent='等待资料';copyOutput.disabled=true;citationErrorFields.forEach(function(field){field.removeAttribute('aria-invalid');});
      preview.innerHTML='<span>OUTPUT / 000</span><p class="preview-empty">填写左侧资料后，这里会出现可复制的引用。</p>';
    },0);});
    var sample=document.querySelector('[data-load-sample]');
    if(sample){sample.addEventListener('click',function(){
      citationForm.elements.title.value='城市街角温度观测记录';citationForm.elements.author.value='~SITE_NAME~ 研究桌';citationForm.elements.year.value='2026';citationForm.elements.type.value='field';citationForm.elements.style.value='gb';citationForm.elements.source.value='https://~SITE_DOMAIN~/article.html';citationErrorFields.forEach(function(field){field.removeAttribute('aria-invalid');});message.textContent='示例已载入，可继续修改。';
    });}
  }
  if(copyOutput){copyOutput.addEventListener('click',function(){if(!generated){return;}copyText(generated).then(function(){copyStatus.textContent='已复制到剪贴板';}).catch(function(){copyStatus.textContent='复制失败，请手动选择';});});}

  var protocolCopy=document.querySelector('[data-copy-protocol]');
  var protocolStatus=document.querySelector('[data-protocol-status]');
  if(protocolCopy){protocolCopy.addEventListener('click',function(){
    var summary='本站发布可被检查与修订的公开研究笔记；区分事实、观察与推测，标注来源和不确定性，实质性更正保留记录。';
    copyText(summary).then(function(){protocolStatus.textContent='协议摘要已复制';}).catch(function(){protocolStatus.textContent='复制失败，请手动选择';});
  });}

  var missingForm=document.querySelector('[data-404-form]');
  var missingStatus=document.querySelector('[data-404-status]');
  var missingResults=document.querySelector('[data-404-results]');
  var deskIndex=[
    {title:'街角温度计为什么总比气象站高',keys:'温度 街角 微气候 观测',href:'article.html'},
    {title:'雨停之后，哪一种路面最晚变干',keys:'雨水 路面 排水',href:'index.html#notes'},
    {title:'研究引用编排器',keys:'引用 来源 格式 工具',href:'tool.html'}
  ];
  if(missingForm){missingForm.addEventListener('submit',function(event){
    event.preventDefault();var query=missingForm.querySelector('input').value.trim().toLowerCase();missingResults.innerHTML='';
    if(!query){missingStatus.textContent='先输入一个主题关键词。';missingResults.hidden=true;return;}
    var found=deskIndex.filter(function(item){return (item.title+' '+item.keys).toLowerCase().indexOf(query)>-1;});
    if(!found.length){missingStatus.textContent='当前索引没有匹配项，试试“温度”或“引用”。';missingResults.hidden=true;return;}
    missingStatus.textContent='找到 '+found.length+' 条可访问内容。';missingResults.hidden=false;
    found.forEach(function(item){var li=document.createElement('li');var a=document.createElement('a');a.href=item.href;a.textContent=item.title;li.appendChild(a);missingResults.appendChild(li);});
  });}
})();
