# Football Authority — Execution Ledger

Updated 2026-10-08. Repository: `keeptxred/TexasDefined`.

## Canonical inventory
- **1,292 source-declared existing profiles:** 1,268 UIL 2026–28 alignment slugs and 24 other featured/non-UIL profile slugs.
- This is a deterministic repository inventory; it is **not** proof that all 1,292 live URLs were individually crawled. Do not auto-create more pages or confuse reported UIL alignment with a played season.
- Unresearched school identity, images, venues and private classifications remain unknown rather than guessed.

## Batch 001 — five schools, no new assignments
1. **Wills Point:** 1965 championship, coach James Boxley, Ken Autry Davis Field; blue/white editorial milestone visuals. Licensed school/stadium photography remains unavailable.
2. **Abbott:** 2015 six-man title, 2012/2022 finals and 2024 semifinal, plus authentic public-domain circa-1950 photo and documented Abbott football alumnus Willie Nelson. Archival photo intentionally remains small.
3. **Katy:** nine state titles, Mike Johnston/Gary Joseph, Red Sea and official 2026 schedule/venue links; public-domain archival school photograph.
4. **Fort Davis:** district announced cancellation of its **2026 football season**; UIL 2026–28 classification does not establish games. Includes 2003 state-final story and licensed historic Bart Coan Field photo.
5. **Southlake Carroll:** eight actual titles, not nine; UIL 2003 recap confirms 16–15 loss to Katy. Current 2026 coach Lee Munn, source-backed schedule, Dragon Stadium and Dragons identity; licensed authentic photo remains unresolved.

Each school has an individual documented audit in `docs/football-authority/schools/`. Program-specific research and design must not be treated as a generic template update.

## Merger, deployment and current status
- **#4330**: original five researched profiles and permanent registry merged at `7ec7444474dde1db49bfe50219f5ca013b3aff49`.
- **#4331**: Katy/Fort Davis licensed historical imagery and enhanced football live assertions merged at `ad0cf18ab922c4832740c0cb969ec429a0eebb73`.
- **#4332**: public-domain Abbott archival football photo and corrected high-school portrait sizing, plus prior checkpoint, merged at `e21c9b0ed61b850cf800484ba0f1ad5c49409c0c`. Required Merge Gate, Site Quality Watchdog and orphan-link workflows succeeded.
- **Cloudflare production and live deployment checks succeeded for #4332's merge commit:** GitHub combined statuses `texasdefined-cloudflare`, `texasdefined-live` and `texasdefined-production` are success. This confirms a production deployment pipeline pass for the merged content—not independent rendered mobile or desktop certification of every school.
- The first #4330 deployment attempt ([run 37785976546](https://github.com/keeptxred/TexasDefined/actions/runs/37785976546)) failed during unrelated pre-existing Wikimedia Commons Gonzales Discover derivative generation (HTTP 429). Its later attempt completed successfully: logged cloudflare, blocking live checks, IndexNow and recovery ledger all succeeded.
- The dedicated Friday Night Lights production smoke `friday-night-lights-production-smoke.yml` is separately triggered after deployment. **Its latest post-#4332 outcome has not been independently retrieved in this chat.** Do not infer it solely from the general `texasdefined-live` status.
- Five schools are **DEPLOYED; zero are VERIFIED**. No individual real-browser desktop/mobile accessibility and image rendering passes have been observed here. The research browser could not access these five live URLs. Manual QA must not be backfilled from a successful CI job.

## Counts
| Metric | Current |
|---|---:|
| Existing source-declared profiles | 1,292 |
| Individually researched | 5 |
| Implemented | 5 |
| Merged | 5 |
| Deployed (GitHub production pipeline verified) | 5 |
| Independently VERIFIED against all applicable acceptance criteria | 0 |
| Schools not individually VERIFIED | 1,292 |
| Partially completed / assigned to Batch 001 | 5 |
| Not yet started (source inventory) | 1,287 |

## Open acceptance work, confined to these five schools
- Visually review real production at mobile and desktop widths; verify imagery actually loads, captions/rights, title/H1, canonical, navigation, contrast, layout, official resource links and schema.
- Five targeted, SSR-visible **incoming county links** were **merged in PR #4333** but still require individual live rendering verification: Wills Point from Van Zandt, Abbott from Hill, Katy from Fort Bend, Fort Davis from Jeff Davis, and Southlake Carroll from Tarrant. The campus-county relationship was researched from federal public-school records (for example, Katy High is **Fort Bend**, not automatically Harris because of the city name). Independently review any remaining city/venue inbound links without adding unrelated site changes.
- Wills Point and Southlake Carroll: no independently confirmed reuse rights for the actual football/stadium photos found on school, booster, contractor and publisher sites. Do not copy or imply search-result visibility gives permission. Their original sourced graphics remain appropriate alternatives.
- Confirm school-specific coaching/schedule and game-day details that are still unsupported: Abbott 2026 head coach/stadium policy; Wills Point parking/tickets; Carroll tickets/parking; game-specific Katy venues. No fabricated facts.
- Inspect actual county-to-team link renderings and the independent dedicated football production smoke result; investigate any actual failures.
- Keep first five assigned until all applicable evidence and links are finished or limitations are documented. Do not claim Batch 002 in this execution chat.

## Completed continuation PR #4333
- Added five factual county-to-football-profile links plus federal campus-county citations. **Merged into main via PR #4333**, commit `4fcbd31fa6618c9b6150d868d6afdc38a73c831b`. GitHub statuses `texasdefined-cloudflare`, `texasdefined-live`, `texasdefined-production` are success for this commit; the dedicated school smoke and individual visual QA remain unverified.
- Adds explicit **per-school production SEO contracts** for these five profiles (unique SSR title, meaningful description, exact canonical, SportsTeam and breadcrumb schema) to the existing Friday Night Lights live smoke, and Abbott's photo license rendering assertion.
- Registry status accurately advances from MERGED to DEPLOYED, **not** VERIFIED, based on observed success statuses. Leave `actualProductionVerified=false` until real rendered manual review.
- Merged branch: `football-authority-batch-001-production-acceptance-20261008`. The PR's Merge Gate, Site Quality Watchdog, 254-county verification, coastal validation, and orphan audit concluded successfully.

## Handoff
Refresh latest `main`, read `MASTER.md`, `REGISTRY.json` and this ledger, and reconcile concurrent work. Resume one outstanding Batch 001 school at a time, at most three schools per future chat. Confirm the independent football smoke result, perform genuine individual deployed mobile/desktop reviews, verify incoming county links, resolve outstanding individual quality gaps and commit milestone statuses. Do not start a sixth school until the five Batch 001 records are fully resolved.

## Final chat closeout — 2026-10-08
- Current `main` at start of closeout: `4fcbd31fa6618c9b6150d868d6afdc38a73c831b`. PRs #4330, #4331, #4332 and #4333 are **merged**; no unmerged changes from those PRs remain. `#4333` added per-school production SEO smoke assertions and five relevant county inbound links.
- Verified main-commit GitHub statuses for #4333: Cloudflare, live, full production **success**; this is not proof that five individual routes passed manual desktop/mobile visual acceptance.
- Closeout checkpoint PR [#4334](https://github.com/keeptxred/TexasDefined/pull/4334) was submitted to protected `main` with the stricter one-school-at-a-time / three-schools-per-chat rules and current execution ledger; inspect its actual merge and CI status before claiming the closeout checkpoint is in `main`.
- Registry counts: 1,292 source-declared existing profile URLs (1,268 UIL + 24 other); 5 individually audited/researched/implemented/merged/deployed, **0 individually VERIFIED**, **5 still assigned and partially complete**, 1,287 NOT_REVIEWED. Do not call all 1,292 live pages audited.
- Remaining per-school acceptance: **Wills Point**—live mobile/desktop/image and county link; photograph rights or documented original graphic, game-day tickets/parking as sourced. **Abbott**—archival portrait live sizing/source, school-specific current coach/venue if verifiable, county link and mobile/desktop. **Katy**—archival sign image and license caption, venue-by-game accuracy, county link and mobile/desktop. **Fort Davis**—2026 cancellation prominence and no active-game CTA, photo attribution, county link and mobile/desktop. **Southlake Carroll**—eight-title correction, coach/schedule, Dragon Stadium, county link, legally usable imagery or original graphics and mobile/desktop. All retain full SEO/link/accessibility verification.
- Current blockers: five individual rendered browser QA passes and the dedicated football production smoke outcome not independently captured; real football/stadium photo reuse rights absent for Wills Point/Carroll. Do not invent or replace them with unlicensed photography.
- **Next unassigned inventory slug: `abernathy`**, but it is **not yet eligible** for work while Batch 001 remains incomplete. A future chat must finish incomplete school work first, process **one school at a time**, handle **no more than three schools in a chat**, save meaningful GitHub checkpoints and preserve other concurrent edits. Historic Batch 001 retains all five assigned schools but is not permission to work on five in a single future chat.

## Wills Point focused Stage A/B checkpoint — 2026-10-08
- Recovered merged PR #4333 and #4334 before school work; main was `2046d70d82fba05cdbc7fb2c2b0fe41ebe123b12` at branch fork. Batch 001 remains exactly five assigned schools, **zero VERIFIED**.
- **Individual school re-audit found a real history error:** Wills Point's 1965 championship appeared as **3A** in three program-editorial fields. The contemporaneous UIL football championship archive places Wills Point in **1A**, beating White Deer **14–0**; direct archive: https://www.uiltexas.org/football/archives/P528.
- The Wills Point-only source correction is committed at `134d2f584489ff1783fb4ae791d8602a03484a83` on `football-authority-wills-point-1965-1a-20261008`. See `schools/wills-point.md` for the individual audit and citation. Preserve the original deployed status **DEPLOYED, not VERIFIED**, while this corrective PR awaits merge and later deployment.
- Live Wills Point and Van Zandt pages were inaccessible through the browser; no manual mobile, desktop, schema, image or link acceptance was claimed. The dedicated Friday Night Lights production smoke remains an independent check to retrieve.
- **Next action:** open the focused correction PR, run protected checks, merge only when permitted, confirm successful Cloudflare production deployment, inspect the Wills Point route and reciprocal county link, and checkpoint remaining visual/image-rights blockers. Do **not** begin another school yet.

### Dedicated football smoke failure discovered during Wills Point continuation
- The 2026-10-08 run [37801357647](https://github.com/keeptxred/TexasDefined/actions/runs/37801357647) on prior deployed commit `4fcbd31` **FAILED**. It reached Wills Point's live SSR smoke without a Wills Point assertion failure, but Abbott repeatedly served HTTP 200 lacking expected `Official district enrollment` text. The job stopped at the Abbott assertion. This is a real smoke failure, not grounds to downgrade or fabricate verification for Wills Point, and does not authorize doing Abbott's school repair in the same stage.
- Investigate whether Abbott truly lacks enrollment/source context versus a brittle expected string during Abbott's individual follow-up. New Wills Point 1965 source correction still needs its own protected merge, deployment, and live inspection; all five schools remain individually unverified.

- **Wills Point corrective PR:** [#4335](https://github.com/keeptxred/TexasDefined/pull/4335), branch `football-authority-wills-point-1965-1a-20261008`. The PR includes correction commit `134d2f5`, individual audit, evidence of smoke failure, and QA blockers. Auto-merge was enabled subject to required GitHub protections; at this checkpoint **merge, correction deployment and production acceptance have NOT been observed**. Resume this PR and verify its current GitHub state before any fresh school work.

## Wills Point continuation after PR #4335 merge — 2026-10-08
- Correction PR #4335 **merged** at `d6b2fa2b813cc222b2df5a1b543a91652b985b64`; GitHub's direct combined statuses `texasdefined-cloudflare`, `texasdefined-live` and `texasdefined-production` are all **success** for that merge commit. The historical 1965 **1A, 14–0 vs White Deer** correction has deployed by pipeline evidence, not yet fully visually accepted.
- Dedicated FNL post-deploy run [37809807249](https://github.com/keeptxred/TexasDefined/actions/runs/37809807249) **failed after Wills Point passed its scripted SSR profile step**; cause is `/api/high-school-football` serving an unavailable UIL recent-history layer. The earlier FNL run 37801357647 failed on Abbott `Official district enrollment`. Neither overall workflow succeeded and neither supplies manual Wills Point acceptance.
- **New school-specific browser QA checkpoint:** branch `football-authority-wills-point-browser-qa-20261008` adds Chrome/Playwright real mobile (390 px) and desktop (1366 px) rendered checks plus full-page screenshots for Wills Point and its Van Zandt County inbound link, with honest failure recording. This is supplementary QA; no required protections were disabled. Do not count those checks as passed before an actual GitHub run and screenshot inspection.
- Counts remain **1,292 total, 5 DEPLOYED, zero individually VERIFIED**. Preserve original Wills Point school-specific images/branding, verified official sources, and existing status. Neither new-school assignment nor Abbott fixes is in scope while Wills Point is unfinished.

- **Production-browser QA PR:** [#4336](https://github.com/keeptxred/TexasDefined/pull/4336), created from protected main `d6b2fa2b813cc222b2df5a1b543a91652b985b64`. Acceptance workflow is *proposed*, not yet merged/ran/passed at this checkpoint. Continue at #4336, protected checks, production workflow, inspect screenshots, then assess exact Wills Point acceptance gaps; retain DEPLOYED/not VERIFIED until genuinely accepted.

## Wills Point real-browser follow-up — 2026-10-08
- PR #4336 merged at `dcc45e7c15f5e4f1e15cdde4dce53ef480cedd9c`. The post-production **actual Chrome browser** [run 37821548135](https://github.com/keeptxred/TexasDefined/actions/runs/37821548135) passed its scripted checks at 390px mobile and 1366px desktop. Full-page source screenshots and JSON report saved as artifact `11568574972`.
- Individually inspected Wills Point mobile/desktop screenshots: readable H1/hero, school-specific narrative/1965 1A history, coaching, milestones, responsive layout. Both have correct school canonical, 200 response and no reported horizontal overflow; county reverse link exists. **Not yet full school VERIFIED.**
- **Detected real limitations:** Desktop Chrome logged React hydration error `#418` but old browser script did not identify which route. Mobile county full-page screenshot captured just 2919px of a much longer page and skipped its hero. Original graphics are used because real school/stadium imagery cannot be licensed by assumption. Visitor ticket/parking/accessibility confirmation remains pending.
- School-only QA hardening branch `football-authority-wills-point-qa-hardening-20261008` adds per-route hydration failure reporting, fresh county browser navigation, robust full-page screenshot validation and county title/canonical assertions. **Do not infer a pass before its GitHub workflow has actually run.** Resume that PR; once protected/deployed inspect new report and screenshots. Registry remains 5 DEPLOYED / 0 VERIFIED and 1,292 total.

- **Exact PR:** [#4340](https://github.com/keeptxred/TexasDefined/pull/4340) adds the Wills Point-specific QA hardening above; inspect merge/deploy and new production Chrome outcome before claiming it passed. No new school was started in this chat.

## Wills Point visitor-resource improvement — 2026-10-08
- While PR #4340 stricter browser QA was deploying, separately sourced a missing school-specific visitor need: direct clickable [district 2026 events calendar](https://wpisd.com/page/page_calendar?calID=122113) and [official high school ticket office/GoFan information](https://wphs.wpisd.com/3209_3), explicitly recognizing 2025 prices/deadlines as stale for 2026. Added official high-school campus contact, distinguished it from field address, and documented contradictory stadium capacities (boosters 4,047 vs Dave Campbell 3,000).
- Scoped Wills Point-only source change `254021e` and stricter responsive browser link assertions `30504bf` on `football-authority-wills-point-game-day-sources-20261008`. Preserve protected CI and deployment gate; no other school edited.
- Registry status remains 5 DEPLOYED, 0 VERIFIED until stricter Chrome QA and image/visitor acceptance is reconciled. No unassigned school has been started.

- **Game-day source PR:** [#4341](https://github.com/keeptxred/TexasDefined/pull/4341), started on latest main `dcdc47089108e18d94e792096d4cbf4f99164fdd`. The Wills Point-only calendar/ticket updates and new real-browser assertions are proposed, not yet verified on production. Resume #4341 after #4340's stricter browser outcome and keep any failure distinct.

## Wills Point post-#4340 production verification — 2026-10-08
- #4340 merged at `dcdc47089108e18d94e792096d4cbf4f99164fdd` and Cloudflare production workflow [37825493311](https://github.com/keeptxred/TexasDefined/actions/runs/37825493311) **SUCCEEDED**.
- Stricter actual Chrome [37826135658](https://github.com/keeptxred/TexasDefined/actions/runs/37826135658) **FAILED**. Its uploaded [artifact 11571606044](https://github.com/keeptxred/TexasDefined/actions/runs/37826135658/artifacts/11571606044) confirms clean **Wills Point school** mobile/desktop page runtime and no horizontal overflow, correct school/county mutual links, full county screenshots (30,183 px mobile, 15,923 px desktop). React hydration error `#418` is isolated to **desktop Van Zandt County**, not Wills Point's football school route. The test failure must remain visible; do not weaken gates.
- #4341 added school-specific official 2026 district calendar, school ticket/contact page with warnings about 2025 prices, and sourced conflicting stadium capacity descriptions. It **MERGED** at `beb72d832cc446eab6a673c4e639f52e6a2a1a3f`; check its separate deploy and post-deploy Chrome result before accepting new links live.
- Diagnostic continuation branch `football-authority-wills-point-county-hydration-diag-20261008` runs desktop-before-mobile and desktop repeat, maintains fail-on-hydration, collects a cautious server-no-JS versus client-hydrated section outline for Van Zandt only. This is not a fix or production pass until root cause is identified and resolved. No other school started. Registry remains 5 DEPLOYED, zero VERIFIED.

- **Exact diagnostic PR:** [#4342](https://github.com/keeptxred/TexasDefined/pull/4342). It changes only the Wills Point/Van Zandt Chrome diagnostic and committed ledgers; no county production renderer modified yet. Subject to protected GitHub checks. Following any deploy inspect SSR/client section-outline artifact and identify actual cause before attempting a county code fix.

## Wills Point stage: guarded lodging hydration fix — 2026-10-08
- Diagnostic PR #4342 merged and deployed at `0c6f7a9e6ecbbe6eb945307c03ff4172ab366310`; [Chrome run 37828364341](https://github.com/keeptxred/TexasDefined/actions/runs/37828364341) **FAILED** on Van Zandt County hydration `#418` for desktop-first, mobile, desktop-repeat, while Wills Point school route passed all three with zero runtime errors. Artifact [11572790903](https://github.com/keeptxred/TexasDefined/actions/runs/37828364341/artifacts/11572790903) identifies SSR county story as first section but a post-JS lodging widget as first hydrated section. Async football/tax sections also expand, so only controlled testing can establish cause.
- Scoped, still **unverified hypothesis fix** in `football-authority-wills-point-county-hydration-fix-20261008`: React `EntityPage` publishes a Van Zandt-only after-hydration marker; Expedia and Stay Affiliate bootstraps defer DOM injection on that county until hydrated, then refresh normally. No other school edited and no gate bypass; follow protected PR to deployment and strict responsive browser QA before declaring success.
- Five assigned schools remain DEPLOYED but **zero VERIFIED**; next school remains blocked until a complete individual Wills Point acceptance or precise unresolved checkpoint.

## Wills Point **VERIFIED** from post-deployment Chrome evidence — 2026-10-08
- [#4343](https://github.com/keeptxred/TexasDefined/pull/4343) merged at `ae1bba884ffb8fca169b686e42a33a5857f91b96`. [Production deployment 37829694500](https://github.com/keeptxred/TexasDefined/actions/runs/37829694500) **SUCCESS**, including build, Cloudflare, live and final production statuses.
- [Chrome verification 37830846153](https://github.com/keeptxred/TexasDefined/actions/runs/37830846153) **SUCCESS** against that deployed commit; [artifact 11572953179](https://github.com/keeptxred/TexasDefined/actions/runs/37830846153/artifacts/11572953179) captured desktop-first 1366, mobile 390 and desktop-repeat 1366 with **zero school/Van Zandt hydration runtime errors and no warnings**, school SEO/metadata/schema/source checks, mutual school↔county links, width/visible-asset checks, full county screenshots and retained post-hydration lodging panel. Actual mobile and desktop school/county screenshots reviewed; legible page-specific layout and blue/white original editorial accents, no unlicensed real photos.
- **Wills Point individually VERIFIED**; known limits (unlicensed real stadium photos never used, stadium capacity dispute, unconfirmed 2026 parking/accessibility/ticket fees) are openly disclosed, with official school links. No such unverified claim is made on the page.
- **Overall FNL workflow remains FAILED**: [run 37830845891](https://github.com/keeptxred/TexasDefined/actions/runs/37830845891) failed 12× on shared finder API `UIL recent-history layer is unavailable` after Wills Point page SSR step passed. It is a separate platform API issue, not a Wills Point page failure. Do not describe the full smoke as successful or suppress the error. Follow it up outside the school-by-school editorial gate.
- Registry now **1 VERIFIED (Wills Point), 4 DEPLOYED assigned (Abbott, Katy, Fort Davis, Southlake Carroll), 1,287 NOT_REVIEWED; 1,292 total**. Batch 001 retains assignment and the single-school-at-a-time limit. Next existing assigned school: **Abbott**, only after acceptance PR protected merge. Acceptance PR fixes browser report JSON flattening so future screenshots/report show each route's H1 and canonical separately.

## Abbott individual follow-up initiated after Wills Point acceptance — 2026-10-08
- Wills Point acceptance PR #4344 merged at `1af71ad7cd4a780a84808c3cde3b24747fb96863`; registry confirms **1 VERIFIED Wills Point, 4 DEPLOYED assigned, 1,287 NOT_REVIEWED**. Do not repeat Wills Point's completed school audit.
- Began next assigned Batch 001 school **Abbott** (second school touched in this execution chat; max 3). Examined its specific editorial/photo and [school audit](schools/abbott.md), plus current official Abbott ISD coach/event sources, UIL 2012/2015 archival final scores and corroborating venue references.
- Abbott-only implementation `72e5c5a77f7ea05f1db2bd60a9205e5a921cf06a` in `football-authority-abbott-individual-20261008` adds current official head coach **Kyle Crawford**, school events link, **Panther Field** (third-party venue attribution, not fabricated entrance address), admission/accessibility cautions, UIL championship opponents/scores, and detailed FAQ while preserving rights-cleared archival Willie Nelson photo.
- Abbott stays **DEPLOYED, not VERIFIED** until protected merge, successful deployed screenshots+responsive/source/rights/reciprocal Hill County checks; statewide FNL finder API `UIL recent-history layer is unavailable` is independently failing and cannot be called a pass.

## Abbott deployed QA failure and immediate scoped correction — 2026-10-08
- #4345 merged at `f26765a547ea91aa3512f2977065f68e2766c5af`, production [37832896335](https://github.com/keeptxred/TexasDefined/actions/runs/37832896335) **SUCCESS**.
- Dedicated real Chrome [run 37833498946](https://github.com/keeptxred/TexasDefined/actions/runs/37833498946) **FAILED at 1366 desktop and 390 mobile**: missing Abbott → Hill County outbound link. The page used optional `program.countyName`, unavailable for Abbott in rendered production. Earlier assertions passed but photo/reciprocal county checks did not run, so Abbott is **not VERIFIED**.
- Abbott-only correction `football-authority-abbott-county-link-20261008` adds verified `/county/hill` fallback and makes the acceptance test inspect school and Hill County independently, accumulating all failures. Do not generalize to other schools without their own sources. Next: protected merge, production deploy and real-browser artifact review.
- Full Friday Night Lights [run 37833499129](https://github.com/keeptxred/TexasDefined/actions/runs/37833499129) **FAILED** on shared missing UIL recent-history finder data, tracked separately; no weakening of tests.
- Completion-only Batch 001: Wills Point VERIFIED; Abbott in progress; Katy, Fort Davis, Southlake Carroll remain DEPLOYED. No new school assignments.

## Abbott/Hill County mobile hydration follow-up — 2026-10-08
- #4346 merged at `3b179595793d14e007580e7c9dde0af10d6073e0` and production [37834642740](https://github.com/keeptxred/TexasDefined/actions/runs/37834642740) **SUCCESS**. [Abbott Chrome run 37835305201](https://github.com/keeptxred/TexasDefined/actions/runs/37835305201) **FAILED** solely on **mobile Hill County hydration React #418**, as recorded in artifact [11574489391](https://github.com/keeptxred/TexasDefined/actions/runs/37835305201/artifacts/11574489391). School desktop/mobile and Hill County desktop had zero runtime errors. Actual school H1/SEO/schema/source/photo and both county links passed; the original archival Willie Nelson photo loaded 134px natural/rendered width, with documented public-domain attribution. Hill mobile county link was visible and full screenshot captured despite hydration error.
- Candidate production fix on `football-authority-abbott-hill-hydration-20261008` extends route-specific after-hydration lodging DOM guard from Van Zandt to **Hill only**, preserving Van Zandt checks. Adds a Hill Expedia panel retained assertion, and resets scroll to school page top before screenshots. No unrelated counties or new schools. **Not accepted until live QA rerun passes.**
- Status **Wills Point VERIFIED; Abbott DEPLOYED with open mobile county hydration issue; Katy, Fort Davis, Southlake Carroll DEPLOYED, not yet individually checked in this continuation.** No additional school assignments; existing Batch 001 only.
