# Top 25 attraction authority maintenance

This document is the maintenance contract for TexasDefined's Top 25 Texas Attractions reference cluster.

## What must remain true

Every Top-25 attraction must retain:

1. A canonical `/destination/{slug}` guide with a non-placeholder hero, Texas coordinates, durable visit guidance, county/region context and a current official visitor source.
2. A complete six-part `areaGuide`: nearby attractions, food and drink, lodging, neighborhoods, family stops and side trips.
3. A `DestinationAuthorityGuide` with:
   - why the place matters to Texas;
   - recommended visit length;
   - physical-effort assessment;
   - weather-exposure assessment;
   - advance-planning assessment;
   - family-fit guidance;
   - first-time-Texas value;
   - exactly three itinerary structures;
   - a source list.
4. A visible review date and review log.
5. A link to the Texas Defined Editorial Desk and the Top-25 methodology.
6. Trip Planner and Top-25 collection links.

## Source precedence

Use this order when researching or correcting a guide:

### 1. Controlling visitor source

The attraction operator or responsible public agency controls current operational facts such as:

- admission and ticketing;
- reservations and permits;
- closures and construction impacts;
- hours and seasonal operating windows;
- accessibility services;
- parking or access rules;
- capacity restrictions.

Do not let a secondary source override a current operator instruction.

### 2. Supporting authority sources

Use accountable institutions for durable context, including:

- federal, state, county and municipal agencies;
- universities and research institutions;
- UNESCO and preservation bodies;
- conservation organizations directly responsible for the relevant program;
- official destination organizations when they are the accountable local tourism source;
- attraction-operated history, science, conservation or accessibility resources.

Do not use user-review platforms, generic travel blogs or social posts as authority evidence in `top-attraction-authority-sources.ts`.

### 3. TexasDefined editorial synthesis

The following are editorial planning judgments and must remain labeled as such:

- recommended visit length;
- physical effort;
- weather exposure;
- advance-planning level;
- family fit;
- first-time-Texas value;
- three visit itineraries;
- road-trip grouping and route logic.

Do not represent research-based synthesis as a personal visit unless the first-hand experience is actually documented.

## Updating a changing fact

When a material operational fact changes:

1. Update the destination record and wording.
2. Update or replace the controlling URL if necessary.
3. Change `sourceCheckedAt` to the actual review date.
4. Recheck accessibility and reservation language if the same operator page changed materially.
5. Check whether a supporting authority URL is now stale, redirected or superseded.
6. Keep the editorial assessment unchanged unless the underlying trip experience materially changed.
7. Run the Top-25 authority validator and the broader TexasDefined validation suite.

## Adding or replacing a supporting source

A supporting source must:

- use HTTPS;
- have a descriptive label;
- have a scope sentence explaining exactly what it supports;
- come from an accountable institution;
- omit tracking parameters;
- not duplicate another source URL in the registry.

`validate-top-attraction-source-policy.mjs` enforces these structural rules. The scheduled source-health workflow checks live reachability separately.

## Data distributions

The canonical reference rows live in `src/data/top-attraction-reference-data.ts` and power both:

- `/top-25-texas-attractions.csv`
- `/top-25-texas-attractions.json`

Do not create a second hand-maintained dataset for those downloads. Changes to authority sources, editorial assessments or route membership should flow through the shared reference rows.

The HTML Top-25 page remains the canonical editorial citation target. CSV and JSON are distributions for analysis and machine use.

## Road-trip coverage

`src/data/top-attraction-road-trips.ts` must contain seven route structures covering all 25 attraction slugs exactly once. If the Top-25 list changes, update route membership in the same change and keep the validator's exact-coverage contract.

The road-trip collection is editorial itinerary logic, not live navigation guidance. Do not hard-code unstable driving times as authoritative facts.

## Timelines

Historical timelines are optional and should be used only when chronology materially improves understanding. Every timeline event must carry its own source URL and source label. Do not force timelines onto attractions where dates add little value.

## Performance contract

Do not raise the client bundle budget to accommodate authority content.

The authority expansion is intentionally isolated:

- Top-25 destination authority data is dynamically loaded only for Top-25 destinations.
- `DestinationAuthorityGuide` is lazy-loaded from `DestinationRelationships`.
- the methodology body is lazy-loaded from `TopAttractionsMethodologyContent`;
- the road-trip body is lazy-loaded from `TopAttractionRoadTripsContent`;
- road-trip data is dynamically imported;
- CSV and JSON routes dynamically load the shared reference dataset.

If a refactor statically imports the heavy authority resolver or reference dataset into a general-purpose route, fix the import architecture rather than increasing the bundle allowance.

## Required checks

Primary CI:

- `scripts/data/validate-top-attraction-authority.mjs`
- `scripts/data/validate-citation-magnets.mjs`
- `scripts/data/validate-citation-downloads.mjs`
- full `npm run build`
- client performance budget validation

Focused workflows:

- `top-attraction-source-policy.yml` — rejects unsuitable authority-source inputs.
- `top-attraction-source-health.yml` — scheduled reachability audit of official, reservation and supporting URLs.
- `destination-indexing-smoke.yml` — verifies the deployed collection, methodology, road trips, authority UI, CSV, JSON and checklist.

## Corrections principle

A stronger authority page is not a page with more claims. It is a page where the reader can tell:

- which facts came from the operator;
- which context came from another accountable institution;
- which conclusions are TexasDefined's editorial synthesis;
- when the information was reviewed;
- where to verify a current-day condition.

Preserve those distinctions whenever the cluster is expanded.
