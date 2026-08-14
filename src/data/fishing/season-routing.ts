import type { FishingSeason } from "./types";

export const FISHING_SEASONS_PATH = "/fishing/seasons";
export const FISHING_SEASONS_VERIFIED_AT = "2026-08-14";
export const FISHING_SEASON_FILTERS = ["spring", "summer", "fall", "winter"] as const satisfies readonly FishingSeason[];

export type FishingSeasonFilter = (typeof FISHING_SEASON_FILTERS)[number];

export function isFishingSeasonFilter(value: unknown): value is FishingSeasonFilter {
  return typeof value === "string" && (FISHING_SEASON_FILTERS as readonly string[]).includes(value);
}
