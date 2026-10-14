import { createLazyFileRoute, Link } from "@tanstack/react-router";

import heroHillCountry from "@/assets/hero-hill-country.jpg";
import { Container } from "@/components/layout/Container";
import { stateParkHeroMap } from "@/data/state-park-hero-map";

const franklinImage = stateParkHeroMap["franklin-mountains-state-park"];
const bigBendImage = stateParkHeroMap["big-bend-ranch-state-park"];
const paloDuroImage = stateParkHeroMap["palo-duro-canyon-state-park"];
const tylerImage = stateParkHeroMap["tyler-state-park"];

const officialSources = [
  { label: "TPWD — Biking in State Parks", href: "https://tpwd.texas.gov/state-parks/parks/things-to-do/biking-in-state-parks", note: "Statewide biking guidance, trail ratings, multiuse etiquette and current e-bike rules." },
  { label: "TPWD — Franklin Mountains State Park", href: "https://tpwd.texas.gov/state-parks/franklin-mountains", note: "Official park overview with current alerts and the 100-plus-mile trail network." },
  { label: "TPWD — Franklin Mountains Plan Your Visit", href: "https://tpwd.texas.gov/state-parks/franklin-mountains/plan-your-visit", note: "Current route-planning links, interactive map and trail recommendations." },
  { label: "TPWD — Big Bend Ranch State Park", href: "https://tpwd.texas.gov/state-parks/big-bend-ranch", note: "Official access, heat, reservation and 238-mile multiuse-trail guidance." },
  { label: "TPWD — Big Bend Ranch Activities", href: "https://tpwd.texas.gov/state-parks/big-bend-ranch/activities/", note: "Mountain-biking resources for Contrabando, Encino, Fresno Canyon and other park routes." },
  { label: "TPWD — Palo Duro Canyon Trails", href: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/trails-info/", note: "Current trail map and bike-use designations, including the Capitol Peak MTB-only loop." },
  { label: "TPWD — Hill Country State Natural Area Trails", href: "https://tpwd.texas.gov/state-parks/hill-country/trails-map", note: "Forty miles of shared-use trails with current trail descriptions and maps." },
  { label: "TPWD — Tyler State Park Trails", href: "https://tpwd.texas.gov/state-parks/tyler/trails-info/", note: "Current trail distances, difficulty ratings and directional rules for bikers and hikers." },
] as const;

const trailSystems = [
  {
    name: "Franklin Mountains State Park",
    region: "Far West Texas · El Paso",
    destinationPath: "/destination/franklin-mountains-state-park",
    officialUrl: "https://tpwd.texas.gov/state-parks/franklin-mountains",
    trailUrl: "https://tpwd.texas.gov/state-parks/franklin-mountains/plan-your-visit",
    image: franklinImage,
    bestFor: "A huge desert trail network beside a major city",
    trailScale: "100+ miles",
    terrain: "Rocky Chihuahuan Desert mountain terrain",
    startHere: "Use the current TPWD trail map to match mileage and difficulty to your group.",
    intro: "Franklin Mountains is the easiest place on this list to combine serious desert riding with a city stay. The park rises directly out of El Paso and TPWD says riders and hikers can explore almost 27,000 acres on more than 100 miles of trail.",
    rideNotes: [
      "The attraction is choice: short outings, longer mountain traverses and rugged desert terrain all live inside the same park system.",
      "Do not choose a route by mileage alone. Loose rock, exposure, climbing and heat can make a short desert ride feel much bigger than the number on the map.",
      "The best first move is to open TPWD's current trail map, choose a distance and rating that fit your group, then build the rest of the day around that route rather than improvising after arrival.",
    ],
    quickFacts: ["Nearly 27,000 acres", "More than 100 miles of trail", "About 15 minutes from central El Paso", "Desert exposure and limited shade"],
  },
  {
    name: "Big Bend Ranch State Park",
    region: "Big Bend · Presidio / Lajitas country",
    destinationPath: "/destination/big-bend-ranch-state-park",
    officialUrl: "https://tpwd.texas.gov/state-parks/big-bend-ranch",
    trailUrl: "https://tpwd.texas.gov/state-parks/big-bend-ranch/activities/",
    image: bigBendImage,
    bestFor: "Remote backcountry riding and multi-day desert trips",
    trailScale: "238 miles multiuse",
    terrain: "High-desert basins, canyon country and rugged ranch roads",
    startHere: "Study the Contrabando system first if you want a defined mountain-biking planning anchor.",
    intro: "Big Bend Ranch is the heavyweight of this group. TPWD lists 238 miles of multiuse trails across Texas's largest state park, and the biking page points riders to dedicated material for Contrabando, Encino, Fresno Canyon and other routes.",
    rideNotes: [
      "Contrabando is the most obvious starting point for riders who want a named trail system with its own park brochure instead of planning a route from the full backcountry map.",
      "More remote options such as Encino and the Fresno Canyon area demand a different mindset: route-finding, water, road access and the distance back to services matter as much as the trail itself.",
      "TPWD warns that warm-season temperatures can exceed 100°F by late morning. Big Bend Ranch is a place to plan conservatively, download maps before leaving service and treat park alerts as part of the ride plan.",
    ],
    quickFacts: ["238 miles of multiuse trail", "Texas's largest state park", "Contrabando, Encino and Fresno Canyon resources", "Remote access with limited services"],
  },
  {
    name: "Palo Duro Canyon State Park",
    region: "Panhandle · Canyon / Amarillo",
    destinationPath: "/destination/palo-duro-canyon-state-park",
    officialUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon",
    trailUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/trails-info/",
    image: paloDuroImage,
    bestFor: "A clear MTB-only ride plus a larger canyon trail day",
    trailScale: "Capitol Peak: 3.5-mile MTB-only loop",
    terrain: "Canyon floor, red-rock slopes and exposed Panhandle terrain",
    startHere: "Capitol Peak gives riders one loop with green, blue and black difficulty sections.",
    intro: "Palo Duro is the easiest system on this list to explain to a rider who wants one obvious place to start. Capitol Peak is a 3.5-mile loop reserved for mountain bikes, and TPWD divides the ride into green, blue and black sections for easy, moderate and difficult terrain.",
    rideNotes: [
      "That progression makes Capitol Peak useful for mixed groups: riders can see the park's difficulty language before committing to harder terrain elsewhere in the canyon.",
      "Many additional Palo Duro trails allow both hiking and biking, so the MTB-only loop can be the centerpiece of a larger day rather than the entire visit.",
      "Canyon heat and wet-weather closures can change plans quickly. Check the current trail page before driving down into the park, especially after rain or during hot-weather periods.",
    ],
    quickFacts: ["Capitol Peak: 3.5-mile loop", "Mountain-bike-only designation", "Green / blue / black sections", "Many additional shared hiking-and-biking trails"],
  },
  {
    name: "Hill Country State Natural Area",
    region: "Hill Country · Bandera",
    destinationPath: "/destination/hill-country-louise-merrick-unit-state-natural-area",
    officialUrl: "https://tpwd.texas.gov/state-parks/hill-country/",
    trailUrl: "https://tpwd.texas.gov/state-parks/hill-country/trails-map",
    image: { src: heroHillCountry, alt: "Rolling limestone hills and oak-covered terrain in the Texas Hill Country" },
    bestFor: "Rocky Hill Country riding in a primitive shared-use setting",
    trailScale: "40 miles shared-use",
    terrain: "Creek bottoms, limestone hills, canyons and plateaus",
    startHere: "Merrick Mile is a 1-mile easy-to-moderate loop; use it to sample the terrain before going deeper.",
    intro: "Hill Country State Natural Area trades bike-park polish for a rugged former-ranch landscape. TPWD lists 40 miles of trail, and every trail in the system is shared by hikers, mountain bikers and horseback riders.",
    rideNotes: [
      "Merrick Mile is the most approachable named entry point on the current TPWD trail list: a one-mile easy-to-moderate loop near headquarters with a mild climb and descent.",
      "From there, the system opens into steeper, rockier Hill Country terrain. The attraction is not one signature bike trail so much as the chance to build a longer ride through creek bottoms, ridges and open plateau country.",
      "Because this is a natural area rather than a purpose-built MTB park, temporary closures and shared-use etiquette matter. Slow for horses and hikers, follow posted yielding rules and check wet-weather status before arrival.",
    ],
    quickFacts: ["40 miles of trail", "All trails are shared-use", "Merrick Mile: 1.0 mile, easy-moderate", "Primitive natural-area setting near Bandera"],
  },
  {
    name: "Tyler State Park",
    region: "East Texas · Tyler",
    destinationPath: "/destination/tyler-state-park",
    officialUrl: "https://tpwd.texas.gov/state-parks/tyler",
    trailUrl: "https://tpwd.texas.gov/state-parks/tyler/trails-info/",
    image: tylerImage,
    bestFor: "Forested loops and a compact first East Texas MTB weekend",
    trailScale: "13 miles of park trails",
    terrain: "Pine and hardwood forest with rolling elevation changes",
    startHere: "A Loop (2.6 mi) and B Loop (3.1 mi) are both rated moderate by TPWD.",
    intro: "Tyler State Park is the visual reset after four drier systems. Instead of cactus, exposed limestone or canyon walls, the riding moves through Pineywoods forest around a spring-fed lake on a compact network that is easy to pair with camping or a half-day visit.",
    rideNotes: [
      "TPWD rates the 2.6-mile A Loop moderate and notes elevation changes and loose-gravel obstacles. The 3.1-mile B Loop is also moderate and adds more sustained elevation change through different forest types.",
      "Directional rules are unusually useful here: on multiuse trails, bikers travel clockwise while hikers travel counter-clockwise. That is the kind of park-specific detail worth knowing before the first turn.",
      "Rain and soft trail surfaces can affect the system, so use the current park trail page rather than assuming a forest loop will be rideable after wet weather.",
    ],
    quickFacts: ["13 miles of trails", "A Loop: 2.6 miles, moderate", "B Loop: 3.1 miles, moderate", "Bikers clockwise on multiuse trails"],
  },
] as const;

const planningPaths = [
  { to: "/explore/state-parks", label: "Texas state parks", description: "Browse more public lands and destination guides across the state." },
  { to: "/best-places-to-go-camping-in-texas", label: "Camping in Texas", description: "Turn a trail day into an overnight park or road-trip stop." },
  { to: "/explore/road-trips", label: "Texas road trips", description: "Build the drive around parks, towns and worthwhile stops instead of an out-and-back slog." },
  { to: "/texas-natural-wonders-bucket-list", label: "Texas natural wonders", description: "Connect the rides to the desert, canyon, forest and Hill Country landscapes around them." },
  { to: "/texas-rock-climbing-bouldering-guide", label: "Rock climbing & bouldering", description: "Add another public-land outdoor activity with the same access-first planning approach." },
  { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Sequence destinations, lodging and realistic drive times for a longer trip." },
] as const;

export const Route = createLazyFileRoute("/texas-mountain-biking-guide")({ component: TexasMountainBikingGuidePage });

function TexasMountainBikingGuidePage() {
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
        <article className="mx-auto max-w-6xl">
          <header className="grid gap-8 border-b border-border pb-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow text-primary">Texas trails · five very different rides</p>
              <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Mountain Biking in Texas: 5 Public Trail Systems &amp; Where to Ride</h1>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Compare desert mountains, Big Bend backcountry, an MTB-only canyon loop, rocky Hill Country and East Texas forest riding—with trail mileage, difficulty cues, maps and practical planning links for each system.</p>
            </div>
            <div className="border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
              <strong className="block text-foreground">Not an exhaustive Texas MTB directory.</strong>
              These five TPWD-managed systems were chosen because they show the range of public riding Texans can plan around: urban-edge mountains, remote desert, canyon progression, shared Hill Country and Pineywoods loops.
            </div>
          </header>

          <figure className="border-b border-border py-8">
            <img src={franklinImage.src} alt="Franklin Mountains State Park above El Paso, one of Texas's major public mountain-biking landscapes" width={franklinImage.width} height={franklinImage.height} className="aspect-[16/9] w-full object-cover" loading="eager" fetchPriority="high" />
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs leading-5 text-muted-foreground">
              <span>Franklin Mountains puts more than 100 miles of rugged desert trail directly beside El Paso.</span>
              {franklinImage.credit ? <span>Photo: {franklinImage.credit}</span> : null}
            </figcaption>
          </figure>

          <section className="border-b border-border py-10" aria-labelledby="compare-rides">
            <p className="eyebrow text-primary">Choose your ride</p>
            <h2 id="compare-rides" className="mt-2 font-display text-4xl">Five Texas trail systems at a glance</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">If you only need the decision-making version of this guide, start here. Trail status can change, so the official map linked inside each section should still be your final check.</p>
            <div className="mt-7 overflow-x-auto border border-border">
              <table className="w-full border-collapse text-left text-sm" style={{ minWidth: "900px" }}>
                <thead className="bg-muted/50">
                  <tr>
                    <th className="border-b border-border p-4 font-semibold">Trail system</th>
                    <th className="border-b border-border p-4 font-semibold">Best for</th>
                    <th className="border-b border-border p-4 font-semibold">Trail scale</th>
                    <th className="border-b border-border p-4 font-semibold">Terrain</th>
                    <th className="border-b border-border p-4 font-semibold">Start here</th>
                  </tr>
                </thead>
                <tbody>
                  {trailSystems.map((area) => (
                    <tr key={area.name} className="align-top">
                      <td className="border-b border-border p-4 font-semibold text-foreground">{area.name}</td>
                      <td className="border-b border-border p-4 text-muted-foreground">{area.bestFor}</td>
                      <td className="border-b border-border p-4 text-muted-foreground">{area.trailScale}</td>
                      <td className="border-b border-border p-4 text-muted-foreground">{area.terrain}</td>
                      <td className="border-b border-border p-4 text-muted-foreground">{area.startHere}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="why-these-five">
            <p className="eyebrow text-primary">Why these five?</p>
            <h2 id="why-these-five" className="mt-2 font-display text-3xl">A statewide sampler, not five interchangeable parks</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Texas mountain biking changes dramatically with geography. Franklin Mountains gives you a giant desert network minutes from El Paso. Big Bend Ranch is about scale and remoteness. Palo Duro has a clearly designated MTB-only loop with multiple difficulty levels. Hill Country State Natural Area is a rocky, shared-use backcountry system. Tyler State Park is compact, wooded and easy to fold into a camping weekend.</p>
              <p>That contrast is the point of the list. There are many more places to ride in Texas, including additional state parks, trailways and locally managed systems. Use TPWD's statewide biking page when you want to expand beyond these five.</p>
            </div>
          </section>

          <div>
            {trailSystems.map((area, index) => (
              <section key={area.name} className="border-b border-border py-12" aria-labelledby={`trail-system-${index + 1}`}>
                <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                  <div>
                    <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · {area.region}</p>
                    <h2 id={`trail-system-${index + 1}`} className="mt-2 font-display text-4xl leading-tight">{area.name}</h2>
                    <p className="mt-4 max-w-3xl text-lg leading-8 text-foreground">{area.bestFor}</p>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{area.intro}</p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {area.quickFacts.map((fact) => (
                        <div key={fact} className="border border-border bg-muted/20 px-4 py-3 text-sm leading-6 text-foreground">{fact}</div>
                      ))}
                    </div>

                    <h3 className="mt-8 font-display text-2xl">What to know before you ride</h3>
                    <div className="mt-4 max-w-3xl space-y-4 text-base leading-8 text-muted-foreground">
                      {area.rideNotes.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link to={area.destinationPath} className="inline-flex items-center border border-primary bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">TexasDefined park guide</Link>
                      <a href={area.trailUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary">Official trail map &amp; details ↗</a>
                      <a href={area.officialUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center px-2 py-2.5 text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">Current park alerts ↗</a>
                    </div>
                  </div>

                  <figure className="overflow-hidden border border-border bg-muted/20">
                    <img src={area.image.src} alt={area.image.alt} {...("width" in area.image ? { width: area.image.width, height: area.image.height } : {})} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                    <figcaption className="px-4 py-3 text-xs leading-5 text-muted-foreground">
                      <span>{area.terrain}</span>
                      {"credit" in area.image && area.image.credit ? <span className="mt-1 block">Photo: {area.image.credit}</span> : null}
                    </figcaption>
                  </figure>
                </div>
              </section>
            ))}
          </div>

          <section className="border-b border-border py-10" aria-labelledby="before-you-roll">
            <p className="eyebrow text-primary">Before you roll</p>
            <h2 id="before-you-roll" className="mt-2 font-display text-3xl">Four checks that matter more than a saved screenshot</h2>
            <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {[
                ["Trail status", "Check the land manager's current alert and trail page. Wet-weather, wildfire, maintenance and resource-protection closures can override an older map."],
                ["Heat and weather", "Texas riding conditions can change sharply by region and season. Desert and canyon systems deserve especially conservative heat planning."],
                ["Shared-use rules", "Several systems on this page are shared with hikers and horses. Follow the park's posted direction, yielding and access rules."],
                ["Offline navigation", "Download the current trail map before leaving service. Remote parks can have weak or nonexistent cell coverage."],
              ].map(([title, body]) => (
                <div key={title} className="bg-background p-5">
                  <h3 className="font-display text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="planning">
            <p className="eyebrow text-primary">Keep planning</p>
            <h2 id="planning" className="mt-2 font-display text-3xl">Turn the ride into a better Texas trip</h2>
            <nav aria-label="Texas mountain biking related guides" className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
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
            <h2 id="sources" className="mt-2 font-display text-3xl">Maps and conditions should come from TPWD</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Mileage, access, trail direction, closures and park operations can change. These first-party sources support the guide and should control current trip decisions. Source review: September 30, 2026.</p>
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
