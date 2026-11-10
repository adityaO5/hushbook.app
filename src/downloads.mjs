// Installer downloads: /dl/<platform> logs one row to D1, then redirects to the
// file on R2. No IP address and no cookie is stored.
import { BOT_USER_AGENT } from './routing.mjs';

export const DOWNLOADS = {
  windows: 'https://downloads.hushbook.app/windows/HushBook-Setup.exe',
};

const SITE_HOSTS = new Set(['hushbook.app', 'www.hushbook.app']);
const AUTOMATED = /bot\b|bot\/|crawl|spider|preview|headless|curl|wget|python|^node$|go-http|axios|okhttp/i;

const clip = (value, max = 200) => (value || '').trim().slice(0, max);

function parseUrl(value) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

/**
 * Returns { target, row } for a GET or HEAD on /dl/<known platform>, else null.
 *
 * src is the first of: utm_source, ref, the host of an external referrer,
 * "direct". The page script on /desktop passes the visitor's landing data:
 * utm_*, ref, r (external document.referrer) and from (previous site page).
 */
export function downloadEvent(request) {
  const method = request.method || 'GET';
  if (method !== 'GET' && method !== 'HEAD') return null;

  const url = new URL(request.url);
  const match = /^\/dl\/([a-z]+)\/?$/.exec(url.pathname);
  if (!match || !Object.hasOwn(DOWNLOADS, match[1])) return null;

  const query = url.searchParams;
  const referer = parseUrl(request.headers.get('referer'));
  const onSite = Boolean(referer && SITE_HOSTS.has(referer.hostname));
  const external = [parseUrl(query.get('r')), referer].find((u) => u && /^https?:$/.test(u.protocol) && !SITE_HOSTS.has(u.hostname));
  const userAgent = request.headers.get('user-agent') || '';

  return {
    target: DOWNLOADS[match[1]],
    row: {
      ts: new Date().toISOString(),
      platform: match[1],
      src: clip(query.get('utm_source') || query.get('ref'), 80).toLowerCase()
        || (external ? external.hostname.replace(/^www\./, '') : 'direct'),
      medium: clip(query.get('utm_medium'), 80).toLowerCase(),
      campaign: clip(query.get('utm_campaign'), 80),
      referrer: external ? clip(`${external.origin}${external.pathname}`) : '',
      page: onSite ? clip(referer.pathname) : '',
      prev: clip(query.get('from')),
      country: (request.cf && request.cf.country) || '',
      ua: clip(userAgent),
      bot: !userAgent || BOT_USER_AGENT.test(userAgent) || AUTOMATED.test(userAgent) ? 1 : 0,
    },
  };
}

export function recordDownload(db, row) {
  return db
    .prepare('INSERT INTO downloads (ts, platform, src, medium, campaign, referrer, page, prev, country, ua, bot) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(row.ts, row.platform, row.src, row.medium, row.campaign, row.referrer, row.page, row.prev, row.country, row.ua, row.bot)
    .run();
}

/** Redirects to the installer; the row is written after the response is sent. */
export function downloadResponse(request, env, ctx) {
  const download = downloadEvent(request);
  if (!download) return null;

  const prefetch = /prefetch|prerender/i.test(request.headers.get('sec-purpose') || request.headers.get('purpose') || '');
  if (request.method === 'GET' && !prefetch && env.DB) {
    const write = recordDownload(env.DB, download.row).catch((error) => console.error('download log failed', error));
    if (ctx && ctx.waitUntil) ctx.waitUntil(write);
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: download.target,
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
