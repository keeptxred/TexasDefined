import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const path = "/texas-government-jobs";
const title = "Texas Government Jobs: State, City and Federal Application Guide";
const description = "Find legitimate Texas government job applications, understand WorkInTexas versus CAPPS, compare state salary groups and benefits, and avoid common application mistakes.";
const pageUrl = absoluteUrl(texasDefinedBrand, path);

export const Route = createFileRoute("/texas-government-jobs")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: title, description: description, canonicalPath: path }),
    links: [canonicalLink(texasDefinedBrand, path)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": pageUrl + "#article",
          headline: title,
          description,
          dateModified: "2026-11-10",
          mainEntityOfPage: pageUrl,
          publisher: { "@id": absoluteUrl(texasDefinedBrand, "/") + "#organization" }
        },
        {
          "@type": "BreadcrumbList",
          "@id": pageUrl + "#breadcrumb",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Moving to Texas", item: absoluteUrl(texasDefinedBrand, "/moving-to-texas") },
            { "@type": "ListItem", position: 3, name: "Texas government jobs", item: pageUrl }
          ]
        }
      ]
    })],
  }),
});
