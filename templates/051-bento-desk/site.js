(() => {
  'use strict';
  const root=document.documentElement, nav=document.getElementById('bd51-crown-nav'), fold=document.getElementById('bd51-fold-btn'), theme=document.getElementById('bd51-theme-button');
  root.classList.add('bd51-ready');
  const key='bento-desk-051-theme';
  function setTheme(v){root.dataset.theme=v;theme.textContent=v==='dark'?'浅色':'深色';theme.setAttribute('aria-label',v==='dark'?'切换到浅色主题':'切换到深色主题');}
  let saved='light';try{if(localStorage.getItem(key)==='dark')saved='dark';}catch{}
  setTheme(saved);
  theme.addEventListener('click',()=>{const v=root.dataset.theme==='dark'?'light':'dark';setTheme(v);try{localStorage.setItem(key,v);}catch{}});
  function close(){nav.classList.remove('bd51-unfold');fold.setAttribute('aria-expanded','false');}
  fold.addEventListener('click',()=>{const v=fold.getAttribute('aria-expanded')!=='true';nav.classList.toggle('bd51-unfold',v);fold.setAttribute('aria-expanded',String(v));if(v)nav.querySelector('a').focus();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&fold.getAttribute('aria-expanded')==='true'){close();fold.focus();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.bd51-crown'))close();});
  const copier=document.querySelector('[data-copy-code]');
  if(copier)copier.addEventListener('click',async()=>{const status=document.querySelector('[data-copy-status]');try{await navigator.clipboard.writeText(document.getElementById('bd51-code').textContent.trim());status.textContent='邀请码已复制';}catch{status.textContent='未获得剪贴板权限，请手动选择邀请码复制。';}});
  const buttons=[...document.querySelectorAll('[data-group-filter]')];
  buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelectorAll('[data-case-card]').forEach(c=>{c.hidden=b.dataset.groupFilter!=='all'&&c.dataset.group!==b.dataset.groupFilter;});}));
  const search=document.querySelector('[data-local-search]');
  if(search)search.addEventListener('submit',e=>{e.preventDefault();const q=search.elements.query.value.normalize('NFKC').trim().toLocaleLowerCase();let count=0;document.querySelectorAll('[data-search-item]').forEach(item=>{item.hidden=!!q&&!item.textContent.normalize('NFKC').toLocaleLowerCase().includes(q);if(!item.hidden)count++;});search.querySelector('[data-search-status]').textContent=q?(count?`找到 ${count} 个条目`:'没有匹配条目，请换个关键词或使用上方入口。'):'已显示全部条目';});
})();
