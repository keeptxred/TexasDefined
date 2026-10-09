# Alba-Golden Panthers football — individual authority audit (2026-10-09)

**Page:** https://texasdefined.com/texas-high-school-football-teams/alba-golden  
**Campus:** 1373 County Road 2377, Alba, Wood County, Texas  
**Stage:** IMPLEMENTED on continuing Batch 002 GitHub branch; **not yet merged, deployed or production VERIFIED**.

## Actual school-page defects
- The existing generic UIL directory profile did not contain an `alba-golden` program editorial object. It did not explain the real Panthers history, coaching, 2026 district, season-record discrepancies, stadium address or Wood County campus.
- School identity had no verified individual Panthers/colors record. The district athletics site displays real uniform images, but those have no shown reuse grant. Avoid unlicensed photographs/official paw logo.
- Different season sources disagree about the **2024** full win-loss total: Dave Campbell's **5–4** and MaxPreps **5–5**. Do not invent a definitive record; keep a documented unresolved discrepancy.
- The **2025** one-win season (KLTV 1–9; MaxPreps 1–8 with an incomplete nine-game schedule) similarly should be framed as a one-win season with attributed totals and differing data completeness.
- MaxPreps 2026 staff page lists only assistant **Riley Stack**; **KLTV's May 27, 2026 preview** names **Drew Webster** as 2026 *head coach*. MaxPreps separately names him athletic director; preserve source distinction.
- No sourced exact ticket price, certified seat count, accessible gate or parking policy. Third-party 'Alba-Golden Stadium 400 seats' is an estimate, not official capacity certification. KLTV lists a stadium address matching the 1373 CR 2377 campus.
- No real mobile/desktop production rendering was performed. Auditing source code and external school records does not imply a successful live page test.

## Evidence and unique angles
1. [Alba-Golden ISD official athletics](https://www.agisd.com/page/athletic): original team sideline photograph confirms program branding but does **not** authorize reuse; official district contact and current calendar are authoritative sources for trip planning.
2. [District official homepage](https://www.agisd.org/): district slogan 'Grounded in Tradition. Committed to Excellence.', campus address **1373 CR 2377**, district phone **903-768-2472**.
3. [2025–26 NCES Alba-Golden secondary-campus record](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?County=Wood+County&ID=480765000053&Search=1&State=48): campus **Wood County**, shared middle/high campus serving grades 6–12; NCES 2024–25 433 students total **cannot be substituted for a UIL 2026 football realignment enrollment**.
4. [KLTV Panthers football preview, updated May 27, 2026](https://www.kltv.com/2022/05/25/alba-golden-panthers/): **Drew Webster** 2026 head football coach, red/blue/white colors, school stadium **1373 County Road 2377**, 2025 **1–9** finish and new-season context. The URL contains 2022 but the article records a 2026 update.
5. [Dave Campbell's Texas Football Panthers](https://www.texasfootball.com/team/alba-golden-panthers): **0 state titles, 0 state-title-game appearances, 8 listed playoffs**, 2023 **7–4**, 2024 **5–4**, 2025 **1–9**, 2026 early-October snapshot **1–4**, stadium named 'Alba-Golden Stadium' and estimated 400 capacity. DCTF's results list remains dated and must not be represented as an official live UIL standings table.
6. [MaxPreps Panthers history](https://www.maxpreps.com/tx/alba/alba-golden-panthers/football/history/): confirms 2023 **7–4**, but lists 2024 **5–5** and 2025 **1–8**; identifies gaps in archival synchronization. [Staff page](https://www.maxpreps.com/tx/alba/alba-golden-panthers/football/staff/) has assistant Riley Stack, not confirmed head coach.
7. [UIL 2026–28 football 2A Division I alignment](https://realignment.uiltexas.org/alignments/2026/2AD1FB2026.pdf): **District 10** Alba-Golden, Cayuga, Como-Pickton, Frankston, Hawkins, Kerens and Price Carlisle. The current grouping is not the same as 2025 district opponents.
8. [MaxPreps 2026 school profile](https://www.maxpreps.com/tx/alba/alba-golden-panthers/football/): team schedule and future games; absence of certain game results is not evidence of cancellation or final score.

## Source-backed changes actually committed
- New original six-paragraph school narrative addressing real program history and locally documented coaching, five separate distinct recent-season moments plus 2026 UIL realignment, seven focused visitor/program FAQs.
- Original red editorial chronology milestones without copying restricted football sideline photo or official paw emblem; individual SEO title/description, verified Panthers identity and red/blue/white colors.
- Differentiates 2023 strong seven-win run, mixed 2024 record, 2025 downturn, early 2026 1–4 record **as a dated archive snapshot**; no fabricated championship, coach or fresh score.
- School ↔ `/county/wood` reciprocal link grounded to NCES exact campus county, resilient to optional football-directory county lookup failures.
- Stadium versus school address distinguished; no invented season ticket, admission, parking or ADA particulars.

## Checkpoint commits
- Individual editorial: `2a788fcace216a1fa133d39b97bb6849fe3e8e94`
- Identity: `66dc5a4ccffb90c6ceee88f33bd2e5bf314a8a9b`
- School county outbound: `576e9d676a02a09c4173479f31f129271370c625`
- Wood County inbound: `f9cf997c87fb76ce6cedb6d488812d53092d1b8c`

## Unfinished acceptance
- Protected CI, safe merging with latest main, exact Cloudflare deploy and 1366/390px Chrome verification of school+Wood County, one H1, title/description/canonical/Schema, hydration, actual reciprocal links, source URLs and responsive layout.
- Authenticated current season-specific ticketing, parking, accessible gate, stadium photo reuse license and any resolved 2024/2025 historical count discrepancy.
- **Status is IMPLEMENTED only, not VERIFIED.** Next assigned in Batch 002: Albany.
