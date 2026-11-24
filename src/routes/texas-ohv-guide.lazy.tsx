import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const rositaTrailPhoto = "https://www.nps.gov/lamr/planyourvisit/images/Rosita-16-wp.jpg?autorotate=false&maxwidth=1300";

const legalRideComparison = [
  {
    "name": "Eisenhower State Park",
    "vehicles": "ATVs, dirt bikes and UTVs no wider than 50 inches on roughly 2.5 miles of designated routes; no general park-wide OHV use",
    "permission": "Park OHV permit and applicable Texas decal; protective gear and rider requirements apply",
    "check": "Check current width, permitted rider ages, trail-capacity limits and post-rain status",
    "operator": "https://tpwd.texas.gov/state-parks/eisenhower/ohvs",
    "related": "/explore/state-parks"
  },
  {
    "name": "Barnwell Mountain Recreation Area",
    "vehicles": "TMTC-managed marked trails for motorcycles, ATVs, ROVs/side-by-sides and full-sized OHVs, with trail-specific limits",
    "permission": "Operator sets admission, waivers, mapped route difficulty and camping prices; check the live calendar for closures",
    "check": "Match the specific marked trail to the vehicle and read TMTC's current fee and minor waiver rules",
    "operator": "https://www.barnwellmountainra.com/info_directions",
    "related": "/explore/road-trips"
  },
  {
    "name": "Sam Houston National Forest",
    "vehicles": "85-mile multiple-use system; motorized trails are limited to OHVs 50 inches wide or less, excluding full-width UTVs",
    "permission": "A separate Sam Houston Multiple-Use Trail Pass per person, Texas OHV decal and current motor vehicle map",
    "check": "Call 936-344-6205 (option 2) for trail status; carry pass, valid ID and applicable ATV operator-course proof",
    "operator": "https://www.fs.usda.gov/sites/nfs/files/r08/texas/publication/Sam%20Houston%20MVUM%202025.pdf",
    "related": "/explore/outdoors"
  },
  {
    "name": "Lake Meredith National Recreation Area",
    "vehicles": "Riding allowed in the specific Blue Creek and Rosita Flats ORV areas, not across the recreation area",
    "permission": "No-cost NPS ORV permit plus Texas OHV decal required; contact NPS for vehicle-specific maps",
    "check": "Bring no-cost annual NPS permit and state OHV decal; Blue Creek cutbanks and Rosita 3,000-foot elevation boundary apply",
    "operator": "https://www.nps.gov/lamr/planyourvisit/ohv-off-highway-vehicles.htm",
    "related": "/explore/road-trips"
  },
  {
    "name": "Escondido Draw Recreation Area",
    "vehicles": "TMTC site near Ozona supporting motorcycles, ATVs and other permitted OHVs on operator-mapped routes",
    "permission": "Operator admission and waivers plus applicable Texas OHV decal; current policies govern minors and overnight use",
    "check": "Confirm vehicle fit, operating dates, camping arrangements and the newest map with the operator",
    "operator": "https://www.escondidodraw.org/policies_fees.html",
    "related": "/explore/road-trips"
  }
] as const;

const namedOHVAccess = [
  {
    name: "Eisenhower — Ironweed (Denison)",
    arrival: "Use the park's designated Ironweed OHV trailhead, which TPWD says has a first-come pavilion, water spigot and composting restroom. Trails open 8 a.m. to sunset when conditions allow.",
    segments: "Pee Wee Practice Area: 0.5 mile easy; Blackland Ramble: 0.6 mile moderate; Big Woods Canyon and Timber Rattler Run: 0.7 mile each, moderate to challenging.",
    verify: "Maximum machine width is 50 inches. ATVs, UTVs and dirt bikes still require a valid trail permit, state OHV decal, protective equipment and applicable safety certification.",
    url: "https://tpwd.texas.gov/state-parks/eisenhower/ohvs",
  },
  {
    name: "Barnwell Mountain — mapped TMTC routes (Gilmer)",
    arrival: "Operator directions: 6284 N. State Highway 155, Gilmer. The entrance is about five miles east of Gilmer on SH 155, near a hill crest; check the calendar for member events and closed weekends.",
    segments: "The operator describes a 27-plus-mile motorcycle loop with easy/hard splits, plus a more open 16-mile Adventure Trail marked by blue arrows; these do not authorize larger machines on motorcycle-only segments.",
    verify: "Ask for the up-to-date vehicle-class map, sign the required waiver, and confirm gate times and whether cabin/RV camping is available. The operator says it does not rent ATVs or dirt bikes.",
    url: "https://www.barnwellmountainra.com/info_directions",
  },
  {
    name: "Sam Houston — federal multiple-use system",
    arrival: "Download the current USFS Motor Vehicle Use Map before loading. Enter only at a signed, legal multiple-use trailhead; forest roads are not open to unregistered non-street-legal OHVs.",
    segments: "The 85-mile multiple-use network is not an unrestricted 85-mile motor route. The federal pass page sets a 50-inch maximum motorized width; a full-width side-by-side does not fit simply because it has an OHV decal.",
    verify: "Buy one Recreation.gov Multiple-Use Trail Pass per person and attach the Texas OHV decal. Call 936-344-6205, option 2, on departure day for the recorded wet-soil closure status.",
    url: "https://www.recreation.gov/activitypass/f7f9e063-17cc-11eb-8594-76eb6c9a5645",
  },
  {
    name: "Lake Meredith — Blue Creek vs Rosita Flats",
    arrival: "Blue Creek OHV area is off FM 1913, with riding only in the creek bed/cutbanks. Rosita Flats is reached via US 87/287 and has primitive camping; neither has drinking water.",
    segments: "NPS confines Rosita motorized riding below 3,000 feet elevation. It requires DOT helmets, eye protection, and whip-and-flag equipment on ATVs, not riding anywhere in the recreation area.",
    verify: "Apply for the free NPS ORV permit for every listed machine and retain the valid Texas OHV decal. The NPS permit expires December 31, not one year after issue; call 806-857-3151 for permit or access questions.",
    url: "https://www.nps.gov/lamr/planyourvisit/ohv-off-highway-vehicles.htm",
  },
  {
    name: "Escondido Draw — TMTC venue (Ozona area)",
    arrival: "Use TMTC's current General Info & Directions, gate schedule and posted trails rather than treating nearby ranch roads as permitted access.",
    segments: "Vehicle classes and trail difficulty are decided on-site by the operator. All riders sign in/out; TMTC requires waivers, adult supervision for minors and no riding after 10 p.m.",
    verify: "The operator's older page still quotes a $20 state OHV sticker, while TPWD's current decal program says $16. Use TPWD's current price and purchase link; verify gate/waiver terms directly with TMTC.",
    url: "https://www.escondidodraw.org/policies_fees.html",
  },
] as const;

const officialSources = [
  {
    label: "Texas Parks & Wildlife — Texas Off-Highway Vehicle Program",
    href: "https://tpwd.texas.gov/state-parks/texas-off-highway-program",
    note: "Statewide program overview for legal OHV recreation, responsible use and the Texas OHV decal program.",
  },
  {
    label: "Texas Parks & Wildlife — Ride Texas: Where to Ride OHVs",
    href: "https://tpwd.texas.gov/state-parks/texas-off-highway-program/where-to-ride-ohvs-in-texas",
    note: "TPWD's current directory of legal OHV venues, vehicle classes, contact information and access notes.",
  },
  {
    label: "Texas Parks & Wildlife — Where to Buy a Texas OHV Decal",
    href: "https://tpwd.texas.gov/state-parks/texas-off-highway-program/where-to-buy-a-texas-ohv-decal",
    note: "Official $16 decal, September 1–August 31 validity period and current purchase options. Recheck the amount each new season.",
  },
  {
    label: "Texas Parks & Wildlife — OHV Program FAQ",
    href: "https://tpwd.texas.gov/state-parks/texas-off-highway-program/faqs-about-the-texas-ohv-program",
    note: "Clarifies decals on public OHV lands and grant-funded private venues, including Barnwell Mountain, versus ordinary private property.",
  },
  {
    label: "Texas Parks & Wildlife — Responsible Use of OHVs",
    href: "https://tpwd.texas.gov/state-parks/texas-off-highway-program/responsible-use-of-ohvs",
    note: "Official safety, designated-trail, helmet and responsible-use principles for Texas OHV recreation.",
  },
  {
    label: "Texas Parks & Wildlife — Specialty Vehicles in State Parks",
    href: "https://tpwd.texas.gov/state-parks/park-information/specialty-vehicles",
    note: "State-park restrictions showing why ordinary park roads and trails should not be assumed open to OHVs.",
  },
  {
    label: "Texas Parks & Wildlife — Eisenhower State Park OHV Trails",
    href: "https://tpwd.texas.gov/state-parks/eisenhower/ohvs",
    note: "Official access, permit, trail, vehicle-width, safety-documentation and weather-closure guidance for the state-park OHV trail system.",
  },
  { label: "Recreation.gov — Sam Houston Multiple-Use Trail Pass", href: "https://www.recreation.gov/activitypass/f7f9e063-17cc-11eb-8594-76eb6c9a5645", note: "Per-person trail pass, 50-inch OHV limit, safety rules, status telephone and printable pass." },
  { label: "US Forest Service — Sam Houston Motor Vehicle Use Map", href: "https://www.fs.usda.gov/sites/nfs/files/r08/texas/publication/Sam%20Houston%20MVUM%202025.pdf", note: "Federal designation map; verify later replacements and current closure orders before riding." },
  { label: "National Park Service — Lake Meredith ORV Permits", href: "https://www.nps.gov/lamr/planyourvisit/ohv-off-highway-vehicles.htm", note: "Blue Creek and Rosita Flats authorized areas, NPS permit process and Texas decal requirement." },
  { label: "TMTC — Barnwell Mountain Recreation Area", href: "https://www.barnwellmountainra.com/info_directions", note: "Operator's trail maps, arrival directions, temporary closure context and local rules." },
  { label: "TMTC — Escondido Draw Policies & Fees", href: "https://www.escondidodraw.org/policies_fees.html", note: "Operator's event, admission, waiver and riding policies." },
] as const;

const ohvAreas = [
  {
    name: "Eisenhower State Park OHV Trails",
    region: "North Texas · Denison / Lake Texoma",
    summary: "A rare Texas state-park OHV exception with a small designated trail system and tightly defined access rules.",
    details: [
      "Eisenhower is useful precisely because it shows that state-park access is not a blanket permission. TPWD operates about 2.5 miles of designated OHV trails here for ATVs and dirt bikes, while its statewide specialty-vehicle guidance says OHVs generally are not allowed in state parks outside specific exceptions.",
      "The park requires an OHV permit before entering the trail system and lists current OHV decal, safety certification, helmet and eye-protection requirements. Vehicle width and daily trail capacity also matter, and rain can close the system. Treat Eisenhower's own OHV page and posted conditions as the authority for whether a planned visit is actually legal and open that day.",
    ],
  },
  {
    name: "Barnwell Mountain Recreation Area",
    region: "East Texas · Gilmer / Upshur County",
    summary: "A major legal riding venue in East Texas that TPWD lists for ATVs, motorcycles, recreational off-highway vehicles and full-sized OHVs.",
    details: [
      "Barnwell Mountain represents a broader vehicle mix than Eisenhower. TPWD's Ride Texas directory lists the venue for ATVs, motorcycles, ROVs and full-sized OHVs, making it a useful example of why vehicle class must be checked before choosing a destination.",
      "Venue rules, fees, maps, open areas and event-related restrictions are managed locally and can change. Use the current TPWD legal-venue listing to confirm the site remains in the statewide program, then follow the venue operator's current map and rules rather than assuming that every trail accommodates every vehicle type.",
    ],
  },
  {
    name: "Sam Houston National Forest Motorized Trails",
    region: "Piney Woods · north of Houston",
    summary: "Federal public land where motorized recreation is limited to designated routes rather than general forest access.",
    details: [
      "TPWD's Ride Texas directory lists Sam Houston National Forest for motorcycles and ATVs and points riders to the legal trail system. The key planning principle is route designation: being on public forest land does not make every road, trail or open-looking corridor legal for motorized use.",
      "Recreation.gov specifies a separate Multiple-Use Trail Pass for every person and restricts motorized use to designated trails accommodating OHVs no wider than 50 inches. Motorized riders also need the Texas OHV decal. Carry a valid ID and, if riding an ATV, proof of operator education. Recreation.gov also specifies approved helmet and eye protection, a spark arrestor and a 96-decibel sound limit. Download passes before losing phone service; call 936-344-6205 (option 2) to check closures after rain. A saved GPS track is never permission to use a closed trail.",
    ],
  },
  {
    name: "Lake Meredith National Recreation Area OHV Areas",
    region: "Texas Panhandle · Lake Meredith",
    summary: "National recreation area riding concentrated in specifically designated OHV zones rather than unrestricted travel across the landscape.",
    details: [
      "TPWD's legal-venue directory identifies Lake Meredith's Blue Creek and Rosita Flats areas as OHV destinations. This is another case where the named riding area matters more than the larger public-land boundary: the legal destination is the designated OHV zone, not every shoreline, road or backcountry surface within the recreation area.",
      "The National Park Service requires its own no-cost ORV permit in addition to a current Texas OHV decal. NPS permits expire December 31, even when issued later in the year. Stay within the Blue Creek cutbanks or below 3,000 feet in the Rosita Flats riding area; neither provides drinking water or flush toilets. All riders need a DOT-approved helmet and eye protection; NPS requires a whip and flag on ATVs. For maps and permits, call 806-857-3151.",
    ],
  },
  {
    name: "Escondido Draw Recreation Area",
    region: "West Texas · near Ozona",
    summary: "A legal West Texas venue listed by TPWD for motorcycles, ATVs, ROVs and full-sized OHVs.",
    details: [
      "Escondido Draw gives West Texas a purpose-built legal riding option without treating desert public land as an open invitation to drive anywhere. TPWD's Ride Texas directory lists multiple OHV classes at the venue, which makes it a practical contrast with the narrower vehicle rules at Eisenhower or Sam Houston National Forest.",
      "As with other locally operated venues, current maps, operating hours, admission, events and vehicle restrictions should be checked with the operator. The statewide legal-venue list and decal rules are the starting point; the venue's current operating rules finish the trip plan.",
    ],
  },
] as const;

const planningPaths = [
  { to: "/texas-paddling-guide", label: "Water access and weather", description: "Plan a separate non-motorized water outing around official access and water conditions." },
  { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Keep OHV travel inside the larger public-land, weather, habitat and seasonal-planning picture." },
  { to: "/explore/state-parks", label: "Texas state parks", description: "Understand ordinary state-park access before assuming a road or trail is open to specialty vehicles." },
  { to: "/texas-mountain-biking-guide", label: "Mountain biking", description: "Compare non-motorized public-trail systems where shared-use and current closures also shape access." },
  { to: "/texas-horseback-riding-guide", label: "Horseback riding", description: "See another activity where legal access, facilities and land-manager rules vary sharply by destination." },
  { to: "/explore/road-trips", label: "Texas road trips", description: "Build a legal riding venue into a regional trip without treating connecting public land as an OHV route." },
  { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Sequence venue access, lodging, towing logistics and nearby stops around realistic travel times." },
] as const;

export const Route = createLazyFileRoute("/texas-ohv-guide")({ component: TexasOhvGuidePage });

function TexasOhvGuidePage() {
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
            <p className="eyebrow text-primary">Legal venues · decals · land-manager rules</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas OHV Guide</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A visitor-first guide to five legal off-highway vehicle destinations, with the Texas decal, vehicle-class, permit, map and closure questions to resolve before loading a trailer.</p>
          </header>

          {/* NPS photo provenance is shipped in the route-lazy HTML, not the eager app bundle. */}
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "@id": "https://texasdefined.com/texas-ohv-guide#nps-photo",
            contentUrl: rositaTrailPhoto,
            creator: { "@type": "Organization", name: "National Park Service" },
            creditText: "National Park Service photo, Rosita Flats, Lake Meredith",
            license: "https://creativecommons.org/publicdomain/mark/1.0/",
            acquireLicensePage: "https://www.nps.gov/lamr/planyourvisit/ohv-off-highway-vehicles.htm",
            copyrightNotice: "Public domain NPS photo",
          })}</script>
          <figure className="border-b border-border py-8">
            <img src={rositaTrailPhoto} alt="Designated red-earth off-road route at Rosita Flats, Lake Meredith National Recreation Area, Texas" width={1300} height={900} className="aspect-[16/9] w-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
            <figcaption className="mt-3 max-w-3xl text-xs leading-5 text-muted-foreground">A real designated off-road route at Rosita Flats, one of the featured riding areas. <a href="https://www.nps.gov/lamr/planyourvisit/ohv-off-highway-vehicles.htm" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">National Park Service photo</a> (U.S. public domain). Always verify current NPS route boundaries and restrictions.</figcaption>
          </figure>


          <section className="border-b border-border py-10" aria-labelledby="permit-desk">
            <p className="eyebrow text-primary">Avoid the most common access mistakes</p>
            <h2 id="permit-desk" className="mt-2 font-display text-3xl">Three separate permits and decals to distinguish</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div className="border border-border p-5"><h3 className="font-display text-xl">Sam Houston: individual trail pass</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Every rider needs a Recreation.gov Multiple-Use Trail Pass. OHVs must be at most 50 inches wide, and current Texas OHV decals and applicable ATV education are required. Confirm daily trail status by phone.</p><a href="https://www.recreation.gov/activitypass/f7f9e063-17cc-11eb-8594-76eb6c9a5645" target="_blank" rel="noreferrer noopener" className="text-sm font-semibold text-primary underline">Official trail pass and rules</a></div>
              <div className="border border-border p-5"><h3 className="font-display text-xl">Lake Meredith: NPS permit</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">A separate, no-cost National Park Service ORV permit and Texas OHV decal are required. The NPS permit follows the calendar year, January 1–December 31, not the state decal's season.</p><a href="https://www.nps.gov/lamr/planyourvisit/ohv-off-highway-vehicles.htm" target="_blank" rel="noreferrer noopener" className="text-sm font-semibold text-primary underline">Official NPS permit and riding areas</a></div>
              <div className="border border-border p-5"><h3 className="font-display text-xl">Texas decal: site dependent</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">The TPWD OHV decal is $16 and lasts September 1–August 31 under current rules. Applicable designated public roads and trails and qualifying grant-funded private venues have their own requirements.</p><a href="https://tpwd.texas.gov/state-parks/texas-off-highway-program/faqs-about-the-texas-ohv-program" target="_blank" rel="noreferrer noopener" className="text-sm font-semibold text-primary underline">State decal FAQ</a></div>
            </div>
          </section>
          <section className="border-b border-border py-10" aria-labelledby="ohv-comparison">
            <p className="eyebrow text-primary">Legal access by vehicle</p>
            <h2 id="ohv-comparison" className="mt-2 font-display text-3xl">Which venue fits your machine?</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">An OHV decal is not permission to ride wherever you want. Vehicle categories, trail width, mapped zones, operator waivers and separate permits can differ. This table is a screening tool; the current operator or land manager has the final say.</p>
            <p className="mt-3 text-sm text-muted-foreground md:hidden">Compare the same destinations and details in the cards below.</p>
            <div className="mt-5 grid gap-3 md:hidden" aria-label="Mobile comparison summary">
              {legalRideComparison.map((row) => (
                <div key={row.name} className="min-w-0 rounded-sm border border-border p-4">
                  <h3 className="font-display text-xl">{row.name}</h3>
                  <dl className="mt-3 space-y-2 text-sm leading-6">
                    <div><dt className="font-semibold">Vehicle and area</dt><dd className="text-muted-foreground break-words">{row.vehicles}</dd></div>
                    <div><dt className="font-semibold">Permission to arrange</dt><dd className="text-muted-foreground break-words">{row.permission}</dd></div>
                  </dl>
                </div>
              ))}
            </div>
            <div className="mt-6 hidden overflow-x-auto border border-border md:block" role="region" tabIndex={0} aria-label="Five legal Texas OHV riding areas comparison table">
              <table className="w-full border-collapse text-left text-sm" style={{ minWidth: "820px" }}>
                <thead className="bg-muted/50"><tr><th scope="col" className="border-b border-border p-4">Legal venue</th><th scope="col" className="border-b border-border p-4">Vehicle / area</th><th scope="col" className="border-b border-border p-4">Permission to arrange</th></tr></thead>
                <tbody>{legalRideComparison.map((area) => <tr key={area.name} className="align-top"><th scope="row" className="border-b border-border p-4 font-semibold">{area.name}</th><td className="border-b border-border p-4 text-muted-foreground">{area.vehicles}</td><td className="border-b border-border p-4 text-muted-foreground">{area.permission}</td></tr>)}</tbody>
              </table>
            </div>
          </section>
          <section className="border-b border-border py-10" aria-labelledby="ohv-permit-before-towing">
            <h2 id="ohv-permit-before-towing" className="font-display text-3xl">Which Texas OHV permits and access points should you confirm before towing?</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">A Texas OHV decal is not a substitute for the Sam Houston individual trail pass, Lake Meredith's federal permit or a venue's admission. Use actual measured vehicle width and current route designation, not the marketing label on an ATV or side-by-side.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">Sam Houston — confirm access before buying a nonrefundable pass</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Call the Forest Service at 936-344-6205 or 888-361-6908, option 2, before buying the nonrefundable Recreation.gov pass and again before towing. Obtain a separate pass for each user; register the trailhead vehicle plate and carry a downloaded or printed pass where reception is unreliable. The machine must be no wider than 50 inches. The 85-mile system is not a guarantee of open mileage. Use the current federal map and signed closures.</p><a href="https://www.recreation.gov/activitypass/f7f9e063-17cc-11eb-8594-76eb6c9a5645" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block break-words font-semibold text-primary underline underline-offset-4">Buy the official pass and verify requirements</a></div>
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">Sam Houston — choose the correct staging area</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Lake Conroe's local visitor directions identify East Side Trailhead via Forest Road 233, West Side via Forest Road 208, Kelly's Pond via Forest Roads 204 and 271, and Northwest via FM 149 and FM 1791. The listed Forest Road 234 equestrian trailhead is not an OHV entrance. Verify the current Forest Service Motor Vehicle Use Map, road condition and permitted trail segment before using any of these approaches; unload only in an authorized staging area. Forest Service roads themselves require street-legal vehicles.</p><a href="https://lake-conroe.org/trails/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block break-words font-semibold text-primary underline underline-offset-4">Local trailhead directions</a> · <a href="https://www.recreation.gov/activitypass/f7f9e063-17cc-11eb-8594-76eb6c9a5645" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Federal pass and route rules</a></div>
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">Blue Creek — FM 1913</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Approach the northwest side of Lake Meredith via FM 1913. Riding is confined to the creek-bed area, not its banks or surrounding uplands. There is no potable water; vault toilets do not make this a serviced staging area. Check current conditions before descending.</p><a href="https://www.nps.gov/lamr/planyourvisit/ohv-off-highway-vehicles.htm" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block break-words font-semibold text-primary underline underline-offset-4">NPS ORV maps and rules</a></div>
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">Rosita Flats — US 87/287</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Approach the Canadian River site from US 87/287. Remain within the designated area and below the 3,000-foot limit. For the free NPS annual permit, apply using the NPS instructions or contact lamr_permits@nps.gov; retain the approved permit in the tow vehicle or on the authorized equipment. NPS headquarters: 806-857-3151.</p><a href="https://www.nps.gov/lamr/planyourvisit/ohv-off-highway-vehicles.htm" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block break-words font-semibold text-primary underline underline-offset-4">Federal permit application</a></div>
              <div className="min-w-0 border border-border p-4"><h3 className="font-display text-xl">Camping is separate from vehicle permission</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">At Lake Meredith, an ORV permit is not needed merely to camp at Rosita Flats, but is mandatory for operating in the designated ORV area. Bring drinking water; primitive campsites and picnic tables do not imply utilities or guaranteed availability.</p><a href="https://home.nps.gov/lamr/planyourvisit/camping.htm" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block break-words font-semibold text-primary underline underline-offset-4">NPS campsite and access information</a></div>
            </div>
          </section>
          <section className="border-b border-border py-10" aria-labelledby="ohv-named-access">
            <p className="eyebrow text-primary">Riding access by actual venue</p>
            <h2 id="ohv-named-access" className="mt-2 font-display text-3xl">Trail names, entrance approaches and closure checks</h2>
            <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">These are five different legal arrangements: state-park OHV trails, TMTC recreation areas, a Forest Service motor-vehicle network and National Park Service ORV zones. A decal is never permission to ignore an operator's designated trail, separate pass or closure.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {namedOHVAccess.map((item) => (
                <div key={item.name} className="min-w-0 border border-border p-5">
                  <h3 className="font-display text-xl">{item.name}</h3>
                  <p className="mt-3 text-sm leading-7"><strong>Entry / facilities:</strong> {item.arrival}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong>Marked riding:</strong> {item.segments}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong>Permit and status:</strong> {item.verify}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Official map, rules or pass</a>
                </div>
              ))}
            </div>
            <div className="mt-6 border-l-2 border-primary bg-muted/50 p-5 text-sm leading-7">
              <strong>Sam Houston departure checklist:</strong> <a href="https://www.recreation.gov/activitypass/f7f9e063-17cc-11eb-8594-76eb6c9a5645" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">Purchase the individual trail pass</a>; measure your vehicle's width (50 inches maximum); get the <a href="https://tpwd.texas.gov/state-parks/texas-off-highway-program/where-to-buy-a-texas-ohv-decal" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">current Texas decal</a>; and call <a href="tel:+19363446205" className="font-semibold text-primary underline">936-344-6205</a>, option 2, for the current trail recording. An old status message remains in place until trail status changes; check it for the trip date.
            </div>
          </section>
          <section className="border-b border-border py-9" aria-labelledby="quick-answer">
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="quick-answer" className="mt-2 font-display text-3xl">Legal OHV riding starts with the venue, not the vehicle</h2>
            <div className="mt-4 max-w-4xl space-y-4 text-base leading-8">
              <p>Texas does not treat ordinary public land as an unrestricted OHV playground. Start with TPWD's current Ride Texas legal-venue directory, verify that your vehicle class is allowed, then check the venue or land manager's current map, permits, operating rules and closures.</p>
              <p>Texas law also requires a current OHV decal at applicable legal venues on public lands or venues that receive Texas OHV Program grant funding. Decal requirements do not create access where riding is otherwise prohibited; they are one part of legal use at an eligible venue.</p>
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="decal-eligibility">
            <p className="eyebrow text-primary">Know the decal boundary</p>
            <h2 id="decal-eligibility" className="mt-2 font-display text-3xl">When does a Texas OHV decal apply?</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Do not confuse a Texas OHV decal with universal registration for every privately owned riding area. TPWD requires the decal at legal OHV venues on public land and at private OHV venues developed or improved with qualifying TPWD-administered grants. TPWD specifically names <strong>Barnwell Mountain Recreation Area</strong> as a private-venue example. Riding on ordinary private property that has not received the applicable OHV grant funding generally does not create that decal requirement; you still need the landowner's permission and must follow other applicable laws.</p>
              <p>TPWD currently lists a <strong>$16 decal valid September 1 through August 31</strong> of the following year. The decal does not cover the operator's admission charge, an NPS permit, a state-park trail permit, insurance, or other venue-specific requirements. A prior season's sticker should never be assumed valid for a fall trip.</p>
              <p>Before paying, verify both the <a href="https://tpwd.texas.gov/state-parks/texas-off-highway-program/faqs-about-the-texas-ohv-program" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">official TPWD OHV FAQ</a> and the <a href="https://tpwd.texas.gov/state-parks/texas-off-highway-program/where-to-buy-a-texas-ohv-decal" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">current price and purchasing page</a>. These details were checked November 20, 2026; current published rules govern the trip.</p>
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="state-parks">
            <p className="eyebrow text-primary">A common mistake</p>
            <h2 id="state-parks" className="mt-2 font-display text-3xl">Do not assume Texas state parks allow OHVs</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>TPWD's specialty-vehicle rules generally prohibit OHV use in state parks outside limited exceptions. Eisenhower State Park has a designated OHV trail system; certain other parks have narrow road-use exceptions tied to local registration rules. A state-park entrance fee, street registration or an OHV decal does not by itself authorize trail riding.</p>
              <p>When planning a motorized trip, use the exact park or venue page rather than a general state-parks map. The legal question is not whether the land is public; it is whether the land manager currently designates that specific road, trail or OHV area for your vehicle class.</p>
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="before-unload">
            <p className="eyebrow text-primary">Before you unload</p>
            <h2 id="before-unload" className="mt-2 font-display text-3xl">Rules and conditions to check before you unload</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Confirm the vehicle class, legal trail designation, current map, permit or decal, and any required safety equipment or training before entering the riding area. Manufacturer limits and posted land-manager rules belong in the same pre-trip check.</p>
              <p>Weather, wildfire, trail damage, flooding, dust, heat and capacity limits can close or change a legal venue quickly. If the open routes or current conditions no longer match the vehicle and trip you planned, choose another route or day rather than treating an old map as permission to continue.</p>
            </div>
          </section>

          <div>
            {ohvAreas.map((area, index) => (
              <section key={area.name} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
                <div>
                  <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · {area.region}</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight">{area.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{area.summary}</p>
                </div>
                <div className="max-w-3xl space-y-5">
                  {area.details.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
                  <aside className="border-l-2 border-primary bg-muted/20 px-5 py-4 text-sm leading-7">
                    <h3 className="font-display text-xl">Before loading the trailer</h3>
                    <p className="mt-2"><strong>Vehicle and legal area:</strong> {legalRideComparison[index].vehicles}</p>
                    <p className="mt-2"><strong>Permits and fees:</strong> {legalRideComparison[index].permission}</p>
                    <p className="mt-2"><strong>Final check:</strong> {legalRideComparison[index].check}</p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      <a href={legalRideComparison[index].operator} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">Current operator rules and maps ↗</a>
                      <Link to={legalRideComparison[index].related} className="font-semibold text-primary underline underline-offset-4">Nearby Texas trip planning</Link>
                    </div>
                  </aside>
                </div>
              </section>
            ))}
          </div>

          <section className="border-b border-border py-10" aria-labelledby="extended-trip-planning">
            <h2 id="extended-trip-planning" className="font-display text-3xl">Compare vehicle fit and total trip expense</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground"><p>A narrow motorcycle or ATV trail is not interchangeable with a full-size four-wheel-drive area. At Lake Meredith, NPS requires a separate no-cost ORV permit for Blue Creek and Rosita Flats; NPS also lists general recreation-area admission as free, so the published entry and ORV permit charges together are $0 before fuel, equipment or other expenses. See the <a className="text-primary underline" href="https://www.nps.gov/lamr/planyourvisit/fees.htm">NPS fee page</a>. Other Texas riding areas may have fees and different vehicle restrictions.</p><p>Budget for fuel, applicable decals and passes, trailer transport, lodging and recovery equipment. Confirm vehicle width, access status and operator requirements before paying. A permit does not authorize travel on closed or undesignated ground.</p><p><a className="text-primary underline" href="https://home.nps.gov/lamr/planyourvisit/ohv-off-highway-vehicles.htm">NPS vehicle and permit requirements</a> · <a className="text-primary underline" href="https://www.nps.gov/lamr/planyourvisit/camping.htm">Lake Meredith camping information</a>. For a nonmotorized alternative, compare the <Link className="text-primary underline" to="/texas-mountain-biking-guide">mountain biking guide</Link>; do not assume bicycle trails allow OHVs.</p></div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="planning">
            <p className="eyebrow text-primary">Keep planning</p>
            <h2 id="planning" className="mt-2 font-display text-3xl">Build a legal riding venue into the wider trip</h2>
            <nav aria-label="Texas OHV related guides" className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
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
            <h2 id="sources" className="mt-2 font-display text-3xl">Verify the legal venue, decal and current rules</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Legal venues, decal requirements, vehicle classes, permits, maps, closures and operating conditions can change. These first-party TPWD sources support this guide and should control current trip decisions. TPWD, NPS, Forest Service and TMTC sources checked November 18, 2026; named trail, permit, GPS and closure contacts reviewed November 20, 2026. Current official maps and on-site rules still control travel. Lake Meredith access roads, NPS permit applications and camping distinctions checked November 21, 2026.</p>
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
