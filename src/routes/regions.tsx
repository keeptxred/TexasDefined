import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const TexasRegionsPage = lazy(() => import("@/components/regions/TexasRegionsPage").then((module) => ({ default: module.TexasRegionsPage })));

const canonicalPath = "/regions";
const description = "Explore TexasDefined's seven canonical Texas regions: North Texas, Central Texas, East Texas, South Texas, West Texas, Gulf Coast and the Panhandle, with their subregions, metros, cities, travel identities and relocation context.";

export const Route = createFileRoute("/regions")({
  loader: async () => {
    const [geography, presentations, graph] = await Promise.all([
      import("@/data/canonical-geography"),
      import("@/data/canonical-region-presentation"),
      import("@/data/geography-knowledge-graph"),
    ]);

    return presentations.CANONICAL_REGION_PRESENTATIONS.map((presentation) => {
      const region = geography.CANONICAL_PRIMARY_REGIONS.find((candidate) => candidate.id === presentation.id)!;
      return {
        region,
        presentation,
        subregionCount: geography.TEXAS_SUBREGIONS.filter((item) => item.primaryRegionId === region.id).length,
        metroCount: geography.TEXAS_METROS.filter((item) => item.primaryRegionId === region.id).length,
        placeCount: graph.TEXAS_PLACE_GEOGRAPHY.filter((item) => item.primaryRegionId === region.id).length,
      };
    });
  },
  head: ({ loaderData: regionCards }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const siteUrl = absoluteUrl(texasDefinedBrand, "/");
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "The 7 Texas Regions | TexasDefined Geography",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${pageUrl}#page`,
              url: pageUrl,
              name: "The 7 Texas Regions",
              description,
              isPartOf: { "@id": `${siteUrl}#website` },
              publisher: { "@id": `${siteUrl}#organization` },
              mainEntity: { "@id": `${pageUrl}#regions` },
              breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#regions`,
              name: "TexasDefined canonical Texas regions",
              numberOfItems: regionCards?.length ?? 0,
              itemListElement: (regionCards ?? []).map(({ region }, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: absoluteUrl(texasDefinedBrand, `/regions/${region.id}`),
                item: {
                  "@type": "Place",
                  name: region.name,
                  containedInPlace: { "@type": "State", name: "Texas" },
                },
              })),
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
                { "@type": "ListItem", position: 2, name: "Texas regions", item: pageUrl },
              ],
            },
          ],
        }),
      ],
    };
  },
  component: TexasRegionsRoute,
});

function TexasRegionsRoute() {
  const regionCards = Route.useLoaderData();
  return (
    <Suspense fallback={<div className="min-h-[36rem]" aria-hidden="true" />}>
      <TexasRegionsPage regionCards={regionCards} />
    </Suspense>
  );
}
