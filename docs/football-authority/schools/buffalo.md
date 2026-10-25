# Buffalo Bison — Batch 008 individual authority audit

**Checkpoint:** 2026-10-25  
**Canonical:** https://texasdefined.com/texas-high-school-football-teams/buffalo  
**Status:** IMPLEMENTED on Batch 008 branch only; not merged, deployed or production VERIFIED.

## Unique defects found

- Buffalo needed a school-specific 2026 page rather than a generic District 11 shell.
- Buffalo ISD has a first-party football hub and identifies **Trent Jones** as Athletics Director; the district page does not explicitly label him head football coach, so TexasDefined does not overstate that title.
- The 2026 ledger is verified through October 16 at **5-2**, including a 27-14 loss at Teague.
- The October 23 Mildred matchup is clearly scheduled, but the sources reviewed on October 25 did not provide a trustworthy final. The result must stay unresolved rather than inferred.
- Campus is 1724 N Buffalo Avenue. No exact spectator gate, football parking or accessibility route is certified.
- Buffalo High is in **Leon County**.

## Source-backed implementation

- UIL 2026-28 alignment: 3A Division II District 11.
- Buffalo High official homepage supplies Bison identity, campus address and phone.
- Buffalo ISD football and athletics pages provide first-party program/navigation context and Trent Jones athletics leadership.
- Named results through October 16: Iola 35-0, Leon 35-19, Anderson-Shiro 28-0, Thrall 28-38, Warren 59-19, Rice 56-14, Teague 14-27.
- High School On SI independently reports Teague 27, Buffalo 14 on October 16.
- Mildred remains a no-result row pending reliable final evidence.
- Leon County reciprocal link and original source-derived visual added.

## Sources

- Buffalo High: https://bhs.buffaloisd.net/
- Buffalo ISD football: https://www.buffaloisd.net/football
- Buffalo Athletics: https://athletics.buffaloisd.net/
- Buffalo athletics leadership: https://bjh.buffaloisd.net/438865_2
- MaxPreps schedule: https://www.maxpreps.com/tx/buffalo/buffalo-bison/football/schedule/
- October 16 statewide finals: https://www.si.com/high-school/texas/texas-high-school-football-final-scores-results-october-16-01m53bh2k5w8
- District ledger: https://www.texashighschoolfootballhistory.com/showfreeschedules.asp?distID=353&yr=2026

## Remaining release work

Protected CI, merge, production deployment and bounded production Chrome remain required. The unresolved Mildred final is an evidence gap, not a reason to invent a result.
