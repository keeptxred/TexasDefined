# TexasDefined — Google Snippet / CTR Master Execution Checkpoint

**Checkpoint recorded:** 2026-10-29, after merging PR #6346. **Always refresh current `main` and PR states before resuming.** This is an execution checkpoint, **not** a claim of a finished all-indexable HTML audit.

## Original mission
Audit EVERY indexable TexasDefined.com URL, using production sitemap registries and actual page metadata, classify exactly one of KEEP / CTR IMPROVEMENT / RANKING PROBLEM / INTENT CONFLICT / TECHNICAL SNIPPET DEFECT; use finalized GSC page and query evidence to prioritize; implement justified fixes in conflict-safe batches, merge after CI and verify production. No rewrites of strong snippets merely for novelty. User explicitly requests uninterrupted batching and forbids getting stuck polling workflows.

## Verified merged implementation and data (before this checkpoint)
- **#6338** merged: GSC-backed Palestine Polar Express and Texas Cultural Regions snippets; reconcile expired Heart O' Texas and State Fair raw CTR contracts with runtime lifecycle validation. `ops/seo/ctr-experiments-2026-10-29.json`.
- **#6339** merged: `ops/seo/gsc-web-page-baseline-2026-10-29.csv` and `ops/seo/gsc-web-ctr-triage-2026-10-29.json`, **4,052** complete finalized GSC Web Search page rows for 2026-09-29–2026-10-26 (NOT the complete indexable URL list); **303** pages with >=100 impressions, **216** conservative CTR screening candidates at positions 3–20 and <2% CTR, **34** position >20 ranking-first candidates.
- **#6340** merged: extend EXISTING `scripts/ci/audit-production-pages.mjs` + `snippet-classification.mjs` to optionally join the dated page baseline via `GSC_CTR_BASELINE_FILE=ops/seo/gsc-web-page-baseline-2026-10-29.csv`, with tests and no crawl workflow re-enabling. This is only a *review-screening* algorithm, never auto-rewrite proof.
- **#6341** merged: DATCU Stadium capacity query intent (30,100 official UNT athletics), update legacy CTR expectation; ledger baseline 451 impressions, 0 clicks, avg pos 9.42.
- **#6342** merged: `day trips from texarkana` query had 92 impressions, broad hub took 85, dedicated child just six. Clarified broad hub SEO vs dedicated day trips, added descriptive hub link and preserved separate self-canonicals; existing metro validator safeguards.
- **#6344** merged: full **9,214** finalized 28-day query rows `ops/seo/gsc-web-query-baseline-2026-10-29.csv`, plus **3,491** finalized 7-day page rows `ops/seo/gsc-web-page-7d-baseline-2026-10-29.csv` (2026-10-20–26). GSC anonymizes very rare queries.
- **#6346** merged: remove duplicate publisher branding throughout casino guide route (was passing titles with `| Texas Defined` to `buildMeta`, which appends publisher itself); Naskila Leggett query snippet specifies temporary casino/US 59 address/24-hour venue per official operator, and Galveston Bay uses estuary/fishing/shoreline intent rather than generic travel guide. GSC baselines and validator added.
- **#6348** opened with auto-merge, status at checkpoint **pending**: replace the *expired* 2026 Texas Rose Festival title/description and stale validator expectation with evergreen visitor wording; preserve separate organizer-confirmed October 16, 2027 **parade** fact without pretending whole 2027 festival is confirmed. Source: official texasrosefestival.org and strutters.org. Adds lifecycle regression and standalone GSC experiment ledger.

## High-value protected snippets NOT to casually rewrite
- `/article/texas-rivers-explained`: **Major Rivers in Texas: Boundary Rivers, Regions & Map**.
- `/article/texas-river-basins-guide`: **Texas River Basins: 15 Major, 8 Coastal & Watershed Map**. These two intents stay separate.
- `/article/texas-school-districts-explained`: **What Does ISD Stand For in Texas? School District Guide**, description mentioning `find your ISD by address`.
- `/texas-homecoming-mums`: **Texas Homecoming Mums: History, Meaning, Colors & Traditions**.
- `/explore/painted-churches/map` is the dedicated map intent; `/explore/painted-churches` broad hub remains useful. Finalized query `painted churches of texas map`: map 75 impressions, hub 71; preserve separation, allow more data.
- Addison Oktoberfest 2026 ended: evergreen/pending next occurrence, do not restore obsolete year.
- Sweetwater Rattlesnake Roundup 2027 projected dates remain **projected**, not confirmed.
- `/texas-two-step` current title explicitly says lottery; do not turn generic 2-step dance or lottery ambiguous query into unsupported changes.

## Ranking vs CTR
- `/destination/moody-gardens`: 2,549 impressions, average pos ~47, **RANKING FIRST**, no superficial title churn.
- `/explore/near/dallas/things-to-do`: 931 impressions, avg pos ~58, ranking/content first.
- `/texas-home-equity-calculator`: 504 impressions, avg pos ~83, ranking first.
- `/article/best-native-plants-texas-yard`: 179 impressions, avg pos ~61, ranking first.
- `/sports-venue/freeman-coliseum` 677 impressions/pos ~9 but visible query breakdown nearly entirely anonymized (1 visible query), so don't guess the search intent from sparse sampled query evidence.
- `/article/texas-six-man-football-rules-explained`: 1,413 impressions/pos ~6.35, 11 clicks; visible query intent already matches six-man football rules; no blind title rewrite.
- `/article/texas-high-school-football-playoffs-explained`: 6,893 impressions/pos ~5.73, 93 clicks, most query mix anonymized; inspect existing title/current work before editing; multiple sports/football chats work concurrently.
- User has separately deferred live win/loss/standings automations on district/team pages; do not stomp those workflows.

## Technical and content rules
- `src/lib/seo.ts` implements SSR SEO overrides, title budgeting, event lifecycle snippets; `scripts/data/validate-gsc-page-one-ctr.mjs` is existing contract. *Update* stale contracts, do not make a parallel competing validator.
- Production deployment only via `.github/workflows/deploy-production.yml` main push. Direct deploy disabled by `package.json`.
- The existing production full-site crawler is **owner-held/disabled** for cost and load reasons; do not enable or dispatch it without first reconciling owner constraint. This is a genuine coverage limitation, not permission to mark 4,052 GSC rows as fully audited URLs.
- Always refresh main before material writes; prefer small branches and conflict-resistant commits. Open compatible PRs, enable auto-merge, work on other independent batches during CI. No Cloudflare reconnect loops or repeated workflow polling. Preserve all canonical, robots/indexation, Discover image licensing/quality guards, sitemaps, H1 separation, source-backed page facts.
- GSC 28-day finalized 2026-09-29–2026-10-26 and 7-day 2026-10-20–26 are *historical baselines*, not today's live CTR. Avoid overreacting to sparse samples or immediate after-deploy metrics.
- `GSC_CTR_BASELINE_FILE` must be set explicitly when using dated GSC joins in future whole-site HTML inspections; default auditor should not silently rely on old 2026 measurements.

## Remaining major work, IN PRIORITY ORDER
1. Check #6348 CI/merge status, reconcile any concurrent `main` changes, and verify production deploy on latest merged SEO commit. Earlier Cloudflare deployment times alone were NOT enough to prove exact snippet was live.
2. Finish systematic current-indexable inventory: sitemap indexes, sub-sitemaps, route registries, dynamic entity quality/indexability, production HTML metadata. **Do not count GSC URL rows as an indexable universe.** Full HTML verification remains bounded by owner-held crawler unless a safe authorized alternative is available.
3. Investigate additional high-impression low-CTR candidates by **targeted** GSC page-to-query and query-to-page reads (never bulk page+query grouping); prioritize real intent ownership and technical defects.
4. Address genuine new technical defects with source-safe batches. Do not disturb user’s concurrent football, event marketplace, painted churches, hunting, camping, and other authority work.
5. Finish classifications (one primary state per *actual indexable* URL), duplicate and cannibalization checks, event lifecycle and SEO contract reconciliation, and complete production verification with a final changed-pages table.
6. Record CTR experiments with old/new title and description and exact baseline/cutover dates; allow finalized 28-day post-change comparison before re-optimizing.

## Quick resume instructions
Read this checkpoint, fetch fresh current `main`, inspect PRs #6348 and any subsequent related PRs, then inspect ledger and GSC CSVs. Continue *implementation*, don't produce another audit-only report. If the full-site HTML crawl remains owner-held, be explicit about the remaining coverage gap and continue safe targeted work without claiming project completion.
