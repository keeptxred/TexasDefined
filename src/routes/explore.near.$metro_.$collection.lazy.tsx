import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { MapPreview } from "@/components/editorial/MapPreview";
import { Container } from "@/components/layout/Container";
import { METRO_PROXIMITY_COLLECTIONS, metroProximityTitle } from "@/data/metro-proximity";

export const Route = createLazyFileRoute("/explore/near/$metro/$collection")({ component: MetroProximityCollectionPage });

function bandLabel(band: "close-in" | "easy-day-trip" | "longer-day-trip") {
  if (band === "close-in") return "Close to the metro";
  if (band === "easy-day-trip") return "Easy day-trip range";
  return "Longer day trip";
}

function countySlug(value: string) {
  return value.replace(/\s+County$/i, "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function MetroProximityCollectionPage() {
  const { metro, collection, results, indexReady } = Route.useLoaderData();
  const groups = (["close-in", "easy-day-trip", "longer-day-trip"] as const)
    .map((band) => ({ band, rows: results.filter((row) => row.distanceBand === band) }))
    .filter((group) => group.rows.length > 0);
  const mapMarkers = results.slice(0, 10).map((row) => ({
    id: row.destination.slug,
    label: row.destination.name,
    point: row.destination.coordinates,
    href: `/destination/${row.destination.slug}`,
  }));
  const counties = [...new Set(results
    .map((row) => row.destination.county?.replace(/\s+County$/i, "").trim())
    .filter((value): value is string => Boolean(value)))]
    .slice(0, 10);
  const distanceWindow = collection.minimumMiles > 0
    ? `${collection.minimumMiles}–${collection.radiusMiles} straight-line miles`
    : `Up to ${collection.radiusMiles} straight-line miles`;

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
          <p><span className="eyebrow mr-2 text-muted-foreground">Distance window</span>{distanceWindow}</p>
          <p><span className="eyebrow mr-2 text-muted-foreground">Ordering</span>Approximate distance</p>
        </div>
        <p className="mt-6 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">Distances are straight-line estimates from central {metro.name} used to screen and rank the statewide destination catalog. They are not road miles or drive-time promises; actual routes can be substantially longer or shorter depending on your starting point, traffic and road network.</p>
        {!indexReady && <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">This page is available for navigation but remains excluded from search indexing until the source-backed catalog reaches the minimum inventory and geographic-diversity thresholds for this intent.</p>}
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

    {mapMarkers.length > 0 && <Container className="py-14 sm:py-18">
      <MapPreview markers={mapMarkers} zoom={7} directionsLabel={`${collection.label} near ${metro.name}`} />
    </Container>}

    {groups.map((group, groupIndex) => <section key={group.band} className={groupIndex % 2 ? "border-y border-border bg-surface" : ""}>
      <Container className="py-14 sm:py-18">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">{bandLabel(group.band)}</p>
          <h2 className="mt-3 font-display text-4xl">{group.rows.length} place{group.rows.length === 1 ? "" : "s"} in this distance band</h2>
        </div>
        <div className="mt-9 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
          {counties.length > 0 && <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {counties.map((county) => <Link key={county} to="/county/$slug" params={{ slug: countySlug(county) }} className="eyebrow border-b border-border pb-1 hover:border-primary hover:text-primary">{county} County</Link>)}
          </div>}
        </div>
        <div className="flex flex-col items-start gap-4">
          <Link to="/explore/trip-planner" className="eyebrow border-b border-primary pb-1 text-primary">Build a multi-stop itinerary →</Link>
          <Link to="/explore/near/$metro" params={{ metro: metro.slug }} className="eyebrow border-b border-primary pb-1 text-primary">Back to near {metro.name} →</Link>
        </div>
      </div>
    </Container>
  </>;
}
