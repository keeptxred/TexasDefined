import { createServerFn } from "@tanstack/react-start";

export const getFishingGuideDirectoryData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadFishingGuideDirectoryDataServer } = await import("./guide-directory-data.server");
  return loadFishingGuideDirectoryDataServer();
});
