# Bay City Blackcats — football authority Batch 005 individual source audit

## October 14, 2026 — batch-level production acceptance (current)
**Production technical status: VERIFIED. Formal editorial acceptance: IN PROGRESS.** This school was included in the successful exact-release [Batch 005 Chrome suite](https://github.com/keeptxred/TexasDefined/actions/runs/38586361713) against deployment `d1fca0f12cc5955884486ddbdb67cad9c2efa5bc` ([successful deploy](https://github.com/keeptxred/TexasDefined/actions/runs/38584969227)). The suite passed 1,233 checks across all 25 schools (desktop/mobile, SEO, schema, rendering, schedules, sitemap, and reciprocal county links); [91-file browser evidence artifact](https://github.com/keeptxred/TexasDefined/actions/runs/38586361713/artifacts/11905997191). The individual school was among the 25 passes, but **1,233 is the combined batch check count**, not an individual-school count.

The current formal Supabase `td_authority_page_acceptance` record remains `in_progress`; the related factual verification status is `awaiting_editorial_verification`. Final editorial acceptance must document independent claim-level source corroboration and all nine `td_maintenance.accept_authority_page` evidence dimensions, including photo-rights disposition and qualified accessibility/visitor information. Do not infer that automated success proves every 2026 score, historic detail, original image license, live parking policy, or a human accessibility review. Earlier notes below retain their original research dates and are **historical checkpoints**, not present deployment status.


Research: October 10, 2026. **Implemented on recovered Group2 release branch. Production deployment and individual live browser acceptance have NOT yet been certified.** Route: `/texas-high-school-football-teams/bay-city`.

## Existing-page-specific defect audit
The existing UIL roster gives Bay City Blackcats's classification 4A Division 1 District 11, but the main branch lacked any school-specific football editorial object and primary-source campus identity for this exact slug. A generic shared UIL profile cannot responsibly supply this school's historical results, stadium address, coaches or season events. School/county mappings are now explicitly pinned to official campus evidence. The external live page reader returned an access error, so an independent visual production audit remains a blocker.

## Distinctive verified facts
**Bay City's undefeated 1983 title, 2000 title and 2001 return to the final.** UIL's 1983 historical team account records Ron Mills' Blackcats finishing 15–0 with a 30–0 state-final victory against Lubbock Estacado. UIL also records a 24–2 2000 Class 4A Division I win over Denton Ryan, followed by Bay City's 2001 runner-up finish against Ennis. Bay City ISD lists football titles in 1983 and 2000; the older Hilliard High titles are separate school history, not Blackcats titles.

- 1983: **15–0 undefeated Class 4A champion** — Ron Mills coached Bay City to 15–0; the Blackcats shut out Lubbock Estacado 30–0 in the Class 4A final. UIL's archival season account lists Hart Lee Dykes among notable players. Source: https://www.uiltexas.org/100/football-teams
- 2000: **Second UIL football title** — Bay City beat Denton Ryan 24–2 in the 2000 Class 4A Division I championship final. Source: https://www.uiltexas.org/football/archives/P296
- 2001: **Back-to-back championship-game appearances** — The Blackcats returned to the Class 4A Division II state final the following season, finishing runner-up to Ennis 21–0; this was not a third championship. Source: https://www.uiltexas.org/football/archives/P272

## Official school and visitor resources
- Campus: 400 7th Street, Bay City, TX 77414 — https://bchs.bcblackcats.net/
- Official athletic schedules: https://www.bcblackcats.net/apps/pages/index.jsp?type=d&uREC_ID=4373233
- Published home venue: Bay City ISD Memorial Stadium, 400 7th Street, Bay City, TX 77414 — https://www.bcblackcats.net/apps/pages/index.jsp?pREC_ID=2575446&type=d&uREC_ID=4373233
- Existing official UIL 2026–28 alignment: https://realignment.uiltexas.org/alignments/2026/4AD1FB2026.pdf
- Other records: https://www.bcblackcats.net/apps/pages/index.jsp?type=d&uREC_ID=4373233; https://www.uiltexas.org/100/football-teams; https://www.bcblackcats.net/apps/pages/index.jsp?pREC_ID=2575454&type=d&uREC_ID=4373233
- Correct campus county: Matagorda County; source-linked internal inbound/outbound path `/county/matagorda`
- No current head coach asserted without an independently verified current official appointment.

## Changes introduced
Authored 3 sourced history/season milestones, three unique program narratives and three school-specific FAQs, official school links, separately verified campus vs stadium resources, distinct non-logo color accent, unique search metadata and mascot evidence. Linked program to campus county in both directions, not inferred from a stadium or postal city. Images are intentionally original CSS/editorial treatment only: **no copyrighted photograph or school logo copied**. Sources and caveats appear in page editorial modules.

## Unresolved acceptance and media rights
- Protected checks/merge and production deploy not yet confirmed; desktop/mobile browser/screenshots, sitemap, JSON-LD, page canonical, hydration, accurate county rendering and links must be independently tested after deploy
- Current tickets, game sites, ADA accessibility, parking and entrance changes must be confirmed with the district before a visit
- Genuine team photographs remain unavailable without documented reuse rights, license, attribution and alt text
- Not a school-endorsed page; 2026–28 UIL alignment is not a current game record
- Keep **IMPLEMENTED** status until independent live evidence supports stronger states

## October 13, 2026 — 2026 varsity game results and 10-game schedule
- **Research snapshot:** 6–1 through 2026-10-09; 10 date/opponent/home-away/district entries with only actually reported scores. Public [2026 varsity source](https://www.maxpreps.com/tx/bay-city/bay-city-blackcats/football/schedule/), independently sourced rather than represented as a first-party ISD schedule.
- **Source discrepancy handling:** The schedule snapshot was last updated Sep 28; a newer Bay City team game-results page independently reports wins over Navasota 28–21 (Oct 2) and Sealy 34–7 (Oct 9). Do not interpret the older two unscored schedule rows as unplayed.
- **Acceptance boundary:** the October 13 structured game data and two new school-specific season FAQs are committed on a release branch. Protected CI, exact-SHA deployment and fresh 25-school production Chrome acceptance are still required; no unsupported current coach, game ticket, stadium or ADA guarantees are introduced.
