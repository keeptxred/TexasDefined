# Update verification cost policy

The October 15, 2026 review found duplicated post-merge validation, duplicated
watchdog checks, and permanent deployment subscriptions for individual content
acceptance projects. This policy intentionally supersedes those blanket trigger
requirements, including earlier source validators that required feature-specific
`workflow_run` wiring. Required branch protection is unchanged.

## What runs

- The canonical deterministic merge gate remains required. A valid local run can
  be reused when neither the source tree nor its base changed; GitHub still runs
  the protected gate. No automatic second full suite after merging.
- The watchdog remains scheduled/manual. Its same source contract is already in
  the canonical gate, so separate PR/push watchdog invocations are removed.
- Gateway auxiliary checks now have the same relevant paths on push and PR.
- Every deployment keeps build, performance, local runtime, direct/canonical
  health, rollback, deployed version identity, verified recovery ledger, guarded
  indexing and cache repair. Image delivery and native sports/events/financial/
  advertiser/discovery checks run only for their relevant changes or shared runtime
  changes. Selected checks still fail closed.
- The baseline is the latest successful verified Worker ledger revision, not
  merely HEAD's parent. This includes accumulated changes after failed deployments.
  Invalid GitHub evidence fails the planner. Without a baseline, conservative
  shared checks run. Removed files are included when selecting feature scopes.
- Changed-page smoke uses static route declarations and changed article/destination
  records. Unmapped content/shared changes use representative public pages. The
  smoke additionally checks the two existing California/Florida canonical aliases as actual HTTP 301 redirects (without following them) only when the relevant route or planner changes. All checks share the same 40-page total budget and existing deploy job. The
  smoke also selects exactly four affected fishing-species owners and verifies their governed family-link SSR anchors when that shared view model changes; other releases pay no extra page-scan cost. The
  smoke also identifies changed slug-keyed article-link registry owners and checks newly added SSR anchors, instead of testing only representative pages. This adds no full-site crawl and no new audit trigger. The smoke has a 40-page cap, records its candidate and omitted counts, and explicitly
  describes sampling; it never claims an exhaustive content audit. Full source
  correctness stays in the merge gate; all nine broad local audits stay weekly.
- Former feature deployment followers remain explicit manual acceptance tools,
  preserving their assertions and any PR-only source checks or existing schedules.
  The separate post-purge freshness follower is manual because cache repair already
  runs that verifier. Analytics sync retains its timer without a deploy duplicate.
- Completed diagnostic workflows have no automatic triggers. They remain manual
  troubleshooting tools; no editorial source or certification evidence is deleted.
- Full historical production acceptance remains available by explicit manual run.
  Multiple assertions for one page reuse its successful response; a retry after a
  failed assertion obtains a new response. Failed responses are never cached.

The exact retired-trigger inventory is `scripts/ci/update-scan-policy.json`.
Only cache repair, stale deployment recovery and publication notification retain
subscriptions to deployment completion. Event-refresh completion and optional
water-probe status normalization are separate operational workflows.
