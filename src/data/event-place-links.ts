import type { TexasEvent, TexasRegion } from "./types";

export interface PlaceUpcomingEventLink {
  slug: string;
  href: string;
  name: string;
  city: string;
  countyName?: string;
  region: TexasRegion;
  category: TexasEvent["category"];
  detail: string;
  startDate: string;
  endDate?: string;
  sourceCheckedAt?: string;
}
