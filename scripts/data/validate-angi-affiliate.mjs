import fs from 'node:fs';

const moduleSource = fs.readFileSync('public/angi-home-services.js', 'utf8');
const loaderSource = fs.readFileSync('public/city-experience-affiliate.js', 'utf8');
const rootSource = fs.readFileSync('src/routes/__root.tsx', 'utf8');
const docsSource = fs.readFileSync('docs/angi-affiliate-integration.md', 'utf8');
const productionSource = fs.readFileSync('scripts/ci/verify-angi-production.mjs', 'utf8');
const productionWorkflow = fs.readFileSync('.github/workflows/verify-angi-production.yml', 'utf8');
const errors = [];

for (const [needle, label] of [
  ['/angi-home-services.js', 'client-side Angi script bootstrap'],
  ['document.createElement("script")', 'client-side script creation'],
  ['data-affiliate-partner="angi"', 'affiliate partner attribution'],
  ['data-commercial-partner="angi"', 'first-party commercial attribution'],
  ['sponsored nofollow noopener noreferrer', 'affiliate rel attributes'],
  ['affiliate_click', 'shared affiliate click event'],
  ['affiliate_module: "home-services"', 'home-services module attribution'],
  ['qualifying service request', 'service-request disclosure'],
  ['does not select, employ or endorse individual service providers', 'provider disclaimer'],
  ['category/12061/', 'roofing deep link'],
  ['category/12002/', 'HVAC deep link'],
  ['category/12058/', 'plumbing deep link'],
  ['category/12050/', 'moving deep link'],
  ['category/12033/', 'foundation deep link'],
  ['category/12001/', 'remodeling deep link'],
  ['category/12070/', 'pool deep link'],
]) {
  const haystack = needle === '/angi-home-services.js' || needle === 'document.createElement("script")'
    ? loaderSource
    : moduleSource;
  if (!haystack.includes(needle)) errors.push(`Missing ${label}: ${needle}`);
}

if (rootSource.includes('/angi-home-services.js')) {
  errors.push('Angi must remain client-bootstrapped and must not be emitted directly from the SSR root shell.');
}

for (const [needle, label] of [
  ['No sub-affiliates', 'sub-affiliate restriction'],
  ['No coupons or promotional codes', 'coupon restriction'],
  ['Protected SEM terms include', 'protected SEM governance'],
  ['Exhibit A', 'special-terms governance'],
  ['1-day referral period', 'referral window documentation'],
  ['25% commission rate', 'commission documentation'],
  ['Production safeguards', 'production-safeguards documentation'],
]) {
  if (!docsSource.includes(needle)) errors.push(`Missing ${label}: ${needle}`);
}

for (const [needle, label] of [
  ['/article/texas-roofs-hail-wind-heat', 'representative production route'],
  ['/city-experience-affiliate.js', 'deployed client loader check'],
  ['/angi-home-services.js', 'deployed Angi asset check'],
  ['cf-mitigated', 'Cloudflare challenge detection'],
  ['TexasDefined-CI-Angi-Smoke/1.0', 'Angi production smoke user agent'],
  ['aid=157319271', 'production CJ AID check'],
  ['category/12061/', 'production roofing deep-link check'],
  ['sponsored nofollow noopener noreferrer', 'production sponsored-link check'],
]) {
  if (!productionSource.includes(needle)) errors.push(`Missing ${label}: ${needle}`);
}

for (const [needle, label] of [
  ['workflow_run:', 'post-deploy workflow trigger'],
  ['Deploy TexasDefined production', 'production deployment dependency'],
  ["github.event.workflow_run.conclusion == 'success'", 'successful-deploy guard'],
  ['node scripts/ci/verify-angi-production.mjs', 'Angi production verifier execution'],
]) {
  if (!productionWorkflow.includes(needle)) errors.push(`Missing ${label}: ${needle}`);
}

if (!moduleSource.includes('aid=157319271')) errors.push('Angi CJ AID is missing from governed links.');
if (!moduleSource.includes('m=comjuncaffnet')) errors.push('Angi CJ network parameter is missing from governed links.');
if (/coupon|promo code/i.test(moduleSource)) errors.push('Onsite Angi module must not promote coupons or promo codes.');

if (errors.length) {
  console.error('Angi affiliate validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Angi affiliate validation passed.');
