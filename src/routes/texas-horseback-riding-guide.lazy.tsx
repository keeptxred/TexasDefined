import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { editorialImageSrc } from "@/lib/editorial-image-delivery";

const equestrianPlanning = [
  {
    "name": "Big Bend Ranch State Park",
    "type": "Bring your own horse or arrange guided riding with TPWD-listed outfitter",
    "facilities": "Day or overnight backcountry permit; equestrian campsites; current negative Coggins and weed-free feed",
    "check": "Call ahead for stock water and trailer-road suitability. Do not interpret the 238-mile shared network as a short, serviced trail.",
    "official": "https://tpwd.texas.gov/state-parks/big-bend-ranch/horseback-riding",
    "related": "/destination/big-bend-ranch-state-park"
  },
  {
    "name": "Hill Country State Natural Area",
    "type": "Bring your own horse or ask TPWD-listed guide services about assisted riding",
    "facilities": "Equestrian trailhead with trough and hitching; reservable equestrian and group camping",
    "check": "Choose a route suitable for your horse, confirm campsite inventory and yielding etiquette before hauling.",
    "official": "https://tpwd.texas.gov/state-parks/hill-country/",
    "related": "/explore/region/hill-country"
  },
  {
    "name": "Palo Duro Canyon State Park",
    "type": "Bring your own horse; canyon day ride",
    "facilities": "About 1,500 acres reserved for equestrian use plus shared trails; trailer parking at equestrian campground",
    "check": "Bring original Coggins paperwork and confirm current horse-trail closures after rainfall or extreme heat.",
    "official": "https://tpwd.texas.gov/state-parks/palo-duro-canyon",
    "related": "/destination/palo-duro-canyon-state-park"
  },
  {
    "name": "Caprock Canyons State Park & Trailway",
    "type": "Bring your own horse; Panhandle canyons and trailway",
    "facilities": "Wild Horse equestrian camping area; shared-use trails and distinct trailway access",
    "check": "Review the facility map and equestrian campsite availability; do not assume all trailway segments have the same amenities.",
    "official": "https://tpwd.texas.gov/state-parks/caprock-canyons/fees-facilities/horse-sites",
    "related": "/destination/caprock-canyons-state-park"
  },
  {
    "name": "Dinosaur Valley State Park",
    "type": "Bring your own horse or enquire about separate guided rides",
    "facilities": "100-acre South Primitive Area for privately brought horses; TPWD lists a separate commercial guided-ride provider",
    "check": "Confirm river conditions and horse-trailer access; book a guided ride with its operator rather than assuming park admission includes one.",
    "official": "https://tpwd.texas.gov/state-parks/dinosaur-valley",
    "related": "/destination/dinosaur-valley-state-park"
  }
] as const;

const officialSources = [
  { label: "Texas Parks & Wildlife — Horseback Riding in State Parks", href: "https://tpwd.texas.gov/state-parks/parks/things-to-do/equestrian", note: "Statewide equestrian access, facilities and documentation guidance, including the current negative-Coggins requirement." },
  { label: "Texas Parks & Wildlife — Big Bend Ranch Horseback Riding", href: "https://tpwd.texas.gov/state-parks/big-bend-ranch/horseback-riding", note: "Official backcountry permit, feed, water, campsite and equestrian-access guidance for Big Bend Ranch." },
  { label: "TPWD — Big Bend Ranch Official Outfitters", href: "https://tpwd.texas.gov/state-parks/big-bend-ranch/outfitters", note: "TPWD-listed riding providers; confirm rental horses and booking terms with outfitter." },
  { label: "TPWD — Hill Country Guide Service Providers", href: "https://tpwd.texas.gov/state-parks/hill-country/guide-service", note: "Official Bandera guide-service directory; availability and supplied horses vary." },
  { label: "Texas Parks & Wildlife — Hill Country State Natural Area", href: "https://tpwd.texas.gov/state-parks/hill-country", note: "Official multiuse trail, equestrian day-use, campsite, arena and current-access information." },
  { label: "Texas Parks & Wildlife — Palo Duro Canyon State Park", href: "https://tpwd.texas.gov/state-parks/palo-duro-canyon", note: "Official horseback-riding acreage, shared-trail, trailer parking, Coggins and trail-status guidance." },
  { label: "Texas Parks & Wildlife — Caprock Canyons State Park & Trailway", href: "https://tpwd.texas.gov/state-parks/caprock-canyons", note: "Official park and trailway access information for the Panhandle riding landscape." },
  { label: "Texas Parks & Wildlife — Dinosaur Valley State Park", href: "https://tpwd.texas.gov/state-parks/dinosaur-valley", note: "Official South Primitive Area, horse-trailer parking, water and guided-ride information." },
] as const;

const ridingAreas = [
  {
    name: "Big Bend Ranch State Park",
    region: "Far West Texas · Presidio / Lajitas country",
    summary: "Texas's largest and most remote state park, with roughly 238 miles of multiuse trails and a permit-driven backcountry riding system.",
    details: [
      "Big Bend Ranch is the expedition end of Texas public-land horseback riding. TPWD allows horses in most areas of the park and maintains equestrian campsites, but both day and overnight backcountry use require a permit. The park also requires current Coggins documentation and weed-free feed. TPWD separately identifies Lajitas Stables for guided tours and rental horses; confirm availability and permitted routes with the outfitter rather than confusing it with a bring-your-own-horse backcountry permit.",
      "Water and access deserve advance planning rather than assumptions. TPWD tells riders to call ahead about water availability and notes that some equestrian sites are reached by rugged roads where trailer suitability matters. Heat can also become the controlling condition in this Chihuahuan Desert landscape, so current park alerts and weather should decide whether the planned ride still makes sense.",
    ],
  },
  {
    name: "Hill Country State Natural Area",
    region: "Hill Country · Bandera",
    summary: "A former ranch with about 40 miles of shared trails, equestrian day-use facilities and overnight options in a protected natural area.",
    details: [
      "Hill Country State Natural Area is one of the clearest places to understand Texas equestrian recreation as shared public-land use. Hikers, mountain bikers and horseback riders use the same rugged network through creek bottoms, grasslands and rocky hills.",
      "TPWD provides a day-use equestrian area near headquarters with a water trough and hitching posts, plus equestrian camping options. Current Coggins documentation is required. TPWD also publishes a separate guide-service directory for visitors arranging a supervised outing; ask any provider whether horses are supplied, where the ride operates and what must be reserved. Because this is a State Natural Area rather than a purpose-built horse park, posted closures, conservation rules and shared-trail etiquette are part of the trip plan.",
    ],
  },
  {
    name: "Palo Duro Canyon State Park",
    region: "Panhandle · Canyon / Amarillo",
    summary: "Canyon riding with dedicated equestrian acreage plus shared trails and a campground that supports horse-trailer access.",
    details: [
      "Palo Duro sets aside about 1,500 acres for horseback riding and also allows riders on two trails shared with hikers and mountain bikers. TPWD directs riders bringing their own horses to the equestrian campground for trailer parking and requires original Coggins papers.",
      "Trail status matters here because wet weather or poor conditions can close trails. Canyon heat can also differ sharply from expectations formed on the rim. Check the park's current trail status and alerts before hauling horses to the canyon rather than relying on a saved itinerary.",
    ],
  },
  {
    name: "Caprock Canyons State Park & Trailway",
    region: "Panhandle · Quitaque / South Plains",
    summary: "A park-and-trailway combination that pairs rugged canyon riding with a long converted rail corridor open to horses, hikers and mountain bikers.",
    details: [
      "Caprock Canyons broadens the trip beyond a single park loop. TPWD's statewide equestrian guidance describes about 20 miles of riding trails in the park's nearly 14,000-acre riding area, while the separate Caprock Canyons Trailway extends roughly 64 miles as a multiuse rail-trail corridor.",
      "The two experiences are not interchangeable: canyon trails can be rugged, with steep terrain and drop-offs, while the trailway is comparatively level. Use current TPWD maps and access information to decide which setting fits the trip, and remember that both systems are shared landscapes rather than horse-only routes.",
    ],
  },
  {
    name: "Dinosaur Valley State Park",
    region: "North-Central Texas · Glen Rose",
    summary: "A compact 100-acre primitive riding area that offers a very different public-land horseback trip from the large western systems.",
    details: [
      "Dinosaur Valley allows riders who bring their own horses into the 100-acre South Primitive Area. TPWD describes the terrain as wooded and semi-rocky, with the Paluxy River crossing the area, and provides horse-trailer parking.",
      "This is a useful planning example because facilities are limited: potable water is not available in the primitive riding area, and visitors should bring a bucket if horses will drink river water. TPWD also lists guided equestrian services through a local provider, so visitors without their own horses have a different planning path than at most state parks.",
    ],
  },
] as const;

const planningPaths = [
  { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Put equestrian travel inside the larger public-land, weather, habitat and seasonal planning picture." },
  { to: "/explore/state-parks", label: "Texas state parks", description: "Find more managed public lands and verify park-specific equestrian access and facilities." },
  { to: "/texas-mountain-biking-guide", label: "Mountain biking", description: "Compare another shared-trail activity across Texas public lands and regions." },
  { to: "/texas-natural-wonders-bucket-list", label: "Texas natural wonders", description: "Connect canyon, desert and Hill Country rides to the landscapes that define Texas." },
  { to: "/best-places-to-go-camping-in-texas", label: "Texas camping", description: "Plan an overnight base while checking which parks provide equestrian-specific campsites or facilities." },
  { to: "/texas-stargazing-guide", label: "Stargazing after the ride", description: "Check night-sky access at Big Bend Ranch and Caprock Canyons before extending a horse trip overnight." },
  { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Sequence trail access, lodging, trailer logistics and nearby stops around realistic drive times." },
] as const;

export const Route = createLazyFileRoute("/texas-horseback-riding-guide")({ component: TexasHorsebackRidingGuidePage });

function TexasHorsebackRidingGuidePage() {
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
            <p className="eyebrow text-primary">Public trails · permits · horse facilities</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Horseback Riding Guide</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A visitor-first guide to five public riding destinations, with the documentation, permits, trail-sharing, water, camping and current-access questions to resolve before hauling a horse across Texas.</p>
          </header>

          <figure className="border-b border-border py-8">
            <img src={editorialImageSrc("https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/20231023-FS_PJK_0003_%2853298857455%29.jpg/1280px-20231023-FS_PJK_0003_%2853298857455%29.jpg")} alt="Riders on a Sam Houston National Forest trail, Texas" width={1280} height={720} className="aspect-[16/9] w-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
            <figcaption className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
              Riders on a multiuse trail in Sam Houston National Forest, Texas. This federal forest illustrates the activity; the five trip-planning destinations below are separate Texas state parks and natural areas. Photo: <a href="https://commons.wikimedia.org/wiki/File:20231023-FS_PJK_0003_(53298857455).jpg" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">USDA Forest Service / Preston Keres</a> (2023) · <a href="https://creativecommons.org/publicdomain/mark/1.0/" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">U.S. public domain</a> · Wikimedia Commons. The delivered image is rendered without alteration.
            </figcaption>
          </figure>


          <section className="border-b border-border py-10" aria-labelledby="horse-comparison">
            <p className="eyebrow text-primary">Choose the right riding option</p>
            <h2 id="horse-comparison" className="mt-2 font-display text-3xl">Compare trailer logistics, facilities and guided-ride options</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">These five destinations are not interchangeable. Most public horseback trails are for visitors bringing a horse, not walk-up rental rides. A park's equestrian campsite, water trough or designated acreage does not prove a specific route is open today.</p>
            <p className="mt-3 text-sm text-muted-foreground md:hidden">Scroll sideways to compare rider type and facilities.</p>
            <div className="mt-6 overflow-x-auto border border-border" role="region" tabIndex={0} aria-label="Five Texas horseback riding destinations comparison table">
              <table className="w-full border-collapse text-left text-sm" style={{ minWidth: "780px" }}>
                <thead className="bg-muted/50"><tr><th scope="col" className="border-b border-border p-4">Destination</th><th scope="col" className="border-b border-border p-4">Rider type</th><th scope="col" className="border-b border-border p-4">Facilities / permissions</th></tr></thead>
                <tbody>{equestrianPlanning.map((park) => <tr key={park.name} className="align-top"><th scope="row" className="border-b border-border p-4 font-semibold">{park.name}</th><td className="border-b border-border p-4 text-muted-foreground">{park.type}</td><td className="border-b border-border p-4 text-muted-foreground">{park.facilities}</td></tr>)}</tbody>
              </table>
            </div>
          </section>
          <section className="border-b border-border py-10" aria-labelledby="horse-guide-or-byo">
            <p className="eyebrow text-primary">Guided ride or your own horse?</p>
            <h2 id="horse-guide-or-byo" className="mt-2 font-display text-3xl">Three different ways to book a Texas horse trip</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div className="border border-border p-5"><h3 className="font-display text-xl">Big Bend Ranch</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">TPWD lists Lajitas Stables for guided trips and rental horses. Contact the operator about the route, provided horses, ages, fees and dates; independently bringing a horse to the backcountry requires a separate park permit.</p><a href="https://tpwd.texas.gov/state-parks/big-bend-ranch/horseback-riding" className="mt-3 inline-block text-sm font-semibold text-primary underline" target="_blank" rel="noopener noreferrer">TPWD outfitter and access guidance</a></div>
              <div className="border border-border p-5"><h3 className="font-display text-xl">Hill Country State Natural Area</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">TPWD lists Bandera Historical Rides, Hill Country Equestrian Lodge and Outlaw Outfitters as guide services. Verify which tours or rental horses are currently offered, and whether a specific itinerary uses public natural-area trails.</p><a href="https://tpwd.texas.gov/state-parks/hill-country/guide-service" className="mt-3 inline-block text-sm font-semibold text-primary underline" target="_blank" rel="noopener noreferrer">Official guide-service directory</a></div>
              <div className="border border-border p-5"><h3 className="font-display text-xl">Dinosaur Valley</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Bring your own horse to the 100-acre South Primitive Area, or arrange a separate service from TPWD-listed Eagle Eye Ranch Carriage Company. Neither trail access nor a rental ride is automatically included with park admission.</p><a href="https://tpwd.texas.gov/state-parks/parks/things-to-do/equestrian" className="mt-3 inline-block text-sm font-semibold text-primary underline" target="_blank" rel="noopener noreferrer">TPWD horse and outfitter list</a></div>
            </div>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">The featured Palo Duro and Caprock Canyons public trails are not evidence of walk-up rental availability. Contact the relevant park or licensed operator before traveling without a horse.</p>
          </section>
          <section className="border-b border-border py-9" aria-labelledby="quick-answer">
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="quick-answer" className="mt-2 font-display text-3xl">Start with the paperwork, then choose the landscape</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">Texas Parks &amp; Wildlife requires proof of a negative Equine Infectious Anemia test within the previous 12 months for each horse entering a state park or natural area. After that statewide requirement, local rules diverge: Big Bend Ranch requires backcountry permits; Hill Country State Natural Area is heavily shared-use; Palo Duro has dedicated riding acreage; Caprock combines canyon trails with a long trailway; and Dinosaur Valley uses a small primitive riding area. Verify the current park page before every trip.</p>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="trip-conditions">
            <p className="eyebrow text-primary">Before you haul</p>
            <h2 id="trip-conditions" className="mt-2 font-display text-3xl">Conditions that should change the plan</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Heat, storms, flooding, wildfire, trail damage, water availability and closures can change the right riding destination quickly. Remote places such as Big Bend Ranch add long distances and limited services, so current park alerts and weather should be checked before departure rather than after the trailer is already on the road.</p>
              <p>Confirm trailer access, stock water, route length, shared-use rules and overnight facilities before hauling out. If current conditions no longer match the horse, rider, vehicle or planned route, choose a different trail or day instead of forcing the itinerary.</p>
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="shared-use">
            <p className="eyebrow text-primary">Shared public land</p>
            <h2 id="shared-use" className="mt-2 font-display text-3xl">Many Texas horse trails are also hiking and biking trails</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Several featured systems are multiuse. Current park maps and posted rules determine where horses are allowed and how different users share the corridor. Do not assume that a trail open to horses in one park has the same access pattern in another.</p>
              <p>Facilities vary just as much. Some parks provide corrals, pens, troughs or equestrian campsites; others offer little beyond trailer parking. Confirm water, overnight facilities, feed restrictions and trailer-road suitability before departure instead of treating them as standard state-park amenities.</p>
            </div>
          </section>

          <div>
            {ridingAreas.map((area, index) => (
              <section key={area.name} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
                <div>
                  <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · {area.region}</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight">{area.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{area.summary}</p>
                </div>
                <div className="max-w-3xl space-y-5">
                  {area.details.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
                  <aside className="border-l-2 border-primary bg-muted/20 px-5 py-4 text-sm leading-7">
                    <h3 className="font-display text-xl">Trailer and rider checklist</h3>
                    <p className="mt-2"><strong>What is offered:</strong> {equestrianPlanning[index].facilities}</p>
                    <p className="mt-2"><strong>Confirm before departure:</strong> {equestrianPlanning[index].check}</p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      <a href={equestrianPlanning[index].official} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">Official horse facilities and access ↗</a>
                      <Link to={equestrianPlanning[index].related} className="font-semibold text-primary underline underline-offset-4">Related TexasDefined planning</Link>
                    </div>
                  </aside>
                </div>
              </section>
            ))}
          </div>

          <section className="border-b border-border py-10" aria-labelledby="planning">
            <p className="eyebrow text-primary">Keep planning</p>
            <h2 id="planning" className="mt-2 font-display text-3xl">Build the riding day into a Texas trip</h2>
            <nav aria-label="Texas horseback riding related guides" className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
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
            <h2 id="sources" className="mt-2 font-display text-3xl">Verify documentation and access with TPWD</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Documentation requirements, permits, trail closures, water, facilities and operating conditions can change. These first-party sources support this guide and should control current trip decisions. Official TPWD riding and campsite information checked November 18, 2026; call the park for current route, water and facility status.</p>
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
