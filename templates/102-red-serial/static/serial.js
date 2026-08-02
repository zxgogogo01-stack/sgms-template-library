(function(){
  'use strict';
  var menu=document.getElementById('serialbar-btn'),nav=document.getElementById('serialbar-nav');
  if(menu&&nav){
    menu.addEventListener('click',function(){var open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',open?'true':'false');});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'&&nav.classList.contains('is-open')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.focus();}});
  }
  var data={volume:{mark:'MARK · VOLUME',title:'从第一卷第十二回继续',items:[['一','已读：第一回至第十一回'],['二','当前：第十二回旧站台'],['三','待续：第二卷河岸来信']]},people:{mark:'MARK · PEOPLE',title:'沿着人物关系重新进入',items:[['一','林渡：回到旧站台'],['二','周遥：留下未寄出的信'],['三','陈叔：守着河岸修表店']]},time:{mark:'MARK · TIMELINE',title:'按事件发生时间还原故事',items:[['一','十年前：夏夜的离开'],['二','三天前：旧地图出现'],['三','现在：站台灯重新亮起']]}};
  var buttons=[].slice.call(document.querySelectorAll('.serial-mark')),panel=document.querySelector('.serial-result'),mark=document.getElementById('serial-result-mark'),title=document.getElementById('serial-result-title'),list=document.getElementById('serial-result-list');
  if(panel){panel.id='serial-result';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-atomic','true');}
  buttons.forEach(function(button,index){button.id='serial-mark-'+(index+1);button.setAttribute('aria-controls','serial-result');button.setAttribute('tabindex',index===0?'0':'-1');});
  function render(key){var item=data[key];if(!item||!list)return;if(mark)mark.textContent=item.mark;if(title)title.textContent=item.title;list.innerHTML=item.items.map(function(row){return'<li><strong>'+row[0]+'</strong><span>'+row[1]+'</span></li>';}).join('');buttons.forEach(function(button){var active=button.getAttribute('data-mark')===key;button.classList.toggle('is-active',active);button.setAttribute('aria-selected',active?'true':'false');button.setAttribute('tabindex',active?'0':'-1');if(active&&panel)panel.setAttribute('aria-labelledby',button.id);});}
  function move(current,event){var index=buttons.indexOf(current),next=index;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();render(buttons[next].getAttribute('data-mark'));buttons[next].focus();}
  buttons.forEach(function(button){button.addEventListener('click',function(){render(button.getAttribute('data-mark'));});button.addEventListener('keydown',function(event){move(button,event);});});
  if(buttons.length)render('volume');
}());
