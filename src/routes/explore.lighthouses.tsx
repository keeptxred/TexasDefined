import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { texasLighthouseMapPoints } from "@/data/texas-lighthouse-map-points";
import { absoluteUrl, buildEditorialCollectionHead, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/lighthouses";
export const lighthouseDescription = "Explore Texas lighthouses from Sabine Pass to Port Isabel with photos, public-access notes, county guides, lighthouse history and a Gulf Coast road-trip itinerary.";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const lighthouseFaq = [
  {
    question: "Which Texas lighthouse can you climb?",
    answer: "Port Isabel Lighthouse is the Texas lighthouse to plan a public climb around. Tower access is subject to current Texas Historical Commission hours, weather and climb requirements.",
  },
  {
    question: "Can you climb Point Bolivar Lighthouse?",
    answer: "No. Point Bolivar is a view-only historic landmark rather than a public tower climb. Visitors should respect private-property boundaries and use lawful public vantage points.",
  },
  {
    question: "Is Lydia Ann Lighthouse open to the public?",
    answer: "No. Lydia Ann Lighthouse is privately owned. The public experience comes from nearby waterways and the Lighthouse Lakes area, not from entering the lighthouse property.",
  },
  {
    question: "Can you visit Matagorda Island Lighthouse by car?",
    answer: "No. Matagorda Island has no road bridge from the mainland. Access conditions and transportation arrangements can change, so travelers should verify current public-agency guidance before planning a trip.",
  },
  {
    question: "Is Sabine Pass Lighthouse in Texas?",
    answer: "The historic tower stands on the Louisiana side of the Sabine. It belongs in a Texas lighthouse itinerary because it served the border waterway and the same Gulf entrance used by vessels bound for the Texas side of the Sabine-Neches system.",
  },
];

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const base = buildEditorialCollectionHead(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Lighthouses: Photos, History & Gulf Coast Guide",
      description: lighthouseDescription,
      collectionName: "Texas Lighthouses",
      breadcrumbParentName: "Explore Texas",
      breadcrumbParentPath: "/explore",
      items: texasLighthouseMapPoints.map((point) => ({
        name: point.name,
        url: point.articleHref ?? canonicalPath,
        description: point.note,
        type: "TouristAttraction" as const,
      })),
    });
    return {
      ...base,
      scripts: [
        ...(base.scripts ?? []),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Dataset",
          "@id": `${absoluteUrl(texasDefinedBrand, canonicalPath)}#lighthouses`,
          name: "Texas lighthouse locations",
          description: "Sourced geographic points for surviving, relocated and historically important Texas Gulf Coast lighthouses.",
          spatialCoverage: { "@type": "State", name: "Texas" },
          variableMeasured: ["latitude", "longitude", "public access", "county", "historic era"],
          distribution: texasLighthouseMapPoints.map((point) => ({
            "@type": "Place",
            name: point.name,
            url: point.articleHref ? `${siteUrl}${point.articleHref}` : `${siteUrl}${canonicalPath}`,
            geo: { "@type": "GeoCoordinates", latitude: point.lat, longitude: point.lon },
          })),
        }),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${absoluteUrl(texasDefinedBrand, canonicalPath)}#faq`,
          mainEntity: lighthouseFaq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }),
      ],
    };
  },
});

