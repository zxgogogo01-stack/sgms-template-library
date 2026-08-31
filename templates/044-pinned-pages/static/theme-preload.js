(function () {
  'use strict';
  var theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  try { theme = window.localStorage.getItem('pinned-pages-044-theme') || theme; } catch (error) { /* Use the system theme when storage is unavailable. */ }
  document.documentElement.dataset.theme = theme;
}());
