import { createServerFn } from "@tanstack/react-start";

export const getFishingSeasonData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadFishingSeasonDataServer } = await import("./season-data.server");
  return loadFishingSeasonDataServer();
});
