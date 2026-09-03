# TexasDefined Geography Knowledge Graph — Phase 2

Phase 2 populates the canonical geography backbone established in Phase 1. It does not create new public region routes and does not replace the stable Explore/Travel region taxonomy.

## Resolution order

Existing content is connected to canonical geography in this order:

1. an explicit `geography` assignment already stored on the record;
2. an explicit city/town match from the place registry;
3. an explicit county match or county-series slug/tag inference;
4. the stable legacy Travel/Explore region crosswalk as a broad fallback.

This order prevents a broad tourism label from overriding more precise city, metro, county or subregion knowledge.

## Canonical broad regions

The seven Phase 1 primary regions remain unchanged:

- North Texas
- Central Texas
- East Texas
- South Texas
- West Texas
- Gulf Coast
- Panhandle

Every locally scoped record resolves to one primary region. Overlaps are represented through subregions, gateways, adjacency and presentation labels rather than multiple competing primary regions.

## Phase 2 subregions

The typed subregion registry now includes the important discovery areas needed by relocation and travel, including:

- Dallas–Fort Worth Metroplex
- North Texas Prairies
- Cross Timbers
- Texoma
- Austin Area
- Texas Hill Country
- Central Texas Prairies
- Brazos Valley
- Piney Woods
- Upper East Texas / Northeast Texas
- Deep East Texas
- San Antonio Area
- Rio Grande Valley
- South Texas Brush Country
- Big Bend
- Trans-Pecos / Far West Texas
- Permian Basin
- Houston Area
- Upper Gulf Coast
- Golden Triangle
- Coastal Bend
- Texas Panhandle
- South Plains

`Northeast Texas` remains an alias of Upper East Texas, and `Far West Texas` remains an alias of Trans-Pecos, avoiding duplicate geographic entities for synonymous concepts.

## Place and county population

`src/data/geography-knowledge-graph.ts` is the central Phase 2 registry and resolver. It contains explicit assignments for the state's major relocation, travel and discovery anchors and builds county relationships from those assignments. County-series content additionally retains its county identity through slug/tag inference even when a county does not yet need a hand-authored override.

Explicit overrides are used where a broad legacy travel region would otherwise lose important context, including the Permian Basin, Big Bend/Trans-Pecos counties, Brazos Valley, Texoma, Cross Timbers and Golden Triangle.

## Existing content connections

The resolver supports the existing content types directly:

- `withCanonicalArticleGeography(article)`
- `withCanonicalDestinationGeography(destination)`
- `withCanonicalEventGeography(event)`
- `resolveTexasGeography(...)`

These functions are the canonical enrichment path for fixture-backed and remote records as the application surfaces adopt the graph. They preserve every existing public URL and every legacy `TexasRegion` value.

## Orphan auditing

`auditGeographyCoverage(...)` reports unresolved locally scoped articles, destinations and events. Statewide editorial content is not treated as an orphan merely because it has no single region.

The graph also validates:

- unique city assignments;
- valid primary-region ownership;
- valid primary and gateway subregions;
- complete fallback coverage for all seven legacy Travel/Explore regions.

CI runs both the Phase 1 canonical taxonomy test and the Phase 2 knowledge-graph test before the production build can merge.

## Authoring rule

Do not invent a new primary region or free-text subregion in a content record. Add a typed subregion or alias to the governed registries when a real discovery concept is missing. Use gateway/adjacency relationships for transition areas rather than assigning a second primary region.

## Phase boundary

Phase 2 is data architecture and population. Region landing pages, comparison UI, Explore filters and Trip Planner presentation belong to later phases and must consume this graph rather than introduce another geography model.
