# Palestine Polar Express — automated 2027 calendar rollover

Owner: GitHub, `keeptxred/TexasDefined`. Source: [Texas State Railroad official Polar Express page](https://texasstaterailroad.net/the-polar-express/). No ChatGPT schedule, new platform, Cloudflare browser rendering, manual cache purge or purchase required.

## What changes automatically

- The page serves the **2026 source-verified season** through its last day (December 28, 2026).
- Starting **December 29, 2026**, if no verified new season exists, the guide changes to a clear **2027 dates not yet announced** banner. The 2026 season disappears from the top booking card, SEO title and metadata; outdated fares, date-specific instructions and 2026 locomotive claims are suppressed. The visitor guide, railroad booking link, county links, historical photo attribution and Palestine hotel affiliate remain.
- `.github/workflows/refresh-palestine-polar-express.yml` checks the source monthly January–March and weekly April–December, starting January 2027. It can also be invoked manually.
- The official railroad's **two clearly labeled 2027 month-calendar images** are required. The job does not calculate the new season from last year's dates or from Palestine's city listing.
- Images are fetched from the operator's own HTTPS uploads. Two independent vision reads of each image must match exactly, including departure dates and times. Both must pass year, month, weekday, calendar-count and time-format checks. An ambiguous or unavailable source preserves the prior manifest, never publishes guesses.
- On a new verified season, the runner proposes a **single generated JSON manifest** update via an isolated PR. A separate trusted `workflow_run` finisher checks the identity, changed-file allowlist, exact head SHA, ancestry, and the existing canonical and merge-gate CI workflows before allowing protected auto-merge.
- The standard `main` GitHub Actions pipeline deploys through the configured Cloudflare Worker and production checks. The event guide and other directory consumers read the same season manifest.
- The guide displays verified 2027 dates and scheduled departure times without claiming seats are still for sale. Other trip-planning information should be checked separately when a new year is announced.

## Limitations and guardrails

The current source publishes monthly calendars as images. Automatic publication is deliberately contingent on discovering two **year-labeled** calendars in operator image markup, with the existing `OPENAI_API_KEY` GitHub secret available. If the operator switches to files without usable labels, changes the layout, provides ambiguous images or drops the year, the job fails closed or reports “not announced.” It does **not** manufacture 2027 dates or bypass protected CI. That scenario may need a source-parser update.

The 2027 rollover does not imply current ticket inventory, 2027 fare approval, or that the 2026 diesel-locomotive note is applicable in 2027. An incomplete release will not replace the verified record.

## Test surface

`node --test scripts/events/refresh-palestine-polar-express-season.test.mjs` checks official-only image selection, invalid years/weekday/times, matching independent readings, no-source no-op and disagreement failures. Production releases continue to use existing page-specific verification for the active 2026 guide; future verification must not confuse 2027's published schedule with sold-seat inventory.
