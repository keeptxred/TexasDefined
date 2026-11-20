import {
  DISTRICT_16_BERRY_CALENDAR_URL,
  DISTRICT_16_CFISD_SCHEDULE_URL,
  DISTRICT_16_CFISD_TICKETS_URL,
  DISTRICT_16_NEXT_GAMES,
  DISTRICT_16_RECENT_FINALS,
  DISTRICT_16_STANDINGS,
  DISTRICT_16_STANDINGS_AS_OF,
  DISTRICT_16_STANDINGS_URL,
  DISTRICT_16_VERIFIED_AT,
} from '@/data/high-school-football/football-district16-2026';

type School = { schoolName: string; profilePath: string };
type Props = { schools: School[] };

const formattedDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
    .format(new Date(iso + 'T12:00:00Z'));

export function District16Coverage({ schools }: Props) {
  const texasParts = new Intl.DateTimeFormat('en-US', {timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const part = (type: 'year' | 'month' | 'day') => texasParts.find(x=>x.type===type)?.value ?? '';
  const todayTexas = `${part('year')}-${part('month')}-${part('day')}`;
  const overdueCount = DISTRICT_16_NEXT_GAMES.filter(game => game.date < todayTexas).length;
  const teamHref = (match: string) => schools.find((school) =>
    school.schoolName.toLowerCase().includes(match.toLowerCase())
    || (match === 'Cy-Fair' && school.schoolName.toLowerCase().includes('cypress fairbanks'))
  )?.profilePath;

  const schoolLink = (name: string) => {
    const href = teamHref(name);
    return href
      ? <a href={href} className="font-medium text-foreground hover:text-primary hover:underline">{name}</a>
      : <span className="font-medium text-foreground">{name}</span>;
  };

  return (
    <section id="district-16-results" data-football-district-section="district-16-2026"
      className="border-b border-border py-10">
      <p className="eyebrow text-primary">Region II · Cypress-Fairbanks ISD · 2026 varsity</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl">District 16 archived scores, dated standings and fixtures</h2>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
        All eight District 16-6A teams are from Cypress-Fairbanks ISD. These are source-dated
        2026 results and published fixtures from an October source snapshot, not current standings or a continuously updated scoreboard.
        The standings snapshot includes the first four district games for each school;
        the finals listed below are the latest independently checked round, not every game played.
      </p>

      <section className="mt-7 border-y border-border py-5" data-football-district16-postseason-verified>
        <h3 className="font-display text-2xl">Final 2026 district title and playoff qualifiers — verified Nov. 12</h3>
        <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">
          Cypress-Fairbanks ISD confirmed the conclusion of District 16 regular-season play and reported
          Cypress Falls, Cypress Lakes and Langham Creek as shared champions, each with a 6–1 district
          record. Cypress Woods finished fourth at 4–3 and joined those three programs in the playoff field.
          This official school-district update supersedes the October 18 table below for title and qualification
          information, but does not establish an unreported head-to-head seed order.
        </p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            {name:'Cypress Falls',record:'6–1',detail:'Shared district champion'},
            {name:'Cypress Lakes',record:'6–1',detail:'Shared district champion · first school district title'},
            {name:'Langham Creek',record:'6–1',detail:'Shared district champion · first playoff berth since 2018'},
            {name:'Cypress Woods',record:'4–3',detail:'Fourth-place playoff qualifier'},
          ].map(team=><div key={team.name} className="border border-border p-3">
            <dt className="font-semibold">{schoolLink(team.name)}</dt>
            <dd className="mt-1 text-sm">District {team.record} · {team.detail}</dd>
          </div>)}
        </dl>
        <a href="https://www.cfisd.net/cfisd-news-details/~board/2026-2027-cfisd-district-news/post/six-cfisd-football-teams-qualify-for-playoffs"
          target="_blank" rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
          CFISD official November 12 season and playoff report ↗
        </a>
      </section>

      <div id="district-16-standings" className="mt-8 border border-border p-4 sm:p-6"
        data-football-district-records="reported-standings-snapshot">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl">Archived 2026 district standings — October 18</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              MaxPreps snapshot: {DISTRICT_16_STANDINGS_AS_OF}. Reported records, not official UIL tie-break rankings.
            </p>
          </div>
          <a href={DISTRICT_16_STANDINGS_URL} target="_blank" rel="noopener noreferrer"
            className="text-sm font-semibold text-primary underline underline-offset-4">Check current standings ↗</a>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="py-2">Team (grouped by reported record)</th>
                <th scope="col" className="px-2 py-2 text-right">District W–L</th>
                <th scope="col" className="px-2 py-2 text-right">PF</th>
                <th scope="col" className="px-2 py-2 text-right">PA</th>
                <th scope="col" className="py-2 text-right">Overall*</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {DISTRICT_16_STANDINGS.map((team) => (
                <tr key={team.name}>
                  <th scope="row" className="py-3">{schoolLink(team.name)}</th>
                  <td className="px-2 py-3 text-right tabular-nums">{team.won}–{team.lost}</td>
                  <td className="px-2 py-3 text-right tabular-nums">{team.pf}</td>
                  <td className="px-2 py-3 text-right tabular-nums">{team.pa}</td>
                  <td className="py-3 text-right tabular-nums">{team.overall}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          *Overall and district records are third-party reporting as of {DISTRICT_16_STANDINGS_AS_OF}, not live data.
          Tied W–L records are not a published head-to-head tiebreak decision. Verify any later
          scores and final postseason qualification with the district and UIL.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="border-b border-border pb-3 font-display text-2xl">Latest verified district finals</h3>
          <div className="divide-y divide-border">
            {DISTRICT_16_RECENT_FINALS.map((game) => (
              <div key={game.date + game.home} data-district16-result="final" className="py-4 text-sm">
                <p className="mb-2 text-xs text-muted-foreground">{formattedDate(game.date)} · Final</p>
                <div className="flex justify-between gap-3"><span>{schoolLink(game.away)} at {schoolLink(game.home)}</span>
                  <strong className="shrink-0 tabular-nums">{game.awayScore}–{game.homeScore}</strong></div>
                <a href={game.sourceUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-primary underline underline-offset-4">Reported final / source ↗</a>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            Four individually verified Week 8 finals only. Earlier games contribute to the separately reported standings snapshot,
            but are not being presented here as individually verified scores.
          </p>
        </div>
        <div>
          <h3 className="border-b border-border pb-3 font-display text-2xl">October 20 schedule archive · Oct. 22–Nov. 7</h3>
          <div className="divide-y divide-border">
            {DISTRICT_16_NEXT_GAMES.map((game) => (
              <div key={game.date + game.home} data-district16-result="scheduled" className="py-4 text-sm">
                <p className="mb-2 text-xs text-muted-foreground">{formattedDate(game.date)} · {game.date < todayTexas ? 'Past fixture — final not verified in this archive' : game.kickoff}</p>
                <p>{schoolLink(game.away)} at {schoolLink(game.home)}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            These were twelve future fixtures when this schedule was published October 20. {overdueCount} now ha{overdueCount === 1 ? 's' : 've'} passed without a verified final in this archive; do not treat them as upcoming or use the October 18 standings as current.
            One November 7 kickoff is unconfirmed; dates, times and stadium assignments can change.
            See <a href={DISTRICT_16_CFISD_SCHEDULE_URL} target="_blank" rel="noopener noreferrer"
              className="text-primary underline underline-offset-4">CFISD's complete official varsity calendar ↗</a> for the rest.
          </p>
        </div>
      </div>

      <aside className="mt-8 border-l-2 border-primary bg-surface px-5 py-5 text-sm leading-7">
        <h3 className="font-display text-2xl text-foreground">Four playoff spots; no clinched seed assumed</h3>
        <p className="mt-2">
          In the October 18 historical reporting snapshot, Langham Creek led at 4–0, followed by
          Cypress Woods, Cypress Falls and Cypress Lakes at 3–1. Those records
          illustrate the October 24 matchup context, but do not
          establish a final champion or playoff tiebreak. Those remaining-fixture statements are historical, not current.
        </p>
        <p className="mt-2">
          Four Class 6A teams qualify from each district. Of those four,
          the two larger-enrollment qualifiers enter Division I and the two smaller enter Division II;
          no team is assigned a postseason division from the October standings alone.
        </p>
      </aside>

      <div id="district-16-game-day" className="mt-10">
        <h3 className="font-display text-2xl">CFISD tickets, stadiums and game-day logistics</h3>
        <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">
          District 16 games use CFISD's varsity football facilities, including
          Cy-Fair FCU Stadium and Pridgeon Stadium. The listed home school is not necessarily
          the stadium location. Confirm the specific game, spectator side, entry gate
          and updated kickoff before leaving.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Official full varsity schedule', href: DISTRICT_16_CFISD_SCHEDULE_URL, body: '2026 matchups and stadium/date lists, including games after October 24' },
            { label: 'Official CFISD tickets', href: DISTRICT_16_CFISD_TICKETS_URL, body: 'Choose your team and game; ticket sales are through the district, not TexasDefined' },
            { label: 'Stadium events and entry notes', href: 'https://berrycenter.cfisd.net/events/cfisd-football-2026', body: 'Host/visitor entrances, parking lots, and team-specific stadium details' },
            { label: 'Directions, parking and accessibility', href: 'https://berrycenter.cfisd.net/plan-your-visit/directions-parking', body: 'Berry Center / Cy-Fair FCU Stadium information; verify Pridgeon directions separately' },
          ].map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
              className="border border-border p-4 hover:border-primary">
              <strong className="text-sm text-primary underline underline-offset-4">{link.label} ↗</strong>
              <span className="mt-2 block text-xs leading-6 text-muted-foreground">{link.body}</span>
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          <a href="https://berrycenter.cfisd.net/plan-your-visit/clear-bag-policy"
            target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Clear-bag policy ↗</a>
          {' · '}
          <a href="https://berrycenter.cfisd.net/plan-your-visit/accessibility"
            target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Accessibility details ↗</a>
          {' · '}
          <a href={DISTRICT_16_BERRY_CALENDAR_URL}
            target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Official event calendar ↗</a>
          . These are non-affiliate official links. Updated {DISTRICT_16_VERIFIED_AT}.
        </p>
      </div>
    </section>
  );
}
