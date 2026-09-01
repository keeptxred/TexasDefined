import { Link } from '@tanstack/react-router';
import { useMemo, useState, type Dispatch, type SetStateAction } from 'react';

import type { LocalCostOfLivingProfile } from '@/data/local-cost-of-living';

const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
const numeric = (value: string) => Math.max(0, Number(value) || 0);

type BudgetKey = 'housing' | 'transportation' | 'utilities' | 'insurance' | 'food' | 'other';
type Budget = Record<BudgetKey, number>;

const labels: readonly [BudgetKey, string][] = [
  ['housing', 'Housing'],
  ['transportation', 'Transportation'],
  ['utilities', 'Utilities'],
  ['insurance', 'Insurance'],
  ['food', 'Food & household'],
  ['other', 'Other recurring costs'],
];

const initialBudget: Budget = {
  housing: 2200,
  transportation: 800,
  utilities: 350,
  insurance: 450,
  food: 900,
  other: 1000,
};

function BudgetColumn({ title, budget, onChange }: { title: string; budget: Budget; onChange: (key: BudgetKey, value: number) => void }) {
  return <section className="border border-border p-5">
    <h2 className="font-display text-2xl">{title}</h2>
    <div className="mt-4 space-y-3">
      {labels.map(([key, label]) => <label key={key} className="block border-t border-border pt-3">
        <span className="text-sm font-semibold">{label}</span>
        <div className="mt-1 flex items-center border-b border-border focus-within:border-primary">
          <span className="pr-2 text-muted-foreground">$</span>
          <input className="w-full bg-transparent py-2 text-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background" type="number" min="0" step="25" value={budget[key]} onChange={(event) => onChange(key, numeric(event.target.value))} />
          <span className="pl-2 text-sm text-muted-foreground">/mo</span>
        </div>
      </label>)}
    </div>
  </section>;
}

export function LocalCostOfLivingPage({ profile }: { profile: LocalCostOfLivingProfile }) {
  const [currentBudget, setCurrentBudget] = useState<Budget>({ ...initialBudget });
  const [targetBudget, setTargetBudget] = useState<Budget>({ ...initialBudget });
  const totals = useMemo(() => {
    const sum = (budget: Budget) => labels.reduce((total, [key]) => total + budget[key], 0);
    const current = sum(currentBudget);
    const target = sum(targetBudget);
    return { current, target, difference: target - current };
  }, [currentBudget, targetBudget]);
  const update = (setter: Dispatch<SetStateAction<Budget>>, key: BudgetKey, value: number) => setter((budget) => ({ ...budget, [key]: value }));

  return <main className="container py-10 lg:py-14">
    <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb"><Link to="/" className="hover:text-primary">Home</Link><span aria-hidden="true"> / </span><Link to="/texas-cost-of-living-calculator" className="hover:text-primary">Texas cost of living calculator</Link><span aria-hidden="true"> / </span><span>{profile.name}</span></nav>
    <header className="mt-8 max-w-4xl">
      <p className="eyebrow text-primary">{profile.name} household budget planning</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{profile.title}</h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">{profile.intro}</p>
    </header>

    <section className="mt-10 border-y border-border py-8" aria-labelledby="local-budget-comparison-heading">
      <p className="eyebrow text-primary">Compare your own numbers</p>
      <h2 id="local-budget-comparison-heading" className="mt-3 font-display text-3xl">Current household vs. possible {profile.name} household</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Both columns start with the same neutral example budget. Replace them with your real current spending and the best address-specific estimates you have for {profile.name}. No citywide average or preset local index is used.</p>
      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <BudgetColumn title="Current monthly budget" budget={currentBudget} onChange={(key, value) => update(setCurrentBudget, key, value)} />
        <BudgetColumn title={`Possible ${profile.name} monthly budget`} budget={targetBudget} onChange={(key, value) => update(setTargetBudget, key, value)} />
      </div>
      <dl className="mt-7 grid border-y border-border sm:grid-cols-3" aria-live="polite" aria-atomic="true">
        <div className="py-5 sm:px-5"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Current total</dt><dd className="mt-2 font-display text-3xl font-bold text-primary">{money(totals.current)}/mo</dd></div>
        <div className="border-t border-border py-5 sm:border-l sm:border-t-0 sm:px-5"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{profile.name} total</dt><dd className="mt-2 font-display text-3xl font-bold text-primary">{money(totals.target)}/mo</dd></div>
        <div className="border-t border-border py-5 sm:border-l sm:border-t-0 sm:px-5"><dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Annual difference</dt><dd className="mt-2 font-display text-3xl font-bold text-primary">{money(totals.difference * 12)}</dd></div>
      </dl>
      <p className="mt-5 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Planning only.</strong> This comparison is not a forecast or a claim about average {profile.name} household spending. Verify costs for the exact housing, commute, providers, coverage and household you are considering.</p>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="local-context-heading">
      <p className="eyebrow text-primary">Make the comparison local</p>
      <h2 id="local-context-heading" className="mt-3 font-display text-3xl">What can change around {profile.name}</h2>
      <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">{profile.localContext}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{profile.planningPoints.map((point, index) => <div key={point} className="border border-border p-5"><span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Check {index + 1}</span><p className="mt-3 text-sm leading-6 text-muted-foreground">{point}</p></div>)}</div>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="local-tools-heading">
      <p className="eyebrow text-primary">Replace estimates with better inputs</p>
      <h2 id="local-tools-heading" className="mt-3 font-display text-3xl">Connect the {profile.name} budget to the property and move</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to={profile.propertyTaxHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.propertyTaxLabel}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Keep buyer tax planning tied to the parcel and its actual taxing units.</span></Link>
        <Link to={profile.affordabilityHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.affordabilityLabel}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Pressure-test a home-price range after recurring ownership costs are included.</span></Link>
        <Link to={profile.homeownershipHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.name} homeownership costs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Combine mortgage, parcel taxes, insurance, utilities, maintenance and neighborhood costs.</span></Link>
        <Link to={profile.insuranceHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.name} home insurance planner</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Turn a generic insurance allowance into a property-specific quote comparison.</span></Link>
        <Link to={profile.mortgageHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.name} mortgage calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Model principal, interest and the recurring property costs that sit beside the loan.</span></Link>
        <Link to={profile.relocationHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.relocationLabel}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Research the jurisdiction, commute, utility, school and neighborhood context behind the budget.</span></Link>
      </div>
      <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold"><Link to="/texas-salary-comparison-by-city" className="text-primary hover:underline">Compare salary by city →</Link><Link to="/texas-salary-calculator" className="text-primary hover:underline">Estimate take-home pay →</Link><Link to="/texas-budget-planner" className="text-primary hover:underline">Build the full household budget →</Link></div>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="local-cost-faq-heading">
      <p className="eyebrow text-primary">Common questions</p>
      <h2 id="local-cost-faq-heading" className="mt-3 font-display text-3xl">{profile.name} cost of living FAQ</h2>
      <div className="mt-6 divide-y divide-border border-y border-border">{profile.faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div>
    </section>
  </main>;
}