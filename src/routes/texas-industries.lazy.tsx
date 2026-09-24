import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TEXAS_INDUSTRIES, TEXAS_INDUSTRIES_VERIFIED_AT } from "@/data/texas-industries";

export const Route = createLazyFileRoute("/texas-industries")({
  component: TexasIndustriesPage,
});

function TexasIndustriesPage() {
  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><span className="text-foreground">Texas Industries</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas economy · industry authority</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">The industries that power Texas</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Texas has one of the world's largest subnational economies because it is not dependent on a single sector. Energy, technology, manufacturing, logistics, aerospace, healthcare, agriculture, finance, construction, professional services and tourism reinforce one another across very different regions of the state.</p>
          <div className="mt-10 grid max-w-4xl grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
            <Stat value={String(TEXAS_INDUSTRIES.length)} label="Industry guides" />
            <Stat value="254" label="Counties to connect" />
            <Stat value="11" label="Regional systems" />
            <Stat value="1" label="Statewide hub" />
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">How to use this collection</p>
              <h2 className="mt-3 font-display text-4xl">Start statewide, then follow the work to a place</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">Each industry guide explains the statewide system, its major clusters, the Texas regions where activity concentrates, and a small set of dated indicators from first-party or government sources. From there, use TexasDefined's city, county, moving, property and Made in Texas pages to understand the local story.</p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Source review: {TEXAS_INDUSTRIES_VERIFIED_AT}. Statistics are labeled with their period because industry rankings, employment, production and investment totals change over time.</p>
              <div className="mt-7 space-y-3 text-sm font-semibold">
                <a href="/article/texas-jobs-economy-industries" className="block text-primary">Read the Texas jobs & economy overview →</a>
                <a href="/made-in-texas" className="block text-primary">Browse Made in Texas companies →</a>
                <a href="/browse/counties" className="block text-primary">Browse all 254 counties →</a>
                <a href="/compare-texas-cities" className="block text-primary">Compare Texas cities →</a>
              </div>
            </div>
            <div className="grid gap-px border border-border bg-border md:grid-cols-2">
              {TEXAS_INDUSTRIES.map((industry) => (
                <Link
                  key={industry.slug}
                  to="/texas-industries/$slug"
                  params={{ slug: industry.slug }}
                  className="group bg-background p-6 transition-colors hover:bg-muted/30"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Texas industry</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight">{industry.shortTitle}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{industry.description}</p>
                  <p className="mt-5 text-sm font-semibold text-foreground group-hover:text-primary">Explore the sector →</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface py-14 sm:py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">The cross-links matter</p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl">Industry is part of the TexasDefined place graph</h2>
          <div className="mt-8 grid gap-px border border-border bg-border lg:grid-cols-3">
            <Bridge title="Industry → county" body="Use county profiles to see how statewide sectors become local employers, land uses, ports, farms, plants, hospitals and growth corridors." href="/browse/counties" label="Browse counties" />
            <Bridge title="Industry → company" body="Use Made in Texas to distinguish actual Texas production from companies that were founded here, headquartered here or maintain major Texas operations." href="/made-in-texas" label="Open Made in Texas" />
            <Bridge title="Industry → moving decision" body="Use city comparisons, salary tools, housing costs, property taxes and school-district resources when an industry job becomes a relocation question." href="/moving-to-texas" label="Moving to Texas" />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Method</p>
            <h2 className="mt-3 font-display text-4xl">What counts as an industry authority page here?</h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">These pages are designed as durable explainers, not investment recommendations or employer rankings. TexasDefined uses official state and federal data, agency sources, and first-party institutional sources for factual claims. Promotional rankings from economic-development sources are attributed to the source rather than presented as independent TexasDefined judgments.</p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">The collection also separates current statistics from structural explanations. A refinery, semiconductor fab, hospital district or port can be a durable part of a regional economy even when annual output, staffing or investment figures change.</p>
          </div>
        </Container>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="bg-background p-5"><p className="font-display text-3xl">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</p></div>;
}

function Bridge({ title, body, href, label }: { title: string; body: string; href: string; label: string }) {
  return <article className="bg-background p-6"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p><a href={href} className="mt-5 inline-block text-sm font-semibold text-primary">{label} →</a></article>;
}
