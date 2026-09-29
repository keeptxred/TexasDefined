import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { RELOCATION_CITY_PAIRS, relocationCityPairPath } from "@/data/relocation-city-pairs";

export const Route = createLazyFileRoute("/compare-texas-cities/$pair")({ component: CityPairPage });

function CityPanel({
  city,
  metro,
}: {
  city: { name: string; toolSlug: string; countyContext: readonly string[]; places: readonly string[]; guideHref: string; researchNote: string };
  metro: { name: string; jobMarket: string };
}) {
  return <article className="border-t-2 border-foreground pt-5">
    <p className="eyebrow text-primary">{metro.name}</p>
    <h2 className="mt-2 font-display text-4xl">{city.name}</h2>
    <p className="mt-4 text-sm leading-7 text-muted-foreground">{city.researchNote}</p>
    <dl className="mt-6 space-y-3 text-sm">
      <div><dt className="font-semibold">Core counties to check</dt><dd className="mt-1 text-muted-foreground">{city.countyContext.join(", ")}</dd></div>
      <div><dt className="font-semibold">Places in the relocation cluster</dt><dd className="mt-1 text-muted-foreground">{city.places.join(", ")}</dd></div>
      <div><dt className="font-semibold">BLS metro market</dt><dd className="mt-1 text-muted-foreground">{metro.jobMarket}</dd></div>
    </dl>
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
      <a href={city.guideHref} className="text-primary underline underline-offset-4">Open relocation guide</a>
      <a href={`/texas-cost-of-living-calculator/${city.toolSlug}`} className="text-primary underline underline-offset-4">Cost-of-living planner</a>
      <a href={`/texas-home-affordability-calculator/${city.toolSlug}`} className="text-primary underline underline-offset-4">Home affordability</a>
      <a href={`/texas-salary-needed-calculator/${city.toolSlug}`} className="text-primary underline underline-offset-4">Salary-needed planner</a>
    </div>
  </article>;
}

function CityPairPage() {
  const { pair, cityA, cityB, metroA, metroB, sources, sourceVerifiedLabel, faq } = Route.useLoaderData();
  const relatedPairs = RELOCATION_CITY_PAIRS.filter((item) => item.slug !== pair.slug && (item.cityA === pair.cityA || item.cityB === pair.cityA || item.cityA === pair.cityB || item.cityB === pair.cityB)).slice(0, 4);

  return <main>
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/moving-to-texas" className="hover:text-foreground">Moving to Texas</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/compare-texas-cities" className="hover:text-foreground">Compare cities</Link></li>
            <li aria-hidden>·</li>
            <li aria-current="page" className="text-foreground">{pair.cityA} vs {pair.cityB}</li>
          </ol>
        </nav>
        <p className="eyebrow mt-8 text-primary">Texas relocation comparison</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{pair.cityA} vs {pair.cityB}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Compare the two metros without a made-up winner. Start with the job location and household budget, then test the exact address for housing, commute, taxes, utilities, insurance, schools and the services your household actually uses.</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Official-source framework · {sourceVerifiedLabel}</p>
      </Container>
    </section>

    <Container className="py-14 sm:py-20">
      <section className="grid gap-8 md:grid-cols-2">
        <CityPanel city={cityA} metro={metroA} />
        <CityPanel city={cityB} metro={metroB} />
      </section>

      <section className="mt-12 border-t border-border pt-8">
        <p className="eyebrow text-primary">What changes the answer</p>
        <h2 className="mt-2 font-display text-4xl">Compare the address, not the stereotype</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <article><h3 className="font-display text-2xl">Housing & total monthly cost</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Do not compare listing prices alone. Put rent or mortgage, property tax, homeowners or renters insurance, utilities, HOA charges and transportation into the same household worksheet. Texas costs can shift materially across counties, school districts, utility territories and individual properties.</p></article>
          <article><h3 className="font-display text-2xl">Commute & repeated trips</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">A metro comparison becomes much more useful once you know the repeated work, school, medical and family trips. Test those routes at the hours you would actually travel and check toll exposure rather than relying on map distance alone.</p></article>
          <article><h3 className="font-display text-2xl">Insurance & hazard exposure</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Wind, hail, flooding, severe storms and other hazards vary by address. Use current insurance quotes and FEMA flood mapping before treating a home price as the real monthly housing cost.</p></article>
          <article><h3 className="font-display text-2xl">Schools, utilities & local government</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">A mailing-city name does not establish the school district, utility provider, city limits or taxing units. Verify those from the exact address through the responsible public agency before signing a lease or contract.</p></article>
        </div>
      </section>

      <section className="mt-12 border-y border-border py-8">
        <p className="eyebrow text-primary">Official research trail</p>
        <h2 className="mt-2 font-display text-3xl">Use current public data before deciding</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined uses these sources as decision inputs, not as a formula that declares one metro better. Volatile figures such as wages, home prices, insurance premiums and traffic conditions should be rechecked when you are ready to act.</p>
        <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          {sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.name} ↗</a><p className="mt-1 text-muted-foreground">{source.purpose}</p></li>)}
        </ul>
      </section>

      <section className="mt-12">
        <p className="eyebrow text-primary">Decision questions</p>
        <h2 className="mt-2 font-display text-3xl">{pair.cityA} vs {pair.cityB} FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faq.map((item) => <details key={item.q} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-display text-xl marker:hidden">{item.q}<span className="float-right text-primary group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.a}</p></details>)}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-8">
        <p className="eyebrow text-primary">Keep comparing</p>
        <h2 className="mt-2 font-display text-3xl">More major Texas city matchups</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {relatedPairs.map((item) => <a key={item.slug} href={relocationCityPairPath(item.slug)} className="border border-border p-4 font-display text-xl hover:border-primary hover:text-primary">{item.cityA} vs {item.cityB} →</a>)}
        </div>
        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
          <Link to="/compare-texas-cities" className="text-primary underline underline-offset-4">Interactive Texas city comparer</Link>
          <Link to="/moving-to-texas" className="text-primary underline underline-offset-4">Moving to Texas hub</Link>
          <Link to="/moving-to-texas-checklist" className="text-primary underline underline-offset-4">First-month moving checklist</Link>
          <Link to="/browse/cities" className="underline underline-offset-4">Texas city guides</Link>
          <Link to="/browse/counties" className="underline underline-offset-4">Texas county guides</Link>
        </div>
      </section>
    </Container>
  </main>;
}
