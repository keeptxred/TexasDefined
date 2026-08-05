import fs from 'node:fs';

const registry = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const exploreSitemap = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const regionRoute = fs.readFileSync('src/routes/explore.region.$region.tsx', 'utf8');

const redirects = [
  '/tax-calculator',
  '/texas-financial-tools',
  '/texas-property-tax-increase-calculator',
  '/texas-property-tax-protest-guide',
];
const nonIndexableRoutes = ['/search', '/explore/search'];
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
  ['src/routes/explore.texas-camping-guide.tsx', '/explore/texas-camping-guide', '/explore/outdoors'],
  ['src/routes/explore.texas-scenic-drives.tsx', '/explore/texas-scenic-drives', '/explore/road-trips'],
  ['src/routes/explore.texas-wildflower-seasons.tsx', '/explore/texas-wildflower-seasons', '/explore/road-trips'],
  ['src/routes/explore.national-wildlife-refuges.tsx', '/explore/national-wildlife-refuges', '/explore/outdoors'],
  ['src/routes/explore.wildlife-management-areas.tsx', '/explore/wildlife-management-areas', '/explore/outdoors'],
  ['src/routes/explore.lighthouses.tsx', '/explore/lighthouses', '/explore/beaches-coast'],
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

for (const path of redirects) {
  if (indexableSection.includes(`"${path}"`)) failures.push(`Redirect-only path remains in INDEXABLE_STATIC_PATHS: ${path}`);
  if (!registry.includes(`"${path}"`)) failures.push(`Redirect-only path is not governed explicitly: ${path}`);
}

for (const path of nonIndexableRoutes) {
  if (indexableSection.includes(`"${path}"`)) failures.push(`Noindex route remains in INDEXABLE_STATIC_PATHS: ${path}`);
  if (!registry.includes(`"${path}"`)) failures.push(`Noindex route is not governed explicitly: ${path}`);
  if (sitemap.includes(`"${path}"`)) failures.push(`Primary sitemap source must not publish noindex route ${path}.`);
  if (exploreSitemap.includes(`${path}`)) failures.push(`Explore sitemap source must not publish noindex route ${path}.`);
}

if (!registry.includes('REDIRECT_ONLY_PATHS')) failures.push('Redirect-only route registry is missing.');
if (!registry.includes('NON_INDEXABLE_PUBLIC_PATHS')) failures.push('Non-indexable public route registry is missing.');
if (!registry.includes('(REDIRECT_ONLY_PATHS as readonly string[]).includes(path)')) failures.push('isIndexablePublicPath does not reject redirect-only paths.');
if (!registry.includes('(NON_INDEXABLE_PUBLIC_PATHS as readonly string[]).includes(path)')) failures.push('isIndexablePublicPath does not reject noindex public paths.');
if (!sitemap.includes('isIndexablePublicPath(path)')) failures.push('Sitemap does not filter entries through the public-path policy.');

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
  if (sitemap.includes(aliasPath) || exploreSitemap.includes(aliasPath)) {
    failures.push(`Sitemaps must not publish migrated guide alias ${aliasPath}.`);
  }
}

for (const feature of [
  'supplementalExploreCategories',
  'EXPLORE_CATEGORY_SLUGS',
  '.filter((slug) => EXPLORE_CATEGORY_SLUGS.has(slug))',
  'categorySlugs.map((slug)',
  '`${BASE_URL}/explore/${slug}`',
  'regions.map((region)',
  '`${BASE_URL}/explore/region/${region.id}`',
  'new Set(urls)',
]) {
  if (!exploreSitemap.includes(feature)) failures.push(`Explore sitemap coverage missing: ${feature}`);
}

for (const region of regionIds) {
  if (!exploreSitemap.includes('regions.map((region)')) failures.push(`Explore sitemap does not generate regional URL: ${region}`);
}

for (const category of nonExploreCategories) {
  if (exploreSitemap.includes(`EXPLORE_CATEGORY_SLUGS = new Set([\n  "${category}"`)) {
    failures.push(`Non-Explore department is included in Explore sitemap categories: ${category}`);
  }
}

for (const feature of [
  'destinations as fixtureDestinations',
  'fixtureDestinations.filter((destination) => destination.region === region.id)',
  'if (matchingDestinations.length) destinations = matchingDestinations',
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

if (regionRoute.includes('The shared destination catalog is temporarily unavailable')) {
  failures.push('Indexed Explore region pages must use fixture fallback instead of rendering an empty outage page.');
}

if (failures.length) {
  console.error('Sitemap route validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Sitemap, migrated guide aliases, indexed regional collection quality, Explore-only category, noindex-route, redirect-route, and legacy destination validation passed.');
