(function () {
  'use strict';

  var root = document.documentElement;
  var themeButton = document.querySelector('[data-theme-button]');
  var menuButton = document.querySelector('[data-menu-button]');
  var siteNav = document.querySelector('[data-site-nav]');
  var storedTheme = null;

  try {
    storedTheme = window.localStorage.getItem('cc49-theme');
  } catch (error) {
    storedTheme = null;
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    if (themeButton) {
      themeButton.textContent = theme === 'dark' ? '日间' : '夜间';
      themeButton.setAttribute('aria-label', theme === 'dark' ? '切换日间模式' : '切换夜间模式');
    }
  }

  setTheme(storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light');

  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
      try {
        window.localStorage.setItem('cc49-theme', nextTheme);
      } catch (error) {
        // Local storage may be unavailable in private or hardened contexts.
      }
    });
  }

  function closeMenu() {
    if (!menuButton || !siteNav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    siteNav.dataset.open = 'false';
  }

  if (menuButton && siteNav) {
    menuButton.addEventListener('click', function () {
      var isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      siteNav.dataset.open = String(!isOpen);
    });
    siteNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuButton && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });

  function copyText(text, statusNode, successText) {
    var onSuccess = function () {
      if (statusNode) statusNode.textContent = successText;
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(function () {
        if (statusNode) statusNode.textContent = '复制失败，请手动选择文本';
      });
      return;
    }
    var helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    try {
      document.execCommand('copy');
      onSuccess();
    } catch (error) {
      if (statusNode) statusNode.textContent = '复制失败，请手动选择文本';
    }
    helper.remove();
  }

  var recordSearch = document.querySelector('[data-record-search]');
  var recordFilters = Array.prototype.slice.call(document.querySelectorAll('[data-record-filter]'));
  var records = Array.prototype.slice.call(document.querySelectorAll('[data-record]'));
  var recordCount = document.querySelector('[data-record-count]');
  var recordEmpty = document.querySelector('[data-record-empty]');
  var activeFilter = 'all';

  function applyRecordFilter() {
    if (!records.length) return;
    var query = recordSearch ? recordSearch.value.trim().toLowerCase() : '';
    var visibleCount = 0;
    records.forEach(function (record) {
      var categoryMatches = activeFilter === 'all' || record.dataset.category === activeFilter;
      var searchMatches = !query || (record.dataset.search || '').toLowerCase().indexOf(query) !== -1;
      var show = categoryMatches && searchMatches;
      record.hidden = !show;
      if (show) visibleCount += 1;
    });
    if (recordCount) recordCount.textContent = String(visibleCount);
    if (recordEmpty) recordEmpty.hidden = visibleCount !== 0;
  }

  if (recordSearch) recordSearch.addEventListener('input', applyRecordFilter);
  recordFilters.forEach(function (button) {
    button.addEventListener('click', function () {
      activeFilter = button.dataset.recordFilter;
      recordFilters.forEach(function (item) {
        item.classList.toggle('is-active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      applyRecordFilter();
    });
  });

  var readingLine = document.querySelector('[data-reading-line]');
  function updateReadingLine() {
    if (!readingLine) return;
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    readingLine.style.width = (progress * 100).toFixed(2) + '%';
  }
  if (readingLine) {
    window.addEventListener('scroll', updateReadingLine, { passive: true });
    updateReadingLine();
  }

  var citationButton = document.querySelector('[data-copy-citation]');
  if (citationButton) {
    citationButton.addEventListener('click', function () {
      var citation = citationButton.parentElement.querySelector('p').textContent.trim();
      copyText(citation, document.querySelector('[data-citation-status]'), '引用已复制');
    });
  }

  var templateButton = document.querySelector('[data-copy-template]');
  if (templateButton) {
    templateButton.addEventListener('click', function () {
      var template = templateButton.parentElement.querySelector('p').textContent.trim();
      copyText(template, document.querySelector('[data-template-status]'), '模板已复制');
    });
  }

  var feeForm = document.querySelector('[data-fee-form]');
  if (feeForm) {
    var feeVolume = document.getElementById('fee-volume');
    var feeBefore = document.getElementById('fee-before');
    var feeAfter = document.getElementById('fee-after');
    var feeCount = document.getElementById('fee-count');
    var feeMessage = document.querySelector('[data-fee-message]');
    var feeState = document.querySelector('[data-fee-state]');
    var feeDelta = document.querySelector('[data-fee-delta]');
    var feeSummary = document.querySelector('[data-fee-summary]');
    var feeOld = document.querySelector('[data-fee-old]');
    var feeNew = document.querySelector('[data-fee-new]');
    var feeOnce = document.querySelector('[data-fee-once]');
    var feeTimes = document.querySelector('[data-fee-times]');
    var copyImpactButton = document.querySelector('[data-copy-impact]');
    var impactStatus = document.querySelector('[data-impact-status]');
    var feeInputs = [feeVolume, feeBefore, feeAfter, feeCount];

    feeMessage.id = feeMessage.id || 'fee-message';
    feeInputs.forEach(function (input) {
      input.setAttribute('aria-describedby', feeMessage.id);
      input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
    });

    function money(value, signed) {
      var prefix = signed && value > 0 ? '+' : '';
      return prefix + value.toFixed(2);
    }

    function resetFeeResult() {
      feeMessage.textContent = '';
      feeState.textContent = '等待输入';
      feeDelta.textContent = '—';
      feeSummary.textContent = '填写条件后，这里会显示变更前、变更后与周期差额。';
      feeOld.textContent = '—';
      feeNew.textContent = '—';
      feeOnce.textContent = '—';
      feeTimes.textContent = '—';
      copyImpactButton.disabled = true;
      copyImpactButton.dataset.copyText = '';
      impactStatus.textContent = '';
      feeInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
    }

    function calculateFee(event) {
      if (event) event.preventDefault();
      feeMessage.textContent = '';
      impactStatus.textContent = '';
      feeInputs.forEach(function (input) { input.removeAttribute('aria-invalid'); });
      var volume = Number(feeVolume.value);
      var oldRate = Number(feeBefore.value);
      var newRate = Number(feeAfter.value);
      var count = Number(feeCount.value);
      if (!feeVolume.value || !Number.isFinite(volume) || volume <= 0) {
        feeVolume.setAttribute('aria-invalid', 'true');
        feeMessage.textContent = '成交额必须大于 0。';
        feeVolume.focus();
        return;
      }
      var invalidBefore = !feeBefore.value || !Number.isFinite(oldRate) || oldRate < 0 || oldRate > 100;
      var invalidAfter = !feeAfter.value || !Number.isFinite(newRate) || newRate < 0 || newRate > 100;
      if (invalidBefore || invalidAfter) {
        if (invalidBefore) feeBefore.setAttribute('aria-invalid', 'true');
        if (invalidAfter) feeAfter.setAttribute('aria-invalid', 'true');
        feeMessage.textContent = '费率必须填写为 0—100 之间的百分数。';
        (invalidBefore ? feeBefore : feeAfter).focus();
        return;
      }
      if (!feeCount.value || !Number.isInteger(count) || count < 1) {
        feeCount.setAttribute('aria-invalid', 'true');
        feeMessage.textContent = '估算次数必须是至少为 1 的整数。';
        feeCount.focus();
        return;
      }
      var oldCost = volume * oldRate / 100;
      var newCost = volume * newRate / 100;
      var onceDelta = newCost - oldCost;
      var cycleDelta = onceDelta * count;
      var state = onceDelta < 0 ? '费用下降' : onceDelta > 0 ? '费用上升' : '费用不变';
      feeState.textContent = state;
      feeDelta.textContent = money(cycleDelta, true);
      feeSummary.textContent = '按单次成交额 ' + volume.toFixed(2) + '、共 ' + count + ' 次估算，' + state + ' ' + Math.abs(cycleDelta).toFixed(2) + '。';
      feeOld.textContent = money(oldCost, false);
      feeNew.textContent = money(newCost, false);
      feeOnce.textContent = money(onceDelta, true);
      feeTimes.textContent = String(count);
      copyImpactButton.disabled = false;
      copyImpactButton.dataset.copyText = '费率变化影响试算：单次成交额 ' + volume.toFixed(2) + '；费率 ' + oldRate + '% → ' + newRate + '%；单次差额 ' + money(onceDelta, true) + '；' + count + ' 次周期差额 ' + money(cycleDelta, true) + '。';
    }

    feeForm.addEventListener('submit', calculateFee);
    Array.prototype.forEach.call(document.querySelectorAll('[data-fee-preset]'), function (button) {
      button.addEventListener('click', function () {
        var values = button.dataset.feePreset.split(',');
        feeVolume.value = values[0];
        feeBefore.value = values[1];
        feeAfter.value = values[2];
        feeCount.value = values[3];
        calculateFee();
      });
    });
    document.querySelector('[data-fee-reset]').addEventListener('click', function () {
      feeForm.reset();
      feeCount.value = '30';
      resetFeeResult();
      feeVolume.focus();
    });
    copyImpactButton.addEventListener('click', function () {
      if (!copyImpactButton.disabled) copyText(copyImpactButton.dataset.copyText, impactStatus, '试算结果已复制');
    });
  }

  var archiveForm = document.querySelector('[data-archive-search]');
  if (archiveForm) {
    var archiveQuery = document.getElementById('archive-query');
    var archiveFeedback = document.querySelector('[data-archive-feedback]');
    var archiveMap = [
      { words: ['费率', '费差', '影响'], href: 'tool.html', label: '费率变化影响试算' },
      { words: ['记录', '范围', '来源', '变化'], href: 'article.html', label: '基础档费率变更记录' },
      { words: ['守则', '更正', '编纂', '引用'], href: 'legal.html', label: '编纂与更正守则' },
      { words: ['时间轴', '档位', '结算', '现货'], href: 'index.html', label: '费率变化时间轴' }
    ];
    archiveFeedback.id = archiveFeedback.id || 'archive-feedback';
    archiveQuery.setAttribute('aria-describedby', archiveFeedback.id);
    archiveQuery.addEventListener('input', function () { if (archiveQuery.value.trim()) archiveQuery.removeAttribute('aria-invalid'); });
    archiveForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var query = archiveQuery.value.trim().toLowerCase();
      if (!query) {
        archiveQuery.setAttribute('aria-invalid', 'true');
        archiveFeedback.textContent = '请先输入一个档案主题。';
        archiveQuery.focus();
        return;
      }
      archiveQuery.removeAttribute('aria-invalid');
      var match = archiveMap.find(function (item) {
        return item.words.some(function (word) { return query.indexOf(word) !== -1; });
      });
      archiveFeedback.textContent = '';
      if (match) {
        archiveFeedback.append('找到：');
        var link = document.createElement('a');
        link.href = match.href;
        link.textContent = match.label;
        archiveFeedback.appendChild(link);
      } else {
        archiveFeedback.textContent = '未找到匹配记录。可尝试“费率”“来源”“档位”或“更正”。';
      }
    });
  }
}());
