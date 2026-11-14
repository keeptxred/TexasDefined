import {
  DISTRICT_21_2026_GAMES,
  DISTRICT_21_FBISD_CALENDAR_URL,
  DISTRICT_21_OVERALL_OCT14,
  DISTRICT_21_STANDINGS_AS_OF,
  DISTRICT_21_STANDINGS_URL,
  DISTRICT_21_STRAKE_SCHEDULE_URL,
  DISTRICT_21_VERIFIED_AT,
} from '@/data/high-school-football/football-district21-2026';

const DISTRICT_21_PROFILE_SLUGS: Readonly<Record<string, string>> = {
  'Fort Bend Austin': 'fort-bend-austin',
  'Fort Bend Bush': 'fort-bend-bush',
  'Fort Bend Clements': 'fort-bend-clements',
  'Fort Bend Elkins': 'fort-bend-elkins',
  'Fort Bend Hightower': 'fort-bend-hightower',
  'Fort Bend Ridge Point': 'fort-bend-ridge-point',
  'Fort Bend Travis': 'fort-bend-travis',
  'Houston Strake Jesuit': 'houston-strake-jesuit',
};

export function hasDistrict21TeamScorecard(schoolName: string) {
  return Object.prototype.hasOwnProperty.call(DISTRICT_21_PROFILE_SLUGS, schoolName);
}

function dateLabel(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric',
  }).format(new Date(iso + 'T12:00:00Z'));
}

/**
 * Same 2026 league facts as the district hub, independently filtered for each
 * UIL member program. No invented full-season records, automated final scores,
 * playoff qualification, campus-specific stadiums, or merchandise licensing.
 */
export function District21TeamSeason({ schoolName }: { schoolName: string }) {
  if (!hasDistrict21TeamScorecard(schoolName)) return null;
  const games = DISTRICT_21_2026_GAMES.filter(
    (game) => game.home === schoolName || game.away === schoolName,
  );
  const finals = games.filter((game) =>
    game.status === 'final' && Number.isInteger(game.homeScore) && Number.isInteger(game.awayScore),
  );
  const wins = finals.filter((game) => {
    const scored = game.home === schoolName ? game.homeScore! : game.awayScore!;
    const allowed = game.home === schoolName ? game.awayScore! : game.homeScore!;
    return scored > allowed;
  }).length;
  const losses = finals.length - wins;
  const remaining = games.filter((game) => game.status !== 'final');
  return (
    <section
      id="football-current-season"
      data-football-d21-team-section={DISTRICT_21_PROFILE_SLUGS[schoolName]}
      className="scroll-mt-24 border-b border-border py-9"
      aria-labelledby="district-21-team-season-title"
    >
      <p className="eyebrow text-primary">2026 Region III • UIL District 21</p>
      <h2 id="district-21-team-season-title" className="mt-2 font-display text-3xl sm:text-4xl">{schoolName}: district scores and remaining games</h2>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
        <strong className="text-foreground">{wins}–{losses} in district play</strong> through {dateLabel(finals.at(-1)?.date ?? '2026-10-10')}.
        {' '}The {finals.length} reported finals and {remaining.length} remaining fixtures below are sourced from the same 2026 league ledger as the
        {' '}<a className="text-primary underline underline-offset-4" href="/texas-high-school-football-districts/6a-district-21#district-21-standings">District 21 standings and playoff picture</a>.
        {' '}This is not a live feed or a UIL-certified tie-break ranking.
      </p>
      <dl className="mt-5 grid gap-px border border-border bg-border sm:grid-cols-3">
        <div className="bg-background p-4">
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">District record (reported)</dt>
          <dd className="mt-2 text-2xl font-semibold tabular-nums">{wins}–{losses}</dd>
        </div>
        <div className="bg-background p-4">
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">Overall record (snapshot*)</dt>
          <dd className="mt-2 text-2xl font-semibold tabular-nums">{DISTRICT_21_OVERALL_OCT14[schoolName] ?? 'Unverified'}</dd>
        </div>
        <div className="bg-background p-4">
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">Published games accounted for</dt>
          <dd className="mt-2 text-2xl font-semibold tabular-nums">{finals.length} of {games.length} district games</dd>
        </div>
      </dl>
      <div role="region" tabIndex={0} aria-label="Scrollable source-checked District 21 football games" className="mt-6 overflow-x-auto border-y border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
        <table className="w-full min-w-[38rem] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th scope="col" className="px-3 py-3">Date</th>
              <th scope="col" className="px-3 py-3">Opponent</th>
              <th scope="col" className="px-3 py-3">Site</th>
              <th scope="col" className="px-3 py-3">Result / status</th>
              <th scope="col" className="px-3 py-3">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {games.map((game) => {
              const atHome = game.home === schoolName;
              const opponent = atHome ? game.away : game.home;
              const reportedFinal = game.status === 'final' && Number.isInteger(game.awayScore) && Number.isInteger(game.homeScore);
              const scored = atHome ? game.homeScore : game.awayScore;
              const conceded = atHome ? game.awayScore : game.homeScore;
              const source = reportedFinal ? game.resultSourceUrl ?? game.sourceUrl : game.sourceUrl;
              return <tr key={game.date + game.home + game.away}>
                <td className="px-3 py-3 whitespace-nowrap">{dateLabel(game.date)}</td>
                <td className="px-3 py-3 font-semibold">
                  <a href={`/texas-high-school-football-teams/${DISTRICT_21_PROFILE_SLUGS[opponent]}`} className="hover:text-primary hover:underline">{opponent}</a>
                </td>
                <td className="px-3 py-3 text-muted-foreground">{atHome ? 'Home' : 'Away'}{game.venue ? ` · ${game.venue}` : ''}</td>
                <td className="px-3 py-3 whitespace-nowrap tabular-nums">
                  {reportedFinal ? `${scored! > conceded! ? 'W' : 'L'} ${scored}–${conceded}` : 'Result not verified'} 
                  {!reportedFinal && game.kickoff && <span className="block text-xs text-muted-foreground">Listed {game.kickoff}</span>}
                </td>
                <td className="px-3 py-3">
                  <a href={source} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">{game.sourceLabel} ↗</a>
                </td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-6 text-muted-foreground">
        Source verification: {DISTRICT_21_VERIFIED_AT}. *Overall W–L is the
        {' '}<a href={DISTRICT_21_STANDINGS_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">MaxPreps {DISTRICT_21_STANDINGS_AS_OF} snapshot ↗</a>,
        separate from the reported league-only record. Final scores are source-dated; future listed games may await confirmation.
        Check{' '}<a href={schoolName === 'Houston Strake Jesuit' ? DISTRICT_21_STRAKE_SCHEDULE_URL : DISTRICT_21_FBISD_CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">official host athletics schedules ↗</a>
        {' '}for changes to kickoffs, facilities, tickets, or spectator policies. The school's address is not necessarily the stadium entrance.
      </p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        <a href="/texas-high-school-football-districts/6a-district-21#district-21-results" className="text-primary underline underline-offset-4">All District 21 scores and fixtures →</a>
        <a href="/texas-high-school-football-playoff-brackets" className="text-primary underline underline-offset-4">2026 playoff brackets →</a>
      </div>
    </section>
  );
}
