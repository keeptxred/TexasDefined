import { useMemo, useState } from 'react';

import {
  UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE,
  uilFootballConferenceBand,
} from '@/data/high-school-football/enrollment-bands';

type Program = {
  slug: string;
  profilePath: string;
  schoolName: string;
  classification: '1A' | '2A' | '3A' | '4A' | '5A' | '6A';
  division: 1 | 2 | null;
  district: number;
  footballType: '6-Man' | '11-Man';
  uilEnrollment: number;
};

const CLASSIFICATIONS = ['6A', '5A', '4A', '3A', '2A', '1A'] as const;
const INITIAL_PROGRAMS_PER_CLASS = 24;

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function UilFootballProgramDirectory({ programs }: { programs: Program[] }) {
  const [query, setQuery] = useState('');
  const [classification, setClassification] = useState<'ALL' | Program['classification']>('ALL');
  const [expandedClasses, setExpandedClasses] = useState<Set<Program['classification']>>(() => new Set());
  const normalizedQuery = normalize(query);

  const counts = useMemo(() => {
    const next = new Map<Program['classification'], number>();
    for (const program of programs) {
      next.set(program.classification, (next.get(program.classification) ?? 0) + 1);
    }
    return next;
  }, [programs]);

  const visible = useMemo(() => programs.filter((program) => {
    if (classification !== 'ALL' && program.classification !== classification) return false;
    if (!normalizedQuery) return true;
    return normalize(program.schoolName).includes(normalizedQuery)
      || normalize(`${program.classification} district ${program.district}`).includes(normalizedQuery);
  }), [programs, classification, normalizedQuery]);

  return <section className="border-b border-border py-12">
    <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
      <div>
        <p className="eyebrow text-primary">All current UIL programs</p>
        <h2 className="mt-2 font-display text-3xl leading-tight">Browse all 1,268 Texas high school football programs</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Every current UIL football program gets the same directory and profile treatment. The list is ordered by UIL enrollment classification—6A first through 1A—not by a TexasDefined quality score.
        </p>
      </div>

      <div>
        <label htmlFor="uil-football-directory-search" className="text-sm font-semibold">Find a school in the statewide directory</label>
        <input
          id="uil-football-directory-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Katy, Aledo, Refugio or District 22"
          className="mt-2 min-h-11 w-full border border-border bg-background px-4 text-base"
        />

        <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter by UIL classification">
          <button
            type="button"
            onClick={() => setClassification('ALL')}
            className={classification === 'ALL' ? 'border border-foreground px-3 py-2 text-sm font-semibold' : 'border border-border px-3 py-2 text-sm'}
          >
            All 1,268
          </button>
          {CLASSIFICATIONS.map((item) => <button
            key={item}
            type="button"
            onClick={() => setClassification(item)}
            className={classification === item ? 'border border-foreground px-3 py-2 text-sm font-semibold' : 'border border-border px-3 py-2 text-sm'}
          >
            {item} · {(counts.get(item) ?? 0).toLocaleString()}
          </button>)}
        </div>

        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-3">
          <p className="font-display text-2xl">{visible.length.toLocaleString()} {visible.length === 1 ? 'program' : 'programs'}</p>
          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">6A → 1A · enrollment classification</p>
        </div>

        <div className="mt-2">
          {CLASSIFICATIONS
            .filter((item) => classification === 'ALL' || classification === item)
            .map((item) => {
              const classPrograms = visible.filter((program) => program.classification === item);
              if (!classPrograms.length) return null;
              const showAll = classification !== 'ALL' || Boolean(normalizedQuery) || expandedClasses.has(item);
              const displayedPrograms = showAll ? classPrograms : classPrograms.slice(0, INITIAL_PROGRAMS_PER_CLASS);
              const hiddenCount = classPrograms.length - displayedPrograms.length;
              return <section key={item} className="border-b border-border py-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="eyebrow text-primary">{item}</p>
                    <h3 className="mt-1 font-display text-3xl">{item} football programs</h3>
                    <p className="mt-2 text-xs text-muted-foreground">UIL enrollment band: {uilFootballConferenceBand(item)}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{classPrograms.length.toLocaleString()}</span>
                </div>
                <div className="mt-4 grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
                  {displayedPrograms.map((program) => <a
                    key={program.slug}
                    href={program.profilePath}
                    className="group bg-background p-4 hover:bg-surface"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                      {program.classification}
                      {program.division ? ` · Division ${program.division === 1 ? 'I' : 'II'}` : ''}
                      {` · District ${program.district}`}
                    </p>
                    <h4 className="mt-2 font-display text-xl leading-tight group-hover:text-primary">{program.schoolName}</h4>
                    <p className="mt-2 text-xs text-muted-foreground">UIL enrollment {program.uilEnrollment.toLocaleString('en-US')} · {program.footballType}</p>
                    <p className="mt-1 text-xs font-semibold text-primary">Open school football profile →</p>
                  </a>)}
                </div>
                {hiddenCount > 0 && <button
                  type="button"
                  onClick={() => setExpandedClasses((current) => new Set([...current, item]))}
                  className="mt-4 border border-border px-4 py-2 text-sm font-semibold hover:border-foreground"
                >
                  Show all {classPrograms.length.toLocaleString()} {item} programs
                </button>}
              </section>;
            })}
        </div>

        {!visible.length && <p className="border-b border-border py-6 text-sm text-muted-foreground">No current UIL program matched that search and classification filter.</p>}

        <p className="mt-5 max-w-4xl text-xs leading-6 text-muted-foreground">
          UIL classifications are based on enrollment. A 6A school is listed above a 5A school because it is in the larger-enrollment classification, not because TexasDefined has rated its football program as better.
        </p>
        <a href={UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE.url} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block text-xs font-semibold text-primary underline underline-offset-4">Official UIL 2026–28 enrollment cutoffs ↗</a>
      </div>
    </div>
  </section>;
}
