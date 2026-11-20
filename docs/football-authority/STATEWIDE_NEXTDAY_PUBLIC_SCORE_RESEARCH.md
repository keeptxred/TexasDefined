# Statewide high-school football score freshness and public-source review

**Applies to** every publicly resolvable football route in the current UIL 2026–28 and featured/private-school registries, including team guides and district hubs. **No live scores, paid APIs, credentialed feeds or automatic score publication.**

## How the scheduled research works

One centrally shared GitHub Actions workflow, [`.github/workflows/refresh-football-scores-brackets.yml`](../../.github/workflows/refresh-football-scores-brackets.yml), covers the entire inventory. A separate cron per school is redundant and unmanageable. Runs **every day in August–December**, after typical game nights, and **every Saturday year-round**, at 17:37 UTC (late morning or early afternoon Central). A source-change push to `main` also immediately runs research.

`scripts/data/research-football-pages-statewide.mjs` scans the current 1,268 UIL 2026–28 aligned team profiles, the 192 district hubs, and the additional distinct featured/private-school routes. It identifies dated, already-published season summaries and fixtures that are now past due without a corroborated final. It researches all flagged currently eligible pages within a **180-page/day cap**, prioritizing the immediately preceding game's date, and rotates overflow deterministically. Each researched page uses a specific opponent/date search when a past fixture has a known opponent, otherwise the full school name or class/division/district query.

Two public news RSS discovery services, Google News and Bing News, contribute headline, date, publisher, and URL *only*. No protected scoreboard HTML or article body is scraped. Headline links are review **leads**, not independently verified results. A source can be down, incomplete, wrong or contradict another report; such failures are logged, not treated as zero or a final. The game date is interpreted in `America/Chicago`.

Every run uploads `inventory.json` (full audited route universe), `research.json` (dated searches and evidence), and `research.md` (prioritized correction report), and updates one deduplicated issue titled **“TexasDefined football: statewide next-day finals and district standings review.”** After investigating a reported final, research staff or a connected assistant updates the authored fixture and source URL in a **normal source-backed pull request**. Required CI, protected merge, deployment and live site verification are separate from the data lookup. A scheduled lookup by itself **does not change or publish scores or standings**.

## Current source corrections and page policies

The November 20 research pass identified existing October fixture staleness and made **54 manual, source-checked final corrections** to district ledgers:

- **6A District 5:** 12 results from Oct. 23, Oct. 30, and Nov. 5, cross-checked against [SI's dated District 5 score listings](https://www.si.com/high-school/stats/texas/25085-division-6a-region-1-district-5/football/scores?date=2026-11-05), MaxPreps and Pigskin Prep.
- **6A District 21:** 12 results from Oct. 22 through Nov. 6, verified against [Pigskin Prep](https://www.pigskinprep.com/showfreeschedules.asp?distID=282&yr=2026) and [Houston regional reporting](https://hou.insidehighschoolsports.tv/scores/2026/week-11/?class=6a). Reported District 21 W–L is derived only from completed league fixtures, not claimed as UIL seed order.
- **4A Division I District 11:** 6 results from Oct. 30 and Nov. 6, corroborated by [MaxPreps's UIL-partner scoreboard](https://www.maxpreps.com/tx/football/26-27/division/division-4a-1/scores/?date=11%2F6%2F2026), [SI](https://www.si.com/high-school/stats/texas/29243-division-4a1/football/scores?date=2026-11-06), and school schedules.
- **6A District 16, CFISD:** 12 results from Oct. 22 through Nov. 7, checked against published district finals and [CFISD's official qualifier report](https://www.cfisd.net/cfisd-news-details/~board/2026-2027-cfisd-district-news/post/six-cfisd-football-teams-qualify-for-playoffs). These join the four previously documented Week 8 finals; the older October 18 district standings remain separately labelled historical.
- **6A District 22, Katy ISD:** 12 results from Oct. 22 through Nov. 6, checked against [MaxPreps](https://www.maxpreps.com/tx/football/scores/?date=11%2F6%2F2026), [Inside High School Sports](https://hou.insidehighschoolsports.tv/scores/2026/week-10/?class=6a) and [Pigskin Prep](https://www.pigskinprep.com/showscores.asp?cid=8&wk=11&yr=2026).

The individual district score ledgers remain the canonical, sourced data. `applyVerifiedDistrictFinalsToTeam` reuses the already-reviewed district finals for their matching school profile pages, without a second crawler or score copy. It never silently changes a contradictory independently authored final; conflicts require investigation. It shows an explicitly partial record if only district results are known. It never invents a complete statewide record, championship, seed, tiebreak, or postseason fixture.

**District 16-6A:** The site separately presents the November 12 CFISD official confirmation that Cypress Falls, Cypress Lakes and Langham Creek were 6–1 co-champions and Cypress Woods 4–3 fourth-place qualifier, with a direct link to [CFISD](https://www.cfisd.net/cfisd-news-details/~board/2026-2027-cfisd-district-news/post/six-cfisd-football-teams-qualify-for-playoffs). Its earlier detailed October 18 scores table is explicitly marked historical, not falsely promoted as current. Its twelve late-season finals now have date- and team-specific sourced results. Games with missing or contradictory evidence elsewhere remain review items.

On all team and district pages, unconfirmed past fixtures are **not upcoming games**. They display "final not yet verified" with a clearly identified historical snapshot. Overdue score records, unresolved publisher conflicts, and district-wide standings beyond supported data must be researched further; **the schedule itself is not proof a score has been confirmed**.

## Retired dependencies

`FOOTBALL_RESULTS_FEED_URL` is no longer required by the statewide workflow. The Aubrey two-provider importer cron was retired; its test-only PR validation remains, while the paid-score auto-merge finisher was deleted. Canyon Lake's already functional next-day research schedule remains available independently as a focused supplemental monitor. No new credentials or paid data source is necessary for daily research.

## Acceptance and recovery

- Validate full registry coverage and score freshness: `node scripts/data/research-football-pages-statewide.mjs --validate`.
- Run audited, bounded public research: `node scripts/data/research-football-pages-statewide.mjs --research`.
- Run `node --test scripts/data/research-football-pages-statewide.test.mjs scripts/data/validate-football-research-publication.test.mjs scripts/data/validate-football-district-coverage.test.mjs`.
- Inspect the current canonical, mobile layout, source links, and production Worker build after a protected deployment.
- Treat the issue and artifacts as evidence and a prioritized task queue. Never mark a stale school page fully current merely because the research cron succeeded.
