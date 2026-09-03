(() => {
 'use strict';
 const one=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)],key='tacked-tidings-048-theme';
 function paint(mode){document.documentElement.dataset.theme=mode;const b=one('[data-theme-button]');b.textContent=mode==='dark'?'日间':'夜间';b.setAttribute('aria-label',mode==='dark'?'切换日间主题':'切换夜间主题');}
 try{paint(localStorage.getItem(key)==='dark'?'dark':'light');}catch{paint('light');}
 one('[data-theme-button]')?.addEventListener('click',()=>{const mode=document.documentElement.dataset.theme==='dark'?'light':'dark';paint(mode);try{localStorage.setItem(key,mode);}catch{/* Manual theme still works. */}});
 const menu=open=>{one('[data-site-nav]').dataset.open=String(open);one('[data-menu-button]').setAttribute('aria-expanded',String(open));};
 one('[data-menu-button]')?.addEventListener('click',()=>menu(one('[data-site-nav]').dataset.open!=='true'));
 one('[data-site-nav]')?.addEventListener('click',e=>{if(e.target.closest('a'))menu(false);});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&one('[data-site-nav]')?.dataset.open==='true'){menu(false);one('[data-menu-button]').focus();}});
 async function copy(value){if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(value);const box=document.createElement('textarea');box.value=value;box.style.position='fixed';box.style.left='-9999px';document.body.append(box);box.select();const ok=document.execCommand('copy');box.remove();if(!ok)throw Error('copy');}
 one('[data-copy-invite]')?.addEventListener('click',async()=>{try{await copy(one('[data-invite-code]').textContent.trim());one('[data-invite-status]').textContent='邀请码已复制';}catch{one('[data-invite-status]').textContent='请手动选择邀请码复制';}});
 const search=one('[data-notice-search]'),cards=all('[data-notice]');let rail='all';
 function filter(){const term=search.value.trim().toLocaleLowerCase();let count=0;cards.forEach(c=>{c.hidden=!((rail==='all'||c.dataset.category===rail)&&(c.textContent+' '+c.dataset.search).toLocaleLowerCase().includes(term));if(!c.hidden)count++;});one('[data-notice-status]').textContent=`${count} / ${cards.length} 则`;one('[data-notice-empty]').hidden=count!==0;}
 search?.addEventListener('input',filter);all('[data-notice-filter]').forEach(b=>b.addEventListener('click',()=>{rail=b.dataset.noticeFilter;all('[data-notice-filter]').forEach(el=>{el.setAttribute('aria-pressed',String(el===b));el.classList.toggle('tt48-is-active',el===b);});filter();}));
 one('[data-board-finder]')?.addEventListener('submit',e=>{e.preventDefault();const term=e.currentTarget.elements.query.value.trim().toLocaleLowerCase(),result=one('[data-finder-results]'),status=one('[data-finder-status]');result.replaceChildren();if(!term){status.textContent='请输入要找的入口。';return;}const routes=[['全部布告','bulletins.html','布告 文章 索引 notice'],['时间便签','rails/time-notes.html','时间 日期 分类'],['桌面工具','desk.html','工具 排程 比对 分配'],['隐私记录','privacy.html','隐私 数据 privacy']].filter(r=>(r[0]+' '+r[2]).toLocaleLowerCase().includes(term));routes.forEach(([label,url])=>{const li=document.createElement('li'),a=document.createElement('a');a.href=url;a.textContent=label;li.append(a);result.append(li);});status.textContent=routes.length?`找到 ${routes.length} 个入口。`:'这枚钉位没有匹配页，可试试“布告”或“工具”。';});
})();
