# Amarillo River Road Wildcats — individual football authority audit
**Reviewed:** 2026-10-09. **Page:** https://texasdefined.com/texas-high-school-football-teams/amarillo-river-road

## Specific defects
- No school-specific entry in editorial registry: generic source directory was not a useful River Road ISD program history or game-day resource.
- Confusion risk: River Road ISD is separate from Amarillo ISD; **Canadian Wildcats** likewise have a different Wildcat Stadium and championship history.
- Existing profile did not explain 16 playoff appearances, zero finals/titles, 2021's seven wins, 2025's one-win year, 2026 coaching transition or three one-point September games.
- Current UIL 3A **Division II** District 1 differs from prior Division I history; should not carry over an old district number.
- 2026 **Gruver score discrepancy**: [DCTF](https://www.texasfootball.com/team/amarillo-river-road-wildcats) says River Road L 27–63, [MaxPreps](https://www.maxpreps.com/tx/amarillo/river-road-wildcats/football/schedule/) says L 27–60. Published season uses MaxPreps with explicit conflicting-score notice; primary scoreboard confirmation remains open.
- Actual school photos, venue gate/parking/ADA and official coach record need first-party sources; web research browser is not live-production acceptance.

## Distinct primary/secondary evidence
- [DCTF Wildcats](https://www.texasfootball.com/team/amarillo-river-road-wildcats) — 16 playoffs, no football finals/titles, 2021 7–5 and 2025 1–10, Wildcat Stadium (listed 1,375 capacity, no certified entrance), 2026 fixtures.
- [MaxPreps 2026 football history](https://www.maxpreps.com/tx/amarillo/river-road-wildcats/football/history/) — identifies Aaron Wampler as 2026 head coach after Bryan Welps in 2024.
- [MaxPreps dated 2026 schedule](https://www.maxpreps.com/tx/amarillo/river-road-wildcats/football/schedule/) — five scores through September 25: Sanford-Fritch 25–24, Tulia 14–54, Farwell 29–28, Gruver 27–60, Highland Park 24–25; campus address 8741 River Rd.
- [UIL 2026 Class 3A Division II](https://realignment.uiltexas.org/alignments/2026/3AD2FB2026.pdf) — District 1 Canadian, Childress, Dimmitt and Friona with River Road.

## Implementation
Individual program overview, official district cycle vs history, 2026 coach secondary-source attribution, five-game dated scores, two one-point victories and one-point loss, 2021/2025 milestones, Wildcat Stadium caution, four source-backed milestone cards, unique SEO and school-specific FAQs. Source code commit `a4b9cbd0fa654c4e0424508c3a0bf3d6f8814578`.

**Status IMPLEMENTED on draft PR #4506, not MERGED, DEPLOYED or VERIFIED.**

Outstanding: district's official current coaching directory, exact colors, certified campus county and reciprocal city/county inbound links, conflicting Gruver score, ticket and venue accessible arrival, rights-cleared authentic photo, CI/merge/deploy, actual responsive Chrome production certification. **Next:** Amarillo Tascosa.

## September 17 Gruver score source conflict — updated October 9, 2026
[MaxPreps 2026 game and opponent schedule](https://www.maxpreps.com/tx/amarillo/river-road-wildcats/football/schedule/) and [Gruver game box](https://www.maxpreps.com/tx/football/game/gruver-vs-river-road-amarillo/9-17-2026/?c=b257e3b5-1427-4e76-90a7-af1a8eef40fb&tab=Fan+Chat) print **Gruver 60–27 River Road**. However the *Amarillo Globe-News* contemporary Week 4 score roundup by Randall Sweet, republished [September 19, 2026](https://www.aol.com/articles/scores-every-week-4-high-134855000.html), prints **Gruver 63–27 River Road**. Both report a River Road defeat, but conflict on Gruver's points. Keep the 2–3 through Sept. 25 record as a dated MaxPreps snapshot and disclose the 60/63 dispute; do not invent a certified UIL correction. Editorial reconciled in `575d8b77387ab73886e40c81363f89c29d573e48`. Production verification pending.

## Individual production browser certification — 2026-10-10
**Production browser VERIFIED** at deployed commit `4b61627a4a36cf3bff9c32e592b3f94a04805075` by [Chrome run 38026402179](https://github.com/keeptxred/TexasDefined/actions/runs/38026402179). The [86-screenshot artifact 11660256304](https://github.com/keeptxred/TexasDefined/actions/runs/38026402179/artifacts/11660256304) includes `desktop-school-amarillo-river-road.png` and `mobile-school-amarillo-river-road.png`. Both viewports: HTTP 200, one H1, correct canonical/metadata, SportsTeam/Breadcrumb schema, sources, school/county links, no JS runtime errors, broken images, missing alt or overflow; school in 25/25 sitemap. Qualified unverified game-day access and photo rights remain unclaimed, not fabricated.
