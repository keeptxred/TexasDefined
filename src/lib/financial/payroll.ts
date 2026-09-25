import { nonNegative, uniqueIssues, validateNonNegative, validatePercent, type ValidationIssue } from './validation.ts';

export type FilingStatus = 'single' | 'married_jointly' | 'head_of_household' | 'married_separately';

type Bracket = { upTo: number; rate: number };

const STANDARD_DEDUCTION_2026: Record<FilingStatus, number> = {
  single: 16100,
  married_jointly: 32200,
  head_of_household: 24150,
  married_separately: 16100,
};

const BRACKETS_2026: Record<FilingStatus, Bracket[]> = {
  single: [
    { upTo: 12400, rate: 0.10 }, { upTo: 50400, rate: 0.12 }, { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 }, { upTo: 256225, rate: 0.32 }, { upTo: 640600, rate: 0.35 },
    { upTo: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
  married_jointly: [
    { upTo: 24800, rate: 0.10 }, { upTo: 100800, rate: 0.12 }, { upTo: 211400, rate: 0.22 },
    { upTo: 403550, rate: 0.24 }, { upTo: 512450, rate: 0.32 }, { upTo: 768700, rate: 0.35 },
    { upTo: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
  head_of_household: [
    { upTo: 17700, rate: 0.10 }, { upTo: 67450, rate: 0.12 }, { upTo: 105700, rate: 0.22 },
    { upTo: 201750, rate: 0.24 }, { upTo: 256200, rate: 0.32 }, { upTo: 640600, rate: 0.35 },
    { upTo: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
  married_separately: [
    { upTo: 12400, rate: 0.10 }, { upTo: 50400, rate: 0.12 }, { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 }, { upTo: 256225, rate: 0.32 }, { upTo: 384350, rate: 0.35 },
    { upTo: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
};

export const PAYROLL_2026 = {
  taxYear: 2026,
  socialSecurityRate: 0.062,
  socialSecurityWageBase: 184500,
  medicareRate: 0.0145,
  additionalMedicareRate: 0.009,
  additionalMedicareWithholdingThreshold: 200000,
  texasIndividualIncomeTaxRate: 0,
  standardDeduction: STANDARD_DEDUCTION_2026,
} as const;

export type PayrollInputs = {
  annualSalary: number;
  filingStatus: FilingStatus;
  retirementPercent?: number;
  annualPretaxBenefits?: number;
  annualAfterTaxDeductions?: number;
};

export type PayrollEstimate = {
  grossIncome: number;
  retirementContribution: number;
  pretaxBenefits: number;
  federalTaxableIncome: number;
  federalIncomeTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  texasStateIncomeTax: number;
  afterTaxDeductions: number;
  totalDeductions: number;
  annualTakeHome: number;
  monthlyTakeHome: number;
  effectiveFederalRate: number;
  issues: ValidationIssue[];
};

export function federalIncomeTax2026(taxableIncome: number, filingStatus: FilingStatus) {
  let remaining = nonNegative(taxableIncome);
  let previous = 0;
  let tax = 0;
  for (const bracket of BRACKETS_2026[filingStatus]) {
    if (remaining <= 0) break;
    const span = bracket.upTo === Number.POSITIVE_INFINITY ? remaining : Math.max(0, bracket.upTo - previous);
    const amount = Math.min(remaining, span);
    tax += amount * bracket.rate;
    remaining -= amount;
    previous = bracket.upTo;
  }
  return tax;
}

export function estimatePayroll2026(input: PayrollInputs): PayrollEstimate {
  const retirementPercent = input.retirementPercent ?? 0;
  const issues = uniqueIssues([
    ...validateNonNegative('annualSalary', 'Annual salary', input.annualSalary),
    ...validatePercent('retirementPercent', 'Retirement contribution', retirementPercent, 100),
    ...validateNonNegative('annualPretaxBenefits', 'Pre-tax benefits', input.annualPretaxBenefits ?? 0),
    ...validateNonNegative('annualAfterTaxDeductions', 'After-tax deductions', input.annualAfterTaxDeductions ?? 0),
  ]);

  const grossIncome = nonNegative(input.annualSalary);
  const retirementContribution = grossIncome * nonNegative(retirementPercent) / 100;
  const pretaxBenefits = nonNegative(input.annualPretaxBenefits ?? 0);
  const federalTaxableIncome = Math.max(0, grossIncome - retirementContribution - pretaxBenefits - STANDARD_DEDUCTION_2026[input.filingStatus]);
  const federalIncomeTax = federalIncomeTax2026(federalTaxableIncome, input.filingStatus);

  // Retirement deferrals generally remain subject to FICA. This planning model treats
  // the entered pre-tax benefits as cafeteria-plan deductions that reduce FICA wages.
  const ficaWages = Math.max(0, grossIncome - pretaxBenefits);
  const socialSecurityTax = Math.min(ficaWages, PAYROLL_2026.socialSecurityWageBase) * PAYROLL_2026.socialSecurityRate;
  const medicareTax = ficaWages * PAYROLL_2026.medicareRate;
  const additionalMedicareTax = Math.max(0, ficaWages - PAYROLL_2026.additionalMedicareWithholdingThreshold) * PAYROLL_2026.additionalMedicareRate;
  const texasStateIncomeTax = 0;
  const afterTaxDeductions = nonNegative(input.annualAfterTaxDeductions ?? 0);

  const totalDeductions = retirementContribution + pretaxBenefits + federalIncomeTax + socialSecurityTax + medicareTax + additionalMedicareTax + afterTaxDeductions;
  const annualTakeHome = Math.max(0, grossIncome - totalDeductions);

  return {
    grossIncome,
    retirementContribution,
    pretaxBenefits,
    federalTaxableIncome,
    federalIncomeTax,
    socialSecurityTax,
    medicareTax,
    additionalMedicareTax,
    texasStateIncomeTax,
    afterTaxDeductions,
    totalDeductions,
    annualTakeHome,
    monthlyTakeHome: annualTakeHome / 12,
    effectiveFederalRate: grossIncome ? federalIncomeTax / grossIncome * 100 : 0,
    issues,
  };
}

export function grossSalaryForTakeHome2026(targetAnnualTakeHome: number, input: Omit<PayrollInputs, 'annualSalary'>) {
  const target = nonNegative(targetAnnualTakeHome);
  let low = 0;
  let high = Math.max(100000, target * 3 + 50000);
  while (estimatePayroll2026({ ...input, annualSalary: high }).annualTakeHome < target && high < 10000000) high *= 2;
  for (let i = 0; i < 80; i += 1) {
    const mid = (low + high) / 2;
    const takeHome = estimatePayroll2026({ ...input, annualSalary: mid }).annualTakeHome;
    if (takeHome < target) low = mid;
    else high = mid;
  }
  return high;
}
