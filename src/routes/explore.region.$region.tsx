import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { RegionalDestinationGrid } from "@/components/editorial/RegionalDestinationGrid";
import { RegionalHubSections } from "@/components/editorial/RegionalHubSections";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { destinationsQuery, regionsQuery } from "@/data/queries";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

function validCoordinates(destination: Destination) {
  const { lat, lng } = destination.coordinates;
  return Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && !(lat === 0 && lng === 0);
}

function destinationSchema(destination: Destination) {
  return {
    "@type": "TouristAttraction",
    "@id": `${siteUrl}/destination/${destination.slug}#attraction`,
    name: destination.name,
    url: `${siteUrl}/destination/${destination.slug}`,
    description: destination.summary,
    image: absoluteUrl(texasDefinedBrand, destination.hero.src),
    sameAs: destination.officialUrl || undefined,
    dateModified: destination.sourceCheckedAt || undefined,
    provider: destination.managingAuthority
      ? { "@type": "Organization", name: destination.managingAuthority }
      : undefined,
    containedInPlace: destination.county
      ? { "@type": "AdministrativeArea", name: `${destination.county} County` }
      : destination.nearestTown
        ? { "@type": "City", name: destination.nearestTown }
        : undefined,
    geo: validCoordinates(destination)
      ? {
          "@type": "GeoCoordinates",
          latitude: destination.coordinates.lat,
          longitude: destination.coordinates.lng,
        }
      : undefined,
  };
}

export const Route = createFileRoute("/explore/region/$region")({
  loader: async ({ context, params }) => {
    const [regions, catalog] = await Promise.all([
      context.queryClient.ensureQueryData(regionsQuery()),
      context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })),
    ]);
    const region = regions.find((item) => item.id === params.region);
    if (!region) throw notFound();
    const destinations = catalog.filter((destination) => destination.region === region.id);
    return { region, regions, destinations };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Region not found" }, { name: "robots", content: "noindex" }] };
    const canonicalPath = `/explore/region/${params.region}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const title = `${loaderData.region.name} Travel Guide`;
    const description = `${loaderData.region.blurb} Find parks, lakes, towns, historic places, food, road trips and other destinations across ${loaderData.region.name}.`;
    const primaryImage = loaderData.destinations.find((destination) => destination.hero?.src)?.hero;
    const imageId = `${pageUrl}#primaryimage`;
    const categoryCounts = Object.entries(loaderData.destinations.reduce<Record<string, number>>((counts, destination) => {
      counts[destination.category] = (counts[destination.category] ?? 0) + 1;
      return counts;
    }, {}));
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
        about: categoryCounts.map(([category, count]) => ({ "@type": "Thing", name: category.replaceAll("-", " "), description: `${count} places to explore` })),
        ...(primaryImage ? { primaryImageOfPage: { "@id": imageId }, image: { "@id": imageId } } : {}),
      },
      ...(primaryImage ? [{ "@type": "ImageObject", "@id": imageId, url: absoluteUrl(texasDefinedBrand, primaryImage.src), caption: primaryImage.alt, width: primaryImage.width, height: primaryImage.height }] : []),
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#destinations`,
        name: `Places to explore in ${loaderData.region.name}`,
        url: pageUrl,
        numberOfItems: loaderData.destinations.length,
        itemListElement: loaderData.destinations.map((destination, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: destinationSchema(destination),
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
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description, image: primaryImage?.src, imageAlt: primaryImage?.alt }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }],
    };
  },
  notFoundComponent: () => (
    <Container className="py-24"><p className="eyebrow text-primary">Another direction</p><h1 className="mt-3 font-display text-3xl">We haven’t mapped that part of Texas yet</h1><Link to="/explore" className="mt-5 inline-block text-primary underline">Find another road</Link></Container>
  ),
  component: RegionPage,
});

function RegionPage() {
  const { region, regions, destinations } = Route.useLoaderData();
  const primaryImage = destinations.find((destination) => destination.hero?.src)?.hero;

  return (
    <>
      <Container className="pt-8"><nav aria-label="Breadcrumb" className="text-xs text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-foreground">Home</Link></li><li aria-hidden="true">/</li><li><Link to="/explore" className="hover:text-foreground">Explore</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-foreground">{region.name}</li></ol></nav></Container>

      <section className="relative isolate mt-4 overflow-hidden bg-ink text-ink-foreground">
        {primaryImage && <img src={primaryImage.src} alt={primaryImage.alt} width={primaryImage.width} height={primaryImage.height} className="absolute inset-0 size-full object-cover opacity-55" />}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
        <Container className="relative py-24 sm:py-32"><p className="eyebrow text-ink-foreground/75">Around the state</p><h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">Explore {region.name}</h1><p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-foreground/85">{region.blurb}</p><p className="mt-6 text-sm text-ink-foreground/70">{destinations.length.toLocaleString("en-US")} place{destinations.length === 1 ? "" : "s"} worth a closer look</p></Container>
      </section>

      <RegionalHubSections destinations={destinations} region={region} allRegions={regions} />

      <Container className="py-20"><SectionHeader eyebrow="Keep exploring" title={`More places in ${region.name}`} description="Take your time with the full list, then open any place for highlights and what to know before you go." /><RegionalDestinationGrid destinations={destinations} regionName={region.name} /></Container>
    </>
  );
}
