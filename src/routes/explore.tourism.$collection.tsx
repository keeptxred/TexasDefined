import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { CURATED_TOURISM_COLLECTIONS, getCuratedTourismCollection } from "@/data/curated-tourism-collections";
import { getDestinationsBySlugs } from "@/data/destination-collections.functions";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/explore/tourism/$collection")({
  loader: async ({ params }) => {
    const collection = getCuratedTourismCollection(params.collection);
    if (!collection) throw notFound();

    // Resolve canonical destination records at runtime; never invent an internal
    // destination URL or duplicate an existing authority page.
    const slugs = collection.items.flatMap((item) =>
      "destinationSlug" in item ? [item.destinationSlug] : [],
    );
    const existing = slugs.length
      ? await getDestinationsBySlugs({ data: { slugs } })
      : [];

    return {
      collection,
      existing: existing.map((destination) => ({
        slug: destination.slug,
        name: destination.name,
        hero: destination.hero,
      })),
    };
  },
  head: ({ params }) => {
    const collection = getCuratedTourismCollection(params.collection);
    if (!collection) return {};
    const canonicalPath = `/explore/tourism/${collection.slug}`;
    const description = `${collection.intro} Compare ${collection.items.length} carefully selected Texas destinations with official visitor links and nearby county guides.`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: collection.title,
        description: description.slice(0, 285),
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: collection.title,
        description: collection.intro,
        url: absoluteUrl(texasDefinedBrand, canonicalPath),
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: collection.items.length,
          itemListElement: collection.items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: item.officialUrl,
          })),
        },
      })],
    };
  },
  component: TourismCollectionPage,
});

function TourismCollectionPage() {
  const { collection, existing } = Route.useLoaderData();
  const related = CURATED_TOURISM_COLLECTIONS.filter((item) => item.slug !== collection.slug);

  return (
    <main>
      <section className="border-b border-border bg-surface">
        <Container className="py-12 sm:py-20">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/explore" className="hover:text-primary">Explore Texas</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{collection.title}</span>
          </nav>
          <p className="eyebrow mt-9 text-primary">{collection.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-tight sm:text-6xl">{collection.title}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{collection.intro}</p>
          <p className="mt-6 max-w-4xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">How we chose these places: </strong>{collection.selection}</p>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <section aria-labelledby="curated-destinations">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-foreground pb-6">
            <div>
              <p className="eyebrow text-primary">Focused statewide shortlist</p>
              <h2 id="curated-destinations" className="mt-3 font-display text-3xl sm:text-4xl">{collection.items.length} places worth considering</h2>
            </div>
            <p className="text-xs text-muted-foreground">Official operator sites reviewed October 19, 2026</p>
          </div>
          <ol className="mt-10 grid gap-10 lg:grid-cols-2">
            {collection.items.map((item, index) => {
              const destinationSlug = "destinationSlug" in item ? item.destinationSlug : undefined;
              const match = destinationSlug
                ? existing.find((destination) => destination.slug === destinationSlug && destination.name.toLowerCase() === item.name.toLowerCase())
                : undefined;
              return (
                <li key={item.name} className="border-t border-border pt-5">
                  <p className="eyebrow text-muted-foreground">Stop {index + 1} · {item.town}</p>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl">{item.name}</h3>
                  {match?.hero?.src && !match.hero.src.includes("placeholder") ? (
                    <figure className="mt-5 overflow-hidden bg-surface">
                      <img src={match.hero.src} alt={match.hero.alt} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
                      {match.hero.credit ? <figcaption className="px-1 pt-2 text-xs text-muted-foreground">Photo: {match.hero.credit}</figcaption> : null}
                    </figure>
                  ) : null}
                  <p className="mt-4 text-base leading-7">{item.why}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Before you go: </strong>{item.plan}</p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                    {match ? <Link to="/destination/$slug" params={{ slug: match.slug }} className="text-primary underline underline-offset-4">Texas Defined destination guide</Link> : null}
                    <a href={item.officialUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Official visitor information ↗</a>
                    <a href={`/county/${item.countySlug}`} className="underline underline-offset-4">Explore the county</a>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mt-16 border-t-2 border-foreground pt-8">
          <p className="eyebrow text-primary">Practical travel planning</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">What to check before you book</h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {collection.tips.map((tip) => (
              <li key={tip} className="border-t border-border pt-4 text-sm leading-7 text-muted-foreground">{tip}</li>
            ))}
          </ul>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-muted-foreground">Listings are editorial, not paid placements or booking guarantees. Prices, accessibility, activities and availability can change. The operator's site controls current visitor information.</p>
        </section>

        <section className="mt-16 border-t-2 border-foreground pt-8">
          <p className="eyebrow text-primary">More Texas experiences</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Explore another curated collection</h2>
          <ul className="mt-7 grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug} className="border border-border p-5">
                <Link to="/explore/tourism/$collection" params={{ collection: item.slug }} className="font-display text-xl hover:text-primary">{item.title} →</Link>
                <p className="mt-2 text-sm text-muted-foreground">{item.items.length} selectively chosen destinations</p>
              </li>
            ))}
          </ul>
          <Link to="/explore" className="mt-9 inline-block border-b border-primary text-sm font-semibold text-primary">Return to Explore Texas →</Link>
        </section>
      </Container>
    </main>
  );
}
