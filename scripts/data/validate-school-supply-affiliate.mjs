import fs from 'node:fs';

const source = fs.readFileSync('src/components/monetization/SchoolSupplyPartners.tsx', 'utf8');
const tracker = fs.readFileSync('src/lib/affiliate-click.ts', 'utf8');
const errors = [];

function requireText(haystack, needle, label) {
  if (!haystack.includes(needle)) errors.push(`${label}: missing ${needle}`);
}

for (const [needle, label] of [
  ['really-good-stuff', 'Really Good Stuff partner identity'],
  ['discount-school-supply', 'Discount School Supply partner identity'],
  ['import { trackAffiliateClick } from "@/lib/affiliate-click"', 'shared affiliate tracker import'],
  ['module: "school-supplies"', 'school-supply module attribution'],
  ['data-affiliate-partner=', 'affiliate partner data attribute'],
  ['data-affiliate-placement=', 'affiliate placement data attribute'],
  ['data-commercial-partner=', 'commercial partner data attribute'],
  ['data-commercial-placement=', 'commercial placement data attribute'],
  ['sponsored nofollow noopener noreferrer', 'affiliate relationship attributes'],
  ['Affiliate disclosure: TexasDefined may earn a commission', 'affiliate disclosure'],
  ['const discountSchoolSupplyPaidTermsEndAt = Date.parse("2026-10-01T17:00:00Z")', 'Discount School Supply October 1 paid-term cutoff'],
  ['const discountSchoolSupplyPaidTermsActive = Date.now() < discountSchoolSupplyPaidTermsEndAt', 'Discount School Supply runtime paid-term gate'],
  ['{discountSchoolSupplyPaidTermsActive ? (', 'Discount School Supply conditional rendering'],
]) requireText(source, needle, label);

for (const [needle, label] of [
  ['event: "affiliate_click"', 'shared affiliate click event'],
  ['affiliate_partner: partner', 'shared partner attribution'],
  ['affiliate_label: label', 'shared label attribution'],
  ['affiliate_placement: placement', 'shared placement attribution'],
  ['page_path: window.location.pathname', 'shared page-path attribution'],
  ['texasdefined:affiliate-click', 'first-party affiliate browser event'],
]) requireText(tracker, needle, label);

if (source.includes('type AffiliateAnalyticsWindow') || source.includes('trackSchoolSupplyClick')) {
  errors.push('School-supply affiliate component must reuse the shared affiliate click tracker instead of duplicating client analytics code.');
}

if (/window\.location\s*=|window\.location\.href\s*=/.test(source)) {
  errors.push('School-supply affiliate component must not force redirects.');
}

if (source.includes('Retailer affiliate offers are temporarily unavailable while TexasDefined reviews updated program terms.')) {
  errors.push('School-supply affiliate component must not suppress Really Good Stuff when only Discount School Supply reaches its 0% pause.');
}

if (source.includes('SAVE10NOW') || source.includes('Current offer: free shipping')) {
  errors.push('School-supply affiliate component must not promote coupon copy that can fall into the retailers\' 0% coupon terms.');
}

if (errors.length) {
  console.error('School-supply affiliate validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('School-supply affiliate validation passed: Really Good Stuff remains available under its active 4% default term, Discount School Supply alone fails closed after its documented October 1 paid-term cutoff, approved links retain sponsored/commercial metadata and shared click attribution, and coupon copy tied to 0% terms remains blocked.');
