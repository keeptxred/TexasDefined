import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readRouteSurface = (file) => {
  const eagerSource = fs.readFileSync(path.join(root, file), 'utf8');
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  const lazyPath = path.join(root, lazyFile);
  return fs.existsSync(lazyPath) ? `${eagerSource}\n${fs.readFileSync(lazyPath, 'utf8')}` : eagerSource;
};
const queries = fs.readFileSync(path.join(root, 'src/data/queries.ts'), 'utf8');
const destinationRuntime = fs.readFileSync(path.join(root, 'src/data/destination-query-runtime.ts'), 'utf8');
const homepage = readRouteSurface('src/routes/index.tsx');
const errors = [];

for (const feature of [
  'function featuredFallback(destinations: Destination[], limit = 6)',
  'if (params.featured)',
  'fetchExploreDestinations({ category: params.category, limit: 5000 })',
  'fetchCoreExploreDestinations({ category: params.category, limit: 5000 })',
  'const local = await platform.destinations.list({ ...scope, ...params })',
  'const preserved = preservedFor(params)',
  'mergeDestinations(enriched, core, preserved, local)',
  'const preserved = preservedExploreDestinations.find((destination) => destination.slug === slug)',
  'const local = await platform.destinations.getBySlug(scope, slug)',
  'return local ? applyResolvedHero(local) : local',
]) {
  if (!destinationRuntime.includes(feature)) errors.push(`Remote destination fallback feature missing: ${feature}`);
}
if (!queries.includes('await import("./destination-query-runtime")')) {
  errors.push('Homepage destination queries must keep heavy destination resolution behind the dynamic runtime boundary.');
}

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

console.log('Remote-backed homepage picks, preserved/local catalog resilience, lazy destination runtime, and destination detail fallbacks passed across eager and lazy homepage route surfaces.');
