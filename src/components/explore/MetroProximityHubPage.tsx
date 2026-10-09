import { Link } from "@tanstack/react-router";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Container } from "@/components/layout/Container";
import type {
  MetroProximityCollection,
  MetroProximityMetro,
  MetroProximityResult,
} from "@/data/metro-proximity";
import { metroProximityCollectionPresentation } from "@/data/metro-proximity-presentation";
import { MCALLEN_WBC_SITES, MCALLEN_WBC_SOURCES } from "@/data/mcallen-world-birding-center";

type HubPageData = {
  metro: MetroProximityMetro;
  collections: Array<{
    collection: MetroProximityCollection;
    results: MetroProximityResult[];
    optionCount: number;
    indexReady: boolean;
  }>;
  highlights: MetroProximityResult[];
  title: string;
};

export function MetroProximityHubPage({ pageData }: { pageData: HubPageData }) {
  const { metro, collections, highlights } = pageData;

  return <main>
    <div className="mx-auto w-full max-w-7xl px-5 pt-10 sm:px-8 sm:pt-14">
      <nav aria-label="Breadcrumb" className="eyebrow text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
          <li aria-hidden>·</li>
          <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li>
          <li aria-hidden>·</li>
          <li aria-current="page" className="text-foreground">Near {metro.name}</li>
        </ol>
      </nav>
    </div>

    <section className="mt-5 border-y border-border bg-surface">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="eyebrow text-primary">{metro.regionLabel} drive market</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{pageData.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{metro.context}</p>
        <p className="mt-7 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">TexasDefined ranks these nearby guides with destination coordinates and source-backed place records. Mileages are straight-line geographic estimates for comparison, not promised driving distances or travel times. The destination-ring pages link directly to current driving routes from central {metro.name}.</p>
      </div>
    </section>

    {metro.slug === "mcallen" && <section className="border-b border-border" aria-labelledby="mcallen-world-birding-center">
      <Container className="py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="eyebrow text-primary">A Lower Rio Grande Valley specialty · Official-source visitor guide</p>
            <h2 id="mcallen-world-birding-center" className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Nine World Birding Center sites. Nine different ways to explore the Valley.</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">Texas Parks & Wildlife identifies three state parks and six community-operated locations in the nine-site World Birding Center network. They are not interchangeable: the western river bluffs, McAllen thornforest, irrigation-history museum, inland wetlands, Harlingen woodlands and coast each reward a different kind of visit.</p>
          </div>
          <div className="border-l-2 border-primary pl-5">
            <p className="eyebrow text-muted-foreground">Start with the experience</p>
            <p className="mt-3 text-sm leading-7">Short on time? Stay near McAllen or Mission. Want waterbirds? Compare Edinburg and Weslaco. For an all-day coast outing, use Brownsville or South Padre as your anchor. The nine sites are spread across the Valley, not a single walkable park.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {MCALLEN_WBC_SITES.map((site, index) => <article key={site.name} className="border-t border-border pt-5">
            <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · {site.location}</p>
            <h3 className="mt-3 font-display text-2xl">{site.name}</h3>
            <p className="mt-3 text-sm font-semibold">{site.fit}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{site.plan}</p>
            <p className="mt-4 border-l-2 border-border pl-4 text-sm leading-6"><strong>Before you go:</strong> {site.before}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
              {site.name.startsWith("Old Hidalgo Pumphouse") && <Link to="/destination/$slug" params={{ slug: "old-hidalgo-pumphouse-museum" }} className="border-b border-primary pb-1 text-primary hover:underline">Explore the historic pumphouse guide →</Link>}
              <a href={site.official} target="_blank" rel="noreferrer noopener" className="border-b border-border pb-1 hover:text-primary">Current official visitor information ↗</a>
            </div>
          </article>)}
        </div>

        <div className="mt-12 grid gap-7 border-y border-border py-8 lg:grid-cols-3">
          <div>
            <h3 className="font-display text-2xl">Easy McAllen area day</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Try Quinta Mazatlán in the morning and the Old Hidalgo Pumphouse later, provided both are open. It pairs native habitat with a story of how irrigation changed the Valley.</p>
          </div>
          <div>
            <h3 className="font-display text-2xl">Wetlands comparison day</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Choose Edinburg Scenic Wetlands or Estero Llano Grande as your main stop. Their ponds and observation areas are excellent alternatives to a rush through distant attractions.</p>
          </div>
          <div>
            <h3 className="font-display text-2xl">Coastal or western full day</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Pick one direction: Roma Bluffs and historic Roma to the west, or Resaca de la Palma and the South Padre coast to the east. Allow extra road time and recheck any park closures.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h3 className="font-display text-2xl">Methodology and source verification</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Site identities come from the Texas Parks & Wildlife World Birding Center network guide, checked against current state, municipal, federal and operator websites on October 9, 2026. This is an editorial planning comparison, not a promise that every trail or visitor center is open. It does not invent road-mile or driving-time estimates. Hours, park alerts, tram operations, parking and weather can change; use each operator's official page before traveling.</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <a href={MCALLEN_WBC_SOURCES.network} target="_blank" rel="noreferrer noopener" className="border-b border-border pb-1 hover:text-primary">TPWD nine-site network source ↗</a>
              <a href={MCALLEN_WBC_SOURCES.lowerCoast} target="_blank" rel="noreferrer noopener" className="border-b border-border pb-1 hover:text-primary">Coastal Birding Trail loops ↗</a>
              <a href={MCALLEN_WBC_SOURCES.federalValley} target="_blank" rel="noreferrer noopener" className="border-b border-border pb-1 hover:text-primary">Federal refuge access guidance ↗</a>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <Link to="/explore/near/$metro/$collection" params={{ metro: "mcallen", collection: "day-trips" }} className="eyebrow border-b border-primary pb-1 text-primary">Compare McAllen day-trip itineraries →</Link>
            <Link to="/county/$slug" params={{ slug: "hidalgo" }} className="eyebrow border-b border-border pb-1 hover:text-primary">Hidalgo County visitor guide →</Link>
            <Link to="/county/$slug" params={{ slug: "cameron" }} className="eyebrow border-b border-border pb-1 hover:text-primary">Cameron County visitor guide →</Link>
            <Link to="/county/$slug" params={{ slug: "starr" }} className="eyebrow border-b border-border pb-1 hover:text-primary">Starr County visitor guide →</Link>
          </div>
        </div>
      </Container>
    </section>}

    <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
      <p className="eyebrow text-primary">Explore by trip type</p>
      <h2 className="mt-3 font-display text-4xl">Choose the kind of escape you want</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {collections.map(({ collection, optionCount }) => {
          const presentation = metroProximityCollectionPresentation(collection);
          return <article key={collection.slug} className="border-t border-border pt-5">
            <p className="eyebrow text-muted-foreground">{optionCount} source-backed options</p>
            <h3 className="mt-2 font-display text-2xl"><Link to="/explore/near/$metro/$collection" params={{ metro: metro.slug, collection: collection.slug }} className="hover:text-primary">{presentation.label}</Link></h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{presentation.summary}</p>
          </article>;
        })}
      </div>
    </section>

    {highlights.length > 0 && <section className="border-t border-border bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Start with these</p>
          <h2 className="mt-3 font-display text-4xl">Nearby places worth opening first</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">These are not paid rankings. They are a cross-section of the closest source-backed destinations across the nearby collections above.</p>
        </div>
        <div className="mt-9 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.slice(0, 9).map((row, index) => <div key={row.destination.slug}>
            <p className="eyebrow mb-3 text-muted-foreground">About {Math.round(row.distanceMiles)} geographic miles</p>
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
  </main>;
}
