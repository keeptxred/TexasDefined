import fs from 'node:fs';

const source = fs.readFileSync('src/components/monetization/SchoolSupplyPartners.tsx', 'utf8');
const tracker = fs.readFileSync('src/lib/affiliate-click.ts', 'utf8');
const portfolio = fs.readFileSync('docs/affiliate-portfolio-economics.md', 'utf8');
const errors = [];

function requireText(haystack, needle, label) {
  if (!haystack.includes(needle)) errors.push(`${label}: missing ${needle}`);
}

// CJ advertiser 7552520 expired October 1, 2026. Editorial fallback is mandatory.
for (const [needle, label] of [
  ['https://www.reallygoodstuff.com/', 'direct editorial retailer destination'],
  ['CJ advertiser 7552520 expired 2026-10-01', 'source-dated relationship evidence'],
  ['TexasDefined does not earn an affiliate commission from this link', 'honest non-affiliate disclosure'],
  ['rel="noopener noreferrer"', 'safe new-window relationship'],
]) requireText(source, needle, label);
for (const marker of ['click-101876465-17106455', 'data-affiliate-partner=', 'data-commercial-partner=', 'trackAffiliateClick']) {
  if (source.includes(marker)) errors.push('Expired Really Good Stuff tracking must fail closed: ' + marker);
}

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
  ['VERIFIED SECONDARY ROUTE; NOT ACTIVATED', 'Discount School Supply activation state'],
]) requireText(portfolio, needle, label);

const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
if ((articleRoute.match(/<SchoolSupplyPartners\b/g) ?? []).length !== 1) {
  errors.push('Informational articles must render exactly one school-supply partner block in SSR markup.');
}
for (const token of ['school-supply-responsive','@media(min-width:1536px)','position:absolute','left:calc(100% + 2rem)','width:18rem']) {
  requireText(articleRoute, token, 'School-supply module retains responsive desktop rail placement');
}
if (articleRoute.includes('school-supply-bottom') || articleRoute.includes('school-supply-rail')) {
  errors.push('CSS-hidden duplicate affiliate placements must not return.');
}

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

console.log('School-supply relationship validation passed: expired Really Good Stuff tracking fails closed while editorial content and responsive placement remain; Discount School Supply is separately approved and is not substituted automatically.');
