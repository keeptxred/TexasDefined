import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

type FootballProgram = {
  schoolName: string;
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
};

type LookupResponse = {
  ok: boolean;
  programs?: FootballProgram[];
  matchedTotal?: number;
  directoryAvailable?: boolean;
  historyAvailable?: boolean;
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
  const [loading, setLoading] = useState(Boolean(countyName));
  const [error, setError] = useState('');

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
          <div className="grid gap-px bg-border md:grid-cols-2">
            {visible.map((program) => <article key={programKey(program)} className="bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{alignmentLabel(program)}</p>
              <h4 className="mt-2 font-display text-2xl leading-tight">{program.officialSchoolName || program.schoolName}</h4>
              {program.districtName && <p className="mt-2 text-sm font-medium">{program.districtName}</p>}
              <p className="mt-1 text-sm text-muted-foreground">{placeLabel(program)}</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-border pt-4 text-sm">
                <div><dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">UIL district</dt><dd className="mt-1 font-semibold">{program.district}</dd></div>
                <div><dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Format</dt><dd className="mt-1 font-semibold">{program.footballType}</dd></div>
              </dl>
              {program.recentHistory && <RecentFinals history={program.recentHistory} />}
              <a href={program.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-xs font-semibold text-primary underline underline-offset-4">Official UIL alignment ↗</a>
            </article>)}
          </div>
          {matchedTotal > visible.length && <p className="mt-4 text-sm text-muted-foreground">Showing the first {visible.length} programs. Use a school or ISD name to narrow the list.</p>}
        </div>}

        {!loading && !directoryAvailable && <p className="mt-5 border border-border p-4 text-sm leading-6 text-muted-foreground">The UIL school lookup is still available, but TEA’s school-directory service could not be reached, so ISD and county enrichment may be temporarily unavailable.</p>}
        {!loading && !historyAvailable && <p className="mt-5 border border-border p-4 text-sm leading-6 text-muted-foreground">Current UIL alignment results are available, but UIL’s state-archive pages could not be reached, so recent state-final history is temporarily omitted.</p>}

        <div className="mt-6 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
          <p><strong className="text-foreground">What this tells you:</strong> current 2026–28 UIL classification, football division, district and six-man/11-man format. School, ISD, city and county context comes from Texas Education Agency AskTED when available.</p>
          <p className="mt-2"><strong className="text-foreground">Recent state-final history:</strong> title and runner-up counts cover the eight completed UIL championship seasons from 2018–19 through 2025–26 and appear only on an exact normalized UIL school-name match. No badge does not mean a weak program and is not an all-time-history claim.</p>
          <p className="mt-2">This is not a “best school” rating. Football placement and recent championship history are only parts of researching a program. Attendance zones, transfers, eligibility and campus assignments can change, so confirm an exact address and student eligibility with the school district and UIL before making a move.</p>
        </div>
      </div>
    </div>
  </section>;
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
