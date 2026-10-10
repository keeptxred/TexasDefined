# Axtell Longhorns — Batch 004 school-specific audit

**Research 2026-10-10. Stage IMPLEMENTED on draft, NOT merged/deployed or production VERIFIED.**

## Individual findings
2A eleven-man program; successive 2023 10–1, 2024 12–2, 2025 11–2 results under Craig Horn. Current 2026 coach unconfirmed.

Evidence: [Individual football program and season schedule](https://www.maxpreps.com/tx/axtell/axtell-longhorns/football/history/). Record/year distinctions, team format and town identity must not be conflated; source photos have not been licensed for reuse. Shared template alone would not capture the individual facts above.

## Actual implementation
School-specific prose, original milestone graphics, historical/2026 context, SEO and FAQs included at commit `0dab3bd153b5211f997581d7f22649204d9fda87`.

## Unfinished acceptance
Research additional documented championships, coaches or alumni where supported. Validate exact official ticket/gate/ADA arrangements, stadium, photo licenses, source URLs, county/city reciprocal links, schema/canonical/indexability, mobile/desktop contrast and real browser QA. Run protected CI, merge, deploy and independently check actual production. If evidence is unavailable mark N/A/uncertain rather than inventing.

## Independent school resources verification — October 10, 2026

[Official Axtell ISD directory](https://www.axtellisd.net/en-US) gives district 1100 Longhorn Parkway. [MaxPreps coaching list updated Aug 24, 2026](https://www.maxpreps.com/tx/axtell/axtell-longhorns/football/staff/) identifies Craig Horn as head coach plus ten assistants. Third-party address 308 Ottawa must not replace official district contact or be treated as stadium gate without research.

Follow-up implemented in editorial commit `01a2dd34637428ffd67a43adbd2e81576785780a`. Still not merged or production VERIFIED; rights, reciprocal links, accessibility and live Chrome acceptance pending.

## 2026 coaching reconciliation — independent cross-check
[Official Axtell junior/senior high staff](https://ahs.axtellisd.net/en-US/staff) identifies **Craig Horn** as athletic director. [Dated 2026 varsity coaching roster](https://www.maxpreps.com/tx/axtell/axtell-longhorns/football/staff/) identifies Craig Horn as head football coach with Nate Morrill and Josh Hayes among assistants; roster last updated August 24, 2026. These independent sources resolve the earlier omission of the 2026 coach, without claiming the school staff page separately uses the head-coach title. Correct Texas Axtell Longhorns (not Kansas Axtell Eagles). Implementation commit `a0144aedcf20116fa28196949781d13761a626a2`. Still no production browser certification.


## Confirmed production technical acceptance — 2026-10-10 (supersedes historic pre-release status text)
- Live: https://texasdefined.com/texas-high-school-football-teams/axtell, implemented and merged in PR #4540 and verified after production deployment of `2aabb6a5809f14a0c734dd01e25d16b30a5a5f29`.
- [Production Chrome runner #38061056139](https://github.com/keeptxred/TexasDefined/actions/runs/38061056139) passed this school's **desktop and mobile** routes (HTTP 200, correct canonical/SEO metadata/structured data, external research links, runtime, image health, responsive overflow), plus the visible reciprocal school ↔ `/county/mclennan` links and sitemap inclusion.
- Individual `desktop-school-axtell.png` and `mobile-school-axtell.png` screenshots stored in [artifact #11673525515](https://github.com/keeptxred/TexasDefined/actions/runs/38061056139/artifacts/11673525515); see `docs/football-authority/BATCH004_FINAL_ACCEPTANCE.md` and certification PR #4553.
- Older “unmerged/undeloyed/unverified browser” descriptions are dated pre-release observations, now superseded for technical QA only. Current coaching/game days, stadium gates and accessibility remain official-school-confirmation questions, and images remain original editorial graphics rather than reproducing unlicensed sports photography.
