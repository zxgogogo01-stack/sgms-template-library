(function () {
  'use strict';
  var root = document.documentElement;
  var themeButton = document.querySelector('[data-theme-button]');
  var menuButton = document.querySelector('[data-menu-button]');
  var siteNav = document.querySelector('[data-site-nav]');
  var storedTheme = null;
  function normalize(value) { return String(value || '').normalize('NFKC').trim(); }
  try { storedTheme = window.localStorage.getItem('stacked-stanza-050-theme'); } catch (error) { storedTheme = null; }

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
    try { window.localStorage.setItem('stacked-stanza-050-theme', next); } catch (error) { /* Persistence is optional. */ }
  });

  function closeMenu() {
    if (!menuButton || !siteNav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    siteNav.dataset.open = 'false';
    menuButton.textContent = '目录';
  }
  if (menuButton && siteNav) {
    menuButton.addEventListener('click', function () {
      var open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      siteNav.dataset.open = String(!open);
      menuButton.textContent = open ? '目录' : '收起';
      if (!open) { var firstLink = siteNav.querySelector('a'); if (firstLink) firstLink.focus(); }
    });
    siteNav.addEventListener('click', function (event) { if (event.target.closest('a')) closeMenu(); });
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuButton && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });

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

  var inviteButton = document.querySelector('[data-copy-invite]');
  if (inviteButton) inviteButton.addEventListener('click', function () {
    copyText(document.querySelector('[data-invite-code]').textContent.trim(), document.querySelector('[data-invite-status]'), '邀请码已复制');
  });

  var guideSearch = document.querySelector('[data-guide-search]');
  var guideFilters = Array.prototype.slice.call(document.querySelectorAll('[data-guide-filter]'));
  var guides = Array.prototype.slice.call(document.querySelectorAll('[data-guide]'));
  var guideCount = document.querySelector('[data-guide-count]');
  var guideEmpty = document.querySelector('[data-guide-empty]');
  var activeGuideFilter = 'all';
  function applyGuideFilter() {
    if (!guides.length) return;
    var query = guideSearch ? normalize(guideSearch.value).toLocaleLowerCase() : '';
    var count = 0;
    guides.forEach(function (guide) {
      var haystack = normalize((guide.dataset.search || '') + ' ' + guide.textContent).toLocaleLowerCase();
      var show = (activeGuideFilter === 'all' || guide.dataset.topic === activeGuideFilter) && (!query || haystack.indexOf(query) !== -1);
      guide.hidden = !show;
      if (show) count += 1;
    });
    if (guideCount) guideCount.textContent = String(count);
    if (guideEmpty) guideEmpty.hidden = count !== 0;
  }
  if (guideSearch) guideSearch.addEventListener('input', applyGuideFilter);
  guideFilters.forEach(function (button) {
    button.addEventListener('click', function () {
      activeGuideFilter = button.dataset.guideFilter;
      guideFilters.forEach(function (item) {
        item.classList.toggle('sz50-is-active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      applyGuideFilter();
    });
  });

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

  var rebateForm = document.querySelector('[data-rebate-form]');
  if (rebateForm) {
    var volumeInput = document.getElementById('rebate-volume');
    var feeInput = document.getElementById('rebate-fee');
    var shareInput = document.getElementById('rebate-share');
    var periodsInput = document.getElementById('rebate-periods');
    var message = document.querySelector('[data-rebate-message]');
    var state = document.querySelector('[data-rebate-state]');
    var total = document.querySelector('[data-rebate-total]');
    var summary = document.querySelector('[data-rebate-summary]');
    var gross = document.querySelector('[data-rebate-gross]');
    var once = document.querySelector('[data-rebate-once]');
    var net = document.querySelector('[data-rebate-net]');
    var times = document.querySelector('[data-rebate-times]');
    var copyButton = document.querySelector('[data-copy-rebate]');
    var copyStatus = document.querySelector('[data-rebate-status]');
    var rebateInputs = [volumeInput, feeInput, shareInput, periodsInput];
    message.id = message.id || 'sz50-rebate-message';
    function clearOutput(status) {
      state.textContent = status; total.textContent = '—';
      summary.textContent = '填写条件后，这里会按“成交额 × 手续费率 × 返佣分成比例 × 周期”展示结果。';
      gross.textContent = '—'; once.textContent = '—'; net.textContent = '—'; times.textContent = '—';
      copyButton.disabled = true; copyButton.dataset.copyText = ''; copyStatus.textContent = '';
    }
    function resetResult() {
      clearOutput('等待输入'); message.textContent = '';
      rebateInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
    }
    function parseDecimal(field, minimum, maximum, maxScale) {
      var raw = normalize(field.value);
      if (!/^(?:\d+|\d*\.\d+)$/.test(raw)) return null;
      var parts = raw.split('.'); var fraction = parts[1] || '';
      if (fraction.length > maxScale) return null;
      var numeric = Number(raw);
      if (!Number.isFinite(numeric) || numeric < minimum || numeric > maximum) return null;
      return { integer: BigInt((parts[0] || '0') + fraction), scale: fraction.length, numeric: numeric };
    }
    function parsePeriods(field) {
      var raw = normalize(field.value); if (!/^\d+$/.test(raw)) return null;
      var numeric = Number(raw); return Number.isSafeInteger(numeric) && numeric >= 1 && numeric <= 100000 ? numeric : null;
    }
    function toCents(value) { return value.integer * (10n ** BigInt(2 - value.scale)); }
    function divideRounded(numerator, denominator) { return (numerator + denominator / 2n) / denominator; }
    function applyPercent(cents, rate) { return divideRounded(cents * rate.integer, 100n * (10n ** BigInt(rate.scale))); }
    function amount(cents) {
      var whole = (cents / 100n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return whole + '.' + (cents % 100n).toString().padStart(2, '0');
    }
    function rateText(rate) { return rate.numeric.toFixed(Math.min(6, Math.max(2, rate.scale))); }
    rebateInputs.forEach(function (input) {
      input.setAttribute('aria-describedby', message.id);
      input.addEventListener('input', function () {
        input.removeAttribute('aria-invalid'); message.textContent = '';
        if (copyButton.dataset.copyText) clearOutput('条件已修改，请重新估算');
      });
    });
    function calculate(event) {
      if (event) event.preventDefault();
      message.textContent = ''; copyStatus.textContent = '';
      rebateInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
      var volume = parseDecimal(volumeInput, .01, 1000000000000, 2);
      var fee = parseDecimal(feeInput, 0, 100, 6);
      var share = parseDecimal(shareInput, 0, 100, 6);
      var periods = parsePeriods(periodsInput);
      var invalid = [];
      if (!volume) invalid.push({ field: volumeInput, text: '成交额须为 0.01–1,000,000,000,000 的普通十进制数，最多 2 位小数' });
      if (!fee) invalid.push({ field: feeInput, text: '手续费率须为 0–100 的普通十进制数，最多 6 位小数' });
      if (!share) invalid.push({ field: shareInput, text: '返佣分成须为 0–100 的普通十进制数，最多 6 位小数' });
      if (!periods) invalid.push({ field: periodsInput, text: '估算周期须为 1–100,000 的普通整数' });
      if (invalid.length) {
        clearOutput('输入有误'); invalid.forEach(function (item) { item.field.setAttribute('aria-invalid', 'true'); });
        message.textContent = invalid.map(function (item) { return item.text; }).join('；') + '。'; invalid[0].field.focus(); return;
      }
      var volumeCents = toCents(volume); var feeAmount = applyPercent(volumeCents, fee);
      var rebateAmount = applyPercent(feeAmount, share); var netAmount = feeAmount - rebateAmount; var totalAmount = rebateAmount * BigInt(periods);
      state.textContent = '估算完成'; total.textContent = amount(totalAmount);
      summary.textContent = '按每期成交额 ' + amount(volumeCents) + '、共 ' + periods + ' 期估算，周期返佣为 ' + amount(totalAmount) + '。';
      gross.textContent = amount(feeAmount); once.textContent = amount(rebateAmount); net.textContent = amount(netAmount); times.textContent = String(periods);
      copyButton.disabled = false;
      copyButton.dataset.copyText = '返佣估算：每期成交额 ' + amount(volumeCents) + '；手续费率 ' + rateText(fee) + '%；返佣分成比例 ' + rateText(share) + '%；手续费与返佣均按分四舍五入；每期手续费 ' + amount(feeAmount) + '；每期估算返佣 ' + amount(rebateAmount) + '；' + periods + ' 期估算返佣 ' + amount(totalAmount) + '。最终以官方规则与账单为准。';
    }
    rebateForm.addEventListener('submit', calculate);
    Array.prototype.forEach.call(document.querySelectorAll('[data-rebate-preset]'), function (button) {
      button.addEventListener('click', function () {
        var values = button.dataset.rebatePreset.split(',');
        volumeInput.value = values[0]; feeInput.value = values[1]; shareInput.value = values[2]; periodsInput.value = values[3]; resetResult(); calculate();
      });
    });
    document.querySelector('[data-rebate-reset]').addEventListener('click', function () { rebateForm.reset(); periodsInput.value = '1'; resetResult(); volumeInput.focus(); });
    copyButton.addEventListener('click', function () { if (!copyButton.disabled) copyText(copyButton.dataset.copyText, copyStatus, '估算结果已复制'); });
  }

  var topicForm = document.querySelector('[data-topic-search]');
  if (topicForm) {
    var topicInput = document.getElementById('topic-query');
    var topicFeedback = document.querySelector('[data-topic-feedback]');
    var topicMap = [
      { words: ['手续费', '返佣', '机制', '资金'], href: 'article.html', label: '返佣从哪里来：完整解读' },
      { words: ['比例', '估算', '计算'], href: 'tool.html', label: '返佣估算器' },
      { words: ['披露', '邀请码', '守则', '风险'], href: 'legal.html', label: '阅读与披露守则' },
      { words: ['知识', '到账', '核对', '排除'], href: 'index.html', label: '返佣知识叠章' }
    ];
    topicFeedback.id = topicFeedback.id || 'topic-feedback';
    topicInput.addEventListener('input', function () { topicInput.removeAttribute('aria-invalid'); topicFeedback.textContent = '可搜索本站四个主要页面。'; });
    topicForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var query = normalize(topicInput.value).toLocaleLowerCase();
      if (!query) { topicInput.setAttribute('aria-invalid', 'true'); topicFeedback.textContent = '请先输入一个知识主题。'; topicInput.focus(); return; }
      topicInput.removeAttribute('aria-invalid');
      var match = topicMap.find(function (item) { return item.words.some(function (word) { var normalizedWord = normalize(word).toLocaleLowerCase(); return query.indexOf(normalizedWord) !== -1 || normalizedWord.indexOf(query) !== -1; }); });
      topicFeedback.textContent = '';
      if (match) {
        topicFeedback.append('找到：');
        var link = document.createElement('a'); link.href = match.href; link.textContent = match.label; topicFeedback.appendChild(link);
      } else topicFeedback.textContent = '未找到“' + query + '”。可尝试“手续费”“比例”“核对”或“披露”。';
    });
  }
}());
