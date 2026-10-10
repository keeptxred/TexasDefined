# Avalon Eagles — Batch 004 school-specific audit

**Research 2026-10-10. Stage IMPLEMENTED on draft, NOT merged/deployed or production VERIFIED.**

## Individual findings
Class 1A six-man DI; 2005 six-man program origin, 2019 11-game winning streak and 2024 10–1. Malcolm Cole coach/district athletic contact; Ellis County.

Evidence: [Individual football program and season schedule](https://sixmanfootball.com/teams/avalon-eagles.1031/schedule/). Record/year distinctions, team format and town identity must not be conflated; source photos have not been licensed for reuse. Shared template alone would not capture the individual facts above.

## Actual implementation
School-specific prose, original milestone graphics, historical/2026 context, SEO and FAQs included at commit `0dab3bd153b5211f997581d7f22649204d9fda87`.

## Unfinished acceptance
Research additional documented championships, coaches or alumni where supported. Validate exact official ticket/gate/ADA arrangements, stadium, photo licenses, source URLs, county/city reciprocal links, schema/canonical/indexability, mobile/desktop contrast and real browser QA. Run protected CI, merge, deploy and independently check actual production. If evidence is unavailable mark N/A/uncertain rather than inventing.

## First-party 2026–27 Avalon coaches
[Avalon ISD official 2026–27 athletic coaching assignments](https://www.avalonisd.net/apps/pages/index.jsp?pREC_ID=2598330&type=d&uREC_ID=4388798) names Malcolm Cole head football coach/athletic director, Korey Plough assistant football and Benjamin Massarelli assistant football. This replaces exclusive reliance on independent Six-Man Football directories. Added sourced milestone and coach correction commit `22d3635aa29225f80e7ed2ecaf1afeba106df05c`.


## Confirmed production technical acceptance — 2026-10-10 (supersedes historic pre-release status text)
- Live: https://texasdefined.com/texas-high-school-football-teams/avalon, implemented and merged in PR #4540 and verified after production deployment of `2aabb6a5809f14a0c734dd01e25d16b30a5a5f29`.
- [Production Chrome runner #38061056139](https://github.com/keeptxred/TexasDefined/actions/runs/38061056139) passed this school's **desktop and mobile** routes (HTTP 200, correct canonical/SEO metadata/structured data, external research links, runtime, image health, responsive overflow), plus the visible reciprocal school ↔ `/county/ellis` links and sitemap inclusion.
- Individual `desktop-school-avalon.png` and `mobile-school-avalon.png` screenshots stored in [artifact #11673525515](https://github.com/keeptxred/TexasDefined/actions/runs/38061056139/artifacts/11673525515); see `docs/football-authority/BATCH004_FINAL_ACCEPTANCE.md` and certification PR #4553.
- Older “unmerged/undeloyed/unverified browser” descriptions are dated pre-release observations, now superseded for technical QA only. Current coaching/game days, stadium gates and accessibility remain official-school-confirmation questions, and images remain original editorial graphics rather than reproducing unlicensed sports photography.
