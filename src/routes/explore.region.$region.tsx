import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { RegionalDestinationGrid } from "@/components/editorial/RegionalDestinationGrid";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { destinations as fixtureDestinations } from "@/data/fixtures/texas";
import { fetchExploreDestinations } from "@/data/explore-remote";
import { regionsQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/region/$region")({
  loader: async ({ context, params }) => {
    const regions = await context.queryClient.ensureQueryData(regionsQuery());
    const region = regions.find((item) => item.id === params.region);
    if (!region) throw notFound();

    let destinations = fixtureDestinations.filter((destination) => destination.region === region.id);
    try {
      const remoteDestinations = await fetchExploreDestinations({ limit: 5000 });
      const matchingDestinations = remoteDestinations.filter((destination) => destination.region === region.id);
      if (matchingDestinations.length) destinations = matchingDestinations;
    } catch (error) {
      console.error("Regional Explore page could not load the remote destination catalog", error);
    }

    return { region, destinations };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Region not found" }, { name: "robots", content: "noindex" }] };
    const canonicalPath = `/explore/region/${params.region}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const title = `${loaderData.region.name} Travel Guide`;
    const description = `${loaderData.region.blurb} Browse parks, lakes, towns, historic places and other destinations across ${loaderData.region.name}.`;
    const primaryImage = loaderData.destinations.find((destination) => destination.hero?.src)?.hero;
    const imageId = `${pageUrl}#primaryimage`;
    const graph = [
      {
        "@type": "CollectionPage",
        "@id": pageUrl,
        url: pageUrl,
        name: title,
        description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${pageUrl}#destinations` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
        ...(primaryImage ? { primaryImageOfPage: { "@id": imageId }, image: { "@id": imageId } } : {}),
      },
      ...(primaryImage
        ? [{
            "@type": "ImageObject",
            "@id": imageId,
            url: absoluteUrl(texasDefinedBrand, primaryImage.src),
            caption: primaryImage.alt,
            width: primaryImage.width,
            height: primaryImage.height,
          }]
        : []),
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#destinations`,
        name: `Places to explore in ${loaderData.region.name}`,
        url: pageUrl,
        numberOfItems: loaderData.destinations.length,
        itemListElement: loaderData.destinations.map((destination, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "TouristAttraction",
            "@id": `${siteUrl}/destination/${destination.slug}#attraction`,
            name: destination.name,
            url: `${siteUrl}/destination/${destination.slug}`,
            description: destination.summary,
            image: absoluteUrl(texasDefinedBrand, destination.hero.src),
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
          { "@type": "ListItem", position: 3, name: loaderData.region.name, item: pageUrl },
        ],
      },
    ];

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title,
        description,
        image: primaryImage?.src,
        imageAlt: primaryImage?.alt,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }],
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
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">{region.name}</li>
          </ol>
        </nav>
        <p className="eyebrow mt-8 text-primary">Around the state</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">Explore {region.name}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{region.blurb}</p>
      </Container>

      <Container className="pb-20">
        <SectionHeader
          eyebrow={`${destinations.length.toLocaleString("en-US")} places`}
          title={`Where to go in ${region.name}`}
          description="Browse the shared Texas destination catalog by region, then open any place for planning details, highlights and nearby ideas."
        />
        <RegionalDestinationGrid destinations={destinations} regionName={region.name} />
      </Container>
    </>
  );
}
