import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const path = "/texas-career-training-options";
const title = "Texas Job Training: Free, Funded and Lower-Cost Options";
const description = "Find legitimate Texas training pathways, learn what WIOA eligibility means, compare apprenticeships and schools, and verify cost before enrolling.";
const pageUrl = absoluteUrl(texasDefinedBrand, path);
export const Route = createFileRoute("/texas-career-training-options")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title, description, canonicalPath: path }),
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
