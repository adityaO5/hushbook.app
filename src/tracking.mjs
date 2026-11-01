/**
 * Preserve valid campaign query parameters so Google Analytics can attribute
 * the landing page. Normalize legacy links such as `/utm_source=chatgpt` to
 * the valid `/?utm_source=chatgpt` form. Ported from middleware.js.
 *
 * Keep TRACKING_PARAMS in sync with scripts/normalize-tracking-params.js.
 */
export const TRACKING_PARAMS = [
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
];

const TRACKING_PARAM_SET = new Set(TRACKING_PARAMS);

export function normalizeTrackingRequest(request) {
  const method = request.method || 'GET';
  if (method !== 'GET' && method !== 'HEAD') return null;

  const url = new URL(request.url);
  // The Vercel middleware matcher skipped /assets/.
  if (url.pathname.startsWith('/assets/')) return null;

  const pathParts = url.pathname.split('/');
  const candidate = pathParts.at(-1);
  if (!candidate || !candidate.includes('=')) return null;

  const campaignParams = new URLSearchParams(candidate);
  const entries = [...campaignParams.entries()];
  if (
    entries.length === 0 ||
    entries.some(([key, value]) => !TRACKING_PARAM_SET.has(key.toLowerCase()) || !value)
  ) return null;

  pathParts.pop();
  url.pathname = pathParts.join('/') || '/';
  for (const [key, value] of entries) url.searchParams.append(key, value);

  // Relative, as production sends today. Cloudflare passes a client-supplied
  // X-Forwarded-Host through, so building an absolute URL from it would be an
  // open redirect.
  return new Response(null, {
    status: 308,
    headers: {
      Location: `${url.pathname}${url.search}`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
