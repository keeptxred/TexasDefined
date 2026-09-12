import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import type { Destination } from "@/data/types";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const CanonicalRegionPage = lazy(() => import("@/components/regions/CanonicalRegionPage").then((module) => ({ default: module.CanonicalRegionPage })));
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

function destinationSchema(destination: Destination) {
  return {
    "@type": "TouristAttraction",
    name: destination.name,
    url: `${siteUrl}/destination/${destination.slug}`,
    description: destination.summary,
    containedInPlace: destination.county ? { "@type": "AdministrativeArea", name: `${destination.county} County, Texas` } : undefined,
  };
}

export const Route = createFileRoute("/regions/$region")({
  loader: async ({ context, params }) => {
    const geography = await import("@/data/canonical-geography");
    if (!geography.isCanonicalPrimaryRegionId(params.region)) throw notFound();

    const [presentations, graph, queries] = await Promise.all([
      import("@/data/canonical-region-presentation"),
      import("@/data/geography-knowledge-graph"),
      import("@/data/queries"),
    ]);

    const region = geography.canonicalPrimaryRegion(params.region);
    const presentation = presentations.canonicalRegionPresentation(region.id);
    const subregions = geography.TEXAS_SUBREGIONS.filter((item) => item.primaryRegionId === region.id);
    const metros = geography.TEXAS_METROS.filter((item) => item.primaryRegionId === region.id);
    const places = graph.TEXAS_PLACE_GEOGRAPHY.filter((item) => item.primaryRegionId === region.id);
    const countySlugs = [...new Set(places.flatMap((place) => place.countySlugs ?? []))].sort();
    const catalog = await context.queryClient.ensureQueryData(queries.destinationsQuery({ limit: 5000 }));
    const destinations = catalog.map(graph.withCanonicalDestinationGeography).filter((destination) => destination.geography?.primaryRegionId === region.id);
    const adjacent = region.adjacentRegionIds.map((id) => geography.canonicalPrimaryRegion(id));

    return {
      region,
      presentation,
      subregions,
      metros,
      places,
      countySlugs,
      destinations,
      adjacent,
      allRegions: geography.CANONICAL_PRIMARY_REGIONS,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Texas region not found" }, { name: "robots", content: "noindex" }] };
    const canonicalPath = `/regions/${loaderData.region.id}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const title = `${loaderData.region.name} | Texas Region Guide`;
    const description = `${loaderData.presentation.summary} Explore subregions, metros, cities, counties, destinations, travel planning and relocation context.`;
    const primaryImage = loaderData.destinations.find((destination) => destination.hero?.src)?.hero;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description, image: primaryImage?.src, imageAlt: primaryImage?.alt }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${pageUrl}#page`,
              url: pageUrl,
              name: title,
              description,
              isPartOf: { "@id": `${siteUrl}/#website` },
              publisher: { "@id": `${siteUrl}/#organization` },
              breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
              mainEntity: { "@id": `${pageUrl}#region` },
            },
            {
              "@type": "Place",
              "@id": `${pageUrl}#region`,
              name: loaderData.region.name,
              description: loaderData.presentation.identity,
              containedInPlace: { "@type": "State", name: "Texas" },
              containsPlace: loaderData.places.slice(0, 30).map((place) => ({ "@type": "City", name: `${place.name}, Texas` })),
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#destinations`,
              name: `Places to explore in ${loaderData.region.name}`,
              numberOfItems: loaderData.destinations.length,
              itemListElement: loaderData.destinations.slice(0, 50).map((destination, index) => ({ "@type": "ListItem", position: index + 1, item: destinationSchema(destination) })),
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
                { "@type": "ListItem", position: 2, name: "Texas regions", item: `${siteUrl}/regions` },
                { "@type": "ListItem", position: 3, name: loaderData.region.name, item: pageUrl },
              ],
            },
          ],
        }),
      ],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Texas regions</p><h1 className="mt-3 font-display text-4xl">That canonical region is not part of the TexasDefined map.</h1><Link to="/regions" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">See all 7 regions →</Link></Container>,
  component: CanonicalRegionRoute,
});

function CanonicalRegionRoute() {
  const data = Route.useLoaderData();
  return (
    <Suspense fallback={<div className="min-h-[36rem]" aria-hidden="true" />}>
      <CanonicalRegionPage {...data} />
    </Suspense>
  );
}
