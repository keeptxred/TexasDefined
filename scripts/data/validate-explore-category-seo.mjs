import './validate-editorial-collection-seo.mjs';
import './validate-events-seo.mjs';
import './validate-explore-landing-seo.mjs';
import './validate-moving-checklist-seo.mjs';
import './validate-practical-guides-seo.mjs';
import './validate-property-tax-guide-seo.mjs';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/explore.$category.tsx'), 'utf8');
const landing = fs.readFileSync(path.join(root, 'src/routes/explore.index.tsx'), 'utf8');
const categoryPage = fs.readFileSync(path.join(root, 'src/components/editorial/CategoryPage.tsx'), 'utf8');
const collectionGrid = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationCollectionGrid.tsx'), 'utf8');
const discovery = fs.readFileSync(path.join(root, 'src/components/editorial/ExploreDiscovery.tsx'), 'utf8');
const types = fs.readFileSync(path.join(root, 'src/data/types.ts'), 'utf8');
const fixtures = fs.readFileSync(path.join(root, 'src/data/fixtures/texas.ts'), 'utf8');
const supplemental = fs.readFileSync(path.join(root, 'src/data/explore-categories.ts'), 'utf8');
const queries = fs.readFileSync(path.join(root, 'src/data/queries.ts'), 'utf8');
const remote = fs.readFileSync(path.join(root, 'src/data/explore-remote.ts'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'src/routes/sitemap[.]xml.ts'), 'utf8');
const brand = fs.readFileSync(path.join(root, 'src/brand/texasdefined.ts'), 'utf8');
const errors = [];

for (const feature of [
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: itemListElement.length',
  'articlesQuery({ category: category.slug })',
  'destinationsQuery({ category: category.slug })',
  '`${siteUrl}/article/${article.slug}`',
  '`${siteUrl}/destination/${destination.slug}`',
  'absoluteUrl(texasDefinedBrand, article.hero.src)',
  'absoluteUrl(texasDefinedBrand, destination.hero.src)',
  'isPartOf: { "@id": `${siteUrl}/#website` }',
]) {
  if (!route.includes(feature)) errors.push(`Explore category SEO feature missing: ${feature}.`);
}

for (const feature of [
  'aria-label="Breadcrumb"',
  '<Link to="/"',
  '<Link to="/explore"',
  'aria-current="page"',
  'ExploreDiscovery',
  'DestinationCollectionGrid',
  'categoriesQuery()',
  'destinations.length.toLocaleString',
]) {
  if (!categoryPage.includes(feature)) errors.push(`Visible Explore category feature missing: ${feature}.`);
}

for (const feature of [
  'const PAGE_SIZE = 24',
  'const filtered = useMemo',
  'const visible = filtered.slice(0, visibleCount)',
  'const remaining = Math.max(0, filtered.length - visible.length)',
  'onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length))}',
  'remaining > 0',
  'visible.length.toLocaleString("en-US")',
  'filtered.length.toLocaleString("en-US")',
  '<DestinationCard',
  'value={query}',
  'value={region}',
  'value={activity}',
  'value={sort}',
]) {
  if (!collectionGrid.includes(feature)) errors.push(`Destination collection rendering feature missing: ${feature}.`);
}

for (const feature of [
  'const EXPLORE_DEPARTMENTS = new Set<CategorySlug>',
  'item.slug !== currentCategory',
  'EXPLORE_DEPARTMENTS.has(item.slug)',
  'aria-label="More ways to explore Texas"',
  'aria-label="Choose a part of Texas"',
  'relatedCategories.map',
  'regions.map',
  'to="/explore/$category"',
  'to="/explore/region/$region"',
]) {
  if (!discovery.includes(feature)) errors.push(`Explore discovery feature missing: ${feature}.`);
}

const migratedCategories = ['major-springs', 'national-parks', 'caverns', 'beaches-coast', 'historic-sites'];
for (const category of migratedCategories) {
  if (!types.includes(`| "${category}"`)) errors.push(`Category type missing: ${category}.`);
  if (!supplemental.includes(`slug: "${category}"`) && !fixtures.includes(`slug: "${category}"`)) {
    errors.push(`Category metadata missing: ${category}.`);
  }
  if (!landing.includes(`"${category}"`)) errors.push(`Explore landing category missing: ${category}.`);
  if (!brand.includes(`/explore/${category}`)) errors.push(`Explore navigation link missing: ${category}.`);
}

for (const feature of [
  'supplementalExploreCategories',
  'const merged = new Map',
  'return [...merged.values()]',
]) {
  if (!queries.includes(feature)) errors.push(`Merged Explore taxonomy feature missing: ${feature}.`);
}

for (const feature of [
  'supplementalExploreCategories',
  '...categories.map((category)',
  '.filter((destination) => destination.slug)',
  '.map((destination) => ({ path: `/destination/${destination.slug}`',
]) {
  if (!sitemap.includes(feature)) errors.push(`Explore sitemap feature missing: ${feature}.`);
}

for (const feature of [
  'return "major-springs"',
  'return "national-parks"',
  'return "caverns"',
  'return "beaches-coast"',
  'return "historic-sites"',
  '"lighthouse"',
  '"wildlife_refuge"',
  '"wildlife_management_area"',
  'return "outdoors"',
  'explore_entity_types(key,name)',
  'MAX_REMOTE_DESTINATIONS',
]) {
  if (!remote.includes(feature)) errors.push(`Migrated Explore catalog feature missing: ${feature}.`);
}

if (errors.length) {
  console.error('Explore category SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore categories, classification, filterable collections, taxonomy, navigation, sitemap, related links, regions, structured data, and breadcrumbs passed validation.');
