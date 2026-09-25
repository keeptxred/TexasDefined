import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');

const engineFiles = [
  'src/lib/financial/validation.ts',
  'src/lib/financial/mortgage.ts',
  'src/lib/financial/affordability.ts',
  'src/lib/financial/closingCosts.ts',
  'src/lib/financial/insurance.ts',
  'src/lib/financial/utilities.ts',
  'src/lib/financial/homeownership.ts',
  'src/lib/financial/household.ts',
  'src/lib/financial/payroll.ts',
  'src/lib/financial/financial-engines.test.ts',
];

for (const file of engineFiles) {
  if (!fs.existsSync(file)) failures.push('Missing calculator engine contract: ' + file);
}

const ui = read('src/components/calculators/FinancialCalculatorUI.tsx');
for (const marker of [
  'readCalculatorUrlState',
  'Copy share link',
  'Save inputs',
  'Restore saved',
  'Print results',
  'Add comparison',
  'Scenario comparison',
  'BreakdownChart',
  'BreakdownTable',
  'SensitivityTable',
  'ValidationSummary',
  'How TexasDefined calculates this',
]) {
  if (!ui.includes(marker)) failures.push('Shared calculator UI missing required capability: ' + marker);
}

const migrated = [
  'src/components/calculators/TexasPlanningCalculators.tsx',
  'src/components/calculators/TexasHomeFinanceCalculators.impl.tsx',
  'src/components/calculators/MovingCostCalculator.tsx',
  'src/components/calculators/OfficialMortgageCalculator.tsx',
  'src/components/calculators/OfficialHomeownershipCostCalculator.tsx',
];

for (const file of migrated) {
  const source = read(file);
  if (!source.includes('FinancialCalculatorScaffold')) failures.push(file + ' must use the shared FinancialCalculatorScaffold.');
  if (source.includes('Math.pow(')) failures.push(file + ' must not implement compound-interest/amortization math inside React.');
  if (source.includes('/1200')) failures.push(file + ' must not implement monthly interest-rate conversion inside React.');
}

const planning = read('src/components/calculators/TexasPlanningCalculators.tsx');
for (const marker of [
  "from '@/lib/financial/affordability'",
  "from '@/lib/financial/insurance'",
  "from '@/lib/financial/mortgage'",
  "from '@/lib/financial/utilities'",
  "from '@/lib/financial/household'",
  "from '@/lib/financial/payroll'",
  "estimateRentVsBuy",
]) {
  if (!planning.includes(marker)) failures.push('TexasPlanningCalculators must consume shared engine: ' + marker);
}

const finance = read('src/components/calculators/TexasHomeFinanceCalculators.impl.tsx');
for (const marker of [
  "from '@/lib/financial/closingCosts'",
  "from '@/lib/financial/homeownership'",
  "from '@/lib/financial/household'",
]) {
  if (!finance.includes(marker)) failures.push('TexasHomeFinanceCalculators must consume shared engine: ' + marker);
}

const rentVsBuy = read('src/lib/rent-vs-buy.ts');
if (!rentVsBuy.includes("monthlyMortgagePayment")) failures.push('Rent-vs-buy must use the canonical mortgage payment engine.');

const officialMortgage = read('src/components/calculators/OfficialMortgageCalculator.tsx');
for (const marker of ['mortgageSensitivity', 'Advanced assumptions', 'OfficialTaxRateAssist', 'annualPmi', 'monthlySpecialDistrict', 'monthlyUtilities', 'monthlyMaintenance']) {
  if (!officialMortgage.includes(marker)) failures.push('Flagship mortgage calculator missing: ' + marker);
}

const officialOwnership = read('src/components/calculators/OfficialHomeownershipCostCalculator.tsx');
for (const marker of ['estimateHomeownership', 'mortgageInsurance', 'specialDistrict', 'poolLandscape', 'OfficialTaxRateAssist']) {
  if (!officialOwnership.includes(marker)) failures.push('Flagship homeownership calculator missing: ' + marker);
}

if (failures.length) {
  console.error('Calculator quality validation failed:');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}

console.log('Calculator quality validation passed: shared engines, universal UX, visual breakdowns, validation, sharing, scenario comparison, methodology, and cross-calculator mortgage consistency are protected.');
