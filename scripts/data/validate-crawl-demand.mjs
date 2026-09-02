import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const readRouteSurface = (file) => {
  const eagerSource = read(file);
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${read(lazyFile)}` : eagerSource;
};

const registry = read('src/lib/public-routes.ts');
const primary = read('src/routes/sitemap[.]xml.ts');
const explore = read('src/routes/sitemap-explore[.]xml.ts');
const robots = read('public/robots.txt');
const cityDirectory = readRouteSurface('src/routes/browse.cities.tsx');
const placeDirectory = read('src/components/directories/TexasPlaceDirectory.tsx');
const cityAuthorityIndex = read('src/data/city-authority-index.ts');
const countyDirectory = readRouteSurface('src/routes/browse.counties.tsx');
const countyPropertyDirectory = read('src/components/directories/TexasCountyPropertyDirectory.tsx');
const leafOnlyParents = read('src/lib/leaf-only-parent-routes.tsx');
const landscapeServer = read('src/data/texas-landscapes.server.ts');
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
  'const remoteDestinations = mergeDestinationSources(coreDestinations, enrichedDestinations)',
  'const usePreservedFallback = (enrichedFailed && coreFailed) || remoteDestinations.length === 0',
  'const rawDestinations = usePreservedFallback ? preservedExploreDestinations : remoteDestinations',
  'const destinations = resolveDestinationCatalog(rawDestinations)',
]) {
  if (!explore.includes(feature)) failures.push(`Explore sitemap crawl-quality contract missing: ${feature}`);
}
if (explore.includes('const destinations = remoteFailed ? fixtureDestinations : remoteDestinations')) {
  failures.push('Explore sitemap must not use the obsolete single-source outage fallback.');
}
for (const generalOnlyTemplate of ['`/article/${', '`/authors/${', '`/shop/${', '`/property-tax/county/${']) {
  if (explore.includes(generalOnlyTemplate)) failures.push(`Explore sitemap must not construct general-site URL template ${generalOnlyTemplate}.`);
}

for (const marker of [
  'import { Route as landscapesRoute } from "@/routes/explore.landscapes";',
  'landscapesRoute,',
]) {
  if (!leafOnlyParents.includes(marker)) failures.push(`Landscape parent-route canonical protection missing: ${marker}`);
}
for (const marker of [
  'const path = `/explore/landscapes/${item.slug}`;',
  'buildMeta(texasDefinedBrand, { canonicalPath: path, title, description })',
  'links: [canonicalLink(texasDefinedBrand, path)]',
]) {
  if (!landscapeServer.includes(marker)) failures.push(`Landscape child self-canonical contract missing: ${marker}`);
}
for (const marker of [
  'landscapeSlugs.map((slug) => `/explore/landscapes/${slug}`)',
  'landscapeGuideSlugs.map((slug) => `/explore/landscapes/${slug}`)',
]) {
  if (!explore.includes(marker)) failures.push(`Explore sitemap must retain substantive self-canonical landscape coverage: ${marker}`);
}

for (const marker of [
  'CITY_AUTHORITY_SLUGS.has(city.slug)',
  'absoluteUrl(texasDefinedBrand, cityAuthorityPath(city.slug))',
  ': `${pageUrl}#${cityAnchor(city.slug)}`',
]) {
  if (!cityDirectory.includes(marker)) failures.push(`City directory verification-aware crawl contract missing: ${marker}`);
}
for (const marker of [
  'CITY_AUTHORITY_SLUGS.has(city.slug)',
  'params={{ kind: "city", slug: city.slug }}',
]) {
  if (!placeDirectory.includes(marker)) failures.push(`Visible city directory verification-aware link contract missing: ${marker}`);
}
for (const marker of [
  'export const CITY_AUTHORITY_INDEX',
  'export const CITY_AUTHORITY_SLUGS',
]) {
  if (!cityAuthorityIndex.includes(marker)) failures.push(`Shared verified city authority crawl registry missing: ${marker}`);
}
if (cityDirectory.includes('absoluteUrl(texasDefinedBrand, cityAuthorityPath(city.slug))') && !cityDirectory.includes('CITY_AUTHORITY_SLUGS.has(city.slug)')) {
  failures.push('City ItemList canonical URLs must not be promoted without verified authority gating.');
}
if (placeDirectory.includes('params={{ kind: "city", slug: city.slug }}') && !placeDirectory.includes('CITY_AUTHORITY_SLUGS.has(city.slug)')) {
  failures.push('Visible city detail links must not be promoted without verified authority gating.');
}

for (const marker of [
  'const verifiedPropertyCounties = COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)',
  'numberOfItems: verifiedPropertyCounties.length',
  'itemListElement: verifiedPropertyCounties.map',
  '<TexasCountyPropertyDirectory verifiedPropertySlugs={verifiedPropertySlugs} />',
]) {
  if (!countyDirectory.includes(marker)) failures.push(`County directory verification-aware crawl contract missing: ${marker}`);
}
for (const marker of [
  'verifiedPropertySlugs',
  'const hasVerifiedPropertyGuide = verified.has(county.slug)',
  'Open verified property guide',
  'Open county reference',
]) {
  if (!countyPropertyDirectory.includes(marker)) failures.push(`County property directory verification-aware link contract missing: ${marker}`);
}
if (countyDirectory.includes('itemListElement: TEXAS_COUNTIES.map')) {
  failures.push('Browse/counties must not schema-advertise all 254 property-tax child pages.');
}
if (countyPropertyDirectory.includes('counties.map((county, index) => (') && countyPropertyDirectory.includes('to="/property-tax/county/$county" params={{ county: county.slug }}>Open the guide')) {
  failures.push('County property directory must not unconditionally link every county to a property-tax child page.');
}

if (!primary.includes('stale-while-revalidate=86400')) failures.push('Primary sitemap must retain stale-while-revalidate protection.');
if (!explore.includes('stale-while-revalidate=86400')) failures.push('Explore sitemap must retain stale-while-revalidate protection.');

if (failures.length) {
  console.error('Crawl-demand validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Crawl-demand validation passed: sitemap namespaces are partitioned, Explore destinations use quality-gated preserved-catalog fallback when remote sources are unavailable or empty, landscape sitemap children are protected as leaf-only self-canonical routes, verified city authority URLs are promoted only through the shared readiness gate, county property children are verification-filtered, and robots advertises each sitemap once.');
