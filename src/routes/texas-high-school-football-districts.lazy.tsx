import { createLazyFileRoute, Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';

export const Route = createLazyFileRoute('/texas-high-school-football-districts')({ component: Page });

function Page() {
  const districts = Route.useLoaderData();
  const groups = new Map<string, typeof districts>();

  for (const district of districts) {
    const key = district.division
      ? `${district.classification} Division ${district.division === 1 ? 'I' : 'II'}`
      : district.classification;
    const current = groups.get(key) ?? [];
    current.push(district);
    groups.set(key, current);
  }

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <main className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span className="mx-2">/</span>
        <Link to="/sports">Texas Sports</Link><span className="mx-2">/</span>
        <a href="/texas-high-school-football-teams">High school football teams</a><span className="mx-2">/</span>
        <span aria-current="page">UIL districts</span>
      </nav>

      <header className="border-b border-border py-10">
        <p className="eyebrow text-primary">2026–28 UIL football alignment</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas high school football districts</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Browse all 192 current UIL football districts. Each district page lists every member school in the official 2026–28 alignment and links directly to that program’s TexasDefined research profile.</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <a href="/texas-high-school-football-teams" className="text-primary">Search all 1,268 UIL programs →</a>
          <a href="/article/texas-high-school-football-classifications-1a-6a" className="text-primary">Understand 1A through 6A →</a>
          <a href="/article/texas-high-school-football-playoffs-explained" className="text-primary">How the playoffs work →</a>
        </div>
      </header>

      <section className="py-10">
        <p className="max-w-4xl text-sm leading-7 text-muted-foreground">District assignment is a current competition structure, not a school or team ranking. UIL realignment runs on a two-year cycle, so these pages are explicitly tied to the 2026–28 alignment.</p>
      </section>

      <div className="space-y-12">
        {[...groups].map(([label, entries]) => <section key={label} className="border-t-2 border-foreground pt-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-primary">{entries[0]?.footballType}</p>
              <h2 className="mt-2 font-display text-4xl">{label}</h2>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{entries.length} districts</span>
          </div>
          <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {entries.map((district) => <a key={district.slug} href={district.profilePath} className="group bg-background p-5 hover:bg-surface">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">District {district.district}</p>
              <h3 className="mt-2 font-display text-2xl group-hover:text-primary">{district.programCount} {district.programCount === 1 ? 'program' : 'programs'}</h3>
              <p className="mt-2 text-xs text-muted-foreground">Open current district →</p>
            </a>)}
          </div>
        </section>)}
      </div>

      <section className="mt-12 border-t border-border pt-8">
        <p className="text-sm leading-7 text-muted-foreground">Source: University Interscholastic League 2026–28 football alignment. Use the linked district page or school profile for the controlling UIL alignment document and current school context.</p>
      </section>
    </main>
  </Container>;
}
