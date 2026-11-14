# Burkeville Mustangs — Batch 008 individual authority audit

**Checkpoint:** 2026-10-25  
**Canonical:** https://texasdefined.com/texas-high-school-football-teams/burkeville  
**Status:** IMPLEMENTED on Batch 008 branch only; not merged, deployed or production VERIFIED.

## Unique defects found

- Burkeville is a **1A Division I six-man** program with real state-title history that the generic page did not explain.
- Current coach is **Keith Hendrix**; 2025 history listed Aaron Hallford.
- Dave Campbell's lists two state titles, three title-game appearances and 25 playoff appearances; historical records identify the titles as **1986 and 2001**.
- A stale DCTF schedule still labels the O'Connell opener cancelled, but both Burkeville and O'Connell game feeds record a **47-0 played final**.
- The October 22 Chester final conflicts by one point: High School On SI and Pigskin Prep report **62-12**, while SETXsports reports **61-12**. The discrepancy is preserved.
- Burkeville ISD campus is 231 CR 2099 in **Newton County**; exact Roy Harper Stadium spectator gate is not certified.

## Source-backed implementation

- Current record **3-4 overall, 0-1 district** through Chester.
- Full result ledger from O'Connell through Chester, with source conflict notes.
- Official Burkeville ISD athletics schedule supplies current district dates.
- Roy Harper Stadium and program-history counts from DCTF.
- Newton County reciprocal link and original source-derived visual added.

## Sources

- Burkeville ISD: https://www.burkevilleisd.org/
- Athletics: https://www.burkevilleisd.org/athletics
- MaxPreps current page: https://www.maxpreps.com/tx/burkeville/burkeville-mustangs/football/
- MaxPreps history: https://www.maxpreps.com/tx/burkeville/burkeville-mustangs/football/history/
- O'Connell opponent corroboration: https://www.maxpreps.com/tx/galveston/oconnell-buccaneers/football/
- DCTF history: https://www.texasfootball.com/team/burkeville-mustangs
- Oct. 22 statewide finals: https://www.si.com/high-school/texas/texas-high-school-football-final-scores-thursday-october-22-2026-01m5mdmq0eey
- Pigskin Prep district ledger: https://www.pigskinprep.com/showfreeschedules.asp?distID=141&yr=2026
- SETXsports score center: https://www.setxsports.com/scoreboard.php
- Historical title years: https://www.lonestarfootball.net/team.asp?S=&T=1591

## Remaining release work

Protected CI, merge, deployment and live acceptance remain open. The Chester one-point score conflict should remain visible until an official district/game book resolves it.
