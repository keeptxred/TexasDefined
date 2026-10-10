# Ackerly Sands Mustangs — individual source audit (Batch 002, 2026-10-09)

**Canonical school page:** https://texasdefined.com/texas-high-school-football-teams/ackerly-sands  
**School district:** Sands Consolidated ISD; Ackerly, Dawson County, Texas  
**Stage:** IMPLEMENTED on staging continuation branch. NOT YET MERGED, DEPLOYED OR PRODUCTION VERIFIED.

## Particular page deficiencies before changes
- Existing 1A UIL profile had no `ackerly-sands` school editorial, no verified Mustangs brown/white identity, and no substantive football history or 2026 coaching transition.
- MaxPreps's **2026** history still assigns former coach *Jacob Massey*, contradicting June 2026 contemporaneous local reporting that he resigned and *Billy Grumbles* was promoted to head football coach with former coach/superintendent Wayne Henderson back as defensive coordinator. The editorial must highlight this source conflict and cite it.
- 2024–25 Sands played Division II; 2026–28 UIL assigns **1A Six-Man Division I, District 5**. Generic claims about 2025 competition cannot silently be applied to the 2026 district.
- Physical address discrepancy: federal NCES 2025–26 Sands CISD lists **201 First Street**, while Sands CISD official contact website lists **501 1st Street**. Neither establishes stadium gate coordinates. Don't send visiting parents to the wrong address.
- Sports references identify **Mustang Field** and estimate capacity at 150, without authoritative local parking/ticket/accessibility instructions. The venue is reported as such, not falsely certified.
- The initial image-search result was an unrelated Mustang field photograph in **Fargo, North Dakota**, so it was rejected. School, local press and photo sites do not establish republication permission for a real football image. Original source-backed brown/white timeline graphics replace fabricated or unlicensed photos.
- **No live responsive rendered page checks yet:** this is an actual code/registry review and sourced external research, not production certification.

## Credible source trail
1. [UIL official 2026–28 1A Division I six-man alignment](https://realignment.uiltexas.org/alignments/2026/1AD1FB2026.pdf): District 5 with **Ackerly Sands, Borden County, Ira, Lamesa Klondike, O'Donnell and Westbrook**.
2. [UIL 2026–28 enrollment rank order](https://realignment.uiltexas.org/alignments/2026/26-28_Rank.pdf): 58 submitted student enrollment for **football realignment**. Do **not** conflate with NCES 232 prekindergarten–12 students in 2024–25.
3. [Lamesa Press-Reporter June 16 2026 issue, page 6](https://www.pressreporter.com/issues/2026-06-16/pages/6/): **Billy Grumbles** is named head coach after **Jacob Massey's** June resignation; **Wayne Henderson** returns as defensive coordinator while remaining superintendent. The report documents the 2025 one-point area-round playoff defeat and the shift from DII back to DI, and describes Grumbles' previous boys basketball coaching achievements and Sands offensive coordination. Source is a dated local newspaper, not purported to be an official district appointment document.
4. [Sands CISD official school home](https://sands.esc17.net/): Mustangs identity, local school culture, alma mater and fight song, 2026 district newsletter.
5. [Sands CISD official alma mater](https://sands.esc17.net/page/Alma_Mater): explicit **brown and white** colors; the source's original song lyrics are not copied into the editorial.
6. [Sands CISD official contact](https://sands.esc17.net/page/contact): current website **501 1st St**, district phone **432-217-2637**.
7. [NCES Sands CISD 2025–26 federal directory](https://nces.ed.gov/ccd/districtsearch/district_detail.asp?ID2=4839120&Miles=20&Search=1&Zip=79749): **Dawson County**, **201 First Street** physical district address, **432-353-4888** directory phone; source differs from Sands website. Neither provides stadium entrance.
8. [Dave Campbell's Texas Football Sands program history](https://www.texasfootball.com/team/sands-mustangs): no reported football titles / finals, **22 reported playoff appearances**, **Mustang Field** with **estimated 150 capacity**, 2024 **8–4**, 2025 **7–4**, 2026 checked October 9 **4–1** (Valley 124–74, Kress 58–0, Water Valley 47–89, Garden City 98–54, Whitharral 59–12). This is an October 9 snapshot and not an automatically updated official 2026 score.
9. [SixManFootball independent archives](https://sixmanfootball.com/teams/sands-mustangs.1546/): reports six consecutive Sands playoff berths (1997–2002) and an 11-game winning streak in 1997; preserve third-party statistical attribution.
10. [MaxPreps historical Sands seasons](https://www.maxpreps.com/tx/ackerly/sands-mustangs/football/history/): contradictory coach labeling still shows Jacob Massey for 2026, demonstrating why the June local reporting should control the 2026 staff paragraph. [MaxPreps schedule](https://www.maxpreps.com/tx/ackerly/sands-mustangs/football/schedule/) updates separately and may be stale.
11. [Texas Prep Football past results](https://usaprepfootball.com/team/sands-mustangs/) records Sands beating Whitharral **82–48** and losing to Miami **58–57** in the 2025 playoffs; the June newspaper independently corroborates the 58–57 area loss.

## Substantive school-specific changes on this branch
- Original six-part overview on verified brown/white Sands identity, tight-knit Dawson County six-man community, **1997–2002** archival streak with attribution, 2024–25 back-to-back playoff appearances and 2025 one-point area exit, 2026 promotion to DI and Grumbles/Massey/Henderson coaching changes.
- Six separate school-specific history/season milestone cards with their own sources and no fake photography, distinct brown/white accent label, original seven-question FAQ, individual title/description and official/authoritative outbound links.
- Current head coach not blindly taken from stale MaxPreps; disclaimer on the county/school street number conflict, unofficial stadium seating figure and current visitor/ticketing gaps.
- Source-backed school ↔ Dawson County reciprocal links, protected against missing optional directory joins.
- No forced article length, fake rivalries, fictitious state titles, official team artwork or copyrighted team/stadium photos.

**Implementation commits:** editorial `eae236c962db9f5c7222bae4d4ec22a2431449d3`; identity `2f965fabb878a6c7e265365cfde8b4bde259fac8`; outbound `c9961922983f9c8f1fc8f358b8572bc514a236e2`; inbound Dawson `c04b3cbf751bf463ebfc5b8e1da60b84216dea04`.

## Pending QA — never count as VERIFIED yet
- PR #4409 (previous five Batch002 schools) protected merge and deployment must be reconciled first; replay this separate continuation branch preserving new main.
- Relevant football data validation, typecheck/build, protected PR, merge and exact Cloudflare deployed commit.
- Real 1366 desktop/390 mobile screenshot QA on Sands page and `/county/dawson`; source links, one H1, correct title/description/canonical, SportsTeam/FAQ schema, no script error/hydration, no horizontal overflow, reciprocal link.
- Confirm any current official 2026 stadium entrance, admission, ADA and parking; legal reuse license for real Sands football/stadium photo.
- Do not treat the initial unrelated Fargo “Mustang Field” search photograph as an Ackerly source.

**Next assigned untouched school:** Agua Dulce. Keep Ackerly assigned in existing Batch 002; DO NOT claim Batch 003.

## Latest production status — 2026-10-09

Historical IMPLEMENTED / NOT MERGED / NOT DEPLOYED statements earlier in this audit are **dated checkpoints**, superseded by the canonical `docs/football-authority/REGISTRY.json` and completion ledger. This school is now **VERIFIED for technical production browser acceptance**, not merely implemented. The [Batch 002 browser verification #38001430134](https://github.com/keeptxred/TexasDefined/actions/runs/38001430134) succeeded after production [deployment #38001003182](https://github.com/keeptxred/TexasDefined/actions/runs/38001003182) at `47ba103d88e055f3b44c9e7735fbf244885249b9`. The suite checks 25 sitemap entries and all 90 school, county and relevant city desktop/mobile viewport cases, with screenshot artifact #11649772525.

**Editorial caveats remain:** technical acceptance is not licensed team/stadium photography or first-party evidence for game-day ADA gates, parking, ticketing, late-breaking coaching appointments or future scores. Consult each school's current `REGISTRY.json` outstanding follow-ups and sources. No Batch 003.
