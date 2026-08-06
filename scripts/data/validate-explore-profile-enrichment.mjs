import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const remote = fs.readFileSync(path.join(root, 'src/data/explore-remote.ts'), 'utf8');
const core = fs.readFileSync(path.join(root, 'src/data/explore-core-remote.ts'), 'utf8');
const queries = fs.readFileSync(path.join(root, 'src/data/queries.ts'), 'utf8');
const route = fs.readFileSync(path.join(root, 'src/routes/destination.$slug.tsx'), 'utf8');
const planner = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationVisitPlanner.tsx'), 'utf8');
const relationships = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationRelationships.tsx'), 'utf8');
const relationshipEngine = fs.readFileSync(path.join(root, 'src/data/destination-relationships.ts'), 'utf8');
const graph = fs.readFileSync(path.join(root, 'src/data/knowledge-graph/explore-adapter.ts'), 'utf8');
const ai = fs.readFileSync(path.join(root, 'src/routes/api.ai.entities.ts'), 'utf8');
const exploreSearch = fs.readFileSync(path.join(root, 'src/routes/explore.search.tsx'), 'utf8');
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
  'Visit official source', 'Official visitor information', 'Check reservations',
  'Source checked', 'destination.hero.credit', 'citation: destination.officialUrl',
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
  'aria-labelledby="plan-your-visit"', 'activities.map', 'facilities.map',
  'otherHighlights.map', 'practicalTips.map',
]) if (!planner.includes(feature)) errors.push(`Destination Phase 1 planning feature missing: ${feature}`);

for (const feature of [
  'if (!groups.length) return null', 'groups.map((group)',
  'href={`#relationship-${group.id}`}', 'id={`relationship-${group.id}`}',
  'group.destinations.map', 'to="/explore/$category"', 'to="/explore/region/$region"',
  'to="/events"', 'to="/search"',
]) if (!relationships.includes(feature)) errors.push(`Destination relationship discovery feature missing: ${feature}`);

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
  'visibility: "eq.public"', 'status: "in.(published,verified)"',
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
]) if (!queries.includes(feature)) errors.push(`Remote destination search feature missing: ${feature}`);

for (const feature of [
  'destinationsQuery({ limit: 5000 })', 'scoreDestination', 'searchText',
  'destination.county', 'destination.managingAuthority', 'destination.bestSeason',
  '...destination.highlights', 'terms.every((term) => haystack.includes(term))',
  'right.score - left.score', 'Search by destination, town, county, activity, facility, managing agency or part of Texas',
]) if (!exploreSearch.includes(feature)) errors.push(`Explore search ranking feature missing: ${feature}`);
if (exploreSearch.includes('fetchExploreDestinations({ query: q')) errors.push('Explore search bypasses the resilient destination query and core remote fallback.');

for (const feature of [
  'keywords: entity.tags', 'measurementTechnique: entity.sourceConfidence',
  'dateModified: entity.sourceCheckedAt', 'additionalType: entity.kind',
  "entity.tags?.length ? entity.tags : undefined",
]) if (!ai.includes(feature)) errors.push(`AI destination enrichment feature missing: ${feature}`);

for (const feature of [
  'fetchCoreExploreDestinations',
  'validLastModified', '<lastmod>', 'item.sourceCheckedAt',
  'remoteDestinations.length ? remoteDestinations : fixtureDestinations',
]) if (!sitemap.includes(feature)) errors.push(`Explore sitemap enrichment feature missing: ${feature}`);

for (const feature of [
  'fetchCoreExploreDestinations',
  'Primary sitemap enrichment unavailable; retrying core remote catalog',
  'Primary sitemap core remote catalog unavailable; using outage fixtures',
  'lastmod: toDate(destination.sourceCheckedAt)',
  'remoteDestinations.length ? remoteDestinations : fixtureDestinations',
]) if (!primarySitemap.includes(feature)) errors.push(`Primary sitemap remote freshness feature missing: ${feature}`);

const enrichedListIndex = queries.indexOf('fetchExploreDestinations(options)');
const coreListIndex = queries.indexOf('fetchCoreExploreDestinations(options)');
const fixtureListIndex = queries.indexOf('platform.destinations.list');
if (!(enrichedListIndex >= 0 && coreListIndex > enrichedListIndex && fixtureListIndex > coreListIndex)) errors.push('Destination list fallback order must be enriched remote → core remote → fixtures.');

const enrichedDetailIndex = queries.indexOf('fetchExploreDestination(slug)');
const coreDetailIndex = queries.indexOf('fetchCoreExploreDestination(slug)');
const fixtureDetailIndex = queries.indexOf('platform.destinations.getBySlug');
if (!(enrichedDetailIndex >= 0 && coreDetailIndex > enrichedDetailIndex && fixtureDetailIndex > coreDetailIndex)) errors.push('Destination detail fallback order must be enriched remote → core remote → fixture.');

if (!remote.includes('visibility: "eq.public"') || !remote.includes('status: "in.(published,verified)"')) errors.push('Enriched remote Explore publication filters are missing.');
if (route.includes('destinationsQuery({ category: destination.category, limit: 16 })')) errors.push('Destination profile enrichment regressed to a duplicate same-category recommendation query.');

if (errors.length) {
  console.error('Explore profile enrichment validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore Phase 1 enrichment, planning, ranked search, AI, sitemap freshness, authority, access, relationship discovery, and two-stage remote fallback validation passed.');
