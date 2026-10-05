import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { MapPreview } from "@/components/editorial/MapPreview";
import { Container } from "@/components/layout/Container";
import {
  METRO_PROXIMITY_COLLECTIONS,
  type MetroProximityCollection,
  type MetroProximityMetro,
  type MetroProximityResult,
} from "@/data/metro-proximity";
import { metroProximityCollectionPresentation } from "@/data/metro-proximity-presentation";
import type { MetroProximityTownResult } from "@/data/metro-proximity-town-references";
import { maps } from "@/services/maps";

export const Route = createLazyFileRoute("/explore/near/$metro/$collection")({});

type CollectionPageData = {
  metro: MetroProximityMetro;
  collection: MetroProximityCollection;
  results: MetroProximityResult[];
  townReferences: MetroProximityTownResult[];
  optionCount: number;
  indexReady: boolean;
  presentation: {
    label: string;
    navLabel: string;
    titlePrefix: string;
    summary: string;
    searchIntent: string;
    tripFit: string | null;
    usesGeographicRing: boolean;
  };
};

function bandLabel(band: "close-in" | "easy-day-trip" | "longer-day-trip") {
  if (band === "close-in") return "Close to the metro";
  if (band === "easy-day-trip") return "Easy day-trip range";
  return "Longer day trip";
}

function countySlug(value: string) {
  return value.replace(/\s+County$/i, "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}


type AustinTownEditorial = {
  drive: string;
  bestFor: string;
  trip: string;
  note: string;
};

const AUSTIN_TWO_HOUR_EDITORIAL: Record<string, AustinTownEditorial> = {
  "johnson-city": { drive: "about 60–80 min", bestFor: "LBJ history + wineries", trip: "Easy full day", note: "Pair the presidential-history layer with the Highway 290 wine corridor instead of treating Johnson City as only a pass-through." },
  "hye": { drive: "about 65–85 min", bestFor: "Wine + distillery country", trip: "Couples / tasting day", note: "A tiny Hill Country stop that works best as part of a Johnson City–Hye tasting route rather than a stand-alone all-day town visit." },
  "new-braunfels": { drive: "about 55–80 min", bestFor: "Rivers + historic Gruene", trip: "Family / outdoors", note: "Build the day around the Comal or Guadalupe, then add Gruene for music, history and a walkable second act." },
  "llano": { drive: "about 75–95 min", bestFor: "River + courthouse-town character", trip: "Outdoors / relaxed day", note: "The Llano River and historic core make this one of the strongest choices when you want scenery without committing to a highly scheduled itinerary." },
  "lampasas": { drive: "about 70–90 min", bestFor: "Springs + historic downtown", trip: "Low-key day trip", note: "A good northwestern option for travelers who want a courthouse town, mineral-springs history and a slower pace." },
  "gonzales": { drive: "about 75–95 min", bestFor: "Texas Revolution history", trip: "History day", note: "Choose Gonzales when the story of Texas independence is the reason for the drive; give the museum and historic district enough time to matter." },
  "la-grange": { drive: "about 75–95 min", bestFor: "Courthouse + Czech/German heritage", trip: "Heritage day", note: "La Grange is a useful cultural anchor for Fayette County and pairs naturally with the Painted Churches country farther south." },
  "fredericksburg": { drive: "about 85–110 min", bestFor: "Main Street + wine + museums", trip: "Full day / overnight", note: "Fredericksburg has enough depth for its own full day: Main Street, the National Museum of the Pacific War, wine country and nearby Enchanted Rock." },
  "schulenburg": { drive: "about 85–105 min", bestFor: "Painted Churches + heritage", trip: "Culture / architecture", note: "The strongest reason to choose Schulenburg is the surrounding Painted Churches route—one of the most distinctive cultural day trips in Central Texas." },
  "shiner": { drive: "about 90–115 min", bestFor: "Brewery + small-town heritage", trip: "Food / culture", note: "Use the brewery as an anchor, then leave time for the town itself and the broader Lavaca County heritage landscape." },
  "comfort": { drive: "about 95–120 min", bestFor: "Quiet historic Hill Country", trip: "Couples / overnight", note: "Comfort rewards a slower day built around its historic district, local businesses and the less-commercial side of the Hill Country." },
};

function austinEditorial(slug: string) {
  return AUSTIN_TWO_HOUR_EDITORIAL[slug];
}

export function MetroProximityCollectionRich({ pageData }: { pageData: CollectionPageData }) {
  const { metro, collection, results, townReferences, presentation } = pageData;
  const groups = (["close-in", "easy-day-trip", "longer-day-trip"] as const)
    .map((band) => ({ band, rows: results.filter((row) => row.distanceBand === band) }))
    .filter((group) => group.rows.length > 0);
  const mapMarkers = [
    ...townReferences.map((row) => ({ id: `town-${row.town.slug}`, label: row.town.name, point: row.town.coordinates, href: `/county/${countySlug(row.town.county)}`, distanceMiles: row.distanceMiles })),
    ...results.map((row) => ({ id: row.destination.slug, label: row.destination.name, point: row.destination.coordinates, href: `/destination/${row.destination.slug}`, distanceMiles: row.distanceMiles })),
  ]
    .sort((left, right) => left.distanceMiles - right.distanceMiles)
    .map(({ distanceMiles: _distanceMiles, ...marker }) => marker);
  const counties = [...new Set([
    ...townReferences.map((row) => row.town.county.replace(/\s+County$/i, "").trim()),
    ...results.map((row) => row.destination.county?.replace(/\s+County$/i, "").trim()).filter((value): value is string => Boolean(value)),
  ])].slice(0, 12);
  const isAustinTwoHourGuide = metro.slug === "austin" && collection.slug === "small-towns-2-hours";
  const austinRows = isAustinTwoHourGuide
    ? results.filter((row) => austinEditorial(row.destination.slug))
    : [];
  const availableAustinSlugs = new Set(austinRows.map((row) => row.destination.slug));
  const austinItineraries = [
    {
      title: "Wine country without overloading the day",
      towns: ["johnson-city", "hye"],
      body: "Start with LBJ-era history in Johnson City, then continue west through Hye for tasting-room or distillery stops. Reserve anything time-specific before leaving Austin.",
    },
    {
      title: "Courthouse + Painted Churches heritage route",
      towns: ["la-grange", "schulenburg"],
      body: "Use La Grange for the courthouse-square and regional history layer, then continue toward Schulenburg for the Painted Churches corridor.",
    },
    {
      title: "Make Fredericksburg the whole destination",
      towns: ["fredericksburg"],
      body: "Main Street, the Pacific War museum, wine country and nearby outdoor options are enough for a full day; an overnight keeps the itinerary from becoming a windshield tour.",
    },
  ].filter((item) => item.towns.every((slug) => availableAustinSlugs.has(slug)));

  return <>
    <Container className="py-14 sm:py-18">
      <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-border pb-6">
        <Link to="/explore/near/$metro" params={{ metro: metro.slug }} className="eyebrow border-b border-primary pb-1 text-primary">All near {metro.name}</Link>
        {METRO_PROXIMITY_COLLECTIONS.filter((item) => item.slug !== collection.slug).map((item) => {
          const itemPresentation = metroProximityCollectionPresentation(item);
          return <Link key={item.slug} to="/explore/near/$metro/$collection" params={{ metro: metro.slug, collection: item.slug }} className="eyebrow border-b border-border pb-1 hover:border-primary hover:text-primary">{itemPresentation.navLabel}</Link>;
        })}
      </div>
    </Container>

    {isAustinTwoHourGuide && austinRows.length > 0 && <section className="border-b border-border">
      <Container className="py-14 sm:py-18">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-primary">Choose the trip, not the radius</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">Which Austin small-town day trip fits your day?</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">The useful question is not which town falls inside a geometric ring. It is what you want the day to feel like. These planning ranges are deliberately approximate; Austin traffic, construction and your exact starting point can move them substantially.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">Wine + Hill Country</p><p className="mt-2 text-sm leading-6">Johnson City, Hye and Fredericksburg are the strongest choices when tasting rooms, Main Street and Hill Country scenery are the point.</p></div>
            <div className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">Texas history</p><p className="mt-2 text-sm leading-6">Gonzales, La Grange and Fredericksburg give the trip a museum, courthouse or major heritage anchor instead of generic sightseeing.</p></div>
            <div className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">Water + outdoors</p><p className="mt-2 text-sm leading-6">New Braunfels and Llano work best when river time, parks or an outdoor second half matter more than shopping.</p></div>
            <div className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">Quiet small-town pace</p><p className="mt-2 text-sm leading-6">Comfort, Lampasas and Shiner make better fits when you want a slower main street, local history and fewer scheduled stops.</p></div>
          </div>
        </div>

        <div className="mt-10 overflow-x-auto border-y border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 pr-6 font-semibold">Town</th>
                <th className="px-4 py-4 font-semibold">Planning drive</th>
                <th className="px-4 py-4 font-semibold">Best for</th>
                <th className="px-4 py-4 font-semibold">Trip fit</th>
                <th className="py-4 pl-4 font-semibold">Live route</th>
              </tr>
            </thead>
            <tbody>
              {austinRows.map((row) => {
                const editorial = austinEditorial(row.destination.slug)!;
                return <tr key={row.destination.slug} className="border-b border-border last:border-0">
                  <td className="py-4 pr-6"><Link to="/destination/$slug" params={{ slug: row.destination.slug }} className="font-semibold hover:text-primary">{row.destination.name}</Link></td>
                  <td className="px-4 py-4 text-muted-foreground">{editorial.drive}</td>
                  <td className="px-4 py-4">{editorial.bestFor}</td>
                  <td className="px-4 py-4 text-muted-foreground">{editorial.trip}</td>
                  <td className="py-4 pl-4"><a href={maps.drivingRouteUrl(metro.center, row.destination.coordinates)} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline-offset-4 hover:underline">Check drive ↗</a></td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-4xl text-xs leading-6 text-muted-foreground">Planning-drive ranges are editorial estimates from central Austin for choosing among trips, not live traffic predictions. Always open the current route before departure.</p>
      </Container>
    </section>}

    {mapMarkers.length > 0 && <Container className="py-14 sm:py-18">
      <MapPreview markers={mapMarkers} zoom={7} directionsLabel={`${presentation.label} near ${metro.name}`} origin={metro.center} originLabel={metro.name} />
    </Container>}

    {groups.map((group, groupIndex) => <section key={group.band} className={groupIndex % 2 ? "border-y border-border bg-surface" : ""}>
      <Container className="py-14 sm:py-18">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">{isAustinTwoHourGuide ? "Town guides" : bandLabel(group.band)}</p>
          <h2 className="mt-3 font-display text-4xl">{isAustinTwoHourGuide ? `${group.rows.length} places worth building a day around` : `${group.rows.length} full TexasDefined guide${group.rows.length === 1 ? "" : "s"} in this geographic band`}</h2>
        </div>
        <div className="mt-9 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {group.rows.map((row, index) => <div key={row.destination.slug}>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <p className="eyebrow text-primary">{isAustinTwoHourGuide && austinEditorial(row.destination.slug) ? austinEditorial(row.destination.slug)!.drive : `About ${Math.round(row.distanceMiles)} geographic miles`}</p>
              <span className="text-xs text-muted-foreground">{row.destination.nearestTown}</span>
            </div>
            <DestinationCard destination={row.destination} eager={groupIndex === 0 && index < 2} />
            {isAustinTwoHourGuide && austinEditorial(row.destination.slug) && <div className="mt-4 border-l-2 border-border pl-4">
              <p className="text-sm font-semibold">{austinEditorial(row.destination.slug)!.bestFor}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{austinEditorial(row.destination.slug)!.note}</p>
            </div>}
            <a href={maps.drivingRouteUrl(metro.center, row.destination.coordinates)} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Check current drive from {metro.name} ↗</a>
          </div>)}
        </div>
      </Container>
    </section>)}

    {isAustinTwoHourGuide && austinItineraries.length > 0 && <section className="border-y border-border bg-surface">
      <Container className="py-14 sm:py-18">
        <p className="eyebrow text-primary">Ready-made routes</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl">Three ways to turn the list into an actual Austin day trip</h2>
        <div className="mt-9 grid gap-8 md:grid-cols-3">
          {austinItineraries.map((item) => <article key={item.title} className="border-t border-border pt-5">
            <h3 className="font-display text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {item.towns.map((slug) => {
                const row = austinRows.find((candidate) => candidate.destination.slug === slug);
                return row ? <Link key={slug} to="/destination/$slug" params={{ slug }} className="eyebrow border-b border-primary pb-1 text-primary">{row.destination.name} →</Link> : null;
              })}
            </div>
          </article>)}
        </div>
        {(availableAustinSlugs.has("schulenburg") || availableAustinSlugs.has("la-grange")) && <a href="/explore/painted-churches" className="eyebrow mt-8 inline-block border-b border-primary pb-1 text-primary">Explore the Painted Churches authority guide →</a>}
      </Container>
    </section>}

    <Container className="py-16 sm:py-20">
      <div className="grid gap-8 border-t border-border pt-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow text-primary">Before you go</p>
          <h2 className="mt-3 font-display text-3xl">{isAustinTwoHourGuide ? "Pick the town first. Then let the live route decide the departure time." : "Use geography as a shortlist, then check the real route."}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{isAustinTwoHourGuide ? "Austin-area traffic can add meaningful time, especially on I-35 and on Friday or Sunday travel periods. After choosing the experience you want, open the current route and verify attraction hours, reservations, weather and any park or river conditions before you leave." : "TexasDefined uses location data to make the statewide catalog easier to search. Open the current driving route for the places you are considering, then verify opening hours, reservations, park alerts, water conditions and weather with the current official source."}</p>
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
