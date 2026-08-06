import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import shopFlatlay from "@/assets/shop-flatlay.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Section } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { productsQuery } from "@/data/queries";
import type { Product } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description =
  "Shop Texas-inspired apparel, gifts and everyday goods selected for Texas Defined.";

const productAnchor = (id: string) => `product-${id}`;

export const Route = createFileRoute("/shop/")({
  head: ({ loaderData }: { loaderData?: { products: Product[] } }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/shop",
      title: "Texas Defined Shop",
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
                name: "Texas Defined Shop",
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
  const { data: products } = useSuspenseQuery(productsQuery({}));

  return (
    <>
      <Container className="pb-10 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">Texas Defined Shop</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">
          Wear it. Gift it. Keep Texas close.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </Container>

      <Section tone="surface">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-primary">Shop all</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">Texas goods selected for you</h2>
            </div>
            <p className="text-sm font-semibold text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"}
            </p>
          </div>

          {products.length > 0 ? (
            <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <li id={productAnchor(product.id)} key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 border border-border bg-background p-10 text-center">
              <h2 className="font-display text-2xl">Products are being selected</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                The Texas Defined catalog is connected. Products will appear here as soon as they are assigned to TexasDefined in the shared Store Catalog.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
