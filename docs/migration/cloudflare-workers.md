# Vercel to Cloudflare Workers migration

Date: 2026-11-01. Owner: site owner. Executed by Claude (Fable orchestrating, Opus 5.5 agents implementing).

## Why

- hushbook.app DNS is already a proxied Cloudflare zone (account c4136fa0..., Free plan). Every request today hops Cloudflare to Vercel and nothing is edge cached.
- Vercel Hobby forbids commercial use; Workers free tier allows it with unlimited static bandwidth.
- One vendor, faster deploys.

## Target

Cloudflare Workers with Static Assets (not Pages). One Worker named `hushbook` serves the committed HTML from the repo root, with `.assetsignore` filtering what ships.

| Vercel feature | Cloudflare equivalent |
|---|---|
| `cleanUrls: true`, `trailingSlash: false` | `assets.html_handling = "drop-trailing-slash"` |
| `404.html` | `assets.not_found_handling = "404-page"` |
| 15 plain redirects (legacy locales, `/privacy`, `/download`, `/:locale/about` ...) | `_redirects` file, generated |
| 20 cookie + 20 geo locale redirects on `/`, bot user agents exempt | `src/worker.mjs` + `src/routing.mjs`, rules in generated `src/locale-rules.json`; `run_worker_first: ["/", "/*=*", "!/assets/*"]` so `/` and tracking-param paths reach the Worker before the 404 page |
| `middleware.js` tracking-param normaliser | `src/tracking.mjs`, called from the Worker (non-asset paths always reach the Worker) |
| 45 header rules (security, immutable assets, Content-Language) | `_headers` file, generated |
| `X-Robots-Tag: noindex` on `*.vercel.app` | `_headers` rule for `https://:worker.:subdomain.workers.dev/*`, plus the Worker adds it on responses it builds itself |
| `www.hushbook.app` redirect | Dropped: `www` has no DNS record today |
| Git integration deploy on push | `.github/workflows/deploy.yml` running `wrangler deploy` (needs `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` repo secrets); local `npm run deploy` meanwhile |

Single source of truth stays `localization.config.js`. `scripts/build-cloudflare-config.js` regenerates `_redirects`, `_headers` and `src/locale-rules.json` from it (replaces `scripts/build-vercel-locales.js`).

## Status codes

Vercel: permanent 308, temporary 307. Keep: `_redirects` lines use 308, locale redirects 307, tracking normaliser 308. Workers' own clean-URL and trailing-slash redirects are 307 where Vercel sent 308; accepted, canonicals point at the clean URL.

## Cutover and rollback

1. Deploy with `workers_dev: true` and no routes. Verify `https://hushbook.<subdomain>.workers.dev` against the production snapshot.
2. Add `routes: [{ pattern: "hushbook.app/*", zone_name: "hushbook.app" }]` and deploy. The existing proxied DNS record stays; the route captures traffic before it reaches Vercel.
3. Verify production against the snapshot again. Ping IndexNow with the sitemap.
4. Rollback = remove the route and deploy (seconds). Vercel keeps serving unchanged in the background until it is disconnected.

Vercel files (`vercel.json`, `middleware.js`, `.vercel/`, `.vercelignore`, `scripts/build-vercel-locales.js`) stay for one week after cutover, then get deleted and the Vercel project disconnected in the Vercel dashboard.

## Verification

- `worker.test.js`: unit tests for routing (every country and cookie locale, `hushbook_locale=en` suppresses geo, bot user agents bypass, non-root paths untouched), tracking normalisation and the workers.dev noindex header.
- `scripts/vercel-parity.js`: replays every `vercel.json` redirect and header rule against the Cloudflare stack. Must pass before cutover; deleted with `vercel.json`.
- `scripts/site-snapshot.js --base <url> --out <file>` records status, location, content type, cache, robots, language headers, canonical, hreflang and a body hash for every sitemap URL plus redirect and asset probes, with normal, Googlebot and cookie variants. `--diff before.json after.json` must be empty except accepted differences (307 vs 308, files newly excluded by `.assetsignore`).
- Accepted differences found while building: Vercel only exempted a bare `Googlebot` user agent (anchored regex), the Worker exempts real crawler strings; `/es/index.html` lands on `/es-ES` in two hops either way; Worker-built redirects carry no `_headers` values, same as Vercel.
- Line endings: `.gitattributes` forces LF so a Windows checkout ships the same bytes as git and CI.
- Search Console: nothing to change. Domain property is DNS verified. Watch Crawl stats for two weeks.

## Manual checks in the Cloudflare dashboard (zone settings, not readable with the wrangler token)

- Bots: "Block AI bots" must be off (ClaudeBot, GPTBot, PerplexityBot must keep crawling the blog).
- Speed: Rocket Loader, Auto Minify, Email Address Obfuscation off (they rewrite HTML).
- These apply already today because the zone is proxied, so they are not migration regressions.
