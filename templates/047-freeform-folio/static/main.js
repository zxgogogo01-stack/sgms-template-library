(function () {
  'use strict';
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('folio-theme'); } catch (error) { saved = null; }
  var theme = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(theme);

  function applyTheme(value) {
    root.setAttribute('data-theme', value);
    document.querySelectorAll('[data-theme-label]').forEach(function (node) { node.textContent = value === 'dark' ? '日间' : '夜间'; });
    document.querySelectorAll('[data-theme-button]').forEach(function (button) { button.setAttribute('aria-label', value === 'dark' ? '切换到日间模式' : '切换到夜间模式'); });
  }

  document.querySelectorAll('[data-theme-button]').forEach(function (button) {
    button.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('folio-theme', next); } catch (error) { /* theme remains active */ }
    });
  });

  var menuButton = document.querySelector('[data-menu-button]');
  var nav = document.querySelector('[data-site-nav]');
  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') !== 'true';
      nav.setAttribute('data-open', String(open));
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '收起' : '目录';
      if (open) { var first = nav.querySelector('a'); if (first) first.focus(); }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.getAttribute('data-open') === 'true') {
        nav.setAttribute('data-open', 'false');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = '目录';
        menuButton.focus();
      }
    });
  }

  function copyText(text, done, failed) {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
    function fallback() {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy') ? done() : failed(); } catch (error) { failed(); }
      document.body.removeChild(area);
    }
  }

  var search = document.querySelector('[data-folio-search]');
  var filterBox = document.querySelector('[data-folio-filters]');
  var projects = Array.prototype.slice.call(document.querySelectorAll('[data-project]'));
  var status = document.querySelector('[data-folio-status]');
  var empty = document.querySelector('[data-project-empty]');
  var activeFilter = 'all';
  function updateProjects() {
    if (!projects.length) return;
    var term = search ? search.value.trim().toLowerCase() : '';
    var visible = 0;
    projects.forEach(function (project) {
      var filterMatch = activeFilter === 'all' || project.getAttribute('data-kind') === activeFilter;
      var haystack = ((project.getAttribute('data-search') || '') + ' ' + project.textContent).toLowerCase();
      project.hidden = !(filterMatch && (!term || haystack.indexOf(term) !== -1));
      if (!project.hidden) visible += 1;
    });
    if (status) status.textContent = '显示 ' + visible + ' / ' + projects.length + ' 个项目';
    if (empty) empty.hidden = visible !== 0;
  }
  if (search) search.addEventListener('input', updateProjects);
  if (filterBox) filterBox.addEventListener('click', function (event) {
    var button = event.target.closest('[data-filter]');
    if (!button) return;
    activeFilter = button.getAttribute('data-filter');
    filterBox.querySelectorAll('[data-filter]').forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
    updateProjects();
  });

  var progress = document.querySelector('[data-read-progress]');
  if (progress) {
    var updateProgress = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress.style.width = (ratio * 100).toFixed(1) + '%';
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  var copyCase = document.querySelector('[data-copy-case]');
  if (copyCase) copyCase.addEventListener('click', function () {
    var summary = 'Common Ground 案例摘要：问题——跨城市团队缺少可共同使用的品牌逻辑；限制——周期短、预算有限、多语言且工具不统一；方法——以信息分组、标题尺度和本地内容三条规则替代复杂禁令；结果——六周完成 38 份材料，82% 一次通过。';
    var feedback = document.querySelector('[data-case-status]');
    copyText(summary, function () { copyCase.textContent = '案例摘要已复制'; feedback.textContent = '可直接粘贴到项目文档'; }, function () { feedback.textContent = '复制失败，请手动记录摘要'; });
  });

  var ratioForm = document.querySelector('[data-ratio-form]');
  var lastRatio = '';
  if (ratioForm) {
    var widthInput = ratioForm.elements.width;
    var heightInput = ratioForm.elements.height;
    var message = document.querySelector('[data-ratio-message]');
    var preview = document.querySelector('[data-ratio-preview]');
    var valueNode = document.querySelector('[data-ratio-value]');
    var description = document.querySelector('[data-ratio-description]');
    var orientationNode = document.querySelector('[data-ratio-orientation]');
    var decimalNode = document.querySelector('[data-ratio-decimal]');
    var nearestNode = document.querySelector('[data-ratio-nearest]');
    var stateNode = document.querySelector('[data-ratio-state]');
    var copyRatio = document.querySelector('[data-copy-ratio]');
    var copyStatus = document.querySelector('[data-ratio-copy]');
    var ratioFields = [widthInput, heightInput];
    message.id = 'ratio-message';
    message.setAttribute('role', 'alert');
    message.setAttribute('aria-atomic', 'true');
    ratioFields.forEach(function (field) {
      field.setAttribute('aria-describedby', 'ratio-message');
      field.addEventListener('input', function () { field.removeAttribute('aria-invalid'); });
    });
    function gcd(a, b) { while (b) { var next = a % b; a = b; b = next; } return Math.abs(a) || 1; }
    function nearestName(ratio) {
      var presets = [{ name: '1:1 方形', value: 1 }, { name: '4:5 竖版', value: .8 }, { name: '3:2 横版', value: 1.5 }, { name: '16:9 横屏', value: 16 / 9 }, { name: 'A 系列纸张', value: 1 / Math.sqrt(2) }];
      var best = presets[0];
      presets.forEach(function (preset) { if (Math.abs(preset.value - ratio) < Math.abs(best.value - ratio)) best = preset; });
      return best.name;
    }
    function resetResult() {
      message.textContent = '';
      valueNode.textContent = '— : —';
      description.textContent = '填入宽高后，这里会显示最简比例、方向与相近规格。';
      orientationNode.textContent = decimalNode.textContent = nearestNode.textContent = '—';
      stateNode.textContent = '等待尺寸';
      preview.style.width = '220px'; preview.style.height = '150px';
      copyRatio.disabled = true; copyStatus.textContent = ''; lastRatio = '';
      ratioFields.forEach(function (field) { field.removeAttribute('aria-invalid'); });
    }
    ratioForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var width = Number(widthInput.value);
      var height = Number(heightInput.value);
      ratioFields.forEach(function (field) { field.removeAttribute('aria-invalid'); });
      var invalidFields = ratioFields.filter(function (field) {
        var value = Number(field.value);
        return !field.value.trim() || !Number.isFinite(value) || value <= 0;
      });
      if (invalidFields.length) {
        resetResult(); invalidFields.forEach(function (field) { field.setAttribute('aria-invalid', 'true'); }); message.textContent = '宽度和高度都必须是大于 0 的有效数字。'; invalidFields[0].focus(); return;
      }
      message.textContent = '';
      ratioFields.forEach(function (field) { field.removeAttribute('aria-invalid'); });
      var roundedW = Math.round(width); var roundedH = Math.round(height); var divisor = gcd(roundedW, roundedH);
      var simpleW = roundedW / divisor; var simpleH = roundedH / divisor; var ratio = width / height;
      var orientation = ratio > 1.02 ? '横向' : ratio < .98 ? '纵向' : '方形';
      var nearest = nearestName(ratio);
      var max = 235; var min = 62; var pw; var ph;
      if (ratio >= 1) { pw = max; ph = Math.max(min, max / ratio); } else { ph = max; pw = Math.max(min, max * ratio); }
      preview.style.width = pw.toFixed(1) + 'px'; preview.style.height = ph.toFixed(1) + 'px';
      valueNode.textContent = simpleW + ' : ' + simpleH;
      description.textContent = '这是一个' + orientation + '画面，最接近“' + nearest + '”。输出前仍要结合安全边距和裁切方式。';
      orientationNode.textContent = orientation;
      decimalNode.textContent = ratio.toFixed(4);
      nearestNode.textContent = nearest;
      stateNode.textContent = '计算完成';
      lastRatio = '构图比例：' + simpleW + ':' + simpleH + '；方向：' + orientation + '；小数比：' + ratio.toFixed(4) + '；接近规格：' + nearest + '。';
      copyRatio.disabled = false; copyStatus.textContent = '';
    });
    document.querySelectorAll('[data-ratio-preset]').forEach(function (button) {
      button.addEventListener('click', function () {
        var values = button.getAttribute('data-ratio-preset').split(','); widthInput.value = values[0]; heightInput.value = values[1]; ratioFields.forEach(function (field) { field.removeAttribute('aria-invalid'); }); message.textContent = '规格已载入，可以开始计算。';
      });
    });
    ratioForm.addEventListener('reset', function () { window.setTimeout(resetResult, 0); });
    copyRatio.addEventListener('click', function () { copyText(lastRatio, function () { copyStatus.textContent = '比例结果已复制'; }, function () { copyStatus.textContent = '复制失败，请手动记录'; }); });
  }

  var copyLicense = document.querySelector('[data-copy-license]');
  if (copyLicense) copyLicense.addEventListener('click', function () {
    var text = '引用说明：短段引用请标注作者、页面标题、本站域名与访问日期；完整转载、商业使用、模板转售或去除署名需先获得书面许可。';
    var feedback = document.querySelector('[data-license-status]');
    copyText(text, function () { copyLicense.textContent = '引用说明已复制'; feedback.textContent = '可直接放入项目文档'; }, function () { feedback.textContent = '复制失败，请手动选择说明'; });
  });

  var archiveSearch = document.querySelector('[data-archive-search]');
  if (archiveSearch) {
    var routes = [
      { terms: ['作品', '品牌', '编辑', '数字', '目录'], label: '作品目录', url: 'index.html' },
      { terms: ['案例', 'common', 'ground', '记录'], label: '案例记录', url: 'article.html' },
      { terms: ['比例', '构图', '尺寸', '实验室'], label: '比例实验室', url: 'tool.html' },
      { terms: ['出版', '说明', '授权', '隐私'], label: '出版说明', url: 'legal.html' }
    ];
    archiveSearch.addEventListener('submit', function (event) {
      event.preventDefault();
      var query = archiveSearch.elements.query.value.trim().toLowerCase();
      var feedback = document.querySelector('[data-archive-feedback]');
      if (!query) { feedback.textContent = '先输入一个关键词，例如“案例”或“比例”。'; archiveSearch.elements.query.focus(); return; }
      var hit = routes.find(function (route) { return route.terms.some(function (term) { return term.indexOf(query) !== -1 || query.indexOf(term) !== -1; }); });
      if (hit) feedback.innerHTML = '找到“' + hit.label + '”。<a href="' + hit.url + '">前往页面</a>';
      else feedback.textContent = '没有匹配“' + query + '”。试试“作品”“案例”“比例”或“出版”。';
    });
  }
}());
