import fs from 'node:fs';

const calculators = ['texas-mortgage-calculator','texas-home-affordability-calculator','texas-rent-vs-buy-calculator','texas-cost-of-living-calculator','texas-salary-calculator','texas-moving-cost-calculator','texas-utility-cost-calculator','texas-home-insurance-calculator'];
const required = [
  'src/routes/decide.property-taxes.tsx','src/routes/do.property-tax-protest.tsx','src/routes/do.homestead-exemption.tsx',
  'src/routes/moving-to-texas.tsx','src/routes/moving-to-texas-checklist.tsx','src/routes/decide.financial-tools.tsx',
  'src/routes/browse.counties.tsx','src/routes/browse.cities.tsx','src/routes/tax-calculator.tsx',
  'src/routes/texas-property-tax-protest-guide.tsx','src/routes/texas-property-tax-increase-calculator.tsx',
  'src/routes/texas-financial-tools.tsx','src/components/calculators/TexasPlanningCalculators.tsx',
  'src/components/calculators/CalculatorPage.tsx',...calculators.map((slug) => `src/routes/${slug}.tsx`),
];
const errors = [];
for (const file of required) if (!fs.existsSync(file)) errors.push(`Missing TexasDefined-owned route or component: ${file}`);
if (!errors.length) {
  const aliases = new Map([
    ['src/routes/tax-calculator.tsx', '/decide/property-taxes'],
    ['src/routes/texas-property-tax-increase-calculator.tsx', '/decide/property-taxes'],
    ['src/routes/texas-property-tax-protest-guide.tsx', '/do/property-tax-protest'],
    ['src/routes/texas-financial-tools.tsx', '/decide/financial-tools'],
  ]);
  for (const [file, target] of aliases) {
    const source = fs.readFileSync(file, 'utf8');
    if (!source.includes('statusCode: 301') || !source.includes(target)) errors.push(`${file} must permanently redirect to ${target}.`);
  }
  const movingChecklist = fs.readFileSync('src/routes/moving-to-texas-checklist.tsx', 'utf8');
  for (const token of ['Moving to Texas Checklist', 'canonicalLink', 'Vehicles and identification', 'Taxes, voting, and the home']) if (!movingChecklist.includes(token)) errors.push(`Moving checklist missing ${token}.`);
  const movingHub = fs.readFileSync('src/routes/moving-to-texas.tsx', 'utf8');
  for (const token of ['createFileRoute("/moving-to-texas")', 'CategoryPage', 'moving-to-texas']) if (!movingHub.includes(token)) errors.push(`Moving hub missing ${token}.`);
  const tools = fs.readFileSync('src/routes/decide.financial-tools.tsx', 'utf8');
  for (const token of ["createFileRoute('/decide/financial-tools')", 'Texas Financial Tools', '/browse/counties', '/browse/cities', ...calculators.map((slug) => `/${slug}`)]) if (!tools.includes(token)) errors.push(`Financial tools hub missing ${token}.`);
  const engine = fs.readFileSync('src/components/calculators/TexasPlanningCalculators.tsx', 'utf8');
  for (const token of ['MortgageCalculator','AffordabilityCalculator','RentVsBuyCalculator','CostOfLivingCalculator','SalaryCalculator','MovingCostCalculator','UtilityCalculator','HomeInsuranceCalculator']) if (!engine.includes(`export function ${token}`)) errors.push(`Calculator engine missing ${token}.`);
  for (const slug of calculators) {
    const source = fs.readFileSync(`src/routes/${slug}.tsx`, 'utf8');
    if (!source.includes(`createFileRoute('/${slug}')`) || !source.includes('canonicalLink')) errors.push(`TexasDefined calculator route is incomplete: ${slug}`);
    if (source.includes('keeptxred.com') || source.includes('SUPABASE_')) errors.push(`TexasDefined calculator ${slug} contains cross-site dependency.`);
  }
}
for (const forbidden of ['src/platform/governance-persistence.ts', 'supabase/migrations/20260804195800_governance_events.sql']) if (fs.existsSync(forbidden)) errors.push(`TexasDefined must not depend on abandoned shared database artifact: ${forbidden}`);
if (errors.length) { console.error(`TexasDefined backend-separation validation failed (${errors.length}):`); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
console.log(`TexasDefined lifestyle ownership and ${calculators.length} independent calculators are valid.`);
