import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { CalculatorPage } from '@/components/calculators/CalculatorPage';

const description = 'Estimate the gross household income that may support your own Texas monthly budget and savings target using editable federal, payroll-tax and other deduction assumptions.';
const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
const numeric = (value: string) => Math.max(0, Number(value) || 0);
const rate = (value: string) => Math.min(95, numeric(value));

const faqs = [
  { question: 'How does the Texas salary-needed calculator work?', answer: 'Enter the monthly household budget and savings target you want to support, then adjust the federal, payroll-tax and other deduction assumptions. The calculator works backward from the target take-home amount to an estimated gross household income.' },
  { question: 'Is this a Texas salary average?', answer: 'No. It does not estimate an average salary or claim that a city requires one universal income. The result comes from the household costs and deduction assumptions you enter.' },
  { question: 'Does Texas having no individual state income tax mean my take-home pay equals gross pay?', answer: 'No. Federal income tax, Social Security, Medicare, benefits, retirement contributions and other deductions can still reduce take-home pay. The editable percentages are planning assumptions, not a tax-return calculation.' },
  { question: 'How should I use the local city selector?', answer: 'Choose a city to load researched local budget context and planning checks on this same canonical calculator. Then replace broad assumptions with the housing, commute, insurance, utility and property-tax information for the actual address you are considering.' },
  { question: 'What should I compare before accepting a job offer in another Texas city?', answer: 'Compare expected take-home pay with the new household budget, including housing, transportation, utilities, insurance, childcare or school costs, recurring services and a savings or reserve target.' },
];

export const Route = createLazyFileRoute('/texas-salary-needed-calculator')({ component: TexasSalaryNeededCalculatorPage });

function TexasSalaryNeededCalculatorPage() {
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [federalRate, setFederalRate] = useState(12);
  const [payrollRate, setPayrollRate] = useState(7.65);
  const [otherRate, setOtherRate] = useState(0);

  const result = useMemo(() => {
    const annualTakeHome = (monthlyBudget + monthlySavings) * 12;
    const combinedRate = Math.min(0.95, (federalRate + payrollRate + otherRate) / 100);
    const gross = annualTakeHome / Math.max(0.05, 1 - combinedRate);
    return {
      annualTakeHome,
      gross,
      monthlyGross: gross / 12,
      deductions: gross - annualTakeHome,
      combinedRate,
    };
  }, [monthlyBudget, monthlySavings, federalRate, payrollRate, otherRate]);

  return <CalculatorPage eyebrow="Texas household income planning" title="Texas salary needed calculator" description={description}>
    <section aria-labelledby="salary-needed-heading">
      <p className="eyebrow text-primary">Work backward from your budget</p>
      <h2 id="salary-needed-heading" className="mt-3 font-display text-3xl">Estimate the gross household income your plan may require</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Start with the monthly household costs you expect and the amount you want to save or reserve. The percentage fields are editable planning assumptions. They are not a tax calculation and they do not claim what an average Texas household earns or needs.</p>
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

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-budget-heading">
      <p className="eyebrow text-primary">Start with the household, not a headline</p>
      <h2 id="salary-budget-heading" className="mt-3 font-display text-3xl">There is no single salary needed to live in Texas</h2>
      <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
        <p>A household’s income target depends on housing, debt, transportation, insurance, utilities, childcare, recurring services and the amount it wants to save. Two households in the same city can therefore need very different gross incomes.</p>
        <p>Use the result as a scenario. When a move or job offer becomes concrete, rebuild the monthly budget from the actual rent or mortgage, commute, utility providers, insurance quotes and recurring address-level costs instead of relying on a citywide salary claim.</p>
        <p>The local selector above preserves researched context for major Texas cities without multiplying near-duplicate indexable pages. Each city choice changes the planning context while this page remains the single canonical calculator.</p>
      </div>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-assumptions-heading">
      <p className="eyebrow text-primary">Know what the percentages mean</p>
      <h2 id="salary-assumptions-heading" className="mt-3 font-display text-3xl">Treat deductions as editable assumptions, not a tax forecast</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="border border-border p-5"><strong className="font-display text-xl">Federal withholding</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">Use a rough planning percentage only. Filing status, credits, deductions and other income can change the actual federal result.</p></div>
        <div className="border border-border p-5"><strong className="font-display text-xl">Payroll taxes</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">Social Security and Medicare rules include wage limits and other details that this simple planning percentage does not model.</p></div>
        <div className="border border-border p-5"><strong className="font-display text-xl">Other deductions</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">Benefits, retirement contributions, insurance premiums and other payroll deductions can materially change spendable income.</p></div>
      </div>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-links-heading">
      <p className="eyebrow text-primary">Build the numbers in order</p>
      <h2 id="salary-links-heading" className="mt-3 font-display text-3xl">Connect the income target to the rest of the Texas budget</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link to="/texas-cost-of-living-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Cost of living calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Build the monthly household-cost scenario that feeds the salary target.</span></Link>
        <Link to="/texas-salary-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Texas salary calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Estimate take-home pay from a gross salary scenario.</span></Link>
        <Link to="/texas-budget-planner" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Household budget planner</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Put income, savings and recurring expenses into one monthly plan.</span></Link>
        <Link to="/texas-moving-cost-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Moving-cost calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Keep one-time relocation costs separate from the recurring household budget.</span></Link>
        <Link to="/texas-home-affordability-calculator" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Home affordability</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Pressure-test a home-purchase scenario against income and recurring costs.</span></Link>
        <Link to="/texas-salary-comparison-by-city" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Salary comparison by city</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Use the editorial comparison layer for broader city-to-city context.</span></Link>
      </div>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="salary-faq-heading">
      <p className="eyebrow text-primary">Common questions</p>
      <h2 id="salary-faq-heading" className="mt-3 font-display text-3xl">Texas salary-needed calculator FAQ</h2>
      <div className="mt-6 divide-y divide-border border-y border-border">{faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div>
    </section>
  </CalculatorPage>;
}
