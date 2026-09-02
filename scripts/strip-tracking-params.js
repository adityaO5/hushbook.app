'use strict';

/**
 * Query keys that create duplicate URLs of otherwise-canonical pages.
 * Shared by middleware.js (copied — Edge cannot import CJS) and tests.
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

function stripTrackingParams(urlString, base = 'https://hushbook.app') {
  const url = new URL(urlString, base);
  let changed = false;
  for (const key of [...url.searchParams.keys()]) {
    if (TRACKING_PARAM_SET.has(key.toLowerCase())) {
      url.searchParams.delete(key);
      changed = true;
    }
  }
  return {
    changed,
    location: `${url.pathname}${url.search}${url.hash}`,
  };
}

module.exports = {
  TRACKING_PARAMS,
  stripTrackingParams,
};
