import fs from 'node:fs';

const tracker = fs.readFileSync('src/lib/affiliate-click.ts', 'utf8');
const citypass = fs.readFileSync('src/components/monetization/CityPassCalloutContent.tsx', 'utf8');
const destinationViator = fs.readFileSync('src/components/editorial/DestinationViatorBooking.tsx', 'utf8');
const statewideViator = fs.readFileSync('src/components/editorial/TexasExperienceMarkets.tsx', 'utf8');
const errors = [];

function requireText(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label}: missing ${needle}`);
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

if (/window\.location\s*=|window\.location\.href\s*=/.test([tracker, citypass, destinationViator, statewideViator].join('\n'))) {
  errors.push('Experience affiliate analytics must not force redirects.');
}

if (errors.length) {
  console.error('Experience affiliate analytics validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Experience affiliate analytics validation passed: CityPASS and Viator affiliate surfaces emit first-party click attribution with partner, label, placement, module and page path, preserve affiliate disclosure, and use sponsored/nofollow external-link attributes without forced redirects.');
