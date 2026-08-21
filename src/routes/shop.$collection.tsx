import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { collectionQuery, productsQuery } from "@/data/queries";
import { shopCollectionGuideFor } from "@/data/shop-collection-guides";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/shop/$collection")({
  loader: async ({ context, params }) => {
    const collection = await context.queryClient.ensureQueryData(collectionQuery(params.collection));
    if (!collection) throw notFound();
    const products = await context.queryClient.ensureQueryData(productsQuery({ collection: params.collection }));
    return { collection, products };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Collection not found | Texas Defined" }, { name: "robots", content: "noindex" }] };
    const canonicalPath = `/shop/${params.collection}`;
    const collectionUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const itemListId = `${collectionUrl}#products`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: loaderData.collection.name, description: loaderData.collection.description, image: loaderData.collection.image.src, imageAlt: loaderData.collection.image.alt }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({ "@context": "https://schema.org", "@graph": [
        { "@type": "CollectionPage", "@id": `${collectionUrl}#page`, url: collectionUrl, name: loaderData.collection.name, description: loaderData.collection.description, image: absoluteUrl(texasDefinedBrand, loaderData.collection.image.src), isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` }, breadcrumb: { "@id": `${collectionUrl}#breadcrumb` }, mainEntity: { "@id": itemListId } },
        { "@type": "BreadcrumbList", "@id": `${collectionUrl}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") }, { "@type": "ListItem", position: 2, name: "Shop", item: absoluteUrl(texasDefinedBrand, "/shop") }, { "@type": "ListItem", position: 3, name: loaderData.collection.name, item: collectionUrl }] },
        { "@type": "ItemList", "@id": itemListId, name: `${loaderData.collection.name} picks`, description: loaderData.collection.description, url: collectionUrl, numberOfItems: loaderData.products.length, itemListElement: loaderData.products.map((product, index) => ({ "@type": "ListItem", position: index + 1, url: `${collectionUrl}#${productAnchor(product.id)}`, item: { "@type": "Product", "@id": `${collectionUrl}#${productAnchor(product.id)}`, name: product.name, description: product.blurb, image: absoluteUrl(texasDefinedBrand, product.image.src), brand: { "@type": "Brand", name: product.maker }, category: loaderData.collection.name, additionalProperty: product.madeInTexas ? [{ "@type": "PropertyValue", name: "Made in Texas", value: true }] : undefined } })) },
      ] })],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Shop collection</p><h1 className="mt-3 font-display text-4xl">That collection has moved on</h1><p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">Browse the current Texas Defined selection instead.</p><Link to="/shop" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Return to the shop →</Link></Container>,
  component: CollectionPage,
});

function CollectionPage() {
  const { collection: slug } = Route.useParams();
  const { data: collection } = useSuspenseQuery(collectionQuery(slug));
  const { data: products } = useSuspenseQuery(productsQuery({ collection: slug }));
  if (!collection) return null;
  const guide = shopCollectionGuideFor(slug);

  return <>
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <img src={collection.image.src} alt={collection.image.alt} width={collection.image.width} height={collection.image.height} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover opacity-62" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/15" />
      <Container className="relative flex min-h-[58vh] flex-col justify-end pb-16 pt-36">
        <p className="eyebrow text-ink-foreground/75">The Texas Defined Shop</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.98] sm:text-7xl">{collection.name}</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-ink-foreground/85">{collection.description}</p>
      </Container>
    </section>

    <Section>
      <Container>
        <SectionHeader eyebrow={collection.tagline || "The collection"} title="Selected for the Texas Defined shop" description="A smaller assortment, chosen to feel at home with the stories and places in the magazine." />
        {products.length > 0 ? <ul className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <li key={product.id} id={productAnchor(product.id)}><ProductCard product={product} /></li>)}</ul> : <div className="mt-10 border-t border-border pt-8"><p className="font-display text-3xl">Nothing in this collection right now.</p><p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">We keep the shop edited rather than filling every shelf. Check the main shop for the current selection.</p></div>}
      </Container>
    </Section>

    {guide ? <>
      <section className="border-y border-border py-14">
        <Container className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Collection notes</p><h2 className="mt-2 font-display text-4xl">Why this collection exists</h2></div>
          <div className="max-w-3xl text-base leading-8 text-muted-foreground"><p>{guide.intro}</p><p className="mt-5">{guide.useItFor}</p></div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">How we choose</p><h2 className="mt-2 font-display text-4xl">What earns a place here</h2></div>
          <div className="grid gap-x-8 md:grid-cols-2">{guide.principles.map((item) => <div key={item.title} className="border-t border-border py-6"><h3 className="font-display text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p></div>)}</div>
        </Container>
      </section>

      <section className="border-y border-border py-14">
        <Container className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Buying checklist</p><h2 className="mt-2 font-display text-4xl">Questions worth asking first</h2></div>
          <ol className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">{guide.checklist.map((item, index) => <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-border pt-3"><span className="font-display text-xl text-primary">{index + 1}</span><span>{item}</span></li>)}</ol>
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Keep reading</p><h2 className="mt-2 font-display text-4xl">The stories behind the shelf</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">{guide.relatedLinks.map((link) => <a key={link.href} href={link.href} className="group border-b border-border py-6 sm:px-5 sm:border-l"><strong className="block font-display text-2xl leading-tight group-hover:text-primary">{link.label}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{link.description}</span><span className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-primary">Read next →</span></a>)}</div>
        </Container>
      </section>
    </> : null}
  </>;
}

function productAnchor(id: string) {
  return `product-${id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}
