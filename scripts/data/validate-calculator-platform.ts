import assert from 'node:assert/strict';
import fs from 'node:fs';
import { calculateAffordability } from '../../src/lib/financial/affordability.ts';
import { calculateClosingCosts } from '../../src/lib/financial/closing-costs.ts';
import { calculateHomeownershipCost } from '../../src/lib/financial/homeownership.ts';
import { calculateMortgage, calculateMonthlyPrincipalInterest, calculateRefinance } from '../../src/lib/financial/mortgage.ts';
import { calculateCategoryBudgetComparison, calculateFederalPaycheck2026, calculateGrossSalaryNeeded2026, calculateHomeInsurance, calculateUtilities } from '../../src/lib/financial/planning.ts';
import { estimateRentVsBuy } from '../../src/lib/rent-vs-buy.ts';

const close = (actual: number, expected: number, tolerance = 0.01, label = 'value') => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, got ${actual}`);
};

close(calculateMonthlyPrincipalInterest(320000, 6.5, 30), 2022.6176751774892, 0.000001, 'golden mortgage P&I');
close(calculateMonthlyPrincipalInterest(120000, 0, 10), 1000, 0.000001, 'zero-rate mortgage');

const mortgage = calculateMortgage({
  homePrice: 400000,
  downPayment: 80000,
  annualRatePercent: 6.5,
  termYears: 30,
  propertyTaxRatePercent: 2,
  annualInsurance: 3000,
  monthlyPmi: 0,
  monthlyHoa: 100,
});
close(mortgage.loanAmount, 320000, 0.001, 'loan amount');
close(mortgage.monthlyPrincipalInterest, 2022.6176751774892, 0.000001, 'mortgage engine P&I');
close(mortgage.monthlyPropertyTax, 666.6666666667, 0.000001, 'property tax');
close(mortgage.monthlyHousingPayment, 3039.2843418442, 0.000001, 'housing payment');
assert.equal(mortgage.amortization.length, 360, '30-year mortgage should have 360 scheduled rows without extra principal');
close(mortgage.amortization.at(-1)?.endingBalance ?? -1, 0, 0.01, 'ending mortgage balance');

const invalid = calculateMortgage({ homePrice: 300000, downPayment: 350000, annualRatePercent: 6, termYears: 30 });
assert.ok(invalid.issues.some((issue) => issue.field === 'downPayment'), 'down payment above price must be reported');
assert.equal(invalid.loanAmount, 0, 'invalid oversized down payment must never create negative principal');

const rentBuy = estimateRentVsBuy({
  monthlyRent: 2200,
  annualRentGrowthRate: 3,
  monthlyRentersInsurance: 25,
  homePrice: 400000,
  downPayment: 80000,
  mortgageRate: 6.5,
  loanTermYears: 30,
  propertyTaxRate: 2,
  annualHomeInsurance: 3000,
  annualMaintenanceRate: 1,
  monthlyHoa: 100,
  buyerClosingCostRate: 3,
  sellerClosingCostRate: 6,
  comparisonYears: 7,
  annualAppreciationRate: 3,
});
close(rentBuy.monthlyPrincipalInterest, mortgage.monthlyPrincipalInterest, 0.000001, 'cross-calculator mortgage consistency');

const affordability = calculateAffordability({ annualIncome: 120000, monthlyDebt: 800, downPayment: 60000, annualRatePercent: 6.5, monthlyTaxesInsuranceHoa: 900, maxHousingRatioPercent: 28 });
close(affordability.grossMonthlyIncome, 10000, 0.001, 'gross monthly income');
close(affordability.housingBudget, 2000, 0.001, 'housing budget');

const closing = calculateClosingCosts({ salePrice: 400000, buyerCostPercent: 3, sellerCostPercent: 7, sellerCredits: 2000 });
assert.deepEqual({ buyer: closing.buyerCostsAfterCredits, seller: closing.sellerCostsIncludingCredits, proceeds: closing.sellerProceedsBeforeLoanPayoff }, { buyer: 10000, seller: 30000, proceeds: 370000 });

const ownership = calculateHomeownershipCost({ mortgage: 2400, propertyTaxes: 700, insurance: 250, hoa: 100, maintenance: 400, utilities: 350, pool: 150 });
assert.equal(ownership.monthly, 4350);
assert.equal(ownership.annual, 52200);

const paycheck = calculateFederalPaycheck2026({ annualGrossSalary: 90000, filingStatus: 'single', preTaxRetirementBenefitsPercent: 6 });
assert.equal(paycheck.taxYear, 2026);
close(paycheck.taxableIncome, 68500, 0.001, '2026 federal taxable income');
close(paycheck.federalIncomeTax, 9782, 0.001, '2026 federal income tax');
close(paycheck.socialSecurity, 5580, 0.001, '2026 Social Security');
close(paycheck.medicare, 1305, 0.001, '2026 Medicare');
close(paycheck.annualTakeHome, 67933, 0.001, '2026 annual take-home');

const categoryBudget = calculateCategoryBudgetComparison({ housing: 2000, utilities: 300 }, { housing: 2300, utilities: 350 });
assert.deepEqual(categoryBudget, { currentMonthly: 2300, targetMonthly: 2650, monthlyDifference: 350, annualDifference: 4200 });

const salaryNeeded = calculateGrossSalaryNeeded2026({ annualTakeHomeTarget: 67933, filingStatus: 'single', preTaxRetirementBenefitsPercent: 6 });
close(salaryNeeded.grossSalary, 90000, 0.01, 'inverse 2026 salary-needed consistency');

const insurance = calculateHomeInsurance({ replacementCost: 432800, windFloodAdditions: 0, deductibleDiscountCredit: 0 });
assert.equal(insurance.sourceYear, 2025);
close(insurance.normalizedBaseline, 3489, 0.001, 'TDI-normalized insurance baseline');

const utilities = calculateUtilities({ electricity: 190, waterSewer: 85, naturalGas: 45, internet: 75, trash: 35 });
assert.equal(utilities.monthly, 430);
assert.equal(utilities.annual, 5160);

const refinance = calculateRefinance({ balance: 300000, currentRatePercent: 7, newRatePercent: 6, newTermYears: 30, closingCosts: 7000 });
close(refinance.currentPayment, calculateMonthlyPrincipalInterest(300000, 7, 30), 0.000001, 'refinance current payment consistency');
close(refinance.newPayment, calculateMonthlyPrincipalInterest(300000, 6, 30), 0.000001, 'refinance new payment consistency');

const componentFiles = [
  'src/components/calculators/TexasPlanningCalculators.tsx',
  'src/components/calculators/TexasHomeFinanceCalculators.impl.tsx',
  'src/components/calculators/OfficialMortgageCalculator.tsx',
  'src/components/calculators/OfficialHomeownershipCostCalculator.tsx',
  'src/components/calculators/MovingCostCalculator.tsx',
  'src/components/calculators/LocalSalaryNeededPage.tsx',
  'src/components/calculators/LocalCostOfLivingPage.tsx',
];
for (const file of componentFiles) {
  const source = fs.readFileSync(file, 'utf8');
  assert.ok(source.includes('CalculatorActions'), `${file} must expose save/restore/share/print/reset actions`);
}
const planningSource = fs.readFileSync('src/components/calculators/TexasPlanningCalculators.tsx', 'utf8');
const financeSource = fs.readFileSync('src/components/calculators/TexasHomeFinanceCalculators.impl.tsx', 'utf8');
assert.ok(!planningSource.includes('Math.pow(1 + monthlyRate'), 'planning calculator components must not implement mortgage amortization math');
assert.ok(!financeSource.includes('Math.pow(1+m'), 'finance calculator components must not implement duplicate mortgage math');
assert.ok(fs.readFileSync('src/components/property/PropertyCalculatorFramework.tsx', 'utf8').includes('BreakdownTable'), 'shared framework must include detailed breakdown tables');
assert.ok(fs.readFileSync('src/components/property/PropertyCalculatorFramework.tsx', 'utf8').includes('BreakdownChart'), 'shared framework must include visual breakdowns');

console.log('Calculator platform validation passed: golden math, edge cases, cross-calculator consistency, universal actions, and shared breakdown components.');
