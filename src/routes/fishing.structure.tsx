import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { FishingHabitatGuidePage } from "@/components/fishing/FishingHabitatGuidePage";
import { FISHING_HABITAT_VERIFIED_AT, FISHING_STRUCTURE_PATH, fishingHabitatGuides } from "@/data/fishing/habitat-guides";
import { fishingGenericSocialMeta } from "@/data/fishing/social-images";
import { buildMeta, canonicalLink } from "@/lib/seo";

const guide = fishingHabitatGuides.structure;
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/fishing/structure")({
  head: () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", url: `${siteUrl}${FISHING_STRUCTURE_PATH}`, name: guide.title, description: guide.description, dateModified: FISHING_HABITAT_VERIFIED_AT },
        { "@type": "FAQPage", mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: guide.title, item: `${siteUrl}${FISHING_STRUCTURE_PATH}` },
        ] },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, { title: guide.metaTitle, description: guide.description, canonicalPath: FISHING_STRUCTURE_PATH, ...fishingGenericSocialMeta }),
      links: [canonicalLink(texasDefinedBrand, FISHING_STRUCTURE_PATH)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: () => <FishingHabitatGuidePage guide={guide} />,
});
