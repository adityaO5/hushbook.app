'use strict';

/**
 * Locale registry shared by page generation and QA. English masters live at the
 * root; non-English pages may reference generated variants under /locales/.
 */
module.exports = {
  mockupRoot: '/assets/img/mockups/',
  defaultLocale: 'en',
  publishedLocales: [
    'en', 'de', 'fr', 'es-ES', 'es-419', 'pt-BR', 'pt-PT', 'it', 'ja', 'ko',
    'nl', 'pl', 'tr', 'ru', 'uk', 'ar', 'id', 'th', 'vi', 'sv', 'da',
  ],
  // Legacy generic routes remain in the source tree as drafts, but production
  // redirects them and they are not exposed in selector/sitemap/hreflang data.
  draftLocales: ['es', 'pt'],
  // Permanent consolidation targets for draft/legacy public routes. Keep this
  // explicit so a new locale cannot accidentally become indexable by alias.
  legacyRedirects: {
    es: 'es-ES',
    pt: 'pt-PT',
    'fr-argos': 'fr',
  },
  plannedLocales: [
    'de', 'fr', 'es-ES', 'es-419', 'pt-BR', 'pt-PT', 'it', 'ja', 'ko', 'nl',
    'pl', 'tr', 'ru', 'uk', 'ar', 'id', 'th', 'vi', 'sv', 'da',
  ],
  publicPages: [
    'index.html', 'download.html', 'about.html', 'privacy-policy.html',
    'terms-conditions.html', 'refund-policy.html', 'licenses.html',
  ],
  /** Country -> published locale used by scripts/build-vercel-locales.js. */
  countryLocales: {
    DE: 'de', AT: 'de', CH: 'de',
    JP: 'ja',
    FR: 'fr', BE: 'fr', LU: 'fr', MC: 'fr',
    ES: 'es-ES',
    MX: 'es-419', AR: 'es-419', CO: 'es-419', CL: 'es-419', PE: 'es-419',
    UY: 'es-419', CR: 'es-419', EC: 'es-419', GT: 'es-419', PA: 'es-419',
    DO: 'es-419', PR: 'es-419', BO: 'es-419', PY: 'es-419', SV: 'es-419',
    HN: 'es-419', NI: 'es-419', VE: 'es-419',
    BR: 'pt-BR',
    PT: 'pt-PT',
    IT: 'it',
    KR: 'ko',
    NL: 'nl',
    PL: 'pl',
    TR: 'tr',
    RU: 'ru',
    UA: 'uk',
    ID: 'id',
    TH: 'th',
    VN: 'vi',
    SE: 'sv',
    DK: 'da',
    AE: 'ar', SA: 'ar', EG: 'ar', MA: 'ar', DZ: 'ar', TN: 'ar',
  },
};
