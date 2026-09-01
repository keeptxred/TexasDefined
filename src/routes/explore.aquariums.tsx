import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { aquariumMarineCollectionDestinations } from "@/data/aquarium-marine-collection";
import { destinationsQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/aquariums";
const description = "Browse source-checked Texas aquarium, marine-life, coastal-science and aquatic zoo destination guides with current official visitor sources.";

export const Route = createFileRoute(canonicalPath)({
  loader: async ({ context }) => aquariumMarineCollectionDestinations(
    await context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })),
  ),
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const destinations = loaderData ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Aquariums & Marine Life | Texas Defined", description }),
      links: [
        canonicalLink(texasDefinedBrand, canonicalPath),
        { rel: "alternate", type: "application/json", href: "/aquariums.json", title: "Texas Aquariums & Marine Life machine-readable collection" },
      ],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: "Texas Aquariums & Marine Life",
        description,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: destinations.length,
          itemListElement: destinations.map((destination, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: destination.name,
            url: absoluteUrl(texasDefinedBrand, `/destination/${destination.slug}`),
          })),
        },
      })],
    };
  },
  component: TexasAquariumsPage,
});

function TexasAquariumsPage() {
  const destinations = Route.useLoaderData();
  return <main>
    <Container className="py-14 sm:py-20">
      <p className="eyebrow text-primary">Aquariums · conservation · coastal science</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas aquariums &amp; marine life</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{description} The collection separates destination aquariums, conservation and research centers, and aquatic exhibits inside major zoos so visitors know what kind of experience they are planning.</p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <Link to="/explore" className="border-b border-primary pb-1 text-primary">Explore Texas</Link>
        <Link to="/explore/beaches-coast" className="border-b border-primary pb-1 text-primary">Texas coast</Link>
        <Link to="/browse/counties" className="border-b border-primary pb-1 text-primary">Browse counties</Link>
      </div>
      <section className="mt-12 border-t border-border pt-8" aria-labelledby="aquarium-guides">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="aquarium-guides" className="font-display text-3xl">{destinations.length} aquarium and marine-life guides</h2>
          <p className="text-sm text-muted-foreground">First-party visitor sources reviewed August 30, 2026</p>
        </div>
        <ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => <li key={destination.slug} className="border-t border-border py-4">
            <Link to="/destination/$slug" params={{ slug: destination.slug }} className="font-semibold text-foreground hover:text-primary">{destination.name}</Link>
            <p className="mt-1 text-sm text-muted-foreground">{destination.nearestTown} · {destination.county} County</p>
          </li>)}
        </ul>
      </section>
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-3xl">Houston Zoo Kipp Aquarium correction</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Houston Zoo’s historic Kipp Aquarium closed in 2020. The Houston Zoo guide preserves that name for search clarity but directs visitors to current aquatic habitats, including the Galápagos Islands experience.</p>
      </section>
    </Container>
  </main>;
}
