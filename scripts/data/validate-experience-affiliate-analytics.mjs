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
  ['module: "citypass"', 'CityPASS module attribution'],
  ['sponsored nofollow noopener noreferrer', 'CityPASS relationship attributes'],
  ['Affiliate disclosure: TexasDefined may earn a commission from qualifying CityPASS® purchases', 'CityPASS disclosure'],
]) requireText(citypass, needle, label);

// This connection is paused while its three approved 7eer tracking redirects
// consistently return HTTP 404. Direct official links MUST NOT claim commission
// or emit affiliate analytics, even though historical approved IDs are retained.
for (const [needle, label] of [
  ['CITYPASS_AFFILIATE_LINKS_ENABLED ? "citypass" : undefined', 'Conditional CityPASS partner/commercial metadata'],
  ['CITYPASS_AFFILIATE_LINKS_ENABLED ? () => trackAffiliateClick(', 'Conditional CityPASS click analytics'],
  ['CITYPASS_AFFILIATE_LINKS_ENABLED ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"', 'Conditional CityPASS sponsored link relationship'],
  ['does not earn an affiliate commission from this fallback link', 'Truthful fallback disclosure'],
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

// Waco attribution and indexed contextual discovery are separate from paid
// tickets. The seven overview URLs must never be promoted as admission.
const wacoIndex = fs.readFileSync('src/data/waco-viator-attraction-links.ts', 'utf8');
const wacoOffer = fs.readFileSync('src/components/monetization/WacoDestinationOffer.tsx', 'utf8');
const wacoMagnolia = fs.readFileSync('src/components/monetization/WacoMagnoliaCrosslinks.tsx', 'utf8');
const magnolia = fs.readFileSync('src/components/monetization/MagnoliaWacoAffiliateLinks.tsx', 'utf8');
const curatedPairings = fs.readFileSync('src/data/destination-curated-pairings.ts', 'utf8');
const stadium = fs.readFileSync('src/data/sports-venue-guide-wave4.ts', 'utf8');
const stadiumComponent = fs.readFileSync('src/components/sports/SportsVenueGuidePage.tsx', 'utf8');
for (const slug of [
  'dr-pepper-museum-waco', 'cottonland-castle', 'waco-suspension-bridge',
  'cameron-park-waco', 'cameron-park-zoo',
  'texas-ranger-hall-of-fame-museum-waco', 'mclane-stadium',
]) requireText(wacoIndex, `slug: "${slug}"`, 'seven distinct Waco attraction overview routes');
for (const [source, needle, label] of [
  [wacoOffer, 'wacoViatorAttractionForSlug(slug)', 'attraction-specific Waco overview registry'],
  [wacoOffer, 'not an entry ticket', 'admission/ticket non-equivalence'],
  [wacoOffer, 'buildViatorAffiliateUrl(attraction.viatorUrl, placement)', 'Waco tracked overview link'],
  [wacoOffer, 'rel="sponsored nofollow noopener noreferrer"', 'Waco sponsored relationship'],
  [wacoOffer, 'trackAffiliateClick(', 'Waco first-party click tracking'],
  [wacoOffer, 'Affiliate disclosure:', 'Waco local disclosure'],
  [wacoOffer, 'WacoViatorExperienceCards', 'separately bookable experiences'],
  [destinationViator, 'if (!market) return huntingLinks;', 'Preserved fail-closed generic inventory with separately reviewed Waco attraction links'],
  [destinationViator, '/waco|cottonland|cameron-park|magnolia-market/.test(destination.slug)', 'Lazy Waco-only placement prefilter; exact offer eligibility remains in wacoViatorAttractionForSlug'],
  [magnolia, 'WacoMagnoliaCrosslinks', 'Magnolia independent Waco visitor guides'],
  [wacoMagnolia, 'WACO_VIATOR_ATTRACTIONS.map', 'all seven Waco guide links'],
  [wacoMagnolia, 'WacoViatorExperienceCards', 'Waco supplier-specific booking'],
  [wacoMagnolia, '/waco-attractions', 'Waco authority hub from Magnolia visitor context'],
  [wacoMagnolia, '/dallas-to-waco-magnolia-tours', 'Waco tour planning from Magnolia visitor context'],
  [stadiumComponent, '<WacoDestinationOffer slug="mclane-stadium" />', 'McLane venue overview without fabricated ticket'],
  [stadium, "reviewedAt: '2026-10-25'", 'dated official McLane visitor evidence'],
  [stadium, 'South Plaza and Gate B', 'Baylor 2026 official stroller entrance correction'],
  [stadium, 'https://baylorbears.com/facilities/mclane-stadium/30', 'official Baylor access authority'],
  [curatedPairings, '"cameron-park-zoo": ["cameron-park-waco"', 'reciprocal Waco park links'],
]) requireText(source, needle, label);

if (errors.length) {
  console.error('Experience affiliate analytics validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Experience affiliate analytics validation passed: CityPASS remains primary in its three Texas city markets; ${cityBootstrapMarkets.size} verified city Viator markets reconcile exactly to the canonical destination-link registry and run from a bundle-neutral public bootstrap with first-party attribution and fail-closed gating; destination and statewide Viator surfaces preserve shared click analytics, disclosure and sponsored/nofollow links without forced redirects.`);
