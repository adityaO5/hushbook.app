/**
 * 301-strip tracking query params before HTML is served.
 *
 * GSC "Alternate page with proper canonical tag" is correct for
 * `/?ref=` and `/?utm_*` while those URLs 200 with a homepage canonical,
 * but they also emit the full hreflang set on a non-canonical URL.
 * A 301 to the clean path removes the duplicate from the indexation
 * report and keeps hreflang on canonical URLs only.
 *
 * Keep TRACKING_PARAMS in sync with scripts/strip-tracking-params.js.
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
  let changed = false;
  for (const key of [...url.searchParams.keys()]) {
    if (TRACKING_PARAMS.has(key.toLowerCase())) {
      url.searchParams.delete(key);
      changed = true;
    }
  }
  if (!changed) return;

  return new Response(null, {
    status: 301,
    headers: {
      Location: `${url.pathname}${url.search}${url.hash}`,
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

export const config = {
  matcher: [
    '/',
    '/((?!assets/|_vercel/).*)',
  ],
};
