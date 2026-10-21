import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/explore/big-bend-scenic-drives")({ component: BigBendScenicDrives });

const routes = [
  {
    name: "Ross Maxwell Scenic Drive",
    distance: "30 miles, one way to the Castolon / Santa Elena corridor",
    surface: "Paved national-park road",
    ideal: "First-time visitors, geology, overlooks and access to Santa Elena Canyon",
    stops: ["Sam Nail Ranch", "Blue Creek / Homer Wilson Ranch overlook", "Mule Ears viewpoint", "Castolon Historic District", "Santa Elena Canyon trailhead"],
    notes: "Give the drive at least half a day with stops; do not mistake 30 road miles for a round-trip itinerary. A canyon hike may depend on water levels and trail conditions.",
    url: "https://home.nps.gov/bibe/planyourvisit/ross-maxwell-scenic-drive.htm"
  },
  {
    name: "Chisos Basin Road",
    distance: "About 6 miles from the park's lower junction to the Basin",
    surface: "Paved, steep and winding national-park road",
    ideal: "Mountain scenery, cooler habitats and trailhead access when open",
    stops: ["Chisos mountain panoramas", "Basin overlooks", "Visitor facilities when available"],
    notes: "Sharp turns and steep grades. NPS discourages RVs over 24 feet and trailers over 20 feet. Read the current construction and closure notices before departing.",
    url: "https://home.nps.gov/bibe/planyourvisit/paved-roads.htm"
  },
  {
    name: "FM 170 / Camino del Rio (River Road)",
    distance: "Choose a shorter out-and-back or a full Lajitas–Presidio corridor trip",
    surface: "Paved Texas highway, with steep curves and grades",
    ideal: "Rio Grande panoramas, Big Bend Ranch State Park and borderlands scenery",
    stops: ["Barton Warnock Visitor Center", "Closed Canyon area", "Hoodoos trailhead", "Fort Leaton Historic Site"],
    notes: "FM 170 is a public highway outside the national park; it is NOT the park's similarly named primitive River Road. Stops and side roads have separate access rules.",
    url: "https://tpwd.texas.gov/state-parks/big-bend-ranch/map"
  },
  {
    name: "Panther Junction to Rio Grande Village",
    distance: "A separate eastern-park driving block; check NPS map for current distances",
    surface: "Paved national-park road",
    ideal: "Eastern desert vistas, wetlands, birding and Rio Grande Village",
    stops: ["Panther Junction orientation", "Rio Grande Village", "Boquillas Canyon trail access when open"],
    notes: "This is not a short detour from Santa Elena Canyon. Build it as its own half day rather than stacking it onto a full Ross Maxwell outing.",
    url: "https://www.nps.gov/bibe/planyourvisit/scenic_drives.htm"
  },
  {
    name: "Old Maverick, Dagger Flat and primitive park roads",
    distance: "Variable; use individual NPS route descriptions and current road status",
    surface: "Improved dirt or primitive high-clearance / four-wheel-drive routes",
    ideal: "Prepared travelers with suitable vehicles and current local information",
    stops: ["Dagger Flat desert scenery", "Old Maverick historical sites", "Backcountry overlooks where authorized"],
    notes: "Conditions change after storms. Some routes need high clearance or 4WD and are unsafe for ordinary rental cars. Never choose a dirt road from a map line alone.",
    url: "https://www.nps.gov/bibe/planyourvisit/scenic_drives.htm"
  }
] as const;

const sources = [
  { name: "NPS: Scenic drives, surfaces and vehicle suitability", url: "https://www.nps.gov/bibe/planyourvisit/scenic_drives.htm" },
  { name: "NPS: Ross Maxwell stops and historic sites", url: "https://home.nps.gov/bibe/planyourvisit/ross-maxwell-scenic-drive.htm" },
  { name: "NPS: Paved road descriptions and Chisos Basin grades", url: "https://home.nps.gov/bibe/planyourvisit/paved-roads.htm" },
  { name: "NPS: April 2026 construction cancellation notice", url: "https://www.nps.gov/bibe/planyourvisit/construction-cancelled.htm" },
  { name: "TPWD: Big Bend Ranch and FM 170 access map", url: "https://tpwd.texas.gov/state-parks/big-bend-ranch/map" },
  { name: "TPWD: Big Bend Ranch activities and 4x4 guidance", url: "https://tpwd.texas.gov/state-parks/big-bend-ranch/activities/" },
  { name: "TxDOT: live Texas highway conditions", url: "https://drivetexas.org/" },
  { name: "NPS: visitor safety and driving", url: "https://www.nps.gov/bibe/planyourvisit/safety.htm" }
] as const;

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Big Bend Scenic Drives",
  url: "https://texasdefined.com/explore/big-bend-scenic-drives",
  description: "Five sourced scenic driving options in and near Big Bend National Park",
  dateModified: "2026-10-20",
  citation: sources.map((source) => source.url),
});

function BigBendScenicDrives() {
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    <Container className="pb-8 pt-10 sm:pt-14">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground"><Link to="/explore">Explore</Link> / <Link to="/explore/region/$region" params={{ region: "big-bend" }}>Big Bend</Link> / <span aria-current="page">Scenic drives</span></nav>
      <header className="max-w-5xl py-10">
        <p className="eyebrow text-primary">West Texas route authority • Source-reviewed October 20, 2026</p>
        <h1 className="mt-4 font-display text-5xl leading-tight sm:text-6xl">Big Bend scenic drives: choose the road that fits your day</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Ross Maxwell, Chisos Basin, FM 170 and the eastern desert are dramatically different trips. Compare paved roads with unpaved routes, pick places to stop, and check the managing agency before entering remote country.</p>
        <figure className="mt-10 max-w-5xl overflow-hidden border border-border bg-muted/20">
          <img src="https://www.nps.gov/common/uploads/cropped_image/primary/F984BA75-C910-BA76-67688CB21EE43775.jpg?mode=crop&quality=90&width=1600" alt="Mule Ears peaks beside Ross Maxwell Scenic Drive in Big Bend National Park" loading="eager" decoding="async" className="aspect-[16/9] w-full object-cover" />
          <figcaption className="px-4 py-3 text-xs text-muted-foreground">Mule Ears Overlook · NPS photograph. <a className="underline underline-offset-4" href="https://www.nps.gov/places/mule-ears-overlook.htm" target="_blank" rel="noopener noreferrer">Photograph and place details ↗</a></figcaption>
        </figure>
        <div className="mt-6 flex flex-wrap gap-3 text-sm"><a className="underline underline-offset-4 text-primary" href="https://www.nps.gov/bibe/planyourvisit/scenic_drives.htm">NPS park road guide ↗</a><a className="underline underline-offset-4 text-primary" href="https://tpwd.texas.gov/state-parks/big-bend-ranch/map">TPWD FM 170 map ↗</a><a className="underline underline-offset-4 text-primary" href="https://drivetexas.org/">TxDOT road conditions ↗</a></div>
      </header>
      <aside className="border-y border-border py-6" aria-label="Important 2026 Chisos Basin construction update">
        <h2 className="font-display text-2xl">2026 Chisos Basin access: important correction</h2>
        <p className="mt-3 leading-7">Some older National Park Service subpages still describe a planned May 2026 two-year Chisos Basin closure. The NPS published a later <a className="text-primary underline" href="https://www.nps.gov/bibe/planyourvisit/construction-cancelled.htm">April 1, 2026 cancellation notice</a> stating the proposed lodge work would not proceed and the planned Basin closure would not take place. The agency is separately reevaluating water-system work. Do not use an older closure timeline as current proof of road status; check the park's latest alerts on your travel date.</p>
      </aside>
    </Container>
    <section className="bg-surface py-12">
      <Container>
        <h2 className="font-display text-4xl">Compare the five driving choices</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">The route lengths below describe specific road segments, not complete door-to-door trip mileage. No drive time is guaranteed; photo stops, trails, weather and road restrictions determine the actual pace.</p>
        <div className="mt-8 grid gap-7">
          {routes.map((road, i) => <article key={road.name} className="border-t border-border pt-6">
            <p className="eyebrow text-primary">Route {i + 1}</p>
            <h3 className="mt-2 font-display text-3xl">{road.name}</h3>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="font-semibold">Road and distance</dt><dd className="mt-1 text-muted-foreground">{road.distance} · {road.surface}</dd></div><div><dt className="font-semibold">Best for</dt><dd className="mt-1 text-muted-foreground">{road.ideal}</dd></div></dl>
            <h4 className="mt-5 font-semibold">Worthwhile stops</h4><ul className="mt-2 list-disc pl-5 text-sm leading-7">{road.stops.map(stop=><li key={stop}>{stop}</li>)}</ul>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{road.notes}</p>
            <a href={road.url} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Controlling road source ↗</a>
          </article>)}
        </div>
      </Container>
    </section>
    <Container className="py-14">
      <h2 className="font-display text-4xl">Three realistic ways to travel</h2>
      <div className="mt-7 grid gap-8 md:grid-cols-3">
        <article className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">One full day in the national park</h3><p className="mt-3 text-sm leading-7">Start at Panther Junction for maps and conditions. Drive Ross Maxwell with a few carefully selected overlooks; reach Santa Elena Canyon only if roads and the trail are suitable. Return with daylight to spare. Skip the eastern park on this itinerary.</p></article>
        <article className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">Two days in the national park</h3><p className="mt-3 text-sm leading-7">Give the western desert, Ross Maxwell and Castolon one day. Use the second for eastern park stops, Rio Grande Village and a mountain drive if Chisos Basin Road is open. Plan around the actual lodging location.</p></article>
        <article className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">Three days with the state park</h3><p className="mt-3 text-sm leading-7">Keep the two national-park days separate. Reserve a third daylight block for Lajitas to Presidio on FM 170, choosing short trails or overlooks in Big Bend Ranch State Park. Fuel up before leaving developed services.</p></article>
      </div>
    </Container>
    <section className="bg-surface py-12"><Container>
      <h2 className="font-display text-4xl">Safety, access and vehicle suitability</h2>
      <div className="mt-7 grid gap-8 md:grid-cols-2">
        <div><h3 className="font-display text-2xl">Driving and weather</h3><p className="mt-3 text-sm leading-7">Carry extra drinking water, fill the fuel tank before remote segments, download offline maps, keep a tire and emergency plan, and anticipate weak cell service. Stay off flooded roads and avoid unnecessary night driving, when wildlife and fatigue increase risk. NPS says park roads have a maximum speed of 45 mph; never stop in a traffic lane for photographs.</p></div>
        <div><h3 className="font-display text-2xl">Paved is not always easy</h3><p className="mt-3 text-sm leading-7">Chisos Basin Road has steep grades and tight curves that exclude some recreational vehicles. For unpaved national-park or interior state-park roads, a sedan or rented crossover may not be suitable. NPS and TPWD control the road classifications, permits and day-of-trip access—not third-party navigation estimates.</p></div>
        <div><h3 className="font-display text-2xl">Maps and accessibility</h3><p className="mt-3 text-sm leading-7">Paved roadside overlooks and visitor centers may offer a lower-exertion trip, but individual pullouts, restrooms and trails differ. Consult each park's accessibility and map pages; do not equate a paved road with an accessible trail. Download maps before leaving a cellular connection.</p></div>
        <div><h3 className="font-display text-2xl">Names that travelers confuse</h3><p className="mt-3 text-sm leading-7"><strong>FM 170 River Road</strong> is the paved highway through the state-park river corridor. <strong>River Road inside Big Bend National Park</strong> is an unpaved backcountry route with different vehicle demands. Ross Maxwell Scenic Drive is another distinct paved national-park road.</p></div>
      </div>
    </Container></section>
    <Container className="py-14">
      <h2 className="font-display text-4xl">Continue planning across Big Bend</h2>
      <ul className="mt-5 grid gap-4 text-sm leading-7 sm:grid-cols-2">
        <li><Link className="underline text-primary" to="/destination/big-bend-national-park">Big Bend National Park destination guide</Link> — nature, hiking and park visitor planning</li>
        <li><Link className="underline text-primary" to="/destination/big-bend-ranch-state-park">Big Bend Ranch State Park</Link> — permits and river corridor</li>
        <li><Link className="underline text-primary" to="/destination/river-road-fm-170">FM 170 River Road</Link> — paved borderlands drive</li>
        <li><Link className="underline text-primary" to="/explore/region/$region" params={{ region: "big-bend" }}>Big Bend region</Link> — cities, parks and places to stay</li>
        <li><Link className="underline text-primary" to="/explore/road-trips">Texas road trips</Link> — other regional scenic drives</li>
        <li><Link className="underline text-primary" to="/explore/trip-planner">Trip Planner</Link> — build a multi-day Texas itinerary</li>
      </ul>
      <div className="mt-12 border-t border-border pt-6">
        <h2 className="font-display text-3xl">Sources and update method</h2>
        <p className="mt-3 text-sm leading-7">Reviewed October 20, 2026 by Texas Defined Editorial Desk against NPS, Texas Parks and Wildlife and TxDOT pages. Lengths and classifications are attributed to managing agencies; estimated visitor durations are editorial planning guidance, not measured trip times. Road, weather and facility status changes frequently. The official operator governs conditions on the date of your drive. This guide does not claim a first-hand driving inspection or original field photography.</p>
        <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm">{sources.map(s=><li key={s.url}><a href={s.url} className="text-primary underline underline-offset-4">{s.name}</a></li>)}</ol>
        <p className="mt-6 text-sm text-muted-foreground">Suggested citation: Texas Defined Editorial Desk, “Big Bend Scenic Drives: Routes, Maps, Stops & Road Safety,” updated October 20, 2026, https://texasdefined.com/explore/big-bend-scenic-drives.</p>
      </div>
    </Container>
  </main>;
}
