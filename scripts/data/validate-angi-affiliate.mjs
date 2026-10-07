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
  ['td-angi-home-services-script', 'idempotent script id'],
  ['document.getElementById(scriptId)', 'duplicate-script prevention'],
  ['eligibleRoute', 'eligible-route gate'],
  ['article|guides|texas-living|moving-to-texas|real-estate|home-garden|property-tax-guides', 'governed route families'],
  ['window.addEventListener("popstate", scheduleAngiLoad)', 'SPA navigation handling'],
  ['new MutationObserver(scheduleAngiLoad)', 'SPA DOM synchronization'],
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
  ['roof (?:replacement|repair|installation|installer|installers|inspection|inspector|inspectors|contractor|contractors|company|companies|cost|costs)', 'roofing service-intent fallback'],
  ['landscaping (?:company|companies|contractor|contractors|service|services|installation|design|cost|costs)', 'landscaping service-intent fallback'],
  ['pageServiceOverrides', 'exact-path service overrides'],
  ['["/article/texas-roofs-hail-wind-heat", "roofing"]', 'roofing guide override'],
  ['["/article/texas-foundation-care-clay-soil-drought", "foundation"]', 'foundation guide override'],
  ['["/article/texas-household-pests-guide", "pest-control"]', 'household-pests override'],
  ['["/article/texas-pool-owner-guide", "pools"]', 'pool-owner override'],
  ['["/article/texas-home-maintenance-calendar", "handyman"]', 'home-maintenance override'],
  ['["/article/texas-native-garden-that-survives-august", "landscaping"]', 'native-garden landscaping override'],
  ['["/article/best-native-plants-texas-yard", "landscaping"]', 'native-plants landscaping override'],
  ['["/article/texas-homeowner-field-manual", null]', 'multi-system homeowner-guide opt-out'],
  ['["/article/true-cost-of-owning-a-home-in-texas", null]', 'multi-system ownership-cost opt-out'],
  ['["/article/texas-wildfire-home-protection-guide", null]', 'wildfire landscaping false-positive opt-out'],
  ['["/article/texas-home-architecture-regions", null]', 'residential-landscape false-positive opt-out'],
  ['["/article/corporate-relocation-to-texas", null]', 'employer relocation false-positive opt-out'],
  ['["/article/health-insurance-when-moving-to-texas", null]', 'health-insurance relocation false-positive opt-out'],
  ['["/article/texas-vs-florida-differences", null]', 'state-comparison relocation false-positive opt-out'],
  ['["/moving-to-texas/data", null]', 'relocation data-center false-positive opt-out'],
  ['["/moving-to-texas/tools", null]', 'relocation toolkit false-positive opt-out'],
  ['pageServiceOverrides.has(normalizedPathname)', 'override precedence'],
  ['chooseService(pageSignal(), pathname)', 'pathname-aware service selection'],
]) {
  const loaderNeedles = new Set([
    '/angi-home-services.js',
    'document.createElement("script")',
    'td-angi-home-services-script',
    'document.getElementById(scriptId)',
    'eligibleRoute',
    'article|guides|texas-living|moving-to-texas|real-estate|home-garden|property-tax-guides',
    'window.addEventListener("popstate", scheduleAngiLoad)',
    'new MutationObserver(scheduleAngiLoad)',
  ]);
  const haystack = loaderNeedles.has(needle) ? loaderSource : moduleSource;
  if (!haystack.includes(needle)) errors.push(`Missing ${label}: ${needle}`);
}

if (rootSource.includes('/angi-home-services.js')) {
  errors.push('Angi must remain client-bootstrapped and must not be emitted directly from the SSR root shell.');
}
if (moduleSource.includes('roof(?:ing| replacement| repair|er|ers)?')) {
  errors.push('Roofing fallback must not match a bare singular roof token; use service-intent phrases plus audited exact overrides.');
}
if (moduleSource.includes('landscap(?:e|er|ers|ing)')) {
  errors.push('Landscaping fallback must not match generic landscape language; use service-intent phrases plus audited exact overrides.');
}

for (const [needle, label] of [
  ['No sub-affiliates', 'sub-affiliate restriction'],
  ['No coupons or promotional codes', 'coupon restriction'],
  ['Protected SEM terms include', 'protected SEM governance'],
  ['Exhibit A', 'special-terms governance'],
  ['1-day referral period', 'referral window documentation'],
  ['25% commission rate', 'commission documentation'],
  ['Production safeguards', 'production-safeguards documentation'],
  ['route-gated', 'route-gated bootstrap documentation'],
  ['exact-path overrides', 'exact-path override documentation'],
  ['service-intent fallbacks', 'service-intent fallback documentation'],
  ['bare `roof`', 'bare-roof false-positive documentation'],
  ['geographic `landscape`', 'geographic-landscape false-positive documentation'],
  ['explicit opt-outs', 'multi-system opt-out documentation'],
  ['texas-wildfire-home-protection-guide', 'wildfire false-positive documentation'],
  ['texas-home-architecture-regions', 'architecture false-positive documentation'],
  ['corporate-relocation-to-texas', 'corporate relocation false-positive documentation'],
  ['health-insurance-when-moving-to-texas', 'health-insurance relocation false-positive documentation'],
  ['texas-vs-florida-differences', 'state-comparison relocation false-positive documentation'],
  ['moving-to-texas/data', 'relocation data-center false-positive documentation'],
  ['moving-to-texas/tools', 'relocation toolkit false-positive documentation'],
]) {
  if (!docsSource.includes(needle)) errors.push(`Missing ${label}: ${needle}`);
}

for (const [needle, label] of [
  ['/article/texas-roofs-hail-wind-heat', 'representative production route'],
  ['/city-experience-affiliate.js', 'deployed client loader check'],
  ['/angi-home-services.js', 'deployed Angi asset check'],
  ['eligibleRoute', 'production route-gate check'],
  ['pageServiceOverrides', 'production override check'],
  ['/article/texas-roofs-hail-wind-heat', 'production roofing override check'],
  ['/article/texas-native-garden-that-survives-august', 'production native-garden override check'],
  ['/article/best-native-plants-texas-yard', 'production native-plants override check'],
  ['/article/texas-foundation-care-clay-soil-drought', 'production foundation override check'],
  ['/article/texas-household-pests-guide', 'production pests override check'],
  ['/article/texas-pool-owner-guide', 'production pool override check'],
  ['/article/texas-home-maintenance-calendar', 'production maintenance override check'],
  ['/article/texas-homeowner-field-manual', 'production multi-system opt-out check'],
  ['/article/texas-wildfire-home-protection-guide', 'production wildfire false-positive opt-out check'],
  ['/article/texas-home-architecture-regions', 'production architecture false-positive opt-out check'],
  ['/article/corporate-relocation-to-texas', 'production corporate relocation opt-out check'],
  ['/article/health-insurance-when-moving-to-texas', 'production health-insurance relocation opt-out check'],
  ['/article/texas-vs-florida-differences', 'production state-comparison relocation opt-out check'],
  ['/moving-to-texas/data', 'production relocation data-center opt-out check'],
  ['/moving-to-texas/tools', 'production relocation toolkit opt-out check'],
  ['roof(?:ing| replacement| repair|er|ers)?', 'production bare-roof rejection check'],
  ['landscap(?:e|er|ers|ing)', 'production generic-landscape rejection check'],
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