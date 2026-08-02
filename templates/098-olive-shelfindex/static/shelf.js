(function(){
  'use strict';

  var menu=document.getElementById('shelfbar-btn');
  var nav=document.getElementById('shelfbar-nav');
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
    topic:{layer:'LAYER 01 · TOPIC',title:'先写下一个主要主题',items:['使用自己以后仍能理解的词','只选一个主要主题，关系稍后补充','保留来源中的原始关键词']},
    status:{layer:'LAYER 02 · STATUS',title:'用状态说明现在的位置',items:['区分待读、在读、引用和待核实','记录最近一次处理的日期','删除已经失去意义的临时状态']},
    next:{layer:'LAYER 03 · NEXT',title:'让条目指向下一步行动',items:['写下一个可以完成的具体动作','标记完成动作所需的材料','给长期搁置的条目设置复查日期']}
  };
  var buttons=[].slice.call(document.querySelectorAll('.shelf-layer'));
  var panel=document.querySelector('.shelf-result');
  var layer=document.getElementById('shelf-result-layer');
  var title=document.getElementById('shelf-result-title');
  var list=document.getElementById('shelf-result-list');

  if(panel){
    panel.id='shelf-result';
    panel.setAttribute('role','tabpanel');
    panel.setAttribute('aria-atomic','true');
  }
  buttons.forEach(function(button,index){
    button.id='shelf-layer-'+(index+1);
    button.setAttribute('aria-controls','shelf-result');
    button.setAttribute('tabindex',index===0?'0':'-1');
  });

  function render(key){
    var item=data[key];
    if(!item||!list)return;
    if(layer)layer.textContent=item.layer;
    if(title)title.textContent=item.title;
    list.innerHTML=item.items.map(function(text,index){
      return '<li><strong>'+String.fromCharCode(65+index)+'</strong><span>'+text+'</span></li>';
    }).join('');
    buttons.forEach(function(button){
      var active=button.getAttribute('data-layer')===key;
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
    render(buttons[next].getAttribute('data-layer'));
    buttons[next].focus();
  }

  buttons.forEach(function(button){
    button.addEventListener('click',function(){render(button.getAttribute('data-layer'));});
    button.addEventListener('keydown',function(event){move(button,event);});
  });
  if(buttons.length)render('topic');
}());
