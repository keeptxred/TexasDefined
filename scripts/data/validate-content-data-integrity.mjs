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
  'let remoteFailed = false',
  'remoteFailed = true',
  'remoteDestinations.length ? remoteDestinations : fixtureDestinations',
  'if (remoteFailed && destinations.length === 0)',
  'status: 503',
  '"Retry-After": "300"',
  'isCanonicalDestinationSlug',
  '.filter((item) => item.slug && isCanonicalDestinationSlug(item.slug))',
]) {
  if (!exploreSitemap.includes(feature)) errors.push(`Explore sitemap fallback feature missing: ${feature}.`);
}

if (errors.length) {
  console.error('Content data integrity validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Event freshness and canonical Explore sitemap fallback validation passed.');