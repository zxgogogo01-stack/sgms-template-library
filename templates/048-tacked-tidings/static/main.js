(function () {
  'use strict';

  var root = document.documentElement;
  var themeButton = document.querySelector('[data-theme-button]');
  var menuButton = document.querySelector('[data-menu-button]');
  var siteNav = document.querySelector('[data-site-nav]');
  function normalize(value) { return String(value || '').normalize('NFKC').trim(); }

  function syncThemeLabel() {
    if (themeButton) {
      themeButton.textContent = root.dataset.theme === 'dark' ? '日间' : '夜间';
      themeButton.setAttribute('aria-label', root.dataset.theme === 'dark' ? '切换到日间模式' : '切换到夜间模式');
    }
  }

  syncThemeLabel();
  if (themeButton) {
    themeButton.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('tacked-tidings-048-theme', root.dataset.theme); } catch (error) { /* Theme remains active without persistence. */ }
      syncThemeLabel();
    });
  }

  function closeMenu() {
    if (!siteNav || !menuButton) return;
    siteNav.dataset.open = 'false';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '目录';
  }

  if (menuButton && siteNav) {
    menuButton.addEventListener('click', function () {
      var open = siteNav.dataset.open !== 'true';
      siteNav.dataset.open = String(open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '收起' : '目录';
      if (open) { var firstLink = siteNav.querySelector('a'); if (firstLink) firstLink.focus(); }
    });
    siteNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && siteNav.dataset.open === 'true') {
        closeMenu();
        menuButton.focus();
      }
    });
  }

  function copyText(value, done, failed) {
    failed = failed || function () {};
    var fallback = function () {
      var area = document.createElement('textarea');
      area.value = value;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      var copied = false;
      try { copied = document.execCommand('copy'); } catch (error) { copied = false; }
      area.remove();
      copied ? done() : failed();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(done).catch(fallback);
    } else {
      fallback();
    }
  }

  var inviteButton = document.querySelector('[data-copy-invite]');
  if (inviteButton) {
    inviteButton.addEventListener('click', function () {
      var code = document.querySelector('[data-invite-code]').textContent.trim();
      copyText(code, function () {
        document.querySelector('[data-invite-status]').textContent = '邀请码已复制';
      }, function () { document.querySelector('[data-invite-status]').textContent = '复制失败，请手动选择邀请码'; });
    });
  }

  var search = document.querySelector('[data-notice-search]');
  var filterButtons = Array.from(document.querySelectorAll('[data-notice-filter]'));
  var notices = Array.from(document.querySelectorAll('[data-notice]'));
  if (search && notices.length) {
    var activeFilter = 'all';
    var updateNotices = function () {
      var query = normalize(search.value).toLocaleLowerCase();
      var visible = 0;
      notices.forEach(function (notice) {
        var categoryMatch = activeFilter === 'all' || notice.dataset.category === activeFilter;
        var haystack = normalize((notice.dataset.search || '') + ' ' + notice.textContent).toLocaleLowerCase();
        var textMatch = !query || haystack.includes(query);
        notice.hidden = !(categoryMatch && textMatch);
        if (!notice.hidden) visible += 1;
      });
      document.querySelector('[data-notice-count]').textContent = String(visible);
      document.querySelector('[data-notice-empty]').hidden = visible !== 0;
    };
    search.addEventListener('input', updateNotices);
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        activeFilter = button.dataset.noticeFilter;
        filterButtons.forEach(function (item) {
          item.classList.toggle('tt48-is-active', item === button);
          item.setAttribute('aria-pressed', String(item === button));
        });
        updateNotices();
      });
    });
  }

  var progress = document.querySelector('[data-read-progress]');
  if (progress) {
    var updateProgress = function () {
      var max = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = (max > 0 ? Math.min(100, scrollY / max * 100) : 100) + '%';
    };
    addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  var guideButton = document.querySelector('[data-copy-guide]');
  if (guideButton) {
    guideButton.addEventListener('click', function () {
      var summary = '活动核对摘要：已确认适用地区、账户类型、指定入口、活动期限、费率上限与到账周期；最终结果以平台官方规则和账户实际显示为准。';
      copyText(summary, function () { document.querySelector('[data-guide-status]').textContent = '核对摘要已复制'; }, function () { document.querySelector('[data-guide-status]').textContent = '复制失败，请手动记录摘要'; });
    });
  }

  var calcForm = document.querySelector('[data-calc-form]');
  if (calcForm) {
    var amountInput = document.getElementById('calc-amount');
    var rateInput = document.getElementById('calc-rate');
    var capInput = document.getElementById('calc-cap');
    var message = document.querySelector('[data-calc-message]');
    var copyResult = document.querySelector('[data-copy-result]');
    var calcInputs = [amountInput, rateInput, capInput];
    var lastResult = '';

    message.id = message.id || 'tt48-calc-message';
    message.setAttribute('aria-atomic', 'true');
    function clearOutput(state) {
      document.querySelector('[data-calc-state]').textContent = state;
      document.querySelector('[data-calc-result]').textContent = '—';
      document.querySelector('[data-calc-formula]').textContent = '金额 × 比例，若设上限则取较小值。';
      document.querySelector('[data-calc-raw]').textContent = '—';
      document.querySelector('[data-calc-limit]').textContent = '—';
      document.querySelector('[data-calc-effective]').textContent = '—';
      document.querySelector('[data-calc-copy]').textContent = '';
      copyResult.disabled = true;
      lastResult = '';
    }
    function resetResult() {
      clearOutput('等待输入');
      message.textContent = '';
      calcInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
    }
    function parseDecimal(field, minimum, maximum, maxScale, blankAsZero) {
      var raw = normalize(field.value);
      if (!raw && blankAsZero) return { integer: 0n, scale: 0, numeric: 0 };
      if (!/^(?:\d+|\d*\.\d+)$/.test(raw)) return null;
      var parts = raw.split('.'); var fraction = parts[1] || '';
      if (fraction.length > maxScale) return null;
      var numeric = Number(raw);
      if (!Number.isFinite(numeric) || numeric < minimum || numeric > maximum) return null;
      return { integer: BigInt((parts[0] || '0') + fraction), scale: fraction.length, numeric: numeric };
    }
    function toCents(value) { return value.integer * (10n ** BigInt(2 - value.scale)); }
    function divideRounded(numerator, denominator) { return (numerator + denominator / 2n) / denominator; }
    function formatCents(cents) {
      var whole = (cents / 100n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return whole + '.' + (cents % 100n).toString().padStart(2, '0');
    }
    calcInputs.forEach(function (input) {
      input.setAttribute('aria-describedby', message.id);
      input.addEventListener('input', function () {
        input.removeAttribute('aria-invalid'); message.textContent = '';
        if (lastResult) clearOutput('条件已修改，请重新计算');
      });
    });

    calcForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var amount = parseDecimal(amountInput, .01, 1000000000000, 2, false);
      var rate = parseDecimal(rateInput, 0, 100, 6, false);
      var cap = parseDecimal(capInput, 0, 1000000000000, 2, true);
      message.textContent = '';
      calcInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
      var invalid = [];
      if (!amount) invalid.push({ field: amountInput, text: '活动金额须为 0.01–1,000,000,000,000 的普通十进制数，最多 2 位小数' });
      if (!rate) invalid.push({ field: rateInput, text: '返佣比例须为 0–100 的普通十进制数，最多 6 位小数' });
      if (!cap) invalid.push({ field: capInput, text: '封顶金额须为 0–1,000,000,000,000 的普通十进制数，最多 2 位小数' });
      if (invalid.length) {
        clearOutput('输入有误'); invalid.forEach(function (item) { item.field.setAttribute('aria-invalid', 'true'); });
        message.textContent = invalid.map(function (item) { return item.text; }).join('；') + '。';
        invalid[0].field.focus(); return;
      }
      var amountCents = toCents(amount); var capCents = toCents(cap);
      var denominator = 100n * (10n ** BigInt(rate.scale));
      var rawCents = divideRounded(amountCents * rate.integer, denominator);
      var capped = capCents > 0n && rawCents > capCents;
      var finalCents = capped ? capCents : rawCents;
      var effective = Number(finalCents) / Number(amountCents) * 100;
      var formattedAmount = formatCents(amountCents); var formattedRate = rate.numeric.toFixed(Math.min(6, Math.max(2, rate.scale)));
      document.querySelector('[data-calc-state]').textContent = capped ? '已触发封顶' : '计算完成';
      document.querySelector('[data-calc-result]').textContent = formatCents(finalCents);
      document.querySelector('[data-calc-formula]').textContent = formattedAmount + ' × ' + formattedRate + '%' + (capCents > 0n ? '，再与封顶 ' + formatCents(capCents) + ' 比较' : '，未设置封顶');
      document.querySelector('[data-calc-raw]').textContent = formatCents(rawCents);
      document.querySelector('[data-calc-limit]').textContent = capCents > 0n ? formatCents(capCents) : '未设置';
      document.querySelector('[data-calc-effective]').textContent = effective.toFixed(4) + '%';
      lastResult = '返佣试算：金额 ' + formattedAmount + '，比例 ' + formattedRate + '%，封顶 ' + (capCents > 0n ? formatCents(capCents) : '未设置') + '，预计结果 ' + formatCents(finalCents) + '。金额按分四舍五入；最终以平台规则和账户实际显示为准。';
      copyResult.disabled = false;
    });

    document.querySelectorAll('[data-calc-preset]').forEach(function (button) {
      button.addEventListener('click', function () {
        var values = button.dataset.calcPreset.split(',');
        amountInput.value = values[0]; rateInput.value = values[1]; capInput.value = values[2];
        resetResult();
        calcForm.requestSubmit();
      });
    });
    document.querySelector('[data-calc-reset]').addEventListener('click', function () {
      calcForm.reset(); capInput.value = '0'; message.textContent = ''; resetResult(); amountInput.focus();
    });
    copyResult.addEventListener('click', function () {
      if (!lastResult) return;
      copyText(lastResult, function () { document.querySelector('[data-calc-copy]').textContent = '试算结果已复制'; }, function () { document.querySelector('[data-calc-copy]').textContent = '复制失败，请手动记录结果'; });
    });
  }

  var disclosureButton = document.querySelector('[data-copy-disclosure]');
  if (disclosureButton) {
    disclosureButton.addEventListener('click', function () {
      var value = disclosureButton.parentElement.querySelector('p').textContent.trim();
      copyText(value, function () { document.querySelector('[data-disclosure-status]').textContent = '披露说明已复制'; }, function () { document.querySelector('[data-disclosure-status]').textContent = '复制失败，请手动选择说明'; });
    });
  }

  var archiveForm = document.querySelector('[data-archive-search]');
  if (archiveForm) {
    var archiveQuery = document.getElementById('archive-query');
    var archiveFeedback = document.querySelector('[data-archive-feedback]');
    var archiveMap = [
      { terms: ['费率', '返佣', '上限', '试算'], label: '返佣试算', href: 'tool.html' },
      { terms: ['资格', '地区', '账户', '到账', '规则'], label: '活动资格核对手册', href: 'article.html' },
      { terms: ['披露', '隐私', '风险', '推广'], label: '披露与使用说明', href: 'legal.html' },
      { terms: ['布告', '活动', '更新'], label: '本期布告栏', href: 'index.html' }
    ];
    archiveFeedback.id = archiveFeedback.id || 'archive-feedback';
    archiveQuery.addEventListener('input', function () {
      archiveQuery.removeAttribute('aria-invalid');
      archiveFeedback.textContent = '可搜索本站四个主要页面。';
    });
    archiveForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var query = normalize(archiveQuery.value).toLocaleLowerCase();
      if (!query) { archiveQuery.setAttribute('aria-invalid', 'true'); archiveFeedback.textContent = '请先输入一个关键词，例如“费率”或“资格”。'; archiveQuery.focus(); return; }
      archiveQuery.removeAttribute('aria-invalid');
      var hit = archiveMap.find(function (item) { return item.terms.some(function (term) { var normalizedTerm = normalize(term).toLocaleLowerCase(); return query.includes(normalizedTerm) || normalizedTerm.includes(query); }); });
      if (!hit) { archiveFeedback.textContent = '没有匹配“' + query + '”。换一个关键词，或返回本期布告栏。'; return; }
      archiveFeedback.textContent = '';
      archiveFeedback.append(document.createTextNode('找到“' + hit.label + '”。'));
      var link = document.createElement('a'); link.href = hit.href; link.textContent = '前往页面'; archiveFeedback.appendChild(link);
    });
  }
})();
