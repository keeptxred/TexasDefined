import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { isDestinationPhotoPlaceholder } from "@/data/explore-hero-reconciliation";
import { nationalWildlifeRefugeDestinations } from "@/data/national-wildlife-refuge-destinations";
import { TEXAS_WILDLIFE_SPECIES } from "@/data/knowledge-graph/wildlife-species";

export const Route = createLazyFileRoute("/explore/wildlife")({ component: WildlifeHubPage });

function WildlifeHubPage() {
  const refuges = nationalWildlifeRefugeDestinations.slice().sort((left, right) => left.name.localeCompare(right.name));

  return <>
    <Container className="pb-8 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/explore">Explore</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">Wildlife</span>
      </nav>
      <header className="py-10 sm:py-14">
        <p className="eyebrow text-primary">Texas wildlife atlas</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Wildlife refuges and habitat destinations across Texas</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Start with Texas&apos;s 18 current National Wildlife Refuges, then connect each stop to birding, hunting, state parks, county guides and regional trip planning. Refuge records use the U.S. Fish and Wildlife Service as the controlling visitor source and preserve current official naming.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/texas-birds-guide" className="inline-flex items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Texas birds guide →</Link>
          <Link to="/hunting" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Texas hunting guide →</Link>
          <Link to="/explore/state-parks" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Wildlife-rich state parks →</Link>
          <Link to="/browse/counties" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Browse counties →</Link>
          <Link to="/explore/trip-planner" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Build a trip →</Link>
        </div>
      </header>
    </Container>

    <Section>
      <Container>
        <SectionHeader eyebrow="Species field guides" title={`${TEXAS_WILDLIFE_SPECIES.length} Texas wildlife species profiles`} description="Open source-backed species guides for habitat, range, identification, conservation context and current TPWD references. These profiles connect wildlife planning to the animals readers are actually trying to understand." />
        <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {TEXAS_WILDLIFE_SPECIES.map((species) => <a key={species.slug} href={`/wildlife-species/${species.slug}`} className="group bg-background p-5">
            <h3 className="font-display text-2xl leading-tight group-hover:text-primary">{species.name}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{species.description}</p>
            <span className="eyebrow mt-5 inline-block text-primary">Open species guide →</span>
          </a>)}
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="Federal public lands" title={`${refuges.length} Texas national wildlife refuge guides`} description="The authority catalog includes current federal names, managing-agency links, county and region context, access notes and wildlife highlights. Individual destination pages remain subject to TexasDefined's normal indexing-readiness safeguards." />
        <div className="mt-10 grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {refuges.map((destination, index) => isDestinationPhotoPlaceholder(destination.hero.src)
            ? <article key={destination.slug} className="border-t border-border pt-5">
                <p className="eyebrow text-primary">{destination.nearestTown || destination.region.replace(/-/g, " ")}</p>
                <h3 className="mt-2 font-display text-2xl"><Link to="/destination/$slug" params={{ slug: destination.slug }} className="hover:text-primary">{destination.name}</Link></h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{destination.summary}</p>
                {destination.bestSeason && <p className="mt-4 text-xs uppercase tracking-[0.08em] text-muted-foreground">Best season: {destination.bestSeason}</p>}
                <Link to="/destination/$slug" params={{ slug: destination.slug }} className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Explore refuge →</Link>
              </article>
            : <DestinationCard key={destination.slug} destination={destination} eager={index < 3} />)}
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <div className="grid gap-8 border-y border-border py-10 lg:grid-cols-[1fr_2fr]">
          <div><p className="eyebrow text-primary">Plan with current conditions</p><h2 className="mt-3 font-display text-4xl">Habitat first, then the county</h2></div>
          <div className="grid gap-6 sm:grid-cols-2">
            <p className="text-sm leading-7 text-muted-foreground">Bird migration, water levels, heat, storms, hunting seasons and conservation work can change what is open and what you are likely to see. Use each refuge&apos;s official federal visitor source for day-of-trip alerts and access rules.</p>
            <p className="text-sm leading-7 text-muted-foreground">TexasDefined ties refuge records into county and regional discovery so a wildlife stop can become part of a larger trip. Hunters should also use the <Link to="/hunting" className="font-semibold text-primary underline underline-offset-4">Texas hunting hub</Link> for TPWD license, season and public-hunting verification before assuming a wildlife destination is open to hunting.</p>
          </div>
        </div>
      </Container>
    </Section>
  </>;
}
