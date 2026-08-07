import { Link } from "@tanstack/react-router";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { distanceMiles, type DestinationRelationshipGroup } from "@/data/destination-relationships";
import type { Destination } from "@/data/types";

export function DestinationRelationships({ destination, groups, regionName }: { destination: Destination; groups: DestinationRelationshipGroup[]; regionName?: string }) {
  if (!groups.length) return null;

  return <>
    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Build the trip" title="Places that pair well with this stop" description="Nearby places, worthwhile detours and a few combinations that make sense in the same day or weekend." />
        <nav aria-label="Ways to continue the trip" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5">
          {groups.map((group) => <a key={group.id} href={`#relationship-${group.id}`} className="eyebrow text-muted-foreground transition-colors hover:text-primary">{group.title} · {group.destinations.length}</a>)}
        </nav>
      </Container>
    </Section>

    {groups.map((group, index) => <Section key={group.id} tone={index % 2 === 1 ? "surface" : undefined}>
      <Container id={`relationship-${group.id}`} className="scroll-mt-28">
        <SectionHeader eyebrow={group.eyebrow} title={group.title} description={group.description} />
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {group.destinations.map((item) => { const miles = distanceMiles(destination, item); return <li key={item.id}><DestinationCard destination={item} regionLabel={item.region === destination.region ? regionName : undefined} />{miles !== null && <p className="mt-3 border-t border-border pt-3 text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground">Approx. {Math.max(1, Math.round(miles)).toLocaleString("en-US")} miles away</p>}</li>; })}
        </ul>
      </Container>
    </Section>)}

    <Section tone="ink">
      <Container>
        <p className="eyebrow text-ink-foreground/60">Continue exploring</p>
        <div className="mt-6 grid border-t border-ink-foreground/20 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/explore/$category" params={{ category: destination.category }} className="border-b border-ink-foreground/20 py-6 sm:border-r sm:px-6 sm:first:pl-0 lg:border-b-0"><strong className="font-display text-2xl">More like this</strong><span className="mt-2 block text-sm leading-6 text-ink-foreground/65">More places across Texas with the same kind of appeal.</span></Link>
          <Link to="/explore/region/$region" params={{ region: destination.region }} className="border-b border-ink-foreground/20 py-6 sm:px-6 lg:border-b-0 lg:border-r"><strong className="font-display text-2xl">Explore the region</strong><span className="mt-2 block text-sm leading-6 text-ink-foreground/65">See what else belongs on the route.</span></Link>
          <Link to="/events" className="border-b border-ink-foreground/20 py-6 sm:border-r sm:px-6 lg:border-b-0"><strong className="font-display text-2xl">Check the calendar</strong><span className="mt-2 block text-sm leading-6 text-ink-foreground/65">Add festivals, fairs and seasonal events.</span></Link>
          <Link to="/search" search={{ q: destination.nearestTown }} className="py-6 sm:px-6 sm:last:pr-0"><strong className="font-display text-2xl">Look nearby</strong><span className="mt-2 block text-sm leading-6 text-ink-foreground/65">Find stories and places tied to {destination.nearestTown}.</span></Link>
        </div>
      </Container>
    </Section>
  </>;
}
