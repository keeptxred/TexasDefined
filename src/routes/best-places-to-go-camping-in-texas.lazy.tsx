import { useState } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import caddoLake from "@/assets/caddo-lake.jpg";
import { CampingDiscovery } from "@/components/camping/CampingDiscovery";
import { Container } from "@/components/layout/Container";

const standoutCamping = [
  {
    slug: "garner-state-park",
    to: "/destination/garner-state-park",
    eyebrow: "River weekends",
    label: "Garner State Park",
    body: "A strong Hill Country choice when the Frio River, swimming and a mix of tent and RV sites are the center of the trip.",
    image: { src: "/images/state-parks/garner-state-park.jpg", alt: "Garner State Park in Texas", width: 1600, height: 230, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
  },
  {
    slug: "palo-duro-canyon-state-park",
    to: "/destination/palo-duro-canyon-state-park",
    eyebrow: "Canyon scenery",
    label: "Palo Duro Canyon State Park",
    body: "Camp inside the canyon with developed RV and tent options, primitive hike-in camping and immediate access to the park trail system.",
    image: { src: "/images/state-parks/palo-duro-canyon-state-park.jpg", alt: "Palo Duro Canyon State Park in Texas", width: 1600, height: 900, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
  },
  {
    slug: "mustang-island-state-park",
    to: "/destination/mustang-island-state-park",
    eyebrow: "Beach camping",
    label: "Mustang Island State Park",
    body: "Choose developed electric sites behind the dunes or weather-dependent primitive camping directly along the Gulf.",
    image: { src: "/images/state-parks/mustang-island-state-park.jpg", alt: "Mustang Island State Park in Texas", width: 1600, height: 1067, credit: "William L. Farr · CC BY 4.0 · Wikimedia Commons" },
  },
  {
    slug: "caddo-lake",
    to: "/destination/caddo-lake",
    eyebrow: "Paddling & fishing",
    label: "Caddo Lake State Park",
    body: "An East Texas base for cypress-lined water, fishing and developed campsites, including a small verified full-hookup inventory.",
    image: { src: caddoLake, alt: "Bald cypress trees draped in Spanish moss on Caddo Lake at dawn", width: 1600, height: 1067 },
  },
  {
    slug: "big-bend-national-park",
    to: "/destination/big-bend-national-park",
    eyebrow: "Remote & backcountry",
    label: "Big Bend National Park",
    body: "A destination for desert, mountain and backcountry camping where campground choice, permits and seasonal heat materially change the trip.",
    image: { src: "/images/explore/national-parks/big-bend-national-park.jpg", alt: "Big Bend National Park in Texas", width: 1600, height: 2133, credit: "Betty Alex · U.S. National Park Service · Public domain · Wikimedia Commons" },
  },
  {
    slug: "brazos-bend-state-park",
    to: "/destination/brazos-bend-state-park",
    eyebrow: "Near Houston",
    label: "Brazos Bend State Park",
    body: "A practical Houston-area camping escape with developed sites, primitive walk-in camping, wetlands, trails and wildlife.",
    image: { src: "/images/state-parks/brazos-bend-state-park.jpg", alt: "Brazos Bend State Park in Texas", width: 1600, height: 1280, credit: "Mike Fisher · CC BY 2.0 · Wikimedia Commons" },
  },
] as const;

export const Route = createLazyFileRoute("/best-places-to-go-camping-in-texas")({ component: CampingGuidePage });

function CampingGuidePage() {
  const { entries } = Route.useLoaderData();
  const hero = standoutCamping[1].image;
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());
  const markImageFailed = (src: string) => setFailedImages((current) => {
    const next = new Set(current);
    next.add(src);
    return next;
  });

  return <main>
    <section className="border-b border-border bg-muted/30">
      <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-20">
        <div>
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.13em] text-muted-foreground"><Link to="/">Home</Link> · <Link to="/explore">Explore</Link> · Camping</nav>
          <p className="eyebrow mt-8 text-primary">Texas camping guide</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl leading-none md:text-7xl">Best Places to Go Camping in Texas</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Start with standout Texas camping destinations, then search verified public campgrounds by region, camping style and the facilities that matter to your trip. Use the destination guides for the bigger picture and the official reservation links for live booking details.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#campground-finder" className="inline-flex border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Find a campground</a>
            <Link to="/explore/rv-parks" className="inline-flex border border-border bg-background px-5 py-3 text-sm font-semibold">Browse the RV park directory</Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">Availability, prices, closures, burn restrictions and beach conditions can change quickly. Confirm the final details with the managing agency immediately before booking or travel.</p>
        </div>
        <figure className="overflow-hidden border border-border bg-background">
          {!failedImages.has(hero.src) ? <img
            src={hero.src}
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            className="aspect-[4/3] w-full object-cover"
            fetchPriority="high"
            onError={() => markImageFailed(hero.src)}
          /> : <div className="aspect-[4/3] bg-muted" aria-hidden />}
          <figcaption className="px-4 py-3 text-xs leading-5 text-muted-foreground">
            {!failedImages.has(hero.src) ? <>Palo Duro Canyon State Park · Panhandle camping · {hero.credit}</> : <>Palo Duro Canyon State Park · Panhandle camping</>}
          </figcaption>
        </figure>
      </Container>
    </section>

    <section className="py-12 md:py-16">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Start here</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Choose the kind of Texas camping trip you want</h2>
          <p className="mt-4 leading-8 text-muted-foreground">Texas camping changes dramatically from Gulf beaches to Hill Country rivers, East Texas forests and West Texas desert. These are useful starting points, not a one-size-fits-all ranking.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {standoutCamping.map((item) => <Link key={item.slug} to={item.to} className="group overflow-hidden border border-border bg-background transition-colors hover:border-primary/50">
            {item.image.src === caddoLake ? <img src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} loading="lazy" className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" /> : !failedImages.has(item.image.src) ? <img src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} loading="lazy" className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" onError={() => markImageFailed(item.image.src)} /> : <div className="aspect-[16/9] bg-muted" aria-hidden />}
            <div className="p-6">
              <p className="eyebrow text-primary">{item.eyebrow}</p>
              <h3 className="mt-2 font-display text-2xl">{item.label}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-primary">Open destination guide →</span>
            </div>
          </Link>)}
        </div>
      </Container>
    </section>

    <section id="campground-finder" className="scroll-mt-24 border-y border-border bg-muted/30 py-12 md:py-16">
      <Container>
        <div className="max-w-4xl">
          <p className="eyebrow text-primary">Campground finder</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Search verified public camping across Texas</h2>
          <p className="mt-4 leading-8 text-muted-foreground">Search by park, campground, county or managing agency. Combine region, camping style and verified facilities to narrow the list. An amenity that is not shown means TexasDefined has not verified it from an official source yet; it does not automatically mean the amenity is unavailable.</p>
        </div>
        <CampingDiscovery entries={entries} />
      </Container>
    </section>

    <div data-stay-nearby-slot aria-label="Places to stay before or after a Texas camping trip" />

    <section className="py-12 md:py-16">
      <Container className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="eyebrow text-primary">Camping guide vs. RV directory</p>
          <h2 className="mt-2 font-display text-4xl">Two tools, two different jobs</h2>
          <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">This page is the decision guide: standout destinations plus a curated, source-checked public-camping finder. The separate RV Parks & Campgrounds directory is the broader statewide inventory for travelers who want to compare many more RV-specific places, including private and public options.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <Link to="/explore/rv-parks" className="text-primary underline-offset-4 hover:underline">Open the RV park directory →</Link>
            <Link to="/explore/state-parks" className="text-primary underline-offset-4 hover:underline">Browse Texas state parks →</Link>
            <Link to="/explore/trip-planner" search={{}} className="text-primary underline-offset-4 hover:underline">Build a Texas trip →</Link>
          </div>
        </div>
        <aside className="border border-border bg-background p-6">
          <p className="eyebrow text-primary">Before you reserve</p>
          <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
            <p><strong className="text-foreground">Check the exact site.</strong> Electrical service, shade, pad length and waterfront access can vary inside the same campground.</p>
            <p><strong className="text-foreground">Check the calendar.</strong> Popular Texas parks can fill well ahead of weekends and holidays, and primitive areas can close because of weather or fire conditions.</p>
            <p><strong className="text-foreground">Check the rig limits.</strong> Some national-park and older state-park loops have meaningful RV-length or road restrictions.</p>
          </div>
        </aside>
      </Container>
    </section>

    <section className="border-y border-border bg-muted/30 py-12 md:py-16">
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

    <section className="py-12 md:py-16">
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
  </main>;
}
