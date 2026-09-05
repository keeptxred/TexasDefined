import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { loadTexasVsStateProfile } from "@/data/texas-vs-state-profile";
import { TEXAS_VS_STATE_GROUPS, texasVsStateName, texasVsStateSlug } from "@/data/texas-vs-states-index";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

function genericFaq(name: string) {
  return [
    { q: `Is Texas cheaper than ${name}?`, a: `There is no reliable statewide yes-or-no answer for every household. Compare the actual Texas city or county with the actual ${name} community, including housing, insurance, utilities, transportation and taxes.` },
    { q: `What should I compare before moving from ${name} to Texas?`, a: `Compare occupation-specific pay, housing, total taxes, insurance, utilities, commute, weather risks, schools or services you use, and the specific metro or county rather than statewide averages alone.` },
    { q: "Does Texas have an individual state income tax?", a: "Texas does not impose an individual state income tax, but that fact alone does not determine total household cost. Sales taxes, property taxes, insurance, housing and local costs still matter." },
  ];
}

export const Route = createFileRoute("/texas-vs/$state")({
  loader: async ({ params }) => {
    const name = texasVsStateName(params.state);
    if (!name) throw notFound();
    const profile = await loadTexasVsStateProfile(name);
    if (!profile) throw notFound();
    return { name, slug: params.state, profile };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = `/texas-vs/${loaderData.slug}`;
    const title = `Texas vs ${loaderData.name}: Cost, Taxes, Jobs, Climate & Living`;
    const description = `Compare Texas with ${loaderData.name} across taxes, housing, jobs, cost of living, climate, transportation and everyday life, with state-specific context and links to current official data.`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const faq = loaderData.profile.evidence?.faq ?? genericFaq(loaderData.name);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": `${pageUrl}#page`, url: pageUrl, name: title, description, dateModified: loaderData.profile.evidence?.lastVerifiedAt ?? "2026-08-20", isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` }, about: [{ "@type": "Place", name: "Texas" }, { "@type": "Place", name: loaderData.name }] },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Texas Defined", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Texas vs Every State", item: absoluteUrl(texasDefinedBrand, "/texas-vs-every-state") },
            { "@type": "ListItem", position: 3, name: `Texas vs ${loaderData.name}`, item: pageUrl },
          ] },
          { "@type": "FAQPage", "@id": `${pageUrl}#faq`, mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
        ],
      })],
    };
  },
  component: TexasVsStatePage,
});

function TexasVsStatePage() {
  const { name, profile } = Route.useLoaderData();
  const evidence = profile.evidence;
  const relatedGroup = TEXAS_VS_STATE_GROUPS.find((group) => group.states.some((state) => state === name));
  const relatedStates = relatedGroup?.states.filter((state) => state !== name).slice(0, 6) ?? [];
  const sections = [
    {
      heading: "The comparison that actually matters",
      body: profile.comparisonFocus,
    },
    {
      heading: "Compare places, not state averages",
      body: profile.placeLens,
    },
    {
      heading: "Taxes",
      body: evidence?.taxLens ?? `Texas has no individual state income tax, but that single fact does not determine whether a household pays less overall than it would in ${name}. Compare income taxes, sales taxes, property taxes and the taxes that apply to your actual household and location.`,
    },
    {
      heading: "Housing and cost of living",
      body: evidence?.housingLens ?? `Statewide averages can hide large local differences. Compare the Texas city or county you would actually choose with the ${name} community you would actually choose, including home prices or rent, insurance, utilities, property taxes and transportation costs.`,
    },
    {
      heading: "Jobs and pay",
      body: evidence?.jobsLens ?? `A useful Texas-versus-${name} job comparison looks at occupation-specific wages, unemployment, major industries and openings in the metro areas that match your career. State averages are a starting point, not the whole decision.`,
    },
    {
      heading: "Climate and geography",
      body: profile.climateLens,
    },
    {
      heading: "Transportation and daily life",
      body: evidence?.transportationLens ?? `Driving distances, transit, airport access and commute patterns can materially change daily costs. Texas is large, so Dallas–Fort Worth, Houston, Austin, San Antonio, El Paso and rural Texas can produce very different living experiences when compared with ${name}.`,
    },
    {
      heading: "Weather risk and insurance",
      body: evidence?.hazardLens ?? `Insurance cost and coverage depend heavily on the exact property and hazard exposure. Compare flood, wind or hail exposure, deductibles and current quotes for the Texas address and the ${name} address rather than treating a statewide premium average as the answer.`,
    },
    {
      heading: "Culture and fit",
      body: `The final choice is not purely financial. Family ties, schools, recreation, food, sports, pace of life and access to the places you value can outweigh a modest difference in taxes or housing costs between Texas and ${name}.`,
    },
  ] as const;

  const faq = evidence?.faq ?? genericFaq(name);

  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20">
      <Container>
        <p className="eyebrow text-primary">Texas compared</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-none md:text-7xl">Texas vs {name}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A practical side-by-side framework for comparing Texas with {name}, with state-specific context for the places, climate and tradeoffs that make this comparison different from the other 48.</p>
        {evidence && <p className="mt-4 text-sm font-medium text-muted-foreground">Official-source evidence last verified {evidence.lastVerifiedAt}.</p>}
      </Container>
    </section>

    <section className="py-12 md:py-16">
      <Container>
        <div className="max-w-4xl divide-y divide-border">
          {sections.map((section, index) => <section key={section.heading} className="py-8 first:pt-0">
            <p className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">{section.heading}</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{section.body}</p>
          </section>)}
          <section className="py-8">
            <h2 className="font-display text-3xl md:text-4xl">Check current numbers before deciding</h2>
            <p className="mt-4 leading-8 text-muted-foreground">Housing costs, wages, unemployment and tax rules change. Use current public data for the numbers, then use Texas Defined's city, county and calculator tools to translate statewide averages into the place you would actually live.</p>
            {evidence ? <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {evidence.sources.map((source) => <a key={`${source.organization}:${source.label}`} href={source.url} target="_blank" rel="noreferrer" className="border border-border p-4 hover:border-primary">
                <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{source.organization}</span>
                <span className="mt-1 block font-semibold text-primary">{source.label} ↗</span>
              </a>)}
            </div> : <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a href="https://www.census.gov/quickfacts/" target="_blank" rel="noreferrer" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">U.S. Census QuickFacts ↗</a>
              <a href="https://www.bls.gov/" target="_blank" rel="noreferrer" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">U.S. Bureau of Labor Statistics ↗</a>
            </div>}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link to="/texas-cost-of-living-calculator" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Texas cost-of-living calculator</Link>
              <Link to="/texas-salary-comparison-by-city" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Texas salary comparison</Link>
              <Link to="/texas-home-affordability-calculator" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Texas home affordability</Link>
            </div>
          </section>
        </div>
      </Container>
    </section>

    <section className="border-t border-border bg-surface py-12">
      <Container><div className="max-w-4xl"><p className="eyebrow text-primary">Decision questions</p><h2 className="mt-2 font-display text-3xl md:text-4xl">Texas vs {name} FAQ</h2><div className="mt-6 divide-y divide-border border-y border-border">{faq.map((item) => <details key={item.q} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-display text-xl marker:hidden">{item.q}<span className="float-right text-primary group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.a}</p></details>)}</div></div></Container>
    </section>

    {relatedStates.length > 0 && <section className="border-t border-border py-12">
      <Container>
        <p className="eyebrow text-primary">Keep comparing</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">More Texas vs {relatedGroup?.region} comparisons</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Compare Texas with nearby or regionally similar states using the same framework, then return to the full 49-state index when you want to widen the search.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relatedStates.map((state) => <Link key={state} to="/texas-vs/$state" params={{ state: texasVsStateSlug(state) }} className="border border-border p-4 font-display text-xl hover:border-primary hover:text-primary">Texas vs {state} →</Link>)}
        </div>
        <Link to="/texas-vs-every-state" className="mt-6 inline-block text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">Browse all 49 Texas state comparisons</Link>
      </Container>
    </section>}

    <section className="border-t border-border bg-muted/30 py-10">
      <Container>
        <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
          <Link to="/texas-vs-every-state" className="font-semibold text-primary">All 49 state comparisons</Link>
          <Link to="/moving-to-texas" className="font-semibold text-primary">Moving to Texas</Link>
          <Link to="/browse/cities" className="font-semibold text-primary">Texas city guides</Link>
          <Link to="/browse/counties" className="font-semibold text-primary">Texas county guides</Link>
        </div>
      </Container>
    </section>
  </main>;
}
