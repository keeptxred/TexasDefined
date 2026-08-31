import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { AQUARIUM_MARINE_SLUGS } from "@/data/aquarium-marine-destinations";
import { destinationsQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/aquariums";
const description = "Plan visits to Texas aquariums, marine-life centers and zoo aquatic exhibits, from Corpus Christi and Galveston to Dallas, Houston, San Antonio, Austin, Lubbock and South Padre Island.";

const collectionNotes = [
  {
    title: "Destination aquariums",
    body: "Texas State Aquarium, Dallas World Aquarium, SEA LIFE locations and other stand-alone attractions are built around an aquarium visit and can anchor a family day.",
  },
  {
    title: "Conservation & research",
    body: "Sea Center Texas, Sea Turtle, Inc. and the UT Marine Science Institute connect public exhibits to fisheries, rehabilitation, coastal science and conservation work.",
  },
  {
    title: "Aquatic exhibits inside zoos",
    body: "Fort Worth Zoo and San Antonio Zoo have current aquatic exhibits. Houston Zoo is included with an explicit correction: the historic Kipp Aquarium closed in 2020.",
  },
] as const;

export const Route = createFileRoute("/explore/aquariums")({
  loader: async ({ context }) => {
    const destinations = await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 }));
    const bySlug = new Map(destinations.map((destination) => [destination.slug, destination]));
    return AQUARIUM_MARINE_SLUGS.flatMap((slug) => {
      const destination = bySlug.get(slug);
      return destination ? [destination] : [];
    });
  },
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const destinations = loaderData ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Aquariums & Marine Life | Texas Defined",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: "Texas Aquariums & Marine Life",
            description,
            mainEntity: { "@id": `${pageUrl}#places` },
          },
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#places`,
            name: "Texas aquariums and marine-life destinations",
            numberOfItems: destinations.length,
            itemListElement: destinations.map((destination, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: destination.name,
              url: absoluteUrl(texasDefinedBrand, `/destination/${destination.slug}`),
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore Texas", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Aquariums & marine life", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: AquariumExplorePage,
});

function AquariumExplorePage() {
  const destinations = Route.useLoaderData();

  return <>
    <Container className="pb-8 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/explore">Explore</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">Aquariums & marine life</span>
      </nav>
      <header className="py-10 sm:py-14">
        <p className="eyebrow text-primary">Aquariums · conservation · coastal science</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas aquariums and marine-life destinations</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">From Gulf Coast conservation centers to downtown aquarium tunnels and aquatic habitats inside major zoos, this collection helps you choose the kind of marine-life day you actually want — then connects each place to its city, county and broader Texas trip.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/explore/trip-planner" className="inline-flex items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Build a Texas trip →</Link>
          <Link to="/explore/beaches-coast" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Explore the Texas coast →</Link>
          <Link to="/browse/counties" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Browse counties →</Link>
        </div>
      </header>
    </Container>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Choose the experience" title="Not every Texas aquarium is the same kind of stop" description="The list deliberately includes traditional aquariums, conservation and research centers, and zoo aquatic exhibits. Current operating details always come from each attraction’s first-party visitor source." />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {collectionNotes.map((note) => <article key={note.title} className="border-t-2 border-foreground pt-5"><h2 className="font-display text-2xl">{note.title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{note.body}</p></article>)}
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow={`${destinations.length} verified guides`} title="Aquariums, marine centers and aquatic zoo exhibits across Texas" description="Each guide includes a current official visitor source, a source-review date, county context and practical planning notes. Hours, prices, encounters and temporary habitat status can change, so verify those details before traveling." />
        <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination, index) => <DestinationCard key={destination.slug} destination={destination} eager={index < 3} />)}
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Important correction" title="Houston Zoo’s Kipp Aquarium is historical, not a current exhibit" description="Kipp Aquarium closed in 2020 as its site was redeveloped for the Galápagos Islands habitat. The Houston Zoo guide keeps the name for historical search clarity while directing visitors to current aquatic habitats instead of an exhibit that no longer exists." />
        <div className="mt-7 flex flex-wrap gap-5 text-sm font-semibold">
          <Link to="/destination/$slug" params={{ slug: "houston-zoo" }} className="border-b border-primary text-primary">Houston Zoo aquatic guide →</Link>
          <Link to="/destination/$slug" params={{ slug: "fort-worth-zoo" }} className="border-b border-primary text-primary">Fort Worth Zoo aquatic exhibits →</Link>
          <Link to="/destination/$slug" params={{ slug: "san-antonio-zoo" }} className="border-b border-primary text-primary">San Antonio Zoo & Friedrich Aquarium →</Link>
        </div>
      </Container>
    </Section>
  </>;
}
