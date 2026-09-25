import fs from 'node:fs';

const source = fs.readFileSync('src/components/monetization/SchoolSupplyPartners.tsx', 'utf8');
const tracker = fs.readFileSync('src/lib/affiliate-click.ts', 'utf8');
const portfolio = fs.readFileSync('docs/affiliate-portfolio-economics.md', 'utf8');
const errors = [];

function requireText(haystack, needle, label) {
  if (!haystack.includes(needle)) errors.push(`${label}: missing ${needle}`);
}

for (const [needle, label] of [
  ['really-good-stuff', 'Really Good Stuff partner identity'],
  ['https://www.anrdoezrs.net/click-101876465-17106455', 'Really Good Stuff CJ tracking link'],
  ['import { trackAffiliateClick } from "@/lib/affiliate-click"', 'shared affiliate tracker import'],
  ['module: "school-supplies"', 'school-supply module attribution'],
  ['data-affiliate-partner=', 'affiliate partner data attribute'],
  ['data-affiliate-placement=', 'affiliate placement data attribute'],
  ['data-commercial-partner=', 'commercial partner data attribute'],
  ['data-commercial-placement=', 'commercial placement data attribute'],
  ['sponsored nofollow noopener noreferrer', 'affiliate relationship attributes'],
  ['Affiliate disclosure: TexasDefined may earn a commission', 'affiliate disclosure'],
]) requireText(source, needle, label);

for (const [needle, label] of [
  ['event: "affiliate_click"', 'shared affiliate click event'],
  ['affiliate_partner: partner', 'shared partner attribution'],
  ['affiliate_label: label', 'shared label attribution'],
  ['affiliate_placement: placement', 'shared placement attribution'],
  ['page_path: window.location.pathname', 'shared page-path attribution'],
  ['texasdefined:affiliate-click', 'first-party affiliate browser event'],
]) requireText(tracker, needle, label);

for (const [needle, label] of [
  ['Discount School Supply | Active CJ: 4%', 'current Discount School Supply paid term'],
  ['1-day referral period', 'Discount School Supply referral window'],
  ['VALID SECONDARY ROUTE PENDING CLEAN TRACKED LINK', 'Discount School Supply activation state'],
]) requireText(portfolio, needle, label);

if (source.includes('email.cj.com/')) {
  errors.push('School-supply affiliate component must never use CJ email-wrapper URLs as shopper-facing affiliate destinations.');
}

if (source.includes('discount-school-supply') || source.includes('Discount School Supply')) {
  if (!/click-101876465-\d+/.test(source)) {
    errors.push('Discount School Supply may return to the live component only with a clean CJ tracking URL bound to TexasDefined publisher 101876465.');
  }
}

if (source.includes('SAVE10NOW') || source.includes('Current offer: free shipping')) {
  errors.push('School-supply affiliate component must not promote unverified coupon copy; DSS coupons must come exclusively through the affiliate program.');
}

if (source.includes('type AffiliateAnalyticsWindow') || source.includes('trackSchoolSupplyClick')) {
  errors.push('School-supply affiliate component must reuse the shared affiliate click tracker instead of duplicating client analytics code.');
}

if (/window\.location\s*=|window\.location\.href\s*=/.test(source)) {
  errors.push('School-supply affiliate component must not force redirects.');
}

if (errors.length) {
  console.error('School-supply affiliate validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('School-supply affiliate validation passed: Really Good Stuff remains the live default, Discount School Supply is recognized as a current 4% secondary program but fails closed until a clean TexasDefined CJ tracking link replaces legacy email wrappers, and sponsored/commercial attribution remains intact.');
