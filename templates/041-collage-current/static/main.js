(function () {
  'use strict';
  function fallbackCopy(text) { return new Promise(function (resolve, reject) { var area = document.createElement('textarea'); area.value = text; area.setAttribute('readonly', ''); area.style.position = 'fixed'; area.style.opacity = '0'; document.body.appendChild(area); area.select(); var copied = false; try { copied = document.execCommand('copy'); } catch (error) { copied = false; } area.remove(); if (copied) resolve(); else reject(new Error('copy failed')); }); }
  function copyText(text) { if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).catch(function () { return fallbackCopy(text); }); return fallbackCopy(text); }
  function normalized(value) { var text = String(value || ''); if (text.normalize) text = text.normalize('NFKC'); return text.trim().toLocaleLowerCase(); }

  function initTheme() {
    var button = document.querySelector('[data-theme-button]'); if (!button) return;
    var theme = null; try { theme = localStorage.getItem('collage-current-041-theme'); } catch (e) { theme = null; }
    theme = theme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    function apply(next) { theme = next; document.documentElement.setAttribute('data-theme', theme); var label = button.querySelector('[data-theme-label]'); if (label) label.textContent = theme === 'dark' ? '日版' : '夜版'; button.setAttribute('aria-label', theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'); }
    apply(theme); button.addEventListener('click', function () { apply(theme === 'dark' ? 'light' : 'dark'); try { localStorage.setItem('collage-current-041-theme', theme); } catch (e) { /* optional */ } });
  }
  function initMenu() { var button = document.querySelector('[data-menu-button]'); var nav = document.querySelector('[data-site-nav]'); if (!button || !nav) return; function closeMenu() { button.setAttribute('aria-expanded', 'false'); nav.setAttribute('data-open', 'false'); button.textContent = '栏目'; } button.addEventListener('click', function () { var open = button.getAttribute('aria-expanded') === 'true'; button.setAttribute('aria-expanded', open ? 'false' : 'true'); nav.setAttribute('data-open', open ? 'false' : 'true'); button.textContent = open ? '栏目' : '关闭'; }); nav.addEventListener('click', function (event) { if (event.target.closest('a')) closeMenu(); }); document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { closeMenu(); button.focus(); } }); }

  function initWall() {
    var search = document.querySelector('[data-wall-search]'); var filters = document.querySelector('[data-wall-filters]'); var wall = document.querySelector('[data-story-wall]'); var status = document.querySelector('[data-wall-status]'); if (!search || !filters || !wall || !status) return;
    var cards = Array.prototype.slice.call(wall.querySelectorAll('[data-story]')); var empty = wall.querySelector('[data-wall-empty]'); var active = 'all';
    function update() { var query = normalized(search.value); var shown = 0; cards.forEach(function (card) { var match = (active === 'all' || card.getAttribute('data-category') === active) && (!query || normalized(card.getAttribute('data-search')).indexOf(query) !== -1); card.hidden = !match; if (match) shown += 1; }); if (empty) empty.hidden = shown !== 0; status.textContent = shown ? '显示 ' + shown + ' / ' + cards.length + ' 条现场记录' : '墙面上没有匹配的记录'; }
    search.addEventListener('input', update); filters.addEventListener('click', function (event) { var button = event.target.closest('[data-filter]'); if (!button) return; active = button.getAttribute('data-filter'); filters.querySelectorAll('[data-filter]').forEach(function (item) { item.setAttribute('aria-pressed', item === button ? 'true' : 'false'); }); update(); }); update();
  }

  function initAccessCopy() { var button = document.querySelector('[data-copy-access]'); var code = document.getElementById('access-code'); var status = document.querySelector('[data-access-status]'); if (!button || !code || !status) return; button.addEventListener('click', function () { copyText(code.textContent.trim()).then(function () { status.textContent = '访问码已复制。'; }).catch(function () { status.textContent = '复制失败，请手动复制访问码。'; }); }); }
  function initArticle() { var progress = document.querySelector('[data-read-progress]'); if (progress) { var update = function () { var distance = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = (distance > 0 ? Math.min(100, Math.max(0, window.scrollY / distance * 100)) : 0) + '%'; }; document.addEventListener('scroll', update, { passive: true }); update(); } var button = document.querySelector('[data-copy-citation]'); var status = document.querySelector('[data-citation-status]'); if (!button || !status) return; button.addEventListener('click', function () { copyText('韩树：《告示栏没有消失，它只是换了一种连接方式》，~SITE_NAME~，2026-08-01，https://~SITE_DOMAIN~/article.html').then(function () { status.textContent = '文章引用已复制。'; }).catch(function () { status.textContent = '复制失败，请手动复制文章引用。'; }); }); }

  function initArranger() {
    var form = document.querySelector('[data-arranger-form]'); if (!form) return;
    var input = document.getElementById('story-input'); var density = document.getElementById('layout-density'); var shuffle = document.getElementById('layout-shuffle'); var wall = document.querySelector('[data-mini-wall]'); var count = document.querySelector('[data-story-count]'); var status = document.querySelector('[data-layout-status]'); var message = document.querySelector('[data-arranger-message]'); var copyButton = document.querySelector('[data-copy-layout]'); var copyStatus = document.querySelector('[data-copy-layout-status]'); var sample = document.querySelector('[data-sample-stories]'); var clear = document.querySelector('[data-clear-stories]'); var report = '';
    function rows() { return input.value.split(/\r?\n/).map(function (row) { return row.trim(); }).filter(Boolean); }
    function countRows() { count.textContent = rows().length + ' / 8 条'; }
    function reset() { report = ''; copyButton.disabled = true; copyStatus.textContent = ''; status.textContent = '等待编排'; message.textContent = ''; wall.removeAttribute('data-accent'); wall.replaceChildren(); ['01 / 主标题会显示在这里', '02 / 次标题', '03 / 快讯'].forEach(function (text, index) { var card = document.createElement('article'); card.textContent = text; if (index === 0) card.setAttribute('data-size', 'lead'); wall.appendChild(card); }); }
    function invalidate() { if (report || !copyButton.disabled) reset(); else { message.textContent = ''; copyStatus.textContent = ''; } input.removeAttribute('aria-invalid'); }
    input.addEventListener('input', function () { countRows(); invalidate(); }); density.addEventListener('change', invalidate); shuffle.addEventListener('change', invalidate); form.querySelectorAll('input[name="accent"]').forEach(function (radio) { radio.addEventListener('change', invalidate); });
    sample.addEventListener('click', function () { reset(); input.value = '告示栏没有消失，它只是换了一种连接方式\n菜市场价签，可能是最诚实的字体样本\n一档地方播客如何保存正在消失的口音\n一条长椅，让天桥下多停留了二十分钟\n重复使用的包装，也可以有明确的身份\n夜校重回社区之后，谁坐进了第一排'; countRows(); input.removeAttribute('aria-invalid'); input.focus(); message.textContent = '已载入 6 条示例，可继续调整。'; }); clear.addEventListener('click', function () { input.value = ''; countRows(); reset(); input.removeAttribute('aria-invalid'); input.focus(); });
    form.addEventListener('submit', function (event) { event.preventDefault(); reset(); var list = rows(); if (input.value.length > 800) { message.textContent = '输入最多 800 个字符，请删减后重试。'; input.focus(); return; } if (list.length < 3) { message.textContent = '至少输入 3 条标题，才能形成可比较的编排节奏。'; input.focus(); return; } if (list.length > 8) { message.textContent = '单次最多编排 8 条标题，请先合并或删减。'; input.focus(); return; } if (list.some(function (title) { return Array.from(title).length > 120; })) { message.textContent = '单条标题最多 120 个字符，请缩短后重试。'; input.focus(); return; } var keys = list.map(normalized); if (new Set(keys).size !== keys.length) { message.textContent = '候选标题中有重复项，请合并后重试。'; input.focus(); return; } var required = density.value === 'air' ? 4 : density.value === 'balanced' ? 6 : 7; if (list.length < required) { message.textContent = '当前密度至少需要 ' + required + ' 条标题，或选择更疏朗的墙面。'; input.focus(); return; } var arranged = list.slice(); if (shuffle.checked) { var secondary = arranged.slice(1); arranged = [arranged[0]].concat(secondary.filter(function (_, index) { return index % 2 === 1; }), secondary.filter(function (_, index) { return index % 2 === 0; })); } var selectedAccent = form.querySelector('input[name="accent"]:checked'); var accent = selectedAccent ? selectedAccent.value : 'blue'; wall.setAttribute('data-accent', accent); wall.replaceChildren(); var lines = []; arranged.forEach(function (title, index) { var card = document.createElement('article'); var no = String(index + 1).padStart(2, '0'); card.textContent = no + ' / ' + title; var size = index === 0 ? 'lead' : (index === 3 || index === 6 ? 'wide' : 'standard'); card.setAttribute('data-size', size); wall.appendChild(card); lines.push(no + '｜' + size.toUpperCase() + '｜' + title); }); report = '拼贴编排单｜密度：' + density.options[density.selectedIndex].text + '｜主色：' + accent + '\n' + lines.join('\n'); status.textContent = arranged.length + ' 条已编排'; copyButton.disabled = false; copyStatus.textContent = ''; input.removeAttribute('aria-invalid'); wall.focus(); });
    copyButton.addEventListener('click', function () { if (!report) return; copyText(report).then(function () { copyStatus.textContent = '编排单已复制'; }).catch(function () { copyStatus.textContent = '复制失败，请手动选择编排单'; }); }); countRows();
  }

  function initManual() { var button = document.querySelector('[data-copy-manual]'); var status = document.querySelector('[data-manual-status]'); if (!button || !status) return; button.addEventListener('click', function () { copyText('~SITE_NAME~ 编辑手册 V3.1｜生效：2026-08-01｜范围：来源、现场、修订、隐私与合作｜https://~SITE_DOMAIN~/legal.html').then(function () { status.textContent = '版本摘要已复制。'; }).catch(function () { status.textContent = '复制失败，请手动复制版本摘要。'; }); }); }
  function init404() { var form = document.querySelector('[data-404-form]'); if (!form) return; var input = document.getElementById('missing-query'); var status = document.querySelector('[data-404-status]'); var results = document.querySelector('[data-404-results]'); var entries = [{ terms:'社区 告示栏 公共生活 街区',title:'告示栏没有消失，它只是换了一种连接方式',href:'article.html'},{terms:'设计 编排 拼贴 标题 工具',title:'拼贴编排台',href:'tool.html'},{terms:'来源 隐私 修订 合作 编辑',title:'公开编辑手册',href:'legal.html'},{terms:'城市 文化 夜校 当下',title:'本期当下墙',href:'index.html'}]; input.addEventListener('input', function () { status.textContent = ''; results.replaceChildren(); }); form.addEventListener('submit', function (event) { event.preventDefault(); var query = normalized(input.value); results.replaceChildren(); if (!query) { status.textContent = '请输入一个想寻找的主题。'; input.focus(); return; } var matched = entries.filter(function (entry) { return normalized(entry.terms).indexOf(query) !== -1 || normalized(entry.title).indexOf(query) !== -1; }); status.textContent = matched.length ? '找到 ' + matched.length + ' 张相关卡片。' : '没有找到相关卡片，试试“社区”“设计”或“隐私”。'; matched.forEach(function (entry) { var item = document.createElement('li'); var link = document.createElement('a'); link.href = entry.href; link.textContent = entry.title; item.appendChild(link); results.appendChild(item); }); }); }

  function initErrorFields() {
    var arrangerForm = document.querySelector('[data-arranger-form]');
    var storyInput = document.getElementById('story-input');
    var density = document.getElementById('layout-density');
    var arrangerMessage = document.querySelector('[data-arranger-message]');
    if (arrangerForm && storyInput && density && arrangerMessage) {
      arrangerMessage.id = arrangerMessage.id || 'arranger-message';
      storyInput.setAttribute('aria-describedby', arrangerMessage.id);
      function clearStoryError() { storyInput.removeAttribute('aria-invalid'); }
      storyInput.addEventListener('input', clearStoryError);
      arrangerForm.addEventListener('submit', function () {
        if (arrangerMessage.textContent) storyInput.setAttribute('aria-invalid', 'true');
        else storyInput.removeAttribute('aria-invalid');
      });
    }

    var missingForm = document.querySelector('[data-404-form]');
    var missingInput = document.getElementById('missing-query');
    var missingStatus = document.querySelector('[data-404-status]');
    if (missingForm && missingInput && missingStatus) {
      missingStatus.id = missingStatus.id || 'missing-status';
      missingInput.setAttribute('aria-describedby', missingStatus.id);
      missingInput.addEventListener('input', function () { if (missingInput.value.trim()) missingInput.removeAttribute('aria-invalid'); });
      missingForm.addEventListener('submit', function () {
        if (missingInput.value.trim()) missingInput.removeAttribute('aria-invalid');
        else missingInput.setAttribute('aria-invalid', 'true');
      });
    }
  }

  initTheme(); initMenu(); initWall(); initAccessCopy(); initArticle(); initArranger(); initManual(); init404(); initErrorFields();
}());
