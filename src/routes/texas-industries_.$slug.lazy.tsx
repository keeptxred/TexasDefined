import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TEXAS_INDUSTRIES, TEXAS_INDUSTRIES_VERIFIED_AT } from "@/data/texas-industries";

export const Route = createLazyFileRoute("/texas-industries/$slug")({
  component: TexasIndustryPage,
});

function TexasIndustryPage() {
  const industry = Route.useLoaderData();
  const related = TEXAS_INDUSTRIES.filter((item) => item.slug !== industry.slug).slice(0, 5);

  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-14 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span>
            <Link to="/texas-industries" className="hover:text-foreground">Texas Industries</Link><span className="mx-2">/</span>
            <span className="text-foreground">{industry.shortTitle}</span>
          </nav>
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas industry guide</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl">{industry.title}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{industry.summary}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Source review · {TEXAS_INDUSTRIES_VERIFIED_AT}</p>
        </Container>
      </section>

      <section className="border-b border-border py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <article>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">How the sector works</p>
              <h2 className="mt-3 font-display text-4xl">How {industry.shortTitle.toLowerCase()} fits the Texas economy</h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
                {industry.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              <section className="mt-12">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Industry structure</p>
                <h2 className="mt-3 font-display text-3xl">Major clusters and activities</h2>
                <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2">
                  {industry.clusters.map((cluster) => <div key={cluster} className="bg-background p-5 text-sm font-semibold">{cluster}</div>)}
                </div>
              </section>

              <section className="mt-12">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Jobs & workforce</p>
                <h2 className="mt-3 font-display text-3xl">Representative roles and common training pathways</h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These are examples of occupations and entry routes found across this sector, not a ranking of jobs or a guarantee that every role is available in every Texas region. Licensing and credential requirements vary by occupation.</p>
                <div className="mt-6 grid gap-px border border-border bg-border lg:grid-cols-2">
                  <div className="bg-background p-6">
                    <h3 className="font-display text-2xl">Representative roles</h3>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                      {industry.workforce.roles.map((role) => <li key={role} className="border-t border-border pt-3 first:border-t-0 first:pt-0">{role}</li>)}
                    </ul>
                  </div>
                  <div className="bg-background p-6">
                    <h3 className="font-display text-2xl">Common education & training routes</h3>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                      {industry.workforce.pathways.map((pathway) => <li key={pathway} className="border-t border-border pt-3 first:border-t-0 first:pt-0">{pathway}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <a href="https://lmi.twc.texas.gov/" target="_blank" rel="noreferrer" className="border p-5 hover:border-primary/60">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Official labor-market data</span>
                    <strong className="mt-2 block font-display text-xl">Texas Workforce Commission LMI</strong>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">Research employment, occupations, wages, projections and regional labor-market conditions using Texas Workforce Commission tools.</span>
                  </a>
                  <a href="https://www.highered.texas.gov/workforce-education-overview/programs-of-study/" target="_blank" rel="noreferrer" className="border border-border p-5 hover:border-primary/60">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Education pathways</span>
                    <strong className="mt-2 block font-display text-xl">Texas Programs of Study</strong>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">Explore Texas career and technical education pathways, including certificates, applied associate degrees and industry-recognized credentials.</span>
                  </a>
                </div>
              </section>

              <section className="mt-12">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Geography</p>
                <h2 className="mt-3 font-display text-3xl">Where the industry clusters in Texas</h2>
                <div className="mt-6 grid gap-px border border-border bg-border md:grid-cols-2">
                  {industry.hubs.map((hub) => (
                    <article key={hub.name} className="bg-background p-6">
                      <h3 className="font-display text-2xl">{hub.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{hub.description}</p>
                      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                        {hub.places.map((place) => <a key={place.href} href={place.href} className="text-xs font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">{place.label} →</a>)}
                      </div>
                    </article>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                  <a href="/browse/cities" className="text-primary">Browse Texas cities →</a>
                  <a href="/browse/counties" className="text-primary">Browse all counties →</a>
                  <a href="/compare-texas-cities" className="text-primary">Compare cities →</a>
                </div>
              </section>

              <section className="mt-12">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Dated indicators</p>
                <h2 className="mt-3 font-display text-3xl">A few numbers that put the sector in context</h2>
                <div className="mt-6 grid gap-px border border-border bg-border md:grid-cols-2">
                  {industry.facts.map((fact) => <article key={fact.label} className="bg-background p-6"><p className="font-display text-4xl">{fact.value}</p><h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.1em]">{fact.label}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{fact.context}</p><a href={fact.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs font-semibold text-primary">{fact.sourceLabel} ↗</a></article>)}
                </div>
              </section>

              <section className="mt-12 border-t border-border pt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Use the rest of TexasDefined</p>
                <h2 className="mt-3 font-display text-3xl">Continue from industry to place, jobs and household decisions</h2>
                <div className="mt-6 grid gap-px border border-border bg-border md:grid-cols-3">
                  {industry.connections.map((connection) => <a key={connection.href} href={connection.href} className="bg-background p-5 hover:bg-muted/30"><h3 className="font-semibold">{connection.label}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{connection.description}</p><p className="mt-4 text-sm font-semibold text-primary">Open →</p></a>)}
                </div>
              </section>

              <section className="mt-12 border-t border-border pt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Sources & scope</p>
                <h2 className="mt-3 font-display text-3xl">Primary and official references</h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined uses these sources to anchor statewide facts and sector definitions. Current operating details, production totals, investment plans and employment counts can change; follow the linked source when a current number matters.</p>
                <ul className="mt-6 space-y-3 text-sm font-semibold">
                  {industry.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="text-primary">{source.label} ↗</a></li>)}
                </ul>
              </section>
            </article>

            <aside>
              <div className="sticky top-24 border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Texas Industries</p>
                <h2 className="mt-2 font-display text-2xl">Continue through the economy</h2>
                <div className="mt-5 divide-y divide-border border-y border-border">
                  {related.map((item) => (
                    <a key={item.slug} href={item.href} className="block py-4 text-sm font-semibold hover:text-primary">{item.shortTitle} →</a>
                  ))}
                </div>
                <Link to="/texas-industries" className="mt-5 inline-block text-sm font-semibold text-primary">View all industries →</Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
