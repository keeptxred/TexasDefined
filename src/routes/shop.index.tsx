import { createFileRoute, Link } from "@tanstack/react-router";

import shopFlatlay from "@/assets/shop-flatlay.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ShopCatalog } from "@/components/commerce/ShopCatalog";
import { Section } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { productsQuery } from "@/data/queries";
import type { Product } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description = "Texas-inspired apparel, gifts and everyday goods selected for the Texas Defined shop.";
const productAnchor = (id: string) => `product-${id}`;

export const Route = createFileRoute("/shop/")({
  head: ({ loaderData }: { loaderData?: { products: Product[] } }) => {
    const shopUrl = absoluteUrl(texasDefinedBrand, "/shop");
    const productListId = `${shopUrl}#products`;
    const breadcrumbId = `${shopUrl}#breadcrumb`;

    return {
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
                  "@id": `${shopUrl}#page`,
                  url: shopUrl,
                  name: "The Texas Defined Shop",
                  description,
                  isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
                  breadcrumb: { "@id": breadcrumbId },
                  mainEntity: { "@id": productListId },
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": breadcrumbId,
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
                    { "@type": "ListItem", position: 2, name: "Shop", item: shopUrl },
                  ],
                },
                {
                  "@type": "ItemList",
                  "@id": productListId,
                  name: "Texas Defined products",
                  numberOfItems: loaderData.products.length,
                  itemListElement: loaderData.products.map((product, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    url: product.productUrl || `${shopUrl}#${productAnchor(product.id)}`,
                    item: {
                      "@type": "Product",
                      "@id": `${shopUrl}#${productAnchor(product.id)}`,
                      name: product.name,
                      description: product.blurb,
                      image: absoluteUrl(texasDefinedBrand, product.image.src),
                      brand: { "@type": "Brand", name: product.maker },
                    },
                  })),
                },
              ],
            }),
          ]
        : [],
    };
  },
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
          <nav aria-label="Breadcrumb" className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-ink-foreground/65">
            <ol className="flex items-center gap-2">
              <li><Link to="/" className="hover:text-ink-foreground">Front page</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Shop</li>
            </ol>
          </nav>
          <p className="eyebrow mt-10 text-ink-foreground/75">The Texas Defined Shop</p>
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
            <ShopCatalog
              products={products}
              renderProduct={(product) => (
                <li id={productAnchor(product.id)} key={product.id}>
                  <ProductCard product={product} />
                </li>
              )}
            />
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

      <section className="border-y border-border py-14">
        <Container className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Why we have a shop</p>
            <h2 className="mt-2 font-display text-4xl">The store should feel like the magazine</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>Texas Defined covers the things that make living here specific: the road trips, state parks, barbecue counters, native plants, home projects, weather, small towns, outdoor weekends and everyday objects that pick up a Texas identity because people actually use them. The shop follows the same rule. We would rather carry a smaller assortment tied to those stories than fill a catalog with generic merchandise that happens to have the state outline printed on it.</p>
            <p>That means a product has to make sense outside a product photo. Outdoor pieces should survive outdoor use. Home goods should still look good after bluebonnet season. Barbecue tools should solve a real pit problem. Apparel and gifts should feel specific enough to Texas to be recognizable without becoming a costume. When a live product comes from the shared catalog, the product page is where pricing, variants, availability and checkout details belong; this page explains the editorial logic behind the assortment.</p>
          </div>
        </Container>
      </section>

      <section className="border-y border-border py-14">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">What we look for</p>
            <h2 className="mt-2 font-display text-4xl">Useful beats themed</h2>
            <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
              <Rule title="A real job">The item should solve a problem, support a hobby, improve a trip, make a home more useful or carry a story that still matters when the novelty wears off.</Rule>
              <Rule title="Clear origin claims">If something is described as Texas-made, Texas-designed or connected to a Texas maker, that claim should be specific enough to understand. “Texas inspired” and “made in Texas” are not the same thing.</Rule>
              <Rule title="Materials that fit the use">A camp item should tolerate camp life. A kitchen piece should make sense around food. A garden product should fit Texas conditions. We prefer understandable materials and straightforward care over a long feature list.</Rule>
              <Rule title="A reason to link it to the site">The best products have a natural home beside an article or guide. A bluebonnet piece belongs with wildflower coverage; pit gear belongs with barbecue; camping equipment belongs with state parks and road trips.</Rule>
            </div>
          </div>
          <div>
            <p className="eyebrow text-primary">Before you buy</p>
            <h2 className="mt-2 font-display text-4xl">Use the product details, not the mood</h2>
            <ol className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
              <Step number="1">Check the current product page for sizes, variants, colors, materials, availability and the exact item being sold. Editorial photography and collection imagery can set context but should not replace product specifications.</Step>
              <Step number="2">For gifts, verify dimensions and use. A print, mug, shirt, seed product and piece of camp gear can all look similarly sized on a screen and be completely different purchases in real life.</Step>
              <Step number="3">For Texas-made or maker-specific goods, read the origin description carefully. We separate the story of the design from manufacturing claims whenever the catalog provides that detail.</Step>
              <Step number="4">For outdoor, food or garden products, use the relevant Texas Defined guide and official safety or planting source when the purchase depends on conditions, regulations or region—not only on the product description.</Step>
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Keep exploring</p><h2 className="mt-2 font-display text-4xl">The Texas behind the products</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            <StoryLink href="/best-places-to-go-camping-in-texas" title="Best places to camp in Texas">Start with the campsite before deciding what deserves space in the gear bin.</StoryLink>
            <StoryLink href="/article/bluebonnet-season-field-guide" title="Chasing bluebonnet season">The practical field guide behind the Wildflower House collection.</StoryLink>
            <StoryLink href="/article/what-defines-texas-barbecue" title="What defines Texas barbecue">The smoke, patience and butcher-paper culture behind Smoke & Salt.</StoryLink>
          </div>
        </Container>
      </section>
    </>
  );
}

function Rule({ title, children }: { title: string; children: React.ReactNode }) { return <div className="border-t border-border pt-4"><h3 className="font-display text-2xl text-foreground">{title}</h3><p className="mt-2">{children}</p></div>; }
function Step({ number, children }: { number: string; children: React.ReactNode }) { return <li className="grid grid-cols-[2rem_1fr] gap-3 border-t border-border pt-3"><span className="font-display text-xl text-primary">{number}</span><span>{children}</span></li>; }
function StoryLink({ href, title, children }: { href: string; title: string; children: React.ReactNode }) { return <a href={href} className="group border-b border-border py-6 sm:px-5 sm:border-l"><strong className="block font-display text-2xl group-hover:text-primary">{title}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{children}</span><span className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-primary">Read next →</span></a>; }
