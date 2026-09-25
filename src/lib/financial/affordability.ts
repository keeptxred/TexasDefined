import { clamp, nonNegative, type ValidationIssue } from './validation.ts';
import { calculateMonthlyPrincipalInterest } from './mortgage.ts';

export interface AffordabilityInputs {
  annualIncome: number;
  monthlyDebt: number;
  downPayment: number;
  annualRatePercent: number;
  termYears?: number;
  monthlyTaxesInsuranceHoa: number;
  maxHousingRatioPercent?: number;
}

export function calculateAffordability(input: AffordabilityInputs) {
  const issues: ValidationIssue[] = [];
  if (input.annualIncome <= 0) issues.push({ field: 'annualIncome', message: 'Annual household income must be greater than zero.' });
  if (input.monthlyDebt < 0) issues.push({ field: 'monthlyDebt', message: 'Monthly debt cannot be negative.' });
  const grossMonthlyIncome = nonNegative(input.annualIncome) / 12;
  const housingRatio = clamp(input.maxHousingRatioPercent ?? 28, 1, 100) / 100;
  const housingBudget = Math.max(0, grossMonthlyIncome * housingRatio - nonNegative(input.monthlyDebt));
  const principalInterestBudget = Math.max(0, housingBudget - nonNegative(input.monthlyTaxesInsuranceHoa));
  const termYears = clamp(input.termYears ?? 30, 1, 50);
  const paymentPerDollar = calculateMonthlyPrincipalInterest(1, input.annualRatePercent, termYears);
  const loanAmount = paymentPerDollar > 0 ? principalInterestBudget / paymentPerDollar : 0;
  return {
    grossMonthlyIncome,
    housingBudget,
    principalInterestBudget,
    loanAmount,
    possibleHomePrice: loanAmount + nonNegative(input.downPayment),
    housingRatioPercent: housingRatio * 100,
    issues,
  };
}
