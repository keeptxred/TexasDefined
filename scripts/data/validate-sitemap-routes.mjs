import fs from 'node:fs';

const registry = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const exploreSitemap = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');

const redirects = [
  '/tax-calculator',
  '/texas-financial-tools',
  '/texas-property-tax-increase-calculator',
  '/texas-property-tax-protest-guide',
];
const nonIndexableRoutes = ['/search', '/explore/search'];
const legacyExploreRedirects = [
  ['src/routes/explore.cavern.$slug.tsx', '/explore/cavern/', '/destination/'],
  ['src/routes/explore.state-park.$slug.tsx', '/explore/state-park/', '/destination/'],
  ['src/routes/explore.county.$county.tsx', '/explore/county/', '/browse/counties#county-'],
];

const failures = [];
const indexableSection = registry.split('export const REDIRECT_ONLY_PATHS')[0];

for (const path of redirects) {
  if (indexableSection.includes(`"${path}"`)) {
    failures.push(`Redirect-only path remains in INDEXABLE_STATIC_PATHS: ${path}`);
  }
  if (!registry.includes(`"${path}"`)) {
    failures.push(`Redirect-only path is not governed explicitly: ${path}`);
  }
}

for (const path of nonIndexableRoutes) {
  if (indexableSection.includes(`"${path}"`)) failures.push(`Noindex route remains in INDEXABLE_STATIC_PATHS: ${path}`);
  if (!registry.includes(`"${path}"`)) failures.push(`Noindex route is not governed explicitly: ${path}`);
  if (sitemap.includes(`"${path}"`)) failures.push(`Primary sitemap source must not publish noindex route ${path}.`);
  if (exploreSitemap.includes(`${path}`)) failures.push(`Explore sitemap source must not publish noindex route ${path}.`);
}

if (!registry.includes('REDIRECT_ONLY_PATHS')) {
  failures.push('Redirect-only route registry is missing.');
}
if (!registry.includes('NON_INDEXABLE_PUBLIC_PATHS')) {
  failures.push('Non-indexable public route registry is missing.');
}
if (!registry.includes('(REDIRECT_ONLY_PATHS as readonly string[]).includes(path)')) {
  failures.push('isIndexablePublicPath does not reject redirect-only paths.');
}
if (!registry.includes('(NON_INDEXABLE_PUBLIC_PATHS as readonly string[]).includes(path)')) {
  failures.push('isIndexablePublicPath does not reject noindex public paths.');
}
if (!sitemap.includes('isIndexablePublicPath(path)')) {
  failures.push('Sitemap does not filter entries through the public-path policy.');
}

for (const [filename, legacyPrefix, targetPrefix] of legacyExploreRedirects) {
  const source = fs.readFileSync(filename, 'utf8');
  if (!source.includes('statusCode: 301')) failures.push(`${filename} must remain a permanent redirect.`);
  if (!source.includes(targetPrefix)) failures.push(`${filename} must redirect to ${targetPrefix}.`);
  if (exploreSitemap.includes(legacyPrefix)) failures.push(`Explore sitemap must not publish legacy prefix ${legacyPrefix}.`);
}

for (const feature of [
  'supplementalExploreCategories',
  'categories',
  'categorySlugs.map((slug)',
  '`${BASE_URL}/explore/${slug}`',
  'new Set(urls)',
]) {
  if (!exploreSitemap.includes(feature)) {
    failures.push(`Explore sitemap category coverage missing: ${feature}`);
  }
}

if (failures.length) {
  console.error('Sitemap route validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Sitemap, noindex-route, redirect-route, legacy Explore redirect, and category validation passed.');
