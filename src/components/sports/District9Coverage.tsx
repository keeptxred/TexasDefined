import {
  district9DisplayName,
  DISTRICT9_GISD_CALENDAR_URL,
  DISTRICT9_GISD_TICKETS_URL,
  DISTRICT9_RECENT_FINALS,
  DISTRICT9_REMAINING_FIXTURES,
  DISTRICT9_STANDINGS,
  DISTRICT9_STANDINGS_AS_OF,
  DISTRICT9_STANDINGS_URL,
  DISTRICT9_VERIFIED_AT,
  DISTRICT9_WEEK9_RESULTS_URL,
  DISTRICT9_WYLIE_CALENDAR_URL,
  DISTRICT9_WYLIE_TICKETS_URL,
} from '@/data/high-school-football/football-district9-2026';

type School = { schoolName: string; profilePath: string };
type Props = { schools: School[] };

const displayDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
    .format(new Date(date + 'T12:00:00Z'));

export function District9Coverage({ schools }: Props) {
  const schoolLink = (uilName: string) => {
    const label = district9DisplayName(uilName);
    const school = schools.find((candidate) => candidate.schoolName === uilName);
    return school
      ? <a className="font-medium text-foreground hover:text-primary hover:underline" href={school.profilePath}>{label}</a>
      : <span className="font-medium text-foreground">{label}</span>;
  };

  return (
    <section id="district-9-results" data-football-district-section="district-9-2026"
      className="border-b border-border py-10">
      <p className="eyebrow text-primary">2026 varsity · Region II · Garland and Wylie</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl">District 9 football standings, recent scores and remaining schedule</h2>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
        The eight-team District 9 race includes six Garland ISD programs and Wylie and Wylie East.
        This independently maintained snapshot combines MaxPreps reported records, separately verified
        Week 9 final scores and the remaining school-published varsity fixtures. It is not live,
        UIL-certified or a source of official playoff seeds.
      </p>

      <div id="district-9-standings" data-football-district-records="reported-standings-snapshot"
        className="mt-8 border border-border p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl">2026 reported District 9 records</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              MaxPreps reported snapshot, {DISTRICT9_STANDINGS_AS_OF}. All eight teams had played five district games.
              Teams sharing a record are not placed in an official tiebreak order.
            </p>
          </div>
          <a href={DISTRICT9_STANDINGS_URL} target="_blank" rel="noopener noreferrer"
            className="text-sm font-semibold text-primary underline underline-offset-4">
            Check current standings ↗
          </a>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="py-2">School (grouped by reported record)</th>
                <th scope="col" className="px-2 py-2 text-right">District W–L</th>
                <th scope="col" className="px-2 py-2 text-right">PF</th>
                <th scope="col" className="px-2 py-2 text-right">PA</th>
                <th scope="col" className="py-2 text-right">Overall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {DISTRICT9_STANDINGS.map((row) => <tr key={row.uilName}>
                <th scope="row" className="py-3">{schoolLink(row.uilName)}</th>
                <td className="px-2 py-3 text-right tabular-nums">{row.won}–{row.lost}</td>
                <td className="px-2 py-3 text-right tabular-nums">{row.pf}</td>
                <td className="px-2 py-3 text-right tabular-nums">{row.pa}</td>
                <td className="py-2 text-right tabular-nums">{row.overall}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          District W–L, PF/PA and overall W–L are reported by MaxPreps as of {DISTRICT9_STANDINGS_AS_OF}.
          These are not certified UIL standings, verified tiebreaks or playoff seedings.
          For new scores, use the source link rather than assuming this dated table updates itself.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="border-b border-border pb-3 font-display text-2xl">Latest verified league finals · Oct. 22–23</h3>
          <div className="divide-y divide-border">
            {DISTRICT9_RECENT_FINALS.map((game) => (
              <div key={game.date + game.home} data-district9-result="final" className="py-4 text-sm">
                <p className="mb-2 text-xs text-muted-foreground">{displayDate(game.date)} · Reported final</p>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span>{schoolLink(game.away)} at {schoolLink(game.home)}</span>
                  <strong className="shrink-0 tabular-nums">{game.awayScore}–{game.homeScore}</strong>
                </div>
                <a href={DISTRICT9_WEEK9_RESULTS_URL} target="_blank" rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-semibold text-primary underline underline-offset-4">Pigskin Prep reported score ↗</a>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            These four individually sourced Week 9 finals are not the complete season scorebook.
            Earlier reported district games contribute to the separately attributed standings snapshot.
          </p>
        </div>
        <div>
          <h3 className="border-b border-border pb-3 font-display text-2xl">Last two rounds · published varsity fixtures</h3>
          <div className="divide-y divide-border">
            {DISTRICT9_REMAINING_FIXTURES.map((game) => (
              <div key={game.date + game.home} data-district9-result="scheduled" className="py-4 text-sm">
                <p className="mb-2 text-xs text-muted-foreground">{displayDate(game.date)} · {game.kickoff}</p>
                <p>{schoolLink(game.away)} at {schoolLink(game.home)}</p>
                <p className="mt-1 text-xs text-muted-foreground">{game.venue}</p>
                <a href={game.sourceUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-semibold text-primary underline underline-offset-4">Published fixture source ↗</a>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            Schedule snapshot verified {DISTRICT9_VERIFIED_AT}; entries do not automatically turn into final scores
            after kickoff. Stadium assignments and times may change. Check varsity listings, not JV or freshman games.
          </p>
        </div>
      </div>

      <aside className="mt-8 border-l-2 border-primary bg-surface p-5 text-sm leading-7">
        <h3 className="font-display text-2xl text-foreground">District 9 playoff race</h3>
        <p className="mt-2">
          As of October 27, Sachse and Wylie East were both 5–0 in league play ahead of their
          October 29 meeting; Rowlett and Wylie were both 3–2 before their October 30 game.
          The District 9 title and playoff picture depend on games still to be played, not
          simply a sorted snapshot table. For current clinch and tiebreak outcomes, consult the UIL
          and schools rather than inferring a seed from these reported records.
        </p>
        <p className="mt-2">
          Four teams ultimately qualify. Only after qualification are the two larger-enrollment
          qualifiers assigned to Division I and the two smaller to Division II.
        </p>
      </aside>

      <div id="district-9-game-day" className="mt-10">
        <h3 className="font-display text-2xl">District 9 varsity schedules, tickets and stadiums</h3>
        <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">
          Garland ISD uses Williams Stadium and Homer B. Johnson Stadium. Wylie ISD games use
          Wylie ISD FB Stadium. The school's own address is not a guarantee of game location.
          Confirm tickets, stadium, spectator entrance and kickoff with the hosting district.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Garland ISD athletic calendar', href: DISTRICT9_GISD_CALENDAR_URL, note: 'Select the date and verify the event is varsity; calendar also includes junior varsity' },
            { label: 'Garland ISD official ticket policy', href: DISTRICT9_GISD_TICKETS_URL, note: 'HomeTown ticket instructions and rules for Williams / HBJ stadiums' },
            { label: 'Wylie ISD varsity athletics calendar', href: DISTRICT9_WYLIE_CALENDAR_URL, note: 'Wylie and Wylie East game time, date and venue' },
            { label: 'Wylie ISD official online tickets', href: DISTRICT9_WYLIE_TICKETS_URL, note: 'Wylie, Texas Pirates/Raiders district — not Abilene Wylie Bulldogs' },
          ].map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
            className="border border-border p-4 hover:border-primary">
            <strong className="text-sm text-primary underline underline-offset-4">{link.label} ↗</strong>
            <span className="mt-2 block text-xs leading-6 text-muted-foreground">{link.note}</span>
          </a>)}
        </div>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          Records, results and fixture references checked {DISTRICT9_VERIFIED_AT}. This editorial
          snapshot is not an authorized automatic MaxPreps data feed; official school calendars
          and the linked score source take precedence if a game changes.
        </p>
      </div>
    </section>
  );
}
