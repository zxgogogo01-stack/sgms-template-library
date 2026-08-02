(function(){
  'use strict';
  var menu=document.getElementById('mqbar-btn'),nav=document.getElementById('mqbar-nav');
  if(menu&&nav){menu.addEventListener('click',function(){var open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',open?'true':'false');});document.addEventListener('keydown',function(event){if(event.key==='Escape'&&nav.classList.contains('is-open')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.focus();}});}
  var data={view:{mark:'VIEW · FULL STAGE',title:'完整舞台视野',rows:[['A','一层中区 8–12 排'],['B','二层前区正中'],['C','一层后区中央']]},near:{mark:'DISTANCE · CLOSE',title:'靠近表演者',rows:[['A','一层前区 3–6 排'],['B','侧台前区内侧'],['C','小剧场第一排']]},mood:{mark:'MOOD · IMMERSIVE',title:'沉浸氛围',rows:[['A','一层侧区临过道'],['B','包厢前排'],['C','小剧场环形区']]}};
  var tablist=document.querySelector('.marquee-modes'),buttons=[].slice.call(document.querySelectorAll('.marquee-mode')),panel=document.querySelector('.marquee-result'),mark=document.getElementById('marquee-result-mark'),title=document.getElementById('marquee-result-title'),list=document.getElementById('marquee-result-list');
  if(tablist)tablist.setAttribute('aria-label','选座方式');
  if(panel){panel.id='marquee-results';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-live','polite');panel.setAttribute('aria-atomic','true');}
  buttons.forEach(function(button,index){button.id='marquee-mode-'+(index+1);button.setAttribute('aria-controls','marquee-results');button.setAttribute('tabindex',index===0?'0':'-1');});
  function render(key){var item=data[key];if(!item||!list)return;if(mark)mark.textContent=item.mark;if(title)title.textContent=item.title;list.innerHTML=item.rows.map(function(row){return'<li><strong>'+row[0]+'</strong><span>'+row[1]+'</span></li>';}).join('');buttons.forEach(function(button){var active=button.dataset.mode===key;button.classList.toggle('is-active',active);button.setAttribute('aria-selected',active?'true':'false');button.setAttribute('tabindex',active?'0':'-1');if(active&&panel)panel.setAttribute('aria-labelledby',button.id);});}
  function move(current,event){var index=buttons.indexOf(current),next=index;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();render(buttons[next].dataset.mode);buttons[next].focus();}
  buttons.forEach(function(button){button.addEventListener('click',function(){render(button.dataset.mode);});button.addEventListener('keydown',function(event){move(button,event);});});
  if(buttons.length)render('view');
}());
