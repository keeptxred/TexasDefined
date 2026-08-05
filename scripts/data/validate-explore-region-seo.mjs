import fs from 'node:fs';

const route = fs.readFileSync('src/routes/explore.region.$region.tsx', 'utf8');
const grid = fs.readFileSync('src/components/editorial/RegionalDestinationGrid.tsx', 'utf8');
const hub = fs.readFileSync('src/components/editorial/RegionalHubSections.tsx', 'utf8');
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
  'RegionalHubSections',
  'Texas region guide',
  'categoryCounts',
  'about: categoryCounts.map',
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

for (const feature of [
  'The places that define',
  'Plan by interest',
  'What to do in',
  'Build the weekend',
  'Explore another part of Texas',
  'aria-label={`${region.name} travel interests`}',
  'aria-label="Other Texas regions"',
  'actionTo={`/explore/${group.slug}`}',
  'to="/events"',
  'to="/guides"',
  'to="/browse/cities"',
  'to="/search"',
  'destinations.filter((destination) => destination.category === section.slug)',
]) {
  if (!hub.includes(feature)) errors.push(`Regional editorial hub feature missing: ${feature}.`);
}

for (const category of [
  'state-parks', 'national-parks', 'lakes-rivers', 'major-springs', 'caverns',
  'beaches-coast', 'historic-sites', 'small-towns', 'food-bbq', 'road-trips', 'outdoors',
]) {
  if (!hub.includes(`slug: "${category}"`)) errors.push(`Regional hub category missing: ${category}.`);
}

for (const region of [
  'hill-country', 'gulf-coast', 'big-bend', 'panhandle', 'piney-woods',
  'prairies-lakes', 'south-texas',
]) {
  if (!sitemap.includes(`"${region}"`)) errors.push(`Explore sitemap region missing: ${region}.`);
}

if (errors.length) {
  console.error('Explore regional editorial hub validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore regional hubs, category sections, planning links, cross-region discovery, structured data, sitemaps, and progressive rendering passed validation.');
