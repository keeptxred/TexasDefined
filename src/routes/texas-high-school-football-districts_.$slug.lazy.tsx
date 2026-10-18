import { createLazyFileRoute, Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import { FootballFanOffers } from '@/components/sports/FootballFanOffers';
import { DISTRICT_5_SCHEDULE_URL, DISTRICT_5_STANDINGS_URL } from '@/data/high-school-football/football-district5-2026';
import { getDistrictFootballGames, getSourcedDistrictRecords, KATY_2026_SCHEDULE_SOURCE, type DistrictFootballGame } from '@/data/high-school-football/football-district-game-week';
import {
  UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE,
  uilFootballConferenceBand,
  uilFootballEnrollmentBand,
} from '@/data/high-school-football/enrollment-bands';

export const Route = createLazyFileRoute('/texas-high-school-football-districts/$slug')({ component: Page });

function Page() {
  const district = Route.useLoaderData();
  const divisionRoman = district.division ? (district.division === 1 ? 'I' : 'II') : null;
  const districtTitle = divisionRoman
    ? `District ${district.district}-${district.classification} Division ${divisionRoman} Football`
    : `District ${district.district}-${district.classification} Football`;
  const katyPilot = district.slug === '6a-district-22';
  const district5Pilot = district.slug === '6a-district-5';
  const games = getDistrictFootballGames(district.slug, district.classification, district.district);
  const recentFinals = games.filter((game) => game.status === 'final').reverse().slice(0, district5Pilot ? 16 : 8);
  const pendingGames = games.filter((game) => game.status === 'scheduled').slice(0, 16);
  const reportedDistrictRecords = (katyPilot || district5Pilot) ? getSourcedDistrictRecords(games, district.programs) : [];
  const lastReportedFinal = games.filter((game) => game.status === 'final').at(-1)?.date;
  const shortLabel = `${district.classification}${divisionRoman ? ` Division ${divisionRoman}` : ''} District ${district.district}`;
  const enrollmentBand = uilFootballEnrollmentBand(district.classification, district.division);
  const conferenceBand = uilFootballConferenceBand(district.classification);
  const reportedEnrollments = district.programs.map((program) => program.uilEnrollment);
  const enrollmentLow = Math.min(...reportedEnrollments);
  const enrollmentHigh = Math.max(...reportedEnrollments);
  const teamLine = district.programs.map((program) => program.schoolName).join(' • ');
  const formatEnrollment = (value: number) => value.toLocaleString('en-US', { maximumFractionDigits: 1 });

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-6xl" data-football-district-hub="v2">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span className="mx-2">/</span>
        <Link to="/sports">Texas Sports</Link><span className="mx-2">/</span>
        <a href="/texas-high-school-football-districts">Football districts</a><span className="mx-2">/</span>
        <span aria-current="page">{shortLabel}</span>
      </nav>

      <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <p className="eyebrow text-primary">2026–28 UIL football alignment</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{katyPilot ? `Katy ISD ${districtTitle}` : districtTitle}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-foreground">{teamLine}</p>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">2026–28 UIL member schools, sourced 2026 game coverage where available, score-verification guidance and playoff context. No certified standings, fabricated scores or projected playoff seeds.</p>
        </div>
        <dl className="border-y border-border py-3 text-sm lg:border-y-0 lg:border-l lg:pl-6" aria-label="District summary">
          <Fact label="Teams" value={String(district.programCount)} />
          <Fact label="Classification" value={district.classification} />
          <Fact label="Division" value={divisionRoman ? `Division ${divisionRoman}` : '6A postseason split'} />
          <Fact label="UIL district" value={String(district.district)} />
          <Fact label="Format" value={district.footballType} />
        </dl>
      </header>


      {(katyPilot || district5Pilot || games.length > 0) && <section data-football-district-section="coverage" className="border-b border-border py-10">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">2026 varsity football</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">{katyPilot ? 'Katy ISD district game week' : district5Pilot ? '2026 District 5 game results & schedule' : 'Source-checked district games'}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
              Source-dated reported finals and published fixtures, not live scores or certified district standings.
              Scores appear only after a named reporting source confirms a final. {district5Pilot && ' District 5 coverage is a dated October 17 snapshot, not an automatically refreshing scoreboard.'}
            </p>
          </div>
          {katyPilot && <a className="text-sm font-semibold text-primary underline underline-offset-4" href={KATY_2026_SCHEDULE_SOURCE} target="_blank" rel="noopener noreferrer">Katy ISD 2026 schedule (PDF mirror) ↗</a>}
        </div>
        {(katyPilot || district5Pilot) && <div className="mb-8 border border-border p-5" data-football-district-records="source-derived">
          <h3 className="font-display text-2xl">District records from reported games</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Source-derived district W–L counts only; not UIL-certified standings, tie-break rankings or playoff qualification.
            {lastReportedFinal && <> Latest reported result: {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(lastReportedFinal + 'T12:00:00Z'))}.</>}
            {' '}Results reported after this date may not be included.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border text-xs text-muted-foreground">
                <tr><th scope="col" className="py-2">Team (alphabetical)</th><th scope="col" className="px-3 py-2 text-right">District W</th><th scope="col" className="px-3 py-2 text-right">District L</th><th scope="col" className="py-2 text-right">Played</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {reportedDistrictRecords.map((record) => <tr key={record.profilePath}>
                  <th scope="row" className="py-2 font-medium"><a href={record.profilePath} className="hover:text-primary hover:underline">{record.schoolName}</a></th>
                  <td className="px-3 py-2 text-right tabular-nums">{record.won}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{record.lost}</td>
                  <td className="py-2 text-right tabular-nums">{record.won + record.lost + record.tied}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            {district5Pilot ? <>Calculated from the 16 reported District 5 finals through October 16, using
              {' '}<a href={DISTRICT_5_SCHEDULE_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Pigskin Prep</a> and
              {' '}<a href={DISTRICT_5_STANDINGS_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">MaxPreps</a> source snapshots.</>
              : <>Calculated solely from completed matchups documented below and earlier published results from
              {' '}<a href="https://www.texastng.com/districts/d22-6a" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Tradition Never Graduates</a>.</>}
            {' '}Do not use these partial data for official UIL seeds or district tie-breakers.
          </p>
        </div>}
        {district5Pilot && <aside data-football-district-section="district-5-context" className="mb-8 border-l-2 border-primary bg-surface px-5 py-5 text-sm leading-7">
          <h3 className="font-display text-2xl text-foreground">District 5: the 2026 race</h3>
          <p className="mt-2">After the October 16 games, the sourced district results show four wins for Lewisville. Denton Braswell, Denton Guyer, Lewisville Flower Mound and Lewisville Hebron have three wins and one loss each. These are game-derived counts, not UIL-certified rankings.</p>
          <p className="mt-2">The October 23 round includes Guyer at Hebron, Lewisville at Flower Mound, Wakeland at Braswell and Marcus at Little Elm. All eight schools have seven district games scheduled. Four eventually qualify for the 6A playoffs; the qualifiers are divided into Division I and II by enrollment, not by a preseason district split.</p>
          <p className="mt-2">The fixture list below does not establish a game-night stadium gate, ticket vendor or parking policy. Check the host school's current athletics information before traveling.</p>
        </aside>}
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
              <h3 className="font-display text-2xl">Reported final scores</h3>
              <span className="text-xs text-muted-foreground">{recentFinals.length} sourced</span>
            </div>
            {recentFinals.length ? <div className="divide-y divide-border">
              {recentFinals.map((game) => <DistrictGameCard key={game.date + game.home + game.away} game={game} schools={district.programs} />)}
            </div> : <p className="py-5 text-sm leading-6 text-muted-foreground">No results independently verified for this district in our current snapshot. This does not mean games have not been played.</p>}
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
              <h3 className="font-display text-2xl">Scheduled / result awaiting verification</h3>
              <span className="text-xs text-muted-foreground">{pendingGames.length} listed</span>
            </div>
            {pendingGames.length ? <div className="divide-y divide-border">
              {pendingGames.map((game) => <DistrictGameCard key={game.date + game.home + game.away} game={game} schools={district.programs} />)}
            </div> : <p className="py-5 text-sm leading-6 text-muted-foreground">No independently sourced remaining fixtures in this snapshot. Consult the school or UIL scoreboard for the full schedule.</p>}
          </div>
        </div>
        <aside className="mt-8 border-l-2 border-primary bg-surface px-5 py-4 text-sm leading-7">
          <strong>Standings verification:</strong> These results are only a partial source-checked sample, so we do not assign district ranks, win–loss records, playoff spots or Division I/II seeds. Confirm those with the schools and UIL. Schedule dates, venues and kickoff times can change.
          <a className="ml-2 font-semibold text-primary underline underline-offset-4" href="https://www.uiltexas.org/maxpreps/" target="_blank" rel="noopener noreferrer">UIL scoreboard ↗</a>
        </aside>
        {katyPilot && <p className="mt-3 text-xs text-muted-foreground">Katy schedule source last checked October 16, 2026; the published schedule is dated March 27, 2026. Final scores carry their reporting source. Scheduled listings are not refreshed live.</p>}
        {district5Pilot && <p className="mt-3 text-xs text-muted-foreground">District 5 results and fixtures last source-checked October 17, 2026. Scores and scheduled dates are not refreshed automatically. The October 16 finals use MaxPreps; earlier league finals and upcoming kickoff times use Pigskin Prep.</p>}
      </section>}

      <FootballFanOffers slug={`district-${district.slug}`} hasUpcomingAwayTravel={false} showTravelPlanning />

      <section data-football-district-section="teams" className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">The teams</p>
          <h2 className="mt-2 font-display text-3xl">District {district.district} schools</h2>
        </div>
        <div>
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {district.programs.map((program, index) => <a key={program.profilePath} href={program.profilePath} className="group bg-background p-5 hover:bg-surface">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Team {String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{program.schoolName}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{district.classification}{divisionRoman ? ` Division ${divisionRoman}` : ''}</p>
              <p className="mt-1 text-xs text-muted-foreground">UIL reported enrollment: <strong className="text-foreground">{formatEnrollment(program.uilEnrollment)}</strong></p>
              <p className="mt-3 text-xs text-muted-foreground">Team page →</p>
            </a>)}
          </div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">Member order is alphabetical for research usability; it is not a ranking, projected finish, or statement about team quality.</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">Enrollment figures are the UIL 2026–28 realignment snapshot used for classification. They are not live campus headcounts.</p>
        </div>
      </section>

      <section data-football-district-section="game-week" className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Game week</p>
          <h2 className="mt-2 font-display text-3xl">Scores, schedules & playoff path</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Related href="/texas-high-school-football-matchups" title="Documented matchups" body="See dated games, reported final scores and verified source links." />
          <Related href="/texas-high-school-football-playoff-brackets" title="2026 postseason brackets" body="Choose from twelve UIL class/division brackets and view independently verified playoff results." />
          <Related href="https://www.uiltexas.org/maxpreps/" title="Current scores & schedules" body="Open the UIL Texas Scoreboard for the latest school-submitted scores and weekly schedules. It is not an official district-standings table." external />
          <Related href="/article/texas-high-school-football-2026-season-calendar" title="2026 season calendar" body="Track district play, playoff rounds and the December state championship dates." />
          <Related href="/article/texas-high-school-football-playoffs-explained" title="How the playoffs work" body="See how district qualification advances into bi-district, regional rounds and the state championships." />
          <Related href="/article/texas-high-school-football-scores-schedules" title="Verify scores & standings" body="Use the UIL scoreboard and school sources without turning incomplete submissions into an unofficial table." />
        </div>
      </section>

      <section data-football-district-section="alignment" className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">District format</p>
          <h2 className="mt-2 font-display text-3xl">What this alignment means</h2>
        </div>
        <div className="space-y-5 text-sm leading-7 text-muted-foreground">
          <p>These schools share a UIL football district for regular-season competition during the 2026–28 alignment cycle. District results determine playoff qualification under UIL rules.</p>
          <p><strong className="text-foreground">Enrollment band:</strong> {enrollmentBand?.label || conferenceBand}. <strong className="text-foreground">District snapshot:</strong> {formatEnrollment(enrollmentLow)}–{formatEnrollment(enrollmentHigh)}.</p>
          {district.classification === '6A'
            ? <p>6A schools are not assigned to Division I or Division II before the season. After four teams qualify, the two larger-enrollment qualifiers enter Division I and the two smaller-enrollment qualifiers enter Division II.</p>
            : <p>In {district.classification}, Division {divisionRoman} is set during realignment, so every school on this page competes in the same classification and football division before the season begins.</p>}
          <a href={UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE.url} target="_blank" rel="noreferrer noopener" className="inline-block font-semibold text-primary underline underline-offset-4">Official UIL 2026–28 enrollment cutoffs ↗</a>
        </div>
      </section>

      <section data-football-district-section="explore" className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Explore Texas football</p>
          <h2 className="mt-2 font-display text-3xl">More from TexasDefined</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Related href="/texas-high-school-football-teams" title="Find any UIL team" body="Search by school, ISD, city or county and compare programs side by side." />
          <Related href="/texas-high-school-football-districts" title="Browse all 192 districts" body="Move across every current UIL football district from 6A through 1A six-man." />
          <Related href="/article/texas-high-school-football-classifications-1a-6a" title="Understand 1A through 6A" body="See how enrollment, divisions and biennial realignment shape the statewide system." />
          <Related href="/texas-high-school-football-championship-history" title="Championship history" body="Explore UIL state titles and state-final appearances for current programs." />
          <Related href="/article/texas-high-school-football-scores-schedules" title="Follow scores & weekly schedules" body="See the best sources for confirming current results, schedules and standings." />
          <Related href="/sports/friday-night-lights" title="Friday Night Lights, Defined" body="Explore the stadiums, traditions and culture around Texas high school football." />
        </div>
      </section>

      <section data-football-district-section="official-sources" className="py-10">
        <p className="eyebrow text-primary">Official data</p>
        <h2 className="mt-2 font-display text-3xl">University Interscholastic League sources</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">TexasDefined builds this district roster from the current UIL 2026–28 football alignment and uses UIL’s 2026–28 Realignment Alphabetical Listing for the enrollment figures shown above. UIL remains the controlling source if an assignment or enrollment snapshot is corrected.</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
          <a href={district.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL alignment source ↗</a>
          <a href={district.enrollmentSourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL enrollment source ↗</a>
        </div>
      </section>
    </article>
  </Container>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0"><dt className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>;
}

function Related({ href, title, body, external = false }: { href: string; title: string; body: string; external?: boolean }) {
  return <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})} className="border-t-2 border-foreground pt-4"><h3 className="font-display text-2xl hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></a>;
}

function DistrictGameCard({ game, schools }: { game: DistrictFootballGame; schools: Array<{ schoolName: string; profilePath: string }> }) {
  const away = schools.find((school) => school.schoolName === game.away);
  const home = schools.find((school) => school.schoolName === game.home);
  const dateLabel = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric' }).format(new Date(game.date + 'T12:00:00Z'));
  const sourceUrl = game.status === 'final' && game.resultSourceUrl ? game.resultSourceUrl : game.sourceUrl;
  const isFinal = game.status === 'final' && Number.isInteger(game.awayScore) && Number.isInteger(game.homeScore);
  return <div className="py-4 text-sm" data-football-district-game={game.date} data-status={isFinal ? 'reported-final' : 'schedule-only'}>
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
      <span>{dateLabel}, 2026{game.kickoff ? ' · ' + game.kickoff : ''}</span>
      <span className={isFinal ? 'font-semibold text-foreground' : ''}>{isFinal ? 'Reported final' : 'Result not verified'}</span>
    </div>
    <div className="space-y-1 text-base font-medium">
      <div className="flex items-center justify-between gap-3">
        <span>{away ? <a className="hover:text-primary hover:underline" href={away.profilePath}>{game.away}</a> : game.away}</span>
        <span className="tabular-nums">{isFinal ? game.awayScore : '—'}</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span>{home ? <a className="hover:text-primary hover:underline" href={home.profilePath}>{game.home}</a> : game.home}</span>
        <span className="tabular-nums">{isFinal ? game.homeScore : '—'}</span>
      </div>
    </div>
    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
      {game.venue && <span>{game.venue}</span>}
      <a className="font-semibold text-primary underline underline-offset-4" href={sourceUrl} target="_blank" rel="noopener noreferrer">{game.sourceLabel} ↗</a>
      <span>Checked {game.verifiedAt}</span>
      {game.matchupPath && <a className="font-semibold text-primary underline underline-offset-4" href={game.matchupPath}>Matchup details →</a>}
    </div>
  </div>;
}
