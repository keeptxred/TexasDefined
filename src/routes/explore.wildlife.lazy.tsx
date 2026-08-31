import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import type { Destination } from "@/data/types";

export const Route = createLazyFileRoute("/explore/wildlife")({ component: WildlifeHubPage });

function isFederalRefuge(destination: Destination) {
  return destination.managingAuthority === "U.S. Fish and Wildlife Service" && /national wildlife refuge/i.test(destination.name);
}

function WildlifeHubPage() {
  const destinations = Route.useLoaderData();
  const refuges = destinations.filter(isFederalRefuge);
  const otherWildlife = destinations.filter((destination) => !isFederalRefuge(destination));

  return <>
    <Container className="pb-8 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/explore">Explore</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">Wildlife</span>
      </nav>
      <header className="py-10 sm:py-14">
        <p className="eyebrow text-primary">Texas wildlife atlas</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Wildlife refuges, sanctuaries and animal destinations across Texas</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Use this hub to move from federal refuges and wildlife-rich state parks to birding centers, conservation sites, zoos, aquariums and other places where animals and habitat are the reason for the trip. Destination guides connect back to their Texas county and region so wildlife stops can become complete itineraries instead of isolated pins.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/texas-birds-guide" className="inline-flex items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Texas birds guide →</Link>
          <Link to="/explore/state-parks" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Wildlife-rich state parks →</Link>
          <Link to="/browse/counties" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Browse counties →</Link>
          <Link to="/explore/trip-planner" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Build a trip →</Link>
        </div>
      </header>
    </Container>

    <Section>
      <Container>
        <SectionHeader eyebrow="Federal public lands" title={`${refuges.length} Texas national wildlife refuge guides`} description="These guides use the U.S. Fish and Wildlife Service as the controlling visitor source, preserve current official naming, and connect each refuge to its county, region and nearby TexasDefined destinations." />
        <div className="mt-10 grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {refuges.map((destination, index) => <DestinationCard key={destination.slug} destination={destination} eager={index < 3} />)}
        </div>
      </Container>
    </Section>

    {otherWildlife.length > 0 && <Section>
      <Container>
        <SectionHeader eyebrow="Keep exploring" title="Wildlife-rich parks and animal destinations" description="TexasDefined also links state parks, conservation attractions and other animal-focused places into the same wildlife planning layer." />
        <div className="mt-10 grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {otherWildlife.map((destination) => <DestinationCard key={destination.slug} destination={destination} />)}
        </div>
      </Container>
    </Section>}

    <Section>
      <Container>
        <div className="grid gap-8 border-y border-border py-10 lg:grid-cols-[1fr_2fr]">
          <div><p className="eyebrow text-primary">How to use the guide</p><h2 className="mt-3 font-display text-4xl">Plan habitat first, then the county</h2></div>
          <div className="grid gap-6 sm:grid-cols-2">
            <p className="text-sm leading-7 text-muted-foreground">Bird migration, water levels, heat, storms, hunting seasons and conservation work can change what is open and what you are likely to see. TexasDefined records a source-review date on destination pages and points back to the managing organization for day-of-trip conditions.</p>
            <p className="text-sm leading-7 text-muted-foreground">Every wildlife destination with a verified county links directly into that county guide. County pages return the favor by surfacing wildlife destinations in the same county, creating a two-way Explore ↔ County path for visitors and search crawlers.</p>
          </div>
        </div>
      </Container>
    </Section>
  </>;
}
