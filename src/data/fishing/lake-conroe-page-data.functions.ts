import { createServerFn } from "@tanstack/react-start";

import { loadLakeConroePageDataServer } from "./lake-conroe-page-data.server";
import { loadLiveLakeLevelResilient } from "./live-lake-level-fetch.server";

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

export const getLakeConroePageData = createServerFn({ method: "GET" }).handler(async () => {
  const pageData = loadLakeConroePageDataServer();
  const liveLakeLevel = await loadPageLiveLakeLevel(pageData.sources.liveLevel.url);
  return { ...pageData, liveLakeLevel };
});
