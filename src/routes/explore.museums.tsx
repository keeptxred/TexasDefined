import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Container } from "@/components/layout/Container";
import { museumCollectionDestinations } from "@/data/museum-collection";
import { destinationsQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/museums";
const description = "Explore source-checked museums across Texas, including art, science, history, presidential, military, children's and specialty museums plus interpreted historic-house and cultural museum sites.";

export const Route = createFileRoute(canonicalPath)({
  loader: async ({ context }) => {
    const destinations = await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 }));
    return museumCollectionDestinations(destinations);
  },
  head: ({ loaderData }) => {
    const museums = loaderData ?? [];
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Museums | Art, Science, History & Cultural Museums",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#collection`,
            url: pageUrl,
            name: "Texas Museums",
            description,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
            mainEntity: { "@id": `${pageUrl}#museums` },
          },
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#museums`,
            name: "Texas museum destination guides",
            numberOfItems: museums.length,
            itemListElement: museums.map((museum, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "TouristAttraction",
                name: museum.name,
                description: museum.summary,
                url: absoluteUrl(texasDefinedBrand, `/destination/${museum.slug}`),
                image: absoluteUrl(texasDefinedBrand, museum.hero.src),
                sameAs: museum.officialUrl || undefined,
                address: museum.address ? {
                  "@type": "PostalAddress",
                  streetAddress: museum.address,
                  addressRegion: "TX",
                  addressCountry: "US",
                } : undefined,
              },
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore Texas", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Texas Museums", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: TexasMuseumsPage,
});

function TexasMuseumsPage() {
  const museums = Route.useLoaderData();
  const cityCount = new Set(museums.map((museum) => museum.nearestTown).filter(Boolean)).size;

  return <main>
    <section className="border-b border-border bg-ink text-ink-foreground">
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.14em] text-ink-foreground/60">
          <Link to="/" className="hover:text-white">Front page</Link><span aria-hidden className="mx-2">/</span><Link to="/explore" className="hover:text-white">Explore</Link><span aria-hidden className="mx-2">/</span><span aria-current="page" className="text-white">Museums</span>
        </nav>
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
          <div>
            <p className="eyebrow text-ink-foreground/65">Texas culture · source-checked destination guides</p>
            <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Museums across Texas</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Plan museum days around art, natural science, Texas history, presidential archives, military collections, children’s discovery spaces, specialty museums and interpreted historic sites. Every destination below is drawn from the same source-reviewed catalog used by TexasDefined’s canonical destination pages.</p>
          </div>
          <div className="border-t border-ink-foreground/25 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="eyebrow text-ink-foreground/60">Current collection</p>
            <p className="mt-3 font-display text-6xl">{museums.length}</p>
            <p className="mt-2 text-sm leading-6 text-ink-foreground/70">museum and interpreted museum-site guides across {cityCount} Texas communities</p>
          </div>
        </div>
      </Container>
    </section>

    <Container className="py-12 sm:py-16">
      <section className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <p className="eyebrow text-primary">How to use this collection</p>
          <h2 className="mt-3 font-display text-4xl">Choose the museum first, then build the day around it</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">Museum hours, admission, timed-entry rules and temporary exhibitions change. Each destination guide points back to its controlling visitor source and records when that source was reviewed. Use the museum as the anchor, then add nearby neighborhoods, food, parks and other cultural stops.</p>
        </div>
        <div className="space-y-3 border-l border-border pl-6 text-sm">
          <Link to="/explore/historic-sites" className="block border-b border-primary pb-1 text-primary">Historic Sites & Museums →</Link>
          <Link to="/explore/top-attractions" className="block border-b border-primary pb-1 text-primary">Top Texas attractions →</Link>
          <Link to="/explore/trip-planner" className="block border-b border-primary pb-1 text-primary">Build a Texas trip →</Link>
        </div>
      </section>

      <section className="pt-12" aria-labelledby="museum-guides">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow text-primary">Browse the collection</p><h2 id="museum-guides" className="mt-2 font-display text-4xl">Texas museum destination guides</h2></div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">Sorted by community, then museum name. New source-checked museum guides appear here automatically as the destination catalog expands.</p>
        </div>
        {museums.length ? <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{museums.map((museum, index) => <DestinationCard key={museum.slug} destination={museum} eager={index < 3} />)}</div> : <p className="mt-8 text-muted-foreground">No museum guides are currently available.</p>}
      </section>
    </Container>
  </main>;
}
