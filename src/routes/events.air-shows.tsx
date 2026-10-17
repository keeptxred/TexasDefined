import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/events/air-shows";
const description = "Find confirmed Texas air shows in 2026 and 2027, with dates, tickets, parking rules, military-base entry information, hotel planning and official organizer links.";
const guideItems = [
  ["Amigo Airsho", "amigo-airsho"],
  ["Wings Over Houston", "wings-over-houston-airshow"],
  ["Texas Capital Air Show", "texas-capital-air-show"],
  ["Bluebonnet Airshow", "bluebonnet-airshow"],
  ["Wings Over Cowtown", "wings-over-cowtown-airshow"],
] as const;

export const Route = createFileRoute("/events/air-shows")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Air Shows 2026–2027: Dates, Tickets & Visitor Guides",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Texas Air Shows: Confirmed Dates & Visitor Guides",
      description,
      url: "https://texasdefined.com/events/air-shows",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: guideItems.length,
        itemListElement: guideItems.map(([name, slug], index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          url: "https://texasdefined.com/event/" + slug,
        })),
      },
    }) }],
  }),
});