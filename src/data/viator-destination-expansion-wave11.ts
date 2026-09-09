import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-09";

/**
 * Durable destination pages from the next reviewed Viator inventory batch.
 * These records describe the Texas place, not a tour product; live inventory,
 * pricing, ratings and availability remain owned by the booking provider.
 */
export const viatorDestinationExpansionWave11: Destination[] = [
  {
    id: "viator-expansion-texas-hill-country-olive-co",
    brandId: "texasdefined",
    slug: "texas-hill-country-olive-co",
    name: "Texas Hill Country Olive Co.",
    summary:
      "A family-owned olive farm, tasting room, gourmet shop and bistro in Dripping Springs where visitors can learn how olive oil is evaluated, sample oils and balsamic vinegars, browse Texas-made goods and make the stop part of a Hill Country day trip.",
    category: "food-bbq",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["texas-hill-country", "austin-area"],
      metroId: "austin",
      countySlugs: ["hays"],
      aliases: ["Texas Hill Country Olive Company", "Dripping Springs olive farm"],
      travelRegionIds: ["hill-country"],
    },
    nearestTown: "Dripping Springs",
    county: "Hays",
    address: "2530 W Fitzhugh Rd, Dripping Springs, TX 78620",
    coordinates: { lat: 30.25763, lng: -98.12487 },
    hero: {
      src: "/images/destinations/texas-hill-country-olive-co-ai.jpg",
      alt: "AI-generated illustration of a Texas Hill Country Olive Co. storefront framed by olive trees and Texas flags",
      width: 800,
      height: 800,
      credit: "AI-generated illustration · TexasDefined · user-provided artwork",
    },
    bestSeason:
      "Open year-round; spring and fall are especially comfortable for combining the tasting room with outdoor Hill Country stops, while summer visits are easier when the hottest part of the day is spent indoors.",
    entryNote:
      "The gift shop, bistro and orchard are open to walk-in visitors, but guided tastings have a separate schedule and can fill. Check the official tasting page before the trip and reserve online if a guided tasting is important to your plans.",
    highlights: [
      "Guided olive-oil and balsamic-vinegar tastings",
      "Public gift shop, tasting room and orchard",
      "Seasonal bistro lunch in Dripping Springs",
      "A family business whose Dripping Springs story began in 2008",
    ],
    body: [
      "Texas Hill Country Olive Co. is more useful as a destination than as a simple store stop. John and Cara Gambini say the family bought land in Dripping Springs in 2008 and planted olive trees the following spring, building the business around a Hill Country property rather than a generic retail tasting room. That history gives the visit a strong sense of place, but it is still worth separating the visitor experience from broad product-origin assumptions: the company processes and sells olive oils and balsamic products in Dripping Springs, and not every olive sold through the business should be assumed to have been grown in Texas.",
      "The current visitor experience centers on tasting rather than a walk-through mill tour. The company says its older mill-tour format is no longer offered because of operational requirements; guided tastings now include an explanation of the production process and a video showing harvesting, milling and bottling. That makes this a better fit for travelers who want to learn how to taste and compare olive oils than for visitors expecting unrestricted access to working production areas.",
      "You do not need a tasting ticket just to visit the property. The company's current visitor information says the gift shop, bistro and orchard are open to the public, with the bistro serving a seasonal lunch menu. Guided tastings run on a separate schedule and the company recommends advance online purchase because sessions can fill, although walk-ins may be accepted when space remains. Recheck the official schedule before leaving because tasting times, holiday hours and operating details can change.",
      "For a Hill Country itinerary, the location works best as a planned food-and-drink stop rather than an all-day attraction. It sits west of Austin in the Dripping Springs area, so a tasting or lunch can be paired with other Hays County and western Travis County destinations without forcing a long detour. Allow extra time if you want both the guided tasting and a bistro meal instead of treating one as a substitute for the other.",
      "Accessibility is straightforward for the core tasting experience: the company currently identifies its tasting as wheelchair accessible. Visitors bringing dogs should check current property rules before arrival because food-preparation and manufacturing areas have different restrictions from the grounds and shop. For any time-sensitive question—hours, tasting slots, holiday closures or event access—the official site should take precedence over an evergreen travel guide.",
    ],
    managingAuthority: "Texas Hill Country Olive Co.",
    officialUrl: "https://texashillcountryoliveco.com/pages/plan-your-visit",
    reservationUrl: "https://texashillcountryoliveco.com/pages/orchard-tours",
    directions:
      "The property is at 2530 W Fitzhugh Rd in Dripping Springs. Use the official address for navigation and allow Hill Country road conditions and event traffic to influence arrival time rather than relying on a fixed drive-time estimate from Austin.",
    accessibilityNotes:
      "The company currently describes the guided tasting as wheelchair accessible. Confirm any mobility-specific need directly before visiting because access to outdoor orchard areas and event configurations may differ from the tasting room.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
