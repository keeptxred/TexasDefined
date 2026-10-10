# Bartlett Bulldogs — football authority Batch 005 individual source audit

Research: October 10, 2026. **IMPLEMENTED on group-two working branch only; neither production deployed nor live verified.** Route: `/texas-high-school-football-teams/bartlett`.

## Existing-page-specific defect audit
The existing UIL roster gives Bartlett Bulldogs's classification 2A Division 2 District 13, but the main branch lacked any school-specific football editorial object and primary-source campus identity for this exact slug. A generic shared UIL profile cannot responsibly supply this school's historical results, stadium address, coaches or season events. School/county mappings are now explicitly pinned to official campus evidence. The external live page reader returned an access error, so an independent visual production audit remains a blocker.

## Distinctive verified facts
**Three UIL football championships: 1990, 1992 and 1999.** Bartlett's 1A championship sequence spans a decade: 36–28 over Munday in 1990, 33–26 over Sudan in 1992 and 35–6 over Aspermont in 1999. Those are verified championship games, not modern classification claims. Bartlett ISD publishes a separately labeled 2026 varsity football schedule and should be the starting point for contemporary fixtures.

- 1990: **First of three recorded Class 1A championships** — Bartlett defeated Munday 36–28 in the Class 1A championship game. Source: https://www.uiltexas.org/football/archives/P360
- 1992: **Another Class 1A crown** — Bartlett defeated Sudan 33–26; UIL's full playoff text also records its semifinal win over Valley View. Source: https://www.uiltexas.org/historical-archives/athletics/archives/football/playoff_text/92at_bfb.html
- 1999: **Third Class 1A state title** — The Bulldogs defeated Aspermont 35–6, establishing the program's third UIL football championship. Source: https://www.uiltexas.org/football/archives/P296

## Official school and visitor resources
- Campus: 404 N Robinson St, Bartlett, TX 76511 — https://bartlett.txed.net/
- Official athletic schedules: https://bartlett.txed.net/apps/pages/index.jsp?pREC_ID=2678362&type=d&uREC_ID=4436953
- Existing official UIL 2026–28 alignment: https://realignment.uiltexas.org/alignments/2026/2AD2FB2026.pdf
- Other records: https://bartlett.txed.net/apps/pages/index.jsp?pREC_ID=2678362&type=d&uREC_ID=4436953; https://www.uiltexas.org/historical-archives/athletics/archives/football/champions.html; https://www.uiltexas.org/historical-archives/athletics/archives/football/playoff_text/92at_bfb.html
- Correct campus county: Bell County; source-linked internal inbound/outbound path `/county/bell`
- No current head coach asserted without an independently verified current official appointment.

## Changes introduced
Authored 3 sourced history/season milestones, three unique program narratives and three school-specific FAQs, official school links, separately verified campus vs stadium resources, distinct non-logo color accent, unique search metadata and mascot evidence. Linked program to campus county in both directions, not inferred from a stadium or postal city. Images are intentionally original CSS/editorial treatment only: **no copyrighted photograph or school logo copied**. Sources and caveats appear in page editorial modules.

## Unresolved acceptance and media rights
- Protected checks/merge and production deploy not yet confirmed; desktop/mobile browser/screenshots, sitemap, JSON-LD, page canonical, hydration, accurate county rendering and links must be independently tested after deploy
- Current tickets, game sites, ADA accessibility, parking and entrance changes must be confirmed with the district before a visit
- Genuine team photographs remain unavailable without documented reuse rights, license, attribution and alt text
- Not a school-endorsed page; 2026–28 UIL alignment is not a current game record
- Keep **IMPLEMENTED** status until independent live evidence supports stronger states
