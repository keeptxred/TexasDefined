import { nonNegative, uniqueIssues, validateNonNegative, validatePercent, type ValidationIssue } from './validation.ts';

export type HomeInsuranceInputs = {
  replacementCost: number;
  baseRatePercent: number;
  annualWindFloodAdditions: number;
  annualCredits: number;
};

export type HomeInsuranceEstimate = {
  basePremium: number;
  annualPremium: number;
  monthlyPremium: number;
  issues: ValidationIssue[];
};

export function estimateHomeInsurance(input: HomeInsuranceInputs): HomeInsuranceEstimate {
  const issues: ValidationIssue[] = [
    ...validateNonNegative('replacementCost', 'Replacement cost', input.replacementCost),
    ...validatePercent('baseRatePercent', 'Base insurance rate', input.baseRatePercent, 10),
    ...validateNonNegative('annualWindFloodAdditions', 'Wind/flood additions', input.annualWindFloodAdditions),
    ...validateNonNegative('annualCredits', 'Credits', input.annualCredits),
  ];
  const basePremium = nonNegative(input.replacementCost) * nonNegative(input.baseRatePercent) / 100;
  const annualPremium = Math.max(0, basePremium + nonNegative(input.annualWindFloodAdditions) - nonNegative(input.annualCredits));
  return { basePremium, annualPremium, monthlyPremium: annualPremium / 12, issues: uniqueIssues(issues) };
}
