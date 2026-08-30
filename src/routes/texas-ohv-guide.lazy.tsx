import { createLazyFileRoute, Link } from "@tanstack/react-router";

import bigBend from "@/assets/big-bend.jpg";
import { Container } from "@/components/layout/Container";

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
    note: "Official decal requirements, current decal period and purchasing information for applicable legal venues.",
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
      "Federal land managers use current maps, route designations and temporary closure notices to control access. Confirm the current motor-vehicle map and local forest alerts before departure, especially after heavy rain, storms, wildfire activity or maintenance. A saved track should never override current land-manager restrictions.",
    ],
  },
  {
    name: "Lake Meredith National Recreation Area OHV Areas",
    region: "Texas Panhandle · Lake Meredith",
    summary: "National recreation area riding concentrated in specifically designated OHV zones rather than unrestricted travel across the landscape.",
    details: [
      "TPWD's legal-venue directory identifies Lake Meredith's Blue Creek and Rosita Flats areas as OHV destinations. This is another case where the named riding area matters more than the larger public-land boundary: the legal destination is the designated OHV zone, not every shoreline, road or backcountry surface within the recreation area.",
      "Vehicle class, route limits, lake conditions, wildfire risk and temporary closures can affect access. Verify the current National Park Service rules and maps for the specific riding area after confirming it through TPWD's Ride Texas directory.",
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

          <figure className="border-b border-border py-8">
            <img src={bigBend} alt="Rugged Texas public-land landscape used as general outdoor travel context" className="aspect-[16/9] w-full object-cover" loading="eager" fetchPriority="high" />
            <figcaption className="mt-3 max-w-3xl text-xs leading-5 text-muted-foreground">This image provides general Texas outdoor context and does not depict a specific legal OHV trail. Use current land-manager maps—not landscape appearance—to determine where motorized recreation is allowed.</figcaption>
          </figure>

          <section className="border-b border-border py-9" aria-labelledby="quick-answer">
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="quick-answer" className="mt-2 font-display text-3xl">Legal OHV riding starts with the venue, not the vehicle</h2>
            <div className="mt-4 max-w-4xl space-y-4 text-base leading-8">
              <p>Texas does not treat ordinary public land as an unrestricted OHV playground. Start with TPWD's current Ride Texas legal-venue directory, verify that your vehicle class is allowed, then check the venue or land manager's current map, permits, operating rules and closures.</p>
              <p>Texas law also requires a current OHV decal at applicable legal venues on public lands or venues that receive Texas OHV Program grant funding. Decal requirements do not create access where riding is otherwise prohibited; they are one part of legal use at an eligible venue.</p>
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

          <section className="border-b border-border py-10" aria-labelledby="safety-boundary">
            <p className="eyebrow text-primary">Safety boundary</p>
            <h2 id="safety-boundary" className="mt-2 font-display text-3xl">This is access planning, not off-road driving instruction</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>OHV recreation can result in serious injury or death. This guide does not teach vehicle control, speed selection, hill climbing, descending, jumps, water crossings, obstacle negotiation, recovery, winching, rollover response, mechanical repair or how to modify a vehicle for trail use.</p>
              <p>Follow the vehicle manufacturer, required safety training, protective-equipment rules and the land manager's current instructions. Weather, wildfire, trail damage, flooding, dust, heat and capacity limits can close or change a legal venue quickly.</p>
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
                </div>
              </section>
            ))}
          </div>

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
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Legal venues, decal requirements, vehicle classes, permits, maps, closures and operating conditions can change. These first-party TPWD sources support this guide and should control current trip decisions. Source review: August 30, 2026.</p>
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
