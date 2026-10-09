# Southlake Carroll Dragons — individual research and audit (2026-10-08)

Page: https://texasdefined.com/texas-high-school-football-teams/southlake-carroll

## Specific defects in source/current rendering
- Generic overview misses the Dragons' eight actually won football championships, distinguished 2003 **runner-up**, 2024 finals and Feb 2026 appointment of Lee Munn.
- Historic data discrepancy: UIL all-time appearances page erroneously shows **9 titles** (2003 marked 03*) while Carroll ISD independently and expressly says **eight**. UIL's own 2003 recap documents Katy beat Carroll 16–15. This incorrect raw count is used in TexasDefined's all-time state-finals UI. Do not repeat it as fact.
- Identity source provides Dragons mascot but not green/black/white colors; no coach/current season link and no editorial stadium information or school-specific highlights.
- Live profile, responsive QA and photo rights not verified.

## Research and primary sources
- Carroll ISD official 2026 season announcement reports **eight state football championships**: https://www.southlakecarroll.edu/district-information/district-departments/athletics/cotton-bowl-game
- Carroll ISD titles list includes 1988, 1992, 1993, 2002, 2004, 2005, 2006, 2011 (older history may be elsewhere on that page): https://www.southlakecarroll.edu/district-information/district-departments/athletics/dragon-state-championships
- **UIL own 2003 game recap: Katy 16, Southlake Carroll 15**, December 20, 2003: https://www.uiltexas.org/100/football
- Contradictory UIL all-time list explicitly shows 9 and erroneous 03*; record the conflict and source-specific correction, not a blanket distrust of UIL: https://www.uiltexas.org/football/all-time-appearances
- Current Dragons green/black/white and mascot in UIL 2024 championship team: https://www.uiltexas.org/football/state-team-mp-archive/southlake-carroll-2024-2025-football
- Carroll ISD appointed **Lee Munn** head coach 2026-02-02: https://www.dragonsportsnetwork.com/news/110554 ; https://www.carrolldragonfb.com/coaches/lee-munn
- Official 2026 football schedule, game-specific venues including Dragon Stadium and away games: https://www.southlakecarroll.edu/district-information/district-departments/athletics ; https://resources.finalsite.net/images/v1779973379/southlakecarrolledu/axk4pq3z9zmjkmkqvxpx/2026CarrollISDFootballSchedule.pdf
- Current UIL Class 6A District 4: https://realignment.uiltexas.org/alignments/2026/6ABBFB2026.pdf
- Dragon Stadium, **1085 S Kimball Ave, Southlake** per current team game guide (secondary fan-facing): https://carrolldragoninsider.com/

## Editorial plan, unresolved
- Document eight actual championships plus 2003 loss, 2024 runner-up; prominently link the official 2026 coaching and schedule changes.
- Correct **Southlake-only** UIL summary mismatch in code with explicit primary-source citation; do not alter other UIL teams' records.
- School green/white/black original timeline cards; do not copy district photographs without rights.
- Confirm inbound local/stadium references, current tickets/parking, CI, mobile and actual production.

## Batch 001 implementation checkpoint — 2026-10-08
- Original program-specific researched overview, verified sources, unique milestone timeline and individual SEO title/description implemented.
- Official mascot/color identity documented and the school-specific design uses original editorial graphics, never unlicensed documentary photos.
- This school's specific factual correction is implemented in code and clearly attributed; no assertion of production readiness.
- Status: IMPLEMENTED on GitHub branch only. Still required: CI, merge, production HTML/mobile check, licensed authentic image sourcing and context-appropriate incoming links.

## Southlake Carroll focused 2026 individual browser QA — 2026-10-08
- Previously documented original authority copy and Southlake-only all-time totals correction distinguish **eight won** titles (1988, 1992, 1993, 2002, 2004, 2005, 2006, 2011) from **2003 state-final runner-up** (Katy 16–15, official UIL recap) and 2024 finalist, without rewriting other UIL programs. Carroll ISD source and Feb 2026 Lee Munn announcement and official 2026 schedule are retained. Green Dragon-themed original timeline graphic is site-created; no unlicensed school photos, logos, or current venue access promises.
- Independent NCES school identity [school 481302000791](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=481302000791) and existing Tarrant County authority guide ground the explicit school → `/county/tarrant` link even if the optional TEA directory join fails. County guide already contains a source-backed **inbound Southlake Carroll Dragons football** link, independently found in its published content. Do not create an unsupported unrelated sports link.
- Scoped `scripts/ci/verify-southlake-carroll-browser.mjs` plus `.github/workflows/verify-southlake-carroll-browser.yml` test deployed school+Tarrant County in real 1366px desktop and 390px mobile Chrome: unique SEO/H1/canonical/indexability/JSON-LD, eight actual state-title distinction and **2003 not a ninth win**, primary coach/championship/schedule source links, UIL district and venue, reciprocal Tarrant links, missing/broken visible images, horizontal overflow, runtime errors, full screenshots. The workflow is path-scoped for PR-based direct live QA when unrelated sitewide deployment checks fail and also runs after successful full production deployments. This is **candidate test and source-backed link only**; no pass or VERIFIED status claimed before results and artifact inspection.
- Still unverified: current ticket prices, parking and accessible stadium access until corroborated by district for a named 2026 date; real program photo reuse permissions are not independently established, so no third-party sports photo was added.
