import fs from 'node:fs';
import { search } from '../../src/domain/search/engine.ts';

const readRouteSurface = (file) => {
  const eagerSource = fs.readFileSync(file, 'utf8');
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${fs.readFileSync(lazyFile, 'utf8')}` : eagerSource;
};

const insuranceRoute = readRouteSurface('src/routes/texas-home-insurance-calculator.tsx');
const salaryRoute = readRouteSurface('src/routes/texas-salary-calculator.tsx');
const mortgageRoute = readRouteSurface('src/routes/texas-mortgage-calculator.tsx');
const costOfLivingRoute = readRouteSurface('src/routes/texas-cost-of-living-calculator.tsx');
const citiesRoute = readRouteSurface('src/routes/browse.cities.tsx');
const countyPropertyTaxRoute = fs.readFileSync('src/routes/property-tax.county.$county.tsx', 'utf8');
const countyPropertyTaxTemplate = fs.readFileSync('src/components/property/CountyPropertyTaxTemplate.tsx', 'utf8');
const disabledVeteranRoute = fs.readFileSync('src/routes/learn.disabled-veteran-property-tax-benefits.tsx', 'utf8');
const helocRankingArticle = fs.readFileSync('src/data/fixtures/finance-heloc-depth.ts', 'utf8');
const migratedEditorialLoader = fs.readFileSync('src/data/fixtures/lazy-migrated-editorial.ts', 'utf8');
const calculators = fs.readFileSync('src/components/calculators/TexasPlanningCalculators.tsx', 'utf8');
const entityRoute = readRouteSurface('src/routes/$kind.$slug.tsx');
const entityRegistry = fs.readFileSync('src/data/texas-entity-registry.ts', 'utf8');
const knowledgeGraph = fs.readFileSync('src/data/knowledge-graph/index.ts', 'utf8');
const localGovernment = fs.readFileSync('src/data/local-government-profile.ts', 'utf8');
const serverRoute = fs.readFileSync('src/server.ts', 'utf8');
const countySeries = fs.readFileSync('src/data/county-series-profiles.ts', 'utf8');
const queriesSource = fs.readFileSync('src/data/queries.ts', 'utf8');
const failures = [];

for (const required of [
  "title: 'Texas Home Insurance Cost Calculator'",
  'title="Texas home insurance cost calculator"',
  'Estimate Texas homeowners insurance cost from replacement cost',
  'does not require your name, email address, phone number, or street address',
  'No quote form required',
  'Homeowners insurance calculator without personal information',
  'does not ask for your name, email address, phone number, street address, date of birth, or other contact details',
  'This is a self-service planning estimate rather than an insurer quote.',
  'The result is a planning estimate only.',
  'Percentage deductible math',
  'a 2% deductible applied to a $400,000 dwelling limit equals $8,000',
]) {
  if (!insuranceRoute.includes(required)) failures.push(`Home-insurance search intent contract missing: ${required}`);
}

const insuranceCalculatorMount = insuranceRoute.indexOf('<HomeInsuranceCalculator />');
const insurancePrivateIntent = insuranceRoute.indexOf('Homeowners insurance calculator without personal information');
if (insuranceCalculatorMount < 0 || insurancePrivateIntent < insuranceCalculatorMount) {
  failures.push('Home-insurance no-personal-information intent must remain visible after the calculator itself.');
}

const insuranceCalculator = calculators.split('export function HomeInsuranceCalculator()')[1] ?? '';
if (!insuranceCalculator) failures.push('HomeInsuranceCalculator implementation is missing.');
for (const prohibited of ['label="Name"', 'label="Email"', 'label="Phone"', 'label="Street address"', 'label="Date of birth"']) {
  if (insuranceCalculator.includes(prohibited)) failures.push(`Home insurance no-personal-information promise is no longer true: found ${prohibited}.`);
}
for (const required of ['Replacement cost', 'Estimated base rate', 'Wind/flood additions', 'Deductible/discount credit']) {
  if (!insuranceCalculator.includes(required)) failures.push(`Home insurance planning input missing: ${required}`);
}

for (const required of [
  "title: 'Texas Paycheck Calculator | Take-Home Pay'",
  'title="Texas paycheck and salary calculator"',
  'Estimate after-tax income and take-home pay in Texas',
  'Texas does not have an individual state income tax',
  'Gross-pay examples before taxes, benefits or other deductions.',
  '24 semimonthly checks and 26 biweekly checks',
  'an $80,000 annual salary is about $3,076.92 gross every two weeks',
  'https://www.irs.gov/individuals/tax-withholding-estimator',
  'https://www.ssa.gov/oact/progdata/taxRates.html',
]) {
  if (!salaryRoute.includes(required)) failures.push(`Texas paycheck ranking contract missing: ${required}`);
}

for (const required of [
  "title: 'Texas Mortgage Calculator | Taxes & Insurance'",
  'title="Texas mortgage payment calculator with taxes and insurance"',
  'What a Texas mortgage payment can look like with taxes and insurance',
  '$2,940 per month',
  'Load official Texas property-tax rates',
  'https://www.consumerfinance.gov/owning-a-home/loan-estimate/',
]) {
  if (!mortgageRoute.includes(required)) failures.push(`Texas mortgage ranking contract missing: ${required}`);
}

for (const required of [
  'title: "Texas HELOC and Home Equity Loan Rules"',
  'Are HELOCs allowed in Texas?',
  "Texas's 80% rule is a combined-lien ceiling",
  'Simplified remaining room: $100,000',
  'https://statutes.capitol.texas.gov/Docs/CN/htm/CN.16.htm#50',
  'https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-home-equity-loan-and-a-home-equity-line-of-credit-heloc-en-247/',
]) {
  if (!helocRankingArticle.includes(required)) failures.push(`Texas HELOC ranking contract missing: ${required}`);
}
for (const required of [
  'const HELOC_RANKING_DEPTH_SLUG = "texas-home-equity-heloc-guide";',
  'await import("./finance-heloc-depth")',
  'return texasHelocRulesArticle;',
]) {
  if (!migratedEditorialLoader.includes(required)) failures.push(`Texas HELOC lazy-routing contract missing: ${required}`);
}

for (const required of [
  "title: 'Texas Cost of Living Calculator | Compare Household Budgets'",
  'title="Texas cost of living calculator"',
  'Compare a current household budget with a possible Texas destination',
  'move or job decision',
]) {
  if (!costOfLivingRoute.includes(required)) failures.push(`Cost-of-living search intent contract missing: ${required}`);
}

for (const required of [
  'title: "Texas Cities & Towns Directory | Browse by County & Region"',
  'Browse Texas cities and towns by county and region',
  'title="How to use the Texas city directory"',
]) {
  if (!citiesRoute.includes(required)) failures.push(`Texas cities directory CTR contract missing: ${required}`);
}

for (const required of [
  'const title = `${county.name} Appraisal District & Property Tax`;',
  'appraisal district and property-tax guide with official property search, exemptions, protests, payment resources, tax rates and verified local links',
  "robots: indexReady ? undefined : 'noindex, follow'",
  'headline: title',
]) {
  if (!countyPropertyTaxRoute.includes(required)) failures.push(`County property-tax CTR contract missing: ${required}`);
}

for (const required of [
  '{county.name} appraisal district & property taxes',
  'Official appraisal-district resources plus a practical county-level guide',
]) {
  if (!countyPropertyTaxTemplate.includes(required)) failures.push(`County appraisal-intent heading contract missing: ${required}`);
}

for (const required of [
  "const pageTitle = 'Texas Disabled Veteran Property Tax Exemption';",
  "const heading = 'Texas disabled veteran property tax exemptions: 2026 guide';",
  '10%–29% service-connected disability: up to $5,000 of property value exempted.',
  '70%–100%: up to $12,000 of property value exempted.',
  'Tax Code Section 11.131 provides an exemption of the total appraised value of the residence homestead',
  'Form 50-135 is the Texas Comptroller application',
  "dateModified: '2026-08-25'",
  'https://comptroller.texas.gov/taxes/property-tax/exemptions/disabledvet-faq.php',
]) {
  if (!disabledVeteranRoute.includes(required)) failures.push(`Disabled-veteran ranking contract missing: ${required}`);
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

for (const required of [
  'const countySlug = countySlugForLegacyArticle(decodeURIComponent(match[1]));',
  'url.pathname = `/county/${countySlug}`;',
  'return Response.redirect(url.toString(), 301);',
]) {
  if (!serverRoute.includes(required)) failures.push(`Legacy county URL consolidation missing: ${required}`);
}
if (!countySeries.includes('profile("brewster", "brewster-county-big-bend-texas"')) {
  failures.push('Brewster legacy article must remain mapped to the canonical /county/brewster guide.');
}

const texasExplainedBlock = queriesSource.match(/id: "collection:texas-explained",[\s\S]*?href: "\/texas-explained",\n  },/)?.[0] ?? '';
const texasExplainedTitle = texasExplainedBlock.match(/title: "([^"]+)"/)?.[1] ?? '';
const texasExplainedSummary = texasExplainedBlock.match(/summary: "([^"]+)"/)?.[1] ?? '';
const texasExplainedKeywordsSource = texasExplainedBlock.match(/keywords: \[([^\]]+)\]/)?.[1] ?? '';
const texasExplainedKeywords = [...texasExplainedKeywordsSource.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
const texasExplainedDocument = {
  id: 'collection:texas-explained',
  brandId: 'texasdefined',
  kind: 'collection',
  title: texasExplainedTitle,
  summary: texasExplainedSummary,
  keywords: texasExplainedKeywords,
  href: '/texas-explained',
};

if (!texasExplainedTitle || !texasExplainedSummary || texasExplainedKeywords.length < 10) {
  failures.push('Texas Explained production search document could not be parsed for behavioral scoring.');
} else {
  for (const [term, minimumScore] of [
    ['why Texas', 12],
    ['Texas regions', 12],
    ['Texas counties', 12],
    ['Texas wildlife', 12],
    ['buying land', 8],
  ]) {
    const hit = search([texasExplainedDocument], { term, brandId: 'texasdefined', limit: 1 })[0];
    if (!hit || hit.document.href !== '/texas-explained' || hit.score < minimumScore) {
      failures.push(`Texas Explained search scoring is too weak for “${term}”: expected >= ${minimumScore}, got ${hit?.score ?? 0}.`);
    }
  }
}

if (failures.length) {
  console.error('Search-intent and SERP CTR validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Search-intent and SERP CTR validation passed: impression-bearing calculators, home-insurance no-personal-information intent, Phase 3 finance ranking depth, disabled-veteran guidance, city discovery, county property-tax pages, legacy county redirects, appraisal-district queries, agency snippets, Texas Explained behavioral search scoring, independent framing, and publication-quality gates are protected.');