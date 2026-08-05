import './validate-editorial-collection-seo.mjs';
import './validate-events-seo.mjs';
import './validate-explore-landing-seo.mjs';
import './validate-moving-checklist-seo.mjs';
import './validate-practical-guides-seo.mjs';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/explore.$category.tsx'), 'utf8');
const categoryPage = fs.readFileSync(path.join(root, 'src/components/editorial/CategoryPage.tsx'), 'utf8');
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
]) {
  if (!categoryPage.includes(feature)) errors.push(`Visible Explore category breadcrumb feature missing: ${feature}.`);
}

if (errors.length) {
  console.error('Explore category SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore category CollectionPage, ItemList, and visible breadcrumb validation passed.');
