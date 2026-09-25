import { clamp, nonNegative, uniqueIssues, validateNonNegative, validatePercent, type ValidationIssue } from './validation.ts';

export type MortgageInputs = {
  homePrice: number;
  downPayment: number;
  annualInterestRate: number;
  loanTermYears: number;
  annualPropertyTaxRate?: number;
  annualHomeInsurance?: number;
  annualPmi?: number;
  monthlyHoa?: number;
  monthlySpecialDistrict?: number;
  monthlyUtilities?: number;
  monthlyMaintenance?: number;
  extraPrincipal?: number;
};

export type AmortizationSummary = {
  scheduledPayment: number;
  payoffMonths: number;
  interestPaid: number;
  principalPaid: number;
  endingBalance: number;
};

export type MortgageEstimate = {
  loanAmount: number;
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPmi: number;
  monthlyHoa: number;
  monthlySpecialDistrict: number;
  monthlyUtilities: number;
  monthlyMaintenance: number;
  monthlyHousingPayment: number;
  monthlyOwnershipCost: number;
  annualOwnershipCost: number;
  amortization: AmortizationSummary;
  issues: ValidationIssue[];
};

export function monthlyMortgagePayment(principal: number, annualInterestRate: number, loanTermYears: number) {
  const safePrincipal = nonNegative(principal);
  const months = Math.max(1, Math.round(nonNegative(loanTermYears) * 12));
  const monthlyRate = nonNegative(annualInterestRate) / 1200;
  if (safePrincipal === 0) return 0;
  if (monthlyRate === 0) return safePrincipal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return safePrincipal * monthlyRate * factor / (factor - 1);
}

export function amortizeLoan(principal: number, annualInterestRate: number, loanTermYears: number, extraPrincipal = 0): AmortizationSummary {
  const safePrincipal = nonNegative(principal);
  const scheduledPayment = monthlyMortgagePayment(safePrincipal, annualInterestRate, loanTermYears);
  const monthlyRate = nonNegative(annualInterestRate) / 1200;
  const maxMonths = Math.max(1, Math.round(clamp(loanTermYears, 1 / 12, 100) * 12));
  const extra = nonNegative(extraPrincipal);
  let balance = safePrincipal;
  let interestPaid = 0;
  let principalPaid = 0;
  let payoffMonths = 0;

  while (balance > 0.005 && payoffMonths < maxMonths) {
    const interest = balance * monthlyRate;
    const principalPortion = Math.min(balance, Math.max(0, scheduledPayment - interest) + extra);
    if (principalPortion <= 0) break;
    interestPaid += interest;
    principalPaid += principalPortion;
    balance = Math.max(0, balance - principalPortion);
    payoffMonths += 1;
  }

  return { scheduledPayment, payoffMonths, interestPaid, principalPaid, endingBalance: balance };
}

export function estimateMortgage(input: MortgageInputs): MortgageEstimate {
  const issues: ValidationIssue[] = [
    ...validateNonNegative('homePrice', 'Home price', input.homePrice),
    ...validateNonNegative('downPayment', 'Down payment', input.downPayment),
    ...validatePercent('annualInterestRate', 'Interest rate', input.annualInterestRate, 30),
    ...validateNonNegative('loanTermYears', 'Loan term', input.loanTermYears),
    ...validatePercent('annualPropertyTaxRate', 'Property-tax rate', input.annualPropertyTaxRate ?? 0, 20),
  ];
  if (input.downPayment > input.homePrice && input.homePrice >= 0) {
    issues.push({ field: 'downPayment', message: 'Down payment cannot exceed the home price.' });
  }
  if (input.loanTermYears <= 0 || input.loanTermYears > 50) {
    issues.push({ field: 'loanTermYears', message: 'Loan term must be between 1 and 50 years.' });
  }

  const homePrice = nonNegative(input.homePrice);
  const downPayment = Math.min(homePrice, nonNegative(input.downPayment));
  const loanAmount = Math.max(0, homePrice - downPayment);
  const monthlyPrincipalInterest = monthlyMortgagePayment(loanAmount, input.annualInterestRate, input.loanTermYears);
  const monthlyPropertyTax = homePrice * nonNegative(input.annualPropertyTaxRate ?? 0) / 100 / 12;
  const monthlyHomeInsurance = nonNegative(input.annualHomeInsurance ?? 0) / 12;
  const monthlyPmi = nonNegative(input.annualPmi ?? 0) / 12;
  const monthlyHoa = nonNegative(input.monthlyHoa ?? 0);
  const monthlySpecialDistrict = nonNegative(input.monthlySpecialDistrict ?? 0);
  const monthlyUtilities = nonNegative(input.monthlyUtilities ?? 0);
  const monthlyMaintenance = nonNegative(input.monthlyMaintenance ?? 0);
  const monthlyHousingPayment = monthlyPrincipalInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyPmi + monthlyHoa + monthlySpecialDistrict;
  const monthlyOwnershipCost = monthlyHousingPayment + monthlyUtilities + monthlyMaintenance;
  const amortization = amortizeLoan(loanAmount, input.annualInterestRate, input.loanTermYears, input.extraPrincipal);

  return {
    loanAmount,
    monthlyPrincipalInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyPmi,
    monthlyHoa,
    monthlySpecialDistrict,
    monthlyUtilities,
    monthlyMaintenance,
    monthlyHousingPayment,
    monthlyOwnershipCost,
    annualOwnershipCost: monthlyOwnershipCost * 12,
    amortization,
    issues: uniqueIssues(issues),
  };
}

export function mortgageSensitivity(input: MortgageInputs) {
  const base = estimateMortgage(input);
  const higherRate = estimateMortgage({ ...input, annualInterestRate: nonNegative(input.annualInterestRate) + 0.5 });
  const lowerPrice = estimateMortgage({ ...input, homePrice: Math.max(0, nonNegative(input.homePrice) - 25000), downPayment: Math.min(nonNegative(input.downPayment), Math.max(0, nonNegative(input.homePrice) - 25000)) });
  const higherTax = estimateMortgage({ ...input, annualPropertyTaxRate: nonNegative(input.annualPropertyTaxRate ?? 0) + 0.25 });
  return [
    { label: 'Interest rate +0.50%', value: higherRate.monthlyOwnershipCost, delta: higherRate.monthlyOwnershipCost - base.monthlyOwnershipCost },
    { label: 'Home price -$25,000', value: lowerPrice.monthlyOwnershipCost, delta: lowerPrice.monthlyOwnershipCost - base.monthlyOwnershipCost },
    { label: 'Property-tax rate +0.25%', value: higherTax.monthlyOwnershipCost, delta: higherTax.monthlyOwnershipCost - base.monthlyOwnershipCost },
  ];
}
