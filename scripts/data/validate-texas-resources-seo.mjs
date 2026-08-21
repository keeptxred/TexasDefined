import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/texas-resources.tsx'), 'utf8');
const lazyRoutePath = path.join(root, 'src/routes/texas-resources.lazy.tsx');
const lazyRoute = fs.existsSync(lazyRoutePath) ? fs.readFileSync(lazyRoutePath, 'utf8') : '';
const page = `${route}\n${lazyRoute}`;
const departmentHero = fs.readFileSync(path.join(root, 'src/components/editorial/DepartmentHero.tsx'), 'utf8');
const errors = [];

for (const feature of [
  "'@type': 'CollectionPage'",
  "'@type': 'ItemList'",
  "'@type': 'BreadcrumbList'",
  'numberOfItems: discoveryLinks.length',
  "isPartOf: { '@id': `${siteUrl}/#website` }",
]) {
  if (!route.includes(feature)) errors.push(`Texas resources SEO feature missing from the static route: ${feature}.`);
}

for (const feature of [
  "createLazyFileRoute('/texas-resources')",
  'const groups:',
  '<DepartmentHero',
  'current="Start Here"',
  "['Texas Life', '/texas-living']",
  "'/sports'",
  "'/texas-history'",
  "'/home-garden'",
  "'/real-estate'",
  "'/about'",
  "['Texas Explained', '/texas-explained']",
  "['Best places to go camping in Texas', '/best-places-to-go-camping-in-texas']",
  "['Texas vs every other state', '/texas-vs-every-state']",
]) {
  if (!page.includes(feature)) errors.push(`Texas resources SEO or discovery feature missing across the route pair: ${feature}.`);
}

for (const feature of [
  'aria-label="Breadcrumb"',
  '<Link to="/"',
  'aria-current="page"',
]) {
  if (!departmentHero.includes(feature)) errors.push(`Shared Start Here breadcrumb feature missing: ${feature}.`);
}

if (errors.length) {
  console.error('Texas resources SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas resources static schema, lazy public-hub UI, ItemList, shared breadcrumb, and discovery links are protected.');
