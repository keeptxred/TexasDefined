import fs from 'node:fs';

const insuranceRoute = fs.readFileSync('src/routes/texas-home-insurance-calculator.tsx', 'utf8');
const calculators = fs.readFileSync('src/components/calculators/TexasPlanningCalculators.tsx', 'utf8');
const entityRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');
const entityRegistry = fs.readFileSync('src/data/texas-entity-registry.ts', 'utf8');
const knowledgeGraph = fs.readFileSync('src/data/knowledge-graph/index.ts', 'utf8');
const localGovernment = fs.readFileSync('src/data/local-government-profile.ts', 'utf8');
const failures = [];

for (const required of [
  "title: 'Texas Homeowners Insurance Estimate Calculator'",
  'title="Texas homeowners insurance estimate calculator"',
  'without entering personal information',
  'does not require your name, email address, phone number, or street address',
  'The result is a planning estimate only.',
]) {
  if (!insuranceRoute.includes(required)) failures.push(`Home-insurance search intent contract missing: ${required}`);
}

const insuranceCalculator = calculators.split('export function HomeInsuranceCalculator()')[1] ?? '';
if (!insuranceCalculator) failures.push('HomeInsuranceCalculator implementation is missing.');
for (const prohibited of ['label="Name"', 'label="Email"', 'label="Phone"', 'label="Street address"']) {
  if (insuranceCalculator.includes(prohibited)) failures.push(`Home insurance no-personal-information promise is no longer true: found ${prohibited}.`);
}
for (const required of ['Replacement cost', 'Estimated base rate', 'Wind/flood additions', 'Deductible/discount credit']) {
  if (!insuranceCalculator.includes(required)) failures.push(`Home insurance planning input missing: ${required}`);
}

for (const required of [
  'title: searchIntentTitle(loaderData.entity)',
  'description = searchSnippetDescription(loaderData.entity)',
  "if (entity.kind === 'appraisal-district' && entity.countySlug) return `${title(entity.countySlug)} County Appraisal District`;",
  "if (entity.kind === 'agency') return `${entity.name}: Services`;",
  "if (entity.kind === 'agency') {",
  "const officialCopy = entity.officialUrl ? ' and a verified link to its official Texas website' : '';",
  'Independent Texas Defined reference.',
  'property search, appraisal records, exemptions and protests',
  "const officialCopy = entity.officialUrl ? ', plus a verified link to the official district website' : '';",
  "agency: 'Texas State Agency'",
  "if (kind === 'agency') return 'Official agency website';",
  "if (kind === 'agency') return 'GovernmentOrganization';",
]) {
  if (!entityRoute.includes(required)) failures.push(`Entity SERP intent contract missing: ${required}`);
}

if (!entityRoute.includes("robots: indexable ? undefined : 'noindex, follow, max-image-preview:large'")) {
  failures.push('Search-intent changes must preserve the generated entity indexability gate.');
}

for (const agency of [
  'agency:texas-comptroller',
  'agency:texas-commission-environmental-quality',
  'agency:texas-department-insurance',
  'agency:texas-dmv',
  'agency:texas-education-agency',
]) {
  if (!entityRegistry.includes(agency)) failures.push(`Known impression-bearing agency entity missing: ${agency}`);
}
if (!entityRegistry.includes("sourceConfidence:'official'")) failures.push('Agency registry must retain official-source confidence.');
if (!entityRegistry.includes('officialUrl:')) failures.push('Agency registry must retain official website URLs.');

for (const required of [
  'const readyForPublication = hasVerifiedWebsite && hasUsefulContact && description.length >= 180;',
  "status: readyForPublication ? 'active' : entity.status",
]) {
  if (!knowledgeGraph.includes(required)) failures.push(`Local-office publication gate missing: ${required}`);
}
for (const required of [
  'County Appraisal District, also commonly searched as',
  'property search and appraisal records',
  'The contact information is checked against the Texas Comptroller local property-tax directory.',
]) {
  if (!localGovernment.includes(required)) failures.push(`Appraisal-district intent/source contract missing: ${required}`);
}

if (failures.length) {
  console.error('Search-intent and SERP CTR validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Search-intent and SERP CTR validation passed: insurance estimates, appraisal-district queries, agency snippets, independent framing, and publication-quality gates are protected.');
