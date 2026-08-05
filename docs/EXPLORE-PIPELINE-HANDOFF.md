# Explore Data Pipeline — Handoff to KeepTXRed

**Run this work in the `keeptxred/texas-heartland-hub` Lovable project**, which is bound to the
shared Supabase project `qhwwmdszjgkscqxgmenf`. TexasDefined cannot apply migrations or deploy
`explore-import` / `explore-review` into that project — it is bound to a different Supabase project
and has anon-only access to the shared one.

## Verified state of `qhwwmdszjgkscqxgmenf` (anon reads, from TexasDefined)

| Table | Rows visible to anon |
|---|---|
| `explore_import_sources` | 0 (empty or RLS-hidden — confirm with service role) |
| `explore_import_records` | 0 |
| `explore_entity_types` | 22 |
| `explore_entities` | 0 |

## Contract TexasDefined depends on

TexasDefined reads the shared catalog with the **anon key only**. For a destination to appear on
TexasDefined it must satisfy all of:

1. `explore_entities.visibility = 'public'`
2. `explore_entities.status IN ('published', 'verified')` — use `verified` for records confirmed
   directly from an authoritative government source
3. Anonymous `SELECT` policy on `explore_entities`, `explore_locations`, `explore_entity_sources`,
   `explore_entity_media`, `explore_media`, and the entity/category join tables, scoped to
   public + published/verified rows only. **No anonymous write grants.**
4. A non-null `slug`, `name`, and entity type key
5. Coordinates in `explore_locations` (not only inside raw JSON metadata), inside Texas bounds,
   never `0,0`

Records left at `visibility = 'internal'` / `status = 'reviewed'` are invisible to TexasDefined.
That is the current review-function default and is the main pipeline mismatch to fix.

## Entity-type keys TexasDefined understands

Keep `explore_entity_types` keys aligned with `src/data/explore-remote.ts` and the knowledge-graph
adapter in this repo. Base set:

```
state_park  national_park  campground  historic_site  trail  lake  river
state  region  county  city  business  restaurant  hotel  event  agency
```

Additive keys to introduce via migration only where real source data supports them, and only when
no equivalent key already exists (no synonyms):

```
reservoir  spring  cavern  cave  beach  island  natural_area  wildlife_refuge
national_monument  national_preserve  national_seashore  museum  mission
battlefield  monument  scenic_drive  swimming_hole  waterfall  winery  brewery
```

Classification must be record-aware — source type plus feature type, facility type, designation,
name, metadata, and authoritative category. Do not map an entire source to one generic type.

## Work items for the KeepTXRed project

1. Inventory `explore_import_sources` with service role; seed only source definitions already
   present in that repo's migrations/seeds/importer classes if the table is empty.
2. Replace the broad source-only type mapping in `explore-import` with the record-aware
   classification above; add missing taxonomy keys via an additive migration.
3. Extend `explore-review` promotion beyond name/slug/description/type/status/visibility to also
   write `explore_locations`, `explore_entity_sources`, `explore_media` / `explore_entity_media`,
   park/lake profile tables, categories, relationships, and retrieval/verification timestamps.
4. Correct approval states: invalid → rejected; missing name or stable source ID → rejected;
   duplicate candidates and uncertain classifications → pending; clean authoritative records →
   approved, then promoted to `public` + `verified`. Preserve version/provenance/rollback/audit rows.
5. Add a service-role-only batch approval path (import secret or admin/service-role auth required,
   never anonymous) with per-job counts for inserted/updated/unchanged/rejected/skipped/failed and
   rollback by job ID.
6. Deploy corrected `explore-import`, `explore-review`, and the batch operation.
7. Dry-run one authoritative source (TPWD or NPS); inspect ≥10 normalized records before going live.
8. Run one limited live source, batch-approve clean records, verify rows land in
   `explore_entities` + `explore_locations` + `explore_entity_sources` as public/verified.
9. Then process remaining authoritative sources sequentially: TPWD, NPS, USACE, USFS, THC, USGS,
   TWDB, NOAA. OSM/county/municipal/tourism only after dedup is proven.
10. Dedup on normalized name + external ID + coordinate proximity + official URL + source authority
    + entity type. Prefer the authoritative source; use aliases/relationships/provenance rather than
    duplicate destination pages. Never merge on name similarity alone.
11. Rebuild `explore_search_index`, refresh category and entity relationships, verify aliases and
    anon read policies.

## Handoff back to TexasDefined

Once at least one non-fixture destination is public + verified in `explore_entities`, tell me the
slug. I will then, in this project:

- confirm `VITE_TEXASDEFINED_SUPABASE_URL` / `VITE_TEXASDEFINED_SUPABASE_ANON_KEY` still point at
  `qhwwmdszjgkscqxgmenf`
- prove remote records are used instead of the 25-item fixture catalog (fixtures stay as outage
  fallback only)
- verify the slug renders at `/destination/[slug]`, its `/explore/[category]` page, `/search`,
  `/explore/search`, `/api/ai/entities`, `/api/knowledge-graph`, `/sitemap.xml`,
  `/sitemap-explore.xml`
- run `npm run data` and `npm run build`, run the catalog audit, and publish
