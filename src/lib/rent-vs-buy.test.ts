import { describe, expect, it } from 'vitest';

import { estimateRentVsBuy, type RentVsBuyInputs } from './rent-vs-buy';

const base: RentVsBuyInputs = {
  monthlyRent: 2200,
  annualRentGrowthRate: 3,
  monthlyRentersInsurance: 25,
  homePrice: 400000,
  downPayment: 80000,
  mortgageRate: 6.5,
  loanTermYears: 30,
  propertyTaxRate: 2.1,
  annualHomeInsurance: 2400,
  annualMaintenanceRate: 1,
  monthlyHoa: 0,
  buyerClosingCostRate: 3,
  sellerClosingCostRate: 6,
  comparisonYears: 7,
  annualAppreciationRate: 3,
};

describe('rent-vs-buy estimate', () => {
  it('amortizes the loan while accounting for recurring rent and ownership costs', () => {
    const result = estimateRentVsBuy(base);
    expect(result.loanAmount).toBe(320000);
    expect(result.monthlyPrincipalInterest).toBeGreaterThan(0);
    expect(result.remainingLoanBalance).toBeLessThan(result.loanAmount);
    expect(result.principalPaid).toBeGreaterThan(0);
    expect(result.interestPaid).toBeGreaterThan(0);
    expect(result.renterCost).toBeGreaterThan(base.monthlyRent * 12 * base.comparisonYears);
    expect(result.ownerCashOutflow).toBeGreaterThan(base.downPayment);
    expect(result.endingSaleEquity).toBeGreaterThan(0);
  });

  it('handles a zero-interest mortgage with predictable principal reduction', () => {
    const result = estimateRentVsBuy({
      ...base,
      monthlyRent: 0,
      annualRentGrowthRate: 0,
      monthlyRentersInsurance: 0,
      mortgageRate: 0,
      propertyTaxRate: 0,
      annualHomeInsurance: 0,
      annualMaintenanceRate: 0,
      buyerClosingCostRate: 0,
      sellerClosingCostRate: 0,
      annualAppreciationRate: 0,
      comparisonYears: 10,
    });
    expect(result.monthlyPrincipalInterest).toBeCloseTo(320000 / 360, 6);
    expect(result.principalPaid).toBeCloseTo((320000 / 360) * 120, 4);
    expect(result.remainingLoanBalance).toBeCloseTo(320000 - (320000 / 360) * 120, 4);
    expect(result.ownerNetCost).toBeCloseTo(0, 4);
  });

  it('raises renter cost when the rent-growth assumption increases', () => {
    const flatRent = estimateRentVsBuy({ ...base, annualRentGrowthRate: 0 });
    const growingRent = estimateRentVsBuy({ ...base, annualRentGrowthRate: 5 });
    expect(growingRent.renterCost).toBeGreaterThan(flatRent.renterCost);
  });

  it('reduces sale equity when selling costs increase', () => {
    const lowCosts = estimateRentVsBuy({ ...base, sellerClosingCostRate: 2 });
    const highCosts = estimateRentVsBuy({ ...base, sellerClosingCostRate: 8 });
    expect(highCosts.sellingCosts).toBeGreaterThan(lowCosts.sellingCosts);
    expect(highCosts.endingSaleEquity).toBeLessThan(lowCosts.endingSaleEquity);
    expect(highCosts.ownerNetCost).toBeGreaterThan(lowCosts.ownerNetCost);
  });
});
