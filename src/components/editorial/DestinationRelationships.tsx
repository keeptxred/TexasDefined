import { lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";

import { UnusualBusinessAuthorityPanel } from "@/components/authority/UnusualBusinessAuthorityPanel";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { MoodyGardensSpotlights } from "@/components/editorial/MoodyGardensSpotlights";
import { SamRayburnContext } from "@/components/editorial/SamRayburnContext";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { TexasExplainedContextLinks } from "@/components/editorial/TexasExplainedContextLinks";
import { Container } from "@/components/layout/Container";
import { distanceMiles, featuredDestinationRelationships, type DestinationRelationshipGroup } from "@/data/destination-relationships";
import { topTexasAttractionRank } from "@/data/top-texas-attractions";
import { shouldRenderFullDestinationAuthorityGuide } from "@/data/destination-authority-presentation";
import type { Destination, DestinationAreaGuide, DestinationAreaItem } from "@/data/types";

const DestinationAuthorityGuide = lazy(() => import("@/components/editorial/DestinationAuthorityGuide"));
const MuseumAuthorityNetworkSection = lazy(() => import("@/components/editorial/MuseumAuthorityNetworkSection"));

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

const SAM_HOUSTON_MUSEUM_SLUG = "sam-houston-memorial-museum-republic-texas-presidential-library-huntsville";
const WHIRLYBALL_SLUG = "whirlyball-hurst";

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

/**
 * A small substantive SSR fallback for the canonical Fort McKavett guide.
 * React.lazy can defer the large shared authority component during streaming;
 * the initial mobile HTML must retain visit plans and source references even
 * before hydration replaces this fallback with the full authority guide.
 */
function FortMcKavettAuthorityFallback({ destination }: { destination: Destination }) {
  const guide = destination.authorityGuide;
  if (!guide || destination.slug !== "fort-mckavett") return null;
  return <Section tone="surface">
    <Container>
      <section aria-labelledby="fort-mckavett-ssr-authority" className="py-7">
        <p className="eyebrow text-primary">Historic site field guide</p>
        <h2 id="fort-mckavett-ssr-authority" className="mt-2 font-display text-3xl">Fort McKavett: history and visit planning</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7">{guide.whyItMatters}</p>
        <p className="mt-3 max-w-4xl text-sm leading-7">{guide.assessment.recommendedVisit}</p>
        <h3 className="mt-8 font-display text-2xl">Three ways to visit</h3>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {guide.itineraries.map((itinerary) => <section key={itinerary.label} className="border-t-2 border-foreground pt-4">
            <p className="eyebrow text-primary">{itinerary.duration}</p>
            <h4 className="mt-2 font-display text-xl">{itinerary.label}</h4>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">{itinerary.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          </section>)}
        </div>
        <h3 className="mt-8 font-display text-2xl">Sources used for this guide</h3>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{source.label}</a></li>)}
        </ul>
      </section>
    </Container>
  </Section>;
}

function DestinationAreaGuideSection({ destination }: { destination: Destination }) {
  const guide = destination.areaGuide;
  if (!guide) return null;
  const areaGroups = AREA_GROUPS.filter((group) => guide[group.key].length > 0);
  if (!areaGroups.length) return null;

  return <Section className="py-10 sm:py-12 lg:py-14">
    <Container>
      <SectionHeader
        eyebrow="Around the area"
        title={`What to do near ${destination.name}`}
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
  const hasExtendedAuthorityGuide = shouldRenderFullDestinationAuthorityGuide(destination);
  const isWhirlyBall = destination.slug === WHIRLYBALL_SLUG;
  const isMoodyGardens = destination.slug === "moody-gardens";
  const hasCampingProfile = CAMPING_DESTINATION_SLUGS.has(destination.slug);
  const hasSamRayburnHouseContext = destination.slug === "sam-rayburn-house";
  const hasSamHoustonMuseumContext = destination.slug === SAM_HOUSTON_MUSEUM_SLUG;
  const pairedDestinations = featuredDestinationRelationships(destination, groups);
  const authorityFallback = destination.slug === "fort-mckavett" && destination.authorityGuide
    ? <FortMcKavettAuthorityFallback destination={destination} />
    : null;

  return <>
    {isMoodyGardens ? <MoodyGardensSpotlights /> : null}
    {isWhirlyBall ? <Section tone="surface"><Container><UnusualBusinessAuthorityPanel slug={destination.slug} /></Container></Section> : null}
    {topAttractionRank && hasExtendedAuthorityGuide ? <Suspense fallback={authorityFallback}><DestinationAuthorityGuide destination={destination} /></Suspense> : null}
    {!topAttractionRank && hasExtendedAuthorityGuide ? <Suspense fallback={authorityFallback}><DestinationAuthorityGuide destination={destination} showUnusualBusinessAuthority={!isWhirlyBall} /></Suspense> : null}
    <Suspense fallback={null}><MuseumAuthorityNetworkSection destination={destination} /></Suspense>
    {hasSamRayburnHouseContext ? <SamRayburnContext surface="house" /> : null}
    {!isMoodyGardens ? <DestinationAreaGuideSection destination={destination} /> : null}

    {pairedDestinations.length ? <Section tone="surface" className="py-10 sm:py-12 lg:py-14">
      <Container>
        <SectionHeader eyebrow="Plan the route" title="Explore related places" description={`Editorially paired stops near ${destination.name} appear first, followed by nearby destinations. Distances are approximate straight-line miles.`} />
        <ul className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {pairedDestinations.map((item) => {
            const miles = distanceMiles(destination, item);
            const roundedMiles = miles === null ? null : Math.max(1, Math.round(miles));
            return <li key={item.id}><DestinationCard destination={item} regionLabel={item.region === destination.region ? regionName : undefined} />{roundedMiles !== null && <p className="mt-3 border-t border-border pt-3 text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground">Approx. {roundedMiles.toLocaleString("en-US")} {roundedMiles === 1 ? "mile" : "miles"} away</p>}</li>;
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
            {hasSamHoustonMuseumContext && <Link to="/article/republic-of-texas-government-trail" className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">Republic government trail</Link>}
            {hasSamHoustonMuseumContext && <Link to="/article/texas-revolution-historic-sites-road-trip" className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">Texas Revolution road trip</Link>}
            <Link to="/explore/trip-planner" search={{ destination: destination.slug }} className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">Build the weekend</Link>
            {destination.category === "guides" ? <Link to="/guides" className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">More like this</Link> : destination.category === "sports" ? <Link to="/sports" className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">More like this</Link> : destination.category === "events" ? <Link to="/events" className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">More like this</Link> : <Link to="/explore/$category" params={{ category: destination.category }} className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">More like this</Link>}
            <Link to="/explore/region/$region" params={{ region: destination.region === "panhandle-plains" ? "panhandle" : destination.region }} className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">Explore the region</Link>
            <Link to="/events" className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">Check the calendar</Link>
            <Link to="/search" search={{ q: destination.nearestTown }} className="eyebrow text-ink-foreground/80 hover:text-ink-foreground">Look nearby</Link>
          </nav>
        </div>
      </Container>
    </Section>
  </>;
}