# Hill Country fall colors — official foliage feed checkpoint (2026-10-30)

Page: https://texasdefined.com/article/hill-country-fall-colors
Repository: keeptxred/TexasDefined
Branch: `fix/auto-lost-maples-foliage-status-20261030`
PR: [#6446](https://github.com/keeptxred/TexasDefined/pull/6446) — auto-merge enabled, protected checks required

## Previously completed, verified before this change
- PR #6434 merged as commit `86c668d3b328340c93f6e88e82208457b85deca4`: consolidated repetitive Lost Maples/Garner/Guadalupe sections, substantial regional planning, official TPWD links, realistic access/itinerary cautions, FAQ, 8-minute lazy listing reading time and depth safeguards.
- Correctly credited November 2012 Lost Maples hero retained, explicitly not current foliage.
- Existing daily Oct–Nov `.github/workflows/verify-east-texas-foliage-browser.yml` plus weekly `.github/workflows/verify-seasonal-production.yml` verify UI/site behavior; neither was a dated observation feed.
- No broad seasonal or manual audits should be introduced.

## Changes proposed in this follow-up
- `scripts/data/refresh-lost-maples-foliage.mjs` reads only TPWD's official Lost Maples foliage page and requires a dated current-calendar-year observation. It fails closed on unexpected HTML, stale-year report, invalid dates and source errors, without fabricated "peak now" predictions or redistributing long copyrighted excerpts.
- `src/data/generated/lost-maples-foliage-report.json` initially records TPWD's October 21, 2026 observation: sycamores yellowing, maples still green with color beginning on leaf edges. Automated updates change the file **only when a new official dated observation is found**.
- `src/components/editorial/LostMaplesFoliageStatus.tsx` renders the source date and narrow paraphrases only while the report is at most 14 days old. Otherwise it explicitly suppresses observations and directs visitors to TPWD. Conditions for Garner and Guadalupe are never inferred from Lost Maples.
- `src/routes/article.$slug.tsx` adds the report widget to Hill Country fall-color guidance, keeps existing licensed image and evergreen canonical URL, and removes a hardcoded 2026 from the live report link.
- Existing Hill Country park references are now real contextual TPWD links (Lost Maples report/alerts, Garner and Guadalupe), the regional FAQ questions are h3 and eligible for the same factual FAQ schema as the East Texas page; the substantive correction is dated October 30, 2026.
- `.github/workflows/refresh-lost-maples-foliage.yml` runs daily in October/November each year (also dispatchable) and opens a generated-data-only PR only for new official evidence; the trusted `finish-lost-maples-foliage.yml` validates bot origin, JSON-only diff, static species phrasing and protected workflows before auto-merge. No recurring human review or direct protected-main writes.
- Parser year-rollover and non-inference tests plus browser and source-level regression assertions are included.

## Validation/recovery note
- The initial PR run revealed a validator reference-before-initialization error, which was corrected in follow-up commit `ad2874ac18a19af4ba0653bb8f7ddf7aaca5bf87` before merging. Re-run required CI; do not interpret the first failed check as a production failure.

## Required final verification / guardrails
- PR must pass the existing required merge gate; do not bypass branch protection. Auto-merge may handle it after checks.
- Verify successful protected-main merge **and** successful production deploy before claiming the widget is publicly live.
- Run one scoped live desktop/mobile acceptance after deploy; no repeated cloud browser polling, no site-wide audit and no Cloudflare reconnection.
- Keep this a *Lost Maples* dated report. Do not show it as live foliage for other parks; do not fabricate East Texas peak statuses.
- If the TPWD HTML changes and parser fails, the site automatically falls back to old-date disclosure rather than a false freshness claim. The GitHub run failure is the automated diagnostic.
