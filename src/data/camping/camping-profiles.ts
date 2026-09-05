import { createServerFn } from "@tanstack/react-start";
import type { CampingProfile } from "./types";

export interface CampingSearchIndexEntry {
  destinationSlug: string;
  terms: string[];
}

const loadDestinationCampingProfiles = createServerFn({ method: "GET" })
  .inputValidator((data: { destinationSlug: string }) => data)
  .handler(async ({ data }) => {
    const { loadCampingProfilesForDestinationServer } = await import("./camping-profiles.server");
    return loadCampingProfilesForDestinationServer(data.destinationSlug);
  });

const loadCampingSearchIndex = createServerFn({ method: "GET" }).handler(async () => {
  const { loadCampingSearchIndexServer } = await import("./camping-profiles.server");
  return loadCampingSearchIndexServer();
});

export function getCampingProfilesForDestination(destinationSlug: string): Promise<CampingProfile[]> {
  return loadDestinationCampingProfiles({ data: { destinationSlug } });
}

export function getCampingSearchIndex(): Promise<CampingSearchIndexEntry[]> {
  return loadCampingSearchIndex();
}
