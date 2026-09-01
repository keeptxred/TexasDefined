import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const stubSource = read('src/data/fixtures/texas-explained-support-stubs-2.ts');
const articleSource = read('src/data/fixtures/texas-explained-support-articles-2.ts');
const articleRouteSource = read('src/routes/article.$slug.tsx');
const llmsSource = read('src/routes/llms[.]txt.ts');
const citationSource = read('public/citation-magnets.json');
const failures = [];

const canonicalUrl = 'https://texasdefined.com/article/texas-aquifers-springs-explained';
const twdbAquifers = 'https://www.twdb.texas.gov/groundwater/aquifer/';
const twdbGroundwater = 'https://www.twdb.texas.gov/groundwater/';
const twdbWaterUse = 'https://www.twdb.texas.gov/waterplanning/waterusesurvey/';

for (const token of [
  'slug: "texas-aquifers-springs-explained"',
  'sourceName: "Texas Water Development Board"',
  `sourceUrl: "${twdbAquifers}"`,
]) {
  if (!stubSource.includes(token)) failures.push(`Texas aquifers source contract missing: ${token}`);
}

for (const token of [
  twdbAquifers,
  twdbGroundwater,
  twdbWaterUse,
  'nine major aquifers and 22 minor aquifers',
  '2020 water-use data',
  '55 percent',
]) {
  if (!articleSource.includes(token)) failures.push(`Texas aquifers article evidence missing: ${token}`);
}

for (const token of [
  'const canonicalPath = `/article/${params.slug}`;',
  '...(article.sourceUrl ? { citation: article.sourceUrl } : primarySource ? { citation: primarySource.url } : {})',
  'Primary source:',
]) {
  if (!articleRouteSource.includes(token)) failures.push(`Article route citation contract missing: ${token}`);
}

for (const token of [
  canonicalUrl,
  'Texas aquifers, springs and groundwater systems',
  '2020',
  'Texas Water Development Board',
]) {
  if (!llmsSource.includes(token)) failures.push(`Texas aquifers llms discovery contract missing: ${token}`);
}

for (const token of [
  canonicalUrl,
  'groundwater-reference',
  'TWDB-primary-source',
  'dated-water-use-snapshot',
  'official-source-precedence',
  'current-groundwater-status-boundary',
]) {
  if (!citationSource.includes(token)) failures.push(`Texas aquifers citation index contract missing: ${token}`);
}

const currentStatusBoundary = [
  'current aquifer classifications',
  'groundwater conservation districts',
  'current pumping',
].some((token) => llmsSource.includes(token));
if (!currentStatusBoundary) {
  failures.push('Texas aquifers retrieval guidance must reserve current classifications, pumping rules and local groundwater conditions for TWDB/local authorities.');
}

if (failures.length) {
  console.error('Texas aquifers and springs machine-discovery validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Texas aquifers and springs machine-discovery validation passed: TWDB remains controlling for official groundwater data, the 2020 water-use share remains a dated snapshot, and TexasDefined is limited to durable statewide hydrogeography and explanatory synthesis.');
