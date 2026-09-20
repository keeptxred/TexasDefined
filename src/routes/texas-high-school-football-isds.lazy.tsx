import { useMemo, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';

export const Route = createLazyFileRoute('/texas-high-school-football-isds')({ component: Page });

function Page() {
  const { isds, matchedProgramCount, unmatchedProgramCount } = Route.useLoaderData();
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();

  const visible = useMemo(() => {
    if (!needle) return isds;
    return isds.filter((district) =>
      district.districtName.toLowerCase().includes(needle)
      || district.countyNames.some((county) => county.toLowerCase().includes(needle))
      || district.cities.some((city) => city.toLowerCase().includes(needle)),
    );
  }, [isds, needle]);

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <a href="/">Front page</a><span className="mx-2">/</span>
        <a href="/texas-high-school-football-teams">High school football</a><span className="mx-2">/</span>
        <span aria-current="page">ISDs</span>
      </nav>

      <header className="border-b border-border py-10">
        <p className="eyebrow text-primary">Football & relocation research</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas high school football by ISD</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">
          Start with the school district, then see every current UIL football program TexasDefined can match to that ISD through Texas Education Agency AskTED. School lists inside each ISD are ordered by UIL enrollment classification from 6A through 1A, not by a TexasDefined quality score.
        </p>
      </header>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Find an ISD</p>
          <h2 className="mt-2 font-display text-3xl">Browse district football options</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Search by ISD, city or county. The ISD list itself is alphabetical so a district is not implied to be better because it appears first.
          </p>
        </div>
        <div>
          <label htmlFor="football-isd-search" className="text-sm font-semibold">ISD, city or county</label>
          <input
            id="football-isd-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Katy ISD, Frisco, Collin or Northside"
            className="mt-2 min-h-11 w-full border border-border bg-background px-4 text-base"
          />
          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-3">
            <p className="font-display text-2xl">{visible.length.toLocaleString()} {visible.length === 1 ? 'ISD' : 'ISDs'}</p>
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{matchedProgramCount.toLocaleString()} matched UIL programs</p>
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((district) => <a key={district.slug} href={district.profilePath} className="group bg-background p-5 hover:bg-surface">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Highest current class · {district.highestClassification}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{district.districtName}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{district.programCount} current UIL {district.programCount === 1 ? 'program' : 'programs'}</p>
              {district.countyNames.length > 0 && <p className="mt-2 text-xs text-muted-foreground">{district.countyNames.slice(0, 3).join(' · ')}{district.countyNames.length > 3 ? ' · +' : ''}</p>}
              <span className="mt-3 inline-block text-sm font-semibold text-primary">Open ISD football research →</span>
            </a>)}
          </div>

          {!visible.length && <p className="border-b border-border py-6 text-sm text-muted-foreground">No TEA-matched football ISD matched that search.</p>}

          <p className="mt-5 text-xs leading-6 text-muted-foreground">
            {unmatchedProgramCount > 0
              ? `${unmatchedProgramCount.toLocaleString()} current UIL football programs do not yet have a confident TEA district match and remain available in the statewide school directory.`
              : 'All current UIL football programs have a TEA district match in this directory.'}
          </p>
        </div>
      </section>

      <section className="grid gap-8 py-12 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Moving to Texas</p><h2 className="mt-2 font-display text-3xl">The ISD is not the final campus answer</h2></div>
        <div>
          <p className="max-w-4xl text-sm leading-7 text-muted-foreground">
            A home can be inside an ISD without being assigned to every high school in that district. Use the exact street address, confirm the assigned campus with the district, and separately verify transfer and UIL athletic-eligibility rules before making a housing decision around football.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <a href="/find-my-school-district" className="text-primary underline underline-offset-4">Find and verify the school district →</a>
            <a href="/texas-high-school-football-teams" className="text-primary underline underline-offset-4">Browse all 1,268 UIL programs →</a>
          </div>
        </div>
      </section>
    </article>
  </Container>;
}
