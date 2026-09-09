import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-09";

export const viatorDestinationExpansionWave11: Destination[] = [
  {
    id: "viator-expansion-texas-hill-country-olive-co",
    brandId: "texasdefined",
    slug: "texas-hill-country-olive-co",
    name: "Texas Hill Country Olive Co.",
    summary: "A family-owned Dripping Springs culinary destination centered on Texas olive oil, with a gourmet shop, daytime bistro, orchard setting and guided olive-oil and balsamic tasting experiences.",
    category: "food-bbq",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["austin-area", "texas-hill-country"],
      metroId: "austin",
      countySlugs: ["hays"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["Austin & Central Texas"],
    },
    nearestTown: "Dripping Springs",
    county: "Hays",
    address: "2530 W. Fitzhugh Rd., Dripping Springs, TX 78620",
    coordinates: { lat: 30.2576307, lng: -98.1248745 },
    hero: {
      src: "/images/destinations/texas-hill-country-olive-co-ai.webp",
      alt: "AI-generated illustration inspired by Texas Hill Country Olive Co. in Dripping Springs, not an actual-location photograph",
      width: 1024,
      height: 1024,
      credit: "AI-generated illustration · user-provided TexasDefined artwork · not an actual-location photograph",
    },
    bestSeason: "Fall through spring is comfortable for a Hill Country day trip, but the property operates year-round. Check the official site for current hours, tasting availability and holiday adjustments before driving out.",
    entryNote: "The gift shop, bistro and orchard are open to visitors without a tasting ticket. Guided tastings have limited space, so reserve ahead when a tasting is the reason for the trip and confirm the current schedule on the official site.",
    highlights: [
      "Guided olive-oil and balsamic tasting experiences",
      "Hill Country bistro and gourmet shop",
      "Family-owned Dripping Springs business founded in 2008",
      "Easy pairing with a Dripping Springs food-and-drink day trip",
    ],
    body: [
      "Texas Hill Country Olive Co. is a Dripping Springs food-and-agritourism stop built around olive oil rather than a generic souvenir shop. The Gambini family started the company in 2008 after buying Hill Country land, and the public-facing property now combines the olive-business story with a gourmet shop, daytime bistro, orchard setting and guided tasting program.",
      "A visit works at more than one commitment level. Travelers can stop in to shop or eat without buying a tasting ticket, while visitors who want the educational side can book a guided olive-oil and balsamic tasting. The company recommends reserving tastings because space can fill; its current operating page should be checked before arrival because schedules and holiday hours can change.",
      "For a Dripping Springs itinerary, this is best treated as a culinary destination rather than a stand-alone all-day attraction. Pair the stop with other Hill Country places, leave enough time for a tasting if booked, and use the official site for current bistro, accessibility and visit details. The hero used by TexasDefined is an AI-generated illustration supplied for this guide, not a photograph of the property.",
    ],
    officialUrl: "https://texashillcountryoliveco.com/pages/plan-your-visit",
    directions: "The property is at 2530 W. Fitzhugh Rd. in Dripping Springs, west of Austin. Use the official visit page for current directions and operating information rather than relying on older tour listings.",
    accessibilityNotes: "The company states that its guided tasting is wheelchair accessible. Contact the property before travel if you need confirmation about a specific route, seating arrangement or accommodation.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
