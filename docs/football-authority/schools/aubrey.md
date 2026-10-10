# Aubrey Chaparrals — Batch 004 individual audit

Stage: IMPLEMENTED on unmerged branch, never VERIFIED. Research date 2026-10-10.

Specific weakness: no specific Chaparral Stadium cashless ticket rules, school visitor constraints or clear recent-season vs current-season distinction.

[Aubrey ISD June 2026 stadium policy](https://www.aubreyisd.net/live_feeds/12506149) specifies GoFan-only cashless entry, bag inspections, field restrictions and student supervision. [Official district high-school feed](https://www.aubreyisd.net/o/ahs/live-feed?page_no=1) links 2026 varsity schedule and tickets. [DCTF](https://www.texasfootball.com/team/aubrey-chaparrals) lists 17 historical playoff appearances, no championship-game titles, 2021 12–2, 2024 8–5, 2025 3–7. [MaxPreps staff](https://www.maxpreps.com/tx/aubrey/aubrey-chaparrals/football/staff/) lists Keith Ivy; [game site](https://www.dentoncountyfb.com/event/2026-richland-vs-aubrey/) identifies Chaparral Stadium on 510 Spring Hill Road campus. Do not confuse daytime student pick-up circulation with football entry.

School-specific copy, milestones, visitor policy, FAQ, SEO, original graphics and sources committed `53ff6412daa3ba8e2bc5252919593ea06b1d60dc`. Need Denton County links, first-party official coach confirmation, accessible seating/parking, legally reusable images and live desktop/mobile/CI/protected merge/deploy.


## Confirmed production technical acceptance — 2026-10-10 (supersedes historic pre-release status text)
- This individual page **is live** at https://texasdefined.com/texas-high-school-football-teams/aubrey. Implemented in protected merged PR #4540, deployed and retested under release SHA `2aabb6a5809f14a0c734dd01e25d16b30a5a5f29`.
- Exact deployed production runner [#38061056139](https://github.com/keeptxred/TexasDefined/actions/runs/38061056139): desktop and mobile **PASS** (HTTP 200, canonical, SEO/meta/schema, research links, runtime, images, overflow, school-to-county link). Production `/county/denton` also has a visible reciprocal card in desktop and mobile; sitemap inclusion **PASS**.
- Screenshots: `desktop-school-aubrey.png` and `mobile-school-aubrey.png` in [artifact #11673525515](https://github.com/keeptxred/TexasDefined/actions/runs/38061056139/artifacts/11673525515). See `docs/football-authority/BATCH004_FINAL_ACCEPTANCE.md` in certification PR #4553 for full evidence.
- Earlier passages saying “not merged”, “not deployed”, or “browser QA pending” are **historic pre-release observations**, not current technical findings. Source, coach, stadium ADA/parking/tickets, and third-party image-rights follow-ups remain independently qualified; no unlicensed sports photograph was added by Batch 004.
