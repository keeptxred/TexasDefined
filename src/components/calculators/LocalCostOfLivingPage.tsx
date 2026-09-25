import { Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import {
  CurrencyInput,
  FinancialCalculatorScaffold,
  formatCalculatorMoney,
  readCalculatorUrlState,
} from '@/components/calculators/FinancialCalculatorUI';
import type { LocalCostOfLivingProfile } from '@/data/local-cost-of-living';

type BudgetKey = 'Housing' | 'Transportation' | 'Utilities' | 'Insurance' | 'Food' | 'Other';
type Scope = 'current' | 'target';
type State = {
  currentHousing: number;
  currentTransportation: number;
  currentUtilities: number;
  currentInsurance: number;
  currentFood: number;
  currentOther: number;
  targetHousing: number;
  targetTransportation: number;
  targetUtilities: number;
  targetInsurance: number;
  targetFood: number;
  targetOther: number;
};

const DEFAULTS: State = {
  currentHousing: 2200,
  currentTransportation: 800,
  currentUtilities: 350,
  currentInsurance: 450,
  currentFood: 900,
  currentOther: 1000,
  targetHousing: 2200,
  targetTransportation: 800,
  targetUtilities: 350,
  targetInsurance: 450,
  targetFood: 900,
  targetOther: 1000,
};

const budgetKeys: BudgetKey[] = ['Housing', 'Transportation', 'Utilities', 'Insurance', 'Food', 'Other'];

function keyFor(scope: Scope, key: BudgetKey): keyof State {
  return (scope + key) as keyof State;
}

function BudgetColumn({
  title,
  scope,
  state,
  onChange,
}: {
  title: string;
  scope: Scope;
  state: State;
  onChange: (scope: Scope, key: BudgetKey, value: number) => void;
}) {
  return <section className="border border-border p-5">
    <h3 className="font-display text-2xl">{title}</h3>
    <div className="mt-4 space-y-3">
      {budgetKeys.map((key) => <CurrencyInput key={key} label={key === 'Food' ? 'Food & household' : key === 'Other' ? 'Other recurring costs' : key} value={state[keyFor(scope, key)]} onChange={(value) => onChange(scope, key, value)} step={25} suffix="/mo" />)}
    </div>
  </section>;
}

export function LocalCostOfLivingPage({ profile }: { profile: LocalCostOfLivingProfile }) {
  const [state, setState] = useState(() => readCalculatorUrlState(DEFAULTS));
  const update = (scope: Scope, key: BudgetKey, value: number) => setState((current) => ({ ...current, [keyFor(scope, key)]: value }));
  const totals = useMemo(() => {
    const sum = (scope: Scope) => budgetKeys.reduce((total, key) => total + state[keyFor(scope, key)], 0);
    const current = sum('current');
    const target = sum('target');
    return { current, target, difference: target - current };
  }, [state]);

  const targetBreakdown = budgetKeys.map((key) => ({
    label: key === 'Food' ? 'Food & household' : key === 'Other' ? 'Other recurring costs' : key,
    value: state[keyFor('target', key)],
  }));

  return <main className="container py-10 lg:py-14">
    <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb"><Link to="/" className="hover:text-primary">Home</Link><span aria-hidden="true"> / </span><Link to="/texas-cost-of-living-calculator" className="hover:text-primary">Texas cost of living calculator</Link><span aria-hidden="true"> / </span><span>{profile.name}</span></nav>
    <header className="mt-8 max-w-4xl">
      <p className="eyebrow text-primary">{profile.name} household budget planning</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{profile.title}</h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">{profile.intro}</p>
    </header>

    <section className="mt-10" aria-labelledby="local-budget-comparison-heading">
      <p className="eyebrow text-primary">Compare your own numbers</p>
      <h2 id="local-budget-comparison-heading" className="mt-3 font-display text-3xl">Current household vs. possible {profile.name} household</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Both columns start with the same neutral example budget. Replace them with your real current spending and the best address-specific estimates you have for {profile.name}. No citywide average or preset local index is used.</p>

      <FinancialCalculatorScaffold
        storageKey={'texasdefined:local-cost-of-living:' + profile.slug}
        state={state}
        defaults={DEFAULTS}
        onRestore={setState}
        note={'Planning only. This comparison is not a forecast or a claim about average ' + profile.name + ' household spending. Verify costs for the exact housing, commute, providers, coverage and household you are considering.'}
        issues={[]}
        results={[
          { label: profile.name + ' monthly total', value: formatCalculatorMoney(totals.target) + '/mo', emphasis: true },
          { label: 'Current total', value: formatCalculatorMoney(totals.current) + '/mo' },
          { label: 'Monthly difference', value: formatCalculatorMoney(totals.difference) },
          { label: 'Annual difference', value: formatCalculatorMoney(totals.difference * 12) },
        ]}
        summary={{
          [profile.name + ' monthly total']: formatCalculatorMoney(totals.target) + '/mo',
          'Current monthly total': formatCalculatorMoney(totals.current) + '/mo',
          'Annual difference': formatCalculatorMoney(totals.difference * 12),
        }}
        breakdown={targetBreakdown}
        sharedScenario={{ monthlyUtilities: state.targetUtilities }}
        methodology={{
          formula: 'TexasDefined adds the six user-entered monthly categories for the current household and the possible destination household, then compares those totals monthly and annually. No citywide index or average is inserted into the local page.',
          assumptions: [
            'Every amount comes from the user or the neutral example defaults until replaced.',
            'Housing should include the recurring housing amount appropriate to the scenario; use the linked mortgage, property-tax, insurance and ownership tools to improve it.',
            'Transportation, utilities, insurance, food and other costs should be replaced with address- and household-specific estimates whenever possible.',
          ],
        }}
      >
        <div className="sm:col-span-2 lg:col-span-3 grid gap-5 lg:grid-cols-2">
          <BudgetColumn title="Current monthly budget" scope="current" state={state} onChange={update} />
          <BudgetColumn title={'Possible ' + profile.name + ' monthly budget'} scope="target" state={state} onChange={update} />
        </div>
      </FinancialCalculatorScaffold>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="local-context-heading">
      <p className="eyebrow text-primary">Make the comparison local</p>
      <h2 id="local-context-heading" className="mt-3 font-display text-3xl">What can change around {profile.name}</h2>
      <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">{profile.localContext}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{profile.planningPoints.map((point, index) => <div key={point} className="border border-border p-5"><span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Check {index + 1}</span><p className="mt-3 text-sm leading-6 text-muted-foreground">{point}</p></div>)}</div>
    </section>

    <section className="mt-12 border-t border-border pt-10" aria-labelledby="local-tools-heading">
      <p className="eyebrow text-primary">Replace estimates with better inputs</p>
      <h2 id="local-tools-heading" className="mt-3 font-display text-3xl">Connect the {profile.name} budget to the property, income and move</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to={profile.propertyTaxHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.propertyTaxLabel}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Keep buyer tax planning tied to the parcel and its actual taxing units.</span></Link>
        <Link to={profile.affordabilityHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.affordabilityLabel}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Pressure-test a home-price range after recurring ownership costs are included.</span></Link>
        <Link to={profile.homeownershipHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.name} homeownership costs</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Combine mortgage, parcel taxes, insurance, utilities, maintenance and neighborhood costs.</span></Link>
        <Link to={profile.insuranceHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.name} home insurance planner</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Turn a generic insurance allowance into a property-specific quote comparison.</span></Link>
        <Link to={profile.mortgageHref} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{profile.name} mortgage calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Model principal, interest and the recurring property costs that sit beside the loan.</span></Link>
        <a href={'/texas-salary-needed-calculator/' + profile.slug} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Salary needed to live in {profile.name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Turn this monthly household budget into a user-controlled gross-income planning target.</span></a>
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
