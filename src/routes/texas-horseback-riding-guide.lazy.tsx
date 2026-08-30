import { createLazyFileRoute, Link } from "@tanstack/react-router";

import bigBend from "@/assets/big-bend.jpg";
import { Container } from "@/components/layout/Container";

const officialSources = [
  { label: "Texas Parks & Wildlife — Horseback Riding in State Parks", href: "https://tpwd.texas.gov/state-parks/parks/things-to-do/equestrian", note: "Statewide equestrian access, facilities and documentation guidance, including the current negative-Coggins requirement." },
  { label: "Texas Parks & Wildlife — Big Bend Ranch Horseback Riding", href: "https://tpwd.texas.gov/state-parks/big-bend-ranch/horseback-riding", note: "Official backcountry permit, feed, water, campsite and equestrian-access guidance for Big Bend Ranch." },
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
      "Big Bend Ranch is the expedition end of Texas public-land horseback riding. TPWD allows horses in most areas of the park and maintains equestrian campsites, but both day and overnight backcountry use require a permit. The park also requires current Coggins documentation and weed-free feed.",
      "Water and access deserve advance planning rather than assumptions. TPWD tells riders to call ahead about water availability and notes that some equestrian sites are reached by rugged roads where trailer suitability matters. Heat can also become the controlling condition in this Chihuahuan Desert landscape, so current park alerts and weather should decide whether the planned ride still makes sense.",
    ],
  },
  {
    name: "Hill Country State Natural Area",
    region: "Hill Country · Bandera",
    summary: "A former ranch with about 40 miles of shared trails, equestrian day-use facilities and overnight options in a protected natural area.",
    details: [
      "Hill Country State Natural Area is one of the clearest places to understand Texas equestrian recreation as shared public-land use. Hikers, mountain bikers and horseback riders use the same rugged network through creek bottoms, grasslands and rocky hills.",
      "TPWD provides a day-use equestrian area near headquarters with a water trough and hitching posts, plus equestrian camping options. Current Coggins documentation is required. Because this is a State Natural Area rather than a purpose-built horse park, posted closures, conservation rules and shared-trail etiquette are part of the trip plan.",
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
            <img src={bigBend} alt="Rugged West Texas public-land landscape associated with horseback riding trips" className="aspect-[16/9] w-full object-cover" loading="eager" fetchPriority="high" />
            <figcaption className="mt-3 max-w-3xl text-xs leading-5 text-muted-foreground">Texas public-land riding ranges from remote Chihuahuan Desert backcountry to shared Hill Country trails and compact primitive areas; current land-manager rules should control every trip plan.</figcaption>
          </figure>

          <section className="border-b border-border py-9" aria-labelledby="quick-answer">
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="quick-answer" className="mt-2 font-display text-3xl">Start with the paperwork, then choose the landscape</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">Texas Parks &amp; Wildlife requires proof of a negative Equine Infectious Anemia test within the previous 12 months for each horse entering a state park or natural area. After that statewide requirement, local rules diverge: Big Bend Ranch requires backcountry permits; Hill Country State Natural Area is heavily shared-use; Palo Duro has dedicated riding acreage; Caprock combines canyon trails with a long trailway; and Dinosaur Valley uses a small primitive riding area. Verify the current park page before every trip.</p>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="safety-boundary">
            <p className="eyebrow text-primary">Safety boundary</p>
            <h2 id="safety-boundary" className="mt-2 font-display text-3xl">This is trip planning, not horsemanship instruction</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Horseback riding can result in serious injury. This guide does not teach riding technique, horse handling, trailer loading, veterinary care, hoof care, tack selection, obstacle negotiation or emergency animal treatment. Riders and horses should be appropriately prepared for the terrain and conditions, with competent instruction or professional support where needed.</p>
              <p>Heat, storms, flooding, wildfire, trail damage, water availability and closures can change a safe plan. Remote places such as Big Bend Ranch add long distances and limited services. Check current land-manager alerts and weather, and change the plan when conditions no longer fit the horse, rider or trailer access.</p>
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
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Documentation requirements, permits, trail closures, water, facilities and operating conditions can change. These first-party sources support this guide and should control current trip decisions. Source review: August 30, 2026.</p>
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
