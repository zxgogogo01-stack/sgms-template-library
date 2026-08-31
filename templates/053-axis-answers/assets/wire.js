/* 053 中轴答疑：主题、无障碍导航、复制、阅读进度、净费率与站内主题查找 */
(function () {
    'use strict';

    var root = document.documentElement;
    var themeButton = document.getElementById('aa53-theme-button');
    var themeKey = 'axis-answers-053-theme';

    function preferredTheme() {
        try {
            var saved = localStorage.getItem(themeKey);
            if (saved === 'light' || saved === 'dark') return saved;
        } catch (error) {
            // 无存储权限时仍可按系统偏好显示。
        }
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme, persist) {
        root.setAttribute('data-theme', theme);
        if (themeButton) {
            var next = theme === 'dark' ? '浅色' : '夜间';
            themeButton.textContent = next;
            themeButton.setAttribute('aria-label', '切换到' + next + '模式');
        }
        if (persist) {
            try { localStorage.setItem(themeKey, theme); } catch (error) { /* 无存储权限 */ }
        }
    }

    setTheme(preferredTheme(), false);
    if (themeButton) {
        themeButton.addEventListener('click', function () {
            setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
        });
    }

    var navButton = document.getElementById('aa53-spine-btn');
    var nav = document.getElementById('aa53-spine-nav');

    function closeNav(restoreFocus) {
        if (!nav || !navButton) return;
        nav.classList.remove('aa53-agape');
        navButton.setAttribute('aria-expanded', 'false');
        if (restoreFocus) navButton.focus();
    }

    if (navButton && nav) {
        navButton.addEventListener('click', function () {
            var open = !nav.classList.contains('aa53-agape');
            nav.classList.toggle('aa53-agape', open);
            navButton.setAttribute('aria-expanded', open ? 'true' : 'false');
            if (open) {
                var firstLink = nav.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });
        nav.addEventListener('click', function (event) {
            if (event.target.closest('a')) closeNav(false);
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && nav.classList.contains('aa53-agape')) closeNav(true);
        });
    }

    function normalize(value) {
        return String(value == null ? '' : value).normalize('NFKC').trim();
    }

    function copyText(text, button, status) {
        function done(ok) {
            if (status) status.textContent = ok ? '已复制，可粘贴使用。' : '复制失败，请手动选择文本。';
            if (button && ok) {
                var original = button.textContent;
                button.textContent = '已复制';
                window.setTimeout(function () { button.textContent = original; }, 1600);
            }
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallbackCopy(text, done); });
        } else {
            fallbackCopy(text, done);
        }
    }

    function fallbackCopy(text, callback) {
        var field = document.createElement('textarea');
        field.value = text;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (error) { ok = false; }
        field.remove();
        callback(ok);
    }

    function bindPortableCopy(buttonSelector, statusSelector) {
        var button = document.querySelector(buttonSelector);
        var status = document.querySelector(statusSelector);
        if (!button) return;
        button.addEventListener('click', function () {
            var note = button.closest('.aa53-portable-note');
            var paragraph = note && note.querySelector('p');
            if (paragraph) copyText(normalize(paragraph.textContent), button, status);
        });
    }

    bindPortableCopy('[data-copy-summary]', '[data-summary-status]');
    bindPortableCopy('[data-copy-disclosure]', '[data-disclosure-status]');

    var progress = document.querySelector('[data-reading-progress]');
    if (progress) {
        function updateProgress() {
            var available = document.documentElement.scrollHeight - window.innerHeight;
            var percent = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100;
            progress.style.width = percent.toFixed(2) + '%';
        }
        updateProgress();
        document.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);
    }

    function power10(scale) {
        return BigInt('1' + '0'.repeat(scale));
    }

    function parsePercent(value) {
        var text = normalize(value);
        if (!/^(?:\d+|\d*\.\d{1,6})$/.test(text)) return null;
        var pieces = text.split('.');
        var scale = pieces[1] ? pieces[1].length : 0;
        var integer = BigInt(pieces[0] || '0') * power10(scale) + BigInt(pieces[1] || '0');
        if (integer > 100n * power10(scale)) return null;
        return { integer: integer, scale: scale, text: text };
    }

    function divideRounded(numerator, denominator) {
        return (numerator + denominator / 2n) / denominator;
    }

    function applyPercent(cents, percent) {
        return divideRounded(cents * percent.integer, 100n * power10(percent.scale));
    }

    function formatScaled(value, scale) {
        var text = value.toString().padStart(scale + 1, '0');
        if (!scale) return text;
        var whole = text.slice(0, -scale);
        var fraction = text.slice(-scale).replace(/0+$/, '');
        return fraction ? whole + '.' + fraction : whole;
    }

    function formatCents(cents) {
        var text = cents.toString().padStart(3, '0');
        return text.slice(0, -2) + '.' + text.slice(-2);
    }

    var netForm = document.getElementById('aa53-nf-form');
    if (netForm) {
        var rateInput = document.getElementById('aa53-nf-rate');
        var discountInput = document.getElementById('aa53-nf-off');
        var message = document.getElementById('aa53-nf-message');
        var state = netForm.querySelector('[data-nf-state]');
        var rateResult = netForm.querySelector('[data-nf-rate-result]');
        var grossResult = netForm.querySelector('[data-nf-gross]');
        var savingResult = netForm.querySelector('[data-nf-saving]');
        var netResult = netForm.querySelector('[data-nf-net]');
        var copyButton = netForm.querySelector('[data-copy-nf]');
        var copyStatus = netForm.querySelector('[data-nf-copy-status]');
        var resetButton = netForm.querySelector('[data-nf-reset]');
        var lastResult = '';

        function clearResult(stale) {
            state.textContent = stale ? '结果待更新' : '等待输入';
            rateResult.textContent = '—';
            grossResult.textContent = '—';
            savingResult.textContent = '—';
            netResult.textContent = '—';
            copyButton.disabled = true;
            copyStatus.textContent = '';
            lastResult = '';
        }

        [rateInput, discountInput].forEach(function (input) {
            input.addEventListener('input', function () {
                input.removeAttribute('aria-invalid');
                message.textContent = '';
                clearResult(true);
            });
        });

        netForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var rate = parsePercent(rateInput.value);
            var discount = parsePercent(discountInput.value);
            if (rate) rateInput.removeAttribute('aria-invalid');
            else rateInput.setAttribute('aria-invalid', 'true');
            if (discount) discountInput.removeAttribute('aria-invalid');
            else discountInput.setAttribute('aria-invalid', 'true');
            if (!rate || !discount) {
                var count = Number(!rate) + Number(!discount);
                message.textContent = '有 ' + count + ' 项输入无效；请输入 0–100 的普通十进制数，最多 6 位小数。';
                state.textContent = '请修正输入';
                copyButton.disabled = true;
                (!rate ? rateInput : discountInput).focus();
                return;
            }

            message.textContent = '';
            var discountScale = power10(discount.scale);
            var remainder = 100n * discountScale - discount.integer;
            var denominator = 100n * power10(rate.scale + discount.scale);
            var scaledRate = divideRounded(rate.integer * remainder * 100000000n, denominator);
            var netRate = formatScaled(scaledRate, 8);
            var baseCents = 1000000n;
            var gross = applyPercent(baseCents, rate);
            var saving = applyPercent(gross, discount);
            var net = gross - saving;
            var grossText = formatCents(gross);
            var savingText = formatCents(saving);
            var netText = formatCents(net);

            state.textContent = '精确结果';
            rateResult.textContent = netRate + '%';
            grossResult.textContent = grossText;
            savingResult.textContent = savingText;
            netResult.textContent = netText;
            lastResult = '名义费率 ' + rate.text + '%；减免比例 ' + discount.text + '%；净费率 ' + netRate + '%；每 10,000 名义费用 ' + grossText + '，减免费用 ' + savingText + '，净费用 ' + netText + '。';
            copyButton.disabled = false;
        });

        netForm.querySelectorAll('[data-nf-preset]').forEach(function (button) {
            button.addEventListener('click', function () {
                var values = button.getAttribute('data-nf-preset').split(',');
                rateInput.value = values[0];
                discountInput.value = values[1];
                netForm.requestSubmit();
            });
        });

        resetButton.addEventListener('click', function () {
            netForm.reset();
            rateInput.removeAttribute('aria-invalid');
            discountInput.removeAttribute('aria-invalid');
            message.textContent = '';
            clearResult(false);
            rateInput.focus();
        });

        copyButton.addEventListener('click', function () {
            if (lastResult) copyText(lastResult, copyButton, copyStatus);
        });
    }

    var searchForm = document.querySelector('[data-topic-search]');
    if (searchForm) {
        var query = document.getElementById('aa53-topic-query');
        var feedback = document.querySelector('[data-topic-feedback]');
        var topics = [
            { words: '答疑 问题 安全 首页 证据', label: '回到中轴答疑首页', href: 'index.html' },
            { words: '计佣 毛手续费 净手续费 长答 规则', label: '阅读计佣口径长答', href: 'article.html' },
            { words: '净费率 减免 计算 工具', label: '使用净费率计算器', href: 'tool.html' },
            { words: '披露 免责 联系 风险 合规', label: '查看披露与使用边界', href: 'legal.html' }
        ];

        query.addEventListener('input', function () {
            feedback.textContent = '输入已变化，请重新查找。';
        });

        searchForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var term = normalize(query.value).toLowerCase();
            feedback.replaceChildren();
            if (!term) {
                feedback.textContent = '请先输入要查找的主题。';
                query.focus();
                return;
            }
            var match = topics.find(function (topic) {
                var haystack = (topic.words + ' ' + topic.label).normalize('NFKC').toLowerCase();
                return haystack.indexOf(term) !== -1 || term.indexOf(haystack) !== -1;
            });
            if (!match) {
                feedback.textContent = '没有直接匹配。可尝试“计佣”“净费率”或“披露”。';
                return;
            }
            feedback.append('找到：');
            var link = document.createElement('a');
            link.href = match.href;
            link.textContent = match.label;
            feedback.appendChild(link);
        });
    }
})();
