import { createServerFn } from "@tanstack/react-start";

import { loadLiveLakeLevelResilient } from "./live-lake-level-fetch.server";

// Parsing/types remain owned by live-lake-level.server; this server function statically binds the resilient fetcher.
export const getLiveLakeLevel = createServerFn({ method: "GET" })
  .inputValidator((data: { sourceUrl: string }) => data)
  .handler(async ({ data }) => loadLiveLakeLevelResilient(data.sourceUrl));

export async function loadLiveLakeLevel(sourceUrl: string) {
  return getLiveLakeLevel({ data: { sourceUrl } });
}
