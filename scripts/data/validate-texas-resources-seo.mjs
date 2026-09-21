import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const route = read('src/routes/texas-resources.tsx');
const lazyRoutePath = path.join(root, 'src/routes/texas-resources.lazy.tsx');
const lazyRoute = fs.existsSync(lazyRoutePath) ? fs.readFileSync(lazyRoutePath, 'utf8') : '';
const page = `${route}\n${lazyRoute}`;
const departmentHero = read('src/components/editorial/DepartmentHero.tsx');
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

const educationFiles = [
  'src/data/priority-search-pages-education.ts',
  'src/routes/texas-colleges-universities.tsx',
  'src/routes/texas-colleges-universities.lazy.tsx',
  'src/data/priority-search-page.server.ts',
  'src/data/priority-search-documents.ts',
  'src/lib/public-routes.ts',
];
for (const file of educationFiles) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Texas Education authority surface missing: ${file}.`);
}

if (educationFiles.every((file) => fs.existsSync(path.join(root, file)))) {
  const education = read('src/data/priority-search-pages-education.ts');
  const collegesRoute = read('src/routes/texas-colleges-universities.tsx');
  const collegesLazy = read('src/routes/texas-colleges-universities.lazy.tsx');
  const loader = read('src/data/priority-search-page.server.ts');
  const searchDocuments = read('src/data/priority-search-documents.ts');
  const publicRoutes = read('src/lib/public-routes.ts');

  for (const token of [
    '"texas-colleges-universities": {',
    'quickAnswer:',
    'sections:',
    'faq:',
    'related:',
    'https://www.highered.texas.gov/new-program-development/course-and-program-inventory/',
    'https://www.highered.texas.gov/legislative-appropriations-overviews/tuition-and-fees-data/',
    'https://www.applytexas.org/',
    'https://www.utsystem.edu/institutions',
    'https://www.tamus.edu/',
    'https://www.tstc.edu/',
    'https://lmi.twc.texas.gov/',
    '/find-my-school-district',
    '/article/texas-schools-family-life',
    '/texas-school-district-property-tax-comparison',
  ]) {
    if (!education.includes(token)) errors.push(`Texas colleges authority data missing: ${token}`);
  }

  for (const token of [
    'createFileRoute("/texas-colleges-universities")',
    'const canonicalPath = "/texas-colleges-universities"',
    'buildPrioritySearchHead',
    'loadPrioritySearchPage("texas-colleges-universities")',
  ]) {
    if (!collegesRoute.includes(token)) errors.push(`Texas colleges route contract missing: ${token}`);
  }

  for (const token of [
    'createLazyFileRoute("/texas-colleges-universities")',
    '<PrioritySearchPage data={Route.useLoaderData()} />',
  ]) {
    if (!collegesLazy.includes(token)) errors.push(`Texas colleges lazy UI contract missing: ${token}`);
  }

  if (!loader.includes('EDUCATION_PRIORITY_SEARCH_PAGES')) errors.push('Priority-search server loader must import Texas Education authority data.');
  if (!loader.includes('EDUCATION_PRIORITY_SEARCH_PAGES[slug]')) errors.push('Priority-search server loader must resolve Texas Education authority data.');
  if (!searchDocuments.includes('"texas-colleges-universities"')) errors.push('Site search discovery missing /texas-colleges-universities.');
  if (!publicRoutes.includes('"/texas-colleges-universities"')) errors.push('Indexable public-route governance missing /texas-colleges-universities.');

  for (const token of [
    "title: 'Education and schools'",
    "['Texas colleges, universities, tuition and admissions', '/texas-colleges-universities']",
    "['Find your Texas school district', '/find-my-school-district']",
    "['Texas schools and family life', '/article/texas-schools-family-life']",
    "['Texas Education Agency', '/agency/texas-education-agency']",
  ]) {
    if (!lazyRoute.includes(token)) errors.push(`Texas Resources Education cluster missing: ${token}`);
  }

  if (education.includes('TexasDefined should add') || education.includes('we should add')) {
    errors.push('Texas Education authority data contains internal editorial instruction text.');
  }
}

if (errors.length) {
  console.error('Texas resources SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas resources schema, discovery links, shared breadcrumb, and Texas Education authority routing/search/indexability are protected.');
