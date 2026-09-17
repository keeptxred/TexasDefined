import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-09";

/**
 * Durable TexasDefined destinations promoted from reviewed Viator inventory
 * once destination-specific source and media requirements are satisfied.
 */
export const viatorDestinationExpansionWave11: Destination[] = [
  {
    id: "viator-expansion-seismique-houston",
    brandId: "texasdefined",
    slug: "seismique-houston",
    name: "Seismique",
    summary: "Seismique is a west Houston immersive-art attraction built around interactive light, sound and technology-driven installations, with glow mini golf, arcade games and event spaces extending the visit beyond the core galleries.",
    category: "historic-sites",
    region: "gulf-coast",
    nearestTown: "Houston",
    county: "Harris",
    coordinates: { lat: 29.738768, lng: -95.644768 },
    hero: {
      src: "/images/destinations/seismique-houston-ai-illustration.webp",
      alt: "AI editorial illustration representing the colorful immersive-art atmosphere of Seismique in Houston",
      width: 1200,
      height: 800,
      credit: "AI editorial illustration created for TexasDefined; not documentary photography",
    },
    bestSeason: "Year-round indoor attraction; it is especially useful during Houston's hottest summer afternoons, rainy days and evenings when an indoor entertainment stop fits better than an outdoor itinerary.",
    entryNote: "Admission is ticketed and current hours can change around events. The official visit guidance notes free parking beside the entrance, recommends comfortable shoes, requires socks for the indoor playground and warns that some installations use flashing or shimmering light. Check the official site before arrival.",
    highlights: [
      "Interactive immersive-art environments",
      "Light, sound and technology-driven installations",
      "18-hole glow mini golf",
      "Arcade, games and event spaces",
    ],
    body: [
      "Seismique is designed around participation rather than a conventional gallery sequence. Visitors move through immersive environments that use light, sound, projection, motion and responsive technology, with installations intended to react when people touch, trigger or move through them. That makes the experience closer to an interactive art playground than a traditional museum where the main activity is looking at objects from a distance.",
      "The attraction has expanded beyond its core immersive galleries. Its current Houston offering includes an 18-hole glow-in-the-dark mini golf course, arcade and tabletop games, food-and-drink areas and event programming, so families or groups can treat Seismique as a longer entertainment stop rather than a single exhibit visit. Arcade play is separate from general admission, so travelers should check the current ticket structure before assuming every activity is bundled together.",
      "Practical planning matters more here than at many indoor museums. Seismique asks visitors to wear comfortable shoes, notes that high heels are not permitted inside the experience, requires socks for the indoor playground and restricts bulky items such as strollers and backpacks because storage is not available. Some environments feature flashing or shimmering effects, so visitors with light sensitivity should review the current accessibility and safety guidance before booking.",
    ],
    managingAuthority: "Seismique",
    officialUrl: "https://www.seismique.com/visit",
    reservationUrl: "https://www.seismique.com/tickets",
    address: "2306 S Texas 6, Houston, TX 77077",
    directions: "Seismique is on South Texas 6 in west Houston, south of the Westheimer Road corridor. Use the official address for navigation and allow extra travel time during Houston peak traffic periods.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
