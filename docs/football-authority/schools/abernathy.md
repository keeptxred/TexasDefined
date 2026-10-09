# Abernathy Antelopes — Individual authority audit and research (Batch 002)

**Page:** https://texasdefined.com/texas-high-school-football-teams/abernathy  
**Research checked:** 2026-10-09  
**School status:** IMPLEMENTED ON WORK BRANCH; NOT MERGED, NOT DEPLOYED, NOT VERIFIED.

## Individual page audit — actual source vs visitor needs
- Current `main` has no `abernathy` school-specific editorial object in `program-editorial.ts`, and no verified mascot/color identity. The school route therefore showed only the UIL/TEA shared profile framework and generic historic/schedule guidance, not an Antelopes authority story.
- No school-published district champion seasons, 2016 semifinal result, recent coaching transition, 2026 homecoming event or Abernathy venue limitations were covered in dedicated editorial. The 2026–28 UIL alignment is separate from historical successes.
- No source-cleared program-specific photo: official district photographs, commercial bleacher contractor image and news photos do not grant TexasDefined a republication license. Do not reuse. Original text-and-number milestone graphics are a legal school-specific alternative.
- Outbound county link depended on optional live lookup data; the school's current NCES entry confirms Hale County. The county did not have a dedicated context-specific reciprocal school link in the existing football set.
- Search/browser URL fetch to production was inaccessible, so above is a specific **source code audit** and review of live external official sources, not a passed full rendered production audit. Desktop/mobile/browser and deployment remain outstanding.

## Primary source trail and claims
- [Abernathy ISD official football accolades](https://www.abernathyisd.com/131089_3) — district champions 1951, 1952, 1958, 1979, 1984–88, 1990–91, 1999, 2001, 2011, 2013–14, 2016, 2018–19; quarterfinals 1951, 1985, 1987, 2014, 2016, 2018, 2019; one listed **2016 semifinal**. These are not state-title claims.
- [UIL Crawford 2016–17 football state-team record](https://www.uiltexas.org/football/state-team/crawford-2016-2017-football) — Crawford defeated Abernathy **42–7** in its 2016 playoff semifinal; no false title attribution.
- [Abernathy ISD April 2026 hiring announcement on its official news feed](https://www.abernathyisd.com/60549) — district names **Keith Bloskas** next athletic director/head football coach. [Current Abernathy ISD Athletics Home](https://www.abernathyisd.com/131047_3) identifies Bloskas as athletic director. **Conflict:** [older high-school staff directory](https://hs.abernathyisd.com/apps/staff/departmental.jsp) still lists Justin Wiley as head coach; older directory should not override the current 2026 district notice.
- [Official school calendar](https://www.abernathyisd.com/page/page_calendar?calID=138964) — 2026 current varsity dates (including October 9 New Deal 7 p.m. as posted); use live official calendar for changed kickoffs, do not invent results. [District football page](https://www.abernathyisd.com/131089_3) contains older *2023* schedule graphic despite 2026 heading; give updated calendar priority.
- [UIL 2026–28 2A Division I district alignment](https://realignment.uiltexas.org/alignments/2026/2AD1FB2026.pdf) — **District 3**: Abernathy, New Deal, New Home, Post, Sundown; these are current-cycle opponents, not proven historic rivals.
- [NCES 2025–26 Abernathy High School directory](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480741000008) — campus **505 7th St** and **Hale County**. District describes serving parts of Hale and Lubbock counties, but this particular campus is in Hale. The 2024–25 NCES school enrollment is separate from the UIL 2026–28 reported enrollment of 220; do not mix the years.
- [Abernathy ISD home](https://www.abernathyisd.com/) — current school contact (505 7th St, 806-298-2563), Antelopes identity, [2026 homecoming Lighting of the A and parade notice](https://www.abernathyisd.com/60549_1); the Sept 30 event is historical as of Oct 9 and should not be sold as an upcoming event.
- [Southern Bleacher's Abernathy ISD project record](https://www.southernbleacher.com/listing/abernathy-independent-school-district/214/) — stadium contractor documents an installed 1,679-seat bleacher structure, **not** independently confirmed overall current stadium capacity, final gate address, tickets or parking policy.

## Implemented for this individual school (unmerged)
1. New `abernathy` editorial content: distinctive lead, school-documented district-title chronology, UIL-corroborated 2016 semifinal and specific 2026 coach conflict/transition.
2. Six separate sourced visual milestones, maroon-and-white original editorial accents (not a fake school logo), precise primary-source trail and original Antelopes FAQ including homecoming.
3. Current official district calendar, venue/parking/accessibility uncertainty, 2026–28 District 3 opponents and 505 7th St campus contact. Third-party stadium seating distinguished from total official capacity.
4. Dedicated SEO title/description, verified Antelopes mascot/colors, SportsTeam/H1 inherited from verified identity, official outbound contacts.
5. Hale County `/county/hale` reciprocal link in the existing school and county architecture, based on modern NCES campus county.
6. Image review: authentic team/stadium photos visible on district/publisher/contractor sites but no reuse permission shown. No unlicensed photo added; source-labeled original milestone cards used. Do not represent these as actual stadium photographs.

**Branch:** `football-authority-batch-002-25-20261009`  
**Relevant implemented commits:** editorial `b02f02a2d2c016a98a87b88a869def7525eacb98`, verified mascot `42d6ff048f520789d5e1c3840f6184e1762bebd4`, outbound county `739c67c543b5431600dec540be20f2a5fab0a1a0`, inbound county `bbf3277671325863877b670caa5489b406004c49`.

## Pending acceptance, not pass claims
- Actual GitHub protected PR and Required Merge Gate; typecheck/build relevant football validators.
- Protected merge, Cloudflare deploy success and the specific deployed commit correlation.
- Real desktop 1366 and mobile 390 route inspection, only-one-H1, title/description, canonical, SportsTeam/Breadcrumb schema, all source links, no React hydration errors or layout overflow.
- Reciprocal Hale County live page check, including possible independently existing county hydration issues; do not hide them or bypass production checks.
- No program photograph republished without documented rights. Current admission cost, accessible entrance, parking, stadium gate, and any unverified alumni/rivalry traditions remain explicitly unclaimed.

**Exact next action:** Open/progress Batch 002 PR through checks, merge only if permitted, inspect deployed school + county in responsive real browser and update to VERIFIED only on honest pass. Continue with the next assigned Abilene page separately.
