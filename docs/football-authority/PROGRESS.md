# Football Authority — Execution Ledger

Updated 2026-10-08. Repository: `keeptxred/TexasDefined`.

## Canonical initial inventory
- 1,268 unique 2026–28 UIL program slugs from committed alignment data, and 24 additional featured/non-UIL slugs in the site's sitemap-generation logic: **1,292 source-declared canonical profile URLs**.
- This is a source-code inventory; live sitemap and all 1,292 live production URLs have **not** yet been verified independently.
- Private vs public classification, city/county, images, sources, and quality status remain unknown on most entries; do not populate by guess.

## Batch 001 (assigned school cap 5)
1. `wills-point` — researched from Wills Point ISD / Wills Point High School and UIL (individual audit notes recorded).
2. `abbott` — researched from Abbott ISD and UIL (individual audit notes recorded).
3. `katy` — researched from Katy ISD, Katy Athletic Booster Club and UIL (individual audit notes recorded).
4. `fort-davis` — individually audited and implemented on branch; 2026 season cancellation prominently disclosed.
5. `southlake-carroll` — individually audited and implemented on branch; 8-title correction and 2026 coach documented.

## Pull request, CI and remaining acceptance
- Core PR: [#4330](https://github.com/keeptxred/TexasDefined/pull/4330) — merged 2026-10-08 at `7ec7444474dde1db49bfe50219f5ca013b3aff49`, protected checks passed.
- Licensed Katy/Fort Davis photo and smoke follow-up: [#4331](https://github.com/keeptxred/TexasDefined/pull/4331) — merged 2026-10-08 at `ad0cf18ab922c4832740c0cb969ec429a0eebb73`.
- Football team finder now includes five context-specific inbound links to these individual researched school pages.
- CI is required; live profile/mobile checks and photography licenses are still unresolved; do not mark VERIFIED based on code alone.

## Current counts after protected merge
- Inventory: **1,292**; individually researched: **5**; implemented and merged: **5**; **0 fully VERIFIED**.
- Actual rendered *post-deployment* live page audits: **0**; **merged: 5**, **production verified: 0**. Production deployment and acceptance remain outstanding.
- No school may advance to VERIFIED until **actual post-deployment inspection**.

## Implemented branch records
- Wills Point: 1965 UIL title, James Boxley, Ken Autry Davis Field, source-backed 2026 district and individual blue/white graphics.
- Abbott: Panthers/old gold identity, 2012/2015/2022 state finals, 2024 semifinal and current six-man alignment.
- Katy: nine title years, Mike Johnston/Gary Joseph, Red Sea, current official team schedule and source-linked red/white milestones.
- Shared supporting code changes are conditional on school-specific editorial; this is **not** a universal template substitution for per-school research.
- Code commits: `8031522d`, `4f0d07d4`, `78a25a72`, `d7286a43`. Registry implementation checkpoint `738119a6`.
- Still pending: image-rights investigation for Wills Point, Abbott and Southlake Carroll; individual inbound link audit; successful production deployment and live mobile/desktop checks. Both Batch 001 PRs are merged.

- Fort Davis 2026 cancellation: directly cited district superintendent announcement, 2003 title-game appearance, school colors; added top-page notice.
- Southlake Carroll: eight genuine titles per district and UIL 2003 recap, 2003 runner-up rather than erroneous UIL ninth title, new 2026 coach Lee Munn, official schedule sources and distinct school timeline.
- Changed all-time UIL data adapter only for a demonstrably erroneous Carroll 2003 mark; if upstream corrects it, special case automatically ceases.

## Production deployment status (2026-10-08)
- The initial production deployment for core PR #4330 **failed before Cloudflare Worker deployment**: [Actions run 37785976546](https://github.com/keeptxred/TexasDefined/actions/runs/37785976546) reached governed Discover derivative generation, but Wikimedia Commons returned HTTP **429** for pre-existing `gonzales` asset. The dependency is not one of the five schools.
- Existing GitHub Actions artifact restore also failed to list the derivative cache (`unexpected end of JSON input`); subsequent remote requests were throttled. A **single failed-jobs rerun** of run 37785976546, attempt 2, was requested; its outcome must be observed, not presumed.
- Core PR #4330 and photo follow-up #4331 are **MERGED, not DEPLOYED or VERIFIED**. A later successful deploy and individual live checks remain required. Do not mark a school VERIFIED solely because CI or PR merge passed.

## Current blockers and honest limitations
- Live school page URLs returned an access error in the current research browser; live HTML, photo presentation, mobile and production SEO cannot yet be certified.
- Discoverable Wills Point photographs on booster, contractor and third-party websites are not verified as reusable; do not copy them.

## Next actions
- Source-backed original histories, school-specific metadata, verified colors/mascots, sourced milestone graphics and individual FAQs now implemented for Wills Point, Abbott and Katy. Run CI and address outstanding acceptance items.
- Both PRs are merged. Verify a successful deploy and then inspect all five live pages, including historic licensed photos on Katy and Fort Davis, if the live browser permits.
- Fort Davis and Southlake Carroll individual source edits and enhanced production assertions have merged. Confirm production, review mobile/desktop and individual inbound linking, and do not assign a sixth school in this batch.
- Update registry with exact PR references, test outcomes and verification. Begin batch 002 only after batch 001 is resolved or a genuine blocker is recorded.
