import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const remote = fs.readFileSync(path.join(root, 'src/data/explore-remote.ts'), 'utf8');
const core = fs.readFileSync(path.join(root, 'src/data/explore-core-remote.ts'), 'utf8');
const queries = fs.readFileSync(path.join(root, 'src/data/queries.ts'), 'utf8');
const destinationRuntime = fs.readFileSync(path.join(root, 'src/data/destination-query-runtime.ts'), 'utf8');
const searchImplementation = `${queries}\n${destinationRuntime}`;
const route = fs.readFileSync(path.join(root, 'src/routes/destination.$slug.tsx'), 'utf8');
const planner = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationVisitPlanner.tsx'), 'utf8');
const relationships = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationRelationships.tsx'), 'utf8');
const relationshipEngine = fs.readFileSync(path.join(root, 'src/data/destination-relationships.ts'), 'utf8');
const graph = fs.readFileSync(path.join(root, 'src/data/knowledge-graph/explore-adapter.ts'), 'utf8');
const ai = fs.readFileSync(path.join(root, 'src/routes/api.ai.entities.ts'), 'utf8');
const llms = fs.readFileSync(path.join(root, 'src/routes/llms[.]txt.ts'), 'utf8');
const exploreSearchShell = fs.readFileSync(path.join(root, 'src/routes/explore.search.tsx'), 'utf8');
const exploreSearchLazy = fs.readFileSync(path.join(root, 'src/routes/explore.search.lazy.tsx'), 'utf8');
const exploreSearch = `${exploreSearchShell}\n${exploreSearchLazy}`;
const sitemap = fs.readFileSync(path.join(root, 'src/routes/sitemap-explore[.]xml.ts'), 'utf8');
const primarySitemap = fs.readFileSync(path.join(root, 'src/routes/sitemap[.]xml.ts'), 'utf8');
const types = fs.readFileSync(path.join(root, 'src/data/types.ts'), 'utf8');
const errors = [];

for (const feature of [
  'explore_park_profiles(', 'explore_lake_profiles(', 'explore_entity_activities(',
  'explore_entity_amenities(', 'explore_entity_media(', 'explore_entity_sources(',
  'bestSeasonFromActivities', 'parkEntryNote', 'generatedSummary', 'profileHighlights',
  'sourceDetails', 'media.external_url', 'media.credit_text', 'reservations_url',
  'entrance_fee_cents', 'accessibility_notes', 'officialUrl: source.officialUrl',
  'sourceCheckedAt: source.sourceCheckedAt', 'reservationUrl:', 'address:',
  'directions:', 'accessibilityNotes:',
]) if (!remote.includes(feature)) errors.push(`Remote Explore enrichment feature missing: ${feature}`);

for (const feature of [
  'Official visitor information', 'Reservations', 'Visitor information checked', 'Official source',
  'destination.hero.credit', 'citation: destination.officialUrl',
  'sameAs: destination.officialUrl', 'dateModified: destination.sourceCheckedAt',
  'provider: { "@type": "Organization"',
  'destinationsQuery({ limit: 5000 })',
  'buildDestinationRelationshipGroups(destination, catalog)',
  'relationshipGroups',
  'DestinationRelationships',
  'destination.accessibilityNotes', 'destination.directions', 'destination.address',
  'destination.county', 'DestinationVisitPlanner',
]) if (!route.includes(feature)) errors.push(`Destination authority, discovery, or planning feature missing: ${feature}`);

for (const feature of [
  'const activityPattern', 'const facilityPattern', 'function unique(values: string[])',
  'const activities = unique(', 'const facilities = unique(', 'const otherHighlights = unique(',
  'const practicalTips = unique([', 'destination.highlights', 'destination.bestSeason',
  'destination.entryNote', 'destination.reservationUrl', 'destination.accessibilityNotes',
  'destination.directions', 'Conditions, closures, fees and availability can change',
  'aria-labelledby="plan-your-visit"',
  '{ title: "Things to do", items: activities }',
  '{ title: "What you’ll find", items: facilities }',
  '{ title: "Don’t miss", items: otherHighlights }',
  '{ title: "Good to know", items: practicalTips }',
  'groups.map((group, index)', 'group.items.map((item)',
]) if (!planner.includes(feature)) errors.push(`Destination Phase 1 planning feature missing: ${feature}`);

for (const feature of [
  'groups.length ? <>', 'TexasExplainedContextLinks surface="destination"', 'groups.map((group)',
  'href={`#relationship-${group.id}`}', 'id={`relationship-${group.id}`}',
  'group.destinations.map', 'to="/explore/$category"', 'to="/explore/region/$region"',
  'to="/events"', 'to="/search"',
]) if (!relationships.includes(feature)) errors.push(`Destination relationship discovery feature missing: ${feature}`);
if (relationships.includes('if (!groups.length) return null')) errors.push('Destination relationship discovery must keep the Texas Explained fallback when no relationship groups are available.');

for (const feature of [
  'miles <= 75', 'COMPLEMENTARY_CATEGORIES', 'sameTown', 'nearbyComplementary',
  'similar', 'regional', 'const used = new Set<string>()',
  'item.slug !== destination.slug',
]) if (!relationshipEngine.includes(feature)) errors.push(`Destination relationship engine feature missing: ${feature}`);

for (const feature of [
  'managingAuthority?: string', 'officialUrl?: string', 'sourceCheckedAt?: string',
  'reservationUrl?: string', 'county?: string', 'address?: string',
  'directions?: string', 'accessibilityNotes?: string',
]) if (!types.includes(feature)) errors.push(`Destination authority type missing: ${feature}`);

for (const feature of [
  'fetchCoreExploreDestinations', 'fetchCoreExploreDestination',
  'explore_public_entities',
  'MAX_REMOTE_DESTINATIONS', 'DESTINATION_FALLBACK_IMAGE',
]) if (!core.includes(feature)) errors.push(`Core remote fallback feature missing: ${feature}`);

for (const feature of [
  'explore_locations(city,county,latitude,longitude)',
  'explore_entity_sources(source_url,retrieved_at,verified_at)',
  'explore_entity_activities(explore_activities(key,name))',
  'explore_entity_amenities(explore_amenities(key,name))',
  'location.latitude', 'source.source_url', 'activityNames', 'amenityNames',
  'visibility: \'eq.public\'', 'status: \'in.(published,verified)\'',
]) if (!graph.includes(feature)) errors.push(`Knowledge graph enrichment feature missing: ${feature}`);

for (const feature of [
  'destinationSearchDocument',
  'fetchExploreDestinations({ limit: 5000 })',
  'fetchCoreExploreDestinations({ limit: 5000 })',
  'base.filter((document) => document.kind !== "destination")',
  'destination.managingAuthority', 'destination.bestSeason', '...destination.highlights',
]) if (!searchImplementation.includes(feature)) errors.push(`Remote destination search feature missing: ${feature}`);
if (!queries.includes('await import("./destination-query-runtime")')) errors.push('Destination resolution must remain behind the dynamic runtime boundary.');

for (const feature of [
  'createFileRoute("/explore/search")', 'createLazyFileRoute("/explore/search")', 'component: ExploreSearchPage', 'destinationsQuery({ limit: 5000 })', 'scoreDestination', 'searchText',
  'destination.county', 'destination.managingAuthority', 'destination.bestSeason', '...destination.highlights',
  'terms.every((term) => haystack.includes(term))', 'right.score - left.score',
  'const text = z.string().optional().catch("")', 'q: text, category: text, region: text, season: text, accessible: text',
  'const { q, category, region, season, accessible } = Route.useSearch()', 'const wantedSeason = normalized(season)',
  '!category || destination.category === category', '!region || destination.region === region',
  'normalized(destination.bestSeason).includes(wantedSeason)', 'accessible !== "1" || Boolean(destination.accessibilityNotes)',
  'new Set(catalog.map((destination) => destination.category))', 'new Set(catalog.map((destination) => destination.region))',
  'name="region"', 'name="category"', 'name="season"', 'name="accessible"',
  'Accessibility info available', 'Search by destination, town, county, landscape, activity or the kind of day you want to plan',
]) if (!exploreSearch.includes(feature)) errors.push(`Explore search ranking or filter feature missing: ${feature}`);
if (exploreSearch.includes('fetchExploreDestinations({ query: q')) errors.push('Explore search bypasses the resilient destination query and core remote fallback.');
if (exploreSearch.includes('dogFriendly') || exploreSearch.includes('kidFriendly')) errors.push('Explore search must not expose unsupported pet/family filters.');

for (const feature of [
  'keywords: entity.tags', 'measurementTechnique: entity.sourceConfidence',
  'dateModified: entity.sourceCheckedAt', 'additionalType: entity.kind',
  "entity.tags?.length ? entity.tags : undefined",
]) if (!ai.includes(feature)) errors.push(`AI destination enrichment feature missing: ${feature}`);

for (const feature of [
  'state-park:dinosaur-valley-state-park',
  '/destination/dinosaur-valley-state-park',
  'Missing fields are omitted rather than inferred',
  'Prefer fields backed by official source URLs and source-check dates',
  'Local fixtures are outage-only fallback records',
  'Do not infer hours, fees, access, reservations, accessibility, activities or amenities',
]) if (!llms.includes(feature)) errors.push(`AI discovery guidance missing: ${feature}`);
if (llms.includes('id=lake:caddo-lake')) errors.push('AI discovery guidance still uses the fixture-era Caddo Lake entity example.');

for (const feature of [
  'fetchExploreDestinations({ limit: 5000 })',
  'fetchCoreExploreDestinations({ limit: 5000 })',
  'const remoteConfigured = hasExploreRemoteData()',
  'let enrichedFailed = !remoteConfigured',
  'let coreFailed = !remoteConfigured',
  'if (remoteConfigured)',
  'const remoteDestinations = mergeDestinationSources(coreDestinations, enrichedDestinations)',
  'const usePreservedFallback = (enrichedFailed && coreFailed) || remoteDestinations.length === 0',
  'const rawDestinations = usePreservedFallback ? preservedExploreDestinations : remoteDestinations',
  'const destinations = resolveDestinationCatalog(rawDestinations)',
  'validLastModified', '<lastmod>', 'item.sourceCheckedAt',
  'isPrimaryTripPlannerDestination(destination)',
  'auditDestination(destination).readyForIndexing',
]) if (!sitemap.includes(feature)) errors.push(`Explore sitemap enrichment or quality feature missing: ${feature}`);
if (sitemap.includes('const destinations = remoteFailed ? fixtureDestinations : remoteDestinations')) {
  errors.push('Explore sitemap still uses the obsolete single-source outage fallback.');
}

for (const feature of [
  'isExploreSitemapOwnedPath',
  '.filter((path) => !isExploreSitemapOwnedPath(path))',
]) if (!primarySitemap.includes(feature)) errors.push(`Primary sitemap crawl partition feature missing: ${feature}`);
for (const forbiddenFeature of [
  'fetchExploreDestinations',
  'fetchCoreExploreDestinations',
  'Primary sitemap enrichment unavailable; retrying core remote catalog',
  'lastmod: toDate(destination.sourceCheckedAt)',
]) if (primarySitemap.includes(forbiddenFeature)) errors.push(`Primary sitemap must not own Explore destination work: ${forbiddenFeature}`);

const enrichedListIndex = destinationRuntime.indexOf('fetchExploreDestinations(options)');
const coreListIndex = destinationRuntime.indexOf('fetchCoreExploreDestinations(options)');
const fixtureListIndex = destinationRuntime.indexOf('platform.destinations.list');
if (!(enrichedListIndex >= 0 && coreListIndex > enrichedListIndex && fixtureListIndex > coreListIndex)) errors.push('Destination list fallback order must be enriched remote → core remote → fixtures.');

const enrichedDetailIndex = destinationRuntime.indexOf('fetchExploreDestination(slug)');
const coreDetailIndex = destinationRuntime.indexOf('fetchCoreExploreDestination(slug)');
const fixtureDetailIndex = destinationRuntime.indexOf('platform.destinations.getBySlug');
if (!(enrichedDetailIndex >= 0 && coreDetailIndex > enrichedDetailIndex && fixtureDetailIndex > coreDetailIndex)) errors.push('Destination detail fallback order must be enriched remote → core remote → fixture.');

if (!remote.includes('visibility: "eq.public"') || !remote.includes('status: "in.(published,verified)"')) errors.push('Enriched remote Explore publication filters are missing.');
if (route.includes('destinationsQuery({ category: destination.category, limit: 16 })')) errors.push('Destination profile enrichment regressed to a duplicate same-category recommendation query.');

if (errors.length) {
  console.error('Explore profile enrichment validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore enrichment, grouped planning, ranked structured lazy Search, AI discovery, unavailable-or-empty remote fallback with quality-gated sitemap freshness, authority, relationship discovery with Texas Explained fallback, public-view fallback, lazy destination runtime, and preserved-catalog resilience passed.');
