import { createLazyFileRoute, Link } from '@tanstack/react-router';

import { TexasVsStateExplorer } from '@/components/content/TexasVsStateExplorer';
import { Container } from '@/components/layout/Container';
import { TEXAS_VS_STATE_GROUPS, texasVsStateSlug } from '@/data/texas-vs-states-index';

const faq = [
  { q: 'Is Texas cheaper than every other state?', a: 'No. Costs vary by household and by the specific cities or counties being compared. Housing, insurance, utilities, transportation, wages and taxes should be compared together rather than relying on one statewide average.' },
  { q: 'Does Texas have a state individual income tax?', a: 'Texas does not impose an individual state income tax, but households still pay other state and local taxes and should compare total costs rather than one tax category.' },
  { q: 'What is the best way to compare Texas with another state before moving?', a: 'Compare the actual communities you would live in, occupation-specific wages, housing, insurance, utilities, taxes, commute patterns, climate risks and the services your household uses.' },
] as const;

export const Route = createLazyFileRoute('/texas-vs-every-state')({ component: TexasVsEveryStatePage });

function TexasVsEveryStatePage() {
  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20"><Container><p className="eyebrow text-primary">Texas compared</p><h1 className="mt-3 max-w-5xl font-display text-5xl leading-none md:text-7xl">Texas vs Every Other State</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">One authoritative comparison page, 49 state choices. Pick a state and the evidence, place context and decision framework update in place without creating another indexable URL.</p></Container></section>

    <section className="py-12 md:py-16"><Container><div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]"><div><h2 className="font-display text-4xl">What we compare</h2><p className="mt-4 max-w-3xl leading-8 text-muted-foreground">A useful state comparison needs more than a single tax rate or home price. Texas Defined looks at housing costs, household income, jobs and major industries, state and local tax structure, transportation, climate, geography, utilities and the day-to-day tradeoffs that affect where people actually want to live.</p><p className="mt-4 max-w-3xl leading-8 text-muted-foreground">Current numeric comparisons should be grounded in consistent public datasets such as the U.S. Census Bureau, Bureau of Economic Analysis and Bureau of Labor Statistics so every selected state uses the same framework.</p></div><aside className="border-y border-border py-6"><p className="eyebrow text-primary">Use the tools</p><div className="mt-4 grid gap-3 text-sm"><Link to="/texas-cost-of-living-calculator" className="font-semibold hover:text-primary">Texas cost-of-living calculator →</Link><Link to="/texas-salary-comparison-by-city" className="font-semibold hover:text-primary">Texas salary comparison →</Link><Link to="/texas-home-affordability-calculator" className="font-semibold hover:text-primary">Texas home affordability calculator →</Link><Link to="/texas-property-tax-county-comparison-calculator" className="font-semibold hover:text-primary">Property-tax county comparison →</Link><Link to="/moving-to-texas" className="font-semibold hover:text-primary">Moving to Texas guide →</Link><Link to="/texas-data" className="font-semibold hover:text-primary">Texas Data Center →</Link></div></aside></div></Container></section>

    <TexasVsStateExplorer />

    <section className="py-12 md:py-16"><Container><h2 className="font-display text-4xl">Jump directly to a state</h2><p className="mt-3 max-w-3xl text-muted-foreground">These choices stay on this page. The fragment identifies the selected state for sharing and bookmarking but does not create a separate canonical page.</p><div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">{TEXAS_VS_STATE_GROUPS.map((group) => <section key={group.region}><h3 className="eyebrow text-primary">{group.region}</h3><ul className="mt-4 divide-y divide-border border-y border-border">{group.states.map((state) => <li key={state}><a href={`/texas-vs-every-state#${texasVsStateSlug(state)}`} className="block py-3 font-display text-lg hover:text-primary">Texas vs {state} →</a></li>)}</ul></section>)}</div></Container></section>

    <section className="border-t border-border bg-surface py-12"><Container><div className="max-w-4xl"><p className="eyebrow text-primary">Comparison questions</p><h2 className="mt-2 font-display text-4xl">Texas vs other states FAQ</h2><div className="mt-7 divide-y divide-border border-y border-border">{faq.map((item) => <details key={item.q} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-display text-xl marker:hidden">{item.q}<span className="float-right text-primary group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.a}</p></details>)}</div></div></Container></section>

    <section className="border-t border-border bg-muted/30 py-10"><Container><h2 className="font-display text-3xl">More ways to understand Texas</h2><div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm"><Link to="/texas-explained" className="font-semibold text-primary">Texas Explained</Link><Link to="/texas-facts" className="font-semibold text-primary">Texas facts</Link><Link to="/things-unique-to-texas" className="font-semibold text-primary">Things unique to Texas</Link><Link to="/texas-resources" className="font-semibold text-primary">Texas resources</Link></div></Container></section>
  </main>;
}
