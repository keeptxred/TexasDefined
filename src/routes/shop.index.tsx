import { createFileRoute } from "@tanstack/react-router";

import shopFlatlay from "@/assets/shop-flatlay.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Section } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { productsQuery } from "@/data/queries";
import type { Product } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description = "Texas-inspired apparel, gifts and everyday goods selected for the Texas Defined shop.";
const productAnchor = (id: string) => `product-${id}`;

export const Route = createFileRoute("/shop/")({
  head: ({ loaderData }: { loaderData?: { products: Product[] } }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/shop",
      title: "The Texas Defined Shop",
      description,
      image: shopFlatlay,
      imageAlt: "Texas-inspired goods arranged on a tabletop",
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
                name: "The Texas Defined Shop",
                description,
                isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
                mainEntity: { "@id": `${absoluteUrl(texasDefinedBrand, "/shop")}#products` },
              },
              {
                "@type": "ItemList",
                "@id": `${absoluteUrl(texasDefinedBrand, "/shop")}#products`,
                name: "Texas Defined products",
                numberOfItems: loaderData.products.length,
                itemListElement: loaderData.products.map((product, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  url: product.productUrl || `${absoluteUrl(texasDefinedBrand, "/shop")}#${productAnchor(product.id)}`,
                  item: {
                    "@type": "Product",
                    name: product.name,
                    description: product.blurb,
                    image: product.image.src,
                    brand: { "@type": "Brand", name: product.maker },
                    offers: {
                      "@type": "Offer",
                      priceCurrency: product.currency,
                      price: (product.priceCents / 100).toFixed(2),
                      availability: "https://schema.org/InStock",
                      url: product.productUrl || absoluteUrl(texasDefinedBrand, "/shop"),
                    },
                  },
                })),
              },
            ],
          }),
        ]
      : [],
  }),
  loader: async ({ context }): Promise<{ products: Product[] }> => {
    const products = await context.queryClient.ensureQueryData(productsQuery({}));
    return { products };
  },
  component: ShopPage,
});

function ShopPage() {
  const { products } = Route.useLoaderData();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={shopFlatlay}
          alt="Texas-inspired goods arranged on a tabletop"
          width={1600}
          height={1067}
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/30" />
        <Container className="relative py-24 sm:py-32">
          <p className="eyebrow text-ink-foreground/75">The Texas Defined Shop</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.98] sm:text-7xl">
            Texas style, thoughtfully selected.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink-foreground/85">{description}</p>
        </Container>
      </section>

      <Section tone="surface">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
            <div>
              <p className="eyebrow text-primary">The collection</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">Shop Texas Defined</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </p>
          </div>

          {products.length > 0 ? (
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <li id={productAnchor(product.id)} key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 border-y border-border py-12 text-center">
              <h2 className="font-display text-3xl">The collection is being curated</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Selected Texas Defined products will appear here as they are added to the shared catalog.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
