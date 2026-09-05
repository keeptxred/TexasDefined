import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

import {
  FOOD_TRUCK_MARKETS,
  FOOD_TRUCK_SOURCE_CHECKED_AT,
  FOOD_TRUCK_TOTAL,
  foodTruckMarketMeta,
} from "./food-truck-markets";
import { foodTrucksForMarket } from "./food-trucks";

const statewidePath = "/texas-food-trucks";
const statewideTitle = "Texas Food Trucks Worth Finding: 300 Trucks & Trailers";
const statewideDescription = "Explore 300 notable Texas food trucks and trailers across Austin, Houston, San Antonio, Fort Worth, El Paso, Dallas, Waco, Corpus Christi, Amarillo and College Station, curated with visible source and freshness notes.";
const statewideUrl = absoluteUrl(texasDefinedBrand, statewidePath);

const quickAnswers = [
  {
    question: "How many food trucks are in the TexasDefined guide?",
    answer: `The launch collection contains exactly ${FOOD_TRUCK_TOTAL} food trucks and mobile-food concepts across ${FOOD_TRUCK_MARKETS.length} Texas markets. The inventory is curated as a discovery guide rather than an exhaustive business directory.`,
  },
  {
    question: "Does TexasDefined publish live food-truck locations and hours?",
    answer: "No. Food trucks move, change schedules and sometimes operate only at events. TexasDefined identifies notable concepts and source-check dates, then directs readers to confirm current location and hours with the operator before making a special trip.",
  },
  {
    question: "Why are there no separate pages for all 300 trucks?",
    answer: "TexasDefined avoids creating thin doorway pages. The statewide and market guides carry the initial search and discovery value; individual truck profiles should be added only when there is enough independently useful, current information to support a durable page.",
  },
] as const;

function statewideHead() {
  return {
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: statewidePath,
      title: statewideTitle,
      description: statewideDescription,
    }),
    links: [canonicalLink(texasDefinedBrand, statewidePath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${statewideUrl}#page`,
          url: statewideUrl,
          name: statewideTitle,
          description: statewideDescription,
          dateModified: FOOD_TRUCK_SOURCE_CHECKED_AT,
          isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
          mainEntity: { "@id": `${statewideUrl}#markets` },
        },
        {
          "@type": "ItemList",
          "@id": `${statewideUrl}#markets`,
          name: "Texas food-truck market guides",
          numberOfItems: FOOD_TRUCK_MARKETS.length,
          itemListElement: FOOD_TRUCK_MARKETS.map((market, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: market.title,
            url: absoluteUrl(texasDefinedBrand, market.path),
          })),
        },
        {
          "@type": "FAQPage",
          "@id": `${statewideUrl}#faq`,
          mainEntity: quickAnswers.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${statewideUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Texas Food History", item: absoluteUrl(texasDefinedBrand, "/texas-food-history") },
            { "@type": "ListItem", position: 3, name: "Texas Food Trucks", item: statewideUrl },
          ],
        },
      ],
    })],
  };
}

export function loadFoodTruckOverviewPageDataServer() {
  return {
    total: FOOD_TRUCK_TOTAL,
    sourceCheckedAt: FOOD_TRUCK_SOURCE_CHECKED_AT,
    description: statewideDescription,
    quickAnswers: quickAnswers.map((item) => ({ ...item })),
    markets: FOOD_TRUCK_MARKETS.map((market) => {
      const trucks = foodTrucksForMarket(market.slug);
      return {
        ...market,
        count: trucks.length,
        sampleNames: trucks.slice(0, 4).map((truck) => truck.name),
      };
    }),
    head: statewideHead(),
  };
}

export function loadFoodTruckMarketPageDataServer(slug: string) {
  const market = foodTruckMarketMeta(slug);
  if (!market) return null;

  const trucks = foodTrucksForMarket(market.slug);
  const description = `${market.description} Browse ${trucks.length} TexasDefined food-truck picks, with source and freshness notes and a reminder to confirm live locations before traveling.`;
  const pageUrl = absoluteUrl(texasDefinedBrand, market.path);
  const head = {
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: market.path,
      title: market.seoTitle,
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, market.path)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#page`,
          url: pageUrl,
          name: market.title,
          description,
          dateModified: FOOD_TRUCK_SOURCE_CHECKED_AT,
          isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
          mainEntity: { "@id": `${pageUrl}#food-trucks` },
        },
        {
          "@type": "ItemList",
          "@id": `${pageUrl}#food-trucks`,
          name: `${market.city} notable food trucks and trailers`,
          numberOfItems: trucks.length,
          itemListElement: trucks.map((truck, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "FoodEstablishment",
              name: truck.name,
              areaServed: { "@type": "City", name: market.city },
            },
          })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Texas Food Trucks", item: statewideUrl },
            { "@type": "ListItem", position: 3, name: market.city, item: pageUrl },
          ],
        },
      ],
    })],
  };

  return {
    market,
    trucks,
    editorial: trucks.filter((truck) => truck.sourceType === "editorial"),
    otherMarkets: FOOD_TRUCK_MARKETS.filter((candidate) => candidate.slug !== market.slug),
    sourceCheckedAt: FOOD_TRUCK_SOURCE_CHECKED_AT,
    description,
    head,
  };
}
