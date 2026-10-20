# Waterpark production visual acceptance — bounded Chrome

This is a **read-only** targeted QA workflow for TexasDefined's individual waterpark guides, not a site-wide scan or a Google indexing certification.

## Execution boundary

- Trigger: **after successful** `Deploy TexasDefined production` workflow on main, conditional upon relevant waterpark code/photo changes in the exact deployed commit. Can also be invoked manually.
- Five exact guide URLs: Paradise Springs (Grapevine), Hawaiian Waters (Garland), Port Royal (Port Aransas), Bahama Beach (Dallas), Kalahari (Round Rock).
- Exactly two Chrome viewport configurations: 1280x850 desktop and 390x844 mobile.
- No site-wide crawling or automatic polling/retries. Budget: 15-minute GitHub-hosted Actions job; isolated free `playwright-core` dependency.
- Inspect real HTTP response status, venue title, `noindex`, source/FAQ and curated internal links, image provenance and license link for photographed parks, browser-loaded image dimensions, same-origin JS/CSS transport, horizontal overflow and observed Cloudflare Worker version consistency.
- Retain five full-page screenshots **per viewport** (10 total) and a complete JSON pass/failure report for review for 14 days.
- A pass demonstrates only **bounded technical/visual delivery** for these five specified guides on the observed Worker version. It is not a claim to have individually certified all 137 parks, checked licensing for every other source, or reviewed every photo composition by an editor.

## Important authority hold

All 137 guides remain `noindex` unless separately certified via independent source/rights/editorial acceptance. Live screenshot success is **necessary but not sufficient** for indexed authority. Historical Commons photographs must not be misrepresented as the present-day ride lineup. All source provenance and source-review requirements remain in issue #5065.

## Failures

A failed visual check is a specific production defect or an external delivery blocker and must remain visible in the screenshot/JSON artifact; no weakening of global Merge Gate, no empty image placeholder substitution, no bypass of protected production deploy and no repeated polling is authorized.
