# TexasDefined traffic-growth production closure — October 14, 2026

> Current evidence ledger. Status vocabulary: **COMPLETE**, **COMPLETE — awaiting measurement**, **BLOCKED — external dependency**, **INCOMPLETE**. A merged PR is not proof of successful production verification. Other chats advance `main` concurrently; all SHAs below are **time-stamped snapshots**, not deployment locks.

## October 15 follow-on — new evidence, protected changes

This update supersedes **only** the earlier link-graph numbers and workflow states; the rest of the ledger remains historical work requiring current verification. These GitHub Actions timestamps are UTC.

- Strict production graph [run 38661488617](https://github.com/keeptxred/TexasDefined/actions/runs/38661488617), run against main SHA `56c5fe5f386e9599606d51f0019adbec6cf230e4`: **4,279 sitemap URLs, 4,278 indexable HTML pages, 0 orphans, 33 high-value weak-discovery pages, 37 unresolved internal targets, 1 redirect**. Of the 37, **2 are confirmed 404 responses and 35 are HTTP-status-0 football ISD transport failures**. Do **not** call all 37 missing pages. The earlier audit [38648084741](https://github.com/keeptxred/TexasDefined/actions/runs/38648084741) found 5 failed targets (3 HTTP 404, 2 status 0) and one redirect; transport noise varied materially, so counts are not like-for-like content regressions.
- [PR #4934](https://github.com/keeptxred/TexasDefined/pull/4934) merged as `9e5f7884586bf5e3d77492e612bb4a43f0fba78e` after a passing canonical Merge Gate. It corrects the `/explore/events` and `/explore/region/panhandle-plains` links, replaces the redundant George Ranch legacy county redirect with a rights-neutral verified Brazos River context link while retaining direct county discovery, and aligns football ISD profile URL generation with its actual lookup slug. It **does not** establish that 35 failed football ISD HTTP requests are resolved; deployment and a subsequent exact-SHA graph still determine production closure.
- [PR #4938](https://github.com/keeptxred/TexasDefined/pull/4938) merged as `dc962957fcd990fb38a088cff3abb14ab49b9603` after passing its protected gate. It adds five genuinely topical link edges among Texas traditions, the seasonal bucket list, Stockyards, San Antonio Rodeo and strange Texas town names. This is **not** a claim that every one-inbound page should receive manufactured links. Recount after deployment.
- **GSC access blocker reconfirmed:** HYPD's `search_console_list_sites` returned no accessible properties. Windsor.ai reports TexasDefined and KeepTXRed property names in its connector inventory, but `get_data` returned a **Free-plan account limit message masquerading as a row of zero clicks/impressions** (six connected accounts versus one permitted). That row is **not Google data** and must not be counted. Do not upgrade or disconnect other accounts without approval.
- [PR #4940](https://github.com/keeptxred/TexasDefined/pull/4940) proposes adding deterministic page-level snippet classifications, evidence, HTML-verification status and a TSV export to the **existing** weekly full-site production audit. The five classifications are triage categories, **not** proven CTR outcomes; a successful future crawl is required before its 4,279-page results can be reported.
- The October 14 authentic-image decision ledger for the Del Rio depot and Stephen F. Austin Experimental Forest explicitly preserves genuine 640px/800px subject photographs while larger rights-cleared originals remain unverified. Do not suppress Discover blockers or invent dimensions.

**Still INCOMPLETE:** production deployment verification of the merged PRs, an uncancelled strict link graph after deployment, diagnosis of the 35 ISD status-0 fetches, page-level content/search-intent acceptance for every canonical page, remaining editorial link discovery, correct-image rights gaps, and actual finalized GSC results. Technical merge success is not traffic improvement.

## Recovery snapshot

- Repository: `keeptxred/TexasDefined`; current `main` at ledger preparation: `cbf60ee4477cb91632af4c4ee00f9546a8ce4587`.
- Latest *successfully concluded* production deployment identified in this recovery: [run 38592130378](https://github.com/keeptxred/TexasDefined/actions/runs/38592130378), SHA `7832a876e1fd83185a1d3c9319ff8009e0384e24`.
- A subsequent [deployment 38592377154](https://github.com/keeptxred/TexasDefined/actions/runs/38592377154) did deploy the Cloudflare bundle for SHA `8323607322b5e94ac41f96b11fd3bf9457aaa1d7`, but its mandatory live verification **failed**, with the exact error **“Tarrant County structured community coverage is missing Hurst.”** Do not call it a certified success merely because the worker uploaded.
- [PR #4521](https://github.com/keeptxred/TexasDefined/pull/4521) merged as `909eecd1d708938c570683980d812d9174895226` on October 14: systemic internal-link remediation.
- [PR #4529](https://github.com/keeptxred/TexasDefined/pull/4529) merged as `ca73c84b761b4ece1daab1182e103e7a0090ec4f` on October 9 (America/Chicago): the nine-lake 41-to-50 expansion.
- Current `src/data/fishing/slugs.ts` and `scripts/data/validate-fishing-lakes-directory.mjs` have advanced **beyond** that milestone to **70 complete guides = 10 base + 5 wave two + 55 statewide-network**. Do not roll back to 50.

## Production internal-link graph

| Cohort / defect | Earlier independent crawl | Latest post-#4521 strict crawl |
|---|---:|---:|
| Eligible/indexable pages | 3,780 | **4,262** |
| Zero inbound/orphans | 0 | **0** |
| Exactly one inbound | 140 | **122** |
| Two–three inbound | 276 | **299** |
| Four-plus inbound | 3,364 | **3,841** |
| Broken internal targets | 48 (later historic richer crawl) | **68** |
| Redirected internal targets | 39 (later historic richer crawl) | **18** |
| High-value pages with at most one inbound | not comparable | **33** |

Earlier 3,780-page sitemap crawl: [37937214125](https://github.com/keeptxred/TexasDefined/actions/runs/37937214125). Earlier richer crawl had 48 broken / 39 redirected: [38020427712](https://github.com/keeptxred/TexasDefined/actions/runs/38020427712). Latest post-fix strict audit: [38592193957](https://github.com/keeptxred/TexasDefined/actions/runs/38592193957), checked deployment SHA `7832a876`, artifact **production-internal-link-graph**, generated 2026-10-14 15:57:43 UTC. It failed strict validation and audited 4,263 sitemap-owned URLs, of which 4,262 were indexable.

**Not a like-for-like improvement series:** the 3,780-page, 48/39 and 4,262-page crawls use different dates/eligibility definitions, so never infer a rate change without denominator normalization. Latest broken sources include nine aquarium guides linking `/explore/guides` (404; should be `/guides`), four Panhandle pages linking `/explore/region/panhandle-plains` instead of the canonical `/explore/region/panhandle`, legacy state-park/destination/county aliases, 404 category/article links, malformed human-readable official citations encoded as `/article/TPWD%20...` or similar, and football ISD links with status 0 (investigate fetch availability and exact owner before relinking). Eighteen internal redirects remain and should become direct canonical links where appropriate. Neither duplicate doorway pages nor relaxed crawl checks are acceptable.

**Status: INCOMPLETE** — zero orphans achieved, but 68 broken, 18 redirects and 33 high-value one-inbound pages remain; strict graph is red.

## Fishing and live-water controls

- Current complete lake registry: **70**; the nine from PR #4529 are included. Registry/test asserts 70 rather than obsolete 50.
- Full lake-authority production acceptance [38593740523](https://github.com/keeptxred/TexasDefined/actions/runs/38593740523) on `83236073` checked **70** lake overviews and found **two** exceptions: `/fishing/lakes/lake-cypress-springs` and `/fishing/lakes/aquilla-lake` lack a **visible governed image with labeled photographer/license attribution** in live markup; rights information in the repository image library by itself is insufficient.
- Live-water production test [38592193316](https://github.com/keeptxred/TexasDefined/actions/runs/38592193316) passed on the earlier `7832a876` deployment. Validate again after the current candidate deploy. Preserve Lake Casa Blanca’s official-source fallback **without** fake numerical live gauges, and preserve Lake Colorado City's TPWD recovery/poor-fishery framing.
- **Status: INCOMPLETE** — 70 implemented and 50 milestone exceeded, but latest 70-page acceptance is red.

## Discover/images, events, metro, relocation, structured data and SEO

| Initiative | Status | Production evidence or outstanding issue |
|---|---|---|
| Discover / image quality | **INCOMPLETE** | [Image/Discover audit 38593742238](https://github.com/keeptxred/TexasDefined/actions/runs/38593742238) checked 1,703 priority pages; 2 **blocking**: 640px Del Rio Southern Pacific Passenger Depot hero and 800px Stephen F. Austin Experimental Forest hero; 1,389 nonblocking warnings. Use genuine exact-subject rights-cleared larger files, never just alter declared pixel dimensions or enlarge low-res source. |
| Weekend and major event discovery | **COMPLETE — awaiting measurement** | Live `/events/this-weekend` displayed upcoming October 16–18, 2026 dates and 16 matching guides on October 14; [Events system run 38593867246](https://github.com/keeptxred/TexasDefined/actions/runs/38593867246) succeeded. Individual categories, city weekends, canceled/rescheduled lifecycle, anchors, and schema need latest-deploy matrix before unqualified COMPLETE. |
| Metro proximity | **INCOMPLETE** | Houston, Dallas–Fort Worth, Austin and San Antonio discovery inventory and non-doorway safeguards must pass representative live matrix, not just presence of routes. |
| Relocation | **COMPLETE — awaiting measurement** | `/moving-to-texas` serves editorial hub; earlier [production relocation run 37933771259](https://github.com/keeptxred/TexasDefined/actions/runs/37933771259) succeeded. Reverify current deploy and CA/FL links at canonical owners; no new CTR outcome inferred. |
| Structured Event/Breadcrumb/Collection schema | **INCOMPLETE** | Event verifier in latest production deploy reported pass, but the overall post-deploy gate failed and current full schema family matrix is not certified. |
| Technical SEO, sitemap, canonical | **INCOMPLETE** | Production XML check found **4,044 unique sitemap URLs** with valid XML, but [verify sitemap 38593742736](https://github.com/keeptxred/TexasDefined/actions/runs/38593742736) then failed: indexable `/destination/first-capitol-of-texas` absent from Explore sitemap. Retain THC Not Open / trip-planner exclusion. Revalidate after any fix; sitemap XML success is not full certification. |
| Internal discovery/linking | **INCOMPLETE** | 0 orphans, but 68 broken/18 redirects remain (see graph). |
| Fishing discovery/data | **INCOMPLETE** | 70 authoritative slugs and species wiring; two governed image attributions failed current live acceptance. |
| GSC CTR measurement | **BLOCKED — external dependency** | See below. |
| Backlink outcomes / citation magnets | **INCOMPLETE** | See below. |

## Search Console CTR outcomes and real traffic

- HYPD Search Console returned **zero accessible site properties** at this snapshot.
- Supabase `public.gsc_page_daily_metrics` had **zero** rows whose URL contains `texasdefined.com`, versus **1,322** rows overall; do **not** substitute KeepTXRed rows, Google Analytics sessions, or invented zeros for Search Console CTR/impressions/position.
- Authorized GA4 **TexasDefined** property `properties/552999834` is connected; October 1–13 landing pages had real recorded sessions (for example, `/texas-state-fair` 180 and `/texas-toll-tags` 82). **GA4 sessions are not Google Search CTR data.**
- Historical GSC window 2026-08-31 to 2026-09-27 (from `ops/editorial/events-live-search-growth-audit-2026-09-30.md`) was already documented: `/events` 157 impressions/2 clicks/position 32.43; `/events/rodeos` 63/1/6.81; `/events/big-bend-events` 66/0/7.80. These are **historical**, not change outcomes; sample size was small.
- **Status: BLOCKED — external dependency**. Restore authorized TexasDefined Search Console access/import, wait for finalized comparable data, control for position and query mix, then classify winners/losers and update only demonstrated title/meta losers; do not purchase new third-party subscriptions without authorization.

## Backlinks and source relationships

- Supabase `public.texasdefined_backlink_prospects` currently has **101** records; all `backlink_status` fields were **`not-linked`** at the October 14 recheck. **0 prospect-database-verified linking URLs and referring domains** can be claimed. This is not proof no external backlinks exist.
- Earlier aggregate: 100 email contact paths (one legitimate form-only entry), 47 outreach dates, 43 follow-up-stage prospects, one reply, zero verified linking URLs. Current contact/reply-stage counts need a fresh independent aggregation before treating them as current outcomes.
- Do not mass-mail or treat a prospect domain as a verified referring domain. Continue appropriate established source/photo/data accuracy conversations only, and verify any inbound citation URL against the live external page.
- **Status: INCOMPLETE** — outreach outcomes and any externally verifiable links remain unproven.

## Citation-worthy P1 resources

P1 inventory remains `docs/seo/citation-magnet-scorecard.md`: `/texas-data/:datasetSlug`, `/property-tax/counties`, `/property-tax/county/:county`, `/learn/appraisal-districts`, `/texas-data`, `/learn/property-taxes`, and `/find-my-dmv`. Current route inspection confirms the dataset detail has Dataset schema/source and modified date; county comparison/detail and appraisal district pages use visible trust components, canonical owners and indexability gates; the tax explainer has dated official guidance and DMV lookup has structured HowTo. **Presence is not a full methodological/source/export certification.** Dataset-appropriate CSV/JSON downloads, visible provenance/methodology, correction path, date freshness, complete geography, and citation metadata still need individual verification.

**Status: INCOMPLETE** — not all seven P1 classes have proven complete end-to-end citation readiness. Existing good work must not be rebuilt or labeled “unready” solely because a full verification is pending.

## Execution rules and exact next gates

1. Refresh current `main`, any overlapping open PRs and deployed SHA; do not force-push or replay overlapping work.
2. Repair live image dimensions with genuine licensed source images, 2 fishing-image attribution display faults, First Capitol sitemap source selection, and Tarrant/Hurst structured community live check. Never weaken required merge/production checks.
3. Triage the **68 broken** source-target pairs by canonical owner, fix systemic links and real article/source data rather than adding duplicate routes; collect an uncancelled strict replacement graph with the same eligibility denominator and document true after counts.
4. Re-run latest-deployment matrix for the four metros, event hub + city weekends + lifecycle, relocation, fishing, image/Discover, structured data, sitemap, and nearby/discovery pages. Record exact run URLs and merge/deploy SHAs.
5. Resume GSC CTR classification only after access and finalized data, and external backlink verification only after real observed linking URLs; mark those external dependencies honestly.

This file is the only permanent traffic-growth closure ledger; do not create parallel closure ledgers.