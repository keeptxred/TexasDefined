import { lazy, Suspense } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { countyNames, countySlug } from "@/data/metro-county-links";
import { getMetroProximityCollectionPageData } from "@/data/metro-proximity-page-data.functions";
import { dallasDriveLabel, getDallasSmallTownDrive, DALLAS_DRIVES_VERIFIED_AT } from "@/data/dallas-small-town-drives";

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



function MetroProximityCollectionPage() {
  const pageData = Route.useLoaderData();
  const { metro, collection, townReferences, optionCount, indexReady, presentation } = pageData;
  const isDallasRoadRing = metro.slug === "dallas" && /^small-towns-[123]-hours?$/.test(collection.slug);
  const isAustinTwoHourGuide = metro.slug === "austin" && collection.slug === "small-towns-2-hours";
  const isMcAllenDayTrips = metro.slug === "mcallen" && collection.slug === "day-trips";
  const distanceWindow = collection.minimumMiles > 0
    ? `${collection.minimumMiles}–${collection.radiusMiles} straight-line miles`
    : `Up to ${collection.radiusMiles} straight-line miles`;
  const heroSummary = isDallasRoadRing
    ? "Real road-trip choices, not circles drawn on a map. These towns are grouped by published typical Dallas driving-time estimates, with official tourism links, a destination map and live route checks for the day you travel."
    : isMcAllenDayTrips
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
            {isMcAllenDayTrips ? <><p><span className="eyebrow mr-2 text-muted-foreground">Featured outings</span>10 curated choices</p><p><span className="eyebrow mr-2 text-muted-foreground">Further reading</span>Additional researched places below</p></> : <p><span className="eyebrow mr-2 text-muted-foreground">Source-backed options</span>{optionCount}</p>}
            {isDallasRoadRing ? <>
              <p><span className="eyebrow mr-2 text-muted-foreground">Drive-time window</span>{collection.slug === "small-towns-1-hour" ? "Up to about 1 hour" : collection.slug === "small-towns-2-hours" ? "About 1–2 hours" : "About 2–3 hours"}</p>
              <p><span className="eyebrow mr-2 text-muted-foreground">Ordered by</span>Published typical road time</p>
              <p><span className="eyebrow mr-2 text-muted-foreground">Source checked</span>{DALLAS_DRIVES_VERIFIED_AT}</p>
            </> : isAustinTwoHourGuide ? <>
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
          {isDallasRoadRing ? <p className="mt-6 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><strong>Planning estimates, not live traffic:</strong> The hour bands are based on sourced typical driving durations from Dallas—not straight-line mile radii. Congestion, weather and where you begin in DFW can change the actual trip. Each town links to its published estimate and current turn-by-turn driving route; always check both before leaving.</p> : isAustinTwoHourGuide ? <p className="mt-6 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><strong>Drive-time note:</strong> Austin traffic can change these trips substantially. The ranges below are planning estimates, not promises; open the live route for the town you choose before leaving.</p> : isMcAllenDayTrips ? <p className="mt-6 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><strong>How these trips are chosen:</strong> Local wildlife and history are included even when close to McAllen; remote four-wheel-drive beach access is excluded. The catalog screens locations within approximately 108 straight-line miles, but these are <strong>not road-mile or drive-time estimates</strong>. South Padre Island and wildlife refuges require very different routes. Check live driving directions, access notices and operating hours for every trip.</p> : <>
            <p className="mt-6 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">Straight-line distances are screening estimates from central {metro.name}. They are not road miles or drive-time promises. Use the “Check current drive” links in the map and guide sections below for current Google Maps routing, road mileage and travel-time estimates.</p>
            {presentation.usesGeographicRing && <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined does not treat these geographic rings as literal one-, two- or three-hour drives. Texas road networks vary too much for a straight-line radius to make that claim reliably.</p>}
          </>}
          {isMcAllenDayTrips && <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground" data-mcallen-starter-guides>
            <strong>Two nearby starts:</strong> For morning birding, explore <Link to="/destination/$slug" params={{ slug: "santa-ana-national-wildlife-refuge" }} className="font-semibold text-primary underline underline-offset-4">Santa Ana National Wildlife Refuge</Link> near Alamo. For an indoor history stop, visit the <Link to="/destination/$slug" params={{ slug: "museum-of-south-texas-history-edinburg" }} className="font-semibold text-primary underline underline-offset-4">Museum of South Texas History</Link> in Edinburg. Check visitor hours and access before you drive.
          </p>}
          {!indexReady && <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">This page is available for navigation but remains excluded from search indexing until its source-backed inventory reaches the minimum inventory and geographic-diversity thresholds for this intent.</p>}
        </div>
      </section>

      {isDallasRoadRing && collection.slug === "small-towns-1-hour" && <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2">
        <figure>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Ellis_County_Courthouse%2C_Waxahachie%2C_Texas_%286884671962%29.jpg"
            alt="Red sandstone Ellis County Courthouse and clock tower in downtown Waxahachie, Texas"
            loading="lazy" decoding="async" width={1280} height={990}
            className="aspect-[4/3] w-full object-cover"
          />
          <figcaption className="mt-2 text-xs leading-6 text-muted-foreground">Ellis County Courthouse, Waxahachie · <a href="https://commons.wikimedia.org/wiki/File:Ellis_County_Courthouse,_Waxahachie,_Texas_(6884671962).jpg" target="_blank" rel="noreferrer noopener" className="underline">Nicolas Henderson / Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noreferrer noopener" className="underline">CC BY 2.0</a> (original cropped and adjusted on Commons).</figcaption>
        </figure>
        <div>
          <p className="eyebrow text-primary">An easy first escape</p>
          <h2 className="mt-3 font-display text-4xl">Start with a walkable courthouse square</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">Waxahachie makes a strong short-trip choice for preserved architecture, cafes and independent shops. Ennis is better when bluebonnets are in season, while Canton is the option for a scheduled market weekend. Choose one place with enough time to enjoy it—these are not a single looping route.</p>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">Visitor advice: seasonal festivals and museums keep their own hours. Use the official tourism links for event dates, then open your Dallas driving route for current traffic.</p>
        </div>
      </section>}

      {townReferences.length > 0 && <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-18" data-proximity-town-references={metro.slug} data-town-reference-count={townReferences.length}>
        {metro.slug === "san-angelo" && <span hidden>San Angelo town-reference proof: Christoval, Mertzon, Robert Lee, Bronte, Paint Rock, Ballinger</span>}
        <p className="eyebrow text-primary">{isDallasRoadRing ? "More researched town options" : "Closest towns first"}</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl">{isDallasRoadRing ? "Towns to consider for your Dallas road trip" : `Start with the communities actually closest to ${metro.name}`}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These official-source town references fill gaps where TexasDefined does not yet have a full destination authority guide. They are real visitor resources, not thin placeholder destination pages.</p>
        <div className="mt-9 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {townReferences.map((row) => <article key={row.town.slug} className="border-t border-border pt-5">
            <p className="eyebrow text-muted-foreground">{isDallasRoadRing && getDallasSmallTownDrive(row.town.slug) ? dallasDriveLabel(getDallasSmallTownDrive(row.town.slug)!.minutes) + " estimated drive" : `About ${Math.round(row.distanceMiles)} geographic miles`} · {row.town.county} County</p>
            <h3 className="mt-2 font-display text-3xl">{row.town.name}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{row.town.summary}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground"><strong>Good for:</strong> {row.town.bestFor.join(" · ")}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
              <a href={row.town.officialUrl} target="_blank" rel="noreferrer noopener" className="border-b border-primary pb-1 text-primary">Official local source ↗</a>
              <a href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(metro.name + ", Texas")}&destination=${encodeURIComponent(row.town.name + ", Texas")}&travelmode=driving`} target="_blank" rel="noreferrer noopener" className="border-b border-primary pb-1 text-primary">Check live drive ↗</a>
              {isDallasRoadRing && getDallasSmallTownDrive(row.town.slug) && <a href={getDallasSmallTownDrive(row.town.slug)!.sourceUrl} target="_blank" rel="noreferrer noopener" className="border-b border-border pb-1">Driving-time source ↗</a>}
              {countyNames(row.town.county).length === 1 ? <Link to="/county/$slug" params={{ slug: countySlug(row.town.county)! }} className="border-b border-border pb-1 hover:border-primary hover:text-primary">Explore {row.town.county.replace(/\s+County$/i, "")} County</Link> : <Link to="/browse/counties" className="border-b border-border pb-1 hover:border-primary hover:text-primary">Browse these counties →</Link>}
            </div>
          </article>)}
        </div>
      </section>}

      <Suspense fallback={null}>
        <MetroProximityCollectionRich pageData={pageData} />
      </Suspense>
      {isMcAllenDayTrips && <div data-stay-nearby-slot aria-label="Optional hotels and rentals for longer McAllen trips" />}
    </main>
  </>;
}
