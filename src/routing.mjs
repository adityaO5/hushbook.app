// Homepage locale redirects, ported from the cookie and geo rules in vercel.json.

// Crawlers stay on the canonical English URL: geo 307s were reported in Search
// Console as "Page with redirect".
export const BOT_USER_AGENT = /(Googlebot|Google-InspectionTool|GoogleOther|bingbot|BingPreview|DuckDuckBot|Slurp|YandexBot|Baiduspider|facebookexternalhit|Twitterbot|LinkedInBot|Applebot|GPTBot|ChatGPT-User|ClaudeBot|PerplexityBot|OAI-SearchBot|Bytespider|Amazonbot)/i;

const LOCALE_COOKIE = 'hushbook_locale';

export function parseCookies(header) {
  const cookies = new Map();
  for (const part of (header || '').split(';')) {
    const index = part.indexOf('=');
    if (index === -1) continue;
    const name = part.slice(0, index).trim();
    if (!name || cookies.has(name)) continue;
    let value = part.slice(index + 1).trim().replace(/^"(.*)"$/, '$1');
    try {
      value = decodeURIComponent(value);
    } catch {
      // Keep the raw value when it is not valid percent-encoding.
    }
    cookies.set(name, value);
  }
  return cookies;
}

/**
 * Returns { status: 307, location } or null. An explicit locale cookie wins;
 * any cookie value, including "en", suppresses the geo redirect.
 */
export function localeRedirect({ pathname, country, cookieHeader, userAgent }, rules) {
  if (pathname !== '/') return null;
  if (BOT_USER_AGENT.test(userAgent || '')) return null;

  const cookies = parseCookies(cookieHeader);
  if (cookies.has(LOCALE_COOKIE)) {
    const locale = cookies.get(LOCALE_COOKIE);
    return rules.cookieLocales.includes(locale) ? { status: 307, location: `/${locale}` } : null;
  }

  const locale = country && Object.hasOwn(rules.countryLocales, country) ? rules.countryLocales[country] : null;
  return locale ? { status: 307, location: `/${locale}` } : null;
}
