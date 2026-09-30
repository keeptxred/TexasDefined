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
  "Texas Resources: State Services, Agencies & Local Help",
]) {
  if (!route.includes(feature)) errors.push(`Texas resources SEO feature missing from the static route: ${feature}.`);
}

for (const feature of [
  "createLazyFileRoute('/texas-resources')",
  'const featuredTasks =',
  'const groups:',
  '<DepartmentHero',
  'current="Texas Resources"',
  'What do you need to do?',
  "['Driver license & ID', '/texas-drivers-license'",
  "['Vehicle registration', '/texas-vehicle-registration'",
  "['Find my county', '/find-my-county'",
  "['Find my school district', '/find-my-school-district'",
  "['Property taxes & homestead', '/decide/property-taxes'",
  "['Start a business', '/start-a-business-in-texas'",
  "['Moving to Texas', '/moving-to-texas'",
  "title: 'Texas services'",
  "title: 'Home, property & moving'",
  "title: 'Work & business'",
  "title: 'Texas agencies & official help'",
  "to=\"/explore\"",
  "to=\"/texas-data\"",
  "to=\"/texas-explained\"",
]) {
  if (!page.includes(feature)) errors.push(`Texas resources task-hub feature missing across the route pair: ${feature}.`);
}

for (const forbidden of [
  "title: 'Texas culture and traditions'",
  "title: 'Stories and everyday Texas'",
  "title: 'Finding your place'",
]) {
  if (lazyRoute.includes(forbidden)) errors.push(`Texas resources should not regress into a mixed-intent discovery hub: ${forbidden}.`);
}

for (const feature of [
  'aria-label="Breadcrumb"',
  '<Link to="/"',
  'aria-current="page"',
]) {
  if (!departmentHero.includes(feature)) errors.push(`Shared Texas Resources breadcrumb feature missing: ${feature}.`);
}

if (errors.length) {
  console.error('Texas resources SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas resources task-first services hub, structured data, shared breadcrumb and intent separation are protected.');
