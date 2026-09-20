import { useMemo, useState } from 'react';
import { createLazyFileRoute, Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';

export const Route = createLazyFileRoute('/texas-high-school-football-championship-history')({ component: Page });

function divisionLabel(value: 1 | 2 | null) {
  if (value === 1) return 'Division I';
  if (value === 2) return 'Division II';
  return '6A postseason split';
}

function Page() {
  const data = Route.useLoaderData();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return data.rows;
    return data.rows.filter((row) =>
      row.schoolName.toLowerCase().includes(term)
      || row.classification.toLowerCase().includes(term)
      || `district ${row.district}`.includes(term),
    );
  }, [data.rows, query]);

  const leaders = data.rows.slice(0, 12);

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <main className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span className="mx-2">/</span>
        <Link to="/sports">Texas Sports</Link><span className="mx-2">/</span>
        <a href="/sports/friday-night-lights">Friday Night Lights</a><span className="mx-2">/</span>
        <span aria-current="page">Championship history</span>
      </nav>

      <header className="border-b border-border py-10">
        <p className="eyebrow text-primary">UIL football history · current programs</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas high school football state championship history</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">All-time UIL state-title and state-final totals for current 2026–28 football programs, tied directly to each school’s TexasDefined research profile.</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <a href="/texas-high-school-football-teams" className="text-primary">Search all 1,268 UIL programs →</a>
          <a href="/texas-high-school-football-districts" className="text-primary">Browse all 192 UIL districts →</a>
          <a href="/article/texas-high-school-football-playoffs-explained" className="text-primary">How the playoffs work →</a>
        </div>
      </header>

      <section className="grid gap-px border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Current UIL programs" value={data.currentProgramCount} />
        <Stat label="Programs with a state final" value={data.finalAppearingPrograms} />
        <Stat label="Programs with a state title" value={data.titleWinningPrograms} />
        <Stat label="UIL table through" value={data.publishedThroughYear || '—'} />
      </section>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">How to read this</p>
          <h2 className="mt-2 font-display text-3xl">History, not a power ranking</h2>
        </div>
        <div className="space-y-4 text-sm leading-7 text-muted-foreground">
          <p>The table is ordered by all-time UIL state titles, then state-final appearances. That is a historical count, not a claim that one current team is better than another.</p>
          <p>TexasDefined matches UIL’s historical school names to the current 2026–28 program directory using the same exact normalized-name rule used on individual school profiles. Historical programs that closed, renamed or no longer match a current UIL program can still appear in UIL’s official all-time table even when they are not listed here.</p>
          <p>When UIL’s all-time table trails the latest completed state-final archive, TexasDefined supplements totals from the newer official archive rows without double-counting them.</p>
        </div>
      </section>

      <section className="py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">All-time leaders</p>
            <h2 className="mt-2 font-display text-4xl">Current programs with the most UIL state titles</h2>
          </div>
          <a href={data.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-sm font-semibold text-primary underline underline-offset-4">UIL all-time appearances ↗</a>
        </div>

        <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((row, index) => <a key={row.profilePath} href={row.profilePath} className="group bg-background p-5 hover:bg-surface">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">#{index + 1} by titles</p>
            <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{row.schoolName}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{row.classification} · {divisionLabel(row.division)} · District {row.district}</p>
            <div className="mt-4 flex gap-6">
              <div><p className="font-display text-3xl">{row.stateTitles}</p><p className="text-xs text-muted-foreground">State titles</p></div>
              <div><p className="font-display text-3xl">{row.stateFinalAppearances}</p><p className="text-xs text-muted-foreground">State finals</p></div>
            </div>
          </a>)}
        </div>
      </section>

      <section className="border-t border-border py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-primary">Full current-program table</p>
            <h2 className="mt-2 font-display text-4xl">Every matched program with a UIL state-final appearance</h2>
          </div>
          <label className="w-full max-w-sm text-sm font-semibold">
            Search school, class or district
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Katy, 6A, District 22…" className="mt-2 w-full border border-border bg-background px-4 py-3 font-normal" />
          </label>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? 'program' : 'programs'} shown.</p>

        <div className="mt-5 overflow-x-auto border border-border">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-surface text-xs uppercase tracking-[0.1em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3">School</th>
                <th className="px-4 py-3">Current alignment</th>
                <th className="px-4 py-3 text-right">Titles</th>
                <th className="px-4 py-3 text-right">State finals</th>
                <th className="px-4 py-3">UIL appearance years</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => <tr key={row.profilePath} className="border-t border-border">
                <td className="px-4 py-4"><a href={row.profilePath} className="font-semibold text-primary underline underline-offset-4">{row.schoolName}</a></td>
                <td className="px-4 py-4 text-muted-foreground">{row.classification} · {divisionLabel(row.division)} · District {row.district}</td>
                <td className="px-4 py-4 text-right font-semibold">{row.stateTitles}</td>
                <td className="px-4 py-4 text-right">{row.stateFinalAppearances}</td>
                <td className="max-w-xl px-4 py-4 text-muted-foreground">{row.appearanceYears}{row.supplementedFinals > 0 ? ` + ${row.supplementedFinals} newer completed ${row.supplementedFinals === 1 ? 'final' : 'finals'} from the UIL archive` : ''}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-8 border-t border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Official sources</p>
          <h2 className="mt-2 font-display text-3xl">UIL history is the controlling record</h2>
        </div>
        <div className="space-y-4 text-sm leading-7 text-muted-foreground">
          <p>The all-time totals come from UIL’s Football All-Time Appearances table. Newer completed finals are supplemented only from UIL’s official Football State Archives when needed.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-semibold">
            <a href={data.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL all-time appearances ↗</a>
            <a href={data.recentArchiveSourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL state archives ↗</a>
          </div>
        </div>
      </section>
    </main>
  </Container>;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="bg-background p-5"><p className="font-display text-4xl">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted-foreground">{label}</p></div>;
}
