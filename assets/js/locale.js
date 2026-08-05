'use strict';

(() => {
  /**
   * Locales live on production / wired for Vercel geo routing.
   * Keep in sync with localization.config.js publishedLocales and vercel.json.
   */

  // Only index the custom domain. Vercel aliases get X-Robots-Tag via vercel.json;
  // this meta is a client-side backup for crawlers that execute JS.
  const host = (location.hostname || '').toLowerCase();
  const isProductionHost = host === 'hushbook.app' || host === 'www.hushbook.app';
  if (!isProductionHost) {
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, nofollow');
  }

  const LOCALES = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'ar', label: 'العربية', short: 'AR' },
    { code: 'da', label: 'Dansk', short: 'DA' },
    { code: 'de', label: 'Deutsch', short: 'DE' },
    { code: 'es-419', label: 'Español (LatAm)', short: 'LAT' },
    { code: 'es-ES', label: 'Español (España)', short: 'ES' },
    { code: 'fr', label: 'Français', short: 'FR' },
    { code: 'id', label: 'Bahasa Indonesia', short: 'ID' },
    { code: 'it', label: 'Italiano', short: 'IT' },
    { code: 'ja', label: '日本語', short: 'JA' },
    { code: 'ko', label: '한국어', short: 'KO' },
    { code: 'nl', label: 'Nederlands', short: 'NL' },
    { code: 'pl', label: 'Polski', short: 'PL' },
    { code: 'pt-BR', label: 'Português (Brasil)', short: 'BR' },
    { code: 'pt-PT', label: 'Português (Portugal)', short: 'PT' },
    { code: 'ru', label: 'Русский', short: 'RU' },
    { code: 'sv', label: 'Svenska', short: 'SV' },
    { code: 'th', label: 'ไทย', short: 'TH' },
    { code: 'tr', label: 'Türkçe', short: 'TR' },
    { code: 'uk', label: 'Українська', short: 'UK' },
    { code: 'vi', label: 'Tiếng Việt', short: 'VI' },
  ];

  const LOCALE_CODES = LOCALES.map((entry) => entry.code);
  const DEFAULT_LOCALE = 'en';
  const COOKIE = 'hushbook_locale';
  const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const readCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${escapeRegExp(name)}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : '';
  };

  const writeCookie = (name, value) => {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  };

  const path = window.location.pathname.replace(/\.html$/, '') || '/';
  const segments = path.split('/').filter(Boolean);
  const pathLocale = LOCALE_CODES.includes(segments[0]) ? segments[0] : DEFAULT_LOCALE;
  const htmlLang = document.documentElement.lang || DEFAULT_LOCALE;
  const locale = LOCALE_CODES.includes(htmlLang)
    ? htmlLang
    : (LOCALE_CODES.includes(pathLocale) ? pathLocale : DEFAULT_LOCALE);

  const barePath = pathLocale === DEFAULT_LOCALE
    ? (path === '/' ? '/' : path)
    : (path.replace(new RegExp(`^/${escapeRegExp(pathLocale)}(?=/|$)`), '') || '/');

  const pathFor = (code) => {
    if (code === DEFAULT_LOCALE) return barePath === '/' ? '/' : barePath;
    return barePath === '/' ? `/${code}` : `/${code}${barePath}`;
  };

  const suffix = `${window.location.search}${window.location.hash}`;

  /**
   * Honor explicit language cookie when Vercel edge redirect did not fire
   * (e.g. client nav, stale tab, or local preview). Skip if already correct.
   */
  const preferred = readCookie(COOKIE);
  if (preferred && LOCALE_CODES.includes(preferred) && preferred !== locale) {
    const target = `${pathFor(preferred)}${suffix}`;
    const here = `${path === '/' ? '/' : path}${suffix}`;
    if (target !== here) {
      window.location.replace(target);
      return;
    }
  }

  const switcher = document.querySelector('[data-locale-switcher]');
  if (!switcher) return;

  const navInner = document.querySelector('.nav-inner');
  const navLinks = document.querySelector('.nav-links');
  const navToggle = document.querySelector('.nav-toggle');
  const current = LOCALES.find((entry) => entry.code === locale) || LOCALES[0];

  /**
   * Keep language control with the hamburger on the right:
   * [brand] ........ [language] [menu]
   * (Previously append order put the hamburger in the center on mobile.)
   */
  if (navInner) {
    let actions = navInner.querySelector('.nav-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'nav-actions';
      if (navToggle) actions.append(navToggle);
      navInner.append(actions);
    }
    actions.insertBefore(switcher, navToggle || null);
  }

  const localeLinksHtml = LOCALES.map((entry) => {
    const isCurrent = entry.code === locale;
    const href = `${pathFor(entry.code)}${suffix}`;
    return `
      <li role="option" aria-selected="${isCurrent}">
        <a data-locale="${entry.code}" href="${href}"${isCurrent ? ' aria-current="true"' : ''}>
          <span class="locale-switcher__name">${entry.label}</span>
          <span class="locale-switcher__code">${entry.short}</span>
        </a>
      </li>`;
  }).join('');

  switcher.className = 'locale-switcher';
  switcher.setAttribute('aria-label', 'Language selector');
  switcher.innerHTML = `
    <button type="button" class="locale-switcher__btn" aria-haspopup="listbox" aria-expanded="false">
      <span class="locale-switcher__label locale-switcher__label--full">${current.label}</span>
      <span class="locale-switcher__label locale-switcher__label--short" aria-hidden="true">${current.short}</span>
      <svg class="locale-switcher__chev" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
        <path d="M2.5 4.25 6 7.75l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <ul class="locale-switcher__menu" role="listbox" hidden>
      ${localeLinksHtml}
    </ul>
  `;

  // Also list every language inside the mobile drawer so users can switch
  // without finding the compact header control.
  if (navLinks && !navLinks.querySelector('[data-locale-drawer]')) {
    const drawer = document.createElement('div');
    drawer.className = 'locale-drawer';
    drawer.setAttribute('data-locale-drawer', '');
    drawer.innerHTML = `
      <p class="locale-drawer__title">Language</p>
      <ul class="locale-drawer__list" role="listbox">
        ${localeLinksHtml}
      </ul>
    `;
    navLinks.append(drawer);
  }

  const style = document.createElement('style');
  style.textContent = `
.nav-actions{
  display:flex;align-items:center;gap:8px;flex:none;margin-left:auto;z-index:60
}
.locale-switcher{
  position:relative;z-index:60;display:flex;flex:none;align-items:center;
  font:600 13px system-ui,sans-serif;white-space:nowrap;color:#f5efe6
}
.locale-switcher__btn{
  display:inline-flex;align-items:center;gap:7px;padding:7px 12px 7px 14px;
  border:1px solid rgba(201,163,106,.35);border-radius:999px;
  background:rgba(11,10,9,.88);color:inherit;font:inherit;cursor:pointer;
  transition:border-color .2s,background .2s;-webkit-tap-highlight-color:transparent
}
.locale-switcher__btn:hover,
.locale-switcher.is-open .locale-switcher__btn{
  border-color:rgba(232,200,147,.55);background:rgba(20,17,14,.96)
}
.locale-switcher__btn:focus-visible{
  outline:2px solid #e8c893;outline-offset:3px
}
.locale-switcher__label--short{display:none}
.locale-switcher__chev{
  opacity:.72;transition:transform .2s ease;flex:none
}
.locale-switcher.is-open .locale-switcher__chev{transform:rotate(180deg)}
.locale-switcher__menu{
  position:absolute;top:calc(100% + 8px);right:0;min-width:220px;max-height:min(70vh,420px);
  overflow-y:auto;-webkit-overflow-scrolling:touch;margin:0;padding:6px;list-style:none;
  border:1px solid rgba(201,163,106,.28);border-radius:14px;
  background:rgba(16,13,11,.97);box-shadow:0 16px 40px rgba(0,0,0,.45);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:rgba(201,163,106,.35) transparent;
  z-index:200
}
.locale-switcher__menu[hidden]{display:none!important}
.locale-switcher__menu a,
.locale-drawer__list a{
  display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:10px 12px;border-radius:10px;color:inherit;text-decoration:none;
  opacity:.78;transition:background .15s,opacity .15s,color .15s
}
.locale-switcher__menu a:hover,
.locale-switcher__menu a:focus-visible,
.locale-drawer__list a:hover,
.locale-drawer__list a:focus-visible{
  background:rgba(201,163,106,.12);opacity:1;outline:none
}
.locale-switcher__menu a[aria-current="true"],
.locale-drawer__list a[aria-current="true"]{
  opacity:1;color:#e8c893;background:rgba(201,163,106,.1)
}
.locale-switcher__name{min-width:0}
.locale-switcher__code{
  font-size:11px;font-weight:700;letter-spacing:.06em;opacity:.55;flex:none
}
.locale-switcher__menu a[aria-current="true"] .locale-switcher__code,
.locale-drawer__list a[aria-current="true"] .locale-switcher__code{opacity:.8}
.locale-drawer{display:none;width:100%;margin-top:8px;padding-top:12px;border-top:1px solid rgba(245,238,227,.1)}
.nav.open .locale-drawer{display:block}
.locale-drawer__title{
  margin:0 0 8px;padding:0 6px;font-size:12px;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;color:rgba(245,238,227,.55)
}
.locale-drawer__list{list-style:none;margin:0;padding:0;max-height:min(50vh,360px);overflow-y:auto;-webkit-overflow-scrolling:touch}
@media (max-width:980px){
  .nav-actions{order:3}
  .locale-switcher__label--full{display:none}
  .locale-switcher__label--short{display:inline}
  .locale-switcher__btn{font-size:12px;padding:8px 12px;min-height:40px;gap:6px}
  /* Fixed menu avoids iOS/body overflow-x clipping of absolute dropdowns */
  .locale-switcher__menu{
    position:fixed;top:auto;right:12px;left:12px;min-width:0;width:auto;
    max-height:min(70vh,480px);z-index:400
  }
}
`.replace(/\n/g, '');
  document.head.append(style);

  const button = switcher.querySelector('.locale-switcher__btn');
  const menu = switcher.querySelector('.locale-switcher__menu');

  const placeMenu = () => {
    if (menu.hidden || window.matchMedia('(min-width:981px)').matches) {
      menu.style.top = '';
      return;
    }
    const rect = button.getBoundingClientRect();
    const gap = 8;
    const maxH = Math.min(window.innerHeight * 0.7, 480);
    const spaceBelow = window.innerHeight - rect.bottom - gap - 12;
    const spaceAbove = rect.top - gap - 12;
    if (spaceBelow >= 180 || spaceBelow >= spaceAbove) {
      menu.style.top = `${Math.round(rect.bottom + gap)}px`;
      menu.style.maxHeight = `${Math.max(160, Math.min(maxH, spaceBelow))}px`;
    } else {
      const h = Math.max(160, Math.min(maxH, spaceAbove));
      menu.style.top = `${Math.round(rect.top - gap - h)}px`;
      menu.style.maxHeight = `${h}px`;
    }
  };

  const setOpen = (open) => {
    switcher.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.hidden = !open;
    if (open) placeMenu();
  };

  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(menu.hidden);
  });

  document.addEventListener('click', (event) => {
    if (!switcher.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (!menu.hidden) placeMenu();
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (!menu.hidden) placeMenu();
  }, { passive: true });

  const bindLocaleLink = (link) => {
    link.addEventListener('click', (event) => {
      const nextLocale = link.dataset.locale;
      if (!nextLocale || !LOCALE_CODES.includes(nextLocale)) return;

      // Persist choice so Vercel cookie redirects + client sync honor it.
      writeCookie(COOKIE, nextLocale);

      const target = `${pathFor(nextLocale)}${suffix}`;
      const here = `${window.location.pathname.replace(/\.html$/, '') || '/'}${window.location.search}${window.location.hash}`;

      // Always hard-navigate so URL updates even if default link handling is blocked.
      if (target !== here) {
        event.preventDefault();
        window.location.assign(target);
      }
    });
  };

  document.querySelectorAll('[data-locale]').forEach(bindLocaleLink);
})();
