# Abbott — individual audit and research, 2026-10-08

URL: https://texasdefined.com/texas-high-school-football-teams/abbott

## Current code defects
- No Abbott identity record; generic name hides the Panthers and black/old-gold identity.
- No school-specific history despite a documented 2015 UIL six-man state title and 2012/2022 finals.
- Generic current-season guidance with no official Abbott-specific resource, no source-backed title timeline or verified stadium image.
- Live page fetch failed; this is a code/source audit, not a complete production review.

## Verified research
- UIL names Abbott Panthers, colors black and old gold, 2022 coach Terry J Crawford (historical, not necessarily 2026): https://www.uiltexas.org/football/state-team/abbott-2022-2023-boys-football
- UIL lists 1 state title (2015) and 3 state-final appearances (2012, 2015, 2022): https://www.uiltexas.org/football/all-time-appearances
- 2022 Abbott went into championship final vs Westbrook: https://www.uiltexas.org/press-releases/detail/uil-football-state-championships-information7
- In 2024 playoff semifinals, Gordon defeated Abbott 77–36: https://www.uiltexas.org/football/state-team-mp-archive/gordon-2024-2025-football
- Official school address 219 S First Street, Abbott TX 76621: https://www.abbottisd.org/
- Athletic department staff lists Kyle Crawford as coach/AD but doesn't explicitly name him 2026 football head coach; do not make that claim: https://www.abbottisd.org/apps/pages/index.jsp?pREC_ID=staff&type=d&uREC_ID=143018
- UIL 2026–28 alignment: https://realignment.uiltexas.org/alignments/2026/1AD1FB2026.pdf

## Outstanding
- Verify stadium/game-day rules, 2026 coach and schedule, approved photographic rights and historical rivalries. Do not use unlicensed photos or imply the 2022 coach is current.

## Batch 001 implementation checkpoint — 2026-10-08
- New original program-specific overview and three/four sourced history milestones added to the existing school-editorial pipeline.
- School-color-accented editorial graphics and verified outbound links added without republishing unlicensed photos.
- Individual search title and description, distinct school FAQs and relevant coach/stadium/schedule links implemented where supported.
- Current status: IMPLEMENTED on GitHub branch, **not** production-verified. Required next: complete CI/protected merge, authentic image rights, inbound link inspection, actual mobile/desktop route verification.

## Historically authentic school football photo and alumnus research (2026-10-08)
- Willie Nelson played Abbott High School football as a halfback: PBS documentary biography https://www.pbs.org/kenburns/country-music/willie-nelson-biography ; separate KWTX interview with former teammate's son describes their six-man team and Nelson at left halfback: https://www.kwtx.com/content/news/Willie-Nelson-signs-late-Central-Texas-classmates-1948-yearbook-559401821.html .
- Archival Abbott High School football portrait circa 1950 by Abbott High School, hosted on Wikimedia Commons as **U.S. public domain** from publication without a copyright notice: https://commons.wikimedia.org/wiki/File:Willie-Nelson-Highschool.jpg . The photo is low-resolution (134x200) and should not be upscaled as a full-width image; describe it as historic, not a 2026 team photograph.
- Added a program-specific alumni paragraph, historical milestone, original school-specific FAQ and photo metadata with rights, source and alt text. This does not suggest Willie Nelson played on the modern championship team.

## Individual 2026 page audit and primary-source correction — 2026-10-08
- **Confirmed current coaching from school itself:** [Abbott ISD Kyle Crawford staff biography](https://www.abbottisd.org/apps/pages/index.jsp?pREC_ID=623415&type=u&uREC_ID=421837) explicitly describes him as **athletic director and head football coach**, and lists school office (254) 582-3011. [Official football staff](https://www.abbottisd.org/apps/pages/index.jsp?pREC_ID=staff&type=d&uREC_ID=143018) corroborates Kyle Crawford and three other staff members. The older UIL [2022–23 Abbott team](https://www.uiltexas.org/football/state-team/abbott-2022-2023-boys-football) names **Terry J Crawford** head coach and **Kyle Crawford** among assistants. The existing page was missing the now-supported school-listed head coach and must distinguish those eras. Avoid inferring the exact appointment date or guaranteed future roster from an undated staff bio.
- **Current official events:** [Abbott ISD events calendar](https://www.abbottisd.org/apps/events/) lists **October 9, 2026, 7:30 p.m. varsity Abbott vs Coolidge** and an October 16 away varsity game at Gholson. It changes over time; link as the maintained source without hard-coded future score/availability. [School Football 2025 page](https://www.abbottisd.org/apps/pages/index.jsp?pREC_ID=2684952&type=d&uREC_ID=143018) is explicitly 2025 and must not be presented as the current schedule.
- **Venue vs campus:** [Dave Campbell's Texas Football](https://www.texasfootball.com/team/abbott-panthers) calls the home ground **Panther Field** and estimates seating **250** (not a primary stadium certification). [Texas Department of Licensing and Regulation's fieldhouse construction record](https://www.tdlr.texas.gov/TABS/Search/Print/TABS2024008392) identifies a separate Abbott ISD fieldhouse project at **201 3rd Street**. District postal campus is 219 S. First. Neither alone establishes the home-game entrance, accessible gate or parking rules. The school now gets a venue note that explicitly says to call the district and verify policies.
- **Primary UIL state-final detail:** [UIL 2012–13 archive](https://www.uiltexas.org/football/archives/P148): Throckmorton 72, Abbott 30, **1A Six-Man Division I**. [UIL 2015–16 archive](https://www.uiltexas.org/football/archives/P98): Abbott 40, Crowell 30, **1A Six-Man Division I championship**. [UIL all-time appearances](https://www.uiltexas.org/football/all-time-appearances) supports one Abbott title, three finals total with 2022 Westbrook. [Dave Campbell's](https://www.texasfootball.com/team/abbott-panthers) currently shows 'title game appearances 2', differing from the UIL primary archive; retain UIL's three with source rather than guessing which archive DCTF counts.
- **Historic photograph:** Existing Willie Nelson portrait from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Willie-Nelson-Highschool.jpg) remains 134×200 public-domain archival material, properly labeled as historical, not the 2026 Panthers. The district's accessible football-field images online are **not licensed for re-publication merely because they are visible on the district website**; no such new image is used.
- **Page-specific implementation commit:** `72e5c5a77f7ea05f1db2bd60a9205e5a921cf06a` updates only Abbott's object in `program-editorial.ts`: official current head coach, live 2026 events, venue identity and explicit uncertainties, precise 2012/2015 title scores, and FAQ. Existing alumni/photo material and other school objects remain untouched.
- **Acceptance NOT yet observed:** protected merge, deployment, real mobile/desktop Abbott rendered screenshots, hero/photo natural dimensions, proper canonical/schema/indexability, the Hill County reciprocal Abbott link and browser errors must all pass before changing `DEPLOYED` to `VERIFIED`.
