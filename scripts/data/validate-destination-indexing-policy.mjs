import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const route = read('src/routes/destination.$slug.tsx');
const sitemap = read('src/routes/sitemap-explore[.]xml.ts');
const audit = read('src/data/destination-audit.ts');
const availability = read('src/data/destination-availability.ts');
const queries = read('src/data/queries.ts');
const destinationRuntime = read('src/data/destination-query-runtime.ts');
const curationAll = read('src/data/destination-curation-all.ts');
const waterCuration = read('src/data/destination-curation-batch45.ts');
const museumCuration = read('src/data/destination-curation-batch49.ts');
const batch52Curation = read('src/data/destination-curation-batch52.ts');
const coreFallbacks = read('src/data/destination-curation-batch53.ts');
const queryImplementation = `${queries}\n${destinationRuntime}`;
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
  'function sourceReviewIsFresh(value: string)',
  'code: "official-source", severity: "error"',
  'destination-specific HTTPS official visitor-information source before indexing',
  'code: "source-review-missing", severity: "warning"',
  'does not yet record when that source was reviewed',
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
  'return reconcileExploreCatalog(mergeDestinations(enriched, core, preservedExploreDestinations))',
  'reconcileDestinationHeroes(applyExploreHeroAssets(applyStateParkHeroAssets(destinations)))',
]) {
  if (!queryImplementation.includes(marker)) failures.push(`Destination query publication/resolution contract missing: ${marker}`);
}
if (!queries.includes('await import("./destination-query-runtime")')) {
  failures.push('Destination queries must keep heavy resolution behind the dynamic runtime boundary.');
}

for (const marker of [
  'import { applyCuratedDestinationBatch53 } from "./destination-curation-batch53"',
  'applyCuratedDestinationBatch53,',
]) {
  if (!curationAll.includes(marker)) failures.push(`Verified fallback destination curation wiring missing: ${marker}`);
}

const liveFallbackSlugs = [
  'enchanted-rock',
  'palo-duro-canyon',
  'blue-hole-wimberley',
  'big-bend-chisos-basin',
  'gruene-historic-district',
];
for (const slug of liveFallbackSlugs) {
  if (!coreFallbacks.includes(`"${slug}"`)) failures.push(`Verified live fallback curation missing destination: ${slug}`);
  if (!coreFallbacks.includes('const CHECKED')) failures.push(`Verified live fallback curation is missing an explicit review-date constant for ${slug}.`);
}

const reviewedWaterCurationSlugs = [
  'caddo-lake',
  'possums-kingdom-lake',
  'lake-travis',
  'lake-conroe',
  'toledo-bend-reservoir',
  'guadalupe-river',
];
for (const slug of reviewedWaterCurationSlugs) {
  if (!waterCuration.includes(`"${slug}"`)) failures.push(`Reviewed water curation missing destination key: ${slug}`);
}
for (const marker of ['const CHECKED', 'officialUrl:', 'sourceCheckedAt:CHECKED']) {
  if (!waterCuration.includes(marker)) failures.push(`Reviewed water curation provenance contract missing: ${marker}`);
}

const reviewedMuseumCurationSlugs = [
  'kimbell-art-museum',
  'museum-of-fine-arts-houston',
  'dallas-museum-of-art',
  'nasher-sculpture-center',
  'menil-collection',
  'rothko-chapel',
];
for (const slug of reviewedMuseumCurationSlugs) {
  if (!museumCuration.includes(`"${slug}"`)) failures.push(`Reviewed museum curation missing destination key: ${slug}`);
}
for (const marker of ['const CHECKED', 'officialUrl:', 'sourceCheckedAt:CHECKED']) {
  if (!museumCuration.includes(marker)) failures.push(`Reviewed museum curation provenance contract missing: ${marker}`);
}

const reviewedBatch52Slugs = [
  'fort-richardson-state-park-state-historic-site',
  'hancock-springs-park',
  'lipantitlan-state-historic-site',
];
for (const slug of reviewedBatch52Slugs) {
  if (!batch52Curation.includes(`"${slug}"`)) failures.push(`Reviewed batch 52 curation missing destination key: ${slug}`);
}
for (const marker of [
  'const CHECKED = "2026-08-19"',
  'sourceCheckedAt: CHECKED',
  'Texas Historical Commission',
  'https://thc.texas.gov/historic-sites/lipantitlan',
  'https://lampasas.org/367/Hancock-Springs-Park',
  'https://tpwd.texas.gov/state-parks/fort-richardson/',
]) {
  if (!batch52Curation.includes(marker)) failures.push(`Reviewed batch 52 provenance/current-authority contract missing: ${marker}`);
}
for (const marker of [
  'officialUrl:',
  'sourceCheckedAt: CHECKED',
  'Big Bend National Park remains open',
  'check the current NPS Chisos Basin access page',
]) {
  if (!coreFallbacks.includes(marker)) failures.push(`Core fallback provenance/current-conditions contract missing: ${marker}`);
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

console.log('Destination indexing policy passed: route metadata emits one consistent robots policy; Explore sitemap merges remote sources, falls back to curated fixtures when remote data is unavailable or empty, resolves curation/heroes/quality before indexing, and preserves the same primary/readiness gate; query publication uses the same resolution concepts behind a lazy runtime boundary; duplicate units stay consolidated; substantive-copy, hero, coordinate and official-source gates remain aligned; recorded review dates must be fresh; live fallback destinations retain explicit current-source provenance; and reviewed water, museum, and batch 52 curation overlays are tracked separately from guaranteed local routes.');
