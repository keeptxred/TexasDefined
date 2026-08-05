import { Link } from "@tanstack/react-router";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import type { CategorySlug, Destination, Region } from "@/data/types";

const SECTION_ORDER: Array<{ slug: CategorySlug; label: string; description: string }> = [
  { slug: "state-parks", label: "Parks & public land", description: "State parks, natural areas, trails and places made for a full day outside." },
  { slug: "national-parks", label: "National parks", description: "The region's biggest federally protected landscapes and landmark destinations." },
  { slug: "lakes-rivers", label: "Lakes & rivers", description: "Water worth building a weekend around, from quiet paddling to swimming and fishing." },
  { slug: "major-springs", label: "Springs & swimming", description: "Clear water, spring-fed pools and the places Texans go when summer settles in." },
  { slug: "caverns", label: "Caverns & caves", description: "Limestone rooms, guided tours and below-ground Texas." },
  { slug: "beaches-coast", label: "Beaches & coast", description: "Barrier islands, bay shores, lighthouses and salt-air stops." },
  { slug: "historic-sites", label: "History with an address", description: "Missions, museums, battlefields and historic places that explain the region." },
  { slug: "small-towns", label: "Towns worth a stop", description: "Courthouse squares, local landmarks and places that reward getting off the highway." },
  { slug: "food-bbq", label: "Food worth the drive", description: "Barbecue, regional favorites and places to plan a meal around." },
  { slug: "road-trips", label: "Road trips", description: "Scenic drives and routes that connect the region's best stops." },
  { slug: "outdoors", label: "Wildlife & outdoors", description: "Refuges, birding, dark skies and wild Texas beyond the park gate." },
];

export function RegionalHubSections({
  destinations,
  region,
  allRegions,
}: {
  destinations: Destination[];
  region: Region;
  allRegions: Region[];
}) {
  const featured = destinations.filter((destination) => destination.featured).slice(0, 6);
  const leadPlaces = featured.length ? featured : destinations.slice(0, 6);
  const groups = SECTION_ORDER.map((section) => ({
    ...section,
    destinations: destinations.filter((destination) => destination.category === section.slug),
  })).filter((section) => section.destinations.length > 0);

  return (
    <>
      {leadPlaces.length > 0 && (
        <Section tone="surface">
          <Container>
            <SectionHeader
              eyebrow="Start here"
              title={`The places that define ${region.name}`}
              description="A first pass at the region: the landscapes, towns and stops we would point a friend toward first."
            />
            <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {leadPlaces.map((destination) => (
                <li key={destination.id}>
                  <DestinationCard destination={destination} regionLabel={region.name} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Plan by interest"
            title={`What to do in ${region.name}`}
            description="Jump straight to the kind of Texas day you have in mind. Each section opens the complete statewide collection."
          />
          <nav aria-label={`${region.name} travel interests`} className="mt-8 flex flex-wrap gap-3">
            {groups.map((group) => (
              <a key={group.slug} href={`#${group.slug}`} className="border border-border bg-background px-4 py-2 text-sm hover:border-primary hover:text-primary">
                {group.label} ({group.destinations.length})
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {groups.map((group, index) => (
        <Section key={group.slug} tone={index % 2 === 0 ? "surface" : undefined}>
          <Container id={group.slug} className="scroll-mt-28">
            <SectionHeader
              eyebrow={`${group.destinations.length.toLocaleString("en-US")} in the region`}
              title={group.label}
              description={group.description}
              action={
                <Link to="/explore/$category" params={{ category: group.slug }} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
                  See all across Texas
                </Link>
              }
            />
            <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {group.destinations.slice(0, 6).map((destination) => (
                <li key={destination.id}>
                  <DestinationCard destination={destination} regionLabel={region.name} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ))}

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Build the weekend"
            title={`Useful next steps for ${region.name}`}
            description="Pair the destination list with practical Texas planning resources."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link to="/events" className="border border-border p-5 hover:border-primary"><strong className="font-display text-lg">This weekend</strong><span className="mt-2 block text-sm text-muted-foreground">Find festivals, rodeos, food events and seasonal plans.</span></Link>
            <Link to="/guides" className="border border-border p-5 hover:border-primary"><strong className="font-display text-lg">Travel guides</strong><span className="mt-2 block text-sm text-muted-foreground">Camping, scenic drives, parks, lakes and practical guides.</span></Link>
            <Link to="/browse/cities" className="border border-border p-5 hover:border-primary"><strong className="font-display text-lg">City directory</strong><span className="mt-2 block text-sm text-muted-foreground">Look up Texas cities and connect places to local information.</span></Link>
            <Link to="/search" search={{ q: region.name }} className="border border-border p-5 hover:border-primary"><strong className="font-display text-lg">Search the region</strong><span className="mt-2 block text-sm text-muted-foreground">Find every matching destination, story and guide.</span></Link>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader eyebrow="Keep driving" title="Explore another part of Texas" />
          <nav aria-label="Other Texas regions" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allRegions.filter((item) => item.id !== region.id).map((item) => (
              <Link key={item.id} to="/explore/region/$region" params={{ region: item.id }} className="border border-border bg-background p-5 hover:border-primary">
                <strong className="font-display text-xl">{item.name}</strong>
                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{item.blurb}</span>
              </Link>
            ))}
          </nav>
        </Container>
      </Section>
    </>
  );
}
