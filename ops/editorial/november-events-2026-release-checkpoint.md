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
