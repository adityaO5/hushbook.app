'use strict';

/**
 * Normalize legacy campaign links that put query parameters in the path.
 * Valid query parameters remain untouched for analytics attribution.
 */
const TRACKING_PARAMS = Object.freeze([
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

const TRACKING_PARAM_SET = new Set(TRACKING_PARAMS);

function normalizeTrackingParams(urlString, base = 'https://hushbook.app') {
  const url = new URL(urlString, base);
  const pathParts = url.pathname.split('/');
  const candidate = pathParts.at(-1);
  if (!candidate || !candidate.includes('=')) {
    return { changed: false, location: `${url.pathname}${url.search}${url.hash}` };
  }

  const campaignParams = new URLSearchParams(candidate);
  const entries = [...campaignParams.entries()];
  if (
    entries.length === 0 ||
    entries.some(([key, value]) => !TRACKING_PARAM_SET.has(key.toLowerCase()) || !value)
  ) {
    return { changed: false, location: `${url.pathname}${url.search}${url.hash}` };
  }

  pathParts.pop();
  url.pathname = pathParts.join('/') || '/';
  for (const [key, value] of entries) url.searchParams.append(key, value);

  return {
    changed: true,
    location: `${url.pathname}${url.search}${url.hash}`,
  };
}

module.exports = {
  TRACKING_PARAMS,
  normalizeTrackingParams,
};
