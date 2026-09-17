import fs from 'node:fs';

const stubs = fs.readFileSync('src/data/fixtures/texas-explained-support-stubs-2.ts', 'utf8');
const articleSource = fs.readFileSync('src/data/fixtures/texas-explained-support-articles-2.ts', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const citationMagnets = fs.readFileSync('public/citation-magnets.json', 'utf8');
const llmsRoute = fs.readFileSync('src/routes/llms[.]txt.ts', 'utf8');
const failures = [];

const ecoregionsSource = 'https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions';
const blacklandSource = 'https://tpwd.texas.gov/wildlife/wildlife-diversity/wildscapes/wildscapes-plant-guidance-by-ecoregion/the-blackland-prairies/';
const prairieMachineUrl = 'https://texasdefined.com/article/texas-prairies-grasslands-guide';

const prairieStubMatch = stubs.match(/export const texasPrairiesGrasslandsGuideStub:[\s\S]*?export const texasMainStreetDowntownsGuideStub:/);
const prairieStub = prairieStubMatch?.[0] ?? '';

for (const token of [
  'slug: "texas-prairies-grasslands-guide"',
  'sourceName: "Texas Parks and Wildlife Department"',
  `sourceUrl: "${ecoregionsSource}"`,
]) {
  if (!prairieStub.includes(token)) failures.push(`Texas prairies stub authority contract missing: ${token}`);
}

const prairieArticleMatch = articleSource.match(/export const texasPrairiesGrasslandsGuideArticle:[\s\S]*?export const texasMainStreetDowntownsGuideArticle:/);
const prairieArticle = prairieArticleMatch?.[0] ?? '';

for (const token of [
  'slug: "texas-prairies-grasslands-guide"',
  'sourceName: "Texas Parks and Wildlife Department"',
  `sourceUrl: "${ecoregionsSource}"`,
  `href: "${ecoregionsSource}"`,
  `href: "${blacklandSource}"`,
  'Texas Parks and Wildlife divides the state into ten major natural regions.',
  'TPWD describes the Blackland\'s dark clay soils as among the richest in the world and notes that only a small remnant of the original prairie remains in true prairie condition.',
  'The useful question is not whether land is grazed, but how the grazing interacts with rainfall, stocking pressure and recovery time.',
]) {
  if (!prairieArticle.includes(token)) failures.push(`Texas prairies article authority contract missing: ${token}`);
}

for (const staleOrUnsafeClaim of [
  'only 5,000 of the original 12 million acres currently remain',
  'only 5000 of the original 12 million acres currently remain',
  'exactly 5,000 acres remain today',
  'TexasDefined current habitat map',
  'TexasDefined official ecoregion map',
]) {
  if (prairieArticle.toLowerCase().includes(staleOrUnsafeClaim.toLowerCase())) {
    failures.push(`Texas prairies article must not present changeable conservation or mapping information as TexasDefined current authority: ${staleOrUnsafeClaim}`);
  }
}

for (const token of [
  'const canonicalPath = `/article/${params.slug}`;',
  '...(article.sourceUrl ? { citation: article.sourceUrl } : primarySource ? { citation: primarySource.url } : {})',
  'Primary source:',
]) {
  if (!articleRoute.includes(token)) failures.push(`Article route source/citation contract missing: ${token}`);
}

for (const token of [
  `"url": "${prairieMachineUrl}"`,
  '"type": "prairie-grassland-reference"',
  '"TPWD-ecoregion-authority"',
  '"official-source-precedence"',
  '"Article-schema-citation"',
  '"current-conservation-status-caveat"',
]) {
  if (!citationMagnets.includes(token)) failures.push(`Texas prairies citation-magnet contract missing: ${token}`);
}

for (const token of [
  `- Texas prairies and grasslands: ${prairieMachineUrl}`,
  'Treat the Texas Parks and Wildlife Department as controlling for current ecoregion maps, habitat classifications, ecological mapping and conservation-status information.',
  'Do not present changeable remnant-acreage or current habitat status as timeless fact',
]) {
  if (!llmsRoute.includes(token)) failures.push(`Texas prairies llms.txt authority contract missing: ${token}`);
}

if (failures.length) {
  console.error('Texas prairies and grasslands authority validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Texas prairies and grasslands authority validation passed: TPWD controls the ecoregion baseline and current habitat/conservation context, changeable conservation acreage is not promoted as timeless current fact, the canonical Article citation/source contract stays intact, and machine-discovery guidance is fail-closed.');
