import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Container } from "@/components/layout/Container";
import type {
  MetroProximityCollection,
  MetroProximityMetro,
  MetroProximityResult,
} from "@/data/metro-proximity";

export const Route = createLazyFileRoute("/explore/near/$metro")({});

type HubPageData = {
  metro: MetroProximityMetro;
  collections: Array<{
    collection: MetroProximityCollection;
    results: MetroProximityResult[];
    indexReady: boolean;
  }>;
  highlights: MetroProximityResult[];
};

export function MetroProximityHubRich({ pageData }: { pageData: HubPageData }) {
  const { metro, highlights } = pageData;

  return <>
    {highlights.length > 0 && <section className="border-t border-border bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Start with these</p>
          <h2 className="mt-3 font-display text-4xl">Nearby places worth opening first</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">These are not paid rankings. They are a cross-section of the closest source-backed destinations across the nearby collections above.</p>
        </div>
        <div className="mt-9 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.slice(0, 9).map((row, index) => <div key={row.destination.slug}>
            <p className="eyebrow mb-3 text-muted-foreground">About {Math.round(row.distanceMiles)} miles away</p>
            <DestinationCard destination={row.destination} eager={index < 2} />
          </div>)}
        </div>
      </Container>
    </section>}

    <Container className="py-16 sm:py-20">
      <div className="grid gap-8 border-t border-border pt-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow text-primary">How to use this guide</p>
          <h2 className="mt-3 font-display text-3xl">Distance first, then trip reality.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Straight-line distance is useful for sorting a statewide catalog, but Texas roads, traffic, water crossings and park entrances can make actual driving much longer. Open the destination guide, then verify the route, hours, reservations, closures and weather before leaving.</p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <Link to="/explore/trip-planner" className="eyebrow border-b border-primary pb-1 text-primary">Build a Texas itinerary →</Link>
          <Link to="/explore" className="eyebrow border-b border-primary pb-1 text-primary">Browse all Explore Texas guides →</Link>
        </div>
      </div>
    </Container>
  </>;
}
