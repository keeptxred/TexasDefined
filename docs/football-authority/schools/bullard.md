# Bullard Panthers — Batch 008 individual authority audit

**Checkpoint:** 2026-10-25  
**Canonical:** https://texasdefined.com/texas-high-school-football-teams/bullard  
**Status:** IMPLEMENTED on Batch 008 branch only; not merged, deployed or production VERIFIED.

## Unique defects found

- The final UIL 2026-28 alignment puts Bullard in **4A Division I District 8**. Some third-party pages still show Division II and must not control classification.
- Bullard ISD officially appointed **Colton Bradford** head football coach in 2023; the current 2026 roster still lists Bradford.
- Current record is **1-7 overall, 0-5 district** after the October 23 Henderson loss, not an early-season snapshot.
- The MaxPreps Kilgore row labels a 40-6 result “OT,” an internally odd label; the page preserves the final but does not repeat the overtime claim.
- Bullard High's official fight song identifies Panthers and **red, white and blue**.
- Bullard ISD requires approval for external logo use, so no district logo is copied.
- NCES identifies the physical Bullard High campus in **Cherokee County**, despite Bullard's proximity to Smith County.

## Source-backed implementation

- Official Bullard ISD announcement documents Bradford's promotion and earlier playoff-staff history.
- Current result ledger through October 23: Mabank W 63-21; Caddo Mills L 21-36; Ford L 19-20; Kilgore L 6-40; Palestine L 21-35; Lindale L 28-55; Chapel Hill L 35-55; Henderson L 28-59.
- Henderson's own current schedule independently corroborates the 59-28 final.
- Bullard High official school-song page supplies mascot/color identity.
- Official branding page documents logo-use approval requirement.
- Cherokee County reciprocal link and source-derived visual added.

## Sources

- Bullard ISD Bradford appointment: https://www.bullardisd.net/departments/communicationspr/news/news-details/~board/district-news/post/colton-bradford-named-head-football-coach
- Bullard High: https://bhs.bullardisd.net/
- School songs: https://bhs.bullardisd.net/about-us/school-songs
- Branding guide: https://www.bullardisd.net/departments/communicationspr/logosbranding-guide
- MaxPreps schedule: https://www.maxpreps.com/tx/bullard/bullard-panthers/football/schedule/
- Henderson corroborating schedule: https://www.maxpreps.com/tx/henderson/henderson-lions/football/schedule/
- NCES campus record: https://nces.ed.gov/ccd/schooLSearch/school_detail.asp?ID=481206000703&SchoolPageNum=70&state=48

## Remaining release work

Protected CI, merge, deployment and live browser acceptance remain open. Jacksonville and Pine Tree are future games and have no pre-filled outcomes.
