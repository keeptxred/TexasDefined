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
