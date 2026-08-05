import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/explore.index.tsx'), 'utf8');
const errors = [];

for (const feature of [
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  'type: "WebPage" as const',
  'type: "TouristAttraction" as const',
  'type: "Article" as const',
  'const regions = loaderData?.regions ?? []',
  '...regions.map((region)',
  '`${siteUrl}/explore/region/${region.id}`',
  'name: "Texas categories, regions, places and stories"',
  'numberOfItems: itemListElement.length',
  'isPartOf: { "@id": `${siteUrl}/#website` }',
  'return { categories, regions, destinations, articles }',
  'to="/explore/region/$region"',
  'aria-label="Breadcrumb"',
  'aria-current="page"',
  '"major-springs"',
  '"national-parks"',
  'Choose a spring, national park, cavern, beach',
]) {
  if (!route.includes(feature)) errors.push(`Explore landing SEO feature missing: ${feature}.`);
}

if (errors.length) {
  console.error('Explore landing SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore landing CollectionPage, category-region-place-story ItemList, breadcrumb, and visible regional navigation validation passed.');
