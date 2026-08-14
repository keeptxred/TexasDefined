import { createServerFn } from "@tanstack/react-start";

export const getFishingAccessDirectoryData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadFishingAccessDirectoryDataServer } = await import("./access-directory-data.server");
  return loadFishingAccessDirectoryDataServer();
});
