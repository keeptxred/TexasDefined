# Nueces Canyon Panthers — football authority Batch 005 individual source audit

Research: October 10, 2026. **IMPLEMENTED on group-two working branch only; neither production deployed nor live verified.** Route: `/texas-high-school-football-teams/barksdale-nueces-canyon`.

## Existing-page-specific defect audit
The existing UIL roster gives Nueces Canyon Panthers's classification 1A Division 1 District 16, but the main branch lacked any school-specific football editorial object and primary-source campus identity for this exact slug. A generic shared UIL profile cannot responsibly supply this school's historical results, stadium address, coaches or season events. School/county mappings are now explicitly pinned to official campus evidence. The external live page reader returned an access error, so an independent visual production audit remains a blocker.

## Distinctive verified facts
**Six-man Panthers: campus in Barksdale, games in Camp Wood.** The 2026 Nueces Canyon High School football page publishes a varsity schedule separately from junior-high fixtures and lists Coaches Connell, Landry Connell and Dingenary. The campus is in Barksdale, Edwards County, but Floyd Collins Field at Northcutt Stadium is in Camp Wood. Traveling supporters should navigate to the game venue, not to the Barksdale classroom address.

- 2026: **District 16 six-man varsity football** — The official football page offers a labeled 2026 high-school schedule and names the Panthers' district opponents. The UIL alignment is six-man Division I, not eleven-man. Source: https://ncjhhs.nccisd.net/athletics/football
- 2026: **Floyd Collins Field at Northcutt Stadium** — District athletics lists its game field at 301 S Guadalupe in Camp Wood, distinct from the high-school campus in Barksdale. Source: https://ncjhhs.nccisd.net/athletics

## Official school and visitor resources
- Campus: 200 E Taylor Street, Barksdale, TX 78828 — https://ncjhhs.nccisd.net/
- Official athletic schedules: https://ncjhhs.nccisd.net/athletics/football
- Published home venue: Floyd Collins Field at Northcutt Stadium, 301 S Guadalupe, Camp Wood, TX 78833 — https://ncjhhs.nccisd.net/athletics
- Existing official UIL 2026–28 alignment: https://realignment.uiltexas.org/alignments/2026/1AD1FB2026.pdf
- Other records: https://ncjhhs.nccisd.net/athletics/football; https://ncjhhs.nccisd.net/athletics; https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?County=Edwards+County&ID=483324003739&Search=1&State=48
- Correct campus county: Edwards County; source-linked internal inbound/outbound path `/county/edwards`
- No current head coach asserted without an independently verified current official appointment.

## Changes introduced
Authored 2 sourced history/season milestones, three unique program narratives and three school-specific FAQs, official school links, separately verified campus vs stadium resources, distinct non-logo color accent, unique search metadata and mascot evidence. Linked program to campus county in both directions, not inferred from a stadium or postal city. Images are intentionally original CSS/editorial treatment only: **no copyrighted photograph or school logo copied**. Sources and caveats appear in page editorial modules.

## Unresolved acceptance and media rights
- Protected checks/merge and production deploy not yet confirmed; desktop/mobile browser/screenshots, sitemap, JSON-LD, page canonical, hydration, accurate county rendering and links must be independently tested after deploy
- Current tickets, game sites, ADA accessibility, parking and entrance changes must be confirmed with the district before a visit
- Genuine team photographs remain unavailable without documented reuse rights, license, attribution and alt text
- Not a school-endorsed page; 2026–28 UIL alignment is not a current game record
- Keep **IMPLEMENTED** status until independent live evidence supports stronger states
