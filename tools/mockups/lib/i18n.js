/* Shared i18n helper for mockup scenes. The runner (render.mjs) sets window.__HB_STRINGS,
   window.__HB_LOCALE and window.__HB_VARS before the page loads. Opened directly in a browser,
   everything falls back to the English the scene carries. */
(function () {
  const S = window.__HB_STRINGS || {};
  const V = window.__HB_VARS || {};
  window.__HB_LOCALE = window.__HB_LOCALE || 'en';

  /** hbT('key', 'English fallback'): the locale's string, or the fallback. */
  window.hbT = function (key, fallback) {
    const v = S[key];
    return typeof v === 'string' ? v : fallback;
  };

  /** hbVar('cover', 'hitchhikers'): a shot variable, or the fallback. */
  window.hbVar = function (key, fallback) {
    return Object.prototype.hasOwnProperty.call(V, key) ? V[key] : fallback;
  };

  /** Sets html[lang] and dir from the locale. Call once, before measuring anything. */
  window.hbLocaleSetup = function () {
    const lc = window.__HB_LOCALE;
    document.documentElement.setAttribute('lang', lc);
    document.documentElement.setAttribute('dir', lc === 'ar' ? 'rtl' : 'ltr');
    return lc;
  };

  /** Replaces data-t="key" text and data-t-attr="attr:key" attributes everywhere under root. */
  window.hbApplyStrings = function (root) {
    const scope = root || document;
    scope.querySelectorAll('[data-t]').forEach((el) => {
      const v = S[el.getAttribute('data-t')];
      if (typeof v === 'string') el.textContent = v;
    });
    scope.querySelectorAll('[data-t-attr]').forEach((el) => {
      el.getAttribute('data-t-attr').split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        const v = S[key];
        if (attr && typeof v === 'string') el.setAttribute(attr, v);
      });
    });
  };
})();
