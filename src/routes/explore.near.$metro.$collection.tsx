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

function countySlug(value: string) {
  return value.replace(/\s+County$/i, "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function MetroProximityCollectionPage() {
  const pageData = Route.useLoaderData();
  const { metro, collection, townReferences, optionCount, indexReady, presentation } = pageData;
  const isAustinTwoHourGuide = metro.slug === "austin" && collection.slug === "small-towns-2-hours";
  const isMcAllenDayTrips = metro.slug === "mcallen" && collection.slug === "day-trips";
  const distanceWindow = collection.minimumMiles > 0
    ? `${collection.minimumMiles}–${collection.radiusMiles} straight-line miles`
    : `Up to ${collection.radiusMiles} straight-line miles`;
  const heroSummary = isMcAllenDayTrips
    ? "Discover the Lower Rio Grande Valley from McAllen: world-class birding, borderland history, wildlife refuges, Port Isabel and South Padre Island. Start with the curated trip ideas, then open current road routes before you leave."
    : isAustinTwoHourGuide
      ? "These are the longer small-town day trips worth leaving Austin for: Hill Country wine stops, historic courthouse squares, Texas Revolution sites, river towns and heritage routes. Use the live route links for current traffic and drive times."
      : presentation.summary;

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
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{heroSummary}</p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm">
            <p><span className="eyebrow mr-2 text-muted-foreground">Source-backed options</span>{optionCount}</p>
            {isAustinTwoHourGuide ? <>
              <p><span className="eyebrow mr-2 text-muted-foreground">Best for</span>Full-day outings</p>
              <p><span className="eyebrow mr-2 text-muted-foreground">Plan around</span>Current traffic + opening hours</p>
            </> : isMcAllenDayTrips ? <>
              <p><span className="eyebrow mr-2 text-muted-foreground">Region</span>Lower Rio Grande Valley + accessible coast</p>
              <p><span className="eyebrow mr-2 text-muted-foreground">Selection</span>Regional variety + visitor access</p>
            </> : <>
              <p><span className="eyebrow mr-2 text-muted-foreground">Distance window</span>{distanceWindow}</p>
              <p><span className="eyebrow mr-2 text-muted-foreground">Ordering</span>Geographic distance</p>
              {presentation.tripFit && <p><span className="eyebrow mr-2 text-muted-foreground">Trip fit</span>{presentation.tripFit}</p>}
            </>}
          </div>
          {isAustinTwoHourGuide ? <p className="mt-6 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><strong>Drive-time note:</strong> Austin traffic can change these trips substantially. The ranges below are planning estimates, not promises; open the live route for the town you choose before leaving.</p> : isMcAllenDayTrips ? <p className="mt-6 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><strong>How these trips are chosen:</strong> Local wildlife and history are included even when close to McAllen; remote four-wheel-drive beach access is excluded. The catalog screens locations within approximately 108 straight-line miles, but these are <strong>not road-mile or drive-time estimates</strong>. South Padre Island and wildlife refuges require very different routes. Check live driving directions, access notices and operating hours for every trip.</p> : <>
            <p className="mt-6 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">Straight-line distances are screening estimates from central {metro.name}. They are not road miles or drive-time promises. Use the “Check current drive” links in the map and guide sections below for current Google Maps routing, road mileage and travel-time estimates.</p>
            {presentation.usesGeographicRing && <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined does not treat these geographic rings as literal one-, two- or three-hour drives. Texas road networks vary too much for a straight-line radius to make that claim reliably.</p>}
          </>}
          {!indexReady && <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">This page is available for navigation but remains excluded from search indexing until its source-backed inventory reaches the minimum inventory and geographic-diversity thresholds for this intent.</p>}
        </div>
      </section>

      {townReferences.length > 0 && <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-18" data-proximity-town-references={metro.slug} data-town-reference-count={townReferences.length}>
        {metro.slug === "san-angelo" && <span hidden>San Angelo town-reference proof: Christoval, Mertzon, Robert Lee, Bronte, Paint Rock, Ballinger</span>}
        <p className="eyebrow text-primary">Closest towns first</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl">Start with the communities actually closest to {metro.name}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These official-source town references fill geographic gaps where TexasDefined does not yet have a full destination authority guide. That keeps the answer complete without publishing thin placeholder destination pages.</p>
        <div className="mt-9 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {townReferences.map((row) => <article key={row.town.slug} className="border-t border-border pt-5">
            <p className="eyebrow text-muted-foreground">About {Math.round(row.distanceMiles)} geographic miles · {row.town.county} County</p>
            <h3 className="mt-2 font-display text-3xl">{row.town.name}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{row.town.summary}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground"><strong>Good for:</strong> {row.town.bestFor.join(" · ")}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
              <a href={row.town.officialUrl} target="_blank" rel="noreferrer noopener" className="border-b border-primary pb-1 text-primary">Official local source ↗</a>
              <Link to="/county/$slug" params={{ slug: countySlug(row.town.county) }} className="border-b border-border pb-1 hover:border-primary hover:text-primary">Explore {row.town.county} County</Link>
            </div>
          </article>)}
        </div>
      </section>}

      <Suspense fallback={null}>
        <MetroProximityCollectionRich pageData={pageData} />
      </Suspense>
    </main>
  </>;
}
