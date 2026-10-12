# TexasDefined women's softball authority — 2026-10-11 release ledger

## Mission and publication guard
Build an independent, durable statewide research resource with real references rather than generating hundreds of thin, duplicated team profiles. Football program alignments must never be relabeled as softball districts. TexasDefined's high-school softball research starts with the UIL softball-specific source, not the football registry. Current and historical information must be separated.

## Implemented in this branch
- `/sports/softball`: statewide source-backed hub with 2026 UIL state champions for all 11 competition slots; current UIL 2026–27 calendar and alignment pointers; selected NCAA Division I team sites; Division II Lone Star Conference and Division III ASC context; NJCAA pathways; official Texas Volts/AUSL professional coverage; USA Softball of Texas youth/adult associations; FAQ, citations, update and methodology notes.
- `/sports/softball/paris-junior-college`: original PJC Lady Dragons profile covering 2022, 2025 and 2026 NJCAA World Series history, Mike Mendenhall's July 2026 arrival, Shelby Shelton's prior tenure, Jack Butler's volunteer program history, distinction between regional and national coaching honors, campus and recruiting verification.
- `/sports/softball/texas-volts`: Round Rock professional team profile with historical launch, Dell Diamond, Cat Osterman, Ricci Woodard, league information and original sources.
- Sports homepage links to softball; all three paths included in `INDEXABLE_STATIC_PATHS` for sitemap and crawl governance.
- `scripts/data/validate-texas-softball-authority.mjs` is connected to `npm run data:validate`.

## Original records consulted
1. UIL 2025–26 champions: https://www.uiltexas.org/softball/archives
2. UIL 2026–27 alignments: https://www.uiltexas.org/softball/alignments
3. UIL 2026–27 calendar: https://www.uiltexas.org/softball
4. PJC 2025 program assistants and new field: https://www.parisjc.edu/news/articles/hosting-prospect.php
5. PJC July 2026 head coach: https://www.parisjc.edu/news/articles/mike_mendenhall_nextheadcoach_softball.php
6. PJC Butler 2002 tribute: https://www.linkedin.com/posts/paris-junior-college_it-was-a-special-day-on-the-paris-junior-activity-7188286301400371200-FVQB
7. NFCA 2025 award scope: https://nfca.org/divnews/njcaa1/njcaa-di-dii-regional-coaching-staff-of-the-year-2025
8. NFCA 2026 All-Americans: https://nfca.org/divnews/njcaa1/njcaa-di-all-americans-release-2026
9. PJC 2026 finish: https://myparistexas.com/pjc-coach-shelton-headed-for-southern-arkansas-university/
10. AUSL team history: https://theausl.com/volts/about/
11. City of Round Rock: https://www.roundrocktexas.gov/news/pro-softball-team-to-call-round-rock-home/
12. NCAA 2026 championship: https://www.ncaa.com/news/softball/article/2026-06-04/texas-wins-2026-ncaa-di-softball-championship
13. Lone Star Conference 2026 DII field: https://lonestarconference.org/news/2026/5/4/lsc-softball-championship-field-released.aspx
14. ASC 2026 DIII standings: https://ascsports.org/standings.aspx?path=softball
15. USA Softball Texas associations: https://www.usasoftball.com/associations/state/texas/

## Editorial cautions
- Butler's western Kentucky upbringing, University of Kentucky attendance and some field-maintenance duties are now **attributed to his own remarks and PJC's field-farewell ceremony**. A Kentucky degree or collegiate playing career, specific U.S. Army coaching assignment, signature workouts and the claimed October 2026 Texas Country Reporter segment remain **unverified** and are not published as fact.
- The PJC 2025 coaching honor was **NJCAA Division I Midwest Regional Coaching Staff of the Year**, shared with Shelby Shelton and Taylor Swisher. It was not an individual or national coaching award.
- PJC's history as described in the published local account of the college announcement includes **2026 fourth nationally and 52 wins**. The 2026 San Jac bracket documents separate Region XIV postseason routes: do not conflate San Jac's title with Paris's advancement path.
- The Texas collegiate list is marked as **curated, not complete**. Links are official athletics-team home pages for readers to obtain current rosters and schedules. Teams, staff, grades, conferences, and league configurations require future checks.
- No team photographs were copied or republished from third-party accounts without license.

## Acceptance criteria and expansion backlog
**Complete for this release** means these 3 newly authored pages build, render on SSR/production without hydration errors, have accessible headings, meaningful citations, official external links, real internal links, metadata, sitemap discovery and pass release CI. Check target routes after release.

**Authority expansion not yet complete:**
- Derive a complete **2026–27 UIL softball school and district registry** from UIL softball alignment files, validate school identity, label every page with verified classification and district, and create profiles only when substantive unique history and authoritative sources are available.
- Expand full varsity program inventory across **NCAA I/II/III, NAIA and NJCAA Divisions I–III** from authoritative season rosters; verify official site and conference before claiming completeness.
- Build original **softball championship archive** by year and division with source URLs, winner/runner-up/venue/date, including private-school TAPPS where primary results permit.
- Expand youth fastpitch, travel, adult and professional content using governing-body calendars; never scrape or publish minors' personal contact details.
- Build accessible directory search/filter and per-team canonical pages only after the source-completeness thresholds are met.
- Independently validate Butler's biography and Texas Country Reporter episode using directly attributable sources before including those claims.
- Run recurring seasonal factual QA (not auto-update history without sources) and check WCAG/SEO, image licenses and actual production.

This ledger intentionally separates delivered work from the much larger ambition to be *the* independent Texas authority on women's softball. It does not claim complete program coverage prematurely.

## Wave 2: complete 2026–27 UIL softball alignment directory (October 11, 2026)

**Added:** `/sports/softball/schools`, source-linked `src/data/softball/uil-2026-27-registry.json`, public `/data/texas-softball-uil-2026-27.csv`, `src/components/softball/SoftballSchoolsDirectory.tsx`.

**Original official UIL alignment PDFs** (all 2026–27 softball, *not* general enrollment or football):
- 2A, revised June 15, 2026: https://www.uiltexas.org/files/alignments/2ASB_Rvsd6-15.pdf — **280 listings**
- 3A: https://www.uiltexas.org/files/alignments/263ASB.pdf — **210 listings**
- 4A: https://www.uiltexas.org/files/alignments/264ASB.pdf — **208 listings**
- 5A: https://www.uiltexas.org/files/alignments/265ASB.pdf — **247 listings**
- 6A: https://www.uiltexas.org/files/alignments/266ASB.pdf — **247 listings**

**Totals:** 1,192 unique school listings, 32 districts per document, 160 sport-specific districts across 4 UIL geographic regions each. Each row retains its exact conference-specific official source PDF, district and region. The 2A matrix includes smaller schools participating in the 2A softball grouping; it does not reclassify all those schools as general 2A enrollment or assert varsity participation.

**Extraction and verification:** `scripts/softball/extract-uil-2026.py` downloads the original, validates PDF heading/season, reads each of eight district columns by its PDF coordinates, detects wrapped school names, checks number of districts, duplicate names within the same conference and district-size bounds, and saves data + CSV. `npm run softball:validate` checks the complete cardinality, provenance, district-region mapping, canonical route and CSV integrity. Original UIL PDFs remain the source of truth if school alignment changes.

**Reader-facing features:** school text search, UIL softball conference, region and district selectors, accessible result count, progressive 50-row pagination, direct official district-PDF links, downloadable CSV, independent source methodology and citation, hub cross-link and sitemap path. Unknown team slugs remain 404; this directory reuses the one optional team route, avoiding an additional large eager route.

**Editorial status:** this completes a *sport-specific 2026–27 UIL alignment listing*, not a confirmed census of active softball rosters, real-time scores, coaching staffs, private-school programs or verified individual-team profile pages. These remain separate unfinished tasks under issue #4652.

**Source-review policy:** compare against UIL's https://www.uiltexas.org/softball/alignments before the 2027 season and whenever updated amendments are published. Never overwrite historical 2026–27 alignment data with next-season documents in place.
