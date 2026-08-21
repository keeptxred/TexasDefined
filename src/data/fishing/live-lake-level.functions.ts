import { createServerFn } from "@tanstack/react-start";

export const getLiveLakeLevel = createServerFn({ method: "GET" })
  .inputValidator((data: { sourceUrl: string }) => data)
  .handler(async ({ data }) => {
    const { loadLiveLakeLevel: loadLiveLakeLevelServer } = await import("./live-lake-level.server");
    return loadLiveLakeLevelServer(data.sourceUrl);
  });

export async function loadLiveLakeLevel(sourceUrl: string) {
  return getLiveLakeLevel({ data: { sourceUrl } });
}
