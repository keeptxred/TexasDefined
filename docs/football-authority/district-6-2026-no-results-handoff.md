# District 6-6A 2026 — source ledger and handoff

State: IMPLEMENTED ON FEATURE BRANCH, NOT YET VERIFIED LIVE. Source review 2026-10-29.

## Scope
URL: /texas-high-school-football-districts/6a-district-6
2026–28 UIL Region I District 6: Allen, Dallas Jesuit, McKinney, McKinney Boyd, Princeton, Prosper, Prosper Rock Hill, Prosper Walnut Grove.

- Preserve shared 192-district UIL roster, enrollment, school links, canonicals, CollectionPage and BreadcrumbList schema.
- New District 6 editorial fixture/ticket/playoff guide follows the school roster and precedes monetization.
- 2026 fixture snapshots are date-labeled; uncertain home field is written as a slash, not a claimed venue.
- Certification Nov 7; first-round playoffs Nov 12–14; four 6A qualifiers split into Division I/II by official enrollment.

## User-approved data boundary — DO NOT OVERRIDE
User PAUSED standings, wins/losses, automated results and records. No scoreboard scraping, no auto W–L, no inferred playoff seeds, no invented finals. Shared getDistrictFootballGames is bypassed for District 6 even if a global feed is later configured. A normal hyperlink to the UIL-partner scoreboard is allowed; do not ingest it without separate rights and explicit approval.

## Maintenance
- scripts/ci/verify-district6-authority.mjs validates ordering, policy, source links, SEO.
- .github/workflows/check-district6-sources.yml tests changed source on PR and push; monthly/on-demand HEAD/GET checks official publisher URL availability and opens one human review issue on consistent 404/410 or seasonal staleness.
- 403/429 and transient network failures are inconclusive, not proof a link is broken.
- The workflow does NOT update content, fixture schedules or standings. Summer 2027 requires a fresh varsity schedule check; 2028 alignment must be reverified when UIL publishes it.

## Source ledger
- UIL calendar: https://www.uiltexas.org/football
- UIL postseason: https://www.uiltexas.org/football/page/football-manual-post-season-information
- UIL brackets: https://www.uiltexas.org/football/playoff-brackets
- Jesuit varsity schedule: https://jesuitrangers.org/sports/football/schedule/2026
- Jesuit realignment and sites: https://jesuitrangers.org/news/2026/2/2/general-jesuit-to-play-in-district-6-6a-in-latest-uil-redistricting-announcement.aspx
- Allen ISD: https://www.allenisd.org/page/tickets
- McKinney ISD: https://www.mckinneyisd.net/o/as/page/tickets/
- Prosper ISD: https://www.prosper-isd.net/page/athletic-information/
- Princeton ISD: https://www.princetonisd.net/departments/athletics/athletic-facilities/jackie-hendricks-stadium
- Public fixture crosscheck (not data license): https://texashsfootball.live/district/6A/6
- Link-only UIL-partner district scoreboard: https://www.maxpreps.com/tx/football/26-27/district/6a-region-i-district-6/?leagueid=28ebe920-dd93-4580-bd88-1bb25e74ff7d

## Release gate
Open PR; pass protected CI; merge if green; validate deployed HTML, title, links, layout at 390px and 320px, ad ordering, and direct Worker where available. Record merge SHA and deployment ID. Do not claim production completion from a feature commit alone.
