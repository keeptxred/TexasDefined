import fs from 'node:fs';

const profiles = fs.readFileSync('src/data/local-rent-vs-buy.ts', 'utf8');
const server = fs.readFileSync('src/data/local-rent-vs-buy-page.server.ts', 'utf8');
const boundary = fs.readFileSync('src/data/local-rent-vs-buy-page.ts', 'utf8');
const route = fs.readFileSync('src/routes/texas-rent-vs-buy-calculator_.$location.tsx', 'utf8');
const lazyRoute = fs.readFileSync('src/routes/texas-rent-vs-buy-calculator_.$location.lazy.tsx', 'utf8');
const component = fs.readFileSync('src/components/calculators/LocalRentVsBuyPage.tsx', 'utf8');
const movingHub = fs.readFileSync('src/routes/moving-to-texas.lazy.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const failures = [];
const locations = ['houston', 'austin', 'dallas', 'fort-worth', 'san-antonio', 'frisco', 'el-paso'];

for (const slug of locations) {
  const path = `/texas-rent-vs-buy-calculator/${slug}`;
  if (!profiles.includes(`slug: '${slug}'`) && !profiles.includes('LOCAL_COST_OF_LIVING_PROFILES.map')) failures.push(`Missing governed profile source for ${slug}.`);
  if (!movingHub.includes(path)) failures.push(`Moving-to-Texas hub must link directly to ${path}.`);
}
if (!profiles.includes('LOCAL_RENT_VS_BUY_PROFILE_BY_SLUG')) failures.push('Rent-vs-buy family needs an explicit slug allowlist map.');
if (!route.includes("createFileRoute('/texas-rent-vs-buy-calculator/$location')")) failures.push('Dynamic rent-vs-buy route is missing.');
if (!route.includes('notFound()')) failures.push('Unknown rent-vs-buy location slugs must fail closed with notFound().');
if (!lazyRoute.includes('LocalRentVsBuyPage')) failures.push('Dynamic route must render the substantive rent-vs-buy calculator.');
if (!boundary.includes("createServerFn({ method: 'GET' })")) failures.push('Rent-vs-buy metadata must cross a server boundary.');
for (const marker of ['WebApplication', 'BreadcrumbList', 'FAQPage', 'canonicalPath: profile.rentVsBuyPath', "applicationCategory: 'FinanceApplication'"]) if (!server.includes(marker)) failures.push(`Server metadata is missing ${marker}.`);
for (const marker of ['Monthly rent', 'Home price', 'Mortgage rate', 'Property-tax assumption', 'Annual homeowners insurance', 'Maintenance assumption', 'Buyer closing costs', 'Selling costs', 'Home appreciation', 'Alternative investment return', 'Time horizon', 'Planning only.']) if (!component.includes(marker)) failures.push(`Calculator is missing substantive input/disclosure: ${marker}.`);
for (const marker of ['profile.propertyTaxHref', 'profile.affordabilityHref', 'profile.homeownershipHref', 'profile.insuranceHref', 'profile.mortgageHref', 'profile.path', 'texas-salary-needed-calculator', 'profile.relocationHref']) if (!component.includes(marker)) failures.push(`Local rent-vs-buy page is missing cross-link contract ${marker}.`);
if (!component.includes('The starting values are examples')) failures.push('Calculator must disclose that defaults are examples, not local averages.');
if (!profiles.includes('does not substitute a citywide rent, home-price or property-tax average')) failures.push('Local profiles must reject unsupported citywide housing averages.');
if (/(average rent is|average home price is|average property tax rate is)/i.test(`${profiles}\n${component}`)) failures.push('Unsupported citywide housing average claim detected.');
if (/FinancialProduct|Offer/.test(server)) failures.push('Planning calculator must not claim FinancialProduct or Offer schema.');
if (!sitemap.includes('LOCAL_RENT_VS_BUY_PROFILES')) failures.push('Primary sitemap must import the governed rent-vs-buy registry.');
if (!sitemap.includes('...LOCAL_RENT_VS_BUY_PROFILES.map((profile) => ({ path: profile.rentVsBuyPath')) failures.push('Primary sitemap must emit rent-vs-buy children from the governed registry.');

if (failures.length) {
  console.error('Local rent-vs-buy SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Local rent-vs-buy SEO validation passed (${locations.length} governed city planners, server metadata, crawl discovery, sitemap and substantive calculator checks).`);