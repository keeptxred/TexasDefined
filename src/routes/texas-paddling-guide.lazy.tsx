import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { editorialImageSrc } from "@/lib/editorial-image-delivery";

const verifiedTrips = [
  {
    "name": "Lady Bird Lake",
    "route": "3.15-mile Tom Miller Dam, 3.25-mile Barton Springs, or 4.8-mile Festival Beach loop",
    "access": "Multiple access points, including Redbud Trail and Festival Beach; 1–6 hours depending on selected loop",
    "check": "Choose a named TPWD loop and exact put-in; check wind and current water level",
    "official": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/lady-bird-lake/",
    "related": "/explore/lakes-rivers"
  },
  {
    "name": "Buffalo Bayou",
    "route": "26-mile trail in manageable one-way segments; TPWD estimates roughly 1–4.5 hours per segment",
    "access": "Launch options run from Highway 6 to Allen's Landing; arrange a legitimate downstream takeout and shuttle",
    "check": "Check flow, possible strainers, recent rainfall and water-quality advisories; do not plan all 26 miles as a casual day",
    "official": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/",
    "related": "/fishing"
  },
  {
    "name": "Bosque Bluffs & Brazos Bridges",
    "route": "2.2-mile Bosque Bluffs loop or 4.8-mile Brazos Bridges loop; roughly 1–3 hours",
    "access": "MCC Boat Ramp or Brazos Park East launch; both are designed as loops with no shuttle required",
    "check": "Pick the matching ramp and loop; recheck high water and runoff before bringing beginners",
    "official": "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bosque-bluffs-and-brazos-bridges/",
    "related": "/explore/lakes-rivers"
  },
  {
    "name": "Hell's Half Acre",
    "route": "8.8-mile marked Caddo Lake loop; TPWD estimates 3–4 hours",
    "access": "Mill Pond canoe/kayak launch inside Caddo Lake State Park; follow red reflective trail arrows",
    "check": "Download the route and watch changing lake levels, motorboat traffic and WMA boundaries",
    "official": "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/hells-half-acre/",
    "related": "/explore/state-parks"
  },
  {
    "name": "Lighthouse Lakes",
    "route": "Four coastal loops, 1.25–6.8 miles; TPWD estimates 45 minutes–3 hours",
    "access": "Access from Hwy 361 at Lighthouse Lakes Trail Park or the listed loop put-ins",
    "check": "Strong southeasterly wind, tidal conditions and crossing the busy Aransas Channel make this a different proposition from a lake loop; TPWD discourages canoes",
    "official": "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/lighthouse-lakes/",
    "related": "/explore/beaches-coast"
  }
] as const;

const waterConditionDesk = [
  { decision: "Redbud Trail and Festival Beach serve different Lady Bird Lake launch choices. Match the selected TPWD loop to its precise takeout and confirm ramp access; an urban waterfront is not one continuous public launch.", second: "Wind can make the return leg much harder on open lake water. Check the local forecast and official TPWD launch information before choosing the 3.15-, 3.25- or 4.8-mile loop.", conditionsUrl: "https://www.weather.gov/ewx/" },
  { decision: "On Buffalo Bayou, identify two official, legally accessible points before scheduling a shuttle. Highway 6 to Allen's Landing is a 26-mile system, not a suggested single outing.", second: "Use nearby USGS streamflow readings and local flood alerts to interpret recent runoff. Gauge values do not establish that a specific launch, passage or takeout is open.", conditionsUrl: "https://dashboard.waterdata.usgs.gov/" },
  { decision: "Pick MCC Boat Ramp for the Bosque Bluffs route or Brazos Park East for the Brazos Bridges route, following TPWD's matching map rather than selecting ramps by proximity alone.", second: "Urban loops normally avoid a vehicle shuttle, but high flows and runoff can render the river inappropriate. Review current gauge trends and access notices before launching.", conditionsUrl: "https://waterdata.usgs.gov/state/texas/" },
  { decision: "Use the Mill Pond canoe/kayak launch within Caddo Lake State Park for the named 8.8-mile loop. The red markers and adjacent boat roads matter more than a phone's shortest route.", second: "Before entering swamp channels, verify water levels, wildlife management boundaries, park opening/closing access and the condition of the return passage.", conditionsUrl: "https://tpwd.texas.gov/state-parks/caddo-lake" },
  { decision: "Start from the correct Highway 361 access for the named Lighthouse Lakes loop; do not mistake the four marked routes for a sheltered inland trail.", second: "Check Corpus Christi-area marine forecast, predicted tides, wind and boat traffic. An Aransas Channel crossing and shallow seagrass flats require a distinct coastal-weather decision.", conditionsUrl: "https://www.weather.gov/crp/marine" },
] as const;
// Names and route relationships come from the individual TPWD paddling trail access maps.
// Map-search links are a driving aid, never a substitute for TPWD's legal water access map.
const paddlingAccessMap = [
  {
    name: "Lady Bird Lake — Austin",
    putIn: "TPWD Redbud Trail launch (30.2911, -97.7879) for the upstream Tom Miller Dam loop",
    takeOut: "Return to the same launch on the Tom Miller Dam loop; Festival Beach is a DIFFERENT launch for the Festival Beach loop",
    shuttle: "Loop: no vehicle shuttle; choose one named access point and return to it",
    launchCoordinates: "30.2911,-97.7879",
    exitCoordinates: "30.2483,-97.7278",
    official: "https://tpwd.texas.gov/boating/paddling-trails/hill-country/lady-bird-lake/",
    conditionUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-08158000/",
    conditionLabel: "USGS Colorado River at Austin (downstream flow context; not this lake's level)",
  },
  {
    name: "Buffalo Bayou — Houston",
    putIn: "TPWD Highway 6 access (29.7694, -95.6434), western start of the 26-mile system",
    takeOut: "Terry Hershy Park access (29.7733, -95.6233) or another specifically mapped downstream access for a shorter segment; the full route ends at Allen's Landing",
    shuttle: "One-way: first verify both public points and arrange vehicle retrieval; do not attempt all 26 miles as one casual float",
    launchCoordinates: "29.7694,-95.6434",
    exitCoordinates: "29.7733,-95.6233",
    official: "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/",
    conditionUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-08074000/",
    conditionLabel: "USGS Buffalo Bayou at Houston (downstream reference gauge)",
  },
  {
    name: "Bosque Bluffs & Brazos Bridges — Waco",
    putIn: "MCC Boat Ramp (31.5929, -97.1693) for Bosque Bluffs; Brazos Park East (31.5879, -97.1534) for Brazos Bridges",
    takeOut: "Bosque Bluffs turns at Brazos Park East (31.5879, -97.1534), then returns to MCC; Brazos Bridges turns at Bledsoe-Miller Community Center Dock (31.5628, -97.1293), then returns to Brazos Park East",
    shuttle: "Both TPWD loops return to their own launch, so no vehicle shuttle is needed. Brazos Park East is the Bosque turnaround but the Brazos Bridges start; Bledsoe-Miller dock is the Brazos Bridges turnaround.",
    launchCoordinates: "31.5929,-97.1693",
    exitCoordinates: "31.5879,-97.1534",
    official: "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bosque-bluffs-and-brazos-bridges/",
    conditionUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-08096500/",
    conditionLabel: "USGS Brazos River at Waco (rain and flow context)",
  },
  {
    name: "Hell's Half Acre — Caddo Lake",
    putIn: "Mill Pond canoe/kayak launch (32.6942, -94.1758) at Caddo Lake State Park",
    takeOut: "Return to Mill Pond launch on the signed 8.8-mile loop; follow TPWD's reflective red arrows and marked boat roads",
    shuttle: "Loop: no vehicle shuttle, but route markers, lake level and return daylight still govern the trip",
    launchCoordinates: "32.6942,-94.1758",
    exitCoordinates: "32.6942,-94.1758",
    official: "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/hells-half-acre/",
    conditionUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-07346000/",
    conditionLabel: "USGS Big Cypress Bayou near Jefferson (upstream context; not an access clearance)",
  },
  {
    name: "Lighthouse Lakes — Aransas Pass",
    putIn: "Lighthouse Lakes Trail Park (27.8691, -97.0834) on Hwy 361, about five miles from the Aransas Pass H-E-B for Cutters Loop; Crabman Marina (27.8753, -97.0901) about four miles from the H-E-B for South Bay Loop",
    takeOut: "Same designated launch for the chosen Lighthouse Lakes loop; crossing Aransas Channel is part of the approach",
    shuttle: "Coastal loops: no car shuttle; treat tide, headwind, boat traffic and shallow seagrass flats as route decisions",
    launchCoordinates: "27.8691,-97.0834",
    exitCoordinates: "27.8691,-97.0834",
    official: "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/lighthouse-lakes/",
    conditionUrl: "https://tidesandcurrents.noaa.gov/stationhome.html?id=8775083",
    conditionLabel: "NOAA Aransas Pass/Redfish Bay tide predictions (station 8775083)",
  },
] as const;

const officialSources = [
  { label: "TPWD — Paddling Trails FAQs and PFD rules", href: "https://tpwd.texas.gov/boating/paddling-trails/faqs/", note: "State paddling trip-planning guidance, launch decisions and child PFD requirements." },
  { label: "USGS — Texas Water Conditions", href: "https://waterdata.usgs.gov/state/texas/", note: "Locate relevant current river-stage and streamflow monitoring; a gauge is not a trail closure notice." },
  { label: "NWS Corpus Christi — Coastal Marine Weather", href: "https://www.weather.gov/crp/marine", note: "Official marine hazards and tide/forecast resources relevant to the Lighthouse Lakes coastal route." },
  { label: "Texas Parks & Wildlife — Texas Paddling Trails", href: "https://tpwd.texas.gov/boating/paddling-trails/", note: "Statewide official trail system, trail finder and regional planning entry point." },
  { label: "Texas Parks & Wildlife — Lady Bird Lake Paddling Trail", href: "https://tpwd.texas.gov/boating/paddling-trails/hill-country/lady-bird-lake/", note: "Official access points, route lengths, float-time context, wind and water-level guidance for Austin." },
  { label: "Texas Parks & Wildlife — Buffalo Bayou Paddling Trail", href: "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/", note: "Official Houston access points, segment timing, water-quality notes and trail map guidance." },
  { label: "Texas Parks & Wildlife — Bosque Bluffs & Brazos Bridges", href: "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bosque-bluffs-and-brazos-bridges/", note: "Official Waco trail access, route design and high-flow/rainfall cautions." },
  { label: "Texas Parks & Wildlife — Hell's Half Acre Paddling Trail", href: "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/hells-half-acre/", note: "Official Caddo Lake access, route markers, variable-water-level and motorboat-traffic guidance." },
  { label: "Texas Parks & Wildlife — Lighthouse Lakes Paddling Trail", href: "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/lighthouse-lakes/", note: "Official coastal loop, access, navigation and seagrass-conservation guidance near Aransas Pass." },
] as const;

const trails = [
  {
    name: "Lady Bird Lake Paddling Trail",
    region: "Austin · Hill Country",
    summary: "An urban Colorado River reservoir with multiple public access points and several loop options rather than one fixed start-to-finish trip.",
    details: [
      "TPWD describes roughly 11 miles of total paddling with shorter loops around Tom Miller Dam, Barton Springs and Festival Beach. Multiple access points make it easier to scale the outing to time and conditions instead of treating the entire lake as one mandatory route.",
      "Wind speed and water levels affect float time, so a saved estimate should not control the day. Check current weather and local water conditions before launching, and use the official access list rather than assuming every shoreline point is a legal put-in or takeout.",
    ],
  },
  {
    name: "Buffalo Bayou Paddling Trail",
    region: "Houston · Gulf Coast",
    summary: "A 26-mile urban bayou trail designed to be paddled in segments between numerous public access points.",
    details: [
      "TPWD says the full trail is too long for a typical one-day paddle and publishes access points and estimated segment times from Highway 6 to Allen's Landing. That makes shuttle and takeout planning part of the trip before anyone gets on the water.",
      "Water level, flow and water quality can vary. TPWD notes that swimming is generally unsuitable on the bayou, so visitors should treat paddling access and contact with the water as separate planning questions and check current conditions after storms or high runoff.",
    ],
  },
  {
    name: "Bosque Bluffs & Brazos Bridges Paddling Trails",
    region: "Waco · Prairies and Lakes",
    summary: "Two accessible urban river routes with loop-style options and official warnings about rainfall-driven flow changes.",
    details: [
      "The Waco trails use established access points on the Bosque and Brazos and were designed to support relatively straightforward day outings. Their urban setting does not remove river risk: TPWD specifically warns that heavy rain and high water can create dangerous conditions.",
      "Use the current trail map and river information before launching. Rainfall runoff can also temporarily affect water quality, so same-day conditions matter more than an itinerary built around normal flow assumptions.",
    ],
  },
  {
    name: "Hell's Half Acre Paddling Trail",
    region: "Caddo Lake · Piney Woods",
    summary: "An 8.8-mile loop through Big Cypress Bayou and Caddo Lake's bald-cypress swamp, with marked boat roads and highly variable water levels.",
    details: [
      "TPWD marks the route with reflective arrows and notes that the trail shares portions of the Caddo Lake boat-road network. Water levels can change access and motorboat traffic can be seasonally heavy, so the swamp should not be treated like a static flatwater maze.",
      "Private-property boundaries, surrounding wildlife-management land and seasonal hunting activity add planning context. Follow the marked route and current TPWD guidance rather than wandering onto adjacent banks or assuming every visible channel is part of the certified trail.",
    ],
  },
  {
    name: "Lighthouse Lakes Paddling Trail",
    region: "Aransas Pass · Gulf Coast",
    summary: "The first Texas Paddling Trail, built as a series of coastal loops through mangroves, seagrass flats, sloughs and back lakes.",
    details: [
      "TPWD lists four loops ranging from short outings to longer coastal paddles. Tides, wind and open-water exposure make current marine conditions part of launch planning even when the mapped route itself is familiar.",
      "The trail lies within the Redfish Bay State Scientific Area, where seagrass protection matters. Use the official route and access guidance and avoid treating shallow flats as unrestricted shortcuts simply because they appear passable.",
    ],
  },
] as const;

const planningPaths = [
  { to: "/texas-mountain-biking-guide", label: "Mountain biking", description: "Compare land-based trail options and entry planning for multi-activity travel." },
  { to: "/texas-horseback-riding-guide", label: "Horseback riding", description: "Check separate equestrian reservations and trail access when planning shared destinations." },
  { to: "/explore/lakes-rivers", label: "Lakes & rivers", description: "Put official paddling trails inside the broader Texas waterway and access picture." },
  { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Connect paddling to weather, habitat, public-land access and seasonal conditions." },
  { to: "/explore/state-parks", label: "Texas state parks", description: "Find managed public-water access, camping and park-specific paddling opportunities." },
  { to: "/fishing", label: "Texas fishing", description: "Pair paddling destinations with current fishing regulations and waterbody guidance." },
  { to: "/explore/beaches-coast", label: "Beaches & Gulf Coast", description: "Plan coastal paddles around bays, barrier islands, wind and marine conditions." },
  { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Sequence launches, takeouts, shuttles, lodging and nearby stops around realistic drive times." },
] as const;

export const Route = createLazyFileRoute("/texas-paddling-guide")({ component: TexasPaddlingGuidePage });

function TexasPaddlingGuidePage() {
  return (
    <main className="pb-20">
      <Container className="pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/explore" className="hover:text-foreground">Explore Texas</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/explore/lakes-rivers" className="hover:text-foreground">Lakes &amp; Rivers</Link>
        </nav>
      </Container>

      <Container className="pt-10">
        <article className="mx-auto max-w-5xl">
          <header className="border-b border-border pb-10">
            <p className="eyebrow text-primary">Official trails · access points · current conditions</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Paddling Guide</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A visitor-first guide to five official paddling trails, with the launch, takeout, water-level, wind, private-property and current-condition questions to resolve before getting on the water.</p>
          </header>

          <figure className="border-b border-border py-8">
            <img
              src={editorialImageSrc("https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Recreational_kayakers_paddling_on_the_surface_of_Lady_Bird_Lake.jpg/1280px-Recreational_kayakers_paddling_on_the_surface_of_Lady_Bird_Lake.jpg")}
              alt="Two kayakers on the actual Lady Bird Lake paddling trail in Austin"
              width={1280}
              height={856}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="aspect-[3/2] w-full object-cover"
            />
            <figcaption className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
              Actual kayakers paddling on Lady Bird Lake in Austin. A real photograph of the first official trail profiled here. Photo:{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Recreational_kayakers_paddling_on_the_surface_of_Lady_Bird_Lake.jpg" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">Oleg Yunakov</a>
              {" "}(2024) · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">CC BY-SA 4.0</a>.
              Display crop only; the original and its license are available at the linked Commons file page.
            </figcaption>
          </figure>

          <section className="border-b border-border py-10" aria-labelledby="trail-comparison">
            <p className="eyebrow text-primary">Compare real outings</p>
            <h2 id="trail-comparison" className="mt-2 font-display text-3xl">Five different paddles, five different launch plans</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">Distances and durations below come from the named TPWD trail pages, not a guessed statewide average. Times are approximate and change with wind, current, stops and ability. Match the put-in to the exact route before leaving.</p>
            <p className="mt-3 text-sm text-muted-foreground md:hidden">Compare the same destinations and details in the cards below.</p>
            <div className="mt-5 grid gap-3 md:hidden" aria-label="Mobile comparison summary">
              {verifiedTrips.map((row) => (
                <div key={row.name} className="min-w-0 rounded-sm border border-border p-4">
                  <h3 className="font-display text-xl">{row.name}</h3>
                  <dl className="mt-3 space-y-2 text-sm leading-6">
                    <div><dt className="font-semibold">Route choice and scale</dt><dd className="text-muted-foreground break-words">{row.route}</dd></div>
                    <div><dt className="font-semibold">Launch and shuttle</dt><dd className="text-muted-foreground break-words">{row.access}</dd></div>
                  </dl>
                </div>
              ))}
            </div>
            <div className="mt-6 hidden overflow-x-auto border border-border md:block" role="region" tabIndex={0} aria-label="Five official Texas paddling trails comparison table">
              <table className="w-full border-collapse text-left text-sm" style={{ minWidth: "760px" }}>
                <thead className="bg-muted/50"><tr><th scope="col" className="border-b border-border p-4">Paddling trail</th><th scope="col" className="border-b border-border p-4">Route choice / scale</th><th scope="col" className="border-b border-border p-4">Launch and shuttle</th></tr></thead>
                <tbody>{verifiedTrips.map((trip) => <tr key={trip.name} className="align-top"><th scope="row" className="border-b border-border p-4 font-semibold">{trip.name}</th><td className="border-b border-border p-4 text-muted-foreground">{trip.route}</td><td className="border-b border-border p-4 text-muted-foreground">{trip.access}</td></tr>)}</tbody>
              </table>
            </div>
          </section>
          <section className="border-b border-border py-10" aria-labelledby="paddle-launch-selection">
            <h2 id="paddle-launch-selection" className="font-display text-3xl">Which put-in and takeout make a practical Texas paddle?</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">Choose a return-to-launch loop when traveling with one vehicle; plan a legal downstream takeout and shuttle before entering a one-way bayou segment. Use the plotted access-point locations below for trip planning, not as a navigational chart or swimming clearance.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">Buffalo Bayou: shorter first shuttle</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">TPWD estimates roughly one hour from Highway 6 to Terry Hershy Park and another hour to Dairy Ashford. Farther downstream, the West Sam Houston Parkway to Briar Bend segment alone can take three to four hours. These are estimates, not safe-flow promises.</p><a href="https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block break-words font-semibold text-primary underline underline-offset-4">TPWD complete segment times</a></div>
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">Lady Bird Lake: choose a loop</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">The 3.15-mile Tom Miller Dam loop, 3.25-mile Barton Springs loop and 4.8-mile Festival Beach loop differ in launch location and distance. Match the loop to the TPWD map and confirm wind, dam boundaries, launch rules and return transport.</p><a href="https://tpwd.texas.gov/boating/paddling-trails/hill-country/lady-bird-lake/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block break-words font-semibold text-primary underline underline-offset-4">TPWD route and access locations</a></div>
            </div>
            <div className="mt-5 min-w-0 rounded-sm border border-border p-4"><h3 className="font-display text-2xl">Buffalo Bayou (west to east)</h3><p className="mt-2 text-sm text-muted-foreground">Numbered access coordinates plotted from TPWD. Axes are stretched to fit; no water route is drawn. North is up. Use the numbered links for individual directions.</p><svg viewBox="0 0 600 160" role="img" aria-label="Buffalo Bayou (west to east) access-point location diagram" className="mt-4 h-auto w-full border border-border bg-muted/30"><text x="8" y="15" fontSize="12" fill="currentColor">N ↑</text><circle cx="25" cy="49" r="10" fill="currentColor" /><text x="25" y="53" textAnchor="middle" fontSize="10" className="fill-background">1</text><circle cx="64" cy="35" r="10" fill="currentColor" /><text x="64" y="39" textAnchor="middle" fontSize="10" className="fill-background">2</text><circle cx="97" cy="77" r="10" fill="currentColor" /><text x="97" y="81" textAnchor="middle" fontSize="10" className="fill-background">3</text><circle cx="190" cy="76" r="10" fill="currentColor" /><text x="190" y="80" textAnchor="middle" fontSize="10" className="fill-background">4</text><circle cx="289" cy="135" r="10" fill="currentColor" /><text x="289" y="139" textAnchor="middle" fontSize="10" className="fill-background">5</text><circle cx="386" cy="67" r="10" fill="currentColor" /><text x="386" y="71" textAnchor="middle" fontSize="10" className="fill-background">6</text><circle cx="454" cy="90" r="10" fill="currentColor" /><text x="454" y="94" textAnchor="middle" fontSize="10" className="fill-background">7</text><circle cx="538" cy="77" r="10" fill="currentColor" /><text x="538" y="81" textAnchor="middle" fontSize="10" className="fill-background">8</text><circle cx="547" cy="76" r="10" fill="currentColor" /><text x="547" y="80" textAnchor="middle" fontSize="10" className="fill-background">9</text><circle cx="575" cy="67" r="10" fill="currentColor" /><text x="575" y="71" textAnchor="middle" fontSize="10" className="fill-background">10</text></svg><ol className="mt-4 grid list-decimal gap-2 pl-5 text-sm sm:grid-cols-2"><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=29.7694%2C-95.6434" target="_blank" rel="noopener noreferrer">Highway 6</a> <span className="block text-xs tabular-nums text-muted-foreground">29.7694, -95.6434</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=29.7733%2C-95.6233" target="_blank" rel="noopener noreferrer">Terry Hershy Park</a> <span className="block text-xs tabular-nums text-muted-foreground">29.7733, -95.6233</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=29.7617%2C-95.6064" target="_blank" rel="noopener noreferrer">Dairy Ashford Road</a> <span className="block text-xs tabular-nums text-muted-foreground">29.7617, -95.6064</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=29.7622%2C-95.5583" target="_blank" rel="noopener noreferrer">West Sam Houston Parkway</a> <span className="block text-xs tabular-nums text-muted-foreground">29.7622, -95.5583</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=29.746%2C-95.5072" target="_blank" rel="noopener noreferrer">Briar Bend Park</a> <span className="block text-xs tabular-nums text-muted-foreground">29.7460, -95.5072</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=29.7647%2C-95.4569" target="_blank" rel="noopener noreferrer">Woodway Memorial Park</a> <span className="block text-xs tabular-nums text-muted-foreground">29.7647, -95.4569</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=29.7583%2C-95.4217" target="_blank" rel="noopener noreferrer">Hogg Bird Sanctuary</a> <span className="block text-xs tabular-nums text-muted-foreground">29.7583, -95.4217</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=29.7617%2C-95.3783" target="_blank" rel="noopener noreferrer">Eleanor Tinsley Park</a> <span className="block text-xs tabular-nums text-muted-foreground">29.7617, -95.3783</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=29.7622%2C-95.3736" target="_blank" rel="noopener noreferrer">Sabine Street Access</a> <span className="block text-xs tabular-nums text-muted-foreground">29.7622, -95.3736</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=29.7647%2C-95.3592" target="_blank" rel="noopener noreferrer">Allen's Landing Park</a> <span className="block text-xs tabular-nums text-muted-foreground">29.7647, -95.3592</span></li></ol></div>
            <div className="mt-5 min-w-0 rounded-sm border border-border p-4"><h3 className="font-display text-2xl">Lady Bird Lake (west to east)</h3><p className="mt-2 text-sm text-muted-foreground">Numbered access coordinates plotted from TPWD. Axes are stretched to fit; no water route is drawn. North is up. Use the numbered links for individual directions.</p><svg viewBox="0 0 600 160" role="img" aria-label="Lady Bird Lake (west to east) access-point location diagram" className="mt-4 h-auto w-full border border-border bg-muted/30"><text x="8" y="15" fontSize="12" fill="currentColor">N ↑</text><circle cx="25" cy="35" r="10" fill="currentColor" /><text x="25" y="39" textAnchor="middle" fontSize="10" className="fill-background">1</text><circle cx="148" cy="73" r="10" fill="currentColor" /><text x="148" y="77" textAnchor="middle" fontSize="10" className="fill-background">2</text><circle cx="198" cy="80" r="10" fill="currentColor" /><text x="198" y="84" textAnchor="middle" fontSize="10" className="fill-background">3</text><circle cx="225" cy="84" r="10" fill="currentColor" /><text x="225" y="88" textAnchor="middle" fontSize="10" className="fill-background">4</text><circle cx="206" cy="98" r="10" fill="currentColor" /><text x="206" y="102" textAnchor="middle" fontSize="10" className="fill-background">5</text><circle cx="487" cy="125" r="10" fill="currentColor" /><text x="487" y="129" textAnchor="middle" fontSize="10" className="fill-background">6</text><circle cx="497" cy="128" r="10" fill="currentColor" /><text x="497" y="132" textAnchor="middle" fontSize="10" className="fill-background">7</text><circle cx="575" cy="135" r="10" fill="currentColor" /><text x="575" y="139" textAnchor="middle" fontSize="10" className="fill-background">8</text></svg><ol className="mt-4 grid list-decimal gap-2 pl-5 text-sm sm:grid-cols-2"><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=30.2911%2C-97.7879" target="_blank" rel="noopener noreferrer">Redbud Trail</a> <span className="block text-xs tabular-nums text-muted-foreground">30.2911, -97.7879</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=30.2748%2C-97.7745" target="_blank" rel="noopener noreferrer">UT Women's Rowing Center</a> <span className="block text-xs tabular-nums text-muted-foreground">30.2748, -97.7745</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=30.2719%2C-97.769" target="_blank" rel="noopener noreferrer">Texas Rowing Center</a> <span className="block text-xs tabular-nums text-muted-foreground">30.2719, -97.7690</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=30.2702%2C-97.766" target="_blank" rel="noopener noreferrer">Cesar Chavez</a> <span className="block text-xs tabular-nums text-muted-foreground">30.2702, -97.7660</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=30.2642%2C-97.7681" target="_blank" rel="noopener noreferrer">Barton Creek</a> <span className="block text-xs tabular-nums text-muted-foreground">30.2642, -97.7681</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=30.2524%2C-97.7374" target="_blank" rel="noopener noreferrer">Holiday Inn</a> <span className="block text-xs tabular-nums text-muted-foreground">30.2524, -97.7374</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=30.2515%2C-97.7363" target="_blank" rel="noopener noreferrer">IH 35 Bridge</a> <span className="block text-xs tabular-nums text-muted-foreground">30.2515, -97.7363</span></li><li className="min-w-0"><a className="break-words text-primary underline" href="https://www.google.com/maps/search/?api=1&amp;query=30.2483%2C-97.7278" target="_blank" rel="noopener noreferrer">Festival Beach</a> <span className="block text-xs tabular-nums text-muted-foreground">30.2483, -97.7278</span></li></ol></div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">Waco: Bosque Bluffs and Brazos Bridges</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Both loops return to their starting ramps. The middle ramp serves as the Bosque turnaround and the Brazos Bridges launch.</p><ul className="mt-3 space-y-2 text-sm"><li><a href="https://www.google.com/maps/search/?api=1&amp;query=31.5929%2C-97.1693" target="_blank" rel="noopener noreferrer" className="break-words text-primary underline">McLennan Community College Boat Ramp</a> <span className="block text-xs text-muted-foreground">31.5929, -97.1693</span></li><li><a href="https://www.google.com/maps/search/?api=1&amp;query=31.5879%2C-97.1534" target="_blank" rel="noopener noreferrer" className="break-words text-primary underline">Brazos Park East Kayak/Canoe Ramp</a> <span className="block text-xs text-muted-foreground">31.5879, -97.1534</span></li><li><a href="https://www.google.com/maps/search/?api=1&amp;query=31.5628%2C-97.1293" target="_blank" rel="noopener noreferrer" className="break-words text-primary underline">Bledsoe Miller Community Center Dock</a> <span className="block text-xs text-muted-foreground">31.5628, -97.1293</span></li></ul></div>
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">Caddo Lake: Hell's Half Acre</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">The named 8.8-mile loop starts and finishes at Mill Pond inside the state park. Turn onto FM 2198 from Hwy 43, then follow Park Road 2 to the launch. Follow red reflective arrows; download the TPWD route rather than navigating directly between coordinates.</p><ul className="mt-3 space-y-2 text-sm"><li><a href="https://www.google.com/maps/search/?api=1&amp;query=32.6942%2C-94.1758" target="_blank" rel="noopener noreferrer" className="break-words text-primary underline">Mill Pond Canoe/Kayak Launch</a> <span className="block text-xs text-muted-foreground">32.6942, -94.1758</span></li></ul></div>
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">Lighthouse Lakes: coastal access</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Use the exact launch that corresponds to the selected loop. TPWD also lists the Red Fish Loop initial access and a fourth initial access point. Cross the Aransas Channel only when conditions permit; check marine winds, boat traffic and NOAA tide predictions first.</p><ul className="mt-3 space-y-2 text-sm"><li><a href="https://www.google.com/maps/search/?api=1&amp;query=27.8753%2C-97.0901" target="_blank" rel="noopener noreferrer" className="break-words text-primary underline">Crabman Marina — South Bay Loop</a> <span className="block text-xs text-muted-foreground">27.8753, -97.0901</span></li><li><a href="https://www.google.com/maps/search/?api=1&amp;query=27.8691%2C-97.0834" target="_blank" rel="noopener noreferrer" className="break-words text-primary underline">Lighthouse Lakes Trail Park — Cutters Loop</a> <span className="block text-xs text-muted-foreground">27.8691, -97.0834</span></li><li><a href="https://www.google.com/maps/search/?api=1&amp;query=27.8622%2C-97.0759" target="_blank" rel="noopener noreferrer" className="break-words text-primary underline">Red Fish Loop initial access</a> <span className="block text-xs text-muted-foreground">27.8622, -97.0759</span></li><li><a href="https://www.google.com/maps/search/?api=1&amp;query=27.868%2C-97.0853" target="_blank" rel="noopener noreferrer" className="break-words text-primary underline">Additional initial access point</a> <span className="block text-xs text-muted-foreground">27.8680, -97.0853</span></li></ul></div>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Confirm the current operator's legal access, parking and any closures before launching. Coordinate pins do not grant permission to cross private land.</p>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="paddle-access-map">
            <p className="eyebrow text-primary">Map the launch and exit first</p>
            <h2 id="paddle-access-map" className="mt-2 font-display text-3xl">Individual put-ins, takeouts and water-condition links</h2>
            <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">Use each TPWD official access map for the actual water entry and legal takeout. The destination map links use the exact access coordinates published by TPWD (not guessed map-search pins); a coordinate pin is not proof of permission to launch, of an open gate, or of safe water. Gauges and tide predictions are context rather than go/no-go thresholds.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {paddlingAccessMap.map((place) => (
                <div key={place.name} className="min-w-0 border border-border p-5">
                  <h3 className="font-display text-xl">{place.name}</h3>
                  <div className="mt-4 space-y-2 text-sm leading-7">
                    <p><strong>Put-in:</strong> {place.putIn}</p>
                    <p><strong>Takeout:</strong> {place.takeOut}</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong>Shuttle / route:</strong> {place.shuttle}</p>
                  <nav aria-label={place.name + " access and conditions"} className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
                    <a href={place.official} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">TPWD access-point map</a>
                    <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place.launchCoordinates)} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">TPWD put-in GPS map</a>
                    <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place.exitCoordinates)} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Second TPWD access GPS map</a>
                    <a href={place.conditionUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">{place.conditionLabel}</a>
                  </nav>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">For Lighthouse Lakes, also consult the <a href="https://www.weather.gov/crp/marine" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">NWS Corpus Christi marine forecast</a> and the <a href="https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/lighthouse-lakes/gps/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">TPWD numbered GPS-point map</a>. Tide predictions at a nearby harbor station do not exactly describe shallow back-lake water levels at every point along the loop.</p>
          </section>
          <section className="border-b border-border py-9" aria-labelledby="quick-answer">
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="quick-answer" className="mt-2 font-display text-3xl">Choose the waterbody first, then verify today's conditions</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">Texas Parks &amp; Wildlife maintains 100 certified paddling trails across rivers, lakes, bayous and bays. The map gives you the route; current wind, flow, water level, weather, launch access and land-manager notices decide whether that route makes sense today.</p>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="real-time-tools">
            <p className="eyebrow text-primary">Research the trip, not just the map</p>
            <h2 id="real-time-tools" className="mt-2 font-display text-3xl">Use three different live sources before the put-in</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>First, use <a href="https://tpwd.texas.gov/boating/paddling-trails/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">TPWD's current trail maps and official paddling-trail finder</a> for the legal entry, exits and mapped trail length. A route-marked lake loop does not require the same shuttle as a one-way urban bayou segment.</p>
              <p>Second, find any relevant current <a href="https://waterdata.usgs.gov/state/texas/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">USGS river gauge</a>, if one exists near your route, and compare its trend with land-manager warnings. A reading at one station does not certify safe flow, water quality or clear passage at another access point.</p>
              <p>Third, check the <a href="https://www.weather.gov/crp/marine" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">NWS Corpus Christi marine conditions</a> for Lighthouse Lakes and the local forecast for inland routes. TPWD's <a href="https://tpwd.texas.gov/boating/paddling-trails/faqs/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">paddling FAQs</a> also explain current Texas PFD requirements, including mandatory wear for children under 13 when their vessel is underway.</p>
            </div>
          </section>
          <section className="border-b border-border py-10" aria-labelledby="before-launch">
            <p className="eyebrow text-primary">Before you launch</p>
            <h2 id="before-launch" className="mt-2 font-display text-3xl">Check the route, weather and exit plan before launching</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Confirm the legal put-in and takeout, shuttle plan, current flow or water level, wind, weather and—on coastal routes—tide and marine conditions. Check current personal-flotation-device and access requirements, and make sure the planned water and distance fit the craft and group before leaving shore.</p>
              <p>Postpone or change the trip when thunderstorms, flood flows, strong wind, tides, water quality, heat, poor visibility or access conditions no longer match the route you planned. A saved trail map is useful for orientation, but current conditions and land-manager notices should control the launch decision.</p>
            </div>
          </section>

          <div>
            {trails.map((trail, index) => (
              <section key={trail.name} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
                <div>
                  <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · {trail.region}</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight">{trail.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{trail.summary}</p>
                </div>
                <div className="max-w-3xl space-y-5">
                  {trail.details.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
                  <aside className="border-l-2 border-primary bg-muted/20 px-5 py-4 text-sm leading-7">
                    <h3 className="font-display text-xl">Plan this exact route</h3>
                    <p className="mt-2"><strong>Route:</strong> {verifiedTrips[index].route}</p>
                    <p className="mt-1"><strong>Access:</strong> {verifiedTrips[index].access}</p>
                    <p className="mt-1"><strong>Decision point:</strong> {verifiedTrips[index].check}</p>
                    <div className="mt-5 border-t border-border pt-4">
                      <h3 className="font-display text-xl">Launch and current-condition decision</h3>
                      <p className="mt-2"><strong>Access:</strong> {waterConditionDesk[index].decision}</p>
                      <p className="mt-2"><strong>Same-day check:</strong> {waterConditionDesk[index].second}</p>
                      <a href={waterConditionDesk[index].conditionsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-primary underline">Check the relevant official forecast or water data</a>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      <a href={verifiedTrips[index].official} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">TPWD map, access and route details ↗</a>
                      <Link to={verifiedTrips[index].related} className="font-semibold text-primary underline underline-offset-4">Explore related TexasDefined destinations</Link>
                    </div>
                  </aside>
                </div>
              </section>
            ))}
          </div>

          <section className="border-b border-border py-10" aria-labelledby="planning">
            <p className="eyebrow text-primary">Keep planning</p>
            <h2 id="planning" className="mt-2 font-display text-3xl">Build the paddle into the wider Texas trip</h2>
            <nav aria-label="Texas paddling related guides" className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {planningPaths.map((item) => (
                <Link key={item.to} to={item.to} className="group bg-background p-5">
                  <strong className="font-display text-xl group-hover:text-primary">{item.label}</strong>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
                </Link>
              ))}
            </nav>
          </section>

          <section className="py-10" aria-labelledby="sources">
            <p className="eyebrow text-primary">Official sources</p>
            <h2 id="sources" className="mt-2 font-display text-3xl">Verify access and conditions with TPWD</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Access points, route conditions, water levels, private-property boundaries and operating guidance can change. These first-party sources support this guide and should control current trip decisions. Official TPWD trail pages cross-checked November 18, 2026; exact published launch GPS points, USGS gauges and coastal conditions reviewed November 20, 2026. Recheck current access and conditions for travel. Additional Houston and Austin access-point coordinates and segment estimates checked November 21, 2026.</p>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {officialSources.map((source) => (
                <li key={source.href} className="py-4">
                  <a href={source.href} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </Container>
    </main>
  );
}
