import test from 'node:test';
import assert from 'node:assert/strict';

import { amortizeLoan, estimateMortgage, monthlyMortgagePayment } from './mortgage.ts';
import { estimateAffordability } from './affordability.ts';
import { estimateClosingCosts } from './closingCosts.ts';
import { estimateHomeownership } from './homeownership.ts';
import { estimatePayroll2026, federalIncomeTax2026, grossSalaryForTakeHome2026 } from './payroll.ts';
import { estimateCostOfLivingBudget } from './household.ts';
import { estimateHomesteadSavings, estimatePropertyTaxProtest, estimateSpecialDistrictImpact, estimateSplitPropertyTax } from './propertyTax.ts';

const near = (actual: number, expected: number, tolerance = 0.02) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, "expected " + actual + " to be within " + tolerance + " of " + expected);
};

test('standard mortgage payment uses one canonical fixed-rate formula', () => {
  near(monthlyMortgagePayment(320000, 6.5, 30), 2022.62);
});

test('zero-rate mortgage divides principal evenly across the term', () => {
  near(monthlyMortgagePayment(120000, 0, 10), 1000, 0.001);
});

test('mortgage validation reports a down payment above purchase price', () => {
  const result = estimateMortgage({ homePrice: 300000, downPayment: 350000, annualInterestRate: 6.5, loanTermYears: 30 });
  assert.equal(result.loanAmount, 0);
  assert.ok(result.issues.some((issue) => issue.field === 'downPayment'));
});

test('amortization with scheduled payment reaches zero balance', () => {
  const result = amortizeLoan(320000, 6.5, 30);
  assert.equal(result.payoffMonths, 360);
  near(result.endingBalance, 0, 0.01);
  assert.ok(result.interestPaid > 0);
});

test('affordability derives price from one housing budget', () => {
  const result = estimateAffordability({
    annualHouseholdIncome: 120000,
    monthlyNonHousingDebt: 800,
    downPayment: 60000,
    annualInterestRate: 6.5,
    monthlyTaxesInsuranceHoa: 900,
  });
  near(result.grossMonthlyIncome, 10000, 0.001);
  near(result.targetHousingBudget, 2000, 0.001);
  assert.ok(result.possibleHomePrice > 200000);
});

test('closing-cost credits reduce buyer costs and increase seller costs', () => {
  const result = estimateClosingCosts({ salePrice: 400000, buyerCostPercent: 3, sellerCostPercent: 7, sellerCredits: 5000 });
  near(result.buyerCostsAfterCredits, 7000, 0.001);
  near(result.sellerCosts, 33000, 0.001);
});

test('homeownership engine totals every recurring category once', () => {
  const result = estimateHomeownership({
    mortgagePrincipalInterest: 2000,
    propertyTaxes: 700,
    homeownersInsurance: 250,
    mortgageInsurance: 100,
    hoaFees: 75,
    specialDistrictCosts: 50,
    maintenance: 300,
    utilities: 350,
    poolLandscape: 125,
  });
  near(result.monthlyHousing, 3175, 0.001);
  near(result.monthlyOwnership, 3950, 0.001);
  near(result.annualOwnership, 47400, 0.001);
});


test('2026 single-filer bracket boundaries match the published IRS table', () => {
  near(federalIncomeTax2026(12400, 'single'), 1240, 0.001);
  near(federalIncomeTax2026(50400, 'single'), 5800, 0.001);
});

test('2026 payroll model applies the Social Security wage base and Texas zero income tax', () => {
  const result = estimatePayroll2026({ annualSalary: 200000, filingStatus: 'single' });
  near(result.socialSecurityTax, 11439, 0.001);
  near(result.medicareTax, 2900, 0.001);
  near(result.additionalMedicareTax, 0, 0.001);
  near(result.texasStateIncomeTax, 0, 0.001);
});


test('salary-needed reverse solver converges on the shared payroll engine', () => {
  const target = 72000;
  const gross = grossSalaryForTakeHome2026(target, {
    filingStatus: 'single',
    retirementPercent: 6,
    annualPretaxBenefits: 0,
    annualAfterTaxDeductions: 0,
  });
  const result = estimatePayroll2026({
    annualSalary: gross,
    filingStatus: 'single',
    retirementPercent: 6,
    annualPretaxBenefits: 0,
    annualAfterTaxDeductions: 0,
  });
  near(result.annualTakeHome, target, 0.02);
});


test('split property-tax engine keeps school and other taxable values separate', () => {
  const result = estimateSplitPropertyTax({ homeValue: 400000, schoolExemption: 140000, otherExemption: 20000, schoolRate: 1, otherRate: 1.2 });
  near(result.schoolTax, 2600, 0.001);
  near(result.otherTax, 4560, 0.001);
  near(result.total, 7160, 0.001);
});

test('homestead and protest calculators reuse canonical property-tax math', () => {
  const homestead = estimateHomesteadSavings({ homeValue: 400000, schoolExemption: 140000, otherExemption: 0, schoolRate: 1, otherRate: 1.2 });
  near(homestead.before, 8800, 0.001);
  near(homestead.annualSavings, 1400, 0.001);
  const protest = estimatePropertyTaxProtest({ proposedValue: 450000, targetValue: 410000, taxRate: 2.2, confidencePercent: 50 });
  near(protest.annualSavings, 880, 0.001);
  near(protest.expectedSavings, 440, 0.001);
});


test('special-district impact uses canonical property-tax math across horizons', () => {
  const result = estimateSpecialDistrictImpact({ taxableValue: 400000, taxRate: 0.75, years: 10 });
  near(result.annual, 3000, 0.001);
  near(result.monthly, 250, 0.001);
  near(result.fiveYearSimpleTotal, 15000, 0.001);
  near(result.horizonSimpleTotal, 30000, 0.001);
});


test('cost-of-living budget engine compares categories without a hidden index', () => {
  const current = { housing: 2000, transportation: 700, utilities: 300, insurance: 400, foodHousehold: 800, healthcare: 300, childcareEducation: 0, otherRecurring: 500 };
  const target = { housing: 1800, transportation: 900, utilities: 350, insurance: 450, foodHousehold: 850, healthcare: 300, childcareEducation: 0, otherRecurring: 500 };
  const result = estimateCostOfLivingBudget({ current, target });
  near(result.currentTotal, 5000, 0.001);
  near(result.targetTotal, 5150, 0.001);
  near(result.monthlyDifference, 150, 0.001);
  near(result.annualDifference, 1800, 0.001);
});
