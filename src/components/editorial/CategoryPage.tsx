import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCollectionGrid } from "@/components/editorial/DestinationCollectionGrid";
import { ExploreDiscovery } from "@/components/editorial/ExploreDiscovery";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articlesQuery, categoriesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { CategorySlug, ImageRef } from "@/data/types";

const TOP_LEVEL_DEPARTMENTS = new Set<CategorySlug>([
  "sports",
  "moving-to-texas",
  "real-estate",
  "home-garden",
  "texas-history",
]);

/** Shared presentation for reader-facing category pages. */
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
  const { data: articles } = useSuspenseQuery(articlesQuery({ category }));
  const { data: destinations } = useSuspenseQuery(destinationsQuery({ category }));
  const { data: regions } = useSuspenseQuery(regionsQuery());
  const { data: categories } = useSuspenseQuery(categoriesQuery());

  const regionName = (id: string) => regions.find((region) => region.id === id)?.name;
  const lead = articles[0];
  const others = lead ? articles.slice(1) : articles;
  const belongsToExplore = !TOP_LEVEL_DEPARTMENTS.has(category);

  return (
    <>
      <Container className="pt-8">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            {belongsToExplore && (
              <>
                <li aria-hidden="true">/</li>
                <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">{title}</li>
          </ol>
        </nav>
      </Container>

      {image ? (
        <section className="relative isolate mt-4 overflow-hidden bg-ink text-ink-foreground">
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
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-foreground/85">{intro}</p>
          </Container>
        </section>
      ) : (
        <Container className="pb-4 pt-12 sm:pt-16">
          <p className="eyebrow text-primary">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
        </Container>
      )}

      {lead && (
        <Section>
          <Container>
            <SectionHeader eyebrow="Start here" title="The story we’d read first" />
            <div className="mt-10"><ArticleCard article={lead} size="feature" /></div>
          </Container>
        </Section>
      )}

      {destinations.length > 0 && (
        <Section tone="surface">
          <Container>
            <SectionHeader
              eyebrow="Worth the drive"
              title={`${destinations.length.toLocaleString("en-US")} places to explore`}
            />
            <DestinationCollectionGrid destinations={destinations} regionLabel={regionName} />
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <SectionHeader eyebrow="Keep reading" title="More stories for the road" />
          {others.length > 0 ? (
            <ul className="mt-10 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {others.map((article) => (
                <li key={article.id}><ArticleCard article={article} /></li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 text-sm text-muted-foreground">
              We’re still finding the right stories for this department. In the meantime, take a look around the rest of Texas Defined.
            </p>
          )}
        </Container>
      </Section>

      {belongsToExplore && (
        <ExploreDiscovery currentCategory={category} categories={categories} regions={regions} />
      )}
    </>
  );
}
