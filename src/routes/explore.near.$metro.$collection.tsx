import { lazy, Suspense } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { getMetroProximityCollectionPageData } from "@/data/metro-proximity-page-data.functions";

const MetroProximityCollectionRich = lazy(() =>
  import("./explore.near.$metro.$collection.lazy").then((module) => ({ default: module.MetroProximityCollectionRich })),
);

export const Route = createFileRoute("/explore/near/$metro/$collection")({
  loader: async ({ params }) => {
    const pageData = await getMetroProximityCollectionPageData({ data: { metro: params.metro, collection: params.collection } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => loaderData?.head ?? { meta: [{ name: "robots", content: "noindex, nofollow" }] },
  component: MetroProximityCollectionPage,
});

function countyLabel(value?: string) {
  if (!value) return "";
  return /\bCounty$/i.test(value) ? value : `${value} County`;
}

function MetroProximityCollectionPage() {
  const pageData = Route.useLoaderData();
  const { metro, collection, results, indexReady, presentation } = pageData;
  const distanceWindow = collection.minimumMiles > 0
    ? `${collection.minimumMiles}–${collection.radiusMiles} straight-line miles`
    : `Up to ${collection.radiusMiles} straight-line miles`;

  return <>
    <main>
      <div className="mx-auto w-full max-w-7xl px-5 pt-10 sm:px-8 sm:pt-14">
        <nav aria-label="Breadcrumb" className="eyebrow text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/explore/near/$metro" params={{ metro: metro.slug }} className="hover:text-foreground">Near {metro.name}</Link></li>
            <li aria-hidden>·</li>
            <li aria-current="page" className="text-foreground">{presentation.label}</li>
          </ol>
        </nav>
      </div>

      <section className="mt-5 border-y border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="eyebrow text-primary">{metro.regionLabel} · {presentation.label}</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{pageData.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{presentation.summary}</p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm">
            <p><span className="eyebrow mr-2 text-muted-foreground">Published options</span>{results.length}</p>
            <p><span className="eyebrow mr-2 text-muted-foreground">Distance window</span>{distanceWindow}</p>
            <p><span className="eyebrow mr-2 text-muted-foreground">Ordering</span>Geographic distance</p>
            {presentation.tripFit && <p><span className="eyebrow mr-2 text-muted-foreground">Trip fit</span>{presentation.tripFit}</p>}
          </div>
          <p className="mt-6 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">Straight-line distances are catalog-screening estimates from central {metro.name}. They are not road miles or drive-time promises. Use the “Check current drive” links below for current Google Maps routing, road mileage and travel-time estimates.</p>
          {presentation.usesGeographicRing && <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined no longer treats these geographic rings as literal one-, two- or three-hour drives. Texas road networks vary too much for a straight-line radius to make that claim reliably.</p>}
          {!indexReady && <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">This page is available for navigation but remains excluded from search indexing until the source-backed catalog reaches the minimum inventory and geographic-diversity thresholds for this intent.</p>}
        </div>
      </section>

      {results.length > 0 && <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <p className="eyebrow text-primary">Quick shortlist</p>
        <h2 className="mt-3 font-display text-4xl">Start with these nearby options</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {results.slice(0, 6).map((row) => <article key={row.destination.slug} className="border-t border-border pt-5">
            <p className="eyebrow text-muted-foreground">About {Math.round(row.distanceMiles)} geographic miles · {row.destination.nearestTown}{row.destination.county ? ` · ${countyLabel(row.destination.county)}` : ""}</p>
            <h3 className="mt-2 font-display text-2xl"><Link to="/destination/$slug" params={{ slug: row.destination.slug }} className="hover:text-primary">{row.destination.name}</Link></h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{row.destination.summary}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground"><strong>Best season:</strong> {row.destination.bestSeason}</p>
            {row.destination.highlights.length > 0 && <p className="mt-2 text-sm leading-6 text-muted-foreground"><strong>Good for:</strong> {row.destination.highlights.slice(0, 2).join(" · ")}</p>}
          </article>)}
        </div>
      </section>}

      <Suspense fallback={null}>
        <MetroProximityCollectionRich pageData={pageData} />
      </Suspense>
    </main>
  </>;
}
