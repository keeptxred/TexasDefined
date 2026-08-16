import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const route = read('src/routes/destination.$slug.tsx');
const sitemap = read('src/routes/sitemap-explore[.]xml.ts');
const audit = read('src/data/destination-audit.ts');
const availability = read('src/data/destination-availability.ts');
const queries = read('src/data/queries.ts');
const failures = [];

for (const marker of [
  'const audit = auditDestination(destination)',
  'const indexable = audit.readyForIndexing && isPrimaryTripPlannerDestination(destination)',
  '{ name: "robots", content: "noindex, follow" }',
]) {
  if (!route.includes(marker)) failures.push(`Destination route indexing contract missing: ${marker}`);
}

for (const marker of [
  '.filter((destination) => isPrimaryTripPlannerDestination(destination) && auditDestination(destination).readyForIndexing)',
  'entry(`/destination/${item.slug}`',
]) {
  if (!sitemap.includes(marker)) failures.push(`Explore sitemap indexing contract missing: ${marker}`);
}

for (const marker of [
  'summary.length < 90',
  'destination.body.length < 3 || bodyText.length < 450 || uniqueBody.size < 3',
  'code: "generic-fallback-copy"',
  'code: "hero-placeholder"',
  'code: "coordinates"',
  'readyForIndexing: errors === 0 && score >= 76',
]) {
  if (!audit.includes(marker)) failures.push(`Destination readiness gate missing: ${marker}`);
}

for (const marker of [
  'NON_PRIMARY_TRIP_PLANNER_SLUGS',
  'world-birding-center-bentsen-rio-grande-valley-state-park',
  'cooper-lake-doctors-creek-unit-state-park',
  'ray-roberts-lake-jordon-unit-state-park',
  'return isCurrentlyVisitableDestination(destination) && !NON_PRIMARY_TRIP_PLANNER_SLUGS.has(destination.slug)',
]) {
  if (!availability.includes(marker)) failures.push(`Destination primary/duplicate policy missing: ${marker}`);
}

for (const marker of [
  'filterSeoReadyDestinations(filterCurrentlyVisitableDestinations(improved))',
  'const destinations = reconcileExploreCatalog',
]) {
  if (!queries.includes(marker)) failures.push(`Destination query publication filter missing: ${marker}`);
}

if (route.includes('const indexable = isPrimaryTripPlannerDestination(destination);')) {
  failures.push('Destination route must not index a primary destination without passing the substantive readiness audit.');
}
if (sitemap.includes('.filter(isPrimaryTripPlannerDestination)')) {
  failures.push('Explore sitemap must not publish primary destinations without also applying auditDestination readiness.');
}

if (failures.length) {
  console.error('Destination indexing policy validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Destination indexing policy passed: route metadata, Explore sitemap, query publication, primary-destination consolidation, substantive-copy, hero and coordinate gates remain aligned.');
