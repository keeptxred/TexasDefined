import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { TEXAS_VS_STATE_GROUPS, TEXAS_VS_STATES, texasVsStateSlug } from "@/data/texas-vs-states";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/texas-vs-every-state";
const title = "Texas vs Every Other State: 49 State-by-State Comparisons";
const description = "Compare Texas with every other U.S. state across cost of living, housing, taxes, jobs, climate, geography and everyday life, with a consistent comparison framework.";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
const faq = [
  { q: "What should I compare before moving to Texas from another state?", a: "Compare the actual cities or counties you would live in, not just statewide averages. Housing, insurance, utilities, transportation, occupation-specific pay, total taxes, weather risks and the services your household uses can all change the result." },
  { q: "Does Texas have an individual state income tax?", a: "Texas does not impose an individual state income tax, but that does not automatically make every Texas household cheaper to operate. Property taxes, sales taxes, housing, insurance, utilities and transportation still matter." },
  { q: "Are all 49 Texas-versus-state pages the same comparison?", a: "No. The same core decision framework is used for consistency, but every state page now includes state-specific place, metro, geography and climate context so the comparison reflects the actual differences that matter for that state." },
  { q: "Where should I verify current numbers?", a: "Use current public data such as the U.S. Census Bureau, Bureau of Economic Analysis and Bureau of Labor Statistics, then use Texas Defined calculators and local city or county pages to translate statewide data into a real household decision." },
] as const;

export const Route = createFileRoute("/texas-vs-every-state")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: title, description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: title, description, dateModified: "2026-08-20" },
        { "@type": "ItemList", "@id": `${pageUrl}#states`, name: "Texas compared with every other U.S. state", numberOfItems: TEXAS_VS_STATES.length, itemListElement: TEXAS_VS_STATES.map((state, index) => ({ "@type": "ListItem", position: index + 1, name: `Texas vs ${state}`, url: absoluteUrl(texasDefinedBrand, `/texas-vs/${texasVsStateSlug(state)}`) })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
          { "@type": "ListItem", position: 2, name: "Texas Explained", item: absoluteUrl(texasDefinedBrand, "/texas-explained") },
          { "@type": "ListItem", position: 3, name: "Texas vs Every State", item: pageUrl },
        ] },
        { "@type": "FAQPage", "@id": `${pageUrl}#faq`, mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
      ],
    })],
  }),
  component: TexasVsEveryStatePage,
});

function TexasVsEveryStatePage() {
  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20"><Container><p className="eyebrow text-primary">Texas compared</p><h1 className="mt-3 max-w-5xl font-display text-5xl leading-none md:text-7xl">Texas vs Every Other State</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Forty-nine comparisons, one consistent framework. Use this hub to compare Texas with every other state without changing the yardstick from page to page.</p></Container></section>

    <section className="py-12 md:py-16"><Container><div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]"><div><h2 className="font-display text-4xl">What we compare</h2><p className="mt-4 max-w-3xl leading-8 text-muted-foreground">A useful state comparison needs more than a single tax rate or home price. Texas Defined looks at the whole picture: housing costs, household income, jobs and major industries, state and local tax structure, transportation, climate, geography, utilities and the day-to-day tradeoffs that affect where people actually want to live.</p><p className="mt-4 max-w-3xl leading-8 text-muted-foreground">Current numeric comparisons should be grounded in consistent public datasets such as the U.S. Census Bureau, Bureau of Economic Analysis and Bureau of Labor Statistics. That keeps a Texas-vs-California comparison methodologically comparable with Texas-vs-Florida or Texas-vs-Oklahoma.</p></div><aside className="border-y border-border py-6"><p className="eyebrow text-primary">Use the tools</p><div className="mt-4 grid gap-3 text-sm"><Link to="/texas-cost-of-living-calculator" className="font-semibold hover:text-primary">Texas cost-of-living calculator →</Link><Link to="/texas-salary-comparison-by-city" className="font-semibold hover:text-primary">Texas salary comparison →</Link><Link to="/texas-home-affordability-calculator" className="font-semibold hover:text-primary">Texas home affordability calculator →</Link><Link to="/texas-property-tax-county-comparison-calculator" className="font-semibold hover:text-primary">Texas property-tax county comparison →</Link><Link to="/learn/property-taxes" className="font-semibold hover:text-primary">Texas property taxes explained →</Link><Link to="/moving-to-texas" className="font-semibold hover:text-primary">Moving to Texas guide →</Link><Link to="/texas-data" className="font-semibold hover:text-primary">Texas Data Center →</Link></div></aside></div></Container></section>

    <section className="border-y border-border bg-muted/30 py-12 md:py-16"><Container><h2 className="font-display text-4xl">Texas vs all 49 states</h2><p className="mt-3 max-w-3xl text-muted-foreground">Every state has a dedicated comparison URL with a consistent decision framework plus state-specific place, metro, geography and climate context.</p><div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">{TEXAS_VS_STATE_GROUPS.map((group) => <section key={group.region}><h3 className="eyebrow text-primary">{group.region}</h3><ul className="mt-4 divide-y divide-border border-y border-border">{group.states.map((state) => <li key={state}><Link to="/texas-vs/$state" params={{ state: texasVsStateSlug(state) }} className="block py-3 font-display text-lg hover:text-primary">Texas vs {state} →</Link></li>)}</ul></section>)}</div></Container></section>

    <section className="py-12 md:py-16"><Container><h2 className="font-display text-4xl">The comparison index</h2><div className="mt-8 divide-y divide-border border-y border-border">{TEXAS_VS_STATE_GROUPS.flatMap((group) => group.states.map((state) => <article key={state} className="py-7 md:grid md:grid-cols-[18rem_1fr] md:gap-8"><div><p className="eyebrow text-muted-foreground">State comparison</p><h3 className="mt-2 font-display text-2xl">Texas vs {state}</h3></div><div><p className="leading-7 text-muted-foreground">Compare Texas and {state} using the same core measures: housing and cost of living, income and employment, state and local taxes, climate and geography, transportation, utilities and quality-of-life considerations, with a state-specific lens layered on top.</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"><Link to="/texas-vs/$state" params={{ state: texasVsStateSlug(state) }} className="font-semibold text-primary hover:underline">Open Texas vs {state} →</Link><Link to="/texas-data" className="text-primary hover:underline">Explore Texas data</Link><Link to="/moving-to-texas" className="text-primary hover:underline">Moving to Texas</Link></div></div></article>))}</div></Container></section>

    <section className="border-t border-border bg-surface py-12"><Container><div className="max-w-4xl"><p className="eyebrow text-primary">Comparison questions</p><h2 className="mt-2 font-display text-4xl">Texas vs other states FAQ</h2><div className="mt-7 divide-y divide-border border-y border-border">{faq.map((item) => <details key={item.q} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-display text-xl marker:hidden">{item.q}<span className="float-right text-primary group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.a}</p></details>)}</div></div></Container></section>

    <section className="border-t border-border bg-muted/30 py-10"><Container><h2 className="font-display text-3xl">More ways to understand Texas</h2><div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm"><Link to="/texas-explained" className="font-semibold text-primary">Texas Explained</Link><Link to="/texas-facts" className="font-semibold text-primary">Texas facts</Link><Link to="/things-unique-to-texas" className="font-semibold text-primary">Things unique to Texas</Link><Link to="/texas-resources" className="font-semibold text-primary">Texas resources</Link></div></Container></section>
  </main>;
}
