import { clamp, nonNegative } from './validation.ts';

export function calculatePropertyTax(taxableValue: number, ratePercent: number) {
  return nonNegative(taxableValue) * clamp(ratePercent, 0, 100) / 100;
}

export function calculateSpecialDistrictImpact(input: { taxableValue: number; ratePercent: number; years: number }) {
  const annual = calculatePropertyTax(input.taxableValue, input.ratePercent);
  const years = clamp(input.years, 1, 100);
  return { annual, monthly: annual / 12, fiveYearSimple: annual * 5, horizonSimple: annual * years, years };
}

export function calculateHomesteadSavings(input: { homeValue: number; schoolRatePercent: number; otherRatePercent: number; schoolExemption: number; otherExemption: number }) {
  const value = nonNegative(input.homeValue);
  const schoolRate = clamp(input.schoolRatePercent, 0, 100);
  const otherRate = clamp(input.otherRatePercent, 0, 100);
  const schoolExemption = Math.min(value, nonNegative(input.schoolExemption));
  const otherExemption = Math.min(value, nonNegative(input.otherExemption));
  const taxableSchoolValue = Math.max(0, value - schoolExemption);
  const taxableOtherValue = Math.max(0, value - otherExemption);
  const before = calculatePropertyTax(value, schoolRate) + calculatePropertyTax(value, otherRate);
  const after = calculatePropertyTax(taxableSchoolValue, schoolRate) + calculatePropertyTax(taxableOtherValue, otherRate);
  const annualSavings = Math.max(0, before - after);
  return { combinedRate: schoolRate + otherRate, taxableSchoolValue, taxableOtherValue, before, after, annualSavings, monthlySavings: annualSavings / 12, monthlyTaxAfter: after / 12 };
}


export function calculateSplitPropertyTax(input: { homeValue: number; schoolExemption: number; otherExemption: number; schoolRatePercent: number; otherRatePercent: number }) {
  const value = nonNegative(input.homeValue);
  const schoolExemption = Math.min(value, nonNegative(input.schoolExemption));
  const otherExemption = Math.min(value, nonNegative(input.otherExemption));
  const schoolRate = clamp(input.schoolRatePercent, 0, 100);
  const otherRate = clamp(input.otherRatePercent, 0, 100);
  const schoolTaxable = Math.max(0, value - schoolExemption);
  const otherTaxable = Math.max(0, value - otherExemption);
  const schoolTax = calculatePropertyTax(schoolTaxable, schoolRate);
  const otherTax = calculatePropertyTax(otherTaxable, otherRate);
  const total = schoolTax + otherTax;
  return { schoolTaxable, otherTaxable, schoolTax, otherTax, total, monthly: total / 12, combinedRate: schoolRate + otherRate };
}

export function calculateExemptionTaxImpact(input: { homeValue: number; ratePercent: number; exemption: number }) {
  const value = nonNegative(input.homeValue);
  const exemption = Math.min(value, nonNegative(input.exemption));
  const taxable = Math.max(0, value - exemption);
  const before = calculatePropertyTax(value, input.ratePercent);
  const after = calculatePropertyTax(taxable, input.ratePercent);
  const savings = Math.max(0, before - after);
  return { taxable, before, after, savings, monthlySavings: savings / 12 };
}

export function calculateAgriculturalValuationImpact(input: { marketValue: number; productivityValue: number; ratePercent: number }) {
  const marketValue = nonNegative(input.marketValue);
  const productivityValue = nonNegative(input.productivityValue);
  const marketTax = calculatePropertyTax(marketValue, input.ratePercent);
  const productivityTax = calculatePropertyTax(productivityValue, input.ratePercent);
  return { marketTax, productivityTax, annualTaxDifference: Math.max(0, marketTax - productivityTax), valueDifference: Math.max(0, marketValue - productivityValue) };
}

export function calculateOver65PropertyTax(input: { homeValue: number; schoolRatePercent: number; otherRatePercent: number; schoolExemption: number; otherExemption: number; schoolTaxCeiling: number }) {
  const split = calculateSplitPropertyTax(input);
  const ceiling = nonNegative(input.schoolTaxCeiling);
  const schoolAfterCeiling = ceiling > 0 ? Math.min(split.schoolTax, ceiling) : split.schoolTax;
  const total = schoolAfterCeiling + split.otherTax;
  const noExemptions = calculatePropertyTax(input.homeValue, clamp(input.schoolRatePercent, 0, 100) + clamp(input.otherRatePercent, 0, 100));
  return { schoolBeforeCeiling: split.schoolTax, schoolAfterCeiling, otherTax: split.otherTax, total, monthly: total / 12, savingsVsNoExemptions: Math.max(0, noExemptions - total) };
}

export function calculatePropertyTaxComparison(input: { homeValue: number; rateAPercent: number; rateBPercent: number; exemptionA: number; exemptionB: number }) {
  const value = nonNegative(input.homeValue);
  const annualA = calculatePropertyTax(Math.max(0, value - Math.min(value, nonNegative(input.exemptionA))), input.rateAPercent);
  const annualB = calculatePropertyTax(Math.max(0, value - Math.min(value, nonNegative(input.exemptionB))), input.rateBPercent);
  const annualDifference = Math.abs(annualA - annualB);
  return { annualA, annualB, annualDifference, monthlyDifference: annualDifference / 12 };
}

export function calculatePropertyTaxEscrow(input: { annualTax: number; annualInsurance: number; annualHoa: number; currentMonthlyEscrow: number }) {
  const yearly = nonNegative(input.annualTax) + nonNegative(input.annualInsurance) + nonNegative(input.annualHoa);
  const monthly = yearly / 12;
  return { yearly, monthly, difference: monthly - nonNegative(input.currentMonthlyEscrow) };
}

export function calculateProtestSavings(input: { proposedValue: number; targetValue: number; ratePercent: number; confidencePercent: number }) {
  const proposedValue = nonNegative(input.proposedValue);
  const targetValue = Math.min(proposedValue, nonNegative(input.targetValue));
  const reduction = Math.max(0, proposedValue - targetValue);
  const annualSavings = calculatePropertyTax(reduction, input.ratePercent);
  const percentReduction = proposedValue > 0 ? reduction / proposedValue * 100 : 0;
  const expectedSavings = annualSavings * clamp(input.confidencePercent, 0, 100) / 100;
  return { reduction, annualSavings, monthlySavings: annualSavings / 12, percentReduction, expectedSavings, targetValue };
}
