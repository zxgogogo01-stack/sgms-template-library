// 051 bento-desk：主题、移动导航、阅读进度、复制、精确净手续费对比与 404 检索
(function () {
    'use strict';

    var root = document.documentElement;
    var themeButton = document.getElementById('bd51-theme-button');
    var fold = document.getElementById('bd51-fold-btn');
    var nav = document.getElementById('bd51-crown-nav');
    var storedTheme = null;

    function normalize(value) { return String(value || '').normalize('NFKC').trim(); }
    try { storedTheme = window.localStorage.getItem('bento-desk-051-theme'); } catch (error) { storedTheme = null; }

    function setTheme(theme) {
        root.dataset.theme = theme;
        if (themeButton) {
            themeButton.textContent = theme === 'dark' ? '日间' : '夜间';
            themeButton.setAttribute('aria-label', theme === 'dark' ? '切换到日间模式' : '切换到夜间模式');
        }
    }
    setTheme(storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light');
    if (themeButton) themeButton.addEventListener('click', function () {
        var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        try { window.localStorage.setItem('bento-desk-051-theme', next); } catch (error) { /* Persistence is optional. */ }
    });

    function closeMenu(restoreFocus) {
        if (!fold || !nav) return;
        nav.classList.remove('bd51-unfold');
        fold.setAttribute('aria-expanded', 'false');
        fold.setAttribute('aria-label', '打开主导航');
        if (restoreFocus) fold.focus();
    }
    if (fold && nav) {
        fold.setAttribute('aria-label', '打开主导航');
        fold.addEventListener('click', function () {
            var open = nav.classList.toggle('bd51-unfold');
            fold.setAttribute('aria-expanded', String(open));
            fold.setAttribute('aria-label', open ? '关闭主导航' : '打开主导航');
            if (open) { var firstLink = nav.querySelector('a'); if (firstLink) firstLink.focus(); }
        });
        nav.addEventListener('click', function (event) { if (event.target.closest('a')) closeMenu(false); });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && fold.getAttribute('aria-expanded') === 'true') closeMenu(true);
        });
    }

    function copyText(value, status, successMessage) {
        function success() { if (status) status.textContent = successMessage; }
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(value).then(success).catch(function () { if (status) status.textContent = '复制失败，请手动选择文本'; });
            return;
        }
        var helper = document.createElement('textarea');
        helper.value = value;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        try { if (document.execCommand('copy')) success(); else if (status) status.textContent = '复制失败，请手动选择文本'; } catch (error) { if (status) status.textContent = '复制失败，请手动选择文本'; }
        helper.remove();
    }

    var readingProgress = document.querySelector('[data-reading-progress]');
    function updateReadingProgress() {
        if (!readingProgress) return;
        var scrollable = document.documentElement.scrollHeight - window.innerHeight;
        readingProgress.style.width = ((scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0) * 100).toFixed(2) + '%';
    }
    if (readingProgress) { window.addEventListener('scroll', updateReadingProgress, { passive: true }); updateReadingProgress(); }

    var summaryButton = document.querySelector('[data-copy-summary]');
    if (summaryButton) summaryButton.addEventListener('click', function () {
        copyText(summaryButton.parentElement.querySelector('p').textContent.trim(), document.querySelector('[data-summary-status]'), '摘要已复制');
    });
    var disclosureButton = document.querySelector('[data-copy-disclosure]');
    if (disclosureButton) disclosureButton.addEventListener('click', function () {
        copyText(disclosureButton.parentElement.querySelector('p').textContent.trim(), document.querySelector('[data-disclosure-status]'), '披露文本已复制');
    });

    var cmpForm = document.getElementById('bd51-cmp-form');
    if (cmpForm) {
        var volumeInput = document.getElementById('bd51-cmp-vol');
        var rateAInput = document.getElementById('bd51-cmp-a');
        var shareAInput = document.getElementById('bd51-share-a');
        var rateBInput = document.getElementById('bd51-cmp-b');
        var shareBInput = document.getElementById('bd51-share-b');
        var inputs = [volumeInput, rateAInput, shareAInput, rateBInput, shareBInput];
        var message = document.getElementById('bd51-cmp-message');
        var state = document.querySelector('[data-cmp-state]');
        var verdict = document.querySelector('[data-cmp-verdict]');
        var aGross = document.querySelector('[data-cmp-a-gross]');
        var aRebate = document.querySelector('[data-cmp-a-rebate]');
        var aNet = document.querySelector('[data-cmp-a-net]');
        var bGross = document.querySelector('[data-cmp-b-gross]');
        var bRebate = document.querySelector('[data-cmp-b-rebate]');
        var bNet = document.querySelector('[data-cmp-b-net]');
        var gapOutput = document.querySelector('[data-cmp-gap]');
        var copyButton = document.querySelector('[data-copy-cmp]');
        var copyStatus = document.querySelector('[data-cmp-copy-status]');

        function parseDecimal(field, minimum, maximum, maxScale) {
            var raw = normalize(field.value);
            if (!/^(?:\d+|\d*\.\d+)$/.test(raw)) return null;
            var parts = raw.split('.'); var fraction = parts[1] || '';
            if (fraction.length > maxScale) return null;
            var numeric = Number(raw);
            if (!Number.isFinite(numeric) || numeric < minimum || numeric > maximum) return null;
            return { integer: BigInt((parts[0] || '0') + fraction), scale: fraction.length, numeric: numeric };
        }
        function divideRounded(numerator, denominator) { return (numerator + denominator / 2n) / denominator; }
        function toCents(value) { return value.integer * (10n ** BigInt(2 - value.scale)); }
        function applyPercent(cents, rate) { return divideRounded(cents * rate.integer, 100n * (10n ** BigInt(rate.scale))); }
        function amount(cents) {
            var whole = (cents / 100n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return whole + '.' + (cents % 100n).toString().padStart(2, '0');
        }
        function rateText(rate) { return rate.numeric.toFixed(Math.min(6, Math.max(2, rate.scale))); }
        function clearOutput(statusText) {
            state.textContent = statusText; verdict.textContent = '—';
            [aGross, aRebate, aNet, bGross, bRebate, bNet, gapOutput].forEach(function (node) { node.textContent = '—'; });
            copyButton.disabled = true; copyButton.dataset.copyText = ''; copyStatus.textContent = '';
        }
        function resetState() {
            message.textContent = ''; inputs.forEach(function (input) { input.removeAttribute('aria-invalid'); }); clearOutput('等待输入');
        }
        inputs.forEach(function (input) {
            input.addEventListener('input', function () {
                input.removeAttribute('aria-invalid'); message.textContent = '';
                if (copyButton.dataset.copyText) clearOutput('条件已修改，请重新对比');
            });
        });
        cmpForm.addEventListener('submit', function (event) {
            event.preventDefault();
            message.textContent = ''; copyStatus.textContent = ''; inputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
            var volume = parseDecimal(volumeInput, .01, 1000000000000, 2);
            var rateA = parseDecimal(rateAInput, 0, 100, 6); var shareA = parseDecimal(shareAInput, 0, 100, 6);
            var rateB = parseDecimal(rateBInput, 0, 100, 6); var shareB = parseDecimal(shareBInput, 0, 100, 6);
            var invalid = [];
            if (!volume) invalid.push({ field: volumeInput, text: '成交额须为 0.01–1,000,000,000,000 的普通十进制数，最多 2 位小数' });
            if (!rateA) invalid.push({ field: rateAInput, text: '方案 A 手续费率须为 0–100 的普通十进制数，最多 6 位小数' });
            if (!shareA) invalid.push({ field: shareAInput, text: '方案 A 返佣分成须为 0–100 的普通十进制数，最多 6 位小数' });
            if (!rateB) invalid.push({ field: rateBInput, text: '方案 B 手续费率须为 0–100 的普通十进制数，最多 6 位小数' });
            if (!shareB) invalid.push({ field: shareBInput, text: '方案 B 返佣分成须为 0–100 的普通十进制数，最多 6 位小数' });
            if (invalid.length) {
                clearOutput('输入有误'); invalid.forEach(function (item) { item.field.setAttribute('aria-invalid', 'true'); });
                message.textContent = invalid.map(function (item) { return item.text; }).join('；') + '。'; invalid[0].field.focus(); return;
            }
            var volumeCents = toCents(volume);
            var grossA = applyPercent(volumeCents, rateA); var rebateA = applyPercent(grossA, shareA); var netA = grossA - rebateA;
            var grossB = applyPercent(volumeCents, rateB); var rebateB = applyPercent(grossB, shareB); var netB = grossB - rebateB;
            var difference = netA >= netB ? netA - netB : netB - netA;
            var verdictText = netA === netB ? '两组净成本打平' : (netA < netB ? '方案 A 净成本更低' : '方案 B 净成本更低');
            state.textContent = '对比完成'; verdict.textContent = verdictText;
            aGross.textContent = amount(grossA); aRebate.textContent = amount(rebateA); aNet.textContent = amount(netA);
            bGross.textContent = amount(grossB); bRebate.textContent = amount(rebateB); bNet.textContent = amount(netB); gapOutput.textContent = amount(difference);
            copyButton.disabled = false;
            copyButton.dataset.copyText = '净手续费对比：成交额 ' + amount(volumeCents) + '；方案 A 费率 ' + rateText(rateA) + '%、返佣 ' + rateText(shareA) + '%、净成本 ' + amount(netA) + '；方案 B 费率 ' + rateText(rateB) + '%、返佣 ' + rateText(shareB) + '%、净成本 ' + amount(netB) + '；' + verdictText + '，差额 ' + amount(difference) + '。手续费与返还均按分四舍五入，最终以官方规则和账单为准。';
        });
        Array.prototype.forEach.call(document.querySelectorAll('[data-cmp-preset]'), function (button) {
            button.addEventListener('click', function () {
                var values = button.dataset.cmpPreset.split(',');
                volumeInput.value = values[0]; rateAInput.value = values[1]; shareAInput.value = values[2]; rateBInput.value = values[3]; shareBInput.value = values[4]; resetState(); cmpForm.requestSubmit();
            });
        });
        document.querySelector('[data-cmp-reset]').addEventListener('click', function () {
            cmpForm.reset(); shareAInput.value = '0'; shareBInput.value = '0'; resetState(); volumeInput.focus();
        });
        copyButton.addEventListener('click', function () { if (!copyButton.disabled) copyText(copyButton.dataset.copyText, copyStatus, '对比结果已复制'); });
    }

    var topicForm = document.querySelector('[data-topic-search]');
    if (topicForm) {
        var topicInput = document.getElementById('bd51-topic-query');
        var topicFeedback = document.querySelector('[data-topic-feedback]');
        var topics = [
            { words: ['首页', '栏目', '知识', '安全'], href: 'index.html', label: '便当格首页' },
            { words: ['费率', '档位', '返佣', '规则', '指南'], href: 'article.html', label: '费率与返佣指南' },
            { words: ['计算', '对比', '成本', '工具'], href: 'tool.html', label: '净手续费对比器' },
            { words: ['披露', '免责', '联系', '风险'], href: 'legal.html', label: '披露与免责' }
        ];
        topicInput.addEventListener('input', function () { topicInput.removeAttribute('aria-invalid'); topicFeedback.textContent = '可搜索首页、指南、工具和披露。'; });
        topicForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var query = normalize(topicInput.value).toLocaleLowerCase();
            if (!query) { topicInput.setAttribute('aria-invalid', 'true'); topicFeedback.textContent = '请先输入一个站内主题。'; topicInput.focus(); return; }
            topicInput.removeAttribute('aria-invalid');
            var match = topics.find(function (item) { return item.words.some(function (word) { var normalizedWord = normalize(word).toLocaleLowerCase(); return query.indexOf(normalizedWord) !== -1 || normalizedWord.indexOf(query) !== -1; }); });
            topicFeedback.textContent = '';
            if (match) { topicFeedback.append('找到：'); var link = document.createElement('a'); link.href = match.href; link.textContent = match.label; topicFeedback.appendChild(link); }
            else topicFeedback.textContent = '未找到“' + query + '”。可尝试“费率”“计算”“披露”或“安全”。';
        });
    }
}());
