(() => {
  'use strict';
  const find=s=>document.querySelector(s), all=s=>[...document.querySelectorAll(s)];
  const themeKey='layered-lookout-046-theme';
  function theme(value){document.documentElement.dataset.theme=value;find('[data-theme-label]').textContent=value==='dark'?'亮色':'暗色';find('[data-theme-button]').setAttribute('aria-label',value==='dark'?'切换亮色主题':'切换暗色主题');}
  try{theme(localStorage.getItem(themeKey)==='dark'?'dark':'light');}catch{theme('light');}
  find('[data-theme-button]')?.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';theme(next);try{localStorage.setItem(themeKey,next);}catch{/* Optional storage. */}});
  const toggle=open=>{find('[data-site-nav]').dataset.open=String(open);find('[data-menu-button]').setAttribute('aria-expanded',String(open));};
  find('[data-menu-button]')?.addEventListener('click',()=>toggle(find('[data-site-nav]').dataset.open!=='true'));
  find('[data-site-nav]')?.addEventListener('click',e=>{if(e.target.closest('a'))toggle(false);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&find('[data-site-nav]')?.dataset.open==='true'){toggle(false);find('[data-menu-button]').focus();}});
  const clock=find('[data-clock]');
  if(clock){const tick=()=>{clock.textContent=new Date().toLocaleTimeString('zh-CN',{hour12:false})+' LOCAL';};tick();setInterval(tick,1000);}
  find('[data-copy-invite]')?.addEventListener('click',async()=>{try{const text=find('[data-invite]').textContent.trim();if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);else{const box=document.createElement('textarea');box.value=text;box.style.position='fixed';box.style.left='-9999px';document.body.append(box);box.select();const ok=document.execCommand('copy');box.remove();if(!ok)throw new Error('copy');}find('[data-invite-status]').textContent='识别码已复制';}catch{find('[data-invite-status]').textContent='请手动选择识别码复制';}});
  const cards=all('[data-watch]'),search=find('[data-watch-search]');let selected='all';
  const filter=()=>{const query=search.value.trim().toLocaleLowerCase();let visible=0;cards.forEach(card=>{card.hidden=!((selected==='all'||selected===card.dataset.state)&&(card.dataset.search+' '+card.textContent).toLocaleLowerCase().includes(query));if(!card.hidden)visible++;});find('[data-watch-status]').textContent=`${visible} / ${cards.length} 项`;find('[data-watch-empty]').hidden=visible!==0;};
  search?.addEventListener('input',filter);find('[data-watch-form]')?.addEventListener('submit',e=>{e.preventDefault();filter();});
  all('[data-filter]').forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.filter;all('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filter();}));
  find('[data-finder]')?.addEventListener('submit',e=>{e.preventDefault();const query=e.currentTarget.elements.query.value.trim().toLocaleLowerCase();const note=find('[data-finder-note]'),list=find('[data-finder-results]');list.replaceChildren();if(!query){note.textContent='请输入关键词再定位。';return;}const routes=[['观察簿','watchbook.html','观察 记录 方法 watchbook readings'],['阈值校准台','instruments/threshold-check.html','阈值 校准 threshold'],['仪器室','instruments.html','工具 仪器 平滑 取样 tool instruments'],['隐私与数据','privacy.html','隐私 数据 privacy']];const hits=routes.filter(r=>(r[0]+' '+r[2]).toLocaleLowerCase().includes(query));for(const [label,url]of hits){const li=document.createElement('li'),a=document.createElement('a');a.href=url;a.textContent=label;li.append(a);list.append(li);}note.textContent=hits.length?`找到 ${hits.length} 个入口。`:'未找到对应入口，可尝试“观察”或“工具”。';});
})();
