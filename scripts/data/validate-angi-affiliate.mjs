import fs from 'node:fs';

const moduleSource = fs.readFileSync('public/angi-home-services.js', 'utf8');
const rootSource = fs.readFileSync('src/routes/__root.tsx', 'utf8');
const docsSource = fs.readFileSync('docs/angi-affiliate-integration.md', 'utf8');
const errors = [];

for (const [needle, label] of [
  ['/angi-home-services.js', 'root script include'],
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
  const haystack = needle === '/angi-home-services.js' ? rootSource : moduleSource;
  if (!haystack.includes(needle)) errors.push(`Missing ${label}: ${needle}`);
}

for (const [needle, label] of [
  ['No sub-affiliates', 'sub-affiliate restriction'],
  ['No coupons or promotional codes', 'coupon restriction'],
  ['Protected SEM terms include', 'protected SEM governance'],
  ['Exhibit A', 'special-terms governance'],
  ['1-day referral period', 'referral window documentation'],
  ['25% commission rate', 'commission documentation'],
]) {
  if (!docsSource.includes(needle)) errors.push(`Missing ${label}: ${needle}`);
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
