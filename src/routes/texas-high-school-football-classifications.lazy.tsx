import { createLazyFileRoute, Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';

export const Route = createLazyFileRoute('/texas-high-school-football-classifications')({ component: Page });

function Page() {
  const classifications = Route.useLoaderData();

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <main className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span className="mx-2">/</span>
        <Link to="/sports">Texas Sports</Link><span className="mx-2">/</span>
        <a href="/texas-high-school-football-teams">High school football</a><span className="mx-2">/</span>
        <span aria-current="page">Classifications</span>
      </nav>

      <header className="border-b border-border py-10">
        <p className="eyebrow text-primary">2026–28 UIL football</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas high school football classifications</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">
          Browse every current UIL football program by enrollment classification, beginning with 6A and moving through 1A. Classification describes school size and competition structure; it is not a TexasDefined ranking of team quality.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <a href="/texas-high-school-football-teams" className="text-primary">Search all 1,268 programs →</a>
          <a href="/texas-high-school-football-districts" className="text-primary">Browse all 192 districts →</a>
          <a href="/texas-high-school-football-championship-history" className="text-primary">Championship history →</a>
        </div>
      </header>

      <section className="py-10">
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {classifications.map((item, index) => <a key={item.slug} href={item.profilePath} className="group bg-background p-6 hover:bg-surface">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">#{index + 1} by UIL classification size</p>
            <h2 className="mt-2 font-display text-5xl group-hover:text-primary">{item.classification}</h2>
            <p className="mt-3 text-sm font-semibold">{item.programCount.toLocaleString()} programs · {item.districtCount} districts</p>
            <p className="mt-2 text-sm text-muted-foreground">Enrollment: {item.enrollmentBand}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.footballType}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-primary">Open {item.classification} directory →</span>
          </a>)}
        </div>
      </section>

      <section className="grid gap-8 border-t border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">How to read the order</p>
          <h2 className="mt-2 font-display text-3xl">6A first means larger enrollment</h2>
        </div>
        <div className="space-y-4 text-sm leading-7 text-muted-foreground">
          <p>TexasDefined follows the UIL classification hierarchy from 6A through 1A because that is how the current statewide system groups schools by enrollment. A school appearing in 6A is not automatically a stronger football program than a school in 5A, 4A or any other classification.</p>
          <p>Within 1A through 5A, football Division I and Division II are assigned before the season. In 6A, playoff qualifiers are split into Division I and Division II after district qualification based on enrollment.</p>
          <p>Every school in every classification links to the same canonical TexasDefined football profile system. No class receives a richer page template simply because it is larger.</p>
          <a href="https://www.uiltexas.org/athletics/conference-cutoffs" target="_blank" rel="noreferrer noopener" className="inline-block font-semibold text-primary underline underline-offset-4">Official UIL 2026–28 enrollment cutoffs ↗</a>
        </div>
      </section>
    </main>
  </Container>;
}
