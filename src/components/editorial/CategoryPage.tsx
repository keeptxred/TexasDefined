import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { AnswerSummary } from "@/components/content/AnswerSummary";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCollectionGrid } from "@/components/editorial/DestinationCollectionGrid";
import { ExploreDiscovery } from "@/components/editorial/ExploreDiscovery";
import { TexasLifeDiscovery } from "@/components/editorial/TexasLifeDiscovery";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articlesQuery, categoriesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { CategorySlug, ImageRef } from "@/data/types";

const TEXAS_LIFE_DEPARTMENTS = new Set<CategorySlug>([
  "sports",
  "moving-to-texas",
  "real-estate",
  "home-garden",
  "texas-history",
]);

function CategoryBreadcrumb({ belongsToExplore, belongsToTexasLife, current, inverse = false }: { belongsToExplore: boolean; belongsToTexasLife: boolean; current: string; inverse?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[0.72rem] font-medium uppercase tracking-[0.12em] ${inverse ? "text-ink-foreground/65" : "text-muted-foreground"}`}>
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link to="/" className={inverse ? "transition-colors hover:text-ink-foreground" : "transition-colors hover:text-foreground"}>Front page</Link></li>
        {belongsToExplore && <><li aria-hidden="true">/</li><li><Link to="/explore" className={inverse ? "transition-colors hover:text-ink-foreground" : "transition-colors hover:text-foreground"}>Explore</Link></li></>}
        {belongsToTexasLife && <><li aria-hidden="true">/</li><li><Link to="/texas-living" className={inverse ? "transition-colors hover:text-ink-foreground" : "transition-colors hover:text-foreground"}>Texas Life</Link></li></>}
        <li aria-hidden="true">/</li>
        <li aria-current="page" className={inverse ? "text-ink-foreground" : "text-foreground"}>{current}</li>
      </ol>
    </nav>
  );
}

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
  const belongsToTexasLife = TEXAS_LIFE_DEPARTMENTS.has(category);
  const belongsToExplore = !belongsToTexasLife;
  const answerItems = [
    {
      question: `What is this ${belongsToExplore ? "Texas guide" : "section"} about?`,
      answer: intro,
    },
    ...(destinations.length > 0 ? [{
      question: "What can I explore here?",
      answer: `${destinations.length.toLocaleString("en-US")} places are currently mapped in this section of the Texas Defined guide.`,
    }] : []),
    ...(articles.length > 0 ? [{
      question: "What can I read here?",
      answer: `${articles.length.toLocaleString("en-US")} editorial ${articles.length === 1 ? "story is" : "stories are"} currently available, including practical guides and deeper features.`,
    }] : []),
    ...(belongsToExplore ? [{
      question: "How should I use this page?",
      answer: "Start with the mapped places, then use the related stories and regional links to narrow down where to go and what to know before the trip.",
    }] : [{
      question: "How should I use this page?",
      answer: "Use the featured stories and practical links as a starting point, then move into the related Texas Life guides for more specific planning.",
    }]),
  ];

  return (
    <>
      {image ? (
        <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} className="absolute inset-0 size-full object-cover opacity-52" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/68 to-ink/28" />
          <Container className="relative flex min-h-[480px] flex-col justify-end py-14 sm:min-h-[540px] sm:py-20">
            <CategoryBreadcrumb belongsToExplore={belongsToExplore} belongsToTexasLife={belongsToTexasLife} current={eyebrow} inverse />
            <p className="eyebrow mt-10 text-ink-foreground/75">{eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-ink-foreground/82">{intro}</p>
          </Container>
        </section>
      ) : (
        <section className="border-b border-border">
          <Container className="pb-12 pt-16 sm:pb-14 sm:pt-24">
            <CategoryBreadcrumb belongsToExplore={belongsToExplore} belongsToTexasLife={belongsToTexasLife} current={eyebrow} />
            <div className="mt-10 max-w-5xl border-t border-border pt-8">
              <p className="eyebrow text-primary">{eyebrow}</p>
              <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{title}</h1>
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-muted-foreground">{intro}</p>
            </div>
          </Container>
        </section>
      )}

      <AnswerSummary
        eyebrow="At a glance"
        title={`What to know about ${eyebrow}`}
        items={answerItems}
      />

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
            <SectionHeader eyebrow="The field guide" title={`${eyebrow}, mapped`} description={`${destinations.length.toLocaleString("en-US")} places in the Texas Defined guide, with the details you need to choose where to go next.`} />
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
      {belongsToTexasLife && <TexasLifeDiscovery currentCategory={category} />}
    </>
  );
}
