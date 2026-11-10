import rules from './locale-rules.json' with { type: 'json' };
import { downloadResponse } from './downloads.mjs';
import { localeRedirect } from './routing.mjs';
import { normalizeTrackingRequest } from './tracking.mjs';

export default {
  async fetch(request, env, ctx) {
    const download = downloadResponse(request, env, ctx);
    if (download) return download;

    const tracking = normalizeTrackingRequest(request);
    if (tracking) return tracking;

    const url = new URL(request.url);
    if (url.pathname === '/') {
      const redirect = localeRedirect({
        pathname: url.pathname,
        country: request.cf && request.cf.country,
        cookieHeader: request.headers.get('cookie'),
        userAgent: request.headers.get('user-agent') || '',
      }, rules);
      if (redirect) {
        // Vercel kept the query string (campaign params) on these redirects.
        return new Response(null, {
          status: redirect.status,
          headers: {
            Location: `${redirect.location}${url.search}`,
            'Cache-Control': 'private, no-store',
            Vary: 'Cookie, User-Agent',
          },
        });
      }
    }

    const response = await env.ASSETS.fetch(request);
    if (!url.hostname.endsWith('.workers.dev')) return response;
    const copy = new Response(response.body, response);
    copy.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return copy;
  },
};
