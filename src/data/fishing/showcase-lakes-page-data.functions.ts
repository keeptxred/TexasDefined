import { createServerFn } from "@tanstack/react-start";

import { loadLiveLakeLevelResilient } from "./live-lake-level-fetch.server";
import { loadShowcaseLakesPageDataServer } from "./showcase-lakes-page-data.server";

const PAGE_LIVE_LEVEL_BUDGET_MS = 1_500;
// Exact routes with observed intermittent production HTTP 500s. The live strip
// still uses the official source after hydration; no invented or stale value.
const DEFERRED_LIVE_LEVEL_SLUGS = new Set(["lake-stamford", "falcon-international-reservoir", "lake-abilene"]);

async function loadPageLiveLakeLevel(sourceUrl: string) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      loadLiveLakeLevelResilient(sourceUrl),
      new Promise<null>((resolve) => {
        timeoutId = setTimeout(() => resolve(null), PAGE_LIVE_LEVEL_BUDGET_MS);
      }),
    ]);
  } catch {
    // The provider is optional. Keep the verified guide and official-source link
    // available if parsing, transport, or a runtime rejection escapes the adapter.
    return null;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export const getShowcaseLakePageData = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    try {
      const lake = loadShowcaseLakesPageDataServer(data.slug)[data.slug];
      if (!lake) return null;
      return {
        ...lake,
        // Keep optional remote readings off these editorial SSR critical paths.
        liveLakeLevel: DEFERRED_LIVE_LEVEL_SLUGS.has(data.slug)
          ? null : await loadPageLiveLakeLevel(lake.sources.liveLevel.url),
      };
    } catch (error) {
      console.error("[fishing-lake-page-data] Unable to render lake", data.slug, error);
      throw error;
    }
  });

export const getShowcaseLakesPageData = createServerFn({ method: "GET" }).handler(async () => {
  const pageData = loadShowcaseLakesPageDataServer();
  const entries = await Promise.all(
    Object.entries(pageData).map(async ([slug, lake]) => [
      slug,
      {
        ...lake,
        liveLakeLevel: await loadLiveLakeLevelResilient(lake.sources.liveLevel.url),
      },
    ] as const),
  );
  return Object.fromEntries(entries);
});
