# Ysleta del Sur Pueblo Cultural Center Museum — production acceptance certification

**Reviewed:** October 10, 2026 (UTC)  
**Target:** https://texasdefined.com/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso  
**Status:** **PASS for deployed application revision `116fcb907aba6f1983d2129929296d3654fe9a5a`.** Production Chrome acceptance completed successfully **twice after deployment**. This document is evidence of that revision, not a claim that future redeployments cannot regress.

## Merged work preserved

Authority content and launch: [#4408](https://github.com/keeptxred/TexasDefined/pull/4408), [#4411](https://github.com/keeptxred/TexasDefined/pull/4411), [#4434](https://github.com/keeptxred/TexasDefined/pull/4434), [#4441](https://github.com/keeptxred/TexasDefined/pull/4441). Hydration investigations and diagnostics: [#4522](https://github.com/keeptxred/TexasDefined/pull/4522), [#4523](https://github.com/keeptxred/TexasDefined/pull/4523), [#4524](https://github.com/keeptxred/TexasDefined/pull/4524), [#4526](https://github.com/keeptxred/TexasDefined/pull/4526). Corrective change: **[#4571](https://github.com/keeptxred/TexasDefined/pull/4571)**, merged at `116fcb907aba6f1983d2129929296d3654fe9a5a`. No museum text, attribution, or imagery was removed in the correction.

## Root cause and correction

**Observed defect:** intermittent minified React hydration error **#418** in a 390px Chrome session. The production isolation investigation associated with [run #38073031610](https://github.com/keeptxred/TexasDefined/actions/runs/38073031610) reproduced the baseline failure and eliminated it when **`/expedia-travel.js`** was blocked; independently blocking the other four tested deferred integrations did not remove the error. This implicated third-party page DOM mutation racing React hydration, rather than museum copy or landmark nesting.

**Correction in #4571:** `public/expedia-travel.js` now waits until the application `RootShell` sets `document.documentElement.dataset.tdRootHydrated = "1"` and emits `texasdefined:root-hydrated` before inserting/replacing monetization DOM. Startup remains one-shot and supports both before- and after-load registration. The existing affiliate integration is retained. Chrome acceptance continues to fail on React page errors; no assertion was disabled.

**Landmark structure:** The final `RootComponent` in `src/routes/__root.tsx` supplies `<main id="main">` around the route outlet; `YsletaDelSurMuseumAuthority.tsx` renders inside it without a second main. Chrome explicitly confirms **one `<main>` and one H1** on both viewports. Historical #4523/#4524 landmark changes should not be independently reapplied to the latest architecture.

## Immutable deployment and browser evidence

| Evidence | Run / revision | Result |
| --- | --- | --- |
| Production deployment | [#38073512656](https://github.com/keeptxred/TexasDefined/actions/runs/38073512656), commit `116fcb907aba6f1983d2129929296d3654fe9a5a` | **Success**, completed 2026-10-10 17:58 UTC |
| Complete mobile + desktop acceptance | [#38073890257](https://github.com/keeptxred/TexasDefined/actions/runs/38073890257), same commit; [artifact #11678026787](https://github.com/keeptxred/TexasDefined/actions/runs/38073890257/artifacts/11678026787) | **Success**, 2026-10-10 17:59 UTC |
| Independent repeat after deployment | [#38073580168, attempt 2](https://github.com/keeptxred/TexasDefined/actions/runs/38073580168); successful repeat [artifact #11677927665](https://github.com/keeptxred/TexasDefined/actions/runs/38073580168/artifacts/11677927665) | **Success**, 2026-10-10 18:05 UTC |
| Earlier attempt on same SHA | [#38073580168, attempt 1](https://github.com/keeptxred/TexasDefined/actions/runs/38073580168); original [artifact #11678405574](https://github.com/keeptxred/TexasDefined/actions/runs/38073580168/artifacts/11678405574) | **Failed** with #418 at 17:54 UTC, while the above deployment was still in progress; do not erase or mischaracterize this result |

The acceptance artifact from #38073890257 contains `acceptance.json`, mobile/desktop SSR and hydrated screenshots, stage traces, semantic-landmark evidence, and `hydration-script-isolation.json`. That latest isolation JSON shows zero React errors in both baseline repetitions and all six other integration-blocking scenarios. The test inspected the **museum page itself** before navigating to inbound-link pages.

## Acceptance scope confirmed on production

| Check | Evidence |
| --- | --- |
| 390px mobile, 1366px desktop | Both passed; page HTTP 200 |
| SEO/indexability | Proper title, meta description, canonical; robots permit indexing |
| Semantics and structured data | Exactly one H1, exactly one `<main>`, Museum and BreadcrumbList JSON-LD |
| Images and attribution | Two authentic Sue Barnum Cultural Center images loaded at 1920px/1280px intrinsic widths, with alt text and CC BY-SA 4.0 attribution; no generic replacement |
| Responsive behavior | Document width equals viewport width at 390px and 1366px; no detected horizontal overflow |
| Visitor information | Address, phone, email, hours discrepancy, unknown pricing, variable schedules, tribal-program restrictions and permissions retained |
| Official sources | Pueblo museum and cultural pages, Texas Historical Commission, NPS, Visit El Paso Mission Trail, Handbook of Texas and Wikimedia credits retained |
| Contextual links | Both-viewports tests passed links on El Paso city, El Paso County, Texas borderlands and Texas Sacred Places pages |
| JS runtime and hydration | No uncaught page errors in either successful full acceptance execution; prior #418 assertion retained |
| Source transparency | October 9 fact-check date, cultural-center vs. separate Mission distinction, editorial methodology and suggested citation remain |

## Remaining qualifications

- Museum hours, cost, class eligibility and cultural demonstrations are operationally changeable; the page **explicitly directs visitors to verify them with Pueblo staff**. These caveats are not release blockers.
- The Chrome suite verifies semantic landmarks, alt text, image loading, responsive widths, internal links and uncaught exceptions. It is **not** an exhaustive assistive-technology/manual accessibility audit or a guarantee against future transient regressions.
- Attempt 1 of run #38073580168 failed before deployment completion, and its passing rerun plus the independent later pass are recorded without concealing the original failure. There is **no currently reproduced post-deployment museum hydration failure** in the two reviewed successful runs.
- No paid services were added. Preserve strict fail-closed Chrome verification for subsequent deployments.

**Project task disposition:** Authority content, targeted hydration repair, merge, deployment, and two post-deployment browser runs are certified for application revision `116fcb907aba6f1983d2129929296d3654fe9a5a`. No additional museum-content or React change is justified by the reviewed evidence.

## Final follow-up QA — October 10, 2026

**Full-page visual review completed:** manually inspected the complete hydrated screenshots from Chrome production run [#38075364967](https://github.com/keeptxred/TexasDefined/actions/runs/38075364967), artifact [#11677884491](https://github.com/keeptxred/TexasDefined/actions/runs/38075364967/artifacts/11677884491). Desktop screenshot measured **1366 × 8263 px**; mobile **390 × 16304 px**. Reviewed hero, hours/contact panel, exhibit grids, licensed panorama, chronological timeline, planning guidance, FAQ, source lists, monetization module and full footer. No visible overlap, truncation, unintended image substitution, horizontal clipping, or missing sections; their no-JavaScript SSR counterparts are also retained in the same artifact. This is a visual inspection at the two certified viewport widths, not a claim of testing every viewport.

**External-link and visitor-detail revalidation (October 10):** independently opened the following source pages and checked the claims they support. 
- Pueblo [museum](https://www.ysletadelsurpueblo.org/tourism-hospitality/cultural-center/museum): confirms **Wednesday–Sunday, 10 a.m.–4 p.m.**, exhibits and group/school tours.
- Pueblo [Cultural Center](https://www.ysletadelsurpueblo.org/tourism-hospitality/cultural-center): confirms Pueblo operation, artifacts and member-only program restrictions.
- Pueblo [Cultural Preservation](https://www.ysletadelsurpueblo.org/tribal-services/department-of-cultural-preservation): confirms institutional role and 2016 reorganization.
- Pueblo [About Us](https://www.ysletadelsurpueblo.org/about-us): tribe's first-person history and identity.
- Texas Historical Commission [official accessible museum record](https://atlas.thc.texas.gov/Details?atlasnumber=4200001263&fn=print): identifies **305 Yaya Lane, El Paso, TX 79907**, **(915) 859-7700**, **culturalcenter@ydsp-nsn.gov**, museum hours and record last updated September 27, 2026. The previous Atlas detail URL did not consistently load through automated retrieval, so the museum's outbound link has been changed to this accessible official view.
- Texas State Historical Association [museum history](https://www.tshaonline.org/handbook/entries/ysleta-del-sur-pueblo-museum): confirms the 1975 opening and 1992 fire/rebuilding; not a current facility-hours source.
- National Park Service [Ysleta Mission](https://www.nps.gov/places/ysleta-mission.htm): distinct church/history resource.
- Pueblo [bread baking](https://www.ysletadelsurpueblo.org/tourism-hospitality/cultural-center/bread-baking): every-other-Saturday claim; [Visit El Paso cultural-center listing](https://visitelpaso.com/places/tigua-indian-cultural-center): second/fourth-Saturday listing; the page correctly flags ambiguity.
- [Official Visit El Paso Mission Trail](https://visitelpaso.com/epmissiontrail): Ysleta, Socorro and San Elizario itinerary.
- Pueblo [Tribal Council](https://www.ysletadelsurpueblo.org/news_detail.sstg?id=104): explicitly documents the 1987 restoration act cited by the timeline, despite the generic page title.
- [Wikimedia Commons hero](https://commons.wikimedia.org/wiki/File:Tigua_Cultural_Center.jpg) and [panorama](https://commons.wikimedia.org/wiki/File:Tigua_Cultural_Center_2.jpg): authentic Cultural Center imagery and existing attribution retained.

The **broader gift shop and Visit El Paso list daily 10 a.m.–4 p.m. hours**, which conflicts with the museum-specific source. This is not a basis to rewrite museum hours without confirmation; existing uncertainty warnings are appropriate. No new admission price, public ceremony schedule, accessibility facilities, or permissions were asserted.

**Expanded production accessibility regression coverage:** PR [#4578](https://github.com/keeptxred/TexasDefined/pull/4578) adds separate Chrome tests for the accessible-name/landmark tree, nine native Tab key moves and visible keyboard-focus indicators at each viewport, and computed WCAG 2.0/2.1 AA solid-background text contrast across museum text. The test runs within the existing strict real-browser acceptance after deployment, using only existing Playwright/Chromium packages. Photo/gradient text contrast still requires human judgment; a fully manual screen-reader session cannot be claimed from programmatic accessibility-tree checks. The results must be recorded from the deployed-SHA post-merge Chrome run; this source record does not pre-certify an unmerged PR.
