import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import type { LocalSalaryNeededProfile } from '@/data/local-salary-needed';

const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
const numeric = (value: string) => Math.max(0, Number(value) || 0);
const rate = (value: string) => Math.min(95, numeric(value));

export function LocalSalaryNeededPage({ profile, faqs }: { profile: LocalSalaryNeededProfile; faqs: readonly { question: string; answer: string }[] }) {
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [federalRate, setFederalRate] = useState(12);
  const [payrollRate, setPayrollRate] = useState(7.65);
  const [otherRate, setOtherRate] = useState(0);
  const result = useMemo(() => {
    const annualTakeHome = (monthlyBudget + monthlySavings) * 12;
    const combinedRate = Math.min(0.95, (federalRate + payrollRate + otherRate) / 100);
    const gross = annualTakeHome / Math.max(0.05, 1 - combinedRate);
    return { annualTakeHome, gross, deductions: gross - annualTakeHome, monthlyGross: gross / 12, combinedRate };
  }, [monthlyBudget, monthlySavings, federalRate, payrollRate, otherRate]);

  return <main className="container py-10 lg:py-14">
    <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb"><Link to="/" className="hover:text-primary">Home</Link><span aria-hidden="true"> / </span><Link to="/texas-salary-comparison-by-city" className="hover:text-primary">Texas salary comparison by city</Link><span aria-hidden="true"> / </span><span>{profile.name}</span></nav>
    <header className="mt-8 max-w-4xl"><p className="eyebrow text-primary">{profile.name} income planning</p><h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{profile.salaryTitle}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{profile.salaryIntro}</p></header>

    <section className="mt-10 border-y border-border py-8" aria-labelledby="salary-needed-heading">
      <p className="eyebrow text-primary">Work backward from your budget</p><h2 id="salary-needed-heading" className="mt-3 font-display text-3xl">Estimate the gross household income your plan may require</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Enter your own monthly household costs and savings target. The percentage fields are editable planning assumptions, not a tax calculation and not a claim about what the average {profile.name} household earns or needs.</p>
      <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {[
          ['Monthly household budget', monthlyBudget, setMonthlyBudget, '$', '/mo'],
          ['Monthly savings / reserve', monthlySavings, setMonthlySavings, '$', '/mo'],
          ['Federal withholding assumption', federalRate, setFederalRate, '', '%'],
          ['Payroll-tax assumption', payrollRate, setPayrollRate, '', '%'],
          ['Other deductions assumption', otherRate, setOtherRate, '', '%'],
        ].map(([label, value, setter, prefix, suffix]) => <label key={String(label)} className="border border-border p-4"><span className="text-sm font-semibold">{label as string}</span><div className="mt-2 flex items-center border-b border-border"><span>{prefix as string}</span><input className="w-full bg-transparent px-2 py-2 text-lg outline-none focus-visible:ring-2 focus-visible:ring-primary" type="number" min="0" step={String(label).includes('assumption') ? '0.1' : '50'} value={value as number} onChange={(event) => (setter as (value: number) => void)(String(label).includes('assumption') ? rate(event.target.value) : numeric(event.target.value))} /><span>{suffix as string}</span></div></label>)}
      </div>
      <dl className="mt-7 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4" aria-live="polite" aria-atomic="true">
        <div className="py-5 lg:px-5"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Target annual take-home</dt><dd className="mt-2 font-display text-3xl font-bold text-primary">{money(result.annualTakeHome)}</dd></div>
        <div className="border-t border-border py-5 sm:border-l sm:border-t-0 sm:px-5"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Planning gross income</dt><dd className="mt-2 font-display text-3xl font-bold text-primary">{money(result.gross)}</dd></div>
        <div className="border-t border-border py-5 lg:border-l lg:border-t-0 lg:px-5"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Monthly gross</dt><dd className="mt-2 font-display text-3xl font-bold text-primary">{money(result.monthlyGross)}</dd></div>
        <div className="border-t border-border py-5 sm:border-l sm:px-5 lg:border-t-0"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Modeled deductions</dt><dd className="mt-2 font-display text-3xl font-bold text-primary">{money(result.deductions)}</dd></div>
      </dl>
      <p className="mt-5 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Planning only.</strong> The model divides your annual take-home target by one minus the combined editable deduction percentage ({(result.combinedRate * 100).toFixed(2)}%). Actual federal tax, Social Security, Medicare, benefits, filing status, credits, self-employment and wage limits can change take-home pay. Texas has no individual state income tax, but that does not make this a payroll or tax-return estimate.</p>
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