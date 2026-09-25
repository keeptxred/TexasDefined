import { clamp, nonNegative, type ValidationIssue } from './validation.ts';

export interface MortgageInputs {
  homePrice: number;
  downPayment: number;
  annualRatePercent: number;
  termYears: number;
  propertyTaxRatePercent?: number;
  annualPropertyTax?: number;
  annualInsurance?: number;
  monthlyPmi?: number;
  monthlyHoa?: number;
  monthlySpecialDistricts?: number;
  monthlyUtilities?: number;
  monthlyMaintenance?: number;
  monthlyPool?: number;
  monthlyLandscaping?: number;
  monthlyOther?: number;
  extraMonthlyPrincipal?: number;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  extraPrincipal: number;
  endingBalance: number;
}

export interface MortgageEstimate {
  loanAmount: number;
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyPmi: number;
  monthlyHoa: number;
  monthlySpecialDistricts: number;
  monthlyUtilities: number;
  monthlyMaintenance: number;
  monthlyPool: number;
  monthlyLandscaping: number;
  monthlyOther: number;
  monthlyHousingPayment: number;
  monthlyOwnershipCost: number;
  annualOwnershipCost: number;
  totalInterest: number;
  totalLoanPayments: number;
  payoffMonths: number;
  amortization: AmortizationRow[];
  issues: ValidationIssue[];
}

export function calculateMonthlyPrincipalInterest(principal: number, annualRatePercent: number, termYears: number) {
  const p = nonNegative(principal);
  const months = Math.max(1, Math.round(nonNegative(termYears) * 12));
  const monthlyRate = nonNegative(annualRatePercent) / 1200;
  if (p === 0) return 0;
  if (monthlyRate === 0) return p / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return p * monthlyRate * factor / (factor - 1);
}

export function validateMortgageInputs(input: MortgageInputs): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!Number.isFinite(input.homePrice) || input.homePrice <= 0) issues.push({ field: 'homePrice', message: 'Home price must be greater than zero.' });
  if (!Number.isFinite(input.downPayment) || input.downPayment < 0) issues.push({ field: 'downPayment', message: 'Down payment cannot be negative.' });
  if (input.downPayment > input.homePrice) issues.push({ field: 'downPayment', message: 'Down payment cannot exceed the home price.' });
  if (!Number.isFinite(input.annualRatePercent) || input.annualRatePercent < 0 || input.annualRatePercent > 100) issues.push({ field: 'annualRatePercent', message: 'Interest rate must be between 0% and 100%.' });
  if (!Number.isFinite(input.termYears) || input.termYears <= 0 || input.termYears > 50) issues.push({ field: 'termYears', message: 'Loan term must be between 1 and 50 years.' });
  const percent = input.propertyTaxRatePercent;
  if (percent !== undefined && (!Number.isFinite(percent) || percent < 0 || percent > 20)) issues.push({ field: 'propertyTaxRatePercent', message: 'Property-tax rate must be between 0% and 20%.' });
  return issues;
}

export function buildAmortizationSchedule({
  principal,
  annualRatePercent,
  termYears,
  extraMonthlyPrincipal = 0,
}: {
  principal: number;
  annualRatePercent: number;
  termYears: number;
  extraMonthlyPrincipal?: number;
}): AmortizationRow[] {
  const startingBalance = nonNegative(principal);
  const scheduled = calculateMonthlyPrincipalInterest(startingBalance, annualRatePercent, termYears);
  const rate = nonNegative(annualRatePercent) / 1200;
  const maxMonths = Math.max(1, Math.round(nonNegative(termYears) * 12));
  const extra = nonNegative(extraMonthlyPrincipal);
  const rows: AmortizationRow[] = [];
  let balance = startingBalance;

  for (let month = 1; month <= maxMonths && balance > 0.005; month += 1) {
    const interest = balance * rate;
    const scheduledPrincipal = Math.max(0, scheduled - interest);
    const principalPaid = Math.min(balance, scheduledPrincipal);
    const remainingAfterScheduled = Math.max(0, balance - principalPaid);
    const extraPaid = Math.min(remainingAfterScheduled, extra);
    const endingBalance = Math.max(0, remainingAfterScheduled - extraPaid);
    rows.push({
      month,
      payment: Math.min(balance + interest, scheduled + extra),
      principal: principalPaid,
      interest,
      extraPrincipal: extraPaid,
      endingBalance,
    });
    balance = endingBalance;
  }
  return rows;
}

export function calculateMortgage(input: MortgageInputs): MortgageEstimate {
  const issues = validateMortgageInputs(input);
  const homePrice = nonNegative(input.homePrice);
  const downPayment = Math.min(homePrice, nonNegative(input.downPayment));
  const loanAmount = Math.max(0, homePrice - downPayment);
  const rate = clamp(input.annualRatePercent, 0, 100);
  const term = clamp(input.termYears, 1, 50);
  const monthlyPrincipalInterest = calculateMonthlyPrincipalInterest(loanAmount, rate, term);
  const monthlyPropertyTax = input.annualPropertyTax !== undefined
    ? nonNegative(input.annualPropertyTax) / 12
    : homePrice * clamp(input.propertyTaxRatePercent ?? 0, 0, 20) / 100 / 12;
  const monthlyInsurance = nonNegative(input.annualInsurance ?? 0) / 12;
  const monthlyPmi = nonNegative(input.monthlyPmi ?? 0);
  const monthlyHoa = nonNegative(input.monthlyHoa ?? 0);
  const monthlySpecialDistricts = nonNegative(input.monthlySpecialDistricts ?? 0);
  const monthlyUtilities = nonNegative(input.monthlyUtilities ?? 0);
  const monthlyMaintenance = nonNegative(input.monthlyMaintenance ?? 0);
  const monthlyPool = nonNegative(input.monthlyPool ?? 0);
  const monthlyLandscaping = nonNegative(input.monthlyLandscaping ?? 0);
  const monthlyOther = nonNegative(input.monthlyOther ?? 0);
  const monthlyHousingPayment = monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance + monthlyPmi + monthlyHoa + monthlySpecialDistricts;
  const monthlyOwnershipCost = monthlyHousingPayment + monthlyUtilities + monthlyMaintenance + monthlyPool + monthlyLandscaping + monthlyOther;
  const amortization = buildAmortizationSchedule({
    principal: loanAmount,
    annualRatePercent: rate,
    termYears: term,
    extraMonthlyPrincipal: input.extraMonthlyPrincipal,
  });
  const totalInterest = amortization.reduce((sum, row) => sum + row.interest, 0);
  const totalLoanPayments = amortization.reduce((sum, row) => sum + row.payment, 0);
  return {
    loanAmount,
    monthlyPrincipalInterest,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyPmi,
    monthlyHoa,
    monthlySpecialDistricts,
    monthlyUtilities,
    monthlyMaintenance,
    monthlyPool,
    monthlyLandscaping,
    monthlyOther,
    monthlyHousingPayment,
    monthlyOwnershipCost,
    annualOwnershipCost: monthlyOwnershipCost * 12,
    totalInterest,
    totalLoanPayments,
    payoffMonths: amortization.length,
    amortization,
    issues,
  };
}

export function calculateMortgagePayoff(input: { balance: number; annualRatePercent: number; regularPayment: number; extraMonthlyPrincipal?: number }) {
  const balance = nonNegative(input.balance);
  const rate = clamp(input.annualRatePercent, 0, 100) / 1200;
  const payment = nonNegative(input.regularPayment) + nonNegative(input.extraMonthlyPrincipal ?? 0);
  if (balance === 0) return { months: 0, interest: 0, paymentTooLow: false };
  if (payment <= balance * rate) return { months: Infinity, interest: Infinity, paymentTooLow: true };
  let remaining = balance;
  let months = 0;
  let interest = 0;
  while (remaining > 0.005 && months < 1200) {
    const monthInterest = remaining * rate;
    interest += monthInterest;
    remaining = Math.max(0, remaining + monthInterest - payment);
    months += 1;
  }
  return { months, interest, paymentTooLow: remaining > 0.005 };
}

export function calculateRefinance(input: { balance: number; currentRatePercent: number; newRatePercent: number; currentTermYears?: number; newTermYears: number; closingCosts: number }) {
  const balance = nonNegative(input.balance);
  const currentTermYears = input.currentTermYears ?? input.newTermYears;
  const currentPayment = calculateMonthlyPrincipalInterest(balance, input.currentRatePercent, currentTermYears);
  const newPayment = calculateMonthlyPrincipalInterest(balance, input.newRatePercent, input.newTermYears);
  const monthlySavings = currentPayment - newPayment;
  const breakEvenMonths = monthlySavings > 0 ? nonNegative(input.closingCosts) / monthlySavings : Infinity;
  return { currentPayment, newPayment, monthlySavings, breakEvenMonths };
}
