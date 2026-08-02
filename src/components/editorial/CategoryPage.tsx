import { useSuspenseQuery } from "@tanstack/react-query";

import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articlesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { CategorySlug, ImageRef } from "@/data/types";
import { useBrand } from "@/brand/context";

/**
 * Generic category page. Every string and image is a prop — no brand or
 * section assumptions live in this component.
 */
export function CategoryPage({
  category,
  eyebrow,
  title,
  intro,
  image,
}: {
  category: CategorySlug;
  eyebrow: string;
  title: string;
  intro: string;
  image?: ImageRef | undefined;
}) {
  const brand = useBrand();
  const { data: articles } = useSuspenseQuery(articlesQuery({ category }));
  const { data: destinations } = useSuspenseQuery(destinationsQuery({ category }));
  const { data: regions } = useSuspenseQuery(regionsQuery());

  const regionName = (id: string) => regions.find((region) => region.id === id)?.name;
  const lead = articles[0];
  const others = lead ? articles.slice(1) : articles;

  return (
    <>
      {image ? (
        <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="absolute inset-0 size-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
          <Container className="relative py-20 sm:py-28">
            <p className="eyebrow text-ink-foreground/75">{eyebrow}</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-foreground/85">
              {intro}
            </p>
          </Container>
        </section>
      ) : (
        <Container className="pb-4 pt-16 sm:pt-24">
          <p className="eyebrow text-primary">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
        </Container>
      )}

      {lead && (
        <Section>
          <Container>
            <ArticleCard article={lead} size="feature" />
          </Container>
        </Section>
      )}

      {destinations.length > 0 && (
        <Section tone="surface">
          <Container>
            <SectionHeader eyebrow="Places" title="Where to go" />
            <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
        </Section>
      )}

      <Section>
        <Container>
          <SectionHeader eyebrow="Stories" title="Read next" />
          {others.length > 0 ? (
            <ul className="mt-10 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {others.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-sm text-muted-foreground">{brand.copy.emptyState}</p>
          )}
        </Container>
      </Section>
    </>
  );
}
