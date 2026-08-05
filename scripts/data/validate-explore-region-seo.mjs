import fs from 'node:fs';

const route = fs.readFileSync('src/routes/explore.region.$region.tsx', 'utf8');
const grid = fs.readFileSync('src/components/editorial/RegionalDestinationGrid.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const errors = [];

for (const feature of [
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: loaderData.destinations.length',
  'itemListElement: loaderData.destinations.map',
  'canonicalLink(texasDefinedBrand, canonicalPath)',
  'aria-label="Breadcrumb"',
  'RegionalDestinationGrid',
  'destinations.length.toLocaleString',
]) {
  if (!route.includes(feature)) errors.push(`Regional Explore feature missing: ${feature}.`);
}

for (const feature of [
  'const PAGE_SIZE = 24',
  'destinations.slice(0, visibleCount)',
  'Show {Math.min(PAGE_SIZE, remaining)} more places',
  'Showing {visible.length.toLocaleString',
]) {
  if (!grid.includes(feature)) errors.push(`Regional destination grid feature missing: ${feature}.`);
}

for (const region of [
  'hill-country',
  'gulf-coast',
  'big-bend',
  'panhandle',
  'piney-woods',
  'prairies-lakes',
  'south-texas',
]) {
  if (!sitemap.includes(`"${region}"`)) errors.push(`Explore sitemap region missing: ${region}.`);
}

if (errors.length) {
  console.error('Explore regional collection validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore regional canonical URLs, structured data, breadcrumbs, sitemap coverage, counts, and progressive rendering passed validation.');
