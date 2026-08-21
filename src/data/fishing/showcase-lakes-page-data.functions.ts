import { createServerFn } from "@tanstack/react-start";

import { loadLiveLakeLevelResilient } from "./live-lake-level-fetch.server";
import { loadShowcaseLakesPageDataServer } from "./showcase-lakes-page-data.server";

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
