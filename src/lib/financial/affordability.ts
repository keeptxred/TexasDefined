import { monthlyMortgagePayment } from './mortgage.ts';
import { nonNegative, uniqueIssues, validateNonNegative, validatePercent, type ValidationIssue } from './validation.ts';

export type AffordabilityInputs = {
  annualHouseholdIncome: number;
  monthlyNonHousingDebt: number;
  downPayment: number;
  annualInterestRate: number;
  loanTermYears?: number;
  monthlyTaxesInsuranceHoa: number;
  targetHousingRatioPercent?: number;
};

export type AffordabilityEstimate = {
  grossMonthlyIncome: number;
  targetHousingBudget: number;
  principalInterestBudget: number;
  possibleLoanAmount: number;
  possibleHomePrice: number;
  issues: ValidationIssue[];
};

function loanFromPayment(payment: number, annualRate: number, years: number) {
  const safePayment = nonNegative(payment);
  const months = Math.max(1, Math.round(nonNegative(years) * 12));
  const r = nonNegative(annualRate) / 1200;
  if (r === 0) return safePayment * months;
  const factor = Math.pow(1 + r, months);
  return safePayment * (factor - 1) / (r * factor);
}

export function estimateAffordability(input: AffordabilityInputs): AffordabilityEstimate {
  const ratio = input.targetHousingRatioPercent ?? 28;
  const years = input.loanTermYears ?? 30;
  const issues: ValidationIssue[] = [
    ...validateNonNegative('annualHouseholdIncome', 'Annual household income', input.annualHouseholdIncome),
    ...validateNonNegative('monthlyNonHousingDebt', 'Monthly non-housing debt', input.monthlyNonHousingDebt),
    ...validateNonNegative('downPayment', 'Down payment', input.downPayment),
    ...validatePercent('annualInterestRate', 'Interest rate', input.annualInterestRate, 30),
    ...validatePercent('targetHousingRatioPercent', 'Target housing ratio', ratio, 60),
  ];
  if (years <= 0 || years > 50) issues.push({ field: 'loanTermYears', message: 'Loan term must be between 1 and 50 years.' });

  const grossMonthlyIncome = nonNegative(input.annualHouseholdIncome) / 12;
  const targetHousingBudget = Math.max(0, grossMonthlyIncome * nonNegative(ratio) / 100 - nonNegative(input.monthlyNonHousingDebt));
  const principalInterestBudget = Math.max(0, targetHousingBudget - nonNegative(input.monthlyTaxesInsuranceHoa));
  const possibleLoanAmount = loanFromPayment(principalInterestBudget, input.annualInterestRate, years);
  const possibleHomePrice = possibleLoanAmount + nonNegative(input.downPayment);

  return { grossMonthlyIncome, targetHousingBudget, principalInterestBudget, possibleLoanAmount, possibleHomePrice, issues: uniqueIssues(issues) };
}

export function paymentAtAffordabilityEstimate(input: AffordabilityInputs) {
  const estimate = estimateAffordability(input);
  return monthlyMortgagePayment(estimate.possibleLoanAmount, input.annualInterestRate, input.loanTermYears ?? 30);
}
