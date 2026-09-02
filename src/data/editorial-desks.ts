import type { Author } from "./types";

/**
 * Institutional bylines only. These IDs intentionally preserve legacy article
 * references while removing fictional human personas from the public site.
 * A real human contributor must be added through an explicit, verified author
 * record rather than generated automatically.
 */
export const HOMES_LAND_EDITORIAL_DESK_ID = "a-homes-land";
export const HISTORY_HERITAGE_EDITORIAL_DESK_ID = "a-history-heritage";

export const editorialDesks: Author[] = [
  {
    id: "a-hollis",
    name: "Texas Defined Editorial Desk",
    role: "Editorial desk",
    bio: "Texas Defined editors produce and review statewide features, explainers and service journalism using published sources and official records.",
  },
  {
    id: "a-marisol",
    name: "Texas Defined Food & Culture Desk",
    role: "Food & culture desk",
    bio: "Texas Defined's Food & Culture Desk covers barbecue, regional food traditions, festivals and the people and places that shape Texas culture.",
  },
  {
    id: "a-dell",
    name: "Texas Defined Travel & Outdoors Desk",
    role: "Travel & outdoors desk",
    bio: "Texas Defined's Travel & Outdoors Desk covers parks, road trips, small towns, public lands and practical ways to explore Texas.",
  },
  {
    id: HOMES_LAND_EDITORIAL_DESK_ID,
    name: "Texas Defined Homes & Property Desk",
    role: "Homes & property desk",
    bio: "Texas Defined's Homes & Property Desk covers homeownership, property, utilities, weather resilience, maintenance and land stewardship using official agencies, extension services and other primary sources. Its service journalism is practical guidance, not a substitute for licensed legal, insurance, engineering or trade advice.",
  },
  {
    id: HISTORY_HERITAGE_EDITORIAL_DESK_ID,
    name: "Texas Defined History & Heritage Desk",
    role: "History & heritage desk",
    bio: "Texas Defined's History & Heritage Desk covers Texas history, historic people and places, cultural heritage, preservation and archival context using primary records and accountable institutional sources whenever practical.",
  },
];

export const editorialDeskById = (id: string) =>
  editorialDesks.find((desk) => desk.id === id) ?? null;

export const DEFAULT_EDITORIAL_DESK_ID = "a-hollis";
