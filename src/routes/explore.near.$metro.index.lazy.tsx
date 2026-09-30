import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/explore/near/$metro/")({
  component: MetroProximityHubPage,
});

function MetroProximityHubPage() {
  const pageData = Route.useLoaderData();
  const { metro, collections, highlights } = pageData;

  return <main>
    <div className="mx-auto w-full max-w-7xl px-5 pt-10 sm:px-8 sm:pt-14">
      <nav aria-label="Breadcrumb" className="eyebrow text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
          <li aria-hidden>·</li>
          <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li>
          <li aria-hidden>·</li>
          <li aria-current="page" className="text-foreground">Near {metro.name}</li>
        </ol>
      </nav>
    </div>

    <section className="mt-5 border-y border-border bg-surface">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="eyebrow text-primary">{metro.regionLabel} drive market</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{pageData.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{metro.context}</p>
        <p className="mt-7 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">TexasDefined ranks these nearby guides with destination coordinates and source-backed place records. Mileages are straight-line geographic estimates for comparison, not promised driving distances or travel times.</p>
      </div>
    </section>

    <section className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
      <p className="eyebrow text-primary">Explore by trip type</p>
      <h2 className="mt-3 font-display text-4xl">Choose the kind of escape you want</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {collections.map(({ collection, results }) => <article key={collection.slug} className="border-t border-border pt-5">
          <p className="eyebrow text-muted-foreground">{results.length} nearby options</p>
          <h3 className="mt-2 font-display text-2xl"><Link to="/explore/near/$metro/$collection" params={{ metro: metro.slug, collection: collection.slug }} className="hover:text-primary">{collection.label}</Link></h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{collection.summary}</p>
        </article>)}
      </div>
    </section>

    {highlights.length > 0 && <section className="border-t border-border bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Start with these</p>
          <h2 className="mt-3 font-display text-4xl">Nearby places worth opening first</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">These are not paid rankings. They are a cross-section of the closest source-backed destinations across the nearby collections above.</p>
        </div>
        <div className="mt-9 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.slice(0, 9).map((row, index) => <div key={row.destination.slug}>
            <p className="eyebrow mb-3 text-muted-foreground">About {Math.round(row.distanceMiles)} miles away</p>
            <DestinationCard destination={row.destination} eager={index < 2} />
          </div>)}
        </div>
      </Container>
    </section>}

    <Container className="py-16 sm:py-20">
      <div className="grid gap-8 border-t border-border pt-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow text-primary">How to use this guide</p>
          <h2 className="mt-3 font-display text-3xl">Distance first, then trip reality.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Straight-line distance is useful for sorting a statewide catalog, but Texas roads, traffic, water crossings and park entrances can make actual driving much longer. Open the destination guide, then verify the route, hours, reservations, closures and weather before leaving.</p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <Link to="/explore/trip-planner" className="eyebrow border-b border-primary pb-1 text-primary">Build a Texas itinerary →</Link>
          <Link to="/explore" className="eyebrow border-b border-primary pb-1 text-primary">Browse all Explore Texas guides →</Link>
        </div>
      </div>
    </Container>
  </main>;
}
