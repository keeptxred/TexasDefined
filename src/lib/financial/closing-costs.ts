import { clamp, nonNegative, type ValidationIssue } from './validation.ts';

export function calculateDownPayment(input: { homePrice: number; downPaymentPercent: number; closingCostPercent: number; reserve: number }) {
  const price = nonNegative(input.homePrice);
  const downPercent = clamp(input.downPaymentPercent, 0, 100);
  const closingPercent = clamp(input.closingCostPercent, 0, 100);
  const downPayment = price * downPercent / 100;
  const closingCosts = price * closingPercent / 100;
  return {
    downPayment,
    closingCosts,
    cashNeeded: downPayment + closingCosts + nonNegative(input.reserve),
    loanAmount: Math.max(0, price - downPayment),
  };
}

export function calculateClosingCosts(input: { salePrice: number; buyerCostPercent: number; sellerCostPercent: number; sellerCredits: number }) {
  const issues: ValidationIssue[] = [];
  if (input.salePrice <= 0) issues.push({ field: 'salePrice', message: 'Sale price must be greater than zero.' });
  const price = nonNegative(input.salePrice);
  const credits = nonNegative(input.sellerCredits);
  const buyerBase = price * clamp(input.buyerCostPercent, 0, 100) / 100;
  const sellerBase = price * clamp(input.sellerCostPercent, 0, 100) / 100;
  return {
    buyerCostsAfterCredits: Math.max(0, buyerBase - credits),
    sellerCostsIncludingCredits: sellerBase + credits,
    sellerProceedsBeforeLoanPayoff: Math.max(0, price - sellerBase - credits),
    issues,
  };
}
