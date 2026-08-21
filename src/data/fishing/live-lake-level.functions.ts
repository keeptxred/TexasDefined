import { createServerFn } from "@tanstack/react-start";

// Parsing/types remain owned by live-lake-level.server; the resilient fetch wrapper handles upstream delivery.
export const getLiveLakeLevel = createServerFn({ method: "GET" })
  .inputValidator((data: { sourceUrl: string }) => data)
  .handler(async ({ data }) => {
    const { loadLiveLakeLevelResilient } = await import("./live-lake-level-fetch.server");
    return loadLiveLakeLevelResilient(data.sourceUrl);
  });

export async function loadLiveLakeLevel(sourceUrl: string) {
  return getLiveLakeLevel({ data: { sourceUrl } });
}
