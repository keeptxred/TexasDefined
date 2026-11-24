import { createLazyFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";

import { CategoryPage } from "@/components/editorial/CategoryPage";
import { Container } from "@/components/layout/Container";
import { SportsVenueLandingIndex } from "@/components/sports/SportsVenueLandingIndex";

const description = "Friday night lights, dusty rodeo arenas, big-league Sundays and the small rituals that turn a game into a Texas tradition.";

export const Route = createLazyFileRoute("/sports")({ component: SportsRoute });

function SportsRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== "/sports" && pathname !== "/sports/") return <Outlet />;
  return <SportsPage />;
}

function SportsPage() {
  const sportFirstNavigation = (
    <Container className="py-10 sm:py-14"><div className="mx-auto max-w-6xl">
      <section className="border-t border-border py-10" aria-labelledby="sports-finder-start"><p className="eyebrow text-primary">Choose the sport first</p><h2 id="sports-finder-start" className="mt-3 font-display text-4xl">What are you planning to follow or visit?</h2><p className="mt-4 max-w-3xl leading-8 text-muted-foreground">The editorial story feed is not a complete venue inventory. Start with the dedicated, topic-specific directories below, then check the team's official schedule and game-day rules for dates, tickets and access.</p><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a href="/sports/teams" className="border-t-2 border-foreground pt-4"><strong className="font-display text-2xl">Professional teams</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Browse the Texas pro-team guides and weekend planning.</span></a>
          <a href="/sports/friday-night-lights" className="border-t-2 border-foreground pt-4"><strong className="font-display text-2xl">High-school football</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">UIL districts, teams, playoff explainers and traditions.</span></a>
          <a href="/sports-venues/college-sports" className="border-t-2 border-foreground pt-4"><strong className="font-display text-2xl">College sports</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Campus venue planning and local travel context.</span></a>
          <a href="/sports-venues/rodeo-western" className="border-t-2 border-foreground pt-4"><strong className="font-display text-2xl">Rodeo and Western sports</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Arenas, major events and cowboy-sport destinations.</span></a>
          <a href="/sports-venues/motorsports" className="border-t-2 border-foreground pt-4"><strong className="font-display text-2xl">Motorsports</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Tracks, racing destinations and visitor logistics.</span></a>
          <a href="/sports/softball" className="border-t-2 border-foreground pt-4"><strong className="font-display text-2xl">Softball</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">UIL championships, college programs and profiles.</span></a>
        </div></section>
    </div></Container>
  );
  return <>
    <CategoryPage category="sports" eyebrow="Texas Sports" title="Texas sports: the games, rituals and rivalries that matter here" intro={description} showDestinations={false} beforeStories={sportFirstNavigation} featuredTitle="Featured from the sports desk" maxFeaturedAgeDays={35} />
    <Container className="pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <section className="border-t border-border py-10" aria-labelledby="sports-choose-official">
          <p className="eyebrow text-primary">Current season versus background</p>
          <h2 id="sports-choose-official" className="mt-3 font-display text-4xl">Find the authoritative schedule, then plan the trip</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Texas sports do not share one fixture calendar. An old football explainer may still explain the rules while its schedule is no longer current. The source and verification question change by sport; the links below go to governing or organizing bodies, not a TexasDefined live results claim.</p>
          <div className="mt-7 overflow-x-auto border border-border"><table className="w-full min-w-[42rem] text-left text-sm"><caption className="sr-only">Texas sports official schedule verification by sport</caption><thead className="bg-surface"><tr><th scope="col" className="p-4">What you follow</th><th scope="col" className="p-4">Where to verify now</th><th scope="col" className="p-4">TexasDefined helps with</th></tr></thead><tbody className="divide-y divide-border">
            <tr><th scope="row" className="p-4">High-school football</th><td className="p-4"><a href="https://www.uiltexas.org/football/playoff-brackets" target="_blank" rel="noopener noreferrer" className="text-primary underline">UIL official playoff brackets ↗</a>; confirm tickets and site with both schools.</td><td className="p-4"><Link className="text-primary underline" to="/sports/friday-night-lights">Districts, culture, stadium planning and explanations</Link>.</td></tr>
            <tr><th scope="row" className="p-4">College sports</th><td className="p-4">The hosting school's athletics schedule and ticket office; conference calendars can be revised.</td><td className="p-4"><a href="/sports-venues/college-sports" className="text-primary underline">Campus venue comparison and access planning</a>.</td></tr>
            <tr><th scope="row" className="p-4">Pro teams</th><td className="p-4">The club's current fixture calendar and the host venue's event rules; league announcements do not guarantee a venue's parking plan.</td><td className="p-4"><a href="/sports/teams" className="text-primary underline">Choose among Texas team and city guides</a>.</td></tr>
            <tr><th scope="row" className="p-4">Rodeo or motorsports</th><td className="p-4">The specific event promoter, sanctioning body and track; event date and gate policy are separate from a recurring annual listing.</td><td className="p-4"><a href="/sports-venues/rodeo-western" className="text-primary underline">Rodeo venues</a> and <a href="/sports-venues/motorsports" className="text-primary underline">racetracks</a>.</td></tr>
          </tbody></table></div>
          <div className="mt-8 grid gap-5 md:grid-cols-2" aria-label="Primary sports calendars and event authorities">
            <article className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">College football weekend</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">The NCAA FBS scoreboard gives a nationwide week-level view, but a kickoff time shown in UTC may cross a local calendar day. Check the hosting university's official athletics calendar for the actual Texas venue, local kickoff and ticket details.</p><a href="https://www.ncaa.com/scoreboard/football/fbs" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline">NCAA FBS official schedule and results ↗</a></article>
            <article className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">NBA nights in Dallas, Houston and San Antonio</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">The NBA calendar can filter by team, and the published schedule includes away games; verify the actual home arena before booking a hotel or parking. A Texas opponent does not automatically mean the game is in Texas.</p><a href="https://www.nba.com/schedule" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline">Official NBA schedule ↗</a></article>
            <article className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">Houston rodeo weekends</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">The Houston Livestock Show and Rodeo calendar confirms March 2–21, 2027 for the main event. Its other listings include separate activities; check which date, venue and ticket product applies before treating an event as part of the main rodeo admission.</p><a href="https://www.rodeohouston.com/event-calendar/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline">RODEOHOUSTON official events calendar ↗</a></article>
            <article className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">Motorsport at Circuit of The Americas</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">COTA’s published 2027 calendar lists Formula E on February 6, NASCAR on March 5–7 and MotoGP on April 23–25. These are different events with different ticket and access arrangements; use the promoter’s specific listing rather than transferring Formula 1 parking or entry rules to another race. Dates checked November 24, 2026.</p><a href="https://circuitoftheamericas.com/events/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline">COTA official event calendar ↗</a></article>
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">The TexasDefined sports desk keeps previous articles available in a clearly labeled archive once their original publication is older than the current-news display window. A newer source check does not silently re-date an old story. This hub's schedule and source references are monitored in GitHub; that monitoring is not a claim that every event has been individually reconfirmed today.</p>
        </section>
        <section className="border-t border-border py-10"><p className="eyebrow text-primary">Worth the trip</p><h2 className="mt-3 font-display text-4xl">Pick a team. Build a game weekend.</h2><p className="mt-4 max-w-3xl leading-8">Explore 13 Texas pro teams, from the Texans and Cowboys to the Dash and Wings, with home games, tickets, team history and a plan for the rest of your stay.</p><a href="/sports/teams" className="mt-5 inline-block font-semibold text-primary">Find your Texas team and weekend guide →</a></section>
        <section className="border-t border-border pt-10" aria-labelledby="sports-culture-reading">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Sports culture</p>
              <h2 id="sports-culture-reading" className="mt-2 font-display text-3xl leading-tight">Why Texas games become traditions</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Go beyond schedules and scores with evergreen guides to the teams and rituals that became part of Texas identity.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Link to="/texas-tailgating-guide" className="group border-t border-border py-5">
                <strong className="block font-display text-2xl group-hover:text-primary">Texas tailgating and game-day planning</strong>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">Build college and pro football weekends around official parking, tailgating zones, stadium entry and the traditions that start before kickoff.</span>
                <span className="mt-3 block text-sm font-semibold text-primary">Open the Texas tailgating guide →</span>
              </Link>
              <Link to="/article/$slug" params={{ slug: "san-antonio-spurs-texas-basketball-culture" }} className="group border-t border-border py-5">
                <strong className="block font-display text-2xl group-hover:text-primary">San Antonio Spurs: basketball and city identity</strong>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">How championships, continuity and a team-first culture became woven into San Antonio's modern civic identity.</span>
                <span className="mt-3 block text-sm font-semibold text-primary">Read the Spurs culture guide →</span>
              </Link>
              <a href="/sports/softball" className="group border-t border-border py-5">
                <strong className="block font-display text-2xl group-hover:text-primary">Texas women’s softball: teams, championships and the Lady Dragons</strong>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">Explore UIL softball champions, college teams, junior-college development, and the story of Paris Junior College program assistant Jack Butler.</span>
                <span className="mt-3 block text-sm font-semibold text-primary">Explore Texas softball →</span>
              </a>
              <Link to="/sports/friday-night-lights" className="group border-t border-border py-5">
                <strong className="block font-display text-2xl group-hover:text-primary">Friday Night Lights, Defined</strong>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">The parent guide to Texas high school football: newcomer basics, stadiums, six-man and 11-man culture, marching bands, homecoming mums, rivalries and the season arc.</span>
                <span className="mt-3 block text-sm font-semibold text-primary">Open the high school football hub →</span>
              </Link>
              <a href="/events/tournaments" className="group border-t border-border py-5">
                <strong className="block font-display text-2xl group-hover:text-primary">Texas tournaments & championships</strong>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">Browse 250 competition seeds across golf, rodeo, basketball, baseball, soccer, volleyball, motorsports, fishing, combat sports and more, organized by category and county where the location is clear.</span>
                <span className="mt-3 block text-sm font-semibold text-primary">Browse Texas tournaments →</span>
              </a>
              <Link to="/destination/$slug" params={{ slug: "whirlyball-hurst" }} className="group border-t border-border py-5">
                <strong className="block font-display text-2xl group-hover:text-primary">WhirlyBall Hurst: an unusual indoor team game</strong>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">Drive bumper-style WhirlyBugs, pass with scoops and score on electronic targets, then add laser tag or arcade play in Tarrant County.</span>
                <span className="mt-3 block text-sm font-semibold text-primary">Open the WhirlyBall Hurst guide →</span>
              </Link>
            </div>
          </div>
        </section>

        <SportsVenueLandingIndex compact />
        <section className="mt-10 border-t border-border pt-10">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Texas venues</p>
              <h2 className="mt-2 font-display text-3xl leading-tight">Stadiums, arenas and racetracks</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Browse the statewide venue guide for professional sports, college traditions, motorsports, horse racing, rodeo and regional ballparks.</p>
              <Link to="/sports-venues" className="mt-5 inline-block text-sm font-semibold text-primary">Browse all Texas sports venues →</Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <Link to="/sports-venue/$slug" params={{ slug: "reliant-stadium" }} className="group border-t border-border py-5"><strong className="block font-display text-2xl group-hover:text-primary">Reliant Stadium, Houston</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Texans football, RODEOHOUSTON and one of the state's largest major-event venues.</span><span className="mt-3 block text-sm font-semibold text-primary">Open Reliant Stadium guide →</span></Link>
              <Link to="/sports-venue/$slug" params={{ slug: "circuit-of-the-americas" }} className="group border-t border-border py-5"><strong className="block font-display text-2xl group-hover:text-primary">Circuit of The Americas, Austin</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Texas's flagship international motorsports destination and a major race-weekend tourism draw.</span><span className="mt-3 block text-sm font-semibold text-primary">Open COTA guide →</span></Link>
              <Link to="/sports-venue/$slug" params={{ slug: "att-stadium" }} className="group border-t border-border py-5"><strong className="block font-display text-2xl group-hover:text-primary">AT&T Stadium, Arlington</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Dallas Cowboys football, stadium tours and major national and international events.</span><span className="mt-3 block text-sm font-semibold text-primary">Open AT&T Stadium guide →</span></Link>
              <a href="/sports-venue/jones-att-stadium" className="group border-t border-border py-5"><strong className="block font-display text-2xl group-hover:text-primary">Galaxy Stadium, Lubbock</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Texas Tech football and West Texas game-day travel at the stadium formerly known as Jones AT&T Stadium.</span><span className="mt-3 block text-sm font-semibold text-primary">Open Galaxy Stadium guide →</span></a>
              <Link to="/rodeo/$slug" params={{ slug: "houston-livestock-show-and-rodeo" }} className="group border-t border-border py-5"><strong className="block font-display text-2xl group-hover:text-primary">Houston Livestock Show and Rodeo</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Follow the event relationship from the venue to one of the biggest recurring sports-and-culture events in Texas.</span><span className="mt-3 block text-sm font-semibold text-primary">Open RodeoHouston guide →</span></Link>
            </div>
          </div>
        </section>
      </div>
    </Container>
  </>;
}
