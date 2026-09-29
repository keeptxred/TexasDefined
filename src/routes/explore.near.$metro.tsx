import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Container } from "@/components/layout/Container";
import { isPrimaryTripPlannerDestination } from "@/data/destination-availability";
import { auditDestination } from "@/data/destination-audit";
import {
  METRO_PROXIMITY_COLLECTIONS,
  getMetroProximityMetro,
  isMetroProximityCollectionIndexReady,
  metroProximityCanonicalPath,
  metroProximityHubReady,
  selectMetroProximityDestinations,
} from "@/data/metro-proximity";
import { destinationsQuery } from "@/data/queries";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

function indexableDestinations(destinations: Destination[]) {
  return destinations.filter((destination) =>
    isPrimaryTripPlannerDestination(destination)
    && auditDestination(destination).readyForIndexing
  );
}

function latestReview(destinations: Destination[]) {
  return destinations.map((destination) => destination.sourceCheckedAt).filter(Boolean).sort().at(-1);
}

export const Route = createFileRoute("/explore/near/$metro")({
  loader: async ({ context, params }) => {
    const metro = getMetroProximityMetro(params.metro);
    if (!metro) throw notFound();
    const destinations = indexableDestinations(await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })));
    const collections = METRO_PROXIMITY_COLLECTIONS
      .map((collection) => ({
        collection,
        results: selectMetroProximityDestinations(destinations, metro, collection),
        indexReady: isMetroProximityCollectionIndexReady(destinations, metro, collection),
      }))
      .filter((row) => row.indexReady);
    const ready = metroProximityHubReady(destinations, metro);
    const highlights = collections.flatMap((row) => row.results.slice(0, 3)).filter((row, index, all) => all.findIndex((candidate) => candidate.destination.slug === row.destination.slug) === index).slice(0, 12);
    return { metro, collections, ready, highlights, reviewedAt: latestReview(highlights.map((row) => row.destination)) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Nearby guide not found" }, { name: "robots", content: "noindex" }] };
    const canonicalPath = metroProximityCanonicalPath(loaderData.metro.slug);
    const title = `Day Trips & Things to Do Near ${loaderData.metro.name}`;
    const count = new Set(loaderData.collections.flatMap((row) => row.results.map((item) => item.destination.slug))).size;
    const description = `Plan day trips and things to do near ${loaderData.metro.name}, Texas with ${count} source-backed parks, towns, lakes, historic sites and outdoor destinations ordered by approximate distance.`;
    const image = loaderData.highlights[0]?.destination.hero;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const graph = [
      {
        "@type": "CollectionPage",
        "@id": pageUrl,
        url: pageUrl,
        name: title,
        description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${pageUrl}#collections` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
        ...(loaderData.reviewedAt ? { dateModified: loaderData.reviewedAt } : {}),
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#collections`,
        name: `Ways to explore near ${loaderData.metro.name}`,
        numberOfItems: loaderData.collections.length,
        itemListElement: loaderData.collections.map((row, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: row.collection.label,
          url: `${siteUrl}${metroProximityCanonicalPath(loaderData.metro.slug, row.collection.slug)}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
          { "@type": "ListItem", position: 3, name: `Near ${loaderData.metro.name}`, item: pageUrl },
        ],
      },
    ];
    return {
      meta: [
        ...buildMeta(texasDefinedBrand, { canonicalPath, title, description, image: image?.src, imageAlt: image?.alt }),
        { name: "robots", content: loaderData.ready ? "index, follow, max-image-preview:large" : "noindex, follow" },
      ],
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Nearby Texas</p><h1 className="mt-3 font-display text-4xl">That metro guide is not available.</h1><Link to="/explore" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Explore Texas →</Link></Container>,
  component: MetroProximityHub,
});

function MetroProximityHub() {
  const { metro, collections, highlights } = Route.useLoaderData();

  return <>
    <Container className="pt-10 sm:pt-14">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
          <li aria-hidden>·</li>
          <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li>
          <li aria-hidden>·</li>
          <li aria-current="page" className="text-foreground">Near {metro.name}</li>
        </ol>
      </nav>
    </Container>

    <section className="mt-5 border-y border-border bg-surface">
      <Container className="py-16 sm:py-24">
        <p className="eyebrow text-primary">{metro.regionLabel} drive market</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Day Trips & Things to Do Near {metro.name}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{metro.context}</p>
        <p className="mt-7 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">TexasDefined ranks these nearby guides with destination coordinates and source-backed place records. Mileages are straight-line geographic estimates for comparison, not promised driving distances or travel times.</p>
      </Container>
    </section>

    <Container className="py-14 sm:py-18">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {collections.map(({ collection, results }) => <section key={collection.slug} className="border-t-2 border-foreground pt-5">
          <p className="eyebrow text-primary">{results.length} nearby options</p>
          <h2 className="mt-3 font-display text-3xl">{collection.label}</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{collection.summary}</p>
          <ul className="mt-6 space-y-3 text-sm">
            {results.slice(0, 4).map((row) => <li key={row.destination.slug} className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
              <Link to="/destination/$slug" params={{ slug: row.destination.slug }} className="font-semibold hover:text-primary">{row.destination.name}</Link>
              <span className="shrink-0 text-xs text-muted-foreground">~{Math.round(row.distanceMiles)} mi</span>
            </li>)}
          </ul>
          <Link
            to="/explore/near/$metro/$collection"
            params={{ metro: metro.slug, collection: collection.slug }}
            className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary"
          >
            Browse {collection.navLabel.toLowerCase()} →
          </Link>
        </section>)}
      </div>
    </Container>

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
