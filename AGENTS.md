# AGENTS.md

## Principles

- Cut taglines, helper text and secondary labels. If a screen needs them to make sense, fix the layout.
- Make the best decision that will elevate all three: the user experience (UX), developer experience (DX), and agent experience (AX) always, without breaking anything.

## Deploy

- Hosting: Cloudflare Workers Static Assets (`wrangler.jsonc`, Worker in `src/`, `.assetsignore` decides what ships).
- `npm run build:cf` regenerates `_redirects`, `_headers` and `src/locale-rules.json` from `localization.config.js`.
- Push to `main` deploys through `.github/workflows/deploy.yml`; `npm run deploy` deploys from a logged-in machine.
- Cutover and rollback steps: `docs/migration/cloudflare-workers.md`.
