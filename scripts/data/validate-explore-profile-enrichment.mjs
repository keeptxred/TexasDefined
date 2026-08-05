import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const remote = fs.readFileSync(path.join(root, 'src/data/explore-remote.ts'), 'utf8');
const core = fs.readFileSync(path.join(root, 'src/data/explore-core-remote.ts'), 'utf8');
const queries = fs.readFileSync(path.join(root, 'src/data/queries.ts'), 'utf8');
const route = fs.readFileSync(path.join(root, 'src/routes/destination.$slug.tsx'), 'utf8');
const planner = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationVisitPlanner.tsx'), 'utf8');
const graph = fs.readFileSync(path.join(root, 'src/data/knowledge-graph/explore-adapter.ts'), 'utf8');
const ai = fs.readFileSync(path.join(root, 'src/routes/api.ai.entities.ts'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'src/routes/sitemap-explore[.]xml.ts'), 'utf8');
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
  'destinationsQuery({ category: destination.category, limit: 16 })',
  'relatedDestinations', 'Where to point the car next', 'destination.accessibilityNotes',
  'destination.directions', 'destination.address', 'destination.county',
  'DestinationVisitPlanner',
]) if (!route.includes(feature)) errors.push(`Destination authority, discovery, or planning feature missing: ${feature}`);

for (const feature of [
  'Plan your visit', 'What the current source data says', 'Activities',
  'Facilities and amenities', 'Before you leave', 'destination.highlights',
  'destination.bestSeason', 'destination.entryNote', 'destination.reservationUrl',
  'destination.accessibilityNotes', 'destination.directions',
  'Confirm changing conditions, closures, fees, and availability before traveling',
]) if (!planner.includes(feature)) errors.push(`Destination Phase 1 planning feature missing: ${feature}`);

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
  'keywords: entity.tags', 'measurementTechnique: entity.sourceConfidence',
  'dateModified: entity.sourceCheckedAt', 'additionalType: entity.kind',
  "entity.tags?.length ? entity.tags : undefined",
]) if (!ai.includes(feature)) errors.push(`AI destination enrichment feature missing: ${feature}`);

for (const feature of [
  'fetchCoreExploreDestinations',
  'Explore sitemap enrichment unavailable; retrying core remote catalog',
  'validLastModified', '<lastmod>', 'item.sourceCheckedAt',
]) if (!sitemap.includes(feature)) errors.push(`Explore sitemap enrichment feature missing: ${feature}`);

const enrichedListIndex = queries.indexOf('fetchExploreDestinations(options)');
const coreListIndex = queries.indexOf('fetchCoreExploreDestinations(options)');
const fixtureListIndex = queries.indexOf('platform.destinations.list');
if (!(enrichedListIndex >= 0 && coreListIndex > enrichedListIndex && fixtureListIndex > coreListIndex)) errors.push('Destination list fallback order must be enriched remote → core remote → fixtures.');

const enrichedDetailIndex = queries.indexOf('fetchExploreDestination(slug)');
const coreDetailIndex = queries.indexOf('fetchCoreExploreDestination(slug)');
const fixtureDetailIndex = queries.indexOf('platform.destinations.getBySlug');
if (!(enrichedDetailIndex >= 0 && coreDetailIndex > enrichedDetailIndex && fixtureDetailIndex > coreDetailIndex)) errors.push('Destination detail fallback order must be enriched remote → core remote → fixture.');

if (!remote.includes('visibility: "eq.public"') || !remote.includes('status: "in.(published,verified)"')) errors.push('Enriched remote Explore publication filters are missing.');

if (errors.length) {
  console.error('Explore profile enrichment validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore Phase 1 enrichment, planning, search, AI, sitemap freshness, authority, access, discovery, and two-stage remote fallback validation passed.');
