import fs from 'node:fs';

const failures = [];
const routePath = 'src/routes/texas-blue-norther-weather-guide.tsx';
const componentPath = 'src/components/editorial/TexasEvergreenGuide.tsx';
const dataPath = 'src/data/texas-evergreen-guides-batch6.ts';
const linksPath = 'src/data/things-unique-to-texas-links.ts';
const hubPath = 'src/routes/things-unique-to-texas.lazy.tsx';
const categoryPath = 'src/routes/things-unique-to-texas.$category.lazy.tsx';
const texasLifePath = 'src/routes/texas-living.tsx';
const llmsPath = 'src/routes/llms[.]txt.ts';
const publicRoutesPath = 'src/lib/public-routes.ts';
const citationPath = 'public/citation-magnets.json';
const citationGuidePath = 'src/routes/citation-guide.tsx';
const smokePath = '.github/workflows/things-unique-to-texas-production-smoke.yml';

for (const file of [routePath, componentPath, dataPath, linksPath, hubPath, categoryPath, texasLifePath, llmsPath, publicRoutesPath, citationPath, citationGuidePath, smokePath]) {
  if (!fs.existsSync(file)) failures.push(`Missing Texas weather authority file: ${file}.`);
}

const route = fs.existsSync(routePath) ? fs.readFileSync(routePath, 'utf8') : '';
const component = fs.existsSync(componentPath) ? fs.readFileSync(componentPath, 'utf8') : '';
const data = fs.existsSync(dataPath) ? fs.readFileSync(dataPath, 'utf8') : '';
const links = fs.existsSync(linksPath) ? fs.readFileSync(linksPath, 'utf8') : '';
const hub = fs.existsSync(hubPath) ? fs.readFileSync(hubPath, 'utf8') : '';
const category = fs.existsSync(categoryPath) ? fs.readFileSync(categoryPath, 'utf8') : '';
const texasLife = fs.existsSync(texasLifePath) ? fs.readFileSync(texasLifePath, 'utf8') : '';
const llms = fs.existsSync(llmsPath) ? fs.readFileSync(llmsPath, 'utf8') : '';
const publicRoutes = fs.existsSync(publicRoutesPath) ? fs.readFileSync(publicRoutesPath, 'utf8') : '';
const citationGuide = fs.existsSync(citationGuidePath) ? fs.readFileSync(citationGuidePath, 'utf8') : '';
const smoke = fs.existsSync(smokePath) ? fs.readFileSync(smokePath, 'utf8') : '';

for (const token of [
  'const canonicalPath = "/texas-blue-norther-weather-guide"',
  'Texas Blue Northers, Spring Storms & Weather Folklore',
  'Culture explains the language. Forecasts control the decision.',
  'use current National Weather Service forecasts and warnings rather than folklore',
]) {
  if (!route.includes(token)) failures.push(`Texas weather route must retain: ${token}`);
}

for (const token of [
  '"texas-blue-norther-weather-guide": [',
  'https://www.tshaonline.org/handbook/entries/blue-norther',
  'https://www.weather.gov/ama/50ranges',
  'https://www.weather.gov/hgx/stormsignals_vol40',
  'citation: sources.length ? sources.map((source) => source.href) : undefined',
  'Source notes',
]) {
  if (!component.includes(token)) failures.push(`Shared evergreen weather source/citation layer must retain: ${token}`);
}

for (const token of [
  '"texas-blue-norther-weather-guide"',
  'Blue Norther',
  'not unique to Texas',
  'A norther does not feel the same everywhere in Texas',
  'Spring storm watching comes from a real seasonal pattern',
  'The sky is not a warning system',
  'A strong front can change more than the temperature',
  'Never use this evergreen guide, a saying, cloud color or a remembered rule of thumb as a substitute for a current official warning.',
  '/things-unique-to-texas/slang-folklore',
  '/article/texas-regions-explained',
]) {
  if (!data.includes(token)) failures.push(`Texas weather guide data must retain: ${token}`);
}
const sectionCount = [...data.matchAll(/\n\s{6}\{\n\s{8}heading:/g)].length;
if (sectionCount < 8) failures.push(`Texas weather guide must retain at least 8 substantive sections; found ${sectionCount}.`);

for (const id of [233, 234, 235]) {
  if (!links.includes(`${id}: "/texas-blue-norther-weather-guide"`)) failures.push(`Texas icon ${id} must resolve to the Blue Norther weather guide.`);
}
if (!hub.includes('to="/texas-blue-norther-weather-guide"')) failures.push('Things That Define Texas hub must link the Texas weather guide.');
if (!category.includes('{ href: "/texas-blue-norther-weather-guide", label: "Texas Blue Northers & Spring Storms"')) failures.push('Slang/Folklore chapter must feature the Texas weather guide.');
if (!texasLife.includes("['/texas-blue-norther-weather-guide', 'Texas Blue Northers & Spring Storms'")) failures.push('Texas Life must retain an inbound link to the Texas weather guide.');
if (!llms.includes('https://texasdefined.com/texas-blue-norther-weather-guide')) failures.push('llms.txt must advertise the Texas weather guide.');
if (!publicRoutes.includes('"/texas-blue-norther-weather-guide"')) failures.push('Texas weather guide must remain governed as an indexable public route.');
for (const token of [
  "['Texas Blue Northers & spring storms', '/texas-blue-norther-weather-guide']",
  'Weather language vs. live weather',
  'use current National Weather Service forecasts and warnings as the controlling authority',
]) {
  if (!citationGuide.includes(token)) failures.push(`Human weather citation guidance must retain: ${token}`);
}

let citation;
try {
  citation = JSON.parse(fs.readFileSync(citationPath, 'utf8'));
} catch (error) {
  failures.push(`citation-magnets.json must remain valid JSON: ${error instanceof Error ? error.message : String(error)}`);
}
if (citation) {
  const resource = (citation.resources ?? []).find((item) => item.url === 'https://texasdefined.com/texas-blue-norther-weather-guide');
  if (!resource) failures.push('Citation index must include the Texas Blue Norther weather guide.');
  else {
    if (resource.type !== 'weather-culture-reference') failures.push('Texas weather citation resource must retain weather-culture-reference type.');
    for (const marker of ['TSHA-terminology-source', 'NWS-meteorology-source', 'safety-first', 'folklore-vs-forecast-distinction']) {
      if (!resource.trust?.includes(marker)) failures.push(`Texas weather citation resource must retain ${marker}.`);
    }
  }
}

for (const token of [
  "check_page '/texas-blue-norther-weather-guide'",
  'test "$json_deep_links" -ge 89',
  'test "$csv_deep_links" -ge 89',
  'Topical/evergreen authority routes checked: 23',
  'at least 89 deeper-guide relationships',
]) {
  if (!smoke.includes(token)) failures.push(`Texas weather production smoke contract missing: ${token}`);
}

if (failures.length) {
  console.error('Texas weather authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas weather authority validation passed: ${sectionCount} substantive sections, sourced JSON-LD citations, three icon mappings, Texas Life and machine discovery, human source precedence, citation trust and 89-link/23-route production smoke are protected.`);
