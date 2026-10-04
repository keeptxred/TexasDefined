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

    {mapMarkers.length > 0 && <Container className="py-14 sm:py-18">
      <MapPreview markers={mapMarkers} zoom={7} directionsLabel={`${presentation.label} near ${metro.name}`} origin={metro.center} originLabel={metro.name} />
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
