import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TEXAS_ROUTE_66_STOPS } from "@/data/texas-route-66";

const itineraryPlans = [
  {
    label: "One long day",
    title: "The essential Texas Route 66 run",
    text: "Start early in Shamrock, give real time to U-Drop Inn and McLean, make quick roadside stops in Alanreed, Groom and Conway, spend the largest block in Amarillo, then continue through Vega and Adrian to Glenrio. This works best when you are comfortable skipping interiors that are closed and treating the smaller communities as short history stops.",
  },
  {
    label: "Two days",
    title: "The best first trip",
    text: "Day 1: Oklahoma line to Amarillo, with Shamrock, McLean, Alanreed, Groom and Conway on the way. Stay in Amarillo and use the evening for Sixth Street. Day 2: Cadillac Ranch, then Bushland, Wildorado, Vega, Adrian and Glenrio. This pace leaves room for museums, meals and photography without turning every stop into a race.",
  },
  {
    label: "Three days",
    title: "Route 66 plus Palo Duro Canyon",
    text: "Follow the two-day Route 66 structure but use a third day for Amarillo and Palo Duro Canyon. The canyon is south of the historic highway and deserves its own half-day or full-day block rather than being squeezed between roadside stops.",
  },
] as const;

const practicalNotes = [
  "Texas Historical Commission documents approximately 178 miles of the historic Texas corridor, roughly paralleling modern I-40. The National Park Service describes the surviving drivable network as a mix of business loops, frontage roads, county roads and an abandoned section near Glenrio.",
  "Historic Route 66 is not one continuous modern state highway. Navigation, construction, frontage-road direction and surface conditions can change, so use current mapping and posted road signs rather than blindly following an old alignment map.",
  "The small communities are part of the story. Lela, Washburn, Bushland and Wildorado may not require long stops, but leaving them off a Route 66 guide erases the rural transportation landscape the highway actually crossed.",
  "Hours are especially important at museums, visitor centers and cafes. Build the day's fixed schedule around the places you want to enter; roadside architecture can fill the flexible gaps.",
  "Abandoned does not mean public. Glenrio and other roadside remnants include private property and unstable structures. Photograph from lawful public areas and never enter a closed building without permission.",
] as const;

export function TexasRoute66Hub() {
  return <>
    <Container className="pb-10 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/explore">Explore</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">Route 66</span>
      </nav>
      <header className="py-10 sm:py-16">
        <p className="eyebrow text-primary">The Mother Road · Texas Panhandle</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">The complete Texas Route 66 road trip</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">From the Oklahoma line near Texola to the ghost-town remains at Glenrio, Historic Route 66 crosses the Texas Panhandle in one of the shortest—and most concentrated—state segments of the Mother Road. This guide follows the full Texas corridor, including the small communities that quick-hit lists leave out.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#stops" className="inline-flex items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">See all 13 Texas stops ↓</a>
          <Link to="/explore/trip-planner" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted">Open Trip Planner →</Link>
        </div>
      </header>
      <section className="grid gap-4 border-y border-border py-7 sm:grid-cols-4" aria-label="Route at a glance">
        <div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Historic corridor</p><p className="mt-2 font-display text-3xl">≈178 miles</p></div>
        <div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Texas guides</p><p className="mt-2 font-display text-3xl">{TEXAS_ROUTE_66_STOPS.length}</p></div>
        <div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Best pace</p><p className="mt-2 font-display text-3xl">2 days</p></div>
        <div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Direction here</p><p className="mt-2 font-display text-3xl">East → west</p></div>
      </section>
    </Container>

    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr]">
        <div><p className="eyebrow text-primary">Before mile one</p><h2 className="mt-2 font-display text-4xl">Start at the state line, not in Amarillo</h2></div>
        <div className="space-y-5 text-base leading-8 text-muted-foreground">
          <p>Texola is immediately across the Oklahoma line and works as an optional eastern gateway photo stop, but the Texas itinerary begins at the border and reaches Shamrock first. The Texas Historical Commission's survey traces the road west through the Panhandle to Glenrio at the New Mexico line.</p>
          <p>Route 66 was designated in 1926 and officially removed from the federal highway system in 1985. In Texas, Interstate 40 eventually took over the through-travel role, but substantial sections of the old corridor survive as business loops, frontage roads and local roads. That mixture is why a good Route 66 trip is more than simply driving I-40 and taking a few exits.</p>
          <p>The 2026 centennial makes this an especially useful time to drive it: Texas' official travel program is highlighting the historic highway, while the state's preservation survey provides an unusually detailed record of the buildings, road segments and communities that made the corridor work.</p>
        </div>
      </div>
    </Container>

    <Container className="py-12 sm:py-16" id="stops">
      <div className="max-w-3xl">
        <p className="eyebrow text-primary">East to west</p>
        <h2 className="mt-2 font-display text-4xl sm:text-5xl">Every Texas Route 66 stop on this guide</h2>
        <p className="mt-5 text-base leading-8 text-muted-foreground">Each stop below has its own TexasDefined planning page. The sequence follows the historic corridor from the Oklahoma line toward New Mexico rather than ranking stops by popularity.</p>
      </div>
      <ol className="mt-10 border-t border-border">
        {TEXAS_ROUTE_66_STOPS.map((stop, index) => (
          <li key={stop.slug} className="grid gap-4 border-b border-border py-7 sm:grid-cols-[5rem_1fr_auto] sm:items-start">
            <div className="font-display text-3xl text-muted-foreground">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{stop.county}</p>
              <h3 className="mt-1 font-display text-3xl">{stop.name}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{stop.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">{stop.highlights.slice(0, 3).map((highlight) => <span key={highlight} className="border border-border px-3 py-1.5 text-xs text-muted-foreground">{highlight}</span>)}</div>
            </div>
            <a href={`/explore/route-66/${stop.slug}`} className="inline-flex shrink-0 items-center border-b border-primary pb-1 text-sm font-semibold text-primary">Open stop guide →</a>
          </li>
        ))}
      </ol>
    </Container>

    <Container className="py-12 sm:py-16">
      <div className="max-w-3xl"><p className="eyebrow text-primary">Choose your pace</p><h2 className="mt-2 font-display text-4xl sm:text-5xl">One, two or three days</h2></div>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">{itineraryPlans.map((plan) => <article key={plan.label} className="border border-border p-6 sm:p-7"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{plan.label}</p><h3 className="mt-3 font-display text-3xl">{plan.title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{plan.text}</p></article>)}</div>
    </Container>

    <Container className="py-12 sm:py-16">
      <div className="max-w-3xl"><p className="eyebrow text-primary">Road reality</p><h2 className="mt-2 font-display text-4xl">What to know before following the old alignment</h2></div>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">{practicalNotes.map((note) => <li key={note} className="border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">{note}</li>)}</ul>
    </Container>

    <Container className="py-12 sm:py-16">
      <div className="border-y border-border py-8">
        <p className="eyebrow text-primary">Add the Panhandle</p><h2 className="mt-2 font-display text-4xl">Two TexasDefined detours worth adding</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <a href="/destination/cadillac-ranch" className="group border border-border p-6 transition-colors hover:bg-muted"><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">On the route · Amarillo</p><h3 className="mt-2 font-display text-3xl group-hover:text-primary">Cadillac Ranch →</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Our full destination guide for Amarillo's famous roadside art installation.</p></a>
          <a href="/destination/palo-duro-canyon-state-park" className="group border border-border p-6 transition-colors hover:bg-muted"><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Side trip · south of Amarillo</p><h3 className="mt-2 font-display text-3xl group-hover:text-primary">Palo Duro Canyon →</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Turn the Route 66 crossing into a three-day Panhandle trip with a real canyon day.</p></a>
        </div>
      </div>
    </Container>

    <Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Primary research</p><h2 className="mt-2 font-display text-4xl">Build the trip from authoritative Route 66 sources</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">This guide uses the Texas Historical Commission's Route 66 survey as the corridor authority, supported by National Park Service documentation, TxDOT road-history material and current Texas travel guidance. Business hours and access details can change, so verify the individual stop before departure.</p>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <a className="border-b border-primary text-primary" href="https://thc.texas.gov/travel/historic-highways/route-66" rel="noreferrer" target="_blank">Texas Historical Commission Route 66 →</a>
        <a className="border-b border-primary text-primary" href="https://www.nps.gov/articles/000/route-66-texas.htm" rel="noreferrer" target="_blank">National Park Service Route 66: Texas →</a>
        <a className="border-b border-primary text-primary" href="https://www.traveltexas.com/cities-and-regions/panhandle-plains/explore-route-66/" rel="noreferrer" target="_blank">Travel Texas Route 66 →</a>
      </div>
    </Container>
  </>;
}
