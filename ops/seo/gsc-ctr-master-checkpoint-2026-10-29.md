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


## Continuation checkpoint — October 29, 2026 (after #6364)

**This is an execution checkpoint, not a complete all-indexable URL audit. Refresh GitHub main and these PRs before more changes.**

### Additional completed production-code batches
- **#6350 merged:** extend EXISTING `scripts/ci/audit-production-pages.mjs` to record JSON-LD parse validity and type inventory, visible/schema breadcrumbs, OG title/description/image, description quality and repeated editorial OG image warnings. Parser tests added to existing premerge. The full-site crawl was **not** run or enabled.
- **#6352 merged:** Don Haskins Center has 229 finalized GSC impressions, 0 clicks, position 14.80; verified UTEP arena capacity 12,000. Replace generic parking/event SERP focus with capacity/visitor intent; original CTR validator and dated experiment ledger updated.
- **#6358 merged:** broad `uil 6a football districts` query impressions overwhelmingly landed on the specific District 6-6A page (26/28), rather than the statewide directory. Strengthen the directory's broad 6A ownership, the 6A section anchor and the breadcrumb links from district pages. Preserve each page's unique canonical and owner-deferred win/loss automation.
- **#6359 merged:** correctly classify malformed JSON-LD findings in the existing snippet classifier as TECHNICAL SNIPPET DEFECT; optional OG image warnings remain nonblocking.
- **#6364 merged:** Bands of America San Antonio Super Regional has 330 GSC impressions, 1 click, position 9.35. Music for All and the Alamodome independently confirm November 6–7, 2026. Search title now leads with verified dates, description gives ticket/schedule utility. The event lifecycle test retires that year's title after November 7. Preserve editorial H1 and self-canonical.
- **#6365 OPEN, auto-merge enabled, verify CI:** integrate optional finalized seven-day GSC page CSV and derive prior-21-day CTR/position comparisons from the existing 28-day snapshot. This fixes differing CSV headers and quoted URLs without adding a second crawler. Source snapshots remain explicit opt-in and never masquerade as current GSC.

### Preserved and inspected
- Rio Grande river guide already answers 49,387 square miles for the Texas portion of the largest watershed and links the distinct basin guide. `/article/texas-rivers-explained` and `/article/texas-river-basins-guide` protected titles were not rewritten.
- Football playoff guide already directly answers `what does bi district mean`; it owns 46/48 impressions for that query. No title churn or false cannibalization.
- Query `painted churches of texas map` splits 75 impressions to dedicated map and 71 to statewide hub; existing mapping intent separation was maintained to gather more data.
- Last seven finalized days (October 20–26): Texas Lakes & Reservoirs average position ~7.2 versus prior 21 days ~14.4, and Painted Churches hub ~8.6 versus ~12.6. Preserve rising snippets.
- `/sports-venue/freeman-coliseum` and `/sports-venue/united-supermarkets-arena`: significant page impressions but nearly no disclosed queries. Do not guess a title from GSC's anonymized-query samples.
- `/destination/moody-gardens` average position ~47, Dallas nearby things-to-do ~58 and home equity calculator ~83 are **ranking-first**, not automatic CTR title candidates.

### Deployment and remaining work
- Production publishing is through GitHub Actions `deploy-production.yml`, not direct Cloudflare deploy. When last checked, production workflow runs were **pending/queued** on fresh main commits. A successful main merge or a 100%-traffic Cloudflare Worker timestamp is **not** sufficient to certify exact title HTML. Check actual production HTML after a successful workflow.
- Owner hold on `.github/workflows/audit-whole-site-production.yml` and `.github/workflows/audit-site-quality-local.yml` explicitly prohibits broad sitewide crawls, including local Worker, until authorization is reconciled. These remain disabled. **4,052 GSC page-performance rows are not the total indexable route inventory.**
- Full sitemap/HTML crawl, actual one-primary-state classification for *every indexable URL*, production duplicate checks, full change ledger and deployment acceptance remain **not complete**. Do not claim completion and do not re-run unrelated full-site audits.
- Continue with targeted live GSC page/query reads and source-backed changes. Review PR #6365 CI, other concurrent PRs, current main before any write. Only merge green checks safely; do independent work rather than CI polling.


## October 29 continuation — expired race-event freshness and verified deployment

- **Baseline release confirmation:** GitHub Actions `Deploy TexasDefined production` run [40951696836](https://github.com/keeptxred/TexasDefined/actions/runs/40951696836) succeeded on main SHA `d4ca2d32410fe8f4ae771247d61cf7464785a134`. This proves that main SHA's deployment succeeded, not that newer unmerged PRs are live. Verify final HTML/metadata on production after those merge and deploy.
- **#6370 still open when recorded, auto-merge enabled:** Historical Heart O' Texas Fair & Rodeo dates, gate hours and $18 general admission are explicitly labeled 2026-only, rather than promoted as current. The original PR hit an overlapping validator addition from concurrent Red River Rivalry work. Rebased to then-current main `d4ca2d3` at new PR head `1da33049d9118f9ecd9c443c6991e4871ec835f8`, preserving the existing Red River tests. Never blindly overwrite `scripts/data/validate-major-event-authority.mjs`.
- **#6375 still open when recorded, auto-merge enabled:** 2026 F1 United States Grand Prix finished October 25, winner Kimi Antonelli (Charles Leclerc second, Max Verstappen third), per [Formula 1 official result](https://www.formula1.com/en/results/2026/races/1297/united-states/race-result). Permanent `/event/formula-1-united-states-grand-prix` page's authority `dateNote` and visitor-planning sections now distinguish the completed edition from future scheduling. No unconfirmed 2027 date or expired 2026 ticket offer. Head `5e32653cd76da0c06279b6ffa79c28bdb8ae252c`. Existing `majorEventGuideOffersAllowed` Texas-local occurrence end guard is preserved.
- **Protected on direct review:** `/texas-state-fair` already announces that the 2026 State Fair concluded October 18; its 2026 operating hours and gate prices are explicitly archived and it links the official organizer for the next edition. The 28-day GSC 794 impressions/2 clicks/position 11.49 and visible `last day of state fair 2026` 39 impressions do **not** justify speculative title churn. Keep current evergreen SEO title and finished-edition body. Various other high-impression authority guides and school pages are protected pending query-level and on-page evidence.
- **Caveat remains:** 4,052 GSC page rows represent search-visible pages, **not** every indexable route. Both owner-disabled sitewide crawl workflows remain held. Continue source-backed page-level work; full one-primary-state classification, full indexable inventory coverage and postmerge production acceptance are unresolved. Do not re-enable those workflows or claim a comprehensive scan occurred.
