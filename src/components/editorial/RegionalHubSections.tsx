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
  { slug: "historic-sites", label: "Historic places", description: "Missions, museums, battlefields and landmarks that explain the region." },
  { slug: "small-towns", label: "Small towns", description: "Courthouse squares, local landmarks and places that reward getting off the highway." },
  { slug: "food-bbq", label: "Food & barbecue", description: "Regional favorites and places worth planning a meal around." },
  { slug: "road-trips", label: "Road trips", description: "Scenic drives and routes that connect the region's best stops." },
  { slug: "outdoors", label: "Wildlife & outdoors", description: "Refuges, birding, dark skies and wild Texas beyond the park gate." },
];

export function RegionalHubSections({ destinations, region, allRegions }: { destinations: Destination[]; region: Region; allRegions: Region[] }) {
  const featured = destinations.filter((destination) => destination.featured).slice(0, 6);
  const leadPlaces = featured.length ? featured : destinations.slice(0, 6);
  const groups = SECTION_ORDER.map((section) => ({ ...section, destinations: destinations.filter((destination) => destination.category === section.slug) })).filter((section) => section.destinations.length > 0);

  return <>
    {leadPlaces.length > 0 && <Section tone="surface"><Container><SectionHeader eyebrow="Editor’s selection" title={`Places that define ${region.name}`} description="A curated first look at the landscapes, towns and landmarks that give this part of Texas its character." /><ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{leadPlaces.map((destination) => <li key={destination.id}><DestinationCard destination={destination} regionLabel={region.name} /></li>)}</ul></Container></Section>}

    <Section><Container><SectionHeader eyebrow="Browse the region" title={`Choose your route through ${region.name}`} description="Start with the kind of day you have in mind, then build the rest of the trip around it." /><nav aria-label={`${region.name} travel interests`} className="mt-8 border-y border-border py-5"><ul className="flex flex-wrap gap-x-6 gap-y-3">{groups.map((group) => <li key={group.slug}><a href={`#${group.slug}`} className="eyebrow text-muted-foreground transition-colors hover:text-primary">{group.label} · {group.destinations.length}</a></li>)}</ul></nav></Container></Section>

    {groups.map((group, index) => <Section key={group.slug} tone={index % 2 === 0 ? "surface" : undefined}><Container id={group.slug} className="scroll-mt-28"><SectionHeader eyebrow={`${group.destinations.length.toLocaleString("en-US")} in the guide`} title={group.label} description={group.description} actionLabel="Explore statewide" actionTo={`/explore/${group.slug}`} /><ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{group.destinations.slice(0, 6).map((destination) => <li key={destination.id}><DestinationCard destination={destination} regionLabel={region.name} /></li>)}</ul></Container></Section>)}

    <Section><Container><SectionHeader eyebrow="Plan the trip" title={`Useful next steps for ${region.name}`} description="Pair a destination with the practical information that turns it into a weekend." /><div className="mt-8 grid border-t border-border sm:grid-cols-2 lg:grid-cols-5"><Link to="/explore/trip-planner" className="border-b border-border py-6 sm:border-r sm:px-6 sm:first:pl-0 lg:border-b-0"><strong className="font-display text-2xl">Trip planner</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Build a route around this region, your interests and driving tolerance.</span></Link><Link to="/events" className="border-b border-border py-6 sm:border-r sm:px-6 lg:border-b-0"><strong className="font-display text-2xl">The calendar</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Festivals, rodeos, food events and seasonal plans.</span></Link><Link to="/guides" className="border-b border-border py-6 sm:px-6 lg:border-b-0 lg:border-r"><strong className="font-display text-2xl">The guidebook</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Camping, scenic drives, parks and lakes.</span></Link><Link to="/browse/cities" className="border-b border-border py-6 sm:border-r sm:px-6 lg:border-b-0"><strong className="font-display text-2xl">Cities & towns</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Get to know the communities nearby.</span></Link><Link to="/search" search={{ q: region.name }} className="py-6 sm:px-6 sm:last:pr-0"><strong className="font-display text-2xl">Search the region</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Find matching places, stories and guides.</span></Link></div></Container></Section>

    <Section tone="surface"><Container><SectionHeader eyebrow="The rest of Texas" title="Explore another region" /><nav aria-label="Other Texas regions" className="mt-8 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">{allRegions.filter((item) => item.id !== region.id).map((item) => <Link key={item.id} to="/explore/region/$region" params={{ region: item.id }} className="group border-b border-border py-6 sm:px-6 sm:first:pl-0"><strong className="font-display text-2xl transition-colors group-hover:text-primary">{item.name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.blurb}</span></Link>)}</nav></Container></Section>
  </>;
}
