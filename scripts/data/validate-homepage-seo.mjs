import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/index.tsx'), 'utf8');
const errors = [];

for (const feature of [
  '"@type": "WebPage"',
  '"@type": "ItemList"',
  'numberOfItems: curatedItems.length',
  'featured.slice(0, 4)',
  'destinations.filter((item) => item.featured).slice(0, 4)',
  '`${siteUrl}/article/${article.slug}`',
  '`${siteUrl}/destination/${destination.slug}`',
  'absoluteUrl(texasDefinedBrand, article.hero.src)',
  'absoluteUrl(texasDefinedBrand, destination.hero.src)',
  'isPartOf: { "@id": `${siteUrl}/#website` }',
  'about: { "@id": `${siteUrl}/#organization` }',
]) {
  if (!route.includes(feature)) errors.push(`Homepage SEO feature missing: ${feature}.`);
}

if (route.includes('"@type": "Organization"') || route.includes('"@type": "WebSite"')) {
  errors.push('Homepage duplicates the global Organization or WebSite entities.');
}

if (errors.length) {
  console.error('Homepage SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Homepage WebPage and curated ItemList validation passed.');
