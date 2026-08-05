import { Link } from "@tanstack/react-router";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { distanceMiles, type DestinationRelationshipGroup } from "@/data/destination-relationships";
import type { Destination } from "@/data/types";

export function DestinationRelationships({
  destination,
  groups,
  regionName,
}: {
  destination: Destination;
  groups: DestinationRelationshipGroup[];
  regionName?: string;
}) {
  if (!groups.length) return null;

  return (
    <>
      <Section tone="surface">
        <Container>
          <SectionHeader
            eyebrow="Make a day of it"
            title="What is nearby and what goes well with this stop"
            description="These suggestions use location, closest town, region and destination type—not just matching words."
          />
          <nav aria-label="Destination relationship sections" className="mt-8 flex flex-wrap gap-3">
            {groups.map((group) => (
              <a key={group.id} href={`#relationship-${group.id}`} className="border border-border bg-background px-4 py-2 text-sm hover:border-primary hover:text-primary">
                {group.title} ({group.destinations.length})
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {groups.map((group, index) => (
        <Section key={group.id} tone={index % 2 === 1 ? "surface" : undefined}>
          <Container id={`relationship-${group.id}`} className="scroll-mt-28">
            <SectionHeader eyebrow={group.eyebrow} title={group.title} description={group.description} />
            <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {group.destinations.map((item) => {
                const miles = distanceMiles(destination, item);
                return (
                  <li key={item.id}>
                    <DestinationCard
                      destination={item}
                      regionLabel={item.region === destination.region ? regionName : undefined}
                    />
                    {miles !== null && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        About {Math.max(1, Math.round(miles)).toLocaleString("en-US")} miles away in a straight line
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </Container>
        </Section>
      ))}

      <Section tone="ink">
        <Container className="grid gap-6 text-ink-foreground sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/explore/$category" params={{ category: destination.category }} className="border border-ink-foreground/20 p-5 hover:border-ink-foreground/60">
            <strong className="font-display text-xl">More like this</strong>
            <span className="mt-2 block text-sm text-ink-foreground/70">Browse the complete statewide collection.</span>
          </Link>
          <Link to="/explore/region/$region" params={{ region: destination.region }} className="border border-ink-foreground/20 p-5 hover:border-ink-foreground/60">
            <strong className="font-display text-xl">Explore the region</strong>
            <span className="mt-2 block text-sm text-ink-foreground/70">See every destination in this part of Texas.</span>
          </Link>
          <Link to="/events" className="border border-ink-foreground/20 p-5 hover:border-ink-foreground/60">
            <strong className="font-display text-xl">Plan the weekend</strong>
            <span className="mt-2 block text-sm text-ink-foreground/70">Add festivals, food events and seasonal stops.</span>
          </Link>
          <Link to="/search" search={{ q: destination.nearestTown }} className="border border-ink-foreground/20 p-5 hover:border-ink-foreground/60">
            <strong className="font-display text-xl">Search nearby</strong>
            <span className="mt-2 block text-sm text-ink-foreground/70">Find stories and places tied to {destination.nearestTown}.</span>
          </Link>
        </Container>
      </Section>
    </>
  );
}
