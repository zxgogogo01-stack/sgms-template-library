(function(){
  'use strict';

  var menu=document.getElementById('ascentbar-btn');
  var nav=document.getElementById('ascentbar-nav');
  if(menu&&nav){
    menu.addEventListener('click',function(){
      var open=nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded',open?'true':'false');
    });
    document.addEventListener('keydown',function(event){
      if(event.key==='Escape'&&nav.classList.contains('is-open')){
        nav.classList.remove('is-open');
        menu.setAttribute('aria-expanded','false');
        menu.focus();
      }
    });
  }

  var data={
    start:{alt:'840M · START',title:'起步前先确认边界',items:['核对天气、路线状态和返回时间','明确今天必须停止或转向的条件','让同行者知道目标与备用方案']},
    climb:{alt:'1260M · CLIMB',title:'爬升中保持判断余量',items:['观察天气、地形与同行状态变化','用稳定节奏保留体力和注意力','在预设节点重新决定是否继续']},
    review:{alt:'1842M · REVIEW',title:'回望时把经验留下',items:['记录实际路线、时间与关键决定','区分偶然顺利和可复用的方法','写下下一次应该更早发现的信号']}
  };
  var buttons=[].slice.call(document.querySelectorAll('.ascent-stage'));
  var panel=document.querySelector('.ascent-result');
  var alt=document.getElementById('ascent-result-alt');
  var title=document.getElementById('ascent-result-title');
  var list=document.getElementById('ascent-result-list');

  if(panel){
    panel.id='ascent-result';
    panel.setAttribute('role','tabpanel');
    panel.setAttribute('aria-atomic','true');
  }
  buttons.forEach(function(button,index){
    button.id='ascent-stage-'+(index+1);
    button.setAttribute('aria-controls','ascent-result');
    button.setAttribute('tabindex',index===0?'0':'-1');
  });

  function render(key){
    var item=data[key];
    if(!item||!list)return;
    if(alt)alt.textContent=item.alt;
    if(title)title.textContent=item.title;
    list.innerHTML=item.items.map(function(text,index){
      return '<li><strong>0'+(index+1)+'</strong><span>'+text+'</span></li>';
    }).join('');
    buttons.forEach(function(button){
      var active=button.getAttribute('data-stage')===key;
      button.classList.toggle('is-active',active);
      button.setAttribute('aria-selected',active?'true':'false');
      button.setAttribute('tabindex',active?'0':'-1');
      if(active&&panel)panel.setAttribute('aria-labelledby',button.id);
    });
  }

  function move(current,event){
    var index=buttons.indexOf(current);
    var next=index;
    if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;
    else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=buttons.length-1;
    else return;
    event.preventDefault();
    render(buttons[next].getAttribute('data-stage'));
    buttons[next].focus();
  }

  buttons.forEach(function(button){
    button.addEventListener('click',function(){render(button.getAttribute('data-stage'));});
    button.addEventListener('keydown',function(event){move(button,event);});
  });
  if(buttons.length)render('start');
}());
