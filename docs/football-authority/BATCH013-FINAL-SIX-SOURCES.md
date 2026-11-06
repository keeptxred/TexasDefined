# Batch013 final six — original research leads and current implementation status

Research captured 2026-11-05. **Historical scope:** this section originally documented research leads before the six SSR guides were authored; it is not an acceptance certificate. **Current main-source state as checked 2026-11-06:** all six now have distinct authored editorial entries in `src/data/high-school-football/program-editorial-b013-group5.ts` and `program-editorial-b013-group6.ts`, reachable through `program-editorial-b013-loader.server.ts`. The source contract `scripts/ci/verify-football-b013-first-five-counties.mjs` covers their presence and uniqueness. This supersedes the old claim that these six were un-authored. None is newly **production VERIFIED**: all require exact-release Chrome at 1366/390/320px and protected evidence-only graduation. Three Dallas campus/county reciprocal edges are evidenced separately in `BATCH013-DALLAS-CAMPUS-COUNTIES.md`; do not assume the other three are independently cleared. Never reuse Dallas ISD school sources for Gateway Charter, Highland Park ISD or Jesuit Dallas.

## `dallas-gateway-charter-academy`
- A September 24, 2026 Dallas Morning News report, syndicated at https://sports.yahoo.com/articles/dallas-gateway-charter-academy-forfeits-220440959.html, reports football forfeits and eligibility/roster disruption; an October 15 follow-up https://sports.yahoo.com/articles/dallas-gateway-charter-academy-wants-162701615.html describes plans to finish the season. These are **dated reporting, not a current official schedule or licensed results feed**.
- **Stop before asserting an active upcoming game, guaranteed full season, coach or final record.** Find the school's actual first-party athletics/calendar and independently check the UIL's current status. Do not point readers to Dallas ISD's schedule as this is a charter school.

## `dallas-highland-park`
- The school's official athletics schedule is https://www.scotsillustrated.com/sport/football/boys?tab=schedule (2026–27 varsity, dates, game venues). Distinguish the listed away-game stadiums from Highlander Stadium, and distinguish Highland Park ISD from Dallas ISD.
- A separately reported August 29 Jerry Jones Classic opener was played at The Star in Frisco; this does not make The Star the school's default home stadium. Do not reproduce score listings or proprietary photography.

## `dallas-hillcrest`
- Official school https://hillcrest.dallasisd.org/ identifies **Hillcrest High School**, **Panthers**, campus **9924 Hillcrest Rd., Dallas TX 75230**, and a school athletics section. This campus contact address is not a certified stadium entrance.
- Dallas ISD publishes a separately maintained **2026–27 varsity football schedule** via https://www.dallasisd.org/departments/athletics/schedules . Follow the current varsity link, not junior varsity or freshman; host venue/admission may change.

## `dallas-hutchins`
- Canonical school identity requires care: **Wilmer-Hutchins High School** (Eagles), not a nonexistent separate Dallas Hutchins ISD team. Dallas ISD's official athletics schedules: https://www.dallasisd.org/departments/athletics/schedules .
- February 2026 dated coaching reporting: https://www.texasfootball.com/article/2026/02/26/former-lancaster-head-coach-hired-at-wilmer-hutchins reports Leon Paul hired; confirm the role against a current district staff listing before asserting current tenure. Never copy historic results or infer venue from a district office.

## `dallas-jefferson`
- Official Thomas Jefferson High School football resource: https://tjefferson.dallasisd.org/athletics/sports-schedules/football . Distinguish Thomas Jefferson from Dallas Bryan Adams, W.H. Adamson and other Dallas ISD schools.
- District's current varsity football schedule hub: https://www.dallasisd.org/departments/athletics/schedules . The official football page alone does not establish a 2026 coach, score, ticket policy or exact stadium gate.

## `dallas-jesuit`
- Official Jesuit Dallas Rangers athletics site https://jesuitrangers.org/ and a **dated, event-specific** Sept 4, 2026 football game-day notice https://jesuitrangers.org/news/2026/9/4/football-varsity-football-game-day-info-jesuit-vs-rockwall.aspx identify that matchup at Ranger Stadium and link tickets/clear-bag policy.
- The Sept 4 notice is **not** a universal 2026 admission policy, and a past Ranger Stadium event does not certify the venue of every subsequent game. Jesuit is not a Dallas ISD public campus.

## Remaining release and certification gates

1. Preserve already-authored six guides and loader. Review factual source freshness, especially Gateway's changing football status; do not invent scores, records, stadium gates, admission prices, photographs or logos.
2. Independently verify unresolved campus counties for Gateway Charter, Highland Park and Wilmer-Hutchins from first-party school/TEA/NCES evidence; add county-to-school reciprocity only when established. The Hillcrest, Thomas Jefferson and Jesuit Dallas mappings already have a separate first-party evidence ledger and source contract.
3. Run all 25 Batch013 guides in one **genuine non-skipped** production Chrome acceptance at 1366/390/320px, including reciprocal county, sitemap, canonical/indexability, browser/assets and source/Worker identity checks. Require a separate protected evidence-only graduation PR.
4. **No VERIFIED promotion from source-only CI or this dossier.** Existing Batch012 280/1292 VERIFIED baseline remains intact.
