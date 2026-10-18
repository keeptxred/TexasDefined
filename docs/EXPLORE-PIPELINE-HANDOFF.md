# Explore Data Pipeline — Shared Backend Handoff

TexasDefined and KeepTXRed use the **same production Supabase project**:

`ftkznprjljkhymknvhye`

Do not create, connect, or migrate a second database for Explore work. Repository-specific code may live in either `keeptxred/TexasDefined` or `keeptxred/texas-heartland-hub`, but shared Explore data must remain in the existing production project above.

## Access model

- Public TexasDefined clients may read only data exposed through the existing anonymous/public RLS policies.
- Protected server-side workflows may use the existing service-role secret through GitHub/Cloudflare secret bindings only.
- Never place a service-role credential in source, client-side environment variables, logs, screenshots, issue bodies, or documentation.
- Do not infer current table counts from this handoff. Verify live state against the shared project before operational decisions.

## Contract TexasDefined depends on

For a destination to appear publicly on TexasDefined it must satisfy all of:

1. `explore_entities.visibility = 'public'`
2. `explore_entities.status IN ('published', 'verified')` — use `verified` for records confirmed directly from an authoritative source.
3. Anonymous `SELECT` access is limited by RLS to public published/verified records on the public Explore surface. **No anonymous writes.**
4. A non-null `slug`, `name`, and entity type key.
5. Coordinates belong in `explore_locations`, inside Texas bounds, never `0,0`.
6. Source/provenance and media-rights requirements remain intact.

Records left at `visibility = 'internal'` or a non-public review status must remain invisible to the public site.

## Entity-type keys TexasDefined understands

Keep `explore_entity_types` aligned with `src/data/explore-remote.ts` and the current knowledge-graph adapters. Existing/base keys include:

```
state_park  national_park  campground  historic_site  trail  lake  river
state  region  county  city  business  restaurant  hotel  event  agency
```

Additive keys should be introduced only when authoritative source data supports them and no equivalent canonical key already exists:

```
reservoir  spring  cavern  cave  beach  island  natural_area  wildlife_refuge
national_monument  national_preserve  national_seashore  museum  mission
battlefield  monument  scenic_drive  swimming_hole  waterfall  winery  brewery
```

Classification must be record-aware — source type, feature/facility type, designation, name, metadata, and authoritative category. Do not map an entire source to one generic type.

## Shared-backend operating rules

1. Refresh current `main` and production state before every material migration or import change.
2. Use only the shared Supabase project `ftkznprjljkhymknvhye`.
3. Prefer additive, idempotent migrations; never replay historical aggregate SQL over newer production behavior.
4. Preserve provenance, rollback/audit records, deduplication, RLS, source-quality checks, and publication safeguards.
5. Batch approval/import paths must remain service-role/admin-only; never grant anonymous writes.
6. Dry-run authoritative sources before live import; inspect normalized records before promotion.
7. Promote only clean authoritative records to public/verified.
8. Deduplicate on stable external ID, normalized name, coordinates, official URL, source authority, and entity type. Never merge on name similarity alone.
9. Keep search indexes, relationships, aliases, categories, and source timestamps synchronized after approved imports.
10. Verify live TexasDefined routes and sitemap discovery after deployment; a merge alone is not proof of production success.

## TexasDefined verification after Explore changes

For any newly public/verified destination, verify on the current production deployment:

- `/destination/[slug]`
- its Explore category/directory surface
- `/search`
- `/explore/search`
- applicable AI/knowledge-graph endpoints
- `/sitemap.xml`
- `/sitemap-explore.xml`

Also run the repository's current validation/build and any focused authority checks required by the changed surface.

## Database ownership reminder

The repository may contain historical notes or migrations from earlier architecture work. They do **not** authorize switching projects. The canonical production backend for both sites is `ftkznprjljkhymknvhye`; any future handoff that claims otherwise must be treated as stale until explicitly verified.
