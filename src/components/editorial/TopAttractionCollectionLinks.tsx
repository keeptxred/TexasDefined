import { Link } from "@tanstack/react-router";

import { TOP_TEXAS_ATTRACTIONS } from "@/data/top-texas-attractions";
import type { Destination } from "@/data/types";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";

const rankBySlug = new Map(TOP_TEXAS_ATTRACTIONS.map((item) => [item.slug, item.rank]));

export function TopAttractionCollectionLinks({ destinations, contextLabel }: { destinations: Destination[]; contextLabel: string }) {
  const top = destinations
    .flatMap((destination) => {
      const rank = rankBySlug.get(destination.slug);
      return rank ? [{ destination, rank }] : [];
    })
    .sort((a, b) => a.rank - b.rank);

  if (!top.length) return null;

  return <Section tone="surface">
    <Container>
      <SectionHeader
        eyebrow="TexasDefined Top 25"
        title={`${top.length} Top-25 ${top.length === 1 ? "attraction" : "attractions"} in ${contextLabel}`}
        description="These places are part of TexasDefined's statewide Top 25 reference collection. Each guide includes official-source verification, a review log, trip-planning assessments, three itinerary options and a full nearby-area layer."
      />
      <ol className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {top.map(({ destination, rank }) => <li key={destination.slug} className="border-t-2 border-foreground pt-5">
          <p className="eyebrow text-primary">Top 25 · #{rank}</p>
          <Link to="/destination/$slug" params={{ slug: destination.slug }} className="mt-2 block font-display text-2xl leading-tight hover:text-primary">{destination.name}</Link>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{destination.summary}</p>
        </li>)}
      </ol>
      <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold">
        <Link to="/explore/top-attractions" className="border-b border-primary text-primary">See the full Top 25 →</Link>
        <Link to="/explore/top-attractions/road-trips" className="border-b border-primary text-primary">Top-25 road trips →</Link>
        <Link to="/explore/top-attractions/methodology" className="border-b border-primary text-primary">Selection methodology →</Link>
      </div>
    </Container>
  </Section>;
}
