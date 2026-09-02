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
    ? <a href={item.href} className="font-display text-2xl leading-tight underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary">{item.name}</a>
    : <span className="font-display text-2xl leading-tight">{item.name}</span>;

  return <li className="border-t border-border pt-5">
    {item.proximity && <p className="eyebrow mb-2 text-primary">{item.proximity}</p>}
    <h3>{name}</h3>
    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
  </li>;
}

function DestinationAreaGuideSection({ destination }: { destination: Destination }) {
  const guide = destination.areaGuide;
  if (!guide) return null;

  return <Section>
    <Container>
      <SectionHeader
        eyebrow="What's in the area"
        title={`Build a fuller trip around ${destination.name}`}
        description={guide.intro}
      />
      <div className="mt-12 grid gap-x-12 gap-y-14 lg:grid-cols-2">
        {AREA_GROUPS.map((group) => <section key={group.key} aria-labelledby={`${destination.slug}-area-${group.key}`}>
          <p className="eyebrow text-primary">{group.eyebrow}</p>
          <h2 id={`${destination.slug}-area-${group.key}`} className="mt-2 font-display text-3xl">{group.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{group.description}</p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {guide[group.key].map((item) => <AreaItemCard key={`${group.key}-${item.name}`} item={item} />)}
          </ul>
        </section>)}
      </div>
    </Container>
  </Section>;
}

export function DestinationRelationships({ destination, groups, regionName }: { destination: Destination; groups: DestinationRelationshipGroup[]; regionName?: string }) {
  const topAttractionRank = topTexasAttractionRank(destination.slug);
  const hasCampingProfile = CAMPING_DESTINATION_SLUGS.has(destination.slug);

  return <>
    {topAttractionRank ? <Suspense fallback={null}><DestinationAuthorityGuide destination={destination} /></Suspense> : null}
    <DestinationAreaGuideSection destination={destination} />

    {groups.length ? <>
      <Section tone="surface">
        <Container>
          <SectionHeader eyebrow="Build the trip" title="Places that pair well with this stop" description="Nearby places, worthwhile detours and combinations for adding water, history, outdoors or a full weekend around this destination." />
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
    </> : null}

    <Container><TexasExplainedContextLinks surface="destination" /></Container>

    <Section tone="ink">
      <Container>
        <p className="eyebrow text-ink-foreground/60">Continue exploring</p>
        <div className="mt-6 grid border-t border-ink-foreground/20 sm:grid-cols-2 lg:grid-cols-3">
          {topAttractionRank && <Link to="/explore/top-attractions" className="border-b border-ink-foreground/20 py-6 sm:border-r sm:px-6 sm:first:pl-0"><strong className="font-display text-2xl">Top 25 · #{topAttractionRank}</strong><span className="mt-2 block text-sm leading-6 text-ink-foreground/65">See all 25 Texas attractions in the ranked collection.</span></Link>}
          {hasCampingProfile && <Link to="/best-places-to-go-camping-in-texas" className="border-b border-ink-foreground/20 py-6 sm:border-r sm:px-6 sm:first:pl-0"><strong className="font-display text-2xl">Camping details</strong><span className="mt-2 block text-sm leading-6 text-ink-foreground/65">Compare verified campsite styles, facilities and reservation sources for {destination.name}.</span></Link>}
          <Link to="/explore/trip-planner" search={{ destination: destination.slug }} className="border-b border-ink-foreground/20 py-6 sm:border-r sm:px-6 sm:first:pl-0"><strong className="font-display text-2xl">Build the weekend</strong><span className="mt-2 block text-sm leading-6 text-ink-foreground/65">Start a Texas itinerary with {destination.name} already on the route.</span></Link>
          <Link to="/explore/$category" params={{ category: destination.category }} className="border-b border-ink-foreground/20 py-6 sm:px-6 sm:border-r"><strong className="font-display text-2xl">More like this</strong><span className="mt-2 block text-sm leading-6 text-ink-foreground/65">More places across Texas with the same kind of appeal.</span></Link>
          <Link to="/explore/region/$region" params={{ region: destination.region }} className="border-b border-ink-foreground/20 py-6 sm:border-r sm:px-6"><strong className="font-display text-2xl">Explore the region</strong><span className="mt-2 block text-sm leading-6 text-ink-foreground/65">See what else belongs on the route.</span></Link>
          <Link to="/events" className="border-b border-ink-foreground/20 py-6 sm:px-6 sm:border-r"><strong className="font-display text-2xl">Check the calendar</strong><span className="mt-2 block text-sm leading-6 text-ink-foreground/65">Add festivals, fairs and seasonal events.</span></Link>
          <Link to="/search" search={{ q: destination.nearestTown }} className="py-6 sm:px-6 sm:last:pr-0"><strong className="font-display text-2xl">Look nearby</strong><span className="mt-2 block text-sm leading-6 text-ink-foreground/65">Find stories and places tied to {destination.nearestTown}.</span></Link>
        </div>
      </Container>
    </Section>
  </>;
}
