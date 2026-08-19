import type { Destination } from "./types";

const CHECKED = "2026-08-19";

const curated: Record<string, Partial<Destination>> = {
  "enchanted-rock": {
    officialUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock",
    sourceCheckedAt: CHECKED,
    entryNote: "Advance reservations are strongly recommended because the natural area can reach capacity. Check current trail alerts before leaving; elevated trails may close during wet or inclement weather.",
  },
  "palo-duro-canyon": {
    officialUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon",
    sourceCheckedAt: CHECKED,
    entryNote: "The park often reaches capacity, so reserve camping or day-use entry before busy visits. Trail closures can occur because of wet weather, poor conditions or excessive heat.",
  },
  "blue-hole-wimberley": {
    officialUrl: "https://www.cityofwimberley.com/Facilities/Facility/Details/Blue-Hole-Regional-Park-2",
    sourceCheckedAt: CHECKED,
    bestSeason: "May through early September for reserved swimming; the surrounding regional park is open year-round",
    entryNote: "The regional park is open daily, while swimming is seasonal and reservation-controlled. Confirm the current swim calendar, session availability and admission rules with Wimberley Parks & Recreation before traveling for a swim.",
  },
  "big-bend-chisos-basin": {
    summary: "The mountain heart of Big Bend National Park, where the Chisos rise above the Chihuahuan Desert and major trails begin from a high-elevation basin surrounded by cliffs and iconic views.",
    bestSeason: "Fall through spring for the broadest hiking comfort; always check current heat, weather and access alerts",
    entryNote: "Big Bend National Park remains open and current NPS information says the Chisos Basin remains accessible after previously planned 2026 construction changed. Check the park's live alerts and Chisos Basin access page immediately before travel because project plans and services can change.",
    highlights: [
      "Window View and Window Trail scenery",
      "High-elevation Chisos Mountains hiking",
      "Big Bend National Park dark skies",
      "Direct access to one of the park's major trail systems",
    ],
    body: [
      "Chisos Basin is the mountain center of Big Bend National Park, sitting above the surrounding Chihuahuan Desert and ringed by the Chisos Mountains. The elevation changes the climate, vegetation and views enough that the basin feels like a separate landscape inside an already enormous park.",
      "Many of Big Bend's best-known mountain hikes begin in or near the basin, including routes toward the Window and deeper into the Chisos backcountry. The basin also serves as a practical orientation point for visitors who want to understand how the mountain district fits into the park's much larger desert and river geography.",
      "Planning information around the basin has changed during 2026 as National Park Service construction plans evolved. Do not rely on an older closure calendar or an old lodging assumption. Big Bend remains open, and visitors should check the current NPS Chisos Basin access page, park alerts, campground status and concession information immediately before departure.",
    ],
    officialUrl: "https://www.nps.gov/bibe/planyourvisit/chisos-basin-access.htm",
    sourceCheckedAt: CHECKED,
  },
  "gruene-historic-district": {
    officialUrl: "https://www.gruenetexas.com/",
    sourceCheckedAt: CHECKED,
    entryNote: "The historic district is walkable and free to explore, while individual music venues, restaurants, shops and river outfitters set their own schedules, tickets and reservations. Check the district's current calendar before a music-focused visit.",
  },
};

export function applyCuratedDestinationBatch53(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override
    ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero }
    : destination;
}

export function applyCuratedDestinationsBatch53(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch53);
}
