import { Link } from "@tanstack/react-router";

import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import type { Category, CategorySlug, Region } from "@/data/types";

const EXPLORE_DEPARTMENTS = new Set<CategorySlug>([
  "lakes-rivers",
  "major-springs",
  "state-parks",
  "national-parks",
  "caverns",
  "beaches-coast",
  "historic-sites",
  "road-trips",
  "small-towns",
  "food-bbq",
  "outdoors",
]);

export function ExploreDiscovery({
  currentCategory,
  categories,
  regions,
}: {
  currentCategory: CategorySlug;
  categories: Category[];
  regions: Region[];
}) {
  const relatedCategories = categories.filter(
    (item) => item.slug !== currentCategory && EXPLORE_DEPARTMENTS.has(item.slug),
  );

  return (
    <Section tone="surface">
      <Container>
        <SectionHeader
          eyebrow="Keep exploring"
          title="See Texas another way"
          description="Choose a different landscape, kind of place or corner of Texas for the next trip."
        />

        <nav aria-label="More ways to explore Texas" className="mt-8">
          <ul className="flex flex-wrap gap-3">
            {relatedCategories.map((item) => (
              <li key={item.slug}>
                <Link
                  to="/explore/$category"
                  params={{ category: item.slug }}
                  className="inline-flex rounded-full border border-border bg-background px-4 py-2 text-sm transition-colors hover:border-primary/60 hover:text-primary"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Choose a part of Texas" className="mt-10 border-t border-border pt-8">
          <p className="eyebrow text-muted-foreground">Pick a part of the state</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((region) => (
              <li key={region.id}>
                <Link
                  to="/explore/region/$region"
                  params={{ region: region.id }}
                  className="block border border-border bg-background p-4 transition-colors hover:border-primary/60"
                >
                  <span className="font-display text-lg">{region.name}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {region.blurb}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
