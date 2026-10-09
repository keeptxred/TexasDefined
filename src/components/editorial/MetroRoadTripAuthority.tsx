import { Link } from "@tanstack/react-router";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { MapPreview } from "@/components/editorial/MapPreview";
import { Container } from "@/components/layout/Container";
import type { MetroProximityCollection, MetroProximityMetro, MetroProximityResult } from "@/data/metro-proximity";
import { METRO_PROXIMITY_COLLECTIONS } from "@/data/metro-proximity";
import { metroProximityCollectionPresentation } from "@/data/metro-proximity-presentation";
import { maps } from "@/services/maps";

type Props = {
  metro: MetroProximityMetro;
  collection: MetroProximityCollection;
  results: MetroProximityResult[];
};

function liveLoopUrl(metro: MetroProximityMetro, rows: MetroProximityResult[]) {
  const origin = metro.center.lat + "," + metro.center.lng;
  const params = new URLSearchParams({
    api: "1",
    origin,
    destination: origin,
    travelmode: "driving",
  });
  params.set("waypoints", rows.map((row) => row.destination.coordinates.lat + "," + row.destination.coordinates.lng).join("|"));
  return "https://www.google.com/maps/dir/?" + params.toString();
}

function buildPlans(results: MetroProximityResult[]) {
  const unique = (rows: MetroProximityResult[]) =>
    rows.filter((row, index, all) => all.findIndex((candidate) => candidate.destination.slug === row.destination.slug) === index);
  const categoryRows = (categories: string[]) => results.filter((row) => categories.includes(row.destination.category));

  const mixed: MetroProximityResult[] = [];
  const seenCategories = new Set<string>();
  for (const row of results) {
    if (seenCategories.has(row.destination.category)) continue;
    mixed.push(row);
    seenCategories.add(row.destination.category);
    if (mixed.length === 3) break;
  }

  const candidates = [
    {
      kicker: "Easy sampler",
      title: "Closest multi-stop loop",
      rows: results.slice(0, 3),
      fit: "Half day to full day",
      summary: "Use the nearest strong anchors for a lower-commitment loop, then let the live map determine the exact road order and drive time.",
    },
    {
      kicker: "Outdoors",
      title: "Parks, water & scenery route",
      rows: categoryRows(["state-parks", "national-parks", "lakes-rivers", "major-springs", "caverns"]).slice(0, 3),
      fit: "Full day",
      summary: "A route built around outdoor anchors rather than town collecting. Verify park hours, reservations, water conditions and weather before departure.",
    },
    {
      kicker: "History & towns",
      title: "Historic stops & small-town loop",
      rows: categoryRows(["historic-sites", "small-towns"]).slice(0, 3),
      fit: "Full day",
      summary: "A slower route for courthouse squares, historic districts and cultural stops where the time out of the car matters more than total mileage.",
    },
    {
      kicker: "Variety",
      title: "Mixed-interest circuit",
      rows: mixed,
      fit: "Full day",
      summary: "This route mixes different destination types so the day changes character instead of repeating the same kind of stop.",
    },
    {
      kicker: "Longer escape",
      title: "Farther-out road trip",
      rows: [...results].sort((a, b) => b.distanceMiles - a.distanceMiles).slice(0, 3).reverse(),
      fit: "Long day or overnight",
      summary: "Use the outer edge of the collection for a longer drive or overnight. Road mileage may differ sharply from straight-line distance, so check the live route first.",
    },
  ];

  const seen = new Set<string>();
  return candidates
    .map((candidate) => ({ ...candidate, rows: unique(candidate.rows) }))
    .filter((candidate) => candidate.rows.length >= 2)
    .filter((candidate) => {
      const key = candidate.rows.map((row) => row.destination.slug).join("|");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 5);
}

export function MetroRoadTripAuthority({ metro, collection, results }: Props) {
  const plans = buildPlans(results);
  const mapMarkers = results.map((row) => ({
    id: row.destination.slug,
    label: row.destination.name,
    point: row.destination.coordinates,
    href: "/destination/" + row.destination.slug,
  }));
  const farthest = results.reduce((max, row) => Math.max(max, row.distanceMiles), 0);

  return <>
    <Container className="py-12 sm:py-16">
      <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-border pb-6">
        <Link to="/explore/near/$metro" params={{ metro: metro.slug }} className="eyebrow border-b border-primary pb-1 text-primary">All near {metro.name}</Link>
        {METRO_PROXIMITY_COLLECTIONS.filter((item) => item.slug !== collection.slug).map((item) => {
          const presentation = metroProximityCollectionPresentation(item);
          return <Link key={item.slug} to="/explore/near/$metro/$collection" params={{ metro: metro.slug, collection: item.slug }} className="eyebrow border-b border-border pb-1 hover:border-primary hover:text-primary">{presentation.navLabel}</Link>;
        })}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className="eyebrow text-primary">Road-trip planning from {metro.name}</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Build a route, not a list of pins.</h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">This page uses source-backed places in TexasDefined's {metro.regionLabel} collection to build practical multi-stop route ideas. The sequence is a planning starting point, not a claim about the fastest road order.</p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">Straight-line distance is used only to screen the regional inventory. Open the live multi-stop route before leaving to see current road mileage and travel time.</p>
        </div>
        <div className="border-l-2 border-primary pl-6">
          <p className="eyebrow text-primary">At a glance</p>
          <div className="mt-4 grid grid-cols-2 gap-5 text-sm">
            <div><p className="eyebrow text-muted-foreground">Route ideas</p><p className="mt-1 text-lg font-semibold">{plans.length}</p></div>
            <div><p className="eyebrow text-muted-foreground">Route anchors</p><p className="mt-1 text-lg font-semibold">{results.length}</p></div>
            <div><p className="eyebrow text-muted-foreground">Geographic reach</p><p className="mt-1 text-lg font-semibold">Up to {Math.round(farthest)} mi</p></div>
            <div><p className="eyebrow text-muted-foreground">Actual drive</p><p className="mt-1 text-lg font-semibold">Check live</p></div>
          </div>
        </div>
      </div>
    </Container>

    {mapMarkers.length > 0 && <Container className="pb-10 sm:pb-14">
      <MapPreview markers={mapMarkers} zoom={7} directionsLabel={"Road-trip anchors near " + metro.name} origin={metro.center} originLabel={metro.name} />
    </Container>}

    {plans.length > 0 && <section className="border-y border-border bg-surface">
      <Container className="py-14 sm:py-18">
        <p className="eyebrow text-primary">Curated route builders</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">{plans.length} ways to turn nearby places into an actual road trip</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {plans.map((plan, index) => {
            const reach = Math.max(...plan.rows.map((row) => row.distanceMiles));
            return <article key={plan.title} className="border border-border bg-background p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · {plan.kicker}</p>
                <p className="text-xs text-muted-foreground">{plan.fit}</p>
              </div>
              <h3 className="mt-3 font-display text-3xl">{plan.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{plan.summary}</p>
              <dl className="mt-5 grid gap-3 border-y border-border py-4 text-sm sm:grid-cols-2">
                <div><dt className="eyebrow text-muted-foreground">Geographic reach</dt><dd className="mt-1">Up to about {Math.round(reach)} miles from {metro.name}</dd></div>
                <div><dt className="eyebrow text-muted-foreground">Road mileage</dt><dd className="mt-1">Use live route</dd></div>
              </dl>
              <div className="mt-5">
                <p className="eyebrow text-muted-foreground">Planning sequence</p>
                <p className="mt-2 text-sm leading-7">{[metro.name, ...plan.rows.map((row) => row.destination.name), metro.name].join(" → ")}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                <a href={liveLoopUrl(metro, plan.rows)} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Open live multi-stop route ↗</a>
                {plan.rows.map((row) => <Link key={row.destination.slug} to="/destination/$slug" params={{ slug: row.destination.slug }} className="eyebrow border-b border-border pb-1 hover:border-primary hover:text-primary">{row.destination.name}</Link>)}
              </div>
            </article>;
          })}
        </div>
      </Container>
    </section>}

    <Container className="py-14 sm:py-18">
      <div className="grid gap-10 lg:grid-cols-3">
        <div><p className="eyebrow text-primary">Half day</p><h2 className="mt-3 font-display text-3xl">Keep the loop tight</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Choose two nearby anchors and leave time for one meal, walk, museum or park stop. A short route is better than turning the day into a windshield tour.</p></div>
        <div><p className="eyebrow text-primary">Full day</p><h2 className="mt-3 font-display text-3xl">Use three strong stops</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Three anchors are usually enough for a satisfying regional drive. If one stop has a hike, museum, river or major historic site, build extra time around it.</p></div>
        <div><p className="eyebrow text-primary">Weekend</p><h2 className="mt-3 font-display text-3xl">Move the overnight outward</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">For a one- or two-night trip, choose the farther anchor as the lodging base and use the remaining places as arrival-day or return-day stops.</p></div>
      </div>
    </Container>

    <section className="border-y border-border bg-surface">
      <Container className="py-14 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="eyebrow text-primary">Seasonal strategy</p><h2 className="mt-3 font-display text-4xl">Change the route when Texas changes.</h2></div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              ["Spring", "Favor parks, wildflower country, historic towns and longer outdoor stops before sustained summer heat arrives."],
              ["Summer", "Build around water, shade, caves, indoor attractions and earlier starts; reduce exposed midday walking."],
              ["Fall", "Use scenic roads, state parks and small towns when cooler weather makes longer outdoor days easier."],
              ["Winter", "Shorter daylight rewards tighter loops, museums, historic districts and destinations with reliable indoor options."],
            ].map(([season, copy]) => <div key={season} className="border-t border-border pt-4"><h3 className="font-display text-2xl">{season}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{copy}</p></div>)}
          </div>
        </div>
      </Container>
    </section>

    <Container className="py-14 sm:py-18">
      <p className="eyebrow text-primary">Route anchors</p>
      <h2 className="mt-3 max-w-4xl font-display text-4xl">The places used to build these road trips</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These remain useful individually, but the road-trip page now treats them as building blocks for a route rather than pretending a destination list is an itinerary.</p>
      <div className="mt-9 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((row, index) => <div key={row.destination.slug}>
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <p className="eyebrow text-primary">About {Math.round(row.distanceMiles)} geographic miles</p>
            <span className="text-xs text-muted-foreground">{row.destination.nearestTown}</span>
          </div>
          <DestinationCard destination={row.destination} eager={index < 2} />
          <a href={maps.drivingRouteUrl(metro.center, row.destination.coordinates)} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Check current drive from {metro.name} ↗</a>
        </div>)}
      </div>
    </Container>

    <Container className="pb-16 sm:pb-20">
      <div className="grid gap-8 border-t border-border pt-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow text-primary">Before you go</p>
          <h2 className="mt-3 font-display text-3xl">Let the live road network make the final decision.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Verify opening hours, reservations, park alerts, weather and water conditions with current official sources. Then open the live multi-stop route so current construction, traffic and road geometry—not a static radius—determine the final mileage and drive time.</p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <Link to="/explore/trip-planner" className="eyebrow border-b border-primary pb-1 text-primary">Build a custom itinerary →</Link>
          <Link to="/explore/near/$metro/$collection" params={{ metro: metro.slug, collection: "weekend-trips" }} className="eyebrow border-b border-primary pb-1 text-primary">Weekend trips from {metro.name} →</Link>
          <Link to="/explore/near/$metro/$collection" params={{ metro: metro.slug, collection: "small-towns" }} className="eyebrow border-b border-primary pb-1 text-primary">Small towns near {metro.name} →</Link>
        </div>
      </div>
    </Container>
  </>;
}
