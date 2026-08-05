import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DestinationCard } from "@/components/editorial/DestinationCard";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { fetchExploreDestinations } from "@/data/explore-remote";
import { regionsQuery } from "@/data/queries";
import type { TexasRegion } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/region/$region")({
  loader: async ({ context, params }) => {
    const regions = await context.queryClient.ensureQueryData(regionsQuery());
    const region = regions.find((item) => item.id === params.region);
    if (!region) throw notFound();

    let destinations = [] as Awaited<ReturnType<typeof fetchExploreDestinations>>;
    try {
      const allDestinations = await fetchExploreDestinations({ limit: 5000 });
      destinations = allDestinations.filter((destination) => destination.region === region.id);
    } catch (error) {
      console.error("Regional Explore page could not load the remote destination catalog", error);
    }

    return { region, destinations };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Region not found" }, { name: "robots", content: "noindex" }] };
    const canonicalPath = `/explore/region/${params.region}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${loaderData.region.name} Travel Guide`,
        description: `${loaderData.region.blurb} Browse parks, lakes, towns, historic places and other destinations across ${loaderData.region.name}.`,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": `${pageUrl}#page`,
                url: pageUrl,
                name: `${loaderData.region.name} Travel Guide`,
                description: loaderData.region.blurb,
                mainEntity: { "@id": `${pageUrl}#destinations` },
              },
              {
                "@type": "ItemList",
                "@id": `${pageUrl}#destinations`,
                numberOfItems: loaderData.destinations.length,
                itemListElement: loaderData.destinations.map((destination, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "TouristAttraction",
                    name: destination.name,
                    url: absoluteUrl(texasDefinedBrand, `/destination/${destination.slug}`),
                    description: destination.summary,
                  },
                })),
              },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <Container className="py-24">
      <p className="eyebrow text-primary">Another direction</p>
      <h1 className="mt-3 font-display text-3xl">We haven’t mapped that Texas region</h1>
      <Link to="/explore" className="mt-5 inline-block text-primary underline">Return to Explore</Link>
    </Container>
  ),
  component: RegionPage,
});

function RegionPage() {
  const { region, destinations } = Route.useLoaderData();

  return (
    <>
      <Container className="pb-8 pt-16 sm:pt-24">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link to="/explore" className="hover:text-foreground">Explore</Link> / {region.name}
        </nav>
        <p className="eyebrow mt-8 text-primary">Around the state</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">Explore {region.name}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{region.blurb}</p>
      </Container>

      <Container className="pb-20">
        <SectionHeader
          eyebrow={`${destinations.length} places`}
          title={`Where to go in ${region.name}`}
          description="Browse the shared Texas destination catalog by region, then open any place for planning details, highlights and nearby ideas."
        />
        {destinations.length ? (
          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <li key={destination.id}>
                <DestinationCard destination={destination} regionLabel={region.name} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 border border-border p-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              The shared destination catalog is temporarily unavailable. Browse all of <Link to="/explore" className="text-primary underline">Explore Texas</Link> instead.
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
