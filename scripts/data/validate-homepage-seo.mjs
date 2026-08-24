import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const eagerRoute = read('src/routes/index.tsx');
const lazyRoutePath = path.join(root, 'src/routes/index.lazy.tsx');
const route = fs.existsSync(lazyRoutePath) ? `${eagerRoute}\n${fs.readFileSync(lazyRoutePath, 'utf8')}` : eagerRoute;
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
  'to="/texas-resources"',
  'Texas Resources &amp; State Agencies',
  'Open Start Here →',
]) {
  if (!route.includes(feature)) errors.push(`Homepage SEO feature missing: ${feature}.`);
}

const duplicatesGlobalOrganization = route.includes('"@type": "Organization", "@id": `${siteUrl}/#organization`');
const duplicatesGlobalWebsite = route.includes('"@type": "WebSite", "@id": `${siteUrl}/#website`');
if (duplicatesGlobalOrganization || duplicatesGlobalWebsite) {
  errors.push('Homepage duplicates the global Organization or WebSite entities.');
}

if (errors.length) {
  console.error('Homepage SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Homepage WebPage, curated ItemList and Start Here discovery validation passed across eager and lazy route surfaces.');