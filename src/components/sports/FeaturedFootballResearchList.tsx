import { useMemo, useState } from 'react';

import {
  FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS,
  FEATURED_SOURCE_ROW_COUNT,
  FEATURED_UNIQUE_PROGRAM_COUNT,
  featuredFootballProfilePath,
  normalizeFeaturedFootballName,
} from '@/data/high-school-football/featured-programs';

export function FeaturedFootballResearchList() {
  const [query, setQuery] = useState('');
  const normalizedQuery = normalizeFeaturedFootballName(query);
  const visible = useMemo(() => {
    if (!normalizedQuery) return FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS;
    return FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS.filter((program) =>
      [program.displayName, program.searchName, ...program.aliases]
        .map(normalizeFeaturedFootballName)
        .some((value) => value.includes(normalizedQuery)),
    );
  }, [normalizedQuery]);

  return <section className="border-b border-border py-12">
    <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
      <div>
        <p className="eyebrow text-primary">250-school research list</p>
        <h2 className="mt-2 font-display text-3xl leading-tight">Open a detailed school profile</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          The supplied list contains {FEATURED_SOURCE_ROW_COUNT} positions and resolves to {FEATURED_UNIQUE_PROGRAM_COUNT} unique school pages after exact duplicates and alternate city-prefixed names are consolidated.
        </p>
      </div>
      <div>
        <label htmlFor="football-research-list-search" className="text-sm font-semibold">Filter the 250-school list</label>
        <input
          id="football-research-list-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Katy, Westlake, Clear Creek or Boerne"
          className="mt-2 min-h-11 w-full border border-border bg-background px-4 text-base"
        />
        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-3">
          <p className="font-display text-2xl">{visible.length.toLocaleString()} unique {visible.length === 1 ? 'profile' : 'profiles'}</p>
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Original positions preserved</p>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2">
          {visible.map((program) => <a
            key={program.slug}
            href={featuredFootballProfilePath(program)}
            className="group bg-background p-4 hover:bg-surface"
          >
            <div className="flex items-start gap-4">
              <span className="min-w-12 font-display text-2xl text-primary">#{program.primaryRank}</span>
              <div className="min-w-0">
                <h3 className="font-display text-xl leading-tight group-hover:text-primary">{program.displayName}</h3>
                {program.sourceRanks.length > 1
                  ? <p className="mt-1 text-xs text-muted-foreground">Also appears at {program.sourceRanks.slice(1).map((rank) => `#${rank}`).join(', ')}</p>
                  : <p className="mt-1 text-xs text-muted-foreground">School football profile →</p>}
                {program.governingBodyHint && <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">{program.governingBodyHint}{program.associationClassification ? ` · ${program.associationClassification}` : ''}</p>}
              </div>
            </div>
          </a>)}
        </div>
        {!visible.length && <p className="border-b border-border py-6 text-sm text-muted-foreground">No supplied school matched that filter. Use the statewide UIL finder above for schools outside this 250-position research list.</p>}
        <p className="mt-5 max-w-4xl text-xs leading-6 text-muted-foreground">
          List position is preserved as supplied for editorial research. It is not a TexasDefined score of academics, coaching quality, recruiting opportunity or overall student fit.
        </p>
      </div>
    </div>
  </section>;
}
