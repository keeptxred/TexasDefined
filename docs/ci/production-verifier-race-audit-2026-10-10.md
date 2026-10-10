# TexasDefined production verifier race audit — October 10, 2026

> **Status: IN PROGRESS / PARTIAL CERTIFICATION.** Full Git tree inventory collected. The labels below distinguish inspected source from the remaining unverified files. This ledger is not a declaration that all GitHub Actions workflows have been audited or that all new changes have merged.

## Baselines and immutable evidence

- Repository: [keeptxred/TexasDefined](https://github.com/keeptxred/TexasDefined); default branch: `main`.
- Working branch: `chatgpt/ci-verifier-race-audit-wave6-20261010` (initial main baseline `49002b20077875600f224b8e7b54305b46a7a737`; latest main observed immediately before ledger write: `49002b20077875600f224b8e7b54305b46a7a737`). Refresh `main` again before review or merge.
- Full recursive Git tree at 49002b20077875600f224b8e7b54305b46a7a737: **194** workflow files, not truncated. Listing below includes every discovered `.github/workflows/*.yml`; it is intentionally broader than the high-risk production subset.
- Historic completed PRs: [#4462](https://github.com/keeptxred/TexasDefined/pull/4462) (`7e86c63a367700bda5ce4aabaadc245762647096`), [#4489](https://github.com/keeptxred/TexasDefined/pull/4489) (`991c3f9dbc34b254d2936a75a5410b72c9cd478e`), and [#4528](https://github.com/keeptxred/TexasDefined/pull/4528) (`cb1f4e1bfe405a3830c5ffeff05aa4568ec57360`) are all merged.
- Prior successful deploy [#38051130783](https://github.com/keeptxred/TexasDefined/actions/runs/38051130783), exact SHA `75b69bbba76ef70730b5a78a4a570dd848946430`: completed success on 2026-10-10; direct Worker, canonical health, sports editorial and final ledger steps succeeded.
- Newer successful deploy [#38063782679](https://github.com/keeptxred/TexasDefined/actions/runs/38063782679), SHA `f8c57a3cb1a29945f303a224fda8e6046103ca9e`: completed success at 2026-10-10 15:35 UTC. Job `114247495535`: Cloudflare build/deploy, direct and canonical health, native sports-venue editorial blocking verifier, full Worker version identity check, rollback-target recording, and final status succeeded. All are recorded in the job steps/logs.
- Worker version deployed and reverified in that run: `f6bb5eed-8c6c-46ff-8593-9b9a10280cd9`; prior version `7db08c7c-b979-4b85-b9c1-a1c62b7974c8`. Log confirmed version remained identical before/after verification; durable GitHub verified-Worker deployment record: `6983008180`.
- Commit `f8c57a...` status record: `texasdefined-production=success`, `texasdefined-live=success`, `texasdefined-cloudflare=success` (verified via GitHub combined commit statuses). Downstream `texasdefined-live-swimming-tubing=success` and some additional statuses appeared. At time inspected, `texasdefined-live-lakes=pending`; **do not label all downstream verifiers complete**.
- More recent main commits may be in flight; the Worker version above is the latest *independently log-verified* version for this audit, not a claim about future deployments.

## Confirmed new defects / proposed correction

1. `verify-football-batch-003-apple-springs.yml`: a PR invoked live Chrome against a fixed post-deployment title; a changed PR expectation could incorrectly fail before deployment. Change to a PR syntax-only job plus explicitly manual live Chrome retest. No new scheduled or production-deploy browser workload.
2. `audit-all-editorial-production.yml`: the existing PR source inventory triggered a 254-county live crawl against the older Worker, masking the PR-live step's errors with `continue-on-error`. Keep the source inventory but execute the live 254-county crawl only on eligible successful deployments or manual invocation. Remove the misleading PR-only error masking.
3. `scripts/ci/validate-post-deploy-verifier-safety.mjs`: add protected-contract assertions for both corrections. This script is already run in the canonical premerge validation; do not add a competing merge gate.

New correction PR [#4563](https://github.com/keeptxred/TexasDefined/pull/4563), head `4d33541dbb7baff280a8b0d5578042443c122043`: initial Required Merge Gate [#38064583516](https://github.com/keeptxred/TexasDefined/actions/runs/38064583516) **success**, with canonical pre-merge validation and both workflow-specific PR checks passing. **Merge SHA and new production acceptance pending.** Any new ledger commit requires fresh protected CI before merging. Never claim these are complete until the PR passes required CI and merges normally.

## Existing safe architecture retained

The protected deploy remains serialized and blocking; native sports-venue editorial verification, Worker-version pinning, canonical/direct health, cache/rollback safeguards, seasonal direct-push exact-SHA wait, relocation `STATUS_TARGET_SHA`, existing post-deploy pinned checkout, and the original regression validator remain in place. Do not roll back an existing safe change simply because source validation is added elsewhere.

## Workflow inventory and classification

**Method:** All 194 names from the complete Git tree. SAFE = reviewed source and no confirmed issue in the specific race contract; FIX REQUIRED = confirmed PR/live mismatch with a proposed unmerged correction; SPECIAL CASE = deliberate independent health/source/manual or recovery semantics; RETIRED = obsolete and established for retirement (none); UNVERIFIED = not yet individually source-classified. A SAFE label is not proof of a successful recent run or Worker-version identity for each workflow.

Counts: UNVERIFIED **99**; FIX REQUIRED **3**; SAFE **76**; SPECIAL CASE **12**; RETIRED **4**. Total **194**. New #4563 fix files: **2**; regression-validator update: **1**. Separate #4544 contains the pending river-map checkout correction.

| Workflow | Classification | Basis / next step |
|---|---|---|
| `adsense-production-smoke.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `advertiser-production-verification.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `audit-all-editorial-production.yml` | FIX REQUIRED | PR source inventory was accompanied by a full live 254-county crawl (with PR errors masked); proposed job-level PR exclusion preserves post-deploy and manual crawl. |
| `audit-image-discover-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `audit-internal-link-graph-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `audit-sitemap-page-indexability.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `audit-static-orphans.yml` | SPECIAL CASE | Source-only static graph validation on PR; no live Worker assertion. |
| `audit-whole-site-production.yml` | SPECIAL CASE | Scheduled/manual site-wide crawl, not a merge or deployment certificate. |
| `auto-facebook-engagement.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `backend-separation.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `backfill-major-event-hero-images.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `backfill-placeholder-heroes.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `bing-indexnow.yml` | SPECIAL CASE | Scheduled/manual IndexNow submit and current crawler health, not a release-specific certification |
| `build-debug.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `calculator-platform.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `certify-cochran-county-once.yml` | RETIRED | Read-only manual retired county marker audit; deploy capability removed |
| `certify-cottle-county-once.yml` | RETIRED | Read-only manual retired county marker audit; deploy capability removed |
| `certify-county-production-reusable.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `certify-deaf-smith-county-once.yml` | SAFE | Legacy one-shot diagnostic limited to path-filtered main push; no independent Worker deployment |
| `certify-fisher-county-once.yml` | RETIRED | Read-only manual retired county marker audit; deploy capability removed |
| `certify-king-county-once.yml` | RETIRED | Read-only manual retired county marker audit; deploy capability removed |
| `chappell-hill-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `cloudflare-production-smoke.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `county-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `curation-integrity.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `dallas-news-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `deploy-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `destination-canonical-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `destination-indexing-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `diagnose-bundle-size-once.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `diagnose-client-bundle-once.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `diagnose-crosby-performance-once.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `diagnose-live-origin.yml` | SPECIAL CASE | Manual-only live origin diagnosis deliberately checks current main; not a deployment status verifier |
| `diagnose-lubbock-performance-once.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `dogs-production-smoke.yml` | SPECIAL CASE | PR uses base-branch production contract, not proposed contract; post-deploy checkout pins the triggering SHA. |
| `editorial-production-audit.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `entity-maintenance.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `explore-hero-assets.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `finish-texas-events-refresh.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `flag-history-production-smoke.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `flyover-scheduled-publish-bridge.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `friday-night-lights-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `governance-maintenance.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `governance-operations.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `gsc-priority-cohort.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `hurst-whirlyball-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `import-entities.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `made-in-texas-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `merge-gate.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `msr-houston-source-watch.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `my-story-museum-production-smoke.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `normalize-waterdata-probe-status.yml` | SPECIAL CASE | Normalizes optional metrics after its own successful upstream verifier; status target pinned to triggering SHA. |
| `painted-churches-seo.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `parking-map-audit.yml` | SAFE | PR static data audits and build; no live Worker assertion |
| `populate-missing-site-images.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `purge-authority-cache-after-deploy.yml` | SPECIAL CASE | Intentionally may run after an unsuccessful deployment to self-heal existing Cloudflare caches; do not remove failure/rollback behavior without dedicated analysis. |
| `recover-stale-production-deploy.yml` | SPECIAL CASE | Post-run stale Worker recovery dispatcher; inspects latest main and existing protected runs and dispatches canonical workflow only; must preserve |
| `refresh-acs-county-housing-costs.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `repair-editorial-image-specificity.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `repair-editorial-migration-validator-once.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `repair-explore-hero-gaps.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `report-unusual-business-experiment.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `resolve-destination-placeholder-heroes.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `resolve-direct-svg-heroes.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `restore-verified-worker.yml` | SPECIAL CASE | Manual recovery uses same protected production concurrency group and a verified recovery ledger; not ordinary post-deploy smoke |
| `retire-stale-branches.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `rivers-landscape-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `rv-park-hero-assets.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `search-distribution-gate.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `site-quality-watchdog.yml` | SPECIAL CASE | Code-quality watchdog with PR/push/scheduled triggers; source audit, not postdeploy smoke. |
| `sports-venue-hero-assets-wave7-reviewed.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `sports-venue-hero-assets-wave7.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `state-park-hero-assets.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `swimming-holes-river-tubing-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `sync-bing-webmaster.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `sync-county-property-data.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `sync-partner-referral-analytics.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `sync-property-tax-rates.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `sync-shop-funnel-analytics.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `sync-texas-events.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `test-ticketmaster-partner-api.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `texas-defined-ai-demand.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `texas-icons-registry.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `texas-knowledge-bank.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `texasdefined-auto-publication.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `texasdefined-publication-production-smoke.yml` | SAFE | Successful deployed workflow_run/manual; pins verifier checkout to triggering SHA |
| `things-unique-to-texas-policy.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `things-unique-to-texas-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `top-attraction-source-health.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `top-attraction-source-policy.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-ai-official-research.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-angi-affiliate.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-aquarium-machine-discovery.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-coastal-authority.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-date-formatting.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-event-occurrence-lifecycle.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-event-ticketing.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-evergreen-hero-rights.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-evergreen-partner-attribution.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-experience-affiliate-analytics.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-hunting-authority.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-lighthouse-authority.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-lighthouse-seasonal-depth.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-military-museum-visitor-layer.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-partner-referral-reporting.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-practical-home-authority.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-rv-parks-authority.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-school-supply-affiliate.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-seasonal-authority.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-event-image-dedupe.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-graph-editorial.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-image-attribution.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-image-uniqueness.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-phase3-galaxy.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-phase3-wave1.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-phase3-wave2.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-phase3-wave3.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-phase3-wave4.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-phase3-wave5.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-phase3-wave6.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-phase3-wave7.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-photo-additions.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-sports-venue-visible-editorial.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-stay-affiliate-options.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-stay-monetization-policy.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-texas-explained-questions.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-texas-facts-machine-discovery.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-texas-gateway-consolidation.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-texas-social-evergreen.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-texas-symbols.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-texas-talent-music-authority.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate-texas-talent.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `validate.yml` | SAFE | Source validation on main push/manual, canonical validator, no direct deployment certificate |
| `vehicle-authority-production-smoke.yml` | SAFE | Successful deployment/manual only; independent cache-busted public URL checks, no status write |
| `verify-abbott-browser.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-angi-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-aquarium-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-ask-texas-inference-manual.yml` | SPECIAL CASE | Scheduled/manual external inference health, not deployment-certifying. |
| `verify-authority-freshness-after-deploy.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-brand-location-sources.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `verify-brand-locator-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-budget-planner-browser.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-cavern-production-integrity.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-city-authority-browser.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-demand-signal-routes.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-devils-sinkhole-redirect-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-event-structured-data-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-event-system-completion.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-event-temporal-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-event-ticketing-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-find-my-county-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-fishing-lcra-feed.yml` | SPECIAL CASE | Third-party LCRA CSV source availability check, not production Worker certificate. |
| `verify-fishing-photo-governance.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `verify-football-batch-003-apple-springs.yml` | FIX REQUIRED | PR ran the deployed browser retest for a fixed production title; proposed PR-only syntax job and manually invoked browser keep future PR code from being compared to a pre-release site. |
| `verify-football-batch-003-browser.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-football-batch-003.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `verify-football-batch-004-browser.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-football-batch-004.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `verify-fort-davis-browser.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-free-christmas-canonical.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-gsc-manual-next-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-housing-index-surfaces.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-hunting-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-jasper-blue-hole-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-katy-browser.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-legacy-article-depth-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-legacy-authority-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-lighthouse-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-lighthouse-seasonal-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-live-lake-levels.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-local-home-insurance-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-local-mortgage-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-military-museum-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-priority-county-property-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-relocation-production-depth.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-relocation-production.yml` | SAFE | PR syntax only; workflow_run success/manual, exact checkout and STATUS_TARGET_SHA |
| `verify-remote-evergreen-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-reservoir-authority-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-route66-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-rv-production-images.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-rv-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-seasonal-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-seven-regions-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-sitemap-production-integrity.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-southlake-carroll-browser.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-sports-venue-editorial-production.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |
| `verify-sports-venue-heroes-production-all.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-stay-affiliate-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-stay-destination-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-texas-river-map-browser.yml` | FIX REQUIRED | Post-deploy live browser job checks out moving default branch, not triggering deployed SHA; concurrent PR #4544 proposes correction; verify it before reclassifying |
| `verify-wills-point-browser.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-ysleta-museum-browser.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-zapata-museum-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `websub-notify.yml` | UNVERIFIED | Source-level risk audit not yet completed; do not infer safe behavior from filename |

## Additional scope inspected on October 10

Individually read another 46 workflow YAML files beyond the initial focused inventory. The newly inspected source includes 31 additional safe production verifiers, 6 more source-safe flows, 4 independent special-case utilities, 4 read-only retired certification audit stubs, and one river browser with an existing fix pending in #4544. Of the first 32, 31 had no new race defect; `verify-texas-river-map-browser.yml` lacks pinned checkout on its post-deploy live browser job, already addressed in pending #4544. Safe classification does not prove every downstream run succeeded.

## Legacy certifier latent risk (investigation, no operational change)

`certify-county-production-reusable.yml` is a `workflow_call` path that checks out moving `main` and calls `scripts/ci/run-incomplete-county-certification.mjs`, which contains `npm run deploy` independent of `texasdefined-production` protected concurrency. The old `scripts/ci/incomplete-county-certification-config.json` is intentionally absent under retirement governance, and examined historical county-once call sites are either retired read-only audits or diagnostics. **UNVERIFIED / dormant suspected**, not asserted to be currently executable or an active race. Before changing it, trace *all* callers and run history; if obsolete, retire it under the existing retirement validator rather than activate or bypass deployment guards. Never call it as a shortcut to deploy.

## Remaining mandatory acceptance work

- Review every **UNVERIFIED** file's actual triggers, live/PR separation, checkout SHA, status-target SHA, exact-deploy wait, concurrency and intentional special-case behavior. Reclassify with evidence, especially overlooked live checks outside the filename keyword patterns; the full file register prevents losing them between chats.
- Check whether any `workflow_run` verifier executing on a superseded release requires an additional Worker-identity guard; do not infer this from a trigger alone. Distinguish true status-attribution defects from non-certifying scheduled health audits.
- Recheck the active independent concurrent PR [#4544](https://github.com/keeptxred/TexasDefined/pull/4544), which is changing the same regression validator. Reconcile its content if it merges; never force-push over it.
- Run the protected Required Merge Gate on this branch; verify updated validator passes, avoid stale synthetic merge refs, check merging against fresh `main` and file blob SHAs; merge normally only if protected checks pass.
- After merge, confirm deployed SHA, final GitHub `texasdefined-production` status, blocking live verification, Worker identity and recovery ledger; audit downstream statuses on *that exact SHA*. Distinguish subsequent deployments.
- Update this ledger with PR number, merge commit, CI and deployment evidence. Do not declare full audit certification while any workflow is UNVERIFIED or any new rollout has not passed.
