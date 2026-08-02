(function(){
  'use strict';
  var menu=document.getElementById('cplbar-btn'),nav=document.getElementById('cplbar-nav');
  if(menu&&nav){menu.addEventListener('click',function(){var open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',open?'true':'false');});document.addEventListener('keydown',function(event){if(event.key==='Escape'&&nav.classList.contains('is-open')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.focus();}});}
  var data={space:{mark:'SPACE · HALL',title:'清风满堂',left:'檐收远岫千重雨',right:'门迎清风一院春',plaque:'清风入座'},season:{mark:'SEASON · SPRING',title:'春回小院',left:'新竹一庭承晓露',right:'旧梅半树报春风',plaque:'春满人间'},wish:{mark:'WISH · PEACE',title:'岁月安和',left:'门纳清风添雅意',right:'堂留明月照初心',plaque:'安和长乐'}};
  var tablist=document.querySelector('.couplet-modes'),buttons=[].slice.call(document.querySelectorAll('.couplet-mode')),panel=document.querySelector('.couplet-result'),mark=document.getElementById('couplet-result-mark'),title=document.getElementById('couplet-result-title'),left=document.getElementById('couplet-result-left'),right=document.getElementById('couplet-result-right'),plaque=document.querySelector('.couplet-result div b');
  if(tablist)tablist.setAttribute('aria-label','择联方式');
  if(panel){panel.id='couplet-results';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-live','polite');panel.setAttribute('aria-atomic','true');}
  buttons.forEach(function(button,index){button.id='couplet-mode-'+(index+1);button.setAttribute('aria-controls','couplet-results');button.setAttribute('tabindex',index===0?'0':'-1');});
  function render(key){var item=data[key];if(!item)return;if(mark)mark.textContent=item.mark;if(title)title.textContent=item.title;if(left)left.textContent=item.left;if(right)right.textContent=item.right;if(plaque)plaque.textContent=item.plaque;buttons.forEach(function(button){var active=button.dataset.mode===key;button.classList.toggle('is-active',active);button.setAttribute('aria-selected',active?'true':'false');button.setAttribute('tabindex',active?'0':'-1');if(active&&panel)panel.setAttribute('aria-labelledby',button.id);});}
  function move(current,event){var index=buttons.indexOf(current),next=index;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();render(buttons[next].dataset.mode);buttons[next].focus();}
  buttons.forEach(function(button){button.addEventListener('click',function(){render(button.dataset.mode);});button.addEventListener('keydown',function(event){move(button,event);});});
  if(buttons.length)render('space');
}());
