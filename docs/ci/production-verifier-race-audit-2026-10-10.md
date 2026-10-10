# TexasDefined production verifier race audit — October 10, 2026

> **Status: SOURCE INVENTORY CLASSIFIED; PRODUCTION ACCEPTANCE STILL PENDING.** All 194 workflow YAML files have been reviewed for trigger and execution semantics. This is not blanket CI/runtime certification: identified defects remain in protected PRs, and downstream checks must be bound to the actual deployed SHA after merge.

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

Counts: SAFE **134**; SPECIAL CASE **49**; RETIRED **6**; FIX REQUIRED **5**; UNVERIFIED **0**. Total **194**. New #4563 fix workflows: **4** (Apple Springs, 254-county, GSC cohort, editorial image repair); regression-validator changes: **2** (post-deploy and direct-main inventory). Separate #4544 contains the pending river-map checkout correction.

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
| `auto-facebook-engagement.yml` | SPECIAL CASE | Scheduled/manual Facebook engagement automation with local-time and dry-run gates; not a production Worker release verifier |
| `backend-separation.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `backfill-major-event-hero-images.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `backfill-placeholder-heroes.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `bing-indexnow.yml` | SPECIAL CASE | Scheduled/manual IndexNow submit and current crawler health, not a release-specific certification |
| `build-debug.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `calculator-platform.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `certify-cochran-county-once.yml` | RETIRED | Read-only manual retired county marker audit; deploy capability removed |
| `certify-cottle-county-once.yml` | RETIRED | Read-only manual retired county marker audit; deploy capability removed |
| `certify-county-production-reusable.yml` | RETIRED | Retired non-dispatchable reusable workflow; merge-county-config is fail-closed at runtime, and active retired configuration is prohibited by governed validator; retained historic engine has direct deploy code but no enabled active input |
| `certify-deaf-smith-county-once.yml` | SAFE | Legacy one-shot diagnostic limited to path-filtered main push; no independent Worker deployment |
| `certify-fisher-county-once.yml` | RETIRED | Read-only manual retired county marker audit; deploy capability removed |
| `certify-king-county-once.yml` | RETIRED | Read-only manual retired county marker audit; deploy capability removed |
| `chappell-hill-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `cloudflare-production-smoke.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `county-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `curation-integrity.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `dallas-news-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `deploy-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `destination-canonical-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `destination-indexing-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `diagnose-bundle-size-once.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `diagnose-client-bundle-once.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `diagnose-crosby-performance-once.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `diagnose-live-origin.yml` | SPECIAL CASE | Manual-only live origin diagnosis deliberately checks current main; not a deployment status verifier |
| `diagnose-lubbock-performance-once.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `dogs-production-smoke.yml` | SPECIAL CASE | PR uses base-branch production contract, not proposed contract; post-deploy checkout pins the triggering SHA. |
| `editorial-production-audit.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `entity-maintenance.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `explore-hero-assets.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `finish-texas-events-refresh.yml` | SPECIAL CASE | Authorized success-triggered Events finisher; exact refreshed PR head validation and protected auto-merge, not direct main push or Worker deployment |
| `flag-history-production-smoke.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `flyover-scheduled-publish-bridge.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `friday-night-lights-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `governance-maintenance.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `governance-operations.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `gsc-priority-cohort.yml` | FIX REQUIRED | Confirmed PR/live cohort and push-before-deploy race; branch fixes PR source-only + exact-SHA push gate; protected CI and merge pending |
| `hurst-whirlyball-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `import-entities.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `made-in-texas-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `merge-gate.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `msr-houston-source-watch.yml` | SPECIAL CASE | External fact/source freshness monitoring with scheduled/manual test and issue/report workflow; no Worker release certificate |
| `my-story-museum-production-smoke.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `normalize-waterdata-probe-status.yml` | SPECIAL CASE | Normalizes optional metrics after its own successful upstream verifier; status target pinned to triggering SHA. |
| `painted-churches-seo.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `parking-map-audit.yml` | SAFE | PR static data audits and build; no live Worker assertion |
| `populate-missing-site-images.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `purge-authority-cache-after-deploy.yml` | SPECIAL CASE | Intentionally may run after an unsuccessful deployment to self-heal existing Cloudflare caches; do not remove failure/rollback behavior without dedicated analysis. |
| `recover-stale-production-deploy.yml` | SPECIAL CASE | Post-run stale Worker recovery dispatcher; inspects latest main and existing protected runs and dispatches canonical workflow only; must preserve |
| `refresh-acs-county-housing-costs.yml` | SPECIAL CASE | Census refresh may update source PR branch, or propose changes from schedule; no main/deployment direct write; independent data refresh |
| `repair-editorial-image-specificity.yml` | FIX REQUIRED | Confirmed direct-main push of image repairs with CI bypass; branch replaces with reviewable PR and exact-branch validation; protected merge pending |
| `repair-editorial-migration-validator-once.yml` | RETIRED | Manual read-only audit of historical migration repair; no publication/deployment |
| `repair-explore-hero-gaps.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `report-unusual-business-experiment.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `resolve-destination-placeholder-heroes.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `resolve-direct-svg-heroes.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `restore-verified-worker.yml` | SPECIAL CASE | Manual recovery uses same protected production concurrency group and a verified recovery ledger; not ordinary post-deploy smoke |
| `retire-stale-branches.yml` | SPECIAL CASE | Branch archival/cleanup housekeeping after merged PR or manual dispatch; not a release certifier |
| `rivers-landscape-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `rv-park-hero-assets.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `search-distribution-gate.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `site-quality-watchdog.yml` | SPECIAL CASE | Code-quality watchdog with PR/push/scheduled triggers; source audit, not postdeploy smoke. |
| `sports-venue-hero-assets-wave7-reviewed.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `sports-venue-hero-assets-wave7.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `state-park-hero-assets.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `swimming-holes-river-tubing-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `sync-bing-webmaster.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `sync-county-property-data.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `sync-partner-referral-analytics.yml` | SPECIAL CASE | Scheduled/manual/post-run analytics ingestion; not proof of successful production release, despite workflow_run trigger |
| `sync-property-tax-rates.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `sync-shop-funnel-analytics.yml` | SPECIAL CASE | Scheduled/manual/post-run analytics ingestion; not proof of successful production release, despite workflow_run trigger |
| `sync-texas-events.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `test-ticketmaster-partner-api.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `texas-defined-ai-demand.yml` | SPECIAL CASE | Inspected scheduled/manual data, diagnostic, image or outreach automation; no PR-to-production release assertion; changes flow through existing service/PR governance |
| `texas-icons-registry.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `texas-knowledge-bank.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `texasdefined-auto-publication.yml` | SPECIAL CASE | Explicit manual-only publication with activation/confirmation; not a release certifier; publication gating retained |
| `texasdefined-publication-production-smoke.yml` | SAFE | Successful deployed workflow_run/manual; pins verifier checkout to triggering SHA |
| `things-unique-to-texas-policy.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `things-unique-to-texas-production-smoke.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `top-attraction-source-health.yml` | SPECIAL CASE | External fact/source freshness monitoring with scheduled/manual test and issue/report workflow; no Worker release certificate |
| `top-attraction-source-policy.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-ai-official-research.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-angi-affiliate.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-aquarium-machine-discovery.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-coastal-authority.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-date-formatting.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-event-occurrence-lifecycle.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-event-ticketing.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-evergreen-hero-rights.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-evergreen-partner-attribution.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-experience-affiliate-analytics.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-hunting-authority.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-lighthouse-authority.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-lighthouse-seasonal-depth.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-military-museum-visitor-layer.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-partner-referral-reporting.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-practical-home-authority.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-rv-parks-authority.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-school-supply-affiliate.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-seasonal-authority.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-event-image-dedupe.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-graph-editorial.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-image-attribution.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-image-uniqueness.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-phase3-galaxy.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-phase3-wave1.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-phase3-wave2.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-phase3-wave3.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-phase3-wave4.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-phase3-wave5.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-phase3-wave6.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-phase3-wave7.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-photo-additions.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-sports-venue-visible-editorial.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-stay-affiliate-options.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-stay-monetization-policy.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-texas-explained-questions.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-texas-facts-machine-discovery.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-texas-gateway-consolidation.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-texas-social-evergreen.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-texas-symbols.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-texas-talent-music-authority.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate-texas-talent.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `validate.yml` | SAFE | Source validation on main push/manual, canonical validator, no direct deployment certificate |
| `vehicle-authority-production-smoke.yml` | SAFE | Successful deployment/manual only; independent cache-busted public URL checks, no status write |
| `verify-abbott-browser.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-angi-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-aquarium-production.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-ask-texas-inference-manual.yml` | SPECIAL CASE | Scheduled/manual external inference health, not deployment-certifying. |
| `verify-authority-freshness-after-deploy.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-brand-location-sources.yml` | SPECIAL CASE | External fact/source freshness monitoring with scheduled/manual test and issue/report workflow; no Worker release certificate |
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
| `verify-fishing-photo-governance.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `verify-football-batch-003-apple-springs.yml` | FIX REQUIRED | PR ran the deployed browser retest for a fixed production title; proposed PR-only syntax job and manually invoked browser keep future PR code from being compared to a pre-release site. |
| `verify-football-batch-003-browser.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-football-batch-003.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `verify-football-batch-004-browser.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-football-batch-004.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
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
| `verify-sports-venue-editorial-production.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |
| `verify-sports-venue-heroes-production-all.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-stay-affiliate-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-stay-destination-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-texas-river-map-browser.yml` | FIX REQUIRED | Post-deploy live browser job checks out moving default branch, not triggering deployed SHA; concurrent PR #4544 proposes correction; verify it before reclassifying |
| `verify-wills-point-browser.yml` | SAFE | Reviewed triggers, deploy success or exact-SHA wait, pinned checkout/status SHA where applicable, and PR/live separation; no new race confirmed |
| `verify-ysleta-museum-browser.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `verify-zapata-museum-production.yml` | SAFE | Source inspected; gated or intentionally scheduled/manual; no confirmed SHA race in reviewed contract |
| `websub-notify.yml` | SAFE | Inspected workflow source: read-only source validation/test/build, or guarded deployed-SHA verifier; no confirmed PR/deploy race |

## Additional scope inspected on October 10

Individually read another 46 workflow YAML files beyond the initial focused inventory. The newly inspected source includes 31 additional safe production verifiers, 6 more source-safe flows, 4 independent special-case utilities, 4 read-only retired certification audit stubs, and one river browser with an existing fix pending in #4544. Of the first 32, 31 had no new race defect; `verify-texas-river-map-browser.yml` lacks pinned checkout on its post-deploy live browser job, already addressed in pending #4544. Safe classification does not prove every downstream run succeeded.

## Legacy certifier latent risk (investigation, no operational change)

`certify-county-production-reusable.yml` is a `workflow_call` path that checks out moving `main` and calls `scripts/ci/run-incomplete-county-certification.mjs`, which contains `npm run deploy` independent of `texasdefined-production` protected concurrency. The old `scripts/ci/incomplete-county-certification-config.json` is intentionally absent under retirement governance, and examined historical county-once call sites are either retired read-only audits or diagnostics. **UNVERIFIED / dormant suspected**, not asserted to be currently executable or an active race. Before changing it, trace *all* callers and run history; if obsolete, retire it under the existing retirement validator rather than activate or bypass deployment guards. Never call it as a shortcut to deploy.

## Further fixes found in full workflow source review

- `gsc-priority-cohort.yml`: the 20-URL live GSC cohort crawled older production on PRs and path-filtered pushes. The proposed change retains source-only PR checks, scheduled/manual production audits and waits for `texasdefined-production=success` on the **exact push SHA** before a push-triggered crawl.
- `repair-editorial-image-specificity.yml`: historically committed image changes from default-branch checkout and executed a bare `git push` using a `[skip ci]` message. The proposed change preserves the repair script, but publishes only to a **new reviewed PR branch**, explicitly dispatches the canonical validator on that branch SHA, and does not merge or deploy. `validate-direct-main-writer-inventory.mjs` has targeted no-direct-main/no-skip-CI assertions.
- `certify-county-production-reusable.yml` was inspected alongside its governing `validate-county-certifier-consolidation.mjs`: it is a deliberately retained, **non-dispatchable retired interface** whose predecessor configuration is prohibited and whose first merge-config step fails closed at runtime; its old deploy code is inert through the governed entry path. Do not resurrect it or bypass protected production.

## Remaining mandatory acceptance work

- Source-level classification now covers **all 194** workflows, including non-production filename families. Keep the full register current as main evolves; do not confuse source-level review with successful runtime evidence of each verifier.
- Check whether any `workflow_run` verifier executing on a superseded release requires an additional Worker-identity guard; do not infer this from a trigger alone. Distinguish true status-attribution defects from non-certifying scheduled health audits.
- Recheck the active independent concurrent PR [#4544](https://github.com/keeptxred/TexasDefined/pull/4544), which is changing the same regression validator. Reconcile its content if it merges; never force-push over it.
- Run the protected Required Merge Gate on this updated branch; verify updated validator passes, avoid stale synthetic merge refs, check merging against fresh `main` and file blob SHAs; merge normally only if protected checks pass.
- After merge, confirm deployed SHA, final GitHub `texasdefined-production` status, blocking live verification, Worker identity and recovery ledger; audit downstream statuses on *that exact SHA*. Distinguish subsequent deployments.
- Update this ledger with PR number, merge commit, CI and deployment evidence. Do not declare full audit certification while any workflow is UNVERIFIED or any new rollout has not passed.
