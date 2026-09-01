import fs from 'node:fs';

const stubs = fs.readFileSync('src/data/fixtures/texas-explained-support-stubs-2.ts', 'utf8');
const articleSource = fs.readFileSync('src/data/fixtures/texas-explained-support-articles-2.ts', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const failures = [];

const aquiferSource = 'https://www.twdb.texas.gov/groundwater/aquifer/';
const groundwaterSource = 'https://www.twdb.texas.gov/groundwater/';

const aquiferStubMatch = stubs.match(/export const texasAquifersSpringsGuideStub:[\s\S]*?export const texasPrairiesGrasslandsGuideStub:/);
const aquiferStub = aquiferStubMatch?.[0] ?? '';

for (const token of [
  'slug: "texas-aquifers-springs-explained"',
  'sourceName: "Texas Water Development Board"',
  `sourceUrl: "${aquiferSource}"`,
]) {
  if (!aquiferStub.includes(token)) failures.push(`Texas aquifers stub authority contract missing: ${token}`);
}

const aquiferArticleMatch = articleSource.match(/export const texasAquifersSpringsGuideArticle:[\s\S]*?export const texasPrairiesGrasslandsGuideArticle:/);
const aquiferArticle = aquiferArticleMatch?.[0] ?? '';

for (const token of [
  'slug: "texas-aquifers-springs-explained"',
  'sourceName: "Texas Water Development Board"',
  `sourceUrl: "${aquiferSource}"`,
  `href: "${aquiferSource}"`,
  `href: "${groundwaterSource}"`,
  'The Texas Water Development Board recognizes nine major and 22 minor aquifers',
  "TWDB's 2020 water-use accounting found that groundwater supplied about 55 percent of the water used in Texas.",
  'Groundwater conservation districts may regulate certain wells and pumping in their jurisdictions, so proposed uses should be checked locally.',
  'bring in a qualified local professional rather than converting a statewide map into a parcel-level guarantee.',
]) {
  if (!aquiferArticle.includes(token)) failures.push(`Texas aquifers article authority contract missing: ${token}`);
}

for (const staleOrUnsafeClaim of [
  'groundwater currently supplies about 55 percent',
  'groundwater supplies about 55 percent of the water used in Texas today',
  'a mapped aquifer guarantees',
]) {
  if (aquiferArticle.toLowerCase().includes(staleOrUnsafeClaim.toLowerCase())) {
    failures.push(`Texas aquifers article must not present dated or parcel-specific information as current certainty: ${staleOrUnsafeClaim}`);
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
  console.error('Texas aquifers and springs authority validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Texas aquifers and springs authority validation passed: TWDB controls statewide aquifer classification and the dated 2020 water-use snapshot, parcel claims stay qualified, local groundwater rules remain local/current-source questions, and the canonical Article citation contract stays intact.');
