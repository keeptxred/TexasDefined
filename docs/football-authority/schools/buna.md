# Buna Cougars — Batch 008 individual authority audit

**Checkpoint:** 2026-10-25  
**Canonical:** https://texasdefined.com/texas-high-school-football-teams/buna  
**Status:** IMPLEMENTED on Batch 008 branch only; not merged, deployed or production VERIFIED.

## Unique defects found

- Buna's official academic-campus address is **711 County Road 734**, while a third-party football page shows 177 FM 253. The school-owned address controls the campus field; neither address is asserted as a spectator gate.
- Current 2026 head coach is **Kevin Terrier**; the current team page abbreviates him as K. Terrier while the 2026 history page provides the full name.
- Buna entered 2026 after consecutive **1-9** seasons in 2024 and 2025, making the current rebound important context.
- The October 23 Tarkington result was stale on some schedule crawls, but statewide finals now verify **Buna 46, Tarkington 0**.
- Dave Campbell's lists **18 playoff appearances, zero state titles, zero title-game appearances**, and Cougar Stadium.
- Buna ISD identifies the district as **Home of the Blue and White** and uses Cougars identity.
- Campus/district is in **Jasper County**.

## Source-backed implementation

- UIL alignment: 3A Division I District 10.
- Official Buna High calendar confirms the October 23 senior-night varsity event and October 30 Kirbyville road game.
- 2026 ledger through October 23: Kountze W 27-7; Woodville W 29-20; Huntington W 48-0; South Beauregard W 37-21; East Chambers L 7-35; Orangefield L 7-20; Anahuac L 40-41; Coldspring-Oakhurst W 20-8; Tarkington W 46-0.
- Current record is **6-3 overall, 2-3 district**.
- DCTF history supplies the 2018 8-3 season, consecutive 1-9 years, playoff count and stadium name.
- Jasper County reciprocal link and original source-derived graphic added.

## Sources

- Buna High official homepage: https://hs.bunaisd.net/
- Buna High calendar: https://hs.bunaisd.net/page/page_calendar?calID=133822
- Buna ISD schools / blue-white identity: https://www.bunaisd.net/88689_2
- MaxPreps schedule: https://www.maxpreps.com/tx/buna/buna-cougars/football/schedule/
- MaxPreps full coach history: https://www.maxpreps.com/tx/buna/buna-cougars/football/history/
- Dave Campbell's Buna history: https://www.texasfootball.com/team/buna-cougars
- October 23 statewide finals: https://www.si.com/high-school/texas/texas-high-school-football-final-scores-results-october-23-01m5mzcsazsr
- UIL Buna/Jasper county school information: https://www.uiltexas.org/form/aplus/register.php?-action=browse&-recid=10067

## Remaining release work

Protected CI, merge, deployment and bounded live production acceptance remain required. Exact stadium spectator entrance/accessibility details remain unverified.
