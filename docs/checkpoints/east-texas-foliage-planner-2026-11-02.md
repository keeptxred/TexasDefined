# East Texas fall guide — final navigation and park comparison (2026-11-02)

Canonical: https://texasdefined.com/article/east-texas-fall-colors

## Starting state verified
- PR #6538 is already merged and released; GitHub production #41486950562 and dedicated postdeploy Chrome #41490027970 passed canonical HTTP 200/301 and mobile/desktop QA.
- Authenticated Google Search Console URL Inspection confirms exact clean URL **Submitted and indexed**; robots allowed, mobile Googlebot fetch successful at 2026-11-02T05:04:47Z, user and Google canonical both exact. Parameter variant currently **unknown to Google**. Inspection predates subsequent edits; do not misstate new deployment as Google recrawl.
- PR #6549 merged `b59e796af520c776b1c1ad7acabd57064471be79` with one attributed image per park, October 2023 Caddo Lake photo and autumn 2014 Daingerfield hero, six-photo/rights safeguards. Exact PR deploy #41497185193 was superseded/canceled by concurrent push. A newer descendant production deployment must be independently verified before claiming these edits live.

## This PR: high-value fixes without duplicate body copy
- Make existing six-park visitor cards useful for scanning: six officially sourced named starter trails, distances and ratings; clear Cooper Lake two-unit distinction.
- Fix two confirmed missing internal links to already-existing /destination/lake-bob-sandlin-state-park and /destination/cooper-lake-state-park; preserve the other four.
- Add an accessible top-of-article jump anchor to the six-park map, cards and source-attributed photographs.
- Add direct official Caddo Lake TPWD ranger-program calendar without hardcoding a dated 2026 event into annual guide; TPWD currently lists a Nov 14, 2026 Fall Foliage Hike (https://tpwd.texas.gov/calendar/caddo-lake/fall-foliage-hike). This is a dated event, **not** a current color/peak report.
- Remove duplicate end-of-article "More fall foliage guides" cards; regional related links elsewhere remain.
- Add Chrome and source regression guardrails for six canonical internal park links, source-backed trail choices, jump anchor and calendar.

## Strict release/SEO boundaries
- Protected Merge Gate, CI/build, zero JS-size-cap increase and successful deployment on a descendant main commit are mandatory.
- Re-run postdeployment Chrome verifier for source photo bytes, mobile/desktop responsive layout, all guide links and accurate exact canonical 301 variants.
- Do not alter the single canonical URL, redirect middleware, robots directives, unrelated article routing, football pages, or global CDN caching.
- Do not fabricate current autumn peak, implied photo dates or non-licensed photographs.
