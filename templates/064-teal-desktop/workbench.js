(function desktopRuntime(){
 'use strict';
 const root=document.documentElement;root.classList.add('td64-script');
 const themeButton=document.querySelector('[data-desk-toggle]'),themeKey='teal-desktop-064-theme';
 function theme(value){const next=value==='night'?'night':'teal';root.dataset.theme=next;themeButton.textContent=next==='night'?'日班':'夜班';themeButton.setAttribute('aria-label',next==='night'?'切换到日班主题':'切换到夜班主题');}
 themeButton.hidden=false;try{theme(localStorage.getItem(themeKey));}catch{theme('teal');}
 themeButton.addEventListener('click',()=>{theme(root.dataset.theme==='night'?'teal':'night');try{localStorage.setItem(themeKey,root.dataset.theme);}catch{}});
 const menu=document.querySelector('.td64-menu'),button=document.querySelector('.td64-menu-button');button.hidden=false;
 const close=(focus=false)=>{menu.classList.remove('td64-open');button.setAttribute('aria-expanded','false');if(focus)button.focus();};
 button.addEventListener('click',()=>{const open=!menu.classList.contains('td64-open');menu.classList.toggle('td64-open',open);button.setAttribute('aria-expanded',String(open));if(open)menu.querySelector('a').focus();});
 menu.addEventListener('click',e=>{if(e.target.closest('a'))close();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('td64-open'))close(true);});
 window.addEventListener('resize',()=>{if(innerWidth>900)close();});
 const codeButton=document.querySelector('[data-copy-code]');
 if(codeButton){codeButton.disabled=false;codeButton.addEventListener('click',async()=>{const state=document.querySelector('[data-code-state]');codeButton.disabled=true;try{await navigator.clipboard.writeText(document.getElementById('td64-code').textContent.trim());state.textContent='代码已复制。';}catch{state.textContent='浏览器未允许复制，请手动选择上方代码。';}finally{codeButton.disabled=false;}});}
 const progress=document.querySelector('[data-reading-progress]');
 if(progress){const update=()=>{const available=root.scrollHeight-innerHeight;progress.style.width=(available>0?Math.min(100,Math.max(0,scrollY/available*100)):100)+'%';};update();document.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);}
 const normalize=s=>s.normalize('NFKC').trim().toLowerCase();
 const filter=document.querySelector('[data-paper-filter]');
 if(filter){filter.hidden=false;const items=[...document.querySelectorAll('[data-paper-tray]')],run=()=>{const q=normalize(filter.elements.keyword.value),group=filter.elements.tray.value;let count=0;for(const item of items){item.hidden=!(normalize(item.querySelector('b').textContent).includes(q)&&(group==='all'||item.dataset.paperTray===group));if(!item.hidden)count++;}filter.querySelector('[data-filter-state]').textContent='当前显示 '+count+' 份资料。';};filter.addEventListener('submit',e=>e.preventDefault());filter.addEventListener('input',run);filter.addEventListener('change',run);filter.addEventListener('reset',()=>setTimeout(run,0));run();}
 const search=document.querySelector('[data-local-search]');
 if(search){const items=[...document.querySelectorAll('[data-search-item]')],state=search.querySelector('[data-search-state]');search.querySelector('button').disabled=false;search.addEventListener('submit',e=>{e.preventDefault();const q=normalize(search.elements.query.value);let count=0;for(const item of items){item.hidden=!normalize(item.textContent).includes(q);if(!item.hidden)count++;}state.textContent='找到 '+count+' 个本站入口。';});search.addEventListener('input',()=>{for(const item of items)item.hidden=false;state.textContent='输入已变化，提交后重新查找。';});}
})();
