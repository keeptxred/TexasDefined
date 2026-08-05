import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CollectionStrip } from "@/components/commerce/CollectionStrip";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articlesQuery, collectionsQuery, productsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Useful, handsome things with a good Texas story behind them — chosen because we'd be glad to keep them ourselves.";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/shop",
      title: "The Shop",
      description,
    }),
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
  const { data: collections } = useSuspenseQuery(collectionsQuery());
  const { data: products } = useSuspenseQuery(productsQuery({}));
  const { data: articles } = useSuspenseQuery(articlesQuery({ limit: 3 }));

  return (
    <>
      <Container className="pb-6 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">Made here</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          Things we'd actually buy
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          The shop is almost ready. We're giving every item one last look before opening the doors.
        </p>
      </Container>

      <Section>
        <Container>
          <SectionHeader eyebrow="Shop by story" title="Start with what catches your eye" />
          <div className="mt-10">
            <CollectionStrip collections={collections} />
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader eyebrow="Our picks" title="Everything on the shelf" />
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
          <SectionHeader eyebrow="Made here" title="Meet the stories behind the goods" />
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
