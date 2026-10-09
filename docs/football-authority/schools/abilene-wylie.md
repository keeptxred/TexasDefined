# Abilene Wylie Bulldogs — individual authority page audit (Batch 002, 2026-10-09)

**Page:** https://texasdefined.com/texas-high-school-football-teams/abilene-wylie  
**Campus and venue:** Wylie High School and Hugh Sandifer Stadium, 4502 Antilley Road, Abilene, Taylor County, Texas  
**Stage:** IMPLEMENTED on open Batch 002 PR branch; **not merged, not deployed, not production VERIFIED**.

## Individual source-code audit and defects before implementation
- The generic `abilene-wylie` profile has genuine UIL 2026–28 alignment but no Abilene Wylie-specific `program-editorial` object. It lacks the source-verified 2004 championship history, complete four-finals record, coaching eras, Sandifer Stadium visitors guidance, and context about geographically different Wylie ISDs.
- Distinguish the Abilene **Wylie Bulldogs** from the similarly named **Wylie Pirates** northeast of Dallas, and from Abilene **High Eagles** and **Cooper Cougars** under another local school district. Never import metropolitan Dallas Wylie identity into this page.
- Historic four state-final appearances **do not equal four titles**: only 2004 is a win; 2000, 2009 and 2016 are runners-up. A real 2016 4A Division I final must not be presented as a current 2026 game.
- Modern stadium is **Hugh Sandifer Stadium at 4502 Antilley**, physically on campus. It is NOT Shotwell Stadium, Abilene ISD's other venue. Athletic department's separate `The Dog House` is an indoor training facility, not a public game-day stadium.
- No school-authorized photo reuse license documented: the school athletics site shows player/stadium photos, but does not grant reuse rights merely by publishing them. Original source-backed purple/gold milestone graphics replace unlicensed images; do not create false “real game” photos.
- Production live route and real desktop/mobile page could not be independently inspected with the available research browser. This is an individual source-code/official-record audit, **not** a rendering, accessibility or deployment pass.

## Sourced program-specific research
1. [UIL all-time appearances](https://www.uiltexas.org/football/all-time-appearances) — one state title / four title-game appearances: 2000, 2004*, 2009, 2016 (asterisk indicates the win).
2. [UIL 2004–05 state archive](https://www.uiltexas.org/football/archives/P232) and [UIL championship winners](https://www.uiltexas.org/historical-archives/athletics/archives/football/champions.html) — **2004 Abilene Wylie 17–14 Cuero**, 3A Division I; **2000 Gatesville 14–10 Abilene Wylie**, **2009 Gilmer 43–26 Abilene Wylie**, **2016 Carthage 31–17 Abilene Wylie**. No second false title.
3. [UIL 2016–17 Abilene Wylie team](https://www.uiltexas.org/football/state-team/abilene-wylie-2016-2017-football) — head coach **Hugh Sandifer**, assistant **Clay Martin**, mascot **Bulldogs**, school colors **purple and gold**. The historical staff role does not override current staff.
4. [Official Wylie Bulldogs Athletics 2026 staff](https://www.wyliebulldogathletics.com/sport/football/boys/?tab=staff) — **Clay Martin** current head coach, **Jason Meng** offense, **Matt Kates** defense. [Athletics directory](https://www.wyliebulldogathletics.com/directory) corroborates Martin.
5. [Wylie student journalism Sandifer retirement](https://wyliegrowl.com/sandifers-retire/) — coached starting **1985**, retired after 2019–20, 24 consecutive postseason appearances 1994–2017, **285–127–4** lifetime record, championship finals 2000/2004/2009/2016, 2004 quarterback **Case Keenum** behind fourth-quarter rally. The source is school-published journalism, not license permission for its images.
6. [Official 2026 Wylie Bulldogs preview](https://www.wyliebulldogathletics.com/news/116530), dated Aug 27 2026 — 2025 Bulldogs finished **3–3 district**, missed playoffs amid narrow losses to Palo Duro and Lubbock Cooper, beat crosstown Cooper, as **2025 historic context** rather than 2026 results.
7. [Wylie official facilities](https://www.wyliebulldogathletics.com/facilities) — **Hugh Sandifer Stadium**, 4502 Antilley Road, and separate indoor `The Dog House` at same address; photos visible but license unconfirmed. Main athletic phone **325-690-1181**.
8. [NCES Wylie High School record](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=484650005293) — physical campus **4502 Antilley, Abilene, Taylor County**; NCES preliminary 2025–26 physical directory, 2024–25 1,537 students (do not treat that as UIL submitted 2026 enrollment); school contact 325-255-1908.
9. [UIL 2026–28 alignment 5A Division II](https://realignment.uiltexas.org/alignments/2026/5AD2FB2026.pdf) — District 2 Abilene Wylie, Abilene Cooper, Amarillo Palo Duro, Lubbock Cooper/Coronado, Wichita Falls Legacy/Memorial. Different UIL divisions from Abilene High.
10. [Current official 2026 game schedule](https://www.wyliebulldogathletics.com/sport/football/boys/?tab=schedule) — source for updates and ticket guidance, not guaranteed upcoming dates or parking/ADA without confirmation.

## What was actually implemented on branch
- Distinctive original Wylie school profile with six researched paragraphs and six actual time-stamped source-backed milestones, original seven-question FAQ, official head coach and staff, 2026 schedule and game-day resources.
- Corrected current identity to **Bulldogs, purple and gold**, sourced to UIL; careful original graphic accents rather than fake team seal or unlicensed documentary photo.
- Unique Wylie SEO title and description, primary-source linked 2004 championship and Sandifer-era context, disambiguation of **Wylie ISD (Abilene)** from **Wylie Pirates (Dallas metro)**.
- Real on-campus Sandifer Stadium name and address and explicit unverified ticket/ADA/parking details; no confusion with Shotwell or the indoor training Dog House.
- Added dedicated Wylie → `/county/taylor` fallback, Taylor County → Wylie inbound football story, and relevant Wylie → `/texas-high-school-football-teams/abilene-cooper` current division-opponent link.
- No invented state crowns, current records, historically unsupported alumni, current rivals beyond documented competition, school-specific photo permissions or future football scores.

**Code commits:** `6065571380174fd08ce60292167fba753b46ded5` (research editorial); `9aff87b27575c9891adc46f702f1c249eb9c056a` (identity); `d56bb698b1653ee409416ff3c3a2e2298782dc47` (Wylie school/town/county links); `d69b88490aca6346bb7d32ded4568f05b0101a85` (Taylor inbound).

## Outstanding and NOT claimed passed
- Required build/typecheck + protected Merge Gate; merge a fresh branch safely without bypassing checks; Cloudflare deployment and exact commit attribution.
- Independently run real Chrome at 1366 and 390 px on school and Taylor County; school identity/H1/title/canonical/Breadcrumbs/SportsTeam/FAQ, visible milestone sources, correct address and reciprocal links, zero React errors/hydration/overflow and realistic original graphics.
- Current 2026 home game gate, parking map, ticket pricing, accessibility source and commercial rights for a real school/stadium photograph remain not established.
- School is **IMPLEMENTED only**. Batch 002 has five individual implementations, ZERO VERIFIED until post-merge Chrome acceptance.
