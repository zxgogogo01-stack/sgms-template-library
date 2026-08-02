(function () {
  'use strict';

  var chapterSearch = document.getElementById('chapter-search');
  var chapters = Array.prototype.slice.call(document.querySelectorAll('[data-chapter]'));
  var chapterFilters = Array.prototype.slice.call(document.querySelectorAll('[data-chapter-filter]'));
  var chapterCount = document.getElementById('chapter-count');
  var chapterEmpty = document.getElementById('chapter-empty');
  var activeChapterFilter = 'all';

  function normalize(value) {
    return (value || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function updateChapters() {
    if (!chapters.length) return;
    var query = normalize(chapterSearch && chapterSearch.value);
    var visible = 0;
    chapters.forEach(function (chapter) {
      var state = chapter.getAttribute('data-state') || '';
      var searchText = (chapter.getAttribute('data-search') || '') + ' ' + chapter.textContent;
      var matchesState = activeChapterFilter === 'all' || state === activeChapterFilter;
      var matchesSearch = !query || normalize(searchText).indexOf(query) !== -1;
      chapter.hidden = !(matchesState && matchesSearch);
      if (!chapter.hidden) visible += 1;
    });
    if (chapterCount) chapterCount.textContent = visible + ' / ' + chapters.length + ' 章可见';
    if (chapterEmpty) chapterEmpty.hidden = visible !== 0;
  }

  if (chapterSearch) chapterSearch.addEventListener('input', updateChapters);
  chapterFilters.forEach(function (button) {
    button.addEventListener('click', function () {
      activeChapterFilter = button.getAttribute('data-chapter-filter') || 'all';
      chapterFilters.forEach(function (candidate) {
        candidate.setAttribute('aria-pressed', candidate === button ? 'true' : 'false');
      });
      updateChapters();
    });
  });

  var resetChapters = document.getElementById('reset-chapters');
  if (resetChapters) resetChapters.addEventListener('click', function () {
    activeChapterFilter = 'all';
    if (chapterSearch) chapterSearch.value = '';
    chapterFilters.forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-chapter-filter') === 'all' ? 'true' : 'false');
    });
    updateChapters();
    if (chapterSearch) chapterSearch.focus();
  });

  var releaseChecks = Array.prototype.slice.call(document.querySelectorAll('[data-release-check]'));
  var checkCount = document.getElementById('check-count');

  function updateCheckCount() {
    if (!releaseChecks.length || !checkCount) return;
    var checked = releaseChecks.filter(function (item) { return item.checked; }).length;
    checkCount.textContent = checked + ' / ' + releaseChecks.length + ' 已完成';
  }

  releaseChecks.forEach(function (item) { item.addEventListener('change', updateCheckCount); });
  var checkAll = document.getElementById('check-all');
  if (checkAll) checkAll.addEventListener('click', function () {
    releaseChecks.forEach(function (item) { item.checked = true; });
    updateCheckCount();
    checkCount.focus && checkCount.focus();
  });
  var resetChecklist = document.getElementById('reset-checklist');
  if (resetChecklist) resetChecklist.addEventListener('click', function () {
    releaseChecks.forEach(function (item) { item.checked = false; });
    updateCheckCount();
    if (releaseChecks[0]) releaseChecks[0].focus();
  });

  function copyText(text, button, readyLabel, status) {
    var done = function () {
      var old = button.textContent;
      button.textContent = readyLabel;
      if (status) status.textContent = readyLabel + '。';
      window.setTimeout(function () {
        button.textContent = old;
        if (status) status.textContent = '结果仅在当前页面生成。';
      }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy'); } catch (error) { /* selection remains as fallback */ }
      area.remove();
      done();
    }
  }

  var codepointForm = document.getElementById('codepoint-form');
  if (!codepointForm) return;

  var codepointInput = document.getElementById('codepoint-input');
  var charCount = document.getElementById('char-count');
  var codepointError = document.getElementById('codepoint-error');
  var codepointResult = document.getElementById('codepoint-result');
  var resultCount = document.getElementById('result-count');
  var codepointRows = document.getElementById('codepoint-rows');
  var codepointStatus = document.getElementById('codepoint-status');

  function characterType(character) {
    if (character === ' ') return '普通空格';
    if (character === '　') return '全角空格';
    if (character === '\n' || character === '\r') return '换行';
    if (/^[\u0000-\u001f\u007f-\u009f]$/.test(character)) return '控制字符';
    if (/\p{Letter}/u.test(character)) return '字母 / 汉字';
    if (/\p{Number}/u.test(character)) return '数字';
    if (/\p{Punctuation}/u.test(character)) return '标点';
    if (/\p{Symbol}/u.test(character)) return '符号';
    return '其他';
  }

  function visibleCharacter(character) {
    if (character === ' ') return '␠';
    if (character === '　') return '全角空格';
    if (character === '\n') return '↵';
    if (character === '\r') return 'CR';
    if (/^[\u0000-\u001f\u007f-\u009f]$/.test(character)) return '控制';
    return character;
  }

  function updateCharacterCount() {
    var count = Array.from(codepointInput.value).length;
    charCount.textContent = Math.min(count, 40);
    if (count > 40) codepointInput.value = Array.from(codepointInput.value).slice(0, 40).join('');
  }

  codepointInput.addEventListener('input', updateCharacterCount);

  codepointForm.addEventListener('submit', function (event) {
    event.preventDefault();
    codepointError.textContent = '';
    codepointInput.removeAttribute('aria-invalid');
    var characters = Array.from(codepointInput.value).slice(0, 40);
    if (!characters.length) {
      codepointInput.setAttribute('aria-invalid', 'true');
      codepointError.textContent = '请先输入至少一个需要核验的字符。';
      codepointResult.hidden = true;
      codepointInput.focus();
      return;
    }

    codepointRows.replaceChildren();
    characters.forEach(function (character) {
      var decimal = character.codePointAt(0);
      var hex = decimal.toString(16).toUpperCase().padStart(4, '0');
      var row = document.createElement('tr');
      [visibleCharacter(character), 'U+' + hex, String(decimal), characterType(character)].forEach(function (value) {
        var cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });
      codepointRows.appendChild(row);
    });
    resultCount.textContent = characters.length + ' 个码点';
    codepointStatus.textContent = '结果仅在当前页面生成。';
    codepointResult.hidden = false;
    codepointResult.focus();
  });

  document.getElementById('load-code-sample').addEventListener('click', function () {
    codepointInput.value = '发布 A/B · 全角　空格';
    updateCharacterCount();
    codepointError.textContent = '';
    codepointInput.removeAttribute('aria-invalid');
    codepointInput.focus();
  });

  codepointForm.addEventListener('reset', function () {
    window.setTimeout(function () {
      charCount.textContent = '0';
      codepointError.textContent = '';
      codepointInput.removeAttribute('aria-invalid');
      codepointRows.replaceChildren();
      codepointResult.hidden = true;
      codepointInput.focus();
    }, 0);
  });

  document.getElementById('copy-codepoints').addEventListener('click', function (event) {
    var lines = Array.prototype.slice.call(codepointRows.querySelectorAll('tr')).map(function (row) {
      return Array.prototype.slice.call(row.cells).map(function (cell) { return cell.textContent; }).join(' · ');
    });
    copyText(lines.join('\n'), event.currentTarget, '结果已复制', codepointStatus);
  });
})();
