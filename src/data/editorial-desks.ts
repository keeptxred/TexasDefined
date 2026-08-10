import type { Author } from "./types";

/**
 * Institutional bylines only. These IDs intentionally preserve legacy article
 * references while removing fictional human personas from the public site.
 * A real human contributor must be added through an explicit, verified author
 * record rather than generated automatically.
 */
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
];

export const editorialDeskById = (id: string) =>
  editorialDesks.find((desk) => desk.id === id) ?? null;

export const DEFAULT_EDITORIAL_DESK_ID = "a-hollis";
