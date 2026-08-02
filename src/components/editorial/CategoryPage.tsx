import { useSuspenseQuery } from "@tanstack/react-query";

import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Container } from "@/components/layout/Container";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { CategorySlug } from "@/data/types";
import { useBrand } from "@/brand/context";

/**
 * Generic category page. Every string is a prop — no brand or section
 * assumptions live in this component.
 */
export function CategoryPage({
  category,
  eyebrow,
  title,
  intro,
}: {
  category: CategorySlug;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  const brand = useBrand();
  const { data: articles } = useSuspenseQuery(articlesQuery({ category }));
  const { data: destinations } = useSuspenseQuery(destinationsQuery({ category }));
  const { data: regions } = useSuspenseQuery(regionsQuery());

  const regionName = (id: string) => regions.find((region) => region.id === id)?.name;

  return (
    <>
      <Container className="pb-4 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
      </Container>

      {destinations.length > 0 && (
        <Container className="py-12">
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <li key={destination.id}>
                <DestinationCard
                  destination={destination}
                  regionLabel={regionName(destination.region)}
                />

              </li>
            ))}
          </ul>
        </Container>
      )}

      <Container className="rule-top py-12">
        {articles.length > 0 ? (
          <ul className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.id}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">{brand.copy.emptyState}</p>
        )}
      </Container>
    </>
  );
}
