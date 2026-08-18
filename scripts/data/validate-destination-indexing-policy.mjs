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
  'robots: indexable ? undefined : "noindex, follow"',
]) {
  if (!route.includes(marker)) failures.push(`Destination route indexing contract missing: ${marker}`);
}

if (route.includes('...(!indexable ? [{ name: "robots", content: "noindex, follow" }] : [])')) {
  failures.push('Destination route must not append a second robots meta after buildMeta; pass robots into buildMeta so index/noindex signals cannot conflict.');
}

for (const marker of [
  'function mergeDestinationSources',
  'const remoteDestinations = mergeDestinationSources(coreDestinations, enrichedDestinations)',
  'const remoteConfigured = hasExploreRemoteData()',
  'let enrichedFailed = !remoteConfigured',
  'let coreFailed = !remoteConfigured',
  'if (remoteConfigured)',
  'const useFixtureFallback = (enrichedFailed && coreFailed) || remoteDestinations.length === 0',
  'const rawDestinations = useFixtureFallback ? fixtureDestinations : remoteDestinations',
  'function resolveDestinationCatalog',
  'applyStateParkHeroAssets(destinations)',
  'applyExploreHeroAssets(',
  'reconcileDestinationHeroes(',
  'applyAllCuratedDestinations(',
  'improveDestinationCatalog(',
  'const destinations = resolveDestinationCatalog(rawDestinations)',
  '.filter((destination) => isPrimaryTripPlannerDestination(destination) && auditDestination(destination).readyForIndexing)',
  'entry(`/destination/${item.slug}`',
]) {
  if (!sitemap.includes(marker)) failures.push(`Explore sitemap resolved-catalog/indexing contract missing: ${marker}`);
}

for (const marker of [
  'summary.length < 90',
  'destination.body.length < 3 || bodyText.length < 450 || uniqueBody.size < 3',
  'code: "generic-fallback-copy"',
  'code: "hero-placeholder"',
  'code: "coordinates"',
  'const SOURCE_MAX_AGE_DAYS = 730',
  'function sourceReviewIsFresh(value?: string)',
  'code: "official-source", severity: "error"',
  'destination-specific HTTPS official visitor-information source before indexing',
  'code: "source-freshness", severity: "error"',
  'sourceReviewIsFresh(destination.sourceCheckedAt)',
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
  'reconcileDestinationHeroes(applyExploreHeroAssets(applyStateParkHeroAssets(destinations)))',
]) {
  if (!queries.includes(marker)) failures.push(`Destination query publication/resolution contract missing: ${marker}`);
}

if (route.includes('const indexable = isPrimaryTripPlannerDestination(destination);')) {
  failures.push('Destination route must not index a primary destination without passing the substantive readiness audit.');
}
if (sitemap.includes('.filter(isPrimaryTripPlannerDestination)')) {
  failures.push('Explore sitemap must not publish primary destinations without also applying auditDestination readiness.');
}
if (sitemap.includes('const destinations = remoteFailed ? fixtureDestinations : remoteDestinations;')) {
  failures.push('Explore sitemap must not audit raw remote destination records before source merging, curation, hero reconciliation and quality improvement.');
}

if (failures.length) {
  console.error('Destination indexing policy validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Destination indexing policy passed: route metadata emits one consistent robots policy; Explore sitemap merges remote sources, falls back to curated fixtures when remote data is unavailable or empty, resolves curation/heroes/quality before indexing, and preserves the same primary/readiness gate; query publication uses the same resolution concepts; duplicate units stay consolidated; substantive-copy, hero, coordinate, official-source and source-freshness gates remain aligned.');
