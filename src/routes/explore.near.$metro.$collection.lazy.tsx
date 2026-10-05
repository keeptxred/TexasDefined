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

function smallTownDecisionCopy(collectionSlug: string, metroName: string) {
  if (collectionSlug === "small-towns-1-hour") {
    return {
      eyebrow: "Choose the easy outing",
      title: `Which close-in small town near ${metroName} fits your day?`,
      body: "Use these towns when you want a lower-friction outing: lunch, a courthouse square, a museum, a short walk or one strong local attraction. Pick the experience first, then check the current route.",
    };
  }
  if (collectionSlug === "small-towns-3-hours") {
    return {
      eyebrow: "Choose the escape",
      title: `Which farther small-town escape from ${metroName} is worth the drive?`,
      body: "Farther trips need a stronger reason to go. Favor towns with enough history, scenery, food, outdoor access or overnight value to justify the extra road time.",
    };
  }
  return {
    eyebrow: "Choose the day trip",
    title: `Which small-town day trip from ${metroName} fits your day?`,
    body: "The useful question is not which town falls inside a geometric ring. Compare what each place gives you to do, then let current traffic and opening hours decide the final route.",
  };
}

function googleMultiStopRoute(stops: string[]) {
  const origin = encodeURIComponent("Texarkana, TX");
  const destination = encodeURIComponent(stops.at(-1) ?? "Texarkana, TX");
  const waypoints = stops.slice(0, -1).map((stop) => encodeURIComponent(stop)).join("%7C");
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ""}&travelmode=driving`;
}

const TEXARKANA_ROAD_TRIPS = [
  {
    title: "Caddo Lake & Jefferson Loop",
    kicker: "Best overall",
    length: "About 175–195 road miles",
    duration: "Full day or overnight",
    season: "Spring and fall",
    stops: ["Jefferson, TX", "Caddo Lake State Park, TX", "Marshall, TX", "Texarkana, TX"],
    summary: "A classic Northeast Texas loop pairing Jefferson's riverport history with bald-cypress water, Caddo Lake State Park and Marshall's courthouse-and-railroad heritage.",
    links: [
      { href: "/destination/caddo-lake-state-park", label: "Caddo Lake State Park" },
      { href: "/destination/marshall", label: "Marshall" },
      { href: "/county/marion", label: "Marion County" },
    ],
  },
  {
    title: "Wright Patman & Atlanta State Park Circuit",
    kicker: "Closest escape",
    length: "About 70–90 road miles",
    duration: "Half day",
    season: "Year-round; strongest spring through fall",
    stops: ["Atlanta State Park, TX", "Atlanta, TX", "New Boston, TX", "Texarkana, TX"],
    summary: "The easiest lake-and-pines circuit from Texarkana, built around Atlanta State Park, Wright Patman Lake and two practical Northeast Texas town stops.",
    links: [
      { href: "/destination/atlanta-state-park", label: "Atlanta State Park" },
      { href: "/county/cass", label: "Cass County" },
      { href: "/county/bowie", label: "Bowie County" },
    ],
  },
  {
    title: "Daingerfield, Mount Pleasant & Lake Country Loop",
    kicker: "Piney Woods",
    length: "About 150–180 road miles",
    duration: "Full day",
    season: "Fall color and spring",
    stops: ["Daingerfield State Park, TX", "Mount Pleasant, TX", "Lake Bob Sandlin State Park, TX", "Texarkana, TX"],
    summary: "A deeper Piney Woods drive linking one of East Texas's most photogenic small state parks with Mount Pleasant and the lake country west of Texarkana.",
    links: [
      { href: "/destination/daingerfield-state-park", label: "Daingerfield State Park" },
      { href: "/county/morris", label: "Morris County" },
      { href: "/county/titus", label: "Titus County" },
    ],
  },
  {
    title: "Jefferson History & Big Cypress Day",
    kicker: "History",
    length: "About 120–145 road miles",
    duration: "Full day",
    season: "Fall through spring",
    stops: ["Linden, TX", "Jefferson, TX", "Karnack, TX", "Texarkana, TX"],
    summary: "A history-first route through Linden and Jefferson before reaching the Big Cypress and Caddo Lake landscape near Karnack.",
    links: [
      { href: "/county/cass", label: "Cass County" },
      { href: "/county/marion", label: "Marion County" },
      { href: "/county/harrison", label: "Harrison County" },
    ],
  },
  {
    title: "Red River Towns Drive",
    kicker: "Small towns",
    length: "About 170–215 road miles",
    duration: "Long full day",
    season: "Fall through spring",
    stops: ["New Boston, TX", "Clarksville, TX", "Paris, TX", "Texarkana, TX"],
    summary: "A courthouse-and-town-square route tracing the Red River side of Northeast Texas through New Boston, Clarksville and Paris.",
    links: [
      { href: "/county/bowie", label: "Bowie County" },
      { href: "/explore/near/texarkana/small-towns", label: "Small towns near Texarkana" },
      { href: "/explore/near/texarkana/historic-sites", label: "Historic sites near Texarkana" },
    ],
  },
  {
    title: "Lake O' the Pines & Jefferson Weekend",
    kicker: "Weekend",
    length: "About 180–220 road miles",
    duration: "1–2 nights",
    season: "Spring through fall",
    stops: ["Jefferson, TX", "Lake O' the Pines, TX", "Marshall, TX", "Texarkana, TX"],
    summary: "A slower overnight loop for travelers who want historic Jefferson, time on the water and enough breathing room for Marshall rather than racing between stops.",
    links: [
      { href: "/county/marion", label: "Jefferson & Marion County" },
      { href: "/destination/marshall", label: "Marshall" },
      { href: "/explore/near/texarkana/weekend-trips", label: "More weekend trips" },
    ],
  },
  {
    title: "Northeast Texas State-Park Sampler",
    kicker: "Outdoors",
    length: "About 210–250 road miles",
    duration: "Long day or overnight",
    season: "Spring and fall",
    stops: ["Atlanta State Park, TX", "Daingerfield State Park, TX", "Lake Bob Sandlin State Park, TX", "Texarkana, TX"],
    summary: "Three very different Northeast Texas park experiences in one route: Wright Patman shoreline, wooded Daingerfield and the Lake Bob Sandlin area.",
    links: [
      { href: "/destination/atlanta-state-park", label: "Atlanta State Park" },
      { href: "/destination/daingerfield-state-park", label: "Daingerfield State Park" },
      { href: "/explore/near/texarkana/state-parks", label: "State parks near Texarkana" },
    ],
  },
  {
    title: "Bowie & Cass County Backroads",
    kicker: "Hidden gems",
    length: "About 110–145 road miles",
    duration: "Full day",
    season: "Fall through spring",
    stops: ["New Boston, TX", "Linden, TX", "Atlanta, TX", "Texarkana, TX"],
    summary: "A town-to-town circuit through the counties closest to Texarkana, useful when you want courthouse history, local main streets and Piney Woods scenery without a long highway haul.",
    links: [
      { href: "/county/bowie", label: "Bowie County" },
      { href: "/county/cass", label: "Cass County" },
      { href: "/explore/near/texarkana/things-to-do", label: "Things to do near Texarkana" },
    ],
  },
] as const;

function TexarkanaRoadTripsAuthority({ pageData }: { pageData: CollectionPageData }) {
  const { metro, collection, results } = pageData;
  const mapMarkers = results.map((row) => ({ id: row.destination.slug, label: row.destination.name, point: row.destination.coordinates, href: `/destination/${row.destination.slug}` }));

  return <>
    <Container className="py-12 sm:py-16">
      <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-border pb-6">
        <Link to="/explore/near/$metro" params={{ metro: metro.slug }} className="eyebrow border-b border-primary pb-1 text-primary">All near Texarkana</Link>
        {METRO_PROXIMITY_COLLECTIONS.filter((item) => item.slug !== collection.slug).map((item) => {
          const itemPresentation = metroProximityCollectionPresentation(item);
          return <Link key={item.slug} to="/explore/near/$metro/$collection" params={{ metro: metro.slug, collection: item.slug }} className="eyebrow border-b border-border pb-1 hover:border-primary hover:text-primary">{itemPresentation.navLabel}</Link>;
        })}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <p className="eyebrow text-primary">Why Texarkana works as a road-trip base</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Four directions, several landscapes, and no need to drive back toward Dallas.</h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">Texarkana sits at the edge of the Piney Woods and the Red River country, close to Wright Patman Lake and within practical reach of Jefferson, Caddo Lake, Marshall, Daingerfield and the lake country around Mount Pleasant. That makes the city unusually good for loops: leave on one highway, link several stops, and return by a different route.</p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">The mileage ranges below are planning estimates rather than promises. Construction, chosen roads and detours change real mileage and drive time, so every itinerary includes a live multi-stop map link for the route you are actually considering.</p>
        </div>
        <div className="border-l-2 border-primary pl-6">
          <p className="eyebrow text-primary">Start here</p>
          <h3 className="mt-2 font-display text-3xl">Caddo Lake & Jefferson Loop</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">For a first road trip from Texarkana, this is the strongest mix of scenery, history, food stops and places worth getting out of the car for.</p>
          <a href={googleMultiStopRoute(TEXARKANA_ROAD_TRIPS[0].stops)} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Open the live route ↗</a>
        </div>
      </div>
    </Container>

    {mapMarkers.length > 0 && <Container className="pb-10 sm:pb-14">
      <MapPreview markers={mapMarkers} zoom={7} directionsLabel="Road-trip anchors near Texarkana" origin={metro.center} originLabel={metro.name} />
    </Container>}

    <section className="border-y border-border bg-surface">
      <Container className="py-14 sm:py-18">
        <p className="eyebrow text-primary">Curated itineraries</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Eight road trips that are routes, not just destination cards</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {TEXARKANA_ROAD_TRIPS.map((trip, index) => <article key={trip.title} className="border border-border bg-background p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · {trip.kicker}</p>
              <p className="text-xs text-muted-foreground">{trip.duration}</p>
            </div>
            <h3 className="mt-3 font-display text-3xl">{trip.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{trip.summary}</p>
            <dl className="mt-5 grid gap-3 border-y border-border py-4 text-sm sm:grid-cols-2">
              <div><dt className="eyebrow text-muted-foreground">Planning length</dt><dd className="mt-1">{trip.length}</dd></div>
              <div><dt className="eyebrow text-muted-foreground">Best season</dt><dd className="mt-1">{trip.season}</dd></div>
            </dl>
            <div className="mt-5">
              <p className="eyebrow text-muted-foreground">Suggested order</p>
              <p className="mt-2 text-sm leading-7">{["Texarkana", ...trip.stops].join(" → ")}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
              <a href={googleMultiStopRoute(trip.stops)} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Check current route ↗</a>
              {trip.links.map((link) => <Link key={link.href} to={link.href} className="eyebrow border-b border-border pb-1 hover:border-primary hover:text-primary">{link.label}</Link>)}
            </div>
          </article>)}
        </div>
      </Container>
    </section>

    <Container className="py-14 sm:py-18">
      <div className="grid gap-10 lg:grid-cols-3">
        <div>
          <p className="eyebrow text-primary">Half day</p>
          <h2 className="mt-3 font-display text-3xl">Stay close to Texarkana</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Choose Wright Patman and Atlanta State Park when you want the road-trip feel without committing the entire day. Add New Boston or downtown Atlanta for a meal and a town stop.</p>
        </div>
        <div>
          <p className="eyebrow text-primary">Full day</p>
          <h2 className="mt-3 font-display text-3xl">Build around Jefferson or Daingerfield</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Jefferson plus Caddo Lake gives the richest history-and-water combination. Daingerfield plus Mount Pleasant works better when the goal is forest, parks and lake country.</p>
        </div>
        <div>
          <p className="eyebrow text-primary">Weekend</p>
          <h2 className="mt-3 font-display text-3xl">Slow the route down</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">For one or two nights, use Jefferson or Marshall as the overnight anchor and give Caddo Lake, Lake O' the Pines or the state parks enough time to be the trip rather than a roadside stop.</p>
        </div>
      </div>
    </Container>

    <section className="border-y border-border bg-surface">
      <Container className="py-14 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-primary">Pick by season</p>
            <h2 className="mt-3 font-display text-4xl">When the route matters as much as the stop</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              ["Spring", "Pines, fresh green forest, paddling weather and comfortable state-park days make this the easiest all-purpose season."],
              ["Summer", "Favor lake routes, early starts and water-focused stops; expect heat to make long outdoor afternoons less forgiving."],
              ["Fall", "Daingerfield, Caddo Lake and the broader Piney Woods become the strongest scenic choices when foliage cooperates."],
              ["Winter", "Use the history-heavy Jefferson, Marshall and courthouse-town routes; shorter daylight favors tighter itineraries."],
            ].map(([season, copy]) => <div key={season} className="border-t border-border pt-4"><h3 className="font-display text-2xl">{season}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{copy}</p></div>)}
          </div>
        </div>
      </Container>
    </section>

    <Container className="py-14 sm:py-18">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-primary">Worth the detour</p>
          <h2 className="mt-3 font-display text-4xl">Build in one small stop instead of collecting ten.</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Linden, New Boston and Atlanta work best as deliberate breaks between larger anchors. Pick one courthouse square, local museum, downtown walk or meal stop and give it enough time to matter. The road-trip pages should help you sequence a day, not reward the longest possible checklist.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            <Link to="/explore/near/texarkana/small-towns" className="eyebrow border-b border-primary pb-1 text-primary">Compare small towns</Link>
            <Link to="/explore/near/texarkana/historic-sites" className="eyebrow border-b border-primary pb-1 text-primary">Compare historic stops</Link>
            <Link to="/explore/near/texarkana/lakes" className="eyebrow border-b border-primary pb-1 text-primary">Compare lake stops</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow text-primary">Before you go</p>
          <h2 className="mt-3 font-display text-4xl">Verify the pieces that can change.</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Check the live route for road conditions and current drive time. For parks and water stops, verify reservations, gate hours, closures, burn bans and lake conditions with the managing agency. For a weekend, reserve the overnight first and then shape the loop around it.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            <Link to="/explore/trip-planner" className="eyebrow border-b border-primary pb-1 text-primary">Build a multi-stop itinerary →</Link>
            <Link to="/explore/near/texarkana/weekend-trips" className="eyebrow border-b border-primary pb-1 text-primary">Weekend trips →</Link>
            <Link to="/explore/near/texarkana/state-parks" className="eyebrow border-b border-primary pb-1 text-primary">State parks →</Link>
          </div>
        </div>
      </div>
    </Container>
  </>;
}

export function MetroProximityCollectionRich({ pageData }: { pageData: CollectionPageData }) {
  const { metro, collection, results, townReferences, presentation } = pageData;
  if (metro.slug === "texarkana" && collection.slug === "road-trips") {
    return <TexarkanaRoadTripsAuthority pageData={pageData} />;
  }
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
  const isSmallTownRing = presentation.usesGeographicRing;
  const genericSmallTownRows = isSmallTownRing && !isAustinTwoHourGuide ? results.slice(0, 12) : [];
  const smallTownDecision = isSmallTownRing ? smallTownDecisionCopy(collection.slug, metro.name) : null;
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

    {genericSmallTownRows.length > 0 && smallTownDecision && <section className="border-b border-border">
      <Container className="py-14 sm:py-18">
        <p className="eyebrow text-primary">{smallTownDecision.eyebrow}</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">{smallTownDecision.title}</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{smallTownDecision.body}</p>

        <div className="mt-10 overflow-x-auto border-y border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 pr-6 font-semibold">Town</th>
                <th className="px-4 py-4 font-semibold">Why go</th>
                <th className="px-4 py-4 font-semibold">Shortlist distance</th>
                <th className="py-4 pl-4 font-semibold">Live route</th>
              </tr>
            </thead>
            <tbody>
              {genericSmallTownRows.map((row) => <tr key={row.destination.slug} className="border-b border-border last:border-0">
                <td className="py-4 pr-6"><Link to="/destination/$slug" params={{ slug: row.destination.slug }} className="font-semibold hover:text-primary">{row.destination.name}</Link></td>
                <td className="px-4 py-4 text-muted-foreground">{row.destination.highlights[0] ?? row.destination.summary}</td>
                <td className="px-4 py-4 text-muted-foreground">About {Math.round(row.distanceMiles)} geographic miles</td>
                <td className="py-4 pl-4"><a href={maps.drivingRouteUrl(metro.center, row.destination.coordinates)} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline-offset-4 hover:underline">Check drive ↗</a></td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-4xl text-xs leading-6 text-muted-foreground">The shortlist distance is only a geographic screen used to find candidates. It is not road mileage or a promised drive time; use the live route for the trip you actually choose.</p>
      </Container>
    </section>}

    {mapMarkers.length > 0 && <Container className="py-14 sm:py-18">
      <MapPreview markers={mapMarkers} zoom={7} directionsLabel={`${presentation.label} near ${metro.name}`} origin={metro.center} originLabel={metro.name} />
    </Container>}

    {groups.map((group, groupIndex) => <section key={group.band} className={groupIndex % 2 ? "border-y border-border bg-surface" : ""}>
      <Container className="py-14 sm:py-18">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">{isSmallTownRing ? "Town guides" : bandLabel(group.band)}</p>
          <h2 className="mt-3 font-display text-4xl">{isSmallTownRing ? `${group.rows.length} places worth building a trip around` : `${group.rows.length} full TexasDefined guide${group.rows.length === 1 ? "" : "s"} in this geographic band`}</h2>
        </div>
        <div className="mt-9 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {group.rows.map((row, index) => <div key={row.destination.slug}>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <p className="eyebrow text-primary">{isAustinTwoHourGuide && austinEditorial(row.destination.slug) ? austinEditorial(row.destination.slug)!.drive : isSmallTownRing ? `Planning shortlist · about ${Math.round(row.distanceMiles)} geographic miles` : `About ${Math.round(row.distanceMiles)} geographic miles`}</p>
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
          <h2 className="mt-3 font-display text-3xl">{isSmallTownRing ? "Pick the town first. Then let the live route decide the departure time." : "Use geography as a shortlist, then check the real route."}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{isSmallTownRing ? `Traffic, construction and your exact starting point can change the trip materially. After choosing the experience you want, open the current route from ${metro.name} and verify attraction hours, reservations and weather before you leave.` : "TexasDefined uses location data to make the statewide catalog easier to search. Open the current driving route for the places you are considering, then verify opening hours, reservations, park alerts, water conditions and weather with the current official source."}</p>
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
