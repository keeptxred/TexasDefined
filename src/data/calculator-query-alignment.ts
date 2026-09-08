import {
  homeInsuranceDescription as sourceHomeInsuranceDescription,
  homeInsuranceFaqs as sourceHomeInsuranceFaqs,
  homeInsuranceSeoTitle as sourceHomeInsuranceSeoTitle,
  salaryDescription as sourceSalaryDescription,
  salaryFaqs as sourceSalaryFaqs,
  salarySeoTitle as sourceSalarySeoTitle,
} from '@/lib/calculator-seo';

export const homeInsuranceSeoTitle = 'Texas Homeowners Insurance Calculator | No Personal Info' satisfies typeof sourceHomeInsuranceSeoTitle;
export const homeInsuranceDescription = 'Estimate Texas homeowners insurance from replacement cost, rate assumptions, wind or flood coverage, and deductibles—without entering your name, email, phone number, or street address.' satisfies typeof sourceHomeInsuranceDescription;
export const homeInsuranceFaqs = [...sourceHomeInsuranceFaqs] as const;

export const salarySeoTitle = 'Texas Paycheck Calculator | Take-Home Pay After Taxes' satisfies typeof sourceSalarySeoTitle;
export const salaryDescription = 'Estimate Texas take-home pay after federal income tax, Social Security, Medicare, benefits, retirement contributions, and other deductions. Texas has no individual state income tax.' satisfies typeof sourceSalaryDescription;
export const salaryFaqs = [...sourceSalaryFaqs] as const;
