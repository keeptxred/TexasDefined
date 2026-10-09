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

## Reconciled production, browser retest and lazy-photo evidence — 2026-10-08
- PR #4353 incorporated protected newer main using dedicated reconciliation PR #4357 (merge `f086283014652b5a84321d21501f2b908b5e0500`); canonical Required Merge Gate #37855389901 passed and #4353 merged into main at `1e31e359c4888e96aad84533509f79cf18c8dadc`. Cloudflare, live and final production checks subsequently reported SUCCESS for that commit.
- Reran the previously FAILED individual Katy/Fort Bend Chrome [#37842393515](https://github.com/keeptxred/TexasDefined/actions/runs/37842393515) on the deployed release. New [artifact #11583683917](https://github.com/keeptxred/TexasDefined/actions/runs/37842393515/artifacts/11583683917) recorded **PASS desktop** Katy school + reciprocal Fort Bend County, including no hydration failure. The original/older browser script's **mobile** run FAILED specifically because the lazy-loaded 2009 public-domain Katy entrance photo was still at `currentSrc=''`, `complete=false`, `naturalWidth=0` after an arbitrary 800ms delay; its rendered width 348px and descriptive alt text were present. Do not call this a mobile acceptance pass or assert a broken photo without an actual decode wait.
- Follow-up on `football-authority-katy-lazy-photo-qa-20261008` retains the strict natural-width and visibility requirement but waits up to 15s for actual lazy-image decoding after scroll, capturing screenshot/JSON and a timeout diagnostic if loading never succeeds. Also preserve the newer PR #4353 assertion that Katy High's campus is Fort Bend rather than Harris County. This is a **candidate QA reliability correction**; rerun against deployed main and inspect the actual desktop/mobile screenshots before marking Katy VERIFIED. Wills Point and Abbott VERIFIED status is unchanged.
- **Direct visual artifact inspection:** mobile Katy screenshot in artifact #11583683917 shows an empty image region above the correctly credited 2009 photo caption while desktop renders the archival image; mobile and desktop Fort Bend County screenshots show the proper county H1 and normal page layout. JSON confirms both Fort Bend reciprocal links, 390px/1366px widths, full county screenshots, and **zero county and school runtime errors**; mobile school acceptance failed solely on the unloaded photo. The same follow-up branch now eager-loads **only Katy's small, 800×614 rights-cleared archival image** rather than treating a visible blank photograph as merely a flaky test. All other school photographs remain lazy-loaded. A new postdeploy real-browser run must still prove the mobile image loads and all facts/links pass.

## Katy complete individual live browser acceptance — 2026-10-08
- **Protected source fix:** PR #4359 merged at `8687f7eda0b7683665dd4926a48b724b875fceaa`. Canonical required merge gate #37856627528 completed both jobs SUCCESS. GitHub combined status for the exact merged commit confirmed validation, build, runtime smoke, Cloudflare, live, and final production all SUCCESS.
- **Individual Chrome run:** [#37857587458](https://github.com/keeptxred/TexasDefined/actions/runs/37857587458), one real Chrome job SUCCESS. [Screenshot/JSON artifact #11584543090](https://github.com/keeptxred/TexasDefined/actions/runs/37857587458/artifacts/11584543090) inspected. Independent **1366px desktop and 390px mobile** runs both PASS Katy school plus linked Fort Bend County. Exact `katy` unique H1, title and canonical/metadata; school biography/history/coach/UIL nine titles/city-county/source links and SportsTeam/Breadcrumb schema; reciprocal county link, Fort Bend identity (NOT Harris), zero lateral overflow, zero school and county React/runtime errors. County H1/canonical and Katy inbound profile link correct; complete screenshots 19344px desktop and 35526px mobile match document heights.
- **Real archival photo verified live:** Uploader-dedicated public-domain 2009 entrance photograph of Katy High School rendered at 800px natural width, **814px desktop / 348px mobile**, `complete:true`, full descriptive historical alt/credit; mobile screenshot directly shows photograph above its clearly historic caption. No unlicensed current-game photograph used.
- **Individual acceptance:** Katy **VERIFIED** based on observed successful protected merge, deployment, strict Chrome acceptance and manually inspected school+county screenshots. Visitor ticket availability, assigned stadium for an individual future game and parking/accessibility details remain appropriately dependent on official maintained sources rather than invented.
- **Separate platform smoke:** [Friday Night Lights live run #37856873033](https://github.com/keeptxred/TexasDefined/actions/runs/37856873033) SUCCESS after previously identified UIL recent-history and unsupported registration-link assertion errors were fixed. This shared result is not substituted for this individual Katy Chrome acceptance.
