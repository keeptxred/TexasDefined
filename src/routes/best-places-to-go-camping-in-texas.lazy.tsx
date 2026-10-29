import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { CampingDiscovery } from "@/components/camping/CampingDiscovery";
import { KingsCamoGearOffers } from "@/components/hunting/KingsCamoGearOffers";
import { riverAuthorityLinksForArticleMetadata } from "@/data/river-authority-relations";
import { Container } from "@/components/layout/Container";
import { CAMPING_OPERATIONAL_ALERTS } from "@/data/camping/official-alerts.generated";

const standoutCamping = [
  {
    slug: "garner-state-park",
    to: "/destination/garner-state-park",
    eyebrow: "River weekends",
    label: "Garner State Park",
    body: "A strong Hill Country choice when the Frio River, swimming and a mix of tent and RV sites are the center of the trip.",
  },
  {
    slug: "palo-duro-canyon-state-park",
    to: "/destination/palo-duro-canyon-state-park",
    eyebrow: "Canyon scenery",
    label: "Palo Duro Canyon State Park",
    body: "Camp inside the canyon with developed RV and tent options, primitive hike-in camping and immediate access to the park trail system.",
  },
  {
    slug: "mustang-island-state-park",
    to: "/destination/mustang-island-state-park",
    eyebrow: "Beach camping",
    label: "Mustang Island State Park",
    body: "Choose developed electric sites behind the dunes or weather-dependent primitive camping directly along the Gulf.",
  },
  {
    slug: "caddo-lake",
    to: "/destination/caddo-lake",
    eyebrow: "Paddling & fishing",
    label: "Caddo Lake State Park",
    body: "An East Texas base for Big Cypress Bayou and Caddo Lake paddling, fishing and developed campsites, including a small verified full-hookup inventory.",
  },
  {
    slug: "big-bend-national-park",
    to: "/destination/big-bend-national-park",
    eyebrow: "Remote & backcountry",
    label: "Big Bend National Park",
    body: "A destination for desert, mountains, Rio Grande canyon scenery and backcountry camping where permits, season and heat materially change the trip.",
  },
  {
    slug: "brazos-bend-state-park",
    to: "/destination/brazos-bend-state-park",
    eyebrow: "Near Houston",
    label: "Brazos Bend State Park",
    body: "A practical Houston-area camping escape beside the Brazos River watershed, with developed sites, primitive walk-in camping, wetlands, trails and wildlife.",
  },
] as const;

const riverCampingGuides = [...new Map(standoutCamping.flatMap((item) =>
  riverAuthorityLinksForArticleMetadata({slug: item.slug, title: item.label, dek: item.body, tags: []})
).map((link) => [link.href, link])).values()];

export const Route = createLazyFileRoute("/best-places-to-go-camping-in-texas")({ component: CampingGuidePage });

function CampingGuidePage() {
  const { entries } = Route.useLoaderData();
  return <main>
    <section className="border-b border-border bg-muted/30">
      <Container className="py-10 md:py-14">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.13em] text-muted-foreground"><Link to="/">Home</Link> · <Link to="/explore">Explore</Link> · Camping</nav>
        <p className="eyebrow mt-8 text-primary">Texas camping guide</p>
        <h1 className="mt-3 max-w-5xl font-display text-4xl leading-tight sm:text-5xl md:text-6xl">Best Places to Go Camping in Texas</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">Find the right Texas campsite for your trip, whether you want an RV hookup, a river weekend, a Gulf beach or a primitive backcountry escape. Compare source-checked public campgrounds and follow the official links to confirm site-level details.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#campground-finder" className="inline-flex items-center justify-center border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Search {entries.length} campgrounds ↓</a>
          <a href="#camping-trip-types" className="inline-flex items-center justify-center border border-border bg-background px-5 py-3 text-sm font-semibold">See six trip ideas</a>
        </div>
        <div className="mt-8 grid max-w-4xl gap-3 border-t border-border pt-5 text-sm sm:grid-cols-3">
          <p><strong className="block text-xl font-semibold text-foreground">{entries.length}</strong><span className="text-muted-foreground">researched campground profiles</span></p>
          <p><strong className="block text-xl font-semibold text-foreground">7</strong><span className="text-muted-foreground">Texas camping regions</span></p>
          <p><strong className="block text-xl font-semibold text-foreground">Official sources</strong><span className="text-muted-foreground">for campsite rules and booking</span></p>
        </div>
        <p className="mt-5 max-w-4xl text-xs leading-6 text-muted-foreground">Park conditions, campsite availability, prices and fire restrictions may change. Check the managing agency and the exact campsite before booking or traveling.</p>
      </Container>
    </section>

    <nav aria-label="Camping guide sections" className="border-b border-border bg-background">
      <Container className="flex gap-2 overflow-x-auto py-3 text-sm font-semibold">
        <a href="#camping-trip-types" className="shrink-0 border border-border px-3 py-2 hover:border-primary/50">Trip ideas</a>
        <a href="#campground-finder" className="shrink-0 border border-border px-3 py-2 hover:border-primary/50">Find campgrounds</a>
        <a href="#camping-alerts" className="shrink-0 border border-border px-3 py-2 hover:border-primary/50">Park advisories</a>
        <a href="#camping-seasons" className="shrink-0 border border-border px-3 py-2 hover:border-primary/50">Seasons</a>
        <a href="#camping-methodology" className="shrink-0 border border-border px-3 py-2 hover:border-primary/50">Verification</a>
        <a href="#camping-questions" className="shrink-0 border border-border px-3 py-2 hover:border-primary/50">FAQ</a>
        <a href="#camping-next-steps" className="shrink-0 border border-border px-3 py-2 hover:border-primary/50">Trip planning</a>
      </Container>
    </nav>

    <section id="camping-trip-types" className="scroll-mt-24 py-10 md:py-12">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Choose your kind of camping</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Best camping destinations by trip type</h2>
          <p className="mt-3 leading-7 text-muted-foreground">These six starting points suit different kinds of trips. They link to destination guides; use the campground finder below for specific verified camping facilities and booking sources.</p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {standoutCamping.map((item) => <Link key={item.slug} to={item.to} className="group flex h-full flex-col border border-border bg-background p-5 transition-colors hover:border-primary/50 hover:bg-muted/20">
            <p className="eyebrow text-primary">{item.eyebrow}</p>
            <h3 className="mt-2 font-display text-xl leading-snug">{item.label}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{item.body}</p>
            <span className="mt-4 text-sm font-semibold text-primary group-hover:underline">Explore destination →</span>
          </Link>)}
        </div>
      </Container>
    </section>

    <section id="campground-finder" className="scroll-mt-24 border-y border-border bg-muted/30 py-12 md:py-16">
      <Container>
        <div className="max-w-4xl">
          <p className="eyebrow text-primary">Campground finder</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Choose the camping trip you want</h2>
          <p className="mt-4 leading-8 text-muted-foreground">Search by park, campground, county, managing agency or nearby city. Combine region, camping style and verified facilities to narrow the list. An amenity that is not shown means TexasDefined has not verified it from an official source yet; it does not automatically mean the amenity is unavailable.</p>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Prefer a statewide overview? <a href="https://tpwd.texas.gov/state-parks/parks-map" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">Explore the official Texas state parks map ↗</a>. National parks and other public campgrounds are included in the finder below.</p>
        <CampingDiscovery entries={entries} />
      </Container>
    </section>

    <section id="camping-alerts" className="scroll-mt-24 border-y border-border bg-muted/30 py-10">
      <Container>
        <p className="eyebrow text-primary">Before you travel</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">Recent official park advisories</h2>
        <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">Confirmed notices are matched against official park alerts. If a source changes, its notice switches to a needs-review warning rather than retaining an unsupported claim. Published verification dates change only when notice status or content changes; scheduled checks run independently. Neither is a live availability guarantee. Open the primary source before traveling.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {CAMPING_OPERATIONAL_ALERTS.map((alert) => <article key={alert.destinationSlug} className="border border-border bg-background p-5">
            <h3 className="font-display text-xl">{alert.parkName}</h3>
            <p className="mt-2 text-sm leading-6">{alert.notice}</p>
            <p className="mt-2 text-xs text-muted-foreground">{alert.status === "confirmed" ? "Advisory verified" : "Advisory last checked"} {alert.checkedAt} · {alert.status === "confirmed" ? "Notice verified" : "Changed; recheck official source"}</p>
            <a href={alert.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">Official park alerts ↗</a>
          </article>)}
        </div>
      </Container>
    </section>

    <div data-stay-nearby-slot aria-label="Places to stay before or after a Texas camping trip" />

    <section id="camping-seasons" className="scroll-mt-24 py-12 md:py-16">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">When to camp</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Match the season to the part of Texas</h2>
          <p className="mt-4 leading-8 text-muted-foreground">Texas is too large for one statewide camping season. Use these as planning patterns, then check the destination forecast, park alerts and fire or flood restrictions before leaving home.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="border border-border bg-background p-6"><h3 className="font-display text-2xl">Spring</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">A strong statewide trip-planning season, but thunderstorms, flash flooding and changing river conditions can matter quickly. Recheck the exact park and route before travel.</p></div>
          <div className="border border-border bg-background p-6"><h3 className="font-display text-2xl">Summer</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Prioritize water access, shade and realistic heat plans. Desert and exposed-trail trips need especially careful timing; Gulf trips also require attention to tropical weather.</p></div>
          <div className="border border-border bg-background p-6"><h3 className="font-display text-2xl">Fall</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Often useful for Hill Country, forest and West Texas itineraries as temperatures moderate. Popular weekends can still book early, so compare availability before building the rest of the trip.</p></div>
          <div className="border border-border bg-background p-6"><h3 className="font-display text-2xl">Winter</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">South and West Texas can work well for cooler-weather trips, but fronts, freezes and large overnight temperature swings still require a current forecast and campsite-specific preparation.</p></div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <a href="https://www.weather.gov/" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">Check the National Weather Service forecast →</a>
          <Link to="/explore/road-trips" className="text-primary underline-offset-4 hover:underline">Plan the drive →</Link>
        </div>
      </Container>
    </section>

    <section id="camping-methodology" className="scroll-mt-24 border-y border-border bg-muted/30 py-12 md:py-16">
      <Container>
        <p className="eyebrow text-primary">How the guide is built</p>
        <h2 className="mt-2 font-display text-4xl">Useful first, verified underneath</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="border border-border bg-background p-6"><h3 className="font-display text-2xl">Official-source amenities</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Hookups, showers, site-length notes, accessibility and generator rules are shown only when an official park or reservation source supports them.</p></div>
          <div className="border border-border bg-background p-6"><h3 className="font-display text-2xl">Public camping first</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">The finder prioritizes TPWD, National Park Service, U.S. Army Corps of Engineers, U.S. Forest Service and other public land managers.</p></div>
          <div className="border border-border bg-background p-6"><h3 className="font-display text-2xl">Source dates stay visible</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Every profile carries a verification date and source links so readers can distinguish researched planning data from live availability.</p></div>
        </div>
      </Container>
    </section>

    <section id="camping-questions" className="scroll-mt-24 border-y border-border bg-muted/30 py-12 md:py-16">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Camping questions</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">What to know before choosing a Texas campground</h2>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="border border-border bg-background p-6"><h3 className="font-display text-2xl">Does “full hookup” apply to every site in a campground?</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">No. Hookups can vary by loop and individual site. The finder only uses the full-hookup filter when an official source verifies that inventory, and you should still confirm the exact site before paying.</p></div>
          <div className="border border-border bg-background p-6"><h3 className="font-display text-2xl">Why are campground prices not listed here?</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Rates, fees, minimum stays and availability can change faster than the editorial guide. Use the official reservation link on each profile for the current price and booking terms.</p></div>
          <div className="border border-border bg-background p-6"><h3 className="font-display text-2xl">Can I search for camping near a city?</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Yes. The campground finder indexes researched destination and metro search terms in addition to park, campground, county and managing-agency names.</p></div>
          <div className="border border-border bg-background p-6"><h3 className="font-display text-2xl">Is this the same as the RV park directory?</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">No. This is a curated public-camping decision guide. The RV Parks & Campgrounds directory is the broader inventory for comparing many more RV-oriented places, including private and public options.</p></div>
        </div>
      </Container>
    </section>

    {riverCampingGuides.length > 0 ? <nav aria-label="Related rivers for camping trips" className="border-y border-border py-6">
      <Container>
        <h2 className="font-display text-2xl">Camping near a Texas river?</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">River access rules and paddling routes are separate from campground reservations.</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          {riverCampingGuides.map((link) => <Link key={link.href} to={link.href} className="text-primary underline-offset-4 hover:underline">{link.label} →</Link>)}
        </div>
      </Container>
    </nav> : null}

    <section id="camping-next-steps" className="scroll-mt-24 py-12 md:py-16">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="eyebrow text-primary">Keep planning</p>
          <h2 className="mt-2 font-display text-4xl">Build the rest of the trip around the campsite</h2>
          <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">Camping is often only one piece of a Texas weekend. Connect the campground to fishing, lakes and rivers, road trips, county guides and the destination page so the route still makes sense after the campsite is booked.</p>
        </div>
        <div className="grid gap-3 text-sm font-semibold sm:grid-cols-2">
          <Link to="/fishing" className="border border-border bg-background p-4 hover:border-primary/50">Texas fishing →</Link>
          <Link to="/texas-fishing-license" className="border border-border bg-background p-4 hover:border-primary/50">Fishing license guide →</Link>
          <Link to="/explore/lakes-rivers" className="border border-border bg-background p-4 hover:border-primary/50">Lakes & rivers →</Link>
          <Link to="/explore/road-trips" className="border border-border bg-background p-4 hover:border-primary/50">Road trips →</Link>
          <Link to="/explore/outdoors" className="border border-border bg-background p-4 hover:border-primary/50">Outdoors & wildlife →</Link>
          <Link to="/explore/trip-planner" search={{}} className="border border-border bg-background p-4 hover:border-primary/50">Trip Planner →</Link>
        </div>
      </Container>
    </section>
    <KingsCamoGearOffers context="camping" pathname="/best-places-to-go-camping-in-texas" />
  </main>;
}
