# Texas High School Softball — Five-Team Full-Authority Research Pilot

**Research date:** October 11, 2026  
**Status:** SOURCE RESEARCH IN PROGRESS. **No individual school pages approved or published.**  
**Season scope:** 2026–27 alignment; official 2025–26 championship reporting and historical team sheets.

The full Texas UIL softball school census is already in `src/data/softball/uil-2026-27-registry.json` (1,192 schools, 160 districts). This pilot begins collecting verifiable, school-specific facts **before creating any public page**. The machine-readable audit is [PILOT_DOSSIERS_2026-10-11.json](./PILOT_DOSSIERS_2026-10-11.json).

The complete-first-release contract requires **38 research dimensions per school** and is enforced by `scripts/softball/authority-contract.mjs` and `scripts/softball/complete-first-release-audit.mjs`. A dossier is not a published page; it must eventually cover all 38 dimensions. Pilot source entries are evidence leads and substantiated historical observations, not a shortcut through the full test.

| UIL 2026–27 school | Conf / district | Distinctive historical lead | High-priority unresolved research |
|---|---|---|---|
| Shiner | 2A / 29 | 2026 2A-DII champion; 2025 runner-up and 15 known UIL state appearances | Home field, 2027 current coaching, complete archive, licensing |
| Ganado | 2A / 29 | 2025 and 2026 consecutive 2A-DI titles, Texas Legislature 2025 tribute | Current staff, precise field/visitor conditions, pre-2025 program history |
| Katy | 6A / 22 | 2015/2019/2026 6A champion, 2026 final 7–2 over Forney | School staff name variants, definitive field, 2027 schedule and full archive |
| Pearland | 6A / 19 | 1996/2010/2023/2026 state titles, 2026 final 6–3 vs Waco Midway | Coach spelling variant, field, 2027 program, title-era team records |
| Amarillo Highland Park | 2A / 1 | Smaller-school case; district-confirmed Hornets, **not Dallas Highland Park Scots** | Current softball coach, verified stadium, official schedule and softball history |

## Source issues found at the very start (do not replicate football mistakes)

1. **A record is not final just because it is labeled “Season Record.”** Katy's 2025–26 UIL state-team submission lists 38–5; Katy ISD's **post-championship** article lists **39–5** following the victory over Forney. The dates and provenance explain the difference. Do not overwrite one without noting its cutoff.
2. **Do not assume the name in an official roster is the canonical staff spelling.** The Katy UIL state-team sheet uses Meghan Brown VanEtta; a school article says Meghan VanEtta; a school directory result lists Megan Vanetta. Verify the correct preferred spelling, identity and 2027 position before publication.
3. **Pearland coach’s given-name variant:** Pearland High's team page and UIL show **Michele Hyden**; Pearland ISD's championship announcement renders **Michelle Hyden**. Verify against staff and cite the display variant rather than presenting two separate coaches.
4. **Shiner season record-source mismatch:** UIL displays **31–7** in its 2026 tournament entry; some third-party histories show lower totals, presumably incomplete submitted game coverage. Don't merge datasets without dates and game-by-game reconciliation.
5. **Amarillo Highland Park is NOT Dallas Highland Park.** Amarillo's `hpisd.net` Hornets appear in 2026–27 2A District 1. Dallas's `hpisd.org` Scots and `scotsillustrated.com` 5A schedules are separate entities. Some search results rank Dallas first; school entity IDs and city must be checked for every source.
6. **No guessed venues or school counties.** District administration addresses are not automatic softball field addresses; some school districts span county lines. Map primary campus coordinates and independently verify the exact girls softball field, access, parking and visitor rules.
7. **Coach snapshots are season-labeled.** The 2025–26 UIL submission is reliable historical evidence but does not prove a coaching staff has been retained for the 2027 season.
8. **Never publish youth information from unofficial lists.** Where public team-roster archives exist, link to the school's or UIL's official record and write about program achievements. Do not copy player addresses, private recruitment contacts or unofficial personal data.

## Most important primary sources

- UIL specific 2026–27 softball district alignments: <https://www.uiltexas.org/softball/alignments>
- UIL 2025–26 state tournament and championship archives: <https://www.uiltexas.org/softball/archives>
- Shiner ISD original girls softball page: <https://www.shinerisd.net/athletics/softball>
- UIL Shiner 2026 state-team archive: <https://www.uiltexas.org/softball/state-team/shiner-2025-2026-softball>
- UIL Ganado 2026 state-team archive: <https://www.uiltexas.org/softball/state-team/ganado-2025-2026-softball>
- Texas House 2025 Ganado title resolution: <https://capitol.texas.gov/tlodocs/89R/billtext/html/HR01528F.htm>
- Katy ISD June 2026 full championship report: <https://www.katyisd.org/news-details/~board/news-headlines-katy-independent-school-district-100/post/softball-dynasty-katy-softball-dominates-to-net-third-state-title-in-11-years>
- Katy High School directory: <https://khs.katyisd.org/our-campus/directory?const_page=3>
- Pearland ISD June 2026 historic title recap: <https://www.pearlandisd.org/news/isd-news-details/~board/pearland-isd-news/post/pearland-oilers-capture-fourth-uil-6a-division-1-state-championship>
- Pearland official softball roster/staff page: <https://phs.pearlandisd.org/athletics-phs/womens/softball>
- Amarillo Highland Park's real ISD: <https://www.hpisd.net/>

## Work required before these become first-release authority pages

For **each school**, complete a single versioned school ID (campus+ISD), all 38 date-stamped researched topics, source-attributed original program narrative, current coach/schedule access, school-specific home field verification, historical brackets and recognitions, county/TEA verification, audience-specific visitor/eligibility content, authentic licensed image, and all required accessibility/SEO/Worker tests. Only then explicitly approve promotion into `published-team-profiles.json` and generate full pages from the approved research record.

### Release discipline

- Keep **all five** pilot pages off the sitemap until the contract passes. This is research, not a set of teaser pages.
- Use one existing optional softball route, not a separate TanStack route per school.
- Run focused `node scripts/softball/validate-pilot-research.mjs` before full CI. It is also part of `npm run softball:authority:validate`, and thereby the canonical protected merge gate.
- As entire teams become evidence-complete, release them as full authority pages in coherent source-validated batches, rather than bulk auto-generating the 1,192-school directory into thin articles.


## Second independent research pass — confirmed October 11, 2026

This is **pre-publication** discovery, not a reason to publish the school pages before their stadium, live-season, history and image investigations are complete. The current machine-readable five-school dossier now records **44 independently referenced preliminary findings and 42 source records**. It also records unresolved blockers rather than substituting invented dates or addresses.

**Shiner:** The original UIL tournament archive confirms Shiner championship years **2001, 2002, 2008, 2011, 2015, 2016, 2024 and 2026**. That is eight championship seasons reported across 15 state-tournament appearances through 2026. Separate [2001](https://www.uiltexas.org/historical-archives/athletics/archives/softball/state/00_01/index.html) and [2002](https://www.uiltexas.org/historical-archives/athletics/archives/softball/state/01_02/index.html) UIL final records reveal 2–0 over Joaquin and 11–1 over Bosqueville, respectively. The [2016–17 UIL team](https://www.uiltexas.org/softball/state-team/shiner-2016-2017-softball) identifies Steven Cerny, establishing an earlier coaching era rather than implying Jason Keller coached every past title. The [2025 2A-DII final](https://www.uiltexas.org/softball/state-bracket/2024-2025-2a-dii-softball-state-results) was a 9–3 **Sundown victory** over Shiner (not a Shiner title). UIL [May 24, 2026 pairings](https://www.uiltexas.org/press-releases/detail/2026-uil-softball-state-tournament-pairings) explicitly show Shiner 31–7 **before the final**. Record dates must appear on the future page.

**Ganado:** Its [2025–26 school schedules index](https://www.ganadoisd.org/departments/departments/schedules) explicitly names a softball schedule. UIL [2026 pairings](https://www.uiltexas.org/press-releases/detail/2026-uil-softball-state-tournament-pairings) list Ganado 33–2–1 **entering** the championship game with Bosqueville, so that number is not automatically a postfinal result. The school itself presently celebrates its 2026 champions; do not imply the school lacks program evidence.

**Katy:** [Katy High campus contact](https://khs.katyisd.org/athletics/contact-us) identifies 6331 Highway Blvd but does **not** establish which side of the campus contains the varsity softball field or where visiting spectators enter. The [Katy ISD June 1 championship release](https://www.katyisd.org/news-details/~board/news-headlines-katy-independent-school-district-100/post/softball-dynasty-katy-softball-dominates-to-net-third-state-title-in-11-years) provides the **postfinal** 39–5 tally following the 7–2 win over Forney, while [UIL's original team sheet](https://www.uiltexas.org/softball/state-team/katy-2025-2026-softball) gives a **prefinal** 38–5 and the pre-2026 titles in 2015 and 2019.

**Pearland:** [Official campus sports calendar](https://phs.pearlandisd.org/athletics-phs/phs-athletic-calendar) has real varsity softball and separate JV filters; the [school's softball ticket page](https://phs.pearlandisd.org/athletics-phs/schedules-ticketing-information/softball) is still displaying May 2026 playoff notices with an apparent inconsistent “Game 3” opponent. It is **not** a trustworthy current-season schedule. The [school general athletics record](https://phs.pearlandisd.org/athletics-phs/general-information) specifically lists **Michele Hyden** as girls athletic coordinator, strengthening UIL's spelling evidence when an ISD story uses Michelle. The [school-issued directions](https://phs.pearlandisd.org/athletics-phs/schedules-ticketing-information/directions-to-fields) and [general athletics page](https://phs.pearlandisd.org/athletics-phs/general-information) identify **3775 South Main** as the campus, **not** the named varsity softball field. City-run softball parks and the unrelated Pearland Girls Softball Association's rented fields must never be automatically identified as the high school's home venue.

**Amarillo Highland Park:** School/entity distinction remains the highest-priority risk. Amarillo's Hornets and its `hpisd.net` ISD are unrelated to Dallas Highland Park's Scots and their `hpisd.org` records. No primary source establishing the Amarillo varsity home softball field, 2027 softball head coach or postseason history was found in this pass; the team remains research-only, not a generic published stub.

### Source quality decision

Official historical tournament sheets may contain incomplete seasonal game tables or prefinal record totals. **Never compute a purported final record from one additional score unless the date and complete schedule are verified.** The same rule applies to coaching staff and venue admission. High school student athlete data is sensitive even when older public roster records are available: link official public team archives, but do not republish identifying student lists or private contact information. School-owned images and logos are not automatically licensed for third-party republication.



## Statewide primary-source honors and school-identity crosswalk (October 11, 2026)

The new [2026 softball championship and MVP reference](./uil-2026-state-champions-and-mvp.json) records **all 11** championship classes, UIL champion school, and 2026 state championship all-tournament MVP from the [May 31, 2026 UIL release](https://www.uiltexas.org/press-releases/detail/2026-uil-softball-state-all-tournament-teams). The honors were selected by the **Texas Girls Coaches Association** and must not be mislabelled a general UIL statewide regular-season MVP. The champions themselves are sourced to the [UIL archives](https://www.uiltexas.org/softball/archives). They are historical team accomplishments—not permission to scrape or republish identifiable minors' roster contact information, images, private details, or college recruiting status.

This found two important **historical versus current-conference mismatches**:

- **Barbers Hill:** the **2026 5A Division I** champion named **Mont Belvieu Barbers Hill** by UIL archives is the school recorded as **Mt Belvieu Barbers Hill** in the **2026–27 softball 6A District 18, Region III** alignment. A future 2026–27 softball page must show the present 6A alignment and the prior 5A state title, both correctly season-labelled. Do not carry the 2026 state division into 2027 district metadata.
- **Jonesboro:** the **2026 1A softball** champion is listed within the **2026–27 UIL 2A softball district matrix**, in District 26, Region IV. That is a *sport-specific alignment list* and must not be mistaken for a claim about the school's overall UIL enrollment-based classification.
- **Name normalization:** UIL archival winner names **Santa Gertrudis Academy** and **Mont Belvieu Barbers Hill** correspond exactly to 2026–27 alignment entries **Santa Gertrudis Acad** and **Mt Belvieu Barbers Hill**, respectively. The crosswalk is written explicitly in every 2026 historical award record, never fuzzy-matched across football, another sport or school.

The source-specific [pilot docket](./PILOT_DOSSIERS_2026-10-11.json) now documents additional evidence:

- **Katy:** official district athletic event calendars identify its home playing venue as **KHS-Softball Field** in February 2025 (e.g., listed softball games versus Klein Oak, Northshore, Sealy and Manvel). The district's campus address at 6331 Highway Blvd still does *not* independently verify the field's public entrance, parking or 2027 access conditions.
- **Ganado:** official Ganado High 2025–26 event calendars name **Ganado Softball Field** for varsity and JV home softball. This verifies a specific softball venue name but not an exact mailing address, visitor/ADA access or future season use.
- **Shiner:** the UIL 2026 2A-DII all-tournament list credits **five** Shiner selections including MVP **Lauren Springfield**; UIL all-time history independently reports 15 state appearances and eight championship years. The historical 2001–02 locally maintained Shiner sports archive references **David Goetz** as head coach and **Paula Lester** as assistant; this is independent research evidence, not school-office confirmation for modern staff. Legacy archived home telephone numbers and email are intentionally not recopied.
- **Ganado:** 2026 2A-DI all-tournament selections include five Ganado entries led by MVP **Saylor Bures**; the independently dated 2025 equivalent selected **Kyla Stancik**. Both are sourced to official UIL documents and labelled by title year.
- **Katy:** 2026 6A-DII all-tournament honors list six Katy entries including MVP **Haley Schmitt**. These are tournament accolades, not current student profiles.
- **Pearland:** 2026 6A-DI all-tournament honors include six Pearland entries led by MVP **Madelyn Guzman**. The school athletic calendar does not by itself identify the varsity softball field's street location.
- **Amarillo Highland Park:** a third-party 2025–26 team page lists coach initials **E. Martinez** and **M. Lieberknecht**, and historical playoff losses to Floydada. The coach names and scores are **unconfirmed** absent a primary school/UIL document; the Dallas Highland Park Scots staff and facilities are unrelated.

The strengthened CI research validator asserts every pilot's facility evidence and source IDs, both verified historical home field names, **all 11 school title/MVP matches to the exact 2026–27 UIL alignment** (including name aliases and classification transitions), no fabricated address/ADA claims, and safety restrictions on unlicensed media and student rosters.

**Remaining first-release blockers:** confirmed current-season head coaches, future schedule sources and release dates, exact school/venue addresses and public access, complete school-specific program history and coach succession, separate TEA/campus identity, original source-backed community reporting, original or licensed softball field photography, visitor rules and parking, school-specific original comprehensive prose, and rendered technical QA. **No single-school pages are authorized by this archive dataset.**

## First-party coaching and campus verification — October 11, 2026

Further original school-site review verified **present published softball staff**, resolving several uncertainties without claiming that an upcoming spring season is already final:

- **Shiner** [school-owned softball page](https://www.shinerisd.net/athletics/softball) lists **Jason Keller, Anastacia Rehak, Patrick Walker and Kailey Moeller**, corroborating the 2025–26 UIL coaching record. The school page does not assign each role to a separately released 2027 roster.
- **Pearland** [official softball page](https://phs.pearlandisd.org/athletics-phs/womens/softball) currently lists **Michele Hyden** (head), **Lori Romero** (varsity assistant), **Haley Jordan** (JV1) and **Kaitlin Owens** (JV2). This resolves the coach's first-name spelling using the school itself. Future season staff still needs a date-specific recheck.
- **Katy** [current school athletics coach directory](https://khs.katyisd.org/athletics/directory) and [staff directory](https://khs.katyisd.org/our-campus/directory?const_page=3) use **Megan Vanetta** for softball head coach. UIL's 2025–26 submission calls the same role **Meghan Brown VanEtta**; preserve that older attributed spelling when discussing the archived season, and do not automatically adopt it as the current directory's display spelling. Judy Whillock is listed in the current school directory as **assistant athletic coordinator**, while UIL's prior-year sheet also lists her as a 2026 softball assistant; those appointments are not interchangeable.
- **Ganado** [official faculty directory](https://ghs.ganadoisd.org/facultystaff-directory1) lists **James Harp** and **Shauna Hazlewood** at the school and **Joshua Ervin** as athletics director. The 2025–26 UIL sheet separately identifies Harp and Hazlewood as team coaches. The current staff directory does *not* specify them as 2027 softball coaches, so that assignment remains unresolved. The [district campus roster](https://www.ganadoisd.org/campus) locates the school at **501 West Devers** and district administration at **210 South 6th Street**. The [facilities map list](https://www.ganadoisd.org/departments/departments/facilities/facility-maps) does not label a softball-specific diamond or visitor entrance.
- **Amarillo Highland Park** [real district live feed](https://www.hpisd.net/live-feed?page_no=27) announces supporter merchandise for its *two newest programs*, softball and baseball, and publicizes an early softball parent meeting. This is district-issued evidence of a comparatively recent school softball initiative, **not** proof of a particular inaugural season or a 2027 coach. Third-party roster staff initials are unverified and Dallas Scots coaching cannot be substituted.

All five structured dossiers record these school-owned citations with reviewed dates. School-site current listings and archival 2026 UIL tournament staff records are deliberately stored **separately**. This prevents a subtle error we previously encountered with football: overwriting historic coach assignments with a newer directory, or implying that a fall-season school website is a published spring-2027 varsity coaching appointment.

## UIL 2026–27 girls-softball calendar and eligibility research

The [season and eligibility source ledger](./uil-2026-27-season-and-eligibility.json) captures the official UIL [2026–27 softball dates](https://www.uiltexas.org/softball). These are **statewide governing dates**, *not* Katy/Shiner/Ganado/Pearland/Amarillo schedules: first practice **January 15, 2027**; scrimmages from **January 30**; games from **February 15**; district certification **April 27**; bi-district **May 1**; area **May 8**; regional semifinals **May 15**; regional final **May 22**; state semifinals **May 29**; and state tournament **June 3–5**. UIL explicitly cautions that STAAR testing can affect actual postseason game scheduling. Individual game and opponent facts still require the official school's dated schedule, not inference from these deadlines.

The statewide guide also points to UIL [Constitution and Contest Rules eligibility](https://www.uiltexas.org/policy/constitution/general/eligibility), including **Section 409's prohibition on athletic recruiting**, and [2026–27 rule changes](https://www.uiltexas.org/policy/2026-27-policy-info/rule-changes). High-school team pages must not assert individualized varsity eligibility, guaranteed college recruiting, or permanent coach/roster status; use school athletics and UIL eligibility personnel for case decisions. The official calendar's scrimmage language is nuanced: retain the UIL source rather than writing a simplified limit that conflicts with the site's unlimited-before-first-game note.

These sources are **reusable statewide rules**, not artificial school-specific filler. Every eventual school page must still have its original, source-attributed coach, full program history, home stadium, schedule, honors and local directions before first publication.


## Primary TEA/NCES campus identification, county and historic enrollment — October 11, 2026

The fully sourced [campus identity crosswalk](./campus-identity-source-crosswalk.json) resolves each of the five **exact state campus IDs** before we write any individual authority page. This prevents the costly high-school-football mistakes of transferring football enrollment, school district headquarters, identical school names or regional labels into the wrong school profile.

| Softball UIL school | State campus ID | **Physical campus county** | 2024–25 reported campus students | Grade span |
|---|---|---|---:|---|
| Shiner | 143903001 | Lavaca | **309, TEA 2025 school report card** | **7–12** |
| Ganado | 120902001 | Jackson | **221, TEA 2025 school report card** | 9–12 |
| Katy | 101914001 | **Fort Bend, not Harris** | **3,543, NCES 2024–25 CCD** | 9–12 |
| Pearland | 020908001 | Brazoria | **3,408, TEA 2025 school report card** | 9–12 |
| Amarillo Highland Park | 188903001 | Potter | **213, TEA 2025 campus comparison** | 9–12 |

**Most significant new correction: Katy High's campus is in Fort Bend County.** The official federal [NCES directory](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=482517002809) lists 6331 Highway Boulevard, Katy High's exact `101914001` state campus number and **Fort Bend County**. Some [TEA Katy ISD district reports](https://rptsvr1.tea.texas.gov/cgi/sas/broker?_debug=0&_program=perfrept.perfmast.sas&_service=marykay&ccyy=2025&dds_report=D5&id=101914001&lev=C&prgopt=reports%2Facct%2Fdistinctions.sas) label the *district* Harris County. Do **not** infer school campus county from Katy ISD county, City of Katy or attendance boundaries. Historical dossier's incorrect county has been corrected before publication. The Katy school serves other county residents, which is distinct from where its campus stands.

**Enrollment methodology:** These are dated 2024–25 *campus/student counts*, not 2026–27 UIL sports cutoff numbers. For [Shiner TEA 2025 SRC](https://rptsvr1.tea.texas.gov/cgi/sas/broker?_debug=0&_program=perfrept.perfmast.sas&_service=marykay&ccyy=2025&from_tprs=2025&id=143903001&lev=C&prgopt=reports%2Fsrc%2Fsrc.sas), **309** covers a combined **grades 7–12** campus; [NCES](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=484011004554) separately reports **311** by its enrollment definition. Never present either as grades 9–12 only, or as football classification enrollment. [Ganado TEA](https://rptsvr1.tea.texas.gov/cgi/sas/broker?_debug=0&_program=perfrept.perfmast.sas&_service=marykay&ccyy=2025&from_tprs=2025&id=120902001&lev=C&prgopt=reports%2Fsrc%2Fsrc.sas) reports 221 for grades 9–12. [Pearland TEA](https://rptsvr1.tea.texas.gov/cgi/sas/broker?_debug=0&_program=perfrept.perfmast.sas&_service=marykay&ccyy=2025&from_tprs=2025&id=020908001&lev=C&prgopt=reports%2Fsrc%2Fsrc.sas) reports **3,408** in its 2025 SRC, whereas an NCES reporting snapshot gives 3,412. Both must retain source, measure, year, and reviewed date. [Amarillo Highland Park TEA campus](https://rptsvr1.tea.texas.gov/cgi/sas/broker?_debug=0&_program=perfrept.perfmast.sas&_service=marykay&ccyy=2025&id=188903001&lev=C&prgopt=reports%2Facct%2Fcomparison_group.sas) explicitly places the school in Potter County with state ID 188903001—different from Dallas Highland Park.

**Campus vs athletic venue:** Shiner's NCES physical school address **510 CR 348** is different from the district softball-page office/footer **505 Texas Avenue**. Katy's 6331 Highway Boulevard is a campus address, not a documented softball spectator gate. Ganado's **501 W Devers** campus and **210 S 6th** district office are distinct; neither is evidence of the field street address. Pearland's 3775 S Main is the campus and general athletics, not an independently geocoded varsity diamond. No public team page should substitute any of these campus addresses for a verified venue entrance.

The strengthened research validator now blocks missing campus IDs, missing explicit physical campus county, accidental Dallas identity substitution, 2024–25 counts presented as 2026–27 current, and the Shiner grades-7–12 population error. This is the type of essential detail that belongs in the FIRST full softball page release rather than a later patch.
