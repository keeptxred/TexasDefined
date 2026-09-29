import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Container } from "@/components/layout/Container";
import { isPrimaryTripPlannerDestination } from "@/data/destination-availability";
import { auditDestination } from "@/data/destination-audit";
import {
  METRO_PROXIMITY_COLLECTIONS,
  getMetroProximityCollection,
  getMetroProximityMetro,
  isMetroProximityCollectionIndexReady,
  metroProximityCanonicalPath,
  metroProximityDescription,
  metroProximityTitle,
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

function destinationSchema(row: { destination: Destination; distanceMiles: number }) {
  const destination = row.destination;
  return {
    "@type": "TouristAttraction",
    "@id": `${siteUrl}/destination/${destination.slug}#attraction`,
    name: destination.name,
    url: `${siteUrl}/destination/${destination.slug}`,
    description: destination.summary,
    image: absoluteUrl(texasDefinedBrand, destination.hero.src),
    ...(destination.officialUrl ? { sameAs: destination.officialUrl } : {}),
    ...(destination.sourceCheckedAt ? { dateModified: destination.sourceCheckedAt } : {}),
    ...(destination.managingAuthority ? { provider: { "@type": "Organization", name: destination.managingAuthority } } : {}),
    geo: { "@type": "GeoCoordinates", latitude: destination.coordinates.lat, longitude: destination.coordinates.lng },
    additionalProperty: { "@type": "PropertyValue", name: "Approximate straight-line distance from metro center", value: Math.round(row.distanceMiles), unitText: "miles" },
  };
}

export const Route = createFileRoute("/explore/near/$metro/$collection")({
  loader: async ({ context, params }) => {
    const metro = getMetroProximityMetro(params.metro);
    const collection = getMetroProximityCollection(params.collection);
    if (!metro || !collection) throw notFound();
    const destinations = indexableDestinations(await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })));
    const results = selectMetroProximityDestinations(destinations, metro, collection);
    const indexReady = isMetroProximityCollectionIndexReady(destinations, metro, collection);
    const reviewedAt = results.map((row) => row.destination.sourceCheckedAt).filter(Boolean).sort().at(-1);
    return { metro, collection, results, indexReady, reviewedAt };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Nearby collection not found" }, { name: "robots", content: "noindex" }] };
    const canonicalPath = metroProximityCanonicalPath(loaderData.metro.slug, loaderData.collection.slug);
    const title = metroProximityTitle(loaderData.metro, loaderData.collection);
    const description = metroProximityDescription(loaderData.metro, loaderData.collection, loaderData.results.length);
    const image = loaderData.results[0]?.destination.hero;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const graph = [
      {
        "@type": "CollectionPage",
        "@id": pageUrl,
        url: pageUrl,
        name: title,
        description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${pageUrl}#places` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
        ...(loaderData.reviewedAt ? { dateModified: loaderData.reviewedAt } : {}),
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#places`,
        name: title,
        numberOfItems: loaderData.results.length,
        itemListElement: loaderData.results.map((row, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: destinationSchema(row),
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
          { "@type": "ListItem", position: 3, name: `Near ${loaderData.metro.name}`, item: `${siteUrl}${metroProximityCanonicalPath(loaderData.metro.slug)}` },
          { "@type": "ListItem", position: 4, name: loaderData.collection.label, item: pageUrl },
        ],
      },
    ];
    return {
      meta: [
        ...buildMeta(texasDefinedBrand, { canonicalPath, title, description, image: image?.src, imageAlt: image?.alt }),
        { name: "robots", content: loaderData.indexReady ? "index, follow, max-image-preview:large" : "noindex, follow" },
      ],
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Nearby Texas</p><h1 className="mt-3 font-display text-4xl">That nearby collection is not available.</h1><Link to="/explore" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Explore Texas →</Link></Container>,
  component: MetroProximityCollectionPage,
});

function bandLabel(band: "close-in" | "easy-day-trip" | "longer-day-trip") {
  if (band === "close-in") return "Close to the metro";
  if (band === "easy-day-trip") return "Easy day-trip range";
  return "Longer day trip";
}

function MetroProximityCollectionPage() {
  const { metro, collection, results, indexReady } = Route.useLoaderData();
  const groups = (["close-in", "easy-day-trip", "longer-day-trip"] as const)
    .map((band) => ({ band, rows: results.filter((row) => row.distanceBand === band) }))
    .filter((group) => group.rows.length > 0);

  return <>
    <Container className="pt-10 sm:pt-14">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
          <li aria-hidden>·</li>
          <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li>
          <li aria-hidden>·</li>
          <li><Link to="/explore/near/$metro" params={{ metro: metro.slug }} className="hover:text-foreground">Near {metro.name}</Link></li>
          <li aria-hidden>·</li>
          <li aria-current="page" className="text-foreground">{collection.label}</li>
        </ol>
      </nav>
    </Container>

    <section className="mt-5 border-y border-border bg-surface">
      <Container className="py-16 sm:py-24">
        <p className="eyebrow text-primary">{metro.regionLabel} · {collection.label}</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{metroProximityTitle(metro, collection)}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{collection.summary}</p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm">
          <p><span className="eyebrow mr-2 text-muted-foreground">Published options</span>{results.length}</p>
          <p><span className="eyebrow mr-2 text-muted-foreground">Search radius</span>{collection.radiusMiles} miles</p>
          <p><span className="eyebrow mr-2 text-muted-foreground">Ordering</span>Approximate distance</p>
        </div>
        <p className="mt-6 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">Distances are straight-line estimates from central {metro.name} used to rank the statewide destination catalog. They are not road miles or drive-time promises; actual routes can be substantially longer.</p>
        {!indexReady && <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">This page is available for navigation but remains excluded from search indexing until the source-backed catalog reaches the minimum depth for this intent.</p>}
      </Container>
    </section>

    <Container className="py-14 sm:py-18">
      <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-border pb-6">
        <Link to="/explore/near/$metro" params={{ metro: metro.slug }} className="eyebrow border-b border-primary pb-1 text-primary">All near {metro.name}</Link>
        {METRO_PROXIMITY_COLLECTIONS.filter((item) => item.slug !== collection.slug).map((item) => <Link
          key={item.slug}
          to="/explore/near/$metro/$collection"
          params={{ metro: metro.slug, collection: item.slug }}
          className="eyebrow border-b border-border pb-1 hover:border-primary hover:text-primary"
        >{item.navLabel}</Link>)}
      </div>
    </Container>

    {groups.map((group, groupIndex) => <section key={group.band} className={groupIndex % 2 ? "border-y border-border bg-surface" : ""}>
      <Container className="py-14 sm:py-18">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">{bandLabel(group.band)}</p>
          <h2 className="mt-3 font-display text-4xl">{group.rows.length} place{group.rows.length === 1 ? "" : "s"} in this distance band</h2>
        </div>
        <div className="mt-9 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {group.rows.map((row, index) => <div key={row.destination.slug}>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <p className="eyebrow text-primary">About {Math.round(row.distanceMiles)} miles away</p>
              <span className="text-xs text-muted-foreground">{row.destination.nearestTown}</span>
            </div>
            <DestinationCard destination={row.destination} eager={groupIndex === 0 && index < 2} />
          </div>)}
        </div>
      </Container>
    </section>)}

    <Container className="py-16 sm:py-20">
      <div className="grid gap-8 border-t border-border pt-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow text-primary">Before you go</p>
          <h2 className="mt-3 font-display text-3xl">Use proximity as a shortlist, not a schedule.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined uses location data to make the statewide catalog easier to search. For the final trip, open each destination guide and verify driving routes, opening hours, reservations, park alerts, water conditions and weather with the current official source.</p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <Link to="/explore/trip-planner" className="eyebrow border-b border-primary pb-1 text-primary">Build a multi-stop itinerary →</Link>
          <Link to="/explore/near/$metro" params={{ metro: metro.slug }} className="eyebrow border-b border-primary pb-1 text-primary">Back to near {metro.name} →</Link>
        </div>
      </div>
    </Container>
  </>;
}
