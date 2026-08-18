import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { destinationsQuery } from "@/data/queries";
import type { TopAttractionRoadTrip } from "@/data/top-attraction-road-trips";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/top-attractions/road-trips";
const description = "Seven Texas road-trip structures built from TexasDefined's Top 25 attractions, with realistic trip lengths, route logic and direct links to each researched destination guide.";
const TopAttractionRoadTripsContent = lazy(() => import("@/components/explore/TopAttractionRoadTripsContent"));

type ResolvedTrip = TopAttractionRoadTrip & { destinations: Destination[] };

function resolveTrips(destinations: Destination[], roadTrips: readonly TopAttractionRoadTrip[]): ResolvedTrip[] {
  const bySlug = new Map(destinations.map((destination) => [destination.slug, destination]));
  return roadTrips.map((trip) => ({
    ...trip,
    destinations: trip.stops.flatMap((slug) => {
      const destination = bySlug.get(slug);
      return destination ? [destination] : [];
    }),
  }));
}

export const Route = createFileRoute("/explore/top-attractions/road-trips")({
  loader: async ({ context }) => {
    const [destinations, { TOP_ATTRACTION_ROAD_TRIPS }] = await Promise.all([
      context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })),
      import("@/data/top-attraction-road-trips"),
    ]);
    return resolveTrips(destinations, TOP_ATTRACTION_ROAD_TRIPS);
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
  return <Suspense fallback={null}><TopAttractionRoadTripsContent trips={trips} /></Suspense>;
}
