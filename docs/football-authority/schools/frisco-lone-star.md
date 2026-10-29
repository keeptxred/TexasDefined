# Frisco Lone Star Rangers — authority content and GitHub refresh checkpoint

**Source-review date:** October 29, 2026  
**Canonical:** https://texasdefined.com/texas-high-school-football-teams/frisco-lone-star  
**Implementation:** feature branch `feat/frisco-lone-star-authority-refresh-20261029`; production deployment and responsive browser certification must be confirmed after protected merge.

## Verified improvements
- Replaced retired `sf2.friscoisd.org` school homepage with Frisco ISD's live `https://www.friscoisd.org/o/lshs` and linked the UIL state-final team identity as independent color evidence.
- Original school-specific editorial, source-linked milestones, historical school achievements, Nick Bolton alumni background, date-qualified 2026 head coach Jeff Rayburn from the September 2026 MaxPreps UIL-partner staff listing, campus clarification, direct official 2026 varsity schedule, and official ticket pointer. No student images, official crests, assumed ticket availability, invented venue gates or school affiliation.
- Historical 2015 Class 5A DII runner-up, 2025 Class 5A DI runner-up and 14 consecutive winning seasons through **2025** from Frisco ISD's September 9, 2026 program history. Do **not** extend that streak to 2026 without independently verified final-season evidence.
- Current UIL **2026–28 5A Division I District 5** classification and opponent links provided by the existing shared district engine.
- Lone Star commercial placement moved beneath factual/source sections. Existing statewide monetization behavior for other teams remains unchanged.

## Official evidence
1. Frisco ISD campus/contact: https://www.friscoisd.org/o/lshs
2. Frisco ISD football program history: https://www.friscoisd.org/article/3120877
3. Frisco ISD 2026 varsity football schedule (official original PDF linked from Frisco ISD's 2026 article): https://files-backend.assets.thrillshare.com/documents/asset/uploaded_file/5799/Fisd/4e4f782e-9f60-4246-aa9a-6854740f2f4c/2026-Fball-Schedule-8-21.pdf?disposition=inline
   - School's own schedule article: https://www.friscoisd.org/article/3120877
4. Frisco ISD official tickets: https://tickets.friscoisd.org
5. UIL 2026–28 5A Division I realignment: https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf
6. 2026 dated head-coach staff: https://www.maxpreps.com/tx/frisco/lone-star-rangers/football/staff/\n7. UIL historical team identity/colors: https://www.uiltexas.org/football/state-team-mp/frisco-lone-star-2025-2026-football

## Scheduled source maintenance
**Use the existing** `.github/workflows/check-football-authority-official-sources.yml` (not a duplicate or sitewide crawl). It runs Tuesdays year-round at **12:43 UTC** and additionally Saturdays August–December at **12:23 UTC**. `docs/football-authority/official-source-watch.json` includes exactly one Frisco Lone Star school-owned schedule URL and `www.friscoisd.org` on its explicit allowlist. Requests are limited to **25 official endpoints per run**, rolling across the inventory. Change hashes and availability trigger a source-review issue/PR, not automatic factual claims. The next fixed editorial review deadline is **January 29, 2027**; a new football season requires an explicit official-schedule source update and reassessment of staff, venue and district facts. **Monitoring alone does not update published football facts.**

## Explicitly deferred
User has put a pin in **automated scores, wins/losses, team record, standings and results**. Do not connect providers, scrape MaxPreps or transform scheduled fixtures into finals. Current independent score-feed rights review stays in its separate project/issue. No 2026 score or standings is added here.

## Release acceptance still required
Run focused source contract `node scripts/data/validate-frisco-lone-star-authority.mjs` and existing football validators/build. Protected PR CI, production deployment, page render/canonical/schema, mobile 390/320px, official link responses, and non-duplicated sponsors require direct post-deployment verification before marking live VERIFIED.
