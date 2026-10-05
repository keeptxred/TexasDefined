import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-10-05";

/**
 * Durable TexasDefined destinations promoted from reviewed Viator inventory
 * once destination-specific source and media requirements are satisfied.
 */
export const viatorDestinationExpansionWave13: Destination[] = [
  {
    id: "viator-expansion-flat-creek-estate",
    brandId: "texasdefined",
    slug: "flat-creek-estate",
    name: "Flat Creek Estate",
    summary: "Flat Creek Estate is an 80-acre Texas Hill Country winery near Lake Travis with a working vineyard and winery, Tuscan-inspired tasting room, full-service Bistro, covered Pavilion, walking trails and an 18-hole disc golf course.",
    category: "food-bbq",
    region: "hill-country",
    nearestTown: "Lago Vista",
    county: "Travis",
    coordinates: { lat: 30.48125, lng: -98.04445 },
    hero: {
      src: "/images/destinations/flat-creek-estate-ai-illustration.webp",
      alt: "AI editorial illustration representing Flat Creek Estate vineyard and winery in the Texas Hill Country",
      width: 1200,
      height: 800,
      credit: "AI editorial illustration created for TexasDefined; not documentary photography",
    },
    bestSeason: "Fall through spring offers the most comfortable weather for combining wine tasting, outdoor Pavilion time, vineyard walks and disc golf. Summer visits are still practical, but indoor tasting and dining breaks help during the hottest part of the day.",
    entryNote: "Current estate hours are Thursday-Friday noon-7 p.m., Saturday 11 a.m.-7 p.m. and Sunday 11 a.m.-6 p.m.; disc golf runs 9 a.m.-7 p.m. Thursday-Sunday. Hours can change for private or community events, so check the official site before making the rural drive. Walk-ins are welcomed for wine tasting, with reservations recommended for larger groups and available for Bistro dining, tastings and disc golf.",
    highlights: [
      "80-acre Texas Hill Country estate vineyard and working winery",
      "Tuscan-inspired tasting room and structured wine experiences",
      "Bistro dining and covered outdoor Pavilion",
      "18-hole disc golf course and vineyard walking trails",
    ],
    body: [
      "Flat Creek Estate is built as a full Hill Country day trip rather than a tasting counter with a vineyard attached. Established in 1996, the estate combines a working vineyard and winery with guest spaces spread across roughly 80 acres. Visitors can move between a structured tasting, a meal, outdoor views and recreation without leaving the property.",
      "Wine remains the center of the experience. The estate emphasizes artisanal wines and Old World-inspired winemaking, while the Tuscan-inspired tasting room offers current-release flights and guided experiences. The Bistro adds full-service dining, and the covered Pavilion provides a more casual outdoor setting that the estate uses for food, wine and recurring live music. Menus, tasting formats and event schedules change, so time-sensitive details should be confirmed on the official site.",
      "Flat Creek also works for travelers who want more than food and wine. The property promotes an 18-hole disc golf course and vineyard walking trails, making it easier to spend several hours on site. Because the estate is in rural Travis County and the official site warns that Uber and Lyft are not reliably available, transportation planning matters: use the official street address for navigation, arrange a return ride before drinking if needed, and allow enough time to make the property itself the destination rather than a rushed add-on.",
    ],
    managingAuthority: "Flat Creek Estate",
    officialUrl: "https://flatcreekestate.com/",
    reservationUrl: "https://flatcreekestate.com/reservations/",
    address: "24912 Singleton Bend E, Marble Falls, TX 78654",
    directions: "Flat Creek Estate is in rural Travis County near Lago Vista and uses a Marble Falls mailing address. Use the official street address for navigation. The estate specifically notes that rideshare pickup can be unreliable in this rural location, so coordinate the return trip in advance if you will be tasting wine.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
