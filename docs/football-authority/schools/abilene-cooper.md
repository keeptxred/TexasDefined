# Abilene Cooper Cougars — individual authority research and audit (Batch 002, 2026-10-09)

**Canonical URL:** https://texasdefined.com/texas-high-school-football-teams/abilene-cooper  
**Campus:** 3639 Sayles Boulevard, Abilene, Texas, Taylor County  
**Status:** IMPLEMENTED ON GITHUB BRANCH, NOT MERGED/DEPLOYED/VERIFIED

## Individual diagnosis
- Existing `main` had the core 5A Division II 2026 alignment in the UIL registry but NO Cooper-specific `program-editorial.ts` object, and no verified `abilene-cooper` mascot in `school-identities.ts`. It could not independently narrate the 1967 title game or the 1996 Drew Brees Westlake final.
- Coaching data needs actual **2026** event timing: Aaron Roan was the previous coach, Scott Stewart was publicly named successor on May 27. An undated roster or old news story could mislabel Roan as current.
- Series and history must be distinct from Abilene High (Eagles, seven UIL titles) and the much smaller **Cooper High School in Delta County**. This is **Abilene's Cooper Cougars**, with *zero titles, two UIL state finals*.
- Original map relationship to Taylor County can disappear if the optional TEA lookup drops county; county itself now should point to **two different Abilene ISD programs**, not overwrite the Abilene Eagles card with Cooper.
- No lawfully reusable modern Cougar or Shotwell Stadium photography license confirmed. District publicity/news photos do not authorize republication. School-colors sources are partly secondary; the program's **royal-blue editorial accent is an original non-logo design**, while primary-source-verifiable Cougar identity is displayed without making uncertified colors an official identity assertion.
- Direct live rendering and Chrome mobile/desktop QA not yet observed. The above is page *source* and independent research audit, not a 2026 production certification.

## Individually verified source trail
- [UIL all-time football appearances](https://www.uiltexas.org/football/all-time-appearances): Abilene Cooper **0 state championships, 2 state finals (1967, 1996)**. Abilene High is a separate row.
- [UIL 1967 memorable games archive](https://www.uiltexas.org/100/memorable-games): December 16, 1967; unbeaten Cooper versus unbeaten Austin Reagan; Cooper led **19–7 at halftime** but lost **20–19**, QB **Jack Mildren** accounted for two rushing TDs and one TD pass and final goal-line drive fell short. This is a *runner-up*, not 1967 title.
- [UIL 1996–97 state archives](https://www.uiltexas.org/football/archives/P312): Abilene Cooper **15**, Austin Westlake **55**, 5A Division II final. [UIL centennial Westlake team](https://www.uiltexas.org/100/football-teams) names quarterback **Drew Brees** on that Westlake squad.
- [Abilene ISD Randy Allen recognition](https://www.abileneisd.org/o/aisd/article/1643303): **Randy Allen** played running back on Cooper's 1967 runner-up side, later coached Cougars **1991–98** (66–31–2) and led the 1996 title-game appearance before Highland Park career. Do not misattribute him as 2026 coach.
- [Official Cooper May 27, 2026 hire story](https://www.abileneisd.org/o/chs/article/2937582): **Scott Stewart** new head coach/athletic coordinator, succeeding **Aaron Roan**, who moved to AISD athletics leadership. 22 years professional experience and defensive coordination; school credits Stewart as contributor to **14 consecutive playoff years**, **not 14 years as head coach**. [Current Cooper staff](https://www.abileneisd.org/o/chs/staff?page_no=8) corroborates 2026 role.
- [Official AISD Crosstown Showdown chronology](https://www.abileneisd.org/article/1525088): documented city Eagles–Cougars annual meeting dating to **1961**, full score chronology through 2022, historical Shotwell game-day advice. This older visitor article is not a substitute for **2026 current policy**.
- [AISD 2026 ticket and venue notice](https://www.abileneisd.org/article/2937209): Shotwell Stadium/Annex, **clear-bag policy**, HomeTown Ticketing, **season ticket deadline August 6** expired before Oct 9; call district athletics **325-677-1444 ext 3013** for venue, parking, access and current ticket availability.
- [Cooper campus and news](https://www.abileneisd.org/o/chs): **3639 Sayles Blvd**, (325) 691-1000. [NCES 2025–26](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480744000016): same campus in **Taylor County**, not the separate Delta County Cooper.
- [Official UIL 5A Division II 2026–28 alignment](https://realignment.uiltexas.org/alignments/2026/5AD2FB2026.pdf): Cooper in **District 2** with Abilene Wylie, Amarillo Palo Duro, Lubbock Cooper, Lubbock Coronado, Wichita Falls Legacy and Wichita Falls Memorial. Abilene High Eagles are 5A Division **I** and must not be listed as district-division peers.
- [AISD facility investment report](https://www.abileneisd.org/o/ahs/article/1525931): Cooper's on-campus multipurpose **The Den**, distinct from district game-day Shotwell venue; Abilene High's analogous building is **The Nest**.

## School-specific commits and improvements
1. New independent six-paragraph Cougars program analysis, 7 source-backed historical milestone cards and original Cooper 2026 FAQ; a genuine source-backed state-finals guide rather than generic template.
2. Sourced Cougar identity, original non-logo accent with caveat that school color official documentation remains incomplete, unique search title and meta description.
3. Scott Stewart vs Aaron Roan as distinct leadership eras; 1967 Jack Mildren and 1996 Randy Allen/Drew Brees story kept separate, no fabricated final victory.
4. 2026 5A Division II/District 2 placement, Showdown's school-history significance, clearly expired stadium season ticket info and confirmed home campus separate from stadium.
5. Original related school links to Abilene High Eagles, and **two independent inbound links from Taylor County** with unique NCES campus attribution for each. Nothing was added for an unrelated county or school.
6. No official copyrighted photographs republished; original numerical / text history visuals used. Real-game imagery remains a rights clearance gap, not a fake AI rendering.

**Code commits:** `6df6b41d3104313e6382e65f79029c10db16a7d3` (Cooper original school content), `0ab19292c7cb8cd6fb1fec513877af67c5f4f619` (verified Cougars identity), `9aac8b7d362e07cdb8919da442b461237adce313` (Cooper Taylor and reciprocal Abilene links), `2d2a8b352613d0656b9231a91c0b888e8be3143f` (separate county inbound).

## Outstanding acceptance — never silently pass
- Protected CI and current-main safe merge; production deploy release attribution.
- Independent desktop/mobile Chrome school + Taylor county tests for distinct H1/canonical, valid sources/FAQ schema, responsive typography, hydration errors, internal and reciprocal links, image alt and sports-team identity.
- Full verification of no broken route or conflict with Abilene High; school-specific source corrections after actual browser findings.
- Authentic Cooper historical/game photography requires explicit reusable permissions, not just public image search.
- Current stadium access, ticket, ADA/parking policies and exact kickoff times should remain linked to up-to-date district sources rather than invented.

**Next assigned:** Abilene Texas Leadership. Abernathy, Abilene High and Abilene Cooper are all on branch `football-authority-batch-002-25-20261009` as IMPLEMENTED, not production VERIFIED.
