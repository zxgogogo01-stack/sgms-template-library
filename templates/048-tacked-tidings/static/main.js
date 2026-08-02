(function () {
  'use strict';

  var root = document.documentElement;
  var themeButton = document.querySelector('[data-theme-button]');
  var menuButton = document.querySelector('[data-menu-button]');
  var siteNav = document.querySelector('[data-site-nav]');

  function syncThemeLabel() {
    if (themeButton) themeButton.textContent = root.dataset.theme === 'dark' ? '日间' : '夜间';
  }

  syncThemeLabel();
  if (themeButton) {
    themeButton.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('td48-theme', root.dataset.theme); } catch (error) { /* Theme remains active without persistence. */ }
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

  function copyText(value, done) {
    var fallback = function () {
      var area = document.createElement('textarea');
      area.value = value;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy'); } catch (error) { /* status remains useful */ }
      area.remove();
      done();
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
      });
    });
  }

  var search = document.querySelector('[data-notice-search]');
  var filterButtons = Array.from(document.querySelectorAll('[data-notice-filter]'));
  var notices = Array.from(document.querySelectorAll('[data-notice]'));
  if (search && notices.length) {
    var activeFilter = 'all';
    var updateNotices = function () {
      var query = search.value.trim().toLowerCase();
      var visible = 0;
      notices.forEach(function (notice) {
        var categoryMatch = activeFilter === 'all' || notice.dataset.category === activeFilter;
        var textMatch = !query || notice.dataset.search.toLowerCase().includes(query) || notice.textContent.toLowerCase().includes(query);
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
          item.classList.toggle('is-active', item === button);
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
      copyText(summary, function () { document.querySelector('[data-guide-status]').textContent = '核对摘要已复制'; });
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

    message.id = message.id || 'calc-message';
    calcInputs.forEach(function (input) {
      input.setAttribute('aria-describedby', message.id);
      input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
    });

    function resetResult() {
      document.querySelector('[data-calc-state]').textContent = '等待输入';
      document.querySelector('[data-calc-result]').textContent = '—';
      document.querySelector('[data-calc-formula]').textContent = '金额 × 比例，若设上限则取较小值。';
      document.querySelector('[data-calc-raw]').textContent = '—';
      document.querySelector('[data-calc-limit]').textContent = '—';
      document.querySelector('[data-calc-effective]').textContent = '—';
      document.querySelector('[data-calc-copy]').textContent = '';
      copyResult.disabled = true;
      lastResult = '';
      calcInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
    }

    calcForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var amount = Number(amountInput.value);
      var rate = Number(rateInput.value);
      var cap = Number(capInput.value || 0);
      message.textContent = '';
      calcInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
      if (!Number.isFinite(amount) || amount <= 0) {
        amountInput.setAttribute('aria-invalid', 'true');
        message.textContent = '活动金额必须是大于 0 的有效数字。';
        amountInput.focus();
        resetResult();
        return;
      }
      if (!Number.isFinite(rate) || rate < 0 || rate > 100) {
        rateInput.setAttribute('aria-invalid', 'true');
        message.textContent = '返佣比例必须在 0—100% 之间。';
        rateInput.focus();
        resetResult();
        return;
      }
      if (!Number.isFinite(cap) || cap < 0) {
        capInput.setAttribute('aria-invalid', 'true');
        message.textContent = '封顶金额不能小于 0。';
        capInput.focus();
        resetResult();
        return;
      }
      var raw = amount * rate / 100;
      var finalValue = cap > 0 ? Math.min(raw, cap) : raw;
      var effective = amount ? finalValue / amount * 100 : 0;
      var capped = cap > 0 && raw > cap;
      document.querySelector('[data-calc-state]').textContent = capped ? '已触发封顶' : '计算完成';
      document.querySelector('[data-calc-result]').textContent = finalValue.toFixed(2);
      document.querySelector('[data-calc-formula]').textContent = amount.toFixed(2) + ' × ' + rate.toFixed(2) + '%' + (cap > 0 ? '，再与封顶 ' + cap.toFixed(2) + ' 比较' : '，未设置封顶');
      document.querySelector('[data-calc-raw]').textContent = raw.toFixed(2);
      document.querySelector('[data-calc-limit]').textContent = cap > 0 ? cap.toFixed(2) : '未设置';
      document.querySelector('[data-calc-effective]').textContent = effective.toFixed(2) + '%';
      lastResult = '返佣试算：金额 ' + amount.toFixed(2) + '，比例 ' + rate.toFixed(2) + '%，封顶 ' + (cap > 0 ? cap.toFixed(2) : '未设置') + '，预计结果 ' + finalValue.toFixed(2) + '。最终以平台规则和账户实际显示为准。';
      copyResult.disabled = false;
    });

    document.querySelectorAll('[data-calc-preset]').forEach(function (button) {
      button.addEventListener('click', function () {
        var values = button.dataset.calcPreset.split(',');
        amountInput.value = values[0]; rateInput.value = values[1]; capInput.value = values[2];
        calcForm.requestSubmit();
      });
    });
    document.querySelector('[data-calc-reset]').addEventListener('click', function () {
      calcForm.reset(); capInput.value = '0'; message.textContent = ''; resetResult(); amountInput.focus();
    });
    copyResult.addEventListener('click', function () {
      if (!lastResult) return;
      copyText(lastResult, function () { document.querySelector('[data-calc-copy]').textContent = '试算结果已复制'; });
    });
  }

  var disclosureButton = document.querySelector('[data-copy-disclosure]');
  if (disclosureButton) {
    disclosureButton.addEventListener('click', function () {
      var value = disclosureButton.parentElement.querySelector('p').textContent.trim();
      copyText(value, function () { document.querySelector('[data-disclosure-status]').textContent = '披露说明已复制'; });
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
    archiveQuery.setAttribute('aria-describedby', archiveFeedback.id);
    archiveQuery.addEventListener('input', function () { if (archiveQuery.value.trim()) archiveQuery.removeAttribute('aria-invalid'); });
    archiveForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var query = archiveQuery.value.trim();
      if (!query) { archiveQuery.setAttribute('aria-invalid', 'true'); archiveFeedback.textContent = '请先输入一个关键词，例如“费率”或“资格”。'; archiveQuery.focus(); return; }
      archiveQuery.removeAttribute('aria-invalid');
      var hit = archiveMap.find(function (item) { return item.terms.some(function (term) { return query.includes(term) || term.includes(query); }); });
      if (!hit) { archiveFeedback.textContent = '没有匹配记录。换一个关键词，或返回本期布告栏。'; return; }
      archiveFeedback.innerHTML = '找到“' + hit.label + '”：<a href="' + hit.href + '">前往页面</a>';
    });
  }
})();
