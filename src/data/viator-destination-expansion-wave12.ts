import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-09";

/**
 * Durable TexasDefined destinations promoted from reviewed Viator inventory
 * once destination-specific source and media requirements are satisfied.
 */
export const viatorDestinationExpansionWave12: Destination[] = [
  {
    id: "viator-expansion-flat-creek-estate",
    brandId: "texasdefined",
    slug: "flat-creek-estate",
    name: "Flat Creek Estate",
    summary: "Flat Creek Estate is an 80-acre Texas Hill Country winery near Lake Travis with a working vineyard and winery, Tuscan-inspired tasting room, full-service Bistro, covered Pavilion, walking trails and an 18-hole disc golf course.",
    category: "food-bbq",
    region: "hill-country",
    nearestTown: "Marble Falls",
    county: "Travis",
    coordinates: { lat: 30.48125, lng: -98.04445 },
    hero: {
      src: "/images/destinations/flat-creek-estate-ai-illustration.webp",
      alt: "AI editorial illustration representing Flat Creek Estate vineyard and winery in the Texas Hill Country",
      width: 1200,
      height: 800,
      credit: "AI editorial illustration created for TexasDefined; not documentary photography",
    },
    bestSeason: "Fall through spring offers the most comfortable weather for combining wine tasting, outdoor Pavilion time, vineyard walks and disc golf; summer visits are still practical but benefit from indoor tasting and dining breaks during the hottest hours.",
    entryNote: "Flat Creek Estate is generally open Thursday through Sunday, but hours can change around private and community events. Reservations are available for Bistro dining, wine tastings and disc golf, while the Pavilion can be more casual. Check the official reservations and contact pages before making the rural drive.",
    highlights: [
      "Texas Hill Country estate vineyard and working winery",
      "Tuscan-inspired tasting room and wine experiences",
      "Bistro dining and covered outdoor Pavilion",
      "18-hole disc golf course and vineyard walking trails",
    ],
    body: [
      "Flat Creek Estate is built as a full Hill Country day trip rather than a tasting counter with a vineyard attached. The estate traces its modern winery story to the late 1990s and combines an operating vineyard and winery with guest spaces spread across roughly 80 acres. The result is a place where visitors can move between a structured tasting, a meal, outdoor views and recreation without leaving the property.",
      "Wine remains the center of the experience. The estate emphasizes artisanal wines and Old World-inspired winemaking, while the tasting room gives visitors a direct way to sample current releases. The Bistro adds full-service dining with a Northern Italian and Tuscan influence, and the covered Pavilion offers a more relaxed outdoor setting that is often paired with casual food, vineyard views and live music. Current menus, tasting formats and event schedules change, so the official site should control time-sensitive planning.",
      "Flat Creek also works for travelers who want more than food and wine. The property promotes an 18-hole disc golf course, walking through the vineyard setting, private events and on-site lodging at the Vintner's Quarters. Because the estate sits in rural Travis County despite its Marble Falls mailing address, driving logistics matter: check operating hours before leaving, plan a safe transportation strategy if tasting wine, and allow enough time to make the property itself the destination rather than squeezing it into a rushed stop.",
    ],
    managingAuthority: "Flat Creek Estate",
    officialUrl: "https://flatcreekestate.com/",
    reservationUrl: "https://flatcreekestate.com/reservations/",
    address: "24912 Singleton Bend E, Marble Falls, TX 78654",
    directions: "Flat Creek Estate is in rural Travis County on the north side of Lake Travis, using a Marble Falls mailing address. Use the official street address for navigation and plan the return drive before drinking; rideshare availability can be less predictable in the rural Hill Country.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
