# Arp Tigers — individual Batch 004 authority audit

**Page:** https://texasdefined.com/texas-high-school-football-teams/arp  
**Research date:** 2026-10-10. **Status:** IMPLEMENTED on Batch 004 branch; NOT merged, deployed or VERIFIED.

## Individual deficiencies and corroboration
- The canonical registry had only a basic UIL 2026–28 classification (3A Division II District 10), without an Arp-specific editorial object. A generic profile cannot explain the important Dale Irwin run or visiting supporter venue details.
- [Arp ISD's contemporary Irwin retirement announcement](https://www.arpisd.org/article/708732) attributes 141 Arp wins, 14 playoff appearances and three district titles to his 19 seasons; its career table contains a separate Colmesneil season and 146 combined victories. Editorial copy distinguishes these totals.
- The district describes the dramatic 2007 Elysian Fields 19–13 state-quarterfinal loss and 2016 Boling 19–18 semifinal loss. The 2016 semifinal must never be described as a state title.
- The same official announcement names Wes Schminkey as Irwin's successor in 2022, while the [current district directory](https://www.arpisd.org/) lists him as athletic director.
- [District official football event listing](https://www.arpisd.org/athletics?page_no=28) places Bill Herrington Tiger Stadium at **422 E Front St**, distinct from the [high school directory campus](https://www.arpisd.org/) at **101 Toney Drive**. Individual parking, ticket and ADA accommodation policies are not proven from these sources.
- [Official 2026 varsity schedule](https://www.arpisd.org/page/arp-football-schedule) and [school announcement](https://www.arpisd.org/live_feeds/12114880) identify the planned September 18 Shelbyville homecoming and October 9 West Rusk district opener. District calls West Rusk a rival, but no all-time series history has been established.
- Search-result photographs or school images carry no independently documented reuse license. Therefore the existing editorial cards/milestone presentation is preferred; no authentic unlicensed school imagery was copied.

## Changes committed
- Individual history, coaching succession, 2007/08–12/2016/2022/2026 milestone cards, stadium/campus distinction, 2026 schedule, qualified rival detail, factual FAQ, unique SEO title/description, red editorial accent and first-party links.
- Implementation commit: `e06e3e4fabbc3ea4d60bf59349704d5bdece2b86`.

## Outstanding acceptance
- Verify page rendering and program-specific color contrast on both widths, image alternatives, schema, canonical, sitemap and JS errors.
- Confirm Smith County campus mapping and add justified reciprocal county or city inbound link without affecting unrelated pages.
- Run project validators/required CI and protected PR workflow; merge, deploy, and independently validate live mobile/desktop.
- Verify official current tickets and accessibility resources when published, but never invent them. School photo license remains unresolved.


## Confirmed production technical acceptance — 2026-10-10 (supersedes historic pre-release status text)
- This individual page **is live** at https://texasdefined.com/texas-high-school-football-teams/arp. Implemented in protected merged PR #4540, deployed and retested under release SHA `2aabb6a5809f14a0c734dd01e25d16b30a5a5f29`.
- Exact deployed production runner [#38061056139](https://github.com/keeptxred/TexasDefined/actions/runs/38061056139): desktop and mobile **PASS** (HTTP 200, canonical, SEO/meta/schema, research links, runtime, images, overflow, school-to-county link). Production `/county/smith` also has a visible reciprocal card in desktop and mobile; sitemap inclusion **PASS**.
- Screenshots: `desktop-school-arp.png` and `mobile-school-arp.png` in [artifact #11673525515](https://github.com/keeptxred/TexasDefined/actions/runs/38061056139/artifacts/11673525515). See `docs/football-authority/BATCH004_FINAL_ACCEPTANCE.md` in certification PR #4553 for full evidence.
- Earlier passages saying “not merged”, “not deployed”, or “browser QA pending” are **historic pre-release observations**, not current technical findings. Source, coach, stadium ADA/parking/tickets, and third-party image-rights follow-ups remain independently qualified; no unlicensed sports photograph was added by Batch 004.
