import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/explore/wildlife")({ component: TexasWildlifePage });

function TexasWildlifePage() {
  const destinations = Route.useLoaderData();
  const federalRefuges = destinations.filter((destination) => destination.managingAuthority === "U.S. Fish and Wildlife Service");
  const otherWildlife = destinations.filter((destination) => destination.managingAuthority !== "U.S. Fish and Wildlife Service");

  return <main>
    <Container className="py-14 sm:py-20">
      <p className="eyebrow text-primary">Refuges · sanctuaries · wildlife destinations</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas wildlife destinations</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Plan wildlife-focused trips with source-checked Texas Defined guides. Federal refuges are grouped first, followed by other wildlife, animal and conservation destinations already represented in the statewide destination catalog.</p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
        <Link to="/texas-birds-guide" className="border-b border-primary pb-1 text-primary">Texas birds guide</Link>
        <Link to="/explore/state-parks" className="border-b border-primary pb-1 text-primary">Texas state parks</Link>
        <Link to="/browse/counties" className="border-b border-primary pb-1 text-primary">Browse counties</Link>
        <Link to="/explore/trip-planner" className="border-b border-primary pb-1 text-primary">Trip planner</Link>
      </div>

      <WildlifeList id="federal-refuges" eyebrow="Federal public lands" title={`${federalRefuges.length} National Wildlife Refuge guides`} destinations={federalRefuges} />
      {otherWildlife.length ? <WildlifeList id="other-wildlife" eyebrow="More wildlife destinations" title={`${otherWildlife.length} additional wildlife and animal destinations`} destinations={otherWildlife} /> : null}

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-3xl">Plan with the managing agency</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Wildlife refuges and management lands can close areas for habitat work, prescribed fire, hunting seasons, storms or sensitive-species protection. Texas Defined preserves the planning context, while the official managing-agency link in each guide remains the controlling source for current access.</p>
      </section>
    </Container>
  </main>;
}

function WildlifeList({ id, eyebrow, title, destinations }: { id: string; eyebrow: string; title: string; destinations: ReturnType<typeof Route.useLoaderData> }) {
  return <section className="mt-12 border-t border-border pt-8" aria-labelledby={id}>
    <p className="eyebrow text-primary">{eyebrow}</p>
    <h2 id={id} className="mt-2 font-display text-3xl">{title}</h2>
    <ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => <li key={destination.slug} className="border-t border-border py-4">
        <Link to="/destination/$slug" params={{ slug: destination.slug }} className="font-semibold text-foreground hover:text-primary">{destination.name}</Link>
        <p className="mt-1 text-sm text-muted-foreground">{destination.nearestTown}{destination.county ? ` · ${destination.county}` : ""}</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{destination.summary}</p>
      </li>)}
    </ul>
  </section>;
}
