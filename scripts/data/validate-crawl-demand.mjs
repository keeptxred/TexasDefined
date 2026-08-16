import fs from 'node:fs';

const registry = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const primary = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const explore = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const robots = fs.readFileSync('public/robots.txt', 'utf8');
const failures = [];

for (const sitemap of [
  'Sitemap: https://texasdefined.com/sitemap.xml',
  'Sitemap: https://texasdefined.com/sitemap-explore.xml',
]) {
  const count = robots.split(sitemap).length - 1;
  if (count !== 1) failures.push(`robots.txt must advertise ${sitemap.replace('Sitemap: ', '')} exactly once; found ${count}.`);
}

for (const feature of [
  'export function isExploreSitemapOwnedPath',
  'normalized === "/explore"',
  'normalized.startsWith("/explore/")',
  'normalized.startsWith("/destination/")',
]) {
  if (!registry.includes(feature)) failures.push(`Explore sitemap ownership policy missing: ${feature}`);
}

if (!primary.includes('.filter((path) => !isExploreSitemapOwnedPath(path))')) {
  failures.push('Primary sitemap must remove Explore-owned static routes before publication.');
}
for (const exploreOnlyDependency of [
  'fetchExploreDestinations',
  'fetchCoreExploreDestinations',
  'supplementalExploreCategories',
  'platform.destinations.list',
  'platform.taxonomy.categories',
  'platform.taxonomy.regions',
]) {
  if (primary.includes(exploreOnlyDependency)) failures.push(`Primary sitemap still loads Explore-only dependency ${exploreOnlyDependency}.`);
}
for (const exploreOwnedTemplate of ['`/destination/${', '`/explore/${', '`/explore/region/${']) {
  if (primary.includes(exploreOwnedTemplate)) failures.push(`Primary sitemap still constructs Explore-owned URL template ${exploreOwnedTemplate}.`);
}

for (const feature of [
  'isExploreSitemapOwnedPath(normalized)',
  'isPrimaryTripPlannerDestination(destination)',
  'auditDestination(destination).readyForIndexing',
  'mergeDestinationSources(coreDestinations, enrichedDestinations)',
  'const bothRemoteSourcesUnavailable = enrichedFailed && coreFailed',
  'const destinations = resolveDestinationCatalog(rawDestinations)',
]) {
  if (!explore.includes(feature)) failures.push(`Explore sitemap crawl-quality contract missing: ${feature}`);
}
if (explore.includes('remoteDestinations.length ? remoteDestinations : fixtureDestinations')) {
  failures.push('Explore sitemap must not republish fixtures merely because a healthy remote catalog is empty.');
}
if (explore.includes('const destinations = remoteFailed ? fixtureDestinations : remoteDestinations')) {
  failures.push('Explore sitemap must not use the obsolete single-source outage fallback.');
}
for (const generalOnlyTemplate of ['`/article/${', '`/authors/${', '`/shop/${', '`/property-tax/county/${']) {
  if (explore.includes(generalOnlyTemplate)) failures.push(`Explore sitemap must not construct general-site URL template ${generalOnlyTemplate}.`);
}

if (!primary.includes('stale-while-revalidate=86400')) failures.push('Primary sitemap must retain stale-while-revalidate protection.');
if (!explore.includes('stale-while-revalidate=86400')) failures.push('Explore sitemap must retain stale-while-revalidate protection.');

if (failures.length) {
  console.error('Crawl-demand validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Crawl-demand validation passed: sitemap namespaces are partitioned, Explore destinations are merged, resolved and quality-gated, and robots advertises each sitemap once.');
