# Tierra Blanca Creek authority — 2026-11-16 release checkpoint

**Canonical:** https://texasdefined.com/explore/tierra-blanca-creek  
**Source PR:** #7279 (merged as 5698b16e116a2a28fe31ad40cb21c4627a3369d2).  
**Pre-merge evidence:** successful Required merge gate run #43890387963, successful Tierra Blanca Chrome contract run #43890388033 (PR contract only; no real browser).

## Verified editorial repairs
- Creek watershed, rights-cleared photos, visitor fees/trails, archaeological protections, canonical, source notes and Amarillo/Canyon road-trip links were established in #7256 / #7264. Accessible ordered-list fix #7275 has shipped.
- Official source correction in #7279: Panhandle-Plains Historical Museum **remains closed to public visits** after March 2025 fire-safety order. Museum's own closure page documents traveling exhibitions and pop-up programs; never recommend a walk-in museum visit until official reopening is verified.
- Map fallback is a self-contained north-up SVG using FWS Buffalo Lake NWR public entrance (34.919517, -102.111118) and TPWD Palo Duro Canyon park headquarters (34.984709, -101.701867). The optional OpenStreetMap iframe is not counted as visual evidence; never expose private creek crossings or protected archaeological sites.
- First published 2026-11-15; materially changed 2026-11-16. Article dateModified and both normal/fallback Explore sitemap lastmod must equal 2026-11-16.

## Exact unfinished release acceptance
1. Run canonical production workflow after #7279 on main. Require passing asset retention, deploy, live verify, and final production status. Do not equate PR CI with production.
2. Confirm live HTML contains the public museum closure warning, agency-coordinate fallback, official citations, unique canonical, retained FWS image URLs, no noindex, original photo alt text, cross-links.
3. Confirm `sitemap-explore.xml` contains exactly one guide URL with `<lastmod>2026-11-16</lastmod>`.
4. Confirm successful *real* Chrome acceptance job on **live production** at both 1365px desktop and 390px mobile. Both screenshots and machine JSON report must exist under a `tierra-blanca-authority-visual-<runid>` artifact. PR-only acceptance-contract green is not certification.
5. Inspect custom `texasdefined-tierra-blanca-chrome` status on deployed commit: green only if real Chrome and screenshot artifact upload passed.
6. Preserve monthly access/fee/trail/photo and real Chrome GitHub review, quarterly history/source review, automatic editorial issue on drift. Never automatically refresh substantive dates merely because a website returned HTTP 200.

## Official source records
- FWS directions: https://www.fws.gov/refuge/buffalo-lake/visit-us
- TPWD map: https://tpwd.texas.gov/state-parks/palo-duro-canyon/map
- Museum visitor closure: https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates
- WTAMU 2026 closure update: https://www.wtamu.edu/news/2026/02/wt-president-wendler-offers-update-on-panhandle-plains-historical-museum.html

Mark COMPLETE only with live deploy and two-viewport Chrome artifact proof. If blocked, update this checkpoint with exact failing job and next action.

## November 16 production-release blocker and scoped repair (#7284)
- #7279 merged successfully at `5698b16e116a2a28fe31ad40cb21c4627a3369d2`, but deployment run #43891806292 failed **before** publishing at the original-byte predecessor guard. #43891225902 and #43893403845 independently failed the same guard. This is NOT an Echo Canyon article-validation failure or a reason to suppress the asset-retention safety gate.
- The active 100%-traffic Worker at the failure was `0f9a146d-7b91-45d2-b1df-9813c80326e8`, whereas the preceding successful immutable original-byte handoff (run #43884259995, source `3bb9a544e38e65d8b80ddf375ea58ddd5964b8bc`) belongs to DIFFERENT Worker `64e9e06f-f80e-424c-8f85-dc6e210463ac`. Never fake a Worker match.
- #7284 adds a one-time exact-worker bridge with a hard expiry `2026-11-19T14:32:31Z`. It verifies the archived release against its actual source/version and successful GitHub deploy job; only historical file *paths* flow to the next predeploy capture. The genuinely current Worker is probed for those old paths, original bytes are retained if available, and the entire postdeploy original-byte asset set is revalidated against **both** origins. Unknown active versions and all future deployments still require ordinary exact prior-release proof.
- Current next action: merge #7284 after Required merge gate, then inspect its production run. If it fails at any postdeploy article, sitemap or browser gate, fix the actual cause, rerun and record artifact links. Do not claim a 95+ live grade before real Chrome has completed.
