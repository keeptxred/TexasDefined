/**
 * District 6-6A 2026 editorial guide, verified 2026-10-29.
 * Manual schedule snapshot only. NO score or standings ingestion.
 * Sources: official UIL rules/calendar; Jesuit Dallas varsity athletics;
 * Allen, McKinney, Princeton and Prosper ISD athletic departments.
 * 2026-10-30 four-game district fixtures cross-checked against the
 * dated TexasHSFootball public schedule (secondary), not a licensed feed.
 */
const district6Fixtures = [
  { date: 'Fri, Oct. 30', matchup: 'McKinney at Dallas Jesuit', source: 'https://jesuitrangers.org/sports/football/schedule/2026', basis: 'Jesuit Dallas varsity calendar' },
  { date: 'Fri, Oct. 30', matchup: 'Allen / McKinney Boyd', source: 'https://texashsfootball.live/district/6A/6', basis: 'Published district schedule (confirm home school)' },
  { date: 'Fri, Oct. 30', matchup: 'Prosper Rock Hill / Princeton', source: 'https://texashsfootball.live/district/6A/6', basis: 'Published district schedule (confirm home school)' },
  { date: 'Fri, Oct. 30', matchup: 'Prosper / Prosper Walnut Grove', source: 'https://texashsfootball.live/district/6A/6', basis: 'Published district schedule (confirm home school)' },
  { date: 'Thu, Nov. 5', matchup: 'Dallas Jesuit at Prosper Rock Hill', source: 'https://jesuitrangers.org/sports/football/schedule/2026', basis: 'Jesuit Dallas varsity calendar' },
] as const;

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
        The 2026–28 realignment brings Allen, Dallas Jesuit, the McKinney schools, Princeton and the three Prosper schools into one eight-team football district.
        Prosper Walnut Grove moves up from Class 5A, while Jesuit Dallas moves over from District 7.
        These are the UIL’s current district members, not a ranking of the teams.
        <a className="ml-2 font-semibold text-primary underline underline-offset-4" href="https://jesuitrangers.org/news/2026/2/2/general-jesuit-to-play-in-district-6-6a-in-latest-uil-redistricting-announcement.aspx" target="_blank" rel="noopener noreferrer">Jesuit’s realignment explanation ↗</a>
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div>
          <h3 className="font-display text-2xl">Published late-season matchups</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Fixture snapshot checked <time dateTime="2026-10-29">October 29, 2026</time>. These are season-calendar listings, <strong>not live upcoming games</strong> or final results. The Jesuit entries are confirmed by the school’s varsity schedule; the other three pairings require a final host-school check for time, venue and any changes.
          </p>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {district6Fixtures.map((fixture) => (
              <li key={fixture.date + fixture.matchup} className="grid gap-2 py-4 text-sm sm:grid-cols-[7rem_1fr]">
                <span className="font-semibold">{fixture.date}, 2026</span>
                <div>
                  <p className="font-semibold text-foreground">{fixture.matchup}</p>
                  <a className="mt-1 inline-block text-xs font-semibold text-primary underline underline-offset-4" href={fixture.source} target="_blank" rel="noopener noreferrer">{fixture.basis} ↗</a>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">A slash separates teams where the publicly listed fixture does not independently establish home field. No kickoff or admission availability is guaranteed. When dates have passed, this remains a dated schedule archive until editorially reviewed.</p>
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
        <p className="mt-4 text-xs leading-6 text-muted-foreground">Official venue policies and schedule sources reviewed October 29, 2026. Check the publisher before purchasing a ticket or driving to a game. External ticket vendors are not TexasDefined affiliate offers on this guide.</p>
      </div>
    </section>
  );
}
