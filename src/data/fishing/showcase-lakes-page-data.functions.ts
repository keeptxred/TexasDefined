import { createServerFn } from "@tanstack/react-start";

import { loadLiveLakeLevelResilient } from "./live-lake-level-fetch.server";
import { loadShowcaseLakesPageDataServer } from "./showcase-lakes-page-data.server";

const PAGE_LIVE_LEVEL_BUDGET_MS = 1_500;

async function loadPageLiveLakeLevel(sourceUrl: string) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      loadLiveLakeLevelResilient(sourceUrl),
      new Promise<null>((resolve) => {
        timeoutId = setTimeout(() => resolve(null), PAGE_LIVE_LEVEL_BUDGET_MS);
      }),
    ]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export const getShowcaseLakePageData = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const lake = loadShowcaseLakesPageDataServer()[data.slug];
    if (!lake) return null;
    return {
      ...lake,
      liveLakeLevel: await loadPageLiveLakeLevel(lake.sources.liveLevel.url),
    };
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
