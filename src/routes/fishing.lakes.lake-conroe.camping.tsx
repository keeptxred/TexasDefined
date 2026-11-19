import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import {
  LAKE_CONROE_CAMPING_CANONICAL_PATH as canonicalPath,
  LAKE_CONROE_CAMPING_TITLE as title,
  LAKE_CONROE_CAMPING_DESCRIPTION as description,
  LAKE_CONROE_CAMPING_REVIEWED_AT as reviewedAt,
  LAKE_CONROE_CAMPING_CITATIONS as citations,
} from "@/data/fishing/lake-conroe-camping-publication";
import { buildMeta, canonicalLink } from "@/lib/seo";

/** Small SEO route only. The reviewed facilities are rendered by its .lazy.tsx
 * sibling: no dynamic lake queries, broad showcase graph or live-water parser. */
const pageUrl = "https://texasdefined.com" + canonicalPath;

export const Route = createFileRoute("/fishing/lakes/lake-conroe/camping")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title, description, canonicalPath }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage", "@id": pageUrl, url: pageUrl, name: title, description,
            isPartOf: { "@id": "https://texasdefined.com/#website" },
            about: { "@id": "https://texasdefined.com/fishing/lakes/lake-conroe#reservoir" },
            breadcrumb: { "@id": pageUrl + "#breadcrumbs" },
            dateModified: reviewedAt,
            citation: [...citations],
          },
          {
            "@type": "BreadcrumbList", "@id": pageUrl + "#breadcrumbs",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://texasdefined.com" },
              { "@type": "ListItem", position: 2, name: "Fishing", item: "https://texasdefined.com/fishing" },
              { "@type": "ListItem", position: 3, name: "Lake Conroe", item: "https://texasdefined.com/fishing/lakes/lake-conroe" },
              { "@type": "ListItem", position: 4, name: "Camping", item: pageUrl },
            ],
          },
        ],
      }),
    }],
  }),
});
