/**
 * Preserve valid campaign query parameters so Google Analytics can attribute
 * the landing page. Normalize legacy links such as `/utm_source=chatgpt` to
 * the valid `/?utm_source=chatgpt` form.
 *
 * Keep TRACKING_PARAMS in sync with scripts/normalize-tracking-params.js.
 */

const TRACKING_PARAMS = new Set([
  'ref',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'fbclid',
  'gclid',
  'gclsrc',
  'dclid',
  'gbraid',
  'wbraid',
  'msclkid',
  'twclid',
  'li_fat_id',
  'mc_cid',
  'mc_eid',
  'igshid',
  'ttclid',
  '_ga',
  '_gl',
]);

export default function middleware(request) {
  const method = request.method || 'GET';
  if (method !== 'GET' && method !== 'HEAD') return;

  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const candidate = pathParts.at(-1);
  if (!candidate || !candidate.includes('=')) return;

  const campaignParams = new URLSearchParams(candidate);
  const entries = [...campaignParams.entries()];
  if (
    entries.length === 0 ||
    entries.some(([key, value]) => !TRACKING_PARAMS.has(key.toLowerCase()) || !value)
  ) return;

  pathParts.pop();
  url.pathname = pathParts.join('/') || '/';
  for (const [key, value] of entries) url.searchParams.append(key, value);

  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '');
  const location = host
    ? `${protocol}://${host}${url.pathname}${url.search}`
    : `${url.pathname}${url.search}`;

  return new Response(null, {
    status: 308,
    headers: {
      Location: location,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export const config = {
  matcher: [
    '/',
    '/((?!assets/|_vercel/|\\.well-known/).*)',
  ],
};
