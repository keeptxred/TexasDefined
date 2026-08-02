import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articlesQuery, categoriesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const EXPLORE_CATEGORIES = [
  "lakes-rivers",
  "state-parks",
  "road-trips",
  "small-towns",
  "food-bbq",
  "outdoors",
] as const;

const description =
  "Lakes and rivers, state parks, road trips, small towns, barbecue and the wild outdoors — the places that define Texas, mapped by region.";

export const Route = createFileRoute("/explore/")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: "Explore Texas", description }),
    links: [canonicalLink(texasDefinedBrand, "/explore")],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(categoriesQuery()),
      context.queryClient.ensureQueryData(regionsQuery()),
      context.queryClient.ensureQueryData(destinationsQuery({ featured: true })),
      context.queryClient.ensureQueryData(articlesQuery({ limit: 6 })),
    ]);
  },
  component: ExplorePage,
});

function ExplorePage() {
  const { data: categories } = useSuspenseQuery(categoriesQuery());
  const { data: regions } = useSuspenseQuery(regionsQuery());
  const { data: destinations } = useSuspenseQuery(destinationsQuery({ featured: true }));
  const { data: articles } = useSuspenseQuery(articlesQuery({ limit: 6 }));

  const exploreCategories = categories.filter((category) =>
    (EXPLORE_CATEGORIES as readonly string[]).includes(category.slug),
  );

  return (
    <>
      <Container className="pb-6 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">Explore</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          268,596 square miles. Start somewhere.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </Container>

      <Section>
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exploreCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  to="/explore/$category"
                  params={{ category: category.slug }}
                  className="group relative block overflow-hidden"
                >
                  {category.image && (
                    <img
                      src={category.image.src}
                      alt={category.image.alt}
                      width={category.image.width}
                      height={category.image.height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground">
                    <p className="eyebrow opacity-80">{category.eyebrow}</p>
                    <h2 className="mt-1 font-display text-2xl">{category.name}</h2>
                    <p className="mt-2 text-sm text-ink-foreground/80">{category.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader eyebrow="Regions" title="Seven Texases" />
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <li key={region.id} className="border-t border-border pt-4">
                <h3 className="font-display text-xl">{region.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{region.blurb}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Featured places" title="Worth the tank of gas" />
          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <li key={destination.id}>
                <DestinationCard
                  destination={destination}
                  regionLabel={regions.find((r) => r.id === destination.region)?.name}
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader eyebrow="Reading" title="Dispatches from the road" />
          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.id}>
                <ArticleCard article={article} size="compact" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
