import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-09";

/**
 * Durable TexasDefined destinations promoted from reviewed Viator inventory
 * once destination-specific source and media requirements are satisfied.
 */
export const viatorDestinationExpansionWave12: Destination[] = [
  {
    id: "viator-expansion-texas-hill-country-olive-co",
    brandId: "texasdefined",
    slug: "texas-hill-country-olive-co",
    name: "Texas Hill Country Olive Co.",
    summary: "Texas Hill Country Olive Co. is a family-owned Dripping Springs culinary destination with guided olive-oil and balsamic tastings, a public orchard, a gourmet shop and a daytime bistro in the Texas Hill Country.",
    category: "food-bbq",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["austin-area", "texas-hill-country"],
      metroId: "austin",
      countySlugs: ["hays"],
      travelRegionIds: ["hill-country"],
      relocationPresentationLabels: ["Austin & Central Texas", "San Antonio & Hill Country"],
    },
    nearestTown: "Dripping Springs",
    county: "Hays County",
    coordinates: { lat: 30.25763, lng: -98.12487 },
    address: "2530 W. Fitzhugh Rd., Dripping Springs, TX 78620",
    hero: {
      src: "/images/viator-destinations/texas-hill-country-olive-co-ai.webp",
      alt: "AI-generated editorial illustration representing Texas Hill Country Olive Co. in Dripping Springs",
      width: 512,
      height: 512,
      credit: "User-provided AI-generated editorial illustration for TexasDefined; not documentary photography",
    },
    bestSeason: "The property welcomes visitors year-round. Fall through spring usually makes time around the orchard and patio more comfortable, while the indoor tasting, shop and bistro keep the stop practical during hotter or rainy Hill Country days.",
    entryNote: "The gift shop, bistro and orchard are open to public visitors without a guided-tasting ticket. Guided tastings have limited capacity and the company recommends booking online. Its former production-floor mill tour is no longer offered; current guided tastings use an in-depth process video instead. Check the official site for the current schedule before driving out.",
    highlights: [
      "Guided extra virgin olive oil and balsamic vinegar tastings",
      "Public Dripping Springs orchard setting",
      "Gourmet shop centered on olive oils, balsamics and Texas gifts",
      "Daytime bistro using the company's oils and vinegars",
      "Family olive-growing story dating to 2008",
    ],
    body: [
      "Texas Hill Country Olive Co. began in 2008, when John Gambini and his daughter Cara bought 17 acres in Dripping Springs with plans to grow olive trees. The family planted its first trees in spring 2009, adapting an Italian agricultural tradition to the rocky limestone soil, slope and drainage of the Texas Hill Country. That origin gives the property a stronger sense of place than a conventional specialty-food store: the visitor experience is tied to a working Texas olive business and the landscape around it.",
      "A visit can be as simple as stopping to shop or eat, but the guided tasting is the most structured way to learn the product. Texas Hill Country Olive Co. currently offers guided tastings of extra virgin olive oils and balsamic vinegars, with the company recommending advance online purchase because capacity is limited. The experience explains how olive oil is evaluated and produced, but travelers should not expect the older production-floor mill tour. The company says operational regulations ended that format and that current tastings instead include a detailed video showing harvesting, milling and bottling.",
      "The rest of the property makes the destination useful even without a tasting reservation. The gourmet shop is open to walk-in visitors, the orchard can be visited by the public, and the on-site bistro serves a seasonal daytime menu that incorporates the company's olive oils and balsamic vinegars. Bistro service is walk-in rather than reservation-based, so a food stop can be paired with shopping or an orchard look without creating a rigid itinerary.",
      "For trip planning, treat Texas Hill Country Olive Co. as a compact culinary anchor rather than an all-day attraction. A focused tasting-and-shop visit can fit into roughly an hour and a half, while adding lunch and time around the orchard can turn it into a two- to three-hour stop. The official FAQ places the property in Dripping Springs at roughly a 40-minute drive from Austin, making it an easy pairing with other Hays County or western Austin-area Hill Country stops.",
      "Schedules are the part most likely to change. The company's current pages agree that the property is open year-round but publish slightly different summaries of tasting frequency, and holiday hours can differ from the regular schedule. TexasDefined therefore does not hard-code a day-by-day tasting timetable here. If the tasting is the reason for the trip, use the official booking page for the current session calendar before leaving home.",
    ],
    managingAuthority: "Texas Hill Country Olive Co.",
    officialUrl: "https://texashillcountryoliveco.com/pages/plan-your-visit",
    reservationUrl: "https://texashillcountryoliveco.com/pages/orchard-tours",
    directions: "The property is on West Fitzhugh Road in Dripping Springs. Use the official street address for navigation and allow extra time on Hill Country roads during busy weekends and event periods.",
    accessibilityNotes: "The company identifies its guided tasting as wheelchair accessible. Contact the property directly for current accessibility details for other parts of the grounds, bistro and shop.",
    authorityGuide: {
      whyItMatters: "Texas Hill Country Olive Co. is a distinctive Dripping Springs food destination because it combines a Texas olive-growing story, guided tasting, orchard, lunch and specialty shopping on one Hill Country property rather than functioning only as a retail store.",
      assessment: {
        recommendedVisit: "1.5–3 hours",
        physicalEffort: "Low",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Moderate",
        familyFit: "Good for mixed-age groups interested in food, tasting, shopping and a relaxed Hill Country stop",
        firstTimeValue: "Strong for food-focused visitors, gift shoppers and Austin-area day-trippers who want a Hill Country experience that is not centered on alcohol",
      },
      itineraries: [
        {
          label: "Focused tasting visit",
          duration: "About 1–1.5 hours",
          steps: [
            "Reserve a guided tasting through the official site before driving out.",
            "Arrive with enough time to check in and browse the gourmet shop.",
            "Take the guided olive oil and balsamic tasting and watch the current production-process presentation.",
          ],
        },
        {
          label: "Lunch, shop and orchard stop",
          duration: "About 2 hours",
          steps: [
            "Start with a walk-in lunch at the on-site bistro.",
            "Browse olive oils, balsamic vinegars and Texas-oriented gifts in the shop.",
            "Spend time around the public orchard grounds before continuing through Dripping Springs.",
          ],
        },
        {
          label: "Hill Country half-day anchor",
          duration: "About 3 hours on site, plus nearby stops",
          steps: [
            "Use the Olive Co. as the culinary anchor for a Dripping Springs half-day.",
            "Pair a prebooked tasting with lunch and time in the shop and orchard.",
            "Continue to another Dripping Springs or Hays County stop after checking that destination's current access or reservation rules.",
          ],
        },
      ],
      sources: [
        {
          label: "Texas Hill Country Olive Co. — Plan Your Visit",
          url: "https://texashillcountryoliveco.com/pages/plan-your-visit",
          scope: "Official address, public visitor experience, bistro, tasting and shop information",
        },
        {
          label: "Texas Hill Country Olive Co. — Tastings & Tours",
          url: "https://texashillcountryoliveco.com/pages/orchard-tours",
          scope: "Official guided tasting format, booking guidance, accessibility and current mill-tour status",
        },
        {
          label: "Texas Hill Country Olive Co. — About Us",
          url: "https://texashillcountryoliveco.com/pages/about",
          scope: "Official family founding history, 2008 land purchase, 2009 planting and Dripping Springs agricultural context",
        },
        {
          label: "Texas Hill Country Olive Co. — Bistro",
          url: "https://texashillcountryoliveco.com/pages/bistro-tasting-room",
          scope: "Official bistro format and relationship to the tasting experience",
        },
        {
          label: "Texas Hill Country Olive Co. — FAQ",
          url: "https://texashillcountryoliveco.com/pages/faq",
          scope: "Official founding, location, public-access and Austin-area planning details",
        },
      ],
    },
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
