import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { editorialImageSrc } from "@/lib/editorial-image-delivery";

const skyComparison = [
  {
    "name": "Big Bend Ranch",
    "bortle": "1 in the darkest areas",
    "viewing": "River Road, West Contrabando Trailhead, Big Hill and Hoodoos are TPWD-listed viewing locations",
    "access": "Check the selected access road and any backcountry permit before leaving reliable cell service",
    "official": "https://tpwd.texas.gov/state-parks/big-bend-ranch/dark-skies",
    "related": "/destination/big-bend-ranch-state-park"
  },
  {
    "name": "Caprock Canyons",
    "bortle": "2",
    "viewing": "Plan a viewing night or official park program around the Panhandle canyon setting; do not infer unrestricted trailway access at night",
    "access": "Check park operating rules, campsite/entry reservations and event calendar; January 2026 dark-sky designation",
    "official": "https://tpwd.texas.gov/state-parks/caprock-canyons",
    "related": "/destination/caprock-canyons-state-park"
  },
  {
    "name": "Copper Breaks",
    "bortle": "2",
    "viewing": "Park star parties are an option, but independent viewing still depends on permitted after-hours access",
    "access": "Consult the current TPWD event calendar for a scheduled program rather than last year's dates",
    "official": "https://tpwd.texas.gov/state-parks/copper-breaks/stargazing",
    "related": "/destination/copper-breaks-state-park"
  },
  {
    "name": "Enchanted Rock",
    "bortle": "3",
    "viewing": "TPWD identifies its Scenic Overlook for night-sky viewing and publishes a sky-quality monitor",
    "access": "The park is busy and access-restricted; verify timed entry, night activity and approved viewing areas before arriving",
    "official": "https://tpwd.texas.gov/state-parks/enchanted-rock/more-info/dark-skies/",
    "related": "/explore/region/hill-country"
  },
  {
    "name": "South Llano River",
    "bortle": "3",
    "viewing": "Park stargazing and astronomy events complement camping; TPWD publishes local night-sky observations",
    "access": "Ask the park about the current night-activity fee and how non-campers may remain past regular hours",
    "official": "https://tpwd.texas.gov/state-parks/south-llano-river/dark-skies",
    "related": "/best-places-to-go-camping-in-texas"
  }
] as const;

const afterDarkDesk = [
 { site: "River Road, West Contrabando Trailhead, Big Hill and Hoodoos are separate TPWD-listed viewing locations; choose your actual road approach in daylight.", caution: "Check the relevant access road and permit at Barton Warnock or Fort Leaton. Do not assume the park's most remote dark spot is reachable with a regular passenger car.", source: "https://tpwd.texas.gov/state-parks/big-bend-ranch/dark-skies" },
 { site: "Confirm an approved nighttime parking or camping location with Caprock Canyons staff before arriving for independent viewing.", caution: "The 2026 International Dark Sky Park designation does not make every trailway segment open overnight; review alerts and current events.", source: "https://tpwd.texas.gov/state-parks/caprock-canyons" },
 { site: "A TPWD-listed star party and a permitted independent observing night are different access plans.", caution: "Check the official event calendar and any reservation or after-hours process; a monthly event series is not a guaranteed event on every date.", source: "https://tpwd.texas.gov/state-parks/copper-breaks/stargazing" },
 { site: "TPWD identifies the Scenic Overlook and a live sky-quality monitor, but verify which areas visitors may use after normal hours.", caution: "Reservations can reach capacity; day-use entry does not necessarily authorize nighttime access to the granite dome.", source: "https://tpwd.texas.gov/state-parks/enchanted-rock/more-info/dark-skies/" },
 { site: "South Llano River offers a night-activity option; ask park staff which viewing area and parking arrangement it covers.", caution: "TPWD says the fee allows stargazing beyond 10 p.m.; confirm it when paying admission and compare the park sky monitor with that night's forecast.", source: "https://tpwd.texas.gov/state-parks/south-llano-river/dark-skies" },
] as const;
const nightAccessFieldGuide = [
  {
    park: "Big Bend Ranch",
    viewing: "River Road, West Contrabando Trailhead, Big Hill and the Hoodoos are TPWD's named starting points. Pick the actual road approach and return drive in daylight.",
    permission: "This is remote desert country: access roads, vehicle clearance and backcountry permits are location-specific. A Bortle 1 park-wide claim is not a promise of Bortle 1 at a developed parking area.",
    liveCheck: "Use the destination-specific NWS forecast and lunar rise/set times; wind, storms, dust, moonlight and desert heat can erase the expected advantage.",
    map: "https://tpwd.texas.gov/state-parks/big-bend-ranch/map",
    conditions: "https://tpwd.texas.gov/state-parks/big-bend-ranch/dark-skies",
  },
  {
    park: "Caprock Canyons",
    viewing: "Before arriving after sunset, ask park staff which parking or campground location is authorized for independent nighttime viewing; do not assume the 64-mile Trailway is open overnight.",
    permission: "The January 2026 International Dark Sky Park designation is not an all-hours access permit. Review current park alerts, day-use reservation limits and scheduled astronomy events.",
    liveCheck: "Panhandle cloud cover, wind and possible thunderstorms matter more for a particular night than the baseline Bortle 2 classification.",
    map: "https://tpwd.texas.gov/state-parks/caprock-canyons/map",
    conditions: "https://tpwd.texas.gov/state-parks/caprock-canyons",
  },
  {
    park: "Copper Breaks",
    viewing: "TPWD's signed Dark Sky Viewing Area is at 34.1183, -99.7549, near the equestrian trailhead. Distinguish that location from the lake, scenic overlooks and campsite viewing.",
    permission: "Star Walk programs and independent viewing have different arrival arrangements. TPWD says campsite skies can also be viewed without a telescope; confirm gate rules and any after-hours check-in.",
    liveCheck: "Look at the park's astronomy events and clear-sky tools; a scheduled April–November star party is not evidence of clear weather on that night.",
    map: "https://www.openstreetmap.org/?mlat=34.1183&mlon=-99.7549#map=16/34.1183/-99.7549",
    conditions: "https://tpwd.texas.gov/state-parks/copper-breaks/trails-info",
  },
  {
    park: "Enchanted Rock",
    viewing: "Use the official Scenic Overlook and its mapped approach. Ranger astronomy programs have used Parking Lot 1, but that does not make the granite summit or every trail legal after hours.",
    permission: "This is a capacity-controlled natural area. Confirm reservations, a permitted nighttime program or approved entry window and late-arrival instructions before relying on a night hike.",
    liveCheck: "The park's sky-quality monitor shows relative darkness; combine it with an hourly cloud/wind forecast and the destination's moonrise/moonset.",
    map: "https://tpwd.texas.gov/state-parks/enchanted-rock/trails-info",
    conditions: "https://tpwd.texas.gov/state-parks/enchanted-rock/more-info/dark-skies/",
  },
  {
    park: "South Llano River",
    viewing: "Use a park-approved viewing area or campsite, not an unsupervised shortcut into the backcountry. Verify the specific parking option at park headquarters.",
    permission: "TPWD explicitly offers a night-activity fee when paying admission for stargazing past 10 p.m. Confirm the fee/access arrangement for non-campers and your intended exit time.",
    liveCheck: "TPWD links a nighttime sky-darkness monitor updating about every 15 minutes. An extremely high darkness-meter reading can indicate cloud cover, not perfect transparency.",
    map: "https://tpwd.texas.gov/state-parks/south-llano-river/map",
    conditions: "https://tpwd.texas.gov/state-parks/south-llano-river/dark-skies",
  },
] as const;

const officialSources = [
  { label: "US Naval Observatory — Moonrise, Moonset and Twilight", href: "https://aa.usno.navy.mil/data/RS_OneYear", note: "Location-specific time calculations for planning a moonless observing window." },
  { label: "NASA — Moon Phases", href: "https://science.nasa.gov/moon/moon-phases/", note: "Astronomy source for the waxing, waning and illumination cycle." },
  { label: "Texas Parks & Wildlife — Stargazing in State Parks", href: "https://tpwd.texas.gov/state-parks/parks/things-to-do/stargazing-in-state-parks", note: "Statewide International Dark Sky Park list, very-dark-sky parks, observatory links and stargazing planning resources." },
  { label: "Texas Parks & Wildlife — Big Bend Ranch Stargazing", href: "https://tpwd.texas.gov/state-parks/big-bend-ranch/dark-skies", note: "Official Bortle ratings, accessible viewing locations, moon/weather resources and exceptionally dark-sky measurements." },
  { label: "Texas Parks & Wildlife — Copper Breaks Stargazing", href: "https://tpwd.texas.gov/state-parks/copper-breaks/stargazing", note: "Official Dark Sky Park status, Bortle rating, star-party information and current sky-planning resources." },
  { label: "Texas Parks & Wildlife — Enchanted Rock Stargazing", href: "https://tpwd.texas.gov/state-parks/enchanted-rock/more-info/dark-skies/", note: "Official Dark Sky Park guidance and real-time sky-quality monitoring for the Hill Country site." },
  { label: "Texas Parks & Wildlife — South Llano River Stargazing", href: "https://tpwd.texas.gov/state-parks/south-llano-river/dark-skies", note: "Official Bortle rating, after-hours night-activity guidance and real-time dark-sky monitoring." },
  { label: "Texas Parks & Wildlife — Caprock Canyons Dark Sky designation", href: "https://tpwd.texas.gov/newsmedia/releases/?req=20260107a", note: "Official January 2026 designation notice confirming Caprock Canyons as the fifth Texas state park with the designation." },
  { label: "TPWD — Official state park Bortle ratings", href: "https://tpwd.texas.gov/state-parks/parks/things-to-do/stargazing/bortle-ratings", note: "Park-by-park baseline sky darkness values; a rating is not the forecast for the night." },
  { label: "TPWD — Stargazing events calendar", href: "https://tpwd.texas.gov/calendar/stargazing", note: "Current park program dates and scheduled guided observing." },
  { label: "National Park Service — Big Bend National Park night skies", href: "https://www.nps.gov/bibe/planyourvisit/stargazing.htm", note: "NPS confirms Big Bend National Park has held International Dark Sky Park status since 2012 and publishes night-sky viewing advice." },
  { label: "DarkSky International — Big Bend National Park", href: "https://darksky.org/places/big-bend-national-park-dark-sky-park/", note: "The designating organization's record confirms that the certified national park is separate from the five state parks profiled here." },
] as const;

const parks = [
  {
    name: "Big Bend Ranch State Park",
    region: "Far West Texas · Big Bend",
    summary: "Texas's darkest state-park sky, with Bortle Class 1 conditions in parts of a vast and remote Chihuahuan Desert landscape.",
    details: [
      "TPWD calls Big Bend Ranch the darkest area of Texas and lists accessible viewing locations including River Road, West Contrabando Trailhead, Big Hill and the Hoodoos. Some parts of the park rate Bortle Class 1, while developed visitor areas are brighter.",
      "Darkness does not remove desert trip hazards. Extreme heat can persist after sunset, roads and services are remote, and cloud cover or moonlight can overwhelm the reason for the drive. Check park alerts, moonrise and moonset, weather and the specific viewing area's vehicle access before committing to a late-night plan.",
    ],
  },
  {
    name: "Caprock Canyons State Park & Trailway",
    region: "Panhandle Plains · Quitaque",
    summary: "Texas's newest International Dark Sky Park, designated in January 2026 after lighting and stewardship work at the canyon-and-bison landscape.",
    details: [
      "TPWD announced Caprock Canyons as the fifth Texas state park to earn International Dark Sky Park designation in January 2026. The designation reflects lighting policy, ongoing stewardship and protection of the park's night environment rather than a guarantee of clear skies on any particular visit.",
      "Use the park's current alerts and event calendar when planning. The same open Panhandle setting that creates broad horizons can also bring strong wind, storms and rapid weather changes, so a star-party date or dark-sky label should never substitute for a same-day forecast.",
    ],
  },
  {
    name: "Copper Breaks State Park",
    region: "Panhandle Plains · Quanah",
    summary: "A Bortle Class 2 International Dark Sky Park known for recurring star parties and exceptionally dark rural plains skies.",
    details: [
      "Copper Breaks combines an International Dark Sky Park designation with monthly star parties during much of the year. TPWD rates the park Bortle Class 2 and notes that visitors do not need a scheduled program or telescope to experience its dark skies.",
      "For an independent visit, check moon phase, cloud cover, park hours and any current alerts first. For a program visit, use the current TPWD events schedule rather than relying on an older calendar because dates and operating details change.",
    ],
  },
  {
    name: "Enchanted Rock State Natural Area",
    region: "Hill Country · Fredericksburg / Llano",
    summary: "A Central Texas International Dark Sky Park where protected rural darkness exists within reach of growing Hill Country development.",
    details: [
      "Enchanted Rock's dark-sky status adds a nighttime dimension to a destination best known for its granite dome. TPWD says the Milky Way remains visible under suitable conditions and operates a real-time dark-sky monitor at the site.",
      "This is a heavily visited State Natural Area with its own access and operating rules. Stargazing does not imply unrestricted nighttime hiking or access to every part of the park. Verify reservations, hours, closures and approved nighttime use before building the plan around a late arrival.",
    ],
  },
  {
    name: "South Llano River State Park",
    region: "Hill Country · Junction",
    summary: "A Bortle Class 3 International Dark Sky Park with real-time sky monitoring and an explicit night-activity option for visitors staying past normal hours.",
    details: [
      "South Llano River offers a practical Hill Country dark-sky trip with camping, scheduled astronomy programs and real-time darkness monitoring. TPWD rates the park Bortle Class 3 and describes views of the Milky Way under good conditions.",
      "Visitors who want to stargaze beyond normal hours should follow the park's current night-activity fee and access process. Moon phase, clouds and transparency still matter: a designated dark-sky site can deliver a poor astronomy night when natural conditions are unfavorable.",
    ],
  },
] as const;

const planningPaths = [
  { to: "/texas-horseback-riding-guide", label: "Horseback riding by day", description: "Compare trailer and campsite access at Big Bend Ranch and Caprock Canyons." },
  { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Connect night-sky trips to public-land access, weather, wildlife and seasonal planning." },
  { to: "/explore/state-parks", label: "Texas state parks", description: "Find camping, operating hours and current park-specific visitor information." },
  { to: "/texas-natural-wonders-bucket-list", label: "Natural wonders", description: "Pair dark skies with the landscapes that make these destinations worth the daytime drive too." },
  { to: "/best-places-to-go-camping-in-texas", label: "Texas camping", description: "Choose an overnight base when the best viewing window falls well after sunset." },
  { to: "/explore/road-trips", label: "Texas road trips", description: "Build remote dark-sky parks into realistic regional routes and daylight stops." },
  { to: "/texas-mountain-biking-guide", label: "Daylight Big Bend rides", description: "Coordinate a state-park trail ride with night-sky access before extending the itinerary." },
  { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Sequence drive times, reservations, sunset, moon conditions and overnight logistics." },
] as const;

export const Route = createLazyFileRoute("/texas-stargazing-guide")({ component: TexasStargazingGuidePage });

function TexasStargazingGuidePage() {
  return (
    <main className="pb-20">
      <Container className="pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/explore" className="hover:text-foreground">Explore Texas</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/explore/outdoors" className="hover:text-foreground">Outdoors &amp; Wildlife</Link>
        </nav>
      </Container>

      <Container className="pt-10">
        <article className="mx-auto max-w-5xl">
          <header className="border-b border-border pb-10">
            <p className="eyebrow text-primary">Dark skies · moon phase · park access</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Stargazing Guide</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A visitor-first guide to five Texas state parks certified as International Dark Sky Parks, with moon phase, weather, Bortle ratings and access details to check before a night-sky trip.</p>
          </header>

          <figure className="border-b border-border py-8">
            <img
              src={editorialImageSrc("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Copper_Breaks_State_Park_with_the_Milky_Way_Galaxy.jpg/1280px-Copper_Breaks_State_Park_with_the_Milky_Way_Galaxy.jpg")}
              alt="Milky Way above a glowing tent at Copper Breaks State Park, Texas"
              width={1280}
              height={853}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="aspect-[3/2] w-full object-cover"
            />
            <figcaption className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
              The Milky Way and a camping tent at Copper Breaks State Park, one of the five certified Texas state parks profiled below. Photo:{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Copper_Breaks_State_Park_with_the_Milky_Way_Galaxy.jpg" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">Matthew T Rader</a>
              {" "}(2020) · <a href="https://matthewtrader.com" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">MatthewTRader.com</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">CC BY-SA 4.0</a>.
              Display crop only; the original and its license are available at the linked Commons file page.
            </figcaption>
          </figure>

          <section className="border-b border-border py-10" aria-labelledby="sky-comparison">
            <p className="eyebrow text-primary">Pick a viewing night</p>
            <h2 id="sky-comparison" className="mt-2 font-display text-3xl">Compare actual sky darkness and visitor access</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">TPWD's Bortle ratings are baseline sky-quality classifications, not tonight's conditions. Lower is darker. Even a Class 1 location can be unsuitable under a bright moon or clouds; driving to a remote site does not grant unrestricted after-hours access.</p>
            <p className="mt-3 text-sm text-muted-foreground md:hidden">Compare the same destinations and details in the cards below.</p>
            <div className="mt-5 grid gap-3 md:hidden" aria-label="Mobile comparison summary">
              {skyComparison.map((row) => (
                <div key={row.name} className="min-w-0 rounded-sm border border-border p-4">
                  <h3 className="font-display text-xl">{row.name}</h3>
                  <dl className="mt-3 space-y-2 text-sm leading-6">
                    <div><dt className="font-semibold">TPWD Bortle class</dt><dd className="text-muted-foreground break-words">{row.bortle}</dd></div>
                    <div><dt className="font-semibold">Viewing location</dt><dd className="text-muted-foreground break-words">{row.viewing}</dd></div>
                  </dl>
                </div>
              ))}
            </div>
            <div className="mt-6 hidden overflow-x-auto border border-border md:block" role="region" tabIndex={0} aria-label="Five certified Texas dark sky state parks comparison table">
              <table className="w-full border-collapse text-left text-sm" style={{ minWidth: "780px" }}>
                <thead className="bg-muted/50"><tr><th scope="col" className="border-b border-border p-4">International Dark Sky Park</th><th scope="col" className="border-b border-border p-4">TPWD Bortle class</th><th scope="col" className="border-b border-border p-4">Best planning starting point</th></tr></thead>
                <tbody>{skyComparison.map((item) => <tr key={item.name} className="align-top"><th scope="row" className="border-b border-border p-4 font-semibold">{item.name}</th><td className="border-b border-border p-4">{item.bortle}</td><td className="border-b border-border p-4 text-muted-foreground">{item.viewing}</td></tr>)}</tbody>
              </table>
            </div>
          </section>
          <section className="border-b border-border py-10" aria-labelledby="dark-sky-observing-window">
            <h2 id="dark-sky-observing-window" className="font-display text-3xl">When is the best time to stargaze in a Texas dark-sky park?</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">For faint deep-sky objects, choose the overlap between astronomical darkness, the moon below the horizon, clear weather and authorized park access. A new moon is helpful, but even a bright-moon date can offer a dark interval before moonrise or after moonset. For the Moon itself, a partially illuminated night is often preferable.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">Moon and twilight: calculate the usable interval</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Use the US Naval Observatory for the chosen town and date. Begin after evening astronomical twilight ends and stop at the earliest of moonrise, morning twilight or your permitted exit time. If the moon is already up, evaluate the interval after moonset instead. Times are location-specific; confirm local time and daylight saving.</p><a href="https://aa.usno.navy.mil/data/RS_OneYear" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block break-words font-semibold text-primary underline underline-offset-4">Official sun, moon and twilight calculator</a></div>
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">South Llano River: interpret night readings</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">TPWD's monitor reports during darkness at approximately 15-minute intervals. A reading above 21.5 magnitudes per square arcsecond indicates very dark skies according to the park, but above 22.5 commonly indicates cloud cover. A high number alone is not proof of transparency; compare the cloud forecast. Arrange the night-activity fee for stays past 10 p.m.</p><a href="https://tpwd.texas.gov/state-parks/south-llano-river/dark-skies" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block break-words font-semibold text-primary underline underline-offset-4">Park monitor and night-activity rules</a></div>
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">Enchanted Rock: monitor before driving</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">The park publishes relative darkness readings every 15 minutes at night; no daylight reading is expected. Check the park's current event/access arrangements, weather and permitted viewing location separately from the reading.</p><a href="https://tpwd.texas.gov/state-parks/enchanted-rock/more-info/dark-skies/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block break-words font-semibold text-primary underline underline-offset-4">Park sky-quality monitor</a></div>
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">Copper Breaks: program vs independent camping</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">TPWD describes recurring star parties April through November and other programs during the year. Campers can observe from their authorized campsite without a telescope; independent day visitors must confirm late access separately. Check the actual calendar instead of assuming that a program is offered on a particular date.</p><a href="https://tpwd.texas.gov/state-parks/copper-breaks/stargazing" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block break-words font-semibold text-primary underline underline-offset-4">Current park program and sky information</a></div>
            </div>
          </section>
          <section className="border-b border-border py-9" aria-labelledby="quick-answer">
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="quick-answer" className="mt-2 font-display text-3xl">A Dark Sky designation is the starting point, not the forecast</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">Among Texas state parks, TPWD lists Big Bend Ranch, Caprock Canyons, Copper Breaks, Enchanted Rock and South Llano River as International Dark Sky Parks. For the actual night, check moonrise and moonset, cloud cover, transparency, weather, park alerts, operating hours and any after-hours access rules. Lower Bortle numbers indicate darker skies, but even a Bortle Class 1 site can be disappointing under a bright moon or overcast sky.</p>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="state-parks-scope">
            <p className="eyebrow text-primary">What this list covers</p>
            <h2 id="state-parks-scope" className="mt-2 font-display text-3xl">Five certified state parks, not every Texas dark-sky destination</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>The five locations compared above are the Texas Parks &amp; Wildlife Department's certified International Dark Sky <strong>state parks</strong>. They are not a complete list of every Texas site with an international dark-sky designation.</p>
              <p>For example, <strong>Big Bend National Park</strong> is a separately managed, certified International Dark Sky Park. The National Park Service confirms its 2012 designation and provides its own viewing and ranger-program guidance. Before comparing a Big Bend National Park visit with Big Bend Ranch State Park, consult the <a href="https://www.nps.gov/bibe/planyourvisit/stargazing.htm" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">NPS stargazing guide</a> and <a href="https://darksky.org/places/big-bend-national-park-dark-sky-park/" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">DarkSky's designation record</a>. Both parks have distinct gates, road networks, operating rules and access plans.</p>
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="night-observation-decisions">
            <p className="eyebrow text-primary">A site-specific observing plan</p>
            <h2 id="night-observation-decisions" className="mt-2 font-display text-3xl">Where to set up, how to gain access, and what to check that night</h2>
            <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">Bortle class describes typical light pollution, not the view through clouds or a bright Moon. The named spots and park maps below are planning starting points; only the land manager can confirm whether a site or gate is available for the time you intend to observe.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {nightAccessFieldGuide.map((item) => (
                <div key={item.park} className="min-w-0 border border-border p-5">
                  <h3 className="font-display text-xl">{item.park}</h3>
                  <p className="mt-3 text-sm leading-7"><strong>Viewing area:</strong> {item.viewing}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong>After-hours access:</strong> {item.permission}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong>Observing conditions:</strong> {item.liveCheck}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
                    <a href={item.map} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Official site map / verified GPS</a>
                    <a href={item.conditions} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">TPWD night-sky and access details</a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-l-2 border-primary bg-muted/50 p-5 text-sm leading-7">
              <h3 className="font-display text-xl">Choose the target before choosing the Moon</h3>
              <p className="mt-2"><strong>Milky Way or faint deep-sky objects:</strong> plan near new Moon or choose a moon-below-horizon window after astronomical twilight; check when the seasonal target is actually above the horizon.</p>
              <p className="mt-2"><strong>Moon and planets:</strong> a bright night is not automatically a failed trip. A waxing or waning half-Moon gives strong shadow detail along the lunar terminator.</p>
              <p className="mt-2"><strong>Meteor observing:</strong> select an extended dark window with the radiant appropriately placed and without a bright Moon; a predawn window can be useful, but storms and gate restrictions take priority.</p>
              <p className="mt-3">Run the <a href="https://aa.usno.navy.mil/data/RS_OneYear" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">US Naval Observatory moonrise, moonset and twilight calculator</a> for the exact date and park, then the <a href="https://www.weather.gov/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">National Weather Service hourly forecast</a> for cloud cover and wind. NASA's <a href="https://science.nasa.gov/moon/moon-phases/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">moon phases</a> explain illumination but not local rise/set times.</p>
            </div>
          </section>
          <section className="border-b border-border py-10" aria-labelledby="night-planning">
            <p className="eyebrow text-primary">Pick the night, not just the park</p>
            <h2 id="night-planning" className="mt-2 font-display text-3xl">Compare moonrise, twilight and legal after-hours access</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>For a faint Milky Way or deep-sky target, look for a window after astronomical twilight when the moon is below the horizon. A bright Moon can still be excellent for observing lunar terrain; it is simply a different goal. The designation and Bortle number do not predict cloud cover, visibility or actual illumination that night.</p>
              <p>Use the <a href="https://aa.usno.navy.mil/data/RS_OneYear" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">US Naval Observatory moonrise, moonset and twilight table</a> for the exact destination and travel date. Use <a href="https://science.nasa.gov/moon/moon-phases/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">NASA moon phases</a> to understand illumination, and check the local National Weather Service forecast for cloud cover, wind, lightning and visibility.</p>
              <p>Even an ideal sky window is unusable if the planned gate, trailhead or overlook is closed. Confirm legal parking, operating hours, entrance reservations, campsite access, and night-activity fees before driving into a remote park after dark.</p>
            </div>
          </section>
          <section className="border-b border-border py-10" aria-labelledby="stewardship">
            <p className="eyebrow text-primary">Night-sky stewardship</p>
            <h2 id="stewardship" className="mt-2 font-display text-3xl">Protect the darkness you came to see</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Dark-sky designations are tied to lighting practices and long-term stewardship. Follow park rules on lighting, parking, quiet hours and nighttime access, and avoid unnecessary bright light that disrupts other visitors and wildlife.</p>
              <p>For an enjoyable first night, arrive while it is still light, confirm where parking and walking are permitted, and allow your eyes time to adapt. A dim red light is less disruptive than an unshielded white flashlight. Compare moonrise, moonset and cloud forecasts before committing to a long drive, then use TPWD's <a href="https://tpwd.texas.gov/calendar/stargazing" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">current astronomy event calendar</a> if a guided program is more suitable than an independent visit.</p>
            </div>
          </section>

          <div>
            {parks.map((park, index) => (
              <section key={park.name} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
                <div>
                  <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · {park.region}</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight">{park.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{park.summary}</p>
                </div>
                <div className="max-w-3xl space-y-5">
                  {park.details.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
                  <aside className="border-l-2 border-primary bg-muted/20 px-5 py-4 text-sm leading-7">
                    <h3 className="font-display text-xl">Plan the observing window</h3>
                    <p className="mt-2"><strong>Sky darkness:</strong> TPWD Bortle {skyComparison[index].bortle} (baseline, not a weather prediction).</p>
                    <p className="mt-2"><strong>Where to start:</strong> {skyComparison[index].viewing}</p>
                    <p className="mt-2"><strong>Night access:</strong> {skyComparison[index].access}</p>
                    <div className="mt-5 border-t border-border pt-4">
                      <h3 className="font-display text-xl">Where to view and what to confirm</h3>
                      <p className="mt-2"><strong>Park-specific approach:</strong> {afterDarkDesk[index].site}</p>
                      <p className="mt-2"><strong>Access constraint:</strong> {afterDarkDesk[index].caution}</p>
                      <a href={afterDarkDesk[index].source} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-primary underline">Current TPWD viewing and visitor guidance</a>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      <a href={skyComparison[index].official} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">Official park night-sky information ↗</a>
                      <Link to={skyComparison[index].related} className="font-semibold text-primary underline underline-offset-4">Pair with a Texas trip</Link>
                    </div>
                  </aside>
                </div>
              </section>
            ))}
          </div>

          <section className="border-b border-border py-10" aria-labelledby="planning">
            <p className="eyebrow text-primary">Keep planning</p>
            <h2 id="planning" className="mt-2 font-display text-3xl">Build the night sky into a complete Texas trip</h2>
            <nav aria-label="Texas stargazing related guides" className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
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
            <h2 id="sources" className="mt-2 font-display text-3xl">Verify darkness, access and events with TPWD</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Designations, park access, alerts, hours, event schedules and night-activity rules can change. These first-party sources support this guide and should control current trip decisions. TPWD park ratings, designations and stargazing guidance cross-checked November 18, 2026. Exact viewing-area locations and after-hours access rechecked November 20, 2026. Always verify current park access and forecast. TPWD sky-monitor interpretation and independent viewing versus program access checked November 21, 2026.</p>
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
