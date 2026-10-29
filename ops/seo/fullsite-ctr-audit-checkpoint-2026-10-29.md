# TexasDefined full-site snippet and CTR project checkpoint — 2026-10-29

**Status: PARTIALLY IMPLEMENTED, NOT complete.** Do not archive as a finished whole-site audit. The user's instruction was to audit every indexable page, not only GSC pages. The repository's full-site HTTP crawl remains held by the prior owner restriction and cannot be claimed as executed here.

## Source of truth and evidence

- Repo: `keeptxred/TexasDefined`; on each write refresh `main`; preserve concurrent merges.
- Site: `https://texasdefined.com`.
- Authenticated GSC property: `sc-domain:texasdefined.com`; Web Search; **finalized 2026-09-29–2026-10-26**, no fabricated metrics.
- Exact **4,052 GSC page rows**, complete / untruncated: `ops/seo/gsc-web-page-baseline-2026-10-29.csv`. This is **not** a complete indexable sitemap inventory.
- Exact **9,214 GSC query rows**, complete / untruncated: `ops/seo/gsc-web-query-baseline-2026-10-29.csv` (submitted in this PR). Privacy-suppressed query rows are not counted.
- Review bands: **303** pages with >=100 impressions; **216** with >=100 impressions, position 3–20 and CTR under 2% (review candidates only), **34** with >=100 impressions and position >20 (ranking-first candidates).
- Dated GSC summaries: `ops/seo/gsc-web-ctr-triage-2026-10-29.json`; targeted query/page ownership: `ops/seo/gsc-query-ownership-2026-10-29.json`.
- Detailed old/new copy and experiment baseline: `ops/seo/ctr-experiments-2026-10-29.json`.

## Completed GitHub changes

1. **#6338 merged** (commit `852807f2d323e28cc0933271265952c06cc504d3`): Palestine Polar Express search title/description, Texas Cultural Regions SSR search override, current event lifecycle vs old 2026 CTR validator contract, dated baseline ledger. Required Merge Gate success.
2. **#6339 merged** (`c8e80c47d067ca8d0b2377a7434bab2c617c7c8b`): complete GSC page export, grouped scoring/review-bands, not a blanket title rewrite.
3. **#6340 merged** (`3772e0ef989727946061c3b9ba9b6bda09a44a74`): existing production HTML auditor optionally imports GSC CSV using `GSC_CTR_BASELINE_FILE=ops/seo/gsc-web-page-baseline-2026-10-29.csv`, distinguishes measured ranking and CTR review, keeps metadata defects highest priority, small sample protection, regression tests. Does not automatically load a stale dated snapshot.
4. **#6341 merged** (`0d3bd4c8d0400982e7986bd3db258d004da4f9c1`): DATCU Stadium source-verified 30,100 seat capacity query title/description and updated validator contract, preserved H1/canonical.
5. **#6342**: Texarkana GSC query cannibalization. Proposed focused broad hub vs dedicated day-trip title/description, stronger hub-to-day-trip link and metro validator contract; check current PR state before claiming merged.
6. **This PR**: finalized 9,214-query export, owner-check ledger, durable checkpoint.

## Query ownership checks and deliberate no-churn

- "painted churches of texas map": map 75 impressions, hub 71. Map owns exact map intent and remains separate; recent correct architecture/link was preserved, not undone.
- "day trips from texarkana": general hub 85 of 92 impressions; dedicated day-trips page six. Targeted fix #6342, no canonical merging.
- "rivers": 274 impressions on protected major rivers guide, leave intact. Keep distinct major-rivers vs river-basins intent.
- "what does bi district mean": football playoffs explainer owns 46/48 visible impressions; preserve existing page and H1.
- "district standings": 61 varied results, one generic query cannot sensibly designate one statewide owner, and standings automation remains deferred.
- Ranking-first examples intentionally not retitled: Moody Gardens (2,549 impressions, position 47.39), Dallas things to do (931, position 58.25), home equity calculator (504, position 83.14), Martin Creek Lake RV area (589, position 47.41).
- Protect ISD explainer, homecoming mums, Painted Churches map, river overview, river basin guide, Addison Oktoberfest evergreen after 2026 edition, Sweetwater 2027 projected not confirmed.

## Remaining requirements / blocker

1. **Full indexable URL enumeration and live per-page HTML inspection not run.** Existing `.github/workflows/audit-site-quality-local.yml` intentionally has an October 19 owner hold (`if: ${{ false }}`) against sitewide crawls. Do not silently remove or reactivate this safeguard. The existing full-site HTML auditor `scripts/ci/audit-production-pages.mjs` is ready, and #6340 adds optional GSC classification; requires an approved one-time execution route / authorized audit environment without recurring Cloudflare CPU cost. Source inventory and GSC are not substitutes for auditing every sitemap-listed URL.
2. **Schema/OG/robots/canonicals/breadcrumbs across every URL** not fully verified. Confirm and correct via permitted HTML crawl, not fabricated checks.
3. **Production verification by URL** not yet established for all merged changes. Cloudflare worker `texasdefined-site` was reachable and had a 100%-traffic deployment at 2026-10-29 19:29:53 UTC; deployment version lacks Git SHA correlation. Web crawled old Palestine title after merge, potentially cached. Verify fresh HTML / deployment Git SHA linkage before claiming live.
4. **CTR experiment follow-up:** compare finalized 7- and 28-day post-deploy Search Console snapshots with baselines and similar ranking/query mix, do not churn same titles too quickly.
5. **CI concurrency:** check PR #6342 and this PR's state, required merge gates, auto-merge then exact main SHA, without polling loop. If CI fails, repair rather than delete tests.

## Recovery plan

On next session, read this checkpoint and live `main` and PRs **#6338–#6342** plus query-baseline PR. Do not repeat completed changes. Resolve owner-held sitewide crawl via a safe, authorized once-off execution environment rather than re-enabling routine expensive whole-site scans. Then run real sitewide HTML audit + GSC join, classify every actual indexable URL, implement all verified defects in narrow batched PRs, merge on green, and verify live page source. **Do not call the project complete until then.**
