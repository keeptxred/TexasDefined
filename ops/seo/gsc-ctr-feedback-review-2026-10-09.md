# TexasDefined GSC CTR feedback review — 2026-10-09

## Scope

This is the measurement log for the existing GSC CTR system protected by `scripts/data/validate-gsc-page-one-ctr.mjs` and the server-rendered SEO overrides in `src/lib/seo.ts`. It does not create a second CTR system.

## Current measurement availability

A fresh connected Search Console property lookup on 2026-10-09 returned no accessible properties.

The shared Supabase backend does contain `public.gsc_page_daily_metrics`, but its current rows are for `keeptxred.com` only:

- first metric date: 2026-06-30
- latest metric date: 2026-10-05
- rows: 1,295
- impressions: 3,197
- clicks: 22
- TexasDefined rows: 0

Therefore there is no trustworthy current TexasDefined source for clicks, impressions, CTR, or average position. Do not copy KeepTXRed metrics into this review and do not infer TexasDefined winners or losers from rankings, analytics sessions, Bing data, or cached historical screenshots.

## Classification of previously changed pages

The existing Sep. 25 page-one/near-page-one recovery cohort remains protected, but the cohort cannot yet be classified as winner, neutral, loser, or too-early from current GSC evidence. The correct state is **measurement unavailable**.

Protected priority cohort:

- `/article/texas-rivers-explained`
- `/texas-homecoming-mums`
- `/event/heart-o-texas-fair-rodeo`
- `/article/texas-river-basins-guide`
- `/article/texas-lakes-reservoirs-explained`
- `/article/texas-trinity-river-guide`
- `/sports-venue/jones-att-stadium`
- `/article/texas-settlement-patterns-explained`
- `/event/addison-oktoberfest`
- `/sports-venue/mesquite-memorial-stadium`
- `/explore/painted-churches`

No additional title or meta-description rewrites are justified until current TexasDefined GSC measurements exist. In particular, do not label a low CTR as a snippet failure without also comparing average-position movement.

## Repository-side closure

- Preserve the existing server-only GSC-aligned snippet experiments and description-length guard.
- Run `validate-gsc-page-one-ctr.mjs` in the authoritative full validation suite.
- Protect that validator through the SEO CI contract so later refactors cannot silently drop it.
- Keep the current priority cohort intact rather than creating another competing override list.
- Do not fabricate a next-priority queue without current impressions and positions.

## Data required for the next review

When TexasDefined Search Console access is restored, use a finalized comparable window and capture for each measurable page/query cohort:

1. clicks;
2. impressions;
3. CTR;
4. average position;
5. prior comparable period;
6. absolute and percentage changes where meaningful.

Then classify pages as winner, neutral, loser, too early, or statistically weak. Re-rank the next opportunity queue by expected incremental clicks among URLs with meaningful impressions and roughly positions 3–20.

Until that source is available, repository protections are complete but performance classification remains externally blocked.
