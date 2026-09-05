import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { CategoryPage } from "@/components/editorial/CategoryPage";
import { Container } from "@/components/layout/Container";
import { SportsVenueLandingIndex } from "@/components/sports/SportsVenueLandingIndex";

const description = "Friday night lights, dusty rodeo arenas, big-league Sundays and the small rituals that turn a game into a Texas tradition.";

export const Route = createLazyFileRoute("/sports")({ component: SportsPage });

function SportsPage() {
  return <>
    <CategoryPage category="sports" eyebrow="Texas Sports" title="The games, rituals and rivalries that matter here" intro={description} />
    <Container className="pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl">
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
