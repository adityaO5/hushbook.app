'use strict';

/**
 * Locale registry shared by page generation, the language dropdown, and QA.
 * Product screenshots always come from mockupRoot; localized pages do not
 * create image variants.
 */
module.exports = {
  mockupRoot: '/assets/img/mockups/',
  defaultLocale: 'en',
  /**
   * Locales live on production and listed in the language dropdown.
   * Includes every path currently geo-routed in vercel.json plus English.
   */
  publishedLocales: [
    'en', 'ar', 'da', 'de', 'es-419', 'es-ES', 'fr', 'id', 'it', 'ja', 'ko',
    'nl', 'pl', 'pt-BR', 'pt-PT', 'ru', 'sv', 'th', 'tr', 'uk', 'vi',
  ],
  /**
   * Country (ISO 3166-1 alpha-2) → locale for first-visit Vercel geo redirects.
   * Cookie hushbook_locale always wins when present.
   */
  countryLocales: {
    DE: 'de',
    JP: 'ja',
    FR: 'fr', BE: 'fr', LU: 'fr', MC: 'fr',
    ES: 'es-ES', MX: 'es-ES', AR: 'es-ES', CO: 'es-ES', CL: 'es-ES', PE: 'es-ES', UY: 'es-ES',
    BR: 'pt-BR',
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
    PT: 'pt-PT',
    AE: 'ar', SA: 'ar', EG: 'ar', MA: 'ar', DZ: 'ar', TN: 'ar',
  },
  plannedLocales: [
    'de', 'fr', 'es-ES', 'es-419', 'pt-BR', 'pt-PT', 'it', 'ja', 'ko', 'nl',
    'pl', 'tr', 'ru', 'uk', 'ar', 'id', 'th', 'vi', 'sv', 'da',
  ],
  publicPages: [
    'index.html', 'download.html', 'about.html', 'privacy-policy.html',
    'terms-conditions.html', 'refund-policy.html', 'licenses.html',
  ],
};
