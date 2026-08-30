import { createLazyFileRoute, Link } from "@tanstack/react-router";

import bigBend from "@/assets/big-bend.jpg";
import { Container } from "@/components/layout/Container";

const officialSources = [
  { label: "Texas Parks & Wildlife — Biking in State Parks", href: "https://tpwd.texas.gov/state-parks/parks/things-to-do/biking-in-state-parks", note: "Statewide trail-rating, biking, shared-use and current e-bike guidance for Texas state parks." },
  { label: "Texas Parks & Wildlife — Franklin Mountains State Park", href: "https://tpwd.texas.gov/state-parks/franklin-mountains", note: "Official trail, access, terrain and visitor guidance for the El Paso mountain trail system." },
  { label: "Texas Parks & Wildlife — Big Bend Ranch State Park", href: "https://tpwd.texas.gov/state-parks/big-bend-ranch", note: "Official information for the remote multiuse trail network, access, heat and backcountry planning." },
  { label: "Texas Parks & Wildlife — Palo Duro Canyon trails", href: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/trails-info", note: "Official trail-use designations and current trail information, including the mountain-bike-only Capitol Peak trail." },
  { label: "Texas Parks & Wildlife — Hill Country State Natural Area", href: "https://tpwd.texas.gov/state-parks/hill-country", note: "Official shared-use trail, closure, access and natural-area guidance." },
  { label: "Texas Parks & Wildlife — Tyler State Park", href: "https://tpwd.texas.gov/state-parks/tyler", note: "Official East Texas trail, mountain-bike and park-planning information." },
] as const;

const trailSystems = [
  {
    name: "Franklin Mountains State Park",
    region: "Far West Texas · El Paso",
    summary: "A large desert mountain trail system where terrain, exposure and heat make route selection part of trip planning.",
    details: [
      "Franklin Mountains State Park protects a rugged Chihuahuan Desert range directly beside El Paso. TPWD describes more than 100 miles of trail across nearly 27,000 acres, with hiking and mountain biking among the primary ways visitors explore the park.",
      "The important planning issue is scale. Desert trails can be rocky and exposed, shade is limited, and summer heat can make an otherwise reasonable outing inappropriate. Use the current TPWD trail map and rating system to choose a route that fits your group, then check park conditions and weather before committing to the ride.",
    ],
  },
  {
    name: "Big Bend Ranch State Park",
    region: "Big Bend · Presidio / Lajitas country",
    summary: "Remote desert riding across one of Texas's largest public-land trail networks, where self-sufficiency and heat planning matter as much as mileage.",
    details: [
      "Big Bend Ranch is a very different mountain-biking proposition from an urban-adjacent trail system. TPWD lists roughly 238 miles of multiuse trails within an enormous, remote state park, so distance to services, communications, water and exit points deserve serious attention before the ride begins.",
      "This is also country where heat can become the controlling condition. Treat the official park page, trail maps, current closures and weather as part of the route decision. A statewide guide should help you understand the setting; it should not turn a remote desert trail into a casual mileage challenge.",
    ],
  },
  {
    name: "Palo Duro Canyon State Park",
    region: "Panhandle · Canyon / Amarillo",
    summary: "Canyon riding with a mix of shared trails and at least one mountain-bike-only option inside a heavily visited state park.",
    details: [
      "Palo Duro Canyon drops riders from the High Plains into layered canyon terrain. TPWD's trail information identifies biking on many park trails and marks Capitol Peak as a mountain-bike-only trail, making the park useful for visitors who want a clearly managed public-land riding destination.",
      "Canyon conditions change with weather. TPWD can close trails when wet or otherwise unsuitable, and heat inside the canyon can be more severe than visitors expect from the rim. Check the current trail status rather than assuming a route shown on a saved map is open on arrival day.",
    ],
  },
  {
    name: "Hill Country State Natural Area",
    region: "Hill Country · Bandera",
    summary: "Shared-use Hill Country trails where mountain bikers, hikers and equestrians operate within the same protected natural landscape.",
    details: [
      "Hill Country State Natural Area provides a useful contrast to bike-specific systems because its trail network is fundamentally shared. TPWD describes about 40 miles of multiuse trail used by hikers, mountain bikers and horseback riders.",
      "That makes awareness of other users central to the visit. Slow for blind corners, yield according to posted trail guidance, protect the surface when conditions are wet, and respect temporary closures for weather or resource protection. Natural-area status means recreation is taking place inside a conservation landscape, not on a purpose-built bike park.",
    ],
  },
  {
    name: "Tyler State Park",
    region: "East Texas · Tyler",
    summary: "Pineywoods riding on a compact state-park trail network that shows a greener, more humid side of Texas mountain biking.",
    details: [
      "Tyler State Park gives the statewide guide an East Texas anchor. TPWD lists more than 13 miles of trails and identifies mountain biking as one of the park's recreation options, placing riders in a forested environment very different from Franklin Mountains or Big Bend Ranch.",
      "Many Tyler trails are shared, and the official trail guidance includes directional conventions intended to reduce conflicts among users. Humidity, rain and soft trail surfaces can also affect ride conditions. Use the current park map and posted directions rather than treating the system as a generic loop network.",
    ],
  },
] as const;

const planningPaths = [
  { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Put biking inside the larger public-land, habitat, weather and seasonal planning picture." },
  { to: "/explore/state-parks", label: "Texas state parks", description: "Find more managed public lands and verify park-specific trail access." },
  { to: "/texas-natural-wonders-bucket-list", label: "Texas natural wonders", description: "Connect desert ranges, canyon country and Hill Country terrain to the statewide landscape story." },
  { to: "/texas-rock-climbing-bouldering-guide", label: "Rock climbing & bouldering", description: "Plan another public-land adventure around land-manager access and stewardship rules." },
  { to: "/best-places-to-go-camping-in-texas", label: "Texas camping", description: "Choose an overnight base near public trail systems where camping fits the trip." },
  { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Sequence trail systems, lodging and nearby stops around realistic drive times." },
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
        <article className="mx-auto max-w-5xl">
          <header className="border-b border-border pb-10">
            <p className="eyebrow text-primary">Public trails · five Texas landscapes</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Mountain Biking Guide</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A visitor-first guide to five public trail systems—from El Paso desert mountains and Big Bend backcountry to Palo Duro, the Hill Country and East Texas pines—with official access, trail-use and closure guidance.</p>
          </header>

          <figure className="border-b border-border py-8">
            <img src={bigBend} alt="Rugged West Texas landscape representing public mountain-biking country" className="aspect-[16/9] w-full object-cover" loading="eager" fetchPriority="high" />
            <figcaption className="mt-3 max-w-3xl text-xs leading-5 text-muted-foreground">Texas mountain biking ranges from remote desert backcountry to shared forest and Hill Country trail systems; the land manager's current map should always control the ride plan.</figcaption>
          </figure>

          <section className="border-b border-border py-9" aria-labelledby="quick-answer">
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="quick-answer" className="mt-2 font-display text-3xl">Five public systems show how different Texas riding can be</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">Start with Franklin Mountains for rugged El Paso desert terrain, Big Bend Ranch for remote backcountry scale, Palo Duro Canyon for managed canyon trails, Hill Country State Natural Area for shared-use limestone country, and Tyler State Park for East Texas forest riding. Trail designations, direction, closures and allowable bicycle types can differ by park, so verify the current TPWD map and rules for the exact system you plan to ride.</p>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="safety-boundary">
            <p className="eyebrow text-primary">Safety boundary</p>
            <h2 id="safety-boundary" className="mt-2 font-display text-3xl">This is trip planning, not riding instruction</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Mountain biking can result in serious injury. This guide does not teach jumping, drops, cornering technique, high-speed descending, obstacle negotiation, bicycle repair or protective-equipment selection. Riders should choose terrain within their experience, use appropriate equipment and obtain competent instruction where needed.</p>
              <p>Trail conditions can change faster than a static guide. Heat, lightning, wildfire, flooding, mud, trail damage and land-manager closures can make a planned ride inappropriate. Check the official park page and weather before leaving, and follow closures even when an older map still shows the trail.</p>
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="shared-use">
            <p className="eyebrow text-primary">Shared trails</p>
            <h2 id="shared-use" className="mt-2 font-display text-3xl">A bike trail may also be someone else's hiking or horse trail</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Several Texas public systems are multiuse rather than bike-only. Follow posted yielding and directional rules, control speed around blind corners, and give other trail users room. A park-specific sign or current map takes priority over assumptions brought from another trail system.</p>
              <p>Electric-bike rules also deserve a current check instead of a statewide assumption. TPWD publishes statewide biking guidance, but bicycle access and trail designations can change; verify the current park instructions for the bicycle you intend to use.</p>
            </div>
          </section>

          <div>
            {trailSystems.map((area, index) => (
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
            <h2 id="planning" className="mt-2 font-display text-3xl">Build the trail day into a Texas trip</h2>
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
            <h2 id="sources" className="mt-2 font-display text-3xl">Use the current TPWD trail information</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Trail direction, closures, ratings, bicycle access and park operations can change. These first-party sources support this guide and should control current trip decisions. Source review: August 30, 2026.</p>
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
