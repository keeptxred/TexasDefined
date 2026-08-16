import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const repositories = fs.readFileSync(path.join(root, 'src/data/fixtures/repositories.ts'), 'utf8');
const exploreSitemap = fs.readFileSync(path.join(root, 'src/routes/sitemap-explore[.]xml.ts'), 'utf8');
const errors = [];

for (const feature of [
  'const currentEvents',
  'event.endDate >= today()',
  'currentEvents(byBrand(events, query.brandId))',
  'currentEvents(byBrand(events, scope.brandId))',
]) {
  if (!repositories.includes(feature)) errors.push(`Event data integrity feature missing: ${feature}.`);
}

for (const feature of [
  'destinations as fixtureDestinations',
  'fetchExploreDestinations({ limit: 5000 })',
  'fetchCoreExploreDestinations({ limit: 5000 })',
  'const remoteConfigured = hasExploreRemoteData()',
  'let enrichedFailed = !remoteConfigured',
  'let coreFailed = !remoteConfigured',
  'if (remoteConfigured)',
  'const bothRemoteSourcesUnavailable = enrichedFailed && coreFailed',
  '? fixtureDestinations',
  ': mergeDestinationSources(coreDestinations, enrichedDestinations)',
  'if (rawDestinations.length === 0)',
  'status: 503',
  '"Retry-After": "300"',
  'const destinations = resolveDestinationCatalog(rawDestinations)',
  'new Map(destinations.filter((item) => item.slug)',
  'isPrimaryTripPlannerDestination(destination)',
  'auditDestination(destination).readyForIndexing',
]) {
  if (!exploreSitemap.includes(feature)) errors.push(`Explore sitemap fallback or quality feature missing: ${feature}.`);
}
if (exploreSitemap.includes('remoteDestinations.length ? remoteDestinations : fixtureDestinations')) {
  errors.push('Explore sitemap must not treat a healthy empty remote catalog as an outage.');
}
if (exploreSitemap.includes('const destinations = remoteFailed ? fixtureDestinations : remoteDestinations')) {
  errors.push('Explore sitemap must not use the obsolete single-source outage fallback.');
}

if (errors.length) {
  console.error('Content data integrity validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Event freshness and Explore sitemap remote-configuration-aware dual-source outage fallback, resolved-catalog and quality-gate validation passed.');
