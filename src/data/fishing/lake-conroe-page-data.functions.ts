import { createServerFn } from "@tanstack/react-start";

import { loadLakeConroePageDataServer } from "./lake-conroe-page-data.server";
// Load the external live-water parser only for pages that actually need a
// reading. A static campground guide must not eagerly allocate this entire
// upstream-fetch and parser graph in a cold Worker. 

const PAGE_LIVE_LEVEL_BUDGET_MS = 1_500;

async function loadPageLiveLakeLevel(sourceUrl: string) {
  const { loadLiveLakeLevelResilient } = await import("./live-lake-level-fetch.server");
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

export const getLakeConroePageData = createServerFn({ method: "GET" }).handler(async () => {
  const pageData = loadLakeConroePageDataServer();
  const liveLakeLevel = await loadPageLiveLakeLevel(pageData.sources.liveLevel.url);
  return { ...pageData, liveLakeLevel };
});

// The campground is an independently sourced evergreen planning guide, not
// a live water-level widget. Avoid an unnecessary remote API request and its
// full parser graph during its SSR: neither data is used to describe campsite
// availability or rates. Do not alter fish/boating live-water behavior.
export const getLakeConroeCampingPageData = createServerFn({ method: "GET" }).handler(() => ({
  ...loadLakeConroePageDataServer(),
  liveLakeLevel: null,
}));
