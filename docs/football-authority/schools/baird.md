# Baird Bears — Batch 004 school-specific audit

**Research 2026-10-10. Stage IMPLEMENTED on draft, NOT merged/deployed or production VERIFIED.**

## Individual findings
Callahan County school switched to six-man in 2019; 2026 DI District 7 with coach Jeremy Kirk listed, 2024 7–4 followed by 2025 3–7.

Evidence: [Individual football program and season schedule](https://sixmanfootball.com/teams/baird-bears.1033/schedule/). Record/year distinctions, team format and town identity must not be conflated; source photos have not been licensed for reuse. Shared template alone would not capture the individual facts above.

## Actual implementation
School-specific prose, original milestone graphics, historical/2026 context, SEO and FAQs included at commit `0dab3bd153b5211f997581d7f22649204d9fda87`.

## Unfinished acceptance
Research additional documented championships, coaches or alumni where supported. Validate exact official ticket/gate/ADA arrangements, stadium, photo licenses, source URLs, county/city reciprocal links, schema/canonical/indexability, mobile/desktop contrast and real browser QA. Run protected CI, merge, deploy and independently check actual production. If evidence is unavailable mark N/A/uncertain rather than inventing.

## Independent school resources verification — October 10, 2026

[Baird ISD football coaches page](https://www.bairdisd.org/29025_3) confirms Jeremy Kirk as athletic director/head coach, Reece Walker DC, assistants. [Official secondary campus contact](https://www.bairdisd.org/contact) places school at 600 W 7th. [District Sept 2025 community notice](https://www.bairdisd.org/index.php?articleID=60087506&pageID=smartSiteFeed&psqFeed=true) discusses POSSIBLE 2026 transition to 11-man; [2026 Six-Man Football schedule](https://sixmanfootball.com/teams/baird-bears.1033/schedule/) still lists Division I District 7. Proposal is not completed switch.

Follow-up implemented in editorial commit `01a2dd34637428ffd67a43adbd2e81576785780a`. Still not merged or production VERIFIED; rights, reciprocal links, accessibility and live Chrome acceptance pending.


## Confirmed production technical acceptance — 2026-10-10 (supersedes historic pre-release status text)
- Live: https://texasdefined.com/texas-high-school-football-teams/baird, implemented and merged in PR #4540 and verified after production deployment of `2aabb6a5809f14a0c734dd01e25d16b30a5a5f29`.
- [Production Chrome runner #38061056139](https://github.com/keeptxred/TexasDefined/actions/runs/38061056139) passed this school's **desktop and mobile** routes (HTTP 200, correct canonical/SEO metadata/structured data, external research links, runtime, image health, responsive overflow), plus the visible reciprocal school ↔ `/county/callahan` links and sitemap inclusion.
- Individual `desktop-school-baird.png` and `mobile-school-baird.png` screenshots stored in [artifact #11673525515](https://github.com/keeptxred/TexasDefined/actions/runs/38061056139/artifacts/11673525515); see `docs/football-authority/BATCH004_FINAL_ACCEPTANCE.md` and certification PR #4553.
- Older “unmerged/undeloyed/unverified browser” descriptions are dated pre-release observations, now superseded for technical QA only. Current coaching/game days, stadium gates and accessibility remain official-school-confirmation questions, and images remain original editorial graphics rather than reproducing unlicensed sports photography.
