import { createServerFn } from "@tanstack/react-start";

import { loadLakeConroePageDataServer } from "./lake-conroe-page-data.server";
import { loadLiveLakeLevelResilient } from "./live-lake-level-fetch.server";

export const getLakeConroePageData = createServerFn({ method: "GET" }).handler(async () => {
  const pageData = loadLakeConroePageDataServer();
  const liveLakeLevel = await loadLiveLakeLevelResilient(pageData.sources.liveLevel.url);
  return { ...pageData, liveLakeLevel };
});
