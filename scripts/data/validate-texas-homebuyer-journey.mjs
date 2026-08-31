import fs from 'node:fs';

const route = fs.readFileSync('src/routes/buying-a-home-in-texas.tsx', 'utf8');
const lazyRoute = fs.readFileSync('src/routes/buying-a-home-in-texas.lazy.tsx', 'utf8');
const data = fs.readFileSync('src/data/texas-homebuyer-journey.ts', 'utf8');
const server = fs.readFileSync('src/data/texas-homebuyer-journey.server.ts', 'utf8');
const serverFn = fs.readFileSync('src/data/texas-homebuyer-journey.functions.ts', 'utf8');
const publicRoutes = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const propertyHub = fs.readFileSync('src/routes/property.tsx', 'utf8');
const firstTime = fs.readFileSync('src/routes/texas-first-time-homebuyer-programs.tsx', 'utf8');
const downPayment = fs.readFileSync('src/routes/texas-down-payment-calculator.lazy.tsx', 'utf8');
const closingCosts = fs.readFileSync('src/routes/texas-closing-cost-calculator.lazy.tsx', 'utf8');
const assistance = fs.readFileSync('src/routes/texas-down-payment-assistance-calculator.lazy.tsx', 'utf8');

const failures = [];
const path = '/buying-a-home-in-texas';

for (const marker of [
  "createFileRoute('/buying-a-home-in-texas')",
  'const canonicalPath =',
  'title:',
  'description:',
  'getTexasHomebuyerJourney',
  'head: ({ loaderData })',
]) {
  if (!route.includes(marker)) failures.push(`Texas homebuyer route missing ${marker}`);
}

for (const marker of [
  "createLazyFileRoute('/buying-a-home-in-texas')",
  'TEXAS_HOMEBUYER_TOOLS.map',
  'TEXAS_HOMEBUYER_STEPS.map',
  'TEXAS_HOMEBUYER_CITY_PATHS.map',
  'TEXAS_HOMEBUYER_SOURCES.map',
  'TEXAS_HOMEBUYER_FAQS.map',
  'Cash to close',
  'Monthly ownership',
  'Replace estimates with primary sources',
  'This guide organizes the research; it does not replace those documents or professional advice.',
]) {
  if (!lazyRoute.includes(marker)) failures.push(`Texas homebuyer UI missing ${marker}`);
}

for (const marker of [
  "TEXAS_HOMEBUYER_PATH = '/buying-a-home-in-texas'",
  'TEXAS_HOMEBUYER_STEPS',
  'TEXAS_HOMEBUYER_TOOLS',
  'TEXAS_HOMEBUYER_CITY_PATHS',
  'TEXAS_HOMEBUYER_SOURCES',
  'TEXAS_HOMEBUYER_FAQS',
  'Consumer Financial Protection Bureau',
  'Texas Department of Housing and Community Affairs',
  'Texas Comptroller',
  'Texas Department of Insurance',
  'HUD — Buying a Home',
]) {
  if (!data.includes(marker)) failures.push(`Texas homebuyer data contract missing ${marker}`);
}

const stepBlock = data.match(/export const TEXAS_HOMEBUYER_STEPS = \[([\s\S]*?)\] as const;/)?.[1] ?? '';
const stepCount = [...stepBlock.matchAll(/^\s*\['[^\n]+', '[^\n]+'\],$/gm)].length;
if (stepCount !== 9) failures.push(`Texas homebuyer journey must preserve exactly nine explicit purchase-planning steps; found ${stepCount}.`);

const cityPaths = [
  '/texas-home-affordability-calculator/houston',
  '/texas-home-affordability-calculator/austin',
  '/texas-home-affordability-calculator/dallas',
  '/texas-home-affordability-calculator/fort-worth',
  '/texas-home-affordability-calculator/san-antonio',
  '/texas-home-affordability-calculator/frisco',
  '/texas-home-affordability-calculator/el-paso',
];
for (const cityPath of cityPaths) if (!data.includes(cityPath)) failures.push(`Texas homebuyer city discovery missing ${cityPath}`);

for (const marker of [
  "'@type': 'HowTo'",
  "'@type': 'FAQPage'",
  "'@type': 'BreadcrumbList'",
  'canonicalLink(texasDefinedBrand, TEXAS_HOMEBUYER_PATH)',
  'buildMeta(texasDefinedBrand',
  'TEXAS_HOMEBUYER_STEPS.map',
  'TEXAS_HOMEBUYER_FAQS.map',
]) {
  if (!server.includes(marker)) failures.push(`Texas homebuyer server SEO missing ${marker}`);
}
for (const marker of ['createServerFn', "import('./texas-homebuyer-journey.server')"]) {
  if (!serverFn.includes(marker)) failures.push(`Texas homebuyer server boundary missing ${marker}`);
}

if (!publicRoutes.includes(`"${path}"`)) failures.push('Texas homebuyer journey must remain classified as an indexable public route.');

for (const [file, source] of [
  ['property hub', propertyHub],
  ['first-time homebuyer guide', firstTime],
  ['down-payment calculator', downPayment],
  ['closing-cost calculator', closingCosts],
  ['down-payment assistance calculator', assistance],
]) {
  if (!source.includes(path)) failures.push(`${file} must link directly to ${path}.`);
}

for (const marker of [
  'Texas First-Time Homebuyer Programs & Down-Payment Help',
  'Texas first-time homebuyer programs & down-payment help',
  'Texas Department of Housing and Community Affairs homebuyer programs',
  'CFPB Owning a Home tools',
]) {
  if (!firstTime.includes(marker)) failures.push(`First-time buyer exact-intent/source layer missing ${marker}`);
}

const forbidden = [
  "'@type': 'FinancialProduct'",
  "'@type': 'Offer'",
  'current mortgage rate is',
  'average Texas home price is',
  'average Houston home price is',
  'guaranteed approval',
];
for (const phrase of forbidden) {
  if (data.includes(phrase) || server.includes(phrase) || lazyRoute.includes(phrase)) failures.push(`Texas homebuyer journey contains prohibited unsupported claim/schema: ${phrase}`);
}

if (failures.length) {
  console.error('Texas homebuyer journey validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas homebuyer journey validation passed with ${stepCount} purchase-planning steps, ${cityPaths.length} local affordability entry points, primary-source research links, server-built schema, and reciprocal cash-to-close discovery.`);
