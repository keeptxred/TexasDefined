import fs from 'node:fs';

const stubs = fs.readFileSync('src/data/fixtures/texas-explained-support-stubs-2.ts', 'utf8');
const articleSource = fs.readFileSync('src/data/fixtures/texas-explained-support-articles-2.ts', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const failures = [];

const ecoregionsSource = 'https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions';
const blacklandSource = 'https://tpwd.texas.gov/wildlife/wildlife-diversity/wildscapes/wildscapes-plant-guidance-by-ecoregion/the-blackland-prairies/';

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

if (failures.length) {
  console.error('Texas prairies and grasslands authority validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Texas prairies and grasslands authority validation passed: TPWD controls the ecoregion baseline and official habitat context, changeable conservation acreage is not promoted as timeless current fact, and the canonical Article citation/source contract stays intact.');
