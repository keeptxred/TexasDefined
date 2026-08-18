import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { destinationsQuery } from "@/data/queries";
import { TOP_ATTRACTION_ROAD_TRIPS } from "@/data/top-attraction-road-trips";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/top-attractions/road-trips";
const description = "Seven Texas road-trip structures built from TexasDefined's Top 25 attractions, with realistic trip lengths, route logic and direct links to each researched destination guide.";

function resolveTrips(destinations: Destination[]) {
  const bySlug = new Map(destinations.map((destination) => [destination.slug, destination]));
  return TOP_ATTRACTION_ROAD_TRIPS.map((trip) => ({
    ...trip,
    destinations: trip.stops.flatMap((slug) => {
      const destination = bySlug.get(slug);
      return destination ? [destination] : [];
    }),
  }));
}

export const Route = createFileRoute("/explore/top-attractions/road-trips")({
  loader: async ({ context }) => {
    const destinations = await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 }));
    return resolveTrips(destinations);
  },
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const trips = loaderData ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Top 25 Texas Attraction Road Trips | Texas Defined",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: "Top 25 Texas Attraction Road Trips",
            description,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
            mainEntity: { "@id": `${pageUrl}#routes` },
          },
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#routes`,
            name: "Texas road trips built from the Top 25 attractions",
            numberOfItems: trips.length,
            itemListElement: trips.map((trip, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: trip.name,
              item: {
                "@type": "TouristTrip",
                name: trip.name,
                description: trip.summary,
                itinerary: trip.destinations.map((destination) => ({
                  "@type": "TouristAttraction",
                  name: destination.name,
                  url: absoluteUrl(texasDefinedBrand, `/destination/${destination.slug}`),
                })),
              },
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Top 25 attractions", item: absoluteUrl(texasDefinedBrand, "/explore/top-attractions") },
              { "@type": "ListItem", position: 4, name: "Road trips", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: TopAttractionRoadTripsPage,
});

function TopAttractionRoadTripsPage() {
  const trips = Route.useLoaderData();

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
