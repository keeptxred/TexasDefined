# District 6-6A 2026 — source ledger and handoff

## 2026-11-07 authority follow-up — implementation and verification

The audit is NOT archived until the new 28-game calendar, unique analysis, editorial attribution, and district-specific guide pass the protected branch checks and production (direct Worker, canonical SSR, 390px and 320px Chrome). PR and deployment evidence belong below.

- Replaced the five late-season listings with a hand-curated complete 28-matchup (seven per school) District 6 regular-season archive. Jesuit's seven district dates checked directly against Jesuit Dallas official varsity; the other twenty-one cross-checked from the publicly published Pigskin Prep district schedule. No game scores, W/L standings, projected seeds, kickoff/venue assumptions, or automated ingestion were added.
- Added District 6 original comparisons: UIL enrollments, district median, five distinct ticket offices, three Prosper and two McKinney programs, public/private participation and the conditional 6A playoff split.
- Added editorial-desk attribution, a displayed actual manual review date, source provenance and corrections links. Suppressed generic affiliate-footer filler for this one district; retained labelled sponsorship.
- Expanded authority CI with 28 distinct opponent pairings, 7 games per team, 7 school-first-party Jesuit fixtures, exclusions for scores/results, original analysis and attribution; scheduled weekly source-link checks in-season plus existing monthly checks.
- The global production HTML checker deliberately accepts both old/new schedule headings while deployment rolls forward; source CI insists on new structure in GitHub, and post-deploy acceptance must confirm 28 rendered rows.

State: MERGED AND PUBLICLY PUBLISHED. PR #6324 merged 2026-10-29 at 494686692ffdc27d5df681d073f500cf0faeffdf. Live canonical HTML checked 2026-11-07: all eight school links, source-attributed guide, dated fixtures, ticket/stadium sources, playoff information and guide-before-sponsor ordering are present. Source review 2026-10-29.

Production acceptance: Added bounded direct-Worker and canonical-domain SSR checks plus one 390px and one 320px production Chrome check in the shared protected deployment workflow (scripts/ci/verify-district6-production.mjs and scripts/ci/verify-district6-responsive-browser.mjs). These new checks must pass on the subsequent protected production run; a source commit alone is NOT evidence that Chrome passed. Cloudflare Browser Rendering screenshot permission returned HTTP 401 during the 2026-11-07 chat verification; this is a scope-specific error, NOT evidence that the site's Worker failed, and no reconnect loop was attempted.

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
PR #6324 is merged and its guide is visibly published on the canonical host. Production deployment recovery for merge SHA 494686692ffdc27d5df681d073f500cf0faeffdf completed successfully in GitHub run 40912663699; that run did not itself perform the new mobile acceptance.

Every subsequent production release must pass the new District 6 canonical/direct-Worker HTML and 390px/320px rendered Chrome checks, as well as the existing protected checks. Record the actual acceptance workflow run before certifying viewport QA. Do not claim that an unexecuted test passed or revive paused score/standing ingestion.
