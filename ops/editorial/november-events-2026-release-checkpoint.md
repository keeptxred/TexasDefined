# November 2026 events authority — deployment and recovery checkpoint

Last updated: 2026-10-29 (America/Chicago)
Primary URL: https://texasdefined.com/events/november-events

## Verified completed

- PR [#6307](https://github.com/keeptxred/TexasDefined/pull/6307) merged as `043aa2a30461a70f97d1b5e6a594d2fe51670c2b`.
- Production deployment run [40890898530](https://github.com/keeptxred/TexasDefined/actions/runs/40890898530) concluded success at 2026-10-29T14:31Z. Its deployed commit `8dcfc756` descends from `043aa2a`. Predeploy and postdeploy health, build, and structured-data checks passed.
- Cloudflare `texasdefined-site` Worker deployments are active; latest inspected deployment on 2026-10-29T16:39:32Z ran version `b00403f1-d5ed-4aa5-af79-b29313e835e8` at 100%. Do **not** initiate a Cloudflare reconnect or claim an OAuth health failure based on token verification endpoints.
- Organizer-sourced Johnson City Lights Spectacular: Nov. 27, 2026–Jan. 3, 2027. Official FAQs: https://lightsspectacular.com/faqs
- Organizer-sourced South Pole Illuminated: Nov. 28–Dec. 28, 2026. Official festival: https://www.southpoleoftexas.com/
- Shared event SEO title generation avoids appending an already present year (e.g., `2026–27 2026`).
- November page has date, region, city and category filters; featured event picks; 4 additional first-party-confirmed event listings (three Thanksgiving runs and one Día de los Muertos festival); rights-reviewed image slots; visitor-focused introduction without indexing-policy leakage.
- New November source checks run inside the existing daily `sync-texas-events.yml` workflow. They flag organizer drift for bounded review and **never** silently rewrite date windows.
- South Pole Ticketmaster links are additionally gated to the organizer-confirmed Nov. 28–Dec. 28 season. A separately listed Nov. 27 ticket must not be offered as admission to an event whose organizer opens Nov. 28. This guard is scoped to South Pole, not a blanket removal of other event previews. The same exact 2026-11-27 provider record is also excluded at Ticketmaster normalization, preventing the statewide calendar and partner feed from advertising it; next-year dates are not automatically suppressed.
- `verify-november-event-collection.yml` regression suite passed in PR #6307.

## Follow-up guard added in this batch

`scripts/ci/verify-event-temporal-production.mjs` now verifies, during its **existing daily scheduled run**, the October–November 2026 visitor-facing November landing, filters, and four official picks, plus the two corrected authority guides and SEO-title duplication. It reuses the fetched November HTML and makes only two additional guide requests; it does **not** trigger a whole-site audit after every deployment.

## Guardrails and open questions

- Never infer a recurring event's next-year dates solely from last year's calendar or from a few Ticketmaster sessions; only organizer-confirmed dates get published.
- Preserve `noindex` policies for unqualified calendars and missing rights-compliant guide images. Hiding implementation details from readers **does not** change robots policy.
- Public web-search crawled HTML may be stale even after a successful Cloudflare Worker deployment. Prefer deployed GitHub production job evidence and the cache-busting GitHub-hosted production verifier before diagnosing a rollback or cache fault.
- The initial audit identified two demonstrable source conflicts; **a manual 2026 organizer-by-organizer reconciliation of every other November guide is not represented here as completed**. New source drift beyond the six watched organizer URLs needs additional scoped evidence.
- Never start a Cloudflare reconnect loop. Check current Worker deployment history and GitHub production deployment results once.

## Recovery protocol for next chat

Start with this checkpoint, PR #6307, the current `main` head and the last `Verify temporal event production` scheduled run. Inspect only changed files and actual failed checks; do not re-audit passed items or redeploy blindly.

## October 29 late-evening release and source-review checkpoint

- PR #6335 (fix fake test-only `/fixture/hill-country-holiday-festival` production 404 smoke) merged as `585e79e951b2ed4cb944e929c3d667d0ceb711d7`. Retains true public-URL 404 failures.
- PR #6336 (Shiner 2026 new full-marathon race and official registration link) merged as `2ac4b6c5c951b813776da2dc624aff4d0f615104`.
- Production run **40936723651** deployed commit `2ac4b6c` successfully, including canonical and direct Worker health and the prior failing `Verify base production surfaces` gate.
- GitHub `Sync Texas Events` run **40936723538** on the same commit passed both November source and regression checks.
- Live November collection (2026-10-29) rendered 48 eligible guides, consumer-facing filtering, four additional source-confirmed picks, and no exposed indexability implementation text. The existing server-side production verification passed on run 40921462469.
- Additional source sampling verified Texas Capital Air Show (Nov 7-8), UIL volleyball finals (Nov 19-21), Homestead Fair (Nov 27-29), Houston Diwali (Nov 14, rain Nov 15), Texas Butterfly Festival (Nov 7-10), plus others; the wider 48-guide organizer-by-organizer review is **not** yet complete.
- This follow-up branch refines Rockport Songwriter Festival (free Nov 4 prelude, paid Nov 5-8 program; organizer reported main festival passes sold out) and the Shiner Beer Run (all four distances marked full with a waitlist at the Oct 29 source check). Those are dated observations, **not** permanent inventory guarantees.
- The existing November date-drift watcher now also checks the organizer dates/windows for Rockport, A Christmas Affair, UIL volleyball finals, Waco Homestead Fair and Houston Diwali. It is read-only and routes drift to review.

### Next recovery steps

Use `main` plus this checkpoint; first confirm the latest PR merge and next production deployment outcome. Verify the narrower November workflow, its daily organizer checks, and live Rockport/Shiner guides. Continue remaining organizer sampling by actual source evidence, not by inferring next-year recurrence. Do not repeat the Cloudflare reconnection loop.


## October 30 — follow-up audit improvements (PR pending validation)

Scope: live `/events/november-events`; base main commit `aef02819e39b82bab51c37644ac4f4c2b117c835`.

Confirmed first-party source dates, **not** inferred from last year:
- Fort Worth GM Financial Parade of Lights: November 22, 2026, organizer https://fortworthparadeoflights.org/plan.
- Arlington Texas Christkindl Market: November 20–22 AND November 27–December 23, 2026, organizer https://txchristkindlmarket.com/. Dates exclude November 23–26; do not advertise as a continuous run.
- Austin Studio Tour: November 14–15 AND 21–22, 2026, 11–5 daily, organizer https://atxstudiotour.com/.
- A Christmas Affair: family events November 13–15 and main market November 18–22, 2026; previously the broad November 13–22 card implied uninterrupted opening.

Implementation on `fix/november-filter-all-verified-2026`:
- Three new entries in the **existing first-party-verified organizer picks** array. Fort Worth and Arlington also have verified Christmas community records; no thin event guide or duplicate event page was created.
- Unify the existing four organizer picks and three new ones with the 48 eligible permanent guides in **the same November filter set** (date, region, city, category). Count remains explicitly separate: 48 guides + 7 organizer-only listings. Direct organizer links are visibly marked rather than misrepresented as TexasDefined authority guides.
- Date filtering and card labels honor multiple operating windows for two new picks and A Christmas Affair instead of flattening a date gap.
- Add three source-watcher targets to the **existing daily Sync Texas Events** flow, plus bounded regression fixtures and checks in the existing temporal production verifier. The watcher flags possible changes for a GitHub review issue without rewriting dates. Do not add a second cron or rely on manual annual audits.
- Existing yearless `/events/november-events` URL and qualifying/indexing threshold stay unchanged; 2026 pick injection remains season-scoped and does not roll unverified 2026 dates into 2027.

**Verification status at writing:** edits committed on PR branch; protected PR gates, merge, production release and live page acceptance still need independent checks. Do not claim deployment before verifying the exact merged SHA and production job. Do not initiate a Cloudflare reconnect. If GitHub gate fails, inspect the specific failed job and correct only that issue.

Next: open PR, wait for required merge gate via normal GitHub actions, merge passing change, confirm existing deployment plus the next existing event-sync source watcher; check live listing for the 7 organizer entries, split windows and filter UX. Avoid a sitewide audit.

Additional affiliate relevance correction: November's shared `CalendarBookingDiscovery` requires explicit city selection before showing a Viator link or enabling live product lookup, rather than implying statewide visitors want Houston. Selected-city CTA updates immediately; product results still require the explicit Find nearby tours action. Other calendar pages retain their previous default. Source and regression fixtures cover this constraint.


## October 30 afternoon — verified production and regression recovery

- The follow-up November PR [#6439](https://github.com/keeptxred/TexasDefined/pull/6439) **merged** as `63a401fc43491a62b9acf2f59e21bdae492f9372` (2026-10-30T18:11:56Z). The exact-SHA [production deployment #41104811330](https://github.com/keeptxred/TexasDefined/actions/runs/41104811330) **succeeded**. Public `/events/november-events` showed 48 permanent guides + 7 organizer-only entries (55 filterable) and split Nov 2026 event-date windows. Latest displayed source check advanced to 2026-10-30. This establishes live release without Cloudflare reconnection.
- The [Validate November Event Collection run #41103565877](https://github.com/keeptxred/TexasDefined/actions/runs/41103565877) for #6439 failed **one preexisting fixture** solely because it used `targets[0]` / `targets[1]`, whose positions changed when the new 2026 source targets were prepended. Nine other tests passed. The daily [Sync Texas Events #41104810915](https://github.com/keeptxred/TexasDefined/actions/runs/41104810915) failed at the same pre-validation step; its actual official-source step did **not** run. Do not misinterpret either as an organizer date change.
- Recovery PR [#6440](https://github.com/keeptxred/TexasDefined/pull/6440) replaces positional lookups with organizer names. Its [November test #41116623813](https://github.com/keeptxred/TexasDefined/actions/runs/41116623813) **succeeded** (10 of 10) when last checked; protected merge gate and downstream source sync remain to be confirmed before declaring the job fixed in production.
- Additional draft PR [#6442](https://github.com/keeptxred/TexasDefined/pull/6442) fixes a real consumer issue: verified organizer-only entries were displayed **after** all 48 permanent guides, burying Nov 14–22 attractions below year-end displays. All 55 are instead sorted by their real ISO start dates, with deterministic city/name ties; the same date, category, region and city filters remain.
- PR #6442 also corrects the **actual** organizer's 2026 Austin Studio Tour shared-month notation: `November 14–15 & 21–22, 2026`. The previous second-window watcher expected the organizer to repeat the word November and would falsely report source drift. Targeted positive and negative tests now check the actual first-party format; see https://atxstudiotour.com/.
- Release order: merge #6440 after required tests; then reconcile and merge #6442 after November tests and protected gate. Verify production with same standard and the next bounded existing `Sync Texas Events` run. Do not overwrite yearless recurring URLs or create a new daily schedule.


### October 30 source-test recovery complete; last visitor layout release pending

- [#6440](https://github.com/keeptxred/TexasDefined/pull/6440) **merged** as `c03dd2c5e474ca5ec947a15bb2226c492a05bf67` on 2026-10-30, after its exact-branch [November validator #41116623813](https://github.com/keeptxred/TexasDefined/actions/runs/41116623813) and [protected merge gate #41116623843](https://github.com/keeptxred/TexasDefined/actions/runs/41116623843) both completed **success**. The positional fixture blocker from #6439 is resolved on `main`. Do not reintroduce target-array-position assumptions.
- The next bounded [#6442](https://github.com/keeptxred/TexasDefined/pull/6442) also promotes November browsing **ahead** of lengthy policy/planning copy (without deleting that context or changing non-November pages), corrects chronological presentation across guide/organizer sources, and matches organizer's exact shared-month Studio Tour pattern. New tests guard the layout, shared-month positive/negative dates and ordered data. Its merge/build/deployment result is **not yet certified** by this checkpoint.


## October 30 — November layout merged; first-party host source fallback

- PR [#6442](https://github.com/keeptxred/TexasDefined/pull/6442) merged as `09ac51869193615588476c04e7f18dc62dd32d15` on 2026-10-30T19:47:41Z, after scoped November collection tests and protected merge gate. It sorts all 55 November listings chronologically, positions the browser before lengthy planning copy, and accepts Austin Studio Tour's real shared-month date string. The exact-SHA production deploy [#41118149890](https://github.com/keeptxred/TexasDefined/actions/runs/41118149890) and existing events sync [#41118149772](https://github.com/keeptxred/TexasDefined/actions/runs/41118149772) were in progress at the most recent checkpoint; **do not claim the final page deployed until this SHA and live order are verified**.
- The preceding #6440 daily [events sync #41117174733](https://github.com/keeptxred/TexasDefined/actions/runs/41117174733) **succeeded**, including 10/10 regression checks, despite source observations `Austin Studio Tour: review` (legacy shared-month false negative, corrected by #6442) and `Houston Ballet Nutcracker Market venue: review / HTTP 403`. All remaining observed November organizer sources matched.
- The outstanding bounded [November organizer review issue #6403](https://github.com/keeptxred/TexasDefined/issues/6403) originally arose from Houston Ballet's recurring HTTP 403 in GitHub Actions, not a sourced contradiction. Independently confirmed Houston Ballet itself advertises November 12–15, 2026 at Reliant Center. The **venue's official first-party page** https://www.reliantpark.com/event/nutcracker-market/ independently confirms the exact Nov 12–15, 2026 occurrence and Reliant Center.
- This bounded PR adds a **blocked-source-only official venue fallback** to the existing read-only daily November watcher. It accepts the host listing only if original Houston Ballet fetch returns 403, 429, a server error or network exception; if accessible organizer dates change or organizer page returns 404, it deliberately reports review rather than silently accepting a fallback. Host-source date and venue must match independently. Regression fixtures cover block→correct host fallback, changed organizer→no fallback, organizer 404→review, wrong-year venue and renamed venue rejection.
- After merge, certify the actual existing daily GitHub-run source observations. Only then consider closing issue #6403 with a source-specific explanation. Do not repeatedly retry the blocked host, disable review entirely, invent ticket availability, trigger new sitewide audits, create a new cron, or reconnect Cloudflare. Leave the original organizer link on public authority guides.


## October 30 — release reopened for missing November event imagery

**The prior release cannot be marked fully complete on the strength of text/date validation alone.** User correctly identified the uncompleted event imagery review.

### Verified baseline deficiency

- The `/events/november-events` component previously rendered images only with `event.image?.url ? <img ...> : null`. Every no-photo record therefore showed a **blank visual area / no visual** in both the featured and main event results.
- All seven direct organizer-only 2026 records in `src/data/events/november-official-picks-2026.ts` do not include an image property; they were definitely missing any visual. Many of the 48 permanent guides have no governed photo image either.
- Existing genuine event photos must remain subject to `getMajorEventSchemaOccurrenceEnrichmentServer()` and `isCompliantMajorEventImage()`: verified origin, exact subject, license/rights notes, commercial-use approval and meaningful alt. Do not replace these with irrelevant regional stock, claim a photo shows a 2026 event when it is older, or impersonate organizer material.

### Implemented remediation (separate bounded imagery PR)

- Every November guide and direct organizer listing now renders `NovemberEventVisual` (also four featured cards). For an approved rights-reviewed event image: display the existing source image with explicit source/credit link, meaningful alt and category-accurate `data-event-visual`; an AI-generated source is labeled as editorial, not documentary.
- If no rights-reviewed image exists or a source image fails to load, render an individually titled **Texas Defined editorial event illustration**, with event name, city/date, appropriate sports/music/food/culture/seasonal/rodeo theme and conspicuous `not event photography` disclosure. This is a distinct honest visual for every event, **not** a claim that new 2026 photographs were created.
- Reuse the existing rights-approved image catalog; no additional paid AI image generation, no questionable hotlinked organizer images, no new cron, no speculative annual rollover and no extra manual image licensing gate.
- Client `onError` recovers from blocked/broken external photo URLs rather than exposing an empty card.
- The directory propagates source URL/type/license and commercial-use approval from already reviewed event schema to the November card; disapproved photos cannot display.
- Focused regression test guards that **both featured cards and 55 event rows** always render a visual and that editorial/photo status is labeled truthfully. The existing November production SSR verifier now requires **one valid `data-event-visual` per all 55 `data-november-event-card` rows**, truthful illustration disclosure, nonempty photo alts and a photo-vs-illustration count. These checks are season-scoped to Oct 29–Nov 30, 2026, and do not affect other months.

### Release acceptance that must still occur

- GitHub **Validate November Event Collection** regression pass and protected **Required merge gate** success on exact PR head; review any concrete compile errors and fix narrowly.
- Squash merge following protected rules, exact code SHA as deployed (or verified descendant same visual source blobs).
- Execute existing **Verify temporal event production** check after deploying; require **55/55 visibly represented event cards**, 0 missing imagery, clear differentiations between licensed photographs and editorial illustrations, original filters/chronology and organizer source links unaffected.
- Only then close this imagery backlog item, append exact PR/commit/deployment/verifier references, and declare the November **page** release complete.
