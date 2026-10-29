# 6A District 9 evergreen authority checkpoint — 2026-10-29

**Owner's decision:** Pause all automated scores, win/loss and standings work for this district. Do not publish a hardcoded interim scoreboard. The score-centric PR #6305 was closed unmerged; this authority-only branch supersedes it.

## Source-backed foundation
- 2026–28 UIL alignment: Garland, Garland Lakeview Cent, Garland Rowlett, Garland Sachse, North Garland, South Garland, Wylie, Wylie East.
- The six Garland ISD teams and two Wylie ISD teams compete in Region II District 9. Naaman Forest moved from this district to 5A Division I District 6. Sources: https://realignment.uiltexas.org/alignments/2026/2026_RR-Packet.pdf and https://wylienews.com/2026/02/02/uil-announces-2026-27-realignment/
- UIL 6A top four advance, larger-enrollment two qualifiers go to Division I and other two to Division II. Source: https://www.uiltexas.org/football/playoff-brackets
- Stadium sources: https://garlandisd.net/about/facility-directory/williams-stadium ; https://www.garlandisd.net/about/facility-directory/homer-b-johnson-stadium ; https://athletics.wylieisd.net/facilities/wylie-stadium/directions-parking
- Varsity calendar and ticketing: https://www.garlandisd.net/calendars/athletic-events-calendar ; https://garlandisd.net/programs-services/athletics/ticket-sales ; https://athletics.wylieisd.net/schools/whs/mens-football ; https://athletics.wylieisd.net/schools/wehs/mens-football ; https://events.hometownticketing.com/boxoffice/wylieisd
- Garland calendar mixes varsity and JV; filter carefully. Wylie venue directions page has East/West FM 544 ambiguity in the address body/footer. Guide avoids choosing one unverified variant. Stadium assignments and admission are game-dependent.

## GitHub maintenance
The check-district9-sources.yml workflow performs GitHub-only bounded official source checks on the first day of each month and Tuesdays August–December. January/April/July/October produce quarterly factual review issues even if links work; July 2027 and the 2028 alignment window force dated editorial review. Confirmed 404/410 links produce one updatable GitHub issue. Protected anti-bot / rate limits are inconclusive. Never scrape or derive football results from this monitor. No Cloudflare Worker scheduled jobs.

Content does not update automatically without source-supported edits and protected PRs; these checks provide a defined review cadence. A future authorized score widget is a separate scope.

## Acceptance
1. Run node scripts/ci/verify-district9-authority.mjs and node --test scripts/ci/verify-district9-authority.test.mjs.
2. Verify eight cards, readable names, good source links, stadium notes and ticket paths, accurate playoff rules and canonical/CollectionPage.
3. No score table, W/L or fake seeds; guide precedes advertisements.
4. Only claim production acceptance after protected CI, merge, GitHub deployment and real desktop/mobile tests.

### Selected (not full) 2026 varsity fixture snapshot
Five team/district-labeled varsity matches on October 29, October 30, November 5 and November 6 have been reproduced without results. Official Wylie football calendars (WHS, WEHS) and Garland ISD combined calendar are cited per fixture. The November 5 Wylie East / Lakeview 4 p.m. listing is unusually early; visibly mark it for day-of verification. After the fixture date, maintain it as a dated calendar entry, not a claimed upcoming match or final.
