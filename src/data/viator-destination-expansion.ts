import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-08";

/**
 * Durable TexasDefined destination pages discovered while reviewing current
 * Viator Texas inventory. These records describe the place or public route,
 * not the affiliate product. Booking inventory remains dynamic.
 */
export const viatorDestinationExpansion: Destination[] = [
  {
    id: "viator-expansion-king-william-historic-district",
    brandId: "texasdefined",
    slug: "king-william-historic-district",
    name: "King William Historic District",
    summary: "A walkable San Antonio historic district south of downtown, known for ornate nineteenth-century houses, river access and one of the city's strongest concentrations of preserved residential architecture.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "San Antonio",
    county: "Bexar County",
    coordinates: { lat: 29.4145, lng: -98.4933 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/San%20Antonio%20historic%20King%20William%20District%20(4766314235).jpg?width=1600",
      alt: "Historic residential architecture in San Antonio's King William Historic District",
      width: 3648,
      height: 2736,
      credit: "Tony Kent · Wikimedia Commons · CC BY-SA 2.0",
    },
    bestSeason: "Fall through spring for comfortable walking; early morning and late afternoon are best during warmer months.",
    entryNote: "King William is an active residential neighborhood as well as a historic district. Use public sidewalks and streets, respect private property, and verify current hours separately for any house museums or businesses you plan to enter.",
    highlights: [
      "Nineteenth-century residential architecture",
      "National Register historic district",
      "San Antonio River edge",
      "Southtown and downtown access",
    ],
    body: [
      "King William Historic District preserves one of San Antonio's most distinctive residential landscapes. The City of San Antonio describes the district as generally bounded by the San Antonio River, Cesar Chavez Boulevard, South St. Mary's Street and South Alamo Street, with most of its major houses dating from roughly 1850 through 1899.",
      "The district rewards a slow walk because its appeal is the streetscape rather than a single attraction. Large lots, mature trees and ornate houses reveal how prosperous nineteenth-century San Antonians shaped the neighborhood, while the nearby river and Southtown businesses make it easy to connect architecture with a broader central-city outing.",
      "Visitors should treat the neighborhood differently from a museum campus. Many buildings are private homes, while sites such as Villa Finale and the Steves Homestead have their own admission rules and schedules. A guided or self-guided walking tour can add historical context without turning private residences into attractions that should be entered.",
    ],
    managingAuthority: "City of San Antonio",
    officialUrl: "https://www.sanantonio.gov/Mission-Trails/Mission-Trails-Historic-Sites/Historic-Districts-Neighborhoods/King-William-Historic-District/King-William-Historic-District-Expanded",
    directions: "Use the blocks around King William Street and the surrounding historic district south of downtown; the district spans multiple public streets rather than a single entrance.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "viator-expansion-galveston-tree-sculptures",
    brandId: "texasdefined",
    slug: "galveston-tree-sculptures",
    name: "Galveston Tree Sculptures",
    summary: "A free self-guided public-art route through Galveston neighborhoods where artists transformed trees lost after Hurricane Ike into whimsical wood sculptures.",
    category: "historic-sites",
    region: "gulf-coast",
    nearestTown: "Galveston",
    county: "Galveston County",
    coordinates: { lat: 29.305, lng: -94.79 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/1428%20Broadway%20Street%20-%20Galveston.jpg?width=1600",
      alt: "Historic East End streetscape in Galveston, where many of the island's tree sculptures are concentrated",
      width: 4975,
      height: 3455,
      credit: "Farragutful · Wikimedia Commons · CC BY-SA 4.0",
    },
    bestSeason: "Year-round; fall through spring is most comfortable for walking or biking the route.",
    entryNote: "The sculpture route passes many private homes. View works from public rights-of-way, do not enter gates without permission, and do not climb, sit on or hang from the sculptures.",
    highlights: [
      "Hurricane Ike recovery story",
      "Self-guided public-art route",
      "East End Historic District streets",
      "Free walking, biking or driving experience",
    ],
    body: [
      "Galveston's tree sculptures grew out of the destruction left by Hurricane Ike in September 2008. Saltwater storm surge and wind damaged or killed thousands of island trees, and residents later worked with sculpture artists to turn some surviving trunks into public-facing works of art rather than removing every remnant.",
      "Visit Galveston's current self-guided route begins around Sealy Avenue and 20th Street and continues through neighborhoods with a large concentration of works in and around the East End Historic District. The sculptures range from coastal wildlife and family memorials to playful characters, making the route part public art walk and part neighborhood history tour.",
      "Because many sculptures stand in front yards or gardens, the experience depends on respectful viewing. Walkers and cyclists can cover a concentrated section at a relaxed pace, while drivers can use the official route to reach more scattered works. The tour pairs naturally with Galveston's historic homes, downtown and other self-guided island heritage routes.",
    ],
    officialUrl: "https://www.visitgalveston.com/blog/take-a-self-guided-tree-sculpture-tour/",
    directions: "The official self-guided route begins around Sealy Avenue and 20th Street and continues through multiple Galveston neighborhoods, including the East End Historic District.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
