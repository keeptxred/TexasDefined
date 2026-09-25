import { nonNegative, uniqueIssues, validateNonNegative, type ValidationIssue } from './validation.ts';

export type UtilityInputs = {
  electricity: number;
  waterSewer: number;
  naturalGas: number;
  internet: number;
  trashRecycling: number;
  other?: number;
  summerElectricityIncreasePercent?: number;
};

export type UtilityEstimate = {
  monthlyBase: number;
  annualBase: number;
  summerStressMonthly: number;
  annualWithThreeSummerMonths: number;
  issues: ValidationIssue[];
};

export function estimateUtilities(input: UtilityInputs): UtilityEstimate {
  const issues: ValidationIssue[] = [];
  for (const [field, label, value] of [
    ['electricity', 'Electricity', input.electricity],
    ['waterSewer', 'Water and sewer', input.waterSewer],
    ['naturalGas', 'Natural gas', input.naturalGas],
    ['internet', 'Internet', input.internet],
    ['trashRecycling', 'Trash and recycling', input.trashRecycling],
    ['other', 'Other utilities', input.other ?? 0],
  ] as const) issues.push(...validateNonNegative(field, label, value));
  const monthlyBase = nonNegative(input.electricity) + nonNegative(input.waterSewer) + nonNegative(input.naturalGas) + nonNegative(input.internet) + nonNegative(input.trashRecycling) + nonNegative(input.other ?? 0);
  const summerIncrease = nonNegative(input.summerElectricityIncreasePercent ?? 30) / 100;
  const summerStressMonthly = monthlyBase + nonNegative(input.electricity) * summerIncrease;
  const annualWithThreeSummerMonths = monthlyBase * 9 + summerStressMonthly * 3;
  return { monthlyBase, annualBase: monthlyBase * 12, summerStressMonthly, annualWithThreeSummerMonths, issues: uniqueIssues(issues) };
}
