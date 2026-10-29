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
