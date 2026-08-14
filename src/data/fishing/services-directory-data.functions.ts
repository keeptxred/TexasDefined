import { createServerFn } from "@tanstack/react-start";

export const getFishingServicesDirectoryData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadFishingServicesDirectoryDataServer } = await import("./services-directory-data.server");
  return loadFishingServicesDirectoryDataServer();
});
