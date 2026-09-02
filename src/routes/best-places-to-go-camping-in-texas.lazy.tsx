import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { CampingDiscovery } from "@/components/camping/CampingDiscovery";
import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/best-places-to-go-camping-in-texas")({ component: CampingDatabasePage });

function CampingDatabasePage() {
  const { entries } = Route.useLoaderData();
  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20">
      <Container>
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.13em] text-muted-foreground"><Link to="/">Home</Link> · <Link to="/explore">Explore</Link> · Camping</nav>
        <p className="eyebrow mt-8 text-primary">Texas public camping database</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-none md:text-7xl">Texas Camping & RV Campground Guide</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Use verified campsite details to compare public camping across Texas. Filter by RV, tent, primitive and beach camping, look specifically for verified full-hookup sites, or narrow to water-focused destinations. Every amenity shown below is tied to an official source; an unlisted amenity means we have not verified it yet.</p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link to="/explore/trip-planner" search={{}} className="text-primary underline-offset-4 hover:underline">Build a camping trip</Link>
          <Link to="/explore/state-parks" className="text-primary underline-offset-4 hover:underline">Texas state parks</Link>
          <Link to="/explore/lakes-rivers" className="text-primary underline-offset-4 hover:underline">Lakes & rivers</Link>
          <Link to="/fishing" className="text-primary underline-offset-4 hover:underline">Fishing</Link>
          <Link to="/explore/road-trips" className="text-primary underline-offset-4 hover:underline">Road trips</Link>
          <Link to="/explore/wildlife" className="text-primary underline-offset-4 hover:underline">Wildlife</Link>
        </div>
      </Container>
    </section>

    <section className="py-12 md:py-16">
      <Container>
        <div className="grid gap-6 border-b border-border pb-10 md:grid-cols-3">
          <div><p className="eyebrow text-primary">Data rule</p><h2 className="mt-2 font-display text-3xl">No invented amenities</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Hookups, showers, site-length notes, accessibility and generator rules appear only when an official camping source supports them.</p></div>
          <div><p className="eyebrow text-primary">Public-first inventory</p><h2 className="mt-2 font-display text-3xl">State and national lands first</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">This wave prioritizes TPWD and National Park Service camping rather than scraping private campground directories.</p></div>
          <div><p className="eyebrow text-primary">Freshness</p><h2 className="mt-2 font-display text-3xl">Source-checked records</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Each profile carries a verification date and direct source links. Live availability, closures, prices and rules must still be confirmed with the managing agency.</p></div>
        </div>
        <CampingDiscovery entries={entries} />
      </Container>
    </section>

    <section className="border-y border-border bg-muted/30 py-12 md:py-16">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
        <div><p className="eyebrow text-primary">High-intent planning</p><h2 className="mt-2 font-display text-4xl">Use one database instead of thin doorway pages</h2><p className="mt-5 max-w-3xl leading-8 text-muted-foreground">Queries such as RV camping near Austin, campgrounds near Houston, Texas beach camping, full-hookup public campgrounds, primitive camping and lake or river camping are handled through the same verified inventory and filters. TexasDefined does not need a separate low-value page for every keyword permutation.</p></div>
        <aside className="border border-border bg-background p-6"><p className="eyebrow text-primary">Plan beyond the campsite</p><div className="mt-4 grid gap-3 text-sm font-semibold"><Link to="/explore/trip-planner" search={{}}>Trip Planner →</Link><Link to="/fishing">Texas fishing →</Link><Link to="/texas-fishing-license">Fishing license guide →</Link><Link to="/explore/lakes-rivers">Lakes & rivers →</Link><Link to="/explore/road-trips">Road trips →</Link><Link to="/explore/outdoors">Outdoors & wildlife →</Link></div></aside>
      </Container>
    </section>

    <section className="py-12"><Container><p className="max-w-4xl text-sm leading-7 text-muted-foreground"><strong>Important:</strong> Campsite availability, fees, closures, burn restrictions, beach access and other operating rules can change quickly. Use the official source and reservation links on each record immediately before booking or travel.</p></Container></section>
  </main>;
}
