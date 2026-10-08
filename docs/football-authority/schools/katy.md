# Katy — individual audit and research, 2026-10-08

URL: https://texasdefined.com/texas-high-school-football-teams/katy

## Current code defects
- Verified mascot and colors exist, but program-specific editorial does not; existing generic overview underuses nine championship seasons and coaching legacy.
- Generic 2026 schedule reference; the team's current schedule is published separately. No dedicated timeline or Katy-specific ticket/venue context in editorial.
- Existing route uses generic H1/metadata and layout for this team. Inbound stadium/city/county links need individual inspection.
- Live page could not be fetched by research browser; no deployed-view pass.

## Verified research
- Katy Athletic Booster Club historic football record book lists **nine titles** (1959,1997,2000,2003,2007,2008,2012,2015,2020) through 2024: https://katyabc.org/wp-content/uploads/2024/02/record_book_02.26.24.pdf
- Katy Athletic Booster Club's football page identifies Gary Joseph as head coach and describes the community 'Red Sea' tradition: https://katyabc.org/sport/football/
- Booster team 2026 schedules and venue assignments (Legacy/Rhodes shared; do not imply one fixed home): https://www.katyfb.com/schedule
- Katy ISD athletics states Katy High won the district's first state championship: https://www.katyisd.org/athletics/home
- City of Katy February 9, 2026 proclamation documents Coach Mike Johnston's 1982–2003 tenure and three championships: https://www.cityofkaty.com/home/showpublisheddocument/10910/639057350123070000
- UIL official 2026–28 alignment: https://realignment.uiltexas.org/alignments/2026/6ABBFB2026.pdf

## Rights / unresolved
- Do not reproduce booster or press photography without permission/license. No license confirmed today.
- Verify matchup tickets, actual venue per game, distinctive inbound link opportunities and full production performance on deployment.

## Batch 001 implementation checkpoint — 2026-10-08
- New original program-specific overview and three/four sourced history milestones added to the existing school-editorial pipeline.
- School-color-accented editorial graphics and verified outbound links added without republishing unlicensed photos.
- Individual search title and description, distinct school FAQs and relevant coach/stadium/schedule links implemented where supported.
- Current status: IMPLEMENTED on GitHub branch, **not** production-verified. Required next: complete CI/protected merge, authentic image rights, inbound link inspection, actual mobile/desktop route verification.

## Licensed authentic image found (2026-10-08)
- Historic Katy High School “Home of Champions” entrance sign, original photo by Sskiles22; explicitly dedicated to the public domain by the uploader: https://commons.wikimedia.org/wiki/File:KatyHighSchool.JPG . Render as an archival school image with 2009 date, not current-game footage. Unlicensed sports photos remain excluded.


## Focused Katy individual browser acceptance in progress — 2026-10-08
- **Current main checkpoint:** `89ee67475adced77e87ac62c62a74f3a8cc63bc3`; Wills Point and Abbott are already VERIFIED, and Katy remains DEPLOYED pending its own independent acceptance, not a new school assignment.
- Official [Katy Tigers team schedule](https://www.katyfb.com/schedule) currently lists both Legacy Stadium and Rhodes Stadium and multiple away assignments; the page must not promise one fixed game venue.
- Source-backed campus county: [NCES Katy High School record](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=482517002809), Fort Bend County. The production Fort Bend County SSR displays an incoming Katy Tigers profile link; a Katy-only outbound county fallback is implemented on the QA branch to withstand optional TEA directory join outages.
- Existing public-domain [2009 school entrance photograph](https://commons.wikimedia.org/wiki/File:KatyHighSchool.JPG) must load at desktop and mobile with explicit historic label and credit. It is not a contemporary game photo. Do not use unlicensed team photography.
- Scoped new files: `scripts/ci/verify-katy-browser.mjs` and `.github/workflows/verify-katy-browser.yml`. Strict browser acceptance tests Katy and Fort Bend County independently at 1366px and 390px, school history/coaching/schedule/SEO/schema, county reciprocity, imagery rights/loading, responsive overflow, runtime errors, and captured real screenshots. No test has passed yet on this new workflow.
- **Current stage:** protected PR, deployment and browser acceptance pending. Do not mark Katy VERIFIED until the actual deployed run and screenshots pass; preserve other four Batch 001 records.


## Deployed Katy real-Chrome failure and Fort Bend hydration fix candidate — 2026-10-08
- Katy's [PR #4349](https://github.com/keeptxred/TexasDefined/pull/4349) merged at `487f0ca9850283b4121bd8481f540add610302e5`. Production [run #37841694452](https://github.com/keeptxred/TexasDefined/actions/runs/37841694452) **SUCCEEDED**. Its first strict [individual Chrome run #37842393515](https://github.com/keeptxred/TexasDefined/actions/runs/37842393515) **FAILED**; [artifact #11578795547](https://github.com/keeptxred/TexasDefined/actions/runs/37842393515/artifacts/11578795547) inspected.
- School desktop 1366/mobile 390 **passed**: HTTP 200; exact Katy Tigers Football H1, unique SEO title/canonical, nine-title Mike Johnston/Gary Joseph/Red Sea/history/2026 stadium-source links, schema, reciprocal Katy → Fort Bend county link, no school browser exceptions and no horizontal overflow. Historic public-domain school sign photo loaded at 800 natural pixels; rendered 814px desktop/348px mobile with accurate archival alt text. These findings do not excuse the failing county page.
- County Fort Bend 390px mobile had correct H1/canonical/reciprocal inbound Katy profile/no horizontal overflow, but a React hydration **#418** runtime exception. County desktop had #418 **and** wrong H1/canonical after hydrate, although its HTTP response was 200. The real desktop screenshot exposed lodging widgets injected **ahead of county content**. Do not mark overall acceptance passed.
- Focused proposed fix: extend the previously successful Wills Point/Van Zandt and Abbott/Hill after-hydration readiness signaling and two existing lodging affiliate script guards to only `/county/fort-bend`. Preserve and show actual lodging panels after hydration; do not remove them, alter other routes, suppress errors, or weaken browser assertions. Full **post-fix** production/desktop/mobile test still required. Current base `main` at fix start: `487f0ca9850283b4121bd8481f540add610302e5`.


- **Further photographic review of Chrome artifact:** the school screenshot itself revealed `KATY, HARRIS COUNTY` in the introductory paragraph and quick-facts Location, despite the Katy High campus being in **Fort Bend County** per [NCES school ID 482517002809](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=482517002809). Katy ISD spans counties, so the directory join must not be treated as definitive for this campus. The same focused PR now overrides `countyName` **only for canonical Katy High profile**, affecting summary and quick facts; other Katy ISD schools and shared matcher are unchanged. Strict desktop and mobile Chrome assertions now check Fort Bend and prohibit the original erroneous `from KATY, HARRIS COUNTY` phrase. This specific correction **awaits deployment/QA**.
