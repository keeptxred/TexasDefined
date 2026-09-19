import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

type FootballProgram = {
  schoolName: string;
  profilePath: string;
  officialSchoolName?: string;
  classification: '1A' | '2A' | '3A' | '4A' | '5A' | '6A';
  division: 1 | 2 | null;
  district: number;
  footballType: '6-Man' | '11-Man';
  alignmentCycle: '2026-28';
  districtName?: string;
  countyName?: string;
  city?: string;
  sourceUrl: string;
  recentHistory?: {
    windowStartSeason: string;
    windowEndSeason: string;
    stateTitles: number;
    stateRunnerUpFinishes: number;
    stateFinalAppearances: number;
    mostRecentTitleSeason?: string;
    mostRecentFinalSeason?: string;
    finals: Array<{
      season: string;
      conference: string;
      result: 'Champion' | 'Runner-Up';
      opponent: string;
      score: string;
    }>;
    sourceUrl: string;
    matchMethod: 'exact-normalized-uil-name';
  };
  allTimeHistory?: {
    stateTitles: number;
    stateFinalAppearances: number;
    appearanceYears: string;
    publishedThroughYear: number;
    supplementedFinals: Array<{
      season: string;
      conference: string;
      result: 'Champion' | 'Runner-Up';
      opponent: string;
    }>;
    sourceUrl: string;
    recentArchiveSourceUrl?: string;
    matchMethod: 'exact-normalized-uil-name';
  };
};

type LookupResponse = {
  ok: boolean;
  programs?: FootballProgram[];
  matchedTotal?: number;
  directoryAvailable?: boolean;
  historyAvailable?: boolean;
  allTimeHistoryAvailable?: boolean;
  alignmentCycle?: string;
  error?: string;
};

type Props = {
  countyName?: string;
  heading?: string;
  intro?: string;
  compact?: boolean;
  showSearch?: boolean;
  initialQuery?: string;
};

export function HighSchoolFootballLookup({
  countyName,
  heading = 'Find a Texas high school football program',
  intro = 'Search a high school, ISD, city or county to see its current UIL football classification, division and district.',
  compact = false,
  showSearch = true,
  initialQuery = '',
}: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [programs, setPrograms] = useState<FootballProgram[]>([]);
  const [matchedTotal, setMatchedTotal] = useState(0);
  const [directoryAvailable, setDirectoryAvailable] = useState(true);
  const [historyAvailable, setHistoryAvailable] = useState(true);
  const [allTimeHistoryAvailable, setAllTimeHistoryAvailable] = useState(true);
  const [loading, setLoading] = useState(Boolean(countyName));
  const [error, setError] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (!countyName) return;
    const controller = new AbortController();

    async function loadCounty() {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams({ county: countyName, limit: '100' });
        const response = await fetch(`/api/high-school-football?${params.toString()}`, { signal: controller.signal });
        const payload = await response.json() as LookupResponse;
        if (!response.ok || !payload.ok) throw new Error(payload.error || 'Football programs could not be loaded.');
        setPrograms(payload.programs ?? []);
        setMatchedTotal(payload.matchedTotal ?? payload.programs?.length ?? 0);
        setDirectoryAvailable(payload.directoryAvailable !== false);
        setHistoryAvailable(payload.historyAvailable !== false);
        setAllTimeHistoryAvailable(payload.allTimeHistoryAvailable !== false);
        setSelectedKeys([]);
      } catch (cause) {
        if (controller.signal.aborted) return;
        setError(cause instanceof Error ? cause.message : 'Football programs could not be loaded.');
        setPrograms([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadCounty();
    return () => controller.abort();
  }, [countyName]);

  const runQuery = useCallback(async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Enter a high school, ISD, city or county.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ q: trimmed, limit: compact ? '24' : '50' });
      const response = await fetch(`/api/high-school-football?${params.toString()}`);
      const payload = await response.json() as LookupResponse;
      if (!response.ok || !payload.ok) throw new Error(payload.error || 'Football programs could not be loaded.');
      setPrograms(payload.programs ?? []);
      setMatchedTotal(payload.matchedTotal ?? payload.programs?.length ?? 0);
      setDirectoryAvailable(payload.directoryAvailable !== false);
      setHistoryAvailable(payload.historyAvailable !== false);
      setAllTimeHistoryAvailable(payload.allTimeHistoryAvailable !== false);
      setSelectedKeys([]);
      if (!(payload.programs?.length)) setError(`No current UIL football program matched “${trimmed}.” Try the official high-school or ISD name.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Football programs could not be loaded.');
      setPrograms([]);
      setMatchedTotal(0);
    } finally {
      setLoading(false);
    }
  }, [compact]);

  useEffect(() => {
    const trimmed = initialQuery.trim();
    if (!trimmed || countyName) return;
    setQuery(trimmed);
    void runQuery(trimmed);
  }, [initialQuery, countyName, runQuery]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await runQuery(query);
  }

  const visible = useMemo(() => programs.slice(0, compact ? 16 : 50), [programs, compact]);
  const selectedPrograms = useMemo(
    () => selectedKeys
      .map((key) => programs.find((program) => programKey(program) === key))
      .filter((program): program is FootballProgram => Boolean(program)),
    [programs, selectedKeys],
  );

  function toggleCompare(program: FootballProgram) {
    const key = programKey(program);
    setSelectedKeys((current) => {
      if (current.includes(key)) return current.filter((item) => item !== key);
      if (current.length >= 3) return current;
      return [...current, key];
    });
  }

  return <section className={compact ? 'border-b border-border py-10' : 'border-y border-border py-10 sm:py-12'}>
    <div className={compact ? 'grid gap-8 lg:grid-cols-[15rem_1fr]' : ''}>
      <div>
        <p className="eyebrow text-primary">Texas high school football</p>
        <h2 className={compact ? 'mt-2 font-display text-3xl leading-tight' : 'mt-3 max-w-4xl font-display text-4xl sm:text-5xl'}>{heading}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{intro}</p>
        {compact && <a href="/texas-high-school-football-teams" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open the statewide football finder →</a>}
      </div>

      <div className={compact ? '' : 'mt-8'}>
        {showSearch && <form onSubmit={submit} className="border-y border-border py-5">
          <label htmlFor={countyName ? 'county-football-search' : 'football-program-search'} className="text-sm font-semibold">High school, ISD, city or county</label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input
              id={countyName ? 'county-football-search' : 'football-program-search'}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try Katy, Allen, North Shore or Prosper ISD"
              className="min-h-11 flex-1 border border-border bg-background px-4 text-base"
            />
            <button type="submit" disabled={loading} className="min-h-11 border border-foreground px-5 text-sm font-semibold disabled:opacity-50">
              {loading ? 'Searching…' : 'Find programs'}
            </button>
          </div>
        </form>}

        {loading && <p className="py-6 text-sm text-muted-foreground">Loading current UIL football programs…</p>}
        {error && <p className="border-b border-border py-5 text-sm leading-6 text-muted-foreground">{error}</p>}

        {!loading && visible.length > 0 && <div className={showSearch ? 'mt-6' : ''}>
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-3">
            <h3 className="font-display text-2xl">{countyName ? `UIL football programs in ${countyName}` : 'Matching football programs'}</h3>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{matchedTotal.toLocaleString()} {matchedTotal === 1 ? 'program' : 'programs'}</span>
          </div>
          {selectedPrograms.length > 0 && <ProgramComparison programs={selectedPrograms} onClear={() => setSelectedKeys([])} />}
          <div className="grid gap-px bg-border md:grid-cols-2">
            {visible.map((program) => <article key={programKey(program)} className="bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{alignmentLabel(program)}</p>
              <h4 className="mt-2 font-display text-2xl leading-tight">{program.officialSchoolName || program.schoolName}</h4>
              {program.districtName && <p className="mt-2 text-sm font-medium">{program.districtName}</p>}
              <p className="mt-1 text-sm text-muted-foreground">{placeLabel(program)}</p>
              <label className="mt-4 flex min-h-10 cursor-pointer items-center gap-2 border-y border-border py-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={selectedKeys.includes(programKey(program))}
                  disabled={!selectedKeys.includes(programKey(program)) && selectedKeys.length >= 3}
                  onChange={() => toggleCompare(program)}
                />
                Compare this program
              </label>
              <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-sm">
                <div><dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">UIL district</dt><dd className="mt-1 font-semibold">{program.district}</dd></div>
                <div><dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Format</dt><dd className="mt-1 font-semibold">{program.footballType}</dd></div>
              </dl>
              {program.allTimeHistory && <AllTimeHistory history={program.allTimeHistory} />}
              {program.recentHistory && <RecentFinals history={program.recentHistory} />}
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                <a href={program.profilePath} className="text-sm font-semibold text-primary underline underline-offset-4">Open full program profile →</a>
                <a href={program.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-xs font-semibold text-primary underline underline-offset-4">Official UIL alignment ↗</a>
              </div>
            </article>)}
          </div>
          {matchedTotal > visible.length && <p className="mt-4 text-sm text-muted-foreground">Showing the first {visible.length} programs. Use a school or ISD name to narrow the list.</p>}
        </div>}

        {!loading && !directoryAvailable && <p className="mt-5 border border-border p-4 text-sm leading-6 text-muted-foreground">The UIL school lookup is still available, but TEA’s school-directory service could not be reached, so ISD and county enrichment may be temporarily unavailable.</p>}
        {!loading && !historyAvailable && <p className="mt-5 border border-border p-4 text-sm leading-6 text-muted-foreground">Current UIL alignment results are available, but UIL’s state-archive pages could not be reached, so recent state-final history is temporarily omitted.</p>}
        {!loading && !allTimeHistoryAvailable && <p className="mt-5 border border-border p-4 text-sm leading-6 text-muted-foreground">Current UIL alignment and recent state-final results are still available, but UIL’s all-time appearances table could not be reached, so all-time title and state-final totals are temporarily omitted.</p>}

        <div className="mt-6 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
          <p><strong className="text-foreground">What this tells you:</strong> current 2026–28 UIL classification, football division, district and six-man/11-man format. School, ISD, city and county context comes from Texas Education Agency AskTED when available.</p>
          <p className="mt-2"><strong className="text-foreground">All-time state-final history:</strong> title and appearance totals use UIL’s Football All-Time Appearances table, supplemented with newer completed state-final rows from the official State Archives when that all-time table trails the latest archive. Totals appear only on an exact normalized UIL school-name match.</p>
          <p className="mt-2"><strong className="text-foreground">Recent state-final detail:</strong> the game-level list covers the eight completed UIL championship seasons from 2018–19 through 2025–26. No history badge does not mean a weak program; it means the source did not produce an exact normalized school-name match.</p>
          <p className="mt-2">This is not a “best school” rating. Football placement and recent championship history are only parts of researching a program. Attendance zones, transfers, eligibility and campus assignments can change, so confirm an exact address and student eligibility with the school district and UIL before making a move.</p>
        </div>
      </div>
    </div>
  </section>;
}

function ProgramComparison({ programs, onClear }: { programs: FootballProgram[]; onClear: () => void }) {
  const rows = [
    ['ISD', (program: FootballProgram) => program.districtName || 'Not matched'],
    ['Location', (program: FootballProgram) => placeLabel(program)],
    ['UIL level', (program: FootballProgram) => alignmentLabel(program).replace(' · UIL 2026–28', '')],
    ['UIL district', (program: FootballProgram) => String(program.district)],
    ['Format', (program: FootballProgram) => program.footballType],
    ['All-time titles', (program: FootballProgram) => program.allTimeHistory ? String(program.allTimeHistory.stateTitles) : 'No exact all-time match'],
    ['All-time state finals', (program: FootballProgram) => program.allTimeHistory ? String(program.allTimeHistory.stateFinalAppearances) : 'No exact all-time match'],
    ['Recent titles', (program: FootballProgram) => program.recentHistory ? String(program.recentHistory.stateTitles) : 'No exact recent-final match'],
    ['Recent state finals', (program: FootballProgram) => program.recentHistory ? String(program.recentHistory.stateFinalAppearances) : 'No exact recent-final match'],
    ['Latest state final', (program: FootballProgram) => program.recentHistory?.mostRecentFinalSeason ? shortSeason(program.recentHistory.mostRecentFinalSeason) : '—'],
  ] as const;

  return <section className="mb-6 border border-border" aria-labelledby="football-program-comparison">
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
      <div>
        <p className="eyebrow text-primary">Side-by-side research</p>
        <h4 id="football-program-comparison" className="mt-1 font-display text-2xl">Compare football programs</h4>
        <p className="mt-2 max-w-3xl text-xs leading-5 text-muted-foreground">Select up to three programs. This compares sourced football context; it does not rank academics, roster opportunity, coaching quality or overall student fit.</p>
      </div>
      <button type="button" onClick={onClear} className="text-xs font-semibold text-primary underline underline-offset-4">Clear comparison</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="p-3 text-xs uppercase tracking-[0.1em] text-muted-foreground">Measure</th>
            {programs.map((program) => <th key={programKey(program)} className="p-3 font-display text-lg">{program.officialSchoolName || program.schoolName}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, getValue]) => <tr key={label} className="border-b border-border last:border-b-0">
            <th scope="row" className="p-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{label}</th>
            {programs.map((program) => <td key={programKey(program)} className="p-3 align-top">{getValue(program)}</td>)}
          </tr>)}
        </tbody>
      </table>
    </div>
    {programs.length < 2 && <p className="border-t border-border p-3 text-xs text-muted-foreground">Select one more program to make the comparison useful.</p>}
    {programs.length === 3 && <p className="border-t border-border p-3 text-xs text-muted-foreground">Three-program comparison limit reached. Uncheck one program to choose a different school.</p>}
  </section>;
}

function AllTimeHistory({ history }: { history: NonNullable<FootballProgram['allTimeHistory']> }) {
  return <div className="mt-4 border-t border-border pt-4">
    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary">All-time UIL state-final history</p>
    <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
      <div><dt className="text-xs text-muted-foreground">State titles</dt><dd className="mt-1 font-display text-2xl">{history.stateTitles}</dd></div>
      <div><dt className="text-xs text-muted-foreground">State finals</dt><dd className="mt-1 font-display text-2xl">{history.stateFinalAppearances}</dd></div>
    </dl>
    {history.supplementedFinals.length > 0
      ? <p className="mt-3 text-xs leading-5 text-muted-foreground">UIL’s all-time table currently runs through {history.publishedThroughYear}; {history.supplementedFinals.length} newer completed {history.supplementedFinals.length === 1 ? 'final is' : 'finals are'} added from the official state archive.</p>
      : <p className="mt-3 text-xs leading-5 text-muted-foreground">From UIL’s published all-time appearances table, with the latest full year detected as {history.publishedThroughYear}.</p>}
    <a href={history.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block text-xs font-semibold text-primary underline underline-offset-4">UIL all-time appearances ↗</a>
  </div>;
}

function RecentFinals({ history }: { history: NonNullable<FootballProgram['recentHistory']> }) {
  const latest = history.mostRecentTitleSeason
    ? `Title ${shortSeason(history.mostRecentTitleSeason)}`
    : history.mostRecentFinalSeason
      ? `Final ${shortSeason(history.mostRecentFinalSeason)}`
      : '—';

  return <div className="mt-4 border-t border-border pt-4">
    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary">Recent UIL state-final history · 2018–19 to 2025–26</p>
    <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
      <div><dt className="text-xs text-muted-foreground">Titles</dt><dd className="mt-1 font-display text-2xl">{history.stateTitles}</dd></div>
      <div><dt className="text-xs text-muted-foreground">State finals</dt><dd className="mt-1 font-display text-2xl">{history.stateFinalAppearances}</dd></div>
      <div><dt className="text-xs text-muted-foreground">Latest</dt><dd className="mt-1 font-semibold">{latest}</dd></div>
    </dl>
    <div className="mt-3 space-y-1">
      {history.finals.slice(0, 3).map((final) => <p key={`${final.season}-${final.conference}-${final.result}`} className="text-xs leading-5 text-muted-foreground">
        {shortSeason(final.season)} · {final.result} · {final.conference} · vs. {final.opponent}
      </p>)}
    </div>
    <a href={history.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block text-xs font-semibold text-primary underline underline-offset-4">UIL state archives ↗</a>
  </div>;
}

function shortSeason(season: string) {
  const [start, end] = season.split('-');
  return start && end ? `${start.slice(-2)}–${end.slice(-2)}` : season;
}

function alignmentLabel(program: FootballProgram) {
  const division = program.division ? ` · Division ${program.division === 1 ? 'I' : 'II'}` : '';
  return `${program.classification}${division} · UIL 2026–28`;
}

function placeLabel(program: FootballProgram) {
  const values = [program.city, program.countyName].filter(Boolean);
  return values.length ? values.join(' · ') : 'Texas';
}

function programKey(program: FootballProgram) {
  return `${program.classification}-${program.division ?? 'x'}-${program.district}-${program.schoolName}`;
}
