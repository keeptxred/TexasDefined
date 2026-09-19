import fs from 'node:fs';

const profiles = fs.readFileSync('src/data/local-salary-needed.ts', 'utf8');
const costProfiles = fs.readFileSync('src/data/local-cost-of-living.ts', 'utf8');
const route = fs.readFileSync('src/routes/texas-salary-needed-calculator_.$location.tsx', 'utf8');
const calculatorPage = fs.readFileSync('src/components/calculators/CalculatorPage.tsx', 'utf8');
const selector = fs.readFileSync('src/components/calculators/ConsolidatedLocationSelector.tsx', 'utf8');
const sitemapDependencies = fs.readFileSync('src/data/sitemap-dependencies.server.ts', 'utf8');
const hub = fs.readFileSync('src/routes/texas-salary-comparison-by-city.lazy.tsx', 'utf8');
const movingCost = fs.readFileSync('src/routes/texas-moving-cost-calculator.lazy.tsx', 'utf8');
const costOfLiving = fs.readFileSync('src/routes/texas-cost-of-living-calculator.lazy.tsx', 'utf8');
const salaryCalculator = fs.readFileSync('src/routes/texas-salary-calculator.lazy.tsx', 'utf8');
const budgetPlanner = fs.readFileSync('src/routes/texas-budget-planner.lazy.tsx', 'utf8');

const failures = [];
const locations = ['houston', 'austin', 'dallas', 'fort-worth', 'san-antonio', 'frisco', 'el-paso'];

for (const slug of locations) {
  if (!costProfiles.includes(`slug: '${slug}'`)) failures.push(`Governed cost-of-living source registry missing salary-needed context ${slug}.`);
}
const costProfileSlugCount = (costProfiles.match(/\bslug:\s*'[^']+'/g) ?? []).length;
if (costProfileSlugCount !== locations.length) failures.push(`Governed cost-of-living source registry must contain exactly ${locations.length} salary-needed city contexts; found ${costProfileSlugCount}.`);

for (const marker of [
  'LOCAL_SALARY_NEEDED_PROFILES',
  'LOCAL_SALARY_NEEDED_PROFILE_BY_SLUG',
  'LOCAL_COST_OF_LIVING_PROFILES.map((local) => ({',
  'salaryPath: `/texas-salary-needed-calculator/${local.slug}`',
  'made-up citywide salary requirement',
]) {
  if (!profiles.includes(marker)) failures.push(`Derived salary-needed registry missing ${marker}.`);
}

for (const marker of [
  "createFileRoute('/texas-salary-needed-calculator/$location')",
  'LOCAL_SALARY_NEEDED_PROFILE_BY_SLUG.has(params.location)',
  'notFound()',
  'redirect({ href: `/texas-salary-needed-calculator#${params.location}`, statusCode: 301 })',
]) {
  if (!route.includes(marker)) failures.push(`Retired salary-needed route missing redirect/fail-closed marker ${marker}.`);
}

for (const marker of ['ConsolidatedLocationSelector', '<ConsolidatedLocationSelector />']) {
  if (!calculatorPage.includes(marker)) failures.push(`Canonical calculator shell missing ${marker}.`);
}

for (const marker of [
  "'/texas-salary-needed-calculator':",
  'LOCAL_SALARY_NEEDED_PROFILES.map',
  'Local salary context',
  'one authoritative URL',
  'window.location.hash',
]) {
  if (!selector.includes(marker)) failures.push(`Consolidated salary-needed selector missing ${marker}.`);
}

if (!sitemapDependencies.includes('"/texas-salary-needed-calculator/"')) {
  failures.push('Sitemap indexability filter must exclude retired local salary-needed URL prefixes.');
}

for (const marker of ['Plan from your own household costs', 'made-up salary requirement']) {
  if (!hub.includes(marker)) failures.push(`Salary comparison hub missing authority/disclaimer marker ${marker}.`);
}

for (const unsupported of ['average salary is', 'average salary needed', 'required salary is', 'average rent is', 'average home price']) {
  if (profiles.toLowerCase().includes(unsupported)) failures.push(`Salary-needed registry must not publish unsupported citywide assumptions: ${unsupported}.`);
}

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
    if (!source.includes(`to=\"${targetPath}\"`)) failures.push(`Statewide financial planning graph missing reciprocal crawl link ${sourcePath} -> ${targetPath}.`);
  }
}
for (const marker of ['Connect the one-time move to the monthly Texas budget', 'Take-home pay']) {
  if (!movingCost.includes(marker)) failures.push(`Moving-cost planner discovery contract missing ${marker}.`);
}
for (const marker of ['Compare pay with Texas living costs', 'Salary comparison by city', 'Household budget', 'Moving costs']) {
  if (!salaryCalculator.includes(marker)) failures.push(`Salary calculator discovery contract missing ${marker}.`);
}

if (failures.length) {
  console.error('Consolidated salary-needed authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Consolidated salary-needed authority validation passed: ${locations.length} governed city contexts are derived from the cost-of-living registry and preserved on one canonical calculator, legacy location URLs are permanent redirects, unsupported citywide salary claims remain prohibited, and the statewide planning graph stays reciprocal.`);
