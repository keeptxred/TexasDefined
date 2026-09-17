import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-08";

export const viatorDestinationExpansionWave5: Destination[] = [
  {
    id: "viator-expansion-barton-creek-greenbelt",
    brandId: "texasdefined",
    slug: "barton-creek-greenbelt",
    name: "Barton Creek Greenbelt",
    summary: "Austin's limestone-lined urban wilderness, with more than 12 miles of shared-use trail, multiple trailheads, swimming holes when water is flowing, climbing areas and rugged Hill Country terrain inside the city.",
    category: "outdoors",
    region: "hill-country",
    nearestTown: "Austin",
    county: "Travis County",
    coordinates: { lat: 30.26414, lng: -97.77322 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/BartonCreekGreenbelt.jpg?width=1600",
      alt: "Barton Creek flowing over limestone rocks in the Barton Creek Greenbelt in Austin",
      width: 3072,
      height: 2304,
      credit: "Julia Duffy (JTduffy) · Wikimedia Commons · Public domain",
    },
    bestSeason: "Fall through spring for hiking and biking; swimming conditions depend on recent rainfall, so water may be low or absent during dry periods.",
    entryNote: "The Greenbelt has multiple trailheads rather than one entrance. Water levels can change quickly, lighting is limited to nonexistent, terrain can be rough and uneven, and Austin park facilities officially close after 10 p.m. Check weather and current trail guidance before entering.",
    highlights: [
      "More than 12 miles of trail",
      "Limestone cliffs and rugged Hill Country terrain",
      "Multiple swimming holes when Barton Creek is flowing",
      "Hiking, mountain biking and climbing access",
    ],
    body: [
      "Barton Creek Greenbelt is one of Austin's defining outdoor spaces: a long natural corridor where limestone walls, wooded trail, rocky creekbed and swimming holes cut through the city. Austin Parks and Recreation describes more than 12 miles to explore overall, while the main Greenbelt route runs through a chain of official access points from the Zilker area toward the western trail sections.",
      "The experience changes dramatically with rainfall. Barton Creek can hold inviting pools and moving water after wet periods, but the city does not monitor swimming-hole water levels and warns that conditions can change quickly. Visitors should therefore plan the Greenbelt first as a hiking and biking destination, then treat swimming as a condition-dependent bonus rather than something guaranteed by the season.",
      "Trailheads such as Zilker, Spyglass, Gus Fruh, the 360 access, Gaines/Twin Falls and Camp Craft/Hill of Life provide different ways into the corridor. The Greenbelt also supports climbing and connects with the broader Violet Crown Trail system. Guided hikes can be useful for visitors who want local route context, but the City of Austin remains the authority for trail access, safety, closures and park rules.",
    ],
    managingAuthority: "City of Austin Parks and Recreation",
    officialUrl: "https://www.austintexas.gov/parks/locations/barton-creek-greenbelt",
    directions: "Choose an official trailhead based on the section you want to explore. The Zilker/Barton Creek Greenbelt trailhead begins near 2212 William Barton Drive; other official access points are listed on the City of Austin Greenbelt page.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
