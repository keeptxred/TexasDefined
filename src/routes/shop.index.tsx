import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { CollectionStrip } from "@/components/commerce/CollectionStrip";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articlesQuery, collectionsQuery, productsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Texas-made goods chosen the way we choose stories: cast iron, leather, pantry staples and print — built by makers we can name.";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: "The Shop", description }),
    links: [canonicalLink(texasDefinedBrand, "/shop")],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(collectionsQuery()),
      context.queryClient.ensureQueryData(productsQuery({})),
      context.queryClient.ensureQueryData(articlesQuery({ limit: 3 })),
    ]);
  },
  component: ShopPage,
});

function ShopPage() {
  const brand = useBrand();
  const { data: collections } = useSuspenseQuery(collectionsQuery());
  const { data: products } = useSuspenseQuery(productsQuery({}));
  const { data: articles } = useSuspenseQuery(articlesQuery({ limit: 3 }));

  return (
    <>
      <Container className="pb-6 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">Shop</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          Made here, built to last
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
          {brand.copy.comingSoon} — checkout opens with the full launch
        </p>
      </Container>

      <Section>
        <Container>
          <CollectionStrip collections={collections} />
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader eyebrow="All goods" title="The full shelf" />
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Read first" title="Stories behind the shelf" />
          <ul className="mt-10 grid gap-10 sm:grid-cols-3">
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
