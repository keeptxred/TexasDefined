import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const path = "/texas-cities-nature-jobs";
const title = "Texas Cities for Nature Lovers Who Need Good Jobs";
const description = "Compare Austin, Dallas–Fort Worth, Houston and San Antonio using published metro wage estimates and official nearby-state-park lists; no made-up overall rankings.";
const pageUrl = absoluteUrl(texasDefinedBrand, path);
export const Route = createFileRoute("/texas-cities-nature-jobs")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: title, description: description, canonicalPath: path }),
    links: [canonicalLink(texasDefinedBrand, path)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Article", "@id": pageUrl + "#article", headline: title,
          description, dateModified: "2026-11-10", mainEntityOfPage: pageUrl,
          isPartOf: { "@id": absoluteUrl(texasDefinedBrand, "/moving-to-texas") + "#page" },
          publisher: { "@id": absoluteUrl(texasDefinedBrand, "/") + "#organization" } },
        { "@type": "BreadcrumbList", "@id": pageUrl + "#breadcrumb", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
          { "@type": "ListItem", position: 2, name: "Moving to Texas", item: absoluteUrl(texasDefinedBrand, "/moving-to-texas") },
          { "@type": "ListItem", position: 3, name: title, item: pageUrl }
        ] }
      ]
    })],
  }),
});
