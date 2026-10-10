# Batch 004 campus-county reciprocal link evidence
Research and implementation date: October 10, 2026. This file records only independently defensible campus counties, NOT football stadium counties. The editorial location, school district service area, and game venue may differ.

| School | County | Evidence to recheck | Implementation |
| --- | --- | --- | --- |
| Arp Tigers (`arp`) | Smith | [Arp ISD campus](https://www.arpisd.org/) in Arp, Smith County | county / school reciprocal |
| Aspermont Hornets (`aspermont`) | Stonewall | [NCES national directory](https://nces.ed.gov/globallocator/) identifies Aspermont school with Stonewall County | county / school reciprocal |
| Athens Hornets (`athens`) | Henderson | [Athens ISD](https://www.athensisd.net/), Henderson County campus | county / school reciprocal |
| Atlanta Rabbits (`atlanta`) | Cass | [Atlanta ISD](https://www.atlisd.net/), Cass County campus | county / school reciprocal |
| Aubrey Chaparrals (`aubrey`) | Denton | [Aubrey ISD](https://www.aubreyisd.net/), Denton County | county / school reciprocal |
| Vandegrift Vipers (`austin-vandegrift`) | Travis | [NCES campus lookup](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=482703012156&InstName=Vandegrift) 9500 McNeil Drive Austin; Leander ISD does not imply Williamson County campus | county / school reciprocal |
| Avalon Eagles (`avalon`) | Ellis | [Avalon ISD](https://www.avalonisd.org/), Ellis County | county / school reciprocal |
| Axtell Longhorns (`axtell`) | McLennan | [Axtell ISD](https://www.axtellisd.net/), McLennan County | county / school reciprocal |
| Baird Bears (`baird`) | Callahan | [Baird ISD](https://www.bairdisd.org/), Callahan County | county / school reciprocal |

On branch PR #4540: `src/routes/$kind.$slug.lazy.tsx` county inbound cards; `src/routes/texas-high-school-football-teams_.$slug.lazy.tsx` outbound county mapping; `REGISTRY.json` nine route records. All 9 link pairs are **committed only** and need real rendered production navigation tests after merge/deploy. No assertion that these schools have been independently verified.

Remaining schools require first-party campus county proof before extending this map, especially metro Austin schools where district boundaries and city postal addresses can be misleading. Current football registry source is UIL alignment, which by itself establishes district/class, **not campus county**.
