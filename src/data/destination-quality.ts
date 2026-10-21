import type { Destination } from "./types";

const sheldonLake: Partial<Destination> = {
  summary: "A 2,800-acre pocket of wetlands, prairie, ponds and woods on Houston’s northeast side, with free entry, accessible trails, fishing and an 82-foot observation tower overlooking the park and distant skyline.",
  nearestTown: "Houston",
  coordinates: { lat: 29.857461, lng: -95.160029 },
  bestSeason: "Spring and fall for comfortable trail weather and birding; the park is open year-round",
  entryNote: "No entrance fee. The park can reach capacity, so TPWD recommends reserving a free day-use pass before busy visits. Check current park alerts before leaving.",
  highlights: [
    "John Jacob Observation Tower with views across the wetlands and toward Houston",
    "Two miles of trails through restored prairie, wetlands, woods and former hatchery ponds",
    "Fishing, paddling and wildlife watching around Sheldon Lake and the park ponds",
    "Accessible facilities, trails, fishing decks and interpretive features",
  ],
  body: [
    "Sheldon Lake is the rare Houston-area state park where the story is as much about restoration as recreation. The 2,800-acre park protects lake, marsh, woods and coastal prairie on the edge of the city. Land that once served as a fish hatchery has been allowed and actively helped to return to wetland habitat, turning former production ponds into places for birds, frogs, alligators and other wildlife.",
    "The signature view comes from the 82-foot John Jacob Observation Tower, which looks across the park and, on a clear day, toward the Houston skyline and San Jacinto Monument. At ground level, roughly two miles of trails and boardwalks move through prairie, wetlands and naturalized hatchery ponds. Sheldon Lake also supports fishing and paddling, while two park ponds offer catch-and-release fishing geared toward families and new anglers.",
    "This is a day-use park rather than a camping destination, and that makes it especially useful for a half-day Houston outing. Entry is free, but capacity can be an issue. Check the Texas Parks and Wildlife Department page and current alerts before leaving, especially for temporary road, trail or observation-tower access changes.",
  ],
  county: "Harris",
  address: "14140 Garrett Rd., Houston, TX 77044",
  managingAuthority: "Texas Parks and Wildlife Department",
  officialUrl: "https://tpwd.texas.gov/state-parks/sheldon-lake",
  accessibilityNotes: "TPWD lists the park’s facilities and trails as accessible. The mostly flat trail system includes boardwalk sections; check current alerts for the operating status of the observation-tower elevator.",
};

export function improveDestinationQuality(destination: Destination): Destination {
  const improved = destination.slug === "sheldon-lake-state-park" || destination.slug === "sheldon-lake-state-park-environmental-learning-center"
    ? { ...destination, ...sheldonLake }
    : destination;

  // Keep authored material only; quality/indexing checks must flag thin pages
  // rather than artificially making them appear researched with generic copy.
  return {
    ...improved,
    body: improved.body.filter((paragraph) => Boolean(paragraph?.trim())),
    highlights: improved.highlights.filter(Boolean).slice(0, 12),
  };
}

export function improveDestinationCatalog(destinations: Destination[]) {
  return destinations.map(improveDestinationQuality);
}
