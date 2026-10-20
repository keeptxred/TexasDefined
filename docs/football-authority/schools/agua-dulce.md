# Agua Dulce Longhorns — Individual Batch 002 authority audit (2026-10-09)

**URL:** https://texasdefined.com/texas-high-school-football-teams/agua-dulce  
**Status:** Individually researched/IMPLEMENTED on the Batch 002 continuation branch; **NOT merged, deployed or VERIFIED**.

## Deficiencies identified
- No existing Agua Dulce-specific editorial story in `program-editorial.ts`: the generic route supplied UIL alignment and statewide information but not Longhorns coaching, recent playoffs, campus, current 2026 sports facilities or genuine program history.
- No verified Longhorns mascot identity in the dedicated school-identities record. Individual Longhorn identity was source-checked; no unverified official colors were inserted.
- School-specific visitor risks: registered 2026 bleacher replacement and a separate west-campus concession/restroom/sidewalk project. TDLR forecast completion is not proof that work has been completed or that ADA facilities are available on game night.
- Missing source-backed reciprocal `/county/nueces` link when optional football directory county join is empty.
- No school photo with documented license for republication. Do **not** use unlicensed team photos or present an illustration as an authentic school photo.
- Live responsive page and county page not tested in an actual production browser; no such test is claimed.

## Individual research with primary-source distinctions
- [UIL 2026–28 2A Division II alignment](https://realignment.uiltexas.org/alignments/2026/2AD2FB2026.pdf) — **District 16** Agua Dulce, Ben Bolt-Palito Blanco, La Villa, Riviera Kaufer, Santa Maria and Woodsboro. Opponents are current-cycle competitors, not automatic historic rivals.
- [Agua Dulce ISD official directory](https://www.adisd.net/directory) — **Jason Calvez** district athletics leadership; One Longhorn Drive, Agua Dulce, TX 78330 and published district contact. [KIII 3NEWS interview](https://www.kiiitv.com/video/sports/high-school/friday-night-sports-blitz/agua-dulce-full-interview-with-hc-jason-calvez/503-bbadabc4-73fd-47c0-b117-631696795951) specifically calls Calvez head football coach in the 2026 preseason.
- [TDLR football bleacher registration TABS2026016320](https://www.tdlr.texas.gov/TABS/Search/Print/TABS2026016320) — One Longhorn Drive football field and estimated $500,000 2026 bleacher replacement with projected August 31 completion. This registration **does not certify the project was completed**.
- [TDLR west-campus project TABS2026018319](https://www.tdlr.texas.gov/TABS/Search/Print/TABS2026018319) — separately registered estimated $1 million project including football concession/restroom and sidewalks, projected completion December 1, 2026. Do not conflate the two projects or assume current access is clear.
- [Official UIL historical playoff bracket](https://www.uiltexas.org/historical-archives/athletics/archives/football/playoff_text/96at_bfb.html) — documented historic playoffs, including Agua Dulce's historical loss to Menard; primary UIL archives do not establish a state football title for Agua Dulce.
- [MaxPreps Agua Dulce history](https://www.maxpreps.com/tx/agua-dulce/agua-dulce-longhorns/football/history/) — archival 2024 and 2025 seasons, 2025 Yorktown playoff; **third-party** historical sports records, not current official standings. [Current varsity schedule](https://www.maxpreps.com/tx/agua-dulce/agua-dulce-longhorns/football/schedule/) is a live resource rather than guaranteed future kickoff, tickets or venue.
- [Agua Dulce ISD](https://www.adisd.net/) is the correct school and Longhorns identity; distinguish this rural Nueces County campus from other Texas 'Longhorns' programs.

## Actual individual implementation
1. Original six-paragraph school editorial about the Longhorns, Calvez, modern district competition, historical playoffs, recent seasons, and concrete 2026 facility changes.
2. Six distinctly sourced research milestones, original questions and answers specific to Longhorns coaching, classification, visitors and planned facilities; appropriate school-independent visual accents and unique SEO title/description.
3. Separate actual current coach and district athletics source, correct physical field location from Texas project records and explicit ticket/ADA/parking uncertainties; no unverified completion claims.
4. New mascot record; direct `/county/nueces` outbound fallback and inbound Nueces county football guide link with source for campus/field location.
5. No license-uncleared school or stadium image copied. The original milestone components are research graphics, not photographic evidence.

## Known blocked/not verified items
- Parent Batch 002 [PR #4409](https://github.com/keeptxred/TexasDefined/pull/4409) must merge under protected checks, then this continuation branch should be reconciled to its actual merged main state with no force-push.
- Relevant football validation/typecheck/build, protected continuation PR and merge, successful Cloudflare deployment and independently verified live HTML/JS at 390px/1366px for football and Nueces county routes.
- Real stadium project completion, accessibility gates, ticketing, parking policies, and permission for authentic sports photography.
- **Only VERIFIED following independent post-deployment checks.** Source-code changes and CI do not automatically qualify.

**Code checkpoint:** Individual Agua Dulce editorial was already successfully present after the interrupted preceding execution; identity commit `e703d987ccc0a857354670c95bc6e73d508f6465`, school outbound `decc9693f0bb4b5c9491da6d17159f954bd15afb`, Nueces inbound `905a72ab824b6a9d9875118bcc6cfbcd5c3cda78`. Parent branch `football-authority-batch-002-ackerly-sands-20261009`.

**Next assigned school:** Alba-Golden, after resolving actual merges/verification for preceding seven school implementations.

## Latest production status — 2026-10-09

Historical IMPLEMENTED / NOT MERGED / NOT DEPLOYED statements earlier in this audit are **dated checkpoints**, superseded by the canonical `docs/football-authority/REGISTRY.json` and completion ledger. This school is now **VERIFIED for technical production browser acceptance**, not merely implemented. The [Batch 002 browser verification #38001430134](https://github.com/keeptxred/TexasDefined/actions/runs/38001430134) succeeded after production [deployment #38001003182](https://github.com/keeptxred/TexasDefined/actions/runs/38001003182) at `47ba103d88e055f3b44c9e7735fbf244885249b9`. The suite checks 25 sitemap entries and all 90 school, county and relevant city desktop/mobile viewport cases, with screenshot artifact #11649772525.

**Editorial caveats remain:** technical acceptance is not licensed team/stadium photography or first-party evidence for game-day ADA gates, parking, ticketing, late-breaking coaching appointments or future scores. Consult each school's current `REGISTRY.json` outstanding follow-ups and sources. No Batch 003.
