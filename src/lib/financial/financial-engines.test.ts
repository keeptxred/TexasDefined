import test from 'node:test';
import assert from 'node:assert/strict';

import { amortizeLoan, estimateMortgage, monthlyMortgagePayment } from './mortgage.ts';
import { estimateAffordability } from './affordability.ts';
import { estimateClosingCosts } from './closingCosts.ts';
import { estimateHomeownership } from './homeownership.ts';

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
