import type { TopTexasAttractionSlug } from "./top-texas-attractions";

export type TopAttractionRoadTrip = {
  id: string;
  name: string;
  duration: string;
  summary: string;
  planningNote: string;
  stops: readonly TopTexasAttractionSlug[];
};

/**
 * Editorial route groupings built from the Top 25 collection. These are not
 * turn-by-turn directions; they are trip structures that help readers combine
 * attractions that belong naturally in the same Texas itinerary.
 */
export const TOP_ATTRACTION_ROAD_TRIPS: readonly TopAttractionRoadTrip[] = [
  {
    id: "san-antonio-hill-country",
    name: "San Antonio & Hill Country essentials",
    duration: "4–6 days",
    summary: "Build from San Antonio's mission-and-river core into caverns, wildlife, Gruene and Fredericksburg for the densest Top-25 cluster in the state.",
    planningNote: "Keep the first two days centered in San Antonio, then move north toward the Natural Bridge area, New Braunfels and Fredericksburg instead of backtracking each night.",
    stops: [
      "the-alamo",
      "san-antonio-river-walk",
      "san-antonio-missions-national-historical-park",
      "natural-bridge-caverns",
      "natural-bridge-wildlife-ranch",
      "gruene-historic-district",
      "fredericksburg-historic-district",
    ],
  },
  {
    id: "austin-central-texas",
    name: "Austin & Central Texas history, nature and caves",
    duration: "3–4 days",
    summary: "Combine the Capitol and Bullock Museum with the Wildflower Center, Hamilton Pool and Inner Space Cavern for a compact Central Texas mix of civic history and natural systems.",
    planningNote: "Treat Hamilton Pool as the schedule-sensitive stop and build the flexible Austin museums, gardens and Georgetown cavern around its current access requirements.",
    stops: [
      "texas-state-capitol",
      "bullock-texas-state-history-museum",
      "lady-bird-johnson-wildflower-center",
      "hamilton-pool-preserve",
      "inner-space-cavern",
    ],
  },
  {
    id: "houston-galveston-coast",
    name: "Houston, Galveston & the upper Gulf Coast",
    duration: "4–5 days",
    summary: "Use Houston's science and wildlife institutions as the inland anchor, then continue south-east to Galveston's pyramids and historic Pleasure Pier.",
    planningNote: "Space Center Houston deserves the most advance planning. Group the Museum District attractions on one day and Galveston's two Top-25 stops on another.",
    stops: [
      "space-center-houston",
      "houston-museum-of-natural-science",
      "houston-zoo",
      "moody-gardens",
      "galveston-island-historic-pleasure-pier",
    ],
  },
  {
    id: "dallas-fort-worth",
    name: "Dallas–Fort Worth history and culture",
    duration: "2–3 days",
    summary: "Pair presidential history and gardens in Dallas with the working Western heritage of the Fort Worth Stockyards for a compact North Texas city trip.",
    planningNote: "Keep the Dallas stops together before changing cities; the Stockyards can anchor a separate Fort Worth day and evening.",
    stops: [
      "sixth-floor-museum-at-dealey-plaza",
      "dallas-arboretum-and-botanical-garden",
      "fort-worth-stockyards",
    ],
  },
  {
    id: "west-texas-national-parks",
    name: "West Texas national-park expedition",
    duration: "5–7 days",
    summary: "Connect Big Bend and Guadalupe Mountains for the most ambitious outdoors trip in the Top 25, with enough time to respect the scale, heat and driving distances of far West Texas.",
    planningNote: "Do not treat the parks as adjacent day-trip stops. Give each park its own base and build in a transfer day or a deliberately paced drive between them.",
    stops: ["big-bend-national-park", "guadalupe-mountains-national-park"],
  },
  {
    id: "texas-panhandle",
    name: "Texas Panhandle canyon & Route 66 road trip",
    duration: "2–3 days",
    summary: "Combine Palo Duro Canyon's landscape with Cadillac Ranch and Amarillo's Route 66 identity for a short Panhandle route built around two very different Texas icons.",
    planningNote: "Use cooler daylight hours for the canyon and reserve Amarillo's roadside-art stops for the more flexible part of the schedule.",
    stops: ["palo-duro-canyon-state-park", "cadillac-ranch"],
  },
  {
    id: "south-texas-gulf",
    name: "South Texas coast extension",
    duration: "2–3 days",
    summary: "Make Padre Island National Seashore the anchor rather than a quick beach stop, with enough time for barrier-island ecology, shoreline conditions and a Corpus Christi base.",
    planningNote: "This route has one Top-25 anchor by design. Use the attraction's area guide and Trip Planner to add Corpus Christi museums, coastal nature and other nearby stops without inventing a second Top-25 requirement.",
    stops: ["padre-island-national-seashore"],
  },
] as const;
