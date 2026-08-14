import { createServerFn } from "@tanstack/react-start";

import { loadFishSpeciesDirectoryDataServer } from "./species-directory-data.server";

export const getFishSpeciesDirectoryData = createServerFn({ method: "GET" }).handler(async () => {
  return loadFishSpeciesDirectoryDataServer();
});
