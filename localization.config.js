'use strict';

/**
 * Locale registry shared by page generation and QA. English masters live at the
 * root; non-English pages may reference generated variants under /locales/.
 */
module.exports = {
  mockupRoot: '/assets/img/mockups/',
  defaultLocale: 'en',
  publishedLocales: ['en', 'de'],
  draftLocales: [
    'fr', 'es-ES', 'es-419', 'pt-BR', 'pt-PT', 'it', 'ja', 'ko', 'nl', 'pl',
    'tr', 'ru', 'uk', 'ar', 'id', 'th', 'vi', 'sv', 'da',
  ],
  plannedLocales: [
    'de', 'fr', 'es-ES', 'es-419', 'pt-BR', 'pt-PT', 'it', 'ja', 'ko', 'nl',
    'pl', 'tr', 'ru', 'uk', 'ar', 'id', 'th', 'vi', 'sv', 'da',
  ],
  publicPages: [
    'index.html', 'download.html', 'about.html', 'privacy-policy.html',
    'terms-conditions.html', 'refund-policy.html', 'licenses.html',
  ],
};
