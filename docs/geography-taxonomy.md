# TexasDefined canonical geography taxonomy

## Purpose

TexasDefined has two legitimate geographic needs that must not be conflated:

1. a durable internal geography backbone for cities, counties, metros, relocation, destinations and future entity relationships; and
2. stable public travel-discovery regions already used by `/explore/region/:id`, articles, destinations and events.

Phase 1 establishes one canonical internal hierarchy while preserving every existing public travel-region identifier and URL.

## Canonical hierarchy

Use this relationship order for new structured geography:

**Texas → Primary Region → Subregion → Metro → City/Town → County → Local destination/entity**

The hierarchy describes ownership and navigation, not a claim that every place fits cleanly inside a single cultural label. Boundary nuance belongs in explicit adjacency, gateway and presentation relationships.

## Seven canonical primary regions

Only these seven IDs may be used as `primaryRegionId` values:

| ID | Canonical name |
| --- | --- |
| `north-texas` | North Texas |
| `central-texas` | Central Texas |
| `east-texas` | East Texas |
| `south-texas` | South Texas |
| `west-texas` | West Texas |
| `gulf-coast` | Gulf Coast |
| `panhandle` | Panhandle |

The runtime allowlist, definitions, aliases, subregions, adjacency graph and crosswalks live in `src/data/canonical-geography.ts`. Shared identifiers and assignment interfaces live in `src/data/types.ts`.

## Presentation layers are not competing taxonomies

### Existing Explore/travel regions

The existing `TexasRegion` IDs remain route- and content-stable:

- `big-bend`
- `gulf-coast`
- `hill-country`
- `panhandle`
- `piney-woods`
- `prairies-lakes`
- `south-texas`

They continue to power existing Explore URLs such as `/explore/region/hill-country`. They are now explicitly treated as a travel-discovery presentation layer and are cross-walked from canonical primary regions through `travelRegionIds`.

Do not rename, delete, reinterpret or recycle these IDs in order to match the canonical backbone.

### Relocation presentation labels

Relocation surfaces may present these reader-friendly labels without creating additional primary-region IDs:

- Dallas–Fort Worth & North Texas
- Austin & Central Texas
- San Antonio & Hill Country
- Houston & Gulf Coast
- South Texas & Rio Grande Valley
- East Texas
- West Texas & Panhandle

A presentation label may intentionally span more than one canonical primary region. That is a display relationship, not multiple primary ownership.

## Boundary-city rules

### Austin

Austin is modeled as:

- primary region: `central-texas`
- primary subregion: `austin-area`
- metro: `austin`
- county: `travis`
- gateway subregion: `texas-hill-country`
- travel presentation: `hill-country`
- relocation presentation: Austin & Central Texas

Hill Country is gateway/travel context for Austin, not a second broad primary region.

### San Antonio

San Antonio is modeled as:

- primary region: `south-texas`
- primary subregion: `san-antonio-area`
- metro: `san-antonio`
- county: `bexar`
- adjacent broad region: `central-texas`
- gateway subregion: `texas-hill-country`
- travel presentations: `hill-country`, `south-texas`
- relocation presentation: San Antonio & Hill Country

This explicitly preserves the city's Hill Country gateway identity while keeping one canonical broad primary region.

## Authoring rules

1. Never invent or freehand a new broad `primaryRegionId`. Use `CanonicalPrimaryRegionId` and `assertCanonicalPrimaryRegionId` for external/runtime strings.
2. Every structured place gets one broad primary region. Do not solve boundary ambiguity by assigning two primary regions.
3. Use `gatewaySubregionIds` for places culturally or geographically associated with a neighboring subregion.
4. Use `adjacentRegionIds` for broad-region boundary context.
5. Use aliases for matching and editorial display only; aliases do not create new taxonomy nodes.
6. Use `metroId` only for the metro/market relationship. A metro must belong to the same broad primary region as the entity's primary assignment.
7. Store counties as stable slugs in `countySlugs`. County display names belong to county data, not the taxonomy key.
8. Keep legacy `TexasRegion` fields and Explore URLs intact until a separately planned route/content migration explicitly replaces them.
9. New articles, destinations and events may add the optional typed `geography` relationship while retaining their existing `region` value for backward compatibility.
10. Any new primary region, subregion or metro requires a same-change update to types, registry definitions, crosswalks, documentation and integrity tests.

## Validation and CI

`src/data/__tests__/canonical-geography.test.ts` verifies:

- the exact seven canonical broad IDs;
- internal relationship integrity;
- rejection of arbitrary broad-region strings;
- preservation of all seven existing Explore URLs;
- Austin's boundary rule; and
- San Antonio's boundary rule.

The protected-branch Required merge gate executes the test with Node's TypeScript stripping support before the full validation/build pipeline.

## Phase 1 migration policy

Phase 1 is additive by design. It does not rewrite existing article, event or destination `region` values and does not change any public URL. Existing content can be progressively enriched with `geography` relationships in later phases after entity-level assignments are audited.
