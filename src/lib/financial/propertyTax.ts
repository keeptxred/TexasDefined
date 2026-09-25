import { nonNegative, uniqueIssues, validateNonNegative, validatePercent, type ValidationIssue } from './validation.ts';

export function propertyTaxFromValue(value: number, ratePercent: number) {
  return nonNegative(value) * nonNegative(ratePercent) / 100;
}

export type SplitPropertyTaxInput = {
  homeValue: number;
  schoolExemption: number;
  otherExemption: number;
  schoolRate: number;
  otherRate: number;
};

export function estimateSplitPropertyTax(input: SplitPropertyTaxInput) {
  const issues: ValidationIssue[] = [
    ...validateNonNegative('homeValue', 'Home value', input.homeValue),
    ...validateNonNegative('schoolExemption', 'School exemption', input.schoolExemption),
    ...validateNonNegative('otherExemption', 'Other exemption', input.otherExemption),
    ...validatePercent('schoolRate', 'School tax rate', input.schoolRate, 20),
    ...validatePercent('otherRate', 'Other local tax rate', input.otherRate, 20),
  ];
  const value = nonNegative(input.homeValue);
  const schoolExemption = Math.min(value, nonNegative(input.schoolExemption));
  const otherExemption = Math.min(value, nonNegative(input.otherExemption));
  const schoolTaxable = Math.max(0, value - schoolExemption);
  const otherTaxable = Math.max(0, value - otherExemption);
  const schoolTax = propertyTaxFromValue(schoolTaxable, input.schoolRate);
  const otherTax = propertyTaxFromValue(otherTaxable, input.otherRate);
  const total = schoolTax + otherTax;
  return {
    schoolTaxable,
    otherTaxable,
    schoolTax,
    otherTax,
    total,
    monthly: total / 12,
    combinedRate: nonNegative(input.schoolRate) + nonNegative(input.otherRate),
    issues: uniqueIssues(issues),
  };
}

export function estimateHomesteadSavings(input: SplitPropertyTaxInput) {
  const after = estimateSplitPropertyTax(input);
  const value = nonNegative(input.homeValue);
  const beforeSchool = propertyTaxFromValue(value, input.schoolRate);
  const beforeOther = propertyTaxFromValue(value, input.otherRate);
  const before = beforeSchool + beforeOther;
  const annualSavings = Math.max(0, before - after.total);
  return {
    ...after,
    before,
    after: after.total,
    annualSavings,
    monthlySavings: annualSavings / 12,
    monthlyTaxAfter: after.total / 12,
  };
}

export function estimatePropertyTaxEscrow(input: {
  annualTax: number;
  annualInsurance: number;
  annualHoa: number;
  currentMonthlyEscrow: number;
}) {
  const issues = uniqueIssues([
    ...validateNonNegative('annualTax', 'Annual property tax', input.annualTax),
    ...validateNonNegative('annualInsurance', 'Annual homeowners insurance', input.annualInsurance),
    ...validateNonNegative('annualHoa', 'Annual HOA dues', input.annualHoa),
    ...validateNonNegative('currentMonthlyEscrow', 'Current monthly escrow', input.currentMonthlyEscrow),
  ]);
  const yearly = nonNegative(input.annualTax) + nonNegative(input.annualInsurance) + nonNegative(input.annualHoa);
  const monthly = yearly / 12;
  return { yearly, monthly, difference: monthly - nonNegative(input.currentMonthlyEscrow), issues };
}

export function estimateOver65PropertyTax(input: SplitPropertyTaxInput & { schoolCeiling: number }) {
  const base = estimateSplitPropertyTax(input);
  const school = base.schoolTax;
  const schoolCeiling = nonNegative(input.schoolCeiling);
  const cappedSchool = schoolCeiling > 0 ? Math.min(school, schoolCeiling) : school;
  const total = cappedSchool + base.otherTax;
  const noExemptionTax = propertyTaxFromValue(input.homeValue, nonNegative(input.schoolRate) + nonNegative(input.otherRate));
  return {
    ...base,
    school,
    cappedSchool,
    total,
    monthly: total / 12,
    savingsVsNoExemptions: Math.max(0, noExemptionTax - total),
    issues: uniqueIssues([...base.issues, ...validateNonNegative('schoolCeiling', 'School-tax ceiling', input.schoolCeiling)]),
  };
}

export function estimateSingleExemptionSavings(input: { homeValue: number; taxRate: number; exemption: number }) {
  const value = nonNegative(input.homeValue);
  const exemption = Math.min(value, nonNegative(input.exemption));
  const before = propertyTaxFromValue(value, input.taxRate);
  const taxable = Math.max(0, value - exemption);
  const after = propertyTaxFromValue(taxable, input.taxRate);
  const savings = Math.max(0, before - after);
  return {
    taxable,
    before,
    after,
    savings,
    monthlySavings: savings / 12,
    issues: uniqueIssues([
      ...validateNonNegative('homeValue', 'Home value', input.homeValue),
      ...validatePercent('taxRate', 'Tax rate', input.taxRate, 20),
      ...validateNonNegative('exemption', 'Exemption', input.exemption),
    ]),
  };
}

export function comparePropertyTaxScenarios(input: {
  homeValue: number;
  rateA: number;
  rateB: number;
  exemptionA: number;
  exemptionB: number;
}) {
  const value = nonNegative(input.homeValue);
  const taxableA = Math.max(0, value - Math.min(value, nonNegative(input.exemptionA)));
  const taxableB = Math.max(0, value - Math.min(value, nonNegative(input.exemptionB)));
  const taxA = propertyTaxFromValue(taxableA, input.rateA);
  const taxB = propertyTaxFromValue(taxableB, input.rateB);
  const difference = Math.abs(taxA - taxB);
  return {
    taxA,
    taxB,
    taxableA,
    taxableB,
    difference,
    monthlyDifference: difference / 12,
    issues: uniqueIssues([
      ...validateNonNegative('homeValue', 'Home value', input.homeValue),
      ...validatePercent('rateA', 'Location A tax rate', input.rateA, 20),
      ...validatePercent('rateB', 'Location B tax rate', input.rateB, 20),
      ...validateNonNegative('exemptionA', 'Location A exemptions', input.exemptionA),
      ...validateNonNegative('exemptionB', 'Location B exemptions', input.exemptionB),
    ]),
  };
}

export function estimateAgriculturalValuation(input: { marketValue: number; productivityValue: number; taxRate: number }) {
  const marketValue = nonNegative(input.marketValue);
  const productivityValue = Math.min(marketValue, nonNegative(input.productivityValue));
  const marketTax = propertyTaxFromValue(marketValue, input.taxRate);
  const productivityTax = propertyTaxFromValue(productivityValue, input.taxRate);
  return {
    marketTax,
    productivityTax,
    taxDifference: Math.max(0, marketTax - productivityTax),
    valueDifference: Math.max(0, marketValue - productivityValue),
    issues: uniqueIssues([
      ...validateNonNegative('marketValue', 'Market value', input.marketValue),
      ...validateNonNegative('productivityValue', 'Productivity value', input.productivityValue),
      ...validatePercent('taxRate', 'Tax rate', input.taxRate, 20),
    ]),
  };
}

export function estimatePropertyTaxProtest(input: {
  proposedValue: number;
  targetValue: number;
  taxRate: number;
  confidencePercent: number;
}) {
  const proposedValue = nonNegative(input.proposedValue);
  const targetValue = Math.max(0, Math.min(nonNegative(input.targetValue), proposedValue));
  const reduction = Math.max(0, proposedValue - targetValue);
  const annualSavings = propertyTaxFromValue(reduction, input.taxRate);
  const confidence = Math.max(0, Math.min(100, nonNegative(input.confidencePercent)));
  const percentReduction = proposedValue > 0 ? reduction / proposedValue * 100 : 0;
  const expectedSavings = annualSavings * confidence / 100;
  let message = 'Use the probability slider only as your own planning assumption; this tool does not predict a protest outcome.';
  if (confidence >= 75) message = 'Your planning scenario assumes a high likelihood of reaching the target value. Treat the expected-savings figure as a scenario, not a prediction.';
  else if (confidence <= 25) message = 'Your planning scenario assumes a low likelihood of reaching the target value. The full-savings figure still shows the tax effect if the target value were achieved.';
  return {
    targetValue,
    reduction,
    annualSavings,
    monthlySavings: annualSavings / 12,
    percentReduction,
    expectedSavings,
    message,
    issues: uniqueIssues([
      ...validateNonNegative('proposedValue', 'Proposed value', input.proposedValue),
      ...validateNonNegative('targetValue', 'Target value', input.targetValue),
      ...validatePercent('taxRate', 'Tax rate', input.taxRate, 20),
      ...validatePercent('confidencePercent', 'Planning probability', input.confidencePercent, 100),
    ]),
  };
}
