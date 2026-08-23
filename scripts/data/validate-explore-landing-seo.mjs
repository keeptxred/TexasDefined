import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = [
  fs.readFileSync(path.join(root, 'src/routes/explore.index.tsx'), 'utf8'),
  fs.readFileSync(path.join(root, 'src/routes/explore.index.lazy.tsx'), 'utf8'),
].join('\n');
const departmentHero = fs.readFileSync(path.join(root, 'src/components/editorial/DepartmentHero.tsx'), 'utf8');
const errors = [];

for (const feature of [
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  '"@type": "WebPage" as const',
  '"@type": "TouristAttraction"',
  '"@type": "Article" as const',
  'const regions = loaderData?.regions ?? []',
  '...regions.map((region)',
  '`${siteUrl}/explore/region/${region.id}`',
  'name: "Places, regions and stories worth knowing"',
  'numberOfItems: itemListElement.length',
  'isPartOf: { "@id": `${siteUrl}/#website` }',
  'return { categories, regions, destinations, articles }',
  'to="/explore/region/$region"',
  '<DepartmentHero',
  'current="Explore"',
  '"major-springs"',
  '"national-parks"',
  'The guide by subject',
  'Find your way into Texas',
  'A few places to start',
]) {
  if (!route.includes(feature)) errors.push(`Explore landing SEO feature missing: ${feature}.`);
}

for (const feature of [
  'aria-label="Breadcrumb"',
  '<Link to="/"',
  'aria-current="page"',
]) {
  if (!departmentHero.includes(feature)) errors.push(`Shared department breadcrumb feature missing: ${feature}.`);
}

if (errors.length) {
  console.error('Explore landing SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore landing CollectionPage, category-region-place-story ItemList, shared breadcrumb, and visible regional navigation validation passed.');
