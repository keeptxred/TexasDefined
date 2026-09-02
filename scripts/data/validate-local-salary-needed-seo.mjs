import fs from 'node:fs';

const profiles = fs.readFileSync('src/data/local-salary-needed.ts', 'utf8');
const page = fs.readFileSync('src/components/calculators/LocalSalaryNeededPage.tsx', 'utf8');
const costPage = fs.readFileSync('src/components/calculators/LocalCostOfLivingPage.tsx', 'utf8');
const route = fs.readFileSync('src/routes/texas-salary-needed-calculator_.$location.tsx', 'utf8');
const lazyRoute = fs.readFileSync('src/routes/texas-salary-needed-calculator_.$location.lazy.tsx', 'utf8');
const server = fs.readFileSync('src/data/local-salary-needed-page.server.ts', 'utf8');
const boundary = fs.readFileSync('src/data/local-salary-needed-page.ts', 'utf8');
const hub = fs.readFileSync('src/routes/texas-salary-comparison-by-city.lazy.tsx', 'utf8');
const movingHub = fs.readFileSync('src/routes/moving-to-texas.lazy.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const movingCost = fs.readFileSync('src/routes/texas-moving-cost-calculator.lazy.tsx', 'utf8');
const costOfLiving = fs.readFileSync('src/routes/texas-cost-of-living-calculator.lazy.tsx', 'utf8');
const salaryCalculator = fs.readFileSync('src/routes/texas-salary-calculator.lazy.tsx', 'utf8');
const budgetPlanner = fs.readFileSync('src/routes/texas-budget-planner.lazy.tsx', 'utf8');
const failures = [];
const locations = ['houston', 'austin', 'dallas', 'fort-worth', 'san-antonio', 'frisco', 'el-paso'];

for (const slug of locations) {
  if (!profiles.includes(`/texas-salary-needed-calculator/${'${local.slug}'}`) && !profiles.includes(`LOCAL_COST_OF_LIVING_PROFILES.map`)) failures.push(`Salary-needed registry is not derived from the governed local cost profiles (${slug}).`);
  const path = `/texas-salary-needed-calculator/${slug}`;
  if (!movingHub.includes(path)) failures.push(`Moving-to-Texas hub must expose crawlable salary-needed discovery for ${slug}.`);
}
for (const marker of ['LOCAL_SALARY_NEEDED_PROFILES', 'LOCAL_SALARY_NEEDED_PROFILE_BY_SLUG', 'made-up citywide salary requirement', 'salaryPath']) if (!profiles.includes(marker)) failures.push(`Salary-needed registry missing ${marker}.`);
for (const marker of ["createFileRoute('/texas-salary-needed-calculator/$location')", 'getLocalSalaryNeededPage', 'notFound()', 'loaderData?.page.head']) if (!route.includes(marker)) failures.push(`Salary-needed route missing ${marker}.`);
for (const marker of ["createLazyFileRoute('/texas-salary-needed-calculator/$location')", 'LocalSalaryNeededPage', 'page.profile', 'page.faqs']) if (!lazyRoute.includes(marker)) failures.push(`Salary-needed lazy route missing ${marker}.`);
for (const marker of ['createServerFn', "import('./local-salary-needed-page.server')"]) if (!boundary.includes(marker)) failures.push(`Salary-needed server boundary missing ${marker}.`);
for (const marker of ["'@type': 'WebApplication'", "'@type': 'BreadcrumbList'", "'@type': 'FAQPage'", 'canonicalLink(texasDefinedBrand, profile.salaryPath)', 'buildMeta(texasDefinedBrand']) if (!server.includes(marker)) failures.push(`Salary-needed server head missing ${marker}.`);
for (const marker of ['Monthly household budget', 'Monthly savings / reserve', 'Federal withholding assumption', 'Payroll-tax assumption', 'Other deductions assumption', 'Planning gross income', 'Planning only.', 'profile.path', 'profile.propertyTaxHref', 'profile.affordabilityHref', 'profile.homeownershipHref', 'profile.insuranceHref', 'profile.relocationHref', '/texas-salary-calculator', '/texas-budget-planner']) if (!page.includes(marker)) failures.push(`Salary-needed planner UI missing ${marker}.`);
for (const marker of ['LOCAL_SALARY_NEEDED_PROFILES', 'profile.salaryPath', 'Plan from your own household costs', 'made-up salary requirement']) if (!hub.includes(marker)) failures.push(`Salary comparison hub missing crawlable local salary-needed discovery contract ${marker}.`);
for (const marker of ['localSalaryNeededTools', 'Work backward from the local budget to a salary target', 'made-up citywide salary requirement', 'Salary-needed budget planner']) if (!movingHub.includes(marker)) failures.push(`Moving-to-Texas hub missing local salary-needed discovery contract ${marker}.`);
for (const marker of ['/texas-salary-needed-calculator/${profile.slug}', 'Salary needed to live in {profile.name}', 'user-controlled gross-income planning target']) if (!costPage.includes(marker)) failures.push(`Local cost-of-living planner missing reciprocal salary-needed discovery contract ${marker}.`);
if (!sitemap.includes('LOCAL_SALARY_NEEDED_PROFILES')) failures.push('Primary sitemap must import the salary-needed registry.');
if (!sitemap.includes('...LOCAL_SALARY_NEEDED_PROFILES.map((profile) => ({ path: profile.salaryPath')) failures.push('Primary sitemap must emit every governed salary-needed profile.');
if (server.includes("'@type': 'FinancialProduct'") || server.includes("'@type': 'Offer'")) failures.push('Salary-needed pages must not claim FinancialProduct or Offer schema.');
for (const unsupported of ['average salary is', 'average salary needed', 'required salary is', 'average rent is', 'average home price']) if (profiles.toLowerCase().includes(unsupported)) failures.push(`Salary-needed registry must not publish unsupported citywide assumptions: ${unsupported}.`);

const statewidePlanningGraph = [
  ['/texas-moving-cost-calculator', movingCost],
  ['/texas-cost-of-living-calculator', costOfLiving],
  ['/texas-salary-comparison-by-city', hub],
  ['/texas-salary-calculator', salaryCalculator],
  ['/texas-budget-planner', budgetPlanner],
];
for (const [sourcePath, source] of statewidePlanningGraph) {
  for (const [targetPath] of statewidePlanningGraph) {
    if (sourcePath === targetPath) continue;
    if (!source.includes(`to="${targetPath}"`)) failures.push(`Statewide financial planning graph missing reciprocal crawl link ${sourcePath} -> ${targetPath}.`);
  }
}
for (const marker of ['Connect the one-time move to the monthly Texas budget', 'Take-home pay']) if (!movingCost.includes(marker)) failures.push(`Moving-cost planner discovery contract missing ${marker}.`);
for (const marker of ['Compare pay with Texas living costs', 'Salary comparison by city', 'Household budget', 'Moving costs']) if (!salaryCalculator.includes(marker)) failures.push(`Salary calculator discovery contract missing ${marker}.`);

if (failures.length) {
  console.error('Local salary-needed SEO validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Local salary-needed SEO validation passed for ${locations.length} governed city planners with user-entered household costs, editable deduction assumptions, canonical/schema coverage, reciprocal cost-of-living links, crawlable salary and relocation hub discovery, sitemap membership, local financial cross-links, no unsupported citywide salary claims, and a fully reciprocal five-surface statewide relocation-finance planning graph.`);