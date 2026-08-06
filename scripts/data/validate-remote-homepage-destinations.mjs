import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const queries = fs.readFileSync(path.join(root, 'src/data/queries.ts'), 'utf8');
const homepage = fs.readFileSync(path.join(root, 'src/routes/index.tsx'), 'utf8');
const errors = [];

for (const feature of [
  'function featuredFallback(destinations: Destination[], limit = 6)',
  'if (params.featured)',
  'fetchExploreDestinations({ category: params.category, limit: 5000 })',
  'fetchCoreExploreDestinations({ category: params.category, limit: 5000 })',
  'if (enrichedFailed && coreFailed) return platform.destinations.list',
  'if (enrichedFailed && coreFailed) return platform.destinations.getBySlug',
  'return null;',
]) {
  if (!queries.includes(feature)) errors.push(`Remote destination fallback feature missing: ${feature}`);
}

if (!queries.includes('return [];')) errors.push('Healthy remote queries with no matches must return an empty list instead of fixtures.');

for (const feature of [
  'const homepageDestinations = destinations.some((item) => item.featured)',
  'destinations.filter((item) => item.featured).slice(0, 4)',
  'destinations.slice(0, 4)',
  'sameAs: destination.officialUrl',
  'dateModified: destination.sourceCheckedAt',
  'provider: destination.managingAuthority',
  'const explicitlyFeatured = destinations.filter((item) => item.featured)',
  '(explicitlyFeatured.length ? explicitlyFeatured : destinations).slice(0, 4)',
  'const featuredIds = new Set',
  'featuredDestinations.length > 0',
]) {
  if (!homepage.includes(feature)) errors.push(`Remote-backed homepage feature missing: ${feature}`);
}

if (homepage.includes('const featuredDestinations = destinations.filter((item) => item.featured).slice(0, 4)')) {
  errors.push('Homepage can still go blank when remote imports have no editorial featured flags.');
}

if (errors.length) {
  console.error('Remote homepage destination validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Remote-backed homepage picks and true-outage-only destination fixture validation passed.');
