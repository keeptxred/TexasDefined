import { nonNegative, uniqueIssues, validateNonNegative, validatePercent, type ValidationIssue } from './validation.ts';

export type ClosingCostInputs = {
  salePrice: number;
  buyerCostPercent: number;
  sellerCostPercent: number;
  sellerCredits: number;
  buyerPrepaids?: number;
};

export type ClosingCostEstimate = {
  buyerCostsBeforeCredits: number;
  buyerCostsAfterCredits: number;
  sellerCosts: number;
  sellerNetBeforeLoanPayoff: number;
  issues: ValidationIssue[];
};

export function estimateClosingCosts(input: ClosingCostInputs): ClosingCostEstimate {
  const issues: ValidationIssue[] = [
    ...validateNonNegative('salePrice', 'Sale price', input.salePrice),
    ...validatePercent('buyerCostPercent', 'Buyer closing-cost rate', input.buyerCostPercent, 20),
    ...validatePercent('sellerCostPercent', 'Seller closing-cost rate', input.sellerCostPercent, 20),
    ...validateNonNegative('sellerCredits', 'Seller credits', input.sellerCredits),
  ];
  const salePrice = nonNegative(input.salePrice);
  const buyerCostsBeforeCredits = salePrice * nonNegative(input.buyerCostPercent) / 100 + nonNegative(input.buyerPrepaids ?? 0);
  const buyerCostsAfterCredits = Math.max(0, buyerCostsBeforeCredits - nonNegative(input.sellerCredits));
  const sellerCosts = salePrice * nonNegative(input.sellerCostPercent) / 100 + nonNegative(input.sellerCredits);
  const sellerNetBeforeLoanPayoff = Math.max(0, salePrice - sellerCosts);
  return { buyerCostsBeforeCredits, buyerCostsAfterCredits, sellerCosts, sellerNetBeforeLoanPayoff, issues: uniqueIssues(issues) };
}
