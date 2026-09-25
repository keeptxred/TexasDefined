import fs from 'node:fs';

const source = fs.readFileSync('src/components/monetization/SchoolSupplyPartners.tsx', 'utf8');
const tracker = fs.readFileSync('src/lib/affiliate-click.ts', 'utf8');
const economics = fs.readFileSync('docs/affiliate-portfolio-economics.md', 'utf8');
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
  ['Discount School Supply | Active CJ: 4% online purchase; 1-day referral period', 'current Discount School Supply economics'],
  ['Really Good Stuff | Active CJ: 4% website purchase; 5-day referral period', 'current Really Good Stuff economics'],
  ['Do not restore legacy `email.cj.com` wrappers', 'Discount School Supply clean-link gate'],
]) requireText(economics, needle, label);

if (source.includes('email.cj.com/')) {
  errors.push('School-supply affiliate component must never use CJ email-wrapper URLs as shopper-facing affiliate destinations.');
}

if (source.includes('discount-school-supply') || source.includes('Discount School Supply')) {
  const urls = [...source.matchAll(/https?:\/\/[^"'\s)]+/g)].map((match) => match[0]);
  const dssUrls = urls.filter((url) => /discountschoolsupply|discount-school-supply/i.test(url));
  if (!dssUrls.length) {
    errors.push('Discount School Supply may be rendered only after a clean shopper-facing CJ tracking URL is present.');
  }
  if (dssUrls.some((url) => /^https?:\/\/(?:www\.)?discountschoolsupply\.com/i.test(url))) {
    errors.push('Discount School Supply must not use a bare merchant URL; use a verified CJ tracking URL.');
  }
}

if (source.includes('SAVE10NOW') || source.includes('Current offer: free shipping')) {
  errors.push('School-supply affiliate component must not promote unverified coupon copy.');
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

console.log('School-supply affiliate validation passed: current CJ economics keep Really Good Stuff live at 4%/5 days and recognize Discount School Supply as eligible at 4%/1 day, while DSS remains fail-closed until a clean shopper-facing CJ tracking URL replaces the prohibited historical email wrappers; sponsored/commercial metadata and shared click attribution remain enforced.');
