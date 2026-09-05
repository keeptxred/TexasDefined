import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-roadside-oddities")({
  component: GuidePage,
});

function GuidePage() {
  const guide = Route.useLoaderData();
  return <>
    <TexasEvergreenGuide guide={guide} />
    <Container className="pb-16 sm:pb-24">
      <aside className="mx-auto max-w-5xl border-t-2 border-foreground pt-8" aria-labelledby="water-tower-collection">
        <p className="eyebrow text-primary">New roadside collection</p>
        <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h2 id="water-tower-collection" className="font-display text-4xl">Texas Water Towers Worth Pulling Over For</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">From Groom's leaning Route 66 tower to Luling's giant watermelon and century-old downtown landmarks, this curated list separates ordinary utility towers from the ones that genuinely add something to a Texas road trip.</p>
          </div>
          <Link to="/explore/water-towers" className="inline-flex border-b border-primary pb-1 text-sm font-semibold text-primary">Explore the water towers →</Link>
        </div>
      </aside>
    </Container>
  </>;
}
