import { lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { TexasExplainedContextLinks } from "@/components/editorial/TexasExplainedContextLinks";
import { Container } from "@/components/layout/Container";
import { distanceMiles, type DestinationRelationshipGroup } from "@/data/destination-relationships";
import { topTexasAttractionRank } from "@/data/top-texas-attractions";
import type { Destination, DestinationAreaGuide, DestinationAreaItem } from "@/data/types";

const DestinationAuthorityGuide = lazy(() => import("@/components/editorial/DestinationAuthorityGuide"));

const CAMPING_DESTINATION_SLUGS = new Set([
  "enchanted-rock-state-natural-area",
  "palo-duro-canyon-state-park",
  "garner-state-park",
  "mckinney-falls-state-park",
  "caddo-lake",
  "mustang-island-state-park",
  "sea-rim-state-park",
  "brazos-bend-state-park",
  "big-bend-national-park",
  "guadalupe-mountains-national-park",
  "inks-lake-state-park",
  "colorado-bend-state-park",
  "caprock-canyons-state-park",
  "dinosaur-valley-state-park",
  "pedernales-falls-state-park",
  "lake-whitney-state-park",
  "lake-tawakoni-state-park",
]);

const AREA_GROUPS: Array<{
  key: keyof Omit<DestinationAreaGuide, "intro">;
  eyebrow: string;
  title: string;
  description: string;
}> = [
  { key: "nearbyAttractions", eyebrow: "Nearby", title: "Attractions close by", description: "Easy additions that fit naturally around the main stop." },
  { key: "foodAndDrink", eyebrow: "Eat nearby", title: "Where to eat and drink", description: "Dining districts and food areas worth building into the same outing." },
  { key: "lodging", eyebrow: "Stay nearby", title: "Where to stay", description: "The most practical lodging areas for minimizing driving and maximizing time on the ground." },
  { key: "neighborhoods", eyebrow: "Explore more", title: "Neighborhoods and districts", description: "Nearby parts of the city that add character, shopping, history or nightlife." },
  { key: "familyStops", eyebrow: "With kids", title: "Family-friendly stops", description: "Good nearby additions when the itinerary includes younger travelers." },
  { key: "sideTrips", eyebrow: "Go farther", title: "Worthwhile side trips", description: "Places that justify extending the visit beyond the immediate area." },
];

function AreaItemCard({ item }: { item: DestinationAreaItem }) {
  const name = item.href
    ? <a href={item.href} className="font-display text-xl leading-tight underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary">{item.name}</a>
    : <span className="font-display text-xl leading-tight">{item.name}</span>;

  return <li className="border-t border-border pt-4">
    {item.proximity && <p className="eyebrow mb-2 text-primary">{item.proximity}</p>}
    <h3>{name}</h3>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
  </li>;
}

function DestinationAreaGuideSection({ destination }: { destination: Destination }) {
  const guide = destination.areaGuide;
  if (!guide) return null;
  const areaGroups = AREA_GROUPS.filter((group) => guide[group.key].length > 0);
  if (!areaGroups.length) return null;

  return <Section className="py-10 sm:py-12 lg:py-14">
    <Container>
      <SectionHeader
        eyebrow="What's in the area"
        title={`Build a fuller trip around ${destination.name}`}
        description={guide.intro}
      />
      <div className="mt-8 grid gap-x-10 lg:grid-cols-2">
        {areaGroups.map((group, index) => <details key={group.key} open={index === 0} className="group border-t border-border py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-5">
            <span>
              <span className="eyebrow text-primary">{group.eyebrow}</span>
              <span className="mt-2 block font-display text-2xl">{group.title}</span>
            </span>
            <span aria-hidden className="mt-2 text-xl text-muted-foreground">+</span>
          </summary>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{group.description}</p>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2">
            {guide[group.key].map((item) => <AreaItemCard key={`${group.key}-${item.name}`} item={item} />)}
          </ul>
        </details>)}
      </div>
    </Container>
  </Section>;
}

export function DestinationRelationships({ destination, groups, regionName }: { destination: Destination; groups: DestinationRelationshipGroup[]; regionName?: string }) {
  const topAttractionRank = topTexasAttractionRank(destination.slug);
  const hasCampingProfile = CAMPING_DESTINATION_SLUGS.has(destination.slug);
  const pairedDestinations = [...new Map(
    groups.flatMap((group) => group.destinations).map((item) => [item.slug, item]),
  ).values()]
    .sort((left, right) => (distanceMiles(destination, left) ?? Number.POSITIVE_INFINITY) - (distanceMiles(destination, right) ?? Number.POSITIVE_INFINITY))
    .slice(0, 6);

  return <>
    {topAttractionRank ? <Suspense fallback={null}><DestinationAuthorityGuide destination={destination} /></Suspense> : null}
    <DestinationAreaGuideSection destination={destination} />

    {pairedDestinations.length ? <Section tone="surface" className="py-10 sm:py-12 lg:py-14">
      <Container>
        <SectionHeader eyebrow="Nearby" title="Explore nearby" description={`More places near ${destination.name}, ordered by distance to help plan the rest of your trip.`} />
        <ul className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {pairedDestinations.map((item) => {
            const miles = distanceMiles(destination, item);
            return <li key={item.id}><DestinationCard destination={item} regionLabel={item.region === destination.region ? regionName : undefined} />{miles !== null && <p className="mt-3 border-t border-border pt-3 text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground">Approx. {Math.max(1, Math.round(miles)).toLocaleString("en-US")} miles away</p>}</li>;
          })}
        </ul>
      </Container>
    </Section> : null}

    <Container><TexasExplainedContextLinks surface="destination" /></Container>

    <Section tone="ink" className="py-8 sm:py-10">
      <Container>
        <div className="flex flex-col gap-4 border-t border-ink-foreground/20 pt-5 sm:flex-row sm:items-start sm:justify-between">
          <p className="eyebrow shrink-0 text-ink-foreground/60">Continue exploring</p>
          <nav aria-label={`Continue exploring from ${destination.name}`} className="flex flex-wrap gap-x-6 gap-y-3">
            {topAttractionRank && <Link to="/explore/top-attractions" className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">Top 25 · #{topAttractionRank}</Link>}
            {hasCampingProfile && <Link to="/best-places-to-go-camping-in-texas" className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">Camping details</Link>}
            <Link to="/explore/trip-planner" search={{ destination: destination.slug }} className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">Build the weekend</Link>
            <Link to="/explore/$category" params={{ category: destination.category }} className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">More like this</Link>
            <Link to="/explore/region/$region" params={{ region: destination.region }} className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">Explore the region</Link>
            <Link to="/events" className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">Check the calendar</Link>
            <Link to="/search" search={{ q: destination.nearestTown }} className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">Look nearby</Link>
          </nav>
        </div>
      </Container>
    </Section>
  </>;
}
