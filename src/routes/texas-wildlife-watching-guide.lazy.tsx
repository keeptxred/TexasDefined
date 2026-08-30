import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const officialSources = [
  { label: "Texas Parks & Wildlife — Great Texas Wildlife Trails", href: "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/", note: "Statewide official network of nine regional driving maps for birds, butterflies, bats, pronghorns and other Texas wildlife." },
  { label: "Texas Parks & Wildlife — Wildlife Watching in State Parks", href: "https://tpwd.texas.gov/state-parks/parks/things-to-do/wildlife-watching/", note: "Statewide safe-viewing guidance and public-land wildlife-watching context, including the direction to maintain a safe distance from wildlife." },
  { label: "Texas Parks & Wildlife — Far West Texas Wildlife Trail", href: "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/fwtx", note: "Official regional loops and desert/mountain wildlife context from El Paso through Big Bend and the Permian Basin." },
  { label: "Texas Parks & Wildlife — Upper Texas Coast Wildlife Trail", href: "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/utc", note: "Official Upper Coast loops through wetlands, prairie, bayous and Gulf habitat, including safe-distance alligator viewing." },
  { label: "Texas Parks & Wildlife — Heart of Texas West Wildlife Trail", href: "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/hotw", note: "Official Hill Country and Edwards Plateau loops featuring bat flights, armadillos, butterflies and other wildlife." },
  { label: "Texas Parks & Wildlife — Panhandle Plains Wildlife Trail", href: "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/php/", note: "Official Panhandle loops and open-country wildlife context including coyotes, pronghorns and prairie dogs." },
  { label: "Texas Parks & Wildlife — Prairies and Pineywoods East Wildlife Trail", href: "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ppwe", note: "Official East Texas loops through Big Thicket, Caddo Lake, hardwood forests and river habitats." },
] as const;

const regions = [
  {
    name: "Far West Texas Wildlife Trail",
    region: "Chihuahuan Desert · mountains · Rio Grande",
    summary: "A huge desert-and-mountain region where pronghorn, jackrabbits, reptiles and high-desert wildlife share the landscape with some of Texas's most dramatic scenery.",
    details: [
      "TPWD's Far West trail stretches from El Paso and the Guadalupe Mountains through the Davis Mountains, Alpine, Marathon, Big Bend and east toward the Permian Basin. The regional map is useful because wildlife viewing here is rarely one roadside stop; it is a network of parks, public lands and managed sites separated by substantial driving distances.",
      "Plan around heat, long distances, borderland and park access rules, and the fact that wildlife presence is never guaranteed. Observe pronghorn, jackrabbits, reptiles and other animals from a distance instead of leaving designated access areas or pursuing an animal for a closer look or photograph.",
    ],
  },
  {
    name: "Upper Texas Coast Wildlife Trail",
    region: "Houston · Galveston · Bolivar · coastal wetlands",
    summary: "Wetlands, prairie, bayous and coastal habitat where alligators, waterbirds and other Gulf Coast wildlife can often be viewed from established public sites.",
    details: [
      "The Upper Coast network runs from Beaumont and the Big Thicket through Houston, High Island, Bolivar, Galveston and Brazoria-area wetlands. TPWD specifically notes the possibility of seeing alligators and explicitly says to do so from a safe distance.",
      "Coastal wildlife viewing is highly seasonal and weather-sensitive. Storms, flooding, extreme heat and mosquito activity can change a visit, while nesting and migration seasons can increase both wildlife abundance and the need to avoid crowding sensitive habitat. Use current site rules and observation platforms rather than approaching animals or entering closed areas.",
    ],
  },
  {
    name: "Heart of Texas West Wildlife Trail",
    region: "Hill Country · Edwards Plateau · river country",
    summary: "A Hill Country network where bat flights, armadillos, butterflies, cave ecosystems and river-corridor wildlife create a broader viewing experience than birding alone.",
    details: [
      "TPWD's western Heart of Texas region reaches from San Angelo and Sonora through Junction, Fredericksburg, Uvalde and Del Rio. The agency highlights bat flights, monarch butterflies, nine-banded armadillos and abundant wildlife alongside the region's cave and river landscapes.",
      "Bat emergence is a viewing event, not an invitation to enter roosts or handle bats. Use designated observation areas and follow site-specific hours, tickets and closures where they apply. The same principle extends to every species: watch normal behavior from a respectful distance and never feed, bait, touch or pursue wildlife.",
    ],
  },
  {
    name: "Panhandle Plains Wildlife Trail",
    region: "High Plains · canyons · prairie",
    summary: "Wide-open country for pronghorn, coyotes, black-tailed prairie dogs and other grassland wildlife across the northern half of Texas.",
    details: [
      "The Panhandle Plains trail covers Amarillo, Lubbock, Abilene and the surrounding canyons, mesas, rivers and plains. TPWD highlights pronghorn, coyotes, black-tailed prairie dogs, Sandhill Cranes and Burrowing Owls among the region's characteristic wildlife.",
      "Open country can create the illusion that an animal is easy to approach, but distance still matters. Stay on legal public access, use pullouts and viewing areas where provided, and do not enter prairie-dog colonies, livestock areas or private land simply because wildlife is visible beyond a boundary.",
    ],
  },
  {
    name: "Prairies and Pineywoods East Wildlife Trail",
    region: "Big Thicket · Caddo Lake · East Texas forests",
    summary: "Forests, swamps, lakes and river corridors where river otters, flying squirrels and woodland wildlife complement the region's rich bird life.",
    details: [
      "TPWD's East Texas trail links the Big Thicket, Nacogdoches, Lufkin, Caddo Lake, Texarkana and numerous lake and forest loops. The statewide trail material highlights river otters and eastern flying squirrels along with the region's woodland birds and distinctive wetland habitat.",
      "Dense vegetation can make wildlife harder to see, which is part of the experience rather than a reason to leave trails or disturb cover. Use boardwalks, public trails and quiet observation. Around wetlands and waterways, also account for insects, heat, high water and other conditions that may affect whether a viewing site is practical that day.",
    ],
  },
] as const;

const planningPaths = [
  { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Put wildlife viewing inside the broader Texas public-land, habitat, weather and seasonal planning picture." },
  { to: "/texas-birds-guide", label: "Texas birds guide", description: "Go deeper on bird-specific habitats, migration seasons and birding destinations." },
  { to: "/explore/state-parks", label: "Texas state parks", description: "Find managed public lands with trails, overlooks, nature programs and current visitor rules." },
  { to: "/texas-natural-wonders-bucket-list", label: "Natural wonders", description: "Connect wildlife regions to the deserts, canyons, wetlands, forests and rivers that support them." },
  { to: "/texas-stargazing-guide", label: "Stargazing & dark skies", description: "Extend a wildlife trip into the night while following park access and dark-sky stewardship rules." },
  { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Sequence viewing sites, drive times, park hours, lodging and nearby stops into a realistic itinerary." },
] as const;

export const Route = createLazyFileRoute("/texas-wildlife-watching-guide")({ component: TexasWildlifeWatchingGuidePage });

function TexasWildlifeWatchingGuidePage() {
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
            <p className="eyebrow text-primary">Wildlife trails · habitats · safe observation</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Wildlife Watching Guide</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A visitor-first guide to five contrasting Great Texas Wildlife Trail regions, from pronghorn country and coastal wetlands to Hill Country bat flights, Panhandle prairie and East Texas forests.</p>
          </header>

          <section className="border-b border-border py-9" aria-labelledby="quick-answer">
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="quick-answer" className="mt-2 font-display text-3xl">Use the habitat to choose the trip, then let wildlife keep its distance</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">TPWD's Great Texas Wildlife Trails organize the state into nine regional driving maps for wildlife enthusiasts. This guide samples five of those regions to show how different a Texas wildlife trip can be. The central rule is consistent everywhere: wildlife is unpredictable and should be observed without changing its behavior. TPWD advises visitors to maintain a safe distance from wildlife.</p>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="ethics">
            <p className="eyebrow text-primary">Safe and ethical viewing</p>
            <h2 id="ethics" className="mt-2 font-display text-3xl">Watch wildlife without making yourself part of the encounter</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Do not feed, touch, bait, call, lure, chase, corner or crowd wildlife. Do not approach young animals, nests, dens, roosts, basking reptiles, alligators or large mammals for a photograph. Use designated trails, platforms, pullouts and viewing areas and obey closures, private-property boundaries and land-manager instructions.</p>
              <p>This guide does not teach wildlife handling, capture, trapping, relocation, rehabilitation, deterrence or dangerous-animal response. If an animal is close enough that you are changing its behavior or losing a safe retreat route, increase distance and follow the managing site's current guidance.</p>
            </div>
          </section>

          <div>
            {regions.map((area, index) => (
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
            <h2 id="planning" className="mt-2 font-display text-3xl">Build wildlife viewing into the larger Texas trip</h2>
            <nav aria-label="Texas wildlife watching related guides" className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
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
            <h2 id="sources" className="mt-2 font-display text-3xl">Use current TPWD trail and site guidance</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Viewing-site access, private-property participation, closures, wildlife activity and operating conditions can change. These first-party sources support this guide and should control current trip decisions. Source review: August 30, 2026.</p>
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
