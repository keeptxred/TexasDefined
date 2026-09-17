import fs from 'node:fs';

const tracker = fs.readFileSync('src/lib/affiliate-click.ts', 'utf8');
const citypass = fs.readFileSync('src/components/monetization/CityPassCalloutContent.tsx', 'utf8');
const cityViator = fs.readFileSync('public/city-experience-affiliate.js', 'utf8');
const canonicalViatorLinks = fs.readFileSync('src/data/viator-destination-links.ts', 'utf8');
const root = fs.readFileSync('src/routes/__root.tsx', 'utf8');
const destinationViator = fs.readFileSync('src/components/editorial/DestinationViatorBooking.tsx', 'utf8');
const statewideViator = fs.readFileSync('src/components/editorial/TexasExperienceMarkets.tsx', 'utf8');
const errors = [];

function requireText(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label}: missing ${needle}`);
}

function parseCanonicalMarkets(source) {
  const markets = new Map();
  const entryPattern = /^\s*(?:"([^"]+)"|([a-z][\w-]*)):\s*"https:\/\/www\.viator\.com([^\"]+)",/gm;
  for (const match of source.matchAll(entryPattern)) markets.set(match[1] ?? match[2], match[3]);
  return markets;
}

function parseCityBootstrapMarkets(source) {
  const markets = new Map();
  const entryPattern = /^\s*(?:"([^"]+)"|([a-z][\w-]*)):\s*\["([^"]+)",\s*"([^"]+)"\],/gm;
  for (const match of source.matchAll(entryPattern)) markets.set(match[1] ?? match[2], { name: match[3], path: match[4] });
  return markets;
}

for (const [needle, label] of [
  ['event: "affiliate_click"', 'shared affiliate event'],
  ['affiliate_partner: partner', 'shared partner attribution'],
  ['affiliate_label: label', 'shared label attribution'],
  ['affiliate_placement: placement', 'shared placement attribution'],
  ['page_path: window.location.pathname', 'shared page path attribution'],
  ['texasdefined:affiliate-click', 'first-party affiliate browser event'],
]) requireText(tracker, needle, label);

for (const [needle, label] of [
  ['trackAffiliateClick', 'CityPASS click tracking'],
  ['data-affiliate-partner="citypass"', 'CityPASS partner metadata'],
  ['data-commercial-partner="citypass"', 'CityPASS commercial metadata'],
  ['module: "citypass"', 'CityPASS module attribution'],
  ['sponsored nofollow noopener noreferrer', 'CityPASS relationship attributes'],
  ['Affiliate disclosure: TexasDefined may earn a commission from qualifying CityPASS® purchases', 'CityPASS disclosure'],
]) requireText(citypass, needle, label);

for (const [source, prefix] of [[destinationViator, 'destination Viator'], [statewideViator, 'statewide Viator']]) {
  for (const [needle, label] of [
    ['trackAffiliateClick', `${prefix} click tracking`],
    ['data-affiliate-partner="viator"', `${prefix} partner metadata`],
    ['data-commercial-partner="viator"', `${prefix} commercial metadata`],
    ['module: "experiences"', `${prefix} module attribution`],
    ['sponsored nofollow noopener noreferrer', `${prefix} relationship attributes`],
  ]) requireText(source, needle, label);
}

for (const [needle, label] of [
  ['const market = slug ? markets[slug] : null', 'verified city allowlist gate'],
  ['if (!market)', 'city no-inventory fail-closed gate'],
  ['pid=P00318227&mcid=42383&campaign=texasdefined-city-${slug}', 'city approved Viator affiliate parameters'],
  ['data-affiliate-partner="viator"', 'city affiliate partner metadata'],
  ['data-commercial-partner="viator"', 'city first-party commercial metadata'],
  ['affiliate_module: "city-experiences"', 'city experience module attribution'],
  ['sponsored nofollow noopener noreferrer', 'city relationship attributes'],
  ['Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings', 'city Viator disclosure'],
  ['new MutationObserver(scheduleRender)', 'client-navigation reinsertion support'],
]) requireText(cityViator, needle, label);

const canonicalMarkets = parseCanonicalMarkets(canonicalViatorLinks);
const cityBootstrapMarkets = parseCityBootstrapMarkets(cityViator);
const expectedCityMarkets = new Map([
  ['austin', 'austin'],
  ['fort-worth', 'fort-worth'],
  ['galveston', 'galveston'],
  ['fredericksburg', 'fredericksburg'],
  ['waco', 'waco'],
  ['corpus-christi', 'corpus-christi'],
  ['port-aransas', 'port-aransas'],
  ['south-padre-island', 'south-padre-island'],
  ['el-paso', 'el-paso'],
  ['amarillo', 'amarillo-palo-duro'],
]);

for (const [citySlug, canonicalSlug] of expectedCityMarkets) {
  const canonicalPath = canonicalMarkets.get(canonicalSlug);
  const publicMarket = cityBootstrapMarkets.get(citySlug);
  if (!canonicalPath) {
    errors.push(`Canonical Viator registry is missing required verified market ${canonicalSlug}.`);
    continue;
  }
  if (!publicMarket) {
    errors.push(`City Viator bootstrap is missing verified city market ${citySlug}.`);
    continue;
  }
  if (publicMarket.path !== canonicalPath) {
    errors.push(`City Viator bootstrap path drift for ${citySlug}: expected ${canonicalPath} from canonical registry, found ${publicMarket.path}.`);
  }
}

for (const citySlug of cityBootstrapMarkets.keys()) {
  if (!expectedCityMarkets.has(citySlug)) {
    errors.push(`City Viator bootstrap contains unreviewed market ${citySlug}; add an explicit canonical registry mapping before monetizing it.`);
  }
}

for (const blockedCity of ['dallas', 'houston', 'san-antonio']) {
  if (cityBootstrapMarkets.has(blockedCity)) errors.push(`City Viator bootstrap must not compete with CityPASS market ${blockedCity}.`);
}

requireText(root, '<script src="/city-experience-affiliate.js" defer />', 'bundle-neutral city affiliate bootstrap');
if (root.includes('CityViatorBooking')) errors.push('Root shell must not import the city Viator CTA into the protected React bundle.');
if (cityViator.includes('viator-destination-links') || cityViator.includes('viator-market-match')) {
  errors.push('City Viator bootstrap must remain independent of broader client-side Viator datasets.');
}

if (/window\.location\s*=|window\.location\.href\s*=/.test([tracker, citypass, cityViator, destinationViator, statewideViator].join('\n'))) {
  errors.push('Experience affiliate analytics must not force redirects.');
}

if (errors.length) {
  console.error('Experience affiliate analytics validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Experience affiliate analytics validation passed: CityPASS remains primary in its three Texas city markets; ${cityBootstrapMarkets.size} verified city Viator markets reconcile exactly to the canonical destination-link registry and run from a bundle-neutral public bootstrap with first-party attribution and fail-closed gating; destination and statewide Viator surfaces preserve shared click analytics, disclosure and sponsored/nofollow links without forced redirects.`);
