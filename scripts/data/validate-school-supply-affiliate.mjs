import fs from 'node:fs';

const source = fs.readFileSync('src/components/monetization/SchoolSupplyPartners.tsx', 'utf8');
const errors = [];

function requireText(needle, label) {
  if (!source.includes(needle)) errors.push(`${label}: missing ${needle}`);
}

for (const [needle, label] of [
  ['really-good-stuff', 'Really Good Stuff partner identity'],
  ['discount-school-supply', 'Discount School Supply partner identity'],
  ['event: "affiliate_click"', 'affiliate click event'],
  ['affiliate_placement: placement', 'placement attribution'],
  ['page_path: window.location.pathname', 'page-path attribution'],
  ['data-affiliate-partner=', 'affiliate partner data attribute'],
  ['data-affiliate-placement=', 'affiliate placement data attribute'],
  ['data-commercial-partner=', 'commercial partner data attribute'],
  ['data-commercial-placement=', 'commercial placement data attribute'],
  ['texasdefined:affiliate-click', 'first-party affiliate browser event'],
  ['sponsored nofollow noopener noreferrer', 'affiliate relationship attributes'],
  ['Affiliate disclosure: TexasDefined may earn a commission', 'affiliate disclosure'],
]) requireText(needle, label);

if (/window\.location\s*=|window\.location\.href\s*=/.test(source)) {
  errors.push('School-supply affiliate component must not force redirects.');
}

if (errors.length) {
  console.error('School-supply affiliate validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('School-supply affiliate validation passed: both approved retailers retain sponsored links and disclosure while emitting first-party partner, placement, page-path, and affiliate-click attribution without forced redirects.');
