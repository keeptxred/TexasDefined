import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-08";

export const viatorDestinationExpansionWave10: Destination[] = [
  {
    id: "viator-expansion-galveston-bay",
    brandId: "texasdefined",
    slug: "galveston-bay",
    name: "Galveston Bay",
    summary: "Texas' largest estuary, where freshwater flowing toward the Upper Gulf Coast mixes with Gulf saltwater across a broad network of open bay, marsh, oyster reef and shoreline habitat used for fishing, boating, paddling and wildlife watching.",
    category: "beaches-coast",
    region: "gulf-coast",
    nearestTown: "Galveston",
    coordinates: { lat: 29.47, lng: -94.9 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Galveston_Bay.jpg?width=1600",
      alt: "Galveston Bay viewed from the Texas City shoreline",
      width: 3264,
      height: 2448,
      credit: "Jeremy Mosley · Wikimedia Commons · CC BY-SA 2.0",
    },
    bestSeason: "Fall through spring for milder temperatures and comfortable shoreline time; summer trips require more planning for heat, humidity, thunderstorms and tropical-weather risk.",
    entryNote: "Galveston Bay has no single entrance. Choose a public shoreline, park, marina or launch appropriate to the activity, then check current weather, tides, marine conditions and local access rules before heading out.",
    highlights: [
      "Largest estuary in Texas",
      "Marshes, oyster reefs and open-bay habitat",
      "Fishing, paddling, sailing and wildlife watching",
      "Multiple access communities around the Upper Gulf Coast",
    ],
    body: [
      "Galveston Bay is the largest of Texas' estuaries and one of the largest in the United States. The Galveston Bay Estuary Program describes the system as the meeting place of freshwater and Gulf saltwater, creating a productive coastal environment that connects rivers, wetlands, shorelines and the Gulf of Mexico rather than functioning as a single beach or park.",
      "The bay's ecological value comes from its variety. Marshes, oyster reefs, seagrass areas, open water and surrounding coastal habitat support fish, shrimp, birds and other wildlife. Texas Parks and Wildlife describes the open bay's soft-bottom waters and plankton-rich food web as important habitat for young commercially important fish and shrimp, while the wider estuary supports recreation and working-waterfront uses at the same time.",
      "For visitors, the right way to experience Galveston Bay depends on the activity: fishing, sailing, paddling, wildlife viewing and shoreline stops all use different access points around the estuary. Commercial cruises and charters can be useful ways to get onto the water, but the durable destination is the bay itself. Current public weather, tide, marine-safety and local access information should control any time-sensitive trip plan.",
    ],
    officialUrl: "https://gbep.texas.gov/galveston-bay-101/",
    directions: "There is no single Galveston Bay entrance. Galveston Island, Texas City, Kemah and Seabrook provide different shoreline and marina approaches; choose a legal public access point or operator based on the part of the bay and activity you plan to use.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
