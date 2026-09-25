import { nonNegative, uniqueIssues, validateNonNegative, type ValidationIssue } from './validation.ts';

export type HomeownershipInputs = {
  mortgagePrincipalInterest: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  mortgageInsurance?: number;
  hoaFees?: number;
  specialDistrictCosts?: number;
  maintenance?: number;
  utilities?: number;
  poolLandscape?: number;
};

export type HomeownershipEstimate = {
  monthlyHousing: number;
  monthlyOwnership: number;
  annualOwnership: number;
  breakdown: Array<{ label: string; value: number }>;
  issues: ValidationIssue[];
};

export function estimateHomeownership(input: HomeownershipInputs): HomeownershipEstimate {
  const fields: Array<[keyof HomeownershipInputs, string]> = [
    ['mortgagePrincipalInterest', 'Mortgage principal and interest'],
    ['propertyTaxes', 'Property taxes'],
    ['homeownersInsurance', 'Homeowners insurance'],
    ['mortgageInsurance', 'Mortgage insurance'],
    ['hoaFees', 'HOA fees'],
    ['specialDistrictCosts', 'Special-district costs'],
    ['maintenance', 'Maintenance'],
    ['utilities', 'Utilities'],
    ['poolLandscape', 'Pool and landscaping'],
  ];
  const issues = fields.flatMap(([field, label]) => validateNonNegative(String(field), label, input[field] ?? 0));
  const breakdown = [
    { label: 'Principal & interest', value: nonNegative(input.mortgagePrincipalInterest) },
    { label: 'Property taxes', value: nonNegative(input.propertyTaxes) },
    { label: 'Homeowners insurance', value: nonNegative(input.homeownersInsurance) },
    { label: 'Mortgage insurance', value: nonNegative(input.mortgageInsurance ?? 0) },
    { label: 'HOA', value: nonNegative(input.hoaFees ?? 0) },
    { label: 'Special districts', value: nonNegative(input.specialDistrictCosts ?? 0) },
    { label: 'Maintenance', value: nonNegative(input.maintenance ?? 0) },
    { label: 'Utilities', value: nonNegative(input.utilities ?? 0) },
    { label: 'Pool & landscaping', value: nonNegative(input.poolLandscape ?? 0) },
  ];
  const monthlyHousing = breakdown.slice(0, 6).reduce((sum, item) => sum + item.value, 0);
  const monthlyOwnership = breakdown.reduce((sum, item) => sum + item.value, 0);
  return { monthlyHousing, monthlyOwnership, annualOwnership: monthlyOwnership * 12, breakdown, issues: uniqueIssues(issues) };
}
