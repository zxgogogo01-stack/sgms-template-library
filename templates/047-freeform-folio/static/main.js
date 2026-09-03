(() => {
 'use strict';
 const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)],themeKey='freeform-folio-047-theme';
 function theme(t){document.documentElement.dataset.theme=t;q('[data-theme-label]').textContent=t==='dark'?'日间':'夜间';q('[data-theme-button]').setAttribute('aria-label',t==='dark'?'切换日间主题':'切换夜间主题');}
 try{theme(localStorage.getItem(themeKey)==='dark'?'dark':'light');}catch{theme('light');}
 q('[data-theme-button]')?.addEventListener('click',()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';theme(t);try{localStorage.setItem(themeKey,t);}catch{/* Theme remains usable. */}});
 function menu(open){q('[data-site-nav]').dataset.open=String(open);q('[data-menu-button]').setAttribute('aria-expanded',String(open));}
 q('[data-menu-button]')?.addEventListener('click',()=>menu(q('[data-site-nav]').dataset.open!=='true'));
 q('[data-site-nav]')?.addEventListener('click',e=>{if(e.target.closest('a'))menu(false);});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&q('[data-site-nav]')?.dataset.open==='true'){menu(false);q('[data-menu-button]').focus();}});
 q('[data-copy-invite]')?.addEventListener('click',async()=>{try{const value=q('[data-invite]').textContent.trim();if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(value);else{const el=document.createElement('textarea');el.value=value;el.style.position='fixed';el.style.left='-9999px';document.body.append(el);el.select();const ok=document.execCommand('copy');el.remove();if(!ok)throw Error('copy');}q('[data-copy-note]').textContent='识别码已复制';}catch{q('[data-copy-note]').textContent='请手动选择识别码复制';}});
 const cards=qa('[data-project]'),search=q('[data-folio-search]');let chosen='all';
 function filter(){const term=search.value.trim().toLocaleLowerCase();let found=0;cards.forEach(c=>{c.hidden=!((chosen==='all'||chosen===c.dataset.kind)&&(c.dataset.search+' '+c.textContent).toLocaleLowerCase().includes(term));if(!c.hidden)found++;});q('[data-folio-status]').textContent=`${found} / ${cards.length} 份`;q('[data-project-empty]').hidden=found!==0;}
 search?.addEventListener('input',filter);qa('[data-filter]').forEach(b=>b.addEventListener('click',()=>{chosen=b.dataset.filter;qa('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));filter();}));
 q('[data-finder]')?.addEventListener('submit',e=>{e.preventDefault();const term=e.currentTarget.elements.query.value.trim().toLocaleLowerCase(),list=q('[data-finder-results]'),status=q('[data-finder-status]');list.replaceChildren();if(!term){status.textContent='先输入一个检索词。';return;}const routes=[['档案选集','folio.html','档案 文章 案例 folio'],['视觉动作','collections/gestures.html','视觉 专题 gestures'],['工作室','studio.html','工具 比例 颜色 工作室 studio'],['隐私说明','privacy.html','隐私 数据 privacy']];const found=routes.filter(r=>(r[0]+' '+r[2]).toLocaleLowerCase().includes(term));for(const [label,url]of found){const li=document.createElement('li'),a=document.createElement('a');a.href=url;a.textContent=label;li.append(a);list.append(li);}status.textContent=found.length?`找到 ${found.length} 个入口。`:'没有找到对应页码，可尝试“档案”或“工具”。';});
})();
