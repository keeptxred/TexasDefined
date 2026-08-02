import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { collectionQuery, productsQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/shop/$collection")({
  loader: async ({ context, params }) => {
    const collection = await context.queryClient.ensureQueryData(
      collectionQuery(params.collection),
    );
    if (!collection) throw notFound();
    await context.queryClient.ensureQueryData(productsQuery({ collection: params.collection }));
    return { collection };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: loaderData.collection.name,
        description: loaderData.collection.description,
      }),
      links: [canonicalLink(texasDefinedBrand, `/shop/${params.collection}`)],
    };
  },
  notFoundComponent: () => (
    <Container className="py-24">
      <h1 className="font-display text-3xl">That collection isn't stocked</h1>
    </Container>
  ),
  component: CollectionPage,
});

function CollectionPage() {
  const { collection: slug } = Route.useParams();
  const { data: collection } = useSuspenseQuery(collectionQuery(slug));
  const { data: products } = useSuspenseQuery(productsQuery({ collection: slug }));

  if (!collection) return null;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={collection.image.src}
          alt={collection.image.alt}
          width={collection.image.width}
          height={collection.image.height}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-ink/30" />
        <Container className="relative py-24 sm:py-32">
          <p className="eyebrow text-ink-foreground/80">Collection</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-6xl">
            {collection.name}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-foreground/85">
            {collection.description}
          </p>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeader eyebrow={collection.tagline} title="In this collection" />
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
