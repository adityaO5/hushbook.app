'use strict';

(() => {
  const languages = [
    ['en', 'English'],
    ['de', 'Deutsch'],
    ['fr', 'Français'],
    ['es-ES', 'Español (España)'],
    ['es-419', 'Español (LatAm)'],
    ['pt-BR', 'Português (Brasil)'],
    ['pt-PT', 'Português (Portugal)'],
    ['it', 'Italiano'],
    ['ja', '日本語'],
    ['ko', '한국어'],
    ['nl', 'Nederlands'],
    ['pl', 'Polski'],
    ['tr', 'Türkçe'],
    ['ru', 'Русский'],
    ['uk', 'Українська'],
    ['ar', 'العربية'],
    ['id', 'Bahasa Indonesia'],
    ['th', 'ไทย'],
    ['vi', 'Tiếng Việt'],
    ['sv', 'Svenska'],
    ['da', 'Dansk'],
  ];
  const names = Object.fromEntries(languages);
  const selectorLabels = {
    en: 'Language selector', de: 'Sprachauswahl', fr: 'Sélecteur de langue',
    'es-ES': 'Selector de idioma', 'es-419': 'Selector de idioma',
    'pt-BR': 'Seletor de idioma', 'pt-PT': 'Seletor de idioma', it: 'Selettore lingua',
    ja: '言語選択', ko: '언어 선택', nl: 'Taalkeuze', pl: 'Wybór języka',
    tr: 'Dil seçici', ru: 'Выбор языка', uk: 'Вибір мови', ar: 'اختيار اللغة',
    id: 'Pemilih bahasa', th: 'ตัวเลือกภาษา', vi: 'Bộ chọn ngôn ngữ',
    sv: 'Språkval', da: 'Sprogvalg'
  };
  const rawLocale = document.documentElement.lang || 'en';
  const locale = names[rawLocale] ? rawLocale : 'en';
  const path = window.location.pathname.replace(/\.html$/, '');
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const englishPath = locale === 'en' ? (path || '/') : (path.replace(new RegExp(`^${prefix}(?=/|$)`), '') || '/');
  const switcher = document.querySelector('[data-locale-switcher]');
  if (!switcher) return;

  const currentName = names[locale];
  const secondaryName = locale === 'en' ? names.de : names.en;
  const currentLabel = `${currentName} / ${secondaryName}`;
  switcher.setAttribute('aria-label', selectorLabels[locale] || selectorLabels.en);
  switcher.innerHTML = `
    <button type="button" class="locale-current" aria-expanded="false">
      <span>${currentLabel}</span><span class="locale-chevron" aria-hidden="true">⌄</span>
    </button>
    <div class="locale-menu" hidden role="menu">
      ${languages.map(([code, name]) => `<a href="#" data-locale="${code}" role="menuitem"${code === locale ? ' aria-current="true"' : ''}>${name}</a>`).join('')}
    </div>`;

  const nav = document.querySelector('.nav-inner');
  if (nav && !nav.contains(switcher)) nav.append(switcher);

  const style = document.createElement('style');
  style.textContent = `
    .nav-inner{justify-content:flex-start}
    .nav-inner>.brand{margin-right:auto}
    .nav-links{flex:0 1 auto;min-width:0;gap:clamp(10px,1.8vw,26px)}
    .locale-switcher{position:relative;z-index:20;display:flex;flex:none;margin-left:12px;align-items:center}
    .locale-current{display:flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid rgba(201,163,106,.42);border-radius:999px;background:rgba(11,10,9,.9);color:#f5efe6;font:600 13px system-ui,sans-serif;white-space:nowrap;cursor:pointer}
    .locale-current:hover,.locale-current:focus-visible{border-color:#e8c893;color:#e8c893}
    .locale-current:focus-visible{outline:2px solid #e8c893;outline-offset:3px}
    .locale-chevron{font-size:15px;line-height:1;transform:translateY(-1px)}
    .locale-menu{position:absolute;right:0;top:calc(100% + 8px);display:grid;grid-template-columns:repeat(2,minmax(140px,1fr));gap:2px;padding:8px;min-width:300px;max-height:min(64vh,420px);overflow:auto;border:1px solid rgba(201,163,106,.35);border-radius:14px;background:rgba(18,16,14,.98);box-shadow:0 14px 38px rgba(0,0,0,.35)}
    .locale-menu[hidden]{display:none}
    .locale-menu a{padding:8px 9px;border-radius:8px;color:#f5efe6;text-decoration:none;font:500 13px system-ui,sans-serif;white-space:nowrap}
    .locale-menu a:hover,.locale-menu a:focus-visible{background:rgba(232,200,147,.14);color:#e8c893;outline:none}
    .locale-menu a[aria-current="true"]{color:#e8c893;background:rgba(232,200,147,.08)}
    @media(max-width:1100px) and (min-width:821px){.nav-links{gap:11px;font-size:13px}.nav-cta{padding:8px 12px}.locale-switcher{margin-left:8px}.locale-current{font-size:12px;padding:7px 9px}.locale-menu{min-width:280px}}
    @media(max-width:820px){.nav-inner{position:relative;justify-content:space-between}.nav-inner>.brand{position:absolute;left:50%;margin:0;transform:translateX(-50%)}.nav-toggle{order:-1;margin-right:0}.locale-switcher{margin-left:0}.locale-current{font-size:12px;padding:7px 9px}.locale-menu{right:-4px;min-width:270px;grid-template-columns:1fr}.nav-links{order:4}}
  `;
  document.head.append(style);

  const current = switcher.querySelector('.locale-current');
  const menu = switcher.querySelector('.locale-menu');
  const closeMenu = () => { menu.hidden = true; current.setAttribute('aria-expanded', 'false'); };
  current.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    current.setAttribute('aria-expanded', String(!menu.hidden));
  });
  document.addEventListener('click', (event) => {
    if (!switcher.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { closeMenu(); current.focus(); }
  });

  switcher.querySelectorAll('[data-locale]').forEach((link) => {
    const nextLocale = link.dataset.locale;
    const destination = nextLocale === 'en' ? englishPath : `/${nextLocale}${englishPath === '/' ? '' : englishPath}`;
    link.href = `${destination || '/'}${window.location.search}${window.location.hash}`;
    link.addEventListener('click', () => {
      const secure = window.location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `hushbook_locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
    });
  });

  // Dev-only screenshot preview. Production HTML keeps English masters until
  // a locale passes AI/OCR/component review. Local HTTP preview can inspect
  // every existing locale variant without changing production references.
  const isLocalPreview = window.location.hostname === 'localhost'
    || window.location.hostname === '127.0.0.1';
  if (isLocalPreview && locale !== 'en') {
    document.querySelectorAll('img[src^="/assets/img/mockups/"]').forEach((image) => {
      const source = image.getAttribute('src') || '';
      if (source.includes('/locales/')) return;
      const match = source.match(/\/assets\/img\/mockups\/([^/?#]+)(?:[?#].*)?$/);
      if (!match) return;
      const localizedName = match[1].replace(/\.png$/i, '.webp');
      const candidate = `/assets/img/mockups/locales/${locale}/${localizedName}`;
      const probe = new Image();
      probe.onload = () => {
        image.src = candidate;
        image.dataset.devMockupLocale = locale;
      };
      probe.src = candidate;
    });
  }
})();
