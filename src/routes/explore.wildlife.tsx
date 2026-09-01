import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/wildlife";
const description = "Explore Texas national wildlife refuges and connect wildlife trips to birding guides, state parks, counties, regions and official visitor sources.";

export const Route = createFileRoute("/explore/wildlife")({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Wildlife Refuges & Wildlife Destinations | Texas Defined",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: "Texas Wildlife Refuges and Wildlife Destinations",
            description,
            about: [
              { "@type": "Thing", name: "Texas wildlife refuges" },
              { "@type": "Thing", name: "Texas wildlife viewing" },
              { "@type": "Thing", name: "Texas birding destinations" },
            ],
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore Texas", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Wildlife", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
});
