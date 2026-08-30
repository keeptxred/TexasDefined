import { createFileRoute } from "@tanstack/react-router";

import bigBend from "@/assets/big-bend.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-natural-wonders-bucket-list";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasEvergreenGuideBatch2 } = await import("@/data/texas-evergreen-guides-batch2");
    return getTexasEvergreenGuideBatch2("texas-natural-wonders-bucket-list");
  },
  head: ({ loaderData: guide }) => {
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const itemListElement = guide.sections.map((section, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@type": "Place", name: section.heading },
    }));
    const collectionSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#natural-wonders-collection`,
      url: pageUrl,
      name: guide.title,
      description: guide.dek,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: [
        { "@type": "Thing", name: "Texas natural landscapes" },
        { "@type": "Thing", name: "Texas parks and protected lands" },
        { "@type": "Thing", name: "Texas outdoor travel" },
      ],
      mainEntity: {
        "@type": "ItemList",
        "@id": `${pageUrl}#natural-wonders-list`,
        numberOfItems: itemListElement.length,
        itemListElement,
      },
    };
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Natural Wonders Bucket List: 12 Landscapes",
        description: guide.dek,
        image: bigBend,
        imageAlt: "Big Bend landscape with desert terrain and distant mountains",
        type: "article",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(collectionSchema) }],
    };
  },
});
