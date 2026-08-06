import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import shopFlatlay from "@/assets/shop-flatlay.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { CollectionStrip } from "@/components/commerce/CollectionStrip";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articlesQuery, collectionsQuery, productsQuery } from "@/data/queries";
import type { Article, Collection, Product } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description =
  "Useful, handsome things with a good Texas story behind them — chosen because we'd be glad to keep them ourselves.";

const productAnchor = (id: string) => `product-${id}`;

export const Route = createFileRoute("/shop/")({
  head: ({ loaderData }: { loaderData?: { collections: Collection[]; products: Product[]; articles: Article[] } }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/shop",
      title: "The Shop",
      description,
      image: shopFlatlay,
      imageAlt: "Texas-made goods arranged on a tabletop",
    }),
    links: [canonicalLink(texasDefinedBrand, "/shop")],
    scripts: loaderData
      ? [
          jsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": `${absoluteUrl(texasDefinedBrand, "/shop")}#page`,
                url: absoluteUrl(texasDefinedBrand, "/shop"),
                name: "The Shop",
                description,
                image: absoluteUrl(texasDefinedBrand, shopFlatlay),
                isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
                mainEntity: { "@id": `${absoluteUrl(texasDefinedBrand, "/shop")}#products` },
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${absoluteUrl(texasDefinedBrand, "/shop")}#breadcrumb`,
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Front page",
                    item: absoluteUrl(texasDefinedBrand, "/"),
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Shop",
                    item: absoluteUrl(texasDefinedBrand, "/shop"),
                  },
                ],
              },
              {
                "@type": "ItemList",
                "@id": `${absoluteUrl(texasDefinedBrand, "/shop")}#products`,
                name: "Texas Defined shop picks",
                numberOfItems: loaderData.products.length,
                itemListElement: loaderData.products.map((product, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: `${absoluteUrl(texasDefinedBrand, "/shop")}#${productAnchor(product.id)}`,
                  item: {
                    "@type": "Product",
                    "@id": `${absoluteUrl(texasDefinedBrand, "/shop")}#${productAnchor(product.id)}`,
                    name: product.name,
                    description: product.blurb,
                    image: absoluteUrl(texasDefinedBrand, product.image.src),
                    brand: {
                      "@type": "Brand",
                      name: product.maker,
                    },
                    ...(product.madeInTexas
                      ? {
                          additionalProperty: {
                            "@type": "PropertyValue",
                            name: "Made in Texas",
                            value: true,
                          },
                        }
                      : {}),
                  },
                })),
              },
            ],
          }),
        ]
      : [],
  }),
  loader: async ({ context }): Promise<{ collections: Collection[]; products: Product[]; articles: Article[] }> => {
    const [collections, products, articles] = await Promise.all([
      context.queryClient.ensureQueryData(collectionsQuery()),
      context.queryClient.ensureQueryData(productsQuery({})),
      context.queryClient.ensureQueryData(articlesQuery({ limit: 3 })),
    ]);
    return { collections, products, articles };
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
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          We keep this shelf intentionally small: useful pieces, local makers and goods with a story worth telling.
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
          <SectionHeader eyebrow="Our picks" title="A few things worth bringing home" />
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <li id={productAnchor(product.id)} key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Made here" title="Meet the people and places behind the goods" />
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
