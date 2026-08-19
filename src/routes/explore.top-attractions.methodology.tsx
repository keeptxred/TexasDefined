import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/top-attractions/methodology";
const description = "How TexasDefined selects, ranks, researches, verifies and updates its Top 25 Texas Attractions collection, including source precedence, supporting authority evidence and the editorial planning scales used across all 25 guides.";
const TopAttractionsMethodologyContent = lazy(() => import("@/components/explore/TopAttractionsMethodologyContent"));

export const Route = createFileRoute("/explore/top-attractions/methodology")({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Top 25 Texas Attractions Methodology | Texas Defined", description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: "Top 25 Texas Attractions Methodology",
            description,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
            about: { "@id": `${absoluteUrl(texasDefinedBrand, "/explore/top-attractions")}#attractions` },
            author: { "@type": "Organization", "@id": `${absoluteUrl(texasDefinedBrand, "/authors/a-hollis")}#desk`, name: "Texas Defined Editorial Desk" },
            dateModified: "2026-08-19",
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Top 25 attractions", item: absoluteUrl(texasDefinedBrand, "/explore/top-attractions") },
              { "@type": "ListItem", position: 4, name: "Methodology", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: TopAttractionsMethodologyPage,
});

function TopAttractionsMethodologyPage() {
  return <Suspense fallback={null}><TopAttractionsMethodologyContent /></Suspense>;
}
