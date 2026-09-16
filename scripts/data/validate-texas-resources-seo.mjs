import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const route = read('src/routes/texas-resources.tsx');
const lazyRoutePath = path.join(root, 'src/routes/texas-resources.lazy.tsx');
const lazyRoute = fs.existsSync(lazyRoutePath) ? fs.readFileSync(lazyRoutePath, 'utf8') : '';
const page = `${route}\n${lazyRoute}`;
const departmentHero = read('src/components/editorial/DepartmentHero.tsx');
const authorityDataPath = path.join(root, 'src/data/priority-search-pages-authority-hubs.ts');
const loaderPath = path.join(root, 'src/data/priority-search-page.server.ts');
const publicRoutesPath = path.join(root, 'src/lib/public-routes.ts');
const searchDocumentsPath = path.join(root, 'src/data/priority-search-documents.ts');
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

const authorityFiles = [
  'src/data/priority-search-pages-authority-hubs.ts',
  'src/routes/texas-weather.tsx',
  'src/routes/texas-colleges-universities.tsx',
  'src/routes/texas-economy.tsx',
  'src/data/priority-search-page.server.ts',
  'src/lib/public-routes.ts',
  'src/data/priority-search-documents.ts',
];
for (const file of authorityFiles) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`High-demand authority surface missing: ${file}.`);
}

if (fs.existsSync(authorityDataPath)) {
  const authorityData = read('src/data/priority-search-pages-authority-hubs.ts');
  const hubs = [
    {
      slug: 'texas-weather',
      route: 'src/routes/texas-weather.tsx',
      sourceTokens: ['https://radar.weather.gov/', 'https://www.nhc.noaa.gov/', 'Texas A&M Forest Service', 'https://waterdata.usgs.gov/state/texas/', 'TCEQ Texas air-quality forecast'],
    },
    {
      slug: 'texas-colleges-universities',
      route: 'src/routes/texas-colleges-universities.tsx',
      sourceTokens: ['Texas Higher Education Coordinating Board', 'https://www.applytexas.org/', 'https://www.utsystem.edu/', 'https://www.tamus.edu/', 'https://lmi.twc.texas.gov/'],
    },
    {
      slug: 'texas-economy',
      route: 'src/routes/texas-economy.tsx',
      sourceTokens: ['https://www.bea.gov/data/gdp/gdp-state', 'https://www.census.gov/quickfacts/', 'https://lmi.twc.texas.gov/', 'https://comptroller.texas.gov/economy/', 'https://www.rrc.texas.gov/', 'https://www.eia.gov/'],
    },
  ];

  for (const hub of hubs) {
    if (!authorityData.includes(`"${hub.slug}": {`)) errors.push(`Authority dataset is missing ${hub.slug}.`);
    for (const token of ['quickAnswer:', 'sections:', 'faq:', 'related:']) {
      const start = authorityData.indexOf(`"${hub.slug}": {`);
      const next = hubs.map((item) => authorityData.indexOf(`"${item.slug}": {`, start + 1)).filter((index) => index > start).sort((a, b) => a - b)[0] ?? authorityData.length;
      const block = start >= 0 ? authorityData.slice(start, next) : '';
      if (!block.includes(token)) errors.push(`${hub.slug} is missing answer-layer field ${token}`);
      for (const sourceToken of hub.sourceTokens) {
        if (!block.includes(sourceToken)) errors.push(`${hub.slug} is missing authoritative-source token: ${sourceToken}`);
      }
      if (block.includes('TexasDefined should add') || block.includes('we should add')) errors.push(`${hub.slug} contains internal editorial instruction text.`);
    }

    const routePath = path.join(root, hub.route);
    if (fs.existsSync(routePath)) {
      const hubRoute = fs.readFileSync(routePath, 'utf8');
      for (const token of [`createFileRoute("/${hub.slug}")`, `const canonicalPath = "/${hub.slug}"`, 'buildPrioritySearchHead']) {
        if (!hubRoute.includes(token)) errors.push(`${hub.slug} route contract missing: ${token}`);
      }
    }
  }

  for (const retiredLink of ['href: "/state-parks"', 'href: "/texas-wildflowers"']) {
    if (authorityData.includes(retiredLink)) errors.push(`Authority hubs must not link retired/noncanonical path: ${retiredLink}`);
  }
}

if (fs.existsSync(loaderPath)) {
  const loader = read('src/data/priority-search-page.server.ts');
  if (!loader.includes('AUTHORITY_HUB_PRIORITY_SEARCH_PAGES')) errors.push('Priority-search server loader must load authority hubs.');
  if (!loader.includes('AUTHORITY_HUB_PRIORITY_SEARCH_PAGES[slug]')) errors.push('Priority-search server loader must resolve authority hubs by slug.');
}

if (fs.existsSync(publicRoutesPath)) {
  const publicRoutes = read('src/lib/public-routes.ts');
  for (const pathValue of ['/texas-weather', '/texas-colleges-universities', '/texas-economy']) {
    if (!publicRoutes.includes(`"${pathValue}"`)) errors.push(`Indexable public-route governance missing ${pathValue}.`);
  }
}

if (fs.existsSync(searchDocumentsPath)) {
  const searchDocuments = read('src/data/priority-search-documents.ts');
  for (const pathValue of ['/texas-weather', '/texas-colleges-universities', '/texas-economy']) {
    if (!searchDocuments.includes(`["${pathValue.slice(1)}",`)) errors.push(`Site search discovery missing ${pathValue}.`);
  }
}

for (const pair of [
  ['Texas weather & current conditions', '/texas-weather'],
  ['Texas colleges & universities', '/texas-colleges-universities'],
  ['Texas economy & data', '/texas-economy'],
]) {
  if (!page.includes(pair[0]) || !page.includes(pair[1])) errors.push(`Texas resources hub must expose ${pair[0]} at ${pair[1]}.`);
}

if (errors.length) {
  console.error('Texas resources SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Texas resources schema, discovery links, and high-demand weather/college/economy authority hubs are protected with canonical routing, primary-source answer layers, indexability, and search discovery.');
