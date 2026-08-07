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

export function CategoryPage({ category, eyebrow, title, intro, image }: {
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
      <Container className="pt-10 sm:pt-12">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="transition-colors hover:text-foreground">Front page</Link></li>
            {belongsToExplore && <><li aria-hidden="true">/</li><li><Link to="/explore" className="transition-colors hover:text-foreground">Explore</Link></li></>}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">{title}</li>
          </ol>
        </nav>
      </Container>

      {image ? (
        <section className="relative isolate mt-5 overflow-hidden bg-ink text-ink-foreground">
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} className="absolute inset-0 size-full object-cover opacity-52" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/68 to-ink/28" />
          <Container className="relative flex min-h-[430px] flex-col justify-end py-14 sm:min-h-[500px] sm:py-20">
            <p className="eyebrow text-ink-foreground/75">{eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-ink-foreground/82">{intro}</p>
          </Container>
        </section>
      ) : (
        <Container className="pb-8 pt-14 sm:pt-20">
          <div className="max-w-4xl border-b border-border pb-10 sm:pb-12">
            <p className="eyebrow text-primary">{eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.98] sm:text-7xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-muted-foreground">{intro}</p>
          </div>
        </Container>
      )}

      {lead && (
        <Section>
          <Container>
            <SectionHeader eyebrow="Featured story" title="This month’s selection" description="A closer look at one story from this section, selected by Texas Defined." />
            <div className="mt-10 max-w-5xl"><ArticleCard article={lead} size="feature" /></div>
          </Container>
        </Section>
      )}

      {destinations.length > 0 && (
        <Section tone="surface">
          <Container>
            <SectionHeader eyebrow="The guide" title={`${title} places worth knowing`} description={`${destinations.length.toLocaleString("en-US")} destinations from across Texas, selected for this section.`} />
            <DestinationCollectionGrid destinations={destinations} regionLabel={regionName} />
          </Container>
        </Section>
      )}

      {others.length > 0 && (
        <Section>
          <Container>
            <SectionHeader eyebrow="More from this section" title="Stories, notes and dispatches" />
            <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {others.map((article) => <li key={article.id}><ArticleCard article={article} /></li>)}
            </ul>
          </Container>
        </Section>
      )}

      {belongsToExplore && <ExploreDiscovery currentCategory={category} categories={categories} regions={regions} />}
    </>
  );
}
