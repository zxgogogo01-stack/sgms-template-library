(function(){
  'use strict';

  var menu=document.getElementById('tradebar-btn');
  var nav=document.getElementById('tradebar-nav');
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
    constraint:{step:'STEP 01 · CONSTRAINT',title:'先确认不可突破的边界',items:['列出时间、预算和质量底线','区分真实约束与习惯性假设','写明约束发生变化的触发条件']},
    cost:{step:'STEP 02 · COST',title:'把选择要求放弃的部分写清',items:['记录每个选项失去的直接收益','识别被占用的时间和机会成本','说明代价由谁承担以及持续多久']},
    reversible:{step:'STEP 03 · REVERSIBLE',title:'用可逆性决定行动大小',items:['判断回退所需的时间与资源','为不可逆决定提高验证门槛','给可逆试验设定停止和复查节点']}
  };
  var buttons=[].slice.call(document.querySelectorAll('.trade-step'));
  var panel=document.querySelector('.trade-result');
  var step=document.getElementById('trade-result-step');
  var title=document.getElementById('trade-result-title');
  var list=document.getElementById('trade-result-list');

  if(panel){
    panel.id='trade-result';
    panel.setAttribute('role','tabpanel');
    panel.setAttribute('aria-atomic','true');
  }
  buttons.forEach(function(button,index){
    button.id='trade-step-'+(index+1);
    button.setAttribute('aria-controls','trade-result');
    button.setAttribute('tabindex',index===0?'0':'-1');
  });

  function render(key){
    var item=data[key];
    if(!item||!list)return;
    if(step)step.textContent=item.step;
    if(title)title.textContent=item.title;
    list.innerHTML=item.items.map(function(text,index){
      return '<li><strong>'+String.fromCharCode(65+index)+'</strong><span>'+text+'</span></li>';
    }).join('');
    buttons.forEach(function(button){
      var active=button.getAttribute('data-step')===key;
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
    render(buttons[next].getAttribute('data-step'));
    buttons[next].focus();
  }

  buttons.forEach(function(button){
    button.addEventListener('click',function(){render(button.getAttribute('data-step'));});
    button.addEventListener('keydown',function(event){move(button,event);});
  });
  if(buttons.length)render('constraint');
}());
