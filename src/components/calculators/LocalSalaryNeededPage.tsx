import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import type { LocalSalaryNeededProfile } from '@/data/local-salary-needed';
import { CalculatorActions, CalculatorResult, CurrencyInput, PercentageInput, formatMoney, readCalculatorStateFromUrl, useCalculatorPersistence } from '@/components/property/PropertyCalculatorFramework';
import { calculateGrossSalaryNeeded2026, type FilingStatus2026 } from '@/lib/financial/planning';

export function LocalSalaryNeededPage({ profile, faqs }: { profile: LocalSalaryNeededProfile; faqs: readonly { question: string; answer: string }[] }) {
  const defaults = { monthlyBudget: 0, monthlySavings: 0, filingStatus: 'single' as FilingStatus2026, pretax: 0, otherAnnual: 0 };
  const urlDefaults = readCalculatorStateFromUrl(defaults);
  const [state, setState] = useState(urlDefaults);
  const set = <K extends keyof typeof state>(key: K, value: (typeof state)[K]) => setState((current) => ({ ...current, [key]: value }));
  const result = useMemo(() => calculateGrossSalaryNeeded2026({
    annualTakeHomeTarget: (state.monthlyBudget + state.monthlySavings) * 12,
    filingStatus: state.filingStatus,
    preTaxRetirementBenefitsPercent: state.pretax,
    otherAnnualDeductions: state.otherAnnual,
  }), [state]);
  const persistence = useCalculatorPersistence({ storageKey: `texasdefined:salary-needed:${profile.slug}:v2`, state, onRestore: setState });

  return <main className="container py-10 lg:py-14">
    <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb"><Link to="/" className="hover:text-primary">Home</Link><span aria-hidden="true"> / </span><Link to="/texas-salary-comparison-by-city" className="hover:text-primary">Texas salary comparison by city</Link><span aria-hidden="true"> / </span><span>{profile.name}</span></nav>
    <header className="mt-8 max-w-4xl"><p className="eyebrow text-primary">{profile.name} income planning</p><h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{profile.salaryTitle}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{profile.salaryIntro}</p></header>

    <section className="mt-10 border-y border-border py-8" aria-labelledby="salary-needed-heading">
      <p className="eyebrow text-primary">Work backward from your budget</p><h2 id="salary-needed-heading" className="mt-3 font-display text-3xl">Estimate the gross household income your plan may require</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Enter your own monthly household costs and savings target. TexasDefined then solves for the approximate 2026 gross salary needed to reach that after-tax target using the selected federal filing status. This is not a claim about what the average {profile.name} household earns or needs.</p>
      <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <CurrencyInput label="Monthly household budget" value={state.monthlyBudget} onChange={(value) => set('monthlyBudget', value)} step={50}/>
        <CurrencyInput label="Monthly savings / reserve" value={state.monthlySavings} onChange={(value) => set('monthlySavings', value)} step={50}/>
        <label className="block border-t border-border pt-4 text-sm font-semibold"><span>Federal filing status</span><select className="mt-2 w-full border-0 border-b border-border bg-background px-0 py-3 text-base outline-none focus:border-primary" value={state.filingStatus} onChange={(event) => set('filingStatus', event.target.value as FilingStatus2026)}><option value="single">Single</option><option value="marriedJoint">Married filing jointly</option><option value="headOfHousehold">Head of household</option><option value="marriedSeparate">Married filing separately</option></select></label>
        <PercentageInput label="Pre-tax retirement / benefits" value={state.pretax} onChange={(value) => set('pretax', value)} step={0.1} max={100}/>
        <CurrencyInput label="Other annual payroll deductions" value={state.otherAnnual} onChange={(value) => set('otherAnnual', value)} step={100}/>
      </div>
      <div className="mt-7 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite" aria-atomic="true">
        <CalculatorResult label="Target annual take-home" value={formatMoney((state.monthlyBudget + state.monthlySavings) * 12)}/>
        <CalculatorResult label="Planning gross income" value={formatMoney(result.grossSalary)}/>
        <CalculatorResult label="Monthly gross" value={formatMoney(result.grossSalary / 12)}/>
        <CalculatorResult label="Modeled federal + payroll taxes" value={formatMoney(result.federalIncomeTax + result.socialSecurity + result.medicare + result.additionalMedicare)}/>
      </div>
      <CalculatorActions onSave={persistence.save} onRestore={persistence.restore} onShare={persistence.share} onPrint={persistence.print} status={persistence.status} onReset={() => setState(defaults)}/>
      <p className="mt-5 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Planning only.</strong> The inverse model uses the same source-versioned 2026 federal engine as the statewide Texas paycheck calculator: IRS tax brackets and standard deductions, the 2026 Social Security wage base, Medicare and Additional Medicare Tax. Credits, itemized deductions, Form W-4 adjustments, multiple jobs, self-employment and benefit-specific payroll treatment can change actual take-home pay. Texas has no individual state income tax.</p>
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