import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/texas-industries/$slug")({
  loader: async ({ params }) => {
    const { getTexasIndustry } = await import("@/data/texas-industries");
    const industry = getTexasIndustry(params.slug);
    if (!industry) throw notFound();
    return industry;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const canonicalPath = `/texas-industries/${loaderData.slug}`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: loaderData.title,
        description: loaderData.description,
        canonicalPath,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: loaderData.title,
            description: loaderData.description,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
            publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
            breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Texas Industries", item: absoluteUrl(texasDefinedBrand, "/texas-industries") },
              { "@type": "ListItem", position: 3, name: loaderData.shortTitle, item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
});
