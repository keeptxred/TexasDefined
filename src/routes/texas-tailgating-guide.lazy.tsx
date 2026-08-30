import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-tailgating-guide")({ component: TexasTailgatingGuide });

const sources = [
  ["Texas A&M — Tailgating in Aggieland", "https://12thman.com/tailgating"],
  ["Texas A&M — General tailgating rules", "https://12thman.com/tailgating/rules"],
  ["Texas Athletics — Football fan guide", "https://texaslonghorns.com/sports/2026/2/10/football-fan-guide"],
  ["Texas Tech — Football parking and tailgating", "https://texastech.com/sports/2026/8/18/football-parking-map"],
  ["Texas Tech — Raider Alley", "https://texastech.com/sports/2026/8/20/raider-alley"],
] as const;

function TexasTailgatingGuide() {
  return <>
    <section className="border-b border-border bg-surface"><Container className="py-14 sm:py-20 lg:py-24">
      <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"><Link to="/">Home</Link> <span aria-hidden> / </span><Link to="/sports">Texas Sports</Link> <span aria-hidden> / </span><span aria-current="page">Tailgating Guide</span></nav>
      <p className="eyebrow mt-10 text-primary">Texas sports · game day · tailgating</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Tailgating in Texas starts with the rules for that exact place</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Texas tailgating is not one statewide rulebook. A Saturday in Aggieland, a Longhorn game in Austin, a Texas Tech weekend in Lubbock and an NFL Sunday in Arlington can differ on parking access, lot opening times, reserved areas, tents, cooking, alcohol, RVs and when setups must come down. Use Texas Defined for the trip structure, then use the team or venue as the final authority for operating rules.</p>
    </Container></section>

    <section className="border-b border-border bg-background"><Container className="py-12 sm:py-16"><div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
      <div><p className="eyebrow text-primary">The planning order</p><h2 className="mt-3 font-display text-4xl">Ticket, parking, tailgate, stadium</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Treat those as four separate decisions. A game ticket does not guarantee a tailgating space, and a parking pass may not allow an expanded setup. Some campuses use reserved tailgating zones, open-access areas or vendor-operated packages in addition to ordinary parking.</p></div>
      <div className="grid gap-px border border-border bg-border md:grid-cols-2">
        <article className="bg-background p-6"><h3 className="font-display text-2xl">1. Lock the game</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Start with the exact opponent, kickoff window and stadium. Night games, early kickoffs and rivalry weekends create very different arrival schedules and lodging demand.</p></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">2. Solve parking</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Find the official parking map before building the tailgate. Confirm permit type, assigned-space rules, lot opening time, ADA options, rideshare zones and postgame traffic flow.</p></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">3. Read tailgating rules</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Check tents, grills, generators, alcohol, open-flame rules, trash, setup footprint and reservation requirements. Rules can differ between lots on the same campus.</p></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">4. Plan stadium entry</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Bag policy, mobile tickets, gate opening time and prohibited items are a separate layer. Leave enough time to shut down the tailgate and walk or shuttle to the stadium.</p></article>
      </div>
    </div></Container></section>

    <section className="border-b border-border bg-surface"><Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Four Texas game-day patterns</p><h2 className="mt-3 max-w-4xl font-display text-4xl">The culture changes by campus and venue</h2>
      <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
        <article className="bg-background p-6"><h3 className="font-display text-2xl">Aggieland · Texas A&M</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Texas A&M formalizes tailgating across reserved areas, open-access sites and specific campus zones. The university publishes general and site-specific rules, so the useful TexasDefined role is to connect those rules to College Station lodging, Kyle Field and the wider weekend.</p><Link to="/sports-venues/college-station" className="mt-4 inline-block text-sm font-semibold text-primary">College Station sports planning →</Link></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">Austin · Texas</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Longhorn game day combines designated tailgating spaces with a much larger campus-side fan experience. Parking and traffic are especially important because DKR sits inside central Austin and major construction or road-control plans can change how visitors approach the stadium.</p><Link to="/sports-venues/austin-central-texas" className="mt-4 inline-block text-sm font-semibold text-primary">Austin sports planning →</Link></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">Lubbock · Texas Tech</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Texas Tech pairs parking-lot tailgating with Raider Alley, a pregame gathering in the Engineering Key. The current parking guide also defines tent footprint, assigned-space and RV rules, making it a good example of why parking logistics and tailgating logistics should be checked together.</p><Link to="/sports-venues/lubbock" className="mt-4 inline-block text-sm font-semibold text-primary">Lubbock sports planning →</Link></article>
        <article className="bg-background p-6"><h3 className="font-display text-2xl">Arlington · major pro events</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Large pro-stadium weekends behave differently from campus Saturdays: parking products, private lots, event-specific traffic control and security rules shape the experience. Use the stadium guide first, then confirm the event's current lot and tailgating policy before departure.</p><Link to="/sports-venues/dallas-fort-worth" className="mt-4 inline-block text-sm font-semibold text-primary">DFW sports planning →</Link></article>
      </div>
    </Container></section>

    <section className="border-b border-border bg-background"><Container className="py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-2"><article><p className="eyebrow text-primary">Bring less than you think</p><h2 className="mt-3 font-display text-3xl">A compact setup is easier to move, clean and shut down</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">The best tailgate kit is the one that fits the permitted footprint and can be packed before stadium entry without turning cleanup into a second event. Shade, water, weather protection, seating and food safety matter more than elaborate gear. Heat can be a serious early-season issue, while late-season fronts can change conditions quickly.</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Do not assume grills, generators, tents or alcohol are allowed merely because you saw them at another Texas venue. Check the current site-specific rules every time.</p></article>
      <article><p className="eyebrow text-primary">Respect the shared space</p><h2 className="mt-3 font-display text-3xl">Tailgating is hospitality plus logistics</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Keep drive lanes open, stay inside the assigned footprint, control trash and charcoal, and account for neighboring groups. University and venue rules often exist because unmanaged setups can create fire, traffic, property-damage or accessibility problems.</p><p className="mt-3 text-sm leading-7 text-muted-foreground">For families, first-time visitors or away fans, official pregame fan zones can be easier than building a private tailgate from scratch. They usually reduce equipment and parking complexity while still providing the atmosphere that makes game day feel different from an ordinary stadium visit.</p></article></div>
    </Container></section>

    <section className="border-b border-border bg-surface"><Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Build the full weekend</p><h2 className="mt-3 font-display text-3xl">Use the tailgate as one layer of the trip</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">A strong game-day weekend includes the host city, not just the parking lot. College Station traditions, Austin music and food, Lubbock's West Texas identity and DFW's larger attraction network all give the trip value before and after kickoff.</p>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/sports" className="text-primary">Texas sports →</Link><Link to="/sports-venues" className="text-primary">Sports venues →</Link><Link to="/sports-venues/college-sports" className="text-primary">College sports venues →</Link><Link to="/texas-college-towns" className="text-primary">Texas college towns →</Link><Link to="/events/sports-events" className="text-primary">Sports events →</Link><Link to="/explore/trip-planner" className="text-primary">Texas Trip Planner →</Link></div>
    </Container></section>

    <section className="bg-background"><Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Official game-day sources</p><h2 className="mt-3 font-display text-3xl">Use the host as the final authority</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Parking maps, tailgating zones, lot times and prohibited items can change by season or event. These first-party athletics pages are examples of the operating source that should be checked immediately before travel. Source review: August 30, 2026.</p>
      <ul className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-2 lg:grid-cols-3">{sources.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noreferrer" className="text-primary">{label} ↗</a></li>)}</ul>
    </Container></section>
  </>;
}
