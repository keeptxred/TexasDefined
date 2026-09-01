import fs from 'node:fs';

const stubs = fs.readFileSync('src/data/fixtures/texas-explained-support-stubs-2.ts', 'utf8');
const articleSource = fs.readFileSync('src/data/fixtures/texas-explained-support-articles-2.ts', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const llms = fs.readFileSync('src/routes/llms[.]txt.ts', 'utf8');
const citationMagnets = JSON.parse(fs.readFileSync('public/citation-magnets.json', 'utf8'));
const failures = [];

const aquiferSource = 'https://www.twdb.texas.gov/groundwater/aquifer/';
const groundwaterSource = 'https://www.twdb.texas.gov/groundwater/';
const aquiferMachineUrl = 'https://texasdefined.com/article/texas-aquifers-springs-explained';

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

for (const token of [
  `- Texas aquifers and springs: ${aquiferMachineUrl}`,
  'Treat the Texas Water Development Board as controlling for statewide aquifer classifications, maps, published groundwater data and statewide water-use reporting.',
  "Preserve the article's 55-percent groundwater figure as a 2020 water-use snapshot rather than a current percentage.",
  'For current local pumping, permit or exemption, spacing and district-management rules, follow the applicable groundwater conservation district, Edwards Aquifer Authority or other responsible current authority.',
  'Do not infer parcel-level well depth, yield, water quality or legal availability from a statewide aquifer map or the evergreen article.',
]) {
  if (!llms.includes(token)) failures.push(`Texas aquifers machine-discovery guidance missing: ${token}`);
}

for (const unsafeMachineClaim of [
  'TexasDefined controls current groundwater permits',
  'TexasDefined controls current pumping rules',
  'groundwater currently supplies about 55 percent',
]) {
  if (llms.toLowerCase().includes(unsafeMachineClaim.toLowerCase())) {
    failures.push(`Texas aquifers machine guidance must not claim current/local authority: ${unsafeMachineClaim}`);
  }
}

const aquiferMagnets = citationMagnets.resources?.filter((resource) => resource.url === aquiferMachineUrl) ?? [];
if (aquiferMagnets.length !== 1) {
  failures.push(`Texas aquifers citation-magnet entry count must be exactly one; found ${aquiferMagnets.length}.`);
} else {
  const aquiferMagnet = aquiferMagnets[0];
  for (const token of [
    'TWDB-aquifer-classification',
    'TWDB-2020-water-use-snapshot',
    'official-source-precedence',
    'Article-schema-citation',
    'local-groundwater-rules-caveat',
    'parcel-specificity-caveat',
  ]) {
    if (!aquiferMagnet.trust?.includes(token)) failures.push(`Texas aquifers citation-magnet trust contract missing: ${token}`);
  }
}

if (failures.length) {
  console.error('Texas aquifers and springs authority validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Texas aquifers and springs authority validation passed: TWDB controls statewide aquifer classification and the dated 2020 water-use snapshot, local/current groundwater rules and parcel claims stay qualified, the canonical Article citation contract stays intact, and both machine-discovery surfaces remain fail-closed.');
