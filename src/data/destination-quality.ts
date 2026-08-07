import type { Destination } from "./types";

const GENERIC_BEST_SEASON = "Check current conditions before visiting";
const GENERIC_ENTRY = "Confirm current hours, fees, reservations, and access with the official source.";

const categoryAdvice: Record<string, { experience: string; planning: string }> = {
  "state-parks": {
    experience: "State parks are best treated as places to spend time rather than boxes to check. Use the trails, overlooks, water access and interpretive features that are actually available at this park, and leave enough room in the day for weather and trail conditions to change the plan.",
    planning: "Before leaving, check the managing agency for current hours, closures, capacity notices, reservations and facility conditions. Texas heat and storms can change an otherwise easy outing quickly, so carry water and plan around the forecast.",
  },
  "national-parks": {
    experience: "A good visit starts with choosing one part of the landscape instead of trying to cover everything at once. Trail distances, elevation, road conditions and the distance between services can matter as much as mileage on the map.",
    planning: "Check the official park source before departure for current road, trail, weather and access notices. In remote parts of Texas, fuel, water and cell service can be limited, so plan the practical details before the scenic ones.",
  },
  "lakes-rivers": {
    experience: "Water conditions shape the visit here. Shore access, paddling, fishing and swimming opportunities can vary by season, rainfall and operating rules, so use the destination details as a starting point rather than assuming every activity is available every day.",
    planning: "Check current water, weather and access conditions before setting out. If boating, paddling, fishing or swimming is part of the trip, confirm the applicable launch, permit and safety requirements with the official managing source.",
  },
  "major-springs": {
    experience: "Spring-fed places reward an unhurried visit. Water levels, swimming access and crowding can change through the year, while the surrounding trails and natural areas often provide as much reason to stop as the water itself.",
    planning: "Verify current access, water conditions, reservations and swimming rules before traveling. Popular spring destinations can reach capacity, particularly on warm weekends and holidays.",
  },
  caverns: {
    experience: "A cave visit is usually governed by tour schedules, route difficulty and underground conditions rather than the weather at the parking lot. Allow time for check-in and choose a tour that fits the mobility and comfort level of everyone in the group.",
    planning: "Confirm tour availability, age or mobility restrictions, footwear rules and reservation requirements directly with the operator before making the drive.",
  },
  "beaches-coast": {
    experience: "The Texas coast changes with wind, tide and weather. A beach or shoreline stop can feel completely different from one day to the next, so build the visit around current conditions rather than a fixed expectation.",
    planning: "Check beach access, tides, weather, surf and any local driving or parking rules before arrival. Conditions can change quickly during storm season and periods of unusually high water.",
  },
  "historic-sites": {
    experience: "The value of a historic site is in the context: what happened here, what remains, and how the place connects to the surrounding community. Give yourself time for exhibits, grounds and interpretation instead of treating it as a quick photo stop.",
    planning: "Check current opening hours, tour schedules and any preservation-related closures before visiting. Some historic properties have limited days or areas of operation.",
  },
  outdoors: {
    experience: "This is a place to slow down and pay attention to the landscape. Wildlife, seasonal conditions and trail access are never completely predictable, which is part of the reason to leave some flexibility in the day.",
    planning: "Check current access and weather before leaving, bring water, and follow the rules of the agency or organization that manages the property.",
  },
};

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

function usefulText(value?: string) {
  return Boolean(value && value.trim().length >= 35);
}

function genericSummary(destination: Destination) {
  const place = destination.nearestTown && destination.nearestTown !== "Texas" ? ` near ${destination.nearestTown}` : "";
  const county = destination.county ? ` in ${destination.county} County` : "";
  const highlights = destination.highlights.filter(Boolean).slice(0, 2);
  const detail = highlights.length ? ` Known for ${highlights.join(" and ").replace(/\.$/, "")}.` : "";
  return `${destination.name} is a Texas destination${place}${county} worth considering when you are exploring this part of the state}.${detail}`;
}

function substantiveBody(destination: Destination) {
  const existing = destination.body.filter(usefulText);
  if (existing.length >= 3 && existing.join(" ").length >= 450) return existing;

  const advice = categoryAdvice[destination.category] ?? categoryAdvice.outdoors;
  const place = destination.nearestTown && destination.nearestTown !== "Texas" ? ` near ${destination.nearestTown}` : " in Texas";
  const highlights = destination.highlights.filter(Boolean).slice(0, 5);
  const first = usefulText(existing[0]) ? existing[0] : destination.summary;
  const second = highlights.length
    ? `What stands out at ${destination.name} is the mix of ${highlights.join(", ")}. Those details make it easier to decide whether this stop fits a quick outing, a family day trip or a longer route through the area.`
    : `${destination.name}${place} works best as part of a trip built around the surrounding region. ${advice.experience}`;
  const third = `${advice.planning}${destination.officialUrl ? " Use the official visitor-information link on this page for the latest details." : ""}`;
  return [first, second, third].filter(usefulText);
}

export function improveDestinationQuality(destination: Destination): Destination {
  let improved: Destination = { ...destination };

  if (destination.slug === "sheldon-lake-state-park" || destination.slug === "sheldon-lake-state-park-environmental-learning-center") {
    improved = { ...improved, ...sheldonLake };
  }

  const summary = usefulText(improved.summary) && !/^A closer look at /i.test(improved.summary)
    ? improved.summary
    : genericSummary(improved);

  return {
    ...improved,
    summary,
    bestSeason: usefulText(improved.bestSeason) && improved.bestSeason !== GENERIC_BEST_SEASON
      ? improved.bestSeason
      : (improved.bestSeason || GENERIC_BEST_SEASON),
    entryNote: usefulText(improved.entryNote) ? improved.entryNote : GENERIC_ENTRY,
    body: substantiveBody({ ...improved, summary }),
    highlights: improved.highlights.filter(Boolean).slice(0, 12),
    hero: {
      ...improved.hero,
      alt: improved.hero.alt && !/in Texas$/i.test(improved.hero.alt)
        ? improved.hero.alt
        : `${improved.name}, Texas`,
    },
  };
}

export function improveDestinationCatalog(destinations: Destination[]) {
  return destinations.map(improveDestinationQuality);
}
