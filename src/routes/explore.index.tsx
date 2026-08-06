import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articlesQuery, categoriesQuery, destinationsQuery, regionsQuery } from "@/data/queries";
import type { Article, Category, Destination, Region } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const EXPLORE_CATEGORIES = [
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
] as const;

const description =
  "Cold rivers, canyon trails, two-lane roads, small-town main streets and barbecue worth waiting for — start with whatever sounds good today.";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/explore`;

export const Route = createFileRoute("/explore/")({
  head: ({ loaderData }: { loaderData?: { categories: Category[]; regions: Region[]; destinations: Destination[]; articles: Article[] } }) => {
    const categories = (loaderData?.categories ?? []).filter((category) =>
      (EXPLORE_CATEGORIES as readonly string[]).includes(category.slug),
    );
    const regions = loaderData?.regions ?? [];
    const destinations = loaderData?.destinations ?? [];
    const articles = loaderData?.articles ?? [];
    const items = [
      ...categories.map((category) => ({
        type: "WebPage" as const,
        name: category.name,
        description: category.description,
        url: `${siteUrl}/explore/${category.slug}`,
        image: category.image?.src,
      })),
      ...regions.map((region) => ({
        type: "WebPage" as const,
        name: `${region.name} Guide`,
        description: region.blurb,
        url: `${siteUrl}/explore/region/${region.id}`,
        image: undefined,
      })),
      ...destinations.map((destination) => ({
        type: "TouristAttraction" as const,
        name: destination.name,
        description: destination.summary,
        url: `${siteUrl}/destination/${destination.slug}`,
        image: destination.hero.src,
      })),
      ...articles.map((article) => ({
        type: "Article" as const,
        name: article.title,
        description: article.dek,
        url: `${siteUrl}/article/${article.slug}`,
        image: article.hero.src,
      })),
    ];
    const itemListElement = items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": item.type,
        name: item.name,
        description: item.description,
        url: item.url,
        image: item.image ? absoluteUrl(texasDefinedBrand, item.image) : undefined,
      },
    }));

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: "/explore",
        title: "Explore Texas",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, "/explore")],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": `${pageUrl}#page`,
                url: pageUrl,
                name: "Explore Texas",
                description,
                isPartOf: { "@id": `${siteUrl}/#website` },
                mainEntity: { "@id": `${pageUrl}#items` },
                breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
              },
              {
                "@type": "ItemList",
                "@id": `${pageUrl}#items`,
                name: "Places, regions and stories worth knowing",
                numberOfItems: itemListElement.length,
                itemListElement,
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${pageUrl}#breadcrumbs`,
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
                  { "@type": "ListItem", position: 2, name: "Explore", item: pageUrl },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  loader: async ({ context }): Promise<{ categories: Category[]; regions: Region[]; destinations: Destination[]; articles: Article[] }> => {
    const [categories, regions, destinations, articles] = await Promise.all([
      context.queryClient.ensureQueryData(categoriesQuery()),
      context.queryClient.ensureQueryData(regionsQuery()),
      context.queryClient.ensureQueryData(destinationsQuery({ featured: true })),
      context.queryClient.ensureQueryData(articlesQuery({ limit: 6 })),
    ]);
    return { categories, regions, destinations, articles };
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
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">Explore</li>
          </ol>
        </nav>
        <p className="eyebrow mt-8 text-primary">Worth the drive</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          Find your next favorite place
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </Container>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Pick a direction"
            title="What sounds good today?"
            description="Choose a spring, national park, cavern, beach, trail, swimming hole, historic place, small town or plate worth planning around."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exploreCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  to="/explore/$category"
                  params={{ category: category.slug }}
                  className="group relative block overflow-hidden border border-border bg-surface"
                >
                  {category.image ? (
                    <img
                      src={category.image.src}
                      alt={category.image.alt}
                      width={category.image.width}
                      height={category.image.height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="aspect-[5/4] w-full bg-gradient-to-br from-primary/25 via-surface to-accent/25" aria-hidden="true" />
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
          <SectionHeader
            eyebrow="Around the state"
            title="Seven ways to see Texas"
            description="Each region has its own landscape, pace and reasons to pull off the highway."
          />
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <li key={region.id} className="border-t border-border pt-4">
                <Link
                  to="/explore/region/$region"
                  params={{ region: region.id }}
                  className="group block"
                >
                  <h3 className="font-display text-xl transition-colors group-hover:text-primary">{region.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{region.blurb}</p>
                  <span className="mt-3 inline-block text-xs font-medium text-primary">See the region →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Editor's picks" title="Places we'd send a friend" />
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
          <SectionHeader eyebrow="From the road" title="Stories to take with you" />
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
