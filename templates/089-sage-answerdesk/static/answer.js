(function () {
  'use strict';
  var menu = document.getElementById('answerbar-btn');
  if (menu) menu.addEventListener('click', function () { var nav=document.getElementById('answerbar-nav'); if(!nav)return; var open=nav.classList.toggle('is-open'); menu.classList.toggle('is-open',open); menu.setAttribute('aria-expanded',open?'true':'false'); });

  var routes={fee:{label:'费用问题核对路线',items:['固定订单类型与成交时间','按当期规则重新计算金额','回到账单核对结算批次']},arrival:{label:'到账问题核对路线',items:['记录状态和最后更新时间','确认批次与实际到账位置','带编号对照公开处理规则']},source:{label:'来源问题核对路线',items:['确认页面域名与归属','检查发布日期和修订记录','寻找独立来源交叉确认']}};
  var buttons=Array.prototype.slice.call(document.querySelectorAll('.answer-choice')),label=document.getElementById('answer-result-label'),list=document.getElementById('answer-result-list'),panel=document.querySelector('.answer-result');
  if(panel){panel.id='answer-result';panel.setAttribute('role','region');panel.setAttribute('aria-labelledby','answer-result-label');panel.setAttribute('aria-atomic','true');}
  function render(key){var data=routes[key];if(!data||!list)return;if(label)label.textContent=data.label;list.innerHTML=data.items.map(function(item,i){return '<li><strong>0'+(i+1)+'</strong><span>'+item+'</span></li>';}).join('');buttons.forEach(function(button){var active=button.getAttribute('data-answer')===key;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',active?'true':'false');button.setAttribute('aria-controls','answer-result');});}
  buttons.forEach(function(button,index){button.addEventListener('click',function(){render(button.getAttribute('data-answer'));});button.addEventListener('keydown',function(event){var next=null;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index-1+buttons.length)%buttons.length;if(event.key==='Home')next=0;if(event.key==='End')next=buttons.length-1;if(next===null)return;event.preventDefault();buttons[next].focus();render(buttons[next].getAttribute('data-answer'));});});if(buttons.length&&list)render('fee');
}());
