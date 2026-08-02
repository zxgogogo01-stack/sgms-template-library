(function(){
  'use strict';
  var menu=document.getElementById('versebar-btn'),nav=document.getElementById('versebar-nav');
  if(menu&&nav){
    menu.addEventListener('click',function(){var open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',open?'true':'false');});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'&&nav.classList.contains('is-open')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.focus();}});
  }
  var data={scene:{mark:'SCENE · 风物',title:'从一场新雨写起',lines:[['一','檐雨洗亮石阶'],['二','云脚离开远岫'],['三','风替春天落款']]},hour:{mark:'HOUR · 时辰',title:'沿着一盏晚灯写起',lines:[['一','暮色漫过渡口'],['二','灯影停在书页'],['三','夜声落进茶盏']]},mood:{mark:'MOOD · 心绪',title:'从一段未尽之意写起',lines:[['一','旧信仍无地址'],['二','故人隔着山水'],['三','余白替我作答']]}};
  var buttons=[].slice.call(document.querySelectorAll('.verse-pick')),panel=document.querySelector('.verse-result'),mark=document.getElementById('verse-result-mark'),title=document.getElementById('verse-result-title'),list=document.getElementById('verse-result-lines');
  if(panel){panel.id='verse-result';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-atomic','true');}
  buttons.forEach(function(button,index){button.id='verse-pick-'+(index+1);button.setAttribute('aria-controls','verse-result');button.setAttribute('tabindex',index===0?'0':'-1');});
  function render(key){var item=data[key];if(!item||!list)return;if(mark)mark.textContent=item.mark;if(title)title.textContent=item.title;list.innerHTML=item.lines.map(function(line){return'<li><strong>'+line[0]+'</strong><span>'+line[1]+'</span></li>';}).join('');buttons.forEach(function(button){var active=button.getAttribute('data-verse')===key;button.classList.toggle('is-active',active);button.setAttribute('aria-selected',active?'true':'false');button.setAttribute('tabindex',active?'0':'-1');if(active&&panel)panel.setAttribute('aria-labelledby',button.id);});}
  function move(current,event){var index=buttons.indexOf(current),next=index;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();render(buttons[next].getAttribute('data-verse'));buttons[next].focus();}
  buttons.forEach(function(button){button.addEventListener('click',function(){render(button.getAttribute('data-verse'));});button.addEventListener('keydown',function(event){move(button,event);});});
  if(buttons.length)render('scene');
}());
