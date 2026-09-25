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
  maxTotalDebtRatioPercent?: number;
}

export function calculateAffordability(input: AffordabilityInputs) {
  const issues: ValidationIssue[] = [];
  if (!Number.isFinite(input.annualIncome) || input.annualIncome <= 0) issues.push({ field: 'annualIncome', message: 'Annual household income must be greater than zero.' });
  if (!Number.isFinite(input.monthlyDebt) || input.monthlyDebt < 0) issues.push({ field: 'monthlyDebt', message: 'Monthly debt cannot be negative.' });
  if (!Number.isFinite(input.downPayment) || input.downPayment < 0) issues.push({ field: 'downPayment', message: 'Down payment cannot be negative.' });
  if (!Number.isFinite(input.monthlyTaxesInsuranceHoa) || input.monthlyTaxesInsuranceHoa < 0) issues.push({ field: 'monthlyTaxesInsuranceHoa', message: 'Recurring housing costs cannot be negative.' });

  const grossMonthlyIncome = nonNegative(input.annualIncome) / 12;
  const housingRatio = clamp(input.maxHousingRatioPercent ?? 28, 1, 100) / 100;
  const totalDebtRatio = clamp(input.maxTotalDebtRatioPercent ?? 36, 1, 100) / 100;
  const monthlyDebt = nonNegative(input.monthlyDebt);

  const housingBudgetByHousingRatio = grossMonthlyIncome * housingRatio;
  const housingBudgetByTotalDebtRatio = Math.max(0, grossMonthlyIncome * totalDebtRatio - monthlyDebt);
  const housingBudget = Math.min(housingBudgetByHousingRatio, housingBudgetByTotalDebtRatio);
  const bindingConstraint = housingBudgetByHousingRatio <= housingBudgetByTotalDebtRatio + 1e-9 ? 'housing-ratio' : 'total-debt-ratio';
  const principalInterestBudget = Math.max(0, housingBudget - nonNegative(input.monthlyTaxesInsuranceHoa));
  const termYears = clamp(input.termYears ?? 30, 1, 50);
  const paymentPerDollar = calculateMonthlyPrincipalInterest(1, input.annualRatePercent, termYears);
  const loanAmount = paymentPerDollar > 0 ? principalInterestBudget / paymentPerDollar : 0;

  return {
    grossMonthlyIncome,
    housingBudget,
    housingBudgetByHousingRatio,
    housingBudgetByTotalDebtRatio,
    bindingConstraint,
    principalInterestBudget,
    loanAmount,
    possibleHomePrice: loanAmount + nonNegative(input.downPayment),
    housingRatioPercent: housingRatio * 100,
    totalDebtRatioPercent: totalDebtRatio * 100,
    issues,
  };
}
