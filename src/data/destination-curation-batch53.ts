import type { Destination } from "./types";

const CHECKED = "2026-08-19";

const curated: Record<string, Partial<Destination>> = {
  "enchanted-rock": {
    summary: "A massive pink-granite dome in the Texas Hill Country north of Fredericksburg, with exposed-rock hiking, sweeping views, dark skies and a landscape shaped by weather, water and ancient geology.",
    officialUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock",
    sourceCheckedAt: CHECKED,
    bestSeason: "Fall through spring for cooler exposed-rock hiking; check current heat and weather alerts year-round",
    entryNote: "Advance reservations are strongly recommended because the natural area can reach capacity. Check current trail alerts before leaving; elevated trails may close during wet or inclement weather.",
    highlights: [
      "Summit Trail across the exposed granite dome",
      "Hill Country views from the high rock",
      "Rock formations, vernal pools and natural-area geology",
      "Dark-sky viewing away from major city light",
    ],
    body: [
      "Enchanted Rock rises abruptly above the Hill Country as a broad mass of exposed pink granite rather than a conventional wooded summit. The climb is visually simple but physically exposed, and the open rock gives visitors an unusually clear sense of the scale of the surrounding ranch country and granite landscape.",
      "The Summit Trail is the best-known route, but the natural area is more than one climb. Trails wrap around the granite formations, smaller domes and lower country, while shallow depressions on the rock can hold temporary pools after rain. Those fragile features and the bare-granite terrain are part of why visitors are asked to stay attentive to closures and low-impact rules.",
      "Weather controls the practical side of a visit. The granite offers little shade, can become dangerously hot, and may be closed to elevated hiking when wet or during unsafe conditions. Reserve ahead for busy dates and check the Texas Parks and Wildlife Department alerts before the drive rather than assuming walk-up entry or every trail will be available.",
    ],
  },
  "palo-duro-canyon": {
    summary: "A vast red-rock canyon system cut into the Texas Panhandle near Canyon, with a road descending from the rim to a floor of layered geology, signature trails, camping and broad High Plains views.",
    officialUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon",
    sourceCheckedAt: CHECKED,
    bestSeason: "Spring and fall for the broadest hiking comfort; summer canyon-floor heat can be severe",
    entryNote: "The park often reaches capacity, so reserve camping or day-use entry before busy visits. Trail closures can occur because of wet weather, poor conditions or excessive heat.",
    highlights: [
      "Canyon-rim overlooks and the descent to the canyon floor",
      "Lighthouse Trail through layered red-rock country",
      "Camping and trail access below the Caprock Escarpment",
      "Panhandle geology and wide-open sunset views",
    ],
    body: [
      "Palo Duro Canyon breaks the flat visual rhythm of the Texas Panhandle with a sudden drop into layered red, orange and pale rock. The park road descends from the rim to the canyon floor, letting visitors experience the change in elevation and geology before they ever step onto a trail.",
      "The Lighthouse formation is the best-known hiking objective, but the park supports a much larger network of routes through side canyons, open floor and higher ground. A good first visit balances an overlook from the rim with time below, where the canyon walls feel larger and the exposed landscape makes distance and temperature more consequential.",
      "Heat and trail conditions should shape the itinerary. The canyon floor can be substantially hotter than the rim, storms can make roads or trails unsafe, and busy dates can fill available entry. Reserve ahead when possible, carry enough water for exposed travel and check current Texas Parks and Wildlife Department alerts immediately before departure.",
    ],
  },
  "blue-hole-wimberley": {
    summary: "A spring-fed swimming area on Cypress Creek inside Wimberley's Blue Hole Regional Park, shaded by mature cypress trees and managed through a seasonal reservation system that protects the experience from uncontrolled crowding.",
    officialUrl: "https://www.cityofwimberley.com/Facilities/Facility/Details/Blue-Hole-Regional-Park-2",
    sourceCheckedAt: CHECKED,
    bestSeason: "May through early September for reserved swimming; the surrounding regional park is open year-round",
    entryNote: "The regional park is open daily, while swimming is seasonal and reservation-controlled. Confirm the current swim calendar, session availability and admission rules with Wimberley Parks & Recreation before traveling for a swim.",
    highlights: [
      "Spring-fed Cypress Creek swimming beneath mature cypress trees",
      "Reservation-controlled seasonal swim sessions",
      "Shaded lawns and regional-park recreation outside the swim area",
      "Easy access from central Wimberley",
    ],
    body: [
      "Blue Hole is one of the Hill Country's best-known spring-fed swimming places, but the experience is defined as much by management as by the water. Cypress Creek runs through a shaded corridor of mature trees, creating a cool, compact swimming setting inside a larger city-owned regional park rather than an unmanaged roadside swimming hole.",
      "Swimming access is seasonal and controlled through timed or limited reservations, which means a visitor should plan around the official swim calendar instead of simply arriving on a hot afternoon. The surrounding regional park remains useful beyond swim season, with open space and recreation that make the property more than a single fenced pool area.",
      "Water access, operating dates, session rules and admission can change from season to season. Confirm the current City of Wimberley information before making a swimming-focused drive, and distinguish the year-round regional park from the separately managed seasonal swim area when planning the day.",
    ],
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
    summary: "A preserved nineteenth-century community beside the Guadalupe River in New Braunfels, centered on Gruene Hall, historic commercial buildings, live music, dining and a walkable district that survived because later development largely passed it by.",
    officialUrl: "https://www.gruenetexas.com/",
    sourceCheckedAt: CHECKED,
    bestSeason: "Year-round, with spring and fall offering the most comfortable weather for walking the district and river area",
    entryNote: "The historic district is walkable and free to explore, while individual music venues, restaurants, shops and river outfitters set their own schedules, tickets and reservations. Check the district's current calendar before a music-focused visit.",
    highlights: [
      "Gruene Hall and the district's live-music tradition",
      "Walkable collection of preserved historic buildings",
      "Guadalupe River recreation nearby",
      "Restaurants, shops and gathering places around the original town center",
    ],
    body: [
      "Gruene grew as a nineteenth-century community on the Guadalupe River and later escaped much of the redevelopment that erased similar commercial districts elsewhere. That history leaves a compact collection of old buildings that still functions as an active neighborhood of music, food and shops rather than a reconstructed museum street.",
      "Gruene Hall is the district's defining landmark and keeps live music at the center of the experience, but a visit works best on foot. The surrounding buildings, river setting and small scale make it easy to move between a meal, a show, shopping and time near the Guadalupe without treating each stop as a separate driving destination.",
      "The district itself does not operate on one universal ticket or schedule. Venues, restaurants and outfitters maintain their own hours and reservation systems, and popular performances can require advance planning. Check the official Gruene calendar before a music-focused trip and verify river conditions separately if water recreation is part of the day.",
    ],
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
