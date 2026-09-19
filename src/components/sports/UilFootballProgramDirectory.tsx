import { useMemo, useState } from 'react';

type Classification = '6A' | '5A' | '4A' | '3A' | '2A' | '1A';

type Program = {
  slug: string;
  displayName: string;
  schoolName: string;
  classification: Classification;
  division: 1 | 2 | null;
  district: number;
  footballType: '6-Man' | '11-Man';
  profilePath: string;
};

type Props = {
  programs: Program[];
  counts: {
    total: number;
    byClassification: Record<string, number>;
  };
};

const CLASSIFICATIONS: readonly Classification[] = ['6A', '5A', '4A', '3A', '2A', '1A'];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function UilFootballProgramDirectory({ programs, counts }: Props) {
  const [query, setQuery] = useState('');
  const [classification, setClassification] = useState<'ALL' | Classification>('ALL');
  const normalizedQuery = normalize(query);

  const filtered = useMemo(() => programs.filter((program) => {
    if (classification !== 'ALL' && program.classification !== classification) return false;
    if (!normalizedQuery) return true;
    return normalize(`${program.displayName} ${program.schoolName}`).includes(normalizedQuery);
  }), [programs, classification, normalizedQuery]);

  return <section className="border-b border-border py-12">
    <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
      <div>
        <p className="eyebrow text-primary">All UIL football schools</p>
        <h2 className="mt-2 font-display text-3xl leading-tight">1,268 current programs</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Every current UIL football program gets the same TexasDefined school-profile structure. The directory is ordered by classification from 6A through 1A, then alphabetically inside each classification.
        </p>
        <p className="mt-3 text-xs leading-6 text-muted-foreground">
          Classification is based on enrollment size. The ordering below is a size-tier navigation choice, not a claim that a larger-school program is better than a smaller-school program.
        </p>
      </div>

      <div>
        <div className="grid gap-3 border-y border-border py-5 sm:grid-cols-[1fr_12rem]">
          <div>
            <label htmlFor="uil-football-school-filter" className="text-sm font-semibold">Filter all 1,268 programs</label>
            <input
              id="uil-football-school-filter"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try Katy, Aledo, Abbott or North Shore"
              className="mt-2 min-h-11 w-full border border-border bg-background px-4 text-base"
            />
          </div>
          <div>
            <label htmlFor="uil-football-class-filter" className="text-sm font-semibold">Classification</label>
            <select
              id="uil-football-class-filter"
              value={classification}
              onChange={(event) => setClassification(event.target.value as 'ALL' | Classification)}
              className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-base"
            >
              <option value="ALL">All classifications</option>
              {CLASSIFICATIONS.map((value) => <option key={value} value={value}>{value} · {counts.byClassification[value] ?? 0} schools</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border py-4">
          <p className="font-display text-2xl">{filtered.length.toLocaleString()} {filtered.length === 1 ? 'program' : 'programs'}</p>
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{counts.total.toLocaleString()} statewide</p>
        </div>

        {CLASSIFICATIONS.map((className) => {
          const classPrograms = filtered.filter((program) => program.classification === className);
          if (!classPrograms.length) return null;
          return <section key={className} className="border-b border-border py-7" aria-labelledby={`football-directory-${className}`}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow text-primary">UIL classification</p>
                <h3 id={`football-directory-${className}`} className="mt-1 font-display text-4xl">{className}</h3>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{classPrograms.length.toLocaleString()} shown</p>
            </div>
            <div className="mt-5 grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
              {classPrograms.map((program) => <a
                key={program.slug}
                href={program.profilePath}
                className="group bg-background p-4 hover:bg-surface"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                  {program.classification}{program.division ? ` · Division ${program.division === 1 ? 'I' : 'II'}` : ''} · District {program.district}
                </p>
                <h4 className="mt-2 font-display text-xl leading-tight group-hover:text-primary">{program.displayName}</h4>
                <p className="mt-2 text-xs text-muted-foreground">{program.footballType} · Open school profile →</p>
              </a>)}
            </div>
          </section>;
        })}

        {!filtered.length && <p className="border-b border-border py-8 text-sm text-muted-foreground">No current UIL football program matched that filter.</p>}
      </div>
    </div>
  </section>;
}
