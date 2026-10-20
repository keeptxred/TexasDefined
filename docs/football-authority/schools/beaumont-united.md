# Beaumont United Timberwolves — Batch005 researched football source audit

## October 14, 2026 — batch-level production acceptance (current)
**Production technical status: VERIFIED. Formal editorial acceptance: IN PROGRESS.** This school was included in the successful exact-release [Batch 005 Chrome suite](https://github.com/keeptxred/TexasDefined/actions/runs/38586361713) against deployment `d1fca0f12cc5955884486ddbdb67cad9c2efa5bc` ([successful deploy](https://github.com/keeptxred/TexasDefined/actions/runs/38584969227)). The suite passed 1,233 checks across all 25 schools (desktop/mobile, SEO, schema, rendering, schedules, sitemap, and reciprocal county links); [91-file browser evidence artifact](https://github.com/keeptxred/TexasDefined/actions/runs/38586361713/artifacts/11905997191). The individual school was among the 25 passes, but **1,233 is the combined batch check count**, not an individual-school count.

The current formal Supabase `td_authority_page_acceptance` record remains `in_progress`; the related factual verification status is `awaiting_editorial_verification`. Final editorial acceptance must document independent claim-level source corroboration and all nine `td_maintenance.accept_authority_page` evidence dimensions, including photo-rights disposition and qualified accessibility/visitor information. Do not infer that automated success proves every 2026 score, historic detail, original image license, live parking policy, or a human accessibility review. Earlier notes below retain their original research dates and are **historical checkpoints**, not present deployment status.


Checkpoint 2026-10-10. **IMPLEMENTED ON BRANCH ONLY — no production/browser certification.** Existing route: `/texas-high-school-football-teams/beaumont-united`.

## Defects identified on the existing page
The canonical UIL generated route had 5A Division 1 District 9 but lacked a dedicated school-specific editorial profile with documented milestones, school identity, season/venue disclaimers, 2026–28 realignment distinction, and source-linked campus-county reciprocity. Existing generic campus enrichment could confuse school, athletic coordinator, county or stadium. Live production DOM could not be independently accessed by the external web reader; therefore visual defects still require post-deploy Chrome inspection.

## Research distinguishing this program
**2025 first winning varsity season under Drenard Williams and Beaumont Bowl**.

Beaumont ISD's November 12, 2025 first-party report documents the Timberwolves' first winning regular football season (6–4) under then-first-year head coach Drenard Williams. A 24–14 victory over Baytown Sterling secured that achievement and a postseason date against Houston Madison. BISD also documents its 2025 Beaumont Bowl rivalry with West Brook and online-only ticketing. United's **basketball** state titles must not be misassigned to football.

- **2025 — First winning regular season**: First-year coach Drenard Williams led the Timberwolves to 6–4 and a postseason berth, per Beaumont ISD, after beating Baytown Sterling 24–14. Evidence: https://www.bmtisd.com/departments/community-and-media-relations/news-archive/news-details/~board/2025-26-bisd-current-news/post/find-a-way-first-year-coach-leads-beaumont-united-to-historic-first-winning-season-and-playoff-return
- **2025 — Beaumont Bowl against West Brook**: District announcement calls the October 24 annual West Brook–United game and associated tailgate the Beaumont Bowl, with a rivalry trophy. This notice describes 2025, not a newly scheduled 2026 game. Evidence: https://www.bmtisd.com/departments/community-and-media-relations/news-archive/news-details/~board/2025-26-bisd-current-news/post/friday-night-lights-and-community-vibes-beaumont-bowl-returns-october-24
- **2026–28 — 5A Division I District 9 program**: UIL alignment lists United in 5A Division I District 9; previous 2025 postseason stories are not a basis to invent a championship. Evidence: https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf

## Actual implemented code and source trails
- Official school: https://united.bmtisd.com/about-our-school — campus 3443 Fannett Road, Beaumont, TX 77705, 409-617-5400
- Athletics resource: https://www.bmtisd.com/departments/athletics/homepage
- Distinct field/district stadium: 5250 Bayou Willow Parkway, Beaumont, TX 77705; requires game-date confirmation.

- UIL 2026–28 alignment: https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf
- Research URLs: https://united.bmtisd.com/about-our-school; https://www.bmtisd.com/departments/community-and-media-relations/news-archive/news-details/~board/2025-26-bisd-current-news/post/find-a-way-first-year-coach-leads-beaumont-united-to-historic-first-winning-season-and-playoff-return; https://www.bmtisd.com/departments/community-and-media-relations/news-archive/news-details/~board/2025-26-bisd-current-news/post/friday-night-lights-and-community-vibes-beaumont-bowl-returns-october-24
- Campus county: Jefferson County; inbound/outbound `/county/jefferson` based on individual campus, not generic district service area.
- Three unique program-oriented narrative paragraphs, sourced milestones, distinct non-logo editorial accent and FAQs/SEO, official links and historical qualification.
- No third-party team images/logos used; legal photo license/attribution remains outstanding.

## Real acceptance still needed
Protected gate, branch merge, deployed production and real mobile/desktop Chrome screenshots, accurate H1, correct canonical/schema, no hydration or broken links, reciprocal county pages, legal image rights, plus game-day venue/ADA/ticket confirmation. **Do not promote IMPLEMENTED to VERIFIED** without those observations. Past years' results and former coaching positions are not asserted as current.

## October 13, 2026 — 2026 varsity game results and 10-game schedule
- **Research snapshot:** 5–1 through 2026-10-09; 10 date/opponent/home-away/district entries with only actually reported scores. Public [2026 varsity source](https://www.maxpreps.com/tx/beaumont/beaumont-united-timberwolves/football/schedule/), independently sourced rather than represented as a first-party ISD schedule.
- **Source discrepancy handling:** The dated 2026 varsity scoreboard lists October 9 victory at Goose Creek Memorial 24–21. The 2025 first-winning-season context remains distinct from 2026 results.
- **Acceptance boundary:** the October 13 structured game data and two new school-specific season FAQs are committed on a release branch. Protected CI, exact-SHA deployment and fresh 25-school production Chrome acceptance are still required; no unsupported current coach, game ticket, stadium or ADA guarantees are introduced.
