import { Link } from "@tanstack/react-router";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import type { TopAttractionRoadTrip } from "@/data/top-attraction-road-trips";
import type { Destination } from "@/data/types";

export type ResolvedTopAttractionRoadTrip = TopAttractionRoadTrip & { destinations: Destination[] };

export function TopAttractionRoadTripsContent({ trips }: { trips: ResolvedTopAttractionRoadTrip[] }) {
  return <>
    <Container className="pb-8 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span aria-hidden className="mx-2">/</span><Link to="/explore">Explore</Link><span aria-hidden className="mx-2">/</span><Link to="/explore/top-attractions">Top 25</Link><span aria-hidden className="mx-2">/</span><span aria-current="page">Road trips</span>
      </nav>
      <header className="py-10 sm:py-14">
        <p className="eyebrow text-primary">Turn the list into a trip</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Seven road trips built around TexasDefined's Top 25</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">These are editorial route structures, not turn-by-turn directions. Each one groups Top-25 attractions that make geographic and trip-planning sense together, then hands every stop back to its verified destination guide and the TexasDefined Trip Planner.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/explore/top-attractions" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">See the ranked Top 25 →</Link>
          <Link to="/explore/top-attractions/methodology" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Read the methodology →</Link>
        </div>
      </header>
    </Container>

    {trips.map((trip, tripIndex) => <Section key={trip.id} tone={tripIndex % 2 ? "surface" : undefined}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="eyebrow text-primary">Route {tripIndex + 1} · {trip.duration}</p>
            <h2 className="mt-3 font-display text-4xl leading-tight">{trip.name}</h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">{trip.summary}</p>
            <div className="mt-6 border-t border-border pt-5">
              <p className="eyebrow text-muted-foreground">Planning logic</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{trip.planningNote}</p>
            </div>
            {trip.id === "texas-panhandle" && <a href="/explore/route-66/texas-road-trip" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Drive the complete Texas Route 66 guide →</a>}
            {trip.destinations[0] && <Link to="/explore/trip-planner" search={{ destination: trip.destinations[0].slug }} className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Start this route in Trip Planner →</Link>}
          </div>
          <ol className="grid gap-8 sm:grid-cols-2">
            {trip.destinations.map((destination, index) => <li key={destination.slug}>
              <div className="mb-3 flex items-center gap-3 border-b border-border pb-3"><span className="font-display text-3xl text-primary">{index + 1}</span><span className="eyebrow text-muted-foreground">Route stop</span></div>
              <DestinationCard destination={destination} />
            </li>)}
          </ol>
        </div>
      </Container>
    </Section>)}

    <Section tone="ink">
      <Container>
        <SectionHeader eyebrow="Route discipline" title="Use official operating information before you lock the day" description="These route groupings are durable editorial planning structures. Hours, reservations, closures, weather restrictions and event-day access can change, so each linked attraction guide points back to the current controlling source." />
        <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold">
          <Link to="/explore/top-attractions/methodology" className="border-b border-ink-foreground/50 text-ink-foreground">Methodology & source policy →</Link>
          <Link to="/citation-guide" className="border-b border-ink-foreground/50 text-ink-foreground">Citation guidance →</Link>
        </div>
      </Container>
    </Section>
  </>;
}

export default TopAttractionRoadTripsContent;