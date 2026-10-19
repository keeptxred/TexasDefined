import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isDestinationPhotoPlaceholder } from "@/data/explore-hero-reconciliation";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { MapPreview } from "@/components/editorial/MapPreview";
import { EventTicketCta } from "@/components/events/EventTicketCta";
import { Container } from "@/components/layout/Container";
import {
  METRO_PROXIMITY_COLLECTIONS,
  type MetroProximityCollection,
  type MetroProximityMetro,
  type MetroProximityResult,
} from "@/data/metro-proximity";
import { metroProximityCollectionPresentation } from "@/data/metro-proximity-presentation";
import type { MetroProximityTownResult } from "@/data/metro-proximity-town-references";
import type { ResolvedEventTicketCta } from "@/data/events/ticketing";
import { countyNames, countySlug } from "@/data/metro-county-links";
import { maps } from "@/services/maps";

export const Route = createLazyFileRoute("/explore/near/$metro/$collection")({});

type CollectionPageData = {
  metro: MetroProximityMetro;
  collection: MetroProximityCollection;
  results: MetroProximityResult[];
  townReferences: MetroProximityTownResult[];
  eventContext: {
    kind: "none" | "nearby" | "weekend-destinations";
    events: Array<{
      id: string;
      title: string;
      categoryLabel: string;
      dateLabel: string;
      locationLabel: string;
      guidePath: string;
      officialEventUrl: string;
      lastVerifiedLabel: string;
      ticketCta: ResolvedEventTicketCta | null;
    }>;
  };
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

function bandLabel(band: "close-in" | "easy-day-trip" | "longer-day-trip", collection: MetroProximityCollection) {
  if (collection.slug === "day-trips") {
    if (band === "close-in") return "Closer geographic choices";
    if (band === "easy-day-trip") return "Middle-distance choices · check the road route";
    return "Farther geographic choices · check if an overnight fits better";
  }
  if (band === "close-in") return "Close to the metro";
  if (band === "easy-day-trip") return "Easy day-trip range";
  return "Longer day trip";
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

const MCALLEN_EDITORIAL_TRIPS = [
  {
    slug: "quinta-mazatlan",
    externalOnly: true,
    title: "Quinta Mazatlán",
    label: "McAllen · Urban nature and birding",
    plan: "Local morning or relaxed half day",
    why: "Visit an urban sanctuary with historic Spanish Revival architecture, native Tamaulipan brushland, birding paths and city-run ecology programs—without leaving McAllen.",
    caution: "At 600 Sunset Drive, parking is limited during the expansion project; consider carpooling or rideshare. Closed Sunday and Monday. Check current admission, hours and construction notices (official sources reviewed October 19, 2026).",
    official: "https://www.quintamazatlan.com/visit-explore/park-hours-admission",
  },
  {
    slug: "bentsen-rio-grande-valley-state-park",
    title: "Bentsen-Rio Grande Valley State Park",
    label: "Western Valley · Birding",
    plan: "Easy half-day or full-day wildlife outing",
    why: "One of the Valley's defining birding sites: visit the hawk tower, follow wooded trails and use the tram when it is operating.",
    caution: "Private vehicles cannot drive inside the park. Confirm the seasonal tram schedule and any park alerts.",
    official: "https://tpwd.texas.gov/state-parks/bentsen-rio-grande-valley/",
  },
  {
    slug: "santa-ana-national-wildlife-refuge",
    title: "Santa Ana National Wildlife Refuge",
    label: "Alamo · Subtropical habitat",
    plan: "Half day, best started early",
    why: "Walk rare riparian and subtropical woodland, including the shorter Chachalaca Trail, and look for Valley specialty birds.",
    caution: "FWS reports Levee Road temporarily closed to pedestrians and cyclists; bicyclists should use Bobcat Trail as a detour. Other trails may remain accessible. Recheck the official notice, fees and trail conditions before traveling (reviewed October 18, 2026).",
    official: "https://www.fws.gov/refuge/santa-ana/visit-us",
  },
  {
    slug: "estero-llano-grande-state-park",
    title: "Estero Llano Grande State Park",
    label: "Weslaco · Wetland wildlife",
    plan: "Half day, with time for Weslaco afterward",
    why: "A different birding habitat from Bentsen: shallow wetlands, boardwalks, a visitor-center viewing deck and extensive bird activity.",
    caution: "This is a vehicle-free park beyond the parking area. Check current alerts and accessible trail conditions.",
    official: "https://tpwd.texas.gov/state-parks/estero-llano-grande",
  },
  {
    slug: "museum-of-south-texas-history-edinburg",
    title: "Museum of South Texas History",
    label: "Edinburg · Borderland history",
    plan: "Short outing or a culture-focused half day",
    why: "Start with the 1910 Hidalgo County Jail and explore Rio Grande Valley history spanning archaeology, ranching, river trade and modern communities.",
    caution: "This is an indoor alternative to the midday heat. Verify opening days and admission before leaving.",
    official: "https://mosthistory.org/",
  },
  {
    slug: "old-hidalgo-pumphouse-museum",
    title: "Old Hidalgo Pumphouse Museum",
    label: "Hidalgo · Irrigation heritage and birding",
    plan: "Flexible local history outing; verify museum-tour availability",
    why: "Tour the century-old irrigation machinery that changed Lower Valley agriculture, then explore the World Birding Center grounds and river habitat.",
    caution: "The city posts weekday front-desk hours and separately advertises guided tours. Call 956-843-2286 for the exact tour schedule and access before leaving.",
    official: "https://cityofhidalgo.net/old-hidalgo-pump-housemuseum-and-world-birding-center",
  },
  {
    slug: "sabal-palm-sanctuary",
    externalOnly: true,
    title: "Sabal Palm Sanctuary & Historic Rabb Plantation",
    label: "Brownsville · Rio Grande palm forest",
    plan: "Longer wildlife-focused day",
    why: "Walk more than three miles of trails in native sabal palm forest and stop at the historic 1892 Rabb Plantation House visitor center.",
    caution: "At 8435 Sabal Palm Grove Road, the operator lists 7 a.m.–5 p.m. access except Wednesdays, with an admission charge. Trails are walking-only; no bicycles. Check the current schedule and river-area directions before departing (reviewed October 19, 2026).",
    official: "https://www.sabalpalmsanctuary.org/",
  },
  {
    slug: "laguna-atascosa-national-wildlife-refuge",
    title: "Laguna Atascosa National Wildlife Refuge",
    label: "Cameron County · Longer wildlife day",
    plan: "Full day; leave early",
    why: "Choose this for expansive coastal and wetland wildlife rather than a quick local park: birding, hiking and varied protected habitats.",
    caution: "Follow the official route to the visitor center rather than crossing the Laguna Madre on a map. The refuge currently lists its Bahia Grande unit as closed; check current trail and unit notices before traveling.",
    official: "https://www.fws.gov/refuge/laguna-atascosa/visit-us",
  },
  {
    slug: "port-isabel-lighthouse",
    title: "Port Isabel Lighthouse",
    label: "Port Isabel · Maritime heritage",
    plan: "Longer coastal day paired with South Padre",
    why: "Visit a rare climbable historic Texas lighthouse and use Port Isabel's maritime history as the cultural start to a beach outing.",
    caution: "The lighthouse climb involves winding stairs and short ladders; climbing depends on weather and current access.",
    official: "https://thc.texas.gov/historic-sites/port-isabel-lighthouse",
  },
  {
    slug: "south-padre-island-beaches",
    title: "South Padre Island",
    label: "South Padre Island · Beach day",
    plan: "Full day at the coast",
    why: "Choose one beach access area and make it a proper shore day rather than counting every island beach or attraction as a separate trip.",
    caution: "Check the bridge route, beach flags, rip currents, parking rules, and weather before you go.",
    official: "https://www.myspi.org/",
  },
] as const;

/** Exact attraction locations from the existing destination catalog, Commons
 * photo geotags and operator addresses. Map pins are orientation markers,
 * not guaranteed entrance locations; navigation uses named destinations. */
const MCALLEN_FEATURED_POINTS = {
  "quinta-mazatlan": { lat: 26.17674, lng: -98.22976, query: "Quinta Mazatlan, 600 Sunset Drive, McAllen TX" },
  "bentsen-rio-grande-valley-state-park": { lat: 26.186, lng: -98.381, query: "Bentsen Rio Grande Valley State Park, Mission TX" },
  "santa-ana-national-wildlife-refuge": { lat: 26.08, lng: -98.14, query: "Santa Ana National Wildlife Refuge, Green Jay Road, Alamo TX" },
  "estero-llano-grande-state-park": { lat: 26.126411, lng: -97.956518, query: "Estero Llano Grande State Park, Weslaco TX" },
  "museum-of-south-texas-history-edinburg": { lat: 26.30284, lng: -98.16138, query: "Museum of South Texas History, Edinburg TX" },
  "old-hidalgo-pumphouse-museum": { lat: 26.09689, lng: -98.26177, query: "Old Hidalgo Pumphouse Museum, 902 S 2nd Street, Hidalgo TX" },
  "sabal-palm-sanctuary": { lat: 25.85, lng: -97.4188, query: "Sabal Palm Sanctuary, 8435 Sabal Palm Grove Road, Brownsville TX" },
  "laguna-atascosa-national-wildlife-refuge": { lat: 26.23, lng: -97.35, query: "Laguna Atascosa National Wildlife Refuge, Ocelot Road, Los Fresnos TX" },
  "port-isabel-lighthouse": { lat: 26.077984, lng: -97.207133, query: "Port Isabel Lighthouse, Port Isabel TX" },
  "south-padre-island-beaches": { lat: 26.113528, lng: -97.164556, query: "South Padre Island public beach access, South Padre Island TX" },
} as const;

const MCALLEN_OPEN_IMAGES = {
  "quinta-mazatlan": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/QUINTA_MAZATLAN%2C_Mc_Allen%2C_Tx_-06_%2816663465252%29.jpg?width=1000",
    alt: "Quinta Mazatlán's landscaped grounds in McAllen, Texas",
    credit: "Alan Schmierer · CC0 · Wikimedia Commons",
    source: "https://commons.wikimedia.org/wiki/File:QUINTA_MAZATLAN,_Mc_Allen,_Tx_-06_(16663465252).jpg",
    license: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  "sabal-palm-sanctuary": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sabal_Palm_Sanctuary%2C_Cameron_Co._TX%3B_11_Apr_2016.jpg?width=1000",
    alt: "Old-growth sabal palm forest at Sabal Palm Sanctuary near Brownsville",
    credit: "William L. Farr · CC BY-SA 4.0 · Wikimedia Commons",
    source: "https://commons.wikimedia.org/wiki/File:Sabal_Palm_Sanctuary,_Cameron_Co._TX;_11_Apr_2016.jpg",
    license: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
} as const;

function McAllenFeaturedMap() {
  const [slug, setSlug] = useState<(typeof MCALLEN_EDITORIAL_TRIPS)[number]["slug"]>("quinta-mazatlan");
  const trip = MCALLEN_EDITORIAL_TRIPS.find((item) => item.slug === slug) ?? MCALLEN_EDITORIAL_TRIPS[0];
  const point = MCALLEN_FEATURED_POINTS[trip.slug];
  const bbox = [point.lng - 0.075, point.lat - 0.05, point.lng + 0.075, point.lat + 0.05].join(",");
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${point.lat}%2C${point.lng}`;
  const route = `https://www.google.com/maps/dir/?api=1&origin=McAllen%2C%20TX&destination=${encodeURIComponent(point.query)}&travelmode=driving`;
  return <section className="mt-14 border-t border-border pt-8" aria-labelledby="mcallen-featured-map">
    <p className="eyebrow text-primary">Map & current road routes</p>
    <h3 id="mcallen-featured-map" className="mt-2 font-display text-3xl">Choose any of the ten featured outings</h3>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Choose an attraction to move the map pin, then open Google Maps for current road directions from central McAllen. Pins indicate approximate attractions, not guaranteed entry gates. Check the official operator before departing.</p>
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="grid auto-rows-min gap-2 sm:grid-cols-2" role="group" aria-label="Select a featured McAllen day trip on the map">
        {MCALLEN_EDITORIAL_TRIPS.map((stop) => <button type="button" key={stop.slug}
          aria-pressed={stop.slug === slug} onClick={() => setSlug(stop.slug)}
          className={`min-h-12 border px-3 py-3 text-left text-sm font-semibold transition-colors ${stop.slug === slug ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary"}`}>{stop.title}</button>)}
      </div>
      <div>
        <iframe key={trip.slug} title={`Interactive OpenStreetMap location of ${trip.title}`} src={mapUrl} loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full border border-border sm:h-[440px]" />
        <p className="mt-2 text-xs text-muted-foreground">Map data © OpenStreetMap contributors. The embedded map shows one selected marker at a time.</p>
        <div className="mt-4 border-t border-border pt-4">
          <p className="font-display text-2xl">{trip.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">{trip.plan} · {trip.label}</p>
          <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold">
            <a href={route} target="_blank" rel="noopener noreferrer" className="border-b border-primary pb-1 text-primary">Check current drive from McAllen ↗</a>
            <a href={trip.official} target="_blank" rel="noopener noreferrer" className="border-b border-border pb-1">Official visitor information ↗</a>
          </div>
        </div>
      </div>
    </div>
  </section>;
}

function McAllenDayTripsAuthority({ results }: { results: MetroProximityResult[] }) {
  return <section className="border-b border-border bg-surface" aria-labelledby="mcallen-day-trip-guide">
    <Container className="py-14 sm:py-18">
      <p className="eyebrow text-primary">The Lower Rio Grande Valley, properly explored</p>
      <h2 id="mcallen-day-trip-guide" className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Which McAllen day trip fits your day?</h2>
      <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">McAllen is a gateway to remarkable wildlife and borderland history—not just a starting point for distant Gulf beaches. A short local excursion can be as memorable as a full coastal day. These are editorial trip anchors, not a ranking by straight-line mileage.</p>
      <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {MCALLEN_EDITORIAL_TRIPS.map((trip) => {
          const openPhoto = trip.slug === "quinta-mazatlan" ? MCALLEN_OPEN_IMAGES["quinta-mazatlan"] : trip.slug === "sabal-palm-sanctuary" ? MCALLEN_OPEN_IMAGES["sabal-palm-sanctuary"] : null;
          const catalogPhoto = results.find((row) => row.destination.slug === trip.slug)?.destination.hero;
          const photo = openPhoto ?? (catalogPhoto && !isDestinationPhotoPlaceholder(catalogPhoto.src) ? catalogPhoto : null);
          return <article key={trip.slug} className="border-t border-border pt-5">
            {photo && <figure className="mb-5"><div className="aspect-[16/10] overflow-hidden bg-muted"><img loading="lazy" decoding="async" src={photo.src} alt={photo.alt || trip.title} width={1200} height={750} className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div>
              {photo.credit && <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">Photo: {openPhoto ? <><a href={openPhoto.source} target="_blank" rel="noopener noreferrer" className="underline">{openPhoto.credit}</a> · <a href={openPhoto.license} target="_blank" rel="noopener noreferrer" className="underline">License</a></> : photo.credit}</figcaption>}</figure>}
            <p className="eyebrow text-primary">{trip.label}</p>
            <h3 className="mt-3 font-display text-2xl">{trip.title}</h3>
            <p className="mt-3 text-sm font-semibold">{trip.plan}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{trip.why}</p>
            <p className="mt-3 border-l-2 border-border pl-4 text-sm leading-6"><strong>Before you go:</strong> {trip.caution}</p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold">
              {!("externalOnly" in trip) && <Link to="/destination/$slug" params={{ slug: trip.slug }} className="border-b border-primary pb-1 text-primary">Read the TexasDefined guide →</Link>}
              <a href={trip.official} target="_blank" rel="noopener noreferrer" className="border-b border-border pb-1 hover:text-primary">{("externalOnly" in trip) ? "Plan using the official visitor site ↗" : "Official visitor information ↗"}</a>
            </div>
          </article>;
        })}
      </div>
      <McAllenFeaturedMap />
      <div className="mt-14 border-t border-border pt-8">
        <p className="eyebrow text-primary">Build a day, not a checklist</p>
        <h3 className="mt-3 font-display text-3xl">Three practical ways to explore from McAllen</h3>
        <div className="mt-7 grid gap-7 lg:grid-cols-3">
          <div><h4 className="font-display text-2xl">Wildlife before the heat · Half day</h4><p className="mt-3 text-sm leading-7 text-muted-foreground">Start early at Bentsen or Santa Ana and allow two to three hours for trails and overlooks, or choose Quinta Mazatlán for a shorter, city-based nature walk. Bring water and sun protection; avoid racing between refuges.</p></div>
          <div><h4 className="font-display text-2xl">Wetlands + Valley heritage · Most of a day</h4><p className="mt-3 text-sm leading-7 text-muted-foreground">Visit Estero Llano Grande early, take a lunch break in Weslaco, then consider the Museum of South Texas History in Edinburg for an indoor history afternoon. Check the museum's opening days and allow for driving between towns.</p></div>
          <div><h4 className="font-display text-2xl">Port Isabel + South Padre · Full coastal day</h4><p className="mt-3 text-sm leading-7 text-muted-foreground">Leave early for Port Isabel and visit the lighthouse in the morning if climbs are available. After lunch, cross to one South Padre beach access for the afternoon. Confirm bridge traffic, beach flags, parking rules and weather; consider an overnight for a slower pace.</p></div>
        </div>
      </div>
      <div className="mt-10 border-t border-border pt-7">
        <h3 className="font-display text-2xl">How the recommendations work</h3>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Quinta Mazatlán offers a close-to-home nature outing, while Sabal Palm Sanctuary is a longer Brownsville-area trip. Both link directly to their operators until a full, source-verified TexasDefined destination guide exists; Old Hidalgo Pumphouse already has one and is listed only once.</p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Visitor information was reviewed against state, federal and museum websites in October 2026. The additional places below are screened by geography, not promised road mileage or driving times. The Lower Rio Grande Valley National Wildlife Refuge map pin is its public visitor headquarters near Alamo, not every refuge unit. Choose a specific public-use unit before departing. Padre Island National Seashore near Corpus Christi is better planned as a separate, longer coastal or overnight trip. Confirm current access, operating hours, weather and road conditions before leaving.</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          <Link to="/explore/near/$metro" params={{ metro: "mcallen" }} className="eyebrow border-b border-primary pb-1 text-primary">Explore all trips near McAllen →</Link>
          <Link to="/county/$slug" params={{ slug: "hidalgo" }} className="eyebrow border-b border-primary pb-1 text-primary">Hidalgo County guide →</Link>
          <Link to="/county/$slug" params={{ slug: "cameron" }} className="eyebrow border-b border-primary pb-1 text-primary">Cameron County guide →</Link>
        </div>
      </div>
    </Container>
  </section>;
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
  const { metro, collection, results, townReferences, eventContext, presentation } = pageData;
  const isMcAllenDayTrips = metro.slug === "mcallen" && collection.slug === "day-trips";
  // The shared lodging scripts must wait for this lazy section to hydrate.
  // Otherwise they insert affiliate HTML inside the first curated article and
  // can trigger React hydration mismatches. Other metros are unaffected.
  useEffect(() => {
    if (!isMcAllenDayTrips) return;
    document.documentElement.dataset.tdMcAllenDayTripsHydrated = "1";
    window.dispatchEvent(new Event("texasdefined:mcallen-day-trips-hydrated"));
    return () => { delete document.documentElement.dataset.tdMcAllenDayTripsHydrated; };
  }, [isMcAllenDayTrips]);
  if (metro.slug === "texarkana" && collection.slug === "road-trips") {
    return <TexarkanaRoadTripsAuthority pageData={pageData} />;
  }
  const curatedSlugs = isMcAllenDayTrips ? new Set<string>(MCALLEN_EDITORIAL_TRIPS.map((trip) => trip.slug)) : new Set<string>();
  const groups = (["close-in", "easy-day-trip", "longer-day-trip"] as const)
    .map((band) => ({ band, rows: results.filter((row) => row.distanceBand === band && !curatedSlugs.has(row.destination.slug)) }))
    .filter((group) => group.rows.length > 0);
  const mapMarkers = [
    ...townReferences.map((row) => ({ id: `town-${row.town.slug}`, label: row.town.name, point: row.town.coordinates, href: countyNames(row.town.county).length === 1 ? `/county/${countySlug(row.town.county)}` : "/browse/counties", distanceMiles: row.distanceMiles })),
    ...results.filter((row) => !isMcAllenDayTrips || !curatedSlugs.has(row.destination.slug)).map((row) => ({ id: row.destination.slug, label: row.destination.slug === "lower-rio-grande-valley-national-wildlife-refuge" ? "Lower Rio Grande Valley refuge visitor headquarters" : row.destination.name, point: row.destination.coordinates, href: `/destination/${row.destination.slug}`, distanceMiles: row.distanceMiles })),
  ]
    .sort((left, right) => left.distanceMiles - right.distanceMiles)
    .map(({ distanceMiles: _distanceMiles, ...marker }) => marker);
  const counties = [...new Set([
    ...townReferences.flatMap((row) => countyNames(row.town.county)),
    ...results.flatMap((row) => countyNames(row.destination.county ?? "")),
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

    {isMcAllenDayTrips && <McAllenDayTripsAuthority results={results} />}

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

    {eventContext.events.length > 0 && <section className="border-y border-border bg-surface">
      <Container className="py-14 sm:py-18">
        <p className="eyebrow text-primary">{eventContext.kind === "weekend-destinations" ? "Plan around the calendar" : "Dated things to do"}</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">{eventContext.kind === "weekend-destinations" ? "Upcoming events in these weekend destinations" : `Upcoming events in and near ${metro.name}`}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{eventContext.kind === "weekend-destinations" ? "These events are limited to towns represented by the weekend-trip destinations on this page." : "These source-verified events are in the metro or in nearby towns already represented by this page."}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {eventContext.events.map((event) => <article key={event.id} className="border-t border-border pt-5">
            <p className="eyebrow text-primary">{event.categoryLabel} · {event.dateLabel}</p>
            <h3 className="mt-3 font-display text-2xl"><a href={event.guidePath} className="hover:text-primary">{event.title}</a></h3>
            <p className="mt-2 text-sm text-muted-foreground">{event.locationLabel}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
              <a href={event.guidePath} className="border-b border-primary pb-1 text-primary">Event guide →</a>
              <EventTicketCta cta={event.ticketCta} linkClassName="border-b border-border pb-1 hover:text-primary" wrapperClassName="inline-flex flex-wrap gap-2" disclosureClassName="basis-full text-xs font-normal text-muted-foreground" />
              <a href={event.officialEventUrl} target="_blank" rel="noreferrer noopener" className="border-b border-border pb-1 hover:text-primary">Official event site ↗</a>
            </div>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">Last verified {event.lastVerifiedLabel}. Confirm event-day details with the official source before traveling.</p>
          </article>)}
        </div>
        <a href="/events" className="mt-8 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">View all Texas events →</a>
      </Container>
    </section>}

    {mapMarkers.length > 0 && !isMcAllenDayTrips && <Container className="py-14 sm:py-18">
      <MapPreview markers={mapMarkers} zoom={7} directionsLabel={isMcAllenDayTrips ? `additional researched places near ${metro.name}` : `${presentation.label} near ${metro.name}`} origin={metro.center} originLabel={metro.name} variant={isMcAllenDayTrips ? "cards" : "list"} />
    </Container>}

    {groups.map((group, groupIndex) => <section key={group.band} className={groupIndex % 2 ? "border-y border-border bg-surface" : ""}>
      <Container className="py-14 sm:py-18">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">{isMcAllenDayTrips ? "More places to consider" : isAustinTwoHourGuide ? "Town guides" : bandLabel(group.band, collection)}</p>
          <h2 className="mt-3 font-display text-4xl">{isMcAllenDayTrips ? `${group.rows.length} additional place${group.rows.length === 1 ? "" : "s"} beyond the curated itineraries` : isAustinTwoHourGuide ? `${group.rows.length} places worth building a day around` : `${group.rows.length} full TexasDefined guide${group.rows.length === 1 ? "" : "s"} in this geographic band`}</h2>
        </div>
        <div className="mt-9 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {group.rows.map((row, index) => <div key={row.destination.slug}>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <p className="eyebrow text-primary">{isAustinTwoHourGuide && austinEditorial(row.destination.slug) ? austinEditorial(row.destination.slug)!.drive : isMcAllenDayTrips ? "Check the actual driving route" : `About ${Math.round(row.distanceMiles)} geographic miles`}</p>
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
            {counties.map((county) => <Link key={county} to="/county/$slug" params={{ slug: countySlug(county)! }} className="eyebrow border-b border-border pb-1 hover:border-primary hover:text-primary">{county} County</Link>)}
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
