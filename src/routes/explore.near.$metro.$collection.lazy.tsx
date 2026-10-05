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

type CollegeStationTripGroup = {
  eyebrow: string;
  title: string;
  bestFor: string;
  summary: string;
  preferredNames: string[];
  match: RegExp;
};

const COLLEGE_STATION_DAY_TRIP_GROUPS: CollegeStationTripGroup[] = [
  {
    eyebrow: "Best overall",
    title: "Washington County: Washington-on-the-Brazos + Brenham",
    bestFor: "Texas history, downtown wandering and a flexible half- or full-day",
    summary: "Build one coherent Washington County day instead of treating every museum and historic site as a separate trip. Start with Washington-on-the-Brazos for the independence story, then use Brenham for downtown, food and Blue Bell; add Independence or another county stop only if the day still has room.",
    preferredNames: ["Washington-on-the-Brazos", "Brenham"],
    match: /brenham|washington-on-the-brazos|barrington|star of the republic|independence/i,
  },
  {
    eyebrow: "Closest history trip",
    title: "Navasota + Anderson",
    bestFor: "A shorter outing, stagecoach history and Brazos Valley towns",
    summary: "Pair Navasota with Anderson rather than making either a one-stop drive. Fanthorp Inn gives the trip a strong early-Texas travel story, while Navasota adds a walkable town stop and enough food and local context to make the outing feel complete.",
    preferredNames: ["Navasota", "Fanthorp Inn State Historic Site", "Fanthorp Inn"],
    match: /navasota|fanthorp|anderson/i,
  },
  {
    eyebrow: "Best small-town day",
    title: "Round Top",
    bestFor: "Shops, historic buildings, arts and a slower country drive",
    summary: "Treat Winedale and other nearby attractions as part of a Round Top day, not as isolated destinations. Round Top works best when the town, surrounding countryside and one or two cultural stops are planned together.",
    preferredNames: ["Round Top", "Winedale"],
    match: /round top|winedale/i,
  },
  {
    eyebrow: "Best for Texas history",
    title: "Huntsville",
    bestFor: "Sam Houston history, museums and Piney Woods scenery",
    summary: "Huntsville can support a full day when Sam Houston history is paired with the town and, when weather cooperates, Huntsville State Park. It is a stronger trip when the museum story and the Piney Woods setting are treated as one destination.",
    preferredNames: ["Sam Houston Memorial Museum & Republic of Texas Presidential Library", "Huntsville State Park", "Huntsville"],
    match: /huntsville|sam houston/i,
  },
  {
    eyebrow: "Best outdoors",
    title: "Lake Somerville",
    bestFor: "Paddling, fishing, hiking, camping reconnaissance and an easy water day",
    summary: "Lake Somerville is one of the most natural outdoor escapes from Bryan–College Station. Choose the park or shoreline access that matches the day you want, then check current water, trail and reservation conditions before leaving.",
    preferredNames: ["Lake Somerville", "Lake Somerville State Park & Trailway"],
    match: /somerville/i,
  },
  {
    eyebrow: "Best history + town combo",
    title: "La Grange + Monument Hill",
    bestFor: "Texas history, a courthouse-square town and a scenic overlook",
    summary: "La Grange, Monument Hill and Kreische Brewery belong in the same itinerary. Use the historic site as the anchor, then add downtown La Grange instead of treating three adjacent stops as three separate day-trip recommendations.",
    preferredNames: ["La Grange", "Monument Hill & Kreische Brewery State Historic Site", "Monument Hill"],
    match: /la grange|kreische|monument hill/i,
  },
  {
    eyebrow: "Best nature + town combo",
    title: "Bastrop + the Lost Pines",
    bestFor: "Pine forest, trails, historic downtown and a longer relaxed day",
    summary: "Combine Bastrop State Park with Bastrop itself. The Lost Pines landscape gives the trip its outdoor identity, while downtown and local stops give you a useful heat, weather or trail-condition backup.",
    preferredNames: ["Bastrop State Park", "Bastrop"],
    match: /bastrop|lost pines/i,
  },
  {
    eyebrow: "Best full-day city trip",
    title: "Waco",
    bestFor: "Families, museums, Magnolia and multiple indoor options",
    summary: "Waco should be planned as one city day, not six separate museum trips. Pick one major anchor—Mayborn, Dr Pepper, the Texas Ranger museum, Magnolia or another priority—then add only what comfortably fits around it.",
    preferredNames: ["Waco", "Mayborn Museum Complex", "Dr Pepper Museum", "Magnolia Market"],
    match: /waco|mayborn|dr pepper|magnolia|texas ranger|armstrong browning|texas sports hall/i,
  },
];

function normalizedName(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function collegeStationCuratedTrips(results: MetroProximityResult[]) {
  return COLLEGE_STATION_DAY_TRIP_GROUPS.map((group) => {
    const matching = results.filter((row) => group.match.test([
      row.destination.name,
      row.destination.nearestTown,
      row.destination.slug,
      row.destination.summary,
    ].join(" ")));
    if (!matching.length) return null;
    const preferred = group.preferredNames.map(normalizedName);
    const ranked = [...matching].sort((left, right) => {
      const leftName = normalizedName(left.destination.name);
      const rightName = normalizedName(right.destination.name);
      const leftRank = preferred.indexOf(leftName);
      const rightRank = preferred.indexOf(rightName);
      const normalizedLeftRank = leftRank < 0 ? Number.MAX_SAFE_INTEGER : leftRank;
      const normalizedRightRank = rightRank < 0 ? Number.MAX_SAFE_INTEGER : rightRank;
      return normalizedLeftRank - normalizedRightRank || left.distanceMiles - right.distanceMiles;
    });
    return { group, primary: ranked[0], related: ranked.slice(1, 4) };
  }).filter((value): value is NonNullable<typeof value> => Boolean(value));
}

export function MetroProximityCollectionRich({ pageData }: { pageData: CollectionPageData }) {
  const { metro, collection, results, townReferences, presentation } = pageData;
  const isCollegeStationDayTrips = metro.slug === "college-station" && collection.slug === "day-trips";
  const curatedCollegeStationTrips = isCollegeStationDayTrips ? collegeStationCuratedTrips(results) : [];
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

    {curatedCollegeStationTrips.length > 0 && <section className="border-y border-border bg-surface">
      <Container className="py-14 sm:py-18">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Start here</p>
            <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">The day trips that make the most sense from College Station</h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">These are editorial trip groupings, not a raw nearest-first ranking. They combine nearby attractions that belong in the same outing, reduce duplicate cards for the same town and give each trip a clear reason to choose it.</p>
          </div>
          <div className="border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
            <p><strong>Planning note:</strong> Bryan–College Station traffic changes sharply on major Texas A&amp;M event weekends. Check the actual route before departure, especially when a trip uses SH 6 or passes through the campus area.</p>
          </div>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {curatedCollegeStationTrips.map(({ group, primary, related }, index) => <article key={group.title} className="border-t border-border pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="eyebrow text-primary">{group.eyebrow}</p>
              <p className="text-xs text-muted-foreground">About {Math.round(primary.distanceMiles)} geographic miles to the anchor</p>
            </div>
            <h3 className="mt-3 font-display text-3xl">{group.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-6">{group.bestFor}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{group.summary}</p>
            <div className="mt-6">
              <DestinationCard destination={primary.destination} eager={index < 2} />
            </div>
            {related.length > 0 && <div className="mt-5 border-l border-border pl-4">
              <p className="eyebrow text-muted-foreground">Also in this trip</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                {related.map((row) => <Link key={row.destination.slug} to="/destination/$slug" params={{ slug: row.destination.slug }} className="border-b border-border pb-1 text-sm font-semibold text-primary hover:border-primary">{row.destination.name}</Link>)}
              </div>
            </div>}
            <a href={maps.drivingRouteUrl(metro.center, primary.destination.coordinates)} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Check current drive from College Station ↗</a>
          </article>)}
        </div>
      </Container>
    </section>}

    {mapMarkers.length > 0 && <Container className="py-14 sm:py-18">
      <MapPreview markers={mapMarkers} zoom={7} directionsLabel={`${presentation.label} near ${metro.name}`} origin={metro.center} originLabel={metro.name} />
    </Container>}

    {isCollegeStationDayTrips && <Container className="pb-4 pt-6 sm:pt-10">
      <p className="eyebrow text-primary">More options</p>
      <h2 className="mt-3 max-w-4xl font-display text-4xl">Complete day-trip inventory by geographic distance</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Use this section when you want to browse beyond the curated picks. Individual attractions remain separate here so you can open the exact TexasDefined guide you need.</p>
    </Container>}

    {groups.map((group, groupIndex) => <section key={group.band} className={groupIndex % 2 ? "border-y border-border bg-surface" : ""}>
      <Container className="py-14 sm:py-18">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">{bandLabel(group.band)}</p>
          <h2 className="mt-3 font-display text-4xl">{group.rows.length} full TexasDefined guide{group.rows.length === 1 ? "" : "s"} in this geographic band</h2>
        </div>
        <div className="mt-9 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {group.rows.map((row, index) => <div key={row.destination.slug}>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <p className="eyebrow text-primary">About {Math.round(row.distanceMiles)} geographic miles</p>
              <span className="text-xs text-muted-foreground">{row.destination.nearestTown}</span>
            </div>
            <DestinationCard destination={row.destination} eager={groupIndex === 0 && index < 2} />
            <a href={maps.drivingRouteUrl(metro.center, row.destination.coordinates)} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Check current drive from {metro.name} ↗</a>
          </div>)}
        </div>
      </Container>
    </section>)}

    <Container className="py-16 sm:py-20">
      <div className="grid gap-8 border-t border-border pt-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow text-primary">Before you go</p>
          <h2 className="mt-3 font-display text-3xl">Use geography as a shortlist, then check the real route.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined uses location data to make the statewide catalog easier to search. Open the current driving route for the places you are considering, then verify opening hours, reservations, park alerts, water conditions and weather with the current official source.</p>
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
