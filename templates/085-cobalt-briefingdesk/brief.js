/* 085 交互 */
(function () {
    'use strict';

    var btn = document.getElementById('briefbar-btn');
    if (btn) {
        btn.addEventListener('click', function () {
            var nav = document.getElementById('briefbar-nav');
            if (!nav) return;
            var open = nav.classList.toggle('unpinned85');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    /* 场景导航：切换推荐清单 */
    var sceneMap = {
        spot: {
            label: '现货为主',
            items: [
                '返佣是从哪里来的：一笔手续费的完整流向',
                '现货与合约的返佣口径差在哪',
                '优惠叠加是乘法：两层 20% 不是 40%'
            ]
        },
        contract: {
            label: '合约为主',
            items: [
                '挂单和吃单：为什么同一笔单费率不一样',
                'VIP 等级和邀请返佣能不能叠加：口径梳理',
                '往返两条腿的手续费怎么算'
            ]
        },
        dca: {
            label: '定投为主',
            items: [
                '定投手续费一年蒸发多少：逐月摊给你看',
                '返佣多久到账：各家结算节奏对照',
                '注册时漏填邀请码，事后还有救吗'
            ]
        }
    };

    var tabs = Array.prototype.slice.call(document.querySelectorAll('.scenetab'));
    var listBox = document.getElementById('sc-list');
    var labelBox = document.getElementById('sc-label');
    if (tabs.length && listBox) {
        var render = function (key) {
            var data = sceneMap[key];
            if (!data) return;
            if (labelBox) labelBox.textContent = data.label + '的推荐阅读';
            var html = '';
            for (var i = 0; i < data.items.length; i++) {
                html += '<li><a href=\'article.html\'>' + data.items[i] + '</a></li>';
            }
            listBox.innerHTML = html;
        };
        var activate = function (tab, moveFocus) {
            tabs.forEach(function (item) {
                var selected = item === tab;
                item.classList.toggle('is-on85', selected);
                item.setAttribute('aria-pressed', selected ? 'true' : 'false');
            });
            render(tab.getAttribute('data-scene'));
            if (moveFocus) tab.focus();
        };
        tabs.forEach(function (tab, index) {
            tab.addEventListener('click', function () {
                activate(tab, false);
            });
            tab.addEventListener('keydown', function (event) {
                var next = null;
                if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
                if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
                if (event.key === 'Home') next = 0;
                if (event.key === 'End') next = tabs.length - 1;
                if (next === null) return;
                event.preventDefault();
                activate(tabs[next], true);
            });
        });
        activate(tabs[0], false);
    }
})();
