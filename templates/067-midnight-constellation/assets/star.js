(function () {
    'use strict';

    var navBtn = document.getElementById('skydeck-btn');
    if (navBtn) {
        navBtn.addEventListener('click', function () {
            var nav = document.getElementById('skydeck-nav');
            if (!nav) return;
            var open = nav.classList.toggle('wideopen');
            navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    /* chip filter + search over data-cat / data-text */
    var grid = document.getElementById('skygrid');
    if (grid) {
        var chips = Array.prototype.slice.call(document.querySelectorAll('.lenschip'));
        var searchBox = document.getElementById('lens-search');
        var voidnote = document.getElementById('voidnote');
        var activeCat = 'all';

        if (searchBox) searchBox.hidden = false;

        var apply = function () {
            var q = searchBox ? searchBox.value.trim().toLowerCase() : '';
            var cards = Array.prototype.slice.call(grid.querySelectorAll('.starcard'));
            var shown = 0;
            cards.forEach(function (card) {
                var okCat = activeCat === 'all' || card.getAttribute('data-cat') === activeCat;
                var hay = (card.getAttribute('data-text') || '').toLowerCase();
                var okText = !q || hay.indexOf(q) !== -1;
                var visible = okCat && okText;
                card.classList.toggle('is-dim', !visible);
                if (visible) shown++;
            });
            if (voidnote) voidnote.hidden = shown > 0;
        };

        chips.forEach(function (chip) {
            chip.addEventListener('click', function (event) {
                event.preventDefault();
                chips.forEach(function (c) { c.classList.remove('is-on', 'is-active'); });
                chip.classList.add('is-on');
                chip.classList.add('is-active');
                activeCat = chip.getAttribute('data-cat') || 'all';
                apply();
            });
        });

        if (searchBox) searchBox.addEventListener('input', apply);
    }

    /* multi-platform rebate tally */
    var sumForm = document.getElementById('tb-form');
    if (sumForm) {
        var tallyInputs = ['tb-a', 'tb-b', 'tb-c'].map(function (id) { return document.getElementById(id); });
        tallyInputs.forEach(function (input) {
            input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
        });
        sumForm.addEventListener('submit', function (event) {
            event.preventDefault();
            tallyInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
            var names = ['平台 A', '平台 B', '平台 C'];
            var vals = [];
            var total = 0;
            var filled = 0;
            var invalid = [];
            for (var i = 0; i < tallyInputs.length; i++) {
                var raw = tallyInputs[i].value.trim();
                if (raw === '') { vals.push(null); continue; }
                var v = Number(raw);
                if (!Number.isFinite(v) || v < 0) { invalid.push(tallyInputs[i]); vals.push(null); continue; }
                vals.push(v);
                total += v;
                filled++;
            }
            var out = document.getElementById('tb-out');
            if (invalid.length) {
                invalid.forEach(function (input) { input.setAttribute('aria-invalid', 'true'); });
                out.textContent = '请检查标红字段：返佣金额不能为负数。';
                invalid[0].focus();
                return;
            }
            if (filled === 0) {
                tallyInputs[0].setAttribute('aria-invalid', 'true');
                out.textContent = '至少填写一个平台不小于 0 的月返佣。';
                tallyInputs[0].focus();
                return;
            }
            var lines = '';
            for (var j = 0; j < vals.length; j++) {
                if (vals[j] === null) continue;
                var share = total > 0 ? (vals[j] / total * 100).toFixed(1) : '0.0';
                lines += names[j] + '：<b>' + vals[j].toFixed(2) + '</b>（占 ' + share + '%）<br>';
            }
            out.innerHTML = lines + '合计月返佣 <b>' + total.toFixed(2) + '</b> · 折合全年约 <b>' + (total * 12).toFixed(2) + '</b><br>演示口径，实际以各平台结算为准。';
        });
    }
})();
