import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/guides";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
const description = "Browse Texas Painted Churches guides for trip planning, church identification, history, architecture, routes and verified visitor information.";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { paintedChurchSearchCoverage, paintedChurchSearchGuides } = await import("@/data/painted-church-search-guides");
    return { coverage: paintedChurchSearchCoverage, guideCount: paintedChurchSearchGuides.length };
  },
  head: ({ loaderData }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Painted Churches Guide Library | Texas Defined",
      description,
      modifiedTime: "2026-08-18T23:30:00-05:00",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#collection`,
          url: pageUrl,
          name: "Texas Painted Churches Guide Library",
          description,
          dateModified: "2026-08-18",
          mainEntity: { "@id": `${pageUrl}#queries` },
        },
        {
          "@type": "ItemList",
          "@id": `${pageUrl}#queries`,
          numberOfItems: loaderData.coverage.length,
          itemListElement: loaderData.coverage.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.query,
            url: absoluteUrl(texasDefinedBrand, item.canonicalPath),
          })),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Painted Churches", item: absoluteUrl(texasDefinedBrand, "/explore/painted-churches") },
            { "@type": "ListItem", position: 3, name: "Guide Library", item: pageUrl },
          ],
        },
      ],
    })],
  }),
});
