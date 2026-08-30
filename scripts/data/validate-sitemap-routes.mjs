import fs from 'node:fs';

const registry = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const remoteArticles = fs.readFileSync('src/data/articles-remote.ts', 'utf8');
const exploreSitemap = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const exploreArticleCounts = fs.readFileSync('src/data/explore-category-article-counts.ts', 'utf8');
const regionRoute = fs.readFileSync('src/routes/explore.region.$region.tsx', 'utf8');

const extractArray = (name) => {
  const match = registry.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`));
  return match ? [...match[1].matchAll(/["'](\/[^"']*)["']/g)].map((entry) => entry[1]) : [];
};
const redirects = extractArray('REDIRECT_ONLY_PATHS');
const nonIndexableRoutes = extractArray('NON_INDEXABLE_PUBLIC_PATHS');
const legacyExploreRedirects = [
  ['src/routes/explore.lake.$slug.tsx', '/explore/lake/', '/destination/'],
  ['src/routes/explore.river.$slug.tsx', '/explore/river/', '/destination/'],
  ['src/routes/explore.cavern.$slug.tsx', '/explore/cavern/', '/destination/'],
  ['src/routes/explore.state-park.$slug.tsx', '/explore/state-park/', '/destination/'],
  ['src/routes/explore.county.$county.tsx', '/explore/county/', '/browse/counties#county-'],
];
const migratedGuideRedirects = [
  ['src/routes/explore.texas-state-parks-guide.tsx', '/explore/texas-state-parks-guide', '/explore/state-parks'],
  ['src/routes/explore.texas-lakes-guide.tsx', '/explore/texas-lakes-guide', '/explore/lakes-rivers'],
  ['src/routes/explore.texas-camping-guide.tsx', '/explore/texas-camping-guide', '/best-places-to-go-camping-in-texas'],
  ['src/routes/explore.texas-scenic-drives.tsx', '/explore/texas-scenic-drives', '/explore/road-trips'],
  ['src/routes/explore.texas-wildflower-seasons.tsx', '/explore/texas-wildflower-seasons', '/article/texas-wildflowers-guide'],
  ['src/routes/explore.national-wildlife-refuges.tsx', '/explore/national-wildlife-refuges', '/explore/outdoors'],
  ['src/routes/explore.wildlife-management-areas.tsx', '/explore/wildlife-management-areas', '/explore/outdoors'],
  ['src/routes/explore.spring-fed-swimming.tsx', '/explore/spring-fed-swimming', '/explore/lakes-rivers'],
  ['src/routes/explore.hill-country-springs.tsx', '/explore/hill-country-springs', '/explore/lakes-rivers'],
  ['src/routes/explore.spring-conservation-and-education.tsx', '/explore/spring-conservation-and-education', '/explore/lakes-rivers'],
];
const regionIds = [
  'hill-country',
  'gulf-coast',
  'big-bend',
  'panhandle',
  'piney-woods',
  'prairies-lakes',
  'south-texas',
];
const nonExploreCategories = ['sports', 'moving-to-texas', 'home-garden', 'real-estate', 'guides'];

const failures = [];
const indexableSection = registry.split('export const REDIRECT_ONLY_PATHS')[0];
if (!redirects.length) failures.push('Redirect-only route registry could not be parsed.');
if (!nonIndexableRoutes.length) failures.push('Non-indexable route registry could not be parsed.');

for (const path of redirects) {
  if (indexableSection.includes(`"${path}"`)) failures.push(`Redirect-only path remains in INDEXABLE_STATIC_PATHS: ${path}`);
  if (!registry.includes(`"${path}"`)) failures.push(`Redirect-only path is not governed explicitly: ${path}`);
}

for (const path of nonIndexableRoutes) {
  if (indexableSection.includes(`"${path}"`)) failures.push(`Noindex route remains in INDEXABLE_STATIC_PATHS: ${path}`);
  if (!registry.includes(`"${path}"`)) failures.push(`Noindex route is not governed explicitly: ${path}`);
}

for (const feature of [
  'REDIRECT_ONLY_PATHS',
  'NON_INDEXABLE_PUBLIC_PATHS',
  'normalizePublicPath',
  'isExploreSitemapOwnedPath',
  'value.startsWith("//")',
  'value.includes("?")',
  'value.includes("#")',
  'NON_INDEXABLE_PREFIXES',
]) {
  if (!registry.includes(feature)) failures.push(`Public crawl policy missing: ${feature}`);
}
if (!sitemap.includes('isIndexablePublicPath(entry.path)')) failures.push('Primary sitemap does not filter entries through the public-path policy.');
if (!sitemap.includes('normalizePublicPath(entry.path)')) failures.push('Primary sitemap does not normalize/reject malformed paths.');
if (!sitemap.includes('.filter((path) => !isExploreSitemapOwnedPath(path))')) failures.push('Primary sitemap must exclude Explore-owned static paths.');
if (!exploreSitemap.includes('isIndexablePublicPath(normalized)')) failures.push('Explore sitemap does not filter entries through the public-path policy.');
if (!exploreSitemap.includes('isExploreSitemapOwnedPath(normalized)')) failures.push('Explore sitemap must reject paths outside its owned namespace.');
if (!exploreSitemap.includes('normalizePublicPath(path)')) failures.push('Explore sitemap does not normalize/reject malformed paths.');
if (!sitemap.includes('Promise.allSettled')) failures.push('Primary sitemap must convert upstream failures into an explicit retryable response.');
if (!sitemap.includes('status: 503') || !sitemap.includes('"retry-after": "300"')) failures.push('Primary sitemap must return retryable 503 semantics on core data failure.');

for (const feature of [
  'const SITEMAP_PAGE_SIZE = 200',
  'const SITEMAP_MAX_ROWS = 10_000',
  'requestAllForSitemap',
  'pageParams.set("offset", String(offset))',
  'if (rows.length < SITEMAP_PAGE_SIZE) return articles',
  'fetchPublishedTexasDefinedNewsArticlesForSitemap',
  'fetchPublishedTexasDefinedEvergreenArticlesForSitemap',
]) {
  if (!remoteArticles.includes(feature)) failures.push(`Remote article sitemap pagination contract missing: ${feature}`);
}
if (!remoteArticles.includes('exceeded guarded ${SITEMAP_MAX_ROWS}-row limit')) failures.push('Remote article sitemap pagination must fail closed rather than silently truncate at its guard limit.');
if (!sitemap.includes('fetchPublishedTexasDefinedNewsArticlesForSitemap()')) failures.push('Primary sitemap must use the paginated remote news inventory.');
if (!sitemap.includes('fetchPublishedTexasDefinedEvergreenArticlesForSitemap()')) failures.push('Primary sitemap must use the paginated remote evergreen inventory.');
if (sitemap.includes('fetchPublishedTexasDefinedNewsArticles({ limit: 200 })') || sitemap.includes('fetchPublishedTexasDefinedEvergreenArticles({ limit: 200 })')) failures.push('Primary sitemap must not silently truncate remote article inventory to the newest 200 rows.');

for (const feature of [
  'const remoteConfigured = hasExploreRemoteData()',
  'let enrichedFailed = !remoteConfigured',
  'let coreFailed = !remoteConfigured',
  'if (remoteConfigured)',
  'const remoteDestinations = mergeDestinationSources(coreDestinations, enrichedDestinations)',
  'const usePreservedFallback = (enrichedFailed && coreFailed) || remoteDestinations.length === 0',
  'const rawDestinations = usePreservedFallback ? preservedExploreDestinations : remoteDestinations',
]) {
  if (!exploreSitemap.includes(feature)) failures.push(`Explore sitemap dual-source reliability contract missing: ${feature}`);
}
if (exploreSitemap.includes('const destinations = remoteFailed ? fixtureDestinations : remoteDestinations')) failures.push('Explore sitemap must not use the obsolete single-source outage fallback.');
if (!exploreSitemap.includes('isPrimaryTripPlannerDestination(destination)') || !exploreSitemap.includes('auditDestination(destination).readyForIndexing')) {
  failures.push('Explore sitemap must publish only primary, quality-approved destinations.');
}
for (const lowValueDependency of ['fetchExploreDestinations', 'fetchCoreExploreDestinations', 'supplementalExploreCategories', 'platform.destinations.list', 'platform.taxonomy.categories', 'platform.taxonomy.regions']) {
  if (sitemap.includes(lowValueDependency)) failures.push(`Primary sitemap must not load Explore-only dependency: ${lowValueDependency}.`);
}
if (!sitemap.includes('stale-while-revalidate=86400')) failures.push('Primary sitemap cache policy must preserve a stale response while revalidating.');
if (!exploreSitemap.includes('stale-while-revalidate=86400')) failures.push('Explore sitemap cache policy must preserve a stale response while revalidating.');

for (const [filename, legacyPrefix, targetPrefix] of legacyExploreRedirects) {
  const source = fs.readFileSync(filename, 'utf8');
  if (!source.includes('statusCode: 301')) failures.push(`${filename} must remain a permanent redirect.`);
  if (!source.includes(targetPrefix)) failures.push(`${filename} must redirect to ${targetPrefix}.`);
  if (exploreSitemap.includes(legacyPrefix)) failures.push(`Explore sitemap must not publish legacy prefix ${legacyPrefix}.`);
}

for (const [filename, aliasPath, targetPath] of migratedGuideRedirects) {
  const source = fs.readFileSync(filename, 'utf8');
  if (!source.includes('statusCode: 301')) failures.push(`${filename} must remain a permanent redirect.`);
  if (!source.includes(targetPath)) failures.push(`${filename} must redirect to ${targetPath}.`);
  if (!source.includes('location.searchStr')) failures.push(`${filename} must preserve the incoming query string.`);
  if (!redirects.includes(aliasPath)) failures.push(`Redirect-only registry must govern migrated guide alias ${aliasPath}.`);
  if (indexableSection.includes(`"${aliasPath}"`)) failures.push(`Migrated guide alias remains indexable: ${aliasPath}.`);
}

for (const feature of [
  'supplementalExploreCategories',
  'EXPLORE_CATEGORY_SLUGS',
  'const EXPLORE_CATEGORY_ARTICLE_COUNTS = {',
  'isExploreCategoryIndexReady',
  'const categoryCandidates =',
  '.filter((slug) => EXPLORE_CATEGORY_SLUGS.has(slug))',
  'const categorySlugs = categoryCandidates.filter((slug) => isExploreCategoryIndexReady(',
  '(EXPLORE_CATEGORY_ARTICLE_COUNTS[slug as keyof typeof EXPLORE_CATEGORY_ARTICLE_COUNTS] ?? 0)',
  '+ destinations.filter((destination) => destination.category === slug).length',
  '+ (slug === "food-bbq" ? 1 : 0)',
  'categorySlugs.map((slug)',
  '`/explore/${slug}`',
  'regionSlugs.map((regionSlug)',
  '`/explore/region/${regionSlug}`',
  '[...new Set(staticPaths)]',
  'new Map(destinations.filter((item) => item.slug)',
]) {
  if (!exploreSitemap.includes(feature)) failures.push(`Explore sitemap coverage missing: ${feature}`);
}
for (const feature of ['EXPLORE_CATEGORY_ARTICLE_COUNTS', 'as const satisfies Partial<Record<CategorySlug, number>>', 'exploreCategoryArticleCount(category: CategorySlug)']) {
  if (!exploreArticleCounts.includes(feature)) failures.push(`Explore sitemap CI-only article inventory missing: ${feature}`);
}
if (exploreSitemap.includes('@/data/index') || exploreSitemap.includes('explore-category-inventory') || exploreSitemap.includes('createServerFn') || exploreSitemap.includes('explore-category-article-counts')) {
  failures.push('Explore sitemap must not depend on the full article platform or article-inventory modules at runtime.');
}

for (const region of regionIds) {
  if (!exploreSitemap.includes(`"${region}"`)) failures.push(`Explore sitemap region registry missing: ${region}`);
}

for (const category of nonExploreCategories) {
  if (exploreSitemap.includes(`EXPLORE_CATEGORY_SLUGS = new Set([\n  "${category}"`)) failures.push(`Non-Explore department is included in Explore sitemap categories: ${category}`);
}

for (const feature of [
  'destinationsQuery({ limit: 5000 })',
  'catalog.filter((destination) => destination.region === region.id)',
  'RegionalDestinationGrid',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  'isPartOf: { "@id": `${siteUrl}/#website` }',
  'primaryImageOfPage: { "@id": imageId }',
  'aria-label="Breadcrumb"',
  '<Link to="/"',
]) {
  if (!regionRoute.includes(feature)) failures.push(`Indexed Explore region quality feature missing: ${feature}`);
}

if (regionRoute.includes('fixtureDestinations')) failures.push('Indexed Explore region pages must not bypass the resilient shared destination query layer.');
if (regionRoute.includes('The shared destination catalog is temporarily unavailable')) failures.push('Indexed Explore region pages must render the resilient catalog rather than an empty outage page.');

if (failures.length) {
  console.error('Sitemap route validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sitemap ownership, complete paginated remote-article coverage, crawl-demand partitioning, preserved-catalog remote fallback, resolved quality gates, runtime-isolated sparse-category sitemap gating, malformed-path rejection, all ${redirects.length} governed redirects, all ${nonIndexableRoutes.length} governed noindex routes, migrated aliases and regional quality passed validation.`);