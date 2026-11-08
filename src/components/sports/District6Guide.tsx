/**
 * District 6-6A 2026 editorial guide, reviewed 2026-11-07.
 * Manual schedule snapshot only. NO score or standings ingestion.
 * Sources: official UIL rules/calendar; Jesuit Dallas varsity athletics;
 * Allen, McKinney, Princeton and Prosper ISD athletic departments.
 * All 28 district fixtures manually compared against published district schedules; all seven Jesuit entries checked against the school's varsity calendar.
 */
import {
  DISTRICT6_2026_SCHEDULE,
  DISTRICT6_2026_SCHEDULE_CHECKED,
  DISTRICT6_2026_SCHEDULE_SOURCES,
} from '@/data/high-school-football/district6-calendar-2026';

const district6OfficialSources = [
  {
    name: 'Allen ISD',
    teams: 'Allen Eagles',
    detail: 'Home football ticket links and Eagle Stadium visitor information. Away games use the host school’s tickets.',
    url: 'https://www.allenisd.org/page/tickets',
    label: 'Official Allen ISD tickets',
  },
  {
    name: 'McKinney ISD',
    teams: 'McKinney Lions and McKinney Boyd Broncos',
    detail: 'McKinney ISD Stadium, 4201 S. Hardin Blvd. The district specifies electronic tickets, clear-bag rules and venue seating guidance.',
    url: 'https://www.mckinneyisd.net/o/as/page/tickets/',
    label: 'Official McKinney ISD tickets and stadium',
  },
  {
    name: 'Prosper ISD',
    teams: 'Prosper Eagles, Rock Hill Blue Hawks and Walnut Grove Wildcats',
    detail: 'District athletics links to school schedules, ticket information and Children’s Health Stadium. Confirm the game-specific host and field.',
    url: 'https://www.prosper-isd.net/page/athletic-information/',
    label: 'Official Prosper ISD athletics',
  },
  {
    name: 'Princeton ISD',
    teams: 'Princeton Panthers',
    detail: 'Jackie Hendricks Stadium uses separate home and visitor entrances and electronic ticketing. Review the district’s posted gate and bag policies.',
    url: 'https://www.princetonisd.net/departments/athletics/athletic-facilities/jackie-hendricks-stadium',
    label: 'Official Princeton ISD stadium rules',
  },
  {
    name: 'Jesuit Dallas',
    teams: 'Dallas Jesuit Rangers',
    detail: 'First-party 2026 varsity dates and home-site assignments at Ranger Stadium. Use this varsity calendar, not the JV schedule.',
    url: 'https://jesuitrangers.org/sports/football/schedule/2026',
    label: 'Official Jesuit varsity schedule',
  },
] as const;

export function District6Guide() {
  return (
    <section id="district-6-2026" data-football-district-section="district-6-guide" className="border-b border-border py-10">
      <p className="eyebrow text-primary">District 6-6A · Region I · 2026 season</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl">Varsity schedule, tickets and the playoff path</h2>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
        The 2026–28 UIL realignment brings Allen, Dallas Jesuit, the McKinney schools, Princeton and the three Prosper schools into one eight-team football district.
        Prosper Walnut Grove moves up from Class 5A, while Jesuit Dallas moves over from District 7.
        These are the UIL’s current district members, not a ranking of the teams.
        <a className="ml-2 font-semibold text-primary underline underline-offset-4" href="https://jesuitrangers.org/news/2026/2/2/general-jesuit-to-play-in-district-6-6a-in-latest-uil-redistricting-announcement.aspx" target="_blank" rel="noopener noreferrer">Jesuit’s realignment explanation ↗</a>
      </p>


      <section id="district-6-comparison" aria-label="What makes District 6 different" className="mt-9 border-y border-border py-7">
        <p className="eyebrow text-primary">Original district analysis · UIL 2026–28 enrollment</p>
        <h3 className="mt-2 font-display text-2xl">Eight programs, five athletics offices, one unusually wide enrollment range</h3>
        <div className="mt-5 grid gap-5 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
          <div>
            <p><strong className="text-foreground">Enrollment comparison:</strong> Allen’s UIL realignment count of 6,798 is about 2.6 times the district median of 2,642. The smallest listed member, Dallas Jesuit, is 2,320—a 4,478-student range. Those are published UIL alignment snapshots, not present-day enrollments, performance rankings, or predictions.</p>
            <p className="mt-3">This large gap does not itself put Allen in Division I or Jesuit in Division II. Under 6A rules, the two largest <em>qualified</em> schools take Division I places, regardless of the district-wide enrollment ordering before qualifying.</p>
          </div>
          <div>
            <p><strong className="text-foreground">Who actually runs game day:</strong> Prosper ISD has three district teams, McKinney ISD has two, and Allen ISD, Princeton ISD and Jesuit Dallas each handle one. That makes five separate athletics/ticket offices for eight programs, so a generic district-wide ticket link would misdirect some visitors.</p>
            <p className="mt-3">The 2026 shift reunites Jesuit with Allen and the McKinney programs while newcomer Prosper Walnut Grove moves into 6A. The district includes seven public-school teams and Jesuit Dallas, a UIL boys-only member. None of these structural distinctions establishes a projected finish.</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">Method: direct comparison of the eight UIL enrollment figures listed on this page; median is the midpoint of the fourth and fifth values (2,609 and 2,675). Sources: the linked <a href="#district-6-source-notes" className="text-primary underline underline-offset-4">football source notes</a>, the UIL realignment and school athletics offices. This analysis contains no win-loss data.</p>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div>
          <h3 className="font-display text-2xl">Complete 2026 district schedule — 28 league games</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Manually reviewed <time dateTime={DISTRICT6_2026_SCHEDULE_CHECKED}>November 7, 2026</time>. This is a <strong>complete seven-games-per-team schedule archive</strong> of all 28 District 6 regular-season matchups—not live upcoming games, a results service or verified final scores. Jesuit Dallas’s seven games were checked against its <a className="text-primary underline underline-offset-4" href={DISTRICT6_2026_SCHEDULE_SOURCES.jesuitVarsity} target="_blank" rel="noopener noreferrer">official varsity calendar</a>; the other 21 game dates and home/away assignments were transcribed and cross-checked internally for uniqueness from the <a className="text-primary underline underline-offset-4" href={DISTRICT6_2026_SCHEDULE_SOURCES.publishedDistrict} target="_blank" rel="noopener noreferrer">published district-wide schedule ledger</a>. School-issued changes take precedence.
          </p>
          <ol className="mt-4 divide-y divide-border border-y border-border" aria-label="All 28 published 2026 District 6 league fixtures">
            {DISTRICT6_2026_SCHEDULE.map((fixture, index) => {
              const firstParty = fixture.away === 'Dallas Jesuit' || fixture.home === 'Dallas Jesuit';
              const sourceUrl = firstParty ? DISTRICT6_2026_SCHEDULE_SOURCES.jesuitVarsity : DISTRICT6_2026_SCHEDULE_SOURCES.publishedDistrict;
              return (
                <li key={fixture.date + fixture.away + fixture.home} data-district6-fixture={fixture.date} className="grid gap-2 py-3 text-sm sm:grid-cols-[8rem_1fr]">
                  <span className="font-semibold tabular-nums"><span className="sr-only">Game {index + 1} of 28: </span><time dateTime={fixture.date}>{new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', weekday: 'short' }).format(new Date(fixture.date + 'T12:00:00Z'))}, 2026</time></span>
                  <div>
                    <p className="font-semibold text-foreground">{fixture.away} at {fixture.home}</p>
                    <a className="mt-1 inline-block text-xs font-semibold text-primary underline underline-offset-4" href={sourceUrl} target="_blank" rel="noopener noreferrer">{firstParty ? 'Official Jesuit varsity calendar' : 'Published district-wide schedule'} ↗</a>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">The league schedule includes 28 unique matchups (eight schools × seven opponents ÷ two). It excludes non-district games, scrimmages, kickoff times, scores, playoff pairings and records. Dates shown are historical. Confirm any contested date, field or game-day change with the home athletics office; no ticket availability is promised.</p>
        </div>
        <aside className="border-l-2 border-primary bg-surface px-5 py-5 text-sm leading-7" aria-label="2026 UIL playoffs">
          <h3 className="font-display text-2xl text-foreground">How District 6 advances</h3>
          <p className="mt-3">Four teams qualify for the UIL Class 6A playoffs. Of those four qualifiers, the two with the highest official enrollment go to Division I and the other two to Division II; a school’s overall enrollment alone does not confirm its bracket before qualifying.</p>
          <p className="mt-3">District 6 is in Region I and meets District 5 in the bi-district round. The UIL’s 2026 district-certification deadline is <strong>November 7</strong>, with first-round playoff dates <strong>November 12–14</strong>.</p>
          <p className="mt-3">There are no standings, automated win/loss records, tie-break projections or assumed playoff seeds on this guide.</p>
          <div className="mt-4 space-y-2 font-semibold">
            <a className="block text-primary underline underline-offset-4" href="https://www.uiltexas.org/football/playoff-brackets" target="_blank" rel="noopener noreferrer">Official UIL brackets ↗</a>
            <a className="block text-primary underline underline-offset-4" href="https://www.uiltexas.org/football" target="_blank" rel="noopener noreferrer">Official 2026 season dates ↗</a>
            <a className="block text-primary underline underline-offset-4" href="https://www.uiltexas.org/football/page/football-manual-post-season-information" target="_blank" rel="noopener noreferrer">UIL postseason rules ↗</a>
          </div>
        </aside>
      </div>

      <div id="district-6-fan-info" className="mt-10">
        <h3 className="font-display text-2xl">Official schedules, tickets and game-day rules</h3>
        <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">Five athletic departments cover District 6’s eight schools. Use the home school’s current information before traveling. A campus address is not proof of the football stadium entrance, parking location or game-day ticket inventory.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {district6OfficialSources.map((source) => (
            <div key={source.name} className="border border-border p-5">
              <h4 className="font-display text-xl">{source.name}</h4>
              <p className="mt-1 text-xs font-semibold text-primary">{source.teams}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{source.detail}</p>
              <a className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4" href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">Ticket and venue links initially sourced October 29, 2026; the district calendar and editorial context were reviewed November 7, 2026. Check the publisher before purchasing a ticket or driving to a game. External ticket vendors are not TexasDefined affiliate offers on this guide.</p>
      </div>

      <section id="district-6-source-notes" className="mt-10 border-t border-border pt-7 text-sm leading-7" aria-label="District 6 editorial and corrections information">
        <p className="eyebrow text-primary">Sourcing and editorial accountability</p>
        <h3 className="mt-2 font-display text-2xl">How this guide was checked</h3>
        <p className="mt-3 max-w-4xl text-muted-foreground"><strong className="text-foreground">Prepared and reviewed by the TexasDefined editorial desk.</strong> Last manual content review: <time dateTime="2026-11-07">November 7, 2026</time>. This byline identifies the publishing desk, not an independent reporter or an eyewitness. The UIL controls official district membership, enrollment and postseason policy. Jesuit Dallas athletics is the primary varsity fixture source for its seven district games; the remaining calendar entries rely on a separately published schedule and may require host-school verification.</p>
        <p className="mt-3 max-w-4xl text-muted-foreground"><strong className="text-foreground">Editorial policy:</strong> Results, W–L totals, playoff qualifiers, predictions and seed projections are deliberately excluded. A past date does not imply a final result. This is a manually dated 2026 schedule archive, not a continuously updating scoreboard. See our <a className="text-primary underline underline-offset-4" href="/editorial-policy">editorial policy</a> or <a className="text-primary underline underline-offset-4" href="/corrections">report a correction</a> when a school publishes a change.</p>
      </section>
    </section>
  );
}
