# Brownsville Hanna Golden Eagles — Batch 007 individual football authority audit

**Checkpoint:** October 20, 2026. Canonical https://texasdefined.com/texas-high-school-football-teams/brownsville-hanna . **IMPLEMENTED on unmerged Batch 007 draft PR, NOT published/live production VERIFIED.**

## Unique program facts and source-level quality correction

- Brownsville ISD's own history dates **Brownsville High School's new Price Road campus to 1967** and **the name Hanna High School to 1974** for administrator Homer Hanna. Current school is **Hanna Early College High School**, Golden Eagles, **Gold/Brown** colors, **2615 E Price Rd, Brownsville TX 78521**, office **956-548-7600**. MaxPreps footers give ZIP 78520; use first-party school ZIP 78521.
- 2026 varsity head football coach and athletic coordinator **Mark Guess** is named in *first-party* school athletics coach bio and directory. Don't use a coach from other BISD Brownsville teams.
- 2026 UIL classification **5A Division I District 15** in official UIL 2026–28 source and canonical registry. Old Hanna seasons appear as **6A**; don't convert older season class into 2026 alignment.
- The 2026 school-operated football calendar has site/date/opponents and **zero completed scores**. Independent MaxPreps Oct16 update reports **2–5 / 1–2 district through Oct 15** from: Aug28 Edinburg L8–17, Sep3 Sharyland L28–34, Sep11 Edinburg North W52–21, Sep18 **Brownsville Veterans Memorial L20–21**, Sep25 **CORPUS CHRISTI Veterans Memorial L0–34**, Oct2 Harlingen South W22–16, Oct15 Weslaco East L21–22. Identical “Veterans Memorial” names refer to different Texas districts and must never be mistaken for each other.
- Hanna hosts via **multiple BISD stadiums**: first-party calendar identifies **Sams Memorial Stadium** and **Veterans Memorial Stadium** for particular home-designated games. School Price Road building is NOT any stadium spectator gate. Away Oct22 CC Carroll at Corpus Christi Cabaniss Stadium; home Oct30 Flour Bluff at Sams, final Nov7 Rivera-designated away game at Sams in Brownsville. Actual stadium gates/ADA/parking/ticket prices must be checked for each fixture.
- Brownsville ISD official feed announced phased 2026 tickets for six specific schools (Hanna, Lopez, Pace, Porter, Rivera and Veterans Memorial) via **GoFan**, not a fabricated universal ticket link.
- DCTF school football history: **18 playoff appearances**, **no UIL football state-final or football championship**, 2018 9–2 season, 2025 2–8 season. This individual campus history and scorebook are distinct from other Brownsville teams. Original seven program-specific milestones and six original FAQs include 1967/1974 origin, 2026 coaching, 2026 5A classification, Brownsville-vs-Corpus Christi names, stadium choices.

## Citations

- [Official Hanna ECHS history new Brownsville High campus 1967 and Hanna rename 1974](https://hannaechs.bisd.us/about-us/history)
- [Hanna first-party 2615 E Price Road school mascot Golden Eagle/colors Gold-Brown](https://hannaechs.bisd.us/page/contact/)
- [Hanna official Mark Guess 2026 head coach/athletic coordinator](https://www.hannagoldeneaglesathletics.net/Staff/Bio/23802)
- [Hanna school-operated football 2026–27 opponents, specific venues, blank final scores](https://www.hannagoldeneaglesathletics.net/sport/football/boys/)
- [Hanna official school athletics staff directory 2026 coaching and coordinator](https://www.hannagoldeneaglesathletics.net/directory)
- [BISD GoFan 2026 six school football ticketing](https://www.bisd.us/live-feed?page_no=1)
- [MaxPreps seven reported 2026 finals, 2–5 and one point 21–22 Weslaco East Oct15](https://www.maxpreps.com/tx/brownsville/hanna-golden-eagles/football/schedule/)
- [DCTF Hanna Eagles 18 historical football playoff appearances, no state finals, 2018 9–2](https://www.texasfootball.com/team/brownsville-hanna-eagles)
- [2026 UIL 5A Division I official football alignment vs older 6A seasons](https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf)
- [DCTF Brownsville Veterans Memorial Chargers (one Hanna 2026 opponent); separate from CCVM](https://www.texasfootball.com/team/brownsville-veterans-memorial-chargers)

## Code/editorial changes already committed

School-specific intro/development/overview, first-party current coach/contact/ticket source, exact 2026 results/fixture grid, 7 sourced milestones, 6 unique FAQs, distinct independent gold/brown graphics using scored results only, no copyrighted Golden Eagle school logo/photo, exclusive school SEO, Cameron County ↔ Hanna contextual football links (preserving future other Brownsville team entries).

## Remaining QA

Verify game-day GoFan event details, first-party final scores when possible, correct stadium spectator gates/ADA and student-photo rights, protected branch typebuild/CI, merge/Cloudflare production Worker version and 1366/390/320 Chrome canonical/meta/FAQ/sitemap/county/accessibility checks. **Status IMPLEMENTED, not VERIFIED**.

## October 21, 2026 — direct latest 2026 Hanna result verification link
The existing Brownsville Hanna school model correctly records its **October 15 Weslaco East home 21–22 loss** and 2–5 season snapshot, but lacked the optional `season.latestResultSourceUrl` that powers the explicit reader action to verify the most recently reported game. Added the exact [October 16 published Weslaco East–Hanna dated recap](https://www.maxpreps.com/news/Zzg6lEGxOk67J-nbLAj7vQ/football-recap-weslaco-east-comes-from-behind-to-top-hanna.htm), corroborated by [Weslaco East's 2026 MaxPreps varsity listing](https://www.maxpreps.com/tx/weslaco/weslaco-east-wildcats/football/) showing **22–21 on October 15**. This does not make the underlying third-party database an official certified UIL scoreboard. No schedule/score/coach/venue/county or logo claim was modified, and the school remains one of 25 assigned Batch 007 `IMPLEMENTED` records until protected release QA.

