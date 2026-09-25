import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import {
  CurrencyInput,
  FinancialCalculatorScaffold,
  FinancialSelect,
  PercentageInput,
  formatCalculatorMoney,
  readCalculatorUrlState,
} from '@/components/calculators/FinancialCalculatorUI';
import type { LocalSalaryNeededProfile } from '@/data/local-salary-needed';
import { estimatePayroll2026, grossSalaryForTakeHome2026, type FilingStatus } from '@/lib/financial/payroll';

const DEFAULTS = {
  monthlyBudget: 0,
  monthlySavings: 0,
  filingStatus: 'single',
  retirementPercent: 6,
  annualPretaxBenefits: 0,
  annualAfterTaxDeductions: 0,
};

export function LocalSalaryNeededPage({ profile, faqs }: { profile: LocalSalaryNeededProfile; faqs: readonly { question: string; answer: string }[] }) {
  const [state, setState] = useState(() => readCalculatorUrlState(DEFAULTS));
  const setNumber = (key: 'monthlyBudget' | 'monthlySavings' | 'retirementPercent' | 'annualPretaxBenefits' | 'annualAfterTaxDeductions', value: number) =>
    setState((current) => ({ ...current, [key]: value }));

  const targetAnnualTakeHome = (state.monthlyBudget + state.monthlySavings) * 12;
  const gross = useMemo(() => grossSalaryForTakeHome2026(targetAnnualTakeHome, {
    filingStatus: state.filingStatus as FilingStatus,
    retirementPercent: state.retirementPercent,
    annualPretaxBenefits: state.annualPretaxBenefits,
    annualAfterTaxDeductions: state.annualAfterTaxDeductions,
  }), [state, targetAnnualTakeHome]);

  const result = useMemo(() => estimatePayroll2026({
    annualSalary: gross,
    filingStatus: state.filingStatus as FilingStatus,
    retirementPercent: state.retirementPercent,
    annualPretaxBenefits: state.annualPretaxBenefits,
    annualAfterTaxDeductions: state.annualAfterTaxDeductions,
  }), [gross, state]);

  const breakdown = [
    { label: 'Federal income tax', value: result.federalIncomeTax / 12 },
    { label: 'Social Security', value: result.socialSecurityTax / 12 },
    { label: 'Medicare', value: result.medicareTax / 12 },
    { label: 'Additional Medicare', value: result.additionalMedicareTax / 12 },
    { label: 'Retirement contribution', value: result.retirementContribution / 12 },
    { label: 'Pre-tax benefits', value: result.pretaxBenefits / 12 },
    { label: 'After-tax deductions', value: result.afterTaxDeductions / 12 },
  ];

  return <main className="container py-10 lg:py-14">
    <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb"><Link to="/" className="hover:text-primary">Home</Link><span aria-hidden="true"> / </span><Link to="/texas-salary-comparison-by-city" className="hover:text-primary">Texas salary comparison by city</Link><span aria-hidden="true"> / </span><span>{profile.name}</span></nav>
    <header className="mt-8 max-w-4xl"><p className="eyebrow text-primary">{profile.name} income planning</p><h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{profile.salaryTitle}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{profile.salaryIntro}</p></header>

    <section className="mt-10" aria-labelledby="salary-needed-heading">
      <p className="eyebrow text-primary">Work backward from your budget</p>
      <h2 id="salary-needed-heading" className="mt-3 font-display text-3xl">Estimate the gross household income your plan may require</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Enter your own monthly household costs and savings target. TexasDefined reverse-solves the same 2026 federal payroll model used by the statewide salary calculator instead of asking you to guess a federal withholding percentage. This is not a claim about what the average {profile.name} household earns or needs.</p>

      <FinancialCalculatorScaffold
        storageKey={'texasdefined:salary-needed:' + profile.slug}
        state={state}
        defaults={DEFAULTS}
        onRestore={setState}
        note="Planning only. This model estimates a gross-income target from your own desired take-home budget using 2026 federal brackets, the standard deduction, Social Security, Medicare and Texas's $0 individual state income tax. Credits, special deductions, self-employment tax, multiple jobs and household-specific tax rules can change actual take-home pay."
        issues={result.issues}
        results={[
          { label: 'Planning gross income', value: formatCalculatorMoney(gross), emphasis: true },
          { label: 'Monthly gross', value: formatCalculatorMoney(gross / 12) },
          { label: 'Target annual take-home', value: formatCalculatorMoney(targetAnnualTakeHome) },
          { label: 'Modeled federal income tax', value: formatCalculatorMoney(result.federalIncomeTax) },
          { label: 'Modeled Social Security + Medicare', value: formatCalculatorMoney(result.socialSecurityTax + result.medicareTax + result.additionalMedicareTax) },
          { label: 'Texas individual state income tax', value: '$0' },
        ]}
        summary={{
          'Planning gross income': formatCalculatorMoney(gross),
          'Target take-home': formatCalculatorMoney(targetAnnualTakeHome),
          'Monthly household budget': formatCalculatorMoney(state.monthlyBudget),
        }}
        breakdown={breakdown}
        sharedScenario={{ annualHouseholdIncome: gross }}
        methodology={{
          formula: 'TexasDefined uses binary search to find the lowest annual gross salary whose 2026 modeled take-home meets your entered annual household budget plus savings target. Each candidate salary is run through the same federal payroll engine as the statewide salary calculator.',
          assumptions: [
            'Federal tax uses 2026 marginal brackets and the applicable 2026 standard deduction before credits and special deductions.',
            'Employee Social Security is modeled at 6.2% up to the 2026 wage base; Medicare is 1.45%, with Additional Medicare withholding modeled above $200,000.',
            'Retirement deferrals reduce modeled federal taxable income but remain subject to FICA; entered pre-tax benefits are modeled as cafeteria-plan deductions.',
            'Texas individual state income tax is $0.',
          ],
          sources: [
            'IRS 2026 inflation adjustments and Revenue Procedure 2025-32 for federal brackets and standard deductions.',
            'IRS Publication 15 (2026) for Social Security, Medicare and Additional Medicare withholding rules.',
          ],
        }}
      >
        <CurrencyInput label="Monthly household budget" value={state.monthlyBudget} onChange={(value) => setNumber('monthlyBudget', value)} step={50} />
        <CurrencyInput label="Monthly savings / reserve" value={state.monthlySavings} onChange={(value) => setNumber('monthlySavings', value)} step={50} />
        <FinancialSelect label="Filing status" value={state.filingStatus} onChange={(value) => setState((current) => ({ ...current, filingStatus: value }))} options={[
          { value: 'single', label: 'Single' },
          { value: 'married_jointly', label: 'Married filing jointly' },
          { value: 'head_of_household', label: 'Head of household' },
          { value: 'married_separately', label: 'Married filing separately' },
        ]} />
        <PercentageInput label="Pre-tax retirement contribution" value={state.retirementPercent} onChange={(value) => setNumber('retirementPercent', value)} step={0.1} max={100} />
        <CurrencyInput label="Annual pre-tax benefits" value={state.annualPretaxBenefits} onChange={(value) => setNumber('annualPretaxBenefits', value)} step={100} />
        <CurrencyInput label="Annual after-tax deductions" value={state.annualAfterTaxDeductions} onChange={(value) => setNumber('annualAfterTaxDeductions', value)} step={100} />
      </FinancialCalculatorScaffold>
    </section>

    <section className="mt-12 border-t border-border pt-10"><p className="eyebrow text-primary">Make the salary target local</p><h2 className="mt-3 font-display text-3xl">Build the {profile.name} budget before trusting the income target</h2><p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">{profile.localContext}</p><div className="mt-6 grid gap-4 md:grid-cols-3">{profile.planningPoints.map((point, index) => <div key={point} className="border border-border p-5"><span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Verify {index + 1}</span><p className="mt-3 text-sm leading-6 text-muted-foreground">{point}</p></div>)}</div></section>

    <section className="mt-12 border-t border-border pt-10"><p className="eyebrow text-primary">Improve the inputs</p><h2 className="mt-3 font-display text-3xl">Connect salary planning to the actual {profile.name} move</h2><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Link to={profile.path} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.name} cost-of-living calculator</strong><span className="mt-2 block text-sm text-muted-foreground">Build the address-specific monthly budget that feeds this salary target.</span></Link>
      <Link to={profile.propertyTaxHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.propertyTaxLabel}</strong><span className="mt-2 block text-sm text-muted-foreground">Replace a generic buyer tax allowance with parcel-specific taxing units.</span></Link>
      <Link to={profile.affordabilityHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.affordabilityLabel}</strong><span className="mt-2 block text-sm text-muted-foreground">Pressure-test the housing plan against income and recurring ownership costs.</span></Link>
      <Link to={profile.homeownershipHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.name} homeownership costs</strong></Link>
      <Link to={profile.insuranceHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.name} home insurance planner</strong></Link>
      <Link to={profile.relocationHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.relocationLabel}</strong></Link>
    </div><div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold"><Link to="/texas-salary-calculator" className="text-primary hover:underline">Estimate take-home pay →</Link><Link to="/texas-budget-planner" className="text-primary hover:underline">Build a household budget →</Link><Link to={profile.mortgageHref} className="text-primary hover:underline">Model the local mortgage →</Link></div></section>

    <section className="mt-12 border-t border-border pt-10"><p className="eyebrow text-primary">Common questions</p><h2 className="mt-3 font-display text-3xl">{profile.name} salary-needed FAQ</h2><div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div></section>
  </main>;
}
