import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { GAMING_REVIEWED_AT, getGamingPage } from "@/data/gaming";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/gaming/$slug")({
  loader: ({ params }) => {
    const page = getGamingPage(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const canonicalPath = `/gaming/${loaderData.slug}`;
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
            "@type": "Article",
            "@id": `${pageUrl}#article`,
            url: pageUrl,
            headline: loaderData.title,
            description: loaderData.description,
            dateModified: GAMING_REVIEWED_AT,
            author: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
            publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/gaming")}#page` },
            breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Gaming & Esports in Texas", item: absoluteUrl(texasDefinedBrand, "/gaming") },
              { "@type": "ListItem", position: 3, name: loaderData.shortTitle, item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
});
