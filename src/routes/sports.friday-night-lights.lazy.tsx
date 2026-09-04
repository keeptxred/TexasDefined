import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/sports/friday-night-lights")({ component: FridayNightLightsPage });

const startHere = [
  {
    title: "New to Texas high school football?",
    description: "Start with the practical primer: what happens before kickoff, what to expect in the stands, how school communities organize game night and what first-timers usually miss.",
    href: "/article/texas-high-school-football-newcomers",
    label: "Open the newcomer guide",
  },
  {
    title: "Why Friday night lights matter here",
    description: "Read the cultural story behind the stadiums, rivalries, marching bands and community rituals that make high school football unusually visible across Texas.",
    href: "/article/texas-high-school-football-friday-night-lights",
    label: "Read the culture guide",
  },
  {
    title: "Find the school district first",
    description: "For newcomers and relocating families, the district is the cleanest starting point for understanding which schools, rivalries and local traditions belong to a community.",
    href: "/find-my-school-district",
    label: "Find a Texas school district",
  },
  {
    title: "See the stadium side of the tradition",
    description: "Browse TexasDefined's high-school football venue collection for stadium guides, location context and official planning links where verified venue records are available.",
    href: "/sports-venues/high-school-football",
    label: "Browse high-school stadiums",
  },
] as const;

const fridayNightLayers = [
  ["The game", "Varsity football is the center of the night, but the experience is larger than the score. District races, rivalries and playoff stakes give each week a place in the season."],
  ["The band", "Marching bands turn halftime into its own performance tradition. In many communities, the band has its own alumni, parent and student following separate from football."],
  ["Cheer, drill teams & spirit groups", "Sidelines and halftime often bring together cheerleaders, drill teams, dance teams, mascots and other school organizations. Friday night is a whole-campus production."],
  ["The student section", "Themes, chants and school colors make the stands part of the event. The exact customs vary by school, which is why local traditions matter more than a single statewide script."],
  ["Homecoming", "Texas homecoming can add court ceremonies, alumni events, rivalry energy and the famously oversized mum tradition. Homecoming is one of the clearest examples of football overlapping with school and family culture."],
  ["The town around it", "In smaller communities especially, the stadium can function like a weekly gathering place for families, alumni, local businesses and civic groups. In larger metros, the scale changes but the school-community identity remains."],
] as const;

const footballWorlds = [
  {
    title: "Six-man Texas",
    description: "At the smallest-school end of UIL football, six-man is its own Texas football world: fewer players, more open space and schools where the team can be tightly woven into the life of a small community.",
  },
  {
    title: "Small-town 11-man football",
    description: "Across many 2A, 3A and 4A communities, football can be a weekly civic ritual where generations know the same stadium, rivalry and school colors.",
  },
  {
    title: "Suburban & metro football",
    description: "Large 5A and 6A programs can bring enormous student bodies, purpose-built stadiums and cross-town district rivalries. The scale can feel closer to a college event while still being rooted in one school system.",
  },
] as const;

function FridayNightLightsPage() {
  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-14 sm:py-20 lg:py-24">
        <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <Link to="/">Home</Link><span aria-hidden className="mx-2">/</span><Link to="/sports">Texas Sports</Link><span aria-hidden className="mx-2">/</span><span aria-current="page">Friday Night Lights</span>
        </nav>
        <p className="eyebrow mt-10 text-primary">Texas high school football</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Friday Night Lights, Defined</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Texas high school football makes more sense when you stop treating it as only a game. This is the hub for the stadiums, school traditions, six-man towns, marching bands, homecoming mums, rivalries, playoff culture and practical details that shape a Friday night across the state.</p>
      </Container>
    </section>

    <section className="border-b border-border bg-background">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Start here</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">Pick the part of Texas football you need</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">This page is the parent guide. The deeper links handle the newcomer basics, cultural history, school geography and venue planning without repeating the same article four times.</p>
          </div>
          <div className="grid gap-x-8 md:grid-cols-2">
            {startHere.map((item) => <a key={item.href} href={item.href} className="group border-t border-border py-5">
              <h3 className="font-display text-2xl leading-tight group-hover:text-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-primary">{item.label} →</span>
            </a>)}
          </div>
        </div>
      </Container>
    </section>

    <section className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Anatomy of a Friday night</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl">The football team is only one part of the event</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">A useful Texas football guide has to explain the organizations and rituals sharing the same stadium. Some are nearly universal; others are intensely local.</p>
        <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {fridayNightLayers.map(([title, description]) => <article key={title} className="bg-background p-6 sm:p-7">
            <h3 className="font-display text-2xl">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
          </article>)}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link to="/texas-homecoming-mums" className="text-primary">Texas homecoming mums explained →</Link>
          <Link to="/texas-tailgating-guide" className="text-primary">Texas tailgating guide →</Link>
        </div>
      </Container>
    </section>

    <section className="border-b border-border bg-background">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <p className="eyebrow text-primary">One state, different football worlds</p>
            <h2 className="mt-3 font-display text-4xl">The experience changes with school size and community</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">UIL competition spans 1A six-man through 6A football. Classification is not a quality ranking; it is part of how schools of very different enrollment sizes are organized for competition.</p>
          </div>
          <div className="grid gap-5">
            {footballWorlds.map((item) => <article key={item.title} className="border-t-2 border-foreground pt-5">
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </article>)}
          </div>
        </div>
      </Container>
    </section>

    <section className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">The season arc</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl">From late-summer kickoff to the state championships</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <SeasonStep number="01" title="Opening weeks" body="Non-district games begin building identity, testing lineups and renewing early rivalries as schools settle into the fall schedule." />
          <SeasonStep number="02" title="District play" body="District games determine the playoff path, turning familiar opponents and nearby schools into the core competitive map of the season." />
          <SeasonStep number="03" title="Playoffs" body="The bracket expands the geography. Neutral-site games and longer drives can turn a local season into a regional road trip for families and fans." />
          <SeasonStep number="04" title="State championships" body="UIL state championship games close the season across the football classifications. Use the official UIL page for the current schedule, teams and venue details." />
        </div>
      </Container>
    </section>

    <section className="border-b border-border bg-background">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Plan your first game</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">A simple Friday-night checklist</h2>
          </div>
          <ol className="grid gap-x-8 md:grid-cols-2">
            <PlanningStep number="1" title="Confirm the school and stadium" body="School names, district facilities and shared stadiums can be confusing in larger metros. Start with the district and official school athletics page." />
            <PlanningStep number="2" title="Check tickets and entry rules" body="Digital-ticket policies, bag rules, parking and gate locations can change. Use the school, district or venue's official information before leaving." />
            <PlanningStep number="3" title="Arrive before kickoff" body="The pregame is part of the experience: band warmups, team entrances, student sections and parking traffic all build before the opening whistle." />
            <PlanningStep number="4" title="Stay for halftime" body="If you leave at halftime, you miss one of the main reasons this guide exists. The marching band, drill team and school traditions are part of Friday night, not intermission filler." />
          </ol>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link to="/find-my-school-district" className="text-primary">Find your school district →</Link>
          <a href="/sports-venues/high-school-football" className="text-primary">Browse high-school football stadiums →</a>
        </div>
      </Container>
    </section>

    <section className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Go deeper</p>
        <h2 className="mt-3 font-display text-4xl">Follow football into the rest of Texas culture</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <RelatedCard title="Homecoming mums" body="Why Texas turned a small corsage tradition into an elaborate wearable school-spirit display." href="/texas-homecoming-mums" />
          <RelatedCard title="Texas sports venues" body="Browse stadiums, arenas, racetracks, rodeo grounds and other sports destinations across the state." href="/sports-venues" />
          <RelatedCard title="Texas college towns" body="See how football, universities and local identity continue beyond high school into the state's college towns." href="/texas-college-towns" />
          <RelatedCard title="Texas Sports" body="Return to the statewide sports hub for college and pro football, basketball, rodeo, motorsports and more." href="/sports" />
        </div>
      </Container>
    </section>

    <section className="bg-background">
      <Container className="py-12 sm:py-16">
        <div className="max-w-4xl">
          <p className="eyebrow text-primary">Official season authority</p>
          <h2 className="mt-3 font-display text-3xl">Use UIL for current rules, dates, brackets and championship details</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">TexasDefined explains the durable culture and helps you navigate the statewide system. The University Interscholastic League is the controlling source for current UIL football rules, season dates, playoff information and state-championship schedules.</p>
        </div>
        <ul className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
          <li><a href="https://www.uiltexas.org/football" target="_blank" rel="noreferrer" className="text-primary">UIL football home ↗</a></li>
          <li><a href="https://www.uiltexas.org/football/state" target="_blank" rel="noreferrer" className="text-primary">UIL state championships ↗</a></li>
          <li><a href="https://www.uiltexas.org/athletics/archives/football/champions" target="_blank" rel="noreferrer" className="text-primary">UIL football champions archive ↗</a></li>
        </ul>
      </Container>
    </section>
  </>;
}

function SeasonStep({ number, title, body }: { number: string; title: string; body: string }) {
  return <article className="border-t border-border pt-4">
    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{number}</span>
    <h3 className="mt-2 font-display text-2xl">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
  </article>;
}

function PlanningStep({ number, title, body }: { number: string; title: string; body: string }) {
  return <li className="border-t border-border py-5">
    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Step {number}</span>
    <h3 className="mt-2 font-display text-2xl">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
  </li>;
}

function RelatedCard({ title, body, href }: { title: string; body: string; href: string }) {
  return <a href={href} className="group border-t-2 border-foreground pt-5">
    <h3 className="font-display text-2xl group-hover:text-primary">{title}</h3>
    <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
    <span className="mt-4 inline-block text-sm font-semibold text-primary">Open guide →</span>
  </a>;
}
