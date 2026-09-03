import { Link } from "@tanstack/react-router";

import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import type { Category, CategorySlug, Region } from "@/data/types";

const EXPLORE_DEPARTMENTS = new Set<CategorySlug>(["lakes-rivers","major-springs","state-parks","national-parks","caverns","beaches-coast","historic-sites","road-trips","small-towns","food-bbq","outdoors","swimming-holes-river-tubing" as CategorySlug]);

export function ExploreDiscovery({ currentCategory, categories, regions }: { currentCategory: CategorySlug; categories: Category[]; regions: Region[] }) {
  const relatedCategories = categories.filter((item) => item.slug !== currentCategory && EXPLORE_DEPARTMENTS.has(item.slug));

  return (
    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Elsewhere in the guide" title="See Texas another way" description="Change the landscape, the kind of place or the part of the state and keep going." />

        <nav aria-label="Explore planning shortcuts" className="mt-8 border-y border-border py-5">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            <li><Link to="/explore/trip-planner" className="eyebrow text-primary transition-colors hover:text-foreground">Build a Texas trip</Link></li>
            <li><Link to="/browse/cities" className="eyebrow text-muted-foreground transition-colors hover:text-primary">Browse Texas cities</Link></li>
            <li><Link to="/events" className="eyebrow text-muted-foreground transition-colors hover:text-primary">See Texas events</Link></li>
          </ul>
        </nav>

        <nav aria-label="More ways to explore Texas" className="mt-10">
          <p className="eyebrow text-primary">By place and experience</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {relatedCategories.map((item) => <li key={item.slug}><Link to="/explore/$category" params={{ category: item.slug }} className="eyebrow text-muted-foreground transition-colors hover:text-primary">{item.name}</Link></li>)}
          </ul>
        </nav>

        <nav aria-label="Choose a part of Texas" className="mt-12">
          <p className="eyebrow text-primary">By region</p>
          <ul className="mt-6 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((region, index) => <li key={region.id} className={`${index % 4 !== 3 ? "lg:border-r" : ""} border-b border-border sm:px-6 sm:first:pl-0`}><Link to="/explore/region/$region" params={{ region: region.id }} className="group block py-6"><span className="font-display text-2xl transition-colors group-hover:text-primary">{region.name}</span><span className="mt-2 block text-sm leading-6 text-muted-foreground">{region.blurb}</span></Link></li>)}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
