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

const failures = [];

for (const path of redirects) {
  const indexableSection = registry.split('export const REDIRECT_ONLY_PATHS')[0];
  if (indexableSection.includes(`"${path}"`)) {
    failures.push(`Redirect-only path remains in INDEXABLE_STATIC_PATHS: ${path}`);
  }
  if (!registry.includes(`"${path}"`)) {
    failures.push(`Redirect-only path is not governed explicitly: ${path}`);
  }
}

if (!registry.includes('REDIRECT_ONLY_PATHS')) {
  failures.push('Redirect-only route registry is missing.');
}
if (!registry.includes('(REDIRECT_ONLY_PATHS as readonly string[]).includes(path)')) {
  failures.push('isIndexablePublicPath does not reject redirect-only paths.');
}
if (!sitemap.includes('isIndexablePublicPath(path)')) {
  failures.push('Sitemap does not filter entries through the public-path policy.');
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

console.log('Sitemap redirect-route and Explore category validation passed.');
