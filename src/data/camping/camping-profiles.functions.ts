import { createServerFn } from "@tanstack/react-start";
import type { CampingProfile } from "./types";
import type { CampingSearchIndexEntry } from "./camping-profiles";

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

export function getCampingProfilesForDestinationServerFn(destinationSlug: string): Promise<CampingProfile[]> {
  return loadDestinationCampingProfiles({ data: { destinationSlug } });
}

export function getCampingSearchIndexServerFn(): Promise<CampingSearchIndexEntry[]> {
  return loadCampingSearchIndex();
}
