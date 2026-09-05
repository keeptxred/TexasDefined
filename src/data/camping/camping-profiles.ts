import type { CampingProfile } from "./types";

export interface CampingSearchIndexEntry {
  destinationSlug: string;
  terms: string[];
}

export async function getCampingProfilesForDestination(destinationSlug: string): Promise<CampingProfile[]> {
  const { getCampingProfilesForDestinationServerFn } = await import("./camping-profiles.functions");
  return getCampingProfilesForDestinationServerFn(destinationSlug);
}

export async function getCampingSearchIndex(): Promise<CampingSearchIndexEntry[]> {
  const { getCampingSearchIndexServerFn } = await import("./camping-profiles.functions");
  return getCampingSearchIndexServerFn();
}
