import fs from 'node:fs';

const route = fs.readFileSync('src/routes/explore.region.$region.tsx', 'utf8');
const grid = fs.readFileSync('src/components/editorial/RegionalDestinationGrid.tsx', 'utf8');
const hub = fs.readFileSync('src/components/editorial/RegionalHubSections.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const errors = [];

const requireFeatures = (source, features, area) => {
  for (const feature of features) {
    if (!source.includes(feature)) errors.push(`${area} feature missing: ${feature}.`);
  }
};

requireFeatures(route, [
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: loaderData.destinations.length',
  'itemListElement: loaderData.destinations.map',
  'canonicalLink(texasDefinedBrand, canonicalPath)',
  'aria-label="Breadcrumb"',
  'RegionalDestinationGrid',
  'RegionalHubSections',
  '<h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{region.name}</h1>',
  'categoryCounts',
  'about: categoryCounts.map',
  'destinations.length.toLocaleString',
], 'Regional Explore');

requireFeatures(grid, [
  'const PAGE_SIZE = 24',
  'destinations.slice(0, visibleCount)',
  'remaining > 0',
  'setVisibleCount((count) => Math.min(count + PAGE_SIZE, destinations.length))',
  'Math.min(PAGE_SIZE, remaining)',
  'visible.length.toLocaleString("en-US")',
  'destinations.length.toLocaleString("en-US")',
  'DestinationCard destination={destination}',
], 'Regional destination grid');

requireFeatures(hub, [
  'leadPlaces.length > 0',
  'groups.map((group',
  'Editor’s selection',
  'Places that define ${region.name}',
  'Browse the region',
  'Choose your route through ${region.name}',
  'Plan the trip',
  'Useful next steps for ${region.name}',
  'The rest of Texas',
  'Explore another region',
  'aria-label={`${region.name} travel interests`}',
  'aria-label="Other Texas regions"',
  'actionTo={`/explore/${group.slug}`}',
  'to="/events"',
  'to="/guides"',
  'to="/browse/cities"',
  'to="/search"',
  'destinations.filter((destination) => destination.category === section.slug)',
], 'Regional editorial hub');

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
